interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO = ({
  title = "BimSpeed MEP Tool – Phần mềm Revit tự động hóa hệ thống MEP miễn phí",
  description = "Tải BimSpeed MEP Tool miễn phí – công cụ giúp kỹ sư cơ điện tạo, xoay, căn chỉnh hệ thống ống, co, fitting trong Revit nhanh gấp 3 lần.",
  image = "https://www.bimspeed.net/og-image.jpg",
  url = "https://www.bimspeed.net",
  type = "website"
}: SEOProps) => {
  // Update document title
  if (typeof document !== 'undefined') {
    document.title = title;
  }

  return (
    <>
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BimSpeed Solutions",
          "url": "https://www.bimspeed.net",
          "logo": "https://www.bimspeed.net/logo.png",
          "description": "BimSpeed MEP Tool - Công cụ tự động hóa Revit cho kỹ sư MEP",
          "sameAs": [
            "https://www.facebook.com/bimspeed",
            "https://www.youtube.com/c/bimspeed",
            "https://zalo.me/g/zaldon417"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "VN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+84936340576",
            "contactType": "Customer Support"
          }
        })}
      </script>

      {/* Structured Data - Software Application */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "BimSpeed MEP Tool",
          "description": description,
          "url": url,
          "applicationCategory": "DesignApplication",
          "operatingSystem": "Windows",
          "softwareRequirements": "Autodesk Revit 2020-2025",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "VND"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": 500
          }
        })}
      </script>

      {/* Structured Data - FAQPage */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "BimSpeed MEP Tool là gì?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "BimSpeed MEP Tool là công cụ tự động hóa Revit giúp kỹ sư MEP tạo, xoay, căn chỉnh hệ thống ống, co, fitting nhanh gấp 3 lần"
              }
            },
            {
              "@type": "Question",
              "name": "Có phải trả tiền sử dụng không?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Không, BimSpeed MEP Tool hoàn toàn miễn phí cho phiên bản đầu tiên"
              }
            },
            {
              "@type": "Question",
              "name": "Hỗ trợ phiên bản Revit nào?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Hỗ trợ Revit 2020, 2021, 2022, 2023, 2024, 2025"
              }
            }
          ]
        })}
      </script>
    </>
  );
};
