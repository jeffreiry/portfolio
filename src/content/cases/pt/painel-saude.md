---
title: "Painel Saúde"
slug: painel-saude
role: "Product Designer, solo, end-to-end"
summary: "Dashboard unificando Strava e Hevy em uma visão de progresso diária rumo à maratona de 2028."
company: "Projeto pessoal"
year: 2025
accent: "#e8f5e9"
tags: ["Dashboard", "Design de informação", "Integração de APIs", "DataViz"]
url: "https://painel-saude-zeta.vercel.app"
metrics:
  - label: "Autonomia operacional"
    value: "100% automático, atualização diária"
  - label: "Cobertura de dados"
    value: "Mar/2025 → presente"
featured: false
draft: true
order: 5
---

## Um único painel para uma jornada de 3 anos rumo à maratona

**TL;DR** — Product Designer solo, end-to-end (design de informação → implementação → ops). Dashboard pessoal que unifica corrida (Strava) e força (Hevy) em uma narrativa única de progresso rumo a uma maratona em 2028, com dados que se atualizam sozinhos todo dia.

**Tags:** Dashboard · Design de informação · Integração de APIs · SvelteKit · DataViz

**URL:** https://painel-saude-zeta.vercel.app · **Período de dados:** Mar/2025 → presente

---

## Contexto & Problema

Quem treina sério vive com os dados fragmentados: corrida mora no Strava, força mora no Hevy, cada app com sua própria lente. Não existe uma visão integrada que responda à pergunta que importa — **"estou progredindo rumo à minha meta?"** — nem que cruze sinais entre as modalidades (força × corrida, clima × pace).

**Estado anterior:** dois apps, duas histórias soltas, nenhuma resposta sobre a trajetória de longo prazo.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Dashboard overview</strong>
  <span>Visão unificada de corrida + força em uma narrativa de progresso</span>
</div>

---

## Seu papel

Solo, end-to-end: design de informação, arquitetura de dados, implementação (SvelteKit + Chart.js) e operação (deploy e sync automático).

---

## Restrições

- **Single-user, zero infra paga** — a arquitetura precisava custar nada.
- **APIs de terceiros** com limites de requisição e tokens que expiram.
- **Frescor sem manutenção** — os dados precisavam se manter atualizados sem trabalho manual diário.

---

## Descoberta & Insight

O valor não estava em **mais um gráfico**, e sim em **integração + projeção**. Cruzar fontes responde perguntas que nenhum app isolado responde: projetar tempos de prova (fórmula de Riegel ancorada no recorde real), alertar desequilíbrios entre força e corrida, e contextualizar o pace pelo clima.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Arquitetura de dados</strong>
  <span>Pipeline: Strava/Hevy API → GitHub Actions → JSON → SvelteKit → Vercel</span>
</div>

---

## Processo & Decisões

**1. Arquitetura de dados — problema:** dashboards "de verdade" pedem banco e API server, o que custa dinheiro e manutenção. **Opções:** banco + backend (tempo real, caro) vs. JSON estático versionado no Git (não-tempo-real, grátis). **Escolha:** JSON estático como fonte única de verdade, atualizado por um sync diário. **Porquê:** o painel é leitura, single-user; dados versionados no Git são auditáveis, custam zero e rodam em qualquer CDN. Trade-off consciente: abro mão de tempo real por simplicidade e custo zero.

**2. Sync automático — problema:** dados estáticos envelhecem. **Escolha:** GitHub Actions roda todo dia às 06h (BRT), puxa Strava + Hevy, commita só os JSONs que mudaram, e o push dispara um novo deploy na Vercel. **Porquê:** frescor diário sem servidor e sem eu tocar em nada.

**3. SvelteKit sem SSR — problema:** Chart.js precisa do DOM e os dados já são estáticos no build. **Escolha:** sem SSR, mas com `adapter-vercel` (não `adapter-static`). **Porquê:** SSR não agregaria valor aqui, mas o adapter-vercel deixa a porta aberta para uma rota de API futura (ex: webhook do Strava para sync em tempo real) sem migração.

**4. Design de informação — problema:** dado demais vira ruído. **Escolha:** cada aba responde **uma** pergunta. *Semana:* estou cumprindo o plano? *Meta:* estou no caminho da maratona de 2028? *Atenção:* força e corrida estão equilibradas? *Clima:* o calor explica meu pace? *Provas:* como evoluí entre corridas? **Porquê:** a estrutura segue as perguntas do usuário, não as fontes de dados.

**5. Confiabilidade do dado — problema:** a mesma corrida pode vir de fontes diferentes. **Escolha:** prioridade explícita nos realizados — **manual > Strava > Hevy > nulo**. **Porquê:** a fonte mais confiável vence; o registro manual sempre tem a palavra final.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Aba "Meta"</strong>
  <span>Projeção de tempo de maratona via fórmula de Riegel ancorada no PR real de 10K</span>
</div>

---

## Solução

Dashboard público com 8 abas (Semana, Força, Treinos, Provas, Meta, Atenção, Clima, Histórico). Destaques: projeção de tempos por Riegel ancorada no recorde real de 10K (atualiza sozinha após cada sync); calendário com filtros e *streak* de semanas consecutivas; comparador de duas provas com splits de pace e FC por km.

---

## Craft & DataViz

- Estimativas de prova (`t2 = t1 × (d2/d1)^1.06`) recalculadas a cada sync a partir do PR real — nunca um número chumbado.
- Mapeamento de nomes Hevy→gráfico mantido sincronizado em dois lugares (script de sync + componente), documentado para não divergir.
- KPIs no topo de cada aba para resposta imediata antes do detalhe.

---

## Colaboração técnica

Pipeline: `Strava/Hevy API → scripts de sync → JSON → build do SvelteKit → Vercel`. Segredos em GitHub Secrets + Vercel Env Vars; `.env` no `.gitignore`. Fluxo de re-auth do Strava documentado para quando o refresh token expira.

---

## Impacto

- **Autonomia operacional:** atualização **100% automática**, diária, sem intervenção manual.
- **Cobertura:** histórico contínuo de **Mar/2025 até o presente**, integrando duas modalidades em uma narrativa.
- **Projeção:** estimativas de prova sempre ancoradas no recorde real e atualizadas sozinhas.
- ⬜ Métricas de acesso/uso — preencher.

---

## Aprendizados

Tratar dados como **fonte única de verdade versionada** transformou simplicidade em feature: auditável, reproduzível e barata. **Lição:** a decisão arquitetural mais "chata" (JSON no Git) foi a mais acertada — escolher a complexidade que o problema realmente exige, e não a que impressiona.
