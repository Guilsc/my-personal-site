# Extração e adaptação da referência

Fonte: https://zoeyos.com/ · coleta em 06/10/2026.

Foram descobertas 27 páginas por links públicos internos e 36 arquivos CSS/JS. Nenhum formulário foi enviado; áreas autenticadas e destinos externos não foram explorados. O inventário é de fonte pública, não uma garantia de todas as rotas existentes.

## Mapa de adaptação

| Família | Padrão observado | Aplicação no portfólio |
|---|---|---|
| Home | Narrativa ampla, núcleo de partículas, capacidades em sequência, projeto com painéis laterais, personalização e fechamento. | Home profissional: posicionamento → competências → Curatia → publicações → próximo desafio. |
| Guide | Índice de seções e instruções em capítulos. | Página de expertise e estudos de caso com navegação persistente e evidências. |
| Business | Proposta para equipes, capacidades e contato. | Projeto detalhado: problema, papel, abordagem, resultado e próximo passo. |
| Blog | Artigo principal destacado, grade de resumos e datas. | Publicações do LinkedIn, filtros por categoria e links originais. |
| 13 artigos | Leitura em coluna, hierarquia de títulos e continuidade editorial. | Modelo de leitura preparado; texto integral só quando existir uma fonte autorizada. |
| Contact | Escolha de destino de contato. | Email, LinkedIn e GitHub, sem formulário sem backend. |
| Create account / download / pricing | Estados de formulário, confirmação e escolha comercial. | Somente linguagem visual de controles; sem login, preço ou download fictícios no portfólio. |
| 6 páginas legais | Leitura extensa, índices e tabelas. | Referência de leitura e organização; não transportar políticas de outra empresa. |

## Sistema observado

Fundo preto, fontes Onest e JetBrains Mono, laranja #ff8c42, rosa #ff6b8a e dourado #ffd166. Painéis escuros translúcidos, navegação persistente, alternância entre seções amplas e densas, controles arredondados e partículas. A fonte global declara raios 8/12/16 px, curvas de saída suaves e estados de foco. Os estilos incluem breakpoints de 430 a 900 px e tratamento de movimento reduzido.

## Componentes reutilizáveis da proposta

- Header: nome, destinos e contato; navegação disponível no mobile.
- Particle field: movimento decorativo contínuo, pausa e versão estática com movimento reduzido.
- Capability panel: título, explicação e referência; amplo, sem aninhar cards.
- Project spotlight: projeto à esquerda; problema, abordagem e resultado ao lado.
- Repository row: estado real, descrição e acesso ao repositório.
- Process explorer: etapas e comparação de duas decisões do ciclo Curatia.
- Publication card: categoria, título, resumo, data e link original; destaque editorial para o primeiro.
- Reading layout: coluna confortável, sem animação atrás do corpo do artigo.
- Challenge selector: modifica a explicação e mantém o contato disponível.
- Footer: destino profissional, links e distinção de mockup.

## Conteúdo e limites

Projetos e posicionamento foram adaptados dos arquivos atuais do repositório. Publicações: live public publications API. A integração expõe título, resumo, categoria, data e URL; não foi obtido texto integral. O mockup mostra os resumos existentes no idioma original. Não inventa resultados, clientes, certificações, avaliações ou números.

A implementação da animação é original. A identidade da Zoey, sua marca, textos, imagens, políticas e código de animação não são incorporados ao mockup. A referência informa composição e comportamento; este pacote usa tokens e componentes próprios.

## Cobertura de páginas

- https://zoeyos.com/
- https://zoeyos.com/guide
- https://zoeyos.com/business
- https://zoeyos.com/blog
- https://zoeyos.com/contact
- https://zoeyos.com/create-account
- https://zoeyos.com/legal/terms
- https://zoeyos.com/legal/privacy
- https://zoeyos.com/legal/aup
- https://zoeyos.com/blog/chat-with-your-documents
- https://zoeyos.com/blog/how-to-talk-to-ai
- https://zoeyos.com/blog/too-many-ai-tools
- https://zoeyos.com/blog/what-is-a-personal-ai
- https://zoeyos.com/blog/ai-on-your-computer-vs-cloud-sandbox
- https://zoeyos.com/blog/one-ai-many-workers
- https://zoeyos.com/blog/why-automations-fail-silently
- https://zoeyos.com/blog/ai-that-remembers-every-conversation
- https://zoeyos.com/blog/how-to-delegate-your-first-task-to-an-ai
- https://zoeyos.com/blog/what-an-ai-should-never-do-without-you
- https://zoeyos.com/blog/ai-agent-vs-ai-assistant
- https://zoeyos.com/blog/the-interface-for-ai-is-a-place
- https://zoeyos.com/blog/voice-is-becoming-the-default-way-to-work-with-ai
- https://zoeyos.com/legal/open-source
- https://zoeyos.com/pricing
- https://zoeyos.com/legal/subprocessors
- https://zoeyos.com/legal/dpa
- https://zoeyos.com/download

## Próxima implementação no React

Usar os componentes e tokens existentes do portfólio: src/components, src/styles.css, DESIGN.md e .impeccable/design.json. O pacote é um mockup separado; não migra nem substitui a produção. Preservar EN/PT, loaders com fallback, rotas de projetos e integrações. Texto completo do LinkedIn exige expandir a fonte de conteúdo antes de criar páginas de artigo.

Nota de cobertura: robots.txt respondeu HTTP 403. A coleta cobre todos os destinos públicos internos descobertos por links, sem afirmar cobertura de rotas ocultas ou autenticadas.
