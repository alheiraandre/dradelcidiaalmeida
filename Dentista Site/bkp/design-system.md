# Design System - Clínica Dra. Elcídia Almeida

## 🎨 Paleta de Cores
O site utiliza um tema escuro (Dark Mode nativo) com acentos minimalistas.

* **Fundo Principal:** `#050505` (Quase preto, melhor para contraste)
* **Fundo Secundário (Cards/Painéis):** `#111111` ou `#0a0a0a`
* **Texto Principal:** `#f4f4f5` (Branco levemente acinzentado, reduz fadiga visual)
* **Texto Secundário:** `#a1a1aa` (Cinza para descrições e subtítulos)
* **Cor Primária (Ação/WhatsApp):** `#25D366` (Variável Tailwind: `bg-primary`)
* **Cor Primária Hover:** `#1EAB52` (Variável Tailwind: `bg-primaryHover`)
* **Bordas (Studio):** `rgba(255, 255, 255, 0.1)` (Variável Tailwind: `border-studio`)

## 🔤 Tipografia
* **Fonte Única:** `Space Grotesk` (via Google Fonts)
* *Uso:* Utilizada em todo o projeto. Títulos usam pesos `bold` (700) e `black` (900) com text-transform `uppercase`. Textos corridos usam peso `light` (300) ou `regular` (400).

## 🖱️ Micro-Interações Padrão
* **Botões Flutuantes (WhatsApp/Chat):** Devem possuir efeito de hover com `-translate-y-2` (levanta levemente) e o ícone interno deve usar `rotate-12` (gira 12 graus) para dar sensação de toque humano.
* **Imagens de Portfólio/Serviços:** Começam com filtro `grayscale` e transitam para colorido `grayscale-0` e leve zoom `scale-105` ao receber hover. Duração padrão da transição: `duration-700` ou `duration-500`.

## 📦 Imagens e Otimização
* Todas as imagens devem ser carregadas preferencialmente utilizando a tag `<picture>`.
* O formato principal (source) deve ser `.webp`.
* O formato de fallback (img src) deve ser `.jpg` ou `.png`.