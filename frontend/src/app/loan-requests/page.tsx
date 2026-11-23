import Link from "next/link";
import { apiFetch } from "../../lib/api";
import type { Tool } from "../../lib/loan-types";

type LoanRequestsPageProps = { searchParams: Promise<{ toolId?: string }> };

export default async function LoanRequestsPage({ searchParams }: LoanRequestsPageProps) {
    // Esta consulta solo prepara las opciones que se necesitan para el selector del filtro.
  const toolsResponse = await apiFetch("/tools");
  const tools: Tool[] = toolsResponse.ok ? await toolsResponse.json() : [];

  // TODO FRONT-A: leer searchParams y consultar las solicitudes con apiFetch.
  // TODO FRONT-A: agregar el formulario GET de filtro usando tools y la opción All tools.
  // TODO FRONT-A: mostrar las solicitudes y sus enlaces al comprobante correspondiente.

  //Aquí es donde filtramos usando los query params de la URL - repo Libs_and_roles
  const { toolId } = await searchParams; //De aquí tomar el valor de la URL

  const selectedToolIds = Array.isArray(toolId) ? toolId : toolId ? [toolId] : [];

  const params = new URLSearchParams();
  selectedToolIds.forEach((id) => {
    params.append("toolId", id);
  });

  const endpointURL = selectedToolIds.length > 0
    ? `/loan-requests/search?${params.toString()}&limit=20`
    : "/loan-requests";

  const response = await apiFetch(endpointURL);

  const data = response?.ok ? await response.json().catch(() => null) : null;
  const loanRequests = Array.isArray(data) ? data : [];
  return (
    <main>
      <h1>Loan requests</h1>
      <Link className="button" href="/loan-requests/new">New request</Link>
      <section className="panel" aria-label="Loan requests">
        <p>Complete the request list and its filter.</p>
      </section>
          <section className="tools-grid" aria-label="Tools">
        {selectedToolIds?.map((tools) => (
          <div key={tools.id} />
        ))}
      </section>
    </main>
  );
}

