# Site — Bruno Leal, Chef Consultor

Site estático (HTML/CSS/JS), sem necessidade de servidor, com toggle PT/ES completo.

## Antes de publicar

### 1. Ativar o formulário de contacto (5 min, grátis)
1. Vai a [web3forms.com](https://web3forms.com) e cria uma "Access Key" gratuita com o email `elxconsult.club@gmail.com`.
2. Recebes a chave por email.
3. Abre `index.html`, procura `SUBSTITUIR_PELA_TUA_ACCESS_KEY` e substitui pela tua chave.

Sem este passo, o formulário mostra sempre a mensagem de erro — o telefone, email e WhatsApp continuam a funcionar normalmente.

### 2. Substituir as fotos
Todos os blocos com o aviso "FOTO A SUBSTITUIR" (a castanho às riscas) são placeholders. Substitui por fotografia real:
- Hero: retrato do chef ou prato de assinatura (proporção vertical 4:5)
- Sobre mim: chef em ação na cozinha (proporção quadrada 1:1)
- Casos de estudo (5): uma foto por projeto (proporção 16:10)

Para trocar: coloca o ficheiro em `images/` e substitui o bloco `<div class="photo-placeholder ...">...</div>` correspondente por `<img src="images/nome-do-ficheiro.jpg" alt="...">`.

### 3. Confirmar os preços
A secção "Serviços & Preços" tem valores de referência (€45/pessoa, €800/projeto, €120/dia) — ajusta-os em `index.html` (procura por `servicos.chef.price`, `servicos.consultor.price`, `servicos.cozinheiro.price`) **e** na tradução espanhola equivalente em `js/script.js`.

### 4. SEO
Em `index.html`, atualiza `og:image` e o `rel="canonical"` quando souberes o domínio final.

## Como publicar

Sem necessidade de conta técnica complexa — qualquer uma destas opções funciona:

- **Netlify Drop**: arrasta a pasta `bruno-leal-chef` para [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel**: `vercel` na pasta do projeto (com a Vercel CLI instalada).
- **GitHub Pages**: sobe a pasta para um repositório e ativa Pages nas definições.

## Estrutura de ficheiros
```
bruno-leal-chef/
  index.html      — página única com todas as secções
  css/style.css   — estilos (paleta, tipografia, layout)
  js/script.js    — menu mobile, toggle PT/ES, envio do formulário
  images/         — colocar aqui as fotos reais
```
