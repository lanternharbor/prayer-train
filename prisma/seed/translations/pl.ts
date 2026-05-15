import type { PrayerTranslationSeed } from "./types";

/**
 * Polish (pl) translations of PrayerType content.
 *
 * Authoring conventions:
 *  - **Source tier**: KEP (Konferencja Episkopatu Polski), Vatican.va
 *    Polish, Wydawnictwo M / Salwator / Pallottinum publishers for
 *    canonical Polish prayer texts.
 *  - **Register**: liturgically formal. Polish Catholic devotional
 *    speech is more formal than pt-BR / fil; lean into that convention.
 *    Use established Polish prayer phrases ("Ojcze nasz", "Zdrowaś
 *    Maryjo", "Chwała Ojcu") rather than reinventing.
 *  - **Catholic register**: `módlmy się za` ("za" is the devotional
 *    preposition; matches the email dictionary convention).
 *  - **Brand names stay English**: `PrayerTrain`, `Surrender Novena`.
 *  - **`prayerText` left null** — canonical Polish prayer wording
 *    should be drawn from KEP / Vatican.va sources in a separate
 *    focused pass. Helper falls back to English prayer text under
 *    the Polish description + instructions.
 */
export const plTranslations: PrayerTranslationSeed[] = [
  {
    prayerSlug: "novena-sacred-heart",
    name: "Nowenna do Najświętszego Serca Jezusa",
    description:
      "Nowenna do Najświętszego Serca Jezusa jest jedną z najbardziej umiłowanych form pobożności w Kościele katolickim, narodzoną z objawień Jezusa świętej Małgorzacie Marii Alacoque w Paray-le-Monial we Francji w latach 1673-1675. W tych objawieniach Chrystus ukazał głębię swojej miłości do ludzkości, symbolizowanej przez Jego Serce przebite i ukoronowane cierniem, i poprosił, aby ta miłość była czczona przez nabożeństwo do Jego Najświętszego Serca. Nowenna obejmuje dziewięć kolejnych dni modlitwy (liczba dziewięć przypomina dziewięć dni, które apostołowie i Maryja spędzili na modlitwie między Wniebowstąpieniem a Zesłaniem Ducha Świętego) i jest tradycyjnie ofiarowana z ufnością w miłosierdzie Chrystusa wobec cierpiących. Jest szczególnie odpowiednia w czasach choroby, trudności rodzinnych, duchowej oschłości lub wytrwałych intencji, które dotąd nie znalazły odpowiedzi. Najświętsze Serce nie jest jedynie symbolem; jest historycznym, fizycznym Sercem Chrystusa, w pełni ludzkim i w pełni boskim, źródłem Jego nieskończonej miłości. Encyklika Haurietis Aquas papieża Piusa XII (1956) opisuje Najświętsze Serce jako «tron miłosierdzia» i potwierdza centralne miejsce tego nabożeństwa w życiu Kościoła. Wojownicy modlitwy, którzy ofiarowują tę nowennę, dołączają do wieków katolików, którzy złożyli swoją ufność w zranionym Sercu Zbawiciela.",
    instructions:
      "Módl się raz dziennie przez dziewięć kolejnych dni, mniej więcej o tej samej porze każdego dnia. Wybierz ciche miejsce i rozpocznij od Znaku Krzyża. Tradycyjna struktura: (1) modlitwa wstępna, często «O Najświętsze Serce Jezusa, w Tobie pokładam całą moją ufność»; (2) sam tekst nowenny; (3) Ojcze nasz, Zdrowaś Maryjo i Chwała Ojcu; (4) osobista intencja wymieniona głośno lub w milczeniu. Wielu dodaje Litanię do Najświętszego Serca Jezusa w ostatnim dniu lub modli się nowenną w połączeniu z nabożeństwem Pierwszych Piątków — przyjmując Komunię Świętą w dziewięć kolejnych pierwszych piątków, jak sam Chrystus prosił świętą Małgorzatę Marię. Nowenna może być odmawiana o każdej porze roku, ale jest szczególnie odpowiednia w miesiącu czerwcu (miesiąc Najświętszego Serca), w dniach poprzedzających Uroczystość Najświętszego Serca (piątek po Bożym Ciele), lub gdy ktoś staje wobec szczególnie trudnego momentu. Jeśli zostanie pominięty jeden dzień, tradycyjna rada brzmi: rozpocząć od pierwszego dnia zamiast pomijać; dyscyplina kolejnych dni modlitwy jest sama w sobie częścią łaski tej pobożności. Niektórzy modlą się każdego dnia nowenny za konkretną osobę; inni ofiarują wszystkie dziewięć dni za jedną intencję.",
    patronSaint: "Święta Małgorzata Maria Alacoque",
    feastDay: "Piątek po Bożym Ciele",
    source:
      "KEP materials in Polish + Vatican.va Polish-language editions + traditional Polish Catholic devotional sources for the Sacred Heart novena. Historical claims verified against Haurietis Aquas (Pius XII, 1956) and the published account of the Paray-le-Monial apparitions. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-st-joseph",
    name: "Nowenna do świętego Józefa",
    description:
      "Święty Józef, ojciec adopcyjny Jezusa i czysty oblubieniec Najświętszej Maryi Panny, jest jednym z najukochaniej szych pośredników w tradycji katolickiej. Choć Pismo Święte nie zapisuje od niego żadnego słowa, jego wierność jest niezaprzeczalna: ochronił Świętą Rodzinę w ucieczce do Egiptu, utrzymywał ich pracą swoich rąk i nauczył Jezusa rzemiosła stolarskiego oraz drogi wiernej męskości. Papież Pius IX nadał mu tytuł Patrona Kościoła Powszechnego w 1870 roku, a papież Franciszek ogłosił okres 2020-2021 Rokiem Świętego Józefa przez list apostolski Patris Corde («Z Sercem Ojca»). Ta nowenna czerpie z długiej tradycji katolickiej rozpoznającej świętego Józefa jako patrona ojców, robotników, rodzin, spraw nieruchomościowych i dobrej śmierci — czterech filarów jego ziemskiego posługiwania. Wzywany jest szczególnie w chwilach trudności finansowych, niezgody w rodzinie, problemów zawodowych i przy rozeznawaniu powołania. Wielu katolików zobowiązuje się do nowenny w dniach poprzedzających jedno z jego świąt: 19 marca (Uroczystość świętego Józefa, Oblubieńca Najświętszej Maryi Panny) lub 1 maja (święty Józef Robotnik, ustanowione przez papieża Piusa XII w 1955 roku dla uświęcenia pracy ludzkiej). Święta Teresa z Ávili napisała: «Innym świętym, jak się wydaje, Pan dał łaskę, by wspomagali nas w pewnych szczególnych potrzebach; lecz temu chwalebnemu świętemu, jak wiem z doświadczenia, dał łaskę, by wspomagał nas we wszystkich».",
    instructions:
      "Módl się raz dziennie przez dziewięć kolejnych dni. Tradycyjna struktura: rozpocznij od Znaku Krzyża; odmów tekst nowenny; zakończ Ojcze nasz, Zdrowaś Maryjo i Chwała Ojcu; wymień swoją konkretną intencję. Niektóre katolickie rodziny dodają Litanię do świętego Józefa lub siedem Ojcze nasz, Zdrowaś Maryjo i Chwała Ojcu na cześć Siedmiu Boleści i Siedmiu Radości świętego Józefa — tradycyjna pobożność związana z jego radosnymi i bolesnymi doświadczeniami w życiu Świętej Rodziny. Dla rodzin rozeznających ważną decyzję życiową (zmiana pracy, przeprowadzka, małżeństwo) zwyczajem jest rozpocząć nowennę dziewięć dni przed momentem, w którym decyzja musi być podjęta, prosząc o wstawiennictwo świętego Józefa o jasność i łaskę przyjęcia woli Bożej. Nowenna jest też tradycyjnie odmawiana w miesiącu marcu (miesiąc świętego Józefa) lub w połączeniu z popularną praktyką zakopywania figurki świętego Józefa w związku ze sprzedażą domu — tradycja ludowa, która podkreśla spokojną ufność, a nie przesąd. Czy nowenna jest odmawiana o rozeznanie powołania, o zaopatrzenie finansowe, o uzdrowienie rodziny czy o dobrą śmierć (jedno z czterech tradycyjnych celów tej pobożności), duch powinien być cichy i pracowicie ufny — sama postawa, którą święty Józef ukazał w Piśmie Świętym.",
    patronSaint: "Święty Józef",
    feastDay: "19 marca / 1 maja",
    source:
      "Patris Corde (Francis, 2020) + KEP materials in Polish + traditional Polish Catholic devotional sources for the St. Joseph novena. The St. Teresa of Ávila quotation is from her Życie (autobiography, chapter 6). Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "holy-rosary",
    name: "Różaniec Święty",
    description:
      "Różaniec Święty jest centralnym nabożeństwem maryjnym Kościoła katolickiego — modlitwą kontemplacyjną, w której wierzący rozważa wielkie tajemnice życia, śmierci i zmartwychwstania Chrystusa, odmawiając powtarzające się dziesiątki Zdrowaś Maryjo. Różaniec w obecnym kształcie nabrał formy na przestrzeni wieków; tradycja głosi, że Najświętsza Maryja Panna dała Różaniec świętemu Dominikowi w 1208 roku jako duchową broń przeciwko herezji albigensów, a struktura piętnastu tajemnic została skodyfikowana przez papieża świętego Piusa V w 1569 roku. W 2002 roku papież święty Jan Paweł II dodał Tajemnice Światła w swoim liście apostolskim Rosarium Virginis Mariae, doprowadzając całość do dwudziestu tajemnic zgrupowanych w czterech zestawach. Każda dziesiątka jest medytacją: gdy palce poruszają się po koralikach, a usta wymawiają Zdrowaś Maryjo, umysł zatrzymuje się na chwili z Ewangelii — Zwiastowanie, Ukrzyżowanie, Zmartwychwstanie, Przemienienie. Różaniec nie jest pustym powtarzaniem (Mt 6,7), ale szkołą kontemplacji, pozwalającą rytmowi modlitw uwolnić umysł do refleksji nad tajemnicami zbawienia. Papieże, od Leona XIII (którego jedenaście encyklik o Różańcu pozostaje magisterialnymi punktami odniesienia) do Franciszka, wzywali wiernych do codziennej modlitwy Różańcem. To modlitwa ofiarowana w Lourdes, Fatimie i niezliczonych innych objawieniach maryjnych, oraz modlitwa najczęściej odmawiana przez katolickie rodziny zgromadzone przy łóżku chorego lub przy grobie.",
    instructions:
      "Pełny Różaniec składa się z pięciu dziesiątek, zazwyczaj odmawiany w około dwadzieścia minut. Rozpocznij od Znaku Krzyża i Składu Apostolskiego na krzyżyku. Na pierwszym dużym koraliku odmów Ojcze nasz; na każdym z trzech małych koralików, które następują, odmów Zdrowaś Maryjo (o wzrost trzech cnót teologalnych — wiary, nadziei i miłości); na następnym dużym koraliku odmów Chwała Ojcu. Następnie ogłoś pierwszą tajemnicę głośno i krótko rozważ jej znaczenie; odmów Ojcze nasz na dużym koraliku, dziesięć Zdrowaś Maryjo na dziesięciu małych koralikach (po jednym na koralik), kontynuując rozważanie tajemnicy, potem Chwała Ojcu i Modlitwę Fatimską («O mój Jezu, przebacz nam nasze grzechy, zachowaj nas od ognia piekielnego…»). Powtórz dla czterech kolejnych dziesiątek, ogłaszając każdą tajemnicę. Zakończ Pod Twoją obronę i modlitwą Różańca. Cztery zestawy tajemnic są tradycyjnie odmawiane: Tajemnice Radosne w poniedziałki i soboty (Zwiastowanie, Nawiedzenie, Narodzenie, Ofiarowanie, Znalezienie w świątyni); Bolesne we wtorki i piątki (Modlitwa w Ogrójcu, Biczowanie, Cierniem Ukoronowanie, Niesienie Krzyża, Ukrzyżowanie); Chwalebne w środy i niedziele (Zmartwychwstanie, Wniebowstąpienie, Zesłanie Ducha Świętego, Wniebowzięcie, Ukoronowanie Maryi); Światła w czwartki (Chrzest, Wesele w Kanie, Głoszenie Królestwa, Przemienienie, Ustanowienie Eucharystii). Dla pokrycia w PrayerTrain pojedyncza dziesiątka — lub nawet jedno Zdrowaś Maryjo ofiarowane z intencją — jest również ważną ofiarą Różańca.",
    patronSaint: "Matka Boża Różańcowa",
    feastDay: "7 października",
    source:
      "Rosarium Virginis Mariae (St. John Paul II, 2002) + Leo XIII's eleven rosary encyclicals + KEP-approved Polish prayer book editions of the Rosary text. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "chaplet-divine-mercy",
    name: "Koronka do Bożego Miłosierdzia",
    description:
      "Koronka do Bożego Miłosierdzia została dana przez Jezusa świętej Marii Faustynie Kowalskiej, polskiej zakonnicy, w serii objawień między 1931 a 1938 rokiem, zapisanych w jej Dzienniczku: Miłosierdzie Boże w mojej duszy. Koronka jest potężną modlitwą wstawienniczą ofiarowaną za nawrócenie grzeszników, pocieszenie umierających i miłosierdzie Boże dla całego świata. Jezus powiedział Faustynie, że kto odmówi tę koronkę, otrzyma «wielkie miłosierdzie w godzinie śmierci» — i że szczególnie raduje się tą modlitwą odmawianą o godzinie 15:00, Godzinie Miłosierdzia (godzinie Jego śmierci na Kalwarii). Koronka jest odmawiana na zwykłym różańcu, co czyni ją dostępną każdemu, kto ma różaniec, i zajmuje około dziesięciu minut. Nabożeństwo do Bożego Miłosierdzia było stłumione przez wiele lat, ale papież święty Jan Paweł II — sam Polak i rodak świętej Faustyny — kanonizował ją 30 kwietnia 2000 roku i ustanowił Święto Bożego Miłosierdzia (druga niedziela wielkanocna) jako święto dla całego Kościoła powszechnego. Koronka do Bożego Miłosierdzia stała się jedną z najczęściej odmawianych form pobożności we współczesnym Kościele, szczególnie cenioną przez kapelanów szpitalnych, wolontariuszy hospicjów i tych, którzy modlą się o nawrócenie bliskich. To codzienna modlitwa w Narodowym Sanktuarium Bożego Miłosierdzia w Stockbridge w Massachusetts i w Sanktuarium Bożego Miłosierdzia w Łagiewnikach w Krakowie — miejscu, gdzie Faustyna żyła, umarła i obecnie spoczywa.",
    instructions:
      "Używając zwykłego różańca pięciodziesiątkowego, rozpocznij od Znaku Krzyża, Ojcze nasz, Zdrowaś Maryjo i Składu Apostolskiego na krzyżyku i początkowych koralikach. Na każdym z pięciu dużych koralików (gdzie zazwyczaj odmawia się Ojcze nasz) odmów: «Ojcze Przedwieczny, ofiaruję Ci Ciało i Krew, Duszę i Bóstwo najmilszego Syna Twojego, a Pana naszego Jezusa Chrystusa na przebłaganie za grzechy nasze i całego świata». Na każdym z dziesięciu małych koralików każdej dziesiątki odmów: «Dla Jego bolesnej męki miej miłosierdzie dla nas i całego świata». Po wszystkich pięciu dziesiątkach zakończ trzykrotnym: «Święty Boże, Święty Mocny, Święty Nieśmiertelny, zmiłuj się nad nami i nad całym światem». Koronka jest szczególnie potężna, gdy odmawiana o godzinie 15:00 (Godzina Miłosierdzia), przy łóżku umierających, w dziewięć dni przed Niedzielą Bożego Miłosierdzia (Nowenna do Miłosierdzia Bożego, rozpoczynająca się w Wielki Piątek) oraz w chwilach osobistego cierpienia lub lęku. Można ją odmawiać w ciszy, na głos, samemu lub w grupie. Wiele parafii odmawia koronkę co tydzień, często w piątki, w pamięć o męce Chrystusa. Katolicy modlący się o nawrócenie lub spokojną śmierć bliskiej osoby często zobowiązują się do codziennego odmawiania koronki przez dłuższy okres — miesiąc, czas trwania choroby, czas poprzedzający ważną decyzję. Koronka naturalnie łączy się z udziałem w Nowennie do Bożego Miłosierdzia od Wielkiego Piątku do Niedzieli Bożego Miłosierdzia.",
    patronSaint: "Święta Faustyna Kowalska",
    feastDay: "Niedziela Miłosierdzia Bożego",
    source:
      "Dzienniczek: Miłosierdzie Boże w mojej duszy (św. Faustyna Kowalska) + canonical chaplet text approved by the Holy See following St. John Paul II's canonization of Faustina (April 30, 2000). The Łagiewniki Sanctuary's official Polish-language chaplet text is the canonical source. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "memorare",
    name: "Modlitwa Memorare (Pomnij)",
    description:
      "Memorare jest krótką, ale niezwykle potężną modlitwą zaufania we wstawiennictwo Najświętszej Maryi Panny. Bierze swoją nazwę od pierwszego łacińskiego słowa tekstu, Memorare («Pomnij»), i w obecnej formie przypisywana jest księdzu Claude'owi Bernardowi, francuskiemu kapłanowi z XVII wieku znanemu jako «Ubogi Kapłan» ze względu na jego apostolstwo wśród więźniów i umierających. Modlitwa zyskała popularność dzięki rozdaniu przez księdza Bernarda ponad 200 000 ulotek w Paryżu przed Rewolucją, choć jej korzenie pobożności sięgają dalej — prawdopodobnie do dłuższej modlitwy przypisywanej świętemu Bernardowi z Clairvaux (1090-1153), wielkiemu cysterskiemu opatowi i Doktorowi Kościoła, którego maryjne nabożeństwo ukształtowało zachodnią pobożność. Struktura modlitwy jest pełnym ufności wezwaniem: uznaje powszechne macierzyństwo Maryi («O Dziewico nad dziewicami, moja Matko»), odwołuje się do nieprzerwanej tradycji Jej wstawiennictwa («nigdy nie słyszano, by ktokolwiek, kto uciekał się pod Twoją opiekę… został opuszczony»), i kończy pokorną prośbą («w Twoim miłosierdziu wysłuchaj mnie i odpowiedz mi»). Święci na przestrzeni wieków świadczyli o jej mocy: Matka Teresa z Kalkuty odmawiała dziewięć kolejnych Memorare codziennie — co nazywała swoją «pospieszną nowenną» — gdy potrzebowała czegoś szybko. Memorare jest katolicką modlitwą ostatniej deski ratunku, odmawianą w chwilach intensywnej potrzeby, przy łóżku umierających, w kaplicy przed trudną rozmową, lub szeptaną gdy rodzic czeka na wieści z sali szpitalnej.",
    instructions:
      "Odmów raz z pełnym skupieniem i pobożnością, przywołując w pamięci osobę i intencję, którą przedstawiasz Maryi. Memorare jest wystarczająco krótkie, aby zapamiętać i odmawiać wszędzie — w samochodzie, na spacerze, przed snem, w chwilach poprzedzających każde trudne zadanie. Dla bardziej trwałego wstawiennictwa odmów dziewięć kolejnych Memorare z rzędu (to jest «pospieszna nowenna», którą preferowała Matka Teresa dla pilnych intencji). Niektóre tradycje dodają krótki moment ciszy przed modlitwą, wymieniając intencję głośno lub w sercu. Modlitwa może być również włączona jako modlitwa kończąca dłuższy Różaniec lub nowennę, pieczętując prośbę pełnym ufności macierzyńskim oddaniem Maryi. Katolickie rodziny często odmawiają Memorare przy łóżku ciężko chorych, na wieść o trudnej diagnozie lub podczas porodu. Ponieważ modlitwa jest krótka, a jej słowa starożytne i ukochane, stała się rodzajem duchowej reakcji awaryjnej — modlitwy, która automatycznie napływa na usta, gdy brakuje innych słów. Dzieci mogą uczyć się jej tak wcześnie, jak tylko potrafią ją wyrecytować; jest to jedna z najodpowiedniejszych modlitw do nauczenia dziecka jako «pierwszej modlitwy w trudnych chwilach». Łacińska wersja oryginalna jest czasami wciąż odmawiana przez tych, którzy są przyciągani do form tradycyjnych: «Memorare, O piissima Virgo Maria, non esse auditum a saeculo…»",
    patronSaint: "Święty Bernard z Clairvaux",
    feastDay: null,
    source:
      "KEP-approved Polish devotional text of the Memorare (Pomnij) + traditional Polish Catholic prayer books. Historical attribution to Fr. Claude Bernard verified against the Catholic Encyclopedia entry. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },

  // ─── Round 2: 6 more prayers from PR #71 ────────────────────
  {
    prayerSlug: "novena-st-jude",
    name: "Nowenna do świętego Judy Tadeusza",
    description:
      "Święty Juda Tadeusz, zwany Apostołem Nadziei, był jednym z Dwunastu i krewnym Pana. Jest wymieniony w Ewangeliach jako jeden z apostołów (Łk 6,16) i jest autorem krótkiego Listu Judy. Przez wieki popularna pobożność katolicka wzywała świętego Judę jako patrona spraw rozpaczliwych. Powody podawane przez tradycję są praktyczne: ponieważ jego imię (Juda) było łatwo mylone z Judaszem Iskariotą, zdrajcą, jego wstawiennictwo było unikane przez zwykłych chrześcijan przez wieki — i dlatego, jak głosi przysłowie, pragnie pomóc każdemu, kto zwraca się do niego w prawdziwej potrzebie. Współczesna pobożność do świętego Judy została spopularyzowana w Stanach Zjednoczonych przez ojców klaretynów (Narodowe Sanktuarium świętego Judy w Chicago, 1929). W Polsce święty Juda Tadeusz jest patronem trudnych spraw zawodowych i sytuacji wymagających szczególnego zaufania w Bożą Opatrzność.",
    instructions:
      "Módl się raz dziennie przez dziewięć kolejnych dni. Struktura: rozpocznij od Znaku Krzyża; odmów tekst nowenny; zakończ Ojcze nasz, Zdrowaś Maryjo i Chwała Ojcu; wymień intencję. Nowenna szczególnie odpowiednia w dziewięć dni poprzedzających święto świętego Judy (28 października).",
    patronSaint: "Święty Juda Tadeusz",
    feastDay: "28 października",
    source: "KEP Polish + Claretian National Shrine (Chicago, 1929). Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-divine-mercy",
    name: "Nowenna do Miłosierdzia Bożego",
    description:
      "Nowenna do Miłosierdzia Bożego została dana przez Jezusa świętej Marii Faustynie Kowalskiej, polskiej zakonnicy, w serii objawień zapisanych w jej Dzienniczku. Papież święty Jan Paweł II — sam Polak i rodak — kanonizował ją 30 kwietnia 2000 roku i ustanowił Święto Miłosierdzia Bożego (drugą niedzielę wielkanocną) jako święto dla Kościoła powszechnego. Nowenna rozpoczyna się w Wielki Piątek. Każdy z dziewięciu dni przyprowadza inną kategorię dusz przed tron miłosierdzia. Duchowym domem nowenny jest Sanktuarium Miłosierdzia Bożego w Łagiewnikach w Krakowie — miejsce szczególne dla polskiej pobożności.",
    instructions:
      "Módl się raz dziennie przez dziewięć kolejnych dni, zaczynając w Wielki Piątek. Każdy dzień ma swoją intencję i modlitwę wstępną. Po otwarciu dnia, modlitwa kończy się Koronką do Miłosierdzia Bożego. Pełna nowenna trwa około piętnaście minut dziennie.",
    patronSaint: "Święta Faustyna Kowalska",
    feastDay: "Niedziela Miłosierdzia Bożego",
    source: "Dzienniczek św. Faustyny + Sanktuarium Łagiewniki Kraków. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-our-lady-perpetual-help",
    name: "Nowenna do Matki Bożej Nieustającej Pomocy",
    description:
      "Matka Boża Nieustającej Pomocy to jeden z najukochaniej szych tytułów maryjnych w Kościele katolickim. Nabożeństwo skupia się wokół XV-wiecznej bizantyjskiej ikony przedstawiającej Dzieciątko Jezus w ramionach Maryi, podczas gdy archaniołowie Michał i Gabriel zbliżają się z narzędziami Męki Pańskiej. Ikona została powierzona przez papieża Piusa IX ojcom redemptorystom w 1866 roku z zaleceniem: «Uczyńcie ją znaną na całym świecie». W Polsce nabożeństwo jest mocne, szczególnie w parafiach redemptorystowskich; cotygodniowa nowenna we środy jest tradycyjną polską praktyką.",
    instructions:
      "Módl się raz dziennie przez dziewięć kolejnych dni. Tradycyjna struktura: (1) Znak Krzyża; (2) Odmów modlitwę nowenny; (3) Zakończ trzema Zdrowaś Maryjo i «Pod Twoją obronę»; (4) Wymień intencję. Wiele polskich parafii organizuje cotygodniowe nabożeństwa we środy.",
    patronSaint: "Matka Boża Nieustającej Pomocy",
    feastDay: "27 czerwca",
    source: "Redemptorist tradition + KEP Polish + Pius IX 1866 entrustment. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "litany-sacred-heart",
    name: "Litania do Najświętszego Serca Pana Jezusa",
    description:
      "Litania do Najświętszego Serca Pana Jezusa jest jedną z sześciu litanii zatwierdzonych przez Stolicę Apostolską. Skomponowana w 1718 roku przez siostrę Joannę Magdalenę Joly z Zakonu Wizytek w Dijon. Papież Leon XIII zatwierdził litanię formalnie do publicznego użytku liturgicznego 2 kwietnia 1899 roku — w tym samym roku poświęcił całą ludzkość Najświętszemu Sercu w encyklice Annum Sacrum. Litania jest zbudowana z trzydziestu trzech wezwań odpowiadających trzydziestu trzem latom ziemskiego życia Chrystusa. Na każde wezwanie odpowiada się «Zmiłuj się nad nami».",
    instructions:
      "Litania odmawiana responsoryjnie. Prowadzący wypowiada każde wezwanie, wspólnota odpowiada. Trzydzieści trzy wezwania do Serca Jezusa, każde z odpowiedzią «Zmiłuj się nad nami». Czas trwania: dziesięć do piętnastu minut. Odpowiednia: Pierwsze Piątki; miesiąc czerwiec; Godzina Święta.",
    patronSaint: "Najświętsze Serce Pana Jezusa",
    feastDay: "Piątek po Bożym Ciele",
    source: "Annum Sacrum (Leo XIII, 1899) + KEP Polish. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "litany-blessed-virgin",
    name: "Litania Loretańska do Najświętszej Maryi Panny",
    description:
      "Litania Loretańska jest najstarszą i najukochaniej szą maryjną litanią Kościoła łacińskiego. Bierze swoją nazwę od Świętego Domku w Loreto we Włoszech. Papież Sykstus V formalnie zatwierdził litanię w 1587 roku. Polska tradycja Nabożeństw Majowych — codziennie w maju przed obrazem Matki Bożej — ma w sobie Litanię Loretańską jako centralną modlitwę. W ciągu wieków papieże dodawali wezwania, ostatnio Franciszek dodał «Matko Miłosierdzia», «Matko Nadziei», «Pociecho Migrantów» (2020).",
    instructions:
      "Litania odmawiana responsoryjnie. Prowadzący wypowiada każdy tytuł Maryi, wspólnota odpowiada «Módl się za nami». Polska tradycja Nabożeństw Majowych — codzienne nabożeństwo w maju — ma Litanię Loretańską jako centralną modlitwę. Tradycyjnie odmawiana po Różańcu Świętym.",
    patronSaint: "Najświętsza Maryja Panna",
    feastDay: null,
    source: "Sixtus V 1587 + papal additions through Francis 2020 + KEP Polish. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "prayer-conversion",
    name: "Modlitwa o Nawrócenie Bliskiej Osoby",
    description:
      "Katolicka modlitwa o nawrócenie bliskiej osoby jest zakorzeniona w długiej, wiernej modlitwie świętej Moniki za jej syna świętego Augustyna. Monika modliła się przez lata, przez łzy i radę świętego Ambrożego z Mediolanu («Nie jest możliwe, aby syn tylu łez zginął»). Augustyn został ochrzczony w 387 roku; Monika zmarła wkrótce potem w Ostii. Augustyn zapisał jej wytrwałość w Wyznaniach (Księga IX).",
    instructions:
      "Módl się codziennie, najlepiej o tej samej porze i w tej samej postawie. Wymień osobę głośno w modlitwie. Wielu katolików łączy tę modlitwę z: (1) codziennymi małymi poświęceniami; (2) Mszą świętą w dzień św. Moniki (27 sierpnia) lub św. Augustyna (28 sierpnia); (3) Nowenną do św. Moniki; (4) Koronką do Miłosierdzia Bożego o 15:00.",
    patronSaint: "Święta Monika",
    feastDay: "27 sierpnia",
    source: "Augustine's Confessions Book IX + KEP Polish. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },

  // ─── Locale-anchored devotions (Poland) ────────────────────
  {
    prayerSlug: "novena-czestochowa",
    name: "Nowenna do Matki Bożej Częstochowskiej",
    description:
      "Matka Boża Częstochowska — Czarna Madonna — jest centralnym maryjnym nabożeństwem polskiego katolicyzmu i ikoną w sercu polskiej tożsamości narodowej. Obraz, ikona Maryi trzymającej Dzieciątko Jezus, namalowana na drewnie cyprysowym, jest umieszczony w klasztorze Jasnogórskim w Częstochowie. Tradycja przypisuje malowanie ikony świętemu Łukaszowi Ewangeliście; współczesna analiza historii sztuki datuje obecny obraz na późne średniowiecze. Ikona przybyła na Jasną Górę w 1382 roku, sprowadzona z Bełza przez księcia Władysława Opolczyka jako dar dla nowo założonego klasztoru paulinów. Dwa równoległe rysy na prawym policzku Maryi — najbardziej rozpoznawalna cecha ikony — datują się na 1430 rok, gdy husyci splądrowali klasztor i pocięli obraz; tradycja głosi, że obraz krwawił, przerażając napastników. Ikona stała się centralna dla polskiej świadomości narodowej podczas «Potopu» szwedzkiego z 1655 roku: gdy praktycznie cała Polska upadła pod siłami szwedzkimi protestanckimi, sam mały klasztor Jasnogórski wytrzymał — niewielka grupa paulinów i polskich żołnierzy broniła go przez sześciotygodniowe oblężenie. Szwedzi się wycofali, a król Jan II Kazimierz formalnie ogłosił Maryję Królową Polski w katedrze lwowskiej w 1656 roku. Papież Pius XI udzielił obrazowi kanonicznej koronacji jako Królowej Polski w 1717 i 1923 roku. Przez wieki polskich rozbiorów, okupacji, komunistycznej supresji i odnowy, Czarna Madonna była duchowym sercem polskiej katolickiej tożsamości. Papież święty Jan Paweł II, urodzony Karol Wojtyła w 1920 roku, wielokrotnie pielgrzymował na Jasną Górę zarówno przed jak i po swoim wyborze.",
    instructions:
      "Módl się raz dziennie przez dziewięć kolejnych dni. Nowenna jest tradycyjnie odmawiana w ciągu dziewięciu dni poprzedzających święto Matki Bożej Częstochowskiej (26 sierpnia) lub święto Najświętszej Maryi Panny Królowej Polski (3 maja). Struktura nowenny: (1) Znak Krzyża; (2) Czytanie krótkiej refleksji o historii ikony lub polskiej katolickiej tożsamości; (3) Modlitwa nowennowa; (4) Trzy Zdrowaś Maryjo; (5) Wymienienie konkretnej intencji. Wiele polskich katolickich rodzin modli się nowennę przed domową reprodukcją ikony — obraz Czarnej Madonny jest jednym z najszerzej kopiowanych katolickich ikon na świecie. Pielgrzymka na Jasną Górę pozostaje potężnym elementem polskiego życia pobożnościowego: każdego sierpnia, setki tysięcy pielgrzymów idzie pieszo z Warszawy, Krakowa i innych polskich miast do klasztoru, przybywając na lub przed Uroczystość Wniebowzięcia (15 sierpnia). W polskiej-amerykańskiej diasporze — skoncentrowanej w Chicago, Nowym Jorku i parafiach Nowej Anglii — Częstochowska Niedziela w końcu sierpnia jest obchodzona z procesjami, śpiewem «Czarnej Madonny» i polską Mszą. Nowenna jest odpowiednia dla: każdego momentu narodowego lub osobistego kryzysu; nawrócenia członków rodziny; ochrony nienarodzonych; uzdrowienia duchowego w długim łuku pokoleń.",
    patronSaint: "Matka Boża Częstochowska, Królowa Polski",
    feastDay: "26 sierpnia",
    source: "Jasna Góra Monastery devotional sources + Jan II Kazimierz's 1656 proclamation + KEP Polish. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-maximilian-kolbe",
    name: "Nowenna do świętego Maksymiliana Marii Kolbego",
    description:
      "Święty Maksymilian Maria Kolbe (1894-1941) był polskim franciszkaninem konwentualnym, dziennikarzem, misjonarzem i męczennikiem Auschwitz — jednym z najpotężniejszych świadectw XX wieku. Urodzony jako Rajmund Kolbe pod Łodzią w rozbiorowej Polsce, w dzieciństwie doświadczył wizji Najświętszej Maryi Panny: ofiarowała mu dwie korony, jedną białą (czystość) i jedną czerwoną (męczeństwo), i zapytała, którą wybierze. Wybrał obie. Wstąpił do franciszkanów konwentualnych w wieku szesnastu lat, został wyświęcony na kapłana w 1918 roku i założył Rycerstwo Niepokalanej (Militia Immaculatae) w 1917 roku, maryjny apostolat poświęcony nawróceniu grzeszników i szerzeniu nabożeństwa do Niepokalanego Poczęcia. Założył Niepokalanów («Miasto Niepokalanej») pod Warszawą w 1927 roku, który urósł do jednego z największych domów zakonnych na świecie; bracia tam publikowali masowy nakład Rycerza Niepokalanej, który osiągnął milion czytelników do końca lat 30. W latach 1930-1936 służył jako misjonarz w Japonii, zakładając Mugenzai no Sono («Ogród Niepokalanej») w Nagasaki — klasztor który, wbrew wszelkim oczekiwaniom, przetrwał bombardowanie atomowe z 1945 roku nienaruszony. Wracając do Polski w przededniu II wojny światowej, schronił około 2000 żydowskich uchodźców w Niepokalanowie. Został aresztowany przez Gestapo 17 lutego 1941 roku i przeniesiony do Auschwitz 28 maja 1941 roku jako więzień numer 16670. W lipcu 1941 roku, po ucieczce więźnia z bloku 14, komendant obozu wybrał dziesięciu mężczyzn do śmierci głodowej w odwecie. Jeden z wybranych, Franciszek Gajowniczek, zawołał z udręką o swoją żonę i dzieci. Kolbe wystąpił i poprosił, by zająć miejsce Gajowniczka. Wymiana została dozwolona. Kolbe spędził dwa tygodnie w bunkrze głodowym, prowadząc innych skazanych w modlitwie i pieśni; był ostatnim, który umarł, zabity śmiertelnym zastrzykiem 14 sierpnia 1941 roku, w wigilię Wniebowzięcia. Papież święty Jan Paweł II — sam Polak, który przeżył tę samą nazistowską okupację — kanonizował Kolbego jako «męczennika miłości» w 1982 roku, ogłaszając go «patronem naszego trudnego stulecia». Franciszek Gajowniczek przeżył wojnę i dożył 1995 roku, świadcząc przez pięćdziesiąt trzy lata o człowieku, który zmarł zamiast niego.",
    instructions:
      "Módl się raz dziennie przez dziewięć kolejnych dni. Nowenna jest tradycyjnie odmawiana w dziewięć dni poprzedzających święto świętego Maksymiliana Kolbego (14 sierpnia) lub w związku z 15-sierpniową Uroczystością Wniebowzięcia (Kolbe zmarł w wigilię Wniebowzięcia, oblekając czas swojej śmierci w maryjne znaczenie). Struktura nowenny: (1) Znak Krzyża; (2) Czytanie krótkiej refleksji o momencie z życia Kolbego — jego wizji dwóch koron, jego założeniu Niepokalanowa, jego japońskiej misji, jego ofierze w Auschwitz; (3) Modlitwa nowennowa; (4) Trzy Zdrowaś Maryjo (na cześć jego maryjnego nabożeństwa); (5) Wymienienie konkretnej intencji. Nowenna jest szczególnie odpowiednia dla: każdego w więzieniu lub uwięzieniu, uchodźców i wysiedlonych, tych zmagających się z uzależnieniem (Kolbe jest patronem uzależnionych, szczególnie od narkotyków), dziennikarzy i pisarzy w trudnych powołaniach, rodzin pod zagrożeniem, i sprawy pro-life (świadectwo Kolbego — oddania życia, by ojciec mógł wrócić do swoich dzieci — uczyniło go potężnym orędownikiem nienarodzonych i ojców). Rycerstwo Niepokalanej kontynuuje dziś jako międzynarodowy maryjny apostolat. Cela w Auschwitzu, gdzie Kolbe zmarł (Blok 11, Cela 18), jest zachowana jako miejsce pielgrzymki.",
    patronSaint: "Święty Maksymilian Maria Kolbe",
    feastDay: "14 sierpnia",
    source: "Polish Conventual Franciscan sources + Niepokalanów + Auschwitz Block 11 documentation + JPII canonization homily (1982). Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
];
