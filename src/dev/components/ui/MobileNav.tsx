import { Disc3, House, Layers, Mail } from "lucide-react";
import { focusSection, navItems } from "./navigation";

const byHref = (href: string) => navItems.find((item) => item.href === href)!;
const items = [
  { ...byHref("#hero"), Icon: House },
  { ...byHref("#projects"), Icon: Disc3 },
  { ...byHref("#skills"), Icon: Layers },
  { ...byHref("#contact"), Icon: Mail },
];

export function MobileNav() {
  return (
    <nav className="sp-mobile-nav" aria-label="Navegação móvel Dev">
      {items.map(({ label, href, Icon }) => (
        <a key={href} href={href} onClick={() => focusSection(href)}><Icon aria-hidden="true" />{label}</a>
      ))}
    </nav>
  );
}
