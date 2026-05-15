import type { PrayerTranslationSeed } from "./types";

/**
 * Filipino / Tagalog (fil) translations of PrayerType content.
 *
 * Authoring conventions:
 *  - **Source tier**: CBCP (Catholic Bishops' Conference of the
 *    Philippines), Vatican.va Tagalog, Pauline Books & Media,
 *    SVD / Salesian publications.
 *  - **Variant**: macro-tag `fil` — Filipino, the standardized
 *    national language based on Tagalog. "tl" (ethnic Tagalog)
 *    macro-falls to `fil` via the Accept-Language negotiator.
 *    Bisaya / Cebuano / Ilocano are NOT covered here.
 *  - **Catholic register**: Filipino Catholic devotional speech
 *    code-switches naturally with English — "novena", "rosary",
 *    "PrayerTrain", "chaplet" stay English. Over-translation reads
 *    stiff. "Ipanalangin natin para kay [name]" is the natural
 *    devotional formula.
 *  - **Brand names stay English**: `PrayerTrain`, `Surrender Novena`.
 *  - **`prayerText` left null** — canonical Tagalog prayer wording
 *    should be drawn from CBCP / Vatican.va sources in a separate
 *    focused pass. Helper falls back to English prayer text under
 *    the Tagalog description + instructions.
 */
export const filTranslations: PrayerTranslationSeed[] = [
  {
    prayerSlug: "novena-sacred-heart",
    name: "Nobena sa Banal na Puso ni Hesus",
    description:
      "Ang Nobena sa Banal na Puso ni Hesus ay isa sa pinakamamahal na debosyon sa Simbahang Katoliko, ipinanganak mula sa mga pagpapakita ni Hesus kay Santa Margarita Maria Alacoque sa Paray-le-Monial, France, noong 1673-1675. Sa mga pangitain na ito, ipinakita ni Kristo ang lalim ng Kanyang pag-ibig sa sangkatauhan, sinisimbolo ng Kanyang Pusong dinaluyan ng espada at nakoronahan ng mga tinik, at hiniling Niya na ang pag-ibig na ito ay parangalan sa pamamagitan ng debosyon sa Kanyang Banal na Puso. Ang nobena ay tumatakbo sa siyam na magkakasunod na araw ng panalangin (ang bilang na siyam ay nagpapaalala sa siyam na araw na ginugol ng mga apostol at ni Maria sa panalangin sa pagitan ng Pag-akyat at Pentekostes), at karaniwang inialay nang may pagtitiwala sa habag ni Kristo sa mga nagdurusa. Lalo itong angkop sa mga panahon ng karamdaman, paghihirap sa pamilya, espirituwal na pagkalumbay, o mga patuloy na intensyon na hindi pa nakatatanggap ng kasagutan. Ang Banal na Puso ay hindi lamang sagisag; ito ang totoong pisikal na puso ni Kristo, ganap na tao at ganap na Diyos, ang bukal ng Kanyang walang-hanggang pag-ibig. Inilarawan ng encyclical na Haurietis Aquas ni Papa Pio XII (1956) ang Banal na Puso bilang «trono ng habag» at pinagtibay ang sentral na lugar ng debosyong ito sa buhay ng Simbahan. Ang mga prayer warrior na nag-aalay ng nobenang ito ay sumasama sa mga siglo ng mga Katoliko na nagtiwala sa Sugatang Puso ng Tagapagligtas.",
    instructions:
      "Manalangin minsan sa isang araw sa loob ng siyam na magkakasunod na araw, halos sa parehong oras araw-araw. Pumili ng isang tahimik na lugar at simulan sa Tanda ng Krus. Ang tradisyonal na istraktura ay: (1) isang panimulang panalangin, kadalasang «O Sakratisimong Puso ni Hesus, sa Iyo ko ipinagkakatiwala ang lahat»; (2) ang teksto mismo ng nobena; (3) isang Ama Namin, Aba Ginoong Maria, at Luwalhati; (4) isang personal na intensyon na binabanggit nang malakas o sa katahimikan. Maraming nagdaragdag ng Litanya sa Banal na Puso sa huling araw, o nagdadasal ng nobena kasama ng debosyon sa Unang Biyernes — tumatanggap ng Banal na Komunyon sa siyam na sunud-sunod na Unang Biyernes gaya ng hiniling mismo ni Kristo kay Santa Margarita Maria. Ang nobena ay maaaring idasal sa anumang panahon ng taon, ngunit lalo itong angkop sa buwan ng Hunyo (ang Buwan ng Banal na Puso), sa mga araw na nauuna sa Kapistahan ng Banal na Puso (Biyernes pagkatapos ng Corpus Christi), o sa tuwing hinaharap ng isang tao ang mahirap na sandali. Kung makaligtaan ang isang araw, ang tradisyonal na payo ay magsimulang muli mula sa unang araw kaysa lumaktaw; ang disiplina ng sunud-sunod na panalangin ay bahagi mismo ng grasya ng debosyon. Ang ilan ay nagdarasal para sa isang partikular na tao bawat araw ng nobena; ang iba ay nag-aalay ng lahat ng siyam na araw para sa isang intensyon.",
    patronSaint: "Santa Margarita Maria Alacoque",
    feastDay: "Biyernes pagkatapos ng Corpus Christi",
    source:
      "CBCP-approved Tagalog prayer collections + Vatican.va Tagalog materials + traditional Filipino Catholic devotional sources for the Sacred Heart novena. Historical claims verified against Haurietis Aquas (Pius XII, 1956) and the published account of the apparitions at Paray-le-Monial. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-st-joseph",
    name: "Nobena kay San Jose",
    description:
      "Si San Jose, ang inaampong ama ni Hesus at malinis na asawa ng Mahal na Birheng Maria, ay isa sa pinakamamahal na tagapamagitan sa tradisyong Katoliko. Bagama't walang naitatala ang Banal na Kasulatan na salita mula sa kanya, ang kanyang katapatan ay walang pag-aalinlangan: pinangalagaan niya ang Banal na Pamilya sa pagtakas sa Egipto, sinuportahan sila sa pamamagitan ng paggawa ng kanyang mga kamay, at itinuro kay Hesus ang trabaho ng karpintero at ang paraan ng tapat na pagkalalaki. Hinirang siya ni Papa Pio IX bilang Patron ng Simbahang Pansandaigdigan noong 1870, at idineklara ni Papa Francisco ang panahong 2020-2021 bilang Taon ni San Jose sa pamamagitan ng apostolikong sulat na Patris Corde («Sa Pusong Pang-ama»). Ang nobenang ito ay umiinom mula sa mahabang tradisyong Katoliko ng pagkilala kay San Jose bilang patron ng mga ama, mga manggagawa, mga pamilya, mga usapin sa real estate, at ng mabuting kamatayan — ang apat na haligi ng kanyang ministeryo sa lupa. Tinatawagan siya lalo na sa mga sandali ng paghihirap sa pera, hindi pagkakaunawaan sa pamilya, mga problema sa trabaho, at sa pagdidiskimini ng bokasyon. Maraming Katoliko ang nakikipagsapi sa nobena sa mga araw na nauuna sa alinman sa kanyang mga kapistahan: ika-19 ng Marso (Dakilang Kapistahan ni San Jose, Asawa ng Mahal na Birhen) o ika-1 ng Mayo (San Jose Manggagawa, itinatag ni Papa Pio XII noong 1955 upang banalin ang gawaing pantao). Sumulat si Santa Teresa ng Avila: «Sa iba pang mga santo ay tila pinagkalooban ng Panginoon ng biyaya na tulungan tayo sa ilang partikular na pangangailangan; ngunit sa maluwalhating santong ito, alam ko sa karanasan, pinagkalooban Niya ng biyaya upang tulungan tayo sa lahat».",
    instructions:
      "Manalangin minsan sa isang araw sa loob ng siyam na magkakasunod na araw. Ang tradisyonal na istraktura: simulan sa Tanda ng Krus; idasal ang teksto ng nobena; tapusin sa isang Ama Namin, Aba Ginoong Maria, at Luwalhati; at banggitin ang iyong tiyak na intensyon. Ang ilang Katolikong pamilya ay nagdaragdag ng Litanya kay San Jose o pitong Ama Namin, Aba Ginoong Maria, at Luwalhati bilang pagpaparangal sa Pitong Hapis at Pitong Galak ni San Jose — isang tradisyonal na debosyon na nakakawing sa kanyang masaya at malungkot na mga karanasan sa buhay ng Banal na Pamilya. Para sa mga pamilyang nagdidiskimini ng malaking desisyon sa buhay (pagpapalit ng trabaho, paglilipat, pag-aasawa), kaugalian ang magsimula ng nobena siyam na araw bago kailangang gawin ang desisyon, hinihiling ang pagitan ni San Jose para sa kalinawan at sa biyaya na tanggapin ang kalooban ng Diyos. Ang nobena ay tradisyonal ding idinadasal sa buwan ng Marso (Buwan ni San Jose) o kasabay ng popular na praktika ng paglilibing ng estatwa ni San Jose kaugnay sa pagbebenta ng bahay — isang katutubong tradisyon na nagbibigay-diin sa tahimik na pagtitiwala sa halip na pamahiin. Manalangin man para sa pagdidiskimini ng bokasyon, pang-ekonomyang probisyon, paghilom ng pamilya, o mabuting kamatayan (isa sa apat na tradisyonal na hangarin ng debosyong ito), ang espiritu ay dapat ng tahimik at masipag na pagtitiwala — ang mismong disposisyon na ipinakita ni San Jose sa Banal na Kasulatan.",
    patronSaint: "San Jose",
    feastDay: "Marso 19 / Mayo 1",
    source:
      "Patris Corde (Francis, 2020) + CBCP materials in Tagalog + traditional Filipino Catholic devotional sources for the St. Joseph novena. The St. Teresa of Ávila quotation is from her autobiography (chapter 6). Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "holy-rosary",
    name: "Ang Banal na Rosaryo",
    description:
      "Ang Banal na Rosaryo ay ang sentral na debosyong Marian ng Simbahang Katoliko — isang panalanging kontemplatibo kung saan ang naniniwala ay nagninilay sa mga dakilang misteryo ng buhay, kamatayan, at muling pagkabuhay ni Kristo habang nagdarasal ng paulit-ulit na dekada ng Aba Ginoong Maria. Ang Rosaryo, ayon sa kanyang anyo ngayon, ay nahubog sa loob ng mga siglo; pinaniniwalaang ibinigay ng Mahal na Birheng Maria ang Rosaryo kay Santo Domingo noong 1208 bilang isang espirituwal na sandata laban sa heresyang Albigensian, at ang istraktura ng labinlimang misteryo ay kinodipika ni Papa San Pio V noong 1569. Noong 2002, idinagdag ni Papa San Juan Pablo II ang mga Maluwalhating Misteryo (Mga Misteryo ng Liwanag) sa kanyang apostolikong sulat na Rosarium Virginis Mariae, dinala ang kabuuan sa dalawampung misteryo na nakapangkat sa apat na hanay. Bawat dekada ay isang pagninilay: habang gumagalaw ang mga daliri sa mga butil at sinasambit ng mga labi ang Aba Ginoong Maria, nagtatambay ang isip sa isang sandali mula sa mga Ebanghelyo — ang Pagbabalita, ang Pagpapako sa Krus, ang Muling Pagkabuhay, ang Pagbabagong-anyo. Ang Rosaryo ay hindi walang-kabuluhang pag-uulit (Mateo 6:7) kundi isang paaralan ng pagninilay, na nagpapahintulot sa ritmo ng mga panalangin na palayain ang isip upang magnilay sa mga misteryo ng kaligtasan. Mula kay Papa Leon XIII (na ang labing-isang encyclical sa Rosaryo ay nananatiling mga magisterial reference) hanggang kay Francisco, hinikayat ng mga Papa ang mga tapat na magdasal ng Rosaryo araw-araw. Ito ang panalangin na inialay sa Lourdes, Fatima, at sa hindi mabilang na iba pang pagpapakita ng Birhen, at ang panalanging pinaka-karaniwang idinadasal ng mga Katolikong pamilya na nagtitipon sa tabi ng kama ng maysakit o ng libingan.",
    instructions:
      "Ang buong Rosaryo ay binubuo ng limang dekada, karaniwang idinadasal sa loob ng halos dalawampung minuto. Simulan sa Tanda ng Krus at ang Sumasampalataya sa krusipiho. Sa unang malaking butil, idasal ang Ama Namin; sa bawat isa sa tatlong maliliit na butil na sumusunod, idasal ang isang Aba Ginoong Maria (para sa pagdagdag ng tatlong teologikong birtud — pananampalataya, pag-asa, at pag-ibig); sa kasunod na malaking butil, idasal ang Luwalhati. Pagkatapos ay ipahayag ang unang misteryo nang malakas at magnilay sa kahulugan nito; idasal ang Ama Namin sa malaking butil, sampung Aba Ginoong Maria sa sampung maliliit na butil (isa kada butil) habang patuloy na nagninilay sa misteryo, pagkatapos ay Luwalhati at ang Panalangin sa Fatima («O Hesus ko, patawarin Mo kami sa aming mga kasalanan, ilayo Mo kami sa apoy ng impyerno…»). Ulitin nang apat pang dekada, na binabanggit ang bawat misteryo. Tapusin sa Aba Po, Santa Mariang Hari at ang panalangin ng Rosaryo. Ang apat na hanay ng mga misteryo ay tradisyonal na idinadasal: Misteryo ng Tuwa tuwing Lunes at Sabado (ang Pagbabalita, ang Pagdalaw, ang Pagsilang, ang Pag-aalay sa Templo, ang Pagkahanap sa Templo); Misteryo ng Hapis tuwing Martes at Biyernes (ang Paghihirap sa Hardin, ang Paghagupit, ang Pagkokorona ng mga Tinik, ang Pagpasan ng Krus, ang Pagpako sa Krus); Misteryo ng Luwalhati tuwing Miyerkules at Linggo (ang Muling Pagkabuhay, ang Pag-akyat sa Langit, ang Pentekostes, ang Pag-akyat ng Birhen, ang Pagkokorona kay Maria); Misteryo ng Liwanag tuwing Huwebes (ang Pagbibinyag, ang Kasalan sa Cana, ang Pagpapahayag ng Kaharian, ang Pagbabagong-anyo, ang Pag-tatatag ng Eukaristiya). Para sa pagsakop ng isang PrayerTrain, ang isang dekada — o kahit isang Aba Ginoong Maria na inialay nang may intensyon — ay isa ring tunay na alay ng Rosaryo.",
    patronSaint: "Mahal na Birhen ng Rosaryo",
    feastDay: "Oktubre 7",
    source:
      "Rosarium Virginis Mariae (St. John Paul II, 2002) + Leo XIII's eleven rosary encyclicals + CBCP-approved Tagalog Rosary prayer texts. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "chaplet-divine-mercy",
    name: "Koronilya ng Banal na Awa",
    description:
      "Ang Koronilya ng Banal na Awa ay ibinigay ni Hesus kay Santa Maria Faustina Kowalska, isang Polish na madre, sa isang serye ng mga pagpapahayag sa pagitan ng 1931 at 1938 na naitala sa kanyang Diary: Divine Mercy in My Soul. Ang koronilya ay isang makapangyarihang panalangin ng pamamagitan na inialay para sa pagbabalik-loob ng mga makasalanan, sa kaginhawaan ng mga naghihingalo, at sa habag ng Diyos sa buong mundo. Sinabi ni Hesus kay Faustina na sinumang magdarasal ng koronilyang ito ay tatanggap ng «malaking habag sa oras ng kamatayan» — at na siya'y lalo na nasisiyahan sa panalanging ito kapag idinasal sa 3:00 ng hapon, ang Oras ng Habag (ang oras ng Kanyang kamatayan sa Kalbaryo). Ang koronilya ay idinadasal gamit ang isang ordinaryong rosaryo, na ginagawang madaling makuha sa sinumang may rosaryo, at tumatagal ng halos sampung minuto. Ang debosyon sa Banal na Awa ay pinigil sa loob ng maraming taon, ngunit ang Papa San Juan Pablo II — na isang Polish at kapwa-bayan ni Santa Faustina — ay nakanonisa siya noong Abril 30, 2000, at itinatag ang Linggo ng Banal na Awa (ikalawang Linggo ng Pasko ng Pagkabuhay) bilang isang kapistahan para sa buong Simbahan. Ang Koronilya ng Banal na Awa ay naging isa sa pinaka-malawak na ipinagdarasal na debosyon sa modernong Simbahan, lalo na pinahahalagahan ng mga hospital chaplain, mga boluntaryo sa hospice, at ng mga nagdarasal para sa pagbabalik-loob ng mga mahal sa buhay. Ito ang pang-araw-araw na panalangin sa National Shrine of the Divine Mercy sa Stockbridge, Massachusetts, at sa Sanctuary of Divine Mercy sa Łagiewniki, Kraków — ang lugar kung saan namuhay, namatay, at ngayon ay nakahimlay si Faustina.",
    instructions:
      "Gamit ang isang ordinaryong limang-dekadang rosaryo, simulan sa Tanda ng Krus, isang Ama Namin, isang Aba Ginoong Maria, at ang Sumasampalataya sa krusipiho at panimulang butil. Sa bawat isa sa limang malalaking butil (kung saan kadalasang idinadasal ang Ama Namin), idasal: «Walang-hanggang Ama, inialay ko sa Iyo ang Katawan at Dugo, Kaluluwa at Pagka-Diyos ng Iyong pinakamamahal na Anak, ang aming Panginoong Hesukristo, bilang katubusan ng aming mga kasalanan at ng buong mundo». Sa bawat isa sa sampung maliliit na butil ng bawat dekada, idasal: «Alang-alang sa Kanyang mahapdi na Paghihirap, kaawaan Mo kami at ang buong mundo». Pagkatapos ng limang dekada, tapusin sa pamamagitan ng paulit-ulit na pagdarasal ng tatlong beses: «Banal na Diyos, Banal na Makapangyarihan, Banal na Walang-kamatayan, kaawaan Mo kami at ang buong mundo». Lalong makapangyarihan ang koronilya kapag idinasal sa 3:00 ng hapon (ang Oras ng Habag), sa tabi ng kama ng mga naghihingalo, sa siyam na araw bago ang Linggo ng Banal na Awa (ang Nobena ng Banal na Awa, nagsisimula sa Biyernes Santo), at sa mga sandali ng personal na pighati o takot. Maaari itong idasal nang tahimik, malakas, mag-isa, o nang kasama ng grupo. Maraming parokya ang lingguhang nagdadasal ng koronilya, kadalasan tuwing Biyernes bilang pag-alala sa Paghihirap ni Kristo. Ang mga Katoliko na nagdarasal para sa pagbabalik-loob o tahimik na kamatayan ng isang mahal sa buhay ay madalas nakikipag-sapi na magdasal ng koronilya araw-araw sa loob ng isang pangmatagalang panahon — isang buwan, ang tagal ng isang karamdaman, ang panahon bago ang isang malaking desisyon. Ang koronilya ay natural na umaalinsunod sa pagdalo sa Nobena ng Banal na Awa mula sa Biyernes Santo hanggang sa Linggo ng Banal na Awa.",
    patronSaint: "Santa Faustina Kowalska",
    feastDay: "Linggo ng Banal na Awa",
    source:
      "Diary: Divine Mercy in My Soul (St. Faustina Kowalska) + canonical chaplet text as approved by the Holy See after St. John Paul II's canonization of Faustina (April 30, 2000). CBCP-approved Tagalog renderings of the chaplet text. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "memorare",
    name: "Ang Memorare (Alalahanin)",
    description:
      "Ang Memorare ay isang maikli ngunit pambihirang makapangyarihang panalangin ng pagtitiwala sa pamamagitan ng Mahal na Birheng Maria. Kinukuha nito ang pangalan mula sa unang Latin na salita ng teksto, Memorare («Alalahanin»), at sa kasalukuyang anyo nito ay iniuugnay kay Pe. Claude Bernard, isang Pranses na pari noong ika-17 siglo na kilala bilang «ang Mahirap na Pari» dahil sa kanyang apostolado sa mga bilanggo at sa mga naghihingalo. Naging popular ang panalangin sa pamamagitan ng pamamahagi ni Pe. Bernard ng mahigit 200,000 leaflet sa Paris bago ang Rebolusyon, bagaman ang mga ugat ng debosyon ay mas matanda — malamang na sa isang mas mahabang panalangin na iniuugnay kay San Bernardo ng Clairvaux (1090-1153), ang dakilang abad Cistercian at Doktor ng Simbahan na ang debosyong Marian ay nag-hubog sa kabanalan ng Kanluran. Ang istraktura ng panalangin ay isang matiwasay na pagsamo: kinikilala nito ang pandaigdigang pagiging ina ni Maria («O Birhen ng mga birhen, aking Ina»), tumutukoy sa hindi nasisirang tradisyon ng kanyang pamamagitan («hindi pa naririnig kailanman na ang sinumang tumakbo sa iyong proteksiyon… ay iniwan na walang tulong»), at nagtatapos sa isang mapagkumbabang panalangin («sa iyong habag pakinggan at sagutin mo ako»). Pinatotohanan ng mga santo sa buong mga siglo ang kapangyarihan nito: si Mother Teresa ng Calcutta ay nagdarasal ng siyam na sunud-sunod na Memorare araw-araw — ang tinatawag niyang «flying novena» — kapag may kailangan siyang mabilisan. Ang Memorare ay ang Katolikong panalangin ng huling pag-asa, idinadasal sa mga sandali ng matinding pangangailangan, sa tabi ng kama ng mga naghihingalo, sa kapilya bago ang isang mahirap na pag-uusap, o ibinubulong habang ang magulang ay naghihintay ng balita mula sa silid ng ospital.",
    instructions:
      "Manalangin minsan nang may buong atensyon at debosyon, tinatawag sa isip ang tao at intensyon na inihaharap mo kay Maria. Sapat ang ikli ng Memorare upang maisaulo at maidasal kahit saan — sa kotse, sa paglalakad, bago matulog, sa mga sandali bago ang anumang mahirap na gawain. Para sa isang mas sustained na pamamagitan, magdasal ng siyam na sunud-sunod na Memorare (ito ang «flying novena» na pinaboran ni Mother Teresa para sa mga mabilisang intensyon). Ang ilang tradisyon ay nagdaragdag ng maikling sandali ng katahimikan bago magdasal, binabanggit ang intensyon nang malakas o sa puso. Maaari ring isama ang panalangin bilang panghuling panalangin sa pagtatapos ng mas mahabang Rosaryo o nobena, sinusuhulan ang pagsamo ng matiwasay na pagtitiwala sa pag-ibig ng ina ni Maria. Madalas idinadasal ng mga Katolikong pamilya ang Memorare sa tabi ng kama ng isang malubhang maysakit, sa balita ng isang mahirap na diagnosis, o sa panahon ng panganganak. Dahil maikli ang panalangin at ang mga salita ay mga sinaunang at minamahal, naging isang uri ng espirituwal na tugon sa emergency — isang panalangin na natural na lumalapit sa mga labi kapag wala nang ibang salita. Maaaring turuan ang mga bata ng panalangin sa abot ng kanilang makakaya na maisaulo ito; isa ito sa mga pinaka-angkop na panalangin upang ituro sa isang bata bilang isang «unang panalangin ng kaguluhan». Ang orihinal na Latin ay paminsan-minsan pa rin idinadasal ng mga nais sa mga tradisyonal na anyo: «Memorare, O piissima Virgo Maria, non esse auditum a saeculo…»",
    patronSaint: "San Bernardo ng Clairvaux",
    feastDay: null,
    source:
      "CBCP-approved Tagalog devotional text of the Memorare + traditional Filipino Catholic prayer books. Historical attribution to Fr. Claude Bernard verified against the Catholic Encyclopedia. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },

  // ─── Round 2: 6 more prayers from PR #71 ────────────────────
  {
    prayerSlug: "novena-st-jude",
    name: "Nobena kay San Judas Tadeo",
    description:
      "Si San Judas Tadeo, tinatawag na Apostol ng Pag-asa, ay isa sa Labindalawang Apostol at kamag-anak ng Panginoon. Siya'y binanggit sa mga Ebanghelyo bilang isa sa mga apostol (Lucas 6:16) at siya ang may-akda ng maikling Liham ni Judas. Sa mga siglo, hinanap ng popular na debosyong Katoliko si San Judas bilang patron ng mga desperadong sitwasyon at imposibleng kalagayan. Ang mga dahilang ibinigay ng tradisyon ay praktikal: dahil ang kanyang pangalan ay madaling maipagkamali kay Judas Iscariote, ang taksil, ang kanyang pamamagitan ay iniwasan ng karaniwang mga Kristiyano sa loob ng mga siglo — at kaya, sabi ng kasabihan, siya'y naghahangad tulungan ang sinumang lumalapit sa kanya sa tunay na pangangailangan. Ang modernong debosyon kay San Judas Tadeo ay pinasikat sa Estados Unidos ng mga padre Claretian, na nagtayo ng National Shrine of St. Jude sa Chicago noong 1929 sa kasagsagan ng Great Depression. Sa mga Filipinong-Amerikano, ang debosyon kay San Judas ay malakas. Ang nobenang ito ay angkop para sa karamdaman na may mahirap na prognosis, paghirap sa pananalapi, paghihiwalay sa pamilya na tila walang solusyon, kawalang-anak at anumang sitwasyon na nararamdaman ng isang tao na «lampas sa pag-asa».",
    instructions:
      "Manalangin minsan sa isang araw sa loob ng siyam na magkakasunod na araw. Ang tradisyonal na istraktura: simulan sa Tanda ng Krus; idasal ang teksto ng nobena kay San Judas; tapusin sa isang Ama Namin, Aba Ginoong Maria, at Luwalhati; banggitin ang iyong tiyak na intensyon. Ang nobena ay maaaring idasal sa anumang panahon ng taon, ngunit lalo itong angkop sa siyam na araw na nauuna sa kapistahan ni San Judas (Oktubre 28). Isang tradisyonal na karagdagang gawain ay magpasya, kapag pinakinggan ang panalangin, na pasalamatan sa publiko si San Judas.",
    patronSaint: "San Judas Tadeo",
    feastDay: "Oktubre 28",
    source: "CBCP Tagalog + Claretian National Shrine (Chicago, 1929). Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-divine-mercy",
    name: "Nobena sa Banal na Awa",
    description:
      "Ang Nobena sa Banal na Awa ay ibinigay ni Hesus kay Santa Maria Faustina Kowalska, Polish na madre, sa isang serye ng mga paghahayag na naitala sa kanyang Diary: Divine Mercy in My Soul. Ang Papa San Juan Pablo II ay nakanonisa siya noong Abril 30, 2000 at nagtatag ng Linggo ng Banal na Awa bilang kapistahan para sa buong Simbahan. Nagsisimula ang nobena sa Biyernes Santo at nagtatapos sa bisperas ng Linggo ng Banal na Awa. Bawat isa sa siyam na araw ay nagdadala ng iba't ibang kategorya ng mga kaluluwa sa harap ng trono ng awa.",
    instructions:
      "Manalangin minsan sa isang araw sa loob ng siyam na magkakasunod na araw, tradisyonal na nagsisimula sa Biyernes Santo. Bawat araw ay may natatanging intensyon at pambungad na panalangin. Pagkatapos ng pagbubukas, nagtatapos ang panalangin sa Koronilya ng Banal na Awa. Ang buong nobena ay tumatagal ng halos labinglimang minuto bawat araw.",
    patronSaint: "Santa Maria Faustina Kowalska",
    feastDay: "Linggo ng Banal na Awa",
    source: "Diary: Divine Mercy in My Soul (St. Faustina) + CBCP Tagalog. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-our-lady-perpetual-help",
    name: "Nobena sa Ina ng Laging Saklolo",
    description:
      "Ang Ina ng Laging Saklolo (Our Lady of Perpetual Help) ay isa sa pinakamamahal na pamagat na Marian sa Simbahang Katoliko. Ang debosyon ay nakatuon sa isang Byzantine icon mula sa ika-15 siglo na nagpapakita kay Hesukristo Bata na hawak sa mga bisig ni Maria habang lumalapit ang mga arkanghel na sina Miguel at Gabriel, bawat isa ay may dala-dalang mga kasangkapan ng Pagdurusa. Ipinagkatiwala ni Papa Pius IX ang icon sa mga Redemptorist fathers noong 1866. Sa Pilipinas, ang debosyon ay napaka-malakas, partikular sa pamamagitan ng mga Redemptorist parishes; ang Baclaran Church (National Shrine of Our Mother of Perpetual Help) sa Parañaque ay isa sa pinakamalaking Marian shrine sa Asia at host sa lingguhang Wednesday novena na dinaluhan ng libu-libo.",
    instructions:
      "Manalangin minsan sa isang araw sa loob ng siyam na magkakasunod na araw. Sa Pilipinas, ang Wednesday Perpetual Help novena ay ginaganap sa libu-libong parokyang Katoliko, lalo na sa Baclaran. Ang tradisyonal na istraktura: (1) Tanda ng Krus; (2) Idasal ang panalangin ng nobena; (3) Tapusin sa tatlong Aba Ginoong Maria at Aba Po Santa Mariang Hari; (4) Banggitin ang iyong intensyon.",
    patronSaint: "Ina ng Laging Saklolo",
    feastDay: "Hunyo 27",
    source: "Redemptorist tradition + Baclaran Church (Parañaque) + Pius IX 1866 entrustment. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "litany-sacred-heart",
    name: "Litanya sa Banal na Puso ni Hesus",
    description:
      "Ang Litanya sa Banal na Puso ni Hesus ay isa sa anim na litanyang inaprobahan ng Holy See para sa pampublikong liturgical use. Binuo noong 1718 ni Sister Jeanne Madeleine Joly. Ibinigay ni Papa Leo XIII ang pormal na pag-apruba noong Abril 2, 1899 — sa parehong taon na inilaan niya ang buong sangkatauhan sa Banal na Puso sa kanyang encyclical na Annum Sacrum. Ang litanya ay binubuo ng tatlumpu't tatlong pagtawag sa Puso ni Kristo sa ilalim ng iba't ibang pamagat. Sa bawat pagtawag ay sinasagot ng «Maawa Ka sa amin».",
    instructions:
      "Ang litanya ay idinadasal nang responsorial. Sinasambit ng isang lider ang bawat pagtawag at ang sama-samang komunidad ay sumasagot. Sumusunod ang tatlumpu't tatlong pagtawag sa Puso ni Hesus, bawat isa ay may sagot na «Maawa Ka sa amin». Angkop na idinadasal: sa mga Unang Biyernes; sa buwan ng Hunyo; sa Nobena sa Banal na Puso.",
    patronSaint: "Banal na Puso ni Hesus",
    feastDay: "Biyernes pagkatapos ng Corpus Christi",
    source: "Annum Sacrum (Leo XIII, 1899) + CBCP Tagalog. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "litany-blessed-virgin",
    name: "Litanya ng Mahal na Birhen (Litanya ng Loreto)",
    description:
      "Ang Litanya ng Mahal na Birhen — kilala sa tradisyon bilang Litanya ng Loreto — ay ang pinaka-matanda at pinaka-mahal na Marian litany ng Latin Church. Pormal na inaprobahan ni Papa Sixtus V noong 1587. Sa loob ng mga siglo, ang sumunod na mga Papa ay nagdagdag ng mga pagtawag. Pinaka-bagong, idinagdag ni Papa Francisco ang «Mother of Mercy», «Mother of Hope», at «Comfort of Migrants» noong 2020.",
    instructions:
      "Ang litanya ay idinadasal nang responsorial. Sinasambit ng isang lider ang bawat pamagat ni Maria at ang sama-samang komunidad ay sumasagot ng «Ipanalangin mo kami». Ang Litanya ng Loreto ay tradisyonal na idinadasal pagkatapos ng Banal na Rosaryo; sa buwan ng Mayo at Oktubre.",
    patronSaint: "Mahal na Birhen Maria",
    feastDay: null,
    source: "Sixtus V 1587 approval + papal additions through Francis 2020 + CBCP Tagalog. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "prayer-conversion",
    name: "Panalangin para sa Pagbabalik-loob ng Isang Mahal sa Buhay",
    description:
      "Ang Katolikong panalangin para sa pagbabalik-loob ng isang mahal sa buhay ay nakaugat sa isa sa mga dakilang pastoral na patotoo ng kasaysayan ng Kristiyano: ang mahaba at tapat na panalangin ni Santa Monica para sa kanyang anak na si San Agustin. Si Monica ay nanalangin para sa pagbabalik-loob ng kanyang anak sa loob ng mga taon, sa pamamagitan ng kanyang mga luha at ang payo na natanggap niya mula kay San Ambrosio ng Milan («Hindi posible na ang anak ng napakaraming luha ay mawala»). Binyagan si Agustin noong 387 sa edad na tatlumpu't tatlo; namatay si Monica di-nagtagal pagkatapos sa Ostia. Itinala ni Agustin ang kanyang pagtitiyaga sa kanyang Confessions (Aklat IX).",
    instructions:
      "Manalangin araw-araw, perpekto sa parehong oras at sa parehong postura (nakaluhod, sa harap ng krusipiho o larawan ng Banal na Puso). Banggitin ang pangalan ng tao sa malakas sa panalangin. Pagkatapos ng panalangin, mag-ukol ng isang minuto ng katahimikan upang panatilihin siya sa harap ng Banal na Puso. Maraming Katoliko ang sumusuporta sa panalanging ito sa pamamagitan ng: (1) pang-araw-araw na pag-aalay ng maliliit na sakripisyo; (2) regular na intensyon ng Misa para sa tao; (3) Nobena kay Santa Monica o San Agustin; (4) Koronilya ng Banal na Awa sa ika-3:00 ng hapon.",
    patronSaint: "Santa Monica",
    feastDay: "Agosto 27",
    source: "Augustine's Confessions Book IX + CBCP Tagalog pastoral resources. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },

  // ─── Locale-anchored devotions (Philippines) ───────────────
  {
    prayerSlug: "novena-santo-nino",
    name: "Nobena sa Santo Niño ng Cebu",
    description:
      "Ang Santo Niño de Cebú ay ang sentral na imahe ng Filipinong Katolikong identidad at ang pinaka-matandang Kristiyanong imahe sa Pilipinas. Ang kuwento ay kabilang sa sandali na ang Kristiyanismo ay pumasok sa kapuluan: noong 1521, dinala ng Portuges na explorer na si Ferdinand Magellan — naglalayag sa ilalim ng Spanish crown — ang isang maliit na kahoy na estatwa ng Batang Kristo at iniharap kay Reyna Juana, ang asawa ni Rajah Humabon, sa pagkakataon ng kanyang binyag noong Abril 14, 1521. Si Juana, ang unang Filipino Christian queen, ay tumanggap ng imahe nang may malalim na pagmamahal, at ang Magellan's chronicler na si Antonio Pigafetta ay nagtala ng kanyang mga luha sa regalo. Nang bumalik ang Spanish missionaries sa Cebu noong 1565 sa ilalim ni Miguel López de Legazpi — apatnapu't apat na taon pagkatapos ng kamatayan ni Magellan sa Battle of Mactan — natagpuan nila ang imahe na napreserba sa isang maliit na bahay, na pinarangalan pa rin ng lokal na mga tao na nagpanatili ng debosyon. Ang Basilica Minore del Santo Niño sa Cebu City ay itinayo sa paligid ng nabawing imahe at ito ang pinaka-matandang simbahan sa Pilipinas. Ang taunang Sinulog Festival — ginaganap sa ikatlong Linggo ng Enero sa Cebu City — ay ang pinakamalaking Katolikong selebrasyon sa Asia, naghahatid ng milyon-milyong peregrino at nagtatampok ng mga araw ng prusisyon, mga misa, at ang katangiang Sinulog dance («isang hakbang pasulong, dalawang hakbang paatras») kung saan gumagalaw ang mga mananayaw kasabay ng ritmo ng agos ng ilog.",
    instructions:
      "Manalangin minsan sa isang araw sa loob ng siyam na magkakasunod na araw. Ang nobena ay tradisyonal na idinadasal sa siyam na araw na nauuna sa Kapistahan ng Santo Niño (ang ikatlong Linggo ng Enero, ang pinaka-mahalagang araw ng Sinulog Festival sa Cebu City). Sa Filipino tradition, ang nobena ay madalas idinadasal kasama ng: (a) isang Santo Niño image na nakalantad sa bahay — maraming Filipino-Catholic na sambahayan ang nagpapanatili ng Santo Niño altar; (b) pagdalo sa parish-wide novena Masses (isang siyam-na-araw na Mass series); (c) pagkanta ng mga tradisyonal na Cebuano at Tagalog Santo Niño hymns («Bato Balani sa Gugma» — «Magnet of Love» — ang pinakamamahal); (d) para sa maraming devotee, paglahok sa Sinulog dance sa prusisyon. Ang nobena ay angkop para sa: pagpapagaling ng pamilya; proteksyon ng mga bata (ang Santo Niño ay patron ng mga bata); paghahanda para sa o pagbawi mula sa binyag; pagbabalik-loob ng nahihiwalay na mga miyembro ng pamilya; ligtas na biyahe; at anumang mahirap na sandali kung saan ang kaluluwa ay nangangailangan ng pagtitiwala ng bata na hinihingi ni Kristo (Mateo 18:3). Maraming Filipino-Catholic families ang nagdarasal ng maikling Santo Niño aspiration araw-araw — «Viva Santo Niño!» o «Pit Señor, Sinulog ka!» — bilang isang sandali ng masayang pagtitiwala.",
    patronSaint: "Santo Niño (Banal na Bata ng Cebu)",
    feastDay: "Ikatlong Linggo ng Enero (Sinulog Festival)",
    source: "Antonio Pigafetta's chronicle of Magellan voyage (1521) + Basilica Minore del Santo Niño Cebu City + CBCP Tagalog. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "simbang-gabi",
    name: "Simbang Gabi (Mga Madaling-Araw na Misa bago ang Pasko)",
    description:
      "Ang Simbang Gabi (Tagalog para sa «Night Mass») — tinatawag ding Misa de Gallo (Spanish, «Mass of the Rooster») sa mas matandang Filipino-Spanish na tradisyon — ay isang kakaibang Filipinong Katolikong Advent devotion na binubuo ng siyam na magkakasunod na madaling-araw na Misa na ipinagdiriwang mula Disyembre 16 hanggang Disyembre 24, kaagad na nauuna sa Araw ng Pasko. Ang pinagmulan ay matatagpuan sa maagang Spanish missionary period sa Pilipinas (huling bahagi ng ika-16 siglo): ang mga Spanish friars, na kinikilala na ang agricultural rhythms ng Filipino farming communities ay nangangahulugang ang mga manggagawa ay nasa kabukiran bago ang madaling-araw, ay nagbigay ng pahintulot mula sa Vatican upang ipagdiwang ang Advent Mass sa unang liwanag — sa pagitan ng 3:00 at 5:00 AM — upang ang mga manggagawa ay makadalo bago magsimula ang trabaho ng araw. Pormal na ibinigay ni Papa Sixtus V ang pribilehiyo ng pre-dawn Advent Mass sa Pilipinas noong 1587. Ang pattern ng nobena (siyam na araw, kahalintulad sa siyam na buwan ng pagbubuntis ni Maria kay Kristo) ay nakapanahan sa devotion, at lumitaw ang popular na tradisyon na ang pagkumpleto sa lahat ng siyam na Misa — nang walang nakaligtaan — ay nagkakamit ng isang espesyal na intensyon mula sa Batang Kristo. Ngayon, ang Simbang Gabi ay nananatiling pinakamamahal na Filipino Catholic Christmas tradition, ginagawa sa buong Pilipinas at sa pandaigdigang Filipino diaspora. Sa Estados Unidos, ang USCCB ay nagbigay ng pormal na liturgical recognition sa Simbang Gabi noong 1989; ang mga Misa ay ipinagdiriwang tuwing gabi sa mga Filipino-American na parokya mula Disyembre 15-23.",
    instructions:
      "Dumalo sa Banal na Misa sa bawat isa sa siyam na magkakasunod na araw, mula Disyembre 16 hanggang Disyembre 24. Sa Pilipinas, ang mga Misa ay ipinagdiriwang bago ang madaling-araw (tradisyonal na 4:00 AM); sa Filipino-American diaspora, ang mga Misa sa gabi sa Disyembre 15-23 (anticipated, na tumutupad sa parehong siyam-na-araw na nobena) ang pamantayan. Ang pattern: (1) Dumating sa parish church sa oras para sa Misa (madalas itong nangangahulugang gumising sa 3:00 AM sa Pilipinas, naglalakad sa madilim na kalye papunta sa parokya); (2) Tumanggap ng mga Sakramento — ang Confession sa panahon ng Advent ay bahagi ng paghahanda; (3) Pagkatapos ng Misa, magbahagi ng samahan at tradisyonal na Filipino Christmas foods (bibingka, puto bumbong, salabat) kasama ng parish community; (4) Dalhin ang intensyon ng araw nang tahimik sa buong umaga. Maraming Filipino ang nakikipag-sapi sa pananalangin para sa isang tiyak na intensyon sa lahat ng siyam na Misa, na may tradisyonal na paniniwala na ang pagkumpleto ng buong nobena ay nagkakamit ng isang espesyal na biyaya mula sa Batang Kristo. Para sa Filipino-American na mga pamilya, ang Simbang Gabi ay madalas ang pinaka-mahalagang catechetical link sa tinubuang bayan — natututunan ng mga bata ang mga rhythm, foods, at panalangin ng Filipino Catholic culture sa pamamagitan ng pagdalo kasama ng mga magulang at lolo't lola.",
    patronSaint: null,
    feastDay: "Disyembre 16-24 (siyam na araw bago ang Pasko)",
    source: "Sixtus V's 1587 papal permission for Philippine pre-dawn Advent Mass + USCCB 1989 liturgical recognition + CBCP Tagalog liturgical materials. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
];
