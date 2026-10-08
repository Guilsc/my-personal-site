'use strict';
let olympusSignalSelected=null;
let olympusFaceObserver;
let olympusFaceStart=0;
let olympusRequestNumber=0;
let olympusColorSequence=Number(sessionStorage.getItem('olympus-color-sequence'))||0;
let olympusSignalColor='102,231,255';
function nextOlympusSignalColor(){const hue=((olympusColorSequence++*137.508+190)%360)/60,s=.85,l=.65,c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs(hue%2-1)),m=l-c/2;const rgb=hue<1?[c,x,0]:hue<2?[x,c,0]:hue<3?[0,c,x]:hue<4?[0,x,c]:hue<5?[x,0,c]:[c,0,x];sessionStorage.setItem('olympus-color-sequence',String(olympusColorSequence));return rgb.map(v=>Math.round((v+m)*255)).join(',');}
let olympusRunning=false;
let olympusDemoMode='post';
let olympusElapsedSeconds=0,olympusClockAt=0,olympusClockPaused=false;
function olympusElapsed(){const now=performance.now();if(olympusRunning&&!paused&&!olympusClockPaused)olympusElapsedSeconds+=(now-olympusClockAt)/1000;olympusClockAt=now;olympusClockPaused=paused;return olympusElapsedSeconds;}
const olympusSignals=[
 {name:'Governor',alias:'Zeus',role:['Authority & boundaries','Autoridade e limites'],icon:'qa',x:170,y:120,points:[[395,258],[315,178],[270,178],[248,156]],detail:['Reviews the initiative. proceed, stop, or clarify preserves governance before coordination.','Revisa a iniciativa. proceed, stop ou clarify preserva a governança antes da coordenação.']},
 {name:'Orchestrator',alias:'Hermes',role:['Coordination & readiness','Coordenação e prontidão'],icon:'ai',x:830,y:120,points:[[605,258],[685,178],[730,178],[752,156]],detail:['Connects the minimum useful team, one Lead Owner, dependencies, and blockers. The logical Planning Room supplies specialist judgment; Initiative State describes the bounded plan.','Conecta a equipe mínima, um Lead Owner, dependências e bloqueios. O Planning Room lógico reúne julgamento especialista; Initiative State descreve o plano delimitado.']},
 {name:'Domain Owners',alias:['Six specialist contracts','Seis contratos especialistas'],role:['Owned work','Trabalho atribuído'],icon:'business',x:850,y:350,points:[[644,350],[708,350],[733,327],[752,327]],detail:['Select the relevant specialists; responsibility remains individual and explicit. Availability means a declarative contract, not a persistent agent instance.','Selecione os especialistas relevantes; a responsabilidade permanece individual e explícita. Disponibilidade significa um contrato declarativo, não uma instância persistente.']},
 {name:['Result','Resultado'],alias:['Artifact or refusal','Artefato ou recusa'],role:['Evidence returned','Evidências retornadas'],icon:'repo',x:830,y:580,points:[[606,442],[681,517],[730,517],[752,540]],detail:['The assigned specialist returns a bounded artifact or refusal. Host-side validation ends with this output; it does not imply persisted state or automated release.','O especialista retorna um artefato delimitado ou recusa. A validação no host termina nessa saída; não implica estado persistido ou publicação automática.']},
 {name:'Mnemosyne',alias:['Shared Second Brain','Segundo cérebro compartilhado'],role:['Reviewed knowledge','Conhecimento revisado'],icon:'bulb',x:170,y:580,points:[[394,442],[319,517],[270,517],[248,540]],future:true,detail:['Envisioned curated knowledge across initiatives. Context & Memory remains deferred. The dashed relationship describes the intended contribution, not implemented storage or retrieval.','Conhecimento curado previsto entre iniciativas. Context & Memory permanece adiado. A relação tracejada descreve a contribui\\u00e7ão pretendida, não armazenamento ou consulta implementados.']},
 {name:['Shared capabilities','Capacidades compartilhadas'],alias:['Skills & tools','Skills e ferramentas'],role:['Reusable capabilities','Capacidades reutilizáveis'],icon:'product',x:150,y:350,points:[[356,350],[292,350],[267,327],[248,327]],future:true,detail:['A planned capability layer for reusable Skills and tools. It does not establish an installed pool or execution authority. Communication and observability are also future layers.','Camada planejada de Skills e ferramentas reutilizáveis. Não estabelece um pool instalado ou autoridade de execução. Comunicação e observabilidade também são camadas futuras.']},
 {name:['Workers','Workers'],alias:['Temporary delegation','Delegação temporária'],role:['Bounded support','Apoio delimitado'],icon:'product',x:500,y:635,points:[[500,490],[500,579]],future:true,detail:['Reference only. Temporary delegation must solve a demonstrated need. A future Worker performs bounded work while its parent Owner remains accountable.','Somente referência. Delegação temporária precisa resolver uma necessidade demonstrada. Um Worker futuro executa trabalho delimitado enquanto seu Owner mantém a responsabilidade.']}
];
function olympusSignalText(value){return Array.isArray(value)?value[lang==='pt'?1:0]:value;}
function olympusStructure(){return `<div id="olympus-structure" class="olympus-structure" ${olympusView==='structure'?'':'hidden'}><p class="olympus-caption">${tr('An initiative at the center. Select a connection to explore what each role contributes. On small screens, scroll the map horizontally.','Uma iniciativa no centro. Selecione uma conexão para explorar a contribuição de cada papel. Em telas pequenas, deslize o mapa horizontalmente.')}</p><div class="olympus-signal-scroll" tabindex="0" role="region" aria-label="${tr('Olympus signal map, horizontally scrollable','Mapa de sinais do Olympus, rolagem horizontal')}"><div class="olympus-signal-map"><canvas id="olympus-signal-canvas" aria-hidden="true"></canvas><svg viewBox="-100 -80 1200 950" class="olympus-signal-lines" aria-hidden="true"><defs><marker id="olympus-user-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1L9 5L1 9" fill="none" stroke="#e0dad3"/></marker></defs><text x="280" y="80" class="olympus-request-label" text-anchor="middle">${tr('Request','Pedido')}</text>${olympusSignals.map((n,i)=>`<path data-signal-edge="${i}" ${i===7?'marker-end="url(#olympus-user-arrow)"':''} class="${n.future?'future-connection':''} ${i===olympusSignalSelected?'selected-connection':''}" d="${n.points.map((p,j)=>`${j?'L':'M'}${p[0]} ${p[1]}`).join(' ')}"/>`).join('')}<path class="olympus-return-line" d="M500 286L500 230"/></svg><div class="olympus-signal-center"><h3>Olympus</h3></div>${olympusSignals.map((n,i)=>`<button class="olympus-signal-node ${n.future?'future-node':''}" data-olympus-signal="${i}" aria-pressed="${i===olympusSignalSelected}" aria-controls="olympus-signal-detail" style="left:${(n.x+100)/12}%;top:${(n.y+80)/9.5}%">${i===7?olympusHumanAvatar():i===4?'<canvas id="mnemosyne-signal-canvas" aria-hidden="true"></canvas>':icon(n.icon)}<strong>${esc(olympusSignalText(n.name))}</strong><span>${esc(olympusSignalText(n.alias))}</span><small>${esc(olympusSignalText(n.role))}</small></button>`).join('')}</div></div>${olympusMiniTerminal()}${olympusExecutionConsole()}</div>`;}
let olympusPreviewObserver;
function fitOlympusPreview(root){olympusPreviewObserver?.disconnect();const frame=root.querySelector('.olympus-website-output iframe');if(!frame)return;const fit=()=>{const doc=frame.contentDocument;if(!doc?.body)return;const height=Math.ceil(doc.body.getBoundingClientRect().height)+2;frame.parentElement.style.setProperty('--preview-height',`${height}px`);};const observe=()=>{if(!frame.contentDocument?.body)return;olympusPreviewObserver?.disconnect();olympusPreviewObserver=new ResizeObserver(fit);olympusPreviewObserver.observe(frame.contentDocument.body);fit();frame.contentDocument.fonts?.ready.then(fit);};frame.addEventListener('load',observe);observe();}
function bindOlympusHub(){applyOlympusScenario();olympusFaceObserver?.disconnect();const root=$('#olympus-structure');if(!root)return;fitOlympusPreview(root);olympusFaceStart=time;olympusRequestNumber=0;olympusRunning=false;root.querySelector('[data-olympus-replay]')?.addEventListener('click',()=>{olympusRequestNumber++;olympusSignalColor=nextOlympusSignalColor();olympusRunning=true;olympusElapsedSeconds=0;olympusClockAt=performance.now();olympusClockPaused=paused;olympusFaceStart=time;draw();});root.querySelectorAll('[data-olympus-demo]').forEach(b=>{b.addEventListener('click',()=>{olympusDemoMode=b.dataset.olympusDemo;render({keepScroll:true});});b.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?'post':event.key==='End'?'website':olympusDemoMode==='post'?'website':'post';olympusDemoMode=next;render({keepScroll:true});document.querySelector(`[data-olympus-demo="${next}"]`).focus();});});const face=root.querySelector('.olympus-face-turn');if(face){olympusFaceObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){if(!olympusRunning)olympusFaceStart=time;face.classList.add('face-visible');draw();olympusFaceObserver.disconnect();}},{threshold:.7});olympusFaceObserver.observe(face);}$$('[data-olympus-signal]').forEach(b=>b.addEventListener('click',()=>{olympusSignalSelected=Number(b.dataset.olympusSignal);const terminalLabel=root.querySelector('.olympus-terminal-bar>span');if(terminalLabel)terminalLabel.textContent=tr('Initiative terminal','Terminal de iniciativas');$$('[data-olympus-signal]').forEach(v=>v.setAttribute('aria-pressed',String(v===b)));$$('[data-signal-edge]').forEach(v=>v.classList.toggle('selected-connection',Number(v.dataset.signalEdge)===olympusSignalSelected));draw();}));}
function olympusTrackPoint(points,progress){const lengths=points.slice(1).map((p,i)=>Math.hypot(p[0]-points[i][0],p[1]-points[i][1])),total=lengths.reduce((a,b)=>a+b,0);let distance=progress*total;for(let i=0;i<lengths.length;i++){if(distance<=lengths[i]){const f=distance/lengths[i];return [points[i][0]+(points[i+1][0]-points[i][0])*f,points[i][1]+(points[i+1][1]-points[i][1])*f];}distance-=lengths[i];}return points[points.length-1];}
const olympusRequestColors=['102,231,255','255,86,184','255,166,79','104,244,187'];
// One illustrative initiative keeps its identity through governance, delegation, and return.
const olympusRequestRoute=[7,0,1,2,5,6,2,1,2,2,6,2,3,4,1,7];
function olympusFlowLeg(from,to){
 if(from===7&&to===0)return olympusSignals[7].points;
 const source=from===7?[[500,230],[500,286],[500,390]]:[...olympusSignals[from].points].reverse();
 const target=to===7?[[500,390],[500,286],[500,230]]:olympusSignals[to].points;
 return [...source,[500,390],...target];
}
function olympusRequestState(elapsed){
 const travel=2.2,span=(olympusRequestRoute.length-1)*travel+12;
 const age=Math.max(0,elapsed),phase=Math.min(age,span-1),segment=Math.floor((phase-1)/travel);
 const rgb=olympusSignalColor;
 if(!olympusRunning)return {rgb,request:0,completed:-1,moving:false,progress:0,reached:null};
 const moving=segment>=0&&segment<olympusRequestRoute.length-1;
 return {rgb,segment,moving,request:olympusRequestNumber,completed:moving?segment:phase<1?0:olympusRequestRoute.length-1,progress:moving?(phase-1-segment*travel)/travel:0,
  reached:moving?olympusRequestRoute[segment]:phase<1?7:7};
}
function olympusOccupiedNodes(state,paths){
 if(!state.request)return [];
 if(!state.moving)return state.completed===0?[7]:[];
 const heads=paths.map(path=>olympusTrackPoint(path,state.progress));
 return olympusSignals.flatMap((node,i)=>heads.some(p=>Math.abs(p[0]-node.x)<=114&&Math.abs(p[1]-node.y)<=129.6)?[i]:[]);
}
function syncOlympusSignalHighlights(state){
 const map=$('.olympus-signal-map');map.style.setProperty('--request-color',`rgb(${state.rgb})`);map.classList.toggle('request-running',Boolean(state.request));
 const paths=!state.moving?[]:olympusDemoMode==='website'&&state.segment===2?[2,5,6].map(target=>olympusFlowLeg(1,target)):[olympusFlowLeg(olympusRequestRoute[state.segment],olympusRequestRoute[state.segment+1])];
 const occupied=olympusOccupiedNodes(state,paths);
 $$('[data-olympus-signal]').forEach(b=>b.classList.toggle('signal-reached',occupied.includes(Number(b.dataset.olympusSignal))));
 return paths;
}
function drawOlympusRequest(mc,sx,sy){
 const state=olympusRequestState(olympusElapsed()),paths=syncOlympusSignalHighlights(state);
 if(!state.moving)return;
 for(const path of paths){
  for(let j=5;j>=0;j--){const t=state.progress-j*.018;if(t<0)continue;
   const p=olympusTrackPoint(path,t);mc.fillStyle=`rgba(${state.rgb},${j===0?1:.62-j*.085})`;
   mc.beginPath();mc.arc(p[0]*sx,p[1]*sy,(j===0?4.8:3-j*.3)*sx,0,Math.PI*2);mc.fill();
  }
 }
}
function drawOlympusCore(mc,cx,cy,r,scale){
 const angle=time*.23,tilt=.24*Math.sin(time*.29+4),roll=.18*Math.sin(time*.21+4),cloud=[];
 for(let i=0;i<1800;i++){
  const p=points[Math.floor(i*3200/1800)],rx=p.x*Math.cos(angle)-p.z*Math.sin(angle),zz=p.x*Math.sin(angle)+p.z*Math.cos(angle);
  const ry=p.y*Math.cos(tilt)-zz*Math.sin(tilt),z=p.y*Math.sin(tilt)+zz*Math.cos(tilt);
  const x=rx*Math.cos(roll)-ry*Math.sin(roll),y=rx*Math.sin(roll)+ry*Math.cos(roll),depth=2.7/(3.1-z);
  const ripple=1+.075*Math.sin(p.y*6+time*1.1+4)+.035*Math.cos(p.x*7-time*.65),front=(z+1)/2;
  cloud.push({x:x*r*depth*ripple,y:y*r*depth*ripple,z,front,color:p.y>.2?'102,231,255':'83,162,255'});
 }
 const paint=p=>{
  // Preserve the text's contrast while retaining a translucent foreground shell.
  const overText=Math.abs(p.x+5*scale)<43*scale&&Math.abs(p.y+4*scale)<12*scale;
  const alpha=Math.min(1,(.16+.78*p.front)*1.12)*(overText&&p.z>.18?.46:1);
  mc.fillStyle=`rgba(${p.color},${alpha})`;mc.beginPath();mc.arc(cx+p.x,cy+p.y,.5+p.front*(r>100?1.45:.85),0,Math.PI*2);mc.fill();
 };
 mc.globalCompositeOperation='lighter';cloud.filter(p=>p.z<=.18).forEach(paint);
 mc.globalCompositeOperation='source-over';mc.save();mc.translate(cx-5*scale,cy-4*scale);mc.rotate(roll*.32);mc.scale(.94,.94);
 mc.font=`700 ${20*scale}px Manrope`;mc.textAlign='center';mc.textBaseline='middle';
 mc.lineWidth=2.5*scale;mc.strokeStyle='rgba(16,16,19,.55)';mc.strokeText('Olympus',0,0);
 mc.fillStyle='#f5f2ed';mc.fillText('Olympus',0,0);mc.restore();
 mc.globalCompositeOperation='lighter';cloud.filter(p=>p.z>.18).forEach(paint);mc.globalCompositeOperation='source-over';
}
function drawOlympusMemory(){const state=olympusRequestState(olympusElapsed());if($('.olympus-signal-map'))syncOlympusSignalHighlights(state);updateOlympusExecutionConsole(state);drawMnemosyneSignal();const c=$('#olympus-signal-canvas');if(!c)return;const r=c.getBoundingClientRect();if(r.width===0||r.bottom<0||r.top>screenH)return;const d=Math.min(devicePixelRatio,1.5);if(c.width!==Math.round(r.width*d)||c.height!==Math.round(r.height*d)){c.width=Math.round(r.width*d);c.height=Math.round(r.height*d);}const mc=c.getContext('2d');mc.setTransform(d,0,0,d,0,0);mc.clearRect(0,0,r.width,r.height);const sx=r.width/1200,sy=r.height/950;mc.translate(100*sx,80*sy);const radius=104*sx*(1+.035*Math.sin(time*.9));drawOlympusCore(mc,500*sx,390*sy,radius,sx);mc.globalCompositeOperation='lighter';for(let i=0;i<42;i++){const a=i*2.39996+time*(.15+i%3*.04),reach=radius*(.28+.5*(i%7)/7);mc.fillStyle=i%2?'rgba(102,231,255,.7)':'rgba(83,162,255,.7)';mc.beginPath();mc.arc(500*sx+Math.cos(a)*reach,390*sy+Math.sin(a)*reach*.65,1.2*sx,0,Math.PI*2);mc.fill();}drawOlympusRequest(mc,sx,sy);mc.globalCompositeOperation='source-over';}

// Two hemispheres with a central cleft and folded particle ridges; signals follow the folds.
function drawMnemosyneSignal(){
 const c=$('#mnemosyne-signal-canvas');if(!c)return;
 const r=c.getBoundingClientRect();if(!r.width||r.bottom<0||r.top>screenH)return;
 const d=Math.min(devicePixelRatio,1.5);if(c.width!==Math.round(r.width*d)||c.height!==Math.round(r.height*d)){c.width=Math.round(r.width*d);c.height=Math.round(r.height*d);}
 const mc=c.getContext('2d');mc.setTransform(d,0,0,d,0,0);mc.clearRect(0,0,r.width,r.height);
 mc.translate(r.width/2,r.height/2);const scale=r.width/84*(1+.025*Math.sin(time*1.1));mc.scale(scale,scale);
 for(const side of [-1,1]){
  for(let i=0;i<280;i++){
   const v=1-2*(i+.5)/280,a=i*2.399963,ring=Math.sqrt(1-v*v),z=ring*Math.sin(a);
   const fold=1+.075*Math.sin(a*7+v*11)+.045*Math.cos(v*23);
   const x=side*(13+18*ring*Math.cos(a)*fold),y=27*v*fold;
   mc.fillStyle=`rgba(${i%3?'255,86,184':'255,34,144'},${.2+.5*(z+1)/2})`;
   mc.beginPath();mc.arc(x,y,.55+.35*(z+1)/2,0,Math.PI*2);mc.fill();
  }
  for(let ridge=0;ridge<5;ridge++){
   for(let j=0;j<24;j++){
    const t=j/23,y=-22+44*t,x=side*(6+ridge*4+2.6*Math.sin(t*10+ridge));
    if(x*x/1050+y*y/800>1)continue;
    mc.fillStyle='rgba(255,86,184,.68)';mc.beginPath();mc.arc(x,y,.65,0,Math.PI*2);mc.fill();
   }
   if(ridge%2)continue;
   const t=(time*.22+ridge*.19)%1,y=-22+44*t,x=side*(6+ridge*4+2.6*Math.sin(t*10+ridge));
   mc.fillStyle='rgba(255,180,224,.95)';mc.beginPath();mc.arc(x,y,1.5,0,Math.PI*2);mc.fill();
  }
 }
}

// The figure presents the intended complete operating model, not an implementation inventory.
olympusSignals.forEach(n=>{n.future=false;});
olympusSignals[2].detail=['Relevant specialists own bounded work, consult peers, and return evidence. Hermes coordinates the team; each Owner retains individual accountability.','Especialistas relevantes assumem trabalho delimitado, consultam pares e retornam evidências. Hermes coordena a equipe; cada Owner mantém a responsabilidade individual.'];
olympusSignals[3].detail=['Owners return artifacts, decisions, or refusals with evidence. Hermes consolidates the result and returns it to the requester, preserving the governance boundaries set by Zeus.','Owners retornam artefatos, decisões ou recusas com evidências. Hermes consolida o resultado e o devolve ao solicitante, preservando os limites de governança definidos por Zeus.'];
olympusSignals[4].detail=['Curated organizational knowledge across initiatives. Mnemosyne receives reviewed knowledge and supplies relevant context, with provenance and a clear boundary between working state, agent experience, and established knowledge.','Conhecimento organizacional curado entre iniciativas. Mnemosyne recebe conhecimento revisado e fornece contexto relevante, com proveniência e uma separação clara entre estado de trabalho, experiência do agente e conhecimento estabelecido.'];
olympusSignals[5].detail=['Reusable Skills, tools, integrations, and quality standards support specialist work. Capability access follows scope and authority; communication and observability keep the initiative traceable.','Skills, ferramentas, integrações e padrões de qualidade reutilizáveis apoiam o trabalho especialista. O acesso a capacidades segue escopo e autoridade; comunicação e observabilidade mantêm a iniciativa rastreável.'];
olympusSignals[6].detail=['Owners commission temporary specialists for specific tasks. Workers carry bounded context and return artifacts; the parent Owner remains accountable for their contribution.','Owners designam especialistas temporários para tarefas específicas. Workers recebem contexto delimitado e retornam artefatos; o Owner mantém a responsabilidade pela contribui\\u00e7ão.'];
diagramDefinitions['olympus-os']=[
 ['Governor / Zeus','Governor / Zeus','Governance authority: reviews intent, admits or stops initiatives, and establishes boundaries.','Autoridade de governança: revisa a intenção, admite ou interrompe iniciativas e estabelece limites.'],
 ['Orchestrator / Hermes','Orchestrator / Hermes','Coordinates the minimum useful team, dependencies, readiness, and consolidated result.','Coordena a equipe mínima, dependências, prontidão e resultado consolidado.'],
 ['Domain Owner','Domain Owner','An accountable specialist for an outcome domain. Owners collaborate without losing individual responsibility.','Especialista responsável por um domínio de resultados. Owners colaboram preservando a responsabilidade individual.'],
 ['Planning Room / Initiative State','Planning Room / Initiative State','Logical specialist collaboration / the current snapshot of owned work, decisions, dependencies, and blockers.','Colaboração lógica entre especialistas / retrato atual do trabalho atribuído, decisões, dependências e bloqueios.'],
 ['Mnemosyne','Mnemosyne','Reviewed, reusable organizational knowledge with provenance. Distinct from working state and raw agent experience.','Conhecimento organizacional revisado e reutilizável com proveniência. Distinto do estado de trabalho e da experiência bruta dos agentes.'],
 ['Worker','Worker','A temporary specialist commissioned for bounded work; its parent Owner retains accountability.','Especialista temporário designado para trabalho delimitado; seu Owner mantém a responsabilidade.'],
 ['Shared capabilities','Capacidades compartilhadas','Reusable Skills, tools, integrations, and quality standards governed by scope and authority.','Skills, ferramentas, integrações e padrões de qualidade reutilizáveis governados por escopo e autoridade.']
];
olympusSteps[3][8]='The assigned Owner produces bounded specialist work, commissions Workers when useful, and returns evidence to Hermes. Responsibility remains with the Owner.';
olympusSteps[3][9]='O Owner atribuído produz trabalho especialista delimitado, designa Workers quando útil e retorna evidências ao Hermes. A responsabilidade permanece com o Owner.';
olympusSteps[4][2]='Consolidate & return';olympusSteps[4][3]='Consolidar e retornar';
olympusSteps[4][6]='A consolidated result and reviewed knowledge proposals.';olympusSteps[4][7]='Um resultado consolidado e propostas revisadas de conhecimento.';
olympusSteps[4][8]='Hermes consolidates the evidence and returns the result within governance boundaries. Reusable knowledge is reviewed before entering Mnemosyne.';
olympusSteps[4][9]='Hermes consolida as evidências e retorna o resultado dentro dos limites de governança. Conhecimento reutilizável é revisado antes de entrar em Mnemosyne.';

function olympusHumanAvatar(){return '<span class="olympus-face-turn" aria-hidden="true"><img class="olympus-human-particles face-front" src="/olympus-v2/assets/particle-user-front-v1.png" width="120" height="120" alt="" decoding="async"></span>';}

olympusSignals.push({name:['User','Usuário'],alias:['The requester','O solicitante'],role:['Intent & authority','Intenção e autoridade'],icon:'user',x:500,y:70,points:[[414,70],[335,70],[305,115],[267,115]],detail:['Starts the initiative by sending the objective, context, and required authority to Zeus. The human defines intent; the Governor reviews the request before Hermes coordinates it.','Inicia a iniciativa enviando objetivo, contexto e autoridade necessária ao Zeus. A pessoa define a intenção; o Governor revisa o pedido antes de Hermes coordená-lo.']});

// Bring each circuit endpoint to the smaller Olympus pulse.
olympusSignals.slice(0,7).forEach(n=>{const p=n.points[0];p[0]=500+(p[0]-500)*104/148;p[1]=350+(p[1]-350)*104/148;});



// Lower the system around the forward-facing requester, retaining space at the bottom.
olympusSignals.slice(0,7).forEach((n,i)=>{n.y+=i<2?30:40;n.points.forEach(p=>{p[1]+=40;});});
olympusSignals[7].points=[[414,70],[335,70],[305,145],[267,145]];

// A creative-media initiative with two review loops and a research-domain contribution.
const olympusExampleEvents=[
 ['User','Usuário','Request received','Pedido recebido','Create an Instagram post about collaborative AI. Use a dark background, blue and pink signals, and “ONE IDEA. MANY MINDS.” Review twice and ask Athena to help with readability.','Crie um post para Instagram sobre IA colaborativa. Use fundo escuro, sinais azuis e rosas e “UMA IDEIA. MUITAS MENTES.” Faça duas revisões e peça ajuda a Athena para a legibilidade.'],
 ['Zeus · Governor','Zeus · Governor','Set boundaries','Definir limites','Approve creation of one image and caption. Publishing remains with the requester.','Aprovar a criação de uma imagem e legenda. A publicação permanece com o solicitante.'],
 ['Hermes · Orchestrator','Hermes · Orchestrator','Assign the Lead Owner','Atribuir o Lead Owner','Route the brief to Aphrodite, Owner of creative_media, and establish two review checkpoints.','Encaminhar o briefing a Aphrodite, Owner de creative_media, e estabelecer dois pontos de revisão.'],
 ['Aphrodite · creative_media','Aphrodite · creative_media','Build the creative brief','Construir o briefing criativo','Define a 4:5 composition, headline hierarchy, safe margins, and a constellation of collaborating signals.','Definir composição 4:5, hierarquia do título, margens seguras e uma constelação de sinais colaborativos.'],
 ['Shared capabilities','Capacidades compartilhadas','Select the creation workflow','Selecionar o fluxo de criação','Prepare the image brief and the criteria for typography, contrast, and final export.','Preparar o briefing da imagem e os critérios de tipografia, contraste e exportação final.'],
 ['Creative Worker','Worker criativo','Produce draft 1','Produzir versão 1','Compose the headline and particle constellation; return the first draft to Aphrodite.','Compor o título e a constelação de partículas; retornar a primeira versão a Aphrodite.'],
 ['Aphrodite · creative_media','Aphrodite · creative_media','Review loop 1 / 2','Revisão 1 / 2','The central highlights compete with the headline. Lower their intensity and request a reading check from another domain.','Os brilhos centrais competem com o título. Reduzir a intensidade e pedir uma checagem de leitura a outro domínio.'],
 ['Hermes · Orchestrator','Hermes · Orchestrator','Invite another domain','Convidar outro domínio','Ask Athena, Owner of research_learning, to assess the message and visual reading order.','Pedir a Athena, Owner de research_learning, uma avaliação da mensagem e da ordem de leitura visual.'],
 ['Athena · research_learning','Athena · research_learning','Review clarity','Revisar clareza','Keep the main idea above the artwork. Preserve mobile-size legibility and make the message clear: agents interpret the initiative and refine the result within delegated boundaries.','Manter a ideia principal acima da arte. Preservar a leitura no celular e deixar a mensagem clara: agentes interpretam a iniciativa e refinam o resultado dentro dos limites delegados.'],
 ['Aphrodite · creative_media','Aphrodite · creative_media','Incorporate peer feedback','Incorporar a revisão do outro domínio','Adopt Athena\'s reading order. Send a revised brief to the Worker for the second pass.','Adotar a ordem de leitura sugerida por Athena. Enviar o briefing revisado ao Worker para a segunda passagem.'],
 ['Creative Worker','Worker criativo','Produce draft 2','Produzir versão 2','Strengthen the type hierarchy, restrain the highlights, and preserve safe margins.','Reforçar a hierarquia tipográfica, conter os brilhos e preservar as margens seguras.'],
 ['Aphrodite · creative_media','Aphrodite · creative_media','Review loop 2 / 2','Revisão 2 / 2','Check the revised composition against the brief; approve the image and caption for delivery.','Checar a composição revisada contra o briefing; aprovar imagem e legenda para entrega.'],
 ['Result','Resultado','Package the post','Preparar o post','Combine the final artwork, caption, and export into one deliverable.','Reunir a arte final, a legenda e a exportação em uma entrega.'],
 ['Mnemosyne','Mnemosyne','Retain reviewed learning','Reter aprendizado revisado','Store the reusable reading-order and contrast guidance, with provenance, separately from working drafts.','Guardar as orientações reutilizáveis e revisadas de leitura e contraste, com proveniência, separadas das versões de trabalho.'],
 ['Hermes · Orchestrator','Hermes · Orchestrator','Return the requested artifact','Retornar o artefato solicitado','Deliver the finished post to the requester. No publishing action is taken.','Entregar o post finalizado ao solicitante. Nenhuma publicação é realizada.'],
 ['User','Usuário','Post delivered','Post entregue','The image and caption are ready for the requester to review and use.','A imagem e a legenda estão prontas para o solicitante revisar e usar.']
];
const olympusPostEvents=olympusExampleEvents.map(e=>[...e]);
const olympusPostRoute=[...olympusRequestRoute];
const olympusWebsiteEvents=[
 ['User','Usuário','Initiative received','Iniciativa recebida','Create a landing page for Olympus. Explain how one initiative becomes coordinated work. Delegate copy, design, and implementation to separate agents, then integrate and review the page.','Crie uma landing page para o Olympus. Explique como uma iniciativa vira trabalho coordenado. Delegue texto, design e implementação a agentes diferentes; depois integre e revise a página.'],
 ['Zeus · Governor','Zeus · Governor','Interpret the initiative','Interpretar a iniciativa','Define the intended audience and outcome. Authorize a local page prototype; ask the team to improve the brief while staying within that scope.','Definir público e resultado esperado. Autorizar um protótipo local; pedir que a equipe melhore o briefing dentro desse escopo.'],
 ['Hermes · Orchestrator','Hermes · Orchestrator','Commission three workstreams','Comissionar três frentes','Aphrodite leads the experience; Athena clarifies the message; Hephaestus commissions a build Worker. Start complementary tasks together.','Aphrodite lidera a experiência; Athena esclarece a mensagem; Hephaestus comissiona um Worker de implementação. Iniciar tarefas complementares em conjunto.'],
 ['Specialist team','Equipe especialista','Parallel execution · 3 agents','Execução paralela · 3 agentes','Athena / research_learning → refine the value proposition. Aphrodite / creative_media → define layout and visual hierarchy. Build Worker / systems_automation → assemble the responsive page using shared components.','Athena / research_learning → refinar a proposta de valor. Aphrodite / creative_media → definir layout e hierarquia visual. Worker / systems_automation → montar a página responsiva com componentes compartilhados.'],
 ['Hermes · Orchestrator','Hermes · Orchestrator','Merge the contributions','Integrar contribuições','Bring the copy, design, and working page together. Surface conflicting assumptions before handoff to the Lead Owner.','Reunir texto, design e página funcional. Expor premissas conflitantes antes do retorno ao Lead Owner.'],
 ['Aphrodite · creative_media','Aphrodite · creative_media','Review the shared result','Revisar o resultado conjunto','Check hierarchy, contrast, mobile layout, and alignment with the initiative. Keep the main call to action easy to find.','Verificar hierarquia, contraste, layout móvel e alinhamento com a iniciativa. Manter a ação principal fácil de encontrar.'],
 ['Build Worker','Worker de implementação','Apply the final revision','Aplicar a revisão final','Incorporate the Lead Owner\'s feedback. Complete the local page and its responsive components.','Incorporar a revisão do Lead Owner. Concluir a página local e seus componentes responsivos.'],
 ['Result','Resultado','Package the page','Preparar a página','Return the page preview and downloadable HTML as one deliverable.','Retornar a prévia da página e o HTML para download como uma entrega.'],
 ['Mnemosyne','Mnemosyne','Curate reusable learning','Curar aprendizado reutilizável','Retain reviewed message and layout decisions for future initiatives; keep provenance and distinguish them from temporary drafts.','Reter decisões revisadas de mensagem e layout para novas iniciativas; manter proveniência e separá-las de versões temporárias.'],
 ['Hermes · Orchestrator','Hermes · Orchestrator','Deliver the result','Entregar o resultado','Return the integrated page. The delegated work is complete; publishing is a separate action.','Retornar a página integrada. O trabalho delegado está concluído; a publicação é uma ação separada.'],
 ['User','Usuário','Page delivered','Página entregue','One initiative became three complementary workstreams and one integrated page.','Uma iniciativa virou três frentes complementares e uma página integrada.']
];
function applyOlympusScenario(){const web=olympusDemoMode==='website';olympusExampleEvents.splice(0,olympusExampleEvents.length,...(web?olympusWebsiteEvents:olympusPostEvents));olympusRequestRoute.splice(0,olympusRequestRoute.length,...(web?[7,0,1,2,1,2,6,3,4,1,7]:olympusPostRoute));}
function olympusMiniTerminal(){applyOlympusScenario();return `<section id="olympus-signal-detail" class="olympus-mini-terminal" aria-label="${tr('Request terminal','Terminal de pedido')}"><div class="olympus-terminal-bar"><strong><span aria-hidden="true">⬺<span class="olympus-terminal-cursor">_</span></span> Olympus</strong><span>${olympusSignalSelected===null?tr('Select a connection','Selecione uma conexão'):tr('Initiative terminal','Terminal de iniciativas')}</span><button class="olympus-replay" data-olympus-replay>${tr('Run request','Rodar pedido')}${icon('play')}</button></div><div class="olympus-demo-tabs" role="tablist" aria-label="${tr('Example initiative','Iniciativa de exemplo')}">${[['post',tr('Single deliverable','Entrega única')],['website',tr('Parallel team','Equipe em paralelo')]].map(([id,label])=>`<button role="tab" id="olympus-demo-${id}" tabindex="${olympusDemoMode===id?0:-1}" data-olympus-demo="${id}" aria-selected="${olympusDemoMode===id}" aria-controls="olympus-terminal-body">${label}<span>${id==='post'?tr('Instagram post','Post para Instagram'):tr('Landing page','Landing page')}</span></button>`).join('')}</div><div id="olympus-terminal-body" role="tabpanel" aria-labelledby="olympus-demo-${olympusDemoMode}"><pre class="olympus-example-command"><code><span>olympus</span> ~/initiatives
<span>$ request</span> ${esc(olympusExampleEvents[0][lang==='pt'?5:4])}</code></pre><p id="olympus-execution-status" aria-live="polite"></p><ol id="olympus-execution-log" aria-label="${tr('Execution log','Log de execução')}"></ol></div></section>`;}
function olympusExecutionConsole(){const web=olympusDemoMode==='website';return `<section class="olympus-execution olympus-post-output ${web?'olympus-website-output':''}" aria-labelledby="olympus-post-title"><div class="olympus-execution-heading"><h3 id="olympus-post-title">${web?tr('The finished page','A página final'):tr('The finished post','O post final')}</h3><span id="olympus-post-state">${tr('Waiting for the request','Aguardando o pedido')}</span></div><div class="olympus-post-layout"><div class="olympus-post-art">${web?`<iframe scrolling="no" title="${tr('Olympus landing page preview','Prévia da landing page do Olympus')}" src="/olympus-v2/assets/olympus-demo-site-${lang}.html?v=32"></iframe>`:`<img src="/olympus-v2/assets/olympus-instagram-post-${lang}-v2.png" alt="${tr('Olympus: ONE IDEA. MANY MINDS. Agents interpret. Ideas evolve.','Olympus: UMA IDEIA. MUITAS MENTES. Agentes interpretam. Ideias evoluem.')}" width="1080" height="1350">`}<p>${tr('Run the request to follow this creation.','Rode o pedido para acompanhar esta criação.')}</p></div><div class="olympus-post-copy"><h4>${web?tr('One initiative. Three workstreams.','Uma iniciativa. Três frentes.'):tr('One idea. Many minds.','Uma ideia. Muitas mentes.')}</h4><p>${tr('People express an initiative. Agents interpret its intent, improve the brief, coordinate specialists, and make decisions within delegated boundaries. Reviewed feedback becomes reusable knowledge for future work.','Pessoas expressam uma iniciativa. Agentes interpretam sua intenção, melhoram o briefing, coordenam especialistas e tomam decisões dentro dos limites delegados. Feedback revisado vira conhecimento reutilizável para os próximos trabalhos.')}</p><p class="olympus-post-tags">#Olympus #AgenticAI #AgentCollaboration</p><a class="textlink" href="/olympus-v2/assets/${web?`olympus-demo-site-${lang}.html`:`olympus-instagram-post-${lang}-v2.png`}" download>${web?tr('Download page','Baixar página'):tr('Download image','Baixar imagem')}${icon('arrow')}</a></div></div></section>`;}
function updateOlympusExecutionConsole(state){
 const log=$('#olympus-execution-log');if(!log)return;
 const key=`${lang}-${olympusDemoMode}-${state.request}-${state.completed}-${log.clientWidth}`;if(log.dataset.stage===key)return;
 log.dataset.stage=key;
 const terminal=$('.olympus-mini-terminal'),output=$('.olympus-post-output');
 terminal.style.setProperty('--request-color',`rgb(${state.rgb})`);output.style.setProperty('--request-color',`rgb(${state.rgb})`);
 const at=state.completed,done=at===olympusRequestRoute.length-1;
 terminal.querySelector('[data-olympus-replay]').innerHTML=`${tr(state.request?'Run again':'Run request',state.request?'Rodar novamente':'Rodar pedido')}${icon('play')}`;
 $('#olympus-execution-status').textContent=state.request?(done?tr('Delivered','Entregue'):tr('In progress','Em andamento')):tr('Ready · press Run request','Pronto · clique em Rodar pedido');
 log.innerHTML=at<0?`<li><p>${olympusDemoMode==='website'?tr('After Zeus reviews the initiative, Hermes starts copy, design, and build workstreams together.','Depois da revisão de Zeus, Hermes inicia frentes de texto, design e implementação em conjunto.'):tr('Aphrodite leads creation. Athena contributes from another domain. Two review loops lead to one final post.','Aphrodite lidera a criação. Athena contribui a partir de outro domínio. Duas revisões levam a um post final.')}</p></li>`:olympusExampleEvents.slice(0,at+1).map((e,i)=>{
 const next=olympusExampleEvents[i+1],parallel=olympusDemoMode==='website'&&i===3;
 return `<li><div><time>+${(i===0?0:1+i*2.2).toFixed(1)}s</time><strong>${esc(e[lang==='pt'?1:0])}</strong><span>${esc(e[lang==='pt'?3:2])}</span></div>${parallel?`<ul class="olympus-parallel-tasks">${e[lang==='pt'?5:4].split('. ').map(task=>`<li>${esc(task)}</li>`).join('')}</ul>`:`<p>${esc(e[lang==='pt'?5:4])}</p>`}${next?`<small>${tr('Next execution','Próxima execução')} → ${esc(next[lang==='pt'?1:0])}</small>`:''}</li>`;
 }).join('');
 if(at>=0){const current=log.lastElementChild;log.style.height=`${Math.ceil(current.getBoundingClientRect().height)}px`;log.style.setProperty('padding-bottom','0px','important');log.scrollTop=current.offsetTop-log.firstElementChild.offsetTop;}
 if(at>=0&&olympusRequestRoute[at]===2){const owner=$('[data-olympus-signal="2"]>span');owner.textContent=olympusExampleEvents[at][lang==='pt'?1:0];}
 output.classList.toggle('post-ready',done);
 $('#olympus-post-state').textContent=done?tr('Ready to use','Pronto para usar'):state.request?tr('Creation in progress','Criação em andamento'):tr('Waiting for the request','Aguardando o pedido');
 output.querySelector('.olympus-post-copy').hidden=!done;
}
// Spread the same-sized roles toward the canvas edges.
olympusSignals.slice(0,7).forEach((n,i)=>{
 const targetX=i===6?500:[50,950,960,950,50,40][i];
 const dx=targetX-n.x,dy=i<2?30:i===6?15:i===3||i===4?35:10;
 n.x=targetX;n.y+=dy;n.points.slice(1).forEach((p,j)=>{p[0]+=dx*(j===0?.6:1);p[1]+=dy;});
});
olympusSignals[7].points=[[398,70],[305,70],[230,175],[164,175]];

// Equal card dimensions on three aligned rows; reconnect the same roles.
olympusSignals.forEach((n,i)=>{const nx=i===6||i===7?500:[50,950,950,950,50,50][i],ny=[100,100,400,690,690,400,690,100][i],dx=nx-n.x,dy=ny-n.y;n.x=nx;n.y=ny;if(i!==7)n.points.slice(1).forEach((p,j)=>{p[0]+=dx*(j===0?.6:1);p[1]+=dy;});});
olympusSignals[7].points=[[386,100],[305,100],[230,100],[164,100]];
