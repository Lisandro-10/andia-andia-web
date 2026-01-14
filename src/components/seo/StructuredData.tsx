interface StructuredDataProps {
  data: Record<string, unknown>
}

/**
 * Component to inject JSON-LD structured data for SEO
 * Usage: <StructuredData data={schemaObject} />
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}