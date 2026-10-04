import { site } from "@/content/site";

const organization = {
  "@context": "https://schema.org",
  "@type": ["Church", "Organization"],
  name: site.name,
  alternateName: site.shortName,
  url: site.siteUrl,
  telephone: site.phone,
  description: site.metadataDescriptions.home,
  parentOrganization: { "@type": "Organization", name: "Remnant Christian Network Global", url: site.links.rcnGlobal },
  address: {
    "@type": "PostalAddress",
    ...site.addressParts,
  },
  sameAs: [site.links.facebook, site.links.youtube, site.links.telegram],
};

export function OrganizationJsonLd() {
  const json = JSON.stringify(organization).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
