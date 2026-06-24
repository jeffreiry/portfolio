# Checklist de Acessibilidade — Leitor de Tela

Passada manual de leitor de tela para validar o que a auditoria automática de contraste (2026-06-15) não cobre: ordem de leitura, anúncios dinâmicos, navegação por teclado e rótulos.

**Ferramentas:** NVDA (Windows, gratuito — nvaccess.org/download). Testar em PT e EN, preferencialmente no Chrome ou Firefox.

> Convenção: marcar `⬜` o que ainda não foi verificado, `✅` o que passou, `❌` + nota o que falhou.

---

## Como rodar o NVDA

1. Instale o NVDA (nvaccess.org/download → "Download NVDA" → instalação padrão)
2. Abra o Chrome e acesse `http://localhost:4321` (ou a URL de produção)
3. Pressione `Insert + S` para ativar a fala
4. Pressione `Insert + F7` a qualquer momento para ver a lista de todos os headings/links da página

**Atalhos de navegação principais:**

| Tecla | O que faz |
|---|---|
| `Tab` | Próximo elemento interativo (links, botões, campos) |
| `Shift+Tab` | Elemento interativo anterior |
| `H` | Próximo heading |
| `1`–`6` | Próximo heading do nível correspondente |
| `B` | Próximo botão |
| `F` | Próximo campo de formulário |
| `L` | Próxima lista |
| `T` | Próxima tabela |
| `G` | Próxima imagem |
| `Insert + Q` | Encerrar o NVDA |
| `Insert + F7` | Listar todos links / headings da página |
| `Insert + T` | Ler o título da aba atual |
| `Ctrl` | Parar a leitura |

---

## Roteiro de teste — Home EN (`/`)

### Chegada e skip link

- ⬜ Abrir `/` no Chrome com NVDA ativo; NVDA anuncia o título da página ("Jeferson Freiry — Product Designer")
- ⬜ Pressionar `Tab` uma vez: primeiro foco deve ser o **skip link** ("Skip to main content")
- ⬜ Pressionar `Enter` no skip link: foco salta para `#main-content`, NVDA anuncia o conteúdo
- ⬜ Pressionar `Shift+Tab` a partir de qualquer ponto: foco retorna corretamente (sem trap)

### Header

- ⬜ `Tab` a partir do skip link: foco vai para o **logo** ("Jeferson Freiry — home" via aria-label)
- ⬜ Próximos `Tab`s passam pelos links de nav: "About", "Cases", "Contact" (apenas no desktop — no mobile ≤809px o nav-pill está oculto)
- ⬜ Toggle de tema (`Tab`): NVDA anuncia o nome do toggle e o estado atual ("Light mode" ou "Dark mode")
- ⬜ Seleção de idioma (`Tab`): NVDA anuncia "Language selection" (grupo), "EN active page" ou similar, "PT — Switch to English"

### Hero (se houver vídeo)

- ⬜ Vídeo tem `muted`, `loop`, `playsinline` — NVDA não anuncia o vídeo repetidamente (está com `aria-hidden` ou sem `alt`)
- ⬜ Imagem de fallback do hero tem `alt` descritivo (não em branco)

### Seção About

- ⬜ `H` avança até heading "About" (H2) — NVDA anuncia "About, heading level 2"
- ⬜ Próximo `H`: "Career" (H2)
- ⬜ Dentro de About, `H` avança para "Education" (H3) e "Other activities outside work" (H3)
- ⬜ Cards de Education e Career lidos em ordem: nome, período, descrição
- ⬜ Logos de carreira têm `alt` com nome da empresa
- ⬜ Link "Full history — linkedin.com/in/jefersonfreiry →" tem texto descritivo (não "clique aqui")
- ⬜ Widgets (Run/Workout): NVDA anuncia km ou horas mensais; sem leitura duplicada de ícones
- ⬜ Botão "Download my Resume": NVDA anuncia nome do link + ícone SVG silenciado (`aria-hidden`)

### Seção Cases

- ⬜ `H` avança até heading "Cases" (H2)
- ⬜ Filtros: `B` ou `Tab` chega nos botões ("All", "Enterprise", etc.); `aria-pressed` anunciado ("pressed" / "not pressed")
- ⬜ Ativar um filtro com `Space`: live region anuncia "3 cases in Enterprise" (ou similar)
- ⬜ Cards ocultados pelo filtro desaparecem da árvore de acessibilidade (não recebem `Tab`)
- ⬜ `Tab` nos cards: foco vai direto no link do card (sem entrar nos elementos internos)
- ⬜ NVDA anuncia o título H3 do card ao focar o link (nome do case)
- ⬜ NVDA **não** anuncia a tag pill individualmente ao focar o link (tags são decorativas)

### Seção Contact

- ⬜ `H` avança até "Let's talk" (H2)
- ⬜ `Tab` chega em "jfreiry@gmail.com" (link de email com texto visível)
- ⬜ Link do LinkedIn tem texto completo ("linkedin.com/in/jefersonfreiry")
- ⬜ Botão WhatsApp: NVDA anuncia "Chat on WhatsApp" (ícone com `aria-hidden`)
- ⬜ Formulário: `F` chega no campo Name; NVDA anuncia "Name, required, edit text"
- ⬜ Campo E-mail: NVDA anuncia "Email, required, edit"
- ⬜ Textarea Mensagem: NVDA anuncia "Message, required, multi-line edit"
- ⬜ Submit sem preencher: foco vai para o 1º campo inválido; NVDA anuncia a mensagem de erro inline
- ⬜ Submeter corretamente: NVDA anuncia "Message sent!" (ou similar) via live region

---

## Roteiro de teste — Home PT (`/pt/`)

- ⬜ Repetir os mesmos passos acima em PT — verificar especialmente se o `lang="pt"` faz o NVDA usar voz/pronúncia correta
- ⬜ "Sobre", "Cases", "Contato" anunciados corretamente em PT
- ⬜ Filtros: "Todos", categorias em PT

---

## Roteiro de teste — Página de case (`/work/[slug]`)

### Acessar um case

- ⬜ Acessar `/work/enterprise-ai-assistant` logado (senha necessária) — ou desabilitar o middleware temporariamente para testar
- ⬜ NVDA anuncia o título da aba ("Enterprise AI Assistant — Jeferson Freiry")

### Hero do case

- ⬜ `H` avança até o H1 do case; NVDA anuncia o título completo
- ⬜ Tags do hero não recebem foco individual (são `span` sem role)
- ⬜ Thesis (itálico em display) é lido como texto normal (não como heading)
- ⬜ Links "View live →" têm texto descritivo (não só "→")

### CaseNav (barra de navegação de seções)

- ⬜ CaseNav aparece após sair do hero (rolar pela página); verificar se recebe foco por `Tab`
- ⬜ Botões da CaseNav: NVDA anuncia o número e o label ("1 CONTEXT", "2 DISCOVERY", etc.)
- ⬜ Botão ativo: `aria-current="location"` anunciado pelo NVDA
- ⬜ Ativar um botão: foco vai para a seção correspondente OU a seção é anunciada após o scroll

### Conteúdo Markdown

- ⬜ `H` percorre todos os H2s do case na ordem correta
- ⬜ H2 eyebrow (primeiro H2) lido como heading nível 2
- ⬜ H2 de seções subsequentes lidos como heading nível 2
- ⬜ Listas (`ul`/`ol`) anunciadas com contagem de itens ("list with 4 items")
- ⬜ Tabelas: NVDA anuncia "table with N rows, M columns"; navegar com `T` chega na tabela; `Tab` dentro da tabela percorre as células
- ⬜ Imagens inline: `alt` descritivo (não vazio, não "image")
- ⬜ Blockquote: texto lido em sequência (sem anúncio especial de "blockquote" — aceitável)
- ⬜ `code` inline: lido como texto sem anúncio de "code" (aceitável)

### Métricas (Enterprise)

- ⬜ Cards de métricas lidos: valor + label (ex.: "73% Reduction in manual work")
- ⬜ Animação count-up: NVDA não anuncia cada número intermediário (aceitável — animação é visual)

### "Next Case" card

- ⬜ Card "Next Case" é um link focável com texto de título do case
- ⬜ NVDA não lê duplicado (imagem + título — apenas o texto do link)

### Footer

- ⬜ Links do footer têm texto descritivo
- ⬜ Nenhum elemento recebe foco após o footer (sem elementos ocultos com tabindex positivo)

---

## Roteiro de teste — Versão PT do case (`/pt/work/[slug]`)

- ⬜ Repetir o roteiro de case em PT; verificar "Papel", "Empresa", "Ano", "Ver ao vivo →" anunciados em PT
- ⬜ "Próximo Case" anunciado em PT

---

## O que anotar quando algo falhar

Registrar neste formato:

```
❌ [componente] — [o que o NVDA anunciou] / [o que deveria anunciar]
Passo a passo para reproduzir:
1. ...
```

Exemplos de problemas comuns a observar:
- Foco "sumindo" (nenhum elemento visualmente destacado após pressionar Tab)
- Elemento anunciado como "blank" ou "group" sem nome
- Texto repetido (ex: imagem sendo lida duas vezes — no alt e no caption)
- Botão anunciado como "button" sem label ("button button" sem contexto)
- Foco ficando preso (Tab não avança)

---

## Achados conhecidos corrigidos

- ✅ `--color-muted` em tags sobre `surface-2`: corrigido 2026-06-23 — tags agora usam `--text-primary` (≥7:1 sobre surface-alt)
- ✅ `CaseCard`: `h2` → `h3` para hierarquia correta (2026-06-19)
- ✅ `ThemeToggle`: `focus-visible` adicionado (2026-06-19)
- ✅ Filtros de cases: `aria-pressed` + live region (2026-06-19)
- ✅ Login: `role="alert"` + `aria-required` + `aria-describedby` (2026-06-19)
- ✅ Formulário de contato: validação acessível completa (2026-06-15)
- ✅ Contraste WCAG AA: `--color-faint`, jambu tokens (2026-06-15)

## Histórico

- **2026-06-23** — Roteiro de teste detalhado escrito; contraste de tags corrigido
- **2026-06-19** — Segunda passada de código; Lighthouse mobile 95+ ✅
- **2026-06-15** — Auditoria automática de contraste (script de luminância)
