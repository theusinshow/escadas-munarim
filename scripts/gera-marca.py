"""Gera a marca (DEC-069 → DEC-075: sem a tagline, ESCADAS justificado na largura de MUNARIM). Em uso: variante A (Michroma engrossada).
python scripts/gera-marca.py . A public/marca/munarim-marca-escuro.svg escuro
python scripts/gera-marca.py . A public/marca/munarim-marca-claro.svg claro
Precisa de `.next/static/media` (rode o build antes) e de `scratch/Orbitron.ttf` só para B e C."""
import glob, sys, pathlib
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.varLib.instancer import instantiateVariableFont

raiz = pathlib.Path(sys.argv[1]); var = sys.argv[2]; out = pathlib.Path(sys.argv[3])
tema = sys.argv[4] if len(sys.argv) > 4 else "escuro"
media = raiz / ".next/static/media"

def achar(nome, v):
    for f in glob.glob(str(media / "*.woff2")):
        t = TTFont(f); cm = t.getBestCmap() or {}
        if nome in t["name"].getDebugName(1) and ("fvar" in t) == v and ord("ç") in cm and ord("M") in cm:
            return t
    raise SystemExit(nome)

michroma = achar("Michroma", False)
archivo = lambda w: instantiateVariableFont(achar("Archivo", True), {"wght": w, "wdth": 112})
orbitron = lambda w: instantiateVariableFont(TTFont(str(raiz / "scratch/Orbitron.ttf")), {"wght": w})

def texto(font, s, x, y, tam, track=0.0):
    upm = font["head"].unitsPerEm; gs = font.getGlyphSet(); cmap = font.getBestCmap(); hmtx = font["hmtx"]
    e = tam / upm; pen = SVGPathPen(gs); b = BoundsPen(gs); cx = 0.0
    for ch in s:
        g = cmap[ord(ch)]; t = (e, 0, 0, -e, x + cx * e, y)
        gs[g].draw(TransformPen(pen, t)); gs[g].draw(TransformPen(b, t))
        cx += hmtx[g][0] + track * upm
    xmin, ymin, xmax, ymax = b.bounds
    return pen.getCommands(), ymin, ymax, xmin, xmax

V = {
  # fonte do MUNARIM, traço extra, fonte do ESCADAS, espessura da linha-degrau
  "A": dict(mun=lambda: michroma, traco=13, esc=lambda: michroma, esc_traco=3.2, linha=9, track=0.035),
  "B": dict(mun=lambda: orbitron(800), traco=0, esc=lambda: orbitron(700), esc_traco=0, linha=10, track=0.05),
  "C": dict(mun=lambda: orbitron(900), traco=2, esc=lambda: orbitron(800), esc_traco=0, linha=12, track=0.06),
}[var]

M = 120; x0 = 0; y_mun = 170
fm = V["mun"](); fe = V["esc"]()
d_mun, top_mun, base_mun, l_mun, r_mun = texto(fm, "MUNARIM", x0, y_mun, M, V["track"])
# ESCADAS ocupa a largura exata de MUNARIM: mede sem tracking, distribui a sobra nos 6 vãos
tam_esc = M * 0.44
_, _, _, le0, re0 = texto(fe, "ESCADAS", 0, 0, tam_esc, 0)
track_esc = ((r_mun - l_mun) - (re0 - le0)) / 6 / fe["head"].unitsPerEm * (fe["head"].unitsPerEm / tam_esc)
d_esc, top_esc, base_esc, _, _ = texto(fe, "ESCADAS", l_mun - le0, y_mun - M * 1.07, tam_esc, track_esc)
lw = V["linha"]; y_linha = y_mun + 22 + lw / 2
piso = 38; n = 3; x_fim = r_mun + 24; topo = top_esc + 4
esp = (y_linha - topo) / n
pts = [(x0 + 1, y_linha), (x_fim, y_linha)]; x, y = x_fim, y_linha
for i in range(n):
    y -= esp; pts.append((x, y)); x += piso; pts.append((x, y))
linha = "M" + " L".join(f"{a:.2f},{b:.2f}" for a, b in pts)
# ® no alto do último degrau, menor e afastado da linha
r_cx, r_cy = x - piso / 2, topo - 22
d_r, *_ = texto(fe, "R", r_cx - 4.2, r_cy + 4.2, 11.5)

if tema == "escuro":
    tinta, sec, linhac = "#ffffff", "#d4d7da", "#ffffff"
else:
    tinta, sec, linhac = "#16181b", "#45484c", "#213a58"
pad = 10
topo_vb = min(top_esc, r_cy - 10) - pad
vb = f"{-pad:.0f} {topo_vb:.0f} {x + lw/2 + pad*2:.0f} {y_linha + lw/2 + pad - topo_vb:.0f}"
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-label="Escadas Munarim">
  <path d="{d_esc}" fill="{tinta}" stroke="{tinta}" stroke-width="{V['esc_traco']}" stroke-linejoin="miter"/>
  <path d="{d_mun}" fill="{tinta}" stroke="{tinta}" stroke-width="{V['traco']}" stroke-linejoin="miter" stroke-miterlimit="6"/>
  <path d="{linha}" fill="none" stroke="{linhac}" stroke-width="{lw}" stroke-linecap="square" stroke-linejoin="miter"/>
  <circle cx="{r_cx:.2f}" cy="{r_cy:.2f}" r="9.5" fill="none" stroke="{sec}" stroke-width="1.8"/>
  <path d="{d_r}" fill="{sec}"/>
</svg>
'''
out.write_text(svg, encoding="utf-8"); print(out.name, len(svg)//1024, "KB")
