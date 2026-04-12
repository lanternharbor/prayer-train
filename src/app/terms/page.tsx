import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms you agree to when you use PrayerTrain.",
};

const LAST_UPDATED = "April 11, 2026";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-heading text-4xl font-bold text-navy-800 mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: {LAST_UPDATED}
      </p>

      <div className="prose prose-lg max-w-none text-foreground space-y-8 leading-relaxed">
        <section>
          <p>
            Welcome to PrayerTrain (the &ldquo;Service&rdquo;). These terms
            (the &ldquo;Terms&rdquo;) are an agreement between you and the
            person who operates the Service. By using the Service you agree
            to them. If you do not agree, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            What PrayerTrain is
          </h2>
          <p>
            PrayerTrain is a tool for coordinating prayer commitments around
            a person or intention. Organizers create a &ldquo;prayer
            train,&rdquo; choose a duration and a set of prayers, and invite
            friends, family, and parishioners to commit to specific prayers
            on specific days. Volunteers receive email reminders for the
            day(s) they signed up for.
          </p>
          <p className="mt-4">
            The Service is provided as a free, good-faith effort to help
            Catholic communities organize spiritual support. It is not a
            substitute for medical care, professional counseling, financial
            advice, or any other professional service.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Your account
          </h2>
          <p>
            To create or manage a prayer train you sign in with your email
            address using a one-time magic link. You are responsible for the
            security of the email account you sign in with. You agree to
            give accurate information and to keep it up to date.
          </p>
          <p className="mt-4">
            You can claim a prayer slot without an account by entering your
            name and email at the time of claiming. By doing so you agree to
            receive a confirmation email and any daily prayer reminders for
            the day(s) you signed up for.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Acceptable use
          </h2>
          <p>You agree not to use the Service to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              Post content that is unlawful, harassing, defamatory, hateful,
              or that violates another person&apos;s privacy or dignity.
            </li>
            <li>
              Impersonate someone else, or create a prayer train for a
              person without their consent (or, in the case of a minor,
              their parent or guardian&apos;s consent).
            </li>
            <li>
              Use the Service to send spam, run promotions, or sell goods
              and services.
            </li>
            <li>
              Attempt to break, probe, scrape, or overwhelm the Service.
            </li>
            <li>
              Use the Service in a way that would violate the laws of the
              jurisdiction you are in or that we operate from.
            </li>
          </ul>
          <p className="mt-4">
            We may remove content or suspend accounts that violate these
            rules. We&apos;ll try to be reasonable about it.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Content you submit
          </h2>
          <p>
            You retain ownership of the content you submit (intentions,
            updates, guestbook entries, photos, etc.). By submitting content
            you grant us a non-exclusive, royalty-free license to display
            and distribute it through the Service for the purpose of running
            it.
          </p>
          <p className="mt-4">
            If you upload a photo of someone, please make sure you have the
            right to do so. We may remove content that appears to violate
            another person&apos;s rights.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Public versus private trains
          </h2>
          <p>
            You can choose whether each prayer train you create is public
            (discoverable through the browse page and indexed by search
            engines) or private (accessible only by direct link, excluded
            from sitemaps and search). Think carefully about which is
            appropriate, especially if the train involves sensitive medical
            or personal information about another person.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Email
          </h2>
          <p>
            By using the Service you consent to receive transactional emails
            related to your activity: sign-in links, prayer commitment
            confirmations, daily prayer reminders, and updates from train
            organizers about trains you signed up for. We do not send
            marketing email.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            No warranty
          </h2>
          <p>
            The Service is provided &ldquo;as is&rdquo; and &ldquo;as
            available,&rdquo; without warranties of any kind, express or
            implied. We do not warrant that the Service will be uninterrupted,
            error-free, secure, or that it will meet your particular needs.
            Email delivery in particular is best-effort and depends on
            third-party providers we do not control.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Limitation of liability
          </h2>
          <p>
            To the maximum extent allowed by law, the Service&apos;s
            operator is not liable for any indirect, incidental, special,
            consequential, or punitive damages, or for any loss of data,
            opportunity, or goodwill arising from your use of the Service.
            If we are found liable for any direct damages, our total
            liability will not exceed one hundred US dollars (USD $100).
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Termination
          </h2>
          <p>
            You can stop using the Service at any time and ask us to delete
            your account. We may suspend or terminate accounts that violate
            these Terms or that are inactive for an extended period. We may
            also discontinue the Service entirely with reasonable notice.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Changes to these Terms
          </h2>
          <p>
            We may update these Terms from time to time. The &ldquo;Last
            updated&rdquo; date above reflects the most recent change.
            Continued use of the Service after a change means you accept the
            updated Terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Contact
          </h2>
          <p>
            Questions about these Terms can be sent to{" "}
            <a href="mailto:hello@prayertrains.com" className="text-gold-600 hover:text-gold-700 underline">
              hello@prayertrains.com
            </a>{" "}
            or by replying to any email the Service sends you.
          </p>
        </section>

        <p className="pt-10 text-sm text-muted-foreground">
          See also our{" "}
          <Link href="/privacy" className="text-gold-600 hover:text-gold-700 underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
