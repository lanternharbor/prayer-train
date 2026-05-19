/**
 * Per-locale overrides for `./content.ts`.
 *
 * Track D from the implementation plan. The English content.ts is
 * canonical; per-locale variants in this file override it for non-
 * English locales. When a topic has no locale override,
 * `getSituationContent(locale, topic)` falls back to English.
 *
 * Editorial policy (per docs/seo-international-ops.md hard guidelines):
 * - Pastoral content is locale-adapted, not literal-translated. Each
 *   variant uses devotional register appropriate to the locale's
 *   Catholic culture.
 * - Prayer slugs are NOT translated. /es/prayers/surrender-novena and
 *   /en/prayers/surrender-novena share the same slug per the
 *   src/i18n/links.ts strategy. The `why` text is locale-specific.
 * - No outcome promises, no "if you pray hard enough" — same tone
 *   discipline as content.ts.
 * - Boston Children's Hospital + Massachusetts founding-story
 *   references stay in /our-story; this file is the situation cluster.
 * - All drafts in this file are Claude-authored and FLAGGED for
 *   native review per docs/translation-review-tracker.md.
 *
 * Cultural-anchor saints by locale + topic (added to pastoralNote /
 * FAQ where natural):
 * - es: San Peregrino (cancer), San Lucas (surgery), Nuestra Señora
 *   de los Dolores (grief), Santa Mónica + San Agustín (addiction),
 *   Santa Ana y San Joaquín (infertility), Niño Jesús de Praga
 *   (sick child)
 * - pt-BR: São Peregrino (cancer), São Lucas (surgery), Nossa
 *   Senhora das Dores (grief), Santo Agostinho (addiction),
 *   Sant'Ana e São Joaquim (infertility), Menino Jesus de Praga
 *   (sick child)
 * - fil: Santo Niño de Cebú (cancer/sick child), San Lucas (surgery),
 *   Mater Dolorosa (grief), San Agustin (addiction), Sta. Ana
 *   (infertility)
 * - pl: Św. Peregryn (cancer), Św. Łukasz (surgery), Matka Boża
 *   Bolesna (grief), Św. Augustyn / Św. Monika (addiction),
 *   Św. Anna i Joachim (infertility), Dzieciątko Jezus z Pragi
 *   (sick child)
 */

import type { Locale } from "@/i18n/config";
import { SITUATIONS, type SituationContent } from "./content";

// ─────────────────────────────────────────────────────────────────
// CANCER
// ─────────────────────────────────────────────────────────────────

const cancerEs: SituationContent = {
  topic: "cancer",
  title: "Oraciones católicas por un amigo con cáncer",
  description:
    "Oraciones, novenas y formas de organizar la cobertura de oración para alguien que enfrenta un diagnóstico o tratamiento de cáncer. De la biblioteca de oraciones católicas de PrayerTrain.",
  h1: "Oraciones católicas por un amigo con cáncer",
  lead: "Cuando alguien a quien amas ha sido diagnosticado con cáncer, los días que siguen pueden hacer sentir que no hay nada que puedas hacer. La oración es una de las cosas que sí puedes hacer. Las oraciones a continuación son algunas de las que la Iglesia nos ha dado para momentos como este. Ninguna de ellas es una garantía de sanación. Todas son una manera de acompañar a la persona que amas, ante Dios, cada día que atraviesa esto.",
  prayers: [
    { slug: "novena-sacred-heart", why: "El Sagrado Corazón de Cristo es el patrono de la Iglesia para los que sufren. Rezar esta novena de nueve días por alguien con cáncer pone su enfermedad en el lugar donde la devoción católica se encuentra más directamente con el dolor humano." },
    { slug: "surrender-novena", why: "Los nueve días de confianza radical de Don Dolindo Ruotolo están escritos precisamente para el momento en que un diagnóstico le quita el volante a la familia. El estribillo de los nueve días es: «Oh Jesús, me entrego a Ti, encárgate Tú de todo»." },
    { slug: "rosary-for-healing", why: "El Rosario, rezado con la intención de sanación, es una de las respuestas católicas más antiguas al sufrimiento físico. La intercesión de María es la corriente firme debajo de cada decena." },
    { slug: "psalm-91", why: "El que habita al amparo del Altísimo mora a la sombra del Todopoderoso. El Salmo 91 ha sido la oración de los enfermos y de quienes los aman durante miles de años." },
    { slug: "memorare", why: "Acuérdate, oh piadosísima Virgen María, que jamás se ha oído decir que ninguno de los que han acudido a tu protección haya sido desamparado. Una oración breve y firme que cabe en cualquier momento de sala de espera o cabecera de hospital." },
  ],
  pastoralNote: "La oración católica por los enfermos no es una transacción. No rezamos mejores oraciones para obtener mejores resultados. Lo que hacemos es seguir presentándonos, con palabras que la Iglesia nos ha dado, ante un Dios que también sufrió y que está presente en cada cabecera, sintamos o no Su presencia. San Peregrino, patrono de los enfermos de cáncer, es un compañero especial en este camino.",
  prayTogetherLead: "Si quieres reunir a otros, un PrayerTrain te permite construir un calendario de oración para tu ser querido. Amigos y familia eligen oraciones específicas en días específicos, reciben un recordatorio diario, y al final tienes un calendario de cobertura continua que puedes entregar a la persona por quien estás orando.",
  faqs: [
    { question: "¿Cuál es la mejor oración católica para alguien con cáncer?", answer: "No existe una única mejor oración. La Novena al Sagrado Corazón, la Novena de la Rendición y el Rosario por la Sanación son oraciones católicas tradicionalmente ofrecidas por enfermedades graves. La oración correcta suele ser la que realmente vas a rezar cada día. Elige aquella cuyas palabras se sientan adecuadas para la persona y rézala con constancia." },
    { question: "¿Debo decirle a la persona con cáncer que estamos orando por ella?", answer: "Sí, casi siempre. Saber que están siendo objeto de oración es una de las pocas cosas que sostiene a alguien que enfrenta una enfermedad grave. La excepción es si han pedido específicamente no ser informados (algunas personas lo encuentran abrumador durante el tratamiento). Respeta lo que han pedido." },
    { question: "¿Y si no sé qué orar por ellos, o estoy enojado con Dios por el diagnóstico?", answer: "Reza de todos modos. Los Salmos incluyen el lenguaje más feroz de las Escrituras (ver Salmo 22, 88). La tradición católica siempre ha hecho lugar para oraciones que vienen de la ira, la confusión y la sensación de la ausencia de Dios. Presentarse importa más que la elocuencia." },
    { question: "¿Por cuánto tiempo debemos seguir orando por ellos?", answer: "Mientras dure la situación. El tratamiento del cáncer rara vez es una carrera de velocidad. Un PrayerTrain que funcione durante una sola ronda de tratamiento, y luego se renueve, es un patrón de la tradición católica (piensa en cómo los israelitas oraron continuamente durante el Éxodo). No hay fecha de caducidad para la intercesión." },
  ],
};

const cancerPtBR: SituationContent = {
  topic: "cancer",
  title: "Orações católicas por um amigo com câncer",
  description: "Orações, novenas e formas de organizar a cobertura de oração por alguém enfrentando um diagnóstico ou tratamento de câncer. Da biblioteca de orações católicas do PrayerTrain.",
  h1: "Orações católicas por um amigo com câncer",
  lead: "Quando alguém que você ama recebe um diagnóstico de câncer, os dias que se seguem podem parecer que não há nada que você possa fazer. A oração é uma das coisas que você pode fazer. As orações abaixo são algumas das que a Igreja nos deu para momentos como este. Nenhuma delas é uma garantia de cura. Todas são uma forma de estar ao lado da pessoa que você ama, diante de Deus, em cada dia em que ela atravessa isto.",
  prayers: [
    { slug: "novena-sacred-heart", why: "O Sagrado Coração de Cristo é o padroeiro da Igreja para os que sofrem. Rezar esta novena de nove dias por alguém com câncer coloca a doença no lugar onde a devoção católica encontra mais diretamente a dor humana." },
    { slug: "surrender-novena", why: "Os nove dias de entrega radical de Dom Dolindo Ruotolo foram escritos exatamente para o momento em que um diagnóstico tira o volante das mãos da família. O refrão dos nove dias é: «Ó Jesus, eu me entrego a Ti, cuida de tudo»." },
    { slug: "rosary-for-healing", why: "O Terço, rezado com a intenção de cura, é uma das respostas católicas mais antigas ao sofrimento físico. A intercessão de Maria é a corrente firme por baixo de cada dezena." },
    { slug: "psalm-91", why: "Aquele que habita no abrigo do Altíssimo mora à sombra do Onipotente. O Salmo 91 tem sido a oração dos doentes e dos que os amam por milhares de anos." },
    { slug: "memorare", why: "Lembrai-vos, ó piíssima Virgem Maria, que nunca se ouviu dizer que algum daqueles que recorreram à vossa proteção tenha sido por vós desamparado. Uma oração breve e firme que cabe em qualquer momento de sala de espera ou cabeceira de hospital." },
  ],
  pastoralNote: "A oração católica pelos doentes não é uma transação. Não rezamos orações melhores para obter resultados melhores. O que fazemos é continuar comparecendo, com palavras que a Igreja nos deu, diante de um Deus que também sofreu e que está presente em cada cabeceira, sintamos ou não a Sua presença. São Peregrino, padroeiro dos doentes de câncer, é um companheiro especial neste caminho — sua novena (4 de maio, festa) é parte da tradição brasileira de oração pela cura.",
  prayTogetherLead: "Se você quiser reunir outros, um PrayerTrain permite construir um calendário de oração pelo seu ente querido. Amigos e familiares escolhem orações específicas em dias específicos, recebem um lembrete diário, e ao final você tem um calendário de cobertura contínua que pode entregar à pessoa pela qual está rezando.",
  faqs: [
    { question: "Qual é a melhor oração católica por alguém com câncer?", answer: "Não existe uma única melhor oração. A Novena ao Sagrado Coração, a Novena da Rendição e o Terço pela Cura são orações católicas tradicionalmente oferecidas por doenças graves. A Novena a São Peregrino, padroeiro dos doentes de câncer, é uma escolha especialmente brasileira. A oração certa costuma ser aquela que você realmente vai rezar todo dia. Escolha aquela cujas palavras parecem certas para a pessoa e reze-a com constância." },
    { question: "Devo dizer à pessoa com câncer que estamos rezando por ela?", answer: "Sim, quase sempre. Saber que está sendo lembrada em oração é uma das poucas coisas que sustentam alguém que enfrenta uma doença grave. A exceção é se ela pediu especificamente para não ser informada (algumas pessoas acham isso esmagador durante o tratamento). Respeite o que foi pedido." },
    { question: "E se eu não souber o que rezar por elas, ou estou com raiva de Deus pelo diagnóstico?", answer: "Reze mesmo assim. Os Salmos contêm a linguagem mais feroz das Escrituras (veja Salmos 22 e 88). A tradição católica sempre fez lugar para orações que vêm da raiva, da confusão e do sentimento da ausência de Deus. Comparecer importa mais do que a eloquência." },
    { question: "Por quanto tempo devemos continuar rezando por eles?", answer: "Enquanto durar a situação. O tratamento do câncer raramente é uma corrida curta. Um PrayerTrain que funcione durante uma única rodada de tratamento, e depois seja renovado, é um padrão da tradição católica (lembre-se de como os israelitas rezaram continuamente durante o Êxodo). Não há data de validade para a intercessão." },
  ],
};

const cancerFil: SituationContent = {
  topic: "cancer",
  title: "Mga Catholic na panalangin para sa kaibigang may cancer",
  description: "Mga panalangin, novena, at paraan upang mag-organisa ng prayer coverage para sa isang taong humaharap sa diagnosis o paggamot ng cancer. Mula sa aklatan ng Catholic na panalangin ng PrayerTrain.",
  h1: "Mga Catholic na panalangin para sa kaibigang may cancer",
  lead: "Kapag ang isang mahal mo ay na-diagnose ng cancer, ang mga sumusunod na araw ay maaaring magpadama na walang magagawa. Ang panalangin ay isa sa mga bagay na pwede mong gawin. Ang mga panalangin sa ibaba ay ilan sa mga ibinigay sa atin ng Simbahan para sa mga sandaling tulad nito. Wala sa mga ito ang garantiya ng paggaling. Lahat sila ay paraan ng pakikiramay sa taong mahal mo, sa harap ng Diyos, sa bawat araw na siya ay dumadaan dito.",
  prayers: [
    { slug: "novena-sacred-heart", why: "Ang Banal na Puso ni Kristo ang patron ng Simbahan para sa mga nagdurusa. Ang pananalangin ng siyam na araw na novena na ito para sa isang taong may cancer ay naglalagay ng kanilang sakit sa lugar kung saan ang Catholic na debosyon ay direktang nakikipagtagpo sa sakit ng tao." },
    { slug: "surrender-novena", why: "Ang siyam na araw ng radikal na pagtitiwala ni Don Dolindo Ruotolo ay isinulat partikular para sa sandaling ang diagnosis ay tumatanggap ng kontrol mula sa pamilya. Ang awit ng siyam na araw ay: «O Hesus, isinusuko ko ang aking sarili sa Iyo, pamahalaan Mo ang lahat»." },
    { slug: "rosary-for-healing", why: "Ang Rosaryo, dinarasal na may intensyon ng paggaling, ay isa sa pinakamatandang Catholic na tugon sa pisikal na pagdurusa. Ang panalangin ni Maria ay ang matatag na agos sa ilalim ng bawat dekada." },
    { slug: "psalm-91", why: "Ang sinumang nananahan sa kanlungan ng Kataas-taasan ay namamalagi sa lilim ng Makapangyarihan sa lahat. Ang Awit 91 ay panalangin ng mga maysakit at ng mga umiibig sa kanila sa loob ng libu-libong taon." },
    { slug: "memorare", why: "Alalahanin mo, O pinakamahabaging Birheng Maria, na kailanman ay hindi narinig na ang sinumang tumakbo sa iyong proteksyon ay iniwan. Isang maikli, matatag na panalangin na umaangkop sa anumang sandali ng waiting room o tabi ng kama sa ospital." },
  ],
  pastoralNote: "Ang Catholic na panalangin para sa maysakit ay hindi transaksyon. Hindi tayo nananalangin ng mas magandang panalangin para makakuha ng mas magandang resulta. Ang ginagawa natin ay patuloy na pagdating, na may mga salitang ibinigay sa atin ng Simbahan, sa harap ng isang Diyos na nagdusa rin at nasa bawat tabi ng kama maging nararamdaman natin ang Kanyang presensya o hindi.",
  prayTogetherLead: "Kung nais ninyong tipunin ang iba, ang PrayerTrain ay nagbibigay-daan upang makabuo ng kalendaryo ng panalangin para sa inyong mahal sa buhay. Ang mga kaibigan at pamilya ay pipili ng mga partikular na panalangin sa mga partikular na araw, makakatanggap ng pang-araw-araw na paalala, at sa huli ay magkakaroon kayo ng kalendaryo ng tuloy-tuloy na sakop na maaaring ibigay sa taong inyong dinarasal.",
  faqs: [
    { question: "Ano ang pinakamagandang Catholic na panalangin para sa isang taong may cancer?", answer: "Walang nag-iisang pinakamagandang panalangin. Ang Novena sa Banal na Puso, ang Surrender Novena, at ang Rosaryo para sa Paggaling ay lahat mga Catholic na panalanging tradisyonal na inialay para sa mga seryosong karamdaman. Ang tamang panalangin ay karaniwang yung talagang darasalin mo araw-araw. Piliin ang isa kung saan ang mga salita ay tila angkop sa tao at idasal ito nang patuloy." },
    { question: "Dapat ko bang sabihin sa taong may cancer na nagdadasal kami para sa kanya?", answer: "Oo, halos lagi. Ang pagkaalam na may nagdadasal para sa kanila ay isa sa iilang mga bagay na nakakapag-akay sa isang taong humaharap sa seryosong karamdaman. Ang pagbubukod ay kung sila ay partikular na humiling na huwag sabihin sa kanila (ang ilan ay nararamdamang nakakasagabal ito habang nasa paggamot). Sundin ang kanilang hiling." },
    { question: "Paano kung hindi ko alam kung ano ang idarasal para sa kanila, o galit ako sa Diyos dahil sa diagnosis?", answer: "Manalangin pa rin. Ang mga Awit ay naglalaman ng pinakamatinding wika sa Banal na Kasulatan (tingnan ang Awit 22, 88). Ang tradisyong Catholic ay laging nagbigay-puwang para sa mga panalanging nagmumula sa galit, pagkalito, at naramdamang kawalan ng Diyos. Ang pagdating ay mas mahalaga kaysa sa kasanayan ng pananalita." },
    { question: "Hanggang kailan natin dapat ipagpatuloy ang pagdarasal para sa kanila?", answer: "Hangga't tumatagal ang sitwasyon. Ang paggamot ng cancer ay bihirang maging maikli. Ang isang PrayerTrain na tumatakbo sa isang round ng paggamot, at pagkatapos ay binabago, ay isang Catholic-tradisyong padron (isipin kung paano ang mga Israelita ay nanalangin nang tuloy-tuloy sa Exodo). Walang petsa ng pagtatapos ang panalangin ng panghahalal." },
  ],
};

const cancerPl: SituationContent = {
  topic: "cancer",
  title: "Katolickie modlitwy za przyjaciela z rakiem",
  description: "Modlitwy, nowenny i sposoby organizacji wsparcia modlitewnego dla kogoś, kto stoi w obliczu diagnozy lub leczenia raka. Z biblioteki katolickich modlitw PrayerTrain.",
  h1: "Katolickie modlitwy za przyjaciela z rakiem",
  lead: "Gdy ktoś, kogo kochasz, zostaje zdiagnozowany z rakiem, kolejne dni mogą sprawiać wrażenie, że nie możesz nic zrobić. Modlitwa jest jedną z rzeczy, które możesz zrobić. Poniższe modlitwy są niektórymi z tych, które Kościół dał nam na chwile takie jak ta. Żadna z nich nie jest gwarancją uzdrowienia. Wszystkie są sposobem na bycie obok osoby, którą kochasz, przed Bogiem, każdego dnia, gdy ona przechodzi przez to.",
  prayers: [
    { slug: "novena-sacred-heart", why: "Najświętsze Serce Chrystusa jest patronem Kościoła dla cierpiących. Odmawianie tej dziewięciodniowej nowenny za kogoś z rakiem umieszcza jego chorobę w miejscu, gdzie katolickie nabożeństwo najbardziej bezpośrednio spotyka się z ludzkim cierpieniem." },
    { slug: "surrender-novena", why: "Dziewięć dni radykalnego zawierzenia ks. Dolindo Ruotolo zostało napisane dokładnie na ten moment, gdy diagnoza odbiera rodzinie kierownicę. Refren wszystkich dziewięciu dni brzmi: «O Jezu, oddaję się Tobie, zatroszcz się Ty o wszystko»." },
    { slug: "rosary-for-healing", why: "Różaniec, odmawiany z intencją uzdrowienia, jest jedną z najstarszych katolickich odpowiedzi na cierpienie fizyczne. Wstawiennictwo Maryi jest stałym nurtem pod każdą dziesiątką." },
    { slug: "psalm-91", why: "Kto przebywa w pieczy Najwyższego, mieszka w cieniu Wszechmocnego. Psalm 91 był modlitwą chorych i tych, którzy ich kochają, przez tysiące lat." },
    { slug: "memorare", why: "Pomnij, o Najświętsza Panno Maryjo, że nigdy nie słyszano, abyś opuściła tego, kto się do Ciebie ucieka. Krótka, mocna modlitwa, która mieści się w każdej chwili poczekalni lub przy szpitalnym łóżku." },
  ],
  pastoralNote: "Katolicka modlitwa za chorych nie jest transakcją. Nie odmawiamy lepszych modlitw, by otrzymać lepsze rezultaty. To, co robimy, to ciągłe przychodzenie, ze słowami, które dał nam Kościół, przed Bogiem, który również cierpiał i który jest obecny przy każdym łóżku, niezależnie od tego, czy odczuwamy Jego obecność, czy nie. Św. Peregryn, patron chorych na raka, jest szczególnym towarzyszem na tej drodze.",
  prayTogetherLead: "Jeśli chcesz zgromadzić innych, PrayerTrain pozwala zbudować kalendarz modlitwy dla twojego bliskiego. Przyjaciele i rodzina wybierają konkretne modlitwy w konkretne dni, otrzymują codzienne przypomnienie, a na końcu masz kalendarz ciągłego wsparcia modlitewnego, który możesz wręczyć osobie, za którą się modlisz.",
  faqs: [
    { question: "Jaka jest najlepsza katolicka modlitwa za kogoś z rakiem?", answer: "Nie ma jednej najlepszej modlitwy. Nowenna do Najświętszego Serca, Nowenna Zawierzenia i Różaniec o uzdrowienie to katolickie modlitwy tradycyjnie ofiarowane za poważne choroby. Nowenna do Św. Peregryna, patrona chorych na raka, jest szczególnie polskim wyborem w tej dziedzinie. Właściwa modlitwa to zwykle ta, którą rzeczywiście będziesz odmawiać każdego dnia. Wybierz tę, której słowa wydają się odpowiednie dla tej osoby, i odmawiaj ją konsekwentnie." },
    { question: "Czy powinienem powiedzieć osobie z rakiem, że się za nią modlimy?", answer: "Tak, prawie zawsze. Wiedza o tym, że ktoś się za nich modli, jest jedną z niewielu rzeczy, które podtrzymują osobę stającą w obliczu poważnej choroby. Wyjątkiem jest sytuacja, gdy poprosili wprost, by im nie mówić (niektórzy uważają to za przytłaczające podczas leczenia). Postępuj zgodnie z tym, o co prosili." },
    { question: "A jeśli nie wiem, o co się za nich modlić, lub jestem zły na Boga z powodu diagnozy?", answer: "Módl się mimo to. Psalmy zawierają niektóre z najostrzejszych słów w Piśmie Świętym (zob. Psalm 22, 88). Tradycja katolicka zawsze robiła miejsce dla modlitw, które płyną z gniewu, zagubienia i odczuwanej nieobecności Boga. Przyjście do Boga liczy się bardziej niż wymowa." },
    { question: "Jak długo powinniśmy się za nich modlić?", answer: "Tak długo, jak trwa sytuacja. Leczenie raka rzadko jest sprintem. PrayerTrain, który działa przez jedną rundę leczenia, a następnie jest odnawiany, jest wzorcem tradycji katolickiej (pomyśl o tym, jak Izraelici modlili się nieustannie podczas Wyjścia). Wstawiennictwo nie ma daty ważności." },
  ],
};

// ─────────────────────────────────────────────────────────────────
// SICK CHILD
// ─────────────────────────────────────────────────────────────────

const sickChildEs: SituationContent = {
  topic: "sick-child",
  title: "Oraciones católicas por un niño enfermo",
  description: "Oraciones y formas de reunir a una comunidad cuando un niño está en la UCIN, enfrenta una cirugía o lucha contra una enfermedad grave. De la biblioteca de oraciones católicas de PrayerTrain.",
  h1: "Oraciones católicas por un niño enfermo",
  lead: "Ver sufrir a un niño es una de las cargas más pesadas que un padre, padrino o abuelo puede llevar. Las oraciones a continuación no son una manera de negociar con Dios un resultado. Son una manera de acompañar a los padres, sosteniendo al niño ante el Padre que sostuvo a Su propio Hijo a través de la cruz. Reza cualquiera de ellas. Rézalas todas. Reza mal. Solo sigue presentándote.",
  prayers: [
    { slug: "rosary-for-healing", why: "María, la madre de Cristo, nos es dada como madre de todo cristiano. Rezar el Rosario por un niño enfermo pone a ese niño en sus brazos." },
    { slug: "novena-sacred-heart", why: "Cristo dijo: «Dejad que los niños vengan a mí, no se lo impidáis». La Novena al Sagrado Corazón es una de las maneras más directas de llevar a un niño hacia esa voz." },
    { slug: "memorare", why: "Lo suficientemente breve para rezar sobre un niño dormido o en un pasillo de hospital entre cambios de turno. Lo suficientemente largo como para decirlo en serio." },
    { slug: "guardian-angel-prayer", why: "Ángel de mi Guarda, dulce compañía. La tradición católica sostiene que cada niño tiene un ángel de la guarda; esta oración pide a ese ángel que esté presente de la manera en que el niño lo necesita." },
    { slug: "psalm-91", why: "Él ordenará a Sus ángeles que te cuiden en todos tus caminos. El Salmo 91 ha sido una de las oraciones que las familias católicas han rezado durante siglos sobre niños enfermos. No promete resultados. Promete presencia." },
  ],
  pastoralNote: "Si eres los padres, no tienes que orar bien. Apenas tienes que orar siquiera. Las oraciones de los demás, reunidos alrededor de tu hijo, son parte del cuerpo de Cristo haciendo lo que hace. Deja que la gente ore. Deja que traigan comidas, cuiden a tus otros hijos, se sienten en silencio en la capilla. Eso también es oración. El Niño Jesús de Praga es la devoción católica especialmente asociada con la protección de los niños enfermos.",
  prayTogetherLead: "Un PrayerTrain por un niño enfermo es una de las formas más concretas de ayuda que puedes ofrecer a unos padres que están demasiado agotados para organizar nada por sí mismos. Tú lo configuras, envías el enlace a la familia y amigos, y un calendario de oración se llena a su alrededor sin que ellos tengan que mover un dedo.",
  faqs: [
    { question: "¿Cuál es la mejor oración católica por un niño en la UCIN?", answer: "El Salmo 91 y el Acordaos son lo suficientemente breves para rezar junto a la incubadora y lo suficientemente densos para sostener la situación. El Rosario por la Sanación es la opción de forma larga para el padre o abuelo que vela. Reza cualquiera que se ajuste al momento en que estás." },
    { question: "¿Está bien rezar con los padres en vez de por ellos?", answer: "Sí. A veces lo más importante es sentarse en la cama del hospital y rezar un Ave María juntos, en voz alta, con los padres que ya no tienen palabras propias. Eso no es oración menor. Ese es el cuerpo de Cristo haciendo lo que debe hacer." },
    { question: "¿Cómo ayudo cuando estoy lejos y no puedo llevar comidas o visitar?", answer: "Inicia un PrayerTrain. Amigos y familia a distancia pueden inscribirse en días específicos, y los padres terminan con un registro de cada nombre que oró por su hijo. El PDF del ramillete al final es algo que pueden conservar." },
  ],
};

const sickChildPtBR: SituationContent = {
  topic: "sick-child",
  title: "Orações católicas por uma criança doente",
  description: "Orações e formas de reunir uma comunidade quando uma criança está na UTI neonatal, enfrenta uma cirurgia ou luta contra uma doença grave. Da biblioteca de orações católicas do PrayerTrain.",
  h1: "Orações católicas por uma criança doente",
  lead: "Ver uma criança sofrer é uma das cargas mais pesadas que um pai, padrinho ou avô pode carregar. As orações abaixo não são uma forma de negociar com Deus por um resultado. Elas são uma forma de estar ao lado dos pais, segurando a criança diante do Pai que segurou Seu próprio Filho na cruz. Reze qualquer uma delas. Reze todas. Reze mal. Apenas continue comparecendo.",
  prayers: [
    { slug: "rosary-for-healing", why: "Maria, a mãe de Cristo, nos é dada como mãe de todo cristão. Rezar o Terço por uma criança doente coloca essa criança em seus braços." },
    { slug: "novena-sacred-heart", why: "Cristo disse: «Deixai vir a mim as criancinhas, não as impeçais». A Novena ao Sagrado Coração é uma das formas mais diretas de levar uma criança a essa voz." },
    { slug: "memorare", why: "Curta o suficiente para rezar sobre uma criança adormecida ou num corredor de hospital entre trocas de turno. Longa o suficiente para falar a sério." },
    { slug: "guardian-angel-prayer", why: "Santo Anjo do Senhor, meu zeloso guardador. A tradição católica sustenta que toda criança tem um anjo da guarda; esta oração pede a esse anjo que esteja presente da maneira que a criança precisa." },
    { slug: "psalm-91", why: "Ele dará ordens aos Seus anjos a teu respeito, para te guardarem em todos os teus caminhos. O Salmo 91 tem sido uma das orações que famílias católicas rezam há séculos sobre crianças doentes. Não promete resultados. Promete presença." },
  ],
  pastoralNote: "Se você é o pai ou a mãe, não precisa rezar bem. Mal precisa rezar. As orações dos outros, reunidos em torno do seu filho, são parte do corpo de Cristo fazendo o que faz. Deixe as pessoas rezarem. Deixe-as trazerem refeições, cuidarem dos seus outros filhos, sentarem-se em silêncio na capela. Isso também é oração. O Menino Jesus de Praga é a devoção católica especialmente associada à proteção das crianças doentes.",
  prayTogetherLead: "Um PrayerTrain por uma criança doente é uma das formas mais concretas de ajuda que você pode oferecer a pais que estão esgotados demais para organizar qualquer coisa sozinhos. Você o configura, envia o link para a família e amigos, e um calendário de oração se enche ao redor deles sem que precisem mover um dedo.",
  faqs: [
    { question: "Qual é a melhor oração católica por uma criança na UTI neonatal?", answer: "O Salmo 91 e a Memorare são curtos o suficiente para rezar ao lado da incubadora e densos o suficiente para sustentar a situação. O Terço pela Cura é a opção mais longa para o pai ou avô em vigília. Reze qualquer um que se encaixe no momento em que você está." },
    { question: "É bom rezar com os pais em vez de por eles?", answer: "Sim. Às vezes a coisa mais importante é sentar-se na cama do hospital e rezar uma Ave Maria juntos, em voz alta, com os pais que não têm mais palavras próprias. Isso não é oração menor. É o corpo de Cristo fazendo o que deve fazer." },
    { question: "Como ajudo quando estou longe e não posso levar refeições ou visitar?", answer: "Comece um PrayerTrain. Amigos e familiares distantes podem se inscrever em dias específicos, e os pais terminam com um registro de cada nome que rezou pelo seu filho. O PDF do ramalhete no final é algo que eles podem guardar." },
  ],
};

const sickChildFil: SituationContent = {
  topic: "sick-child",
  title: "Mga Catholic na panalangin para sa maysakit na bata",
  description: "Mga panalangin at paraan upang tipunin ang komunidad kapag ang isang bata ay nasa NICU, humaharap sa operasyon, o lumalaban sa seryosong karamdaman. Mula sa aklatan ng Catholic na panalangin ng PrayerTrain.",
  h1: "Mga Catholic na panalangin para sa maysakit na bata",
  lead: "Ang panonood sa pagdurusa ng isang bata ay isa sa pinakamabigat na dapat na pasanin ng isang magulang, ninong, ninang, o lolo at lola. Ang mga panalangin sa ibaba ay hindi paraan ng pakikipagtawaran sa Diyos para sa isang kalalabasan. Sila ay paraan ng pakikiramay sa mga magulang, hawak ang bata sa harap ng Ama na hinawakan ang Kanyang sariling Anak sa krus. Idasal ang alinman sa kanila. Idasal ang lahat. Manalangin nang hindi maganda. Patuloy lang na dumating.",
  prayers: [
    { slug: "rosary-for-healing", why: "Si Maria, ang ina ni Kristo, ay ibinigay sa atin bilang ina ng bawat Kristiyano. Ang pagdarasal ng Rosaryo para sa isang maysakit na bata ay naglalagay sa batang iyon sa kanyang mga bisig." },
    { slug: "novena-sacred-heart", why: "Sinabi ni Kristo: «Hayaan ninyong lumapit sa akin ang mga bata, huwag ninyo silang hadlangan». Ang Novena sa Banal na Puso ay isa sa pinaka-direktang paraan upang dalhin ang isang bata sa boses na iyon." },
    { slug: "memorare", why: "Maikli ang sapat upang idasal sa ibabaw ng natutulog na bata o sa pasilyo ng ospital sa pagitan ng paglilipat-shift. Mahaba ang sapat upang ipakahulugan ito." },
    { slug: "guardian-angel-prayer", why: "Anghel ng Diyos, aking mahal na tagapag-alaga. Ang tradisyong Catholic ay naniniwala na ang bawat bata ay may anghel na tagapagtanggol; humihiling ang panalanging ito sa anghel na maging naroon sa paraang kailangan ng bata." },
    { slug: "psalm-91", why: "Iuutos Niya sa Kanyang mga anghel na ingatan ka sa lahat ng iyong landas. Ang Awit 91 ay isa sa mga panalanging dinasal ng aming pamilya sa NICU stay at iba pang hospital crises. Hindi ito nangangako ng kalalabasan. Nangangako ito ng presensya." },
  ],
  pastoralNote: "Kung ikaw ang magulang, hindi mo kailangang manalangin nang maayos. Halos hindi mo kailangang manalangin man lang. Ang mga panalangin ng iba, tipon sa paligid ng iyong anak, ay bahagi ng katawan ni Kristo na ginagawa ang ginagawa nito. Hayaan ang mga tao na manalangin. Hayaan silang magdala ng mga pagkain, magbantay sa iba mong mga anak, umupo nang tahimik sa kapilya. Iyon din ay panalangin.",
  prayTogetherLead: "Ang isang PrayerTrain para sa isang maysakit na bata ay isa sa pinaka-konkretong porma ng tulong na maaari mong ialay sa mga magulang na lubha nang pagod upang mag-organisa ng anumang bagay sa kanilang sarili. Inaayos mo ito, ipinapadala ang link sa pamilya at mga kaibigan, at isang kalendaryo ng panalangin ang napupuno sa paligid nila nang hindi kailangang gumalaw ng daliri.",
  faqs: [
    { question: "Ano ang pinakamagandang Catholic na panalangin para sa batang nasa NICU?", answer: "Ang Awit 91 at ang Memorare ay maikli ang sapat upang idasal sa tabi ng isolette at mabigat ang sapat upang dalhin ang sitwasyon. Ang Rosaryo para sa Paggaling ay ang mas mahabang opsyon para sa magulang o lolo at lola na nagbabantay. Idasal kung ano ang umaangkop sa sandaling kinaroroonan mo." },
    { question: "Tama bang manalangin kasama ang mga magulang sa halip na para sa kanila?", answer: "Oo. Minsan ang pinakamahalagang bagay ay umupo sa kama sa ospital at sama-samang magdasal ng Aba Ginoong Maria, malakas, kasama ang mga magulang na wala nang sariling salita. Hindi iyon mas mababang panalangin. Iyon ay ang katawan ni Kristo na ginagawa ang dapat nitong gawin." },
    { question: "Paano ako makakatulong kapag malayo at hindi makakapagdala ng pagkain o makakabisita?", answer: "Magsimula ng PrayerTrain. Ang malayong mga kaibigan at pamilya ay maaaring mag-sign up sa partikular na mga araw, at ang mga magulang ay magkakaroon ng talaan ng bawat pangalang nagdasal para sa kanilang anak. Ang PDF ng bouquet sa huli ay isang bagay na maaari nilang itago." },
  ],
};

const sickChildPl: SituationContent = {
  topic: "sick-child",
  title: "Katolickie modlitwy za chore dziecko",
  description: "Modlitwy i sposoby na zgromadzenie wspólnoty, gdy dziecko jest na oddziale intensywnej terapii noworodków, czeka je operacja lub walczy z poważną chorobą. Z biblioteki katolickich modlitw PrayerTrain.",
  h1: "Katolickie modlitwy za chore dziecko",
  lead: "Patrzenie, jak dziecko cierpi, jest jednym z najcięższych ciężarów, jakie może nieść rodzic, chrzestny lub dziadek. Poniższe modlitwy nie są sposobem na targowanie się z Bogiem o rezultat. Są sposobem na bycie obok rodziców, trzymając dziecko przed Ojcem, który trzymał swojego własnego Syna przez krzyż. Módl się którąkolwiek z nich. Módl się wszystkimi. Módl się źle. Po prostu pojawiaj się dalej.",
  prayers: [
    { slug: "rosary-for-healing", why: "Maryja, Matka Chrystusa, jest nam dana jako matka każdego chrześcijanina. Odmawianie Różańca za chore dziecko składa to dziecko w jej ramionach." },
    { slug: "novena-sacred-heart", why: "Chrystus powiedział: «Pozwólcie dzieciom przychodzić do Mnie, nie przeszkadzajcie im». Nowenna do Najświętszego Serca jest jednym z najbardziej bezpośrednich sposobów przyprowadzenia dziecka do tego głosu." },
    { slug: "memorare", why: "Wystarczająco krótka, by odmówić nad śpiącym dzieckiem lub w szpitalnym korytarzu między zmianami dyżuru. Wystarczająco długa, by mówić to poważnie." },
    { slug: "guardian-angel-prayer", why: "Aniele Boży, stróżu mój. Tradycja katolicka utrzymuje, że każde dziecko ma anioła stróża; ta modlitwa prosi tego anioła, by był obecny w sposób, jakiego potrzebuje dziecko." },
    { slug: "psalm-91", why: "Bo aniołom swoim dał rozkaz o tobie, aby cię strzegli na wszystkich twych drogach. Psalm 91 był jedną z modlitw odmawianych przez katolickie rodziny od wieków nad chorymi dziećmi. Nie obiecuje rezultatów. Obiecuje obecność." },
  ],
  pastoralNote: "Jeśli jesteś rodzicem, nie musisz dobrze się modlić. Ledwo musisz się modlić. Modlitwy innych, zgromadzonych wokół twojego dziecka, są częścią Ciała Chrystusa robiącego to, co robi. Pozwól ludziom się modlić. Pozwól im przynosić posiłki, pilnować innych twoich dzieci, siedzieć w ciszy w kaplicy. To również jest modlitwa. Dzieciątko Jezus z Pragi jest katolicką dewocją szczególnie związaną z ochroną chorych dzieci.",
  prayTogetherLead: "PrayerTrain za chore dziecko jest jedną z najbardziej konkretnych form pomocy, jakie możesz zaoferować rodzicom, którzy są zbyt wyczerpani, by zorganizować cokolwiek samodzielnie. Ty go zakładasz, wysyłasz link do rodziny i przyjaciół, a kalendarz modlitwy wypełnia się wokół nich, a oni nie muszą kiwnąć palcem.",
  faqs: [
    { question: "Jaka jest najlepsza katolicka modlitwa za dziecko na OIOM-ie noworodkowym?", answer: "Psalm 91 i Pomnij są wystarczająco krótkie, by odmówić przy inkubatorze, i wystarczająco mocne, by udźwignąć sytuację. Różaniec o uzdrowienie to dłuższa opcja dla rodzica lub dziadka czuwającego. Odmów którąkolwiek pasuje do chwili, w której jesteś." },
    { question: "Czy w porządku jest modlić się z rodzicami zamiast za nich?", answer: "Tak. Czasem najważniejsze jest usiąść na szpitalnym łóżku i wspólnie odmówić Zdrowaś Maryjo, na głos, z rodzicami, którym nie zostały już własne słowa. To nie jest modlitwa mniejsza. To Ciało Chrystusa robiące to, co ma robić." },
    { question: "Jak pomóc, gdy jestem daleko i nie mogę przywieźć posiłków ani odwiedzić?", answer: "Załóż PrayerTrain. Przyjaciele i rodzina z daleka mogą zapisać się na konkretne dni, a rodzice na końcu mają zapis każdego imienia, które się modliło za ich dziecko. PDF z bukietem na końcu jest czymś, co mogą zatrzymać." },
  ],
};

// ─────────────────────────────────────────────────────────────────
// SURGERY
// ─────────────────────────────────────────────────────────────────

const surgeryEs: SituationContent = {
  topic: "surgery",
  title: "Oraciones católicas antes de una cirugía",
  description: "Oraciones, novenas y una manera de organizar la cobertura de oración para alguien que va a entrar al quirófano. De la biblioteca de oraciones católicas de PrayerTrain.",
  h1: "Oraciones católicas antes de una cirugía",
  lead: "Las horas antes de una cirugía son horas silenciosas. Hay papeleo, ayuno, la caminata lenta hacia preoperatorio. Las oraciones a continuación son lo suficientemente breves para rezar en esas horas, y lo suficientemente firmes para sostener a la familia en la sala de espera mientras ocurre la cirugía. Ninguna de ellas reemplaza la medicina. Todas ellas ponen la medicina en las manos de Aquel que dio al cirujano la destreza para usarla.",
  prayers: [
    { slug: "surrender-novena", why: "Comenzada nueve días antes de una cirugía planeada, la Novena de la Rendición lleva a la familia al hospital con nueve días de confianza practicada ya por detrás. Las palabras de Don Dolindo están hechas para los momentos en que la medicina toma el control y nosotros somos los que esperamos." },
    { slug: "memorare", why: "Reza una vez antes de que lleven al paciente. Rézalo otra vez cada quince minutos en la sala de espera. El Acordaos es una tradición católica para los momentos en que lo único que queda por hacer es esperar." },
    { slug: "psalm-23", why: "Aunque ande en valle de sombra de muerte, no temeré mal alguno. La oración clásica para el momento en que un cuerpo es entregado al bisturí y a la anestesia." },
    { slug: "anima-christi", why: "Alma de Cristo, santifícame. Cuerpo de Cristo, sálvame. Una oración corta y antigua que la Iglesia da a aquellos que se preparan para cualquier momento en que el cuerpo está en riesgo." },
    { slug: "prayer-healing", why: "Una oración directa por la sanación, escrita para la situación en que alguien está al borde de la intervención médica." },
  ],
  pastoralNote: "La sala de espera es uno de los lugares más explícitamente católicos en la vida estadounidense moderna: silenciosa, llena de extraños, todos ellos indefensos, todos ellos esperando. La oración no es una manera de acortar la espera. Es una manera de estar en la espera con Dios en lugar de solo. San Lucas, el evangelista médico, es el patrono católico tradicional de cirujanos y pacientes quirúrgicos.",
  prayTogetherLead: "Si la cirugía es significativa o está programada con anticipación, un PrayerTrain que comience nueve días antes y termine el día siguiente permite a una comunidad orar junta a través de todo el arco. Cada persona elige un día, recibe un recordatorio, y el paciente entra al hospital sabiendo que las fechas han sido tomadas.",
  faqs: [
    { question: "¿Qué debo rezar justo antes de que alguien entre a cirugía?", answer: "Reza el Acordaos o un Ave María o el Padre Nuestro. Hazle la señal de la cruz si puedes. Dile que estás orando. Las palabras exactas importan menos que el acto de estar ahí rezándolas." },
    { question: "¿Hay una novena católica para la cirugía?", answer: "No hay una novena escrita específicamente para la cirugía, pero la Novena de la Rendición (Don Dolindo) es la oración de nueve días más adecuada para el período previo. Comiénzala nueve días antes de la fecha programada y llegas al hospital con una cadencia de confianza ya practicada." },
    { question: "¿Y si la cirugía es para alguien que no es católico?", answer: "Reza de todos modos. Estás rezando al Dios que los hizo, no a una denominación. Si quieres rezar con ellos, pregúntales con qué oraciones crecieron y reza esas. El punto es llevarlos ante Dios, no llevar a Dios a ellos en un sobre católico." },
  ],
};

const surgeryPtBR: SituationContent = {
  topic: "surgery",
  title: "Orações católicas antes de uma cirurgia",
  description: "Orações, novenas e uma forma de organizar a cobertura de oração por alguém que vai entrar no centro cirúrgico. Da biblioteca de orações católicas do PrayerTrain.",
  h1: "Orações católicas antes de uma cirurgia",
  lead: "As horas antes de uma cirurgia são horas silenciosas. Há papelada, jejum, a caminhada lenta até o pré-operatório. As orações abaixo são curtas o suficiente para rezar nessas horas, e firmes o suficiente para sustentar a família na sala de espera enquanto a cirurgia acontece. Nenhuma delas substitui a medicina. Todas elas colocam a medicina nas mãos d'Aquele que deu ao cirurgião a habilidade para usá-la.",
  prayers: [
    { slug: "surrender-novena", why: "Iniciada nove dias antes de uma cirurgia planejada, a Novena da Rendição leva a família ao hospital com nove dias de confiança praticada já por trás. As palavras de Dom Dolindo são feitas para os momentos em que a medicina toma o controle e nós somos os que esperamos." },
    { slug: "memorare", why: "Reze uma vez antes de levarem o paciente. Reze novamente a cada quinze minutos na sala de espera. A Memorare é uma tradição católica para os momentos em que a única coisa que resta fazer é esperar." },
    { slug: "psalm-23", why: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum. A oração clássica para o momento em que um corpo é entregue ao bisturi e à anestesia." },
    { slug: "anima-christi", why: "Alma de Cristo, santificai-me. Corpo de Cristo, salvai-me. Uma oração curta e antiga que a Igreja dá àqueles que se preparam para qualquer momento em que o corpo está em risco." },
    { slug: "prayer-healing", why: "Uma oração direta pela cura, escrita para a situação em que alguém está à beira de uma intervenção médica." },
  ],
  pastoralNote: "A sala de espera é um dos lugares mais explicitamente católicos na vida moderna: silenciosa, cheia de estranhos, todos eles impotentes, todos eles esperando. A oração não é uma forma de encurtar a espera. É uma forma de estar na espera com Deus em vez de sozinho. São Lucas, o evangelista médico, é o padroeiro católico tradicional de cirurgiões e pacientes cirúrgicos.",
  prayTogetherLead: "Se a cirurgia for significativa ou estiver agendada com antecedência, um PrayerTrain que comece nove dias antes e termine no dia seguinte permite que uma comunidade reze junta através de todo o arco. Cada pessoa escolhe um dia, recebe um lembrete, e o paciente entra no hospital sabendo que as datas foram todas reservadas.",
  faqs: [
    { question: "O que devo rezar logo antes de alguém entrar na cirurgia?", answer: "Reze a Memorare ou uma Ave Maria ou o Pai Nosso. Faça o sinal da cruz sobre eles se puder. Diga-lhes que está rezando. As palavras exatas importam menos do que o ato de estar ali rezando-as." },
    { question: "Existe uma novena católica para cirurgia?", answer: "Não há uma novena escrita especificamente para cirurgia, mas a Novena da Rendição (Dom Dolindo) é a oração de nove dias mais adequada para o período de preparação. Comece-a nove dias antes da data agendada e você chega ao hospital com uma cadência de confiança já praticada." },
    { question: "E se a cirurgia for de alguém que não é católico?", answer: "Reze mesmo assim. Você está rezando ao Deus que os fez, não a uma denominação. Se você quiser rezar com eles, pergunte com quais orações eles cresceram e reze essas. O objetivo é levá-los à presença de Deus, não levar Deus até eles num envelope católico." },
  ],
};

const surgeryFil: SituationContent = {
  topic: "surgery",
  title: "Mga Catholic na panalangin bago ang operasyon",
  description: "Mga panalangin, novena, at paraan upang mag-organisa ng prayer coverage para sa isang taong papasok sa operasyon. Mula sa aklatan ng Catholic na panalangin ng PrayerTrain.",
  h1: "Mga Catholic na panalangin bago ang operasyon",
  lead: "Ang mga oras bago ang isang operasyon ay tahimik na mga oras. May papeleo, pag-aayuno, ang mabagal na paglakad sa pre-op. Ang mga panalangin sa ibaba ay maikli ang sapat upang idasal sa mga oras na iyon, at matatag ang sapat upang dalhin ang pamilya sa waiting room habang nangyayari ang operasyon. Wala sa mga ito ang humahalili sa medisina. Lahat sila ay naglalagay ng medisina sa mga kamay ng Isa na nagbigay sa surgeon ng kakayahang gamitin ito.",
  prayers: [
    { slug: "surrender-novena", why: "Sinimulan siyam na araw bago ang isang nakaplanong operasyon, ang Surrender Novena ay nag-aakay sa pamilya sa ospital na may siyam na araw ng nakasanayan nang pagtitiwala. Ang mga salita ni Don Dolindo ay ginawa para sa mga sandaling ang medisina ang siyang humahawak at tayo ang naghihintay." },
    { slug: "memorare", why: "Idasal isang beses bago ilabas ang pasyente. Idasal muli bawat labinlimang minuto sa waiting room. Ang Memorare ay isang tradisyong Catholic para sa mga sandaling ang tanging natitirang gawin ay maghintay." },
    { slug: "psalm-23", why: "Bagaman ako'y maglakad sa libis ng anino ng kamatayan, walang masamang aking katatakutan. Ang klasikong panalangin para sa sandaling ang isang katawan ay ibinibigay sa scalpel at anestesya." },
    { slug: "anima-christi", why: "Kaluluwa ni Kristo, banalin mo ako. Katawan ni Kristo, iligtas mo ako. Isang maikli at sinaunang panalangin na ibinibigay ng Simbahan sa mga naghahanda para sa anumang sandaling ang katawan ay nasa panganib." },
    { slug: "prayer-healing", why: "Isang direktang panalangin para sa paggaling, isinulat para sa sitwasyon kung saan ang isang tao ay nasa bingit ng medikal na interbensyon." },
  ],
  pastoralNote: "Ang waiting room ay isa sa pinaka-tahasang Catholic na lugar sa modernong buhay: tahimik, puno ng mga estrangherong, lahat sila ay walang magawa, lahat sila ay umaasa. Ang panalangin ay hindi paraan upang paikliin ang paghihintay. Ito ay paraan upang manatili sa paghihintay kasama ng Diyos sa halip na mag-isa. Si San Lucas, ang ebanghelistang manggagamot, ay ang tradisyonal na Catholic na patron ng mga surgeon at surgical patient.",
  prayTogetherLead: "Kung ang operasyon ay mahalaga o nakatakda nang maaga, ang isang PrayerTrain na nagsisimula siyam na araw bago at nagtatapos sa araw pagkatapos ay nagbibigay-daan sa isang komunidad na manalangin nang sama-sama sa buong takbo. Bawat tao ay pipili ng araw, makakatanggap ng paalala, at ang pasyente ay papasok sa ospital alam na ang mga petsa ay nakuha na.",
  faqs: [
    { question: "Ano ang dapat kong idarasal bago pumasok sa operasyon ang isang tao?", answer: "Idasal ang Memorare o isang Aba Ginoong Maria o ang Ama Namin. Gawin ang tanda ng krus sa kanya kung kaya mo. Sabihin sa kanya na ikaw ay nagdarasal. Ang eksaktong mga salita ay mas mababang kahalagahan kaysa sa pagiging naroon na nagdarasal." },
    { question: "May Catholic na novena ba para sa operasyon?", answer: "Walang novena na isinulat partikular para sa operasyon, ngunit ang Surrender Novena (Don Dolindo) ay ang pinakaangkop na siyam-araw na panalangin para sa lead-up. Simulan ito siyam na araw bago ang nakatakdang petsa at dadating ka sa ospital na may kadensya ng tiwala na nakasanayan na." },
    { question: "Paano kung ang operasyon ay para sa isang hindi Catholic?", answer: "Manalangin pa rin. Ikaw ay nagdarasal sa Diyos na gumawa sa kanila, hindi sa isang denominasyon. Kung nais mong manalangin kasama sila, tanungin sila kung anong mga panalangin ang kanilang kinalakhan at idasal iyon. Ang punto ay dalhin sila sa harap ng Diyos, hindi dalhin ang Diyos sa kanila sa isang Catholic na sobre." },
  ],
};

const surgeryPl: SituationContent = {
  topic: "surgery",
  title: "Katolickie modlitwy przed operacją",
  description: "Modlitwy, nowenny i sposób na zorganizowanie wsparcia modlitewnego dla kogoś, kto poddaje się znieczuleniu. Z biblioteki katolickich modlitw PrayerTrain.",
  h1: "Katolickie modlitwy przed operacją",
  lead: "Godziny przed operacją są godzinami cichymi. Jest papierkowa robota, post, powolny spacer na blok przedoperacyjny. Poniższe modlitwy są wystarczająco krótkie, by odmówić je w tych godzinach, i wystarczająco mocne, by podtrzymać rodzinę w poczekalni, gdy odbywa się operacja. Żadna z nich nie zastępuje medycyny. Wszystkie one składają medycynę w ręce Tego, który dał chirurgowi umiejętność, by ją wykorzystać.",
  prayers: [
    { slug: "surrender-novena", why: "Rozpoczęta dziewięć dni przed planowaną operacją, Nowenna Zawierzenia prowadzi rodzinę do szpitala z dziewięcioma dniami praktykowanego zaufania już za sobą. Słowa ks. Dolindo zostały stworzone dla chwil, gdy medycyna przejmuje stery, a my jesteśmy tymi, którzy czekają." },
    { slug: "memorare", why: "Odmów raz, zanim pacjenta zabiorą na salę. Odmów ponownie co piętnaście minut w poczekalni. Pomnij jest katolicką tradycją na chwile, gdy jedyne, co pozostaje do zrobienia, to czekać." },
    { slug: "psalm-23", why: "Chociażbym chodził ciemną doliną, zła się nie ulęknę. Klasyczna modlitwa na chwilę, gdy ciało zostaje oddane skalpelowi i znieczuleniu." },
    { slug: "anima-christi", why: "Duszo Chrystusa, uświęć mnie. Ciało Chrystusa, zbaw mnie. Krótka, starożytna modlitwa, którą Kościół daje tym, którzy przygotowują się na każdą chwilę, gdy ciało jest zagrożone." },
    { slug: "prayer-healing", why: "Bezpośrednia modlitwa o uzdrowienie, napisana na sytuację, w której ktoś jest na krawędzi interwencji medycznej." },
  ],
  pastoralNote: "Poczekalnia szpitalna jest jednym z najbardziej jawnie katolickich miejsc we współczesnym życiu: cicha, pełna obcych, wszyscy bezsilni, wszyscy ufający. Modlitwa nie jest sposobem na skrócenie oczekiwania. Jest sposobem na bycie w oczekiwaniu z Bogiem, a nie samemu. Św. Łukasz, ewangelista i lekarz, jest tradycyjnym katolickim patronem chirurgów i pacjentów chirurgicznych.",
  prayTogetherLead: "Jeśli operacja jest poważna lub zaplanowana z wyprzedzeniem, PrayerTrain, który zaczyna się dziewięć dni wcześniej i kończy się dzień po, pozwala wspólnocie modlić się razem przez cały łuk. Każda osoba wybiera dzień, otrzymuje przypomnienie, a pacjent wchodzi do szpitala wiedząc, że wszystkie dni zostały zajęte.",
  faqs: [
    { question: "Co powinienem odmówić tuż przed tym, jak ktoś trafi na salę operacyjną?", answer: "Odmów Pomnij lub Zdrowaś Maryjo, lub Ojcze nasz. Uczyń nad nim znak krzyża, jeśli możesz. Powiedz mu, że się modlisz. Dokładne słowa mają mniejsze znaczenie niż sam akt bycia tam i odmawiania ich." },
    { question: "Czy istnieje katolicka nowenna na operację?", answer: "Nie ma nowenny napisanej specjalnie na operację, ale Nowenna Zawierzenia (ks. Dolindo) jest najbardziej odpowiednią dziewięciodniową modlitwą na okres przygotowawczy. Rozpocznij ją dziewięć dni przed planowaną datą, a dotrzesz do szpitala z kadencją zaufania już wypracowaną." },
    { question: "A co jeśli operacja jest dla kogoś, kto nie jest katolikiem?", answer: "Módl się mimo to. Modlisz się do Boga, który ich stworzył, a nie do denominacji. Jeśli chcesz modlić się z nimi, zapytaj, jakimi modlitwami się wychowali, i odmawiaj te. Chodzi o to, by przyprowadzić ich przed Boga, a nie o to, by przynieść im Boga w katolickiej kopercie." },
  ],
};

// ─────────────────────────────────────────────────────────────────
// GRIEF
// ─────────────────────────────────────────────────────────────────

const griefEs: SituationContent = {
  topic: "grief",
  title: "Oraciones católicas por una familia en duelo",
  description: "Oraciones, novenas y una manera de organizar oración continua por una familia que ha perdido a alguien. De la biblioteca de oraciones católicas de PrayerTrain.",
  h1: "Oraciones católicas por una familia en duelo",
  lead: "El duelo dura más que el funeral. Las cazuelas dejan de llegar, las visitas disminuyen, y la familia queda en una casa que todavía tiene el abrigo de la persona ausente en el perchero. Las oraciones a continuación son para ese largo tramo, los meses en que la mayoría de la gente ha seguido adelante pero la familia no. La tradición católica hace lugar para esto. Oramos por los muertos. Oramos por los que quedan. Hacemos ambas cosas durante mucho tiempo.",
  prayers: [
    { slug: "seven-sorrows-rosary", why: "Nuestra Señora de los Dolores es la patrona de todo padre que ha perdido un hijo. El Rosario de los Siete Dolores es una oración católica específicamente para aquellos cuyo duelo lleva el peso de un ser querido perdido y ningún final obvio." },
    { slug: "surrender-novena", why: "Don Dolindo escribió estas meditaciones para el alma que no tiene nada más que hacer que entregarse. Para una familia en duelo, los nueve días son nueve días de escuchar, de Cristo mismo, que Él se está encargando." },
    { slug: "memorare", why: "María, que vio morir a su propio hijo, es la intercesora natural para cualquier familia en luto. El Acordaos es lo suficientemente corto para rezar cada vez que el duelo te alcanza en medio del día." },
    { slug: "novena-our-lady-perpetual-help", why: "El icono de Nuestra Señora del Perpetuo Socorro muestra a María sosteniendo al niño Jesús mientras Él se estremece ante los instrumentos de Su futura Pasión. Es la imagen católica de la madre que sabe cómo se siente tu duelo." },
    { slug: "prayer-st-francis", why: "Señor, hazme instrumento de Tu paz. La Oración de San Francisco es una de las pocas oraciones que pueden ser dichas por alguien en duelo profundo sin que las palabras se sientan como una traición a la pérdida." },
    { slug: "offering-suffering", why: "La tradición católica sostiene que el sufrimiento ofrecido por la intención de otro es oración real. Para una familia en duelo, esta es una manera en que la pérdida misma se vuelve intercesión." },
  ],
  pastoralNote: "La tradición católica no pide a los dolientes que lo superen. El Papa Francisco ha hablado de la legitimidad de llorar con los que lloran, del duelo como una forma de amor, de los muertos como aún parte del cuerpo de Cristo. Si tu oración es en su mayoría lágrimas durante mucho tiempo, eso sigue siendo oración.",
  prayTogetherLead: "Un PrayerTrain por una familia en duelo es una de las pocas cosas que no se detiene después del funeral. Los amigos se inscriben en días específicos a lo largo de treinta, sesenta, noventa días. La familia sabe que las fechas han sido tomadas. Al final, reciben un PDF de Ramillete Espiritual con cada nombre que oró y cada día que fue cubierto.",
  faqs: [
    { question: "¿Cuál es la mejor oración por una familia que ha perdido un hijo?", answer: "El Rosario de los Siete Dolores está escrito exactamente para esto. Nuestra Señora de los Dolores perdió a su propio hijo; su intercesión por los padres en duelo lleva el peso de la experiencia personal. La Novena de la Rendición es la compañera de nueve días cuando incluso el Rosario se siente como demasiadas palabras." },
    { question: "¿Por cuánto tiempo debemos seguir orando por una familia en duelo?", answer: "Más tiempo del que se siente socialmente cómodo. La tradición católica ora por las almas de los muertos en noviembre cada año (Día de los Fieles Difuntos, el mes entero dedicado a esto). Un PrayerTrain que dura un año, marcado por los aniversarios, está bien dentro del patrón católico." },
    { question: "¿Puedo enviar el PDF del Ramillete Espiritual a una familia en duelo?", answer: "Sí, y lo conservarán. Un registro impreso de cada nombre que oró por su ser querido, cada día que fue cubierto, es una de las cosas más concretas que puedes entregar a alguien en luto. Dice: no estuviste solo en esto." },
  ],
};

const griefPtBR: SituationContent = {
  topic: "grief",
  title: "Orações católicas por uma família em luto",
  description: "Orações, novenas e uma forma de organizar oração contínua por uma família que perdeu alguém. Da biblioteca de orações católicas do PrayerTrain.",
  h1: "Orações católicas por uma família em luto",
  lead: "O luto dura mais que o funeral. As panelas deixam de chegar, as visitas diminuem, e a família fica numa casa que ainda tem o casaco da pessoa ausente no cabide. As orações abaixo são para esse longo trecho, os meses em que a maioria das pessoas seguiu em frente mas a família não. A tradição católica abre espaço para isto. Rezamos pelos mortos. Rezamos pelos que ficaram. Fazemos ambas as coisas por muito tempo.",
  prayers: [
    { slug: "seven-sorrows-rosary", why: "Nossa Senhora das Dores é a padroeira de todo pai ou mãe que perdeu um filho. O Terço das Sete Dores é uma oração católica especificamente para aqueles cujo luto carrega o peso de um ente querido perdido e nenhum fim óbvio." },
    { slug: "surrender-novena", why: "Dom Dolindo escreveu estas meditações para a alma que não tem mais nada para fazer a não ser entregar-se. Para uma família em luto, os nove dias são nove dias de ouvir, do próprio Cristo, que Ele está cuidando de tudo." },
    { slug: "memorare", why: "Maria, que viu o próprio Filho morrer, é a intercessora natural para qualquer família em luto. A Memorare é curta o suficiente para rezar toda vez que o luto te alcança no meio do dia." },
    { slug: "novena-our-lady-perpetual-help", why: "O ícone de Nossa Senhora do Perpétuo Socorro mostra Maria segurando o menino Jesus enquanto Ele estremece diante dos instrumentos da Sua futura Paixão. É a imagem católica da mãe que sabe como o seu luto se sente." },
    { slug: "prayer-st-francis", why: "Senhor, fazei de mim um instrumento de vossa paz. A Oração de São Francisco é uma das poucas orações que podem ser ditas por alguém em luto profundo sem que as palavras pareçam uma traição à perda." },
    { slug: "offering-suffering", why: "A tradição católica sustenta que o sofrimento oferecido pela intenção de outro é oração real. Para uma família em luto, esta é uma forma pela qual a própria perda se torna intercessão." },
  ],
  pastoralNote: "A tradição católica não pede aos enlutados que superem. O Papa Francisco falou da legitimidade de chorar com os que choram, do luto como uma forma de amor, dos mortos como ainda parte do corpo de Cristo. Se sua oração é principalmente lágrimas por um longo tempo, isso ainda é oração.",
  prayTogetherLead: "Um PrayerTrain por uma família em luto é uma das poucas coisas que não para após o funeral. Os amigos se inscrevem em dias específicos ao longo de trinta, sessenta, noventa dias. A família sabe que as datas foram reservadas. No final, recebem um PDF de Ramalhete Espiritual com cada nome que rezou e cada dia que foi coberto.",
  faqs: [
    { question: "Qual é a melhor oração por uma família que perdeu um filho?", answer: "O Terço das Sete Dores foi escrito exatamente para isto. Nossa Senhora das Dores perdeu o próprio Filho; sua intercessão pelos pais em luto carrega o peso da experiência pessoal. A Novena da Rendição é a companheira de nove dias quando até o Terço parece palavras demais." },
    { question: "Por quanto tempo devemos continuar rezando por uma família em luto?", answer: "Mais tempo do que parece socialmente confortável. A tradição católica reza pelas almas dos mortos em novembro todo ano (Dia de Finados, mês inteiro dedicado a isto). Um PrayerTrain que dura um ano, marcado pelos aniversários, está bem dentro do padrão católico." },
    { question: "Posso enviar o PDF do Ramalhete Espiritual a uma família em luto?", answer: "Sim, e eles vão guardá-lo. Um registro impresso de cada nome que rezou pelo seu ente querido, cada dia que foi coberto, é uma das coisas mais concretas que você pode entregar a alguém em luto. Diz: você não esteve sozinho nisto." },
  ],
};

const griefFil: SituationContent = {
  topic: "grief",
  title: "Mga Catholic na panalangin para sa naghihinagpis na pamilya",
  description: "Mga panalangin, novena, at paraan upang mag-organisa ng patuloy na panalangin para sa isang pamilyang nawalan ng minamahal. Mula sa aklatan ng Catholic na panalangin ng PrayerTrain.",
  h1: "Mga Catholic na panalangin para sa naghihinagpis na pamilya",
  lead: "Ang pighati ay tumatagal nang higit sa libing. Tumitigil ang mga casserole, kumokonti ang mga pagbisita, at ang pamilya ay naiiwan sa isang bahay na may abrigo pa rin ng nawalang tao sa sabitan. Ang mga panalangin sa ibaba ay para sa mahabang yugto na iyon, ang mga buwan kung kailan ang karamihan ng tao ay nakapagpatuloy na pero ang pamilya ay hindi pa. Ang tradisyong Catholic ay gumagawa ng puwang para dito. Nagdarasal kami para sa mga patay. Nagdarasal kami para sa mga naiwan. Ginagawa namin ang pareho sa loob ng mahabang panahon.",
  prayers: [
    { slug: "seven-sorrows-rosary", why: "Ang Ina ng Kapighatian (Mater Dolorosa) ay ang patron ng bawat magulang na nawalan ng anak. Ang Pitong Kapighatian na Rosaryo ay isang Catholic na panalangin partikular para sa mga taong ang pighati ay may bigat ng nawalang minamahal at walang malinaw na katapusan." },
    { slug: "surrender-novena", why: "Isinulat ni Don Dolindo ang mga meditation na ito para sa kaluluwa na walang nang gagawin kundi magbigay-suko. Para sa isang naghihinagpis na pamilya, ang siyam na araw ay siyam na araw ng pagdinig, mula kay Kristo Mismo, na Siya ang nag-aasikaso." },
    { slug: "memorare", why: "Si Maria, na nakitang namatay ang sarili niyang Anak, ay ang likas na tagapamagitan para sa anumang pamilya sa pighati. Ang Memorare ay maikli ang sapat upang idasal sa bawat sandaling ang pighati ay umabot sa iyo sa kalagitnaan ng araw." },
    { slug: "novena-our-lady-perpetual-help", why: "Ang larawan ng Ina ng Laging Saklolo ay nagpapakita kay Maria na hawak ang batang Hesus habang Siya ay nagulat sa mga instrumento ng Kanyang darating na Pasyon. Ito ang Catholic na imahen ng inang nakaalam kung ano ang nararamdaman ng iyong pighati." },
    { slug: "prayer-st-francis", why: "Panginoon, gawin akong kasangkapan ng Iyong kapayapaan. Ang Panalangin ni San Francisco ay isa sa iilang panalangin na maaaring sabihin ng isang taong nasa malalim na pighati nang hindi ang mga salita ay parang pagtataksil sa pagkawala." },
    { slug: "offering-suffering", why: "Ang tradisyong Catholic ay naniniwala na ang pagdurusang inialay para sa intensyon ng iba ay tunay na panalangin. Para sa isang naghihinagpis na pamilya, ito ay isang paraan kung saan ang pagkawala mismo ay nagiging panalangin." },
  ],
  pastoralNote: "Hindi hinihiling ng tradisyong Catholic sa mga naghihinagpis na malampasan na ito. Si Papa Francisco ay nagsalita tungkol sa pagiging lehitimo ng pag-iyak kasama ng mga umiiyak, ng pighati bilang isang anyo ng pag-ibig, ng mga patay bilang bahagi pa rin ng katawan ni Kristo. Kung ang inyong panalangin ay karamihan ay luha sa loob ng mahabang panahon, iyon ay panalangin pa rin.",
  prayTogetherLead: "Ang isang PrayerTrain para sa isang naghihinagpis na pamilya ay isa sa iilang bagay na hindi tumitigil pagkatapos ng libing. Ang mga kaibigan ay nag-sign up sa mga partikular na araw sa loob ng tatlumpu, animnapu, siyamnapung araw. Alam ng pamilya na ang mga petsa ay nakuha na. Sa huli, makakatanggap sila ng Espirituwal na Bouquet PDF na may bawat pangalang nagdasal at bawat araw na sakop.",
  faqs: [
    { question: "Ano ang pinakamagandang panalangin para sa isang pamilyang nawalan ng anak?", answer: "Ang Pitong Kapighatian na Rosaryo ay isinulat eksakto para dito. Ang Ina ng Kapighatian ay nawalan ng sarili niyang Anak; ang kanyang pamamagitan para sa mga magulang sa pighati ay may bigat ng personal na karanasan. Ang Surrender Novena ay ang siyam-araw na kasama kapag kahit ang Rosaryo ay para sa sobrang dami ng salita." },
    { question: "Hanggang kailan dapat ipagpatuloy ang pagdarasal para sa isang naghihinagpis na pamilya?", answer: "Mas matagal kaysa sa kung ano ang nararamdamang komportable sa lipunan. Ang tradisyong Catholic ay nagdarasal para sa mga kaluluwa ng mga patay tuwing Nobyembre (Araw ng mga Kaluluwa, ang buong buwan na nakatuon dito). Ang isang PrayerTrain na tumatakbo ng isang taon, na minarkahan ng mga anibersaryo, ay angkop sa Catholic na padron." },
    { question: "Maaari ko bang ipadala ang Espirituwal na Bouquet PDF sa isang naghihinagpis na pamilya?", answer: "Oo, at iingatan nila ito. Isang nakalimbag na tala ng bawat pangalang nagdasal para sa kanilang minamahal, bawat araw na sakop, ay isa sa pinaka-konkretong bagay na maaari mong ibigay sa isang taong nasa pighati. Sinasabi nito: hindi ka nag-iisa dito." },
  ],
};

const griefPl: SituationContent = {
  topic: "grief",
  title: "Katolickie modlitwy za rodzinę w żałobie",
  description: "Modlitwy, nowenny i sposób na zorganizowanie ciągłej modlitwy za rodzinę, która straciła kogoś bliskiego. Z biblioteki katolickich modlitw PrayerTrain.",
  h1: "Katolickie modlitwy za rodzinę w żałobie",
  lead: "Żałoba trwa dłużej niż pogrzeb. Garnki przestają przychodzić, wizyty się zmniejszają, a rodzina zostaje w domu, w którym wciąż wisi płaszcz nieobecnej osoby. Poniższe modlitwy są na ten długi okres, miesiące, gdy większość ludzi poszła dalej, ale rodzina nie. Tradycja katolicka robi miejsce dla tego. Modlimy się za zmarłych. Modlimy się za pozostałych. Robimy oba przez długi czas.",
  prayers: [
    { slug: "seven-sorrows-rosary", why: "Matka Boża Bolesna jest patronką każdego rodzica, który stracił dziecko. Różaniec Siedmiu Boleści jest katolicką modlitwą specjalnie dla tych, których żałoba niesie ciężar utraconego bliskiego i nie ma oczywistego końca." },
    { slug: "surrender-novena", why: "Ks. Dolindo napisał te medytacje dla duszy, której nie pozostało nic innego, jak tylko zawierzyć. Dla rodziny w żałobie, dziewięć dni to dziewięć dni słuchania, od samego Chrystusa, że to On się tym zajmuje." },
    { slug: "memorare", why: "Maryja, która patrzyła, jak umiera Jej własny Syn, jest naturalnym pośrednikiem dla każdej rodziny w żałobie. Pomnij jest na tyle krótka, by odmówić ją za każdym razem, gdy żałoba dopada cię w środku dnia." },
    { slug: "novena-our-lady-perpetual-help", why: "Ikona Matki Bożej Nieustającej Pomocy pokazuje Maryję trzymającą Dzieciątko Jezus, gdy On wzdraga się przed narzędziami swojej przyszłej Męki. To katolicki obraz matki, która wie, jak czuje się twoja żałoba." },
    { slug: "prayer-st-francis", why: "Panie, uczyń mnie narzędziem Twojego pokoju. Modlitwa św. Franciszka jest jedną z niewielu modlitw, które mogą być odmawiane przez kogoś w głębokiej żałobie bez wrażenia, że słowa są zdradą straty." },
    { slug: "offering-suffering", why: "Tradycja katolicka utrzymuje, że cierpienie ofiarowane w czyjejś intencji jest prawdziwą modlitwą. Dla rodziny w żałobie, to jeden ze sposobów, w jaki sama strata staje się wstawiennictwem." },
  ],
  pastoralNote: "Tradycja katolicka nie wymaga od żałobników, by się z tego otrząsnęli. Papież Franciszek mówił o legitymacji płaczu z tymi, którzy płaczą, o żałobie jako formie miłości, o zmarłych jako wciąż części Ciała Chrystusa. Jeśli twoja modlitwa to głównie łzy przez długi czas, to wciąż jest modlitwą.",
  prayTogetherLead: "PrayerTrain za rodzinę w żałobie jest jedną z niewielu rzeczy, które nie kończą się po pogrzebie. Przyjaciele zapisują się na konkretne dni przez trzydzieści, sześćdziesiąt, dziewięćdziesiąt dni. Rodzina wie, że daty zostały zajęte. Na końcu otrzymują PDF Duchowego Bukietu z każdym imieniem, które się modliło, i każdym dniem, który został pokryty.",
  faqs: [
    { question: "Jaka jest najlepsza modlitwa za rodzinę, która straciła dziecko?", answer: "Różaniec Siedmiu Boleści został napisany dokładnie do tego. Matka Boża Bolesna straciła swojego Syna; jej wstawiennictwo za rodzicami w żałobie niesie ciężar osobistego doświadczenia. Nowenna Zawierzenia jest dziewięciodniowym towarzyszem, gdy nawet Różaniec wydaje się zbyt wieloma słowami." },
    { question: "Jak długo powinniśmy modlić się za rodzinę w żałobie?", answer: "Dłużej, niż wydaje się to społecznie wygodne. Tradycja katolicka modli się za dusze zmarłych w listopadzie każdego roku (Dzień Zaduszny, cały miesiąc poświęcony temu). PrayerTrain, który trwa rok, zaznaczony rocznicami, doskonale pasuje do katolickiego wzorca." },
    { question: "Czy mogę wysłać PDF Duchowego Bukietu rodzinie w żałobie?", answer: "Tak, i zachowają go. Drukowany zapis każdego imienia, które modliło się za ich bliskiego, każdego dnia, który został pokryty, jest jedną z najbardziej konkretnych rzeczy, jakie możesz wręczyć komuś w żałobie. Mówi: nie byłeś sam w tym." },
  ],
};

// ─────────────────────────────────────────────────────────────────
// ADDICTION
// ─────────────────────────────────────────────────────────────────

const addictionEs: SituationContent = {
  topic: "addiction",
  title: "Oraciones católicas por alguien que lucha con la adicción",
  description: "Oraciones y formas de organizar oración silenciosa por un amigo o familiar que atraviesa la adicción. De la biblioteca de oraciones católicas de PrayerTrain.",
  h1: "Oraciones católicas por alguien que lucha con la adicción",
  lead: "Orar por alguien en adicción activa es una de las formas más largas de oración que existen. No hay un arco claro de nueve días. No hay una respuesta clara sobre si serán libres. Solo hay el presentarse diariamente, a menudo en privado, a menudo sin ningún resultado visible, a menudo durante años. La tradición católica tiene lenguaje para esto. Santa Mónica oró por su hijo Agustín durante diecisiete años. Él se convirtió en santo. Ella no sabía que eso vendría.",
  prayers: [
    { slug: "novena-st-jude", why: "San Judas Tadeo es el patrono de la Iglesia para casos imposibles y desesperados. La adicción es la situación moderna para la que se le dio su patronato: la persona que amas está caminando por un camino que nadie puede caminar por ella, y la familia queda para orar." },
    { slug: "prayer-conversion", why: "Una oración directa por la conversión de alguien cuya vida está actualmente cautiva. Úsala sin expectativa de que la oración será respondida en tu cronograma." },
    { slug: "prayer-serenity", why: "Dios, concédeme la serenidad para aceptar las cosas que no puedo cambiar. Originalmente escrita para los que están en recuperación; igualmente una oración para la familia que no puede arreglar la situación y no puede dejar de amar a la persona que está en ella." },
    { slug: "surrender-novena", why: "La frase más dura de la Novena de la Rendición, para un familiar de alguien en adicción, es la que dice: tú no te vuelves hacia mí, quieres que yo me adapte a tus ideas. Don Dolindo nombra la tentación de seguir diciéndole a Dios cómo arreglar la situación. La novena es nueve días de practicar devolverla." },
    { slug: "rosary-for-healing", why: "La intercesión de María por el hijo pródigo es uno de los patrones católicos más antiguos. El Rosario, rezado diariamente, no es una fórmula mágica. Es la disciplina de permanecer de rodillas mientras la situación sigue su curso." },
    { slug: "memorare", why: "La oración de Santa Mónica, la oración de la madre de Agustín, la oración de todo padre de alguien en adicción. Corta, feroz, repetible." },
  ],
  pastoralNote: "La Iglesia Católica no le dice a las familias de los que están en adicción que la persona adicta mejorará si oran lo suficientemente fuerte. Les dice que la oración es una forma de amor que no depende de las elecciones del ser querido. Estás orando no porque arreglará la situación sino porque el amor no deja de ser amor cuando el ser querido no puede responder a él. Santa Mónica y San Agustín son los compañeros católicos por excelencia en este camino.",
  prayTogetherLead: "Un PrayerTrain por alguien en adicción puede configurarse anónimamente. El receptor no necesita saber que su nombre está en una página pública. Amigos y familia que oran por ellos se inscriben silenciosamente, por fecha, y tienes un calendario de intercesión que el ser querido puede que nunca vea y para el cual puede que no esté listo.",
  faqs: [
    { question: "¿Está bien orar por alguien en adicción sin decírselo?", answer: "Sí. La tradición católica siempre ha hecho lugar para la intercesión oculta. Santa Mónica oró por Agustín durante años antes de que él estuviera listo para escucharlo. Tu oración es una forma de amor que no requiere el permiso o conciencia del ser querido." },
    { question: "¿Debo compartir su nombre en una página pública de PrayerTrain?", answer: "No a menos que les hayas preguntado y hayan dicho que sí. La adicción ya carga suficiente vergüenza; una página pública que los nombra sin consentimiento puede herir en lugar de ayudar. PrayerTrain tiene una opción anónima que permite a una comunidad orar por alguien cuyo nombre permanece privado." },
    { question: "¿Y si he estado orando durante años y nada ha cambiado?", answer: "Santa Mónica oró por Agustín durante diecisiete años. La oración no fue en vano. Era el amor continuando donde la relación no podía. La tradición católica no mide la oración por resultados visibles; mide el amor por la fidelidad a través del tiempo." },
    { question: "¿Debo orar con ellos o por ellos?", answer: "Ambas, cuando sea posible. Orar con alguien en adicción (cuando estén dispuestos) es una forma de acompañamiento que puede mantener unida una relación. Orar por ellos es lo que haces cuando no pueden orar por sí mismos." },
  ],
};

const addictionPtBR: SituationContent = {
  topic: "addiction",
  title: "Orações católicas por alguém que luta com vício",
  description: "Orações e formas de organizar oração silenciosa por um amigo ou familiar atravessando o vício. Da biblioteca de orações católicas do PrayerTrain.",
  h1: "Orações católicas por alguém que luta com vício",
  lead: "Rezar por alguém em vício ativo é uma das formas mais longas de oração que existem. Não há arco claro de nove dias. Não há resposta clara sobre se eles serão libertos. Há apenas o comparecimento diário, frequentemente em privado, frequentemente sem resultado visível, frequentemente por anos. A tradição católica tem linguagem para isto. Santa Mônica rezou pelo filho Agostinho por dezessete anos. Ele se tornou santo. Ela não sabia que isso viria.",
  prayers: [
    { slug: "novena-st-jude", why: "São Judas Tadeu é o padroeiro da Igreja para causas impossíveis e desesperadas. O vício é a situação moderna para a qual seu patronato foi dado: a pessoa que você ama está caminhando por uma estrada que ninguém pode caminhar por ela, e a família fica para rezar." },
    { slug: "prayer-conversion", why: "Uma oração direta pela conversão de alguém cuja vida está atualmente em cativeiro. Use-a sem expectativa de que a oração será respondida no seu cronograma." },
    { slug: "prayer-serenity", why: "Deus, conceda-me a serenidade para aceitar as coisas que não posso mudar. Originalmente escrita para os que estão em recuperação; igualmente uma oração para a família que não pode consertar a situação e não pode parar de amar a pessoa que está nela." },
    { slug: "surrender-novena", why: "A frase mais dura da Novena da Rendição, para um familiar de alguém em vício, é a que diz: você não se volta para mim, você quer que eu me adapte às suas ideias. Dom Dolindo nomeia a tentação de continuar dizendo a Deus como consertar a situação. A novena é nove dias de praticar devolvê-la." },
    { slug: "rosary-for-healing", why: "A intercessão de Maria pelo filho pródigo é um dos padrões católicos mais antigos. O Terço, rezado diariamente, não é uma fórmula mágica. É a disciplina de permanecer ajoelhado enquanto a situação segue seu curso." },
    { slug: "memorare", why: "A oração de Santa Mônica, a oração da mãe de Agostinho, a oração de todo pai de alguém em vício. Curta, feroz, repetível." },
  ],
  pastoralNote: "A Igreja Católica não diz às famílias dos que estão em vício que a pessoa viciada vai melhorar se você rezar com força suficiente. Diz a elas que a oração é uma forma de amor que não depende das escolhas do ente querido. Você está rezando não porque vai consertar a situação, mas porque o amor não deixa de ser amor quando o ente querido não pode responder a ele. Santa Mônica e Santo Agostinho são os companheiros católicos por excelência neste caminho.",
  prayTogetherLead: "Um PrayerTrain por alguém em vício pode ser configurado anonimamente. O destinatário não precisa saber que seu nome está numa página pública. Amigos e familiares que rezam por eles se inscrevem em silêncio, por data, e você tem um calendário de intercessão que o ente querido pode nunca ver e para o qual pode não estar pronto.",
  faqs: [
    { question: "É bom rezar por alguém em vício sem dizer a ele?", answer: "Sim. A tradição católica sempre fez espaço para intercessão oculta. Santa Mônica rezou por Agostinho por anos antes que ele estivesse pronto para ouvir sobre isso. Sua oração é uma forma de amor que não requer permissão ou consciência do ente querido." },
    { question: "Devo compartilhar o nome dele em uma página pública do PrayerTrain?", answer: "Não, a menos que você tenha perguntado e ele tenha dito sim. O vício já carrega vergonha suficiente; uma página pública que o nomeia sem consentimento pode ferir em vez de ajudar. PrayerTrain tem uma opção anônima que permite a uma comunidade rezar por alguém cujo nome permanece privado." },
    { question: "E se eu tenho rezado por anos e nada mudou?", answer: "Santa Mônica rezou por Agostinho por dezessete anos. A oração não foi desperdiçada. Era amor continuando onde o relacionamento não podia. A tradição católica não mede a oração por resultados visíveis; mede o amor pela fidelidade ao longo do tempo." },
    { question: "Devo rezar com ele ou por ele?", answer: "Ambos, quando possível. Rezar com alguém em vício (quando ele estiver disposto) é uma forma de acompanhamento que pode manter um relacionamento unido. Rezar por ele é o que você faz quando ele não pode rezar por si mesmo." },
  ],
};

const addictionFil: SituationContent = {
  topic: "addiction",
  title: "Mga Catholic na panalangin para sa isang nakikipaglaban sa pagkagumon",
  description: "Mga panalangin at paraan upang mag-organisa ng tahimik na panalangin para sa isang kaibigan o miyembro ng pamilya na dumaranas ng pagkagumon. Mula sa aklatan ng Catholic na panalangin ng PrayerTrain.",
  h1: "Mga Catholic na panalangin para sa isang nakikipaglaban sa pagkagumon",
  lead: "Ang pagdarasal para sa isang taong nasa aktibong pagkagumon ay isa sa pinakamahabang anyo ng panalangin na umiiral. Walang malinaw na siyam-araw na arko. Walang malinaw na sagot kung sila ay magiging malaya. Mayroon lamang araw-araw na pagdating, madalas sa pribado, madalas walang nakikitang resulta, madalas sa loob ng mga taon. Ang tradisyong Catholic ay may wika para dito. Si Sta. Monica ay nanalangin para sa kanyang anak na si Agustin sa loob ng labimpitong taon. Siya ay naging santo. Hindi niya alam na iyon ang darating.",
  prayers: [
    { slug: "novena-st-jude", why: "Si San Judas Tadeo ay ang patron ng Simbahan para sa imposible at desperadong kaso. Ang pagkagumon ay ang modernong sitwasyon kung saan ibinigay ang kanyang patronato: ang taong mahal mo ay naglalakad sa isang daan na walang ibang makakalakad para sa kanya, at ang pamilya ay naiwan upang manalangin." },
    { slug: "prayer-conversion", why: "Isang direktang panalangin para sa conversion ng isang taong ang buhay ay kasalukuyang bihag. Gamitin ito nang walang inaasahang ang panalangin ay sasagutin sa iyong takdang panahon." },
    { slug: "prayer-serenity", why: "Diyos, ipagkaloob sa akin ang kapanatagan upang tanggapin ang mga bagay na hindi ko mababago. Orihinal na isinulat para sa mga nasa recovery; pantay-pantay na panalangin para sa pamilyang hindi kayang ayusin ang sitwasyon at hindi kayang itigil ang pagmamahal sa taong nasa loob nito." },
    { slug: "surrender-novena", why: "Ang pinakamahirap na pangungusap sa Surrender Novena, para sa kaanak ng isang taong nasa pagkagumon, ay ang nagsasabing: hindi ka bumabaling sa akin, gusto mong mag-adapt ako sa iyong mga ideya. Pinangalanan ni Don Dolindo ang tukso ng patuloy na pagsasabi sa Diyos kung paano ayusin ang sitwasyon. Ang novena ay siyam na araw ng pagsasanay ng pagbabalik nito." },
    { slug: "rosary-for-healing", why: "Ang pamamagitan ni Maria para sa alibughang anak ay isa sa pinakamatandang Catholic na padron. Ang Rosaryo, dinarasal araw-araw, ay hindi isang mahikang pormula. Ito ay ang disiplina ng pananatili sa pagkakaluhod habang ang sitwasyon ay nagpapatuloy." },
    { slug: "memorare", why: "Ang panalangin ni Sta. Monica, ang panalangin ng ina ni Agustin, ang panalangin ng bawat magulang ng isang taong nasa pagkagumon. Maikli, mabangis, paulit-ulit." },
  ],
  pastoralNote: "Hindi sinasabi ng Catholic Church sa mga pamilya ng mga nasa pagkagumon na ang taong adik ay gagaling kung magdadasal ka nang sapat na malakas. Sinasabi nito sa kanila na ang panalangin ay isang anyo ng pag-ibig na hindi nakadepende sa mga pagpili ng minamahal. Nagdadasal ka hindi dahil ito ay aayos sa sitwasyon kundi dahil ang pag-ibig ay hindi tumitigil bilang pag-ibig kapag hindi nakakatugon ang minamahal dito. Si Sta. Monica at Santo Agustin ang pinakatampok na Catholic na kasama sa landas na ito.",
  prayTogetherLead: "Ang isang PrayerTrain para sa isang taong nasa pagkagumon ay maaaring i-setup nang hindi nagpapakilala. Hindi kailangang malaman ng tatanggap na ang kanyang pangalan ay nasa public page. Ang mga kaibigan at pamilyang nagdarasal para sa kanya ay tahimik na nag-sign up, ayon sa petsa, at mayroon kang kalendaryo ng pamamagitan na maaaring hindi makita ng minamahal at maaaring hindi pa siya handa.",
  faqs: [
    { question: "Tama bang manalangin para sa isang nasa pagkagumon nang hindi sinasabi sa kanya?", answer: "Oo. Ang tradisyong Catholic ay laging gumagawa ng puwang para sa nakatagong pamamagitan. Si Sta. Monica ay nanalangin para kay Agustin sa loob ng mga taon bago siya naging handa upang malaman ang tungkol dito. Ang iyong panalangin ay anyo ng pag-ibig na hindi nangangailangan ng pahintulot o kamalayan ng minamahal." },
    { question: "Dapat ko bang ibahagi ang kanyang pangalan sa isang public PrayerTrain page?", answer: "Hindi maliban kung tinanong mo siya at sumagot ng oo. Ang pagkagumon ay nagdadala ng sapat nang hiya; ang isang public page na nagpapakilala sa kanya nang walang pahintulot ay maaaring sumakit sa halip na tumulong. Ang PrayerTrain ay may anonymous na opsyon na nagbibigay-daan sa komunidad na manalangin para sa isang taong ang pangalan ay nananatiling pribado." },
    { question: "Paano kung naghihintay ako ng mga taon at walang nagbago?", answer: "Si Sta. Monica ay nanalangin para kay Agustin sa loob ng labimpitong taon. Hindi nasayang ang panalangin. Ito ay pag-ibig na nagpapatuloy kung saan hindi makakaya ng relasyon. Ang tradisyong Catholic ay hindi sumusukat sa panalangin sa pamamagitan ng nakikitang resulta; sinusukat nito ang pag-ibig sa pamamagitan ng katapatan sa paglipas ng panahon." },
    { question: "Dapat ba akong manalangin kasama siya o para sa kanya?", answer: "Pareho, kapag posible. Ang pagdarasal kasama ng isang nasa pagkagumon (kung handa siya) ay isang anyo ng paghahatid na maaaring panatilihing magkasama ang isang relasyon. Ang pagdarasal para sa kanila ay ang ginagawa mo kapag hindi sila kayang magdasal para sa kanilang sarili." },
  ],
};

const addictionPl: SituationContent = {
  topic: "addiction",
  title: "Katolickie modlitwy za kogoś zmagającego się z uzależnieniem",
  description: "Modlitwy i sposoby na zorganizowanie cichej modlitwy za przyjaciela lub członka rodziny przechodzącego przez uzależnienie. Z biblioteki katolickich modlitw PrayerTrain.",
  h1: "Katolickie modlitwy za kogoś zmagającego się z uzależnieniem",
  lead: "Modlenie się za kogoś w aktywnym uzależnieniu jest jedną z najdłuższych form modlitwy, jakie istnieją. Nie ma jasnego dziewięciodniowego łuku. Nie ma jasnej odpowiedzi na pytanie, czy będą wolni. Jest tylko codzienne stawanie, często w prywatności, często bez widocznego rezultatu, często przez lata. Tradycja katolicka ma na to język. Św. Monika modliła się za swojego syna Augustyna przez siedemnaście lat. Stał się świętym. Ona nie wiedziała, że to się stanie.",
  prayers: [
    { slug: "novena-st-jude", why: "Św. Juda Tadeusz jest patronem Kościoła w sprawach niemożliwych i beznadziejnych. Uzależnienie jest współczesną sytuacją, dla której powierzono mu patronat: osoba, którą kochasz, idzie drogą, którą nikt nie może za nią przejść, a rodzina zostaje, by się modlić." },
    { slug: "prayer-conversion", why: "Bezpośrednia modlitwa o nawrócenie kogoś, czyje życie jest obecnie w niewoli. Używaj jej bez oczekiwania, że modlitwa zostanie wysłuchana w twoim harmonogramie." },
    { slug: "prayer-serenity", why: "Boże, użycz mi pogody ducha, abym godził się z tym, czego zmienić nie mogę. Pierwotnie napisana dla tych w trzeźwości; równie modlitwa dla rodziny, która nie może naprawić sytuacji i nie może przestać kochać osoby, która w niej jest." },
    { slug: "surrender-novena", why: "Najtrudniejsze zdanie Nowenny Zawierzenia, dla bliskiego osoby w uzależnieniu, brzmi: nie zwracasz się do mnie, chcesz, abym dostosował się do twoich pomysłów. Ks. Dolindo nazywa pokusę ciągłego mówienia Bogu, jak naprawić sytuację. Nowenna to dziewięć dni ćwiczenia oddawania jej." },
    { slug: "rosary-for-healing", why: "Wstawiennictwo Maryi za synem marnotrawnym jest jednym z najstarszych katolickich wzorców. Różaniec, odmawiany codziennie, nie jest magiczną formułą. Jest dyscypliną pozostawania na kolanach, podczas gdy sytuacja biegnie swoim torem." },
    { slug: "memorare", why: "Modlitwa św. Moniki, modlitwa matki Augustyna, modlitwa każdego rodzica kogoś w uzależnieniu. Krótka, mocna, powtarzalna." },
  ],
  pastoralNote: "Kościół katolicki nie mówi rodzinom uzależnionych, że osoba uzależniona poprawi się, jeśli będziesz modlił się wystarczająco mocno. Mówi im, że modlitwa jest formą miłości, która nie zależy od wyborów ukochanej osoby. Modlisz się nie dlatego, że to naprawi sytuację, ale dlatego, że miłość nie przestaje być miłością, gdy ukochany nie może na nią odpowiedzieć. Św. Monika i św. Augustyn to par excellence katolickich towarzyszy na tej drodze.",
  prayTogetherLead: "PrayerTrain za kogoś w uzależnieniu może być skonfigurowany anonimowo. Odbiorca nie musi wiedzieć, że jego imię jest na publicznej stronie. Przyjaciele i rodzina, którzy się za niego modlą, zapisują się cicho, według dat, i masz kalendarz wstawiennictwa, którego ukochany może nigdy nie zobaczyć i na który może nie być gotowy.",
  faqs: [
    { question: "Czy w porządku jest modlić się za kogoś w uzależnieniu bez mówienia mu o tym?", answer: "Tak. Tradycja katolicka zawsze robiła miejsce dla ukrytego wstawiennictwa. Św. Monika modliła się za Augustyna przez lata, zanim był gotów o tym usłyszeć. Twoja modlitwa jest formą miłości, która nie wymaga zgody ani świadomości ukochanego." },
    { question: "Czy powinienem udostępnić jego imię na publicznej stronie PrayerTrain?", answer: "Nie, chyba że go zapytałeś i powiedział tak. Uzależnienie niesie już wystarczająco dużo wstydu; publiczna strona, która go wymienia bez zgody, może ranić, a nie pomagać. PrayerTrain ma opcję anonimową, która pozwala wspólnocie modlić się za kogoś, czyje imię pozostaje prywatne." },
    { question: "Co jeśli modlę się od lat i nic się nie zmieniło?", answer: "Św. Monika modliła się za Augustyna przez siedemnaście lat. Modlitwa nie była zmarnowana. Była miłością trwającą tam, gdzie relacja nie mogła. Tradycja katolicka nie mierzy modlitwy widocznymi rezultatami; mierzy miłość wiernością w czasie." },
    { question: "Czy powinienem modlić się z nim czy za niego?", answer: "Oba, kiedy to możliwe. Modlitwa z kimś w uzależnieniu (gdy jest skłonny) jest formą towarzyszenia, która może utrzymać relację razem. Modlitwa za niego jest tym, co robisz, gdy nie może modlić się sam." },
  ],
};

// ─────────────────────────────────────────────────────────────────
// INFERTILITY
// ─────────────────────────────────────────────────────────────────

const infertilityEs: SituationContent = {
  topic: "infertility",
  title: "Oraciones católicas para parejas que buscan concebir",
  description: "Oraciones y una manera de reunir comunidad para parejas que atraviesan la infertilidad. De la biblioteca de oraciones católicas de PrayerTrain.",
  h1: "Oraciones católicas para parejas que buscan concebir",
  lead: "La enseñanza católica sobre la familia y la fertilidad es rica, y la enseñanza católica sobre el sufrimiento de parejas que quieren hijos y no pueden tenerlos también es rica. Las oraciones a continuación son para la segunda parte. No son una versión católica de «reza más fuerte». Son las oraciones que las parejas católicas han rezado durante siglos a través de años de espera, y a través de la pregunta de si la espera tiene un fin.",
  prayers: [
    { slug: "prayer-fertility", why: "Una oración católica directa por el don de los hijos. Úsala sin la presión implícita de que rezarla producirá un resultado en un cronograma." },
    { slug: "prayer-expectant-mothers", why: "A menudo rezada junto con la oración por la fertilidad, especialmente cuando se espera un embarazo o cuando ha comenzado y es frágil. Pide la protección de María sobre el vientre." },
    { slug: "memorare", why: "María, la madre cuya propia concepción fue inusual y cuyo propio hijo fue concebido de manera sin precedentes, es la intercesora natural para parejas cuya familia aún no ha llegado a ser." },
    { slug: "novena-st-joseph", why: "San José es el patrono de las familias y de los padres en particular. La Novena a San José es el patrón católico para parejas que están pidiendo la familia que esperan formar. Santa Ana y San Joaquín, los abuelos de Jesús, también son patronos tradicionales para parejas en espera." },
    { slug: "surrender-novena", why: "La Novena de la Rendición de Don Dolindo es para las parejas que han rezado todas las demás oraciones y cuya respuesta hasta ahora ha sido silencio. Los nueve días no se tratan de pedir de nuevo. Se tratan de devolverlo a Cristo, lentamente, día a día." },
  ],
  pastoralNote: "La tradición católica no promete que toda pareja que rece concebirá. Sara esperó hasta ser anciana. Ana fue estéril durante años antes de Samuel. La Iglesia sostiene esas historias como parte de su Escritura no porque sean resultados garantizados sino porque muestran que la oración no fue en vano en la espera. Reza. Sigue rezando. No midas tu fe por si la oración es respondida de la manera que has pedido.",
  prayTogetherLead: "Un PrayerTrain por una pareja que busca concebir a menudo es iniciado por familia cercana o amigos, a veces de forma anónima para proteger la privacidad de la pareja. La intercesión corre silenciosamente en el fondo. Si eres la pareja, también puedes iniciar uno tú mismo e invitar a personas en quienes confías.",
  faqs: [
    { question: "¿Cuál es la mejor oración católica para la infertilidad?", answer: "La Oración por la Fertilidad y la Novena a San José son las oraciones católicas más directas para esta situación. La Novena a Santa Ana y San Joaquín, los abuelos de Jesús, es también una tradición católica para parejas en espera. La Novena de la Rendición es la oración de arco más largo para parejas que han rezado muchas otras oraciones y necesitan practicar devolver la situación a Cristo." },
    { question: "¿Debemos decirle a la gente que estamos orando por la fertilidad?", answer: "Depende de la pareja. Algunos encuentran que tener a familia cercana orando con ellos es un alivio; otros quieren privacidad. PrayerTrain apoya ambos. Si la pareja quiere que su nombre se mantenga privado, el tren puede configurarse anónimamente." },
    { question: "¿Está bien seguir orando después de años de oración no respondida?", answer: "Sí. La tradición católica no tiene un plazo de prescripción para la intercesión. Ana oró por Samuel hasta estar más allá de la esperanza; Sara esperó toda una vida por Isaac. La oración no se desperdicia en la espera, aun cuando el resultado no es lo que pediste." },
  ],
};

const infertilityPtBR: SituationContent = {
  topic: "infertility",
  title: "Orações católicas para casais que tentam conceber",
  description: "Orações e uma forma de reunir uma comunidade para casais que atravessam a infertilidade. Da biblioteca de orações católicas do PrayerTrain.",
  h1: "Orações católicas para casais que tentam conceber",
  lead: "O ensinamento católico sobre família e fertilidade é rico, e o ensinamento católico sobre o sofrimento dos casais que querem filhos e não conseguem tê-los também é rico. As orações abaixo são para a segunda parte. Elas não são uma versão católica de «reze mais forte». São as orações que casais católicos rezaram por séculos através de anos de espera, e através da pergunta sobre se a espera tem fim.",
  prayers: [
    { slug: "prayer-fertility", why: "Uma oração católica direta pelo dom dos filhos. Use-a sem a pressão implícita de que rezá-la produzirá um resultado num cronograma." },
    { slug: "prayer-expectant-mothers", why: "Frequentemente rezada junto com a oração pela fertilidade, especialmente quando se espera uma gravidez ou quando ela começou e é frágil. Pede a proteção de Maria sobre o ventre." },
    { slug: "memorare", why: "Maria, a mãe cuja própria concepção foi incomum e cujo próprio filho foi concebido de forma sem precedentes, é a intercessora natural para casais cuja família ainda não veio a ser." },
    { slug: "novena-st-joseph", why: "São José é o padroeiro das famílias e dos pais em particular. A Novena a São José é o padrão católico para casais que pedem a família que esperam formar. Sant'Ana e São Joaquim, os avós de Jesus, também são padroeiros tradicionais para casais em espera." },
    { slug: "surrender-novena", why: "A Novena da Rendição de Dom Dolindo é para os casais que rezaram todas as outras orações e cuja resposta até agora foi silêncio. Os nove dias não são sobre pedir de novo. São sobre devolvê-lo a Cristo, lentamente, dia a dia." },
  ],
  pastoralNote: "A tradição católica não promete que todo casal que rezar conceberá. Sara esperou até estar velha. Ana foi estéril por anos antes de Samuel. A Igreja mantém essas histórias como parte de sua Escritura não porque sejam resultados garantidos, mas porque mostram que a oração não foi desperdiçada na espera. Reze. Continue rezando. Não meça sua fé pelo fato de a oração ser respondida da forma como você pediu.",
  prayTogetherLead: "Um PrayerTrain por um casal que tenta conceber é frequentemente iniciado por família próxima ou amigos, às vezes anonimamente para proteger a privacidade do casal. A intercessão corre silenciosamente em segundo plano. Se você é o casal, também pode iniciar um você mesmo e convidar pessoas em quem confia.",
  faqs: [
    { question: "Qual é a melhor oração católica para infertilidade?", answer: "A Oração pela Fertilidade e a Novena a São José são as orações católicas mais diretas para esta situação. A Novena a Sant'Ana e São Joaquim, os avós de Jesus, é também uma tradição católica para casais em espera. A Novena da Rendição é a oração de arco mais longo para casais que rezaram muitas outras orações e precisam praticar devolver a situação a Cristo." },
    { question: "Devemos dizer às pessoas que estamos rezando pela fertilidade?", answer: "Depende do casal. Alguns acham que ter família próxima rezando com eles é um alívio; outros querem privacidade. PrayerTrain suporta ambos. Se o casal quiser que seu nome seja mantido em privacidade, o train pode ser configurado anonimamente." },
    { question: "É bom continuar rezando depois de anos de oração não respondida?", answer: "Sim. A tradição católica não tem prazo de prescrição para intercessão. Ana rezou por Samuel até estar além da esperança; Sara esperou uma vida inteira por Isaac. A oração não é desperdiçada na espera, mesmo quando o resultado não é o que você pediu." },
  ],
};

const infertilityFil: SituationContent = {
  topic: "infertility",
  title: "Mga Catholic na panalangin para sa mga mag-asawang sumusubok magbuntis",
  description: "Mga panalangin at paraan upang tipunin ang komunidad para sa mga mag-asawang dumaranas ng infertility. Mula sa aklatan ng Catholic na panalangin ng PrayerTrain.",
  h1: "Mga Catholic na panalangin para sa mga mag-asawang sumusubok magbuntis",
  lead: "Ang turo ng Catholic tungkol sa pamilya at fertility ay malalim, at ang turo ng Catholic tungkol sa pagdurusa ng mga mag-asawang gusto ng mga anak at hindi maaaring magkaroon ay malalim din. Ang mga panalangin sa ibaba ay para sa ikalawang bahagi. Hindi ito isang Catholic na bersyon ng «magdasal nang mas masinsinan». Sila ay mga panalanging dinasal ng mga Catholic na mag-asawa sa loob ng mga siglo sa pamamagitan ng mga taon ng paghihintay, at sa pamamagitan ng tanong kung ang paghihintay ay may katapusan.",
  prayers: [
    { slug: "prayer-fertility", why: "Isang direktang Catholic na panalangin para sa biyaya ng mga anak. Gamitin ito nang walang implicit na presyur na ang pagdarasal nito ay magbubunga ng resulta sa isang takdang panahon." },
    { slug: "prayer-expectant-mothers", why: "Madalas na idinarasal kasama ng panalangin para sa fertility, lalo na kapag inaasahan ang isang pagbubuntis o nagsimula na ito at marupok. Humihiling ng proteksyon ni Maria sa sinapupunan." },
    { slug: "memorare", why: "Si Maria, ang inang ang sariling paglilihi ay hindi pangkaraniwan at ang sariling anak ay nilikha sa paraang walang katulad, ay ang likas na tagapamagitan para sa mga mag-asawang ang pamilya ay hindi pa nagiging totoo." },
    { slug: "novena-st-joseph", why: "Si San Jose ay ang patron ng mga pamilya at ng mga ama sa partikular. Ang Novena kay San Jose ay ang Catholic na padron para sa mga mag-asawang humihiling ng pamilyang inaasahang itatag. Sta. Ana at San Joaquin, ang mga lolo at lola ni Hesus, ay tradisyonal ding patron para sa mga mag-asawang naghihintay." },
    { slug: "surrender-novena", why: "Ang Surrender Novena ni Don Dolindo ay para sa mga mag-asawang nakapagdasal na ng lahat ng iba pang panalangin at ang kanilang sagot hanggang ngayon ay katahimikan. Ang siyam na araw ay hindi tungkol sa muling paghingi. Ito ay tungkol sa pagbabalik nito kay Kristo, dahan-dahan, araw-araw." },
  ],
  pastoralNote: "Hindi nangangako ang tradisyong Catholic na bawat mag-asawang magdarasal ay magbubuntis. Naghintay si Sara hanggang siya ay matanda na. Si Ana ay baog sa loob ng mga taon bago si Samuel. Itinuturing ng Simbahan ang mga kuwentong iyon bilang bahagi ng kanyang kasulatan hindi dahil ang mga ito ay garantisadong resulta kundi dahil ipinapakita nila na hindi nasayang ang panalangin sa paghihintay. Manalangin. Patuloy na manalangin. Huwag sukatin ang iyong pananampalataya sa kung ang panalangin ay sinasagot sa paraang inyong hiniling.",
  prayTogetherLead: "Ang isang PrayerTrain para sa isang mag-asawang sumusubok magbuntis ay madalas na sinisimulan ng malalapit na pamilya o mga kaibigan, minsan nang hindi nagpapakilala upang protektahan ang privacy ng mag-asawa. Ang pamamagitan ay tumatakbo nang tahimik sa likod. Kung ikaw ang mag-asawa, maaari ka ring magsimula nang ikaw mismo at imbitahan ang mga taong pinagkakatiwalaan mo.",
  faqs: [
    { question: "Ano ang pinakamagandang Catholic na panalangin para sa infertility?", answer: "Ang Panalangin para sa Fertility at ang Novena kay San Jose ay ang pinaka-direktang Catholic na panalangin para sa sitwasyong ito. Ang Novena kina Sta. Ana at San Joaquin, ang mga lolo at lola ni Hesus, ay tradisyon din ng Catholic para sa mga mag-asawang naghihintay. Ang Surrender Novena ay ang panalangin ng mas mahabang arko para sa mga mag-asawang nakapagdasal ng maraming panalangin at kailangang magsanay ng pagbabalik ng sitwasyon kay Kristo." },
    { question: "Dapat ba naming sabihin sa mga tao na nagdarasal kami tungkol sa fertility?", answer: "Depende sa mag-asawa. Ang ilan ay nakakaramdam ng lunas sa pagkakaroon ng malapit na pamilyang nagdarasal kasama nila; ang iba ay gustong magkaroon ng privacy. Sinusuportahan ng PrayerTrain ang pareho. Kung gustong panatilihing pribado ng mag-asawa ang kanilang pangalan, maaaring i-setup ang train nang anonymous." },
    { question: "Tama bang magpatuloy na magdasal pagkatapos ng mga taon ng panalanging hindi sinasagot?", answer: "Oo. Ang tradisyong Catholic ay walang takdang panahon para sa pamamagitan. Si Ana ay nanalangin para kay Samuel hanggang siya ay lampas na sa pag-asa; si Sara ay naghintay nang buong buhay para kay Isaac. Hindi nasasayang ang panalangin sa paghihintay, kahit na ang resulta ay hindi ang inyong hiniling." },
  ],
};

const infertilityPl: SituationContent = {
  topic: "infertility",
  title: "Katolickie modlitwy dla par starających się o dziecko",
  description: "Modlitwy i sposób na zgromadzenie wspólnoty dla par przechodzących przez niepłodność. Z biblioteki katolickich modlitw PrayerTrain.",
  h1: "Katolickie modlitwy dla par starających się o dziecko",
  lead: "Nauczanie katolickie o rodzinie i płodności jest bogate, a nauczanie katolickie o cierpieniu par, które chcą dzieci i nie mogą ich mieć, też jest bogate. Poniższe modlitwy są dla drugiej części. Nie są one katolicką wersją «módl się mocniej». Są modlitwami, które katolickie pary odmawiały przez wieki przez lata oczekiwania, i przez pytanie, czy oczekiwanie ma koniec.",
  prayers: [
    { slug: "prayer-fertility", why: "Bezpośrednia katolicka modlitwa o dar dzieci. Używaj jej bez ukrytej presji, że jej odmawianie przyniesie rezultat w jakimś harmonogramie." },
    { slug: "prayer-expectant-mothers", why: "Często odmawiana wraz z modlitwą o płodność, zwłaszcza gdy ciąża jest oczekiwana lub gdy się rozpoczęła i jest delikatna. Prosi o opiekę Maryi nad łonem." },
    { slug: "memorare", why: "Maryja, matka, której własne poczęcie było niezwykłe i której własny Syn został poczęty w sposób bezprecedensowy, jest naturalnym pośrednikiem dla par, których rodzina jeszcze nie zaistniała." },
    { slug: "novena-st-joseph", why: "Św. Józef jest patronem rodzin i ojców w szczególności. Nowenna do św. Józefa jest katolickim wzorcem dla par, które proszą o rodzinę, którą mają nadzieję założyć. Św. Anna i Joachim, dziadkowie Jezusa, są również tradycyjnymi patronami dla par oczekujących." },
    { slug: "surrender-novena", why: "Nowenna Zawierzenia ks. Dolindo jest dla par, które odmówiły każdą inną modlitwę i których odpowiedź dotąd to milczenie. Dziewięć dni nie polega na ponownym proszeniu. Polega na oddawaniu tego Chrystusowi, powoli, dzień po dniu." },
  ],
  pastoralNote: "Tradycja katolicka nie obiecuje, że każda para, która się modli, pocznie. Sara czekała aż do starości. Anna była niepłodna przez lata zanim urodziła Samuela. Kościół trzyma te historie jako część swojego pisma nie dlatego, że są gwarantowanymi rezultatami, ale dlatego, że pokazują, że modlitwa nie była zmarnowana w oczekiwaniu. Módl się. Módl się dalej. Nie mierz swojej wiary tym, czy modlitwa jest wysłuchana w sposób, w jaki prosiłeś.",
  prayTogetherLead: "PrayerTrain za parę starającą się o dziecko jest często zakładany przez bliską rodzinę lub przyjaciół, czasem anonimowo, aby chronić prywatność pary. Wstawiennictwo płynie cicho w tle. Jeśli jesteście parą, możecie również założyć go sami i zaprosić osoby, którym ufacie.",
  faqs: [
    { question: "Jaka jest najlepsza katolicka modlitwa na niepłodność?", answer: "Modlitwa o Płodność i Nowenna do św. Józefa to najbardziej bezpośrednie katolickie modlitwy na tę sytuację. Nowenna do św. Anny i Joachima, dziadków Jezusa, jest również katolicką tradycją dla par oczekujących. Nowenna Zawierzenia jest modlitwą o dłuższym łuku dla par, które odmówiły wiele innych modlitw i muszą ćwiczyć oddawanie sytuacji Chrystusowi." },
    { question: "Czy powinniśmy mówić ludziom, że modlimy się o płodność?", answer: "To zależy od pary. Niektórzy uważają, że bliska rodzina modląca się z nimi jest ulgą; inni chcą prywatności. PrayerTrain wspiera oba. Jeśli para chce, by jej imię pozostało prywatne, train może być skonfigurowany anonimowo." },
    { question: "Czy w porządku jest modlić się dalej po latach niewysłuchanej modlitwy?", answer: "Tak. Tradycja katolicka nie ma terminu przedawnienia dla wstawiennictwa. Anna modliła się o Samuela aż do utraty nadziei; Sara czekała całe życie na Izaaka. Modlitwa nie jest zmarnowana w oczekiwaniu, nawet gdy rezultat nie jest tym, o co prosiłeś." },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Registry
// ─────────────────────────────────────────────────────────────────

const overrides: Partial<
  Record<Locale, Partial<Record<string, SituationContent>>>
> = {
  es: {
    cancer: cancerEs,
    "sick-child": sickChildEs,
    surgery: surgeryEs,
    grief: griefEs,
    addiction: addictionEs,
    infertility: infertilityEs,
  },
  "pt-BR": {
    cancer: cancerPtBR,
    "sick-child": sickChildPtBR,
    surgery: surgeryPtBR,
    grief: griefPtBR,
    addiction: addictionPtBR,
    infertility: infertilityPtBR,
  },
  fil: {
    cancer: cancerFil,
    "sick-child": sickChildFil,
    surgery: surgeryFil,
    grief: griefFil,
    addiction: addictionFil,
    infertility: infertilityFil,
  },
  pl: {
    cancer: cancerPl,
    "sick-child": sickChildPl,
    surgery: surgeryPl,
    grief: griefPl,
    addiction: addictionPl,
    infertility: infertilityPl,
  },
};

/**
 * Returns the locale-specific SituationContent if one is registered,
 * or the English fallback from content.ts. Unknown locales / topics
 * go straight to the fallback.
 */
export function getSituationContent(
  locale: Locale,
  topic: string,
): SituationContent | undefined {
  const localeOverrides = overrides[locale];
  const override = localeOverrides?.[topic];
  return override ?? SITUATIONS[topic];
}
