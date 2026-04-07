import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  CalendarDays,
  Users,
  Bell,
  BookOpen,
  ArrowRight,
  Sparkles,
  Search,
  Quote,
} from "lucide-react";
import {
  CrossIcon,
  SacredHeartIcon,
  PrayingHandsIcon,
  CandleIcon,
  DoveIcon,
  RosaryIcon,
  CrossDivider,
} from "@/components/ui/catholic-icons";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-600 via-navy-700 to-navy-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gold-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gold-300 rounded-full blur-[140px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-gold-200 mb-8">
                <CrossIcon className="w-4 h-4" />
                <span>Catholic Prayer Coordination</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Like a meal train,
                <br />
                <span className="text-gold-300">but for prayers</span>
              </h1>
              <p className="text-lg sm:text-xl text-navy-100 leading-relaxed mb-10 max-w-xl">
                When someone you love is struggling, rally your parish and
                community to provide continuous prayer coverage. Create a
                PrayerTrain, choose prayers, and invite others to sign up for
                specific days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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

            {/* Right: Logo illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gold-400/20 rounded-full blur-[80px] scale-75" />
                <Image
                  src="/logo.png"
                  alt="PrayerTrain — a community united in prayer"
                  width={480}
                  height={480}
                  className="relative w-64 sm:w-80 lg:w-[420px] h-auto drop-shadow-2xl"
                  priority
                />
              </div>
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
              icon={<SacredHeartIcon className="w-7 h-7" />}
              title="Create a PrayerTrain"
              description="Tell us about the person and their situation. We'll suggest appropriate prayers and generate a calendar of prayer slots."
            />
            <StepCard
              step={2}
              icon={<PrayingHandsIcon className="w-7 h-7" />}
              title="Share with Your Community"
              description="Send the link to your parish, prayer group, family, and friends. They pick specific prayers on specific days to commit to."
            />
            <StepCard
              step={3}
              icon={<CandleIcon className="w-7 h-7" />}
              title="Pray Together"
              description="Volunteers receive daily reminders with their prayer instructions. The organizer can post updates and see the prayer wall fill up."
            />
          </div>
        </div>
      </section>

      <CrossDivider className="max-w-6xl mx-auto px-4" />

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
              icon={<RosaryIcon className="w-5 h-5 text-gold-500" />}
              title="40+ Curated Prayers"
              description="Novenas, rosaries, chaplets, litanies, short prayers, and scripture passages — all with full instructions."
            />
            <FeatureCard
              icon={<CalendarDays className="w-5 h-5 text-gold-500" />}
              title="Visual Prayer Calendar"
              description="See at a glance which days are covered and which need prayer warriors. Novena blocks span 9 days as connected units."
            />
            <FeatureCard
              icon={<DoveIcon className="w-5 h-5 text-gold-500" />}
              title="Smart Suggestions"
              description="Select a situation and we recommend the most appropriate prayers. Illness? Try the Novena to the Sacred Heart. Finances? St. Joseph has you covered."
            />
            <FeatureCard
              icon={<PrayingHandsIcon className="w-5 h-5 text-gold-500" />}
              title="Easy Sign-Up"
              description="Volunteers can claim prayer slots with just their name and email — no account required. Share one link and watch the calendar fill up."
            />
            <FeatureCard
              icon={<CandleIcon className="w-5 h-5 text-gold-500" />}
              title="Daily Reminders"
              description="Prayer warriors receive email reminders on their committed days with the full prayer text and instructions."
            />
            <FeatureCard
              icon={<SacredHeartIcon className="w-5 h-5 text-gold-500" />}
              title="Encouragement Wall"
              description="Friends and family can leave messages of encouragement and spiritual support on the prayer train's guestbook."
            />
          </div>
        </div>
      </section>

      {/* Testimonials / Community Voices */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              Stories from the Community
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real families, real parishes, real prayers answered.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="When my husband was diagnosed, our parish rallied around us. 47 people signed up to pray specific novenas on specific days. We could feel it."
              name="Maria S."
              role="St. Anthony Parish"
              initials="MS"
            />
            <TestimonialCard
              quote="I shared the link in our prayer group chat and within an hour every slot was filled. The calendar turning gold was the most beautiful thing I'd ever seen."
              name="Fr. Thomas K."
              role="Pastor"
              initials="TK"
            />
            <TestimonialCard
              quote="My grandmother didn't need an account — she just typed her name and email and committed to praying the Rosary every Tuesday. Simple enough for anyone."
              name="Katie M."
              role="Organizer"
              initials="KM"
            />
          </div>
          <p className="text-center text-xs text-muted-foreground mt-8">
            These represent the kind of stories we hope to hear from you.
          </p>
        </div>
      </section>

      <CrossDivider className="max-w-6xl mx-auto px-4" />

      {/* CTA with logo */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="/logo.png"
                alt="PrayerTrain"
                width={320}
                height={320}
                className="w-56 sm:w-72 h-auto opacity-90"
              />
            </div>
            <div className="text-center md:text-left">
              <CrossIcon className="w-7 h-7 text-gold-400 mb-4 mx-auto md:mx-0" />
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
                Someone needs your prayers
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Whether it&apos;s a friend battling illness, a family in crisis,
                or someone discerning their vocation &mdash; rally your
                community to pray with purpose and consistency.
              </p>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-navy-700 transition-colors text-lg"
              >
                Start a PrayerTrain Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
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

function TestimonialCard({
  quote,
  name,
  role,
  initials,
  imageUrl,
}: {
  quote: string;
  name: string;
  role: string;
  initials: string;
  imageUrl?: string;
}) {
  return (
    <div className="prayer-card flex flex-col">
      <Quote className="w-8 h-8 text-gold-300 mb-3" />
      <p className="text-sm text-foreground leading-relaxed mb-6 flex-1 italic">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-10 h-10 rounded-full object-cover border border-gold-200"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center border border-gold-200">
            <span className="text-sm font-heading font-semibold text-navy-600">
              {initials}
            </span>
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-navy-800">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}
