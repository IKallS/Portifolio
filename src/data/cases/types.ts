export interface CaseScreen {
  title: string;
  image: string;
  alt: string;
  question: string;
  detail: string;
  principle: string;
  /** tamanho próprio da captura (ex.: tela de TV em paisagem); sem isso, vale o screenSize do case */
  size?: { width: number; height: number };
}

export interface CaseHighlight {
  title: string;
  text: string;
}

export interface CaseData {
  slug: string;
  pageTitle: string;
  eyebrow: string;
  title: string;
  intro: string;
  meta: { label: string; value: string }[];
  story: { eyebrow: string; heading: string; paragraphs: string[] };
  screenSize: { width: number; height: number };
  screenCaption: string;
  screens: CaseScreen[];
  highlights?: { eyebrow: string; heading: string; items: CaseHighlight[] };
  outcome: { eyebrow: string; heading: string; paragraphs: string[]; link?: { href: string; label: string } };
}
