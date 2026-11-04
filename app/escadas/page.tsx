import type { Metadata } from "next";
import { FaixaCta } from "@/components/ui/FaixaCta";
import { PageHeader } from "@/components/ui/PageHeader";
import { GhostLink } from "@/components/ui/Button";
import { StepIn } from "@/components/motion/StepIn";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TypeGrid } from "@/components/ui/TypeGrid";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tipos de escada de concreto",
  description:
    "Reta, caracol, leke, mista, premium, espelho fechado ou in loco: veja o desenho, as medidas e quando escolher cada tipo de escada pré-moldada.",
  alternates: { canonical: "/escadas" },
};

const perguntasQueDefinem = [
  {
    q: "Quanto espaço você tem?",
    a: "Um lance reto precisa de comprimento proporcional à altura. Se o espaço é curto, o caracol ou a escada mista resolvem o mesmo desnível ocupando menos.",
  },
  {
    q: "É a escada principal da casa?",
    a: "Escada usada muitas vezes por dia pede subida confortável e largura generosa. Para acesso secundário — sótão, mezanino, terraço — dá para abrir mão disso.",
  },
  {
    q: "Quem vai usar?",
    a: "Criança pequena, pessoa idosa ou com mobilidade reduzida mudam a conta: degrau vazado e giro apertado deixam de ser opção.",
  },
];

export default function EscadasPage() {
  return (
    <>
      <PageHeader
        title="Sete tipos. Um deles resolve o seu vão."
        lead="A escolha depende de três coisas: o espaço disponível, o pé-direito — a altura de piso a piso — e quantas vezes por dia a escada vai ser usada."
      />

      {/* Grid comparativo: os 7 recebem tratamento idêntico DE PROPÓSITO —
          é o único lugar do site onde isso é a intenção, não descuido. */}
      <Section density="default">
        <StepIn selector="li">
          <TypeGrid href="#nao-sei" />
        </StepIn>
      </Section>

      <Section density="dense" id="nao-sei" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              title="Não sei qual é o meu caso"
              lead="Três perguntas resolvem a maior parte das dúvidas antes mesmo de falar com alguém."
            />
          </div>
          <div className="lg:col-span-7">
            <dl>
              {perguntasQueDefinem.map((item) => (
                <div key={item.q} className="border-b border-border py-6 first:border-t">
                  <dt className="font-display text-xl font-semibold tracking-[-0.02em]">
                    {item.q}
                  </dt>
                  <dd className="measure mt-3 text-muted">{item.a}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8">
              <GhostLink
                href={whatsappLink(
                  "Olá! Não sei qual tipo de escada serve para o meu caso. Pode me ajudar?",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Perguntar no WhatsApp
              </GhostLink>
            </p>
          </div>
        </div>
      </Section>

      <FaixaCta
        title="Já sabe qual tipo é o seu?"
        text="Se não souber, marque “não sei ainda” no formulário. A gente define junto."
      />
    </>
  );
}
