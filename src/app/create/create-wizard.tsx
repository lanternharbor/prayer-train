"use client";

import { useState } from "react";
import { createPrayerTrain } from "@/lib/actions";
import { formatSituation, formatPrayerCategory, formatDifficulty } from "@/lib/utils";
import {
  ArrowRight,
  ArrowLeft,
  Heart,
  User,
  BookOpen,
  CalendarDays,
  Clock,
  Star,
  Check,
  Loader2,
  Camera,
} from "lucide-react";
import { CrossIcon } from "@/components/ui/catholic-icons";
import type { PrayerCategory, SituationCategory, DifficultyLevel } from "@/generated/prisma/client";

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

const DURATIONS = [
  { value: 9, label: "9 days", description: "One novena cycle" },
  { value: 30, label: "30 days", description: "One month of prayer" },
  { value: 54, label: "54 days", description: "54-day Rosary novena" },
];

export function CreateWizard({
  prayerTypes,
}: {
  prayerTypes: PrayerTypeSelect[];
}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form state
  const [recipientName, setRecipientName] = useState("");
  const [recipientRelation, setRecipientRelation] = useState("");
  const [recipientPhoto, setRecipientPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [intention, setIntention] = useState("");
  const [situation, setSituation] = useState<SituationCategory | "">("");
  const [situationDetail, setSituationDetail] = useState("");
  const [durationDays, setDurationDays] = useState(30);
  const [customDuration, setCustomDuration] = useState("");
  const [slotsPerDay, setSlotsPerDay] = useState(3);
  const [isPublic, setIsPublic] = useState(true);
  const [selectedPrayerIds, setSelectedPrayerIds] = useState<string[]>([]);

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
        return recipientName.trim() && intention.trim();
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
    if (recipientPhoto) {
      formData.set("recipientPhoto", recipientPhoto);
    }
    formData.set("intention", intention);
    formData.set("situation", situation);
    formData.set("situationDetail", situationDetail);
    formData.set(
      "durationDays",
      (customDuration ? parseInt(customDuration) : durationDays).toString()
    );
    formData.set("slotsPerDay", slotsPerDay.toString());
    formData.set("isPublic", isPublic ? "true" : "false");
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
                Who is this prayer train for?
              </h2>
              <p className="text-sm text-muted-foreground">
                Tell us about the person who needs prayers
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Their name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g., John Smith"
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Your relationship
            </label>
            <input
              type="text"
              value={recipientRelation}
              onChange={(e) => setRecipientRelation(e.target.value)}
              placeholder="e.g., My father, Our parishioner, A friend"
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
            />
          </div>

          {/* Photo upload */}
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Photo <span className="text-xs text-muted-foreground font-normal">(optional)</span>
            </label>
            <p className="text-xs text-muted-foreground mb-3">
              A photo helps prayer warriors feel connected to the person they&apos;re praying for
            </p>
            <div className="flex items-center gap-4">
              <label className="photo-upload w-20 h-20 rounded-full bg-cream-100 border-2 border-dashed border-cream-400 flex items-center justify-center overflow-hidden hover:border-gold-400 transition-colors cursor-pointer">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-6 h-6 text-muted-foreground" />
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        alert("Photo must be under 5MB");
                        return;
                      }
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
                    }}
                    className="text-red-500 hover:text-red-600 font-medium"
                  >
                    Remove photo
                  </button>
                ) : (
                  <span>JPG, PNG, or WebP. Max 5MB.</span>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Prayer intention <span className="text-red-400">*</span>
            </label>
            <textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="What would you like people to pray for? e.g., Complete healing from cancer, peace during a difficult surgery, guidance in a career change..."
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
                What&apos;s the situation?
              </h2>
              <p className="text-sm text-muted-foreground">
                We&apos;ll suggest prayers tailored to this need
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
                {formatSituation(sit)}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Additional details (optional)
            </label>
            <textarea
              value={situationDetail}
              onChange={(e) => setSituationDetail(e.target.value)}
              placeholder="Any additional context you'd like prayer warriors to know..."
              rows={2}
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-none"
            />
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
                How long should the prayer train run?
              </h2>
              <p className="text-sm text-muted-foreground">
                Choose a duration and number of prayer slots per day
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
                placeholder="Custom days"
                value={customDuration}
                onChange={(e) => setCustomDuration(e.target.value)}
                min={1}
                max={365}
                className="w-40 px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
              />
              <span className="text-sm text-muted-foreground">days</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              Prayer slots per day
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
              More slots = more people can participate each day
            </p>
          </div>

          {/* Public directory toggle */}
          <div className="flex items-start gap-4 p-4 rounded-lg bg-cream-50 border border-cream-300">
            <button
              type="button"
              role="switch"
              aria-checked={isPublic}
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
                List on public directory
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Allow anyone to find this prayer train on the{" "}
                <span className="font-medium">Find a FaithTrain</span> page.
                Turn off to keep it private (link-only).
              </p>
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
                Choose prayers for the calendar
              </h2>
              <p className="text-sm text-muted-foreground">
                {situation
                  ? "We've highlighted prayers recommended for this situation."
                  : "Select prayers, or leave blank for auto-selection."}
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
                        {formatPrayerCategory(prayer.category)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {prayer.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {prayer.duration} min
                      </span>
                      {prayer.daysRequired > 1 && (
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {prayer.daysRequired} days
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
              No prayers selected &mdash; we&apos;ll automatically choose prayers
              matching the situation.
            </p>
          )}
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
            Back
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
            Next
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
            {loading ? "Creating..." : "Create FaithTrain"}
          </button>
        )}
      </div>
    </div>
  );
}
