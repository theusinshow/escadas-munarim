/**
 * Galeria de obras — três slots, nenhuma foto.
 *
 * A referência põe aqui um grid de projetos entregues com local, metragem e
 * prazo, mais um cartão de depoimento assinado. **Nada disso pode existir neste
 * site**: a Munarim não entregou acervo fotográfico (`CNT-003`), e depoimento,
 * metragem e prazo fabricados são proibição direta de `DESIGN.md` e do
 * `CLAUDE.md` do projeto.
 *
 * A resposta não é esconder a seção nem preencher com imagem gerada fingindo
 * obra: é mostrar a moldura vazia e dizer o que falta. Quadro marcado é honesto;
 * placeholder verossímil é mentira com aparência de projeto.
 *
 * O traço é `--border`, que é cor gráfica — não há texto sobre ele.
 */

const SLOTS = [
  { id: "OBR-01", nota: "escada instalada — foto do cliente" },
  { id: "OBR-02", nota: "escada instalada — foto do cliente" },
  { id: "OBR-03", nota: "detalhe de corrimão — foto do cliente" },
];

export function ObrasSlots() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SLOTS.map((slot) => (
        <li key={slot.id}>
          <div className="flex aspect-4/3 items-end border border-dashed border-border bg-shade p-5">
            <p className="spec text-muted">
              {slot.id}
              <span className="mt-1 block">{slot.nota}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
