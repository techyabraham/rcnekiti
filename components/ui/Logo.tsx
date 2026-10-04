import Link from "next/link";
import { site } from "@/content/site";
import { Img } from "@/components/ui/Img";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand-lockup${compact ? " brand-lockup--compact" : ""}`} href={site.pages.home} aria-label={`${site.shortName} home`}>
      <Img src={site.assets.logoDark} alt="" width={440} height={244} loading="eager" sizes="120px" className="brand-lockup__image" />
      <span className="sr-only">{site.name}</span>
    </Link>
  );
}
