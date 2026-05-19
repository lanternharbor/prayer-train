/**
 * Recipient name display contract.
 *
 * The PrayerTrain schema stores the recipient's full name as the
 * organizer typed it. `showNames` controls whether public surfaces
 * (browse cards, individual train page H1 + metadata, share previews)
 * render that full name, or just the first whitespace-separated
 * token. Default `true` — the existing behavior for every train
 * created before this control was wired up.
 *
 * Surfaces that are NEVER subject to this rule:
 *   - the spiritual bouquet PDF (private to the receiving family)
 *   - email reminders sent to volunteers (the volunteer has the full
 *     context already, by virtue of being on the train)
 *   - the Manage page (organizer-only view)
 */
export function displayRecipientName(input: {
  recipientName: string;
  showNames: boolean;
}): string {
  if (input.showNames) return input.recipientName;
  const first = input.recipientName.trim().split(/\s+/)[0];
  return first || input.recipientName;
}
