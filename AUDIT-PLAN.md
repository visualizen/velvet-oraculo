# 🔧 Velvet Oráculo — Plano de Auditoria para Produção

> **Objetivo:** Auditar e corrigir TODO o código do projeto Velvet Oráculo para que funcione em produção com Supabase integrado.
>
> **Prioridade:** Executar na ordem das fases abaixo. Cada fase é independente.

---

## 📋 Contexto do Projeto

- **Nome:** Velvet Oráculo (anteriormente "Flora / delatarot")
- **Stack:** Vite + React 18 + TypeScript + Tailwind CSS 3 + shadcn/ui
- **Tipo:** Landing pages para venda de curso de tarot online + ebook gratuito + link-in-bio + consulta via WhatsApp
- **Rotas:**
  - `/` — Página de vendas principal (curso)
  - `/ebook` — Landing page do ebook gratuito
  - `/consulta` — Formulário step-by-step que redireciona para WhatsApp
  - `/links` — Link-in-bio (portal de links)
  - `*` — 404 (catch-all)
- **Design System:** Cores via CSS vars (`--flora-*`, `--primary`, etc.), fontes Google (Cinzel, Italianno, IM Fell English, Cormorant Garamond, Inter)
- **Deploy alvo:** Vercel ou Netlify (SPA)

---

## Fase 1 — Limpeza de Código Morto

### 1.1 Deletar `src/App.css`

Este arquivo contém CSS do template Vite inicial (logo-spin, .card). Não é importado em nenhum lugar do projeto.

```
DELETAR: src/App.css
```

### 1.2 Deletar `src/components/sections/EbookOptinForm.tsx`

Este componente (390 linhas) é uma versão antiga do formulário de opt-in do ebook. Foi substituído pelo `EbookOptinModal.tsx`. **Não é importado em nenhum arquivo.**

```
DELETAR: src/components/sections/EbookOptinForm.tsx
```

### 1.3 Fix NotFound — Redirecionar para `/links`

Substituir a página 404 inteira por um redirect automático.

**Arquivo:** `src/pages/NotFound.tsx`

**Conteúdo atual (substituir TUDO):**
```tsx
import { Navigate } from "react-router-dom";

const NotFound = () => <Navigate to="/links" replace />;

export default NotFound;
```

### 1.4 Criar SPA Fallback para Deploy

Sem isso, acessar diretamente `/ebook`, `/consulta` ou `/links` retorna 404 no host.

**Criar arquivo:** `public/_redirects`
```
/*    /index.html   200
```

**Criar arquivo:** `vercel.json` (na raiz do projeto)
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Fase 2 — Compressão e Otimização de Imagens

O projeto tem ~11.3 MB em imagens. Meta: <2 MB total.

Usar `sips` (nativo macOS) para comprimir. **Executar todos os comandos abaixo no terminal, na raiz do projeto.**

### 2.1 Criar backup das originais

```bash
mkdir -p public/images/_originals public/textures/_originals
cp public/images/*.png public/images/*.jpg public/images/*.jpeg public/images/_originals/ 2>/dev/null
cp public/textures/*.png public/textures/*.jpg public/textures/*.jpeg public/textures/_originals/ 2>/dev/null
```

### 2.2 Comprimir imagens (PNG → JPEG 85%)

```bash
# luisa-perfil.png (3.1MB, 922x1600) → redimensionar para 600w + JPEG
sips -Z 1200 public/images/luisa-perfil.png
sips -s format jpeg -s formatOptions 85 public/images/luisa-perfil.png --out public/images/luisa-perfil.jpg
rm public/images/luisa-perfil.png

# tarot-scene.png (968KB) → JPEG
sips -s format jpeg -s formatOptions 85 public/images/tarot-scene.png --out public/images/tarot-scene.jpg
rm public/images/tarot-scene.png

# portal.png (924KB) → JPEG
sips -s format jpeg -s formatOptions 85 public/images/portal.png --out public/images/portal.jpg
rm public/images/portal.png

# ebook-mockup.png (888KB) → JPEG
sips -s format jpeg -s formatOptions 85 public/images/ebook-mockup.png --out public/images/ebook-mockup.jpg
rm public/images/ebook-mockup.png

# hero-tarot.png (840KB) → JPEG
sips -s format jpeg -s formatOptions 85 public/images/hero-tarot.png --out public/images/hero-tarot.jpg
rm public/images/hero-tarot.png

# flora-avatar.png (612KB, 1024x1024) → redimensionar 256w + JPEG
sips -Z 256 public/images/flora-avatar.png
sips -s format jpeg -s formatOptions 85 public/images/flora-avatar.png --out public/images/flora-avatar.jpg
rm public/images/flora-avatar.png

# ebook-devices-mockup.png (596KB) → JPEG
sips -s format jpeg -s formatOptions 85 public/images/ebook-devices-mockup.png --out public/images/ebook-devices-mockup.jpg
rm public/images/ebook-devices-mockup.png

# portal-bg.png (texture, 664KB) → JPEG
sips -s format jpeg -s formatOptions 85 public/textures/portal-bg.png --out public/textures/portal-bg.jpg
rm public/textures/portal-bg.png

# cartas-fundo.jpeg (texture, 928KB, 2560x1428) → redimensionar para 1920w
sips -Z 1920 public/textures/cartas-fundo.jpeg
sips -s format jpeg -s formatOptions 85 public/textures/cartas-fundo.jpeg --out public/textures/cartas-fundo-opt.jpeg
mv public/textures/cartas-fundo-opt.jpeg public/textures/cartas-fundo.jpeg

# mystical-table.jpg (texture, 876KB) → recomprimir
sips -s format jpeg -s formatOptions 85 public/textures/mystical-table.jpg --out public/textures/mystical-table-opt.jpg
mv public/textures/mystical-table-opt.jpg public/textures/mystical-table.jpg
```

### 2.3 Atualizar referências nos componentes

Após a conversão de `.png` → `.jpg`, atualizar TODAS as referências nos `.tsx`:

| Arquivo | Referência antiga | Referência nova |
|---------|------------------|-----------------|
| `src/components/sections/FinalCTASection.tsx` | `/textures/portal-bg.png` | `/textures/portal-bg.jpg` |
| `src/components/sections/BioSection.tsx` | `/images/luisa-perfil.png` | `/images/luisa-perfil.jpg` |
| `src/components/sections/EbookBioSection.tsx` | `/images/luisa-perfil.png` | `/images/luisa-perfil.jpg` |

> **Nota:** Os outros arquivos de imagem convertidos (`hero-tarot.png`, `tarot-scene.png`, `portal.png`, `ebook-mockup.png`, `ebook-devices-mockup.png`, `flora-avatar.png`) **NÃO são referenciados diretamente** em nenhum componente no código atual. Só existem no `/public` como assets não utilizados. Caso algum componente os referencie no seu projeto, ajuste da mesma forma.

---

## Fase 3 — SEO Completo

### 3.1 Reescrever `index.html`

**Arquivo:** `index.html` (raiz do projeto)

Substituir o `<head>` inteiro por:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Curso de Tarot Online · Do Básico ao Avançado · Velvet Oráculo</title>
    <meta name="description" content="Aprenda a ler tarot de forma profunda, simbólica e intuitiva. Curso online completo com 8 módulos, do básico ao avançado, 7 apostilas, aulas bônus e comunidade exclusiva. Para mulheres que querem se conhecer e ler com autonomia." />
    <meta name="author" content="Velvet Oráculo" />
    <meta name="keywords" content="curso de tarot online, aprender tarot, curso tarot do básico ao avançado, tarot simbólico, arcanos maiores, arcanos menores, leitura de tarot, autoconhecimento, espiritualidade, tarô online, velvet oráculo, curso de tarô" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon.png" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Curso de Tarot Online · Do Básico ao Avançado · Velvet Oráculo" />
    <meta property="og:description" content="Aprenda a ler tarot de forma profunda, simbólica e intuitiva. 8 módulos completos, 7 apostilas, aulas bônus e comunidade exclusiva." />
    <meta property="og:image" content="/images/capa-ebook.jpeg" />
    <meta property="og:locale" content="pt_BR" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Curso de Tarot Online · Velvet Oráculo" />
    <meta name="twitter:description" content="Aprenda a ler tarot de forma profunda, simbólica e intuitiva. Do básico ao avançado, com autonomia." />
    <meta name="twitter:image" content="/images/capa-ebook.jpeg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

> **IMPORTANTE sobre og:image:** O valor `/images/capa-ebook.jpeg` é relativo. Em produção, trocar pela URL absoluta do domínio final (ex: `https://velvetoraculo.com/images/capa-ebook.jpeg`). Redes sociais não aceitam paths relativos.

### 3.2 Títulos dinâmicos por página

Adicionar `useEffect` com `document.title` em cada página que não seja a Index (a Index herda do `index.html`).

**Arquivo:** `src/pages/EbookPage.tsx` — adicionar dentro do componente:
```tsx
import { useState, useEffect } from "react";
// ... imports existentes

const EbookPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Ebook Grátis: Tarô do Zero em 7 Dias · Velvet Oráculo";
    return () => { document.title = "Curso de Tarot Online · Do Básico ao Avançado · Velvet Oráculo"; };
  }, []);

  // ... resto do componente igual
```

**Arquivo:** `src/pages/ConsultaPage.tsx` — adicionar `useEffect` no início do componente:
```tsx
useEffect(() => {
  document.title = "Consulta de Tarô Online · Velvet Oráculo";
  return () => { document.title = "Curso de Tarot Online · Do Básico ao Avançado · Velvet Oráculo"; };
}, []);
```
> Este componente já importa `useEffect` — apenas adicionar o hook acima dentro de `ConsultaPage`, antes do `useEffect` existente.

**Arquivo:** `src/pages/LinksPage.tsx` — converter para componente com hook:
```tsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import TextureSection from "@/components/TextureSection";
import Ornament from "@/components/Ornament";

// ... const links = [...] (manter igual)

const LinksPage = () => {
  useEffect(() => {
    document.title = "Velvet Oráculo · Links";
    return () => { document.title = "Curso de Tarot Online · Do Básico ao Avançado · Velvet Oráculo"; };
  }, []);

  return (
    // ... JSX existente igual (o return inteiro permanece inalterado)
  );
};

export default LinksPage;
```

> **NOTA sobre LinksPage:** O componente atual é uma arrow function que retorna JSX diretamente (sem `{}`). Para adicionar o `useEffect`, será necessário adicionar chaves `{}` e um `return` explícito. O JSX em si permanece 100% igual.

---

## Fase 4 — Fix StickyNav (Captura de Lead)

Atualmente o `StickyNav.tsx` tem um link `<a>` direto para o Kiwify, bypassando o modal que captura nome/email/telefone. Isso perde leads.

**Arquivo:** `src/components/StickyNav.tsx`

**Substituir o conteúdo inteiro por:**

```tsx
import { useState, useEffect } from "react";
import CheckoutModal from "./CheckoutModal";

const StickyNav = () => {
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-primary/10 transition-all duration-300">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-display text-sm tracking-[0.2em] text-primary">VELVET ORÁCULO</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="font-display text-xs tracking-[0.15em] px-6 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors animate-cta-glow cursor-pointer"
          >
            QUERO ENTRAR
          </button>
        </div>
      </nav>
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default StickyNav;
```

---

## Fase 5 — Integração Supabase

### 5.1 Instalar dependência

```bash
npm install @supabase/supabase-js
```

### 5.2 Criar cliente Supabase

**Criar arquivo:** `src/lib/supabase.ts`

```tsx
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase credentials missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env"
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);
```

### 5.3 Criar `.env.example`

**Criar arquivo:** `.env.example` (raiz do projeto)

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> **IMPORTANTE:** Criar também o `.env` real com as credenciais do projeto. Garantir que `.env` está no `.gitignore`.

### 5.4 Adicionar `.env` ao `.gitignore`

Verificar se `.env` já está no `.gitignore`. Se não estiver, adicionar:

```
.env
.env.local
```

### 5.5 Criar tabelas no Supabase

Executar no SQL Editor do Supabase:

```sql
-- Tabela de leads do ebook
CREATE TABLE ebook_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  whatsapp TEXT NOT NULL,
  ja_tira_taro BOOLEAN,
  nivel TEXT,
  expectativas TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de leads do checkout (página de vendas)
CREATE TABLE checkout_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  source TEXT DEFAULT 'sales-page-cta',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE ebook_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkout_leads ENABLE ROW LEVEL SECURITY;

-- Policies: permitir insert público (anon users podem inserir leads)
CREATE POLICY "Allow public insert on ebook_leads"
  ON ebook_leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public insert on checkout_leads"
  ON checkout_leads FOR INSERT
  WITH CHECK (true);
```

### 5.6 Conectar `EbookOptinModal.tsx` ao Supabase

**Arquivo:** `src/components/EbookOptinModal.tsx`

**Adicionar import no topo:**
```tsx
import { supabase } from "@/lib/supabase";
```

**Substituir o bloco try/catch dentro de `handleSubmit` (linhas ~237-257):**

Trocar isto:
```tsx
    try {
      // TODO: Integrar com Supabase
      // const { error } = await supabase.from("ebook_leads").insert({
      //   name, email, whatsapp,
      //   ja_tira_taro: jaTiraTaro,
      //   nivel: jaTiraTaro ? nivel : null,
      //   expectativas,
      // });
      // if (error) throw error;

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      animateTransition("forward", () => setStep(3));
```

Por isto:
```tsx
    try {
      const { error } = await supabase.from("ebook_leads").insert({
        name,
        email,
        whatsapp: whatsapp.replace(/\D/g, ""),
        ja_tira_taro: jaTiraTaro,
        nivel: jaTiraTaro ? nivel : null,
        expectativas,
      });
      if (error) throw error;

      setStatus("success");
      animateTransition("forward", () => setStep(3));
```

### 5.7 Conectar `CheckoutModal.tsx` ao Supabase

**Arquivo:** `src/components/CheckoutModal.tsx`

**Adicionar import no topo:**
```tsx
import { supabase } from "@/lib/supabase";
```

**Substituir a função `saveLead` inteira (linhas ~46-65):**

Trocar isto:
```tsx
  const saveLead = () => {
    const lead = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phoneDigits,
      capturedAt: new Date().toISOString(),
      source: "sales-page-cta",
    };

    // Save to localStorage for persistence
    try {
      const existingLeads = JSON.parse(localStorage.getItem("velvet_leads") || "[]");
      existingLeads.push(lead);
      localStorage.setItem("velvet_leads", JSON.stringify(existingLeads));
    } catch {
      // Silent fail — redirect is the priority
    }

    return lead;
  };
```

Por isto:
```tsx
  const saveLead = async () => {
    const lead = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phoneDigits,
      source: "sales-page-cta",
    };

    // Save to Supabase (non-blocking — redirect is the priority)
    try {
      await supabase.from("checkout_leads").insert(lead);
    } catch {
      // Silent fail — redirect is the priority
    }

    // Fallback: also save to localStorage
    try {
      const existingLeads = JSON.parse(localStorage.getItem("velvet_leads") || "[]");
      existingLeads.push({ ...lead, capturedAt: new Date().toISOString() });
      localStorage.setItem("velvet_leads", JSON.stringify(existingLeads));
    } catch {
      // Silent fail
    }

    return lead;
  };
```

**Também atualizar `handleSubmit` para ser async** — trocar `const handleSubmit = (e: React.FormEvent) => {` por `const handleSubmit = async (e: React.FormEvent) => {` e trocar `const lead = saveLead();` por `const lead = await saveLead();`.

---

## Fase 6 — Build Final e Verificação

### 6.1 Rodar TypeScript check

```bash
npx tsc --noEmit
```

Deve retornar **zero erros**.

### 6.2 Rodar build de produção

```bash
npx vite build
```

Deve completar sem erros.

### 6.3 Checklist de Verificação Manual

- [ ] `npx tsc --noEmit` sem erros
- [ ] `npx vite build` sem erros
- [ ] Nenhum `TODO` referente a Supabase nos arquivos (grep `TODO.*[Ss]upabase`)
- [ ] Nenhuma referência a "Flora" no `index.html`
- [ ] Arquivo `src/App.css` deletado
- [ ] Arquivo `src/components/sections/EbookOptinForm.tsx` deletado
- [ ] `StickyNav.tsx` usa `CheckoutModal` em vez de `<a>` direto
- [ ] `NotFound.tsx` redireciona para `/links`
- [ ] `_redirects` e `vercel.json` existem
- [ ] `.env.example` existe com variáveis documentadas
- [ ] `src/lib/supabase.ts` existe e exporta `supabase`
- [ ] Todas as referências `.png` que foram convertidas para `.jpg` estão atualizadas nos componentes
- [ ] Build CSS < 100KB, Build JS < 400KB (verificar output do vite build)

### 6.4 Testes funcionais (após deploy)

- [ ] Rota `/` carrega normalmente
- [ ] Rota `/ebook` carrega com título correto
- [ ] Rota `/consulta` carrega com título correto
- [ ] Rota `/links` carrega com título correto
- [ ] Rota `/qualquer-coisa` redireciona para `/links`
- [ ] CTA na StickyNav abre o CheckoutModal (não redireciona direto)
- [ ] Formulário do ebook salva dados no Supabase (verificar tabela `ebook_leads`)
- [ ] Formulário do checkout salva dados no Supabase (verificar tabela `checkout_leads`) e redireciona para Kiwify
- [ ] `view-source:` mostra meta tags corretas com "Velvet Oráculo"
- [ ] Imagens carregam sem 404

---

## Resumo das Ações por Arquivo

| Ação | Arquivo |
|------|---------|
| ❌ DELETE | `src/App.css` |
| ❌ DELETE | `src/components/sections/EbookOptinForm.tsx` |
| ✏️ REWRITE | `src/pages/NotFound.tsx` |
| ✏️ REWRITE | `src/components/StickyNav.tsx` |
| ✏️ REWRITE | `index.html` (head inteiro) |
| ✏️ MODIFY | `src/pages/EbookPage.tsx` (add useEffect title) |
| ✏️ MODIFY | `src/pages/ConsultaPage.tsx` (add useEffect title) |
| ✏️ MODIFY | `src/pages/LinksPage.tsx` (add useEffect title) |
| ✏️ MODIFY | `src/components/EbookOptinModal.tsx` (Supabase insert) |
| ✏️ MODIFY | `src/components/CheckoutModal.tsx` (Supabase insert) |
| ✏️ MODIFY | `src/components/sections/FinalCTASection.tsx` (portal-bg.png → .jpg) |
| ✏️ MODIFY | `src/components/sections/BioSection.tsx` (luisa-perfil.png → .jpg) |
| ✏️ MODIFY | `src/components/sections/EbookBioSection.tsx` (luisa-perfil.png → .jpg) |
| 🆕 CREATE | `src/lib/supabase.ts` |
| 🆕 CREATE | `.env.example` |
| 🆕 CREATE | `public/_redirects` |
| 🆕 CREATE | `vercel.json` |
| 📦 INSTALL | `@supabase/supabase-js` |
