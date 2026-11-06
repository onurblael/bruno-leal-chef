#!/usr/bin/env python3
"""Gera es/index.html (versão espanhola, com URL próprio) a partir de index.html (PT)
e do dicionário `es` de js/script.js.

Uso (na raiz do projeto):  python tools/build_es.py
Corre-o sempre que alterares texto em index.html ou no dicionário de espanhol.
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://onurblael.github.io/bruno-leal-chef/"   # mudar para o domínio próprio quando existir

def read(path):
    with open(os.path.join(ROOT, path), encoding="utf-8") as f:
        return f.read()

html = read("index.html")
js = read("js/script.js")

# ---------- dicionário ES ----------
es_block = js[js.index("\n    es: {"):]
ES = {}
for m in re.finditer(r'^\s*"([^"]+)":\s*(".*")\s*,?\s*$', es_block, re.M):
    ES[m.group(1)] = json.loads(m.group(2))

# ---------- metadados e textos fixos ----------
TITLE = "Bruno Leal | Chef Consultor y Chef Privado en Elvas, Campo Maior y Badajoz"
DESC = ("Bruno Miguel Vieira Leal, chef consultor con base en Elvas y Campo Maior. Desarrollo de conceptos "
        "gastronómicos, ingeniería de cartas, fichas técnicas, consultoría de apertura y chef privado, para "
        "restaurantes de Badajoz y del Alto Alentejo.")
KEYWORDS = ("chef consultor Badajoz, consultor gastronómico Alentejo, chef privado Elvas, consultoría de "
            "restaurantes Badajoz, fichas técnicas, ingeniería de carta, chef Campo Maior")
OG_TITLE = "Bruno Leal | Chef Consultor en el Alto Alentejo"
OG_DESC = ("Desarrollo de conceptos gastronómicos, cartas y fichas técnicas para restaurantes, cafés y eventos "
           "entre Elvas, Campo Maior y la frontera con Badajoz.")
OG_ALT = "Bruno Leal, chef consultor en el Alto Alentejo, y un plato de coliflor y setas"

ALT_ES = {
    "Chef a finalizar sobremesas em série na cozinha do Raya Restaurante": "Chef terminando postres en serie en la cocina del Raya Restaurante",
    "Retrato de Bruno Leal, chef consultor": "Retrato de Bruno Leal, chef consultor",
    "Bolas de Arroz e Legumes com Molho de Pimento Vermelho, Veggieterrâneo": "Bolas de Arroz y Verduras con Salsa de Pimiento Rojo, Veggieterrâneo",
    "Couve-Flor e Cogumelos com Arroz Jasmim e Amêndoa, Veggieterrâneo": "Coliflor y Setas con Arroz Jazmín y Almendra, Veggieterrâneo",
    "Esplanada do Raya Restaurante, Praia Fluvial de Azenhas del Rei": "Terraza del Raya Restaurante, Playa Fluvial de Azenhas del Rey",
    "Emplatamento em série no Raya Restaurante": "Emplatado en serie en el Raya Restaurante",
    "Prato do Raya Restaurante, Grupo Terramay": "Plato del Raya Restaurante, Grupo Terramay",
    "Sobremesa de manga com pólen de abelha e caramelo": "Postre de mango con polen de abeja y caramelo",
    "Burrata com presunto e tomate": "Burrata con jamón y tomate",
    "Esplanada do Raya Restaurante, Praia Fluvial": "Terraza del Raya Restaurante, Playa Fluvial",
    "Equipa GIZ na Praia": "Equipo de GIZ en la Playa",
    "Prato gratinado, vista de topo": "Plato gratinado, vista cenital",
    "Prato gratinado, vista lateral": "Plato gratinado, vista lateral",
}
ARIA_ES = {
    "Alternar entre modo claro e escuro": "Alternar entre modo claro y oscuro",
    "Abrir menu": "Abrir menú",
}

missing = []

# ---------- 1) textos com data-i18n ----------
I18N = re.compile(r'(<(\w+)\b[^>]*data-i18n="([^"]+)"[^>]*>)(.*?)</\2>', re.S)

def swap(m):
    open_tag, tag, key = m.group(1), m.group(2), m.group(3)
    if key not in ES:
        missing.append(key)
        return m.group(0)
    return f"{open_tag}{ES[key]}</{tag}>"

html = I18N.sub(swap, html)

# ---------- 2) <head> ----------
def sub1(pattern, repl, text, flags=0):
    new, n = re.subn(pattern, lambda m: repl, text, count=1, flags=flags)
    if n != 1:
        sys.exit(f"não encontrei: {pattern}")
    return new

html = sub1(r'<html lang="[^"]*">', '<html lang="es-ES">', html)
html = sub1(r'<title>.*?</title>', f"<title>{TITLE}</title>", html, re.S)
html = sub1(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{DESC}">', html)
html = sub1(r'<meta name="keywords" content="[^"]*">', f'<meta name="keywords" content="{KEYWORDS}">', html)
html = sub1(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{BASE}es/">', html)
html = sub1(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{BASE}es/">', html)
html = sub1(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{OG_TITLE}">', html)
html = sub1(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{OG_DESC}">', html)
html = sub1(r'<meta property="og:image:alt" content="[^"]*">', f'<meta property="og:image:alt" content="{OG_ALT}">', html)
html = sub1(r'<meta property="og:locale" content="pt_PT">\s*<meta property="og:locale:alternate" content="es_ES">',
            '<meta property="og:locale" content="es_ES">\n<meta property="og:locale:alternate" content="pt_PT">', html)

# JSON-LD em espanhol
ld_m = re.search(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', html, re.S)
ld = json.loads(ld_m.group(1))
ld["@id"] = BASE + "es/#negocio"
ld["url"] = BASE + "es/"
ld["description"] = ("Chef consultor en el Alto Alentejo: desarrollo de conceptos de restaurante, ingeniería de cartas, "
                     "fichas técnicas, consultoría de apertura, chef privado y refuerzo de cocina.")
ld["hasOfferCatalog"]["name"] = "Servicios"
offers = [
    ("Chef para restaurantes", "Dirección y liderazgo de la cocina, cartas de temporada, gestión de equipo, stock y control del desperdicio."),
    ("Chef privado / particular", "Cenas privadas en casa o espacio propio, con menú degustación personalizado, compra, elaboración y servicio de mesa."),
    ("Chef consultor", "Desarrollo de concepto, ingeniería de cartas, fichas técnicas, control de costes y consultoría de apertura de locales."),
    ("Cocinero", "Refuerzo de equipo en picos de servicio, sustituciones puntuales y formación del equipo de cocina."),
]
for item, (n, d) in zip(ld["hasOfferCatalog"]["itemListElement"], offers):
    item["itemOffered"]["name"], item["itemOffered"]["description"] = n, d
html = html.replace(ld_m.group(0),
                    '<script type="application/ld+json">\n' + json.dumps(ld, ensure_ascii=False, indent=2) + "\n</script>")

# ---------- 3) alt e aria-label ----------
def alt(m):
    v = m.group(1)
    if v not in ALT_ES:
        missing.append("alt: " + v)
        return m.group(0)
    return f'alt="{ALT_ES[v]}"'
html = re.sub(r'alt="([^"]*)"', alt, html)
for pt, es in ARIA_ES.items():
    html = html.replace(f'aria-label="{pt}"', f'aria-label="{es}"')

# ---------- 4) seletor de idioma: aponta para a versão portuguesa ----------
html = re.sub(
    r'<a class="lang-toggle" id="lang-toggle" href="es/" hreflang="es" lang="es" aria-label="[^"]*">\s*'
    r'<span class="lang-opt is-active" data-lang="pt">PT</span>/<span class="lang-opt" data-lang="es">ES</span>\s*</a>',
    '<a class="lang-toggle" id="lang-toggle" href="../" hreflang="pt-PT" lang="pt" aria-label="Ver el sitio en portugués">\n'
    '        <span class="lang-opt" data-lang="pt">PT</span>/<span class="lang-opt is-active" data-lang="es">ES</span>\n      </a>',
    html)

# ---------- 5) caminhos (a página vive em /es/) ----------
html = re.sub(r'(href|src)="(css|js|fonts)/', r'\1="../\2/', html)
html = re.sub(r'(?<=["\s,])images/', '../images/', html)
html = html.replace('href="privacidade.html"', 'href="../privacidade.html?lang=es"')

out_dir = os.path.join(ROOT, "es")
os.makedirs(out_dir, exist_ok=True)
with open(os.path.join(out_dir, "index.html"), "w", encoding="utf-8", newline="\n") as f:
    f.write(html)

print(f"es/index.html gerado ({len(html)//1024} KB), {len(ES)} chaves ES.")
if missing:
    print("SEM TRADUÇÃO:", *dict.fromkeys(missing), sep="\n  ")
    sys.exit(1)
