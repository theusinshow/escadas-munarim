import { CapaFoto } from "@/components/home/CapaFoto";
import { AvaliacoesTrilho } from "@/components/home/AvaliacoesTrilho";
import { GaleriaTrilho } from "@/components/home/GaleriaTrilho";
import { LemaBloco } from "@/components/home/LemaBloco";
import { PreMoldadaAcordeao } from "@/components/home/PreMoldadaAcordeao";
import { ProcessoCards } from "@/components/home/ProcessoCards";
import { SobreBloco } from "@/components/home/SobreBloco";
import { TiposSanfona } from "@/components/home/TiposSanfona";

/**
 * Home (DEC-059 → DEC-067).
 *
 * DEC-067: a sequência de seções da referência trazida pelo desenvolvedor,
 * com o conteúdo da Munarim em cada uma. Escuro → claro → branco → escuro,
 * como lá:
 *
 * capa → sobre → lema que se preenche → os sete tipos em sanfona → galeria em
 * trilho → como funciona em cartões → pré-moldada ou no local em acordeão →
 * avaliações → rodapé com os contatos. As dúvidas saíram da home (DEC-077),
 * e "quem faz o quê" e a foto de ponta a ponta saíram no DEC-083.
 *
 * O que a referência tem e este site não pode ter: logos de parceiros, blog
 * e newsletter. Depoimento, só o do Google, copiado como está (DEC-083).
 * O primeiro pedido de orçamento é o do rodapé, depois de toda a prova
 * (DEC-001).
 */
export default function Home() {
  return (
    <>
      <CapaFoto />
      <SobreBloco />
      <LemaBloco />
      <TiposSanfona />
      <GaleriaTrilho />
      <ProcessoCards />
      <PreMoldadaAcordeao />
      <AvaliacoesTrilho />
    </>
  );
}
