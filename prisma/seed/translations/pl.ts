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
      "Święty Juda Tadeusz, zwany Apostołem Nadziei, był jednym z Dwunastu i krewnym Pana, tradycyjnie uważanym za brata Jakuba Mniejszego. Jest wymieniony w Ewangeliach jako jeden z apostołów (Łk 6,16) i jest autorem krótkiego Listu Judy. Przez wieki popularna pobożność katolicka wzywała świętego Judę jako patrona spraw rozpaczliwych i sytuacji niemożliwych. Powody podawane przez tradycję są praktyczne: ponieważ jego imię (Juda) było łatwo mylone z Judaszem Iskariotą, zdrajcą, jego wstawiennictwo było unikane przez zwykłych chrześcijan przez wieki — i dlatego, jak głosi przysłowie, pragnie pomóc każdemu, kto zwraca się do niego w prawdziwej potrzebie. Współczesna pobożność do świętego Judy Tadeusza została spopularyzowana w Stanach Zjednoczonych przez ojców klaretynów, którzy zbudowali Narodowe Sanktuarium świętego Judy w Chicago w 1929 roku — w szczycie Wielkiego Kryzysu. W Polsce święty Juda Tadeusz jest patronem trudnych spraw zawodowych i sytuacji wymagających szczególnego zaufania w Bożą Opatrzność. Nowenna ta jest odpowiednia dla choroby z trudną prognozą, załamania finansowego, oddalenia rodzinnego, które wydaje się nie do rozwiązania, niepłodności i każdej sytuacji, którą osoba odczuwa jako «poza nadzieją».",
    instructions:
      "Módl się raz dziennie przez dziewięć kolejnych dni. Struktura tradycyjna: rozpocznij od Znaku Krzyża; odmów tekst nowenny do świętego Judy; zakończ Ojcze nasz, Zdrowaś Maryjo i Chwała Ojcu; wymień swoją konkretną intencję. Wielu katolików dodaje trzy Ojcze nasz, Zdrowaś Maryjo i Chwała Ojcu w czci Trójcy Świętej na zakończenie modlitwy każdego dnia. Nowenna może być odmawiana o każdej porze roku, ale szczególnie odpowiednia jest w ciągu dziewięciu dni poprzedzających święto świętego Judy (28 października). Tradycyjną praktyką towarzyszącą jest zobowiązanie się, gdy modlitwa zostanie wysłuchana, do publicznego podziękowania świętemu Judzie. Dyspozycja modlitwy ma znaczenie: święty Juda nie jest maszyną z prośbami. Nowenna jest odmawiana z wiarą i poddaniem się Bożej woli.",
    patronSaint: "Święty Juda Tadeusz",
    feastDay: "28 października",
    source: "KEP Polish + Claretian National Shrine (Chicago, 1929). Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-divine-mercy",
    name: "Nowenna do Miłosierdzia Bożego",
    description:
      "Nowenna do Miłosierdzia Bożego została dana przez Jezusa świętej Marii Faustynie Kowalskiej, polskiej zakonnicy ze Zgromadzenia Sióstr Matki Bożej Miłosierdzia, w serii objawień zapisanych w jej Dzienniczku: Miłosierdzie Boże w mojej duszy. Mistyczne pisma Faustyny, stłumione przez pewien czas po jej śmierci w 1938 roku, zostały zrehabilitowane przez papieża świętego Jana Pawła II — samego Polaka i rodaka — który kanonizował ją 30 kwietnia 2000 roku i ustanowił Święto Miłosierdzia Bożego (drugą niedzielę wielkanocną) jako święto dla Kościoła powszechnego. Nowenna rozpoczyna się w Wielki Piątek i kończy w wigilię Święta Miłosierdzia Bożego. Każdego z dziewięciu dni do tronu miłosierdzia jest przyprowadzana inna kategoria dusz: Dzień 1, cała ludzkość; Dzień 2, kapłani i osoby zakonne; Dzień 3, dusze pobożne i wierne; Dzień 4, ci, którzy nie wierzą; Dzień 5, dusze oddzielonych braci; Dzień 6, dusze ciche, pokorne i dzieci; Dzień 7, dusze szczególnie czczące Miłosierdzie Boże; Dzień 8, dusze w czyśćcu; Dzień 9, dusze oziębłe. Duchowym domem nowenny jest Sanktuarium Miłosierdzia Bożego w Łagiewnikach w Krakowie — miejsce szczególne dla polskiej pobożności.",
    instructions:
      "Módl się raz dziennie przez dziewięć kolejnych dni, tradycyjnie zaczynając w Wielki Piątek i kończąc w sobotę poprzedzającą Święto Miłosierdzia Bożego. Każdy dzień ma swoją unikalną intencję i unikalną modlitwę wstępną, którą Jezus podyktował świętej Faustynie; po otwarciu dnia, modlitwa kończy się Koronką do Miłosierdzia Bożego. Tradycyjna struktura każdego dnia: (1) Przeczytaj konkretną intencję dnia; (2) Odmów modlitwę wstępną, którą Jezus dał Faustynie na ten dzień; (3) Odmów całą Koronkę do Miłosierdzia Bożego; (4) Zakończ osobistą intencją. Pełna nowenna trwa około piętnaście minut dziennie. Może być również odmawiana o każdej porze roku za prywatną intencję, szczególnie w chwilach kryzysu lub o nawrócenie bliskiej osoby.",
    patronSaint: "Święta Faustyna Kowalska",
    feastDay: "Niedziela Miłosierdzia Bożego",
    source: "Dzienniczek św. Faustyny + Sanktuarium Łagiewniki (Kraków). Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-our-lady-perpetual-help",
    name: "Nowenna do Matki Bożej Nieustającej Pomocy",
    description:
      "Matka Boża Nieustającej Pomocy (Our Lady of Perpetual Help) to jeden z najukochaniej szych tytułów maryjnych w Kościele katolickim. Nabożeństwo skupia się wokół XV-wiecznej bizantyjskiej ikony przedstawiającej Dzieciątko Jezus w ramionach Maryi, podczas gdy archaniołowie Michał i Gabriel zbliżają się, każdy niosąc narzędzia Męki Pańskiej (krzyż, włócznia, gąbka). Dziecię Jezus odwraca twarz do swojej Matki z widocznym lękiem; jeden sandał zwisa luźno z Jego stopy, szczegół tradycyjnie odczytywany jako odsuwanie się Dziecka od zapowiedzianej Męki i znajdowanie schronienia przy sercu Matki. Ikona dotarła do Rzymu w 1499 roku i została powierzona przez papieża Piusa IX ojcom redemptorystom w 1866 roku z zaleceniem: «Uczyńcie ją znaną na całym świecie». W Polsce nabożeństwo do Matki Bożej Nieustającej Pomocy jest mocne, szczególnie w parafiach redemptorystowskich; cotygodniowa nowenna we środy jest tradycyjną polską praktyką pobożności maryjnej.",
    instructions:
      "Módl się raz dziennie przez dziewięć kolejnych dni. Tradycyjnie nowennie towarzyszy śpiew hymnu «Matko Chrystusa, Matko Boża». Wiele polskich parafii nadal organizuje cotygodniowe nabożeństwa nowennowe do Matki Bożej Nieustającej Pomocy we środy. Tradycyjna struktura modlitwy każdego dnia w domu: (1) Rozpocznij od Znaku Krzyża; (2) Odmów modlitwę nowenny do Matki Bożej Nieustającej Pomocy; (3) Zakończ trzema Zdrowaś Maryjo i jedną «Pod Twoją obronę»; (4) Wymień swoją konkretną intencję. Nowenna jest właściwie odmawiana w dniach poprzedzających Święto Matki Bożej Nieustającej Pomocy (27 czerwca), ale może być odmawiana o każdej porze. Nowenna jest szczególnie polecana matkom modlącym się za swoje dzieci, opiekunom chorych i każdej osobie przytłoczonej okolicznościami, które wydają się przekraczać jej siły.",
    patronSaint: "Matka Boża Nieustającej Pomocy",
    feastDay: "27 czerwca",
    source: "Redemptorist tradition + KEP Polish + Pius IX's 1866 entrustment. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "litany-sacred-heart",
    name: "Litania do Najświętszego Serca Pana Jezusa",
    description:
      "Litania do Najświętszego Serca Pana Jezusa jest jedną z sześciu litanii zatwierdzonych przez Stolicę Apostolską do publicznego użytku liturgicznego w obrządku łacińskim. Skomponowana w 1718 roku przez siostrę Joannę Magdalenę Joly z Zakonu Wizytek w Dijon, litania była dopracowywana i poszerzana przez następne stulecie. Papież Leon XIII zatwierdził litanię formalnie do publicznego użytku liturgicznego 2 kwietnia 1899 roku — w tym samym roku poświęcił całą ludzkość Najświętszemu Sercu w swojej encyklice Annum Sacrum. Litania jest zbudowana z trzydziestu trzech wezwań do Serca Chrystusa pod różnymi tytułami odpowiadającymi trzydziestu trzem latom ziemskiego życia Chrystusa. Na każde wezwanie odpowiada się «Zmiłuj się nad nami». Wzór trzydziestu trzech wezwań jest kontemplacyjny: serce wierzącego, przez wytrwałe powtarzanie, jest przyciągane do dyspozycji Serca Chrystusa — pokory, cierpliwości, miłosierdzia, miłości. Litania jest jednym z głównych nabożeństw Pierwszego Piątku i jest tradycyjnie odmawiana w miesiącu czerwcu (miesiąc Najświętszego Serca), w Nowennie do Najświętszego Serca i w Godzinie Świętej wynagrodzenia.",
    instructions:
      "Litania jest odmawiana responsoryjnie. Prowadzący wypowiada każde wezwanie («Serce Jezusa, Syna Ojca Przedwiecznego…») a zgromadzona wspólnota odpowiada przepisaną formułą. Początkowe wezwania stosują schemat Kyrie i wezwanie trynitarne. Następuje trzydzieści trzy wezwania do Serca Jezusa, każde z odpowiedzią «Zmiłuj się nad nami». Litania kończy się Baranku Boży i modlitwą kolektarską do Najświętszego Serca. Łączny czas trwania wynosi około dziesięć do piętnastu minut. Litania jest właściwie odmawiana: w Pierwsze Piątki; w miesiącu czerwcu; podczas Nowenny do Najświętszego Serca; na zakończenie Godziny Świętej adoracji eucharystycznej; w momentach rodzinnej konsekracji Najświętszemu Sercu.",
    patronSaint: "Najświętsze Serce Pana Jezusa",
    feastDay: "Piątek po Bożym Ciele",
    source: "Annum Sacrum (Leo XIII, 1899) + KEP Polish + Visitation Order tradition. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "litany-blessed-virgin",
    name: "Litania Loretańska do Najświętszej Maryi Panny",
    description:
      "Litania Loretańska jest najstarszą i najukochaniej szą maryjną litanią Kościoła łacińskiego. Litania bierze swoją nazwę od Świętego Domku w Loreto we włoskich Marche. Papież Sykstus V formalnie zatwierdził litanię do użytku liturgicznego i pobożnościowego w 1587 roku. W ciągu wieków kolejni papieże dodawali wezwania w miarę rozwijania się rozumienia doktryny maryjnej przez Kościół: Pius VII dodał «Wspomożenie Wiernych» w 1815 roku; Pius IX dodał «Królowo bez zmazy pierworodnej poczęta» po 1854 roku; Pius XII dodał «Królowo z duszą i ciałem do nieba wzięta» po 1950 roku; Święty Jan Paweł II dodał «Matko Kościoła» w 1980 roku i «Królowo Rodzin» w 1995 roku. Najnowszej, papież Franciszek dodał «Matko Miłosierdzia», «Matko Nadziei» i «Pociecho Migrantów» w 2020 roku. W Polsce Litania Loretańska jest jednym z najczęściej odmawianych nabożeństw maryjnych, szczególnie w połączeniu z Różańcem Świętym i podczas pielgrzymek do Jasnej Góry. Polska tradycja majowych nabożeństw ma w sobie Litanię Loretańską jako centralną modlitwę.",
    instructions:
      "Litania jest odmawiana responsoryjnie. Prowadzący wypowiada każdy tytuł Maryi («Święta Maryjo…», «Święta Boża Rodzicielko…») a zgromadzona wspólnota odpowiada «Módl się za nami» na każdy. Litania rozpoczyna się schematem Kyrie i wezwaniem trynitarnym; ciało litanii stanowi długi ciąg tytułów maryjnych; litania kończy się trzema wezwaniami do Baranka Bożego i modlitwą kolektarską. Litania Loretańska jest tradycyjnie odmawiana: po Różańcu Świętym; w miesiącach maryjnych maju i październiku; pod koniec maryjnej nowenny przed maryjnymi uroczystościami; w momentach rodzinnej konsekracji Maryi. Polska tradycja Nabożeństw Majowych — codziennie w maju przed obrazem Matki Bożej — ma w sobie Litanię Loretańską jako centralną modlitwę.",
    patronSaint: "Najświętsza Maryja Panna",
    feastDay: null,
    source: "Sixtus V's 1587 approval + papal additions through Francis 2020 + KEP Polish Marian texts. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "prayer-conversion",
    name: "Modlitwa o Nawrócenie Bliskiej Osoby",
    description:
      "Katolicka modlitwa o nawrócenie bliskiej osoby jest zakorzeniona w jednym z wielkich pasterskich świadectw historii chrześcijaństwa: długiej, wiernej modlitwie świętej Moniki za jej syna świętego Augustyna. Monika modliła się o nawrócenie swojego syna przez lata, przez jej własne łzy i radę, którą otrzymała od świętego Ambrożego z Mediolanu («Nie jest możliwe, aby syn tylu łez zginął»). Augustyn został ochrzczony w 387 roku w wieku trzydziestu trzech lat; Monika zmarła wkrótce potem w Ostii, doczekawszy się tego, o co prosiła. Augustyn zapisał jej wytrwałość w swoich Wyznaniach (Księga IX). Pasterskie świadectwo Moniki nie jest gwarancją rezultatu — nawrócenie Augustyna nastąpiło w czasie Boga, nie Moniki — ale postawą niezachwianej wierności: że modlitwa wierzącego za bliską osobę jest sama w sobie łaską, uczestnictwem w samym pragnieniu Boga wobec tej duszy, niezależnie od tego, kiedy lub czy modlitwa jest widocznie wysłuchana.",
    instructions:
      "Módl się codziennie, najlepiej o tej samej porze i w tej samej postawie (na kolanach, przed krzyżem lub obrazem Najświętszego Serca), aby dyscyplina modlitwy stała się częścią codziennego życia. Wymień osobę głośno w modlitwie tam, gdzie tekst mówi «(imię)». Po modlitwie poświęć minutę ciszy, aby utrzymać ją przed Najświętszym Sercem. Wielu katolików łączy tę modlitwę z: (1) codziennym ofiarowaniem małych poświęceń w intencji; (2) regularną intencją Mszy świętej, szczególnie w dzień wspomnienia świętej Moniki (27 sierpnia) lub świętego Augustyna (28 sierpnia); (3) Nowenną do świętej Moniki lub świętego Augustyna; (4) Koronką do Miłosierdzia Bożego o godzinie 15:00. Dyspozycja modlitwy ma znaczenie: jest ofiarowana w zaufaniu, nie w transakcji. Gdy przychodzi zniechęcenie — a przychodzi, szczególnie gdy mijają lata bez widocznej zmiany — tradycyjna rada brzmi: oprzeć się mocniej na wstawiennictwie świętej Moniki i Najświętszego Serca.",
    patronSaint: "Święta Monika",
    feastDay: "27 sierpnia",
    source: "Augustine's Confessions Book IX + KEP Polish pastoral resources. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
];
