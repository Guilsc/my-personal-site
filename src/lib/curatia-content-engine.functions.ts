import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type CuratiaSignal={id:string;title:string;summary:string|null;state:"New"|"Watch"|"Explore"|"Promoted"|"Ignored"|"Archived";detected_at:string;first_published_at:string|null;why_it_may_matter:string|null;evidence_strength:string|null;saturation:string|null};
export type CuratiaContentItem={id:string;title:string;series:string|null;topic:string|null;publishing_channel:string;core_idea:string|null;status:"Idea"|"Candidate"|"Research"|"Draft"|"Visual Ready"|"Approved"|"Scheduled"|"Published"|"Learning";target_date:string|null;publication_date:string|null;publication_time:string|null;draft_copy:string|null;final_copy:string|null;visual_concept:string|null;visual_brief:string|null;final_visual_reference:string|null;updated_at:string};
export type CuratiaDashboard={signals:CuratiaSignal[];contentItems:CuratiaContentItem[];sourceCount:number};
export type CuratiaBootstrap={workspaceId:string;userId:string;email:string|null;displayName:string|null};

function config(){const url=process.env["SUPABASE_URL"]?.replace(/\/$/,"");const key=process.env["SUPABASE_SECRET_KEY"];if(!url||!key)throw new Error("Curatia is not configured.");return{url,key}}
async function rest(path:string,init?:RequestInit){const{url,key}=config();const response=await fetch(url+"/rest/v1/"+path,{...init,headers:{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json",Prefer:"return=representation",...(init?.headers||{})}});if(!response.ok)throw new Error(`Curatia data request failed (${response.status}).`);if(response.status===204)return null;const text=await response.text();return text?JSON.parse(text):null}

export const getCuratiaDashboard=createServerFn({method:"GET"}).handler(async():Promise<CuratiaDashboard>=>{
 const [signals,contentItems,sources]=await Promise.all([
  rest("signals?select=id,title,summary,state,detected_at,first_published_at,why_it_may_matter,evidence_strength,saturation&state=in.(New,Watch,Explore)&order=detected_at.desc"),
  rest("content_items?select=id,title,series,topic,publishing_channel,core_idea,status,target_date,publication_date,publication_time,draft_copy,final_copy,visual_concept,visual_brief,final_visual_reference,updated_at&order=updated_at.desc"),
  rest("sources?select=id")
 ]);
 return{signals,contentItems,sourceCount:Array.isArray(sources)?sources.length:0};
});

const signalInput=z.object({id:z.string().uuid(),state:z.enum(["Watch","Explore","Ignored"])});
export const updateSignalState=createServerFn({method:"POST"}).validator(signalInput).handler(async({data})=>{
 const body:any={state:data.state};if(data.state==="Ignored")body.ignored_at=new Date().toISOString();
 return rest(`signals?id=eq.${encodeURIComponent(data.id)}`,{method:"PATCH",body:JSON.stringify(body)});
});

const contentInput=z.object({id:z.string().min(1),status:z.enum(["Candidate","Research","Draft","Visual Ready"])});
export const updateContentStatus=createServerFn({method:"POST"}).validator(contentInput).handler(async({data})=>{
 const current=await rest(`content_items?select=status&id=eq.${encodeURIComponent(data.id)}`);
 if(!Array.isArray(current)||!current[0])throw new Error("Content item not found.");
 const allowed:Record<string,string[]>={Idea:["Candidate"],Candidate:["Research"],Research:["Draft"],Draft:["Visual Ready"]};
 if(!allowed[current[0].status]?.includes(data.status))throw new Error("Invalid lifecycle transition.");
 return rest(`content_items?id=eq.${encodeURIComponent(data.id)}`,{method:"PATCH",body:JSON.stringify({status:data.status})});
});
const visualInput=z.object({id:z.string().min(1),visualConcept:z.string().max(1200),visualBrief:z.string().max(3000)});
export const updateContentVisual=createServerFn({method:"POST"}).validator(visualInput).handler(async({data})=>rest(`content_items?id=eq.${encodeURIComponent(data.id)}`,{method:"PATCH",body:JSON.stringify({visual_concept:data.visualConcept||null,visual_brief:data.visualBrief||null,updated_at:new Date().toISOString()})}));



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


export type CuratiaOnboarding={completed:boolean;email:string;workspaceId:string;workspaceName:string;displayName:string;roleTitle:string;bio:string;avatarUrl:string;contentTerritories:string[];primaryAudience:string;secondaryAudiences:string[];audienceOutcomes:string[];languages:string[];interests:string[];watchlists:string[];channels:string[];primaryChannel:string;voiceTone:string;voiceNotes:string;approvalRequired:boolean;schedulingAllowed:boolean};
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
  rest(`workspace_preferences?select=primary_audience,secondary_audiences,audience_outcomes,languages,voice_preferences,publishing_preferences,discovery_watchlists&workspace_id=eq.${encodeURIComponent(wid)}&limit=1`),
  rest(`discovery_interests?select=label&workspace_id=eq.${encodeURIComponent(wid)}&active=eq.true&order=created_at`),
  rest(`workspace_channels?select=channel_key,enabled,is_primary&workspace_id=eq.${encodeURIComponent(wid)}&enabled=eq.true`)
 ]);
 const p=profiles?.[0]||{},w=workspaces?.[0]||{},x=prefs?.[0]||{},voice=x.voice_preferences||{},pub=x.publishing_preferences||{};
 return{completed:Boolean(p.onboarding_completed_at&&w.onboarding_completed_at),email:user.email||"",workspaceId:wid,workspaceName:w.name||"Curatia",displayName:p.display_name||user.user_metadata?.full_name||"",roleTitle:p.role_title||"",bio:p.bio||"",avatarUrl:p.avatar_url||user.user_metadata?.avatar_url||"",contentTerritories:voice.content_territories||[],primaryAudience:x.primary_audience||"",secondaryAudiences:x.secondary_audiences||[],audienceOutcomes:x.audience_outcomes||[],languages:x.languages||["English"],interests:(interests||[]).map((i:any)=>i.label),watchlists:x.discovery_watchlists||["agentic_ai"],channels:(channels||[]).map((c:any)=>c.channel_key),primaryChannel:(channels||[]).find((c:any)=>c.is_primary)?.channel_key||"linkedin",voiceTone:voice.tone||"Professional, Conversational, Clear, Practical",voiceNotes:voice.notes||"",approvalRequired:pub.approval_required!==false,schedulingAllowed:Boolean(pub.scheduling_allowed)};
});
const onboardingSave=z.object({accessToken:z.string().min(20),displayName:z.string().min(1).max(120),roleTitle:z.string().max(160),bio:z.string().max(1200),workspaceName:z.string().min(1).max(120),contentTerritories:z.array(z.string().min(1).max(120)).max(12),primaryAudience:z.string().max(240),secondaryAudiences:z.array(z.string().min(1).max(160)).max(10),audienceOutcomes:z.array(z.string().min(1).max(120)).max(10),languages:z.array(z.string().min(1).max(80)).min(1).max(8),interests:z.array(z.string().min(1).max(120)).max(20),watchlists:z.array(z.enum(["agentic_ai"])).max(10),channels:z.array(z.enum(["linkedin","instagram","x","tiktok","youtube","podcast","newsletter","blog"])).min(1),primaryChannel:z.enum(["linkedin","instagram","x","tiktok","youtube","podcast","newsletter","blog"]),voiceTone:z.string().max(160),voiceNotes:z.string().max(1200),approvalRequired:z.literal(true),schedulingAllowed:z.boolean()});
export const completeCuratiaOnboarding=createServerFn({method:"POST"}).validator(onboardingSave).handler(async({data})=>{
 const user=await verifiedUser(data.accessToken);const members=await rest(`workspace_members?select=workspace_id&user_id=eq.${encodeURIComponent(user.id)}&limit=1`);if(!Array.isArray(members)||!members[0])throw new Error("Curatia workspace membership was not found.");const wid=members[0].workspace_id;const now=new Date().toISOString();
 await rest(`profiles?user_id=eq.${encodeURIComponent(user.id)}`,{method:"PATCH",body:JSON.stringify({display_name:data.displayName,role_title:data.roleTitle||null,bio:data.bio||null,avatar_url:user.user_metadata?.avatar_url||null,onboarding_completed_at:now,updated_at:now})});
 await rest(`workspaces?id=eq.${encodeURIComponent(wid)}`,{method:"PATCH",body:JSON.stringify({name:data.workspaceName,onboarding_completed_at:now,updated_at:now})});
 await rest(`workspace_preferences`,{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=representation"},body:JSON.stringify({workspace_id:wid,primary_audience:data.primaryAudience,secondary_audiences:data.secondaryAudiences,audience_outcomes:data.audienceOutcomes,languages:data.languages,voice_preferences:{tone:data.voiceTone,notes:data.voiceNotes,content_territories:data.contentTerritories},publishing_preferences:{approval_required:true,scheduling_allowed:data.schedulingAllowed},discovery_watchlists:data.watchlists,preference_provenance:{content_focus:data.contentTerritories.length?"user_confirmed":"system_default",audience:(data.primaryAudience||data.secondaryAudiences.length)?"user_confirmed":"system_default",discovery_interests:data.interests.length?"user_confirmed":"system_default",channels:"user_confirmed",voice:data.voiceTone?"user_confirmed":"system_default",languages:"user_confirmed",publishing:"system_default"},updated_at:now})});
 await rest(`discovery_interests?workspace_id=eq.${encodeURIComponent(wid)}`,{method:"DELETE"});
 for(const label of data.interests){await rest("discovery_interests",{method:"POST",body:JSON.stringify({workspace_id:wid,label,normalized_label:label.trim().toLowerCase(),source:"user_confirmed",active:true,created_by:user.id})})}
 await rest(`workspace_channels?workspace_id=eq.${encodeURIComponent(wid)}`,{method:"PATCH",body:JSON.stringify({enabled:false,is_primary:false,updated_at:now})});
 for(const key of data.channels){await rest("workspace_channels",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=representation"},body:JSON.stringify({workspace_id:wid,channel_key:key,enabled:true,is_primary:key===data.primaryChannel,updated_at:now})})}
 return{ok:true};
});

const generateVisualInput=z.object({id:z.string().min(1),prompt:z.string().min(1).max(10000),aspectRatio:z.enum(["1:1","4:5","16:9","9:16"]).default("4:5")});
export const generateContentVisual=createServerFn({method:"POST"}).validator(generateVisualInput).handler(async({data})=>{
 const apiKey=process.env.HF_API_KEY;if(!apiKey)throw new Error("Higgsfield API key is not configured.");
 const auth=`Key ${apiKey}`;const submit=await fetch("https://api.higgsfield.ai/recraft/v4.1/text-to-image",{method:"POST",headers:{Authorization:auth,"Content-Type":"application/json"},body:JSON.stringify({prompt:data.prompt,resolution:"1k",aspect_ratio:data.aspectRatio,output_format:"png"})});
 const raw=await submit.text();let job:any={};try{job=raw?JSON.parse(raw):{}}catch{}if(!submit.ok)throw new Error(job?.message||job?.error||`Image generation failed (${submit.status}).`);
 const statusUrl=job.status_url||`https://api.higgsfield.ai/requests/${job.request_id}/status`;let result:any=job;
 for(let n=0;n<45;n++){const images=result?.images;if(Array.isArray(images)&&images.length)break;const state=String(result?.status||"").toLowerCase();if(["failed","error","cancelled"].includes(state))throw new Error(result?.error?.message||result?.message||"Image generation failed.");await new Promise(x=>setTimeout(x,2000));const sr=await fetch(statusUrl,{headers:{Authorization:auth}});const st=await sr.text();try{result=st?JSON.parse(st):{}}catch{result={}}if(!sr.ok)throw new Error(`Image status failed (${sr.status}).`)}
 const first=result?.images?.[0];const assetUrl=typeof first==="string"?first:first?.url||first?.image_url;if(!assetUrl)throw new Error("Image generation is still processing. Try again shortly.");
 const existing=await rest(`content_visual_assets?select=version&content_item_id=eq.${encodeURIComponent(data.id)}&order=version.desc&limit=1`);const version=(Array.isArray(existing)&&existing[0]?.version?Number(existing[0].version):0)+1;const rows=await rest(`content_items?select=workspace_id&id=eq.${encodeURIComponent(data.id)}&limit=1`);const workspaceId=Array.isArray(rows)&&rows[0]?.workspace_id||null;
 await rest(`content_visual_assets?content_item_id=eq.${encodeURIComponent(data.id)}`,{method:"PATCH",body:JSON.stringify({selected:false})});await rest("content_visual_assets",{method:"POST",body:JSON.stringify({content_item_id:data.id,workspace_id:workspaceId,version,source:"generated",prompt:data.prompt,asset_url:assetUrl,selected:true,provider:"higgsfield",provider_asset_ref:job.request_id||null})});await rest(`content_items?id=eq.${encodeURIComponent(data.id)}`,{method:"PATCH",body:JSON.stringify({visual_brief:data.prompt,final_visual_reference:assetUrl,updated_at:new Date().toISOString()})});return{assetUrl,version};
});

export type CuratiaIntegration={key:string;label:string;provider:string;status:"connected"|"not_connected"|"error";accountLabel:string|null;connectedAt:string|null;connectionId?:string|null;capabilities:string[]};
const integrationInput=z.object({accessToken:z.string().min(20),integrationKey:z.enum(["gmail","googledrive","github","linkedin"])});
const integrationNames:Record<string,string>={gmail:"Gmail",googledrive:"Google Drive",github:"GitHub",linkedin:"LinkedIn",metricool:"Metricool"};
function composioConfig(){const apiKey=process.env.COMPOSIO_API_KEY;if(!apiKey)throw new Error("COMPOSIO_API_KEY is not configured.");return{apiKey,base:"https://backend.composio.dev/api/v3.1"}}
async function composio(path:string,init?:RequestInit){const{apiKey,base}=composioConfig();const r=await fetch(base+path,{...init,headers:{"x-api-key":apiKey,"Content-Type":"application/json",...(init?.headers||{})}});const text=await r.text();let body:any={};try{body=text?JSON.parse(text):{}}catch{body={message:text}}if(!r.ok)throw new Error(body?.error?.message||body?.message||`Composio request failed (${r.status}).`);return body}
async function curatiaContext(accessToken:string){const user=await verifiedUser(accessToken);const members=await rest(`workspace_members?select=workspace_id&user_id=eq.${encodeURIComponent(user.id)}&limit=1`);if(!Array.isArray(members)||!members[0])throw new Error("Curatia workspace membership was not found.");return{user,wid:members[0].workspace_id}}
function listData(x:any){return x?.items||x?.data?.items||x?.data||x?.connected_accounts||x?.auth_configs||[]}
async function syncComposio(userId:string,wid:string){const raw=await composio(`/connected_accounts?user_ids=${encodeURIComponent(userId)}&limit=100`);const accounts=listData(raw);const keys=["gmail","googledrive","github","linkedin"];for(const key of keys){const a=accounts.find((x:any)=>(x.toolkit?.slug||x.toolkit_slug||x.toolkit)===key&&String(x.status).toUpperCase()==="ACTIVE");await rest("workspace_integrations",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=representation"},body:JSON.stringify({workspace_id:wid,integration_key:key,provider:"composio",status:a?"connected":"not_connected",account_label:a?.display_name||a?.alias||integrationNames[key],provider_connection_ref:a?.id||a?.nanoid||null,metadata:{toolkit:key},connected_at:a?new Date().toISOString():null,updated_at:new Date().toISOString()})})}return accounts}
export const getCuratiaIntegrations=createServerFn({method:"POST"}).validator(onboardingToken).handler(async({data}):Promise<CuratiaIntegration[]>=>{
 const{user,wid}=await curatiaContext(data.accessToken);try{await syncComposio(user.id,wid)}catch(e){console.error("Curatia integration sync failed",e)}
 const rows=await rest(`workspace_integrations?select=integration_key,provider,status,account_label,connected_at,provider_connection_ref&workspace_id=eq.${encodeURIComponent(wid)}&order=integration_key`);
 const caps:Record<string,string[]>={gmail:["Read mail","Send mail"],googledrive:["Search","Read files"],github:["Repositories"],linkedin:["Profile","Publishing"],metricool:["Scheduling","Publishing"]};
 return(rows||[]).map((x:any)=>({key:x.integration_key,label:integrationNames[x.integration_key]||x.integration_key,provider:x.provider,status:x.status,accountLabel:x.account_label,connectedAt:x.connected_at,connectionId:x.provider_connection_ref,capabilities:caps[x.integration_key]||[]}));
});
export const connectCuratiaIntegration=createServerFn({method:"POST"}).validator(integrationInput).handler(async({data})=>{
 const{user,wid}=await curatiaContext(data.accessToken);const configsRaw=await composio(`/auth_configs?toolkit_slug=${encodeURIComponent(data.integrationKey)}&limit=100`);const configs=listData(configsRaw);const cfg=configs.find((x:any)=>(x.toolkit?.slug||x.toolkit_slug||x.toolkit)===data.integrationKey&&(x.status===undefined||String(x.status).toUpperCase()!=="DISABLED"));if(!cfg)throw new Error(`No enabled Composio auth config exists for ${integrationNames[data.integrationKey]}.`);
 const authConfigId=cfg.id||cfg.nanoid||cfg.auth_config?.id;const link=await composio("/connected_accounts/link",{method:"POST",body:JSON.stringify({auth_config_id:authConfigId,user_id:user.id,callback_url:"https://guilhermecosta.tech/curatia-content-engine?integration=complete"})});
 await rest("workspace_integrations",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=representation"},body:JSON.stringify({workspace_id:wid,integration_key:data.integrationKey,provider:"composio",status:"not_connected",account_label:integrationNames[data.integrationKey],provider_connection_ref:link.connected_account_id||null,metadata:{pending:true},updated_at:new Date().toISOString()})});
 return{redirectUrl:link.redirect_url,expiresAt:link.expires_at};
});
export const disconnectCuratiaIntegration=createServerFn({method:"POST"}).validator(integrationInput).handler(async({data})=>{
 const{user,wid}=await curatiaContext(data.accessToken);await syncComposio(user.id,wid);const rows=await rest(`workspace_integrations?select=provider_connection_ref&workspace_id=eq.${encodeURIComponent(wid)}&integration_key=eq.${encodeURIComponent(data.integrationKey)}&limit=1`);const id=rows?.[0]?.provider_connection_ref;if(id)await composio(`/connected_accounts/${encodeURIComponent(id)}`,{method:"DELETE"});await rest(`workspace_integrations?workspace_id=eq.${encodeURIComponent(wid)}&integration_key=eq.${encodeURIComponent(data.integrationKey)}`,{method:"PATCH",body:JSON.stringify({status:"not_connected",provider_connection_ref:null,connected_at:null,updated_at:new Date().toISOString()})});return{ok:true};
});
