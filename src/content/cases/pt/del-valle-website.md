---
title: "Del Valle · Redesign de Site"
slug: del-valle-website
role: "UX · UI Designer"
summary: "Uma homepage que adapta a nova identidade visual global da Del Valle para o digital com fidelidade à marca."
thesis: "A fruta em tamanho real, antes de qualquer embalagem — porque a campanha se chamava \"Cheio de vida\", não \"Cheio de embalagem\"."
company: "Del Valle / Coca-Cola (via CWI)"
year: 2023
cover: /cases/del-valle-website/visao-geral.png
bgImage: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?fm=jpg&w=800&q=80&auto=format&fit=crop"
accent: "#fff9e6"
template: brand-split
tags: ["Design System", "Branding", "Mobile"]
scope: ["Wireframes", "Interfaces web + mobile"]
duration: "1 mês"
metrics:
  - label: "Anos de marca Del Valle celebrados"
    value: "77"
  - label: "Mercados unificados na nova identidade visual"
    value: "100+"
  - label: "Agências atuando em conjunto na criação da campanha"
    value: "5"
featured: false
draft: false
order: 8
---

## Quando a fruta é o cenário: como traduzi a nova identidade global da Del Valle em uma experiência digital com personalidade

**Resumo** — UX e UI Designer, 1 mês. Redesign de três páginas do site Del Valle (Coca-Cola) — Home, Fruta toda hora e Nossos Produtos — traduzindo uma nova identidade visual global (definida por outra equipe) em wireframes e interfaces web e mobile.

---

## Contexto & Problema

A Del Valle lançou uma nova identidade visual global com nova paleta, sistema tipográfico e linguagem gráfica. O site existente usava a identidade anterior e precisava ser atualizado para refletir a nova campanha — "Cheio de vida" — que reposicionava a marca com ênfase na origem brasileira das frutas, na cadeia de pequenos e grandes produtores e na conexão emocional entre o produto e a família. O desafio não era criar uma identidade do zero: era traduzir fielmente uma campanha rica em personalidade para um site funcional sem esvaziar sua expressividade no processo de digitalização.

Entrei como UX e UI Designer responsável pela tradução dessa identidade em produto — único designer dentro de um time de desenvolvedores — estudando o manual de identidade visual e as referências da campanha, definindo a arquitetura de informação das páginas, e desenvolvendo wireframes e interfaces (web e mobile) em Figma ao longo de 1 mês. Três páginas de conteúdo entregues: Home, "Fruta toda hora" e "Nossos Produtos" — essa última linkando para a Loja (e-commerce externo).

O espaço criativo estava restrito desde o início: as decisões de cor, tipografia e linguagem gráfica vinham do manual global da Coca-Cola/Del Valle — a liberdade estava na tradução, não na criação do sistema. E a campanha era visualmente rica, o que significava que o site precisava ser navegável sem sufocar a identidade com excesso de cautela.

**Estado anterior:** site com a identidade anterior, desconectado visualmente da nova campanha e sem a narrativa de origem das frutas que a nova posição de marca pretendia comunicar.

**Antes e Depois:** comparação entre o site pré e pós redesign.

<div class="before-after" style="--stages: 2;">
  <figure>
    <img src="/cases/del-valle-website/website_before.png" alt="Site anterior — identidade visual antiga, seções 'Fruta toda hora' e 'Da nossa família para a sua' com fotos em colagem circular">
    <figcaption>Antes</figcaption>
  </figure>
  <figure>
    <img src="/cases/del-valle-website/website_after.png" alt="Site redesenhado — nova identidade 'Cheio de vida' com manchas orgânicas coloridas por seção e frutas reais recortadas">
    <figcaption>Depois</figcaption>
  </figure>
</div>

---

## Descoberta & Insight

O manual de identidade trazia formas orgânicas, paleta de cores associadas a cada fruta e um posicionamento de marca centrado na origem brasileira. O insight veio ao estudar as referências: a campanha queria comunicar **sensorialidade** — cheiro, frescor, sabor — por um meio que não oferece nenhuma dessas experiências diretamente. A resposta estava nas próprias frutas: usá-las como protagonistas visuais em escala real, não reduzidas a ícones, e deixar as formas orgânicas irregulares refletir a imperfeição natural do produto — o oposto da assepsia dos sites de bebidas industriais.

**A virada:** o site não podia ser uma vitrine de produto. Precisava ser um ambiente com a textura e a temperatura da fruta — e isso dependia de decisões visuais precisas, não de mais funcionalidades.

Dali pro wireframe foi direto — web, tablet e mobile nasceram juntos, não em sequência:

<figure>
  <img src="/cases/del-valle-website/del-valle-wireframe-responsive.png" alt="Wireframe de baixa fidelidade nos três breakpoints — Web (1440px), Tablet (768px) e Mobile (375px)">
  <figcaption>Wireframes responsivos</figcaption>
</figure>

---

## Processo & Decisões

O sitemap ficou simples de propósito — só três páginas de conteúdo, sem profundidade desnecessária, com a Loja tratada como destino externo em vez de fluxo de checkout dentro do site:

<figure>
  <img src="/cases/del-valle-website/del-valle-sitemap-pt.png" alt="Sitemap do redesign — Home ramificando em Fruta toda hora e Nossos Produtos (páginas de conteúdo) e Loja (destino externo de e-commerce)">
  <figcaption>Sitemap</figcaption>
</figure>

A parte mais difícil desse mês não foi nenhuma decisão de tela — foi o ritmo. Criação, validação técnica com o time de devs e validação com os stakeholders da marca precisavam acontecer quase em paralelo pra caber no prazo, sem que nenhuma das três virasse gargalo das outras.

Vale registrar também o que não foi decisão minha, pra não inflar o que não é: a divisão de conteúdo entre as três páginas já vinha definida quando entrei — meu trabalho era aplicar a nova identidade em cima dessa arquitetura, não desenhá-la do zero. A escolha de qual hero mostra produto e qual mostra lifestyle (Home vs. Fruta toda hora) também veio do cliente, não de mim.

De fora, um rebranding costuma ser visto como reskin — trocar cor e fonte em cima de uma estrutura que já existe. Mas é exatamente esse tipo de projeto que abre uma brecha pra um designer sênior mexer em atrito que ninguém está olhando, porque a atenção do cliente inteira está na identidade visual, não na navegação. Não muda o produto nem o roadmap, mas dá espaço pra aplicar diretrizes de usabilidade que uma reforma maior não teria orçamento pra justificar sozinha. Aqui isso apareceu de um jeito pequeno e concreto: a Loja é um link externo (sai do site pra outro domínio), então ela foi desenhada como botão com contorno e ícone de carrinho, diferente dos outros itens de menu — a pessoa sabe, antes de clicar, que vai sair da experiência Del Valle. Ninguém vai notar isso como decisão de design; só vai notar se, sem ela, clicasse sem querer e ficasse perdida numa loja de terceiro.

**1. Grade alternada com carrossel de 4 dimensões — problema:** cada fruta tem múltiplas dimensões de informação (origem geográfica, número de produtores, período de safra, curiosidade). Exibir tudo de uma vez pesaria a página; exibir só a foto seria superficial. **Opções:** texto fixo abaixo de cada fruta vs. carrossel de cards com uma dimensão por tela. **Escolha:** grade alternada — cada fruta com uma célula de foto em tela cheia e uma célula de card branco que gira por 4 dimensões (De onde vem / Nº de Produtores / Safra / Curiosidade), com ícone ilustrado e pontos de navegação. **Porquê:** o carrossel convida à exploração sem forçar leitura — quem quer saber a origem navega; quem só quer ver a fruta, vê.

---

## Solução & Craft

Site redesenhado em três páginas de conteúdo, com sistema visual unificado:

- **Home:** hero com lineup completo de embalagens sobre fundo creme, manchas coloridas e frutas reais cortadas e posicionadas organicamente + seção-teaser "Fruta toda hora" em verde com foto circular crop + seção "Da nossa família para a sua" em rosa.
- **Fruta toda hora (a página, não a seção-teaser da Home):** hero de lifestyle + seção institucional em lime green ("Nossa paixão é do tamanho do Brasil") + grade de exploração das frutas brasileiras com carrossel de 4 dimensões por fruta.
- **Nossos Produtos:** catálogo completo com link direto pra Loja externa.

A grade de exploração é o verdadeiro chamariz da página — cada fruta ocupa uma célula de foto em tela cheia ao lado de um card branco que gira entre 4 dimensões (De onde vem / Nº de Produtores / Safra / Curiosidade):

<figure>
  <img src="/cases/del-valle-website/del-valle_fruta-toda-hora.png" alt="Página Fruta toda hora — hero de lifestyle com a proposta 'Nossa paixão é do tamanho do Brasil'">
  <figcaption>Página Fruta toda hora</figcaption>
</figure>

Os 4 cards abaixo mostram como o carrossel gira entre as dimensões, fruta a fruta:

<div class="contrast-box">
  <div class="before-after" style="--stages: 2;">
    <figure>
      <img src="/cases/del-valle-website/del-valle_fruta-toda-hora-laranja.png" alt="Card do carrossel — Laranja com a dimensão 'De onde vem: Sudeste'">
      <figcaption>Laranja — De onde vem</figcaption>
    </figure>
    <figure>
      <img src="/cases/del-valle-website/del-valle_fruta-toda-hora-uva.png" alt="Card do carrossel — Uva com a dimensão 'Nº de Produtores: 400'">
      <figcaption>Uva — Nº de Produtores</figcaption>
    </figure>
    <figure>
      <img src="/cases/del-valle-website/del-valle_fruta-toda-hora-caju.png" alt="Card do carrossel — Caju com a dimensão 'Safra: Setembro a Fevereiro'">
      <figcaption>Caju — Safra</figcaption>
    </figure>
    <figure>
      <img src="/cases/del-valle-website/del-valle_fruta-toda-hora-manga.png" alt="Card do carrossel — Manga com a dimensão 'Curiosidade'">
      <figcaption>Manga — Curiosidade</figcaption>
    </figure>
  </div>
</div>

Todas entregues em **web e mobile**, com os elementos gráficos orgânicos reorganizados para cada breakpoint — a sequência abaixo mostra a rolagem da Home, do hero até a seção "Da nossa família para a sua":

<figure>
  <img src="/cases/del-valle-website/mobile-scroll-3phones.png" alt="Rolagem da home no mobile em 3 telas — hero, seção 'Fruta toda hora' com foto de pessoa bebendo suco, e seção 'Da nossa família para a sua' com foto de mãe e filha">
  <figcaption>Navegação mobile</figcaption>
</figure>

- As **manchas orgânicas** são posicionadas para criar profundidade: sempre parcialmente cortadas pela borda da tela, nunca centralizadas — transmitem movimento e extrapolação da marca para além do frame.
- As **frutas reais** são recortadas e posicionadas sobre as manchas de cor correspondente (laranja sobre mancha laranja, uvas sobre mancha roxa), criando consistência associativa fruta-cor sem precisar de legenda.
- Na seção-teaser "Fruta toda hora" da Home, a **foto de pessoa é cortada em forma circular** sobre um círculo vermelho — coerente com a linguagem orgânica da identidade.
- Os **CTAs seguem a lógica de contraste por seção**: "Saiba mais" em laranja sobre fundo verde; "Saiba mais" em verde sobre fundo rosa — nunca uma cor de CTA padrão independente do contexto.
- No **mobile**, o menu hambúrguer preserva o "Cheio de vida" ao lado do logo; os elementos orgânicos são redimensionados proporcionalmente sem desaparecer.

---

## Aprendizados

<div class="dual-cards">
  <div class="dual-card">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3L3 10.5l7.5 3L13.5 21 21 3z"/></svg>
    <span class="dual-card-label">Desafios do Projeto</span>
    <p>A parte mais difícil desse mês não foi nenhuma decisão de tela — foi o <strong>ritmo</strong>: criação, validação técnica com o time de devs e validação com os stakeholders precisavam acontecer quase em paralelo pra caber no prazo.</p>
  </div>
  <div class="dual-card">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
    <span class="dual-card-label">Restrição do Projeto</span>
    <p>A divisão de conteúdo entre as três páginas e a escolha de qual hero mostra <strong>produto</strong> e qual mostra <strong>lifestyle</strong> já vinham definidas quando entrei — meu trabalho foi aplicar a identidade em cima dessa arquitetura, não desenhá-la do zero.</p>
  </div>
</div>

O maior aprendizado desse mês foi entender que diretrizes claras aceleram, não travam. Com o manual de identidade já definido — paleta, tipografia, tom de voz — a tradução de um briefing em produto fica muito mais rápida: em vez de gastar tempo decidindo "que cor combina", o trabalho vira estruturar hierarquia, fluxo e conteúdo em cima de uma base já validada pela marca. É meio contraintuitivo pra quem acha que restrição atrapalha — mas foi exatamente essa clareza que permitiu entregar três páginas completas, em web e mobile, em só um mês, com validação técnica e de stakeholders acontecendo em paralelo.

<!--metrics-here-->

A outra coisa que ficou foi o peso da escala. Del Valle é uma marca com 77 anos e presença em mais de 100 mercados — trabalhar nesse projeto não era só desenhar uma tela bonita, era saber que cada decisão de wireframe ia rodar dentro de uma identidade que representa a marca em nível nacional. Entrei como o único designer dentro de um time de devs, e essa responsabilidade — ser quem traduz uma diretriz de marca desse tamanho numa interface que de fato vai ao ar — pesou mais do que qualquer decisão pontual de layout.
