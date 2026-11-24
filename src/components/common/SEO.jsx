import { Helmet } from "react-helmet-async";

const SITE_URL = "https://noshediting-alpha.vercel.app";

export default function SEO({
  title,
  description,
  keywords = [],
  path = "/",
}) {
  const fullTitle = `${title} | Nosh Infotech`;
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Nosh Infotech" />

      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Nosh Infotech" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta
        property="og:image"
        content={`${SITE_URL}/og-image.webp`}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={`${SITE_URL}/og-image.webp`}
      />
    </Helmet>
  );
}