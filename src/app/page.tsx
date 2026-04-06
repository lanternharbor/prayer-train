import Link from "next/link";
import {
  Heart,
  CalendarDays,
  Users,
  Bell,
  BookOpen,
  ArrowRight,
  Sparkles,
  Church,
  Search,
} from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-600 via-navy-700 to-navy-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gold-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gold-300 rounded-full blur-[140px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-gold-200 mb-8">
              <Church className="w-4 h-4" />
              <span>Catholic Prayer Coordination</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Like a meal train,
              <br />
              <span className="text-gold-300">but for prayers</span>
            </h1>
            <p className="text-lg sm:text-xl text-navy-100 leading-relaxed mb-10 max-w-2xl mx-auto">
              When someone you love is struggling, rally your parish and
              community to provide continuous prayer coverage. Create a
              PrayerTrain, choose prayers, and invite others to sign up for
              specific days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 transition-colors text-lg"
              >
                Start a PrayerTrain
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/browse"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-lg"
              >
                <Search className="w-5 h-5" />
                Find a PrayerTrain
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              How PrayerTrain Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple steps to surround someone in organized, continuous
              prayer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <StepCard
              step={1}
              icon={<Heart className="w-7 h-7" />}
              title="Create a PrayerTrain"
              description="Tell us about the person and their situation. We'll suggest appropriate prayers and generate a calendar of prayer slots."
            />
            <StepCard
              step={2}
              icon={<Users className="w-7 h-7" />}
              title="Share with Your Community"
              description="Send the link to your parish, prayer group, family, and friends. They pick specific prayers on specific days to commit to."
            />
            <StepCard
              step={3}
              icon={<Bell className="w-7 h-7" />}
              title="Pray Together"
              description="Volunteers receive daily reminders with their prayer instructions. The organizer can post updates and see the prayer wall fill up."
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              Built for the Faithful
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Rooted in Catholic prayer tradition with a curated library of
              novenas, rosaries, chaplets, litanies, and more.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<BookOpen className="w-5 h-5 text-gold-500" />}
              title="40+ Curated Prayers"
              description="Novenas, rosaries, chaplets, litanies, short prayers, and scripture passages — all with full instructions."
            />
            <FeatureCard
              icon={<CalendarDays className="w-5 h-5 text-gold-500" />}
              title="Visual Prayer Calendar"
              description="See at a glance which days are covered and which need prayer warriors. Novena blocks span 9 days as connected units."
            />
            <FeatureCard
              icon={<Sparkles className="w-5 h-5 text-gold-500" />}
              title="Smart Suggestions"
              description="Select a situation and we recommend the most appropriate prayers. Illness? Try the Novena to the Sacred Heart. Finances? St. Joseph has you covered."
            />
            <FeatureCard
              icon={<Users className="w-5 h-5 text-gold-500" />}
              title="Easy Sign-Up"
              description="Volunteers can claim prayer slots with just their name and email — no account required. Share one link and watch the calendar fill up."
            />
            <FeatureCard
              icon={<Bell className="w-5 h-5 text-gold-500" />}
              title="Daily Reminders"
              description="Prayer warriors receive email reminders on their committed days with the full prayer text and instructions."
            />
            <FeatureCard
              icon={<Heart className="w-5 h-5 text-gold-500" />}
              title="Encouragement Wall"
              description="Friends and family can leave messages of encouragement and spiritual support on the prayer train's guestbook."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
            Someone needs your prayers
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Whether it&apos;s a friend battling illness, a family in crisis, or
            someone discerning their vocation &mdash; rally your community to
            pray with purpose and consistency.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-navy-700 transition-colors text-lg"
          >
            Start a PrayerTrain Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function StepCard({
  step,
  icon,
  title,
  description,
}: {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="relative w-16 h-16 rounded-2xl bg-navy-600 flex items-center justify-center mx-auto mb-5 text-gold-300">
        {icon}
        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold-400 text-navy-900 text-xs font-bold flex items-center justify-center">
          {step}
        </span>
      </div>
      <h3 className="font-heading text-xl font-semibold text-navy-800 mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="prayer-card">
      <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-heading text-lg font-semibold text-navy-800 mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
