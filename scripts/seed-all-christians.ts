import "dotenv/config";
import { PrismaClient, PrayerCategory, DifficultyLevel, SituationCategory } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const prayers = [
  {
    slug: "lords-prayer",
    name: "The Lord's Prayer",
    category: PrayerCategory.ALL_CHRISTIANS,
    description: "The prayer Jesus himself taught His disciples. Prayed by every Christian tradition worldwide — the most universal prayer in all of Christianity.",
    instructions: "Pray slowly and intentionally, pausing after each line to reflect on its meaning. When you reach 'Thy will be done,' hold the person's situation before God and trust in His plan.",
    prayerText: "Our Father, who art in heaven, hallowed be Thy name. Thy kingdom come, Thy will be done, on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.",
    duration: 3,
    difficulty: DifficultyLevel.BEGINNER,
    daysRequired: 1,
    patronSaint: null,
    feastDay: null,
    situationTags: [SituationCategory.GENERAL, SituationCategory.ILLNESS, SituationCategory.GRIEF, SituationCategory.FAMILY, SituationCategory.MENTAL_HEALTH],
  },
  {
    slug: "st-patricks-breastplate",
    name: "St. Patrick's Breastplate (Lorica)",
    category: PrayerCategory.ALL_CHRISTIANS,
    description: "An ancient Irish prayer attributed to St. Patrick, beloved across Catholic, Anglican, and Protestant traditions alike. A powerful prayer of protection invoking Christ's presence in every direction and every moment.",
    instructions: "Pray with boldness and confidence. This is a prayer of spiritual armor — imagine Christ surrounding and protecting the person you are praying for as you speak each line.",
    prayerText: "Christ be with me, Christ within me, Christ behind me, Christ before me, Christ beside me, Christ to win me, Christ to comfort and restore me. Christ beneath me, Christ above me, Christ in quiet, Christ in danger, Christ in hearts of all that love me, Christ in mouth of friend and stranger.",
    duration: 5,
    difficulty: DifficultyLevel.BEGINNER,
    daysRequired: 1,
    patronSaint: "St. Patrick",
    feastDay: "March 17",
    situationTags: [SituationCategory.ILLNESS, SituationCategory.SURGERY, SituationCategory.MENTAL_HEALTH, SituationCategory.GENERAL],
  },
  {
    slug: "prayer-of-jabez",
    name: "Prayer of Jabez",
    category: PrayerCategory.ALL_CHRISTIANS,
    description: "From 1 Chronicles 4:10 — a short, bold prayer asking God to bless, expand, protect, and keep from harm. Popular across all Christian traditions as a prayer of trust in God's abundant provision.",
    instructions: "Pray once with sincerity, inserting the name of the person you're praying for. This is a prayer of bold faith — ask God for more than seems reasonable and trust His generosity.",
    prayerText: "Oh, that You would bless me indeed, and enlarge my territory, that Your hand would be with me, and that You would keep me from evil, that I may not cause pain! Amen.",
    duration: 2,
    difficulty: DifficultyLevel.BEGINNER,
    daysRequired: 1,
    patronSaint: null,
    feastDay: null,
    situationTags: [SituationCategory.FINANCIAL, SituationCategory.CAREER, SituationCategory.GENERAL, SituationCategory.ILLNESS],
  },
  {
    slug: "prayer-of-st-francis-all",
    name: "Prayer of St. Francis (Make Me an Instrument)",
    category: PrayerCategory.ALL_CHRISTIANS,
    description: "Widely embraced across all Christian traditions, this prayer asks God to make us instruments of His peace. Often prayed at ecumenical services and loved by Christians of every background.",
    instructions: "Pray once daily, asking God to use you as an instrument of peace in the life of the person you're praying for. Reflect on each line as a personal commitment.",
    prayerText: "Lord, make me an instrument of Your peace: where there is hatred, let me sow love; where there is injury, pardon; where there is doubt, faith; where there is despair, hope; where there is darkness, light; where there is sadness, joy. O divine Master, grant that I may not so much seek to be consoled as to console, to be understood as to understand, to be loved as to love. For it is in giving that we receive, it is in pardoning that we are pardoned, and it is in dying that we are born to eternal life. Amen.",
    duration: 3,
    difficulty: DifficultyLevel.BEGINNER,
    daysRequired: 1,
    patronSaint: "St. Francis of Assisi",
    feastDay: "October 4",
    situationTags: [SituationCategory.FAMILY, SituationCategory.MARRIAGE, SituationCategory.MENTAL_HEALTH, SituationCategory.GRIEF, SituationCategory.GENERAL],
  },
  {
    slug: "psalm-46-refuge",
    name: "Psalm 46 — God Is Our Refuge and Strength",
    category: PrayerCategory.ALL_CHRISTIANS,
    description: "The psalm that inspired Martin Luther's 'A Mighty Fortress Is Our God.' A declaration of trust that God is our refuge in the midst of chaos, upheaval, and fear.",
    instructions: "Read the psalm meditatively, inserting the name of the person in crisis. Let each verse build confidence that God is present even when everything feels like it's falling apart.",
    prayerText: "God is our refuge and strength, an ever-present help in trouble. Therefore we will not fear, though the earth give way and the mountains fall into the heart of the sea, though its waters roar and foam and the mountains quake with their surging. There is a river whose streams make glad the city of God, the holy place where the Most High dwells. God is within her, she will not fall; God will help her at break of day. Be still, and know that I am God.",
    duration: 5,
    difficulty: DifficultyLevel.BEGINNER,
    daysRequired: 1,
    patronSaint: null,
    feastDay: null,
    situationTags: [SituationCategory.ILLNESS, SituationCategory.GRIEF, SituationCategory.MENTAL_HEALTH, SituationCategory.SURGERY, SituationCategory.GENERAL],
  },
  {
    slug: "psalm-121-hills",
    name: "Psalm 121 — I Lift My Eyes to the Hills",
    category: PrayerCategory.ALL_CHRISTIANS,
    description: "A psalm of ascent, prayed by pilgrims traveling to Jerusalem. A beautiful affirmation that God watches over us at every moment — He neither slumbers nor sleeps.",
    instructions: "Pray this psalm for someone who is afraid or in danger. Each verse builds assurance that God is personally watching over them.",
    prayerText: "I lift up my eyes to the mountains — where does my help come from? My help comes from the Lord, the Maker of heaven and earth. He will not let your foot slip — He who watches over you will not slumber; indeed, He who watches over Israel will neither slumber nor sleep. The Lord watches over you — the Lord is your shade at your right hand; the sun will not harm you by day, nor the moon by night. The Lord will keep you from all harm — He will watch over your life; the Lord will watch over your coming and going both now and forevermore.",
    duration: 5,
    difficulty: DifficultyLevel.BEGINNER,
    daysRequired: 1,
    patronSaint: null,
    feastDay: null,
    situationTags: [SituationCategory.ILLNESS, SituationCategory.SURGERY, SituationCategory.GRIEF, SituationCategory.GENERAL],
  },
  {
    slug: "simple-intercessory-prayer",
    name: "Simple Intercessory Prayer",
    category: PrayerCategory.ALL_CHRISTIANS,
    description: "A straightforward prayer of intercession that anyone can pray, regardless of tradition or experience. No special knowledge needed — just a willing heart and a few minutes.",
    instructions: "Pray in your own words using this as a guide. Speak the person's name aloud. There's no wrong way to do this — God hears the heart behind the words.",
    prayerText: "Heavenly Father, I come before You today to lift up (name). You know their situation better than I do. You know their pain, their fear, and their hope. I ask You to be close to them right now. Give them strength for today. Give them peace when they are anxious. Give the doctors and caregivers wisdom. Surround them with people who love them. And Lord, let them feel that they are not alone — that right now, in this moment, someone is praying for them. In Jesus' name, Amen.",
    duration: 3,
    difficulty: DifficultyLevel.BEGINNER,
    daysRequired: 1,
    patronSaint: null,
    feastDay: null,
    situationTags: [SituationCategory.ILLNESS, SituationCategory.SURGERY, SituationCategory.MENTAL_HEALTH, SituationCategory.GRIEF, SituationCategory.FINANCIAL, SituationCategory.FAMILY, SituationCategory.GENERAL],
  },
  {
    slug: "pray-in-your-own-words",
    name: "Pray in Your Own Words",
    category: PrayerCategory.ALL_CHRISTIANS,
    description: "No script needed. Commit to spending a few minutes in quiet, heartfelt conversation with God about the person in need. Sometimes the most powerful prayer is the one that comes straight from your heart.",
    instructions: "Find a quiet moment. Close your eyes. Speak to God as you would speak to a loving Father. Tell Him about the person, what they're going through, and what you hope for them. There are no rules — just be honest. Even one minute of sincere prayer is powerful.",
    prayerText: null,
    duration: 5,
    difficulty: DifficultyLevel.BEGINNER,
    daysRequired: 1,
    patronSaint: null,
    feastDay: null,
    situationTags: [SituationCategory.ILLNESS, SituationCategory.SURGERY, SituationCategory.MENTAL_HEALTH, SituationCategory.GRIEF, SituationCategory.PREGNANCY, SituationCategory.FERTILITY, SituationCategory.MARRIAGE, SituationCategory.FAMILY, SituationCategory.FINANCIAL, SituationCategory.CAREER, SituationCategory.CONVERSION, SituationCategory.DISCERNMENT, SituationCategory.GENERAL, SituationCategory.OTHER],
  },
  {
    slug: "isaiah-41-10-fear-not",
    name: "Isaiah 41:10 — Fear Not, for I Am with You",
    category: PrayerCategory.ALL_CHRISTIANS,
    description: "One of the most comforting verses in all of Scripture. A direct promise from God to those who are afraid: He is with you, He will strengthen you, He will uphold you.",
    instructions: "Read the verse slowly three times. First, to understand the words. Second, to let them settle into your heart. Third, to pray them over the person in need — replacing 'you' with their name.",
    prayerText: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand. Lord, I claim this promise for (name) today. Strengthen them. Help them. Uphold them. Let them know You are near. Amen.",
    duration: 3,
    difficulty: DifficultyLevel.BEGINNER,
    daysRequired: 1,
    patronSaint: null,
    feastDay: null,
    situationTags: [SituationCategory.ILLNESS, SituationCategory.SURGERY, SituationCategory.MENTAL_HEALTH, SituationCategory.GRIEF, SituationCategory.GENERAL],
  },
  {
    slug: "philippians-4-6-7-anxiety",
    name: "Philippians 4:6-7 — Prayer for Peace Over Anxiety",
    category: PrayerCategory.ALL_CHRISTIANS,
    description: "Paul's letter to the Philippians offers one of Scripture's clearest instructions on what to do when anxiety overwhelms: bring everything to God in prayer, and His peace will guard your heart.",
    instructions: "Pray this passage as a declaration over the person you're interceding for. Name their specific anxieties before God, then claim the promise of peace that surpasses understanding.",
    prayerText: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus. Lord, I bring (name) before You. Guard their heart and mind with Your peace today. Amen.",
    duration: 3,
    difficulty: DifficultyLevel.BEGINNER,
    daysRequired: 1,
    patronSaint: null,
    feastDay: null,
    situationTags: [SituationCategory.MENTAL_HEALTH, SituationCategory.ILLNESS, SituationCategory.SURGERY, SituationCategory.FINANCIAL, SituationCategory.DISCERNMENT],
  },
];

async function main() {
  console.log("Seeding 'Prayers for All Christians'...");

  for (const prayer of prayers) {
    await prisma.prayerType.upsert({
      where: { slug: prayer.slug },
      update: prayer,
      create: prayer,
    });
    console.log(`  + ${prayer.name}`);
  }

  console.log(`\nSeeded ${prayers.length} ecumenical prayers!`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
