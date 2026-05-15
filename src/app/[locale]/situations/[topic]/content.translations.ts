/**
 * Per-locale overrides for `./content.ts`.
 *
 * Track D from the implementation plan (`~/.claude/plans/...`). The
 * English content.ts is the canonical source; per-locale variants in
 * this file override it for non-English locales. When a topic has no
 * locale override, `getSituationContent(locale, topic)` falls back to
 * the English entry.
 *
 * Editorial policy (per docs/seo-international-ops.md hard guidelines):
 * - Pastoral content is locale-adapted, not literal-translated. Each
 *   variant uses devotional register appropriate to the locale's
 *   Catholic culture (Brazilian São Peregrino emphasis for pt-BR
 *   cancer; Polish Koronka framing for pl; etc.).
 * - Prayer slugs are NOT translated. /es/prayers/surrender-novena and
 *   /en/prayers/surrender-novena share the same slug per the
 *   src/i18n/links.ts strategy. The `why` text is locale-specific.
 * - No outcome promises, no "if you pray hard enough" — same tone
 *   discipline as content.ts. Krysta's feedback ("not everyone gets
 *   better") applies here too.
 * - Boston Children's Hospital + Massachusetts founding-story
 *   references stay in /our-story; this file is the situation cluster
 *   only.
 * - All drafts in this file are Claude-authored and FLAGGED for
 *   native review per docs/translation-review-tracker.md. None should
 *   ship to production without sign-off; the page.tsx renderer still
 *   uses content.ts (English) as the fallback if a locale variant is
 *   present but William hasn't approved it yet.
 */

import type { Locale } from "@/i18n/config";
import { SITUATIONS, type SituationContent } from "./content";

// ─────────────────────────────────────────────────────────────────
// Spanish (es)
// ─────────────────────────────────────────────────────────────────

const cancerEs: SituationContent = {
  topic: "cancer",
  title: "Oraciones católicas por un amigo con cáncer",
  description:
    "Oraciones, novenas y formas de organizar la cobertura de oración para alguien que enfrenta un diagnóstico o tratamiento de cáncer. De la biblioteca de oraciones católicas de PrayerTrain.",
  h1: "Oraciones católicas por un amigo con cáncer",
  lead: "Cuando alguien a quien amas ha sido diagnosticado con cáncer, los días que siguen pueden hacer sentir que no hay nada que puedas hacer. La oración es una de las cosas que sí puedes hacer. Las oraciones a continuación son algunas de las que la Iglesia nos ha dado para momentos como este. Ninguna de ellas es una garantía de sanación. Todas son una manera de acompañar a la persona que amas, ante Dios, cada día que atraviesa esto.",
  prayers: [
    {
      slug: "novena-sacred-heart",
      why: "El Sagrado Corazón de Cristo es el patrono de la Iglesia para los que sufren. Rezar esta novena de nueve días por alguien con cáncer pone su enfermedad en el lugar donde la devoción católica se encuentra más directamente con el dolor humano.",
    },
    {
      slug: "surrender-novena",
      why: "Los nueve días de confianza radical de Don Dolindo Ruotolo están escritos precisamente para el momento en que un diagnóstico le quita el volante a la familia. El estribillo de los nueve días es: «Oh Jesús, me entrego a Ti, encárgate Tú de todo».",
    },
    {
      slug: "rosary-for-healing",
      why: "El Rosario, rezado con la intención de sanación, es una de las respuestas católicas más antiguas al sufrimiento físico. La intercesión de María es la corriente firme debajo de cada decena.",
    },
    {
      slug: "psalm-91",
      why: "El que habita al amparo del Altísimo mora a la sombra del Todopoderoso. El Salmo 91 ha sido la oración de los enfermos y de quienes los aman durante miles de años.",
    },
    {
      slug: "memorare",
      why: "Acuérdate, oh piadosísima Virgen María, que jamás se ha oído decir que ninguno de los que han acudido a tu protección haya sido desamparado. Una oración breve y firme que cabe en cualquier momento de sala de espera o cabecera de hospital.",
    },
  ],
  pastoralNote:
    "La oración católica por los enfermos no es una transacción. No rezamos mejores oraciones para obtener mejores resultados. Lo que hacemos es seguir presentándonos, con palabras que la Iglesia nos ha dado, ante un Dios que también sufrió y que está presente en cada cabecera, sintamos o no Su presencia. San Peregrino, patrono de los enfermos de cáncer, es un compañero especial en este camino.",
  prayTogetherLead:
    "Si quieres reunir a otros, un PrayerTrain te permite construir un calendario de oración para tu ser querido. Amigos y familia eligen oraciones específicas en días específicos, reciben un recordatorio diario, y al final tienes un calendario de cobertura continua que puedes entregar a la persona por quien estás orando.",
  faqs: [
    {
      question:
        "¿Cuál es la mejor oración católica para alguien con cáncer?",
      answer:
        "No existe una única mejor oración. La Novena al Sagrado Corazón, la Novena de la Rendición y el Rosario por la Sanación son oraciones católicas tradicionalmente ofrecidas por enfermedades graves. La oración correcta suele ser la que realmente vas a rezar cada día. Elige aquella cuyas palabras se sientan adecuadas para la persona y rézala con constancia.",
    },
    {
      question:
        "¿Debo decirle a la persona con cáncer que estamos orando por ella?",
      answer:
        "Sí, casi siempre. Saber que están siendo objeto de oración es una de las pocas cosas que sostiene a alguien que enfrenta una enfermedad grave. La excepción es si han pedido específicamente no ser informados (algunas personas lo encuentran abrumador durante el tratamiento). Respeta lo que han pedido.",
    },
    {
      question:
        "¿Y si no sé qué orar por ellos, o estoy enojado con Dios por el diagnóstico?",
      answer:
        "Reza de todos modos. Los Salmos incluyen el lenguaje más feroz de las Escrituras (ver Salmo 22, 88). La tradición católica siempre ha hecho lugar para oraciones que vienen de la ira, la confusión y la sensación de la ausencia de Dios. Presentarse importa más que la elocuencia.",
    },
    {
      question: "¿Por cuánto tiempo debemos seguir orando por ellos?",
      answer:
        "Mientras dure la situación. El tratamiento del cáncer rara vez es una carrera de velocidad. Un PrayerTrain que funcione durante una sola ronda de tratamiento, y luego se renueve, es un patrón de la tradición católica (piensa en cómo los israelitas oraron continuamente durante el Éxodo). No hay fecha de caducidad para la intercesión.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Brazilian Portuguese (pt-BR)
// ─────────────────────────────────────────────────────────────────

const cancerPtBR: SituationContent = {
  topic: "cancer",
  title: "Orações católicas por um amigo com câncer",
  description:
    "Orações, novenas e formas de organizar a cobertura de oração por alguém enfrentando um diagnóstico ou tratamento de câncer. Da biblioteca de orações católicas do PrayerTrain.",
  h1: "Orações católicas por um amigo com câncer",
  lead: "Quando alguém que você ama recebe um diagnóstico de câncer, os dias que se seguem podem parecer que não há nada que você possa fazer. A oração é uma das coisas que você pode fazer. As orações abaixo são algumas das que a Igreja nos deu para momentos como este. Nenhuma delas é uma garantia de cura. Todas são uma forma de estar ao lado da pessoa que você ama, diante de Deus, em cada dia em que ela atravessa isto.",
  prayers: [
    {
      slug: "novena-sacred-heart",
      why: "O Sagrado Coração de Cristo é o padroeiro da Igreja para os que sofrem. Rezar esta novena de nove dias por alguém com câncer coloca a doença no lugar onde a devoção católica encontra mais diretamente a dor humana.",
    },
    {
      slug: "surrender-novena",
      why: "Os nove dias de entrega radical de Dom Dolindo Ruotolo foram escritos exatamente para o momento em que um diagnóstico tira o volante das mãos da família. O refrão dos nove dias é: «Ó Jesus, eu me entrego a Ti, cuida de tudo».",
    },
    {
      slug: "rosary-for-healing",
      why: "O Terço, rezado com a intenção de cura, é uma das respostas católicas mais antigas ao sofrimento físico. A intercessão de Maria é a corrente firme por baixo de cada dezena.",
    },
    {
      slug: "psalm-91",
      why: "Aquele que habita no abrigo do Altíssimo mora à sombra do Onipotente. O Salmo 91 tem sido a oração dos doentes e dos que os amam por milhares de anos.",
    },
    {
      slug: "memorare",
      why: "Lembrai-vos, ó piíssima Virgem Maria, que nunca se ouviu dizer que algum daqueles que recorreram à vossa proteção tenha sido por vós desamparado. Uma oração breve e firme que cabe em qualquer momento de sala de espera ou cabeceira de hospital.",
    },
  ],
  pastoralNote:
    "A oração católica pelos doentes não é uma transação. Não rezamos orações melhores para obter resultados melhores. O que fazemos é continuar comparecendo, com palavras que a Igreja nos deu, diante de um Deus que também sofreu e que está presente em cada cabeceira, sintamos ou não a Sua presença. São Peregrino, padroeiro dos doentes de câncer, é um companheiro especial neste caminho — sua novena (4 de maio, festa) é parte da tradição brasileira de oração pela cura.",
  prayTogetherLead:
    "Se você quiser reunir outros, um PrayerTrain permite construir um calendário de oração pelo seu ente querido. Amigos e familiares escolhem orações específicas em dias específicos, recebem um lembrete diário, e ao final você tem um calendário de cobertura contínua que pode entregar à pessoa pela qual está rezando.",
  faqs: [
    {
      question:
        "Qual é a melhor oração católica por alguém com câncer?",
      answer:
        "Não existe uma única melhor oração. A Novena ao Sagrado Coração, a Novena da Rendição e o Terço pela Cura são orações católicas tradicionalmente oferecidas por doenças graves. A Novena a São Peregrino, padroeiro dos doentes de câncer, é uma escolha especialmente brasileira. A oração certa costuma ser aquela que você realmente vai rezar todo dia. Escolha aquela cujas palavras parecem certas para a pessoa e reze-a com constância.",
    },
    {
      question:
        "Devo dizer à pessoa com câncer que estamos rezando por ela?",
      answer:
        "Sim, quase sempre. Saber que está sendo lembrada em oração é uma das poucas coisas que sustentam alguém que enfrenta uma doença grave. A exceção é se ela pediu especificamente para não ser informada (algumas pessoas acham isso esmagador durante o tratamento). Respeite o que foi pedido.",
    },
    {
      question:
        "E se eu não souber o que rezar por elas, ou estou com raiva de Deus pelo diagnóstico?",
      answer:
        "Reze mesmo assim. Os Salmos contêm a linguagem mais feroz das Escrituras (veja Salmos 22 e 88). A tradição católica sempre fez lugar para orações que vêm da raiva, da confusão e do sentimento da ausência de Deus. Comparecer importa mais do que a eloquência.",
    },
    {
      question: "Por quanto tempo devemos continuar rezando por eles?",
      answer:
        "Enquanto durar a situação. O tratamento do câncer raramente é uma corrida curta. Um PrayerTrain que funcione durante uma única rodada de tratamento, e depois seja renovado, é um padrão da tradição católica (lembre-se de como os israelitas rezaram continuamente durante o Êxodo). Não há data de validade para a intercessão.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Filipino (fil) — native review required
// ─────────────────────────────────────────────────────────────────

const cancerFil: SituationContent = {
  topic: "cancer",
  title: "Mga Catholic na panalangin para sa kaibigang may cancer",
  description:
    "Mga panalangin, novena, at paraan upang mag-organisa ng prayer coverage para sa isang taong humaharap sa diagnosis o paggamot ng cancer. Mula sa aklatan ng Catholic na panalangin ng PrayerTrain.",
  h1: "Mga Catholic na panalangin para sa kaibigang may cancer",
  lead: "Kapag ang isang mahal mo ay na-diagnose ng cancer, ang mga sumusunod na araw ay maaaring magpadama na walang magagawa. Ang panalangin ay isa sa mga bagay na pwede mong gawin. Ang mga panalangin sa ibaba ay ilan sa mga ibinigay sa atin ng Simbahan para sa mga sandaling tulad nito. Wala sa mga ito ang garantiya ng paggaling. Lahat sila ay paraan ng pakikiramay sa taong mahal mo, sa harap ng Diyos, sa bawat araw na siya ay dumadaan dito.",
  prayers: [
    {
      slug: "novena-sacred-heart",
      why: "Ang Banal na Puso ni Kristo ang patron ng Simbahan para sa mga nagdurusa. Ang pananalangin ng siyam na araw na novena na ito para sa isang taong may cancer ay naglalagay ng kanilang sakit sa lugar kung saan ang Catholic na debosyon ay direktang nakikipagtagpo sa sakit ng tao.",
    },
    {
      slug: "surrender-novena",
      why: "Ang siyam na araw ng radikal na pagtitiwala ni Don Dolindo Ruotolo ay isinulat partikular para sa sandaling ang diagnosis ay tumatanggap ng kontrol mula sa pamilya. Ang awit ng siyam na araw ay: «O Hesus, isinusuko ko ang aking sarili sa Iyo, pamahalaan Mo ang lahat».",
    },
    {
      slug: "rosary-for-healing",
      why: "Ang Rosaryo, dinarasal na may intensyon ng paggaling, ay isa sa pinakamatandang Catholic na tugon sa pisikal na pagdurusa. Ang panalangin ni Maria ay ang matatag na agos sa ilalim ng bawat dekada.",
    },
    {
      slug: "psalm-91",
      why: "Ang sinumang nananahan sa kanlungan ng Kataas-taasan ay namamalagi sa lilim ng Makapangyarihan sa lahat. Ang Awit 91 ay panalangin ng mga maysakit at ng mga umiibig sa kanila sa loob ng libu-libong taon.",
    },
    {
      slug: "memorare",
      why: "Alalahanin mo, O pinakamahabaging Birheng Maria, na kailanman ay hindi narinig na ang sinumang tumakbo sa iyong proteksyon ay iniwan. Isang maikli, matatag na panalangin na umaangkop sa anumang sandali ng waiting room o tabi ng kama sa ospital.",
    },
  ],
  pastoralNote:
    "Ang Catholic na panalangin para sa maysakit ay hindi transaksyon. Hindi tayo nananalangin ng mas magandang panalangin para makakuha ng mas magandang resulta. Ang ginagawa natin ay patuloy na pagdating, na may mga salitang ibinigay sa atin ng Simbahan, sa harap ng isang Diyos na nagdusa rin at nasa bawat tabi ng kama maging nararamdaman natin ang Kanyang presensya o hindi.",
  prayTogetherLead:
    "Kung nais ninyong tipunin ang iba, ang PrayerTrain ay nagbibigay-daan upang makabuo ng kalendaryo ng panalangin para sa inyong mahal sa buhay. Ang mga kaibigan at pamilya ay pipili ng mga partikular na panalangin sa mga partikular na araw, makakatanggap ng pang-araw-araw na paalala, at sa huli ay magkakaroon kayo ng kalendaryo ng tuloy-tuloy na sakop na maaaring ibigay sa taong inyong dinarasal.",
  faqs: [
    {
      question:
        "Ano ang pinakamagandang Catholic na panalangin para sa isang taong may cancer?",
      answer:
        "Walang nag-iisang pinakamagandang panalangin. Ang Novena sa Banal na Puso, ang Surrender Novena, at ang Rosaryo para sa Paggaling ay lahat mga Catholic na panalanging tradisyonal na inialay para sa mga seryosong karamdaman. Ang tamang panalangin ay karaniwang yung talagang darasalin mo araw-araw. Piliin ang isa kung saan ang mga salita ay tila angkop sa tao at idasal ito nang patuloy.",
    },
    {
      question:
        "Dapat ko bang sabihin sa taong may cancer na nagdadasal kami para sa kanya?",
      answer:
        "Oo, halos lagi. Ang pagkaalam na may nagdadasal para sa kanila ay isa sa iilang mga bagay na nakakapag-akay sa isang taong humaharap sa seryosong karamdaman. Ang pagbubukod ay kung sila ay partikular na humiling na huwag sabihin sa kanila (ang ilan ay nararamdamang nakakasagabal ito habang nasa paggamot). Sundin ang kanilang hiling.",
    },
    {
      question:
        "Paano kung hindi ko alam kung ano ang idarasal para sa kanila, o galit ako sa Diyos dahil sa diagnosis?",
      answer:
        "Manalangin pa rin. Ang mga Awit ay naglalaman ng pinakamatinding wika sa Banal na Kasulatan (tingnan ang Awit 22, 88). Ang tradisyong Catholic ay laging nagbigay-puwang para sa mga panalanging nagmumula sa galit, pagkalito, at naramdamang kawalan ng Diyos. Ang pagdating ay mas mahalaga kaysa sa kasanayan ng pananalita.",
    },
    {
      question:
        "Hanggang kailan natin dapat ipagpatuloy ang pagdarasal para sa kanila?",
      answer:
        "Hangga't tumatagal ang sitwasyon. Ang paggamot ng cancer ay bihirang maging maikli. Ang isang PrayerTrain na tumatakbo sa isang round ng paggamot, at pagkatapos ay binabago, ay isang Catholic-tradisyong padron (isipin kung paano ang mga Israelita ay nanalangin nang tuloy-tuloy sa Exodo). Walang petsa ng pagtatapos ang panalangin ng panghahalal.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Polish (pl) — native review required
// ─────────────────────────────────────────────────────────────────

const cancerPl: SituationContent = {
  topic: "cancer",
  title: "Katolickie modlitwy za przyjaciela z rakiem",
  description:
    "Modlitwy, nowenny i sposoby organizacji wsparcia modlitewnego dla kogoś, kto stoi w obliczu diagnozy lub leczenia raka. Z biblioteki katolickich modlitw PrayerTrain.",
  h1: "Katolickie modlitwy za przyjaciela z rakiem",
  lead: "Gdy ktoś, kogo kochasz, zostaje zdiagnozowany z rakiem, kolejne dni mogą sprawiać wrażenie, że nie możesz nic zrobić. Modlitwa jest jedną z rzeczy, które możesz zrobić. Poniższe modlitwy są niektórymi z tych, które Kościół dał nam na chwile takie jak ta. Żadna z nich nie jest gwarancją uzdrowienia. Wszystkie są sposobem na bycie obok osoby, którą kochasz, przed Bogiem, każdego dnia, gdy ona przechodzi przez to.",
  prayers: [
    {
      slug: "novena-sacred-heart",
      why: "Najświętsze Serce Chrystusa jest patronem Kościoła dla cierpiących. Odmawianie tej dziewięciodniowej nowenny za kogoś z rakiem umieszcza jego chorobę w miejscu, gdzie katolickie nabożeństwo najbardziej bezpośrednio spotyka się z ludzkim cierpieniem.",
    },
    {
      slug: "surrender-novena",
      why: "Dziewięć dni radykalnego zawierzenia ks. Dolindo Ruotolo zostało napisane dokładnie na ten moment, gdy diagnoza odbiera rodzinie kierownicę. Refren wszystkich dziewięciu dni brzmi: «O Jezu, oddaję się Tobie, zatroszcz się Ty o wszystko».",
    },
    {
      slug: "rosary-for-healing",
      why: "Różaniec, odmawiany z intencją uzdrowienia, jest jedną z najstarszych katolickich odpowiedzi na cierpienie fizyczne. Wstawiennictwo Maryi jest stałym nurtem pod każdą dziesiątką.",
    },
    {
      slug: "psalm-91",
      why: "Kto przebywa w pieczy Najwyższego, mieszka w cieniu Wszechmocnego. Psalm 91 był modlitwą chorych i tych, którzy ich kochają, przez tysiące lat.",
    },
    {
      slug: "memorare",
      why: "Pomnij, o Najświętsza Panno Maryjo, że nigdy nie słyszano, abyś opuściła tego, kto się do Ciebie ucieka. Krótka, mocna modlitwa, która mieści się w każdej chwili poczekalni lub przy szpitalnym łóżku.",
    },
  ],
  pastoralNote:
    "Katolicka modlitwa za chorych nie jest transakcją. Nie odmawiamy lepszych modlitw, by otrzymać lepsze rezultaty. To, co robimy, to ciągłe przychodzenie, ze słowami, które dał nam Kościół, przed Bogiem, który również cierpiał i który jest obecny przy każdym łóżku, niezależnie od tego, czy odczuwamy Jego obecność, czy nie. Św. Peregryn, patron chorych na raka, jest szczególnym towarzyszem na tej drodze.",
  prayTogetherLead:
    "Jeśli chcesz zgromadzić innych, PrayerTrain pozwala zbudować kalendarz modlitwy dla twojego bliskiego. Przyjaciele i rodzina wybierają konkretne modlitwy w konkretne dni, otrzymują codzienne przypomnienie, a na końcu masz kalendarz ciągłego wsparcia modlitewnego, który możesz wręczyć osobie, za którą się modlisz.",
  faqs: [
    {
      question:
        "Jaka jest najlepsza katolicka modlitwa za kogoś z rakiem?",
      answer:
        "Nie ma jednej najlepszej modlitwy. Nowenna do Najświętszego Serca, Nowenna Zawierzenia i Różaniec o uzdrowienie to katolickie modlitwy tradycyjnie ofiarowane za poważne choroby. Nowenna do Św. Peregryna, patrona chorych na raka, jest szczególnie polskim wyborem w tej dziedzinie. Właściwa modlitwa to zwykle ta, którą rzeczywiście będziesz odmawiać każdego dnia. Wybierz tę, której słowa wydają się odpowiednie dla tej osoby, i odmawiaj ją konsekwentnie.",
    },
    {
      question:
        "Czy powinienem powiedzieć osobie z rakiem, że się za nią modlimy?",
      answer:
        "Tak, prawie zawsze. Wiedza o tym, że ktoś się za nich modli, jest jedną z niewielu rzeczy, które podtrzymują osobę stającą w obliczu poważnej choroby. Wyjątkiem jest sytuacja, gdy poprosili wprost, by im nie mówić (niektórzy uważają to za przytłaczające podczas leczenia). Postępuj zgodnie z tym, o co prosili.",
    },
    {
      question:
        "A jeśli nie wiem, o co się za nich modlić, lub jestem zły na Boga z powodu diagnozy?",
      answer:
        "Módl się mimo to. Psalmy zawierają niektóre z najostrzejszych słów w Piśmie Świętym (zob. Psalm 22, 88). Tradycja katolicka zawsze robiła miejsce dla modlitw, które płyną z gniewu, zagubienia i odczuwanej nieobecności Boga. Przyjście do Boga liczy się bardziej niż wymowa.",
    },
    {
      question: "Jak długo powinniśmy się za nich modlić?",
      answer:
        "Tak długo, jak trwa sytuacja. Leczenie raka rzadko jest sprintem. PrayerTrain, który działa przez jedną rundę leczenia, a następnie jest odnawiany, jest wzorcem tradycji katolickiej (pomyśl o tym, jak Izraelici modlili się nieustannie podczas Wyjścia). Wstawiennictwo nie ma daty ważności.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Registry
// ─────────────────────────────────────────────────────────────────

/**
 * Per-locale overrides keyed by `[locale][topic]`. When the override
 * exists, the page renders the translated content; otherwise it falls
 * back to the English `SITUATIONS` entry.
 *
 * Each entry is a Claude draft pending native review. The structural
 * shape matches `SituationContent` exactly so the renderer doesn't
 * branch on locale.
 */
const overrides: Partial<
  Record<Locale, Partial<Record<string, SituationContent>>>
> = {
  es: { cancer: cancerEs },
  "pt-BR": { cancer: cancerPtBR },
  fil: { cancer: cancerFil },
  pl: { cancer: cancerPl },
};

/**
 * Returns the locale-specific SituationContent if one is registered,
 * or the English fallback from content.ts. English locales (or
 * unknown topics) go straight to the fallback.
 */
export function getSituationContent(
  locale: Locale,
  topic: string,
): SituationContent | undefined {
  const localeOverrides = overrides[locale];
  const override = localeOverrides?.[topic];
  return override ?? SITUATIONS[topic];
}
