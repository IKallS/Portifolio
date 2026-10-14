import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { cases } from "./data/cases";
import { CasePage } from "./pages/CasePage.tsx";
import "./style.css";

// Cada case-<slug>.html declara qual case renderizar em <div id="root" data-case="<slug>">.
const root = document.getElementById("root")!;
const data = cases[root.dataset.case ?? ""];
if (!data) throw new Error(`Case desconhecido: ${root.dataset.case}`);

createRoot(root).render(
  <StrictMode>
    <CasePage data={data} />
  </StrictMode>
);
