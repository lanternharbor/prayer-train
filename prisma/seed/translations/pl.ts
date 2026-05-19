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
    prayerText:
      "O Najświętsze Serce Jezusa, źródło wszelkiego błogosławieństwa, wielbię Cię, kocham Cię, i z żywym żalem za moje grzechy ofiaruję Ci to moje biedne serce. Uczyń mnie pokornym, cierpliwym, czystym i całkowicie posłusznym Twojej woli. Daj, Dobry Jezu, abym żył w Tobie i dla Ciebie. Strzeż mnie pośród niebezpieczeństw. Pociesz mnie w utrapieniach. Daj mi zdrowie ciała, pomoc w moich doczesnych potrzebach, Twoje błogosławieństwo na wszystko, co czynię, i łaskę świętej śmierci. Amen.",
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
    prayerText:
      "O święty Józefie, którego opieka jest tak wielka, tak silna, tak natychmiastowa przed tronem Boga, w Tobie pokładam wszystkie moje zainteresowania i pragnienia. O święty Józefie, wspieraj mnie swoim potężnym wstawiennictwem i wyjednaj mi od Twojego boskiego Syna wszelkie duchowe błogosławieństwa przez Jezusa Chrystusa, naszego Pana; abym, mając tutaj na ziemi zapewnioną Twoją niebieską moc, mógł złożyć moje dziękczynienie i hołd najbardziej kochającemu z Ojców. Amen.",
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
    prayerText:
      "Ojcze Przedwieczny, ofiaruję Ci Ciało i Krew, Duszę i Bóstwo najmilszego Syna Twojego, a Pana naszego Jezusa Chrystusa, na przebłaganie za grzechy nasze i całego świata. Dla Jego bolesnej męki, miej miłosierdzie dla nas i całego świata.",
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
    prayerText:
      "Pomnij, o Najświętsza Panno Maryjo, że nigdy nie słyszano, abyś opuściła tego, kto się do Ciebie ucieka, Twej pomocy wzywa, Ciebie o przyczynę prosi. Tą ufnością ożywiony, do Ciebie, o Panno nad pannami i Matko, biegnę, do Ciebie przychodzę, przed Tobą jako grzesznik płaczący staję. O Matko Słowa, racz nie gardzić słowami moimi, ale usłysz je łaskawie i wysłuchaj. Amen.",
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
    prayerText:
      "Najświętszy apostole, święty Judo Tadeuszu, wierny sługo i przyjacielu Jezusa, Kościół czci Cię i wzywa powszechnie jako patrona nadziei. Proszę, wstawiaj się za mną. Wykorzystaj ten szczególny przywilej, który Ci dano, aby przynieść nadzieję, pocieszenie i pomoc tam, gdzie są najbardziej potrzebne. Przybądź mi z pomocą w tej wielkiej potrzebie, abym mógł otrzymać pocieszenie i pomoc nieba, gdy zmagam się z moimi wyzwaniami, szczególnie (wymień intencję). Wielbię Boga razem z Tobą i wszystkimi świętymi na wieki. Obiecuję, błogosławiony święty Judo, zawsze pamiętać o tej wielkiej łasce, zawsze czcić Cię jako mojego szczególnego i potężnego patrona, i z wdzięcznością zachęcać do nabożeństwa do Ciebie. Amen.",
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
    prayerText:
      "Skonałeś, Jezu, ale na duszę wytrysnęło źródło życia i wylał się na świat cały ocean miłosierdzia. O Źródło Życia, niezgłębione Miłosierdzie Boże, ogarnij świat cały i wylej się na nas. O Krwi i Wodo, któraś wytrysnęła z Serca Jezusowego jako zdrój miłosierdzia dla nas, ufam Tobie!",
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
    prayerText:
      "O Matko Nieustającej Pomocy, daj mi zawsze wzywać Twoje najpotężniejsze imię, które jest zabezpieczeniem żywych i zbawieniem umierających. O najczystsza Maryjo, o najsłodsza Maryjo, niech Twoje imię odtąd zawsze będzie na moich ustach. Nie zwlekaj, o błogosławiona Pani, aby mi pomóc, ilekroć Cię wzywam, ponieważ we wszystkich moich potrzebach, we wszystkich moich pokusach, nigdy nie przestanę Cię wzywać, zawsze powtarzając Twoje święte imię. O jakie pocieszenie, jaka słodycz, jaka ufność, jakie wzruszenie wypełnia moją duszę, gdy wymawiam Twoje święte imię lub nawet tylko o Tobie myślę. Amen.",
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

  // ─── ROUND 3 (pl) ──────────────────────────────────────────
  {
    prayerSlug: "litany-st-joseph",
    name: "Litania do świętego Józefa",
    description:
      "Litania do świętego Józefa jest jedną z sześciu litanii zatwierdzonych przez Stolicę Apostolską do publicznego użytku liturgicznego w obrządku łacińskim. Powstawała stopniowo w XVII i XVIII wieku w miarę pogłębiania się nabożeństwa do świętego Józefa w całym świecie katolickim; otrzymała formalne magisterialne zatwierdzenie od papieża świętego Piusa X 18 marca 1909 roku, w wigilię uroczystości świętego Józefa, jako Oblubieńca Maryi, przybranego ojca Jezusa i Patrona Kościoła Powszechnego. Struktura litanii odpowiada wzorcowi innych zatwierdzonych katolickich litanii: otwarcie Kyrie, inwokacja trynitarna, a następnie długa sekwencja wezwań kierowanych do świętego Józefa pod różnymi tytułami, z każdym z odpowiedzią «Módl się za nami»: «Sławny potomku Dawida», «Światło patriarchów», «Oblubieńcze Bogarodzicy», «Czysty Stróżu Dziewicy», «Żywicielu Syna Bożego», «Troskliwy obrońco Chrystusa», «Głowo świętej Rodziny», «Józefie najsprawiedliwszy», «Józefie najczystszy», «Józefie najroztropniejszy», «Zwierciadło cierpliwości», «Miłośniku ubóstwa», «Wzorze pracujących», «Ozdobo życia rodzinnego», «Opiekunie dziewic», «Filaru rodzin», «Pociecho strapionych», «Nadziejo chorych», «Patronie umierających», «Postrachu duchów piekielnych», «Opiekunie Kościoła świętego». W maju 2021 roku, w związku z Rokiem świętego Józefa (grudzień 2020 - grudzień 2021) i listem apostolskim Patris Corde, papież Franciszek formalnie dodał siedem nowych wezwań do litanii, zaczerpniętych bezpośrednio z języka Patris Corde: «Opiekunie Odkupiciela», «Sługo Chrystusa», «Sługo zbawienia», «Wsparcie w trudnościach», «Patronie wygnańców», «Patronie strapionych» i «Patronie ubogich». Te dodatki odzwierciedlają specyficzne pastoralne ujęcie Franciszka świętego Józefa jako wzoru dla ojców, robotników i marginalizowanych we współczesnym świecie.",
    instructions:
      "Litanię odmawia się responsoryjnie. Prowadzący wymawia każde wezwanie («Józefie najsprawiedliwszy…») a zgromadzeni odpowiadają «Módl się za nami» na każde z nich. Wstępny wzór Kyrie i inwokacja trynitarna używają «Zmiłuj się nad nami» jako odpowiedzi; korpus litanii — długa sekwencja tytułów — używa «Módl się za nami». Litania kończy się trzema wezwaniami do Baranka Bożego (Agnus Dei), parą wersetowo-responsoryjną zaczerpniętą z Księgi Rodzaju («Ustanowił go panem domu swego, I rządcą wszystkiej posiadłości swojej»), i kolektą do świętego Józefa. Całkowity czas wynosi około dziesięciu minut, gdy modli się w niespiesznym tempie dewocyjnym. Litania do świętego Józefa jest tradycyjnie odmawiana: w miesiącu marcu, miesiącu świętego Józefa; w dniach poprzedzających uroczystość świętego Józefa (19 marca) lub święto świętego Józefa Rzemieślnika (1 maja); pod koniec Godziny świętej lub adoracji eucharystycznej; w kontekstach rodzinnych proszących o opiekę świętego Józefa nad domem. Dodatki z 2021 roku można włączyć do każdego tradycyjnego wydrukowanego tekstu, wstawiając siedem nowych wezwań w odpowiednie miejsca w sekwencji litanii (większość aktualnie publikowanych wersji je wymienia); zarówno Konferencja Episkopatu Polski (KEP), jak i strona Stolicy Apostolskiej publikują zaktualizowany pełny oficjalny tekst po polsku. Wiele katolickich rodzin modli się litanią razem w środowe wieczory (tradycyjny dzień poświęcony świętemu Józefowi w starszym katolickim kalendarzu dewocyjnym). Gdy modli się samemu, po prostu czytaj zarówno wezwanie, jak i odpowiedź na głos lub w ciszy.",
    patronSaint: "święty Józef",
    feastDay: "19 marca",
    source: "KEP + Patris Corde (papież Franciszek, 8 grudnia 2020) + zatwierdzenie papieża Piusa X z 1909 roku. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-holy-spirit",
    name: "Nowenna do Ducha Świętego",
    description:
      "Nowenna do Ducha Świętego jest pierwotną nowenną — wzorcem modlitwy, od którego pochodzi każda inna katolicka dziewięciodniowa nowenna. Jej fundament biblijny stanowią Dzieje Apostolskie: «Wszyscy oni trwali jednomyślnie na modlitwie razem z niewiastami, Maryją, Matką Jezusa, i braćmi Jego» (Dz 1,14). Przez dziewięć dni po Wniebowstąpieniu Chrystusa uczniowie i Najświętsza Maryja Panna pozostawali w wieczerniku w Jerozolimie na modlitwie; dziesiątego dnia, w uroczystość Pięćdziesiątnicy (Dz 2,1-4), Duch Święty zstąpił na nich z szumem gwałtownego wiatru i językami ognia. Każda kolejna katolicka nowenna czerpie swój dziewięciodniowy wzór z tego jedynego precedensu danego przez Ducha. Nowenna wzywa siedem darów Ducha Świętego wymienionych w Księdze Izajasza 11,2-3: mądrość, rozum, rada, męstwo, umiejętność, pobożność i bojaźń Boża. Do nich tradycja katolicka dodaje dwanaście owoców Ducha Świętego wymienionych w Liście do Galatów (5,22-23 w enumeracji Wulgaty): miłość, radość, pokój, cierpliwość, uprzejmość, dobroć, wspaniałomyślność, łagodność, wierność, skromność, wstrzemięźliwość i czystość. Ton nowenny jest błagalny, ale ufny — Duch jest darem, który Jezus obiecał posłać (J 14,16-17; 16,7-15), a Kościół modli się z ufnością, że ten sam Duch, który zstąpił na apostołów, nadal zstępuje na wiernych. Nowenna jest szczególnie odpowiednia dla rozeznawania powołania, namaszczenia chorych, przygotowania tych, którzy przyjmują sakramenty (bierzmowanie, małżeństwo, święcenia kapłańskie), i każdego momentu, gdy dusza odczuwa, że nie może znaleźć jasności sama z siebie i potrzebuje natchnienia Ducha.",
    prayerText:
      "Przyjdź, Duchu Święty, napełnij serca Twoich wiernych i zapal w nich ogień Twojej miłości. Ześlij Ducha Twego, a powstanie życie, i odnowisz oblicze ziemi. Boże, który światłem Ducha Świętego pouczyłeś serca wiernych, daj nam w tymże Duchu poznać, co jest prawe, i Jego pociechą zawsze się radować. Przez Chrystusa Pana naszego. Amen.",
    instructions:
      "Módl się raz dziennie przez dziewięć kolejnych dni. Tradycyjnie nowenna jest odmawiana między Wniebowstąpieniem a niedzielą Zesłania Ducha Świętego — pierwotnymi dziewięcioma dniami, które Kościół modlił się nieprzerwanie od czasów apostołów. (W diecezjach, gdzie Wniebowstąpienie jest przeniesione na niedzielę następującą po tradycyjnym czwartku, nowenna zaczyna się w piątek po tej niedzieli; sprawdź lokalny kalendarz liturgiczny.) Nowennę można również odmawiać o każdej innej porze roku w prywatnej intencji. Tradycyjna struktura na każdy dzień: (1) Rozpocznij od Znaku Krzyża; (2) Recytuj lub śpiewaj Veni Creator Spiritus («Przyjdź, Duchu Stworzycielu») lub Veni Sancte Spiritus («Przyjdź, Duchu Święty») — dwie wielkie łacińskie sekwencje Zesłania Ducha Świętego; (3) Odmów modlitwę nowenny; (4) Medytuj krótko nad jednym z siedmiu darów Ducha (jeden na dzień przez pierwsze siedem dni; w dniach ósmym i dziewiątym nad dwunastoma owocami i osobistą intencją); (5) Zakończ Ojcze Nasz, Zdrowaś Maryjo i Chwała Ojcu. Całkowity czas wynosi około dziesięciu minut dziennie. Rodziny z małymi dziećmi często odmawiają krótszą wersję, używając tylko wezwania Przyjdź, Duchu Święty i wyjaśnienia jednego daru dziennie odpowiedniego dla dziecka. Nowenna jest również odpowiednia przed ważną decyzją, przed trudną rozmową lub przed jakimkolwiek zadaniem, w którym osoba potrzebuje rady, męstwa lub mądrości wykraczającej poza jej naturalne możliwości.",
    patronSaint: null,
    feastDay: "Zesłanie Ducha Świętego",
    source: "KEP + Dz 1,14, 2,1-4 + polskie źródła liturgiczne Vatican.va. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-st-therese",
    name: "Nowenna do świętej Teresy od Dzieciątka Jezus",
    description:
      "Święta Teresa od Dzieciątka Jezus i Najświętszego Oblicza — lepiej znana jako Teresa z Lisieux lub «Mały Kwiatek» — była zakonnicą bosych karmelitanek, która wstąpiła do klasztoru w Lisieux w Normandii w wieku piętnastu lat i zmarła na gruźlicę w wieku dwudziestu czterech (1873-1897). Jej duchowa autobiografia, Dzieje duszy, została opublikowana wkrótce po jej śmierci i szybko stała się jedną z najczęściej czytanych książek katolickich epoki nowożytnej. Z mroku prowincjonalnego klasztoru nauczała tego, co nazwała Małą Drogą: ufności w miłosierną miłość Boga wyrażoną w najmniejszych aktach codziennej wierności, zamiast w heroicznych zewnętrznych wyczynach. «Spędzę moje niebo, czyniąc dobro na ziemi», słynnie obiecała; «sprawię, że spadnie deszcz róż». Tradycja «deszczu róż» — przekonanie, że wstawiennictwo uzyskane przez świętą Teresę często towarzyszy nieoczekiwana róża, dosłowna lub symboliczna — kształtowała katolicką cześć do niej od tamtej pory. Została kanonizowana przez papieża Piusa XI w 1925 roku, ogłoszona Patronką Misji w 1927 roku (mimo że nigdy nie opuściła klasztoru) i ogłoszona Doktorem Kościoła przez papieża świętego Jana Pawła II w 1997 roku — jedną z zaledwie czterech kobiet tak nazwanych, obok świętych Teresy z Avili, Katarzyny ze Sieny i Hildegardy z Bingen. Jej wkład doktrynalny to teologia dzieciństwa: ewangeliczna nauka, że trzeba stać się jak małe dziecko, by wejść do Królestwa (Mt 18,3), otrzymując trwałą, kontemplacyjną artykulację. Nowenna do świętej Teresy jest odpowiednia dla: rozeznania powołania zakonnego lub świeckiego, powrotu do zdrowia z choroby (jej własna gruźlica była znoszona z wielkim cierpieniem), suchości duchowej, nawrócenia dalekich ukochanych osób (modliła się nieustannie za Pranziniego, skazanego mordercę, jako swojego «pierwszego dziecka»), i każdego momentu, gdy dusza wyczuwa swoją własną małość wobec wielkiej potrzeby.",
    prayerText:
      "O Mała Tereso od Dzieciątka Jezus, proszę zerwij dla mnie różę z niebieskich ogrodów i ześlij mi ją jako poselstwo miłości. O Mały Kwiatku Jezusa, poproś dziś Boga, aby udzielił łask, które z ufnością składam w Twoje ręce. (Wymień intencję.) Święta Tereso, pomóż mi zawsze wierzyć, jak Ty wierzyłaś, w wielką miłość Boga do mnie, abym mógł naśladować Twoją Małą Drogę każdego dnia. Amen.",
    instructions:
      "Módl się raz dziennie przez dziewięć kolejnych dni. Tradycyjna struktura: (1) Rozpocznij od Znaku Krzyża; (2) Odmów modlitwę nowenny do świętej Teresy (prosząc o jej wstawiennictwo i jej słynną różę); (3) Wymień swoją intencję cicho lub na głos; (4) Zakończ Ojcze Nasz, Zdrowaś Maryjo i Chwała Ojcu. Nowennę odmawia się właściwie w dziewięć dni poprzedzających jej święto (1 października) lub o każdej porze roku w prywatnej intencji. Wielu katolików przechowuje w domu mały obrazek lub relikwię świętej Teresy lub nosi obrazek z motywem róży podczas nowenny. Tradycja «deszczu róż» jest dokładnie tym — tradycją, nie magiczną gwarancją. Róża otrzymana podczas lub po nowennie jest odczytywana jako osobisty znak, że święta wysłuchała modlitwy i wstawia się przed Chrystusem; brak róży nie jest odczytywany jako brak wstawiennictwa. Chodzi o dyspozycję: Mała Droga Teresy zaprasza proszącego do tej samej dziecięcej ufności, którą ona zamodelowała, która sama w sobie jest łaską, o którą się prosi. Nowenna jest również odpowiednim towarzyszem konkretnym aktom małej wierności w ciągu dziewięciu dni — cierpliwości wobec trudnego członka rodziny, przyjmowania małej niedogodności bez narzekania, powstrzymywania ostrego słowa, wykonywania jednego ukrytego aktu dobroci dziennie. Te «małe drogi» ucieleśniają to, o co prosi nowenna: nie heroiczne przemienienie, ale drogę małych rzeczy uczynionych z wielką miłością, której Teresa nauczała i którą żyła.",
    patronSaint: "święta Teresa od Dzieciątka Jezus",
    feastDay: "1 października",
    source: "KEP + Dzieje duszy + papież święty Jan Paweł II Divini Amoris Scientia (1997, ogłoszenie Doktorem Kościoła). Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-miraculous-medal",
    name: "Nowenna do Cudownego Medalika",
    description:
      "W nocy z 18 na 19 lipca 1830 roku, w kaplicy Córek Miłosierdzia przy Rue du Bac w Paryżu, młoda nowicjuszka o imieniu Katarzyna Labouré została zbudzona przez swojego anioła stróża i zaprowadzona do kaplicy na prywatne objawienie Najświętszej Maryi Panny. Maryja rozmawiała z nią ponad dwie godziny o niespokojnym stanie Francji i szerszego Kościoła. W drugim objawieniu w listopadzie Katarzyna zobaczyła Maryję stojącą na globusie z promieniami światła wytryskującymi z jej rąk, otoczoną ramą z wpisanymi słowami: «O Maryjo bez grzechu poczęta, módl się za nami, którzy się do Ciebie uciekamy!» Na rewersie tej wizji była krzyżowa M z dwunastoma gwiazdami, Serce Chrystusa ukoronowane cierniami i Serce Maryi przebite mieczem. Maryja poleciła Katarzynie: «Zrób medalik według tego wzoru. Ci, którzy go będą nosić, otrzymają wielkie łaski, zwłaszcza jeśli będą go nosić na szyi». Medalik został wybity w 1832 roku za zgodą arcybiskupa Paryża. W ciągu pięciu lat został rozdystrybuowany w takich ilościach i towarzyszył tylu zgłoszonym wstawiennictwom, że popularna katolicka wyobraźnia przemianowała go na «Cudowny Medalik», nazwę, którą Kościół ostatecznie przyjął. Objawienia z 1830 roku są godne uwagi jako jedno z głównych wydarzeń maryjnych epoki nowożytnej, wyprzedzające Lourdes (1858) o dwadzieścia osiem lat i Fatimę (1917) o osiemdziesiąt siedem lat. Doktryna Niepokalanego Poczęcia — w sercu centralnego napisu medalika — została formalnie zdefiniowana przez papieża Piusa IX w 1854 roku, dwadzieścia cztery lata po wizjach Katarzyny. Katarzyna Labouré pozostała w swoim klasztorze w Reuilly, pracując ze starymi biednymi, przez pozostałe czterdzieści sześć lat swojego życia. Została kanonizowana w 1947 roku przez papieża Piusa XII. Nowenna do Cudownego Medalika jest odpowiednia dla: choroby (zwłaszcza z złym rokowaniem — reputacja medalika zaczęła się od uzdrowień), nawrócenia członków rodziny, ochrony w czasie ciąży (długa katolicka tradycja przypinania medalika do sukni matki lub noszenia go podczas porodu), i każdej trudnej chwili, gdy dusza szuka konkretnego macierzyńskiego wstawiennictwa Maryi przez ten szczególny znak.",
    prayerText:
      "O Niepokalana Dziewico Maryjo, Matko naszego Pana Jezusa i nasza Matko, przeniknięci najżywszą ufnością w Twoim wszechmocnym i nigdy nie zawodzącym wstawiennictwie, objawionym tak często przez Cudowny Medalik, my, Twoje kochające i ufające dzieci, błagamy Cię, abyś nam wyjednała łaski i przysługi, o które prosimy podczas tej nowenny, jeśli będą one korzystne dla naszych nieśmiertelnych dusz i dla dusz, za które się modlimy. (Wymień intencję.) Wiesz, o Maryjo, jak często nasze dusze były świątynią Twojego Syna, który nienawidzi niegodziwości. Wyjednaj nam więc głęboką nienawiść do grzechu i tę czystość serca, która zwiąże nas z samym Bogiem. Amen.",
    instructions:
      "Módl się raz dziennie przez dziewięć kolejnych dni. Tradycyjna struktura: (1) Rozpocznij od Znaku Krzyża; (2) Odmów Pomnij lub trzy Zdrowaś Maryjo jako otwierające maryjne wezwanie; (3) Odmów modlitwę nowenny do Niepokalanej Dziewicy przez Cudowny Medalik; (4) Zakończ centralnym napisem medalika jako aspiracją: «O Maryjo bez grzechu poczęta, módl się za nami, którzy się do Ciebie uciekamy!»; (5) Wymień konkretną intencję. Jeśli to możliwe, noś Cudowny Medalik — fizycznie — podczas nowenny. Medalik nie jest amuletem; tradycja jest taka, że jego noszenie wyraża zaufanie do wstawiennictwa Maryi i otwartość noszącego na łaskę. Katolickie kaplice i sanktuaria rozdają Cudowne Medaliki bezpłatnie. Nowennę można odmawiać o każdej porze, ale jest szczególnie odpowiednia w dniach poprzedzających święto Matki Bożej od Cudownego Medalika (27 listopada) lub uroczystość Niepokalanego Poczęcia (8 grudnia). Wielu katolików używa również Cudownego Medalika jako znaku zawierzenia Niepokalanemu Sercu Maryi — łącząc nowennę z modlitwą Totalnego Zawierzenia świętego Maksymiliana Kolbego lub dłuższym 33-dniowym przygotowaniem do zawierzenia maryjnego (tradycja Montfortańska). Dla rodzin modlących się za nieobecną lub zmagającą się ukochaną osobę, tradycyjną praktyką jest wsunięcie Cudownego Medalika do rzeczy ukochanej osoby — portfela, kieszeni płaszcza, plecaka — jako mały znak nieustannego macierzyńskiego towarzyszenia.",
    patronSaint: "święta Katarzyna Labouré",
    feastDay: "27 listopada",
    source: "KEP + narracja objawienia z Rue du Bac (1830) + kanonizacja papieża Piusa XII 1947. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "st-michael-prayer",
    name: "Modlitwa do świętego Michała Archanioła",
    description:
      "Modlitwa do świętego Michała Archanioła została skomponowana przez papieża Leona XIII w 1886 roku po tym, jak — według długo poświadczanej tradycji — papież miał nagłe mistyczne doświadczenie podczas odprawiania Mszy świętej — rodzaj wizji na jawie, w której usłyszał kolokwium między Chrystusem a szatanem, w którym szatan przechwalał się, że może zniszczyć Kościół, jeśli zostanie mu dany wystarczający czas i władza. Wstrząśnięty tym, co zobaczył, Leon XIII skomponował modlitwę do świętego Michała tego samego dnia i nakazał dodać ją do modlitw odmawianych przez kapłana i wiernych na zakończenie każdej Mszy cichej w całym Kościele powszechnym. Ta praktyka — «Modlitwy Leonińskie» po Mszy — kontynuowała się przez prawie osiemdziesiąt lat, aż do reform liturgicznych lat sześćdziesiątych. Modlitwy do świętego Michała nie zniesiono, ale jej formalne miejsce w modlitwach po Mszy wygasło. Papież święty Jan Paweł II przywrócił prominencję modlitwy w niedzielnym wystąpieniu na Anioł Pański w 1994 roku, w którym wezwał wiernych, aby «nie zapominali odmawiać» modlitwy do świętego Michała «aby otrzymać pomoc w walce z siłami ciemności i przeciwko duchowi tego świata». Tekst modlitwy opiera się na Liście świętego Judy 1,9 (Michał spierający się z diabłem o ciało Mojżesza), Apokalipsie 12,7-9 (Michał strącający smoka) i szerszej katolickiej tradycji świętego Michała jako wodza zastępów niebieskich przeciwko mocom zła. Modlitwa jest odpowiednia dla: walki duchowej w każdej formie, niepokoju o zło w świecie lub w życiu osobistym, ochrony podczas podróży lub przed trudnym spotkaniem, nawrócenia tych, którzy popadli w ciężki grzech, i jako codzienna modlitwa zawierzenia ochronie świętego Michała. Jest to modlitwa najczęściej uczona katolickim dzieciom jako pierwsza «modlitwa ochronna» wraz z Modlitwą do Anioła Stróża.",
    instructions:
      "Módl się raz z pełną uwagą i pobożnością. Modlitwa do świętego Michała jest na tyle krótka, że można ją zapamiętać i odmawiać wszędzie — w samochodzie przed trudnym spotkaniem, przy drzwiach szpitala, idąc obok miejsca, gdzie wyczuwa się duchowy zamęt, przed snem na koniec dnia. Tradycyjna katolicka praktyka — i ta, którą Leon XIII pierwotnie ustanowił — to odmawiać ją natychmiast po zakończeniu Mszy świętej, albo w ciszy następującej po rozesłaniu, albo jako część publicznej sekwencji Modlitw Leonińskich. Wiele parafii wskrzesiło modlitwę do świętego Michała po Mszy po wezwaniu JPII z 1994 roku; jeśli twoja parafia tego nie robi, jest całkowicie odpowiednie, aby pozostać w ławce przez trzydzieści sekund po rozesłaniu i odmówić ją prywatnie. Modlitwa jest również często włączana: na zakończenie Różańca lub Godziny świętej; na zakończenie wieczornej modlitwy rodzinnej; przed jakimkolwiek zadaniem, w którym katolik wyczuwa rzeczywistą duchową opozycję. W niektórych katolickich domach modlitwa jest umieszczana nad drzwiami wejściowymi domu jako znak zawierzenia ochronie świętego Michała nad domem, w ciągłości ze starszą tradycją wpisywania «Christus vincit, Christus regnat, Christus imperat» («Chrystus zwycięża, Chrystus króluje, Chrystus rozkazuje») nad progami. Modlitwa łączy się naturalnie z Modlitwą do Anioła Stróża dla dzieci: święty Michał jako książę anielskich zastępów, a anioł stróż jako szczególny duch posługujący przydzielony każdej osobie w chrzcie.",
    patronSaint: "święty Michał Archanioł",
    feastDay: "29 września",
    source: "KEP + Leon XIII kompozycja z 1886 + papież święty Jan Paweł II niedzielny Anioł Pański, 24 kwietnia 1994. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "anima-christi",
    name: "Anima Christi (Duszo Chrystusowa)",
    description:
      "Anima Christi («Duszo Chrystusowa») jest jedną z najbardziej umiłowanych i najstarszych modlitw eucharystycznych w tradycji katolickiej. Jej pochodzenie jest średniowieczne — prawdopodobnie z XIV wieku — i przez wiele lat była przypisywana świętemu Ignacemu Loyoli, ponieważ umieścił ją na samym początku swoich Ćwiczeń Duchowych (1522-1524) i zalecił jako codzienną modlitwę dla rekolektantów. Współczesna nauka datowała modlitwę co najmniej sto lat przed narodzinami Ignacego; pojawia się w rękopisach już w 1314 roku, prawdopodobnie skomponowana przez Jana XXII lub przez anonimowego mnicha z tradycji kartuzów lub franciszkanów. Ignacy jej nie napisał, ale ją kochał, a jego Ćwiczenia Duchowe nadały jej szeroką cyrkulację, którą cieszy się dzisiaj w całym katolickim świecie. Modlitwa jest podtrzymywaną medytacją nad Chrystusem Eucharystycznym — Jego Duszą, Jego Ciałem, Jego Krwią, wodą i krwią, które wypłynęły z Jego przebitego boku przy Ukrzyżowaniu (J 19,34), Jego Męką. Każda linijka jest jednocześnie wyznaniem wiary i prośbą: «Duszo Chrystusowa, uświęć mnie» jest modlitwą kogoś, kto prosi o uświęcenie wewnętrzne przez samą świętość Chrystusa; «Ciało Chrystusowe, zbaw mnie» jest wyznaniem, że zbawienie pochodzi przez to samo Ciało otrzymywane teraz pod postacią chleba; «W Twoich ranach ukryj mnie» jest średniowiecznym mistycznym pragnieniem znalezienia schronienia w samych ranach ukrzyżowanego Pana. Zakończenie modlitwy — «W godzinę śmierci mojej wezwij mnie» — uczyniło ją tradycyjną katolicką modlitwą za umierających, odmawianą przy łożu w ostatnich godzinach przez kapelanów hospicjów, członków rodziny i katolickie pielęgniarki. Anima Christi jest odpowiednia dla: dziękczynienia natychmiast po przyjęciu Komunii świętej (jej główne tradycyjne zastosowanie), Godziny świętej lub nawiedzenia Najświętszego Sakramentu, zakończenia osobistej modlitwy, łoża umierających, i jako codzienne nabożeństwo wyrażające intymność eucharystyczną.",
    instructions:
      "Módl się z pobożnością, najlepiej w postawie uważnej ciszy — klęcząc, siedząc prosto z otwartymi rękami lub stojąc przed Najświętszym Sakramentem. Modlitwa jest pomyślana jako niespieszna; każda linijka jest odrębną prośbą, a naturalne tempo pozwala na krótką pauzę między frazami, aby każda linijka mogła osiąść w sercu. Tradycyjne momenty na Anima Christi: (1) Natychmiast po przyjęciu Komunii świętej na Mszy, w ciszy osobistego dziękczynienia — jest to główne dewocyjne zastosowanie modlitwy i rekomendacja świętego Ignacego; (2) Podczas Godziny świętej lub adoracji eucharystycznej przed wystawionym Najświętszym Sakramentem; (3) Na zakończenie osobistej porannej lub wieczornej modlitwy, zwłaszcza jako część duchowości eucharystycznej; (4) Przy łóżku kogoś poważnie chorego lub umierającego — ostatnia linijka, «W godzinę śmierci mojej wezwij mnie i każ mi przyjść do Siebie», czyni modlitwę szczególnie odpowiednią jako nabożeństwo łoża śmierci; (5) Śpiewana wersja po łacinie («Anima Christi, sanctifica me…») w monastycznych i tradycyjnych liturgicznych warunkach. Wiele katolickich obrazków modlitewnych nosi Anima Christi na odwrocie obok modlitwy przyjęcia Komunii. Modlitwę można zapamiętać w jedno popołudnie i odmawiać wszędzie; jej zwięzłość i gęstość treści eucharystycznej czynią ją jedną z najwyższej wartości krótkich modlitw w katolickim repertuarze dewocyjnym.",
    patronSaint: "święty Ignacy Loyola",
    feastDay: null,
    source: "Vatican.va polski + Ćwiczenia Duchowe świętego Ignacego (1522-1524) + tradycja rękopisów z XIV wieku. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },

  // ─── ROUND 4 (pl) ──────────────────────────────────────────
  {
    prayerSlug: "litany-saints",
    name: "Litania do Wszystkich Świętych",
    description:
      "Litania do Wszystkich Świętych jest najstarszą i najuroczystszą litanią w Kościele katolickim. Jej korzenie sięgają pierwszych wieków — fragmenty formy pojawiają się w siódmowiecznych zachodnich księgach liturgicznych, a papież Grzegorz Wielki ustanowił wielkie procesje litanijne Rzymu w 590 roku, prosząc wiernych, aby wezwali świętych po imieniu w błaganiu podczas zarazy. Litania stała się częścią liturgii chrzcielnej Wigilii Paschalnej najpóźniej w VIII wieku. Jej obecny tekst rytu rzymskiego został formalnie ustalony przez papieża Piusa V w 1568 roku i zrewidowany w posoborowej reformie liturgicznej (1969). Struktura rozwija się w pięciu głównych ruchach: (1) Wezwania Kyrie eleison i prośby trynitarne; (2) wielkie wyliczenie świętych po imieniu — najpierw Najświętsza Maryja Panna, następnie archaniołowie (Michał, Gabriel, Rafał), patriarchowie i prorocy (Abraham, Mojżesz, Eliasz, Jan Chrzciciel), apostołowie i ewangeliści (Piotr, Paweł, Andrzej, Jan, Jakub, itd.), męczennicy (Szczepan, Wawrzyniec, Polikarp, Ignacy z Antiochii, Cyprian, Sebastian, Agata, Agnieszka), biskupi-wyznawcy i doktorzy (Atanazy, Bazyli, Grzegorz, Augustyn, Hieronim, Ambroży), założyciele i dziewice (Antoni Pustelnik, Benedykt, Franciszek, Dominik, Katarzyna ze Sieny, Teresa z Avili); (3) prośby o uwolnienie («Od wszelkiego zła, wybaw nas Panie»); (4) prośby błagalne («Abyś nami rządził i zachował twój święty Kościół, Ciebie prosimy, wysłuchaj nas»); (5) końcowe Agnus Dei i kolekta. Litania jest jedną z głównych modlitw katolickiej liturgii i jest używana w: Wigilii Paschalnej (podczas Liturgii Chrztu), chrztach Wielkiej Soboty, święceniach kapłańskich i biskupich (kandydaci leżą krzyżem, podczas gdy zgromadzony Kościół śpiewa nad nimi litanię), Obrzędzie Chrześcijańskiego Wtajemniczenia Dorosłych (OCWD) w Obrzędzie Wybrania, poświęceniu kościoła, konsekracji ołtarzy i składaniu ślubów zakonnych. Jest również zwyczajem w wielu parafiach w uroczystość Wszystkich Świętych (1 listopada), na pogrzebach kapłanów i osób zakonnych, w chwilach poważnej publicznej potrzeby (wojna, pandemia, klęska żywiołowa) i jako modlitwa zamykająca procesje pielgrzymkowe.",
    instructions:
      "Litania do Wszystkich Świętych odmawia się responsoryjnie, zwykle śpiewa w warunkach liturgicznych. Prowadzący (kapłan, diakon lub wyszkolony kantor) intonuje wezwanie; zgromadzenie odpowiada odpowiednią formułą. Odpowiedzi następują strukturę: «Módl się za nami» po każdym świętym wymienionym z imienia lub grupie świętych; «Wybaw nas, Panie» po każdym wezwaniu uwolnienia («Od wszelkiego zła…»); «Ciebie prosimy, wysłuchaj nas» po każdej prośbie błagalnej («Abyś…»). Litania trwa około piętnastu do dwudziestu minut, gdy jest śpiewana w uroczystym tempie w warunkach liturgicznych; nieco mniej, gdy odmawia się ją w domu w formie mówionej. Do prywatnej dewocji litanię można odmawiać z dowolnego zatwierdzonego drukowanego tekstu (Mszał Rzymski, parafialna księga modlitw lub strona Konferencji Episkopatu Polski). Gdy odmawia się ją w domu, siedź, stój lub klęcz, jak chcesz; tempo litanii jest kontemplacyjne, a nie pospieszne. Litanię używa się odpowiednio: (1) w Wszystkich Świętych (1 listopada) i w Zaduszki (2 listopada) jako modlitwę rodzinną tych dni; (2) przy łóżku kogoś poważnie chorego lub umierającego — wielu katolickich kapelanów szpitalnych odmawia litanię w miarę zbliżania się ostatnich sakramentów; (3) na początku ważnej pielgrzymki lub rodzinnego przedsięwzięcia, prosząc, aby wielki obłok świadków (Hbr 12,1) otoczył proszących; (4) w czasie zarazy, klęski lub publicznego stanu wyjątkowego, w ciągłości z ustanowieniem procesji litanijnych przez Grzegorza Wielkiego podczas rzymskiej zarazy z 590 roku. Szczególnym duchowym darem litanii jest odczuwana obecność komunii świętych — prawda, że wierni modlący się na ziemi i ci tryumfujący w niebie są jednym ciałem w Chrystusie.",
    patronSaint: null,
    feastDay: "1 listopada (Wszystkich Świętych)",
    source: "KEP + papież Pius V kodyfikacja 1568 + posoborowa rewizja 1969 + ustanowienie Grzegorza Wielkiego 590. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "prayer-expectant-mothers",
    name: "Modlitwa za matki oczekujące dziecka",
    description:
      "Katolicka modlitwa za matki oczekujące dziecka czerpie z wielowiekowej tradycji Kościoła towarzyszenia kobietom w czasie ciąży pod opieką Najświętszej Maryi Panny, która sama nosiła Chrystusa w swoim łonie przez dziewięć miesięcy. Głównym fundamentem biblijnym jest Nawiedzenie (Łk 1,39-56): Maryja, sama w pierwszych miesiącach ciąży z Jezusem, śpieszy w góry Judei, aby być ze swoją kuzynką Elżbietą, która jest w szóstym miesiącu ciąży z Janem Chrzcicielem. Magnificat («Wielbi dusza moja Pana…») jest modlitwą dwóch kobiet w ciąży radujących się razem. Katolicka tradycja dewocyjna od dawna powierza matki oczekujące dziecka Maryi pod różnymi tytułami: Matka Boża Oczekująca (uroczystość 18 grudnia, święto z tradycji hiszpańskiej dziewięć dni przed Bożym Narodzeniem, znaczące zbliżające się rozwiązanie Maryi); Matka Boża z Guadalupe (której obraz pokazuje ją w ciąży); i święty Gerard Majella (1726-1755), włoski brat zakonny redemptorystów, którego imię stało się tak związane z bezpiecznym rozwiązaniem, że jego statuy umieszczane są na oddziałach położniczych szpitali katolickich na całym świecie. Modlitwa za matki oczekujące dziecka jest odpowiednia na każdym etapie ciąży: przy pierwszym pozytywnym teście, podczas niepokoju pierwszego trymestru, który odczuwa wiele matek, podczas długich środkowych miesięcy oczekiwania, w tygodniach przygotowań przed rozwiązaniem, w czasie samego porodu (gdy członkowie rodziny często odmawiają ją przy łóżku) i bezpośrednio po porodzie w dziękczynieniu. Odmawiają ją również wspólnoty — parafie, grupy modlitewne, krąg przyjaciółek kobiety — jako sposób otaczania jej wstawiennictwem przez dziewięć miesięcy oczekiwania.",
    instructions:
      "Módl się raz dziennie za matkę oczekującą dziecka, najlepiej o tej samej porze każdego dnia, aby praktyka stała się częścią jej zwykłego rytmu. Modlitwa jest na tyle krótka, że można ją zapamiętać; wiele matek oczekujących dziecka nosi ją na małej karteczce przechowywanej w Biblii, modlitewniku lub portfelu i odmawia, gdy zatrzymują się w codziennej pracy przygotowywania się do dziecka. Powszechne praktyki towarzyszące modlitwie: (1) Zapalanie świecy w sanktuarium maryjnym w kościele parafialnym na każdy miesiąc ciąży — wiele parafii utrzymuje wyznaczony stojak na świece «matek oczekujących» i wywieszają imiona kobiet, za które się modlą; (2) Codzienne odmawianie jednego dziesiątka różańca, medytując nad Tajemnicami Radosnymi (Zwiastowanie, Nawiedzenie, Narodzenie, Ofiarowanie, Znalezienie w świątyni — pięć tajemnic, które przechodzą duchowy łuk od poczęcia do młodego macierzyństwa); (3) Proszenie o wstawiennictwo świętego Gerarda Majelli — modlitwę za matki oczekujące można połączyć z nowenną do świętego Gerarda, szczególnie w ostatnich dziewięciu dniach przed rozwiązaniem; (4) Rodzinna lub wspólnotowa modlitwa przy łóżku podczas porodu, w której małżonek matki oczekującej lub inny członek rodziny odmawia Pomnij (krótką maryjną modlitwę ufności) lub tę modlitwę na głos w miarę postępu porodu. Tradycja katolicka jest jasna, że ciąża jest sama w sobie formą modlitwy. Po porodzie modlitwa kontynuuje w dziękczynieniu i naturalnie zwraca się ku modlitwom macierzyństwa za nowonarodzone dziecko.",
    patronSaint: "Matka Boża",
    feastDay: null,
    source: "KEP + Łk 1,39-56 + tradycja świętego Gerarda Majelli. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "adoration-hour",
    name: "Godzina święta adoracji",
    description:
      "Godzina święta adoracji eucharystycznej jest jedną z najstarszych i najbardziej centralnych form katolickiej modlitwy — trwałej, cichej modlitwy w rzeczywistej obecności Jezusa Chrystusa w Najświętszym Sakramencie, wystawionym w monstrancji na ołtarzu. Praktyka czerpie bezpośrednio ze sceny ewangelicznej w Getsemani: Chrystus pyta swoich apostołów: «Tak, jednej godziny nie mogliście czuwać ze mną?» (Mt 26,40). «Jedna godzina» nie jest arbitralną długością — to wyraźna prośba Pana w nocy Jego męki, a katolicka Godzina święta odpowiada bezpośrednio na tę prośbę. Praktyka dewocyjna trwałej adoracji eucharystycznej skrystalizowała się w okresie kontrreformacji i otrzymała szczególny impuls dzięki objawieniom Najświętszego Serca świętej Małgorzacie Marii Alacoque w Paray-le-Monial (1673-1675); Chrystus konkretnie poprosił Małgorzatę Marię o godzinę wynagrodzenia w Jego obecności każdego czwartku w nocy, na pamiątkę Konania w Ogrójcu. Godzina święta stała się centralna dla «Apostolstwa Modlitwy» (założonego w 1844 roku) i była szeroko głoszona w XX wieku przez Czcigodnego Fultona Sheena (1895-1979), który słynnie zobowiązał się do Godziny świętej każdego dnia swojego kapłańskiego życia — ponad 60 lat — i każdą łaskę swojej posługi przypisywał tej godzinie. Dziś w tysiącach parafii na całym świecie działają kaplice wieczystej adoracji eucharystycznej, obsadzone przez świeckich wolontariuszy, którzy zobowiązują się do konkretnych godzin przez noc i dzień, aby Chrystus nigdy nie pozostał sam w swoim wystawionym Sakramencie. Godzina święta jest odpowiednia dla: każdego trwałego wstawiennictwa, zwłaszcza o uzdrowienie, nawrócenie lub rozeznanie powołania; wynagrodzenia za grzech (własny lub świata); suchości duchowej; przygotowania do ważnych decyzji życiowych; dziękczynienia po otrzymaniu łaski. To modlitwa, którą Sheen nazywał «tajemnicą każdego kapłana, który stał się świętym».",
    instructions:
      "Odwiedź swoją parafię w godzinach adoracji — sprawdź stronę internetową lub biuletyn swojej parafii, aby poznać harmonogram. Wiele parafii oferuje adorację eucharystyczną w czwartki (prośba Chrystusa do Małgorzaty Marii), w piątki (tradycyjny dzień wynagrodzenia) lub jako rozszerzoną Godzinę świętą po Mszy świętej w dni powszednie. Niektóre utrzymują wieczystą adorację z Najświętszym Sakramentem wystawionym 24/7. Po przybyciu: (1) Uklęknij na obu kolanach (tradycyjny znak czci dla wystawionej Eucharystii, w odróżnieniu od jednokolanowej genuflekcji dla Sakramentu zachowanego w tabernakulum); (2) Znajdź miejsce do siedzenia lub klęczenia; (3) Pokłoń się w cichym uznaniu, że jesteś w dosłownej obecności Boga wcielonego. Sama godzina jest nieustrukturyzowana z założenia — trwała obecność jest modlitwą. Niektóre wzory, których używają katolicy, aby wypełnić godzinę: (a) Odmawiać Różaniec, medytując nad Tajemnicami Bolesnymi; (b) Czytać Pismo Święte (opisy Męki, Ewangelię świętego Jana, Psalmy — Psalmy 23 i 91); (c) Odmawiać Koronkę do Bożego Miłosierdzia, zwłaszcza podczas godziny 15:00; (d) Czytać z klasyki duchowej; (e) Siedzieć w cichej obecności — najwyższej formie modlitwy kontemplacyjnej; (f) Zapisać rozmowę z Jezusem o osobie, za którą ofiarujesz godzinę. Przez całą godzinę często wymieniaj imię osoby i intencję. Godzina kończy się kolejną genuflekcją i krótką modlitwą dziękczynną za dar Jego obecności.",
    patronSaint: null,
    feastDay: null,
    source: "KEP + Mt 26,40 + objawienia Najświętszego Serca w Paray-le-Monial (1673-1675) + tradycja Fultona Sheena. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "stations-of-the-cross",
    name: "Droga Krzyżowa",
    description:
      "Droga Krzyżowa (zwana również Drogą Krzyża, Via Crucis lub Via Dolorosa po łacinie) jest medytacyjnym nabożeństwem, w którym wierny podąża za Męką Chrystusa przez czternaście odrębnych stacji — momentów wzdłuż Jego drogi z pretorium Piłata do grobu. Praktyka powstała w pierwszych wiekach chrześcijańskich jako dosłowna pielgrzymka do miejsc świętych w Jerozolimie; pielgrzymi chodzili rzeczywistą ścieżką, którą szedł Chrystus, zatrzymując się na każdej znaczącej stacji, aby się modlić. Gdy Jerozolima padła pod kontrolę muzułmańską w VII wieku i pielgrzymka stała się niebezpieczna i rzadka, franciszkanie — którym papież Klemens VI dał kustodię Ziemi Świętej w 1342 roku — zaczęli rekonstruować Drogę Krzyżową w formie dewocyjnych stacji w swoich kościołach w całej Europie, aby każdy katolik mógł «pójść» Drogą Krzyżową duchowo, nie podróżując do Jerozolimy. Papież Innocenty XI nadał franciszkanom odpusty za odmawianie stacji w 1686 roku, a papież Klemens XII rozszerzył to na wszystkich wiernych w 1731 roku. Czternaście standardowych stacji ustalono w XVIII wieku: (1) Jezus jest skazany na śmierć; (2) Jezus bierze krzyż na swoje ramiona; (3) Jezus upada pierwszy raz pod krzyżem; (4) Jezus spotyka swoją Matkę Maryję; (5) Szymon Cyrenejczyk pomaga Jezusowi nieść krzyż; (6) Weronika ociera twarz Jezusowi; (7) Jezus upada drugi raz; (8) Jezus spotyka płaczące niewiasty jerozolimskie; (9) Jezus upada trzeci raz; (10) Jezus z szat obnażony; (11) Jezus przybity do krzyża; (12) Jezus umiera na krzyżu; (13) Jezus zdjęty z krzyża; (14) Jezus złożony do grobu. Niektóre wspólnoty katolickie dodają piętnastą stację Zmartwychwstania. Droga Krzyżowa jest tradycyjnie odmawiana w piątki w okresie Wielkiego Postu i jest centralnym publicznym nabożeństwem Wielkiego Piątku w większości katolickich parafii na całym świecie. Papież przewodniczy Drodze Krzyżowej w Koloseum w Rzymie w każdy Wielki Piątek — tradycji wskrzeszonej przez papieża Pawła VI i kontynuowanej przez każdego papieża od tego czasu.",
    instructions:
      "Odwiedź kościół katolicki — większość ma czternaście stacji zamontowanych wzdłuż bocznych ścian nawy, zwykle jako małe obrazy, tablice lub płaskorzeźby. Tradycyjna praktyka: (1) Rozpocznij od pierwszej stacji; uklęknij; (2) Ogłoś stację na głos («Stacja pierwsza: Jezus skazany na śmierć»); (3) Odmów odpowiedź «Kłaniamy Ci się, Panie Jezu Chryste, i błogosławimy Tobie, żeś przez Krzyż i Mękę swoją świat odkupić raczył»; (4) Krótko medytuj nad sceną z Męki Chrystusa odpowiadającą stacji; (5) Odmów Ojcze Nasz, Zdrowaś Maryjo i Chwała Ojcu (lub inne modlitwy z książeczki Drogi Krzyżowej); (6) Ofiaruj stację za swoją intencję. Przejdź do następnej stacji — fizyczne przechodzenie od jednej do drugiej jest częścią modlitwy; Droga Krzyżowa ma być przebyta, choćby krótko. Całkowity czas: około trzydziestu do czterdziestu pięciu minut, gdy odmawia się w niespiesznym tempie w kościele. W domu drukowana książeczka Drogi Krzyżowej działa dobrze — nie ma wymogu fizycznej obecności. Nabożeństwo jest odpowiednio odmawiane: (a) W piątki w okresie Wielkiego Postu, tradycyjna katolicka dyscyplina; (b) W sam Wielki Piątek, dzień, w którym Chrystus przeszedł Via Dolorosa; (c) W każdy piątek przez cały rok (jako tradycyjny dzień pamięci o Męce); (d) Gdy niesie się ciężki osobisty krzyż — choroba, żałoba, uzależnienie, prześladowanie — łącząc swoje cierpienie z cierpieniem Chrystusa; (e) Gdy modli się za kogoś, kto cierpi lub umiera; (f) Gdy szuka się łaski cierpliwości pod brzemieniem.",
    patronSaint: null,
    feastDay: "Wielki Piątek",
    source: "KEP + franciszkańska kustodia Ziemi Świętej (1342) + papież Innocenty XI 1686 + Klemens XII 1731. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "morning-offering",
    name: "Ofiarowanie poranne",
    description:
      "Ofiarowanie poranne jest fundamentalną codzienną modlitwą Apostolstwa Modlitwy — katolickiego ruchu duchowego założonego w 1844 roku przez jezuitę księdza François-Xaviera Gautreleta w Vals we Francji, przemianowanego w 2015 roku przez papieża Franciszka na Światową Sieć Modlitewną Papieża. Centralna intuicja ruchu jest prosta, ale przemieniająca: każde zwykłe działanie dnia katolika — praca, nauka, rozmowa, posiłki, zmęczenie, radość, cierpienie, nawet sen — może być ofiarowane Bogu jako celowy akt miłości, przekształcając cały dzień w jeden trwały akt modlitwy. Ofiarowanie poranne jest aktem, który dokonuje tego ofiarowania, odmawianym jako pierwsza rzecz po przebudzeniu, zanim dzień przejmie kontrolę. Tradycyjny tekst — skomponowany pod koniec XIX wieku w broszurach dewocyjnych Apostolstwa i udoskonalony przez kilka wersji zatwierdzonych przez papieży — umieszcza ofiarowanie dnia «przez Niepokalane Serce Maryi» (maryjne pośrednictwo, które ujmuje życie katolickie jako synowskie) i łączy je «ze Świętą Ofiarą Mszy świętej na całym świecie» (tak że ofiarowanie dnia gromadzi się w ofierze eucharystycznej sprawowanej w jakiejś katolickiej parafii gdzieś na ziemi w każdej minucie każdej godziny). Co miesiąc papież publikuje konkretne uniwersalne intencje modlitewne przez Światową Sieć Modlitewną Papieża. Ofiarowanie poranne jest także potężną modlitwą wstawienniczą za konkretną osobę: chorego członka rodziny, dorosłego dziecka, które odeszło od wiary, rodzica zmagającego się z uzależnieniem, każdego, czyja sytuacja jest stale obecna w sercu proszącego.",
    prayerText:
      "O Jezu, przez Niepokalane Serce Maryi ofiaruję Ci moje modlitwy, prace, radości i cierpienia tego dnia, na wszystkie intencje Twojego Najświętszego Serca, w łączności z Najświętszą Ofiarą Mszy świętej na całym świecie, w dziękczynieniu za Twoje łaski, w zadośćuczynieniu za moje grzechy, na intencje wszystkich moich bliskich, a w szczególności za (wymień imię i intencję osoby). Amen.",
    instructions:
      "Módl się natychmiast po przebudzeniu, zanim zajętość dnia przejmie kontrolę. Tradycyjna dyscyplina to odmówienie jej przed wstaniem z łóżka, gdy umysł jest jeszcze miękki, a dzień wciąż wydaje się darem; niektórzy katolicy odmawiają ją w pierwszej cichej chwili porannej rutyny (przy pierwszej filiżance kawy, przy zlewie kuchennym, karmiąc dziecko). Modlitwa jest na tyle krótka, że można ją zapamiętać w jeden dzień. Aby uczynić ją częścią życia: (1) Umieść modlitwę w miejscu, gdzie zobaczysz ją jako pierwszą — przyklejoną do lustra w łazience, wewnątrz drzwi sypialni, na karteczce obok ekspresu do kawy; (2) Wymień konkretną osobę i intencję w odpowiednim miejscu modlitwy (linia «a w szczególności za…»), czyniąc ofiarowanie konkretnym, a nie abstrakcyjnym; (3) W ciągu dnia, gdy praca staje się trudna lub przerwa łamie twoje plany, krótko odnów ofiarowanie: «Oddałem ten dzień Tobie za (imię); ta chwila jest tego częścią». Wiele katolickich domów odmawia Ofiarowanie poranne razem na głos, gdy rodzina wstaje. Światowa Sieć Modlitewna Papieża publikuje comiesięczne uniwersalne intencje papieża. Dla trwałego wstawiennictwa (nowenny dni za chorego ukochanego, czasu trudnego rozeznania, miesięcy chemioterapii członka rodziny) Ofiarowanie poranne staje się kręgosłupem modlitwy.",
    patronSaint: null,
    feastDay: null,
    source: "KEP + Apostolstwo Modlitwy / Światowa Sieć Modlitewna Papieża (1844, przemianowana 2015). Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "three-oclock-prayer",
    name: "Modlitwa o godzinie trzeciej (Godzina Miłosierdzia)",
    description:
      "Modlitwa o godzinie trzeciej — zwana również Godziną Miłosierdzia lub Godziną Wielkiego Miłosierdzia — została dana przez Jezusa świętej Marii Faustynie Kowalskiej w objawieniach Bożego Miłosierdzia zapisanych w jej Dzienniczku: Miłosierdzie Boże w mojej duszy. Jezus pouczył Faustynę, że godzina 15:00 każdego dnia — godzina Jego śmierci na Kalwarii — ma być czczona jako Godzina Wielkiego Miłosierdzia, w której krótki akt modlitwy uzyskuje nadzwyczajne łaski. Dokładna obietnica, zapisana w Dzienniczku Faustyny (wpis 1320): «O trzeciej godzinie błagaj mojego miłosierdzia, szczególnie dla grzeszników; i choćby przez krótki moment zanurz się w mojej Męce, szczególnie w moim opuszczeniu w chwili konania. Jest to godzina wielkiego miłosierdzia dla całego świata… W tej godzinie nie odmówię niczego duszy, która prosi mnie przez wzgląd na moją Mękę». Godzina odpowiada dziewiątej godzinie dnia żydowskiego w chronologii ewangelicznej (Mk 15,34) — godzinie, w której «Jezus zawołał donośnym głosem… i oddał ducha» (Mk 15,37). Modlitwa o godzinie trzeciej jest najprostszą i najbardziej dostępną formą nabożeństwa do Bożego Miłosierdzia — znacznie krótszą niż koronka, dostępną dla każdego, kto może zatrzymać się na trzydzieści sekund w godzinie śmierci Chrystusa. Jest to modlitwa, którą tradycja katolicka umieszcza w sercu dnia dla tych, którzy nie mogą odprawić pełnej Godziny świętej, którzy nie mogą odmówić koronki, którzy są w pracy lub w szkole lub przy łóżku szpitalnym. Nabożeństwo było tłumione przez wiele lat (ten sam okres, gdy pisma Faustyny były pod prowizoryczną restrykcją), ale papież święty Jan Paweł II kanonizował Faustynę 30 kwietnia 2000 roku i ustanowił Niedzielę Bożego Miłosierdzia świętem dla Kościoła powszechnego. Modlitwa o godzinie trzeciej jest teraz odmawiana codziennie w niezliczonych katolickich domach, wspólnotach zakonnych, kapelaniach szpitalnych i w Sanktuarium Bożego Miłosierdzia w Łagiewnikach w Krakowie.",
    prayerText:
      "Skonałeś, Jezu, ale na duszę wytrysnęło źródło życia i wylał się na świat cały ocean miłosierdzia. O Źródło Życia, niezgłębione Miłosierdzie Boże, ogarnij świat cały i wylej się na nas. O Krwi i Wodo, któraś wytrysnęła z Serca Jezusowego jako zdrój miłosierdzia dla nas, ufam Tobie! Święty Boże, Święty Mocny, Święty a Nieśmiertelny, zmiłuj się nad nami i nad całym światem. (3 razy)",
    instructions:
      "O godzinie 15:00 każdego dnia zatrzymaj się na krótko — cokolwiek robisz — i módl się. Modlitwa jest na tyle krótka, że można ją zapamiętać w jedno popołudnie i odmawiać wszędzie: przy biurku, w samochodzie, w klasie, przy łóżku szpitalnym, idąc chodnikiem. Tradycja katolicka jest jasna, że «nawet chwila modlitwy w tej godzinie jest potężna» — jeśli zajęte życie może poświęcić tylko dwadzieścia sekund na jedno «Jezu, ufam Tobie» o godzinie 15:00, ta krótka chwila sama w sobie jest praktyką. Dla tych, którzy mają więcej czasu w tej godzinie: (1) Odmówić pełną Koronkę do Bożego Miłosierdzia (około dziesięciu minut); (2) Złożyć krótką «wizytę» w pobliskim katolickim kościele lub kaplicy adoracji eucharystycznej; (3) Zatrzymać się, aby przeczytać akapit z Dzienniczka świętej Faustyny; (4) Modlić się za grzeszników — Faustyna zapisała, że Jezus powiedział jej, że jest to najpotężniejsze wstawiennictwo w tej godzinie. Tradycyjne katolickie dyscypliny, które łączą się z Modlitwą o godzinie trzeciej: (a) Ustawienie codziennego alarmu na godzinę 15:00 jako przypomnienia; (b) Noszenie małego obrazka Bożego Miłosierdzia; (c) Modlitwa u stóp krucyfiksu; (d) Dodanie chwili fizycznej ciszy. Godzina jest codzienną kotwicą życia dewocyjnego Bożego Miłosierdzia: koronka o godzinie 15:00, codzienna Msza święta, comiesięczna spowiedź w pierwszy piątek, coroczna Nowenna do Bożego Miłosierdzia od Wielkiego Piątku do Niedzieli Bożego Miłosierdzia.",
    patronSaint: "święta Maria Faustyna Kowalska",
    feastDay: null,
    source: "KEP + Dzienniczek świętej Faustyny (1320) + JPII kanonizacja 30 kwietnia 2000 + Mk 15,34-37 + Sanktuarium w Łagiewnikach. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  // ── Wave 6 (2026-05-17): Marian devotions, modern saints, patronage
  //    saints. Źródła: KEP, Vatican.va Polski, Edycja Świętego Pawła,
  //    Wydawnictwo M, Niedziela. Polski kontekst szczególnie ważny
  //    dla św. Jana Pawła II i św. Faustyny.
  {
    prayerSlug: "novena-fatima",
    name: "Nowenna do Matki Bożej Fatimskiej",
    description:
      "Nowenna do Matki Bożej Fatimskiej oddaje cześć objawieniom maryjnym, które miały miejsce między 13 maja a 13 października 1917 roku w Cova da Iria pod Fatimą w Portugalii, gdzie Maryja ukazała się sześciokrotnie trojgu pasterzy: Łucji dos Santos i jej kuzynom Franciszkowi i Hiacyncie Marto. W każdym objawieniu Najświętsza Dziewica prosiła o modlitwę za nawrócenie grzeszników, praktykę pokuty i codzienne odmawianie różańca świętego za pokój na świecie. Ostatnie objawienie, 13 października 1917 roku, towarzyszył mu «cud słońca» widziany przez około siedemdziesiąt tysięcy osób. Kościół uznał objawienia za godne wiary w 1930 roku. Święty Jan Paweł II przypisał wstawiennictwu Matki Bożej Fatimskiej swoje ocalenie w zamachu z 13 maja 1981 roku i poświęcił świat jej Niepokalanemu Sercu w 1984 roku. Pasterze Franciszek i Hiacynta zostali kanonizowani przez papieża Franciszka w Fatimie 13 maja 2017 roku. Dla Polaków szczególnie ważna jest ta nowenna, ponieważ łączy ją z osobą Jana Pawła II — jego nabożeństwo do Matki Bożej Fatimskiej było intensywne, a pokój ducha, który zachował w obliczu zamachu, był dla niego osobistym świadectwem maryjnego wstawiennictwa. Nowenna jest tradycyjnie odmawiana od 4 do 12 maja.",
    prayerText:
      "O Najświętsza Maryjo Panno, Królowo Różańca Świętego, która w Fatimie raczyłaś objawić Twoje upodobanie w pokornych i małych, skieruj na mnie Twoje współczujące spojrzenie, gdy z synowską ufnością uciekam się do Ciebie. Udziel mi przez Twoje potężne wstawiennictwo łaski, o którą Cię teraz proszę (wymień intencję), jeśli jest zgodna z wolą Bożą i służy zbawieniu mojej duszy. Naucz mnie, Matko, żyć z wiarą, modlić się z wytrwałością i czynić zadośćuczynienie za grzechy, które obrażają Najświętsze Serce Jezusa i Twoje Niepokalane Serce. Amen. Matko Boża Różańcowa z Fatimy, módl się za nami.",
    instructions:
      "Odmawiaj raz dziennie przez dziewięć kolejnych dni, idealnie od 4 do 12 maja w przygotowaniu do święta 13 maja. Tradycyjna struktura: (1) Znak Krzyża; (2) akt skruchy; (3) jedna tajemnica różańca świętego (radosna, bolesna lub chwalebna w zależności od dnia) z powolną medytacją — różaniec jest nierozłączny od nabożeństwa fatimskiego; (4) modlitwa nowenny; (5) jaculatorie, których nauczyła Maryja w objawieniach: «O Jezu, czynię to z miłości do Ciebie, za nawrócenie grzeszników i jako zadośćuczynienie za grzechy popełnione przeciwko Niepokalanemu Sercu Maryi»; (6) wymień swoją konkretną intencję. Wielu polskich katolików dodaje rodzinne poświęcenie Niepokalanemu Sercu Maryi na zakończenie nowenny. Komunia wynagradzająca pierwszych sobót — wyraźnie poproszona przez Maryję siostrę Łucję w Pontevedrze w 1925 roku — łączy się naturalnie z tą nowenną.",
    patronSaint: "Matka Boża Fatimska · Święci Franciszek i Hiacynta Marto",
    feastDay: "13 maja",
    source: "KEP + Vatican.va Polski (Orędzie Fatimskie, KNW 2000) + Pamiętniki siostry Łucji + kanonizacja Franciszka i Hiacynty Marto (13 maja 2017). Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-lourdes",
    name: "Nowenna do Matki Bożej z Lourdes",
    description:
      "Nowenna do Matki Bożej z Lourdes oddaje cześć osiemnastu objawieniom Maryi świętej Bernadecie Soubirous między 11 lutego a 16 lipca 1858 roku w grocie Massabielle w Lourdes we Francji. W dziewiątym objawieniu Bernadeta odkryła ze wskazania Pani źródło, którego wody zaczęły wytryskać ze skały; w szesnastym, 25 marca 1858 roku, Maryja przedstawiła się słowami: «Jestem Niepokalane Poczęcie» — zaledwie cztery lata po dogmatycznym określeniu przez Piusa IX. Sanktuarium w Lourdes przyjmuje dziś ponad sześć milionów pielgrzymów rocznie. Kościół oficjalnie uznał siedemdziesiąt cudów uzdrowienia. Liturgiczne święto 11 lutego zostało ustanowione przez świętego Piusa X, a od 1992 roku święty Jan Paweł II ustanowił w tym dniu Światowy Dzień Chorego. Dla polskich katolików sanktuarium w Lourdes jest jednym z najczęściej odwiedzanych miejsc pielgrzymkowych w Europie zachodniej, a Światowy Dzień Chorego ma silne lokalne obchody we wszystkich diecezjach. Nowenna jest tradycyjnie odmawiana od 2 do 10 lutego.",
    prayerText:
      "O Niepokalana Dziewico Maryjo, Matko Miłosierdzia, Uzdrowienie Chorych, Ucieczko Grzeszników, Pocieszycielko Strapionych, znasz moje pragnienia, moje trudności, moje cierpienia; racz spojrzeć na mnie miłosiernym wzrokiem. Ukazując się w grocie w Lourdes, raczyłaś uczynić z niej miejsce uprzywilejowane, w którym rozdzielasz Twoje łaski, i tam wielu chorych otrzymało uzdrowienie ze swoich dolegliwości duchowych i cielesnych. Przychodzę więc z pełną ufnością błagać Twojego macierzyńskiego wstawiennictwa. Uproś mi, o czuła Matko, łaskę, o którą proszę (wymień intencję). Przez modlitwę z Lourdes, która tyle razy została ukoronowana uzdrowieniem, proszę Cię o zdrowie ciała, a przede wszystkim zdrowie duszy. Amen.",
    instructions:
      "Odmawiaj raz dziennie przez dziewięć kolejnych dni. Tradycyjna struktura: (1) Znak Krzyża i akt wiary w macierzyńską obecność Maryi; (2) radosne tajemnice różańca świętego, pamiętając że Bernadeta odmawiała różaniec podczas każdego objawienia; (3) modlitwa nowenny z konkretną intencją; (4) trzy Zdrowaś Maryjo ku czci Niepokalanego Poczęcia; (5) zakończenie jaculatorią, którą powtarzała Bernadeta: «O Maryjo bez grzechu poczęta, módl się za nami, którzy się do Ciebie uciekamy». Dla błagania o uzdrowienie fizyczne wielu katolików dodaje błogosławieństwo wodą z Lourdes (dostępną w parafiach maryjnych) — nie jako talizman, ale jako sakramentalia. Jeśli nowenna jest odmawiana za poważnie chorego, rozważ odmawianie jej w rodzinie. Łączyć nowennę z odwiedzinami chorego, przyjęciem sakramentów (Namaszczenia, Komunii) i szczerym egzaminem własnego sposobu doświadczania cierpienia, przekształca ćwiczenie w udział w misji Lourdes.",
    patronSaint: "Matka Boża z Lourdes · Święta Bernadeta Soubirous",
    feastDay: "11 lutego (Światowy Dzień Chorego)",
    source: "KEP + Vatican.va (Salvifici Doloris, JPII 1984) + relacje świętej Bernadety + Bureau Médical de Lourdes. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-undoer-of-knots",
    name: "Nowenna do Maryi Rozwiązującej Węzły",
    description:
      "Nabożeństwo do Maryi Rozwiązującej Węzły ma swoje źródło w barokowym obrazie przypisywanym Johannowi Georgowi Melchiorowi Schmidtnerowi (ok. 1700), zachowanym w kościele św. Piotra am Perlach w Augsburgu w Niemczech. Obraz przedstawia Maryję cierpliwie rozwiązującą węzły długiej białej wstęgi, którą podaje jej anioł — wizualne wyrażenie nauki patrystycznej, która widzi w Maryi nową Ewę, «która rozwiązuje swoim posłuszeństwem to, co Ewa związała swoim nieposłuszeństwem» (święty Ireneusz z Lyonu, Adversus Haereses III, 22, 4). Nabożeństwo pozostawało stosunkowo lokalne, dopóki ówczesny ksiądz Jorge Mario Bergoglio, podczas studiów doktoranckich w Niemczech w 1986 roku, nie odkrył obrazu i nie przywiózł go do Argentyny. Jako Papież Franciszek uczynił to nabożeństwo znanym na całym świecie. W Polsce nabożeństwo rozprzestrzeniło się szybko od 2013 roku, z parafiami poświęconymi w Warszawie, Krakowie i Poznaniu. Nowenna jest szczególnie odpowiednia dla sytuacji, które wydają się ludzko nierozwiązywalne: małżeństwa w kryzysie, dzieci oddalonych od wiary, uzależnień, przedłużających się konfliktów rodzinnych.",
    prayerText:
      "Dziewico Maryjo, Matko, która nigdy nie opuściłaś dziecka, które woła o Twoją pomoc, Matko, której ręce nie przestają pracować za nas, Twoje umiłowane dzieci, Matko pełna łaski Bożej, składam w Twoje ręce wstęgi i pętle, które ściskają moje życie. W Twoich rękach nie ma węzła, którego nie można rozwiązać. Potężna Matko, przez Twoje wstawiennictwo i przez łaskę Twojego Syna Jezusa, przynieś w moje ręce pocieszenie. Ty, która łagodnie rozwiązujesz węzły mojego życia, proszę Cię, abyś przyjęła w Twoje ręce (wymień imię lub sytuację), i uwolniła od pętli i zamętu, którymi atakuje nas nieprzyjaciel. Przez Twoją łaskę, przez Twoje wstawiennictwo, przez Twój przykład, uwolnij nas od wszelkiego zła, Pani nasza, i rozwiąż węzły, które przeszkadzają nam zjednoczyć się z Bogiem. Amen.",
    instructions:
      "Odmawiaj raz dziennie przez dziewięć kolejnych dni. Struktura: (1) Znak Krzyża; (2) akt skruchy — rozwiązanie węzła często zaczyna się od rozpoznania własnego grzechu lub własnego udziału w sytuacji; (3) jedna tajemnica różańca świętego; (4) modlitwa nowenny; (5) Ojcze Nasz, Zdrowaś Maryjo i Chwała Ojcu; (6) wymień konkretnie węzeł. Dla szczególnie trudnych sytuacji papież Franciszek polecił odmawianie nowenny przez dłuższy okres (kilka nowenn z rzędu), jeśli wstawiennictwo nie zostaje wysłuchane natychmiast. Wielu polskich katolików dodaje do nowenny symboliczny gest: zapisanie węzła na kartce i położenie jej u stóp obrazu maryjnego. Jeśli węzeł jest złamaną relacją, rozważ ofiarowanie nowenny najpierw za własne nawrócenie, a potem za drugą osobę.",
    patronSaint: "Maryja Rozwiązująca Węzły",
    feastDay: "28 września (nabożeństwo niekalendariowe)",
    source: "Vatican.va Polski (homilie Papieża Franciszka) + tradycja Augsburga (kościół św. Piotra am Perlach) + święty Ireneusz, Adversus Haereses III, 22, 4. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-seven-sorrows",
    name: "Nowenna do Matki Bożej Bolesnej",
    description:
      "Nowenna do Matki Bożej Bolesnej (Mater Dolorosa) oddaje cześć siedmiu chwilom największego cierpienia w życiu Maryi: proroctwu Symeona, ucieczce do Egiptu, zgubieniu Dzieciątka Jezus w świątyni, spotkaniu z Jezusem na drodze krzyżowej, śmierci Jezusa na krzyżu, zdjęciu z krzyża (Pieta) i złożeniu do grobu. Nabożeństwo do Boleści sięga XIII wieku (Zakon Serwitów Maryi, Florencja 1233) i zostało rozszerzone na cały Kościół przez papieża Benedykta XIII w 1727 roku. Liturgiczne święto 15 września podkreśla maryjne współodkupienie: Maryja pozostała stojąca pod krzyżem (stabat Mater). W Polsce nabożeństwo do Matki Bożej Bolesnej ma szczególnie silne wyrazy w Wielki Piątek i na Sanktuarium Matki Bożej Bolesnej w Limanowej, Górze Świętej Anny i Kalwarii Zebrzydowskiej (gdzie pasja Maryi jest częścią słynnych misteryjnych dróg krzyżowych). Nowenna jest tradycyjnie odmawiana od 6 do 14 września.",
    prayerText:
      "O Maryjo, Matko najboleśniejsza, błagamy Cię, abyś przez Twój własny smutek u stóp Krzyża uzyskała nam łaskę znoszenia naszych cierpień z cierpliwością i miłością, w zjednoczeniu z cierpieniami Twojego Boskiego Syna. Ty, która byłaś obecna na Kalwarii i której dusza została przebita mieczem boleści zgodnie z proroctwem Symeona, uzyskaj nam moc, abyśmy nie odwracali się od krzyża, gdy ten przyjdzie do naszego życia. Przyjmij w Twoim Niepokalanym Sercu intencję, którą Ci teraz przedstawiam (wymień intencję), i naucz nas stać, jak Ty stałaś, obok tych, którzy cierpią. Królowo Męczenników, módl się za nami. Amen.",
    instructions:
      "Nowenna składa się tradycyjnie z medytacji każdego dnia nad jedną z Siedmiu Boleści. Struktura codzienna: (1) Znak Krzyża; (2) krótkie czytanie odpowiedniego fragmentu ewangelii (Łk 2, Mt 2, J 19); (3) cicha medytacja przez kilka minut — wyróżniającą cechą tej nowenny jest cisza; (4) jedno Zdrowaś Maryjo za każdą Boleść (siedem dziennie); (5) modlitwa nowenny; (6) Ojcze Nasz i Chwała Ojcu. Alternatywa devocyjna szeroko rozpowszechniona w Polsce: koronka do Siedmiu Boleści Maryi (zwana także Różańcem Serwickim): siedem małych grup jednego Ojcze Nasz i siedmiu Zdrowaś Maryjo, każda medytująca jedną Boleść. Nowenna łączy się naturalnie z wizytami u Najświętszego Sakramentu i z towarzyszeniem komuś w niedawnej żałobie — nie słowami, ale obecnością.",
    patronSaint: "Matka Boża Bolesna · Królowa Męczenników",
    feastDay: "15 września",
    source: "KEP + Vatican.va Polski + tradycja Serwitów Maryi (Florencja, 1233) + Benedykt XIII (rozszerzenie 1727) + Kalwaria Zebrzydowska. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-mount-carmel",
    name: "Nowenna do Matki Bożej Szkaplerznej",
    description:
      "Nabożeństwo do Matki Bożej z Góry Karmel zakorzenia się w Górze Karmel w Ziemi Świętej, gdzie prorok Eliasz modlił się o deszcz, który zakończyłby suszę Izraela (1 Krl 18). Łacińscy eremici, którzy mieszkali tam w XII wieku, ukonstytuowali się jako Zakon Karmelitański pod regułą świętego Alberta z Jerozolimy (ok. 1209). W nocy 16 lipca 1251 roku, w Cambridge, Najświętsza Dziewica Maryja ukazała się świętemu Szymonowi Stockowi, generałowi Zakonu, i wręczyła mu brązowy szkaplerz z obietnicą: «Kto umrze w tym szkaplerzu, nie doświadczy ognia wiecznego». Kościół potwierdził tę obietnicę — rozumianą prawidłowo nie jako magiczny amulet, ale jako znak synowskiego poświęcenia Maryi. W Polsce nabożeństwo do Matki Bożej Szkaplerznej ma głęboką tradycję — święto 16 lipca jest jednym z największych świąt karmelitańskich, a klasztory karmelitańskie w Czernej (Karmelici Bosi) i w Warszawie są centrami żywej devocji. Nowenna jest tradycyjnie odmawiana od 7 do 15 lipca.",
    prayerText:
      "O Dziewico z Góry Karmel, piękny Kwiecie Karmelu, kwitnąca Latorośli, Splendorze Nieba, Najczystsza Matko Syna Bożego i nasza Matko, spójrz na mnie oczyma miłosierdzia. Gwiazdo Morza, pomóż mi w mojej drodze po wodach tego świata. Przez Twój Święty Szkaplerz, znak Twojej macierzyńskiej opieki, daj mi łaskę wytrwałości ostatecznej i uzyskaj mi teraz łaskę, o którą Cię proszę (wymień intencję), jeśli jest zgodna z wolą Bożą. Królowo i Ozdobo Karmelu, módl się za nami. Amen.",
    instructions:
      "Odmawiaj raz dziennie przez dziewięć kolejnych dni, idealnie od 7 do 15 lipca. Struktura: (1) Znak Krzyża; (2) Psalm 23 («Pan jest moim pasterzem») lub kantyk Magnificat (Łk 1,46-55); (3) modlitwa nowenny; (4) pięć Zdrowaś Maryjo wspominających pięć wieków nabożeństwa karmelitańskiego; (5) jaculatoria «Kwiecie Karmelu, kwitnąca Latorośli, Splendorze Nieba, Matko Syna Bożego, nienaruszona Matko nasza». Jeśli nosisz szkaplerz, pamiętaj że jego użycie oznacza spójne życie chrześcijańskie — nie talizman, ale znak synowskiej przynależności do Maryi. Jeśli jeszcze go nie masz, rozważ przyjęcie go w sakramentalnym obrzędzie po zakończeniu nowenny. Karmelitańska duchowość wzbogaca się przez lekturę wielkich mistyków Zakonu: świętej Teresy od Jezusa, świętego Jana od Krzyża, świętej Teresy od Dzieciątka Jezus.",
    patronSaint: "Matka Boża z Góry Karmel · Święty Szymon Stock",
    feastDay: "16 lipca",
    source: "KEP + Vatican.va Polski + Reguła świętego Alberta z Jerozolimy (ok. 1209) + Benedykt XIII (rozszerzenie 1726) + tradycja Karmelu w Czernej. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-padre-pio",
    name: "Nowenna do świętego Ojca Pio z Pietrelciny",
    description:
      "Święty Ojciec Pio z Pietrelciny (Francesco Forgione, 1887-1968), znany powszechnie jako Padre Pio, był włoskim księdzem kapucynem, którego życie naznaczone było nadzwyczajnymi darami mistycznymi i bezkompromisową ascezą pokutniczą. 20 września 1918 roku, podczas modlitwy w chórze kościoła w San Giovanni Rotondo, otrzymał stygmaty Chrystusa — jedyne w pełni widoczne stygmaty udokumentowane u księdza Kościoła. Padre Pio spędził większość swojego dorosłego życia jako spowiednik: szesnaście godzin dziennie w konfesjonale. Jego dar bilokacji, spełnione proroctwa, udokumentowane uzdrowienia i założenie Casa Sollievo della Sofferenza uczyniły go jedną z najbardziej kochanych postaci XX wieku. Beatyfikowany przez świętego Jana Pawła II w 1999 roku i kanonizowany 16 czerwca 2002 roku. W Polsce, ze względu na osobistą więź Jana Pawła II z Padre Pio (papież spotkał się z nim w 1947 roku jako młody ksiądz), nabożeństwo do Ojca Pio jest szczególnie silne i często łączy się z modlitwą do papieża Polaka. Nowenna jest odpowiednia dla próśb o nawrócenie, uzdrowienie fizyczne lub duchowe, wytrwałość w cierpieniu, dobrą spowiedź.",
    prayerText:
      "Drogi Boże, dałeś świętemu Ojcu Pio z Pietrelciny przywilej uczestniczenia w nadzwyczajny sposób w Męce Twojego Syna. Udziel mi przez jego wstawiennictwo łaski (wymień intencję), której gorąco pragnę z serca Jezusa. Święty Ojcze Pio, wielki kapłanie konfesjonału, wielki przyjacielu chorych i grzeszników, módl się za mną. Ojcze Pio, mężu pełen ran Chrystusa, uzyskaj mi łaskę przyjmowania moich własnych krzyży tak, jak Ty przyjmowałeś swoje: z niezłomną wiarą, z pogodną pokorą i ze wzrokiem zawsze utkwionym w Ukrzyżowanym. Udziel mi również dyspozycji do dobrej spowiedzi. Amen.",
    instructions:
      "Odmawiaj raz dziennie przez dziewięć kolejnych dni. Tradycyjna struktura: (1) Znak Krzyża; (2) krótki rachunek sumienia — Padre Pio był przede wszystkim spowiednikiem; (3) modlitwa nowenny; (4) Ojcze Nasz, Zdrowaś Maryjo i Chwała Ojcu ku czci Pięciu Ran; (5) pięć Ojcze Nasz i Zdrowaś Maryjo w intencjach Papieża. Padre Pio polecał trzy dyscypliny: (a) cotygodniowa spowiedź, (b) codzienna Komunia, jeśli możliwe, (c) kierownictwo duchowe u stałego spowiednika. Dla chorych: odmawiaj nowennę przy łóżku chorego, pamiętając, że on sam spędził większość życia z ciągłym fizycznym bólem.",
    patronSaint: "Święty Ojciec Pio z Pietrelciny",
    feastDay: "23 września",
    source: "KEP + Vatican.va Polski (homilia kanonizacyjna JPII, 16 czerwca 2002) + epistolografia Ojca Pio + Niedziela. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-faustina",
    name: "Nowenna do świętej Faustyny Kowalskiej",
    description:
      "Święta Maria Faustyna Kowalska (1905-1938) była polską zakonnicą Zgromadzenia Sióstr Matki Bożej Miłosierdzia, którą Jezus wybrał jako sekretarza i apostoła swojego Bożego Miłosierdzia. Między 1931 a 1938 rokiem, w klasztorze w Płocku i później w Krakowie-Łagiewnikach, otrzymała objawienia Jezusa, które zapisała w swoim Dzienniczku (Miłosierdzie Boże w mojej duszy) — jednym z wielkich tekstów mistycznych XX wieku. W tych objawieniach Jezus poprosił: (1) obraz Pana Bożego Miłosierdzia z napisem «Jezu, ufam Tobie»; (2) Niedzielę Bożego Miłosierdzia jako święto Kościoła powszechnego; (3) Koronkę do Bożego Miłosierdzia; (4) Godzinę Miłosierdzia (15:00). Faustyna zmarła na gruźlicę w wieku trzydziestu trzech lat. Kanonizowana przez świętego Jana Pawła II 30 kwietnia 2000 roku, w tym samym dniu, w którym ustanowił święto. Faustyna i Jan Paweł II są dwiema centralnymi postaciami polskiej duchowości miłosierdzia, której globalnym sanktuarium jest Łagiewniki. Nowenna była podyktowana przez Jezusa Faustynie (Dzienniczek 1209-1229).",
    prayerText:
      "O wieczny Ojcze, spoglądam okiem miłosierdzia na (intencja dnia), i przez bolesne zasługi Męki Jezusa Chrystusa i Jego Najświętsze Serce, pociągnij te dusze do Twojego Królestwa, aby poznały Twoje niezgłębione miłosierdzie. Jezu, źródło życia, ufam Tobie. (Odmów 1 Ojcze Nasz, 1 Zdrowaś Maryjo i Wierzę, a następnie pełną Koronkę do Bożego Miłosierdzia za intencję dnia.) Święta Faustyno Kowalska, apostołko Bożego Miłosierdzia, módl się za nami, abyśmy nauczyli się ufać, jak Ty ufałaś. Amen.",
    instructions:
      "Nowenna podyktowana przez Jezusa Faustynie (Dzienniczek 1209-1229) jest odmawiana przez dziewięć kolejnych dni, idealnie od Wielkiego Piątku do Soboty wigilii Niedzieli Bożego Miłosierdzia. Każdy dzień ma określoną intencję od Jezusa (dzień 1 cała ludzkość, dzień 2 kapłani, dzień 3 dusze pobożne, dzień 4 niewierzący, dzień 5 bracia oddzieleni, dzień 6 pokorne dusze, dzień 7 czciciele Bożego Miłosierdzia, dzień 8 dusze w czyśćcu, dzień 9 dusze letnie). Struktura codzienna: (1) Znak Krzyża; (2) krótkie czytanie intencji Jezusa na dany dzień; (3) modlitwa dnia; (4) pełna Koronka do Bożego Miłosierdzia; (5) zakończenie «Jezu, ufam Tobie». Dla intencji pilnych łącz nowennę ze spowiedzią, Komunią i wizytą u Najświętszego Sakramentu o Godzinie Miłosierdzia. Wielu Polaków łączy nowennę z pielgrzymką do Łagiewnik.",
    patronSaint: "Święta Maria Faustyna Kowalska",
    feastDay: "5 października (kanonizacja 30 kwietnia 2000)",
    source: "KEP + Vatican.va (kanonizacja JPII 30 kwietnia 2000) + Dzienniczek świętej Faustyny (1209-1229) + Sanktuarium w Łagiewnikach. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-john-paul-ii",
    name: "Nowenna do świętego Jana Pawła II",
    description:
      "Święty Jan Paweł II (Karol Józef Wojtyła, 1920-2005) — pierwszy papież Polak i pierwszy papież nie-Włoch od czterystu pięćdziesięciu pięciu lat — kierował Kościołem katolickim od 16 października 1978 do 2 kwietnia 2005 roku. Jego życie przeszło przez dwa totalitaryzmy XX wieku: niemiecką okupację Polski (podczas której studiował tajnie do kapłaństwa i pracował jako robotnik w kamieniołomie w Zakrzówku oraz w fabryce chemicznej Solvay) oraz reżim komunistyczny (z którym konfrontował się jako biskup krakowski i jako pontyfik, którego wizyty w Polsce w 1979 i 1983 roku były decydujące dla upadku komunizmu). Przeżył zamach z 13 maja 1981 roku i przypisał swoje ocalenie wstawiennictwu Matki Bożej Fatimskiej. Kanonizował 482 świętych. Napisał czternaście encyklik. Zmarł 2 kwietnia 2005 roku, w wigilię Niedzieli Bożego Miłosierdzia. Beatyfikowany przez Benedykta XVI 1 maja 2011 roku i kanonizowany przez papieża Franciszka 27 kwietnia 2014 roku. Dla Polaków jest postacią o wyjątkowym znaczeniu — nie tylko świętym, ale ojcem narodu, kim Polska zawierzyła swoją drogę z komunizmu do wolności. Sanktuaria Jana Pawła II w Krakowie i Wadowicach są jednymi z najczęściej odwiedzanych miejsc pielgrzymkowych w Polsce. Nowenna jest odpowiednia dla próśb o powołania, wytrwałość w wierze, łaski dla młodzieży, obronę życia.",
    prayerText:
      "O Trójco Święta, dziękujemy Ci za dar Twego Kościoła świętego Jana Pawła II, w którym zajaśniała Twoja czułość, ojcowskie oblicze Twojego miłosierdzia, miłość do Chrystusa Oblubieńca Kościoła i pasja do człowieka, umiłowanego syna Boga. Udziel nam przez jego wstawiennictwo, zgodnie z Twoją wolą, łaski, o którą Cię teraz prosimy (wymień intencję). Święty Janie Pawle II, z okna Nieba daj nam Twoje błogosławieństwo. Pobłogosław Kościół, pobłogosław świat, pobłogosław szczególnie rodziny i młodzież. Amen. I jak nam tyle razy powtarzałeś: «Nie lękajcie się! Otwórzcie drzwi Chrystusowi!»",
    instructions:
      "Odmawiaj raz dziennie przez dziewięć kolejnych dni. Struktura: (1) Znak Krzyża; (2) Akt wiary lub Credo Apostolskie; (3) Krótkie czytanie fragmentu encykliki lub Listu do Rodzin; (4) Pięć tajemnic różańca świętego, idealnie tajemnice światła, które sam dodał w liście apostolskim Rosarium Virginis Mariae (2002); (5) Modlitwa nowenny; (6) Akt zawierzenia i zakończenie wezwaniem «Totus Tuus» — «Cały Twój», maryjne hasło, które wziął od świętego Ludwika Marii Grignion de Montfort. Nowenna wzbogaca się przez lekturę książki Przekroczyć próg nadziei (1994) lub Listu do Młodych (1985), lub przez rodzinne celebrowanie jego święta 22 października. Dla polskich młodzieżników: odmawiaj nowennę w dziewięciu dniach przed Światowymi Dniami Młodzieży lub przed ważną decyzją powołaniową.",
    patronSaint: "Święty Jan Paweł II",
    feastDay: "22 października (kanonizacja 27 kwietnia 2014)",
    source: "KEP + Vatican.va Polski (homilia kanonizacyjna Papieża Franciszka, 27 kwietnia 2014) + Karol Wojtyła, Dar i Tajemnica (1996) + sanktuaria w Krakowie i Wadowicach. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-mother-teresa",
    name: "Nowenna do świętej Matki Teresy z Kalkuty",
    description:
      "Święta Teresa z Kalkuty (Anjezë Gonxhe Bojaxhiu, 1910-1997) — urodzona w Skopje w albańskiej rodzinie katolickiej — wstąpiła w 1928 roku do Sióstr z Loreto. 10 września 1946 roku, w pociągu do Darjeeling, otrzymała to, co nazwała «powołaniem w powołaniu»: inspirację, aby opuścić Loreto i służyć Chrystusowi w najbiedniejszych z biednych na ulicach Kalkuty. Założyła Misjonarki Miłości w 1950 roku. Otrzymała Pokojową Nagrodę Nobla w 1979 roku. Po jej śmierci ujawniono jej prywatne pisma, ujawniając «ciemną noc duszy» przez pięćdziesiąt lat, którą rozumiała jako udział w duchowym pragnieniu Chrystusa na krzyżu («pragnę», J 19,28). Kanonizowana przez papieża Franciszka 4 września 2016 roku, w Jubileuszu Miłosierdzia. W Polsce Misjonarki Miłości mają domy w Warszawie i innych dużych miastach. Nowenna jest odpowiednia dla próśb o ducha służby ubogim, wytrwałość w modlitwie, gdy czuje się suchość, oraz łaskę widzenia Chrystusa w każdym zranionym lub nieznanym człowieku.",
    prayerText:
      "O Trójco Święta, dziękujemy Ci za dar świętej Matki Teresy z Kalkuty, wiernej służebnicy najbiedniejszych z biednych. Przez jej wstawiennictwo udziel nam łaski, o którą Cię teraz prosimy (wymień intencję). A przede wszystkim udziel nam serca podobnego do jej serca: zdolnego dostrzec Chrystusa w każdym cierpiącym bracie, zdolnego służyć bez oczekiwania niczego w zamian, zdolnego nadal wierzyć, gdy już nic nie czuje. Święta Matko Tereso z Kalkuty, módl się za nami i za wszystkimi, których świat zapomniał. Amen.",
    instructions:
      "Odmawiaj raz dziennie przez dziewięć kolejnych dni. Struktura: (1) Znak Krzyża; (2) akt wiary; (3) Czytanie «pragnę» w Janie 19,28 lub przypowieści o sądzie ostatecznym w Mateuszu 25; (4) modlitwa nowenny; (5) Ojcze Nasz, Zdrowaś Maryjo i Chwała Ojcu; (6) wyraźnie wymień intencję. Nowenna wzbogaca się, jeśli towarzyszy jej konkretne dzieła miłosierdzia podczas dziewięciu dni: wizyta u chorego, służba starszemu krewnemu, datek na dzieło miłosierdzia. Eucharystyczna była duchowość Matki Teresy — Misjonarki Miłości spędzają godzinę przed Najświętszym Sakramentem codziennie. Dla osób przechodzących ciemną noc duszy nowenna jest szczególnie odpowiednia.",
    patronSaint: "Święta Matka Teresa z Kalkuty",
    feastDay: "5 września",
    source: "Vatican.va Polski (kanonizacja Papieża Franciszka, 4 września 2016) + Przyjdź, bądź Moim Światłem (prywatne listy, opublikowane 2007) + KEP + Misjonarki Miłości w Polsce. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-rita",
    name: "Nowenna do świętej Rity z Cascii",
    description:
      "Święta Rita z Cascii (Margherita Lotti, 1381-1457) jest czczona jako «Adwokat Niemożliwych» i «Święta Spraw Beznadziejnych». W Polsce nabożeństwo do niej jest popularne, szczególnie w parafiach augustianów w Warszawie i Krakowie. Wydana wbrew swojej woli za mąż w wieku dwunastu lat za brutalnego człowieka, znosiła osiemnaście lat złego traktowania, nie tracąc wiary. Po owdowieniu i utracie dwóch synów wstąpiła do augustiańskiego klasztoru w Cascii. W 1442 roku otrzymała częściowy stygmat: cierń z korony Chrystusa wbił się w jej czoło. Przed śmiercią, w środku zimy, poprosiła o różę z ogrodu rodzinnego — gdzie krzew zakwitł cudownie. Kanonizowana przez Leona XIII w 1900 roku. Nowenna jest modlitwą katolicką par excellence dla sytuacji ludzko niemożliwych: małżeństw bez wyjścia, utraconych dzieci, nieuleczalnych chorób, zakorzenionych konfliktów.",
    prayerText:
      "O święta Rito z Cascii, chwalebny wzorze cierpliwości i wytrwałości, Ty, która przez lata znosiłaś bolesne małżeństwo, nie tracąc miłości, Ty, która nosiłaś na czole cierń Chrystusa, Ty, która otrzymałaś cudowną różę w środku zimy — uzyskaj mi od Boga łaskę, o którą z pokorną ufnością Cię błagam (wymień intencję). Wiem, że często drogi ludzkie są zamknięte, serca zatwardziałe. Ale Ty, adwokatko niemożliwych, umiesz wstawić się za nami przed tronem Najwyższego. Udziel mi mocy do wytrwałości w modlitwie, cierpliwości do znoszenia tego, czego nie mogę zmienić, i łaski rozpoznawania ręki Bożej, nawet gdy wszystko wydaje się stracone. Święta Rito, adwokatko niemożliwych, módl się za nami. Amen.",
    instructions:
      "Odmawiaj raz dziennie przez dziewięć kolejnych dni, idealnie od 14 do 22 maja. Struktura: (1) Znak Krzyża; (2) akt pokory; (3) modlitwa nowenny; (4) dziesiątka różańca świętego, idealnie z bolesnymi tajemnicami; (5) Ojcze Nasz, Zdrowaś Maryjo i Chwała Ojcu; (6) konkretnie wymień «niemożliwą» sytuację. Tradycja: błogosławienie róż w dniu święta świętej Rity (22 maja) — wiele polskich parafii augustiańskich dokonuje tradycyjnego błogosławieństwa. Nowenna łączy się szczególnie dobrze z: (a) dobrą spowiedzią sakramentalną; (b) trwałym aktem pojednania; (c) lekturą Księgi Tobiasza lub Hioba.",
    patronSaint: "Święta Rita z Cascii",
    feastDay: "22 maja",
    source: "KEP + Vatican.va Polski (Leon XIII, kanonizacja 1900) + Klasztor Augustianów w Cascii (Włochy) + Augustianie w Polsce. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-peregrine",
    name: "Nowenna do świętego Peregryna Laziosi",
    description:
      "Święty Peregryn Laziosi (1265-1345) jest powszechnym patronem chorych na raka. Urodzony w Forlì we Włoszech w szlacheckiej rodzinie frakcji anty-papieskiej, nawrócił się po spoliczkowaniu świętego Filipa Beniziego i otrzymaniu od niego drugiego policzka w odpowiedzi. Wstąpił do Zakonu Sług Maryi i żył jako kapłan i kaznodzieja przez ponad czterdzieści lat. W wieku sześćdziesięciu lat pokuta osobista (nie siadanie, gdy mógł stać) wytworzyła w jego prawej nodze rakową ranę tak poważną, że lekarze postanowili amputować. W noc przed operacją Peregryn spędził całą noc na modlitwie przed krucyfiksem ołtarzowym; rano chirurdzy znaleźli go całkowicie uzdrowionego. Żył jeszcze dwadzieścia lat. Kanonizowany przez Benedykta XIII w 1726 roku. W Polsce nabożeństwo do Peregryna jest szczególnie obecne w szpitalach katolickich, kapelaniach onkologicznych i parafiach serwitańskich. Nowenna jest odpowiednia dla próśb o uzdrowienie fizyczne lub uzdrowienie duchowe, moc do znoszenia leczenia, łaskę przyjęcia cierpienia.",
    prayerText:
      "O Boże, który dałeś świętemu Peregrynowi, Twojemu słudze, przywilej uzyskania przez swoją modlitwę uzdrowienia z nieuleczalnej choroby, udziel nam, prosimy, przez jego wstawiennictwo zdrowia ciała i zdrowia duszy. Święty Peregrynie, Ty, który znałeś ciężar raka we własnym ciele, spójrz na mnie ze swoim współczuciem pacjenta. Ofiaruj samego siebie za mnie (lub za osobę, za którą się modlę: wymień imię) przed tronem Chrystusa lekarza, i uzyskaj mi, jeśli jest to wolą Ojca, uzdrowienie fizyczne. A jeśli nie jest to wolą Bożą, uzyskaj mi przynajmniej uzdrowienie duszy, cierpliwość w bólu, wiarę, która się nie łamie. Amen.",
    instructions:
      "Odmawiaj raz dziennie przez dziewięć kolejnych dni, idealnie od 22 do 30 kwietnia w przygotowaniu do święta 1 maja. Struktura: (1) Znak Krzyża; (2) krótkie czytanie ewangelii uzdrowienia trędowatego (Mk 1,40-42) lub kobiety krwiotokami (Mk 5,25-34); (3) modlitwa nowenny; (4) Ojcze Nasz, Zdrowaś Maryjo i Chwała Ojcu za konkretną intencję; (5) akt skruchy. Dla chorych w leczeniu onkologicznym odmawiaj nowennę przy łóżku chorego. Błogosławieństwo chorych relikwią świętego Peregryna (dostępną w parafiach serwitańskich) jest tradycją sakramentalną. Łącz nowennę z: (a) sakramentami chorych — spowiedź, Namaszczenie, Komunia w formie Wiatyku; (b) modlitwą rodzinną; (c) konkretnymi aktami miłosierdzia wobec innych chorych.",
    patronSaint: "Święty Peregryn Laziosi (patron chorych na raka)",
    feastDay: "1 maja",
    source: "KEP + Zakon Sług Maryi (OSM) + Vatican.va (Benedykt XIII, kanonizacja 1726) + Sanktuarium w Forlì. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-dymphna",
    name: "Nowenna do świętej Dymfny",
    description:
      "Święta Dymfna (s. VII, m. ok. 650) jest powszechnym patronem chorych psychicznie, neuroróżnorodnych, traumatyzowanych oraz ofiar kazirodztwa i przemocy. Córka pogańskiego króla irlandzkiego i chrześcijańskiej matki, która zmarła, gdy Dymfna była nastolatką, uciekła od swojego ojca (oszalałego z bólu i próbującego ożenić się z nią). Dotarła do Geel, w dzisiejszej Belgii, i poświęciła swoje życie służbie ubogim i chorym psychicznie. Jej ojciec ją znalazł i zabił własnymi rękami; miała około piętnastu lat. Geel od XIII wieku stało się jednym z pierwszych centrów chrześcijańskiego świata dla humanitarnej opieki nad chorymi psychicznie. Nabożeństwo do świętej Dymfny rozwinęło się w Polsce szczególnie w ostatnich latach, w związku z rosnącą świadomością Kościoła wobec zdrowia psychicznego. Nowenna jest odpowiednia dla próśb o uzdrowienie wewnętrzne po traumie, zarządzanie chorobą psychiczną, ochronę bliskiej osoby neuroróżnorodnej, moc do przebaczenia oprawcy, łaskę szukania pomocy profesjonalnej.",
    prayerText:
      "O Boże, który wybrałeś świętą Dymfnę jako patronkę chorych psychicznie i ofiar przemocy, udziel nam przez jej wstawiennictwo łaski, o którą Cię teraz prosimy (wymień konkretną intencję). Święta Dymfno, młoda męczennico, która znałaś we własnym ciele ciemność przemocy w rodzinie i wybrałaś wierność Chrystusowi przed zgodą z potężnym złem, udziel nam mocy, abyśmy nie milczeli o tym, co powinno być ujawnione, odwagi do ochrony bezbronnych i cierpliwości w towarzyszeniu cierpiącym na umyśle, sercu lub duchu. Udziel nam łaski wewnętrznego uzdrowienia i rozeznania, abyśmy szukali również pomocy profesjonalnej, gdy jest częścią Bożej Opatrzności. Amen.",
    instructions:
      "Odmawiaj raz dziennie przez dziewięć kolejnych dni, idealnie od 7 do 15 maja. Struktura: (1) Znak Krzyża; (2) akt zaufania; (3) modlitwa nowenny; (4) bolesne tajemnice różańca świętego; (5) Ojcze Nasz, Zdrowaś Maryjo i Chwała Ojcu. Kościół katolicki wyraźnie zaleca łączenie modlitwy + sakramentów + opieki psychologicznej lub psychiatrycznej, gdy jest konieczna. Pacjent z kliniczną depresją powinien modlić się i leczyć równocześnie. Jeśli nowenna jest odmawiana za ofiarę przemocy, łącz ją z pastoralną rozmową z księdzem przeszkolonym w towarzyszeniu traumie i, gdy stosowne, z decyzją o zgłoszeniu przemocy odpowiednim władzom.",
    patronSaint: "Święta Dymfna z Geel (patronka chorych psychicznie i ofiar przemocy)",
    feastDay: "15 maja",
    source: "KEP + Kościół katolicki w Geel (Belgia) + Vatican.va (Acta Sanctorum Mai III) + Bollandyści. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-gerard",
    name: "Nowenna do świętego Gerarda Majella",
    description:
      "Święty Gerard Majella (1726-1755) jest powszechnym patronem oczekujących matek, nienarodzonych dzieci, trudnych porodów i par z niepłodnością. Redemptorysta, brat zakonny Zgromadzenia Najświętszego Odkupiciela założonego przez świętego Alfonsa Marię Liguori, żył jako konsekrowany zaledwie trzy lata, naznaczone nadzwyczajnymi darami mistycznymi: bilokacja, proroctwo, czytanie sumień. Jego asocjacja z matkami sięga historycznego epizodu: młoda matka, otrzymawszy od niego zapomnianą chustę, usłyszała go mówiącego «zachowaj ją; będzie kiedyś przydatna»; po latach, w niebezpiecznym porodzie, przyłożyła chustę na brzuch i urodziła bez trudności. Kanonizowany przez Piusa X w 1904 roku. W Polsce nabożeństwo do świętego Gerarda jest szczególnie silne w parafiach redemptorystów (Toruń, Tuchów, Warszawa) i wśród par oczekujących dziecka. Nowenna jest odpowiednia dla kobiet w ciąży, szczególnie w trudnych sytuacjach: poprzednie poronienie, zaawansowany wiek matczyny, niepokojąca diagnoza prenatalna, przedwczesny poród, długotrwała niepłodność.",
    prayerText:
      "O chwalebny święty Gerardzie Majella, wierny przyjacielu nienarodzonych dzieci i matek oczekujących, spójrz okiem miłosierdzia na tę matkę, która teraz powierza się Twojemu wstawiennictwu (wymień imię lub sytuację). Ty, który już za życia znałeś matczyne serce, zanim słowa je wyraziły, uzyskaj jej od Boga zdrową ciążę, bezpieczny poród i dziecko gotowe od łona matki do przyjęcia chrztu i życia chrześcijańskiego powołania. Dla oczekujących poczęcia uzyskaj dar płodności, jeśli jest wolą Bożą. Dla tych, które straciły nienarodzone dziecko, uzyskaj pocieszenie wiedzy, że to maleństwo już odpoczywa w sercu Chrystusa. Amen.",
    instructions:
      "Odmawiaj raz dziennie przez dziewięć kolejnych dni. Jeśli odmawiana za konkretną ciążę, rozpocznij na początku trzeciego trymestru. Struktura: (1) Znak Krzyża; (2) akt zaufania w Bożą Opatrzność nad ludzkim życiem od poczęcia; (3) krótkie czytanie Psalmu 139; (4) modlitwa nowenny; (5) jedna tajemnica różańca świętego (radosne); (6) Ojcze Nasz, Zdrowaś Maryjo i Chwała Ojcu. Polskie tradycje: (a) medalik świętego Gerarda przez całą ciążę; (b) błogosławieństwo łóżeczka modlitwą świętego Gerarda przed urodzeniem; (c) celebrowanie święta (16 października) w rodzinie. Dla straty (poronienie, martwy poród) łącz z pastoralną celebracją utraconego małego życia.",
    patronSaint: "Święty Gerard Majella, CSsR",
    feastDay: "16 października",
    source: "KEP + Święty Alfons Maria Liguori, Vita di Fra Gerardo Maiella (1755) + Zgromadzenie Redemptorystów w Polsce (Toruń, Tuchów). Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-anne",
    name: "Nowenna do świętej Anny",
    description:
      "Święta Anna, według tradycji chrześcijańskiej, jest matką Najświętszej Maryi Panny, a więc babcią ze strony matki Pana Jezusa Chrystusa. Jej imię — z hebrajskiego Hannah, «łaska» — i historia jej małżeństwa ze świętym Joachimem pojawiają się w Protoewangelii Jakuba (s. II). Anna i Joachim, po wielu latach małżeństwa bez dzieci, cierpieli na społeczną zniewagę bezpłodności, aż anioł oznajmił Annie, że pocznie córkę — Maryję. Nabożeństwo do świętej Anny rozprzestrzeniło się na Wschodzie od VI wieku. W Polsce Anna jest niezwykle bliska — szczególnie w Górze Świętej Anny (Diecezja Opolska), gdzie sanktuarium świętej Anny jest jednym z najważniejszych miejsc pielgrzymkowych Polski południowej; pielgrzymka na świętą Annę w lipcu gromadzi tysiące pielgrzymów. Anna jest patronką matek, babć, par bezpłodnych, kobiet w zaawansowanym wieku rozrodczym, dziadków, krawcowych. Święto 26 lipca obchodzi się wraz ze świętem świętego Joachima. Nowenna jest odpowiednia dla próśb o dziecko, świętość małżeństwa, transmisję wiary przez dziadków, uzdrowienie zranionych relacji rodzinnych.",
    prayerText:
      "Chwalebna święta Anno, pełna współczucia dla tych, którzy Cię wzywają, i miłości dla cierpiących, ugięta ciężarem moich potrzeb, klękam u Twoich stóp i pokornie błagam Cię, abyś wzięła obecną intencję pod Twoją szczególną opiekę (wymień intencję). Racz polecić ją Twojej Córce, Najświętszej Maryi Pannie, i przedstawić przed tronem Jezusa, jej Boskiego Syna. Nie przestawaj wstawiać się za mną, aż moja prośba zostanie wysłuchana. Przede wszystkim uzyskaj mi łaskę, abym widział Jezusa, kochał Go i służył Mu z czystym sercem, razem z Tobą, z Maryją, z Joachimem, przez całe moje życie i na całą wieczność. Święta Anno, babciu Pana Jezusa, módl się za nami. Amen.",
    instructions:
      "Odmawiaj raz dziennie przez dziewięć kolejnych dni, idealnie od 17 do 25 lipca w przygotowaniu do święta 26 lipca (świętych Joachima i Anny). Struktura: (1) Znak Krzyża; (2) krótkie czytanie pierwszego rozdziału Łukasza; (3) modlitwa nowenny; (4) jedna tajemnica różańca świętego (radosne); (5) Ojcze Nasz, Zdrowaś Maryjo i Chwała Ojcu; (6) wyraźnie wymień intencję. Polskie tradycje: (a) rodzinna pielgrzymka do Góry Świętej Anny w święto; (b) zebranie trzech pokoleń kobiet w rodzinie — babcia, matka, córka — do nowenny; (c) błogosławieństwo domu obrazem świętej Anny. Dla kobiet starszych chorych łącz z Namaszczeniem chorych i obecnością wnuków przy łóżku.",
    patronSaint: "Święta Anna · Święty Joachim",
    feastDay: "26 lipca (wraz ze świętym Joachimem)",
    source: "KEP + Protoewangelia Jakuba (s. II) + Sanktuarium na Górze Świętej Anny (diecezja opolska) + Vatican.va Polski. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "consecration-de-montfort",
    name: "Akt zawierzenia Jezusowi przez Maryję (święty Ludwik Maria Grignion de Montfort)",
    description:
      "Akt zawierzenia Jezusowi przez Maryję — zwany także Maryjnym Niewolnictwem — jest praktyką duchową usystematyzowaną przez świętego Ludwika Marię Grignion de Montfort (1673-1716) w jego dziele Traktat o prawdziwym nabożeństwie do Najświętszej Maryi Panny. Montfort, francuski misjonarz i kaznodzieja, nauczał, że całkowite zawierzenie Synowi dokonuje się najpełniej, gdy przechodzi przez maryjne pośrednictwo Matki. Zawierzenie składa się z intensywnego przygotowania trzydziestu trzech dni podzielonego na cztery fazy (oczyszczenie z ducha świata, poznanie siebie, poznanie Maryi, poznanie Chrystusa) i kończy się w znaczącym święcie maryjnym formalnym aktem zawierzenia. Święty Jan Paweł II dokonał tego zawierzenia w wieku dwudziestu jeden lat i zachował «Totus Tuus» — «Cały Twój» — jako hasło biskupie i papieskie przez całe życie. Polska duchowość maryjna jest głęboko zakorzeniona w tradycji montfortiańskiej, szczególnie przez wpływ Jana Pawła II. Jest to najbardziej polecane nabożeństwo maryjne tradycji rzymskiego katolicyzmu.",
    prayerText:
      "Ja, (wymówić własne imię), grzeszny niewierny, odnawiam i potwierdzam dziś w Twoich rękach, o Niepokalana Matko, śluby mojego chrztu. Wyrzekam się na zawsze szatana, jego pomp i jego dzieł, i oddaję się całkowicie Jezusowi Chrystusowi, Mądrości wcielonej, aby nieść mój krzyż za Nim wszystkie dni mojego życia. Wybieram Cię dziś, o Maryjo, w obecności całego dworu niebieskiego, na moją Matkę i Panią. Oddaję Ci i poświęcam, jako Twojemu niewolnikowi, moje ciało i moją duszę, moje dobra wewnętrzne i zewnętrzne, a nawet wartość moich dobrych uczynków przeszłych, teraźniejszych i przyszłych. Przyjmij, o przeczysta Dziewico, ten mały dar mojego niewolnictwa, na większą chwałę Boga, w czasie i w wieczności. Amen.",
    instructions:
      "Przygotowanie trwa 33 dni i kończy się w znaczącym święcie maryjnym. Daty tradycyjne: (1) rozpocząć 20 listopada na 8 grudnia (Niepokalane Poczęcie); (2) rozpocząć 5 stycznia na 2 lutego (Ofiarowanie Pańskie); (3) rozpocząć 20 lutego na 25 marca (Zwiastowanie); (4) rozpocząć 5 lipca na 8 sierpnia w kontekście polskim (data godna konsultacji ze spowiednikiem). Codzienna struktura: (1) Znak Krzyża; (2) czytanie dnia według czterech faz (oczyszczenie z ducha świata, poznanie siebie, poznanie Maryi, poznanie Chrystusa); (3) Litania do Najświętszego Serca Jezusa w pierwszym tygodniu, Litania do Najświętszej Maryi Panny w drugim, Litania do Najświętszego Serca Jezusa w trzecim; (4) Ojcze Nasz i Zdrowaś Maryjo; (5) Ave Maris Stella po łacinie lub po polsku; (6) konkretna intencja dnia. W dniu 33: spowiedź sakramentalna, Komunia w Mszy maryjnej, formalny akt zawierzenia przed obrazem maryjnym. Doroczne odnowienie.",
    patronSaint: "Święty Ludwik Maria Grignion de Montfort",
    feastDay: "28 kwietnia",
    source: "KEP + Vatican.va Polski + Traktat o prawdziwym nabożeństwie do Najświętszej Maryi Panny (Ludwik Maria Grignion de Montfort, ok. 1712, opublikowany 1842) + List apostolski Rosarium Virginis Mariae (JPII, 2002, o «Totus Tuus»). Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  // ── Wave 7 (2026-05-18): completes Polish coverage to 100%. Źródła:
  //    KEP, Vatican.va Polski, Edycja Świętego Pawła, Wydawnictwo M,
  //    Niedziela, sanktuaria JPII (Kraków, Wadowice, Łagiewniki).
  {
    prayerSlug: "54-day-rosary-novena",
    name: "Nowenna 54 Róż (Różaniec 54 Dni)",
    description:
      "Nowenna 54 Róż została objawiona Najświętszej Maryi Panny Fortuny Agrelli w Neapolu w 1884 roku. Chora na medycznie beznadziejną chorobę, Fortuna otrzymała w wizji wskazanie odmawiania całego Różańca przez 27 dni w błaganiu i 27 dni w dziękczynieniu — łącznie 54 dni. Zatwierdzona przez Leona XIII. Odpowiednia dla pilnych sytuacji wymagających trwałego wstawiennictwa: poważnej choroby, trudnego rozeznania, długo oczekiwanego nawrócenia.",
    instructions:
      "Odmawiaj cały Różaniec codziennie przez 54 kolejne dni. Pierwsze 27 dni w błaganiu; kolejne 27 dni w dziękczynieniu (w duchu Mk 11,24). Rotacja tajemnic: dzień 1 radosne, dzień 2 bolesne, dzień 3 chwalebne, i powtarza się. Jeśli zostanie opuszczony dzień, tradycja każe zacząć od dnia 1. Idealne okresy liturgiczne: Adwent, Wielki Post, maj, październik.",
    patronSaint: "Najświętsza Maryja Panna, Róża Mistyczna",
    feastDay: "Wspomnienie maryjne (niekalendariowe)",
    source: "KEP + Vatican.va Polski + relacja Fortuny Agrelli (Neapol, 1884) + Leon XIII. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "brown-scapular",
    name: "Brązowy Szkaplerz Karmelitański",
    description:
      "Brązowy Szkaplerz z Góry Karmel jest katolickim sakramentalem składającym się z dwóch małych płatów brązowej wełny połączonych dwiema wstęgami, noszonych na ramionach pod ubraniem. Został przekazany przez Najświętszą Maryję Pannę świętemu Szymonowi Stockowi w Cambridge 16 lipca 1251 roku z obietnicą: «Kto umrze w tym szkaplerzu, nie doświadczy ognia wiecznego». Pius XII nazwał szkaplerz «znakiem całkowitego oddania Maryi». W Polsce nabożeństwo szkaplerzne ma głęboką tradycję — szczególnie silne w klasztorach karmelitańskich (Czerna, Warszawa).",
    instructions:
      "Aby otrzymać, znajdź księdza, który może nałożyć szkaplerz w obrzędzie z Rytuału Rzymskiego. Po nałożeniu należy nosić ciągle. Jeśli się zniszczy, zastąp nowym. Zobowiązania: regularna spowiedź, częsta Komunia, codzienny Różaniec lub przynajmniej jedna dziesiątka, czystość zgodnie ze stanem życia. Soboty są szczególnie związane ze szkaplerzem.",
    patronSaint: "Matka Boża Szkaplerzna · Święty Szymon Stock",
    feastDay: "16 lipca",
    source: "KEP + Vatican.va Polski (Pius XII) + Zakon Karmelu + Rytuał Rzymski. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "chaplet-st-michael",
    name: "Koronka do świętego Michała Archanioła",
    description:
      "Koronka do świętego Michała Archanioła została objawiona służebnicy Bożej Antoniny d'Astonac w XVIII wieku. Święty Michał obiecał odmawiającym wiernie: asystencję chóru anielskiego przy Komunii świętej; opiekę dziewięciu chórów anielskich w życiu; ostateczne wyzwolenie z czyśćca dla modlącego się i jego rodziny. Koronka ma dziewięć inwokacji odpowiadających dziewięciu chórom anielskim, każda po Ojcze Nasz i trzech Zdrowaś Maryjo. Kończy się czterema Ojcze Nasz (święty Michał, święty Gabriel, święty Rafael, Anioł Stróż) i modlitwą Leona XIII.",
    instructions:
      "Struktura: (1) Znak Krzyża; (2) jaculatoria «Boże, wejrzyj ku wspomożeniu memu…»; (3) w dziewięciu grupach: invocate odpowiedni chór anielski, następnie Ojcze Nasz i trzy Zdrowaś Maryjo; (4) cztery Ojcze Nasz końcowe; (5) modlitwa do świętego Michała Leona XIII. Zalecana przez egzorcystów katolickich.",
    patronSaint: "Święty Michał Archanioł",
    feastDay: "29 września (święci Archaniołowie Michał, Gabriel, Rafael)",
    source: "KEP + Vatican.va Polski + tradycja Antoniny d'Astonac + modlitwa Leona XIII (1884). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "first-fridays",
    name: "Nabożeństwo Dziewięciu Pierwszych Piątków",
    description:
      "Nabożeństwo Dziewięciu Pierwszych Piątków zostało objawione przez Jezusa Chrystusa świętej Małgorzacie Marii Alacoque w Paray-le-Monial (1673-1675). W wielkiej obietnicy Jezus powiedział: «W nadmiarze miłosierdzia mojego Serca obiecuję wszystkim, którzy przyjmą Komunię w dziewięciu pierwszych piątkach, łaskę ostatecznej wytrwałości: nie umrą w mojej niełasce ani bez przyjęcia sakramentów». Nabożeństwo rozumie się prawidłowo jako wyraz ciągłej wierności, a nie magia. W Polsce praktykowane szczególnie w parafiach dedykowanych Sercu Jezusa.",
    instructions:
      "Wymagania: (1) przyjmować Komunię Świętą w stanie łaski w pierwszy piątek dziewięciu kolejnych miesięcy; (2) dobra spowiedź sakramentalna, jeśli upadek w grzech śmiertelny; (3) ofiarować Komunię za intencje Serca Jezusa i własną wytrwałość; (4) jeśli zostanie opuszczony pierwszy piątek, zaczyna się od pierwszego. Łączy się z: nabożeństwem Najświętszego Serca, pierwszymi sobotami (Maryja), modlitwą o godzinie 15:00.",
    patronSaint: "Najświętsze Serce Jezusa · Święta Małgorzata Maria Alacoque",
    feastDay: "Piątek po Bożym Ciele",
    source: "KEP + Vatican.va (Haurietis Aquas, Pius XII 1956) + autobiografia świętej Małgorzaty Marii. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "first-saturdays",
    name: "Nabożeństwo Pięciu Pierwszych Sobót",
    description:
      "Nabożeństwo Pięciu Pierwszych Sobót zostało wyraźnie poproszone przez Najświętszą Maryję Pannę siostrę Łucji dos Santos w Pontevedrze 10 grudnia 1925 roku. Maryja obiecała: «Wszystkim, którzy w ciągu pięciu miesięcy w pierwszą sobotę wyspowiadają się, przyjmą Komunię Świętą, odmówią Różaniec i towarzyszą mi przez piętnaście minut rozważając tajemnice Różańca, z zamiarem zadośćuczynienia mi, obiecuję pomóc w godzinę śmierci ze wszystkimi łaskami niezbędnymi do zbawienia». W Polsce — kraju szczególnie maryjnym — nabożeństwo jest praktykowane jako uzupełnienie nabożeństwa do Niepokalanego Serca.",
    instructions:
      "W ciągu pięciu pierwszych sobót kolejnych: (1) Spowiedź sakramentalna w ciągu ośmiu dni przed lub po; (2) Komunia w pierwszą sobotę w stanie łaski z intencją wynagrodzenia Niepokalanemu Sercu; (3) pełny Różaniec (pięć dziesiątek); (4) piętnaście minut towarzyszenia Maryi rozważając tajemnicę — to jest wyróżnik. Intencja wynagrodzenia jest istotna. Jeśli sobota zostanie opuszczona, zaczyna się od pierwszej.",
    patronSaint: "Niepokalane Serce Maryi · Matka Boża Fatimska",
    feastDay: "Sobota po Najświętszym Sercu",
    source: "KEP + Vatican.va Polski + Pamiętniki siostry Łucji + Pius XII (konsekracja świata 1942). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "guardian-angel-prayer",
    name: "Modlitwa do Anioła Stróża",
    description:
      "Modlitwa do Anioła Stróża jest jedną z najstarszych i najukochańszych modlitw katolickich. Doktryna osobistego anioła opiekuna każdego ochrzczonego jest zakorzeniona w Mt 18,10. Katechizm Kościoła Katolickiego stwierdza (§ 336): «Od początku do śmierci życie ludzkie jest otoczone ich strażą i wstawiennictwem». W Polsce tradycyjnie uczona dzieci od wczesnego wieku.",
    prayerText:
      "Aniele Boży, Stróżu mój, Ty zawsze przy mnie stój. Rano, wieczór, we dnie, w nocy bądź mi zawsze ku pomocy. Strzeż duszy, ciała mego i zaprowadź mnie do żywota wiecznego. Amen.",
    instructions:
      "Tradycyjne okazje: (1) przy budzeniu; (2) przed snem; (3) przed podróżą; (4) przed ważną decyzją lub egzaminem; (5) w momencie strachu lub pokusy. Dla polskich rodziców: nauczanie modlitwy do Anioła Stróża dzieciom jest jedną z fundamentalnych odpowiedzialności rodzinnej katechezy — tradycyjnie pierwsza modlitwa po Ojcze Nasz i Zdrowaś Maryjo.",
    patronSaint: "Święty Anioł Stróż",
    feastDay: "2 października (Święci Aniołowie Stróżowie)",
    source: "KEP + Katechizm §§ 328-336 + Mt 18,10 + tradycyjna modlitwa. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "lectio-divina",
    name: "Lectio Divina (Modlitewna Lektura Pisma Świętego)",
    description:
      "Lectio Divina — «boskie czytanie» — to starożytna katolicka praktyka monastyczna czytania Pisma Świętego jako modlitwy, nie jako studium. Systematyzowana przez kartuza Guigo II w XII wieku, składa się z czterech kroków: Lectio (czytać), Meditatio (rozważać), Oratio (modlić się), Contemplatio (kontemplować). Papież Benedykt XVI w Verbum Domini (2010) opisał ją jako «starożytną i zawsze nową praktykę czytania Pisma Świętego dla wzrostu w modlitwie». W Polsce promowana szczególnie przez benedyktynów w Tyńcu i przez grupy biblijne parafialne.",
    instructions:
      "Potrzebna Biblia katolicka, ciche miejsce, 20-30 minut. (1) **Lectio**: czytać krótki fragment (10-15 wersetów) powoli, dwa-trzy razy. Które słowo wystaje? (2) **Meditatio**: zatrzymać się na tym (Ps 1,2). (3) **Oratio**: odpowiadać Panu swoimi słowami. (4) **Contemplatio**: odpoczywać w ciszy w obecności Boga. Zamknięcie: krótkie konkretne postanowienie dnia. Idealnie codziennie, 15 minut. Codzienne Ewangelie liturgii są idealnym materiałem.",
    patronSaint: "Święty Hieronim (patron Pisma Świętego)",
    feastDay: "30 września",
    source: "KEP + Vatican.va Polski (Verbum Domini, Benedykt XVI 2010) + Guigo II + tradycja benedyktyńska w Tyńcu. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "mass-offering",
    name: "Zamówienie Mszy świętej za Intencję",
    description:
      "Zamówienie Mszy świętej w określonej intencji jest najstarszą i najgłębszą katolicką praktyką wstawienniczej modlitwy. Każda Msza, jako uobecnienie ofiary Kalwarii, posiada wartość nieskończoną w sobie; konkretne intencje są ograniczone i specyficzne. Tradycja ma korzenie patrystyczne: święty Augustyn świadczy o Mszach odprawionych za jego matkę świętą Monikę. Sobór Trydencki (1563) zdefiniował, że ofiara eucharystyczna jest składana «nie tylko za grzechy, kary, zadośćuczynienia i inne potrzeby wiernych żywych, ale także za zmarłych w Chrystusie». W Polsce zamówienie Mszy jest ugruntowaną praktyką parafialną.",
    instructions:
      "Procedura: (1) zwróć się do kancelarii parafialnej i poproś o Mszę w konkretnej intencji; (2) złóż wolną ofiarę (różni się w zależności od regionu, zwykle 30-100 zł w Polsce); (3) jeśli intencja jest za zmarłego, podaj imię i datę zgonu; (4) idealnie uczestnicz osobiście w Mszy. Polskie tradycje: (a) Msza za zmarłych w siódmym, trzydziestym dniu, w rocznicę; (b) Msza święta dziękczynna w rocznicę. Dla dusz w czyśćcu Msza święta jest największym duchowym darem.",
    patronSaint: "Chrystus, Najwyższy Kapłan",
    feastDay: "Wielki Czwartek",
    source: "KEP + Katechizm §§ 1356-1381 + Sobór Trydencki + Vatican.va Polski. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-don-bosco",
    name: "Nowenna do świętego Jana Bosko",
    description:
      "Święty Jan Bosko (Giovanni Melchiorre Bosco, 1815-1888) — znany jako Don Bosco — był włoskim księdzem piemonckim, założycielem Towarzystwa Salezjańskiego i Córek Maryi Wspomożycielki. Jego życiową pasją była młodzież uboga i opuszczona. Rozpoczął z garstką chłopców w oratorium w Valdocco (Turyn) w 1841 roku i zostawił zgromadzenie z 1800 członków. System wychowawczy «zapobiegawczy» oparty na rozumie, religii i amorevolezza (życzliwości). Kanonizowany przez Piusa XI w 1934. W Polsce salezjanie mają silną obecność — Towarzystwo Salezjańskie ma wiele szkół i parafii. Odpowiednia dla powołań, nawrócenia dzieci, decyzji edukacyjnych.",
    prayerText:
      "O święty Janie Bosko, ojcze i nauczycielu młodzieży, uzyskaj mi przez wstawiennictwo łaskę, o którą z synowską ufnością proszę (wymień intencję). Ty, który jako młody rozeznałeś swoje powołanie przez prorocze sny i duchowe kierownictwo świętej matki Małgorzaty Occhieny, wstaw się za młodymi w dzisiejszym zagubieniu. Maryjo Wspomożycielko, w której imię Don Bosco czynił wszystko, bądź naszym wspomożeniem. Amen.",
    instructions:
      "Odmawiaj raz dziennie przez dziewięć kolejnych dni, idealnie od 22 do 30 stycznia w przygotowaniu do święta 31 stycznia. Struktura: Znak Krzyża; Psalm 23 lub fragment Ewangelii o Dzieciątku Jezus; modlitwa nowenny; trzy Zdrowaś Maryjo Maryi Wspomożycielce; jaculatoria «Maryjo Wspomożycielko, módl się za nami i za młodzieżą».",
    patronSaint: "Święty Jan Bosko · Maryja Wspomożycielka",
    feastDay: "31 stycznia",
    source: "KEP + Vatican.va Polski + Wspomnienia Oratorium (Don Bosco) + Towarzystwo Salezjańskie w Polsce. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-infant-of-prague",
    name: "Nowenna do Dzieciątka Jezus z Pragi",
    description:
      "Dzieciątko Jezus z Pragi to mała wosk-figura Dzieciątka Jezus (około 47 cm), przechowywana w kościele Matki Bożej Zwycięskiej w Pradze. Figura została podarowana karmelitom bosym Pragi w 1628 roku przez księżną Polixenę z Lobkowicz. Nabożeństwo rozprzestrzeniło się po Europie Środkowej podczas Wojny Trzydziestoletniej. W Polsce nabożeństwo do Dzieciątka Jezus z Pragi jest mocne w parafiach karmelitańskich, szczególnie w Warszawie, Krakowie i Gdańsku. Obietnica: «Im bardziej Mnie czcicie, tym bardziej Ja was będę wspierał». Odpowiednia dla trudnych sytuacji finansowych, zdrowia małych dzieci, znalezienia pracy.",
    prayerText:
      "Boskie Dzieciątko Jezus, czczę Cię jako mojego Pana i Zbawiciela. Proszę o wybaczenie wszystkich moich grzechów. Błagam Cię, słodki Jezu, abyś udzielił mi łaski, której gorąco pragnę (wymień intencję). Dzieciątko Jezus z Pragi, błogosław mnie i moją rodzinę. Amen.",
    instructions:
      "Odmawiaj raz dziennie przez dziewięć kolejnych dni. Tradycyjnie zaleca się umieścić obraz Dzieciątka Jezus z Pragi w honorowym miejscu domu podczas nowenny.",
    patronSaint: "Dzieciątko Jezus z Pragi",
    feastDay: "Zmienne (druga niedziela stycznia w niektórych tradycjach)",
    source: "KEP + Vatican.va Polski + Karmelici Bosi w Pradze + Pius XII (koronacja 1955). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-anthony",
    name: "Nowenna do świętego Antoniego z Padwy",
    description:
      "Święty Antoni z Padwy (Fernando de Bulhões, 1195-1231) — urodzony w Lizbonie, zmarł w Padwie — jest jednym z najbardziej kochanych świętych Kościoła katolickiego. Początkowo augustianin, został franciszkaninem w 1220. Niezwykle skuteczny kaznodzieja, nazwany «Młotem Heretyków» i «Językiem Ducha Świętego» (jego nieskazitelny język zachowuje się w Padwie). Kanonizowany przez Grzegorza IX rok po śmierci, ogłoszony Doktorem Kościoła przez Piusa XII w 1946. W Polsce kult świętego Antoniego jest bardzo silny — wiele parafii poświęconych. Patron rzeczy zgubionych, ubogich, małżeństw, spraw ludzko beznadziejnych.",
    prayerText:
      "O chwalebny święty Antoni, ty którego nazywany «świętym cudów» i «rzeczy zgubionych», uzyskaj przez potężne wstawiennictwo łaskę, o którą z pokorną ufnością proszę (wymień intencję). Ty, który jako dziecko trzymałeś w rękach Dzieciątko Jezus, uzyskaj mi prostotę serca, aby trwać w Jego obecności. A jeśli straciłem coś ważnego — przedmiot, relację, sens duchowy, ukochaną osobę oddaloną od wiary — przywróć, błagam, według woli Boga. Amen.",
    instructions:
      "Odmawiaj raz dziennie przez dziewięć kolejnych dni, idealnie od 5 do 12 czerwca. Polska tradycja: trzynaście wtorków świętego Antoniego — trzynaście kolejnych wtorków modlitwy. Struktura: Znak Krzyża; krótki fragment responsorium antoniańskiego («Jeśli szukasz cudów…»); modlitwa nowenny; trzynaście Ojcze Nasz, Zdrowaś Maryjo i Chwała Ojcu; wymień intencję. Dla zgubionych rzeczy: krótka inwokacja «Święty Antoni, pomóż mi znaleźć to, co zgubione».",
    patronSaint: "Święty Antoni z Padwy",
    feastDay: "13 czerwca",
    source: "KEP + Vatican.va Polski + Pius XII (Doktor Kościoła 1946) + tradycja franciszkańska w Polsce. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-blaise",
    name: "Nowenna do świętego Błażeja",
    description:
      "Święty Błażej (m. ok. 316) był biskupem Sebaste w Armenii podczas prześladowań Licyniusza. Lekarz przed święceniami, męczony po okresie eremityzmu w jaskini, gdzie dzikie zwierzęta przynosiły mu jedzenie. Najsłynniejsza legenda o świętym Błażeju: dziecko duszące się ością ryby, matka przyprowadziła dziecko do świętego, który uzdrowił je natychmiast. Patron uniwersalny chorób gardła, problemów oddechowych i zawodowych głosu. «Błogosławieństwo gardeł» — sakramentale, w którym kapłan przykłada dwie skrzyżowane świece na gardło — wykonuje się w większości polskich parafii 3 lutego.",
    prayerText:
      "O chwalebny święty Błażeju, biskupie i męczenniku, uzyskaj mi przez wstawiennictwo łaskę, o którą z ufnością proszę (wymień intencję). Ty, który uwolniłeś dziecko od uduszenia samą siłą błogosławieństwa, uwolnij (wymień imię) od dolegliwości. Święty Błażeju, módl się za nami. Amen.",
    instructions:
      "Odmawiaj nowenny przez dziewięć kolejnych dni, idealnie od 25 stycznia do 2 lutego. Tradycja zaleca uczestnictwo we Mszy 3 lutego i otrzymanie Błogosławieństwa Gardeł.",
    patronSaint: "Święty Błażej (patron chorób gardła)",
    feastDay: "3 lutego",
    source: "KEP + Vatican.va Polski + polska tradycja Błogosławieństwa Gardeł + Acta Sanctorum. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-catherine-siena",
    name: "Nowenna do świętej Katarzyny ze Sieny",
    description:
      "Święta Katarzyna ze Sieny (Caterina Benincasa, 1347-1380) — jedna z czterech kobiet Doktorów Kościoła i współpatronka Europy — to jedna z najbardziej niezwykłych postaci duchowych XIV wieku. W wieku sześciu lat otrzymała pierwszą wizję Chrystusa. Wstąpiła jako mantelata do Trzeciego Zakonu Dominikańskiego. Mistyczka, terciarka, doradczyni duchowa i dyplomatka, była centralna podczas Schizmy Papieża Awinionu: jej listami i osobistym wstawiennictwem w Awinionie w 1376 roku przekonała Grzegorza XI do powrotu do Rzymu. Jej Dialog o Bożej Opatrzności jest jednym z wielkich tekstów mistycznych katolickich. Otrzymała niewidzialne stygmaty. Zmarła w 33. roku życia. Kanonizowana przez Piusa II w 1461, Doktor Kościoła w 1970 (Paweł VI), współpatronka Europy w 1999 (JPII).",
    prayerText:
      "O chwalebna święta Katarzyno ze Sieny, dziewico mistyczka i Doktorko Kościoła, uzyskaj przez wstawiennictwo łaskę, o którą z ufnością proszę (wymień intencję). Ty, która miałaś odwagę pisać do Papieża i królów swojego czasu w imię Chrystusa, uzyskaj nam odwagę głoszenia prawdy ewangelicznej bez strachu. Amen.",
    instructions:
      "Odmawiaj nowenny przez dziewięć kolejnych dni, idealnie od 21 do 29 kwietnia.",
    patronSaint: "Święta Katarzyna ze Sieny, OP",
    feastDay: "29 kwietnia",
    source: "KEP + Vatican.va Polski (Paweł VI Doktor 1970; JPII współpatronka 1999) + Dialog o Bożej Opatrzności. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-christopher",
    name: "Nowenna do świętego Krzysztofa",
    description:
      "Święty Krzysztof (Christophoros, «nosiciel Chrystusa») jest jednym z najpopularniejszych świętych tradycji katolickiej i patronem podróżujących. Tradycyjna hagiografia przedstawia go jako olbrzyma, który służył Chrystusowi przenosząc podróżujących przez niebezpieczną rzekę. Pewnej nocy dziecko poprosiło o przeniesienie: dziecko stawało się coraz cięższe, aż okazało się, że niesie Chrystusa. W Polsce nabożeństwo do świętego Krzysztofa jako patrona kierowców jest silne — medalik świętego Krzysztofa w samochodzie, błogosławieństwo pojazdów 25 lipca, modlitwa przed podróżą.",
    prayerText:
      "O chwalebny święty Krzysztofie, olbrzymie siły i wiary, który własnym ciałem przenosiłeś Dzieciątko Jezus przez rzekę życia, uzyskaj mi przez wstawiennictwo łaskę, o którą z ufnością proszę (wymień intencję). Chroń mnie i moich bliskich w każdej podróży; uzyskaj nam łaskę, abyśmy nigdy nie zboczyli z Drogi, którą jest sam Chrystus. Amen.",
    instructions:
      "Odmawiaj nowenny przez dziewięć kolejnych dni, idealnie od 17 do 25 lipca. Przed konkretną podróżą połącz z błogosławieństwem samochodu w lokalnej parafii i medalikiem świętego Krzysztofa.",
    patronSaint: "Święty Krzysztof (patron podróżujących i kierowców)",
    feastDay: "25 lipca",
    source: "KEP + Złota Legenda Jakuba z Voragine + polska tradycja błogosławieństwa pojazdów. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-joseph-cupertino",
    name: "Nowenna do świętego Józefa z Cupertino",
    description:
      "Święty Józef z Cupertino (Giuseppe Maria Desa, 1603-1663) — włoski franciszkanin konwentualny — jest patronem studentów, trudnych egzaminów, aspirantów do życia kapłańskiego i zakonnego, pilotów i astronautów. Cierpiał z powodu wielkiej powolności umysłowej, był odrzucany w wielu zakonach, ostatecznie przyjęty przez franciszkanów konwentualnych w 1625. Podczas egzaminów święceń otrzymał przez opatrzność jedyny materiał, który dobrze znał. Najbardziej niezwykłe były jego ekstatyczne lewitacje, dokumentowane przez wielu świadków: jego ciało unosiło się od ziemi przez minuty lub godziny. Kanonizowany przez Klemensa XIII w 1767.",
    prayerText:
      "O chwalebny święty Józefie z Cupertino, ty który znałeś upokorzenie nieumiejętności nauczenia się tego, czego inni uczyli się z łatwością — uzyskaj mi przez wstawiennictwo łaskę, o którą z ufnością proszę (wymień intencję). Jeśli jestem studentem przed trudnym egzaminem, uzyskaj mi światło, pamięć i spokój. Święty Józefie z Cupertino, módl się za nami. Amen.",
    instructions:
      "Odmawiaj nowenny przez dziewięć kolejnych dni, idealnie od 9 do 17 września. Dla konkretnego egzaminu zacznij dziewięć dni wcześniej.",
    patronSaint: "Święty Józef z Cupertino, OFMConv",
    feastDay: "18 września",
    source: "KEP + Vatican.va Polski (Klemens XIII, 1767) + Zakon Franciszkanów Konwentualnych w Polsce. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-martin-de-porres",
    name: "Nowenna do świętego Marcina de Porres",
    description:
      "Święty Marcin de Porres (Martín de Porres Velázquez, 1579-1639) — pierwszy kanonizowany Mulat w Kościele katolickim — był peruwiańskim dominikaninem, synem hiszpańskiego szlachcica i panamskiej kobiety wolnej. Dyskryminacja rasowa, której doświadczył od dzieciństwa, naznaczyła jego całe życie, ale przekształciła ją w heroiczną cnotę. Wstąpił jako donado do dominikańskiego klasztoru w Limie w wieku piętnastu lat i służył jako fryzjer-pielęgniarz przez ponad pięćdziesiąt lat. Jego biografia obejmuje udokumentowane bilokacje (widziany w Afryce i Japonii będąc w Limie), spektakularne uzdrowienia, i panowanie nad zwierzętami. Kanonizowany przez świętego Jana XXIII w 1962. W Polsce nabożeństwo do świętego Marcina rozszerza się szczególnie w parafiach dominikańskich.",
    prayerText:
      "O chwalebny święty Marcinie de Porres, pokorny sługo ubogich, uzdrowicielu chorych i przyjacielu zwierząt, uzyskaj przez wstawiennictwo łaskę, o którą z ufnością proszę (wymień intencję). Ty, który znałeś ból dyskryminacji rasowej i przekształciłeś go w łagodność i służbę, uzyskaj nam łaskę uzdrowienia podziałów rasy, klasy i narodu. Amen.",
    instructions:
      "Odmawiaj nowenny przez dziewięć kolejnych dni, od 25 października do 2 listopada w przygotowaniu do święta 3 listopada.",
    patronSaint: "Święty Marcin de Porres, OP",
    feastDay: "3 listopada",
    source: "KEP + Vatican.va Polski (święty Jan XXIII, 1962) + Prowincja Dominikańska Peru + tradycja dominikańska w Polsce. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-monica",
    name: "Nowenna do świętej Moniki",
    description:
      "Święta Monika (332-387) — matka świętego Augustyna z Hippony — jest patronką matek modlących się za nawrócenie dorosłych dzieci oddalonych od wiary. Wydana za poganina o złym charakterze imieniem Patrycjusz, nawróciła go przez cierpliwość i modlitwę. Ale najdłuższym cierpieniem jej życia był syn Augustyn — błyskotliwy retor oddany przez siedemnaście lat namiętnościom młodości, manicheizmowi i nieregularnemu związkowi. Monika modliła się o syna przez te siedemnaście lat. Święty Ambroży z Mediolanu powiedział: «Niemożliwe, aby syn tylu łez zginął». Augustyn nawrócił się w Wielkanoc 387. Monika zmarła kilka tygodni później w porcie Ostia.",
    prayerText:
      "O chwalebna święta Moniko, matko płacząca i wierna, która przez siedemnaście lat nie ustawałaś w modlitwie za syna Augustyna aż do ujrzenia go nawróconego do Chrystusa, uzyskaj mi przez wstawiennictwo łaskę, o którą z ufnością proszę (wymień intencję, szczególnie za dziecko oddalone od wiary). Udziel mi cierpliwości, jaką miałaś, i przede wszystkim niezachwianej ufności, że «niemożliwe, aby syn tylu łez zginął». Święta Moniko, módl się za nami. Amen.",
    instructions:
      "Odmawiaj nowenny przez dziewięć kolejnych dni, od 18 do 26 sierpnia w przygotowaniu do święta 27 sierpnia (i świętego Augustyna 28 sierpnia). Dla nawrócenia dziecka: cotygodniowa Komunia ofiarowana za dziecko; Msza za intencję; lektura Wyznań Augustyna.",
    patronSaint: "Święta Monika",
    feastDay: "27 sierpnia",
    source: "KEP + Vatican.va Polski + święty Augustyn, Wyznania (księga IX) + tradycja augustyńska w Polsce. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "offering-suffering",
    name: "Ofiarowanie Cierpienia (Cierpienie Odkupieńcze)",
    description:
      "Ofiarowanie cierpienia — katolicka praktyka jednoczenia własnego cierpienia fizycznego, emocjonalnego lub duchowego z krzyżem Chrystusa w intencji wynagradzającej — jest jedną z najgłębszych duchowości katolickich. Nie jest masochizmem; nie jest obojętnością na cierpienie. Jest teologiczną prawdą, że cierpienie ludzkie zjednoczone dobrowolnie z cierpieniem Chrystusa uczestniczy w ekonomii zbawienia. Święty Paweł sformułował to w Kol 1,24: «Dopełniam w moim ciele to, czego nie dostaje udręk Chrystusa». Święty Jan Paweł II w Salvifici Doloris (1984) — napisanej krótko po wyzdrowieniu z zamachu — pogłębił tę teologię: cierpienie ofiarowane staje się skuteczną modlitwą. W Polsce duchowość cierpienia ofiarowanego ma głęboką tradycję, szczególnie u świętego Maksymiliana Kolbego i siostry Faustyny.",
    prayerText:
      "Panie Jezu Chryste, ofiaruję Ci dziś wszystkie cierpienia, które mnie spotkają — znane i nieznane, ciała, duszy i serca. Zjednocz je ze swoją zbawczą Męką i spraw, aby służyły nawróceniu grzeszników, ulżeniu duszom w czyśćcu i konkretnej intencji, którą Ci teraz przedstawiam (wymień intencję). Amen.",
    instructions:
      "Praktyka ma dwa momenty: (1) **poranne ofiarowanie** — przy budzeniu: «Panie, ofiaruję Ci ból i pracę tego dnia za (intencję)»; (2) **odnowienie w ciągu dnia** — gdy przychodzi konkretny ból, odnowić ofiarowanie. Szczególnie odpowiednie dla osób z chorobami przewlekłymi, w długotrwałej żałobie, w niesprawiedliwych sytuacjach. Dla poważnego cierpienia, szukaj kierownika duchowego.",
    patronSaint: "Chrystus Ukrzyżowany · Matka Boża Bolesna",
    feastDay: "Wielki Piątek",
    source: "KEP + Vatican.va Polski (Salvifici Doloris, JPII 1984) + Katechizm §§ 1500-1532 + tradycja polskich świętych cierpienia (Faustyna, Maksymilian Kolbe). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-discernment",
    name: "Modlitwa o Rozeznanie",
    description:
      "Modlitwa o rozeznanie jest katolicką praktyką proszenia o światło Boże dla podjęcia ważnej decyzji. Tradycja katolicka uczy, że rozeznanie nie jest prostym racjonalnym wyborem, ale aktywnym poszukiwaniem konkretnej woli Boga. Święty Ignacy z Loyoli w Ćwiczeniach Duchownych (1548) usystematyzował zasady rozeznania duchów. Papież Franciszek uczynił z rozeznania centralny temat swojego pontyfikatu.",
    prayerText:
      "Panie mój Boże, błagam Cię pokornie o światło, abym rozeznał, czego ode mnie żądasz. Moje serce jest pełne niepokoju i wielu głosów; potrzebuję Twojego głosu. Oddal ode mnie hałas strachu, urok wygody i siłę pychy, i daj mi oczy, aby widzieć z spojrzeniem Chrystusa. Ufam, Panie, że prowadzisz mnie z ojcowską opatrznością drogą, która zaprowadzi mnie do Ciebie. Amen.",
    instructions:
      "Trzy etapy ignacjańskiego rozeznania: (1) **wstępna obojętność** — prosić o łaskę, abym nie był związany z jedną opcją bardziej niż z drugą; (2) **rozważanie** — studiować konsekwencje i zauważać wewnętrzne ruchy; (3) **potwierdzenie** — ofiarować tentatywną decyzję Bogu w modlitwie przez kilka dni.",
    patronSaint: "Duch Święty · Święty Ignacy z Loyoli",
    feastDay: "31 lipca (Święty Ignacy)",
    source: "KEP + Vatican.va Polski + Święty Ignacy z Loyoli, Ćwiczenia Duchowne (1548) + katechezy Papieża Franciszka (2022). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-fertility",
    name: "Modlitwa o Płodność",
    description:
      "Katolicka modlitwa o płodność — dla małżeństw, które pragną poczęcia i nie osiągają go — ma głębokie korzenie biblijne. Pismo Święte pełne jest niepłodnych małżeństw, którym Bóg udzielił dzieci w odpowiedzi na wytrwałą modlitwę: Sara i Abraham, Rebeka i Izaak, Rachela i Jakub, Anna i Elkana, Elżbieta i Zachariasz. Kościół uczy, że płodność jest darem otrzymywanym z wdzięcznością, a niepłodność nie jest karą Bożą. Modlitwa nie wyklucza odpowiedzialnego szukania medycznego (NaProTechnology); nie wyklucza otwarcia na adopcję; ale wyklucza techniki rozdzielające zrodzenie od aktu małżeńskiego. Patroni: święta Anna i święty Joachim; święty Gerard Majella.",
    prayerText:
      "Panie Jezu, autorze wszelkiego życia, błagamy Cię z pokorną ufnością o dar dziecka. Ty znasz nasze czekanie, nasze łzy. Udziel nam, jeśli jest to Twoją wolą, biologicznej płodności; a jeśli nie jest, uzyskaj nam inny szlak rodzicielstwa — adopcję, opiekę nad dziećmi innych, duchowe zrodzenie tylu istnień. Święta Anno, święty Gerardzie Majello, módlcie się za nami. Amen.",
    instructions:
      "Modlitwa może być odmawiana codziennie lub jako nowenny do świętej Anny lub świętego Gerarda. Tradycja polska: pielgrzymka do Sanktuarium świętej Anny na Górze Świętej Anny (Opolskie) w modlitwie o płodność.",
    patronSaint: "Święta Anna i Święty Joachim · Święty Gerard Majella",
    feastDay: "26 lipca",
    source: "KEP + Vatican.va Polski (Donum Vitae CDF 1987; Dignitas Personae 2008) + Katechizm §§ 2373-2379. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-financial-hardship",
    name: "Modlitwa w Trudności Ekonomicznej",
    description:
      "Katolicka modlitwa w trudności ekonomicznej ma kilku patronów: święty Józef (patron pracowników), święty Antoni (wzywany przez ubogich), święta Marta (administracja domowa). Modlitwa nie zastępuje ludzkiej odpowiedzialności: chrześcijanin w trudności ekonomicznej również aktywnie szuka pracy, kontroluje wydatki. Ale modlitwa ujmuje trudność w opatrzności Ojca: «nie troszczcie się o życie wasze… Ojciec wasz niebieski wie, że tego wszystkiego potrzebujecie» (Mt 6,25.32).",
    prayerText:
      "Ojcze niebieski, który dajesz pożywienie liliom polnym i ptakom niebieskim, spójrz z miłosierdziem na swoją rodzinę w godzinie trudności ekonomicznej. Udziel mi mądrości do zarządzania tym, co mam, odwagi do proszenia o pomoc, pokory do przyjmowania pomocy, i wytrwałości do szukania pracy. Święty Józefie pracowniku, módl się za nami. Święty Antoni z Padwy, módl się za nami. Amen.",
    instructions:
      "Odmawiaj codziennie lub jako nowenny (dziewięć dni do świętego Józefa lub świętego Antoniego). Dla bezrobotnych: nowenna do świętego Józefa Pracownika (22-30 kwietnia w przygotowaniu do święta 1 maja).",
    patronSaint: "Święty Józef · Święty Antoni · Święta Marta",
    feastDay: "19 marca (Święty Józef) · 1 maja (Święty Józef Robotnik)",
    source: "KEP + Vatican.va Polski + Katechizm §§ 2402-2406 + Caritas in Veritate (Benedykt XVI 2009). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-happy-death",
    name: "Modlitwa o Dobrą Śmierć",
    description:
      "Modlitwa o dobrą śmierć — o łaskę umierania dobrze: w stanie łaski, z przyjętymi sakramentami (szczególnie Namaszczenia Chorych i Wiatyku), w wewnętrznym pokoju, z czasem na przebaczenie i poproszenie o przebaczenie, i z pewną nadzieją nieba — jest tradycyjną katolicką praktyką. Śmierć jest ostatnią wielką próbą duchową życia. Święty Józef (który zmarł w ramionach Jezusa i Maryi) jest patronem dobrej śmierci par excellence.",
    prayerText:
      "O Panie Jezu, w którego ręce oddałeś ducha umierając, błagam Cię o łaskę dobrej śmierci. Udziel mi, abym umarł w stanie łaski, pojednany z Tobą i ze wszystkimi, których obraziłem. Udziel mi przyjęcia sakramentów spowiedzi, Komunii i Namaszczenia Chorych przed ostatnim oddechem. Uchroń mnie od śmierci nagłej, od śmierci nieprzewidzianej, od śmierci bezbożnej. Święty Józefie, patronie dobrej śmierci, módl się za nami. Święta Maryjo, módl się za nami teraz i w godzinę śmierci naszej. Amen.",
    instructions:
      "Modlitwa może być odmawiana: jako periodyczna devosja w końcu każdego dnia; w każdą rocznicę śmierci krewnego; w szpitalach; przy łóżku umierającego. Wielkie dyscypliny przygotowujące do dobrej śmierci: regularna spowiedź (miesięczna), częsta Komunia, Namaszczenie Chorych na początku poważnej choroby (NIE czekaj na ostatni moment).",
    patronSaint: "Święty Józef · Święta Maryja",
    feastDay: "19 marca (Święty Józef)",
    source: "KEP + Vatican.va Polski + Święty Alfons Maria Liguori, Przygotowanie do Śmierci + Katechizm §§ 1010-1014. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-healing",
    name: "Modlitwa o Uzdrowienie",
    description:
      "Modlitwa o uzdrowienie jest jedną z najbardziej fundamentalnych praktyk dewocyjnych katolickich. Pismo Święte rejestruje Jezusa uzdrawiającego niezliczonych chorych w swoim publicznym ministerstwie, a sakrament Namaszczenia Chorych kontynuuje dziś tę uzdrawiającą misję. Kościół rozróżnia trzy formy uzdrowienia: (1) sakramentalne (Namaszczenie Chorych); (2) charyzmatyczne; (3) przez wstawiennictwo świętego (Lourdes, Faustyna, święty Peregryn dla raka). Modlitwa nie jest magią; jest synowską prośbą skierowaną do Ojca przez Chrystusa.",
    prayerText:
      "Panie Jezu, lekarzu ciał i dusz, błagamy Cię za (wymień imię i chorobę) o łaskę uzdrowienia. Ty, który uzdrowiłeś tylu w swoim ziemskim ministerstwie, wyciągnij swoją uzdrawiającą rękę także dziś. Jeśli jest Twoją wolą, przywróć zdrowie ciała; a jeśli nie, przywróć zdrowie duszy, dając cierpliwość w bólu, siłę w leczeniu, nadzieję wobec przyszłości. Maryjo, Uzdrowienie Chorych, módl się za nami. Święty Peregrynie, módl się za nami. Amen.",
    instructions:
      "Modlitwa może być odmawiana: przez siebie, połączona z spowiedzią, Komunią i Namaszczeniem Chorych; za krewnego lub przyjaciela, idealnie w jego obecności, z włożeniem rąk (Mk 16,18); we wspólnocie. Dla konkretnych chorób: święty Peregryn dla raka, święta Łucja dla wzroku, święty Błażej dla gardła.",
    patronSaint: "Chrystus, Boski Lekarz · Maryja, Uzdrowienie Chorych",
    feastDay: "11 lutego (Matka Boża z Lourdes)",
    source: "KEP + Vatican.va Polski (Salvifici Doloris, JPII 1984) + Rytuał Namaszczenia Chorych + Katechizm §§ 1499-1532. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-marriage",
    name: "Modlitwa o Małżeństwo",
    description:
      "Modlitwa o małżeństwo — o własne powołanie matrymonialne, o własne małżeństwo, o małżeństwo w kryzysie, lub o świętość małżeństw — jest fundamentalną praktyką w katolickiej duchowości rodzinnej. Kościół uczy, że małżeństwo sakramentalne jest jednym z siedmiu sakramentów (Mt 19,6: «co Bóg złączył, niech człowiek nie rozłącza»). Święty Jan Paweł II rozwinął teologię małżeństwa w Familiaris Consortio (1981) i Teologii Ciała. Papież Franciszek kontynuował w Amoris Laetitia (2016). W Polsce małżeństwo katolickie ma długą tradycję — Polska jest jednym z krajów z największą tradycją silnych małżeństw katolickich.",
    prayerText:
      "Panie Boże, autorze małżeństwa, który na początku stworzyłeś mężczyznę i kobietę na swój obraz, błagam Cię za (wymień intencję). Udziel nam daru miłości cierpliwej, służebnej, niezazdrosnej (1 Kor 13). Udziel nam wierności, cierpliwości, szczodrobliwości, i otwartości na dzieci, jakie nam ześlesz. Święty Józefie i Święta Maryjo, módlcie się za nami. Amen.",
    instructions:
      "Modlitwa może być odmawiana w małżeństwie (każdą noc przed snem, na głos lub w cichym wspólnym), indywidualnie, lub w rodzinie. Dla małżeństw w kryzysie: Msza święta o pojednanie, konsultacja z księdzem lub terapeutą katolickim, nowenna do Świętej Rodziny, rekolekcje Małżeństw Worldwide.",
    patronSaint: "Święta Rodzina · Święty Józef i Święta Maryja",
    feastDay: "Niedziela w Oktawie Bożego Narodzenia (Święta Rodzina)",
    source: "KEP + Vatican.va Polski (Familiaris Consortio 1981; Amoris Laetitia 2016) + Katechizm §§ 1601-1666. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-safe-travel",
    name: "Modlitwa o Bezpieczną Podróż",
    description:
      "Katolicka modlitwa o bezpieczną podróż jest bardzo starą i rozpowszechnioną praktyką dewocyjną — od średniowiecznych pielgrzymek do Santiago de Compostela do codziennych podróży samochodem dzisiejszych katolików. Święty Krzysztof, patron uniwersalny podróżujących, jest świętym wzywanym po prostu. Anioł Stróż osobisty jest również niewidzialnym towarzyszem w każdej podróży. W Polsce tradycja obejmuje błogosławieństwo samochodu 25 lipca (święty Krzysztof), medalik świętego Krzysztofa w samochodzie, oraz modlitwę przed podróżą.",
    prayerText:
      "Panie Boże, Ojcze wszechmogący, który czuwasz nad swoimi dziećmi w drodze, powierzam się Twojej opiece podczas tej podróży. Oddal ode mnie niebezpieczeństwa ciała, wypadki, awarie mechaniczne, nieostrożnych kierowców, zwierzęta na drodze, niepogodę. Święty Krzysztofie, módl się za mną. Amen.",
    instructions:
      "Odmawiaj przed każdą podróżą: przy wejściu do pojazdu; ze Znakiem Krzyża; z wzmianką o osobie, celu i powodzie podróży; z odnowieniem po długich przerwach. Dla długich podróży: spowiedź sakramentalna przed wyjazdem; Msza pożegnalna; błogosławieństwo pojazdu; Psalm 91 i Różaniec podczas podróży.",
    patronSaint: "Święty Krzysztof · Anioł Stróż · Święty Rafał",
    feastDay: "25 lipca",
    source: "KEP + Vatican.va Polski + polska tradycja błogosławieństwa pojazdów + Psalm 91. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-serenity",
    name: "Modlitwa o Pogodę Ducha (Serenity Prayer)",
    description:
      "Modlitwa o Pogodę Ducha — «Boże, użycz mi pogody ducha, abym przyjmował to, czego nie mogę zmienić; odwagi, abym zmieniał to, co mogę zmienić; i mądrości, abym odróżniał jedno od drugiego» — jest jedną z najbardziej powszechnie rozpowszechnionych modlitw chrześcijańskich XX wieku. Przypisywana protestanckiemu teologowi Reinholdowi Niebuhrowi (1934), została przyjęta przez Anonimowych Alkoholików w latach 40. Modlitwa nie jest wyłącznie katolicka — jest genuinie ekumeniczna — ale Kościół katolicki włączył ją z naturalnością, ponieważ zbiega się z klasyczną duchowością «zdania się na Bożą Opatrzność» (Jean-Pierre de Caussade).",
    prayerText:
      "Boże, użycz mi pogody ducha, abym przyjmował to, czego nie mogę zmienić; odwagi, abym zmieniał to, co mogę zmienić; i mądrości, abym odróżniał jedno od drugiego. Żyjąc jeden dzień na raz, ciesząc się jednym momentem na raz, przyjmując trudności jako ścieżkę do pokoju; biorąc, jak to czynił Jezus, ten świat grzechu takim, jaki jest, a nie takim, jakim chciałbym, aby był; ufając, że uczynisz dobrze wszystkie rzeczy, jeśli oddam się Twojej woli. Amen.",
    instructions:
      "Odmawiaj: jako codzienną modlitwę poranną, szczególnie dla programów odzyskiwania (Anonimowi Alkoholicy w Polsce); w momentach intensywnego niepokoju; na spotkaniach grup dwunastu kroków; w momentach utraty lub kryzysu. Forma krótka (pierwsze trzy linie) jest najbardziej znana i łatwo zapamiętywana.",
    patronSaint: "Chrystus, Książę Pokoju",
    feastDay: "Ostatnia Niedziela Okresu Zwykłego (Chrystus Król)",
    source: "KEP + Reinhold Niebuhr (1934) + AA Polska + tradycja katolicka zdania się (Jean-Pierre de Caussade). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-st-francis",
    name: "Modlitwa Przypisywana świętemu Franciszkowi (Panie, uczyń mnie narzędziem Twego pokoju)",
    description:
      "Modlitwa Przypisywana świętemu Franciszkowi — bardziej znana jako «Panie, uczyń mnie narzędziem Twego pokoju» — jest jedną z najsłynniejszych chrześcijańskich modlitw XX wieku. Pomimo tradycyjnego przypisania świętemu Franciszkowi z Asyżu, konkretna kompozycja nie pojawia się w znanych pismach świętego; jej obecna forma została opublikowana po raz pierwszy w francuskim katolickim periodyku La Clochette w 1912. Od tamtego czasu jest recytowana przez Matkę Teresę, świętego Jana Pawła II, papieża Franciszka i miliony chrześcijan. Modlitwa wyraża duchowość franciszkańską: chrześcijanin ofiaruje się jako mediator miłości Boga światu zranionemu. Papież Franciszek wybrał imię Franciszek częściowo z powodu tej duchowości.",
    prayerText:
      "O Panie, uczyń mnie narzędziem Twego pokoju, abym wnosił miłość tam, gdzie panuje nienawiść; przebaczenie tam, gdzie panuje obraza; jedność tam, gdzie panuje zwątpienie; wiarę tam, gdzie panuje wątpienie; prawdę tam, gdzie panuje błąd; nadzieję tam, gdzie panuje rozpacz; radość tam, gdzie panuje smutek; światło tam, gdzie panuje ciemność. O Mistrzu, spraw, abym nie tyle szukał pocieszenia, ile pocieszał; nie tyle bycia zrozumianym, ile rozumienia; nie tyle bycia kochanym, ile kochania. Albowiem dając — otrzymujemy, zapominając o sobie — znajdujemy, przebaczając — otrzymujemy przebaczenie, umierając — rodzimy się dla życia wiecznego. Amen.",
    instructions:
      "Modlitwa może być odmawiana: jako codzienna modlitwa, idealnie rano; przed trudną rozmową, mediacją lub napiętym spotkaniem; po otrzymaniu obrazy, jako wyraźny akt przebaczenia. Dla franciszkanów świeckich w Polsce: błogosławieństwo zwierząt 4 października.",
    patronSaint: "Święty Franciszek z Asyżu",
    feastDay: "4 października",
    source: "KEP + Vatican.va Polski + La Clochette (1912) + tradycja franciszkańska w Polsce. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "psalm-23",
    name: "Psalm 23 (Pan jest moim pasterzem)",
    description:
      "Psalm 23 — «Pan jest moim pasterzem, niczego mi nie braknie» — jest jednym z najukochańszych psalmów Pisma Świętego, przypisywanym królowi Dawidowi. Jego centralny obraz — Pana, który pasie swój lud jak pasterz pasie owce, prowadząc je na zielone pastwiska, do spokojnych wód, i chroniąc je «nawet gdy idą doliną ciemną» — uchwytuje jeden z najgłębszych obrazów teologii biblijnej. Sam Chrystus zastosował do siebie obraz Dobrego Pasterza (J 10,11). Psalm jest tradycyjnie odmawiany w chwilach żałoby (katolickie pogrzeby prawie zawsze go zawierają), w trudnościach lub strachu (przejście «doliny ciemnej»), na łożu śmierci, i jako codzienne wyznanie ufności.",
    prayerText:
      "Pan jest moim pasterzem, nie brak mi niczego. Pozwala mi leżeć na zielonych pastwiskach. Prowadzi mnie nad wody, gdzie mogę odpocząć: orzeźwia moją duszę. Wiedzie mnie po właściwych ścieżkach przez wzgląd na swoje imię. Chociażbym przechodził ciemną doliną, zła się nie ulęknę, bo Ty jesteś ze mną. Twój kij i Twoja laska są tym, co mnie pociesza. Stół dla mnie zastawiasz wobec mych przeciwników; namaszczasz mi głowę olejkiem, kielich mój pełny po brzegi. Dobroć i łaska pójdą w ślad za mną przez wszystkie dni mego życia i zamieszkam w domu Pana po najdłuższe czasy. (Psalm 23, tłumaczenie liturgiczne KEP)",
    instructions:
      "Może być odmawiany: jako codzienna modlitwa; w trudnościach lub strachu, powoli; przed pogrzebem; przy poważnie chorym; jako medytacja w Lectio Divina. Liturgia Godzin zawiera go w różnych miejscach. Zapamiętaj go; mieści się w jednej skupionej lekturze.",
    patronSaint: "Chrystus, Dobry Pasterz · Król Dawid",
    feastDay: "IV Niedziela Wielkanocna (Dobry Pasterz)",
    source: "KEP + Pismo Święte, tłumaczenie liturgiczne KEP + Liturgia Godzin + tradycja patrystyczna (Święty Augustyn). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "psalm-91",
    name: "Psalm 91 (Kto przebywa w pieczy Najwyższego)",
    description:
      "Psalm 91 — «Kto przebywa w pieczy Najwyższego, ten przebywa w cieniu Wszechmocnego» — jest wielkim biblijnym psalmem Bożej ochrony. Tradycja powiązała go tak silnie z walką z demonami i duchową ochroną, że jest odmawiany w każdą Kompletę w sobotę, i jest częścią tradycyjnego rytu egzorcyzmów. Psalm wypowiada najbardziej radykalne obietnice ochrony Boga nad tym, kto Mu ufa. Cytowany jest przez samego diabła w trzeciej pokusie Chrystusa (Mt 4,6). Tradycja katolicka odmawia go przed niebezpieczeństwami fizycznymi i duchowymi.",
    prayerText:
      "Kto przebywa w pieczy Najwyższego i w cieniu Wszechmocnego mieszka, mówi do Pana: «Ucieczko moja i Twierdzo, mój Boże, któremu ufam». Bo On sam cię wyzwoli z sideł myśliwego i od zgubnego słowa. Okryje cię swymi piórami, pod Jego skrzydłami znajdziesz schronienie. Nie ulękniesz się strachu nocnego ani strzały lecącej za dnia, ani zarazy, co idzie w mroku, ani moru, co niszczy w południe. Choć tysiąc padnie u twego boku, a dziesięć tysięcy po twojej prawicy, ciebie to nie spotka. Bo swoim Aniołom dał rozkaz o tobie, aby cię strzegli na wszystkich twych drogach. (Psalm 91, tłumaczenie liturgiczne KEP)",
    instructions:
      "Może być odmawiany: każdej nocy przed snem, jako tradycyjna modlitwa Komplety; przed długą lub niebezpieczną podróżą; w momentach strachu lub duchowego ataku; jako medytacja w czasie próby. Zapamiętaj. W rodzinnej duchowości modli się o dzieci, o chorych, o samotnych.",
    patronSaint: "Święty Michał Archanioł · Święci Aniołowie Stróżowie",
    feastDay: "29 września · 2 października",
    source: "KEP + Pismo Święte, tłumaczenie liturgiczne KEP + Liturgia Godzin (Komplety) + tradycja egzorcystyczna + Mt 4,6. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "rosary-for-healing",
    name: "Różaniec o Uzdrowienie",
    description:
      "Różaniec o Uzdrowienie jest katolicką praktyką odmawiania Świętego Różańca z konkretną intencją proszenia Maryi przez wstawiennictwo Chrystusa, Boskiego Lekarza, o fizyczne, emocjonalne lub duchowe uzdrowienie. Cuda maryjne uzdrowień w Lourdes, Fatimie i wielu innych sanktuariach zawsze były związane z Różańcem odmawianym z wiarą. Sam Różaniec nie jest talizmanem; jest kontemplacyjną medytacją centralnych tajemnic wiary w towarzystwie Maryi.",
    instructions:
      "Odmów cały Różaniec (pięć dziesiątek), idealnie z tajemnicami światła (włączając Wesele w Kanie, gdzie Chrystus dokonuje pierwszego cudu na prośbę Maryi). Dla długotrwałej choroby rozważ codzienny Różaniec przez całe leczenie. Struktura: Znak Krzyża i Skład Apostolski; Ojcze Nasz, trzy Zdrowaś Maryjo i Chwała Ojcu (prośby początkowe); pięć dziesiątek; Litania Loretańska, włączając «Uzdrowienie chorych, módl się za nami»; Salve Regina. Dla raka: pięć Ojcze Nasz po każdej dziesiątce przez wstawiennictwo świętego Peregryna. Łącz z sakramentami i odpowiedzialnym leczeniem medycznym.",
    patronSaint: "Maryja, Uzdrowienie Chorych · Chrystus, Boski Lekarz",
    feastDay: "7 października (Matka Boża Różańcowa)",
    source: "KEP + Vatican.va Polski (Rosarium Virginis Mariae, JPII 2002) + Marialis Cultus (Paweł VI 1974). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "seven-sorrows-rosary",
    name: "Koronka Siedmiu Boleści Maryi",
    description:
      "Koronka Siedmiu Boleści Maryi, zwana także Różańcem Serwickim, jest nabożeństwem maryjnym założonym przez Zakon Serwitów Maryi (Florencja, 1233). Rozważa Siedem Mieczy, które przebiły serce Maryi według proroctwa Symeona (Łk 2,35). Struktura: specjalna koronka siedmiu grup (jedno Ojcze Nasz i siedem Zdrowaś Maryjo na grupę) oraz trzy Zdrowaś Maryjo na końcu w intencji łez Maryi. Potwierdzona przez Benedykta XIII w 1727 i zatwierdzona przez Piusa IX w 1860. W Polsce — kraju maryjnym — koronka jest powszechnie znana, szczególnie w Wielkim Tygodniu.",
    instructions:
      "Struktura: (1) Znak Krzyża; (2) **1. Boleść**: proroctwo Symeona. Ojcze Nasz i siedem Zdrowaś Maryjo; (3) **2.**: ucieczka do Egiptu; (4) **3.**: zagubienie Dziecięcia Jezus; (5) **4.**: spotkanie z Jezusem na drodze krzyżowej; (6) **5.**: ukrzyżowanie; (7) **6.**: Pieta; (8) **7.**: pogrzeb; (9) trzy Zdrowaś Maryjo końcowe; (10) tradycyjna modlitwa Serwicka. Polska tradycja: odmawiać w piątki (dzień Męki), podczas Wielkiego Postu, w Wielki Piątek i Wielką Sobotę.",
    patronSaint: "Mater Dolorosa · Zakon Serwitów Maryi",
    feastDay: "15 września",
    source: "KEP + Vatican.va Polski + Zakon Serwitów Maryi (1233) + Benedykt XIII (1727) + Pius IX (1860). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "surrender-novena",
    name: "Nowenna Zaufania (Ks. Dolindo Ruotolo)",
    description:
      "Nowenna Zaufania została skomponowana przez sługę Bożego ks. Dolindo Ruotolo (1882-1970), neapolitańskiego kapłana. Ks. Dolindo otrzymał w modlitwie centralną jaculatorię — «Jezu, Ty się tym zajmij» — jako dyktat samego Chrystusa. Nowenna składa się z dziewięciu dni z unikalną strukturą: każdego dnia odmawia się dziesięć razy tę samą jaculatorię z rosnącą ufnością. Centralna idea jest radykalna: chrześcijanin musi całkowicie oddać rozwiązanie problemu Chrystusowi, nie wyprzedzając Bożej opatrzności. «Zamknij oczy duszy i powiedz mi: 'Jezu, Ty się tym zajmij', i miej pokój». W Polsce nowenna ma sławę szczególnie skutecznej dla zablokowanych sytuacji.",
    prayerText:
      "Jezu, Ty się tym zajmij.",
    instructions:
      "Odmawiaj nowenny przez dziewięć kolejnych dni. Każdego dnia jest inna jaculatoria, która wprowadza «Jezu, Ty się tym zajmij», następnie 10 razy. **Dzień 1**: «Dlaczego się niepokoisz i poruszasz? Pozostaw Mnie troskę o twoje sprawy». **Dzień 2**: «Synu, krzywdzisz i utrudniasz moje dzieło, gdy chcesz się sam zajmować». **Dzień 3**: «Rozważanie, niepokój, chcąc myśleć o konsekwencjach, jest przeciwne zdaniu się na mnie». **Dzień 4**: «Jesteś jak ślepy w tych sprawach». **Dzień 5**: «Zamknij oczy duszy i powiedz mi z całej duszy: 'Jezu, Ty się tym zajmij'». **Dzień 6**: «Wyrządzasz mi wielką szkodę, gdy zamiast się we mnie zdać, sam zaczynasz mi doradzać». **Dzień 7**: «Ileż rzeczy nie czynię, gdy dusza zwraca się do mnie!». **Dzień 8**: «Zamknij oczy i przejdź spokojnie». **Dzień 9**: «Dzieci moje, czyńcie trzy godziny święte».",
    patronSaint: "Chrystus Dziecięcy · Najświętsze Serce Jezusa",
    feastDay: "19 listopada (Ks. Dolindo, sługa Boży)",
    source: "KEP + Vatican.va Polski + Ks. Dolindo Ruotolo (1882-1970) + Archidiecezja Neapolu. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  // Locale-anchored dla pl (8 entries — pl ma już czestochowa i
  // maximilian-kolbe z poprzednich rund; brakuje akita, aparecida,
  // guadalupe, knock, la-vang, santo-nino, st-juan-diego, simbang-gabi)
  {
    prayerSlug: "novena-akita",
    name: "Nowenna do Matki Bożej z Akita",
    description:
      "Nabożeństwo do Matki Bożej z Akita czci objawienia maryjne siostrze Agnes Sasagawie w Akita w Japonii między 1973 a 1981 rokiem. Statua Madonny płakała 101 razy ludzkimi łzami między 1975 a 1981. Orędzia proszą o pokutę, modlitwę różańcową i konsekrację Niepokalanemu Sercu Maryi — w terminach jasno przywołujących Fatimę. Objawienia oficjalnie uznano za godne wiary w 1984 roku przez biskupa Niigaty z aprobatą ówczesnego kardynała Ratzingera (CDF). Akita jest pierwszą objawioną maryjną aproobowaną w Wschodniej Azji.",
    prayerText:
      "O słodka Matko z Akita, która swoimi ludzkimi łzami poruszyłaś serce swoich dzieci w Japonii, porusz także i moje. Uzyskaj mi łaskę szczerego nawrócenia i siłę do zadośćuczynienia za grzechy, które obrażają Najświętsze Serce Jezusa i Twoje. Proszę o łaskę, o którą z ufnością proszę (wymień intencję). Matko Boża z Akita, módl się za nami. Amen.",
    instructions:
      "Odmawiaj nowenny przez dziewięć kolejnych dni. Struktura: Znak Krzyża; tajemnica chwalebna Różańca; modlitwa; konsekracja Niepokalanemu Sercu; wymień intencję.",
    patronSaint: "Matka Boża z Akita",
    feastDay: "12 października (przybliżona)",
    source: "KEP + Vatican.va Polski + Aprobata biskupa John Shojiro Ito (Niigata, 1984) + CDF (kard. Ratzinger). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-aparecida",
    name: "Nowenna do Matki Bożej z Aparecidy",
    description:
      "Matka Boża z Aparecidy jest Patronką Brazylii od 1930 roku, gdy ją koronował kanonicznie święty Pius X. Nabożeństwo zrodziło się w 1717 roku, gdy trzej rybacy z rzeki Paraíba (Felipe Pedroso, Domingos García, João Alves) wyciągnęli z wody małą terakotową figurę Madonny Niepokalanego Poczęcia. Sanktuarium Narodowe w Aparecidzie w São Paulo jest drugim co do wielkości kościołem katolickim na świecie. W Polsce nabożeństwo jest praktykowane przez wspólnoty brazylijsko-polskie i przez diasporę polsko-brazylijską, szczególnie w Paranie.",
    prayerText:
      "O Matko Boża z Aparecidy, Królowo i Patronko Brazylii, która z wód Paraíby wybrałaś wyjść, aby objawić swoją matczyną opiekę nad swoim ludem, uzyskaj mi przez wstawiennictwo łaskę, o którą z ufnością proszę (wymień intencję). Zachowaj w wierze brazylijskie rodziny. Amen.",
    instructions:
      "Odmawiaj nowenny przez dziewięć kolejnych dni, od 4 do 11 października.",
    patronSaint: "Matka Boża z Aparecidy (Patronka Brazylii)",
    feastDay: "12 października",
    source: "KEP + Vatican.va Polski + Sanktuarium Narodowe Aparecidy (Brazylia) + tradycja trzech rybaków (1717). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-guadalupe",
    name: "Nowenna do Matki Bożej z Guadalupe",
    description:
      "Matka Boża z Guadalupe jest Patronką Ameryk, ogłoszoną przez świętego Piusa X w 1910. Objawienie miało miejsce między 9 a 12 grudnia 1531 roku na wzgórzu Tepeyac, niedaleko Miasta Meksyk, niedawno nawróconemu indianinowi Juanowi Diego Cuauhtlatoatzin. Maryja objawiła się ze skórą i rysami indiańskimi, ubrana w pas brzemiennej kobiety, wskazując na swoją macierzyńską bliskość z ludem rodzimym. Obraz Guadalupe milagrosamente odbił się na jego tilmie. W Polsce nabożeństwo jest praktykowane przez katolików polsko-meksykańskich i w ramach powszechnego maryjnego kultu.",
    prayerText:
      "O słodka Matko Boża z Guadalupe, Matko i Cesarzowo Ameryk, która objawiłaś się na wzgórzu Tepeyac w stroju indiańskiej brzemiennej kobiety, uzyskaj mi przez wstawiennictwo macierzyńskie łaskę, o którą z ufnością proszę (wymień intencję). Matko Boża z Guadalupe, módl się za nami. Amen.",
    instructions:
      "Odmawiaj nowenny przez dziewięć kolejnych dni, od 3 do 11 grudnia w przygotowaniu do święta 12 grudnia.",
    patronSaint: "Matka Boża z Guadalupe (Patronka Ameryk)",
    feastDay: "12 grudnia",
    source: "KEP + Vatican.va Polski (święty Pius X 1910; JPII kanonizacja Juana Diego 2002) + Nican Mopohua. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-knock",
    name: "Nowenna do Matki Bożej z Knock (Irlandia)",
    description:
      "Matka Boża z Knock jest jedną z najbardziej znanych nowoczesnych objawień maryjnych. Objawienie miało miejsce 21 sierpnia 1879 w Knock, w hrabstwie Mayo w Irlandii. Piętnastu świadków zobaczyło jednocześnie objawienie Maryi, świętego Józefa i świętego Jana Ewangelisty, wraz z Barankiem. Objawienie było całkowicie ciche i trwało około dwóch godzin pod ciągłym deszczem. Święty Jan Paweł II odwiedził Knock w 1979; Papież Franciszek w 2018. Nabożeństwo w Polsce jest praktykowane przez polską diasporę w Irlandii, która jest jedną z największych.",
    prayerText:
      "O słodka Matko Boża z Knock, Niepokalana Matko, która w ciszy objawiłaś się z Józefem i Janem przy Bożym Baranku, uzyskaj mi przez wstawiennictwo łaskę, o którą z ufnością proszę (wymień intencję). Matko Boża z Knock, módl się za nami. Amen.",
    instructions:
      "Odmawiaj nowenny przez dziewięć kolejnych dni, od 13 do 20 sierpnia. Włącz 15 minut cichej modlitwy każdego dnia.",
    patronSaint: "Matka Boża z Knock · Święty Józef · Święty Jan Ewangelista",
    feastDay: "21 sierpnia",
    source: "KEP + Vatican.va Polski (wizyta JPII w Knock, 1979) + Sanktuarium Narodowe Knock. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-la-vang",
    name: "Nowenna do Matki Bożej z La Vang (Wietnam)",
    description:
      "Matka Boża z La Vang jest głównym objawieniem maryjnym Wietnamu. Objawienie miało miejsce w 1798 roku podczas surowych prześladowań katolików wietnamskich. Maryja pojawiła się ubrana w tradycyjne wietnamskie áo dài, z Dzieciątkiem Jezus na rękach, i powiedziała im, aby się modlili, a ona ich ochroni. Bazylika La Vang została podniesiona do rangi Bazyliki Mniejszej przez Papieża Franciszka w 2017. W Polsce nabożeństwo jest praktykowane przez wietnamsko-polskie wspólnoty katolickie.",
    prayerText:
      "O Matko Boża z La Vang, słodka Matko, która przyszłaś pocieszyć swoje dzieci wietnamskie w najtwardszych prześladowaniach ubrana w tradycyjne áo dài, uzyskaj mi przez wstawiennictwo łaskę, o którą z ufnością proszę (wymień intencję). Amen.",
    instructions:
      "Odmawiaj nowenny przez dziewięć kolejnych dni.",
    patronSaint: "Matka Boża z La Vang",
    feastDay: "15 sierpnia (związana z Wniebowzięciem)",
    source: "KEP + Vatican.va + Wietnamska Konferencja Episkopatu + Papież Franciszek (podniesienie do Bazyliki Mniejszej 2017). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-santo-nino",
    name: "Nowenna do Świętego Niño z Cebu (Filipiny)",
    description:
      "Święty Niño z Cebu jest najstarszym i najbardziej czczonym obrazem religijnym katolickim Filipin. Mała drewniana figurka Dzieciątka Jezus, podarowana przez Ferdynanda Magellana królowej Juanie z Cebu podczas jej chrztu 14 kwietnia 1521 roku. Odnaleziona nietknięta 44 lata później (1565) przez hiszpańskich żołnierzy. Figurka zachowuje się w Bazylice Mniejszej Świętego Niño w Cebu. Święto główne to Sinulog, trzecia niedziela stycznia. W Polsce nabożeństwo jest praktykowane przez filipińsko-polskie wspólnoty.",
    prayerText:
      "O słodki Święty Niño z Cebu, Dzieciątko Jezus, które jesteś żywą katolicką obecnością na Filipinach od ponad pięciuset lat, uzyskaj mi przez wstawiennictwo łaskę, o którą z pokorną ufnością proszę (wymień intencję). Pit Señor, viva Señor Santo Niño. Amen.",
    instructions:
      "Odmawiaj nowenny przez dziewięć kolejnych dni przed trzecią niedzielą stycznia.",
    patronSaint: "Święty Niño z Cebu · Dzieciątko Jezus",
    feastDay: "Trzecia niedziela stycznia (Sinulog)",
    source: "KEP + Filipińska Konferencja Episkopatu + Bazylika Mniejsza Świętego Niño z Cebu. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-juan-diego",
    name: "Nowenna do świętego Juana Diego",
    description:
      "Święty Juan Diego Cuauhtlatoatzin (1474-1548) jest indianinem, któremu Najświętsza Maryja Panna objawiła się na Tepeyac między 9 a 12 grudnia 1531 roku, gdzie objawiła się jako Matka Boża z Guadalupe. Ochrzczony przez franciszkanów przed 1525 rokiem, wdowiec od 1529. Jest on główną postacią ludzką nawrócenia Meksyku i całej hiszpańskiej Ameryki do katolicyzmu. Obraz Guadalupe milagrosamente odbił się na jego tilmie. Kanonizowany przez świętego Jana Pawła II w Bazylice Guadalupe w Miasto Meksyku 31 lipca 2002 podczas jego ostatniej wizyty pasterskiej.",
    prayerText:
      "O pokorny święty Juanie Diego, indiański orle, którego Najświętsza Maryja Panna wybrała na nosiciela obrazu Guadalupe dla całego kontynentu Ameryk, uzyskaj mi przez wstawiennictwo łaskę, o którą z ufnością proszę (wymień intencję). Ty, który słyszałeś, jak Niebiańska Matka nazywa cię «mój najmniejszy synu», uzyskaj mi łaskę poczucia się także ja, w moich pokornych okolicznościach, ulubionym dzieckiem Matki Bożej. Amen.",
    instructions:
      "Odmawiaj nowenny przez dziewięć kolejnych dni, od 30 listopada do 8 grudnia w przygotowaniu do święta Guadalupe (12 grudnia).",
    patronSaint: "Święty Juan Diego Cuauhtlatoatzin",
    feastDay: "9 grudnia",
    source: "KEP + Vatican.va Polski (święty Jan Paweł II, kanonizacja w Bazylice Guadalupe, 31 lipca 2002) + Nican Mopohua. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "simbang-gabi",
    name: "Simbang Gabi (Filipińska Pasterka)",
    description:
      "Simbang Gabi — dosłownie «Nocna Msza» w filipińskim — to seria dziewięciu poranek katolickich Mszy świętych na Filipinach od 16 do 24 grudnia w przygotowaniu do Bożego Narodzenia. Tradycja sięga XVII wieku, gdy augustianie i dominikanie hiszpańscy misjonarze sprawowali poranne Msze święte (o świcie, około 4:00 rano), aby rolnicy i rybacy filipińscy mogli uczestniczyć przed rozpoczęciem pracy. Popularna obietnica — ukończenie dziewięciu Mszy ciągłych zapewnia konkretną intencję — jest dewocyjna. Filipińska diaspora w Polsce, choć mała, świętuje Simbang Gabi w niektórych parafiach na zaproszenie filipińskich katolików.",
    instructions:
      "Uczestniczyć we Mszy w każdy z dziewięciu kolejnych dni od 16 do 24 grudnia. Na Filipinach Msza tradycyjnie odbywa się o świcie (4:00-5:00 rano); w diasporze normalnie wieczorem (18:00-20:00). Tradycje: (1) dzielić «bibingka» i «puto bumbong» po każdej Mszy; (2) wyspowiadać się przynajmniej raz w ciągu dziewięciu dni; (3) nowenna rodzinna do Dzieciątka Jezus każdej nocy; (4) zabieranie dzieci. Dla polskich katolików bez dostępu do parafii z Simbang Gabi, uczestnicz w codziennej Mszy świętej przez dziewięć dni przed Bożym Narodzeniem.",
    patronSaint: "Dzieciątko Jezus · Święta Rodzina",
    feastDay: "16 do 24 grudnia (rocznie)",
    source: "KEP + Filipińska Konferencja Episkopatu + tradycja augustyńsko-dominikańska na Filipinach (XVII w.) + filipińskie wspólnoty w polskiej diasporze. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "litany-of-humility",
    name: "Litania Pokory",
    description:
      "Litania Pokory to krótka, ale przenikliwa modlitwa skomponowana przez kardynała Rafaela Merry del Vala (1865-1930), Sekretarza Stanu papieża św. Piusa X przez cały pontyfikat. Hiszpan-Irlandczyk z pochodzenia, wykształcony w Rzymie, Merry del Val był człowiekiem zdyscyplinowanego życia wewnętrznego i niezwykłego samozapomnienia. Litania została znaleziona wśród jego prywatnych dewocyjnych papierów po jego śmierci i wydana przez jego sekretarza, stając się w ciągu ostatniego stulecia jedną z najczęściej odmawianych i udostępnianych nowoczesnych modlitw w katolickim świecie polskojęzycznym. Jej struktura jest dwuczęściowa: pierwsza prosi o uwolnienie od pragnień i lęków dotyczących własnej reputacji («Od pragnienia bycia szanowanym…» / «Od lęku przed poniżeniem…»), a druga zwraca serce ku dobru innych zamiast własnemu («Aby inni byli kochani bardziej niż ja…»). Jednolita odpowiedź — «wybaw mnie, Jezu» — i powtarzane wezwanie do łaski pragnienia dobra innych przekraczają abstrakcję typowego pobożnego modlenia się i precyzyjnie nazywają skłonności upadłego serca ludzkiego. Litania nie prosi o usunięcie tych pragnień (katolicka teologia ascetyczna uznaje je za głęboko zakorzenione w zranionej ludzkiej naturze), lecz o łaskę przedkładania reputacji Chrystusa nad własną, a reputacji innych nad naszą. Wywarła cichy, ale ogromny wpływ na nowoczesną katolicką duchowość — szczególnie wśród kapłanów, seminarzystów, osób konsekrowanych i katolików w rozeznawaniu powołania — ponieważ jej specyfika sięga tam, gdzie abstrakcyjna pobożna modlitwa nie dociera. To modlitwa, do której katolik wraca, gdy łapie się na odgrywaniu cnoty zamiast jej praktykowaniu, lub gdy uświadamia sobie, że dana skarga to w rzeczywistości zraniona pycha w przebraniu sprawiedliwości. Święta Matka Teresa z Kalkuty odmawiała tę litanię codziennie; wiele seminariów wprowadza ją do formacji kandydatów do kapłaństwa.",
    prayerText:
      "O Jezu, cichy i pokornego serca, wysłuchaj mnie.\n\nOd pragnienia bycia szanowanym, wybaw mnie, Jezu.\nOd pragnienia bycia kochanym, wybaw mnie, Jezu.\nOd pragnienia bycia wywyższanym, wybaw mnie, Jezu.\nOd pragnienia bycia czczonym, wybaw mnie, Jezu.\nOd pragnienia bycia chwalonym, wybaw mnie, Jezu.\nOd pragnienia bycia przedkładanym nad innych, wybaw mnie, Jezu.\nOd pragnienia bycia pytanym o radę, wybaw mnie, Jezu.\nOd pragnienia bycia uznawanym, wybaw mnie, Jezu.\n\nOd lęku przed poniżeniem, wybaw mnie, Jezu.\nOd lęku przed pogardą, wybaw mnie, Jezu.\nOd lęku przed naganą, wybaw mnie, Jezu.\nOd lęku przed oczernieniem, wybaw mnie, Jezu.\nOd lęku przed zapomnieniem, wybaw mnie, Jezu.\nOd lęku przed wyśmianiem, wybaw mnie, Jezu.\nOd lęku przed skrzywdzeniem, wybaw mnie, Jezu.\nOd lęku przed podejrzeniem, wybaw mnie, Jezu.\n\nAby inni byli kochani bardziej niż ja, Jezu, daj mi łaskę tego pragnienia.\nAby inni byli szanowani bardziej niż ja, Jezu, daj mi łaskę tego pragnienia.\nAby w opinii świata inni wzrastali, a ja malał, Jezu, daj mi łaskę tego pragnienia.\nAby inni byli wybierani, a ja odłożony na bok, Jezu, daj mi łaskę tego pragnienia.\nAby inni byli chwaleni, a ja niezauważany, Jezu, daj mi łaskę tego pragnienia.\nAby inni byli przedkładani nade mnie we wszystkim, Jezu, daj mi łaskę tego pragnienia.\nAby inni stali się bardziej święci niż ja, pod warunkiem że ja stanę się tak święty, jak powinienem, Jezu, daj mi łaskę tego pragnienia. Amen.",
    instructions:
      "Odmawiaj litanię powoli. Tekst jest krótki — poniżej trzystu słów — ale jego waga polega na nazywaniu każdego pragnienia i każdego lęku z osobna. Tradycyjna struktura: (1) Znak Krzyża; (2) przeczytaj na głos, powoli, wezwanie wstępne «O Jezu, cichy i pokornego serca, wysłuchaj mnie»; (3) odmawiaj długą sekwencję wezwań «Od pragnienia…», pozwalając sobie odczuć, które z nich nazywa cię tego konkretnego dnia — nie przemijaj tego, które trafia; (4) odmawiaj sekwencję «Od lęku…» w ten sam sposób; (5) odmawiaj końcowe prośby «Aby inni byli…» powoli, prosząc szczególnie o łaskę, którą każda nazywa. Wielu ludzi odmawia tę litanię, gdy łapie się na pysze — po trudnej rozmowie, po wysłaniu maila, którego nie powinno się wysyłać, po spotkaniu, w którym chciano dominować, po posłudze kościelnej, która stała się występem. Litania jest właściwie odmawiana: na początku rekolekcji, szczególnie ośmiodniowych rekolekcji ignacjańskich; przed sakramentalną Spowiedzią (jako część rachunku sumienia — litania nazywa wzorce pychy, które ukrywają się na widoku); podczas rozeznawania powołania do kapłaństwa, życia zakonnego lub małżeństwa; w Wielki Piątek lub podczas Triduum Paschalnego, gdy Kościół rozważa «kenozę» Chrystusa; w momentach publicznego upokorzenia lub odczuwanej porażki — gdy litania przestaje być aspiracyjna i staje się opisem miejsca, w którym Bóg faktycznie umieścił modlącego się. Biograf Merry del Vala zauważa, że kardynał odmawiał tę litanię codziennie po Mszy przez cały okres swojej posługi jako Sekretarz Stanu, w rzymskim biurze, gdzie pokusy próżności i politycznych manewrów były ciągłe. Modlitwa wpisuje się w szerszą katolicką tradycję ascetyczną, która uznaje pokorę za fundament wszystkich innych cnót — «po pierwsze pokora, po drugie pokora, po trzecie pokora» św. Augustyna oraz tomistyczne uznanie pychy za korzeń wszelkiego grzechu.",
    patronSaint: "Kardynał Rafael Merry del Val (autor)",
    feastDay: null,
    source: "KEP + Vatican.va polski + polska tradycja modlitewnika (XX-XXI w.). Retrieved 2026-05-19.",
    reviewedAt: new Date("2026-05-19"),
  },
];
