import { NextResponse } from "next/server";
import { unsubscribeFromChain } from "@/lib/actions";

/**
 * GET /api/chain/unsubscribe?id=<memberId>
 *
 * Token-style unsubscribe. The link in the daily-reminder email footer hits
 * this endpoint with the member's PrayerChainMember.id. The id is a cuid
 * (effectively unguessable), so we treat possession of the link as proof
 * of identity for this low-stakes "stop sending me email" operation.
 *
 * Always returns a friendly HTML page — never throws — so even if the user
 * opens an old link the experience reads as gentle.
 *
 * The confirmation HTML is rendered in the chain's `language` so a member
 * who was getting reminders in Spanish sees the unsubscribe confirmation
 * in Spanish too. `unsubscribeFromChain` returns the chain language for
 * exactly this purpose; we fall back to English for unknown / missing
 * member ids.
 */

type UnsubscribeCopy = {
  htmlLang: string;
  title: string;
  heading: string;
  body1: string;
  body2: string;
  thanks: string;
};

const COPY: Record<string, UnsubscribeCopy> = {
  en: {
    htmlLang: "en",
    title: "Unsubscribed · PrayerTrain",
    heading: "You're unsubscribed.",
    body1: "You won't receive any more reminders for this prayer.",
    body2: "You're still listed as a prayer warrior — your name will appear on the spiritual bouquet when the prayer closes. If you want to leave entirely, please reply to any prior email and ask us to remove you.",
    thanks: "Thank you for praying with us.",
  },
  es: {
    htmlLang: "es",
    title: "Suscripción cancelada · PrayerTrain",
    heading: "Has cancelado tu suscripción.",
    body1: "No recibirás más recordatorios para esta oración.",
    body2: "Sigues siendo parte de los guerreros de oración — tu nombre aparecerá en el ramillete espiritual cuando la oración finalice. Si deseas salir por completo, responde a cualquier correo anterior y pídenos que te quitemos.",
    thanks: "Gracias por orar con nosotros.",
  },
  "pt-BR": {
    htmlLang: "pt-BR",
    title: "Inscrição cancelada · PrayerTrain",
    heading: "Sua inscrição foi cancelada.",
    body1: "Você não receberá mais lembretes para esta oração.",
    body2: "Você ainda está listado como guerreiro de oração — seu nome aparecerá no buquê espiritual quando a oração for encerrada. Se quiser sair completamente, responda a qualquer e-mail anterior e nos peça para removê-lo.",
    thanks: "Obrigado por rezar conosco.",
  },
  fil: {
    htmlLang: "fil",
    title: "Na-unsubscribe · PrayerTrain",
    heading: "Na-unsubscribe ka na.",
    body1: "Hindi ka na makakatanggap ng mga paalala para sa panalanging ito.",
    body2: "Nakalista ka pa rin bilang isang prayer warrior — lalabas ang iyong pangalan sa spiritual bouquet kapag natapos na ang panalangin. Kung gusto mong umalis nang lubos, mangyaring sumagot sa anumang naunang email at hilingin sa amin na alisin ka.",
    thanks: "Salamat sa pagdarasal kasama namin.",
  },
  pl: {
    htmlLang: "pl",
    title: "Wypisano z subskrypcji · PrayerTrain",
    heading: "Zostałeś wypisany.",
    body1: "Nie będziesz już otrzymywać przypomnień dla tej modlitwy.",
    body2: "Nadal jesteś wpisany jako wojownik modlitwy — twoje imię pojawi się w duchowym bukiecie po zakończeniu modlitwy. Jeśli chcesz odejść całkowicie, odpowiedz na dowolny wcześniejszy e-mail i poproś nas o usunięcie cię.",
    thanks: "Dziękujemy za modlitwę z nami.",
  },
};

function pickCopy(language: string | null): UnsubscribeCopy {
  if (language && language in COPY) return COPY[language];
  return COPY.en;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let chainLanguage: string | null = null;
  if (id) {
    try {
      const result = await unsubscribeFromChain(id);
      chainLanguage = result.chainLanguage;
    } catch (e) {
      console.error("[chain-unsubscribe] error:", e);
    }
  }

  const t = pickCopy(chainLanguage);

  // Plain HTML response — no JS required. No tracking. Reads as a quiet
  // confirmation, not an "are you sure?" upsell.
  const html = `<!DOCTYPE html>
<html lang="${t.htmlLang}">
  <head>
    <meta charset="utf-8" />
    <title>${t.title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <style>
      body {
        font-family: Georgia, "Times New Roman", serif;
        background: #faf8f5;
        color: #11152c;
        max-width: 540px;
        margin: 0 auto;
        padding: 64px 24px;
        line-height: 1.6;
      }
      h1 { font-size: 28px; font-weight: 700; margin: 0 0 12px; }
      p { font-size: 16px; margin: 0 0 12px; color: #1a2142; }
      a { color: #947324; }
      .card { background: #fff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 32px 28px; }
      .footer { text-align: center; color: #b8a994; font-size: 12px; margin-top: 24px; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>${t.heading}</h1>
      <p>${t.body1}</p>
      <p>${t.body2}</p>
      <p style="margin-top: 18px;">${t.thanks}</p>
    </div>
    <p class="footer">PrayerTrain · A Lantern Harbor project</p>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
