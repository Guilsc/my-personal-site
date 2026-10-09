'use strict';
// Public repository evidence is cited per figure; pulses illustrate a conversation, not live telemetry.
const projectDiagrams={
 'olympus':{
  "title": [
    "Governance, coordination, and owned delivery.",
    "Governança, coordenação e entrega com responsabilidade."
  ],
  "intro": [
    "The current Olympus foundation: User → Governor → Orchestrator → Domain Owner → Result.",
    "A fundação atual do Olympus: User → Governor → Orchestrator → Domain Owner → Result."
  ],
  "note": [
    "Declarative roles and six Domain/Owner contracts are validated. Block 1.5 exercised the professional-delivery chain in fresh conversations hosted by external Hermes-Main. Persistent Olympus runtime, Workers, memory, and capabilities remain deferred.",
    "Papéis declarativos e seis contratos Domain/Owner estão validados. O Block 1.5 exercitou a cadeia de entrega profissional em conversas isoladas no Hermes-Main externo. Runtime persistente do Olympus, Workers, memória e capacidades permanecem adiados."
  ],
  "source": "https://github.com/Guilsc/olympus/blob/main/docs/architecture.md",
  "nodes": [
    [
      "User",
      "Usuário",
      "Intent & authority",
      "Intenção e autoridade",
      "Supplies the objective, context, and required authority. The User is the external initiator, not an Olympus agent role.",
      "Fornece objetivo, contexto e autoridade necessária. O usuário inicia o fluxo externamente; não é um papel de agente do Olympus."
    ],
    [
      "Governor",
      "Governor",
      "Zeus · governance",
      "Zeus · governança",
      "Evaluates the initiative and returns proceed, stop, or clarify with a reason and next_owner. Governs admission; does not select specialists, plan work, or execute the initiative.",
      "Avalia a iniciativa e retorna proceed, stop ou clarify, com motivo e next_owner. Governa a entrada; não seleciona especialistas, planeja trabalho ou executa a iniciativa."
    ],
    [
      "Orchestrator",
      "Orchestrator",
      "Hermes · coordination",
      "Hermes · coordenação",
      "Plans approved intent, selects the minimum useful team and one Lead Owner, and represents owned work, dependencies, blockers, and readiness in Initiative State. Planning Room is logical collaboration, not persistent chat infrastructure.",
      "Planeja a intenção aprovada, seleciona a equipe mínima e um Lead Owner, e representa trabalho atribuído, dependências, bloqueios e prontidão no Initiative State. Planning Room é colaboração lógica, não infraestrutura de chat persistente."
    ],
    [
      "Domain Owner",
      "Domain Owner",
      "Apollo · professional delivery",
      "Apollo · entrega profissional",
      "The illustrated professional_delivery_owner performs its individually assigned bounded specialist work and returns an artifact or refusal. Six separate Domain/Owner contracts are available; a definition is not a persistent agent instance.",
      "O professional_delivery_owner ilustrado executa trabalho especialista delimitado e atribuído individualmente, retornando um artefato ou recusa. Seis contratos Domain/Owner estão disponíveis; uma definição não é uma instância persistente de agente."
    ],
    [
      "Result",
      "Resultado",
      "Bounded artifact / refusal",
      "Artefato delimitado / recusa",
      "The Owner output returns evidence for the assigned work. In Block 1.5 it is the final output, not an executed Orchestrator callback, a persisted initiative update, or an automated release.",
      "A saída do Owner retorna evidências do trabalho atribuído. No Block 1.5 é a saída final, não um callback executado do Orchestrator, atualização persistida da iniciativa ou publicação automática."
    ],
    [
      "Mnemosyne",
      "Mnemosyne",
      "Future · Shared Second Brain",
      "Futuro · Shared Second Brain",
      "An envisioned curated organizational knowledge layer. Context & Memory remains deferred in the current foundation. This future concept is separate from the validated delivery chain; no knowledge storage or retrieval is shown as implemented.",
      "Camada futura de conhecimento organizacional curado. Context & Memory permanece adiado na fundação atual. Este conceito fica separado da cadeia de entrega validada; armazenamento e consulta de conhecimento não são apresentados como implementados."
    ]
  ],
  "messages": [
    [
      "Objective & context",
      "Objetivo e contexto"
    ],
    [
      "proceed → orchestrator",
      "proceed → orchestrator"
    ],
    [
      "Ready handoff & assignment",
      "Handoff pronto e atribuição"
    ],
    [
      "Artifact or refusal",
      "Artefato ou recusa"
    ]
  ],
  "extra": [],
  "focal": 2,
  "primaryCount": 5
},
 'hermes-agent-mission-control':{
  title:['A conversation across the message bus.','Uma conversa através do barramento.'],
  intro:['The cockpit and local Hermes exchange requests and events through Postgres.','O painel e o Hermes local trocam pedidos e eventos pelo Postgres.'],
  note:['Illustrated approved request. Side effects wait in the approval inbox; the bridge never runs awaiting_approval. No direct website-to-agent connection.','Exemplo de pedido aprovado. Ações com efeitos aguardam na caixa de aprovação; a ponte nunca executa awaiting_approval. Não há conexão direta entre site e agente.'],
  source:'https://github.com/Guilsc/hermes-agent-mission-control/blob/main/hermes-bridge/README.md',
  nodes:[
   ['Human','Pessoa','Dispatch / approve','Solicitar / aprovar','Dispatches work and explicitly approves side-effecting requests in the cockpit.','Solicita trabalho e aprova explicitamente ações com efeitos no painel.'],
   ['Hermy HQ','Hermy HQ','Next.js cockpit','Painel Next.js','Writes AgentRequest rows and reads mirrored tasks, activity, health, and memory through the shared database.','Grava AgentRequest e lê tarefas, atividade, saúde e memória espelhadas no banco compartilhado.'],
   ['Postgres','Postgres','Shared message bus','Barramento compartilhado','Stores requests and events. Safe work is queued; side effects remain awaiting_approval until the human approves.','Armazena pedidos e eventos. Trabalho seguro entra na fila; ações com efeitos aguardam aprovação humana.'],
   ['Hermes Bridge','Hermes Bridge','Outbound polling','Consulta de saída','Polls queued or approved requests. Calls the local Hermes CLI and writes results and mirrored state back to Postgres.','Consulta pedidos na fila ou aprovados. Chama a CLI local do Hermes e retorna resultados e estado ao Postgres.'],
   ['Local Hermes','Hermes local','Agent execution','Execução do agente','Runs on the owner’s machine. The bridge is the adapter; the website does not call the agent directly.','Executa na máquina do responsável. A ponte é o adaptador; o site não chama o agente diretamente.'],
   ['Approval inbox','Caixa de aprovação','Side effects wait here','Ações com efeitos aguardam','The human explicitly approves side-effecting requests. Until then, awaiting_approval rows cannot be executed by the bridge. Safe queued requests bypass this gate.','A pessoa aprova explicitamente pedidos com efeitos. Enquanto aguardam aprovação, a ponte não pode executá-los. Pedidos seguros na fila não passam por este controle.']
  ],
  messages:[['AgentRequest','AgentRequest'],['Queued / approved','Na fila / aprovado'],['Poll request','Consultar pedido'],['Run via CLI','Executar pela CLI'],['Result','Resultado'],['Events & memory','Eventos e memória'],['Read state','Ler estado'],['Side-effect review','Revisão de efeitos'],['Human approval','Aprovação humana']],
  primaryCount:5,extra:[{from:4,to:3,path:'M868 352 V220',dashed:true},{from:3,to:2,path:'M752 182 H688',dashed:true},{from:2,to:1,path:'M512 182 H448',dashed:true},{from:1,to:5,path:'M360 220 V300 Q360 308 368 308 H592 Q600 308 600 316 V352',dashed:true},{from:5,to:2,path:'M628 352 V220',dashed:true}],focal:2
 },
 'bot-ecosystem':{
  title:['From local sessions to a living map.','De sessões locais a um mapa vivo.'],
  intro:['Observe agent work, keep repository plots stable, and return to the right thread.','Observe o trabalho dos agentes, mantenha os terrenos estáveis e retorne à conversa certa.'],
  note:['Session scanning is read-only. colony.json stores the map; opening a thread is an explicit human action through the OS, not a write to the harness.','A leitura de sessões é somente leitura. colony.json guarda o mapa; abrir uma conversa é uma ação humana explícita pelo sistema operacional, não uma alteração no ambiente.'],
  source:'https://github.com/Guilsc/bot-ecosystem/blob/main/server/harnesses/README.md',
  nodes:[
   ['Session files','Arquivos de sessão','Local harnesses','Ambientes locais','Claude Code, Codex, and other installed harnesses keep their own local session records.','Claude Code, Codex e outros ambientes instalados mantêm seus próprios registros locais.'],
   ['Harness adapters','Adaptadores','detect / scanThreads','detect / scanThreads','Detect supported installations and normalize sessions into a common Thread shape. No harness records are modified.','Detectam instalações suportadas e normalizam sessões no formato Thread. Nenhum registro é alterado.'],
   ['Local scanner','Leitor local','Union of threads','União de conversas','Combines normalized threads across available harnesses; one failing adapter does not erase the others.','Combina conversas normalizadas; uma falha de adaptador não elimina os demais.'],
   ['Local API','API local','Loopback boundary','Limite local','Serves session state to the visual world. The default runtime is bound to 127.0.0.1.','Entrega o estado das sessões ao mundo visual. O runtime padrão usa 127.0.0.1.'],
   ['Living colony','Colônia viva','Bots / repo plots','Bots / terrenos','One repository becomes a stable zone; sessions become bots and buildings. colony.json preserves map layout.','Cada repositório torna-se uma zona estável; sessões tornam-se bots e construções. colony.json preserva o mapa.'],
   ['Human selection','Seleção humana','Needs attention','Precisa de atenção','The person chooses a bot that is running, waiting, or stuck and explicitly requests to open its thread.','A pessoa escolhe um bot em execução, aguardando ou com erro e solicita abrir sua conversa.'],
   ['OS opener','Abertura pelo sistema','Deep link / CLI','Link / CLI','Resolves the adapter’s thread reference into a harness deep link or an available terminal command.','Resolve a referência em um link do ambiente ou comando de terminal disponível.']
  ],messages:[['Read records','Ler registros'],['Thread records','Registros Thread'],['Session state','Estado de sessão'],['Render / persist map','Exibir / guardar mapa'],['Attention signal','Sinal de atenção'],['Open request','Pedido de abertura'],['Resume selected thread','Retomar conversa selecionada']],extra:[{from:6,to:0,path:'M272 420 H128 Q120 420 120 412 V220',dashed:true}],focal:4
 },
 'onboarding-mapping-analyst':{
  title:['From an intake to a governed mapping.','De uma solicitação a um mapeamento governado.'],
  intro:['An evidence-grounded analysis flow, with review before canonical change.','Um fluxo baseado em evidências, com revisão antes de alterar o conhecimento canônico.'],
  note:['Representative write workflow. Read-only questions stay lightweight. Custom workspaces remain isolated, and personalization never changes mapping truth or governance.','Fluxo representativo de escrita. Consultas de leitura permanecem leves. Espaços personalizados ficam isolados; personalização não altera a verdade do mapeamento nem a governança.'],
  source:'https://github.com/Guilsc/onboarding-mapping-analyst/blob/main/01_Agent_Core/02_AGENT_ARCHITECTURE.md',
  nodes:[
   ['User intake','Solicitação','Question / change','Pergunta / alteração','Starts with a question, change request, or intake for Salesforce and, when applicable, Adobe Workfront mappings.','Começa com pergunta, alteração ou solicitação de mapeamentos Salesforce e, quando aplicável, Adobe Workfront.'],
   ['Execution surface','Ambiente de execução','Gemini / Drive / NotebookLM','Gemini / Drive / NotebookLM','Works in the user’s existing surface. Only the sources selected and available there become evidence.','Trabalha no ambiente existente. Apenas fontes selecionadas e disponíveis ali tornam-se evidências.'],
   ['OMA router','Roteador OMA','Intent & workspace','Intenção e espaço','Resolves task intent, shared or custom mapping workspace, complexity, relevant skills, optional personalization, and governance.','Resolve intenção, espaço compartilhado ou personalizado, complexidade, skills, personalização opcional e governança.'],
   ['Mapping skills','Skills de mapeamento','Discover / reconcile','Descobrir / reconciliar','Discover sources, reconcile fields, analyze Salesforce/Workfront objects, and surface gaps or conflicts using governed evidence.','Descobrem fontes, reconciliam campos, analisam objetos Salesforce/Workfront e apontam lacunas e conflitos com evidências governadas.'],
   ['Validation & QA','Validação e QA','Evidence / conflicts','Evidências / conflitos','Checks the proposed mapping against available sources and validation rules; uncertainty remains visible.','Verifica o mapeamento contra fontes e regras; incertezas permanecem explícitas.'],
   ['Draft mapping','Mapeamento rascunho','Versioned artifact','Artefato versionado','Returns the draft and supporting evidence to the resolved Request Outputs destination; existing versions are preserved.','Retorna o rascunho e as evidências ao destino de saídas resolvido; versões existentes são preservadas.'],
   ['Human review','Revisão humana','Canonical write gate','Controle de escrita','Canonical changes follow existing approval rules. A draft is not an Approved Master.','Alterações canônicas seguem as regras de aprovação. Um rascunho não é um Approved Master.'],
   ['Approved Master','Approved Master','Governed Drive library','Biblioteca governada no Drive','Approved mappings become durable shared source material. A custom workspace never silently changes the shared canonical library.','Mapeamentos aprovados tornam-se fontes duráveis. Um espaço personalizado nunca altera silenciosamente a biblioteca canônica.']
  ],messages:[['Intake','Solicitação'],['Selected evidence','Evidências selecionadas'],['Scoped task','Tarefa delimitada'],['Reconciled fields','Campos reconciliados'],['Validated draft','Rascunho validado'],['Review package','Pacote de revisão'],['Approval required','Aprovação necessária'],['Future source context','Contexto para nova análise']],extra:[{from:7,to:2,path:'M120 352 V68 Q120 60 128 60 H592 Q600 60 600 68 V80',dashed:true}],focal:2
 }
};

const diagramDefinitions={
 'olympus':[
  [
    "Governor / Zeus",
    "Governor / Zeus",
    "Canonical governance role; Zeus is a replaceable theme alias, not a separate agent concept.",
    "Papel canônico de governança; Zeus é um alias temático substituível, não outro conceito de agente."
  ],
  [
    "Orchestrator / Hermes",
    "Orchestrator / Hermes",
    "Canonical coordination role. Olympus Hermes is distinct from the external Hermes-Main app used to build and validate the project.",
    "Papel canônico de coordenação. O Hermes do Olympus é distinto do aplicativo externo Hermes-Main usado para construir e validar o projeto."
  ],
  [
    "Domain / Domain Owner",
    "Domain / Domain Owner",
    "Outcome responsibility and accountable specialist are separate contracts. Available domains: professional delivery, research & learning, personal life, systems & automation, experimentation, creative & media.",
    "Responsabilidade por resultado e especialista responsável são contratos separados. Domínios disponíveis: entrega profissional, pesquisa e aprendizado, vida pessoal, sistemas e automação, experimentação, criação e mídia."
  ],
  [
    "Planning Room",
    "Planning Room",
    "Logical collaboration: selected Owners contribute judgment; the Orchestrator resolves bounded coordination decisions and preserves blockers.",
    "Colaboração lógica: Owners selecionados contribuem com julgamento; o Orchestrator resolve decisões delimitadas de coordenação e preserva bloqueios."
  ],
  [
    "Initiative State",
    "Initiative State",
    "Current operational snapshot of scope, ownership, work, dependencies, decisions, and readiness. Historical logs are evidence, not current state. Runtime persistence remains deferred.",
    "Retrato operacional atual de escopo, responsáveis, trabalho, dependências, decisões e prontidão. Logs históricos são evidências, não estado atual. A persistência de runtime permanece adiada."
  ],
  [
    "Theme / Runtime",
    "Tema / Runtime",
    "Narrative aliases do not define authority. Validated declarative prompts do not establish persistent agent instances or production dispatch.",
    "Aliases narrativos não definem autoridade. Prompts declarativos validados não estabelecem instâncias persistentes de agentes ou despacho de produção."
  ],
  [
    "Deferred capabilities",
    "Capacidades adiadas",
    "Worker is REFERENCE ONLY. Agent Memory, Shared Second Brain, Skills & Capabilities, and Mission Control are outside the current implementation.",
    "Worker é REFERENCE ONLY. Agent Memory, Shared Second Brain, Skills & Capabilities e Mission Control estão fora da implementação atual."
  ]
],
 'hermes-agent-mission-control':[
  ['Cockpit','Painel de controle','Hermy HQ is the interface for dispatching work, reviewing approvals, and observing agent state.','Hermy HQ é a interface para solicitar trabalho, revisar aprovações e observar o estado do agente.'],
  ['Message bus','Barramento de mensagens','Shared Postgres carries AgentRequest, AgentEvent, task, health, and memory records between the website and local bridge.','O Postgres compartilhado transporta AgentRequest, AgentEvent, tarefas, saúde e memória entre o site e a ponte local.'],
  ['Bridge','Ponte','The local adapter polls eligible requests, calls the Hermes CLI, and mirrors results back to the database.','O adaptador local consulta pedidos elegíveis, chama a CLI do Hermes e espelha resultados no banco.'],
  ['Approval inbox','Caixa de aprovação','Side-effecting requests remain awaiting_approval until explicit human approval; queued safe work is handled separately.','Pedidos com efeitos permanecem awaiting_approval até aprovação humana explícita; trabalho seguro na fila é tratado separadamente.']
 ],
 'bot-ecosystem':[
  ['Harness','Ambiente de execução','The application that actually runs agent threads, such as Claude Code or Codex.','Aplicação que executa as conversas dos agentes, como Claude Code ou Codex.'],
  ['Harness adapter','Adaptador de ambiente','Detects a harness, reads its sessions, and provides normalized threads plus supported opening actions.','Detecta um ambiente, lê suas sessões e fornece conversas normalizadas e ações de abertura suportadas.'],
  ['Thread','Conversa','A session normalized into the common Thread record. Reading it never modifies the harness’s source records.','Sessão normalizada no registro comum Thread. Sua leitura não altera os registros de origem.'],
  ['Zone / bot / building','Zona / bot / construção','One zone represents a repository; one bot and building represent a session. The saved map lives in colony.json.','Uma zona representa um repositório; um bot e uma construção representam uma sessão. O mapa salvo fica em colony.json.']
 ],
 'onboarding-mapping-analyst':[
  ['Senior Data Systems Analyst','Analista sênior de sistemas de dados','The single OMA specialist identity, focused on Salesforce and applicable Workfront onboarding mappings.','Identidade especialista única do OMA, focada em mapeamentos de onboarding Salesforce e Workfront quando aplicável.'],
  ['Task Router','Roteador de tarefas','Resolves intent, workspace, complexity and consequence, relevant skills, optional personalization, and governance.','Resolve intenção, espaço de trabalho, complexidade e consequência, skills relevantes, personalização opcional e governança.'],
  ['Mapping Skills','Skills de mapeamento','Twelve modular capabilities for discovery, reconciliation, generation, validation, and knowledge curation.','Doze capacidades modulares para descoberta, reconciliação, geração, validação e curadoria de conhecimento.'],
  ['Execution surface / governed workspace','Ambiente de execução / espaço governado','Gemini, Drive, or NotebookLM is the personal execution surface; governed shared files and outputs form the durable organizational layer.','Gemini, Drive ou NotebookLM é o ambiente pessoal de execução; arquivos e saídas compartilhados e governados formam a camada organizacional durável.'],
  ['Doppelganger','Doppelganger','Optional lens and personal profile that affect perspective and presentation, never mapping truth, validation, or governance.','Lente e perfil pessoal opcionais que afetam perspectiva e apresentação, nunca a verdade do mapeamento, a validação ou a governança.'],
  ['Approved Master','Approved Master','A reviewed canonical mapping in the governed library; a generated draft does not acquire this status automatically.','Mapeamento canônico revisado na biblioteca governada; um rascunho gerado não adquire esse status automaticamente.']
 ]
};
function projectYaml(id){if(id!=='olympus')return '';const excerpt="theme: olympus\naliases:\n  governor: Zeus\n  orchestrator: Hermes\ndomains:\n  professional_delivery:\n    display_name: Work\n    theme_owner: Apollo";return `<details class="architecture-yaml"><summary>${tr('Inside the YAML','Por dentro do YAML')}</summary><h3>${tr('Canonical roles, narrative aliases','Papéis canônicos, aliases narrativos')}</h3><p>${tr('An actual excerpt from the current theme configuration. Canonical roles define responsibility; narrative aliases supply display names.','Um trecho real da configuração temática atual. Papéis canônicos definem a responsabilidade; aliases narrativos fornecem nomes de apresentação.')}</p><pre tabindex="0" aria-label="${tr('Olympus theme YAML excerpt','Trecho YAML do tema Olympus')}"><code>${esc(excerpt)}</code></pre>${ext('https://github.com/Guilsc/olympus/blob/main/config/theme.yaml',tr('View original YAML','Ver YAML original'))}</details>`;}
function projectDefinitions(id){const items=diagramDefinitions[id]||[],li=lang==='pt'?1:0;return `<details class="architecture-definitions"><summary>${tr('Project definitions','Definições do projeto')} <span>${items.length}</span></summary><dl>${items.map(item=>`<div><dt>${esc(item[li])}</dt><dd>${esc(item[li+2])}</dd></div>`).join('')}</dl></details>`;}

let projectDiagramSelected=0;
const diagramPositions=[[120,150],[360,150],[600,150],[840,150],[840,420],[600,420],[360,420],[120,420]];
function diagramEdges(spec){const edges=spec.nodes.slice(1,spec.primaryCount||spec.nodes.length).map((n,i)=>{let a=diagramPositions[i],b=diagramPositions[i+1],path=a[1]===b[1]?`M${a[0]+(b[0]>a[0]?88:-88)} ${a[1]} H${b[0]+(b[0]>a[0]?-88:88)}`:`M${a[0]} ${a[1]+70} V${b[1]-68}`;return {from:i,to:i+1,path,dashed:i===6};});return edges.concat(spec.extra);}
function diagramNodeDetail(id,index){const spec=projectDiagrams[id],n=spec.nodes[index];return `<h3>${esc(n[lang==='pt'?1:0])}</h3><p class="architecture-role">${esc(n[lang==='pt'?3:2])}</p><p>${esc(n[lang==='pt'?5:4])}</p>`;}
function projectDiagram(id){if(id==='olympus')return olympusArchitecture();const spec=projectDiagrams[id];if(!spec)return '';projectDiagramSelected=Math.min(projectDiagramSelected,spec.nodes.length-1);const edges=diagramEdges(spec),li=lang==='pt'?1:0;return `<section class="flow architecture-flow" data-project-diagram="${esc(id)}" aria-labelledby="architecture-title"><div class="section-heading"><h2 id="architecture-title">${esc(spec.title[li])}</h2><p>${esc(spec.intro[li])}</p></div><p class="diagram-instructions">${tr('Select a component to enlarge its model and inspect its role. On smaller screens, scroll the diagram horizontally.','Selecione um componente para ampliar seu modelo e explorar seu papel. Em telas menores, deslize o diagrama horizontalmente.')}</p><div class="diagram-scroll" tabindex="0" role="region" aria-label="${tr('Architecture diagram, horizontally scrollable','Diagrama de arquitetura, rolagem horizontal')}"><div class="architecture-map"><canvas id="architecture-canvas" aria-hidden="true"></canvas><svg class="architecture-links" viewBox="0 0 960 600" role="img" aria-labelledby="${id}-diagram-title ${id}-diagram-desc"><title id="${id}-diagram-title">${esc(spec.title[li])}</title><desc id="${id}-diagram-desc">${esc(spec.intro[li])} ${edges.map((e,i)=>esc(spec.nodes[e.from][li]+' → '+spec.nodes[e.to][li]+': '+spec.messages[i][li])).join('. ')}</desc><defs><marker id="${id}-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1L9 5L1 9" fill="none" stroke="#c2b7ad"/></marker></defs>${edges.map((e,i)=>`<path class="architecture-edge${e.dashed?' return-edge':''}" d="${e.path}" marker-end="url(#${id}-arrow)"/><circle class="message-token" r="3.5" aria-hidden="true" style="offset-path:path('${e.path}');--message-delay:${i*.75}s;--conversation-duration:${edges.length*.75+3}s"/>`).join('')}</svg>${spec.nodes.map((n,i)=>`<button class="architecture-node" data-architecture-node="${i}" aria-pressed="${projectDiagramSelected===i}" aria-controls="architecture-detail" style="left:${diagramPositions[i][0]/9.6}%;top:${diagramPositions[i][1]/6}%;--node-accent:${i===spec.focal?'#ff963d':'#c2b7ad'}"><span class="architecture-node-name">${esc(n[li])}</span><span class="architecture-node-role">${esc(n[li+2])}</span></button>`).join('')}</div></div><div class="architecture-detail" id="architecture-detail" aria-live="polite">${diagramNodeDetail(id,projectDiagramSelected)}</div>${projectDefinitions(id)}${projectYaml(id)}<div class="conversation-key"><h3>${tr('The conversation','A conversa')}</h3><ol>${edges.map((e,i)=>`<li><span>${esc(spec.nodes[e.from][li])} ${icon('arrow')} ${esc(spec.nodes[e.to][li])}</span><span>${esc(spec.messages[i][li])}</span></li>`).join('')}</ol></div><p class="architecture-note">${esc(spec.note[li])} ${tr('Pulses illustrate message direction; this is not live activity.','Os pulsos ilustram a direção das mensagens; não são atividade ao vivo.')}</p>${ext(spec.source,tr('Architecture source','Fonte da arquitetura'))}</section>`;}
function bindProjectDiagram(){bindOlympusArchitecture();const root=$('[data-project-diagram]');if(!root)return;$$('[data-architecture-node]').forEach(b=>b.addEventListener('click',()=>{projectDiagramSelected=Number(b.dataset.architectureNode);$$('[data-architecture-node]').forEach(n=>n.setAttribute('aria-pressed',String(n===b)));$('#architecture-detail').innerHTML=diagramNodeDetail(root.dataset.projectDiagram,projectDiagramSelected);draw();}));}
function drawProjectDiagram(){drawOlympusMemory();const c=$('#architecture-canvas');if(!c)return;const rect=c.getBoundingClientRect();if(rect.bottom<0||rect.top>screenH)return;const w=rect.width,h=rect.height,d=Math.min(devicePixelRatio,1.5);if(c.width!==Math.round(w*d)||c.height!==Math.round(h*d)){c.width=Math.round(w*d);c.height=Math.round(h*d);}const pc=c.getContext('2d'),spec=projectDiagrams[$('[data-project-diagram]').dataset.projectDiagram];pc.setTransform(d,0,0,d,0,0);pc.clearRect(0,0,w,h);spec.nodes.forEach((n,i)=>{const p=diagramPositions[i],focal=i===spec.focal,zoom=i===projectDiagramSelected?1.3:1;sphere(pc,p[0]*w/960,(p[1]-30)*h/600,35*w/960*zoom*(spec===projectDiagrams['olympus']&&i===5?1+.07*Math.sin(time*1.2):1),240,focal?['255,174,58','255,34,144']:['194,183,173','194,183,173'],spec===projectDiagrams['olympus']?(i===5?time*.12:0):time*.2,focal?1.05:.8,i);});}
