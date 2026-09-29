import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type CuratiaSignal={id:string;title:string;summary:string|null;state:"New"|"Watch"|"Explore"|"Promoted"|"Ignored"|"Archived";detected_at:string;first_published_at:string|null;why_it_may_matter:string|null;evidence_strength:string|null;saturation:string|null};
export type CuratiaContentItem={id:string;title:string;series:string|null;topic:string|null;status:"Idea"|"Candidate"|"Research"|"Draft"|"Visual Ready"|"Approved"|"Scheduled"|"Published"|"Learning";target_date:string|null;publication_date:string|null;publication_time:string|null;updated_at:string};
export type CuratiaDashboard={signals:CuratiaSignal[];contentItems:CuratiaContentItem[];sourceCount:number};
export type CuratiaBootstrap={workspaceId:string;userId:string;email:string|null;displayName:string|null};

function config(){const url=process.env["SUPABASE_URL"]?.replace(/\/$/,"");const key=process.env["SUPABASE_SECRET_KEY"];if(!url||!key)throw new Error("Curatia is not configured.");return{url,key}}
async function rest(path:string,init?:RequestInit){const{url,key}=config();const response=await fetch(url+"/rest/v1/"+path,{...init,headers:{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json",Prefer:"return=representation",...(init?.headers||{})}});if(!response.ok)throw new Error(`Curatia data request failed (${response.status}).`);if(response.status===204)return null;const text=await response.text();return text?JSON.parse(text):null}

export const getCuratiaDashboard=createServerFn({method:"GET"}).handler(async():Promise<CuratiaDashboard>=>{
 const [signals,contentItems,sources]=await Promise.all([
  rest("signals?select=id,title,summary,state,detected_at,first_published_at,why_it_may_matter,evidence_strength,saturation&state=in.(New,Watch,Explore)&order=detected_at.desc"),
  rest("content_items?select=id,title,series,topic,status,target_date,publication_date,publication_time,updated_at&order=updated_at.desc"),
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


export type CuratiaOnboarding={completed:boolean;workspaceId:string;workspaceName:string;displayName:string;roleTitle:string;bio:string;avatarUrl:string;primaryAudience:string;secondaryAudiences:string[];audienceOutcomes:string[];languages:string[];interests:string[];channels:string[];primaryChannel:string;voiceTone:string;voiceNotes:string;approvalRequired:boolean;schedulingAllowed:boolean};
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
  rest(`workspace_preferences?select=primary_audience,secondary_audiences,audience_outcomes,languages,voice_preferences,publishing_preferences&workspace_id=eq.${encodeURIComponent(wid)}&limit=1`),
  rest(`discovery_interests?select=label&workspace_id=eq.${encodeURIComponent(wid)}&active=eq.true&order=created_at`),
  rest(`workspace_channels?select=channel_key,enabled,is_primary&workspace_id=eq.${encodeURIComponent(wid)}&enabled=eq.true`)
 ]);
 const p=profiles?.[0]||{},w=workspaces?.[0]||{},x=prefs?.[0]||{},voice=x.voice_preferences||{},pub=x.publishing_preferences||{};
 return{completed:Boolean(p.onboarding_completed_at&&w.onboarding_completed_at),workspaceId:wid,workspaceName:w.name||"Curatia",displayName:p.display_name||user.user_metadata?.full_name||"",roleTitle:p.role_title||"",bio:p.bio||"",avatarUrl:p.avatar_url||user.user_metadata?.avatar_url||"",primaryAudience:x.primary_audience||"",secondaryAudiences:x.secondary_audiences||[],audienceOutcomes:x.audience_outcomes||[],languages:x.languages||["English"],interests:(interests||[]).map((i:any)=>i.label),channels:(channels||[]).map((c:any)=>c.channel_key),primaryChannel:(channels||[]).find((c:any)=>c.is_primary)?.channel_key||"linkedin",voiceTone:voice.tone||"",voiceNotes:voice.notes||"",approvalRequired:pub.approval_required!==false,schedulingAllowed:Boolean(pub.scheduling_allowed)};
});
const onboardingSave=z.object({accessToken:z.string().min(20),displayName:z.string().min(1).max(120),roleTitle:z.string().max(160),bio:z.string().max(1200),workspaceName:z.string().min(1).max(120),primaryAudience:z.string().min(1).max(240),secondaryAudiences:z.array(z.string().min(1).max(160)).max(10),audienceOutcomes:z.array(z.string().min(1).max(120)).max(10),languages:z.array(z.string().min(1).max(80)).min(1).max(8),interests:z.array(z.string().min(1).max(120)).max(20),channels:z.array(z.enum(["linkedin","instagram","x","tiktok","medium"])).min(1),primaryChannel:z.enum(["linkedin","instagram","x","tiktok","medium"]),voiceTone:z.string().max(160),voiceNotes:z.string().max(1200),approvalRequired:z.literal(true),schedulingAllowed:z.boolean()});
export const completeCuratiaOnboarding=createServerFn({method:"POST"}).validator(onboardingSave).handler(async({data})=>{
 const user=await verifiedUser(data.accessToken);const members=await rest(`workspace_members?select=workspace_id&user_id=eq.${encodeURIComponent(user.id)}&limit=1`);if(!Array.isArray(members)||!members[0])throw new Error("Curatia workspace membership was not found.");const wid=members[0].workspace_id;const now=new Date().toISOString();
 await rest(`profiles?user_id=eq.${encodeURIComponent(user.id)}`,{method:"PATCH",body:JSON.stringify({display_name:data.displayName,role_title:data.roleTitle||null,bio:data.bio||null,avatar_url:user.user_metadata?.avatar_url||null,onboarding_completed_at:now,updated_at:now})});
 await rest(`workspaces?id=eq.${encodeURIComponent(wid)}`,{method:"PATCH",body:JSON.stringify({name:data.workspaceName,onboarding_completed_at:now,updated_at:now})});
 await rest(`workspace_preferences`,{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=representation"},body:JSON.stringify({workspace_id:wid,primary_audience:data.primaryAudience,secondary_audiences:data.secondaryAudiences,audience_outcomes:data.audienceOutcomes,languages:data.languages,voice_preferences:{tone:data.voiceTone,notes:data.voiceNotes},publishing_preferences:{approval_required:true,scheduling_allowed:data.schedulingAllowed},updated_at:now})});
 await rest(`discovery_interests?workspace_id=eq.${encodeURIComponent(wid)}`,{method:"DELETE"});
 for(const label of data.interests){await rest("discovery_interests",{method:"POST",body:JSON.stringify({workspace_id:wid,label,normalized_label:label.trim().toLowerCase(),source:"onboarding",active:true,created_by:user.id})})}
 await rest(`workspace_channels?workspace_id=eq.${encodeURIComponent(wid)}`,{method:"PATCH",body:JSON.stringify({enabled:false,is_primary:false,updated_at:now})});
 for(const key of data.channels){await rest("workspace_channels",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=representation"},body:JSON.stringify({workspace_id:wid,channel_key:key,enabled:true,is_primary:key===data.primaryChannel,updated_at:now})})}
 return{ok:true};
});
