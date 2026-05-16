import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/locale-link";
import { CrossIcon, CrossDivider } from "@/components/ui/catholic-icons";
import { ArrowRight, Copy, Mail, Heart, BookOpen, Sparkles } from "lucide-react";
import { localizedMetadata } from "@/i18n/metadata";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getBaseUrl } from "@/lib/url";

// Static pastoral landing for pastors / parish staff. Self-serve:
// embed code, talking points, FAQ. Goal is to let a pastor adopt the
// widget without a warm intro from the founder.
export const revalidate = 300;

type ParishKitCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  whatIsHeading: string;
  whatIsBody: string;
  costHeading: string;
  costBody: string;
  embedHeading: string;
  embedIntro: string;
  embedCaption: string;
  embedHowTo: string;
  embedStepWebsite: string;
  embedStepPaste: string;
  embedStepDone: string;
  talkingHeading: string;
  talkingIntro: string;
  talkingPoints: string[];
  faqHeading: string;
  faqs: { q: string; a: string }[];
  ctaHeading: string;
  ctaBody: string;
  ctaCreate: string;
  ctaBrowse: string;
};

const COPY: Record<Locale, ParishKitCopy> = {
  en: {
    metaTitle: "Parish Kit — bring PrayerTrain to your community",
    metaDescription:
      "A free Catholic prayer-coordination tool for parishes. Embed the prayer-train widget on your website in two minutes, no signup required.",
    eyebrow: "For pastors & parish staff",
    heading: "Bring PrayerTrain to your parish.",
    subheading:
      "A free, Catholic-rooted way to coordinate sustained prayer for families in your community. No signup, no contract, no parish-staff overhead.",
    whatIsHeading: "What it is",
    whatIsBody:
      "PrayerTrain helps a family coordinate sustained prayer when someone they love is sick, struggling, or dying. Parishioners sign up for 30-minute prayer slots covering hours, days, or weeks. The platform sends gentle daily reminders, surfaces the prayer text or novena structure, and gathers a spiritual-bouquet PDF the family can keep. Built by Catholics, for Catholic prayer — novenas, rosaries, chaplets, litanies — never machine-translated, never paywalled.",
    costHeading: "What it costs",
    costBody:
      "Nothing. PrayerTrain is a free ministry of Lantern Harbor LLC. No ads, no upsells, no premium tier. Parishes that adopt the widget pay nothing now and will never be charged.",
    embedHeading: "Embed the widget on your parish website",
    embedIntro:
      "Once a parishioner has created a public prayer train, the embed widget shows live progress on your website. Visitors can sign up for prayer slots directly from your page.",
    embedCaption: "Replace [SLUG] with the prayer-train's slug from its URL.",
    embedHowTo: "Three steps:",
    embedStepWebsite: "Find any prayer train at /browse and copy its slug from the URL (e.g., /p/spina-family-dlmm → slug is spina-family-dlmm).",
    embedStepPaste: "Paste the snippet above into your parish website where you want the card to appear. Most CMSes accept an HTML embed block.",
    embedStepDone: "Save and publish. The widget renders in the train's language automatically.",
    talkingHeading: "Bulletin / homily talking points",
    talkingIntro: "If you'd like to introduce PrayerTrain to your parishioners, here are starting points pastors have found useful:",
    talkingPoints: [
      "It is a free Catholic tool — built by Catholics, rooted in the Church's actual prayer tradition (novenas, the rosary, the chaplet of Divine Mercy, the Memorare).",
      "It addresses a real pastoral pain: families who say 'we don't know how to pray for our loved one' or 'we don't want to bother people.' PrayerTrain gives them coordination without imposition.",
      "Parishioners commit to 30-minute slots — not open-ended 'pray when you can.' The discipline of the time creates real spiritual fruit and prevents the diffusion-of-responsibility problem.",
      "At the end of the prayer window, the family receives a spiritual-bouquet PDF listing every prayer warrior by name. It's a keepsake that often becomes part of the family's spiritual history.",
      "The parish has no administrative burden. Parishioners create and run their own prayer trains. The parish simply makes the tool known.",
    ],
    faqHeading: "Common questions",
    faqs: [
      {
        q: "Is the prayer content Catholic?",
        a: "Yes — every prayer text is sourced from approved Catholic publishers: USCCB Spanish, CNBB Brazilian, CBCP Filipino, KEP Polish, Vatican.va, and the standard published novena collections (Pauline Books & Media, Editorial Verbo Divino, etc.). No machine translation of prayer text.",
      },
      {
        q: "Do parishioners need an account?",
        a: "Only to create a prayer train. To commit to a prayer slot, no account is needed — anyone with the link can sign up for a slot in seconds.",
      },
      {
        q: "What languages are supported?",
        a: "English, Spanish, Brazilian Portuguese, Filipino (Tagalog), and Polish. Each prayer train is created in the organizer's language; the widget, reminders, and printable bouquet all match. Additional languages can be added as we identify Catholic-bilingual reviewers.",
      },
      {
        q: "Will you contact our parishioners?",
        a: "No. We send daily prayer reminders to people who have explicitly signed up for a specific prayer slot. We never market to your parish, never sell or share data, and have no newsletter or follow-up funnel.",
      },
      {
        q: "Is this connected to my diocese?",
        a: "No. PrayerTrain is an independent Catholic ministry, not affiliated with any diocese. Bishops or clergy who want to inquire about the tool are welcome to email the founder directly.",
      },
      {
        q: "What if a prayer warrior signs up but doesn't pray?",
        a: "PrayerTrain doesn't audit prayer. The platform sends gentle daily reminders; what happens between God and the warrior is private. The spiritual-bouquet PDF at the end lists everyone who signed up — the offering itself is what's recorded.",
      },
    ],
    ctaHeading: "Ready to share with your parish?",
    ctaBody:
      "Two ways to start: create a prayer train for someone in your community, or browse existing public trains and share the link.",
    ctaCreate: "Create a prayer train",
    ctaBrowse: "Browse public prayer trains",
  },
  es: {
    metaTitle: "Kit Parroquial — comparte PrayerTrain con tu comunidad",
    metaDescription:
      "Una herramienta católica gratuita para coordinar oración en parroquias. Incrusta el widget en tu sitio web en dos minutos, sin necesidad de registrarse.",
    eyebrow: "Para párrocos y personal parroquial",
    heading: "Comparte PrayerTrain con tu parroquia.",
    subheading:
      "Una forma gratuita y católica de coordinar oración sostenida para las familias de tu comunidad. Sin registro, sin contrato, sin carga administrativa para la parroquia.",
    whatIsHeading: "Qué es",
    whatIsBody:
      "PrayerTrain ayuda a una familia a coordinar oración sostenida cuando alguien que aman está enfermo, en dificultad, o muriendo. Los feligreses se inscriben en horarios de oración de 30 minutos cubriendo horas, días o semanas. La plataforma envía recordatorios diarios suaves, presenta el texto de la oración o la estructura de la novena, y reúne un PDF de ramillete espiritual que la familia puede conservar. Hecho por católicos, para oración católica — novenas, rosarios, coronillas, letanías — nunca traducido automáticamente, nunca cobrado.",
    costHeading: "Cuánto cuesta",
    costBody:
      "Nada. PrayerTrain es un ministerio gratuito de Lantern Harbor LLC. Sin anuncios, sin ventas adicionales, sin nivel premium. Las parroquias que adopten el widget no pagan nada ahora y nunca se les cobrará.",
    embedHeading: "Incrusta el widget en el sitio web de tu parroquia",
    embedIntro:
      "Una vez que un feligrés haya creado una cadena pública, el widget muestra el progreso en vivo en tu sitio web. Los visitantes pueden inscribirse en horarios de oración directamente desde tu página.",
    embedCaption: "Reemplaza [SLUG] con el slug de la cadena tomado de su URL.",
    embedHowTo: "Tres pasos:",
    embedStepWebsite: "Encuentra cualquier cadena de oración en /browse y copia su slug desde la URL (p. ej., /p/spina-family-dlmm → el slug es spina-family-dlmm).",
    embedStepPaste: "Pega el fragmento anterior en el sitio web de tu parroquia donde quieras que aparezca la tarjeta. La mayoría de los CMS aceptan un bloque de incrustación HTML.",
    embedStepDone: "Guarda y publica. El widget se renderiza en el idioma de la cadena automáticamente.",
    talkingHeading: "Puntos para el boletín o la homilía",
    talkingIntro: "Si deseas presentar PrayerTrain a tus feligreses, aquí hay puntos que los párrocos han encontrado útiles:",
    talkingPoints: [
      "Es una herramienta católica gratuita — construida por católicos, arraigada en la tradición real de oración de la Iglesia (novenas, el rosario, la coronilla de la Divina Misericordia, el Memorare).",
      "Aborda un dolor pastoral real: familias que dicen «no sabemos cómo orar por nuestro ser querido» o «no queremos molestar a la gente». PrayerTrain les da coordinación sin imposición.",
      "Los feligreses se comprometen a horarios de 30 minutos — no «ora cuando puedas» indefinido. La disciplina del tiempo crea verdadero fruto espiritual y previene el problema de la difusión de la responsabilidad.",
      "Al final de la ventana de oración, la familia recibe un PDF de ramillete espiritual que enumera a cada guerrero de oración por su nombre. Es un recuerdo que a menudo se convierte en parte de la historia espiritual de la familia.",
      "La parroquia no tiene carga administrativa. Los feligreses crean y ejecutan sus propias cadenas. La parroquia simplemente da a conocer la herramienta.",
    ],
    faqHeading: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿El contenido de oración es católico?",
        a: "Sí — cada texto de oración proviene de editoriales católicas aprobadas: USCCB Spanish, CNBB brasileña, CBCP filipina, KEP polaca, Vatican.va y las colecciones estándar publicadas (Ediciones Paulinas, Editorial Verbo Divino, etc.). Sin traducción automática del texto de oración.",
      },
      {
        q: "¿Los feligreses necesitan una cuenta?",
        a: "Solo para crear una cadena de oración. Para comprometerse con un horario de oración, no se necesita cuenta — cualquiera con el enlace puede inscribirse en segundos.",
      },
      {
        q: "¿Qué idiomas están disponibles?",
        a: "Inglés, español, portugués brasileño, filipino (tagalo) y polaco. Cada cadena se crea en el idioma del organizador; el widget, los recordatorios y el ramillete impreso coinciden. Se pueden añadir otros idiomas conforme identificamos revisores católicos bilingües.",
      },
      {
        q: "¿Contactarán a nuestros feligreses?",
        a: "No. Enviamos recordatorios diarios de oración a las personas que se han inscrito explícitamente en un horario específico. Nunca hacemos mercadeo a tu parroquia, nunca vendemos ni compartimos datos, y no tenemos boletín ni embudo de seguimiento.",
      },
      {
        q: "¿Está esto conectado con mi diócesis?",
        a: "No. PrayerTrain es un ministerio católico independiente, no afiliado a ninguna diócesis. Obispos o clero que quieran consultar sobre la herramienta pueden escribir al fundador directamente.",
      },
      {
        q: "¿Qué pasa si un guerrero se inscribe pero no ora?",
        a: "PrayerTrain no audita la oración. La plataforma envía recordatorios diarios suaves; lo que sucede entre Dios y el guerrero es privado. El PDF del ramillete al final enumera a todos los que se inscribieron — la ofrenda misma es lo que queda registrado.",
      },
    ],
    ctaHeading: "¿Listo para compartir con tu parroquia?",
    ctaBody:
      "Dos formas de comenzar: crea una cadena de oración por alguien de tu comunidad, o navega por las cadenas públicas existentes y comparte el enlace.",
    ctaCreate: "Crear una cadena de oración",
    ctaBrowse: "Ver cadenas públicas",
  },
  "pt-BR": {
    metaTitle: "Kit Paroquial — leve o PrayerTrain à sua comunidade",
    metaDescription:
      "Uma ferramenta católica gratuita para coordenar oração em paróquias. Incorpore o widget em seu site em dois minutos, sem necessidade de cadastro.",
    eyebrow: "Para párocos e equipe paroquial",
    heading: "Leve o PrayerTrain à sua paróquia.",
    subheading:
      "Uma forma gratuita e enraizada na fé católica de coordenar oração sustentada pelas famílias da sua comunidade. Sem cadastro, sem contrato, sem carga administrativa para a paróquia.",
    whatIsHeading: "O que é",
    whatIsBody:
      "O PrayerTrain ajuda uma família a coordenar oração sustentada quando alguém que ela ama está doente, em dificuldade ou morrendo. Paroquianos se inscrevem em horários de oração de 30 minutos cobrindo horas, dias ou semanas. A plataforma envia lembretes diários suaves, apresenta o texto da oração ou a estrutura da novena, e reúne um PDF de buquê espiritual que a família pode guardar. Feito por católicos, para oração católica — novenas, rosários, coroinhas, ladainhas — nunca traduzido por máquina, nunca cobrado.",
    costHeading: "Quanto custa",
    costBody:
      "Nada. O PrayerTrain é um ministério gratuito da Lantern Harbor LLC. Sem anúncios, sem upsells, sem nível premium. Paróquias que adotam o widget não pagam nada agora e nunca serão cobradas.",
    embedHeading: "Incorpore o widget no site da sua paróquia",
    embedIntro:
      "Assim que um paroquiano criar uma corrente pública, o widget mostra o progresso ao vivo no site. Visitantes podem se inscrever em horários de oração diretamente da sua página.",
    embedCaption: "Substitua [SLUG] pelo slug da corrente, obtido da URL dela.",
    embedHowTo: "Três passos:",
    embedStepWebsite: "Encontre qualquer corrente de oração em /browse e copie o slug da URL (ex.: /p/spina-family-dlmm → slug é spina-family-dlmm).",
    embedStepPaste: "Cole o trecho acima no site da sua paróquia, onde você quer que o cartão apareça. A maioria dos CMS aceita um bloco de incorporação HTML.",
    embedStepDone: "Salve e publique. O widget é renderizado no idioma da corrente automaticamente.",
    talkingHeading: "Pontos para o boletim ou a homilia",
    talkingIntro: "Se você quiser apresentar o PrayerTrain aos seus paroquianos, aqui estão pontos que os párocos têm achado úteis:",
    talkingPoints: [
      "É uma ferramenta católica gratuita — construída por católicos, enraizada na tradição real de oração da Igreja (novenas, rosário, coroinha da Divina Misericórdia, Lembrai-vos).",
      "Aborda uma dor pastoral real: famílias que dizem «não sabemos como rezar pelo nosso ente querido» ou «não queremos incomodar as pessoas». O PrayerTrain dá coordenação sem imposição.",
      "Paroquianos se comprometem com horários de 30 minutos — não «reze quando puder» indefinido. A disciplina do tempo produz fruto espiritual real e previne o problema da difusão da responsabilidade.",
      "Ao final da janela de oração, a família recebe um PDF de buquê espiritual listando cada guerreiro de oração pelo nome. É uma lembrança que muitas vezes se torna parte da história espiritual da família.",
      "A paróquia não tem carga administrativa. Os paroquianos criam e gerenciam suas próprias correntes. A paróquia simplesmente divulga a ferramenta.",
    ],
    faqHeading: "Perguntas frequentes",
    faqs: [
      {
        q: "O conteúdo de oração é católico?",
        a: "Sim — cada texto de oração vem de editoras católicas aprovadas: USCCB espanhol, CNBB, CBCP filipina, KEP polaca, Vatican.va, e as coleções padrão de novenas publicadas (Paulus, Canção Nova, Loyola, etc.). Sem tradução automática do texto de oração.",
      },
      {
        q: "Os paroquianos precisam de uma conta?",
        a: "Apenas para criar uma corrente de oração. Para se comprometer com um horário, não é preciso conta — qualquer pessoa com o link pode se inscrever em segundos.",
      },
      {
        q: "Quais idiomas são suportados?",
        a: "Inglês, espanhol, português brasileiro, filipino (tagalo) e polonês. Cada corrente é criada no idioma do organizador; o widget, os lembretes e o buquê impresso correspondem. Outros idiomas podem ser adicionados conforme identificamos revisores católicos bilíngues.",
      },
      {
        q: "Vocês contatarão nossos paroquianos?",
        a: "Não. Enviamos lembretes diários de oração a pessoas que se inscreveram explicitamente em um horário específico. Nunca fazemos marketing à sua paróquia, nunca vendemos ou compartilhamos dados, e não temos newsletter nem funil de follow-up.",
      },
      {
        q: "Isso está ligado à minha diocese?",
        a: "Não. O PrayerTrain é um ministério católico independente, não afiliado a nenhuma diocese. Bispos ou clero que queiram consultar sobre a ferramenta podem escrever ao fundador diretamente.",
      },
      {
        q: "E se um guerreiro de oração se inscreve mas não reza?",
        a: "O PrayerTrain não audita a oração. A plataforma envia lembretes diários suaves; o que acontece entre Deus e o guerreiro é privado. O PDF do buquê ao final lista todos que se inscreveram — a oferta em si é o que fica registrado.",
      },
    ],
    ctaHeading: "Pronto para compartilhar com sua paróquia?",
    ctaBody:
      "Duas formas de começar: crie uma corrente de oração por alguém da sua comunidade, ou navegue pelas correntes públicas existentes e compartilhe o link.",
    ctaCreate: "Criar uma corrente de oração",
    ctaBrowse: "Ver correntes públicas",
  },
  fil: {
    metaTitle: "Parish Kit — dalhin ang PrayerTrain sa iyong komunidad",
    metaDescription:
      "Isang libreng Katolikong tool para sa pag-coordinate ng panalangin sa mga parokya. I-embed ang widget sa iyong website sa loob ng dalawang minuto, walang kailangang sign-up.",
    eyebrow: "Para sa mga pari at parish staff",
    heading: "Dalhin ang PrayerTrain sa iyong parokya.",
    subheading:
      "Isang libre at Katolikong paraan upang i-coordinate ang patuloy na panalangin para sa mga pamilya sa iyong komunidad. Walang sign-up, walang kontrata, walang administrative na pasanin para sa parokya.",
    whatIsHeading: "Ano ito",
    whatIsBody:
      "Tinutulungan ng PrayerTrain ang isang pamilya na i-coordinate ang patuloy na panalangin kapag may maysakit, nahihirapan, o naghihingalo ang isang mahal nila. Nag-sign up ang mga paroquiyano sa mga 30-minutong slot ng panalangin na sumasaklaw sa mga oras, araw, o linggo. Nagpapadala ang platform ng banayad na pang-araw-araw na paalala, nagpapakita ng teksto ng panalangin o estruktura ng nobena, at nag-iipon ng isang spiritual bouquet PDF na maaaring itago ng pamilya. Ginawa ng mga Katoliko, para sa Katolikong panalangin — mga nobena, rosaryo, koronilya, litanya — hindi kailanman machine-translated, hindi kailanman binabayaran.",
    costHeading: "Magkano ang halaga",
    costBody:
      "Wala. Ang PrayerTrain ay isang libreng ministeryo ng Lantern Harbor LLC. Walang ads, walang upsells, walang premium tier. Ang mga parokyang nag-adopt ng widget ay walang babayaran ngayon at hindi kailanman sisingilin.",
    embedHeading: "I-embed ang widget sa iyong parish website",
    embedIntro:
      "Kapag gumawa na ang isang paroquiyano ng public prayer train, ipinapakita ng widget ang live na progreso sa iyong website. Maaaring mag-sign up ang mga bisita sa mga prayer slot mismo mula sa iyong page.",
    embedCaption: "Palitan ang [SLUG] ng slug ng prayer train mula sa URL nito.",
    embedHowTo: "Tatlong hakbang:",
    embedStepWebsite: "Maghanap ng anumang prayer train sa /browse at kopyahin ang slug mula sa URL (hal., /p/spina-family-dlmm → ang slug ay spina-family-dlmm).",
    embedStepPaste: "I-paste ang snippet sa itaas sa parish website mo kung saan mo gustong lumabas ang card. Tinatanggap ng karamihan ng CMS ang HTML embed block.",
    embedStepDone: "I-save at i-publish. Ang widget ay automatic na nire-render sa wika ng prayer train.",
    talkingHeading: "Bulletin / homily talking points",
    talkingIntro: "Kung gusto mong ipakilala ang PrayerTrain sa iyong mga paroquiyano, narito ang mga puntos na nakatulong sa mga pari:",
    talkingPoints: [
      "Ito ay isang libreng Katolikong tool — ginawa ng mga Katoliko, nakaugat sa tunay na tradisyon ng panalangin ng Simbahan (mga nobena, rosaryo, Koronilya ng Awa ng Diyos, Memorare).",
      "Tinutugunan nito ang isang totoong pastoral na sakit: mga pamilyang nagsasabing «hindi namin alam kung paano ipagdasal ang mahal sa amin» o «ayaw naming abalahin ang mga tao». Ang PrayerTrain ay nagbibigay sa kanila ng coordination nang walang pagpipilit.",
      "Nagcocommit ang mga paroquiyano sa 30-minutong slot — hindi walang-katapusang «magdasal kapag kaya mo». Ang disiplina ng oras ay lumilikha ng tunay na espirituwal na bunga at pumipigil sa problema ng diffusion of responsibility.",
      "Sa pagtatapos ng prayer window, nakakatanggap ang pamilya ng isang spiritual bouquet PDF na naglilista sa bawat prayer warrior sa pangalan. Ito ay isang alaala na madalas na nagiging bahagi ng espirituwal na kasaysayan ng pamilya.",
      "Walang administrative na pasanin ang parokya. Ang mga paroquiyano mismo ang gumagawa at nagpapatakbo ng kanilang mga prayer train. Ipinapakilala lang ng parokya ang tool.",
    ],
    faqHeading: "Mga karaniwang tanong",
    faqs: [
      {
        q: "Katoliko ba ang nilalaman ng panalangin?",
        a: "Oo — ang bawat teksto ng panalangin ay nagmumula sa mga inaprubahang Katolikong publisher: USCCB Spanish, CNBB Brazilian, CBCP Filipino, KEP Polish, Vatican.va, at standard na mga koleksyon ng nobena (Pauline Books & Media, atbp.). Walang machine translation ng teksto ng panalangin.",
      },
      {
        q: "Kailangan ba ng account ng mga paroquiyano?",
        a: "Para lang gumawa ng prayer train. Para mag-commit sa prayer slot, walang kailangang account — kahit sino na may link ay makakapag-sign up sa ilang segundo.",
      },
      {
        q: "Anong mga wika ang sinusuportahan?",
        a: "English, Spanish, Brazilian Portuguese, Filipino (Tagalog), at Polish. Ang bawat prayer train ay ginagawa sa wika ng organizer; ang widget, mga paalala, at spiritual bouquet ay tumutugma. Maaaring magdagdag ng mga karagdagang wika habang nakikilala namin ang Catholic-bilingual na reviewer.",
      },
      {
        q: "Makikipag-ugnayan ba kayo sa aming mga paroquiyano?",
        a: "Hindi. Nagpapadala kami ng pang-araw-araw na paalala sa mga taong tahasang nag-sign up sa partikular na prayer slot. Hindi kami nagma-market sa iyong parokya, hindi kami nagbebenta o nag-share ng data, at wala kaming newsletter o follow-up funnel.",
      },
      {
        q: "Konektado ba ito sa aking diyosesis?",
        a: "Hindi. Ang PrayerTrain ay isang independiyenteng Katolikong ministeryo, hindi naka-affiliate sa anumang diyosesis. Mga obispo o klero na nais magtanong tungkol sa tool ay malugod na nag-aanyaya sa email sa founder nang direkta.",
      },
      {
        q: "Paano kung mag-sign up ang isang prayer warrior pero hindi magdadasal?",
        a: "Hindi nag-a-audit ang PrayerTrain ng panalangin. Nagpapadala ang platform ng banayad na pang-araw-araw na paalala; ang nangyayari sa pagitan ng Diyos at ng warrior ay pribado. Ang spiritual bouquet PDF sa huli ay naglilista sa lahat ng nag-sign up — ang pag-aalay mismo ang nairecord.",
      },
    ],
    ctaHeading: "Handa nang ibahagi sa iyong parokya?",
    ctaBody:
      "Dalawang paraan upang magsimula: gumawa ng prayer train para sa isang tao sa iyong komunidad, o mag-browse sa mga umiiral na public train at ibahagi ang link.",
    ctaCreate: "Gumawa ng prayer train",
    ctaBrowse: "Tingnan ang mga public prayer train",
  },
  pl: {
    metaTitle: "Zestaw Parafialny — przynieś PrayerTrain do swojej wspólnoty",
    metaDescription:
      "Bezpłatne katolickie narzędzie do koordynowania modlitwy w parafiach. Osadź widget na swojej stronie internetowej w dwie minuty, bez potrzeby rejestracji.",
    eyebrow: "Dla proboszczów i personelu parafialnego",
    heading: "Przynieś PrayerTrain do swojej parafii.",
    subheading:
      "Bezpłatny, katolicki sposób koordynowania trwałej modlitwy za rodziny w twojej wspólnocie. Bez rejestracji, bez umowy, bez administracyjnego obciążenia dla parafii.",
    whatIsHeading: "Czym to jest",
    whatIsBody:
      "PrayerTrain pomaga rodzinie koordynować trwałą modlitwę, gdy ktoś, kogo kochają, jest chory, zmaga się lub umiera. Parafianie zapisują się na 30-minutowe okna modlitwy obejmujące godziny, dni lub tygodnie. Platforma wysyła łagodne codzienne przypomnienia, prezentuje tekst modlitwy lub strukturę nowenny i gromadzi PDF z duchowym bukietem, który rodzina może zachować. Stworzone przez katolików, dla katolickiej modlitwy — nowenny, różaniec, koronka, litanie — nigdy nie tłumaczone maszynowo, nigdy płatne.",
    costHeading: "Ile to kosztuje",
    costBody:
      "Nic. PrayerTrain jest bezpłatnym posługą Lantern Harbor LLC. Bez reklam, bez upsellów, bez wersji premium. Parafie, które przyjmują widget, nie płacą nic teraz i nigdy nie zostaną obciążone.",
    embedHeading: "Osadź widget na stronie internetowej swojej parafii",
    embedIntro:
      "Gdy parafianin utworzy publiczny prayer train, widget pokazuje postęp na żywo na twojej stronie. Odwiedzający mogą zapisać się na okna modlitwy bezpośrednio z twojej strony.",
    embedCaption: "Zastąp [SLUG] slugiem modlitwy, wziętym z jej URL.",
    embedHowTo: "Trzy kroki:",
    embedStepWebsite: "Znajdź dowolny prayer train w /browse i skopiuj jego slug z URL (np. /p/spina-family-dlmm → slug to spina-family-dlmm).",
    embedStepPaste: "Wklej powyższy fragment na stronie swojej parafii, gdzie chcesz, aby pojawiła się karta. Większość CMS-ów akceptuje blok osadzania HTML.",
    embedStepDone: "Zapisz i opublikuj. Widget renderuje się automatycznie w języku modlitwy.",
    talkingHeading: "Punkty do biuletynu / homilii",
    talkingIntro: "Jeśli chcesz przedstawić PrayerTrain swoim parafianom, oto punkty, które proboszczowie uznali za przydatne:",
    talkingPoints: [
      "To bezpłatne katolickie narzędzie — zbudowane przez katolików, zakorzenione w rzeczywistej tradycji modlitwy Kościoła (nowenny, różaniec, Koronka do Miłosierdzia Bożego, Pomnij).",
      "Odpowiada na rzeczywisty pastoralny ból: rodziny mówiące «nie wiemy, jak modlić się za naszego bliskiego» lub «nie chcemy nikogo niepokoić». PrayerTrain daje im koordynację bez narzucania.",
      "Parafianie zobowiązują się do 30-minutowych okien — nie nieokreślonego «módl się, kiedy możesz». Dyscyplina czasu wytwarza prawdziwy duchowy owoc i zapobiega problemowi rozproszenia odpowiedzialności.",
      "Po zakończeniu okna modlitwy rodzina otrzymuje PDF z duchowym bukietem, wymieniający każdego wojownika modlitwy po imieniu. Jest to pamiątka, która często staje się częścią duchowej historii rodziny.",
      "Parafia nie ma administracyjnego obciążenia. Parafianie sami tworzą i prowadzą swoje prayer trains. Parafia po prostu daje znać o narzędziu.",
    ],
    faqHeading: "Najczęściej zadawane pytania",
    faqs: [
      {
        q: "Czy treść modlitwy jest katolicka?",
        a: "Tak — każdy tekst modlitwy pochodzi z zatwierdzonych katolickich wydawców: USCCB hiszpański, CNBB brazylijski, CBCP filipiński, KEP polski, Vatican.va oraz standardowe wydane kolekcje nowenn. Bez tłumaczenia maszynowego tekstu modlitwy.",
      },
      {
        q: "Czy parafianie potrzebują konta?",
        a: "Tylko do utworzenia prayer train. Aby zobowiązać się do okna modlitwy, konto nie jest potrzebne — każdy z linkiem może zapisać się w kilka sekund.",
      },
      {
        q: "Jakie języki są obsługiwane?",
        a: "Angielski, hiszpański, brazylijski portugalski, filipiński (tagalog) i polski. Każdy prayer train jest tworzony w języku organizatora; widget, przypomnienia i bukiet do druku odpowiadają. Dodatkowe języki mogą zostać dodane, gdy zidentyfikujemy katolicko-dwujęzycznych recenzentów.",
      },
      {
        q: "Czy będziecie kontaktować się z naszymi parafianami?",
        a: "Nie. Wysyłamy codzienne przypomnienia modlitwy do osób, które wyraźnie zapisały się na konkretne okno modlitwy. Nigdy nie marketingujemy do twojej parafii, nigdy nie sprzedajemy ani nie udostępniamy danych i nie mamy newslettera ani lejka follow-up.",
      },
      {
        q: "Czy to jest powiązane z moją diecezją?",
        a: "Nie. PrayerTrain jest niezależnym katolickim ministerstwem, nieafiliowanym z żadną diecezją. Biskupi lub duchowieństwo, którzy chcą zapytać o narzędzie, są zapraszani do napisania bezpośrednio do założyciela.",
      },
      {
        q: "Co jeśli wojownik modlitwy zapisuje się, ale się nie modli?",
        a: "PrayerTrain nie audytuje modlitwy. Platforma wysyła łagodne codzienne przypomnienia; co dzieje się między Bogiem a wojownikiem, jest prywatne. PDF z bukietem na końcu wymienia wszystkich, którzy się zapisali — sama ofiara jest tym, co zostaje zapisane.",
      },
    ],
    ctaHeading: "Gotów podzielić się z parafią?",
    ctaBody:
      "Dwa sposoby na rozpoczęcie: utwórz prayer train za kogoś ze swojej wspólnoty lub przejrzyj istniejące publiczne modlitewne i udostępnij link.",
    ctaCreate: "Utwórz prayer train",
    ctaBrowse: "Przejrzyj publiczne prayer trains",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = COPY[locale];
  return localizedMetadata({
    locale,
    path: "/parish-kit",
    title: t.metaTitle,
    description: t.metaDescription,
    absoluteTitle: true,
  });
}

export default async function ParishKitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = COPY[locale];

  const baseUrl = getBaseUrl();
  const embedSnippet = `<iframe\n  src="${baseUrl}/api/widget/[SLUG]"\n  width="400"\n  height="320"\n  frameborder="0"\n  loading="lazy"\n  title="PrayerTrain"\n></iframe>`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-gold-600 mb-3 font-medium">
          {t.eyebrow}
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-navy-800 mb-4 leading-tight">
          {t.heading}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t.subheading}
        </p>
      </div>

      <CrossDivider className="mb-12" />

      {/* What is */}
      <section className="mb-12">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-navy-100 flex items-center justify-center">
            <CrossIcon className="w-6 h-6 text-gold-500" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-navy-800 mb-3">
              {t.whatIsHeading}
            </h2>
            <p className="text-foreground/90 leading-relaxed">{t.whatIsBody}</p>
          </div>
        </div>
      </section>

      {/* Cost */}
      <section className="mb-12 bg-cream-50 border border-cream-200 rounded-2xl p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-gold-100 flex items-center justify-center">
            <Heart className="w-6 h-6 text-gold-600" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-navy-800 mb-3">
              {t.costHeading}
            </h2>
            <p className="text-foreground/90 leading-relaxed">{t.costBody}</p>
          </div>
        </div>
      </section>

      {/* Embed */}
      <section className="mb-12">
        <div className="flex items-start gap-4 mb-5">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-navy-100 flex items-center justify-center">
            <Copy className="w-6 h-6 text-navy-700" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-navy-800 mb-3">
              {t.embedHeading}
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              {t.embedIntro}
            </p>
          </div>
        </div>
        <pre className="bg-navy-900 text-cream-50 rounded-xl p-5 text-sm overflow-x-auto leading-relaxed font-mono">
          <code>{embedSnippet}</code>
        </pre>
        <p className="text-sm text-muted-foreground mt-3 italic">
          {t.embedCaption}
        </p>
        <div className="mt-6">
          <h3 className="font-heading text-lg font-semibold text-navy-800 mb-3">
            {t.embedHowTo}
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-foreground/90">
            <li>{t.embedStepWebsite}</li>
            <li>{t.embedStepPaste}</li>
            <li>{t.embedStepDone}</li>
          </ol>
        </div>
      </section>

      {/* Talking points */}
      <section className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-navy-100 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-navy-700" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-navy-800 mb-2">
              {t.talkingHeading}
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              {t.talkingIntro}
            </p>
          </div>
        </div>
        <ul className="space-y-3 ml-16">
          {t.talkingPoints.map((point, i) => (
            <li key={i} className="flex gap-3 text-foreground/90">
              <span className="shrink-0 text-gold-500 font-bold mt-1">·</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <div className="flex items-start gap-4 mb-5">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-navy-100 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-navy-700" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-navy-800">
            {t.faqHeading}
          </h2>
        </div>
        <div className="space-y-5">
          {t.faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-border rounded-xl p-5 bg-card"
            >
              <h3 className="font-heading text-lg font-semibold text-navy-800 mb-2">
                {faq.q}
              </h3>
              <p className="text-foreground/90 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-50 border border-navy-100 rounded-2xl p-8 text-center">
        <Mail className="w-10 h-10 text-navy-700 mx-auto mb-4" />
        <h2 className="font-heading text-2xl font-bold text-navy-800 mb-3">
          {t.ctaHeading}
        </h2>
        <p className="text-foreground/90 mb-6 max-w-2xl mx-auto">
          {t.ctaBody}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/create/train"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 transition-colors"
          >
            {t.ctaCreate}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/browse"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg text-foreground font-medium hover:bg-muted transition-colors"
          >
            {t.ctaBrowse}
          </Link>
        </div>
      </section>

      {/* JSON-LD: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: locale,
            mainEntity: t.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </div>
  );
}
