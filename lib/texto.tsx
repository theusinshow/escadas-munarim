/** Negrito por **texto** — a copy precisa destacar o termo técnico no meio da frase. */
export function comDestaque(texto: string) {
  return texto.split(/(\*\*[^*]+\*\*)/g).map((parte, i) =>
    parte.startsWith("**") ? (
      <strong key={i} className="font-semibold text-text">
        {parte.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{parte}</span>
    ),
  );
}

/** Tira a marcação **…** para uso em texto puro (meta, JSON-LD). */
export const semMarca = (t: string) => t.replace(/\*\*/g, "");
