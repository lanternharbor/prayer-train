/**
 * Simple `{placeholder}` substitution for dictionary strings.
 *
 * Replaces every `{key}` in `template` with `vars[key]`. Missing keys
 * collapse to an empty string (rather than throwing) so a translator
 * who drops a placeholder doesn't crash the page — the missing piece
 * just renders blank and the rest of the sentence still works.
 *
 * For strings that need to render JSX between substituted parts
 * (e.g. `<strong>{email}</strong>` inside a sentence), use
 * `String.split("{key}")` directly in the JSX rather than this helper.
 *
 * Works on both the server and the client; no dependencies.
 */
export function t(
  template: string,
  vars: Record<string, string | number | null | undefined> = {},
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const value = vars[key];
    return value == null ? "" : String(value);
  });
}
