#!/usr/bin/env python3
"""Prepara uma foto para o site: corrige ligeiramente luz, contraste e cor, redimensiona (máx. 1280 px)
e gera WebP em 3 tamanhos (completo, 800 e 480 px de largura).

Uso (na raiz do projeto):  python tools/make_webp.py caminho/da/foto.jpg nome-da-foto
Gera images/<nome>.webp, images/<nome>-800.webp e images/<nome>-480.webp e imprime as medidas
(width/height) e o srcset para colar no HTML.
"""
import os, sys
from PIL import Image, ImageOps, ImageEnhance, ImageFilter, ImageStat

if len(sys.argv) != 3:
    sys.exit(__doc__)

src, name = sys.argv[1], sys.argv[2]
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dst = os.path.join(root, "images")

orig = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
img = orig.copy()
w, h = img.size
if max(w, h) > 1280:
    s = 1280 / max(w, h)
    img = img.resize((round(w * s), round(h * s)), Image.LANCZOS)

img = ImageOps.autocontrast(img, cutoff=0.3, preserve_tone=True)
img = ImageEnhance.Contrast(img).enhance(1.04)
img = ImageEnhance.Color(img).enhance(1.05)
so = ImageStat.Stat(orig.convert("HSV")).mean[1]
sn = ImageStat.Stat(img.convert("HSV")).mean[1]
if so > 0 and sn / so > 1.2:                       # no máximo +20% de saturação
    img = ImageEnhance.Color(img).enhance(1.2 * so / sn)
img = img.filter(ImageFilter.UnsharpMask(radius=1.0, percent=40, threshold=4))

w, h = img.size
widths = [x for x in (480, 800) if x < w]
for vw in widths:
    v = img.resize((vw, round(h * vw / w)), Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=0.8, percent=30, threshold=3))
    v.save(os.path.join(dst, f"{name}-{vw}.webp"), "WEBP", quality=80, method=6)
img.save(os.path.join(dst, f"{name}.webp"), "WEBP", quality=80, method=6)

srcset = ", ".join([f"images/{name}-{vw}.webp {vw}w" for vw in widths] + [f"images/{name}.webp {w}w"])
print(f"{name}: {w}x{h}")
print(f'srcset="{srcset}" width="{w}" height="{h}"')
