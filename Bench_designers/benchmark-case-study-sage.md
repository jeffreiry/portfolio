# Sage (Emily Backes) vs. Meu Portfólio — Comparação de Padrões

**Referência:** https://www.emilybackes.design/case-study/sage-designing-an-ai-powered-chatbot
**Data:** 19/06/2026

## Contexto do meu portfólio atual
- Hero com cor/imagem de fundo + tags + título + summary + role/empresa/ano
- Imagem cover full-width
- Grid de metrics cards (se houver dados)
- Markdown puro como conteúdo
- Related cases automáticos por tags no final

---

## 1. O que o Sage tem que o meu NÃO tem

| Padrão observado | Tenho? | Lacuna / Oportunidade |
|---|---|---|
| H1 com resultado quantificado | ❌ | Summary do frontmatter é descritivo; título não carrega o resultado. Mover a métrica-chave para o H1 ("Como eu [resultado] ao [mudança]"). |
| Subtítulo de insight comportamental (não descrição) | ⚠️ | Tenho summary, mas provavelmente descritivo. Trocar por uma observação de usuário que cristaliza o problema. |
| Seção ANALYSIS separada de OUTCOMES | ❌ | Conteúdo atual não separa "números de impacto" de "o que/por que funcionou" (taxonomia + falhas). |
| Admissão honesta de falhas / trade-offs | ❌ | Markdown puro não incentiva esse bloco; adicionar uma seção de limitações/retrospectiva aumenta credibilidade. |
| Gráficos anotados com marcos temporais | ❌ | Métricas só em stat cards. Faltam gráficos com anotações tipo "lançamento" / "X aposentado". |
| Pull-quote com pergunta norteadora | ❌ | .case-content não tem estilo de pull-quote (itálico, centralizado, entre filetes). |
| Mockup interativo no hero | ❌ | Apenas imagem cover estática. Oportunidade de embed/protótipo HTML. |
| Code-switching de cor de fundo por bloco | ❌ | Background uniforme no conteúdo. Alternar fundos separa visualmente processo de resultado. |
| Eyebrows de seção (rótulo caixa-alta colorido) | ❌ | Markdown puro usa só ## headings. Eyebrows dão ritmo e escaneabilidade. |
| Rótulos pareados de duas pontas (V1 ↔ tese) | ❌ | Útil para narrativas de versão/iteração (esquerda: o quê; direita: a tese). |
| Contraste de largura (texto estreito vs. visual full-width) | ⚠️ | Tenho cover full-width, mas o corpo provavelmente segue largura única. Alternar cria ritmo. |
| Captions de decisão sob cada visual | ⚠️ | Markdown permite, mas exige disciplina; cada imagem deve explicar a *decisão*, não só descrever. |

Legenda: ❌ não tenho · ⚠️ tenho parcial / depende de como uso

---

## 2. O que o MEU tem que o Sage NÃO tem

| Recurso meu | Sage tem? | Vantagem minha |
|---|---|---|
| Metadados estruturados no hero (role / empresa / ano + tags) | ❌ (só categoria + período) | Mais escaneável e profissional logo de cara; recrutador identifica papel e contexto na hora. |
| Imagem cover full-width dedicada | ❌ (hero é só tipografia + mockup) | Impacto visual imediato; melhor para thumbnails/compartilhamento social. |
| Grid de metrics cards reutilizável/sistêmico | ⚠️ (tem stat cards, mas ad-hoc) | Componente consistente entre cases; menos esforço por case. |
| Related cases automáticos por tags no final | ❌ (sem prev/next nem relacionados) | Resolve uma lacuna real do Sage: mantém o visitante navegando pelo portfólio. |
| Conteúdo em Markdown puro | n/a | Manutenção simples, portável, rápido de publicar. |

---

## 3. Prioridades de ação (custo x impacto)

**Alto impacto / baixo custo (fazer já):**
1. Reescrever o **H1** para incluir o resultado quantificado; mover a descrição para o summary.
2. Trocar o **summary** por um insight comportamental do usuário.
3. Adicionar suporte a **pull-quote** e **eyebrows** no CSS do .case-content.
4. Alternar **cor de fundo** entre blocos de processo e de resultado.

**Médio custo:**
5. Separar **OUTCOMES** (números) de **ANALYSIS** (taxonomia + falhas) como blocos distintos no template.
6. Padronizar **captions de decisão** sob cada imagem.

**Maior custo / opcional:**
7. **Gráficos anotados** com marcos temporais (componente de chart).
8. **Mockup interativo** no hero para cases que justifiquem.

**Manter o que já é vantagem:** metadados estruturados, cover full-width, grid de metrics sistêmico e os **related cases automáticos** (que o Sage nem tem).
