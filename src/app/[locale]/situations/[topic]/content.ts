/**
 * Content registry for the /situations/[topic] use-case cluster.
 *
 * Each entry below is one situational landing page (cancer, sick
 * child, surgery, grief, addiction, infertility). The page renderer
 * in ./page.tsx consumes this data; copy lives here so a future
 * theology-review pass or copy edit can be done in one file without
 * touching the route or rendering logic.
 *
 * Tone discipline (per docs/theology-review.md item #13 + the SEO
 * audit's defensive copy guidance):
 *   - Pastoral, not promotional
 *   - No outcome promises (no "and they got better"; no "if you pray
 *     hard enough"; no implication that prayer is a transactional
 *     mechanism for healing)
 *   - Catholic specifically; the saints + devotions match
 *   - Branded as PrayerTrain throughout — the pray-together format
 *     stays a kind of PrayerTrain, not a separate "prayer chain"
 *   - Krysta's "not everyone gets better" feedback is honored: the
 *     pastoralNote always names that prayer is solidarity, not a
 *     guarantee
 *
 * Status: shipped 2026-05-06 ahead of formal theology review (William
 * approved the early-deploy given low traffic; review queued for Fr.
 * Palladino post-ship). Any copy concerns from him -> edit this file
 * + redeploy. Rollback path is the standard Vercel one-click revert.
 */

import type { SituationCategory } from "@/generated/prisma/client";

export type PrayerRecommendation = {
  /** Slug in the prayer library — matches PrayerType.slug. The page
   *  renderer links to /prayers/[slug] and pulls the name + patron
   *  saint live from Prisma so a renamed prayer doesn't strand the
   *  recommendation. */
  slug: string;
  /** Why this prayer fits this situation. 1-2 sentences. Pastoral
   *  framing; no "this prayer cures cancer" claims. */
  why: string;
};

export type FaqEntry = {
  question: string;
  answer: string;
};

export type SituationContent = {
  /** URL slug — matches the file path. */
  topic: string;
  /** <title> tag content. Suffix added by the layout template. */
  title: string;
  /** Meta description. Will be passed through smartTruncate at the
   *  caller; 160-char target. */
  description: string;
  /** H1 in the page body. */
  h1: string;
  /** First-screen lead paragraph. Sets tone, names the moment, no
   *  outcome promises. */
  lead: string;
  /** Prayer recommendations. 4-6 entries, each with a why-it-fits
   *  paragraph. */
  prayers: PrayerRecommendation[];
  /** Pastoral note that addresses the "what is prayer for" question.
   *  Usually 2-3 sentences. */
  pastoralNote: string;
  /** Pray-together CTA framing. The button is shared across all
   *  pages and points to /create; the lead-in copy varies by topic. */
  prayTogetherLead: string;
  /** FAQ entries — 3-4 per page. Powers the FAQPage schema +
   *  rendered FAQ section at the bottom of the page. */
  faqs: FaqEntry[];
  /** Optional situation tag(s) the topic maps to in the prayer
   *  library's situationTags taxonomy. Used for the "see all
   *  prayers tagged with X" link. */
  matchingSituationTags?: SituationCategory[];
};

// ─────────────────────────────────────────────────────────────────
// Cancer
// ─────────────────────────────────────────────────────────────────

const cancer: SituationContent = {
  topic: "cancer",
  title: "Catholic prayers for a friend with cancer",
  description:
    "Prayers, novenas, and ways to organize prayer coverage for someone facing a cancer diagnosis or treatment. From the PrayerTrain Catholic prayer library.",
  h1: "Catholic prayers for a friend with cancer",
  lead: "When someone you love has been diagnosed with cancer, the days that follow can feel like there is nothing you can do. Prayer is one of the things you can do. The prayers below are some of the ones the Church has given us for moments like this. None of them are a guarantee of healing. All of them are a way of standing with the person you love, in front of God, every day they are walking through this.",
  prayers: [
    {
      slug: "novena-sacred-heart",
      why: "Christ's Sacred Heart is the Church's patron of the suffering. Praying this nine-day novena on behalf of someone with cancer puts their illness in the place where Catholic devotion most directly meets human pain.",
    },
    {
      slug: "surrender-novena",
      why: "Don Dolindo Ruotolo's nine days of radical trust are written for exactly the moment a diagnosis takes the steering wheel away from the family. The refrain across all nine days is: O Jesus, I surrender myself to You, take care of everything.",
    },
    {
      slug: "rosary-for-healing",
      why: "The Rosary, prayed with the intention of healing, is one of the oldest Catholic responses to physical suffering. Mary's intercession is the steady current beneath every decade.",
    },
    {
      slug: "psalm-91",
      why: "He who dwells in the shelter of the Most High abides in the shadow of the Almighty. Psalm 91 has been the prayer of the sick and those who love them for thousands of years.",
    },
    {
      slug: "memorare",
      why: "Never was it known that anyone who fled to Mary's protection was left unaided. A short, fierce prayer that fits inside any moment of waiting room or hospital bedside.",
    },
  ],
  pastoralNote:
    "Catholic prayer for the sick is not a transaction. We do not pray better prayers and get better outcomes. What we do is keep showing up, with words the Church has given us, in front of a God who suffered too and who is present at every bedside whether we feel His presence or not.",
  prayTogetherLead:
    "If you want to gather others, a PrayerTrain lets you build a prayer schedule for your loved one. Friends and family pick specific prayers on specific days, get a daily reminder, and you end up with a calendar of continuous coverage you can hand to the person you are praying for.",
  faqs: [
    {
      question: "What is the best Catholic prayer for someone with cancer?",
      answer:
        "There is no single best prayer. The Sacred Heart Novena, the Surrender Novena, and the Rosary for Healing are all Catholic prayers traditionally offered for serious illness. The right one is usually the one you will actually pray every day. Pick whichever one's words feel like a fit for the person and pray it consistently.",
    },
    {
      question:
        "Should I tell the person with cancer that we are praying for them?",
      answer:
        "Yes, almost always. Knowing they are being prayed for is one of the few things that lifts a person facing serious illness. The exception is if they have asked specifically not to be told (some people find it overwhelming during treatment). Follow what they have asked for.",
    },
    {
      question:
        "What if I do not know what to pray for them, or I am angry at God about the diagnosis?",
      answer:
        "Pray anyway. The Psalms include some of the most furious language in scripture (see Psalm 22, 88). Catholic tradition has always made room for prayers that come from anger, confusion, and the felt absence of God. Showing up matters more than the eloquence.",
    },
    {
      question: "How long should we keep praying for them?",
      answer:
        "As long as the situation lasts. Cancer treatment is rarely a sprint. A PrayerTrain that runs for a single round of treatment, then is renewed, is a Catholic-tradition pattern (think of how the Israelites prayed continuously through the Exodus). There is no expiration date on intercession.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Sick child
// ─────────────────────────────────────────────────────────────────

const sickChild: SituationContent = {
  topic: "sick-child",
  title: "Catholic prayers for a sick child",
  description:
    "Prayers and ways to gather a community when a child is in the NICU, facing surgery, or fighting a serious illness. From the PrayerTrain Catholic prayer library.",
  h1: "Catholic prayers for a sick child",
  lead: "Watching a child suffer is one of the heaviest things a parent or godparent or grandparent can carry. The prayers below are not a way to bargain with God for an outcome. They are a way to stand alongside the parents, holding the child in front of the Father who held His own Son through the cross. Pray any of them. Pray all of them. Pray badly. Just keep showing up.",
  prayers: [
    {
      slug: "rosary-for-healing",
      why: "Mary, the mother of Christ, is given to us as the mother of every Christian. Praying the Rosary for a sick child puts that child in her arms.",
    },
    {
      slug: "novena-sacred-heart",
      why: "Christ said, Let the children come to me, do not hinder them. The Sacred Heart Novena is one of the most direct ways to bring a child to that voice.",
    },
    {
      slug: "memorare",
      why: "Short enough to pray over a sleeping child or in a hospital corridor between shift changes. Long enough to mean it.",
    },
    {
      slug: "guardian-angel-prayer",
      why: "Angel of God, my guardian dear. Catholic tradition holds that every child has a guardian angel; this prayer asks that angel to be present in a way the child needs.",
    },
    {
      slug: "psalm-91",
      why: "He shall give His angels charge over thee, to keep thee in all thy ways. Psalm 91 was one of the prayers our family prayed during a NICU stay and other hospital crises. It does not promise outcomes. It promises presence.",
    },
  ],
  pastoralNote:
    "If you are the parents, you do not have to pray well. You barely have to pray at all. The prayers of others, gathered around your child, are part of the body of Christ doing what it does. Let people pray. Let them bring meals, watch your other kids, sit silent in the chapel. That is also prayer.",
  prayTogetherLead:
    "A PrayerTrain for a sick child is one of the most concrete forms of help you can offer parents who are stretched too thin to organize anything themselves. You set it up, send the link to family and friends, and a calendar of prayer fills in around them without their needing to lift a finger.",
  faqs: [
    {
      question: "What is the best Catholic prayer for a child in the NICU?",
      answer:
        "Psalm 91 and the Memorare are short enough to pray at the isolette and weighty enough to carry the situation. The Rosary for Healing is the longer-form option for the parent or grandparent keeping vigil. Pray whichever one fits the moment you are in.",
    },
    {
      question: "Is it okay to pray with the parents instead of for them?",
      answer:
        "Yes. Sometimes the most important thing is to sit on the hospital bed and pray a Hail Mary together, out loud, with the parents who do not have words of their own left. That is not lesser prayer. That is the body of Christ doing what it is supposed to do.",
    },
    {
      question:
        "How do I help when I am far away and cannot bring meals or visit?",
      answer:
        "Start a PrayerTrain. Long-distance friends and family can sign up for specific days, and the parents end up with a record of every name that prayed for their child. The bouquet PDF at the end is something they can keep.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Surgery
// ─────────────────────────────────────────────────────────────────

const surgery: SituationContent = {
  topic: "surgery",
  title: "Catholic prayers before surgery",
  description:
    "Prayers, novenas, and a way to organize coverage for someone going under anesthesia. From the PrayerTrain Catholic prayer library.",
  h1: "Catholic prayers before surgery",
  lead: "The hours before a surgery are quiet hours. There is paperwork, fasting, the slow walk to pre-op. The prayers below are short enough to pray in those hours, and steady enough to carry the family in the waiting room while the surgery happens. None of them replace medicine. All of them put the medicine in the hands of the One who gave the surgeon the skill to use it.",
  prayers: [
    {
      slug: "surrender-novena",
      why: "Started nine days before a planned surgery, the Surrender Novena lands the family at the hospital with nine days of practiced trust already behind them. Don Dolindo's words are made for the moments medicine takes over and we are the ones waiting.",
    },
    {
      slug: "memorare",
      why: "Pray once before the patient is wheeled back. Pray it again every fifteen minutes in the waiting room. The Memorare is a Catholic tradition for moments where the only thing left to do is wait.",
    },
    {
      slug: "psalm-23",
      why: "Yea though I walk through the valley of the shadow of death, I will fear no evil. The classic prayer for the moment a body is given over to scalpel and anesthesia.",
    },
    {
      slug: "anima-christi",
      why: "Soul of Christ, sanctify me. Body of Christ, save me. A short, ancient prayer the Church gives to those preparing for any moment where the body is at risk.",
    },
    {
      slug: "prayer-healing",
      why: "A direct prayer for healing, written for the situation where someone is at the edge of medical intervention.",
    },
  ],
  pastoralNote:
    "The waiting room is one of the most explicitly Catholic places in modern American life: silent, full of strangers, all of them helpless, all of them hoping. Prayer is not a way to make the wait shorter. It is a way to be in the wait with God instead of alone.",
  prayTogetherLead:
    "If the surgery is significant or scheduled in advance, a PrayerTrain that starts nine days before and ends the day after lets a community pray together through the whole arc. Each person picks a day, gets a reminder, and the patient walks into the hospital knowing the dates have all been claimed.",
  faqs: [
    {
      question: "What should I pray right before someone goes into surgery?",
      answer:
        "Pray the Memorare or a Hail Mary or the Lord's Prayer. Make the sign of the cross over them if you can. Tell them you are praying. The exact words matter less than the act of being there praying them.",
    },
    {
      question: "Is there a Catholic novena for surgery?",
      answer:
        "There is no novena written specifically for surgery, but the Surrender Novena (Don Dolindo) is the most fitting nine-day prayer for the lead-up. Start it nine days before the scheduled date and you arrive at the hospital with a cadence of trust already practiced.",
    },
    {
      question: "What if the surgery is for someone who is not Catholic?",
      answer:
        "Pray anyway. You are praying to the God who made them, not to a denomination. If you want to pray with them, ask them which prayers they grew up with and pray those instead. The point is to bring them before God, not to bring God to them in a Catholic envelope.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Grief
// ─────────────────────────────────────────────────────────────────

const grief: SituationContent = {
  topic: "grief",
  title: "Catholic prayers for a grieving family",
  description:
    "Prayers, novenas, and a way to organize ongoing prayer for a family who has lost someone. From the PrayerTrain Catholic prayer library.",
  h1: "Catholic prayers for a grieving family",
  lead: "Grief outlasts the funeral. The casseroles stop arriving, the visits taper, and the family is left in a house that still has the absent person's coat on the hook. The prayers below are for that long stretch, the months when most people have moved on but the family has not. Catholic tradition makes room for this. We pray for the dead. We pray for the bereaved. We do both for a long time.",
  prayers: [
    {
      slug: "seven-sorrows-rosary",
      why: "Our Lady of Sorrows is the patroness of every parent who has lost a child. The Seven Sorrows Rosary is a Catholic prayer specifically for those whose grief has the weight of a lost loved one and no obvious end.",
    },
    {
      slug: "surrender-novena",
      why: "Don Dolindo wrote these meditations for the soul that has nothing left to do but surrender. For a grieving family, the nine days are nine days of being told, by Christ Himself, that He is taking care of it.",
    },
    {
      slug: "memorare",
      why: "Mary, who watched her own son die, is the natural intercessor for any family in mourning. The Memorare is short enough to pray every time the grief catches you in the middle of the day.",
    },
    {
      slug: "novena-our-lady-perpetual-help",
      why: "The icon of Our Lady of Perpetual Help shows Mary holding the child Jesus while He flinches at the instruments of His coming Passion. It is the Catholic image of the mother who knows what your grief feels like.",
    },
    {
      slug: "prayer-st-francis",
      why: "Lord, make me an instrument of Your peace. The Prayer of St. Francis is one of the few prayers that can be said by someone in deep grief without the words feeling like a betrayal of the loss.",
    },
    {
      slug: "offering-suffering",
      why: "Catholic tradition holds that suffering offered up for another's intention is real prayer. For a grieving family, this is one way the loss itself becomes intercession.",
    },
  ],
  pastoralNote:
    "Catholic tradition does not ask the bereaved to be over it. Pope Francis has spoken about the legitimacy of weeping with those who weep, of grief as a form of love, of the dead as still part of the body of Christ. If your prayer is mostly tears for a long time, that is still prayer.",
  prayTogetherLead:
    "A PrayerTrain for a grieving family is one of the few things that does not stop after the funeral. Friends sign up for specific days across thirty, sixty, ninety days. The family knows the dates have been claimed. At the end, they receive a Spiritual Bouquet PDF with every name that prayed and every day that was covered.",
  faqs: [
    {
      question: "What is the best prayer for a family that has lost a child?",
      answer:
        "The Seven Sorrows Rosary is written for exactly this. Our Lady of Sorrows lost her own son; her intercession for parents in mourning carries the weight of personal experience. The Surrender Novena is the nine-day companion when even the Rosary feels like too many words.",
    },
    {
      question: "How long should we keep praying for a grieving family?",
      answer:
        "Longer than feels socially comfortable. Catholic tradition prays for the souls of the dead in November every year (All Souls Day, the entire month dedicated to it). A PrayerTrain that runs a year, marked by the anniversaries, is well within the Catholic pattern.",
    },
    {
      question: "Can I send the Spiritual Bouquet PDF to a grieving family?",
      answer:
        "Yes, and they will keep it. A printable record of every name that prayed for their loved one, every day that was covered, is one of the most concrete things you can hand someone in mourning. It says: you were not alone in this.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Addiction
// ─────────────────────────────────────────────────────────────────

const addiction: SituationContent = {
  topic: "addiction",
  title: "Catholic prayers for someone struggling with addiction",
  description:
    "Prayers and ways to organize quiet prayer for a friend or family member walking through addiction. From the PrayerTrain Catholic prayer library.",
  h1: "Catholic prayers for someone struggling with addiction",
  lead: "Praying for someone in active addiction is one of the longest forms of prayer there is. There is no clear nine-day arc. There is no clear answer about whether they will be free. There is just the daily showing up, often in private, often without any visible result, often for years. Catholic tradition has language for this. St. Monica prayed for her son Augustine for seventeen years. He became a saint. She did not know that was coming.",
  prayers: [
    {
      slug: "novena-st-jude",
      why: "St. Jude is the Church's patron of impossible and desperate cases. Addiction is the modern situation his patronage was given for: the person you love is walking a road no one can walk for them, and the family is left to pray.",
    },
    {
      slug: "prayer-conversion",
      why: "A direct prayer for the conversion of someone whose life is currently captive. Use it without expectation that the prayer will be answered on your timeline.",
    },
    {
      slug: "prayer-serenity",
      why: "God grant me the serenity to accept the things I cannot change. Originally written for those in recovery; equally a prayer for the family who cannot fix the situation and cannot stop loving the person who is in it.",
    },
    {
      slug: "surrender-novena",
      why: "The hardest sentence in the Surrender Novena, for a family member of someone in addiction, is the one that says: you do not turn to me, you want me to adapt to your ideas. Don Dolindo names the temptation to keep telling God how to fix the situation. The novena is nine days of practicing handing it back.",
    },
    {
      slug: "rosary-for-healing",
      why: "Mary's intercession for the prodigal son is one of the oldest Catholic patterns. The Rosary, prayed daily, is not a magic formula. It is the discipline of staying on your knees while the situation runs its course.",
    },
    {
      slug: "memorare",
      why: "St. Monica's prayer was, the prayer of the mother of Augustine, the prayer of every parent of someone in addiction. Short, fierce, repeatable.",
    },
  ],
  pastoralNote:
    "The Catholic Church does not tell families of those in addiction that the addicted person will get better if you pray hard enough. It tells them that prayer is a form of love that does not depend on the loved one's choices. You are praying not because it will fix the situation but because love does not stop being love when the loved one cannot respond to it.",
  prayTogetherLead:
    "A PrayerTrain for someone in addiction can be set up anonymously. The recipient does not need to know their name is on a public page. Friends and family who are praying for them sign up quietly, by date, and you have a calendar of intercession that the loved one may never see and may not be ready to.",
  faqs: [
    {
      question:
        "Is it okay to pray for someone in addiction without telling them?",
      answer:
        "Yes. Catholic tradition has always made room for hidden intercession. St. Monica prayed for Augustine for years before he was ready to hear about it. Your prayer is a form of love that does not require the loved one's permission or awareness.",
    },
    {
      question:
        "Should I share their name on a public PrayerTrain page?",
      answer:
        "Not unless you have asked them and they have said yes. Addiction carries enough shame already; a public page that names them without consent can wound rather than help. PrayerTrain has an anonymous option that lets a community pray for someone whose name stays private.",
    },
    {
      question: "What if I have been praying for years and nothing has changed?",
      answer:
        "St. Monica prayed for Augustine for seventeen years. The prayer was not wasted. It was love continuing where the relationship could not. Catholic tradition does not measure prayer by visible outcomes; it measures love by faithfulness over time.",
    },
    {
      question: "Should I pray with them or for them?",
      answer:
        "Both, when possible. Praying with someone in addiction (when they are willing) is a form of accompaniment that can hold a relationship together. Praying for them is what you do when they cannot pray themselves.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Infertility
// ─────────────────────────────────────────────────────────────────

const infertility: SituationContent = {
  topic: "infertility",
  title: "Catholic prayers for couples trying to conceive",
  description:
    "Prayers and a way to gather community for couples walking through infertility. From the PrayerTrain Catholic prayer library.",
  h1: "Catholic prayers for couples trying to conceive",
  lead: "Catholic teaching on family and fertility is rich, and Catholic teaching on the suffering of couples who want children and cannot have them is also rich. The prayers below are for the second part. They are not a Catholic version of pray harder. They are the prayers Catholic couples have prayed for centuries through years of waiting, and through the question of whether the waiting has an end.",
  prayers: [
    {
      slug: "prayer-fertility",
      why: "A direct Catholic prayer for the gift of children. Use it without the implicit pressure that praying it will produce a result on a timeline.",
    },
    {
      slug: "prayer-expectant-mothers",
      why: "Often prayed alongside fertility prayer, especially when a pregnancy is hoped for or has begun and is fragile. Asks Mary's protection over the womb.",
    },
    {
      slug: "memorare",
      why: "Mary, the mother whose own conception was unusual and whose own son's conception was unprecedented, is the natural intercessor for couples whose family has not yet come into being.",
    },
    {
      slug: "novena-st-joseph",
      why: "St. Joseph is the patron of families and of fathers in particular. The Novena to St. Joseph is the Catholic pattern for couples who are asking for the family they hope to start.",
    },
    {
      slug: "surrender-novena",
      why: "Don Dolindo's Surrender Novena is for the couples who have prayed every other prayer and whose answer so far has been silence. The nine days are not about asking again. They are about handing it back to Christ, slowly, day by day.",
    },
  ],
  pastoralNote:
    "Catholic tradition does not promise that every couple who prays will conceive. Sarah waited until she was old. Hannah was barren for years before Samuel. The Church holds those stories as part of its scripture not because they are guaranteed outcomes but because they show that the prayer was not wasted in the waiting. Pray. Keep praying. Do not measure your faith by whether the prayer is answered the way you have asked.",
  prayTogetherLead:
    "A PrayerTrain for a couple trying to conceive is often started by close family or friends, sometimes anonymously to protect the couple's privacy. The intercession runs quietly in the background. If you are the couple, you can also start one yourselves and invite people you trust.",
  faqs: [
    {
      question: "What is the best Catholic prayer for infertility?",
      answer:
        "The Prayer for Fertility and the Novena to St. Joseph are the most direct Catholic prayers for this situation. The Surrender Novena is the longer-arc prayer for couples who have prayed many other prayers and need to practice giving the situation back to Christ.",
    },
    {
      question: "Should we tell people we are praying about fertility?",
      answer:
        "It depends on the couple. Some find that having close family pray with them is a relief; others want privacy. PrayerTrain supports both. If the couple wants their name kept private, the train can be set up anonymously.",
    },
    {
      question:
        "Is it okay to keep praying after years of unanswered prayer?",
      answer:
        "Yes. Catholic tradition does not have a statute of limitations on intercession. Hannah prayed for Samuel until she was past hope; Sarah waited a lifetime for Isaac. The prayer is not wasted in the waiting, even when the outcome is not what you asked for.",
    },
  ],
};

export const SITUATIONS: Record<string, SituationContent> = {
  cancer,
  "sick-child": sickChild,
  surgery,
  grief,
  addiction,
  infertility,
};

export const SITUATION_TOPICS = Object.keys(SITUATIONS);
