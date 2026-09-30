import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { routeCuratiaSkills, CURATIA_SKILL_ROUTER_VERSION } from "./curatia-skill-router";

export type CuratiaSignal={id:string;title:string;summary:string|null;state:"New"|"Watch"|"Explore"|"Promoted"|"Ignored"|"Archived";radar_status:"detected"|"radar"|"dismissed";radar_entered_at:string|null;radar_entry_reason:string|null;detected_at:string;first_published_at:string|null;why_it_may_matter:string|null;why_now:string|null;ba_impact:string|null;role_impact:string|null;second_order_implication:string|null;strongest_editorial_angle:string|null;editorial_potential:string|null;evidence_strength:string|null;saturation:string|null;source_count:number;previous_source_count:number|null;previous_evidence_strength:string|null;previous_saturation:string|null;last_change_at:string|null};
export type CuratiaContentItem={id:string;title:string;series:string|null;topic:string|null;publishing_channel:string;content_format:"text_post"|"text_visual"|"image_post"|"carousel"|"video"|"newsletter"|"article";core_idea:string|null;ba_implication:string|null;evidence_strength:string|null;saturation:string|null;status:"Idea"|"In Progress"|"Ready"|"Approved"|"Scheduled"|"Published";target_date:string|null;publication_date:string|null;publication_time:string|null;draft_copy:string|null;final_copy:string|null;visual_concept:string|null;visual_brief:string|null;final_visual_reference:string|null;source_origin:string|null;why_now:string|null;second_order_implication:string|null;strongest_angle:string|null;metadata:Record<string,any>;updated_at:string};
export type CuratiaSignalRelationship={from:string;to:string;type:string;strength:number;reason:string|null};
export type CuratiaSignalGraph={signals:CuratiaSignal[];relationships:CuratiaSignalRelationship[]};
export type CuratiaDashboard={signals:CuratiaSignal[];signalGraph:CuratiaSignalGraph;contentItems:CuratiaContentItem[];sourceCount:number};
export type CuratiaBootstrap={workspaceId:string;userId:string;email:string|null;displayName:string|null};

function config(){const url=process.env["SUPABASE_URL"]?.replace(/\/$/,"");const key=process.env["SUPABASE_SECRET_KEY"];if(!url||!key)throw new Error("Curatia is not configured.");return{url,key}}
async function rest(path:string,init?:RequestInit){const{url,key}=config();const response=await fetch(url+"/rest/v1/"+path,{...init,headers:{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json",Prefer:"return=representation",...(init?.headers||{})}});if(!response.ok)throw new Error(`Curatia data request failed (${response.status}).`);if(response.status===204)return null;const text=await response.text();return text?JSON.parse(text):null}

export const getCuratiaDashboard=createServerFn({method:"GET"}).handler(async():Promise<CuratiaDashboard>=>{
 const [rawSignals,contentItems,sources,links,snapshots,relationships]=await Promise.all([
  rest("signals?select=id,title,summary,state,radar_status,radar_entered_at,radar_entry_reason,detected_at,first_published_at,why_it_may_matter,why_now,ba_impact,role_impact,second_order_implication,strongest_editorial_angle,editorial_potential,evidence_strength,saturation&state=not.eq.Archived&order=detected_at.desc"),
  rest("content_items?select=id,title,series,topic,publishing_channel,content_format,core_idea,ba_implication,evidence_strength,saturation,status,target_date,publication_date,publication_time,draft_copy,final_copy,visual_concept,visual_brief,final_visual_reference,source_origin,why_now,second_order_implication,strongest_angle,metadata,updated_at&order=updated_at.desc"),
  rest("sources?select=id"),
  rest("signal_sources?select=signal_id,source_id"),
  rest("signal_review_snapshots?select=signal_id,source_count,evidence_strength,saturation,created_at&order=created_at.desc"),
  rest("signal_relationships?select=from_signal_id,to_signal_id,relationship_type,strength,reason")
 ]);
 const counts=new Map<string,number>();for(const x of links||[])counts.set(x.signal_id,(counts.get(x.signal_id)||0)+1);
 const previous=new Map<string,any>();for(const x of snapshots||[])if(!previous.has(x.signal_id))previous.set(x.signal_id,x);
 const allSignals=(rawSignals||[]).map((s:any)=>{const p=previous.get(s.id);return{...s,source_count:counts.get(s.id)||0,previous_source_count:p?.source_count??null,previous_evidence_strength:p?.evidence_strength??null,previous_saturation:p?.saturation??null,last_change_at:p?.created_at??null}});
 const signals=allSignals.filter((s:any)=>s.radar_status==="radar"&&["New","Watch","Explore"].includes(s.state));
 return{signals,signalGraph:{signals:allSignals,relationships:(relationships||[]).map((r:any)=>({from:r.from_signal_id,to:r.to_signal_id,type:r.relationship_type,strength:Number(r.strength),reason:r.reason}))},contentItems,sourceCount:Array.isArray(sources)?sources.length:0};
});

const watchRunInput=z.object({accessToken:z.string().min(20)});
export type CuratiaWatchTarget={id:string;title:string;summary:string|null;whyNow:string|null;baImpact:string|null;secondOrderImplication:string|null;evidenceStrength:string|null;saturation:string|null;sourceUrls:string[];sourceCount:number;discoveryTags:string[]};
export type CuratiaScoutSource={key:string;displayName:string;sourceType:string;discoveryRole:string;baseUrl:string|null;priority:number};
export type CuratiaScoutBrief={workspaceId:string;baselines:string[];watchlists:string[];sources:CuratiaScoutSource[];watchTargets:CuratiaWatchTarget[]};
export const getCuratiaScoutBrief=createServerFn({method:"POST"}).validator(watchRunInput).handler(async({data}):Promise<CuratiaScoutBrief>=>{
 const ctx=await curatiaContext(data.accessToken);
 const [prefs,registry,signals,links]=await Promise.all([
  rest(`workspace_preferences?select=discovery_baselines,discovery_watchlists&workspace_id=eq.${encodeURIComponent(ctx.wid)}&limit=1`),
  rest("scout_source_registry?select=key,display_name,source_type,discovery_role,base_url,priority&active=eq.true&order=priority.desc,display_name"),
  rest(`signals?select=id,title,summary,why_now,ba_impact,second_order_implication,evidence_strength,saturation,discovery_tags&workspace_id=eq.${encodeURIComponent(ctx.wid)}&state=eq.Watch&order=detected_at.desc`),
  rest("signal_sources?select=signal_id,source_id,sources(canonical_url)")
 ]);
 const watchTargets=(signals||[]).map((s:any)=>{const own=(links||[]).filter((x:any)=>x.signal_id===s.id);return{id:s.id,title:s.title,summary:s.summary,whyNow:s.why_now,baImpact:s.ba_impact,secondOrderImplication:s.second_order_implication,evidenceStrength:s.evidence_strength,saturation:s.saturation,sourceUrls:own.map((x:any)=>x.sources?.canonical_url).filter(Boolean),sourceCount:own.length,discoveryTags:s.discovery_tags||[]}}) as CuratiaWatchTarget[];
 return{workspaceId:ctx.wid,baselines:prefs?.[0]?.discovery_baselines||[],watchlists:prefs?.[0]?.discovery_watchlists||[],sources:(registry||[]).map((x:any)=>({key:x.key,displayName:x.display_name,sourceType:x.source_type,discoveryRole:x.discovery_role,baseUrl:x.base_url,priority:x.priority})),watchTargets};
});
export const beginCuratiaWatchRun=createServerFn({method:"POST"}).validator(watchRunInput).handler(async({data})=>{
 const ctx=await curatiaContext(data.accessToken);
 const rpc=await fetch(config().url+"/rest/v1/rpc/begin_curatia_watch_run",{method:"POST",headers:{apikey:config().key,Authorization:`Bearer ${config().key}`,"Content-Type":"application/json"},body:JSON.stringify({p_workspace_id:ctx.wid})});
 if(!rpc.ok)throw new Error("Could not start the Watch review run.");const runId=await rpc.json();
 const signals=await rest(`signals?select=id,title,summary,why_now,ba_impact,second_order_implication,evidence_strength,saturation,discovery_tags&workspace_id=eq.${encodeURIComponent(ctx.wid)}&state=eq.Watch&order=detected_at.desc`);
 const links=await rest("signal_sources?select=signal_id,source_id,sources(canonical_url)");
 return{runId,targets:(signals||[]).map((s:any)=>{const own=(links||[]).filter((x:any)=>x.signal_id===s.id);return{id:s.id,title:s.title,summary:s.summary,whyNow:s.why_now,baImpact:s.ba_impact,secondOrderImplication:s.second_order_implication,evidenceStrength:s.evidence_strength,saturation:s.saturation,sourceUrls:own.map((x:any)=>x.sources?.canonical_url).filter(Boolean),sourceCount:own.length,discoveryTags:s.discovery_tags||[]}}) as CuratiaWatchTarget[]}
});
const watchEvidenceInput=z.object({accessToken:z.string().min(20),runId:z.string().uuid(),signalId:z.string().uuid(),sources:z.array(z.object({url:z.string().url(),title:z.string().min(1).max(500),publisher:z.string().max(200).nullable().optional(),publishedAt:z.string().nullable().optional(),summary:z.string().max(2000).nullable().optional()})).max(20),assessment:z.object({evidenceStrength:z.enum(["Strong","Moderate","Weak"]),saturation:z.enum(["Low","Medium","High"]),whyNow:z.string().max(3000).nullable().optional(),baImpact:z.string().max(3000).nullable().optional(),secondOrderImplication:z.string().max(3000).nullable().optional()})});
export const applyCuratiaWatchEvidence=createServerFn({method:"POST"}).validator(watchEvidenceInput).handler(async({data})=>{
 const ctx=await curatiaContext(data.accessToken);const sig=await rest(`signals?select=id&workspace_id=eq.${encodeURIComponent(ctx.wid)}&id=eq.${encodeURIComponent(data.signalId)}&state=eq.Watch&limit=1`);if(!sig?.[0])throw new Error("Watch signal not found.");
 for(const src of data.sources){const key=src.url.trim().toLowerCase();let rows=await rest(`sources?select=id&workspace_id=eq.${encodeURIComponent(ctx.wid)}&canonical_url=eq.${encodeURIComponent(src.url)}&limit=1`);let sourceId=rows?.[0]?.id;if(!sourceId){const created=await rest("sources",{method:"POST",body:JSON.stringify({workspace_id:ctx.wid,source_key:key,canonical_url:src.url,title:src.title,publisher:src.publisher||null,published_at:src.publishedAt||null,summary:src.summary||null,accessed_at:new Date().toISOString(),last_verified_at:new Date().toISOString()})});sourceId=created?.[0]?.id}if(sourceId)await rest("signal_sources",{method:"POST",headers:{Prefer:"resolution=ignore-duplicates,return=minimal"},body:JSON.stringify({signal_id:data.signalId,source_id:sourceId,role:"additional"})})}
 await rest(`signals?id=eq.${encodeURIComponent(data.signalId)}`,{method:"PATCH",body:JSON.stringify({evidence_strength:data.assessment.evidenceStrength,saturation:data.assessment.saturation,why_now:data.assessment.whyNow||null,ba_impact:data.assessment.baImpact||null,second_order_implication:data.assessment.secondOrderImplication||null,last_seen_run_id:data.runId,updated_at:new Date().toISOString()})});return{ok:true}
});
const completeWatchInput=z.object({accessToken:z.string().min(20),runId:z.string().uuid()});
export const completeCuratiaWatchRun=createServerFn({method:"POST"}).validator(completeWatchInput).handler(async({data})=>{await curatiaContext(data.accessToken);const{url,key}=config();const r=await fetch(url+"/rest/v1/rpc/complete_curatia_watch_run",{method:"POST",headers:{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({p_run_id:data.runId})});if(!r.ok)throw new Error("Could not complete the Watch review run.");return{ok:true}});
const radarPromoteInput=z.object({accessToken:z.string().min(20),signalId:z.string().uuid()});
export const moveSignalToTrendRadar=createServerFn({method:"POST"}).validator(radarPromoteInput).handler(async({data})=>{
 const ctx=await curatiaContext(data.accessToken);
 const rows=await rest(`signals?select=id,state,radar_status&workspace_id=eq.${encodeURIComponent(ctx.wid)}&id=eq.${encodeURIComponent(data.signalId)}&limit=1`);
 if(!rows?.[0])throw new Error("Signal not found in this workspace.");
 if(rows[0].radar_status==="radar")return{ok:true,alreadyInRadar:true};
 await rest(`signals?id=eq.${encodeURIComponent(data.signalId)}`,{method:"PATCH",body:JSON.stringify({radar_status:"radar",state:"New",radar_entered_at:new Date().toISOString(),radar_entry_reason:"Manually moved from Signals by workspace user",updated_at:new Date().toISOString()})});
 return{ok:true,alreadyInRadar:false}
});
const signalInput=z.object({id:z.string().uuid(),state:z.enum(["Watch","Explore","Ignored"])});
export const updateSignalState=createServerFn({method:"POST"}).validator(signalInput).handler(async({data})=>{
 const current=await rest(`signals?select=id,evidence_strength,saturation,why_now,ba_impact,second_order_implication,editorial_potential&id=eq.${encodeURIComponent(data.id)}&limit=1`);
 if(!current?.[0])throw new Error("Signal not found.");
 const links=await rest(`signal_sources?select=source_id&signal_id=eq.${encodeURIComponent(data.id)}`);
 await rest("signal_review_snapshots",{method:"POST",body:JSON.stringify({signal_id:data.id,source_count:Array.isArray(links)?links.length:0,evidence_strength:current[0].evidence_strength,saturation:current[0].saturation,why_now:current[0].why_now,ba_impact:current[0].ba_impact,second_order_implication:current[0].second_order_implication,editorial_potential:current[0].editorial_potential,snapshot_reason:"editorial_review"})});
 const body:any={state:data.state};if(data.state==="Ignored")body.ignored_at=new Date().toISOString();
 return rest(`signals?id=eq.${encodeURIComponent(data.id)}`,{method:"PATCH",body:JSON.stringify(body)});
});

const contentInput=z.object({accessToken:z.string().min(20),id:z.string().min(1),status:z.enum(["Idea","In Progress","Ready","Approved","Scheduled","Published"])});
export const updateContentStatus=createServerFn({method:"POST"}).validator(contentInput).handler(async({data})=>{
 const ctx=await curatiaContext(data.accessToken);
 const current=await rest(`content_items?select=status,publication_date,publication_time,approved_by_user&workspace_id=eq.${encodeURIComponent(ctx.wid)}&id=eq.${encodeURIComponent(data.id)}&limit=1`);
 if(!Array.isArray(current)||!current[0])throw new Error("Content item not found.");
 const from=current[0].status;
 const allowed:Record<string,string[]>={"Idea":["In Progress"],"In Progress":["Idea","Ready"],"Ready":["In Progress","Approved"],"Approved":["Ready","Scheduled"],"Scheduled":["Approved","Published"],"Published":[]};
 if(!allowed[from]?.includes(data.status))throw new Error("Invalid lifecycle transition.");
 if(data.status==="Scheduled"&&(!current[0].publication_date||!current[0].publication_time))throw new Error("Add publication date and time before scheduling.");
 const patch:any={status:data.status,updated_at:new Date().toISOString()};
 if(data.status==="Approved"){patch.approved_by_user=true;patch.approval_timestamp=new Date().toISOString()}
 if(from==="Approved"&&data.status==="Ready"){patch.approved_by_user=false;patch.approval_timestamp=null}
 return rest(`content_items?workspace_id=eq.${encodeURIComponent(ctx.wid)}&id=eq.${encodeURIComponent(data.id)}`,{method:"PATCH",body:JSON.stringify(patch)});
});
const contentDetailsInput=z.object({accessToken:z.string().min(20),id:z.string().min(1),title:z.string().min(1).max(240),coreIdea:z.string().max(3000),channel:z.string().min(1).max(80),format:z.enum(["text_post","text_visual","image_post","carousel","video","newsletter","article"]),publicationDate:z.string().nullable(),publicationTime:z.string().nullable()});
export const updateContentDetails=createServerFn({method:"POST"}).validator(contentDetailsInput).handler(async({data})=>{
 const ctx=await curatiaContext(data.accessToken);
 return rest(`content_items?workspace_id=eq.${encodeURIComponent(ctx.wid)}&id=eq.${encodeURIComponent(data.id)}`,{method:"PATCH",body:JSON.stringify({title:data.title,core_idea:data.coreIdea||null,publishing_channel:data.channel,content_format:data.format,publication_date:data.publicationDate||null,publication_time:data.publicationTime||null,updated_at:new Date().toISOString()})});
});
const publishingContextInput=z.object({accessToken:z.string().min(20),id:z.string().min(1),channel:z.string().min(1).max(80),format:z.enum(["text_post","text_visual","image_post","carousel","video","newsletter","article"])});
export const updateContentPublishingContext=createServerFn({method:"POST"}).validator(publishingContextInput).handler(async({data})=>{
 const ctx=await curatiaContext(data.accessToken);
 return rest("content_items?workspace_id=eq."+encodeURIComponent(ctx.wid)+"&id=eq."+encodeURIComponent(data.id),{method:"PATCH",body:JSON.stringify({publishing_channel:data.channel,content_format:data.format,updated_at:new Date().toISOString()})});
});
const backlogFromSignalInput=z.object({accessToken:z.string().min(20),signalId:z.string().uuid()});
export const addSignalToContentBacklog=createServerFn({method:"POST"}).validator(backlogFromSignalInput).handler(async({data})=>{
 const ctx=await curatiaContext(data.accessToken);
 const rows=await rest(`signals?select=id,title,summary,state,why_now,role_impact,ba_impact,second_order_implication,strongest_editorial_angle,evidence_strength,saturation&workspace_id=eq.${encodeURIComponent(ctx.wid)}&id=eq.${encodeURIComponent(data.signalId)}&limit=1`);
 const s=rows?.[0];if(!s)throw new Error("Signal not found in this workspace.");
 const existing=await rest(`content_items?select=id&workspace_id=eq.${encodeURIComponent(ctx.wid)}&metadata->>source_signal_id=eq.${encodeURIComponent(data.signalId)}&status=neq.Published&limit=1`);
 if(existing?.[0])return{ok:true,id:existing[0].id,alreadyExists:true};
 const id="CUR-"+crypto.randomUUID().slice(0,8).toUpperCase();
 const title=s.strongest_editorial_angle||s.title;
 const core=s.second_order_implication||s.role_impact||s.ba_impact||s.summary||s.title;
 await rest("content_items",{method:"POST",body:JSON.stringify({id,workspace_id:ctx.wid,title,topic:s.title,publishing_channel:"linkedin",core_idea:core,why_now:s.why_now||null,ba_implication:s.role_impact||s.ba_impact||null,second_order_implication:s.second_order_implication||null,strongest_angle:s.strongest_editorial_angle||null,saturation:s.saturation||null,evidence_strength:s.evidence_strength||null,source_origin:"Trend Radar",status:"Idea",metadata:{source_signal_id:s.id,generated_by:"curatia",generation_basis:"trend_radar_signal"},updated_at:new Date().toISOString()})});
 return{ok:true,id,alreadyExists:false};
});
async function cloudflareText(messages:{role:"system"|"user";content:string}[]){
 const accountId=process.env.CLOUDFLARE_ACCOUNT_ID;const token=process.env.CLOUDFLARE_API_TOKEN;
 if(!accountId||!token)throw new Error("Curatia text generation provider is not configured.");
 const model="@cf/meta/llama-3.3-70b-instruct-fp8-fast";
 const response=await fetch("https://api.cloudflare.com/client/v4/accounts/"+accountId+"/ai/run/"+model,{method:"POST",headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"},body:JSON.stringify({messages,max_tokens:1800,temperature:0.35})});
 const body=await response.json().catch(()=>null) as any;
 if(!response.ok||!body?.success)throw new Error(body?.errors?.[0]?.message||"Curatia text generation failed.");
 const text=body?.result?.response;
 if(typeof text!=="string"||!text.trim())throw new Error("Curatia text generation returned no content.");
 return{text:text.trim(),provider:"cloudflare-workers-ai",model};
}
const operationInstruction:Record<string,string>={
 generate:"Create the publishable artifact from the editorial intelligence. Do not describe the process.",
 refine:"Improve the existing artifact while preserving its thesis, intent, factual claims, and author voice. Return only the revised artifact.",
 tighten:"Make the existing artifact tighter and more concise. Remove repetition and weak filler without changing its thesis, facts, or voice. Return only the revised artifact.",
 structure:"Improve the structure, sequencing, paragraphing, and flow of the existing artifact. Preserve its thesis, facts, and voice. Return only the revised artifact.",
 adapt_channel:"Adapt the existing artifact to the specified channel and format while preserving its thesis and factual content. Return only the adapted artifact.",
 strengthen_opening:"Rewrite only as much as necessary to create a stronger opening, then make the transition into the existing artifact feel natural. Avoid clickbait and preserve the thesis, facts, and voice. Return the complete revised artifact."
};
const draftInput=z.object({accessToken:z.string().min(20),id:z.string().min(1),existingArtifact:z.string().max(20000).optional(),operation:z.enum(["generate","refine","tighten","structure","adapt_channel","strengthen_opening"]).default("generate")});
export const generateCuratiaContent=createServerFn({method:"POST"}).validator(draftInput).handler(async({data})=>{
 const ctx=await curatiaContext(data.accessToken);
 const rows=await rest("content_items?select=title,core_idea,why_now,ba_implication,second_order_implication,strongest_angle,publishing_channel,content_format,publication_date,publication_time&workspace_id=eq."+encodeURIComponent(ctx.wid)+"&id=eq."+encodeURIComponent(data.id)+"&limit=1");
 const x=rows?.[0];if(!x)throw new Error("Content item not found.");
 const existing=(data.existingArtifact||"").trim();
 const route=routeCuratiaSkills({agent:"editorial-studio",task:data.operation,channel:x.publishing_channel,format:x.content_format,operation:data.operation,artifactState:existing?"existing":"missing"});
 const base=[x.title,"",x.core_idea||"",x.why_now?"Why this matters now: "+x.why_now:"",x.ba_implication?"For the role: "+x.ba_implication:"",x.second_order_implication||"",x.strongest_angle?"The angle worth exploring: "+x.strongest_angle:""].filter(Boolean).join("\n\n");
 const context=["TITLE: "+x.title,x.core_idea?"CORE IDEA: "+x.core_idea:"",x.why_now?"WHY NOW: "+x.why_now:"",x.ba_implication?"ROLE IMPACT: "+x.ba_implication:"",x.second_order_implication?"SECOND ORDER: "+x.second_order_implication:"",x.strongest_angle?"STRONGEST ANGLE: "+x.strongest_angle:"","CHANNEL: "+x.publishing_channel,"FORMAT: "+x.content_format,existing?"EXISTING ARTIFACT:\n"+existing:""].filter(Boolean).join("\n\n");
 const system=["You are Curatia's editorial artifact engine.","Use the supplied editorial intelligence as context, not as headings that must be copied into the output.","Be natural, specific, grounded and concise. Do not invent facts, sources, outcomes, quotes, or personal experience.","Avoid generic AI-writing patterns and engagement bait.",operationInstruction[data.operation],"Selected skill packs: "+route.skills.join(", ")+". Apply only capabilities relevant to this operation."].join("\n");
 const ai=await cloudflareText([{role:"system",content:system},{role:"user",content:context}]);
 const draft=ai.text;
 const previous=await rest("content_artifacts?select=version&workspace_id=eq."+encodeURIComponent(ctx.wid)+"&content_item_id=eq."+encodeURIComponent(data.id)+"&artifact_type=eq.text&order=version.desc&limit=1");
 const version=(previous?.[0]?.version?Number(previous[0].version):0)+1;
 await rest("content_artifacts",{method:"POST",body:JSON.stringify({workspace_id:ctx.wid,content_item_id:data.id,artifact_type:"text",version,content:{text:draft},status:"selected",source:"curatia",operation:data.operation,skill_ids:route.skills,skill_router_version:CURATIA_SKILL_ROUTER_VERSION,provider:ai.provider,model:ai.model,created_by:ctx.user.id,provenance:{channel:x.publishing_channel,format:x.content_format,router_reasons:route.reasons,preserve_existing_artifact_intent:route.preserveExistingArtifactIntent}})});
 await rest("content_items?workspace_id=eq."+encodeURIComponent(ctx.wid)+"&id=eq."+encodeURIComponent(data.id),{method:"PATCH",body:JSON.stringify({draft_copy:draft,metadata:{skill_router:{version:CURATIA_SKILL_ROUTER_VERSION,last_skills:route.skills,last_operation:data.operation}},updated_at:new Date().toISOString()})});
 return{draft,skills:route.skills,version,operation:data.operation,provider:ai.provider,model:ai.model};
});
const editorialInput=z.object({accessToken:z.string().min(20),id:z.string().min(1),content:z.string().max(20000),visualDirection:z.string().max(3000)});
export const updateEditorialStudio=createServerFn({method:"POST"}).validator(editorialInput).handler(async({data})=>{
 const ctx=await curatiaContext(data.accessToken);
 return rest("content_items?workspace_id=eq."+encodeURIComponent(ctx.wid)+"&id=eq."+encodeURIComponent(data.id),{method:"PATCH",body:JSON.stringify({draft_copy:data.content||null,visual_concept:data.visualDirection||null,updated_at:new Date().toISOString()})});
});
export type CuratiaReferenceAsset={id:string;fileName:string;mimeType:string;fileSize:number;interpretation:string|null;createdAt:string};
const referenceUploadInput=z.object({accessToken:z.string().min(20),id:z.string().min(1),fileName:z.string().min(1).max(240),mimeType:z.enum(["image/png","image/jpeg","image/webp","image/gif"]),base64:z.string().min(1).max(15000000)});
export const uploadCuratiaVisualReference=createServerFn({method:"POST"}).validator(referenceUploadInput).handler(async({data})=>{
 const ctx=await curatiaContext(data.accessToken);const{url,key}=config();
 const raw=Buffer.from(data.base64,"base64");if(!raw.length||raw.length>10485760)throw new Error("Reference image must be 10 MB or smaller.");
 const ext=data.mimeType==="image/png"?"png":data.mimeType==="image/webp"?"webp":data.mimeType==="image/gif"?"gif":"jpg";
 const safe=data.fileName.replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,100)||("reference."+ext);
 const path=ctx.wid+"/"+data.id+"/"+crypto.randomUUID()+"-"+safe;
 const up=await fetch(url+"/storage/v1/object/curatia-visual-references/"+path,{method:"POST",headers:{apikey:key,Authorization:"Bearer "+key,"Content-Type":data.mimeType,"x-upsert":"false"},body:raw});
 if(!up.ok)throw new Error("Could not store visual reference.");
 let interpretation:string|null=null;let provider:string|null=null;let model:string|null=null;
 try{
  const accountId=process.env.CLOUDFLARE_ACCOUNT_ID;const token=process.env.CLOUDFLARE_API_TOKEN;
  if(accountId&&token){
   model="@cf/llava-hf/llava-1.5-7b-hf";
   const vr=await fetch("https://api.cloudflare.com/client/v4/accounts/"+accountId+"/ai/run/"+model,{method:"POST",headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"},body:JSON.stringify({image:Array.from(raw),prompt:"Analyze this image as a visual reference for an editorial content workflow. Describe composition, hierarchy, typography if visible, palette, illustration/photo style, reusable visual patterns, and what should be preserved if generating a new image inspired by it. Do not identify people. Be concise."})});
   const vb=await vr.json().catch(()=>null) as any;
   if(vr.ok&&vb?.success&&typeof vb?.result?.description==="string"){interpretation=vb.result.description.trim();provider="cloudflare-workers-ai"}
  }
 }catch{}
 const rows=await rest("content_reference_assets",{method:"POST",body:JSON.stringify({workspace_id:ctx.wid,content_item_id:data.id,storage_path:path,file_name:data.fileName,mime_type:data.mimeType,file_size:raw.length,interpretation,interpretation_provider:provider,interpretation_model:model,created_by:ctx.user.id,metadata:{purpose:"visual_reference"}})});
 const r=rows?.[0];return{id:r.id,fileName:r.file_name,mimeType:r.mime_type,fileSize:r.file_size,interpretation:r.interpretation,createdAt:r.created_at} as CuratiaReferenceAsset;
});
export const listCuratiaVisualReferences=createServerFn({method:"POST"}).validator(z.object({accessToken:z.string().min(20),id:z.string().min(1)})).handler(async({data}):Promise<CuratiaReferenceAsset[]>=>{
 const ctx=await curatiaContext(data.accessToken);const rows=await rest("content_reference_assets?select=id,file_name,mime_type,file_size,interpretation,created_at&workspace_id=eq."+encodeURIComponent(ctx.wid)+"&content_item_id=eq."+encodeURIComponent(data.id)+"&purpose=eq.visual_reference&order=created_at.desc");
 return(rows||[]).map((r:any)=>({id:r.id,fileName:r.file_name,mimeType:r.mime_type,fileSize:Number(r.file_size),interpretation:r.interpretation,createdAt:r.created_at}));
});
const visualInput=z.object({accessToken:z.string().min(20),id:z.string().min(1),visualConcept:z.string().max(3000),visualBrief:z.string().max(10000)});
export const updateContentVisual=createServerFn({method:"POST"}).validator(visualInput).handler(async({data})=>{const ctx=await curatiaContext(data.accessToken);return rest(`content_items?workspace_id=eq.${encodeURIComponent(ctx.wid)}&id=eq.${encodeURIComponent(data.id)}`,{method:"PATCH",body:JSON.stringify({visual_concept:data.visualConcept||null,visual_brief:data.visualBrief||null,updated_at:new Date().toISOString()})})});



const bootstrapInput=z.object({accessToken:z.string().min(20)});
export const bootstrapCuratiaUser=createServerFn({method:"POST"}).validator(bootstrapInput).handler(async({data}):Promise<CuratiaBootstrap>=>{
 const{url,key}=config();
 const userResponse=await fetch(url+"/auth/v1/user",{headers:{apikey:key,Authorization:`Bearer ${data.accessToken}`}});
 if(!userResponse.ok)throw new Error("Your Curatia session could not be verified.");
 const user=await userResponse.json();
 if(!user?.id)throw new Error("Curatia user was not returned.");
 const displayName=user.user_metadata?.full_name||user.user_metadata?.name||user.email?.split("@")[0]||null;
 const rpc=await fetch(url+"/rest/v1/rpc/bootstrap_curatia_user",{method:"POST",headers:{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({p_user_id:user.id,p_email:user.email||null,p_display_name:displayName})});
 if(!rpc.ok){const msg=await rpc.text();throw new Error(msg.includes("Workspace access")?"Your account exists, but it has not been granted access to this Curatia workspace.":"Curatia workspace bootstrap failed.");}
 const workspaceId=await rpc.json();
 return{workspaceId,userId:user.id,email:user.email||null,displayName};
});


export type CuratiaOnboarding={completed:boolean;email:string;workspaceId:string;workspaceName:string;displayName:string;roleTitle:string;bio:string;avatarUrl:string;contentTerritories:string[];primaryAudience:string;secondaryAudiences:string[];audienceOutcomes:string[];languages:string[];baselines:string[];interests:string[];watchlists:string[];channels:string[];primaryChannel:string;voiceTone:string;voiceNotes:string;approvalRequired:boolean;schedulingAllowed:boolean};
const onboardingToken=z.object({accessToken:z.string().min(20)});
async function verifiedUser(accessToken:string){const{url,key}=config();const response=await fetch(url+"/auth/v1/user",{headers:{apikey:key,Authorization:`Bearer ${accessToken}`}});if(!response.ok)throw new Error("Your Curatia session could not be verified.");const user=await response.json();if(!user?.id)throw new Error("Curatia user was not returned.");return user}
export const getCuratiaOnboarding=createServerFn({method:"POST"}).validator(onboardingToken).handler(async({data}):Promise<CuratiaOnboarding>=>{
 const user=await verifiedUser(data.accessToken);
 const members=await rest(`workspace_members?select=workspace_id&user_id=eq.${encodeURIComponent(user.id)}&limit=1`);
 if(!Array.isArray(members)||!members[0])throw new Error("Curatia workspace membership was not found.");
 const wid=members[0].workspace_id;
 const [profiles,workspaces,prefs,interests,channels]=await Promise.all([
  rest(`profiles?select=display_name,role_title,bio,avatar_url,onboarding_completed_at&user_id=eq.${encodeURIComponent(user.id)}&limit=1`),
  rest(`workspaces?select=name,onboarding_completed_at&id=eq.${encodeURIComponent(wid)}&limit=1`),
  rest(`workspace_preferences?select=primary_audience,secondary_audiences,audience_outcomes,languages,voice_preferences,publishing_preferences,discovery_baselines,discovery_watchlists&workspace_id=eq.${encodeURIComponent(wid)}&limit=1`),
  rest(`discovery_interests?select=label&workspace_id=eq.${encodeURIComponent(wid)}&active=eq.true&order=created_at`),
  rest(`workspace_channels?select=channel_key,enabled,is_primary&workspace_id=eq.${encodeURIComponent(wid)}&enabled=eq.true`)
 ]);
 const p=profiles?.[0]||{},w=workspaces?.[0]||{},x=prefs?.[0]||{},voice=x.voice_preferences||{},pub=x.publishing_preferences||{};
 return{completed:Boolean(p.onboarding_completed_at&&w.onboarding_completed_at),email:user.email||"",workspaceId:wid,workspaceName:w.name||"Curatia",displayName:p.display_name||user.user_metadata?.full_name||"",roleTitle:p.role_title||"",bio:p.bio||"",avatarUrl:p.avatar_url||user.user_metadata?.avatar_url||"",contentTerritories:voice.content_territories||[],primaryAudience:x.primary_audience||"",secondaryAudiences:x.secondary_audiences||[],audienceOutcomes:x.audience_outcomes||[],languages:x.languages||["English"],interests:(interests||[]).map((i:any)=>i.label),baselines:x.discovery_baselines||["Technology"],watchlists:x.discovery_watchlists||[],channels:(channels||[]).map((c:any)=>c.channel_key),primaryChannel:(channels||[]).find((c:any)=>c.is_primary)?.channel_key||"linkedin",voiceTone:voice.tone||"Professional, Conversational, Clear, Practical",voiceNotes:voice.notes||"",approvalRequired:pub.approval_required!==false,schedulingAllowed:Boolean(pub.scheduling_allowed)};
});
const onboardingSave=z.object({accessToken:z.string().min(20),displayName:z.string().min(1).max(120),roleTitle:z.string().max(160),bio:z.string().max(1200),workspaceName:z.string().min(1).max(120),contentTerritories:z.array(z.string().min(1).max(120)).max(12),primaryAudience:z.string().max(240),secondaryAudiences:z.array(z.string().min(1).max(160)).max(10),audienceOutcomes:z.array(z.string().min(1).max(120)).max(10),languages:z.array(z.string().min(1).max(80)).min(1).max(8),baselines:z.array(z.string().min(1).max(120)).min(1).max(20),interests:z.array(z.string().min(1).max(120)).max(40),watchlists:z.array(z.string().min(1).max(120)).max(20),channels:z.array(z.enum(["linkedin","instagram","x","tiktok","youtube","podcast","newsletter","blog"])).min(1),primaryChannel:z.enum(["linkedin","instagram","x","tiktok","youtube","podcast","newsletter","blog"]),voiceTone:z.string().max(160),voiceNotes:z.string().max(1200),approvalRequired:z.literal(true),schedulingAllowed:z.boolean()});
export const completeCuratiaOnboarding=createServerFn({method:"POST"}).validator(onboardingSave).handler(async({data})=>{
 const user=await verifiedUser(data.accessToken);const members=await rest(`workspace_members?select=workspace_id&user_id=eq.${encodeURIComponent(user.id)}&limit=1`);if(!Array.isArray(members)||!members[0])throw new Error("Curatia workspace membership was not found.");const wid=members[0].workspace_id;const now=new Date().toISOString();
 await rest(`profiles?user_id=eq.${encodeURIComponent(user.id)}`,{method:"PATCH",body:JSON.stringify({display_name:data.displayName,role_title:data.roleTitle||null,bio:data.bio||null,avatar_url:user.user_metadata?.avatar_url||null,onboarding_completed_at:now,updated_at:now})});
 await rest(`workspaces?id=eq.${encodeURIComponent(wid)}`,{method:"PATCH",body:JSON.stringify({name:data.workspaceName,onboarding_completed_at:now,updated_at:now})});
 await rest(`workspace_preferences`,{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=representation"},body:JSON.stringify({workspace_id:wid,primary_audience:data.primaryAudience,secondary_audiences:data.secondaryAudiences,audience_outcomes:data.audienceOutcomes,languages:data.languages,voice_preferences:{tone:data.voiceTone,notes:data.voiceNotes,content_territories:data.contentTerritories},publishing_preferences:{approval_required:true,scheduling_allowed:data.schedulingAllowed},discovery_baselines:data.baselines,discovery_watchlists:[],preference_provenance:{content_focus:data.contentTerritories.length?"user_confirmed":"system_default",audience:(data.primaryAudience||data.secondaryAudiences.length)?"user_confirmed":"system_default",discovery_baseline:data.baselines.length?"user_confirmed":"system_default",discovery_interests:data.interests.length?"user_confirmed":"system_default",channels:"user_confirmed",voice:data.voiceTone?"user_confirmed":"system_default",languages:"user_confirmed",publishing:"system_default"},updated_at:now})});
 await rest(`discovery_interests?workspace_id=eq.${encodeURIComponent(wid)}`,{method:"DELETE"});
 for(const label of data.interests){await rest("discovery_interests",{method:"POST",body:JSON.stringify({workspace_id:wid,label,normalized_label:label.trim().toLowerCase(),source:"user_added",active:true,created_by:user.id})})}
 await rest(`workspace_channels?workspace_id=eq.${encodeURIComponent(wid)}`,{method:"PATCH",body:JSON.stringify({enabled:false,is_primary:false,updated_at:now})});
 for(const key of data.channels){await rest("workspace_channels",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=representation"},body:JSON.stringify({workspace_id:wid,channel_key:key,enabled:true,is_primary:key===data.primaryChannel,updated_at:now})})}
 return{ok:true};
});

const generateVisualInput=z.object({accessToken:z.string().min(20),id:z.string().min(1),prompt:z.string().min(1).max(10000),aspectRatio:z.enum(["1:1","4:5","16:9","9:16"]).default("4:5")});
type VisualProviderResult={assetUrl:string;provider:string;providerRef:string|null};
async function cloudflareVisual(prompt:string):Promise<VisualProviderResult>{
 const accountId=process.env.CLOUDFLARE_ACCOUNT_ID;const token=process.env.CLOUDFLARE_API_TOKEN;if(!accountId||!token)throw new Error("Cloudflare Workers AI is not configured.");
 const model="@cf/black-forest-labs/flux-1-schnell";const r=await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${model}`,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({prompt:prompt.slice(0,2048),steps:4})});
 const raw=await r.text();let body:any={};try{body=raw?JSON.parse(raw):{}}catch{}if(!r.ok||body?.success===false)throw new Error(body?.errors?.[0]?.message||`Cloudflare image generation failed (${r.status}).`);
 const image=body?.result?.image||body?.image||body?.result;if(typeof image!=="string"||!image)throw new Error("Cloudflare returned no image.");
 const assetUrl=image.startsWith("data:")?image:`data:image/jpeg;base64,${image}`;return{assetUrl,provider:"cloudflare-workers-ai",providerRef:model};
}
export type CuratiaVisualVersion={id:string;version:number;channel:string|null;format:string|null;assetUrl:string;prompt:string|null;provider:string|null;createdAt:string};
export const listContentVisualVersions=createServerFn({method:"POST"}).validator(z.object({accessToken:z.string().min(20),id:z.string().min(1)})).handler(async({data}):Promise<CuratiaVisualVersion[]>=>{const ctx=await curatiaContext(data.accessToken);const rows=await rest(`content_visual_assets?select=id,version,publishing_channel,content_format,asset_url,prompt,provider,created_at&workspace_id=eq.${encodeURIComponent(ctx.wid)}&content_item_id=eq.${encodeURIComponent(data.id)}&asset_kind=eq.final&order=version.desc`);return(rows||[]).map((r:any)=>({id:r.id,version:Number(r.version),channel:r.publishing_channel,format:r.content_format,assetUrl:r.asset_url,prompt:r.prompt,provider:r.provider,createdAt:r.created_at}))});
export const generateContentVisual=createServerFn({method:"POST"}).validator(generateVisualInput).handler(async({data})=>{
 const ctx=await curatiaContext(data.accessToken);const itemRows=await rest(`content_items?select=publishing_channel,content_format&workspace_id=eq.${encodeURIComponent(ctx.wid)}&id=eq.${encodeURIComponent(data.id)}&limit=1`);const item=itemRows?.[0];const result=await cloudflareVisual(data.prompt);
 const existing=await rest(`content_visual_assets?select=version&workspace_id=eq.${encodeURIComponent(ctx.wid)}&content_item_id=eq.${encodeURIComponent(data.id)}&order=version.desc&limit=1`);const version=(Array.isArray(existing)&&existing[0]?.version?Number(existing[0].version):0)+1;
 await rest(`content_visual_assets?workspace_id=eq.${encodeURIComponent(ctx.wid)}&content_item_id=eq.${encodeURIComponent(data.id)}&asset_kind=eq.final`,{method:"PATCH",body:JSON.stringify({selected:false})});
 await rest("content_visual_assets",{method:"POST",body:JSON.stringify({content_item_id:data.id,workspace_id:ctx.wid,version,source:"generated",asset_kind:"final",prompt:data.prompt,asset_url:result.assetUrl,selected:true,provider:result.provider,provider_asset_ref:result.providerRef,publishing_channel:item?.publishing_channel||null,content_format:item?.content_format||null,file_name:`${data.id}-v${version}.jpg`,mime_type:"image/jpeg"})});
 await rest(`content_items?workspace_id=eq.${encodeURIComponent(ctx.wid)}&id=eq.${encodeURIComponent(data.id)}`,{method:"PATCH",body:JSON.stringify({visual_brief:data.prompt,final_visual_reference:result.assetUrl,updated_at:new Date().toISOString()})});return{assetUrl:result.assetUrl,version,provider:result.provider};
});

export type CuratiaIntegration={key:string;label:string;provider:string;category:string;status:"connected"|"not_connected"|"error";setupStatus:"ready"|"setup_required"|"disabled";accountLabel:string|null;connectedAt:string|null;connectionId?:string|null;capabilities:string[]};
export type CuratiaIntegrationCatalogItem=CuratiaIntegration&{description:string|null;toolkitSlug:string|null;authConfigRef:string|null;active:boolean}; export type CuratiaIntegrationAdmin={isPlatformOwner:boolean;catalog:CuratiaIntegrationCatalogItem[]};
const integrationInput=z.object({accessToken:z.string().min(20),integrationKey:z.string().min(1).max(80)});
function composioConfig(){const apiKey=process.env.COMPOSIO_API_KEY;if(!apiKey)throw new Error("Integration provider is not configured.");return{apiKey,base:"https://backend.composio.dev/api/v3.1"}}
async function composio(path:string,init?:RequestInit){const{apiKey,base}=composioConfig();const r=await fetch(base+path,{...init,headers:{"x-api-key":apiKey,"Content-Type":"application/json",...(init?.headers||{})}});const raw=await r.text();let body:any={};try{body=raw?JSON.parse(raw):{}}catch{body={}}if(!r.ok){console.error("Curatia provider request failed",r.status);throw new Error("Curatia could not reach the integration provider. Please try again later.")}return body}
async function curatiaContext(accessToken:string){const user=await verifiedUser(accessToken);const members=await rest(`workspace_members?select=workspace_id,role&user_id=eq.${encodeURIComponent(user.id)}&limit=1`);if(!Array.isArray(members)||!members[0])throw new Error("Curatia workspace membership was not found.");return{user,wid:members[0].workspace_id,workspaceRole:members[0].role}}
function listData(x:any){return x?.items||x?.data?.items||x?.data||x?.connected_accounts||x?.auth_configs||[]}
async function integrationCatalog(){const rows=await rest("integration_catalog?select=key,display_name,category,provider,active,setup_status,capabilities,sort_order,metadata&active=eq.true&order=sort_order,key");return Array.isArray(rows)?rows:[]}
async function syncComposio(userId:string,wid:string){const catalog=await integrationCatalog();const ready=catalog.filter((x:any)=>x.provider==="composio"&&x.setup_status==="ready");let accounts:any[]=[];try{const raw=await composio(`/connected_accounts?user_ids=${encodeURIComponent(userId)}&limit=100`);accounts=listData(raw)}catch(e){console.error("Curatia integration sync skipped",e);return accounts}for(const item of ready){const key=item.key;const a=accounts.find((x:any)=>(x.toolkit?.slug||x.toolkit_slug||x.toolkit)===key&&String(x.status).toUpperCase()==="ACTIVE");await rest("workspace_integrations",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=representation"},body:JSON.stringify({workspace_id:wid,integration_key:key,provider:item.provider,status:a?"connected":"not_connected",account_label:a?.display_name||a?.alias||item.display_name,provider_connection_ref:a?.id||a?.nanoid||null,metadata:{toolkit:key},connected_at:a?new Date().toISOString():null,updated_at:new Date().toISOString()})})}return accounts}
export const getCuratiaIntegrations=createServerFn({method:"POST"}).validator(onboardingToken).handler(async({data}):Promise<CuratiaIntegration[]>=>{
 const{user,wid}=await curatiaContext(data.accessToken);await syncComposio(user.id,wid);const catalog=await integrationCatalog();const rows=await rest(`workspace_integrations?select=integration_key,provider,status,account_label,connected_at,provider_connection_ref&workspace_id=eq.${encodeURIComponent(wid)}`);const byKey=new Map((rows||[]).map((x:any)=>[x.integration_key,x]));return catalog.map((item:any)=>{const x:any=byKey.get(item.key);return{key:item.key,label:item.display_name,provider:item.provider,category:item.category,status:x?.status||"not_connected",setupStatus:item.setup_status,accountLabel:x?.account_label||null,connectedAt:x?.connected_at||null,connectionId:x?.provider_connection_ref||null,capabilities:item.capabilities||[]}})
});
const catalogMutationInput=z.object({accessToken:z.string().min(20),key:z.string().regex(/^[a-z0-9_-]+$/).max(80),displayName:z.string().min(1).max(100),category:z.string().min(1).max(100),provider:z.literal("composio"),setupStatus:z.enum(["ready","setup_required","disabled"]),capabilities:z.array(z.string().min(1).max(100)).max(20),description:z.string().max(500).optional(),toolkitSlug:z.string().max(100).optional(),active:z.boolean()});
async function requirePlatformOwner(accessToken:string){const ctx=await curatiaContext(accessToken);const profiles=await rest(`profiles?select=platform_role&user_id=eq.${encodeURIComponent(ctx.user.id)}&limit=1`);if(profiles?.[0]?.platform_role!=="platform_owner")throw new Error("Platform Owner access is required.");return ctx}
export const getCuratiaIntegrationAdmin=createServerFn({method:"POST"}).validator(onboardingToken).handler(async({data}):Promise<CuratiaIntegrationAdmin>=>{
 const{user}=await curatiaContext(data.accessToken);const profiles=await rest(`profiles?select=platform_role&user_id=eq.${encodeURIComponent(user.id)}&limit=1`);const isPlatformOwner=profiles?.[0]?.platform_role==="platform_owner";if(!isPlatformOwner)return{isPlatformOwner:false,catalog:[]};const rows=await rest("integration_catalog?select=key,display_name,category,provider,active,setup_status,capabilities,description,toolkit_slug,auth_config_ref&order=sort_order,key");return{isPlatformOwner:true,catalog:(rows||[]).map((item:any)=>({key:item.key,label:item.display_name,provider:item.provider,category:item.category,status:"not_connected",setupStatus:item.setup_status,accountLabel:null,connectedAt:null,capabilities:item.capabilities||[],description:item.description||null,toolkitSlug:item.toolkit_slug||item.key,authConfigRef:item.auth_config_ref||null,active:item.active}))}
});
export const saveCuratiaIntegrationCatalogItem=createServerFn({method:"POST"}).validator(catalogMutationInput).handler(async({data})=>{
 await requirePlatformOwner(data.accessToken);await rest("integration_catalog",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=representation"},body:JSON.stringify({key:data.key,display_name:data.displayName,category:data.category,provider:data.provider,active:data.active,setup_status:data.setupStatus,capabilities:data.capabilities,description:data.description||null,toolkit_slug:data.toolkitSlug||data.key,updated_at:new Date().toISOString()})});return{ok:true}
});
export const verifyCuratiaIntegrationProvider=createServerFn({method:"POST"}).validator(integrationInput).handler(async({data})=>{
 await requirePlatformOwner(data.accessToken);const rows=await rest(`integration_catalog?select=key,display_name,provider,toolkit_slug&key=eq.${encodeURIComponent(data.integrationKey)}&limit=1`);const item=rows?.[0];if(!item)throw new Error("Integration was not found in the catalog.");if(item.provider==="cloudflare"){const ready=Boolean(process.env.CLOUDFLARE_ACCOUNT_ID&&process.env.CLOUDFLARE_API_TOKEN);await rest(`integration_catalog?key=eq.${encodeURIComponent(item.key)}`,{method:"PATCH",body:JSON.stringify({setup_status:ready?"ready":"setup_required",auth_config_ref:ready?"server-env":null,updated_at:new Date().toISOString()})});return{ready,message:ready?`${item.display_name} server credentials are configured.`:`Add CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN to the server environment.`}}if(item.provider!=="composio")throw new Error("Provider verification is not supported for this integration.");const slug=item.toolkit_slug||item.key;const configs=listData(await composio(`/auth_configs?toolkit_slug=${encodeURIComponent(slug)}&limit=100`));const cfg=configs.find((x:any)=>(x.toolkit?.slug||x.toolkit_slug||x.toolkit)===slug&&(x.status===undefined||String(x.status).toUpperCase()!=="DISABLED"));if(!cfg){await rest(`integration_catalog?key=eq.${encodeURIComponent(item.key)}`,{method:"PATCH",body:JSON.stringify({setup_status:"setup_required",auth_config_ref:null,updated_at:new Date().toISOString()})});return{ready:false,message:`No enabled provider configuration was found for ${item.display_name}.`}}const ref=cfg.id||cfg.nanoid||cfg.auth_config?.id||null;await rest(`integration_catalog?key=eq.${encodeURIComponent(item.key)}`,{method:"PATCH",body:JSON.stringify({setup_status:"ready",auth_config_ref:ref,updated_at:new Date().toISOString()})});return{ready:true,message:`${item.display_name} provider configuration is ready.`}
});
export const connectCuratiaIntegration=createServerFn({method:"POST"}).validator(integrationInput).handler(async({data})=>{
 const{user,wid}=await curatiaContext(data.accessToken);const catalog=await integrationCatalog();const item=catalog.find((x:any)=>x.key===data.integrationKey);if(!item)throw new Error("This integration is not available in Curatia.");if(item.setup_status!=="ready")throw new Error(`${item.display_name} requires provider setup before it can be connected.`);if(item.provider!=="composio")throw new Error("This integration provider is not supported yet.");const slug=item.toolkit_slug||item.key;const configsRaw=await composio(`/auth_configs?toolkit_slug=${encodeURIComponent(slug)}&limit=100`);const configs=listData(configsRaw);const cfg=configs.find((x:any)=>(x.toolkit?.slug||x.toolkit_slug||x.toolkit)===slug&&(x.status===undefined||String(x.status).toUpperCase()!=="DISABLED"));if(!cfg)throw new Error(`${item.display_name} requires provider setup before it can be connected.`);
 const authConfigId=cfg.id||cfg.nanoid||cfg.auth_config?.id;const link=await composio("/connected_accounts/link",{method:"POST",body:JSON.stringify({auth_config_id:authConfigId,user_id:user.id,callback_url:"https://guilhermecosta.tech/curatia-content-engine?integration=complete"})});
 await rest("workspace_integrations",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=representation"},body:JSON.stringify({workspace_id:wid,integration_key:data.integrationKey,provider:item.provider,status:"not_connected",account_label:item.display_name,provider_connection_ref:link.connected_account_id||null,metadata:{pending:true},updated_at:new Date().toISOString()})});return{redirectUrl:link.redirect_url,expiresAt:link.expires_at};
});
export const disconnectCuratiaIntegration=createServerFn({method:"POST"}).validator(integrationInput).handler(async({data})=>{
 const{wid}=await curatiaContext(data.accessToken);const rows=await rest(`workspace_integrations?select=provider_connection_ref&workspace_id=eq.${encodeURIComponent(wid)}&integration_key=eq.${encodeURIComponent(data.integrationKey)}&limit=1`);const id=rows?.[0]?.provider_connection_ref;if(id)await composio(`/connected_accounts/${encodeURIComponent(id)}`,{method:"DELETE"});await rest(`workspace_integrations?workspace_id=eq.${encodeURIComponent(wid)}&integration_key=eq.${encodeURIComponent(data.integrationKey)}`,{method:"PATCH",body:JSON.stringify({status:"not_connected",provider_connection_ref:null,connected_at:null,updated_at:new Date().toISOString()})});return{ok:true};
});
