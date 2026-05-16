import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/locale-link";
import {
  CrossIcon,
  CrossDivider,
  SacredHeartIcon,
  CandleIcon,
} from "@/components/ui/catholic-icons";
import { ArrowRight, Users, Mail, Heart, Calendar, Sparkles } from "lucide-react";
import { localizedMetadata } from "@/i18n/metadata";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getBaseUrl } from "@/lib/url";

// Consumer pastoral landing: captures the search intent
// "how to organize prayer for a sick family member" / "set up a
// prayer chain" / "coordinate prayer for surgery." Pastoral tone,
// minimal mechanics, ends in a single CTA (start a prayer train).
//
// SEO target keywords (per `seo-tracks-ef-research-plan.md` D-track
// thinking): "how to organize prayer for a loved one", "Catholic
// prayer chain", "coordinate prayer for someone sick", "start a
// prayer train".
export const revalidate = 300;

type Copy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  whenHeading: string;
  whenBody: string;
  whenList: string[];
  stepsHeading: string;
  steps: { title: string; body: string }[];
  catholicHeading: string;
  catholicBody: string;
  encouragementHeading: string;
  encouragementBody: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
};

const COPY: Record<Locale, Copy> = {
  en: {
    metaTitle: "How to start a prayer train for someone you love",
    metaDescription:
      "A free, Catholic-rooted way to organize sustained prayer when someone is sick, dying, or in deep need. Step-by-step: from intention to spiritual bouquet.",
    eyebrow: "For families & friends",
    heading: "How to start a prayer train for someone you love.",
    subheading:
      "When a loved one is sick, scared, or facing something hard, prayer is often what comes most naturally — and what feels most inadequate. A prayer train turns scattered prayers into sustained, coordinated intercession.",
    whenHeading: "When a prayer train makes sense",
    whenBody:
      "A prayer train fits any situation where you want prayer to continue over time — not a single rosary, but a sustained chain of intercession. Most start one because:",
    whenList: [
      "A family member or friend has received a serious medical diagnosis (cancer, chronic illness, surgery, mental-health crisis).",
      "A loved one is approaching the end of life and the family wants the dying person surrounded by prayer.",
      "A pregnancy is fragile — first-trimester miscarriage risk, prenatal diagnosis, NICU baby.",
      "A marriage is in crisis or a family is going through a hard separation.",
      "A loved one has left the faith and the family is praying for their return — long-arc intercession (St. Monica prayed for Augustine for 17 years).",
      "Someone is preparing for a Sacrament, a major life decision, a vocation discernment, or a deployment.",
    ],
    stepsHeading: "Step by step",
    steps: [
      {
        title: "Decide who you're praying for and what for.",
        body: "A prayer train needs a name — the person you love — and an intention. The intention is what you're asking God for: healing of body, peace of heart, safe delivery, a holy death, the conversion of a wandering child. Be specific. The clarity helps the people praying enter into the request rather than offer something vague.",
      },
      {
        title: "Choose a prayer window.",
        body: "Most prayer trains run for a finite window — days, weeks, sometimes months. A 9-day novena, the duration of a chemo cycle, the weeks before a surgery, the 33 days before a major decision. The boundary matters: open-ended prayer becomes diffuse; bounded prayer holds its shape and ends with a felt completion.",
      },
      {
        title: "Pick the prayer.",
        body: "PrayerTrain offers 50+ Catholic prayers: novenas (St. Joseph, the Sacred Heart, Divine Mercy, the Surrender Novena), the rosary, the Chaplet of Divine Mercy, litanies, short prayers. If the situation is medical, the Chaplet of Divine Mercy at 3:00 PM is traditional. If the situation involves discernment, the Novena to the Holy Spirit. If conversion, the Prayer for the Conversion of a Loved One. Pick what fits the family's prayer-life and the loved one's situation. You can also pair a daily prayer with a 9-day novena for a stronger spine.",
      },
      {
        title: "Set the number of daily slots.",
        body: "PrayerTrain divides each day into 30-minute prayer slots. Pick how many slots per day you want covered — three is the common starting point (morning, noon, evening). Each slot can be filled by a different person. The math: 3 slots/day × 9 days = 27 prayer commitments. You don't need 27 close friends; you need a small core circle who will pray and forward the link to their own networks. The forwarding is how a prayer train grows.",
      },
      {
        title: "Share the link.",
        body: "PrayerTrain gives each train a unique URL. Share it however your family communicates: a text to immediate family, a parish-bulletin announcement, a small Facebook post, an email to your prayer group. Each prayer warrior who signs up for a slot can also forward the link. Within 48 hours most prayer trains for a sympathetic intention are at least half-claimed, often fully claimed.",
      },
      {
        title: "Let the train run; receive the bouquet.",
        body: "PrayerTrain sends gentle daily reminders to each prayer warrior on their slot day. The family doesn't manage anything — they just receive prayer. At the end of the window, the family gets a spiritual-bouquet PDF: every prayer warrior listed by name, every prayer offered counted, often with brief notes the warriors chose to include. It's a keepsake that almost always becomes part of the family's history of this season.",
      },
    ],
    catholicHeading: "Rooted in the Church",
    catholicBody:
      "PrayerTrain uses approved Catholic prayer texts only — the actual prayers of the universal Church, drawn from USCCB Spanish, CNBB Brazilian, CBCP Filipino, KEP Polish, Vatican.va, and the standard published novena collections. The 30-minute slot structure mirrors the apostolic precedent: nine days of sustained prayer with Mary in the upper room before Pentecost (Acts 1:14), which became the form of every Catholic novena since. The spiritual-bouquet PDF echoes the traditional Catholic bouquet given as a gift of accumulated prayer offerings. None of this is invented; it's the Church's actual prayer life, given a coordination layer.",
    encouragementHeading: "A note from us",
    encouragementBody:
      "We started PrayerTrain because we needed it. Three of our own children faced serious medical situations within an 18-month stretch, and we kept finding that the people who loved us wanted to pray but didn't know how to coordinate. PrayerTrain is the tool we wished we had had. It's free because the love that flows through a prayer train is not ours to monetize — it's a participation in God's own care for the people you love.",
    faqHeading: "Common questions",
    faqs: [
      {
        q: "Can people who aren't Catholic sign up for a prayer slot?",
        a: "Yes. The prayer texts are Catholic, but any person of good will can offer the prayer (or simply hold the intention before God in their own tradition). Many prayer trains include Christian friends of other denominations and even non-religious friends who want to support the family.",
      },
      {
        q: "Does it cost anything?",
        a: "No. PrayerTrain is a free ministry of Lantern Harbor LLC. No ads, no upsells, no premium tier, no future paywall. It's funded as a ministry, not as a business.",
      },
      {
        q: "What if I don't know what prayer to choose?",
        a: "Browse the library at /prayers and read the descriptions; each prayer has a 'when to use it' section. If you're still uncertain, the Memorare (a short, powerful prayer to Mary) or the Chaplet of Divine Mercy (10 minutes, said at 3:00 PM) are good universal starting points. You can always change the prayer mid-train if you discern differently.",
      },
      {
        q: "Should I make the prayer train public or private?",
        a: "Private is the default. A private train is only visible to people you give the link to — appropriate for medical situations where the family wants privacy. A public train shows up in the public /browse index and on parish-embed widgets — appropriate when you want to invite a wider community (and the recipient is comfortable with that).",
      },
      {
        q: "Can the person being prayed for see what's happening?",
        a: "Yes, if they have the link. Many recipients find it deeply consoling to see the list of warriors filling slots day by day. Some families share the link with the loved one early; others share the spiritual-bouquet PDF at the end as a surprise.",
      },
      {
        q: "What happens after the prayer window ends?",
        a: "The spiritual-bouquet PDF is generated automatically. The family can download it, print it, frame it, or share it with the recipient. The prayer train page itself stays online — many families return to it during anniversaries, particularly the date of a healing or a passing.",
      },
    ],
    ctaHeading: "Start when you're ready.",
    ctaBody:
      "Creating a prayer train takes about three minutes. You don't need to have all the answers before you begin — the platform walks you through each step.",
    ctaButton: "Start a prayer train",
  },
  es: {
    metaTitle: "Cómo iniciar una cadena de oración por alguien que amas",
    metaDescription:
      "Una forma gratuita y católica de organizar oración sostenida cuando alguien está enfermo, muriendo o en necesidad profunda. Paso a paso: desde la intención hasta el ramillete espiritual.",
    eyebrow: "Para familias y amigos",
    heading: "Cómo iniciar una cadena de oración por alguien que amas.",
    subheading:
      "Cuando un ser querido está enfermo, asustado, o enfrentando algo difícil, la oración suele ser lo que surge más naturalmente — y lo que se siente más insuficiente. Una cadena de oración transforma oraciones dispersas en intercesión sostenida y coordinada.",
    whenHeading: "Cuándo tiene sentido una cadena de oración",
    whenBody:
      "Una cadena de oración encaja en cualquier situación en la que quieras que la oración continúe en el tiempo — no un solo rosario, sino una cadena sostenida de intercesión. La mayoría comienza una porque:",
    whenList: [
      "Un familiar o amigo ha recibido un diagnóstico médico grave (cáncer, enfermedad crónica, cirugía, crisis de salud mental).",
      "Un ser querido se acerca al fin de su vida y la familia quiere rodear al moribundo de oración.",
      "Un embarazo es frágil — riesgo de aborto en el primer trimestre, diagnóstico prenatal, bebé en UCIN.",
      "Un matrimonio está en crisis o una familia está atravesando una separación difícil.",
      "Un ser querido ha dejado la fe y la familia ora por su regreso — intercesión a largo plazo (Santa Mónica oró por Agustín durante 17 años).",
      "Alguien se prepara para un Sacramento, una decisión importante de vida, el discernimiento de una vocación o un despliegue militar.",
    ],
    stepsHeading: "Paso a paso",
    steps: [
      {
        title: "Decide por quién oras y por qué.",
        body: "Una cadena de oración necesita un nombre — la persona que amas — y una intención. La intención es lo que pides a Dios: sanación del cuerpo, paz del corazón, parto seguro, muerte santa, la conversión de un hijo errante. Sé específico. La claridad ayuda a los que oran a entrar en la petición en lugar de ofrecer algo vago.",
      },
      {
        title: "Elige una ventana de oración.",
        body: "La mayoría de las cadenas de oración duran un tiempo finito — días, semanas, a veces meses. Una novena de 9 días, la duración de un ciclo de quimio, las semanas antes de una cirugía, los 33 días antes de una decisión importante. El límite importa: la oración indefinida se vuelve difusa; la oración limitada mantiene su forma y termina con una sensación de cierre.",
      },
      {
        title: "Elige la oración.",
        body: "PrayerTrain ofrece más de 50 oraciones católicas: novenas (San José, el Sagrado Corazón, la Divina Misericordia, la Novena del Abandono), el rosario, la Coronilla de la Divina Misericordia, letanías, oraciones breves. Si la situación es médica, la Coronilla de la Divina Misericordia a las 3:00 PM es tradicional. Si la situación involucra discernimiento, la Novena al Espíritu Santo. Si conversión, la Oración por la Conversión de un Ser Querido. Elige lo que se ajuste a la vida de oración de la familia y a la situación del ser querido. También puedes combinar una oración diaria con una novena de 9 días para una columna más fuerte.",
      },
      {
        title: "Define el número de horarios diarios.",
        body: "PrayerTrain divide cada día en horarios de oración de 30 minutos. Elige cuántos horarios por día quieres cubiertos — tres es el punto de partida común (mañana, mediodía, tarde). Cada horario puede ser ocupado por una persona diferente. La cuenta: 3 horarios/día × 9 días = 27 compromisos de oración. No necesitas 27 amigos cercanos; necesitas un pequeño círculo central que orará y reenviará el enlace a sus propias redes. El reenvío es como crece una cadena de oración.",
      },
      {
        title: "Comparte el enlace.",
        body: "PrayerTrain da a cada cadena una URL única. Compártela como tu familia se comunica: un mensaje a la familia inmediata, un anuncio en el boletín parroquial, una pequeña publicación en Facebook, un correo a tu grupo de oración. Cada guerrero de oración que se inscriba puede también reenviar el enlace. En 48 horas la mayoría de las cadenas para una intención simpática están al menos medio cubiertas, a menudo completamente cubiertas.",
      },
      {
        title: "Deja que la cadena fluya; recibe el ramillete.",
        body: "PrayerTrain envía recordatorios diarios suaves a cada guerrero de oración en su día de horario. La familia no administra nada — solo recibe oración. Al final de la ventana, la familia recibe un PDF de ramillete espiritual: cada guerrero de oración listado por nombre, cada oración ofrecida contada, a menudo con notas breves que los guerreros eligieron incluir. Es un recuerdo que casi siempre se vuelve parte de la historia de la familia en esta temporada.",
      },
    ],
    catholicHeading: "Arraigado en la Iglesia",
    catholicBody:
      "PrayerTrain usa solo textos de oración católicos aprobados — las oraciones reales de la Iglesia universal, tomadas de USCCB Spanish, CNBB brasileña, CBCP filipina, KEP polaca, Vatican.va y las colecciones estándar de novenas publicadas. La estructura de horario de 30 minutos refleja el precedente apostólico: nueve días de oración sostenida con María en el cenáculo antes de Pentecostés (Hechos 1,14), que se convirtió en la forma de cada novena católica desde entonces. El PDF del ramillete espiritual hace eco del ramillete católico tradicional dado como regalo de oraciones acumuladas. Nada de esto es inventado; es la vida de oración real de la Iglesia, con una capa de coordinación.",
    encouragementHeading: "Una nota de nosotros",
    encouragementBody:
      "Comenzamos PrayerTrain porque lo necesitábamos. Tres de nuestros propios hijos enfrentaron situaciones médicas graves en un período de 18 meses, y seguíamos encontrando que las personas que nos amaban querían orar pero no sabían cómo coordinarse. PrayerTrain es la herramienta que deseábamos haber tenido. Es gratis porque el amor que fluye a través de una cadena de oración no es nuestro para monetizar — es una participación en el cuidado mismo de Dios por las personas que amas.",
    faqHeading: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Pueden inscribirse personas que no son católicas?",
        a: "Sí. Los textos de oración son católicos, pero cualquier persona de buena voluntad puede ofrecer la oración (o simplemente sostener la intención ante Dios en su propia tradición). Muchas cadenas de oración incluyen amigos cristianos de otras denominaciones e incluso amigos no religiosos que quieren apoyar a la familia.",
      },
      {
        q: "¿Cuesta algo?",
        a: "No. PrayerTrain es un ministerio gratuito de Lantern Harbor LLC. Sin anuncios, sin ventas adicionales, sin nivel premium, sin futuro muro de pago. Está financiado como ministerio, no como negocio.",
      },
      {
        q: "¿Qué pasa si no sé qué oración elegir?",
        a: "Navega la biblioteca en /prayers y lee las descripciones; cada oración tiene una sección «cuándo usarla». Si aún estás indeciso, el Memorare (una oración breve y poderosa a María) o la Coronilla de la Divina Misericordia (10 minutos, rezada a las 3:00 PM) son buenos puntos de partida universales. Siempre puedes cambiar la oración a mitad de cadena si disciernes diferente.",
      },
      {
        q: "¿Debería hacer la cadena pública o privada?",
        a: "Privada es lo predeterminado. Una cadena privada solo es visible para las personas a las que das el enlace — apropiado para situaciones médicas donde la familia quiere privacidad. Una cadena pública aparece en el índice público /browse y en widgets parroquiales — apropiado cuando quieres invitar a una comunidad más amplia (y el destinatario está cómodo con eso).",
      },
      {
        q: "¿Puede ver la persona por la que se ora lo que está pasando?",
        a: "Sí, si tiene el enlace. Muchos destinatarios encuentran profundamente consolador ver la lista de guerreros llenando horarios día tras día. Algunas familias comparten el enlace con el ser querido temprano; otras comparten el PDF del ramillete espiritual al final como sorpresa.",
      },
      {
        q: "¿Qué pasa después de que termina la ventana de oración?",
        a: "El PDF del ramillete espiritual se genera automáticamente. La familia puede descargarlo, imprimirlo, enmarcarlo o compartirlo con el destinatario. La página de la cadena permanece en línea — muchas familias regresan a ella en aniversarios, particularmente la fecha de una sanación o un fallecimiento.",
      },
    ],
    ctaHeading: "Comienza cuando estés listo.",
    ctaBody:
      "Crear una cadena de oración toma unos tres minutos. No necesitas tener todas las respuestas antes de comenzar — la plataforma te guía paso a paso.",
    ctaButton: "Iniciar una cadena de oración",
  },
  "pt-BR": {
    metaTitle: "Como começar uma corrente de oração por alguém que você ama",
    metaDescription:
      "Uma forma gratuita e católica de organizar oração sustentada quando alguém está doente, morrendo ou em profunda necessidade. Passo a passo: da intenção ao buquê espiritual.",
    eyebrow: "Para famílias e amigos",
    heading: "Como começar uma corrente de oração por alguém que você ama.",
    subheading:
      "Quando um ente querido está doente, com medo ou enfrentando algo difícil, a oração geralmente é o que vem mais naturalmente — e o que se sente mais inadequado. Uma corrente de oração transforma orações dispersas em intercessão sustentada e coordenada.",
    whenHeading: "Quando uma corrente de oração faz sentido",
    whenBody:
      "Uma corrente de oração se encaixa em qualquer situação em que você quer que a oração continue ao longo do tempo — não um único rosário, mas uma corrente sustentada de intercessão. A maioria começa uma porque:",
    whenList: [
      "Um familiar ou amigo recebeu um diagnóstico médico sério (câncer, doença crônica, cirurgia, crise de saúde mental).",
      "Um ente querido está se aproximando do fim da vida e a família quer cercar o moribundo de oração.",
      "Uma gravidez é frágil — risco de aborto no primeiro trimestre, diagnóstico pré-natal, bebê na UTI neonatal.",
      "Um casamento está em crise ou uma família está passando por uma separação difícil.",
      "Um ente querido deixou a fé e a família reza pelo seu retorno — intercessão de longo prazo (Santa Mônica rezou por Agostinho por 17 anos).",
      "Alguém está se preparando para um Sacramento, uma decisão de vida importante, o discernimento de uma vocação ou um destacamento militar.",
    ],
    stepsHeading: "Passo a passo",
    steps: [
      {
        title: "Decida por quem você está rezando e por quê.",
        body: "Uma corrente de oração precisa de um nome — a pessoa que você ama — e uma intenção. A intenção é o que você pede a Deus: cura do corpo, paz do coração, parto seguro, morte santa, a conversão de um filho errante. Seja específico. A clareza ajuda quem reza a entrar no pedido em vez de oferecer algo vago.",
      },
      {
        title: "Escolha uma janela de oração.",
        body: "A maioria das correntes de oração dura um tempo finito — dias, semanas, às vezes meses. Uma novena de 9 dias, a duração de um ciclo de quimio, as semanas antes de uma cirurgia, os 33 dias antes de uma decisão importante. O limite importa: oração indefinida se torna difusa; oração delimitada mantém sua forma e termina com uma sensação de conclusão.",
      },
      {
        title: "Escolha a oração.",
        body: "O PrayerTrain oferece mais de 50 orações católicas: novenas (São José, Sagrado Coração, Divina Misericórdia, Novena do Abandono), o rosário, a Coroinha da Divina Misericórdia, ladainhas, orações breves. Se a situação é médica, a Coroinha da Divina Misericórdia às 15h00 é tradicional. Se envolve discernimento, a Novena ao Espírito Santo. Se conversão, a Oração pela Conversão de um Ente Querido. Escolha o que se ajusta à vida de oração da família e à situação do ente querido. Você também pode combinar uma oração diária com uma novena de 9 dias para uma espinha mais forte.",
      },
      {
        title: "Defina o número de horários diários.",
        body: "O PrayerTrain divide cada dia em horários de oração de 30 minutos. Escolha quantos horários por dia você quer cobertos — três é o ponto de partida comum (manhã, meio-dia, tarde). Cada horário pode ser preenchido por uma pessoa diferente. A conta: 3 horários/dia × 9 dias = 27 compromissos de oração. Você não precisa de 27 amigos próximos; precisa de um pequeno círculo central que rezará e encaminhará o link para suas próprias redes. O encaminhamento é como uma corrente de oração cresce.",
      },
      {
        title: "Compartilhe o link.",
        body: "O PrayerTrain dá a cada corrente uma URL única. Compartilhe-a como sua família se comunica: uma mensagem para a família imediata, um anúncio no boletim paroquial, uma pequena postagem no Facebook, um e-mail para seu grupo de oração. Cada guerreiro de oração que se inscreve pode também encaminhar o link. Em 48 horas a maioria das correntes para uma intenção simpática está pelo menos meio coberta, frequentemente totalmente coberta.",
      },
      {
        title: "Deixe a corrente fluir; receba o buquê.",
        body: "O PrayerTrain envia lembretes diários suaves a cada guerreiro de oração no dia do seu horário. A família não administra nada — apenas recebe oração. Ao final da janela, a família recebe um PDF de buquê espiritual: cada guerreiro de oração listado pelo nome, cada oração oferecida contada, frequentemente com notas breves que os guerreiros escolheram incluir. É uma lembrança que quase sempre se torna parte da história da família nessa temporada.",
      },
    ],
    catholicHeading: "Enraizado na Igreja",
    catholicBody:
      "O PrayerTrain usa apenas textos de oração católicos aprovados — as orações reais da Igreja universal, tirados de USCCB espanhol, CNBB, CBCP filipino, KEP polaco, Vatican.va e as coleções padrão de novenas publicadas. A estrutura de horário de 30 minutos espelha o precedente apostólico: nove dias de oração sustentada com Maria no cenáculo antes de Pentecostes (Atos 1,14), que se tornou a forma de toda novena católica desde então. O PDF do buquê espiritual ecoa o tradicional buquê católico dado como presente de orações acumuladas. Nada disso é inventado; é a vida real de oração da Igreja, com uma camada de coordenação.",
    encouragementHeading: "Uma nota nossa",
    encouragementBody:
      "Começamos o PrayerTrain porque precisávamos dele. Três dos nossos próprios filhos enfrentaram situações médicas sérias em um período de 18 meses, e continuávamos descobrindo que as pessoas que nos amavam queriam rezar mas não sabiam como se coordenar. O PrayerTrain é a ferramenta que gostaríamos de ter tido. É gratuito porque o amor que flui através de uma corrente de oração não é nosso para monetizar — é uma participação no próprio cuidado de Deus pelas pessoas que você ama.",
    faqHeading: "Perguntas frequentes",
    faqs: [
      {
        q: "Pessoas não católicas podem se inscrever em um horário de oração?",
        a: "Sim. Os textos de oração são católicos, mas qualquer pessoa de boa vontade pode oferecer a oração (ou simplesmente sustentar a intenção diante de Deus em sua própria tradição). Muitas correntes de oração incluem amigos cristãos de outras denominações e até amigos não religiosos que querem apoiar a família.",
      },
      {
        q: "Custa alguma coisa?",
        a: "Não. O PrayerTrain é um ministério gratuito da Lantern Harbor LLC. Sem anúncios, sem upsells, sem nível premium, sem futuro paywall. É financiado como ministério, não como negócio.",
      },
      {
        q: "E se eu não souber qual oração escolher?",
        a: "Navegue pela biblioteca em /prayers e leia as descrições; cada oração tem uma seção «quando usá-la». Se ainda estiver incerto, o Lembrai-vos (uma oração breve e poderosa a Maria) ou a Coroinha da Divina Misericórdia (10 minutos, rezada às 15h00) são bons pontos de partida universais. Você sempre pode mudar a oração no meio da corrente se discernir diferente.",
      },
      {
        q: "Devo tornar a corrente pública ou privada?",
        a: "Privada é o padrão. Uma corrente privada só é visível para pessoas a quem você dá o link — apropriado para situações médicas em que a família quer privacidade. Uma corrente pública aparece no índice público /browse e em widgets paroquiais — apropriado quando você quer convidar uma comunidade mais ampla (e o destinatário está confortável com isso).",
      },
      {
        q: "A pessoa pela qual se reza pode ver o que está acontecendo?",
        a: "Sim, se ela tiver o link. Muitos destinatários acham profundamente consolador ver a lista de guerreiros preenchendo horários dia após dia. Algumas famílias compartilham o link com o ente querido cedo; outras compartilham o PDF do buquê espiritual no final como surpresa.",
      },
      {
        q: "O que acontece depois que a janela de oração termina?",
        a: "O PDF do buquê espiritual é gerado automaticamente. A família pode baixá-lo, imprimi-lo, emoldurá-lo ou compartilhá-lo com o destinatário. A página da corrente permanece online — muitas famílias voltam a ela em aniversários, particularmente a data de uma cura ou um falecimento.",
      },
    ],
    ctaHeading: "Comece quando estiver pronto.",
    ctaBody:
      "Criar uma corrente de oração leva cerca de três minutos. Você não precisa ter todas as respostas antes de começar — a plataforma te guia passo a passo.",
    ctaButton: "Começar uma corrente de oração",
  },
  fil: {
    metaTitle: "Paano magsimula ng prayer train para sa mahal mo",
    metaDescription:
      "Isang libre at Katolikong paraan upang ayusin ang patuloy na panalangin kapag may maysakit, naghihingalo, o nasa malalim na pangangailangan. Hakbang-hakbang: mula intensyon hanggang spiritual bouquet.",
    eyebrow: "Para sa mga pamilya at kaibigan",
    heading: "Paano magsimula ng prayer train para sa mahal mo.",
    subheading:
      "Kapag ang isang mahal sa buhay ay maysakit, takot, o humaharap sa isang bagay na mahirap, ang panalangin ay madalas ang pinakanatural na lumalabas — at ang pinakanaaakit na hindi sapat. Ang prayer train ay nagbabago ng nakakalat na mga panalangin sa patuloy at coordinated na pamamagitan.",
    whenHeading: "Kailan may saysay ang prayer train",
    whenBody:
      "Ang prayer train ay angkop sa anumang sitwasyon kung saan gusto mong magpatuloy ang panalangin sa paglipas ng panahon — hindi isang rosaryo lang, kundi patuloy na hanay ng pamamagitan. Karamihan ay nagsisimula dahil:",
    whenList: [
      "Isang miyembro ng pamilya o kaibigan ay nakatanggap ng malubhang medikal na diyagnosis (kanser, talamak na sakit, operasyon, mental-health crisis).",
      "Isang mahal sa buhay ay papalapit sa katapusan ng buhay at nais ng pamilya na mapalibutan ng panalangin ang naghihingalo.",
      "Isang pagbubuntis ay mahina — peligro ng pagkalaglag sa unang trimester, prenatal na diyagnosis, sanggol sa NICU.",
      "Isang kasal ay nasa krisis o isang pamilya ay dumadaan sa mahirap na paghihiwalay.",
      "Isang mahal sa buhay ay nag-iwan ng pananampalataya at ang pamilya ay nagdadasal para sa kanilang pagbabalik — mahabang panahon na pamamagitan (si Santa Monica ay nagdasal para kay Agustin sa loob ng 17 taon).",
      "May naghahanda para sa isang Sakramento, isang mahalagang desisyon sa buhay, ang pagdidiskimini ng bokasyon, o isang deployment.",
    ],
    stepsHeading: "Hakbang-hakbang",
    steps: [
      {
        title: "Magpasya kung sino ang ipinagdadasal at para saan.",
        body: "Ang prayer train ay kailangan ng pangalan — ang taong mahal mo — at intensyon. Ang intensyon ay kung ano ang hinihiling mo sa Diyos: paggaling ng katawan, kapayapaan ng puso, ligtas na panganganak, banal na kamatayan, ang pagbabago ng nagpapagala-galang anak. Maging tiyak. Tinutulungan ng kalinawan ang mga nagdadasal na pumasok sa kahilingan sa halip na mag-alay ng mahabu-habo.",
      },
      {
        title: "Pumili ng prayer window.",
        body: "Karamihan sa mga prayer train ay tumatakbo sa loob ng nakatakdang panahon — araw, linggo, minsan buwan. Isang 9-na-araw na nobena, ang tagal ng cycle ng chemo, ang mga linggo bago ang operasyon, ang 33 araw bago ang malaking desisyon. Mahalaga ang hangganan: ang walang-katapusang panalangin ay nagiging madilim; ang nakatakdang panalangin ay pinapanatili ang hugis nito at nagtatapos nang may damdamin ng pagtatapos.",
      },
      {
        title: "Piliin ang panalangin.",
        body: "Nag-aalok ang PrayerTrain ng mahigit 50 Katolikong panalangin: mga nobena (San Jose, Banal na Puso, Banal na Awa, Surrender Novena), ang rosaryo, ang Koronilya ng Awa ng Diyos, mga litanya, mga maikling panalangin. Kung medikal ang sitwasyon, ang Koronilya ng Awa ng Diyos sa 3:00 PM ang tradisyonal. Kung may discernment, ang Nobena sa Banal na Espiritu. Kung pagbabago, ang Panalangin para sa Pagbabago ng Mahal sa Buhay. Pumili ng nababagay sa prayer-life ng pamilya at sa sitwasyon ng mahal sa buhay. Pwede mo ring ipares ang pang-araw-araw na panalangin sa 9-na-araw na nobena para sa mas malakas na haligi.",
      },
      {
        title: "Itakda ang bilang ng mga slot bawat araw.",
        body: "Hinahati ng PrayerTrain ang bawat araw sa mga 30-minutong prayer slot. Pumili kung ilang slot bawat araw ang gusto mong takpan — tatlo ang karaniwang panimula (umaga, tanghali, gabi). Ang bawat slot ay maaaring punan ng ibang tao. Ang sentido: 3 slot/araw × 9 araw = 27 prayer commitment. Hindi mo kailangan ng 27 malapit na kaibigan; kailangan mo ng maliit na pangunahing bilog na magdadasal at magpapasa ng link sa sarili nilang network. Ang pagpapasa ang paraan ng paglago ng prayer train.",
      },
      {
        title: "Ibahagi ang link.",
        body: "Nagbibigay ang PrayerTrain sa bawat train ng natatanging URL. Ibahagi ito sa paraan ng pakikipag-usap ng iyong pamilya: text sa pinakamalapit na pamilya, anunsyo sa parokyang bulletin, maliit na post sa Facebook, email sa iyong prayer group. Ang bawat prayer warrior na nag-sign-up ay maaari ring magpasa ng link. Sa loob ng 48 oras karamihan sa prayer train para sa isang nakaaaliw na intensyon ay halos kalahating napunan, madalas na kompletong napunan.",
      },
      {
        title: "Hayaang umagos ang train; tanggapin ang bouquet.",
        body: "Nagpapadala ang PrayerTrain ng banayad na pang-araw-araw na paalala sa bawat prayer warrior sa araw ng kanilang slot. Walang pinangangasiwaan ang pamilya — tumatanggap lang sila ng panalangin. Sa katapusan ng window, tumatanggap ang pamilya ng spiritual-bouquet PDF: bawat prayer warrior nakalista sa pangalan, bawat panalangin inialay ay binilang, madalas na may maikling mga tala na pinili ng mga warrior na isama. Ito ay isang alaala na halos palaging nagiging bahagi ng kasaysayan ng pamilya sa panahong ito.",
      },
    ],
    catholicHeading: "Nakaugat sa Simbahan",
    catholicBody:
      "Gumagamit ang PrayerTrain ng mga aprubadong Katolikong teksto ng panalangin lamang — ang mga totoong panalangin ng pandaigdigang Simbahan, kinuha mula sa USCCB Spanish, CNBB Brazilian, CBCP Filipino, KEP Polish, Vatican.va, at standard na mga koleksyon ng nobena. Ang istraktura ng 30-minutong slot ay sumasalamin sa apostolikong precedent: siyam na araw ng patuloy na panalangin kasama si Maria sa silid sa itaas bago ang Pentekostes (Mga Gawa 1:14), na naging anyo ng bawat Katolikong nobena mula noon. Ang PDF ng spiritual bouquet ay sumasalamin sa tradisyonal na Katolikong bouquet na ibinibigay bilang regalo ng inipong panalangin. Walang inimbento; ito ang totoong buhay-panalangin ng Simbahan, na may layer ng coordination.",
    encouragementHeading: "Isang tala mula sa amin",
    encouragementBody:
      "Sinimulan namin ang PrayerTrain dahil kailangan namin ito. Tatlo sa aming mga anak ay humarap sa malulubhang medikal na sitwasyon sa loob ng 18-na-buwang panahon, at patuloy naming nakikitang ang mga taong nagmamahal sa amin ay gustong magdasal pero hindi alam kung paano mag-coordinate. Ang PrayerTrain ay ang kasangkapang sana ay nakapagsamantala namin. Libre ito dahil ang pag-ibig na umaagos sa isang prayer train ay hindi sa amin upang pagkakitaan — ito ay pakikilahok sa sariling pag-aalaga ng Diyos para sa mga taong mahal mo.",
    faqHeading: "Mga karaniwang tanong",
    faqs: [
      {
        q: "Pwede bang mag-sign up sa prayer slot ang mga hindi Katoliko?",
        a: "Oo. Katoliko ang mga teksto ng panalangin, pero ang sinumang taong may mabuting kalooban ay pwedeng mag-alay ng panalangin (o panatilihin lang ang intensyon sa harap ng Diyos sa sariling tradisyon). Maraming prayer train ang naglalaman ng mga Kristiyanong kaibigan ng ibang denomination at maging mga di-relihiyosong kaibigan na gustong suportahan ang pamilya.",
      },
      {
        q: "May halaga ba?",
        a: "Wala. Ang PrayerTrain ay isang libreng ministeryo ng Lantern Harbor LLC. Walang ads, walang upsells, walang premium tier, walang hinaharap na paywall. Pinopondohan ito bilang ministeryo, hindi bilang negosyo.",
      },
      {
        q: "Paano kung hindi ko alam kung anong panalangin ang pipiliin?",
        a: "I-browse ang library sa /prayers at basahin ang mga paglalarawan; ang bawat panalangin ay may seksyong «kailan gamitin». Kung wala ka pa ring kasiguruhan, ang Memorare (maikling at makapangyarihang panalangin kay Maria) o ang Koronilya ng Awa ng Diyos (10 minuto, idinarasal sa 3:00 PM) ay mabubuting unibersal na panimula. Pwede mong palaging baguhin ang panalangin sa gitna ng train kung iba ang iyong discernment.",
      },
      {
        q: "Dapat ko bang gawing public o private ang prayer train?",
        a: "Private ang default. Ang private train ay nakikita lamang ng mga taong binibigyan mo ng link — angkop para sa mga medikal na sitwasyon kung saan gusto ng pamilya ang privacy. Ang public train ay lumalabas sa public /browse index at sa parish-embed widget — angkop kapag gusto mong anyayahan ang mas malawak na komunidad (at komportable ang tatanggap).",
      },
      {
        q: "Makikita ba ng pinagdadasalan kung ano ang nangyayari?",
        a: "Oo, kung mayroon silang link. Maraming tatanggap ang nakakaramdam ng malalim na aliw sa pagkita ng listahan ng mga warrior na pumupuno ng slot araw-araw. Iba ang nagbabahagi ng link nang maaga sa mahal sa buhay; iba naman ang nagbabahagi ng spiritual-bouquet PDF sa katapusan bilang sorpresa.",
      },
      {
        q: "Ano ang nangyayari pagkatapos ng prayer window?",
        a: "Awtomatikong nabubuo ang spiritual-bouquet PDF. Maaaring i-download, i-print, i-frame, o ibahagi ito ng pamilya sa tatanggap. Mananatiling online ang prayer train page mismo — maraming pamilya ang bumabalik dito sa anibersaryo, lalo na ang petsa ng paggaling o pagpanaw.",
      },
    ],
    ctaHeading: "Magsimula kapag handa ka na.",
    ctaBody:
      "Tatlong minuto lang ang paglikha ng prayer train. Hindi mo kailangang malaman lahat ng sagot bago magsimula — ang platform ang gagabay sa iyo sa bawat hakbang.",
    ctaButton: "Magsimula ng prayer train",
  },
  pl: {
    metaTitle: "Jak rozpocząć modlitwę za kogoś, kogo kochasz",
    metaDescription:
      "Bezpłatny, katolicki sposób organizowania trwałej modlitwy, gdy ktoś jest chory, umiera lub w głębokiej potrzebie. Krok po kroku: od intencji do duchowego bukietu.",
    eyebrow: "Dla rodzin i przyjaciół",
    heading: "Jak rozpocząć łańcuch modlitwy za kogoś, kogo kochasz.",
    subheading:
      "Gdy bliska osoba jest chora, przestraszona lub stawia czoła czemuś trudnemu, modlitwa jest często tym, co przychodzi najnaturalniej — i co wydaje się najbardziej niewystarczające. Łańcuch modlitwy zamienia rozproszone modlitwy w trwałe, skoordynowane wstawiennictwo.",
    whenHeading: "Kiedy łańcuch modlitwy ma sens",
    whenBody:
      "Łańcuch modlitwy pasuje do każdej sytuacji, w której chcesz, aby modlitwa trwała w czasie — nie pojedynczy różaniec, ale trwały łańcuch wstawiennictwa. Większość zaczyna jeden, ponieważ:",
    whenList: [
      "Członek rodziny lub przyjaciel otrzymał poważną diagnozę medyczną (rak, choroba przewlekła, operacja, kryzys zdrowia psychicznego).",
      "Bliska osoba zbliża się do końca życia i rodzina chce, aby umierającego otaczała modlitwa.",
      "Ciąża jest delikatna — ryzyko poronienia w pierwszym trymestrze, diagnoza prenatalna, dziecko w OIT noworodków.",
      "Małżeństwo jest w kryzysie lub rodzina przechodzi przez trudne rozstanie.",
      "Bliski opuścił wiarę i rodzina modli się o jego powrót — wstawiennictwo długoterminowe (Święta Monika modliła się za Augustyna 17 lat).",
      "Ktoś przygotowuje się do Sakramentu, ważnej decyzji życiowej, rozeznania powołania lub wyjazdu służbowego.",
    ],
    stepsHeading: "Krok po kroku",
    steps: [
      {
        title: "Zdecyduj, za kogo się modlisz i o co.",
        body: "Łańcuch modlitwy potrzebuje imienia — osoby, którą kochasz — i intencji. Intencja to to, o co prosisz Boga: uzdrowienie ciała, pokój serca, bezpieczny poród, święta śmierć, nawrócenie błądzącego dziecka. Bądź konkretny. Jasność pomaga modlącym się wejść w prośbę zamiast oferować coś ogólnikowego.",
      },
      {
        title: "Wybierz okno modlitwy.",
        body: "Większość łańcuchów modlitwy trwa skończony czas — dni, tygodnie, czasem miesiące. 9-dniowa nowenna, czas trwania cyklu chemioterapii, tygodnie przed operacją, 33 dni przed ważną decyzją. Granica ma znaczenie: modlitwa bez końca staje się rozproszona; modlitwa ograniczona zachowuje swoją formę i kończy się odczuwalnym zakończeniem.",
      },
      {
        title: "Wybierz modlitwę.",
        body: "PrayerTrain oferuje ponad 50 katolickich modlitw: nowenny (do św. Józefa, Najświętszego Serca, Bożego Miłosierdzia, nowenna Skonałeś), różaniec, Koronka do Miłosierdzia Bożego, litanie, krótkie modlitwy. Jeśli sytuacja jest medyczna, Koronka do Miłosierdzia Bożego o 15:00 jest tradycyjna. Jeśli dotyczy rozeznania, Nowenna do Ducha Świętego. Jeśli nawrócenia, Modlitwa o Nawrócenie Bliskiego. Wybierz to, co pasuje do życia modlitewnego rodziny i sytuacji bliskiego. Możesz też połączyć codzienną modlitwę z 9-dniową nowenną dla silniejszego trzonu.",
      },
      {
        title: "Określ liczbę dziennych okien.",
        body: "PrayerTrain dzieli każdy dzień na 30-minutowe okna modlitwy. Wybierz, ile okien dziennie chcesz pokrytych — trzy to powszechny punkt startowy (rano, południe, wieczór). Każde okno może wypełnić inna osoba. Rachunek: 3 okna/dzień × 9 dni = 27 zobowiązań modlitewnych. Nie potrzebujesz 27 bliskich przyjaciół; potrzebujesz małego rdzennego kręgu, który będzie się modlić i przekaże link do swoich sieci. Przekazywanie to sposób, w jaki rośnie łańcuch modlitwy.",
      },
      {
        title: "Udostępnij link.",
        body: "PrayerTrain nadaje każdemu łańcuchowi unikalny URL. Udostępnij go tak, jak komunikuje się twoja rodzina: wiadomość do najbliższej rodziny, ogłoszenie w biuletynie parafialnym, mały post na Facebooku, e-mail do twojej grupy modlitewnej. Każdy wojownik modlitwy, który się zapisze, może również przekazać link. W ciągu 48 godzin większość łańcuchów dla sympatycznej intencji jest co najmniej w połowie zajęta, często w pełni zajęta.",
      },
      {
        title: "Pozwól łańcuchowi działać; odbierz bukiet.",
        body: "PrayerTrain wysyła łagodne codzienne przypomnienia do każdego wojownika modlitwy w dniu jego okna. Rodzina niczym nie zarządza — po prostu otrzymuje modlitwę. Pod koniec okna rodzina dostaje PDF z duchowym bukietem: każdy wojownik modlitwy wymieniony po imieniu, każda ofiarowana modlitwa policzona, często z krótkimi notatkami, które wojownicy zdecydowali się włączyć. To pamiątka, która niemal zawsze staje się częścią historii rodziny w tym okresie.",
      },
    ],
    catholicHeading: "Zakorzenione w Kościele",
    catholicBody:
      "PrayerTrain używa tylko zatwierdzonych katolickich tekstów modlitewnych — rzeczywistych modlitw powszechnego Kościoła, zaczerpniętych z USCCB hiszpańskiego, CNBB brazylijskiego, CBCP filipińskiego, KEP polskiego, Vatican.va i standardowych wydanych kolekcji nowenn. Struktura 30-minutowych okien odzwierciedla precedens apostolski: dziewięć dni trwałej modlitwy z Maryją w wieczerniku przed Pięćdziesiątnicą (Dz 1,14), która stała się formą każdej katolickiej nowenny od tamtej pory. PDF z duchowym bukietem nawiązuje do tradycyjnego katolickiego bukietu dawanego jako dar nagromadzonych ofiarowań modlitewnych. Nic z tego nie zostało wymyślone; to rzeczywiste życie modlitewne Kościoła, z warstwą koordynacji.",
    encouragementHeading: "Słowo od nas",
    encouragementBody:
      "Założyliśmy PrayerTrain, bo go potrzebowaliśmy. Troje naszych własnych dzieci stanęło wobec poważnych sytuacji medycznych w ciągu 18 miesięcy, i wciąż odkrywaliśmy, że ludzie, którzy nas kochali, chcieli się modlić, ale nie wiedzieli, jak się skoordynować. PrayerTrain to narzędzie, które chcielibyśmy mieć. Jest bezpłatne, ponieważ miłość, która płynie przez łańcuch modlitwy, nie jest nasza do monetyzacji — jest udziałem w samej trosce Boga o ludzi, których kochasz.",
    faqHeading: "Najczęściej zadawane pytania",
    faqs: [
      {
        q: "Czy osoby niekatolickie mogą zapisać się na okno modlitwy?",
        a: "Tak. Teksty modlitw są katolickie, ale każdy człowiek dobrej woli może ofiarować modlitwę (lub po prostu trzymać intencję przed Bogiem we własnej tradycji). Wiele łańcuchów modlitwy obejmuje chrześcijańskich przyjaciół innych wyznań, a nawet niereligijnych przyjaciół, którzy chcą wesprzeć rodzinę.",
      },
      {
        q: "Czy to coś kosztuje?",
        a: "Nie. PrayerTrain jest bezpłatnym posługą Lantern Harbor LLC. Bez reklam, bez upsellów, bez wersji premium, bez przyszłej blokady płatnej. Jest finansowany jako posługa, a nie jako biznes.",
      },
      {
        q: "Co jeśli nie wiem, jaką modlitwę wybrać?",
        a: "Przejrzyj bibliotekę w /prayers i przeczytaj opisy; każda modlitwa ma sekcję «kiedy jej używać». Jeśli wciąż jesteś niepewny, Pomnij (krótka, potężna modlitwa do Maryi) lub Koronka do Miłosierdzia Bożego (10 minut, odmawiana o 15:00) to dobre uniwersalne punkty startowe. Zawsze możesz zmienić modlitwę w środku łańcucha, jeśli rozeznasz inaczej.",
      },
      {
        q: "Czy łańcuch ma być publiczny czy prywatny?",
        a: "Prywatny jest domyślnie. Prywatny łańcuch jest widoczny tylko dla osób, którym dasz link — odpowiednie dla sytuacji medycznych, gdy rodzina chce prywatności. Publiczny łańcuch pojawia się w indeksie /browse i w widżetach parafialnych — odpowiednie, gdy chcesz zaprosić szerszą wspólnotę (a odbiorca czuje się z tym komfortowo).",
      },
      {
        q: "Czy osoba, za którą się modlimy, może zobaczyć, co się dzieje?",
        a: "Tak, jeśli ma link. Wielu odbiorców znajduje głębokie pocieszenie w widzeniu listy wojowników wypełniających okna dzień po dniu. Niektóre rodziny dzielą się linkiem z bliskim wcześnie; inne dzielą się PDF-em z duchowym bukietem na końcu jako niespodziankę.",
      },
      {
        q: "Co się dzieje po zakończeniu okna modlitwy?",
        a: "PDF z duchowym bukietem jest generowany automatycznie. Rodzina może go pobrać, wydrukować, oprawić lub udostępnić odbiorcy. Strona łańcucha pozostaje online — wiele rodzin wraca do niej w rocznice, szczególnie w datę uzdrowienia lub odejścia.",
      },
    ],
    ctaHeading: "Zacznij, gdy będziesz gotowy.",
    ctaBody:
      "Stworzenie łańcucha modlitwy zajmuje około trzech minut. Nie musisz znać wszystkich odpowiedzi, zanim zaczniesz — platforma prowadzi cię przez każdy krok.",
    ctaButton: "Rozpocznij łańcuch modlitwy",
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
  const baseUrl = getBaseUrl();
  return localizedMetadata({
    locale,
    path: "/how-to-start-a-prayer-train",
    title: t.metaTitle,
    description: t.metaDescription,
    absoluteTitle: true,
    ogImage: `${baseUrl}/${locale}/how-to-start-a-prayer-train/opengraph-image`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
  });
}

export default async function HowToStartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = COPY[locale];

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
        <p className="text-lg text-foreground max-w-2xl mx-auto">
          {t.subheading}
        </p>
      </div>

      <CrossDivider className="mb-12" />

      {/* When */}
      <section className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-navy-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-navy-700" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-navy-800 mb-3">
              {t.whenHeading}
            </h2>
            <p className="text-foreground/90 leading-relaxed">{t.whenBody}</p>
          </div>
        </div>
        <ul className="space-y-3 ml-16">
          {t.whenList.map((item, i) => (
            <li key={i} className="flex gap-3 text-foreground/90">
              <span className="shrink-0 text-gold-500 font-bold mt-1">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Steps */}
      <section className="mb-12">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-navy-100 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-navy-700" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-navy-800">
            {t.stepsHeading}
          </h2>
        </div>
        <ol className="space-y-6 ml-16">
          {t.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="shrink-0 w-8 h-8 rounded-full bg-gold-100 text-gold-700 font-bold flex items-center justify-center text-sm">
                {i + 1}
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-navy-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-foreground/90 leading-relaxed">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Catholic-rootedness */}
      <section className="mb-12 bg-cream-50 border border-cream-200 rounded-2xl p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-gold-100 flex items-center justify-center">
            <CrossIcon className="w-6 h-6 text-gold-600" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-navy-800 mb-3">
              {t.catholicHeading}
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              {t.catholicBody}
            </p>
          </div>
        </div>
      </section>

      {/* Founder note */}
      <section className="mb-12">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-navy-100 flex items-center justify-center">
            <SacredHeartIcon className="w-6 h-6 text-gold-500" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-navy-800 mb-3">
              {t.encouragementHeading}
            </h2>
            <p className="text-foreground/90 leading-relaxed italic">
              {t.encouragementBody}
            </p>
          </div>
        </div>
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
        <CandleIcon className="w-10 h-10 text-gold-500 mx-auto mb-4" />
        <h2 className="font-heading text-2xl font-bold text-navy-800 mb-3">
          {t.ctaHeading}
        </h2>
        <p className="text-foreground/90 mb-6 max-w-2xl mx-auto">
          {t.ctaBody}
        </p>
        <Link
          href="/create/train"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 transition-colors"
        >
          {t.ctaButton}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* JSON-LD: HowTo + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "HowTo",
                inLanguage: locale,
                name: t.heading,
                description: t.subheading,
                step: t.steps.map((step, i) => ({
                  "@type": "HowToStep",
                  position: i + 1,
                  name: step.title,
                  text: step.body,
                })),
              },
              {
                "@type": "FAQPage",
                inLanguage: locale,
                mainEntity: t.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: { "@type": "Answer", text: faq.a },
                })),
              },
            ],
          }),
        }}
      />
    </div>
  );
}
