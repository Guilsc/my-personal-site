const SUPABASE_URL="https://jzceajrfqtrdemptlfbp.supabase.co";
const SUPABASE_KEY="sb_publishable_tublhoJa1W1NDqxzwCds4A_jRXJHM3r";
const STORAGE_KEY="curatia.auth.session";
type AuthUser={id:string;email?:string;user_metadata?:Record<string,unknown>};
export type CuratiaSession={access_token:string;refresh_token:string;expires_at?:number;user:AuthUser};
type Listener=(session:CuratiaSession|null)=>void;
const listeners=new Set<Listener>();
function emit(s:CuratiaSession|null){listeners.forEach(fn=>fn(s))}
function save(s:CuratiaSession|null){if(typeof window==="undefined")return;if(s)localStorage.setItem(STORAGE_KEY,JSON.stringify(s));else localStorage.removeItem(STORAGE_KEY);emit(s)}
function read():CuratiaSession|null{if(typeof window==="undefined")return null;try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"null")}catch{return null}}
async function authFetch(path:string,init?:RequestInit){const r=await fetch(SUPABASE_URL+"/auth/v1/"+path,{...init,headers:{apikey:SUPABASE_KEY,"Content-Type":"application/json",...(init?.headers||{})}});const body=await r.json().catch(()=>({}));if(!r.ok)throw new Error(body?.msg||body?.error_description||body?.message||"Authentication failed.");return body}
function sessionFromBody(body:any):CuratiaSession{const s={...body,expires_at:body.expires_at||Math.floor(Date.now()/1000)+(body.expires_in||3600)} as CuratiaSession;save(s);return s}
async function refresh(s:CuratiaSession){if(!s.refresh_token)return s;const body=await authFetch("token?grant_type=refresh_token",{method:"POST",body:JSON.stringify({refresh_token:s.refresh_token})});return sessionFromBody(body)}
async function getSession(){let s=read();if(s?.expires_at&&s.expires_at<Date.now()/1000+60){try{s=await refresh(s)}catch{save(null);s=null}}return s}
async function signInWithOtp(email:string,redirectTo:string){const redirect=new URL(redirectTo);await authFetch(`otp?redirect_to=${encodeURIComponent(redirect.toString())}`,{method:"POST",body:JSON.stringify({email,create_user:true,gotrue_meta_security:{captcha_token:null},data:{}})})}
async function signInWithOAuth(provider:"github"|"google",redirectTo:string){const u=new URL(SUPABASE_URL+"/auth/v1/authorize");u.searchParams.set("provider",provider);u.searchParams.set("redirect_to",redirectTo);location.assign(u.toString())}
async function consumeUrl():Promise<CuratiaSession|null>{if(typeof window==="undefined")return null;const hash=new URLSearchParams(location.hash.replace(/^#/,""));const access=hash.get("access_token");const refreshToken=hash.get("refresh_token");if(access&&refreshToken){const user=await authFetch("user",{headers:{Authorization:`Bearer ${access}`}});const s={access_token:access,refresh_token:refreshToken,expires_at:Math.floor(Date.now()/1000)+Number(hash.get("expires_in")||3600),user} as CuratiaSession;save(s);history.replaceState({},document.title,location.pathname);return s}const error=new URLSearchParams(location.search).get("error_description");if(error){history.replaceState({},document.title,location.pathname);throw new Error(error)}return getSession()}
async function signOut(){const s=read();try{if(s?.access_token)await authFetch("logout",{method:"POST",headers:{Authorization:`Bearer ${s.access_token}`}})}finally{save(null)}}
export const curatiaAuth={getSession,consumeUrl,signInWithOtp,signInWithOAuth,signOut,onChange(fn:Listener){listeners.add(fn);return()=>listeners.delete(fn)}};
