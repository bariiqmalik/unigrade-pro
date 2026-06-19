/**
 * JsonLd — Zero-overhead structured data injector for Next.js 15 Server Components.
 * Renders a <script type="application/ld+json"> tag server-side with no client JS cost.
 */
export function JsonLd({ schema }: { schema: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
