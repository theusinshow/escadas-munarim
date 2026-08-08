import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { axonometriaDataUri } from "@/lib/geometry/svgString";
import { site } from "@/lib/site";

export const alt = `${site.name} — escadas pré-moldadas em concreto polido, São José/SC`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * MED-010 — Open Graph.
 *
 * Sem foto: fundo navy da marca e a axonometria em traço branco, gerada pela
 * mesma geometria do site (`DEC-016`). Não é um asset separado que pode
 * divergir do produto — é o produto, renderizado.
 */
export default async function OpenGraphImage() {
  /* Outfit vendorizada em `assets/fonts` — o ImageResponse precisa dos bytes,
     e o `next/font` não os expõe. Instância estática em 600, não a variável:
     o satori não interpola eixo de peso e sairia no default. */
  const display = await readFile(
    join(process.cwd(), "assets", "fonts", "Outfit-SemiBold.ttf"),
  );

  const desenho = axonometriaDataUri("reta", {
    stroke: "#FFFFFF",
    inox: "#B9C0C7",
    border: "rgba(255,255,255,0.28)",
    width: 2.4,
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#2C445F",
          color: "#FFFFFF",
          padding: 72,
          fontFamily: "Outfit",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "58%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: 0.75,
            }}
          >
            {site.address.city} — {site.address.state}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 62, fontWeight: 700, lineHeight: 1.05 }}>
              {site.name}
            </div>
            <div style={{ display: "flex", marginTop: 20, fontSize: 30, opacity: 0.85 }}>
              Escadas pré-moldadas em concreto polido
            </div>
          </div>
        </div>

        <div style={{ display: "flex", width: "42%", alignItems: "center", justifyContent: "center" }}>
          {desenho ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={desenho} alt="" width={420} height={400} />
          ) : null}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Outfit", data: display, weight: 600, style: "normal" }],
    },
  );
}
