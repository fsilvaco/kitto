# Kitto — Agente de Desenvolvimento

## Visão do Produto

**Kitto** é um gerador de media kit para criadores do Instagram. O usuário preenche suas informações, escolhe um template visual e exporta o media kit via link ou PDF.

O produto vende pela aparência — priorize qualidade visual em todas as decisões de implementação.

---

## Stack

- **Next.js 14** com App Router
- **TypeScript** — sem `any`
- **Tailwind CSS**
- **Shadcn/ui** para componentes base
- **React Hook Form** + **Zod** para formulários e validação
- **Zustand** para estado global
- **Framer Motion** para transições entre steps
- **html2canvas** + **jsPDF** para exportação em PDF

---

## Identidade Visual

| Token            | Valor                 |
| ---------------- | --------------------- |
| Primary gradient | `#7C3AED` → `#EC4899` |
| Background       | `#ffffff`             |
| Surface          | `#f9fafb`             |
| Text primary     | `#111827`             |
| Text muted       | `#6B7280`             |

---

## Estrutura de Pastas

```
/app
  /page.tsx                  ← redireciona para /generator
  /generator/page.tsx        ← página principal com os 3 steps

/components
  /steps
    StepIndicator.tsx
    Step1Form.tsx
    Step2Templates.tsx
    Step3Preview.tsx
  /templates
    TemplateClean.tsx
    TemplateBold.tsx
    TemplateVibrant.tsx
  /ui                        ← componentes Shadcn

/store
  useKittoStore.ts           ← estado global com Zustand

/types
  index.ts                   ← tipos do projeto
```

---

## Tipos

```typescript
// /types/index.ts

export interface MediaKitData {
  name: string;
  handle: string;
  niche: string;
  bio: string;
  location: string;
  profilePhoto: string | null;
  followers: string;
  engagementRate: string;
  reach: string;
  contentTypes: string[];
  brands: string;
  email: string;
}

export type TemplateId = "clean" | "bold" | "vibrant";
```

---

## Estado Global (Zustand)

```typescript
// /store/useKittoStore.ts

interface KittoStore {
  currentStep: 1 | 2 | 3;
  mediaKitData: MediaKitData;
  selectedTemplate: TemplateId;
  setStep: (step: 1 | 2 | 3) => void;
  setMediaKitData: (data: MediaKitData) => void;
  setSelectedTemplate: (template: TemplateId) => void;
}
```

---

## Fluxo da Aplicação

```
Step 1: Preencher dados
    ↓
Step 2: Escolher template (Clean, Bold ou Vibrant)
    ↓
Step 3: Preview final
    ├── Gerar Link → copia URL para clipboard + toast
    └── Baixar PDF → abre modal de upgrade (feature Pro)
```

---

## Templates

Todos os templates recebem `MediaKitData` como prop e renderizam o media kit completo com as seguintes seções:

1. Foto de perfil + nome + @handle
2. Badge de nicho
3. Bio + localização
4. Stats: seguidores, taxa de engajamento, alcance
5. Tipos de conteúdo (tags)
6. Marcas com quem trabalhou
7. E-mail de contato
8. Watermark: "Made with Kitto"

### Clean

Fundo branco, acentos em gradiente purple/pink, tipografia leve, muito espaçamento, stats em cards minimalistas.

### Bold

Fundo escuro `#0f0f0f`, texto branco, números em gradiente neon, borda da foto com efeito glow, tipografia pesada.

### Vibrant

Fundo em gradiente purple→pink, cards com glassmorphism (`backdrop-blur` + fundo branco semi-transparente), texto branco, cantos arredondados, visual energético.

---

## Dados de Exemplo (usar no desenvolvimento)

```json
{
  "name": "Ana Lima",
  "handle": "@analima",
  "niche": "Lifestyle",
  "bio": "Content creator passionate about conscious living, travel and authentic storytelling.",
  "location": "São Paulo, Brasil",
  "profilePhoto": null,
  "followers": "48200",
  "engagementRate": "4.7",
  "reach": "12100",
  "contentTypes": ["Reels", "Stories", "Feed Posts"],
  "brands": "Natura, Reserva, Havaianas",
  "email": "ana@analima.com"
}
```

---

## Plano de Desenvolvimento por Fases

Execute uma fase por vez. Ao finalizar cada fase, liste o que foi criado e aguarde confirmação antes de avançar.

### Fase 1 — Setup

- Criar projeto Next.js 14 com TypeScript e Tailwind
- Configurar Shadcn/ui
- Instalar dependências
- Configurar paleta no `tailwind.config.ts`
- Criar estrutura de pastas

### Fase 2 — Tipos e Estado Global

- Criar `/types/index.ts`
- Criar `/store/useKittoStore.ts`

### Fase 3 — Step 1 (Formulário)

- Validação com React Hook Form + Zod
- Upload de foto com preview circular
- Todos os campos do MVP
- Botão de avanço com validação

### Fase 4 — Templates

- `TemplateClean.tsx`
- `TemplateBold.tsx`
- `TemplateVibrant.tsx`

### Fase 5 — Step 2 (Escolha de Template)

- Grid com os 3 templates em escala reduzida (`scale-[0.35]`)
- Seleção com borda em gradiente
- Navegação entre steps

### Fase 6 — Step 3 (Preview e Export)

- Preview em tamanho real
- Botão "Gerar Link" com toast
- Botão "Baixar PDF" com badge Pro e modal de upgrade

### Fase 7 — Integração Final

- Montar `/generator/page.tsx` com os 3 steps
- `StepIndicator.tsx` com estados ativo, completo e pendente
- Transições com Framer Motion

---

## Convenções

- Todo código deve ser tipado — sem `any`
- Componentes em PascalCase
- Funções e variáveis em camelCase
- Commits por fase concluída
