# Fontes vendorizadas

`Outfit-SemiBold.ttf` — baixado do Google Fonts (SIL Open Font License 1.1).

Existe só para a imagem de Open Graph: o `ImageResponse` do Next precisa dos
bytes da fonte, e o `next/font` não os expõe. O site em si continua carregando
Outfit, Hanken Grotesk e DM Mono por `next/font`, com subset e `display: swap`.

Não fica em `public/` de propósito — não é para ser servido, é lido em build.
