/**
 * JsonLd — injects a JSON-LD <script> tag into the page.
 * Use in server components / page.tsx files.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
