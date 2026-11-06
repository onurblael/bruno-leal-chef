# Site de Bruno Leal, Chef Consultor

Site estático (HTML, CSS e JavaScript), em português e espanhol.
Publicado em https://onurblael.github.io/bruno-leal-chef/ (GitHub Pages).

## Estrutura

```
index.html          página principal em português (é aqui que se edita o texto)
es/index.html       versão espanhola, GERADA (não editar à mão)
privacidade.html    política de privacidade (PT e ES na mesma página)
css/style.css       estilos
js/script.js        menu, modo claro/escuro, formulário e dicionário de espanhol
images/             fotos em WebP (3 tamanhos cada) e a imagem de partilha
fonts/              fontes alojadas no próprio site
tools/              ferramentas de manutenção (ver abaixo)
sitemap.xml, robots.txt
```

## Alterar texto

1. Edita o texto em português em `index.html`.
2. Se o texto tem `data-i18n="chave"`, edita também a tradução dessa chave no bloco `es:` de `js/script.js`.
3. Regenera a versão espanhola:

```
python tools/build_es.py
```

O gerador avisa se alguma chave ficar sem tradução. Faz sempre este passo antes de publicar.

## Fotos novas

```
python tools/make_webp.py caminho/da/foto.jpg nome-da-foto
```

Corrige a luz, redimensiona e cria `images/nome-da-foto.webp` (e as versões de 800 e 480 px).
O comando imprime o `srcset`, `width` e `height` para colar na etiqueta `<img>`.
Só se usam fotos próprias ou com autorização escrita de quem as tirou.

## Publicar

Basta enviar as alterações para o GitHub (`git push`); o GitHub Pages atualiza o site em poucos minutos.

## Formulário de contacto

Usa o Web3Forms (chave no campo `access_key` de `index.html`). Os pedidos chegam por email.
O plano gratuito permite 250 pedidos por mês.

## Quando houver domínio próprio

Atualizar o endereço em: `index.html` e `es/index.html` (canonical, hreflang, og:url, og:image, JSON-LD),
`tools/build_es.py` (variável `BASE`), `sitemap.xml` e `robots.txt`, e registar o domínio no Google Search Console.
