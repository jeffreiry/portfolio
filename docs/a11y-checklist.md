# Checklist de Acessibilidade — Leitor de Tela

Passada manual de leitor de tela para validar o que a auditoria automática de contraste (2026-06-15) não cobre: ordem de leitura, anúncios dinâmicos, navegação por teclado e rótulos.

**Ferramentas:** NVDA (Windows, gratuito) ou VoiceOver (macOS, `Cmd+F5`). Testar em PT e EN.

> Convenção: marcar `⬜` o que ainda não foi verificado, `✅` o que passou, `❌` + nota o que falhou.

---

## 1. Navegação por teclado (sem mouse)

- ⬜ `Tab` a partir do topo revela o **skip link** ("Skip to main content") como primeiro foco
- ⬜ Skip link leva o foco para `#main-content` ao ativar com `Enter`
- ⬜ Todos os links do header (logo, About, Cases, Contact) são alcançáveis e têm foco visível
- ⬜ Toggle de tema (claro/escuro) é alcançável e operável por `Enter`/`Espaço`
- ⬜ Switcher de idioma EN↔PT é alcançável e anuncia o idioma atual
- ⬜ Botões do **filtro de cases** são alcançáveis; `Enter` aplica o filtro
- ⬜ Cada CaseCard é um link único focável (não há foco preso em elementos internos)
- ⬜ Ordem de tabulação segue a ordem visual (About → Career → Cases → Contact)
- ⬜ Nenhum *focus trap*; `Shift+Tab` volta corretamente
- ⬜ Foco visível em todos os elementos interativos (outline jambu/cha-mate)

## 2. Formulário de contato

- ⬜ Cada campo (Nome, E-mail, Mensagem) tem o rótulo anunciado ao receber foco
- ⬜ Campos obrigatórios anunciam "obrigatório" (`aria-required`)
- ⬜ Submeter vazio move o foco para o 1º campo inválido
- ⬜ Mensagem de erro é anunciada ao focar o campo inválido (`aria-describedby`)
- ⬜ Estado "Enviando…" é anunciado pela região `aria-live="polite"`
- ⬜ Sucesso: foco move para o alerta e a mensagem é lida (`role="alert"`)
- ⬜ Erro de envio: foco move para o alerta e o botão "Tentar novamente" é alcançável
- ⬜ Botão WhatsApp tem rótulo claro fora de contexto visual

## 3. Estrutura e semântica

- ⬜ Hierarquia de headings coerente (um `h1`, seções em `h2`, sem saltos)
- ⬜ Landmarks anunciados (`header`, `main`, `footer`, `nav`)
- ⬜ Imagens dos cases têm `alt` descritivo (não apenas o título repetido)
- ⬜ Logos (header, footer, carreira) têm `alt` ou estão marcados como decorativos
- ⬜ Ícones SVG decorativos têm `aria-hidden="true"`
- ⬜ Idioma da página correto (`<html lang>`) — PT em `/pt`, EN na raiz
- ⬜ Widgets Strava/Hevy: número e unidade lidos juntos (ex: "79 quilômetros"), não soltos

## 4. Conteúdo dinâmico e movimento

- ⬜ Scroll reveals (`data-animate`) não escondem conteúdo de leitores de tela
- ⬜ `prefers-reduced-motion` desativa animações (verificar com a preferência ativa no SO)
- ⬜ Ponto verde pulsante dos widgets não gera anúncio repetido/ruído
- ⬜ Filtro de cases: ao ocultar cards, o leitor não lê cards com `display:none`

## 5. Páginas de case (protegidas)

- ⬜ Login: campo de senha rotulado, erro anunciado
- ⬜ Conteúdo Markdown do case: headings, listas e tabelas lidos em ordem
- ⬜ Imagens inline e `image-placeholder` com texto alternativo coerente

---

## Achados conhecidos (da auditoria automática)

- 🟡 `--color-muted` em tags sobre `surface-2` fica em 3.77:1 (AA-large only). As pills de tag usam texto pequeno — reavaliar se vira problema na passada manual.

## Histórico

- **2026-06-15** — Auditoria automática de contraste (script de luminância). Corrigidos `--color-faint`, jambu como texto/botão. Ver [design-system.md](design-system.md) e [roadmap.md](roadmap.md).
