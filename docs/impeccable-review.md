# Impeccable — revisão do portfólio

## Escopo confirmado
Galeria de trabalho, com prioridade para oportunidades profissionais e projetos/publicações como evidência. Revisão das páginas públicas em inglês/português, diretamente no código. A ferramenta interna Curatia e suas integrações não foram redesenhadas. Branch: impeccable/portfolio-refinement.

## Sequência e aplicação
- init e shape: PRODUCT.md, escolha da galeria e contrato de direção em .impeccable/surfaces/src-routes-index-tsx.md.
- document: sistema final registrado em DESIGN.md e .impeccable/design.json após a revisão.
- critique e audit: revisão da interface existente, navegação móvel oculta, textos de 8–11px, traduções parciais, semântica das especialidades e validação anterior às alterações.
- clarify e distill: ações explícitas, introduções do catálogo orientadas ao visitante, remoção de numeração e rótulos decorativos.
- extract, typeset, layout e colorize: cabeçalho compartilhado, tokens públicos isolados, Hanken Grotesk/Bodoni Moda, campos de cobalto e hierarquia responsiva.
- bolder e quieter: projeto destacado em grande escala, demais evidências com leitura mais contida; não aplicar intensidades opostas ao mesmo elemento.
- adapt, onboard e harden: navegação visível no celular, áreas de toque, skip link, disclosures nativos, idiomas persistentes, narrativas traduzidas e estados vazios com recuperação.
- optimize, animate e delight: retrato local WebP com lazy loading, interface sem biblioteca extra para efeitos, movimento discreto com alternativa para movimento reduzido, foco/seleção alinhados à identidade.
- overdrive: o usuário escolheu explorar e comparar etapas reais da Curatia. Painel com seletores nativos, limites de aprovação e aviso quando ambas as etapas são iguais. Nenhum resultado ou processo anterior foi inventado.
- live/generate: foram avaliados como ferramentas de exploração de variantes; a direção foi escolhida em rodadas de propostas e validada no navegador local. Não foi iniciado o overlay de variantes nem criada uma sessão live-poll: não são uma etapa obrigatória de publicação.
- polish: revisão independente, correção dos quatro achados materiais e verificação final.

## Validação
- npm run build: passou na revisão original com a integração então existente do Bot Ecosystem. Essa integração foi removida; a aplicação agora tem deployment independente em https://bot-ecosystem.guilhermecosta.tech. Este registro histórico não valida a arquitetura atual.
- ESLint nos arquivos alterados: zero erros; dois avisos anteriores de Fast Refresh em i18n.tsx.
- npm run typecheck: ainda falha em código anterior da Curatia e em acessos a process.env do vite.config.ts; nenhum erro nos arquivos públicos alterados.
- Lint completo anterior às alterações: 51 erros e 10 avisos, concentrados na Curatia e nos componentes existentes.
- Detector mecânico inicial: nenhuma ocorrência reportada; não substitui a revisão visual/funcional e não foi executado novamente após o painel adicional.
- Navegador: páginas públicas, filtros, seleção de idioma, disclosures e comparação verificados. Sem overflow horizontal nos cenários medidos de 1440, 390 e 320px; teste de viewport emulado, não de dispositivo físico.
- Conteúdo original das publicações e descrições externas de repositórios permanecem no idioma de origem.

## Entrega
Implementação e documentação locais para revisão. Não houve merge nem publicação em produção. A aplicação interna Curatia ainda precisa de uma revisão separada para tornar os checks completos verdes.
