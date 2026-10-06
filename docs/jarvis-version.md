# Versão orbital / Jarvis visual

O usuário definiu uma combinação de quatro referências do Impeccable e escolheu somente animação visual. A primeira galeria permanece na branch impeccable/portfolio-refinement, commit 729ec05. A nova versão está em impeccable/jarvis-system. Main não pode receber merge ou push sem aprovação explícita do usuário.

## Referências
- https://impeccable.style/gallery/view/42d9852f2e6eb2d2/ — conexões de circuito e estrutura precisa.
- https://impeccable.style/gallery/view/1fa79279fe619e6e/ — superfície creme e acento cobre/vermelho para a evidência de projetos.
- https://impeccable.style/gallery/view/f14035dfc93a2832/ — composição circular técnica.
- https://impeccable.style/gallery/view/3c980d70d359bada/ — campo azul escuro, verde menta e topologia.
- https://www.instagram.com/reel/DatP-9iCaI1/ — referência fornecida pelo usuário para a ideia Jarvis. Não foi reproduzido produto, branding ou funcionalidade de assistente.

## Implementação
Canvas 2D com geometria exata, quatro conexões reais às áreas do portfólio, anéis segmentados, pulsação lenta e luzes com fases distintas. Sem chat, voz ou dados de telemetria simulados. Botão de pausa/retomada, alternativa estática para prefers-reduced-motion, pausa fora da área visível e quando a página fica oculta. DPR limitado a 2 e sem dependência nova de animação.

Chakra Petch nos títulos e Hanken Grotesk no corpo. Identidade aplicada apenas ao portfólio público. Comparação das etapas reais da Curatia, conteúdo bilíngue e integrações existentes preservados.

## Verificação
Build completo passou. ESLint nos três arquivos TSX da segunda versão: zero erros e avisos. Páginas públicas verificadas em desktop e mobile; home também em 320px, sem overflow horizontal no cenário medido. Pausa e troca de idioma verificadas no navegador. O fallback de movimento reduzido e os observadores de visibilidade foram verificados no código; não houve ensaio em dispositivo físico ou medição de FPS em hardware intermediário.

Detector executado uma vez: fonte Space Grotesk substituída; avisos de tokens referiam-se ao DESIGN.md da primeira versão e são tratados pela documentação da nova identidade. TypeScript completo ainda possui falhas anteriores da Curatia/configuração Vite, conforme o relatório da primeira revisão.

Sem publicação, push ou merge em main.
