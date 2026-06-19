# Checklist de Acessibilidade — Leitor de Tela

Passada manual de leitor de tela para validar o que a auditoria automática de contraste (2026-06-15) não cobre: ordem de leitura, anúncios dinâmicos, navegação por teclado e rótulos.

**Ferramentas:** NVDA (Windows, gratuito) ou VoiceOver (macOS, `Cmd+F5`). Testar em PT e EN.

> Convenção: marcar `⬜` o que ainda não foi verificado, `✅` o que passou, `❌` + nota o que falhou.

---

## 1. Navegação por teclado (sem mouse)

- ⬜ `Tab` a partir do topo revela o **skip link** ("Skip to main content") como primeiro foco
- ⬜ Skip link leva o foco para `#main-content` ao ativar com `Enter`
- ⬜ Todos os links do header (logo, About, Cases, Contact) são alcançáveis e têm foco visível
- ✅ Toggle de tema é alcançável e tem `focus-visible` (outline cha-mate) — corrigido 2026-06-19
- ✅ Switcher de idioma tem `aria-label` e `aria-current="page"` no idioma ativo
- ✅ Botões do filtro têm `aria-pressed` e live region anuncia resultado — corrigido 2026-06-19
- ⬜ Cada CaseCard é um link único focável (não há foco preso em elementos internos)
- ⬜ Ordem de tabulação segue a ordem visual (About → Career → Cases → Contact)
- ⬜ Nenhum *focus trap*; `Shift+Tab` volta corretamente
- ⬜ Foco visível em todos os elementos interativos (outline jambu/cha-mate)

## 2. Formulário de contato

- ✅ Cada campo (Nome, E-mail, Mensagem) tem label vinculado por `for`/`id`
- ✅ Campos têm `aria-required="true"`
- ✅ Submeter vazio move o foco para o 1º campo inválido
- ✅ Mensagem de erro vinculada por `aria-describedby`; campo marcado com `aria-invalid`
- ✅ Estado "Enviando…" anunciado por `aria-live="polite"`
- ✅ Sucesso/Erro: foco movido para alerta com `role="alert"` e `tabindex="-1"`
- ✅ Botão "Tentar novamente" focável e com `focus-visible`
- ✅ Botão WhatsApp: ícone SVG com `aria-hidden`, texto "Chat on WhatsApp" claro

## 3. Estrutura e semântica

- ✅ Hierarquia de headings: h1 no Hero, h2 por seção (About/Career/Cases/Contact), h3 em subsections (Education, Other activities) — corrigido 2026-06-19; CaseCard usa h3 (corrigido de h2)
- ⬜ Landmarks anunciados — verificar com leitor de tela (`header`, `main`, `footer`, `nav`)
- ⬜ Imagens dos cases têm `alt` descritivo (não apenas o título repetido)
- ✅ Logos de carreira: `alt={company}`, logo do header: `aria-label` no link pai
- ✅ Ícones SVG decorativos: `aria-hidden="true"` (download, WhatsApp, feedback icons)
- ✅ `<html lang>` correto — `lang="en"` na raiz, `lang="pt"` em `/pt`
- ✅ Widgets: `aria-label` no container com título + valor; dot pulsante com `aria-hidden`

## 4. Conteúdo dinâmico e movimento

- ✅ Scroll reveals (`data-animate`) usam `opacity: 0` — conteúdo permanece no DOM e acessível
- ✅ `prefers-reduced-motion: reduce` desativa transições e transforms via CSS; dot pulsante também para — corrigido 2026-06-19
- ✅ Ponto verde pulsante: `aria-hidden="true"`, sem anúncio repetido
- ✅ Filtro de cases: `display:none` remove cards da árvore de acessibilidade (comportamento correto)

## 5. Páginas de case (protegidas)

- ✅ Login: `<label for="password">`, `aria-required="true"`, erro com `role="alert"` e `id="login-error"`, `aria-describedby` no campo — corrigido 2026-06-19
- ⬜ Conteúdo Markdown do case: headings, listas e tabelas lidos em ordem — verificar com leitor de tela
- ⬜ Imagens inline e `image-placeholder` com texto alternativo coerente

---

## Achados conhecidos (da auditoria automática)

- 🟡 `--color-muted` em tags sobre `surface-2` fica em 3.77:1 (AA-large only). As pills de tag usam texto pequeno — reavaliar se vira problema na passada manual.

## Histórico

- **2026-06-15** — Auditoria automática de contraste (script de luminância). Corrigidos `--color-faint`, jambu como texto/botão. Ver [design-system.md](design-system.md) e [roadmap.md](roadmap.md).
