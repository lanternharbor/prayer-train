import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How PrayerTrain collects, uses, and protects information about the people who use the site and the people they pray for.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "April 11, 2026";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-heading text-4xl font-bold text-navy-800 mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: {LAST_UPDATED}
      </p>

      <div className="prose prose-lg max-w-none text-foreground space-y-8 leading-relaxed">
        <section>
          <p>
            PrayerTrain (the &ldquo;Service&rdquo;) is a small Catholic prayer
            coordination tool. This Privacy Policy explains what information we
            collect, why we collect it, and what we do with it. We try to
            collect as little as possible and to be plain about what happens
            with what we do collect.
          </p>
          <p className="mt-4">
            By using the Service you agree to this policy. If you do not agree,
            please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Who runs PrayerTrain
          </h2>
          <p>
            PrayerTrain is operated by an individual maintainer. Questions
            about this policy or your data can be sent to{" "}
            <a href="mailto:hello@prayertrains.com" className="text-gold-600 hover:text-gold-700 underline">
              hello@prayertrains.com
            </a>{" "}
            or by replying to any email the Service sends you.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Information you give us
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>When you sign in:</strong> your email address. We use it
              to send you a one-time magic link to sign in. We do not ask for
              or store passwords.
            </li>
            <li>
              <strong>When you create a prayer train:</strong> the recipient&apos;s
              name, an optional photo, an optional parish or location, the
              prayer intention, situation category, and any details you choose
              to add.
            </li>
            <li>
              <strong>When you commit to pray for a slot:</strong> your name
              and email address, so we can send a confirmation and a daily
              reminder for the day(s) you committed to.
            </li>
            <li>
              <strong>When you post to a guestbook:</strong> the name and
              message you submit.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Information collected automatically
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Standard request metadata such as IP address, browser user agent,
              and timestamps. We use this for spam prevention, rate limiting,
              and basic operational debugging.
            </li>
            <li>
              A session cookie set by our authentication library after you
              sign in. The cookie is necessary for the site to remember you
              are signed in.
            </li>
          </ul>
          <p className="mt-4">
            We do not run third-party analytics or advertising trackers.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            How we use your information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To run the prayer-train coordination features you sign up for.</li>
            <li>
              To send transactional email — sign-in links, prayer commitment
              confirmations, daily prayer reminders, and (if you are a train
              organizer) updates about your train.
            </li>
            <li>To prevent abuse and protect the Service from spam or attack.</li>
            <li>To respond to your questions when you contact us.</li>
          </ul>
          <p className="mt-4">
            We do not sell your information. We do not share it with
            advertisers. We do not use prayer intentions or recipient details
            for any purpose other than running the Service.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Service providers we use
          </h2>
          <p>
            We rely on a small number of third parties to run the Service.
            Each one only sees the information necessary for the role it
            plays:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong>Vercel</strong> &mdash; hosts the website and runs the
              backend functions.
            </li>
            <li>
              <strong>Neon</strong> &mdash; managed PostgreSQL database where
              your prayer train and account data live.
            </li>
            <li>
              <strong>Resend</strong> &mdash; transactional email delivery for
              sign-in links and prayer reminders.
            </li>
            <li>
              <strong>Vercel Blob</strong> &mdash; storage for recipient
              photos that you choose to upload.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Public versus private prayer trains
          </h2>
          <p>
            When you create a prayer train you choose whether it is public or
            private. <strong>Public</strong> trains can be discovered through
            the browse page, included in our sitemap, and indexed by search
            engines. <strong>Private</strong> trains are only accessible to
            people who know the direct link, are not listed in search
            results, and are excluded from the sitemap. You can change this
            setting at any time from the train&apos;s manage page.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Children
          </h2>
          <p>
            The Service is not directed at children under 13. If you are
            under 13, please do not use the Service or send us any personal
            information. If we learn that we have collected information from
            a child under 13 we will delete it.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Data retention and deletion
          </h2>
          <p>
            We retain account data for as long as you have an account, and
            prayer train data for as long as the train exists. You can ask us
            to delete your account or a specific prayer train by contacting
            us. We will normally complete deletion requests within 30 days.
            Some information may persist briefly in encrypted backups before
            it is overwritten on a normal rotation schedule.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Your choices
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You can stop using the Service at any time. The simplest way to
              opt out of email reminders is to mark your prayer commitments
              as completed (or contact us to remove them).
            </li>
            <li>
              You can switch a prayer train you organize between public and
              private at any time from the manage page.
            </li>
            <li>
              You can request a copy of your data, or its deletion, by
              contacting us.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Changes to this policy
          </h2>
          <p>
            We may update this policy from time to time. The &ldquo;Last
            updated&rdquo; date at the top of this page reflects the most
            recent change. Material changes will be announced on the home
            page or by email to active organizers.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
            Questions
          </h2>
          <p>
            If anything here is unclear or you would like us to do something
            with your data, please reach out at{" "}
            <a href="mailto:hello@prayertrains.com" className="text-gold-600 hover:text-gold-700 underline">
              hello@prayertrains.com
            </a>
            . We&apos;d rather hear from you.
          </p>
        </section>

        <p className="pt-10 text-sm text-muted-foreground">
          See also our{" "}
          <Link href="/terms" className="text-gold-600 hover:text-gold-700 underline">
            Terms of Service
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
