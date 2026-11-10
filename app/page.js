import ConfettiEffect from "../components/ConfettiEffect";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Obtém o total de conteúdos publicados no TabNews diretamente da API pública.
 * O valor é extraído do cabeçalho HTTP 'x-pagination-total-rows'.
 */
async function getTotalContents() {
  try {
    const response = await fetch(
      "https://www.tabnews.com.br/api/v1/contents?strategy=new&page=1&per_page=1",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Resposta com status: ${response.status}`);
    }

    const totalRowsHeader = response.headers.get("x-pagination-total-rows");
    return totalRowsHeader ? Number(totalRowsHeader) : null;
  } catch (error) {
    console.error("Erro ao consultar a API pública do TabNews:", error);
    return null;
  }
}

export default async function Home() {
  const totalContents = await getTotalContents();
  const formattedTotal =
    totalContents !== null
      ? new Intl.NumberFormat("pt-BR").format(totalContents)
      : null;

  return (
    <main className="container">
      <ConfettiEffect />
      <div className="card">
        <div className="badge">🚧 Em Construção</div>

        <h1 className="title">
          Estamos neste exato momento reconstruindo o TabNews, um lugar na
          internet para quem trabalha com tecnologia e precisa consumir conteúdos
          com valor concreto.
        </h1>

        <div className="stats-box">
          <span className="stats-label">
            Total de conteúdos publicados no TabNews
          </span>
          <span className="stats-number">
            {formattedTotal ?? "Indisponível no momento"}
          </span>
          <span className="stats-note">
            Atualizado a cada acesso via API pública
          </span>
        </div>

        <div className="actions">
          <a
            href="https://www.tabnews.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="official-link"
          >
            Acessar o TabNews oficial &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
