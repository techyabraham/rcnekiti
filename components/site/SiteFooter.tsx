import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";

const networkLinks = [
  ["Website", site.links.rcnGlobal],
  ["Telegram", site.links.rcnGlobalTelegram],
  ["Instagram", site.links.rcnGlobalInstagram],
  ["X", site.links.rcnGlobalX],
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__intro">
          <p className="eyebrow">You belong here</p>
          <h2>Come closer.<br /><em>Find your people.</em></h2>
          <p>{site.tagline}</p>
        </div>
        <div className="site-footer__visit">
          <span className="footer-icon"><MapPin aria-hidden="true" size={17} /></span>
          <div><p className="eyebrow">Find us</p><p>{site.address}</p></div>
        </div>
        <a className="site-footer__contact" href={site.phoneUrl}>
          <span className="footer-icon"><Phone aria-hidden="true" size={17} /></span><span>{site.phone}</span><ArrowUpRight aria-hidden="true" size={17} />
        </a>
      </div>
      <div className="site-footer__links">
        <div>
          <p className="eyebrow">RCN Ekiti</p>
          <a href={site.links.facebook} target="_blank" rel="noopener noreferrer">Facebook <ArrowUpRight aria-hidden="true" size={13} /></a>
          <a href={site.links.youtube} target="_blank" rel="noopener noreferrer">YouTube <ArrowUpRight aria-hidden="true" size={13} /></a>
          <a href={site.links.telegram} target="_blank" rel="noopener noreferrer">Telegram <ArrowUpRight aria-hidden="true" size={13} /></a>
        </div>
        <div>
          <p className="eyebrow">RCN Global</p>
          {networkLinks.map(([label, href]) => <a href={href} target="_blank" rel="noopener noreferrer" key={label}>{label} <ArrowUpRight aria-hidden="true" size={13} /></a>)}
        </div>
        <a className="network-note" href={site.links.rcnGlobal} target="_blank" rel="noopener noreferrer">An apostolic extension of RCN Global <ArrowUpRight aria-hidden="true" size={15} /></a>
      </div>
      <div className="site-footer__bottom">
        <span>© 2026 RCN Ekiti</span>
        <a href={site.links.abraham} target="_blank" rel="noopener noreferrer">Built with love by Abraham <ArrowUpRight aria-hidden="true" size={13} /></a>
      </div>
    </footer>
  );
}
