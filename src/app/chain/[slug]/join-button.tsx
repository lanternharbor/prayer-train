"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { JoinChainModal } from "./join-modal";

/**
 * Wrapper around the join modal that gives the chain detail page a
 * straightforward server-side render with a single client-side button.
 */
export function JoinChainButton({
  chainId,
  organizerFirstName,
  recipientPhrase,
  durationDays,
}: {
  chainId: string;
  organizerFirstName: string;
  recipientPhrase: string;
  durationDays: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 transition-colors text-base"
      >
        <Users className="w-5 h-5" />
        Pray along with {organizerFirstName}
      </button>
      {open && (
        <JoinChainModal
          chainId={chainId}
          organizerFirstName={organizerFirstName}
          recipientPhrase={recipientPhrase}
          durationDays={durationDays}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
