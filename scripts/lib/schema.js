// JSON-LD structured data builders (schema.org).

function organization(config) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.organization.name,
    url: config.baseUrl,
    logo: config.baseUrl + config.organization.logo,
    email: config.organization.email,
    sameAs: config.organization.sameAs,
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: config.organization.addressUS,
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        streetAddress: config.organization.addressKR,
        addressCountry: "KR",
      },
    ],
  };
}

function article(post, url, config) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    inLanguage: "ko",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.publishDate,
    dateModified: post.updatedDate || post.publishDate,
    author: { "@type": "Organization", name: config.organization.name, url: config.baseUrl },
    publisher: {
      "@type": "Organization",
      name: config.organization.name,
      logo: { "@type": "ImageObject", url: config.baseUrl + config.organization.logo },
    },
  };
}

function breadcrumbs(items) {
  // items: [{ name, url }]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

function toScriptTag(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

module.exports = { organization, article, breadcrumbs, toScriptTag };
