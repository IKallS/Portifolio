import { dashboardCartaoCredito } from "./dashboardCartaoCredito";
import { laVamosNos } from "./laVamosNos";
import { tmwConnect } from "./tmwConnect";
import { tmwpix } from "./tmwpix";
import type { CaseData } from "./types";

export const cases: Record<string, CaseData> = {
  [tmwConnect.slug]: tmwConnect,
  [laVamosNos.slug]: laVamosNos,
  [tmwpix.slug]: tmwpix,
  [dashboardCartaoCredito.slug]: dashboardCartaoCredito,
};
