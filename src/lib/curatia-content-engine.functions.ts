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
