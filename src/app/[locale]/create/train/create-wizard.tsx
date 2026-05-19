"use client";

import { useState } from "react";
import { createPrayerTrain } from "@/lib/actions";
import {
  ArrowRight,
  ArrowLeft,
  Heart,
  User,
  BookOpen,
  CalendarDays,
  Clock,
  Check,
  Loader2,
  Camera,
  Lock,
} from "lucide-react";
import { ParishAutocomplete } from "@/components/ui/parish-autocomplete";
import type { PrayerCategory, SituationCategory, DifficultyLevel } from "@/generated/prisma/client";
import type { Dictionary } from "@/i18n/dictionaries";

type PrayerTypeSelect = {
  id: string;
  slug: string;
  name: string;
  category: PrayerCategory;
  description: string;
  duration: number;
  difficulty: DifficultyLevel;
  daysRequired: number;
  patronSaint: string | null;
  situationTags: SituationCategory[];
};

const SITUATIONS: SituationCategory[] = [
  "ILLNESS",
  "SURGERY",
  "MENTAL_HEALTH",
  "GRIEF",
  "PREGNANCY",
  "FERTILITY",
  "MARRIAGE",
  "FAMILY",
  "FINANCIAL",
  "CAREER",
  "CONVERSION",
  "DISCERNMENT",
  "GENERAL",
  "OTHER",
];

export function CreateWizard({
  prayerTypes,
  currentUserName,
  t,
  situationLabels,
  prayerCategoryLabels,
  initialSelectedPrayerIds = [],
}: {
  prayerTypes: PrayerTypeSelect[];
  /** session.user.name if known — pre-fills "Your name" so users with
   *  a name on file (Google sign-in, prior submission) don't retype. */
  currentUserName?: string;
  t: Dictionary["wizard"];
  situationLabels: Dictionary["situationLabels"];
  prayerCategoryLabels: Dictionary["prayerCategoryLabels"];
  /** Optional pre-fill from ?prayerType=<slug> on /create/train. The
   *  parent resolved the slug to an ID. Empty array (default) =
   *  no pre-fill — the wizard renders with nothing selected. */
  initialSelectedPrayerIds?: string[];
}) {
  // Locale-aware duration labels. Built inside the component so they
  // can reference the dict the server resolved. Three canonical
  // durations + a custom day input shown below; same options as before.
  const DURATIONS = [
    { value: 9, label: t.duration9, description: t.duration9desc },
    { value: 30, label: t.duration30, description: t.duration30desc },
    { value: 54, label: t.duration54, description: t.duration54desc },
  ];
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Organizer self-identification. Pre-filled from currentUserName if set;
  // otherwise empty and the user fills it in. The anonymous checkbox is
  // an opt-in override — silent anonymity (the previous behavior) was
  // never an explicit user choice.
  const [organizerName, setOrganizerName] = useState(currentUserName ?? "");
  const [organizerAnonymous, setOrganizerAnonymous] = useState(false);

  // Form state
  const [recipientName, setRecipientName] = useState("");
  const [recipientRelation, setRecipientRelation] = useState("");
  const [parish, setParish] = useState("");
  const [parishId, setParishId] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [recipientPhoto, setRecipientPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [intention, setIntention] = useState("");
  const [situation, setSituation] = useState<SituationCategory | "">("");
  const [situationDetail, setSituationDetail] = useState("");
  const [durationDays, setDurationDays] = useState(30);
  const [customDuration, setCustomDuration] = useState("");
  const [slotsPerDay, setSlotsPerDay] = useState(3);
  // Default to PRIVATE (link-only) per the May 2026 audit. New trains
  // often carry sensitive medical, grief, or family context; listing
  // them on the public directory and exposing them to search
  // indexing should be an explicit informed opt-in by the organizer.
  // The toggle below makes the choice prominent and explains exactly
  // what "public" entails (browse listing, sitemap, search indexing).
  const [isPublic, setIsPublic] = useState(false);
  const [selectedPrayerIds, setSelectedPrayerIds] = useState<string[]>(
    initialSelectedPrayerIds,
  );
  // Optional free-form prayer the organizer wants every volunteer to also
  // pray. Renders as its own card on the detail page and gets appended to
  // daily reminder emails. Lives outside the situationDetail field so the
  // two are visually distinct on the train page.
  const [customPrayerText, setCustomPrayerText] = useState("");

  // Smart prayer suggestions based on situation
  const suggestedPrayers = situation
    ? prayerTypes.filter((p) =>
        p.situationTags.includes(situation as SituationCategory)
      )
    : prayerTypes;

  const togglePrayer = (id: string) => {
    setSelectedPrayerIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        // Step 1 also captures the organizer's own name. They must
        // either provide one or check the anonymous box; the wizard
        // can't advance past step 1 without that choice being made.
        return (
          recipientName.trim() &&
          intention.trim() &&
          (organizerAnonymous || organizerName.trim().length > 0)
        );
      case 2:
        return !!situation;
      case 3:
        return durationDays > 0;
      case 4:
        return true; // prayer selection is optional
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.set("recipientName", recipientName);
    formData.set("recipientRelation", recipientRelation);
    formData.set("parish", parish);
    formData.set("parishId", parishId || "");
    formData.set("location", location);
    if (recipientPhoto) {
      formData.set("recipientPhoto", recipientPhoto);
    }
    formData.set("intention", intention);
    formData.set("situation", situation);
    formData.set("situationDetail", situationDetail);
    formData.set("customPrayerText", customPrayerText);
    formData.set(
      "durationDays",
      (customDuration ? parseInt(customDuration) : durationDays).toString()
    );
    formData.set("slotsPerDay", slotsPerDay.toString());
    formData.set("isPublic", isPublic ? "true" : "false");
    formData.set("organizerName", organizerName);
    formData.set("organizerAnonymous", organizerAnonymous ? "true" : "false");
    formData.set("prayerTypeIds", selectedPrayerIds.join(","));
    await createPrayerTrain(formData);
  };

  return (
    <div>
      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-10">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                s < step
                  ? "bg-gold-400 text-navy-900"
                  : s === step
                  ? "bg-navy-600 text-white"
                  : "bg-cream-200 text-muted-foreground"
              }`}
            >
              {s < step ? <Check className="w-4 h-4" /> : s}
            </div>
            {s < 4 && (
              <div
                className={`w-12 sm:w-20 h-0.5 ${
                  s < step ? "bg-gold-400" : "bg-cream-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Recipient Info */}
      {step === 1 && (
        <div className="prayer-card space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center">
              <User className="w-5 h-5 text-navy-600" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold text-navy-800">
                {t.step1Heading}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t.step1Subheading}
              </p>
            </div>
          </div>

          {/* Privacy reassurance. Step 1 is where organizers type the
              recipient's name, photo, and (optionally) parish — the
              most sensitive surface of the wizard. The actual public/
              private toggle is at step 3 (duration), so without this
              note the organizer would fill in family details with no
              visible answer to "where does this end up?". Calm gold-
              lock framing; the message itself defers the toggle to
              the user on the duration step. */}
          <div className="flex items-start gap-2 text-sm text-navy-700 bg-cream-50 border border-cream-300 rounded-lg p-3">
            <Lock className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{t.step1PrivacyReassurance}</span>
          </div>

          {/* Organizer self-identification. Shown FIRST so the framing
              is "you're starting this for someone else" — answers
              "who are you" before "who is this for". Persisted to
              User.name on submit (unless anonymous), so future trains
              by this organizer pre-fill. */}
          <div className="rounded-lg border border-cream-300 bg-cream-50 p-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">
                {t.organizerNameLabel}{" "}
                {!organizerAnonymous && (
                  <span className="text-red-400">*</span>
                )}
              </label>
              <input
                type="text"
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                disabled={organizerAnonymous}
                placeholder={t.organizerNamePlaceholder}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                {organizerAnonymous
                  ? t.organizerNameHelpHidden
                  : t.organizerNameHelpShown}
              </p>
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={organizerAnonymous}
                onChange={(e) => setOrganizerAnonymous(e.target.checked)}
                className="mt-0.5"
              />
              <span className="text-sm text-navy-700">
                {t.anonymousLabel}
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              {t.recipientNameLabel} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder={t.recipientNamePlaceholder}
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              {t.recipientNameHelp}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              {t.relationLabel}
            </label>
            <input
              type="text"
              value={recipientRelation}
              onChange={(e) => setRecipientRelation(e.target.value)}
              placeholder={t.relationPlaceholder}
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
            />
          </div>

          {/* Parish & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">
                {t.parishLabel} <span className="text-xs text-muted-foreground font-normal">{t.optional}</span>
              </label>
              <ParishAutocomplete
                value={parish}
                onChange={(val, id) => {
                  setParish(val);
                  setParishId(id);
                }}
                onLocationFill={(loc) => {
                  if (!location) setLocation(loc);
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">
                {t.locationLabel} <span className="text-xs text-muted-foreground font-normal">{t.optional}</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t.locationPlaceholder}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                {t.locationHelp}
              </p>
            </div>
          </div>

          {/* Photo upload */}
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              {t.photoLabel} <span className="text-xs text-muted-foreground font-normal">{t.optional}</span>
            </label>
            <p className="text-xs text-muted-foreground mb-3">
              {t.photoHelp}
            </p>
            <div className="flex items-center gap-4">
              <label className="photo-upload w-20 h-20 rounded-full bg-cream-100 border-2 border-dashed border-cream-400 flex items-center justify-center overflow-hidden hover:border-gold-400 transition-colors cursor-pointer">
                {photoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element -- local blob URL preview
                  <img
                    src={photoPreview}
                    alt={t.photoPreviewAlt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-6 h-6 text-muted-foreground" />
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  aria-label={t.photoUploadAriaLabel}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        // Inline-error pattern instead of alert() — keeps the
                        // wizard flow uninterrupted and avoids the jarring
                        // browser dialog the rest of the app stopped using.
                        setPhotoError(t.photoTooBig);
                        return;
                      }
                      setPhotoError(null);
                      setRecipientPhoto(file);
                      setPhotoPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
              <div className="text-xs text-muted-foreground">
                {photoPreview ? (
                  <button
                    type="button"
                    onClick={() => {
                      setRecipientPhoto(null);
                      setPhotoPreview(null);
                      setPhotoError(null);
                    }}
                    className="text-red-500 hover:text-red-600 font-medium"
                  >
                    {t.photoRemove}
                  </button>
                ) : (
                  <span>{t.photoSpec}</span>
                )}
              </div>
            </div>
            {photoError && (
              <p
                role="alert"
                className="text-xs text-red-700 bg-red-50 border border-red-200 rounded px-2 py-1 mt-2"
              >
                {photoError}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              {t.intentionLabel} <span className="text-red-400">*</span>
            </label>
            <textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder={t.intentionPlaceholder}
              rows={3}
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-none"
            />
          </div>
        </div>
      )}

      {/* Step 2: Situation */}
      {step === 2 && (
        <div className="prayer-card space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center">
              <Heart className="w-5 h-5 text-navy-600" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold text-navy-800">
                {t.step2Heading}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t.step2Subheading}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SITUATIONS.map((sit) => (
              <button
                key={sit}
                type="button"
                onClick={() => setSituation(sit)}
                className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-colors border ${
                  situation === sit
                    ? "bg-navy-600 text-white border-navy-600"
                    : "bg-cream-50 text-navy-700 border-border hover:border-navy-300"
                }`}
              >
                {situationLabels[sit]}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              {t.detailsLabel}
            </label>
            <textarea
              value={situationDetail}
              onChange={(e) => setSituationDetail(e.target.value)}
              placeholder={t.detailsPlaceholder}
              rows={2}
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              {t.detailsHelp}
            </p>
          </div>
        </div>
      )}

      {/* Step 3: Duration */}
      {step === 3 && (
        <div className="prayer-card space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-navy-600" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold text-navy-800">
                {t.step3Heading}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t.step3Subheading}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {DURATIONS.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => {
                  setDurationDays(d.value);
                  setCustomDuration("");
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-colors ${
                  durationDays === d.value && !customDuration
                    ? "bg-navy-600 text-white border-navy-600"
                    : "bg-cream-50 text-navy-700 border-border hover:border-navy-300"
                }`}
              >
                <div>
                  <span className="font-medium">{d.label}</span>
                  <span className="text-sm opacity-75 ml-2">
                    &mdash; {d.description}
                  </span>
                </div>
              </button>
            ))}
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder={t.customDaysPlaceholder}
                aria-label={t.customDaysAria}
                value={customDuration}
                onChange={(e) => setCustomDuration(e.target.value)}
                min={1}
                max={365}
                className="w-40 px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
              />
              <span className="text-sm text-muted-foreground">{t.daysSuffix}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              {t.slotsLabel}
            </label>
            <div className="flex gap-3">
              {[1, 2, 3, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSlotsPerDay(n)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    slotsPerDay === n
                      ? "bg-navy-600 text-white border-navy-600"
                      : "bg-cream-50 text-navy-700 border-border hover:border-navy-300"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {t.slotsHelp}
            </p>
          </div>

          {/* Visibility toggle. Default is PRIVATE (link-only). Going
              public is an explicit informed opt-in that makes the
              recipient's name, intention, photo, and parish discoverable
              via the public directory, search engines, and the
              /situations topic pages. */}
          <div className="flex items-start gap-4 p-4 rounded-lg bg-cream-50 border border-cream-300">
            <button
              type="button"
              role="switch"
              aria-checked={isPublic}
              aria-label={t.visibilityToggleAria}
              onClick={() => setIsPublic(!isPublic)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                isPublic ? "bg-gold-400" : "bg-cream-400"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-sm transform transition-transform ${
                  isPublic ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <div>
              <p className="text-sm font-medium text-navy-700">
                {isPublic ? t.visibilityPublic : t.visibilityPrivate}
              </p>
              {isPublic ? (
                <div className="text-xs text-muted-foreground mt-1 space-y-1">
                  <p>{t.visibilityPublicWarning}</p>
                  <ul className="list-disc list-outside pl-4 space-y-0.5">
                    <li>{t.visibilityList1}</li>
                    <li>{t.visibilityList2}</li>
                    <li>{t.visibilityList3}</li>
                  </ul>
                  <p className="pt-1">{t.visibilityCaveat}</p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t.visibilityPrivateBody}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Prayer Selection */}
      {step === 4 && (
        <div className="prayer-card space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-navy-600" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold text-navy-800">
                {t.step4Heading}
              </h2>
              <p className="text-sm text-muted-foreground">
                {situation
                  ? t.step4SubheadingWithSituation
                  : t.step4SubheadingNoSituation}
              </p>
            </div>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {suggestedPrayers.map((prayer) => (
              <button
                key={prayer.id}
                type="button"
                onClick={() => togglePrayer(prayer.id)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                  selectedPrayerIds.includes(prayer.id)
                    ? "bg-gold-50 border-gold-400"
                    : "bg-cream-50 border-border hover:border-navy-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-navy-800 text-sm">
                        {prayer.name}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-xs bg-cream-200 text-cream-600">
                        {prayerCategoryLabels[prayer.category]}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {prayer.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {prayer.duration} {t.minutesShort}
                      </span>
                      {prayer.daysRequired > 1 && (
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {prayer.daysRequired} {t.daysSuffix}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ml-3 mt-0.5 ${
                      selectedPrayerIds.includes(prayer.id)
                        ? "bg-gold-400 border-gold-400"
                        : "border-cream-400"
                    }`}
                  >
                    {selectedPrayerIds.includes(prayer.id) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {selectedPrayerIds.length === 0 && (
            <p className="text-sm text-muted-foreground bg-cream-50 rounded-lg p-3">
              {t.noneSelected}
            </p>
          )}

          {/* Optional custom prayer — for the organizer who has a specific
              prayer they want every volunteer to also pray (a family
              tradition, a prayer a friend wrote, words from their own
              heart). Sits separate from the situationDetail field so the
              two stay visually distinct on the train detail page. */}
          <div className="pt-2 border-t border-cream-200">
            <label
              htmlFor="customPrayerText"
              className="block text-sm font-medium text-navy-700 mb-1.5"
            >
              {t.customPrayerLabel}{" "}
              <span className="text-xs text-muted-foreground font-normal">
                {t.optional}
              </span>
            </label>
            <p className="text-xs text-muted-foreground mb-2">
              {t.customPrayerHelp}
            </p>
            <textarea
              id="customPrayerText"
              value={customPrayerText}
              onChange={(e) => setCustomPrayerText(e.target.value)}
              placeholder={t.customPrayerPlaceholder}
              rows={4}
              maxLength={4000}
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-none"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.navBack}
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t.navNext}
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Heart className="w-4 h-4" />
            )}
            {loading ? t.navCreating : t.navCreate}
          </button>
        )}
      </div>
    </div>
  );
}
