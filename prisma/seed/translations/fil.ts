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
    prayerText:
      "O Banalang-banal na Puso ni Hesus, bukal ng bawat biyaya, sinasamba Kita, iniibig Kita, at sa malalim na pagsisisi sa aking mga kasalanan ay inihahandog ko sa Iyo itong aking abang puso. Gawin Mo akong mapagpakumbaba, matiyaga, malinis, at lubos na masunurin sa Iyong kalooban. Ipagkaloob Mo, Mabuting Hesus, na ako ay mabuhay sa Iyo at para sa Iyo. Pangalagaan Mo ako sa gitna ng panganib. Aliwin Mo ako sa aking mga paghihirap. Bigyan Mo ako ng kalusugan ng katawan, tulong sa aking mga pang-temporal na pangangailangan, ng Iyong basbas sa lahat ng aking ginagawa, at ng biyaya ng banal na kamatayan. Amen.",
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
    prayerText:
      "O San Jose, na ang proteksyon ay napakadakila, napakalakas, napakabilis sa harap ng trono ng Diyos, sa Iyo inilalagay ko ang lahat ng aking interes at mithiin. O San Jose, tulungan Mo ako sa pamamagitan ng Iyong makapangyarihang pamamagitan at ipagkaloob sa akin mula sa Iyong banal na Anak ang lahat ng espirituwal na biyaya sa pamamagitan ni Hesukristong aming Panginoon; upang sa pagkakaroon dito sa lupa ng Iyong makalangit na kapangyarihan, ako'y makapag-alay ng aking pasasalamat at parangal sa pinakamapagmahal sa mga Ama. Amen.",
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
    prayerText:
      "Walang-hanggang Ama, iniaalay ko sa Iyo ang Katawan at Dugo, Kaluluwa at Pagka-Diyos ng Iyong kasintang Anak, ang aming Panginoong Hesukristo, bilang pagbabayad-puri sa aming mga kasalanan at sa kasalanan ng buong mundo. Alang-alang sa Kanyang mapighating Pagpapakasakit, kaawaan Mo kami at ang buong mundo.",
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
    prayerText:
      "Alalahanin Mo, O kaibig-ibig na Birheng Maria, na kailanman ay hindi pa narinig na ang sinumang sumalig sa Iyong proteksyon, humingi ng Iyong tulong, o nagpasakop sa Iyong pamamagitan ay napabayaan. Sa pagtitiwalang ito, ako'y lumalapit sa Iyo, O Birhen ng mga Birhen, aking Ina; sa Iyo ako'y pumupunta, sa harap Mo ako'y tumatayo, makasalanan at malungkot. O Ina ng Salitang Nagkatawang-tao, huwag Mong hamakin ang aking mga panalangin, kundi sa Iyong awa ay dinggin at sagutin Mo ako. Amen.",
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
    prayerText:
      "Banalang-banal na apostol, San Hudas Tadeo, tapat na lingkod at kaibigan ni Hesus, pandaigdigang pinararangalan at tinatawagan ka ng Simbahan bilang patron ng pag-asa. Maaari ba'y mamagitan ka para sa akin. Gamitin Mo ang partikular na pribilehiyong ibinigay sa Iyo upang magdala ng pag-asa, kaaliwan, at tulong sa mga lugar na pinakakailangan. Tulungan Mo ako sa aking malaking pangangailangang ito upang aking matanggap ang aliw at tulong ng langit habang nakikipagbuno ako sa aking mga pagsubok, partikular sa (banggitin ang intensyon). Pinupuri ko ang Diyos kasama Mo at sa lahat ng mga santo magpakailanman. Nangangako ako, mapalad na San Hudas, na laging maaalala ang malaking pabor na ito, laging parangalan Ka bilang aking natatangi at makapangyarihang patron, at masuyong hikayatin ang debosyon sa Iyo. Amen.",
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
    prayerText:
      "Naghingalo Ka, Jesus, ngunit ang bukal ng buhay ay umagos para sa mga kaluluwa, at ang karagatan ng awa ay nabuksan para sa buong mundo. O Bukal ng Buhay, hindi-masusukat na Awa ng Diyos, balutin Mo ang buong mundo at ibuhos Mo ang Iyong sarili sa amin. O Dugo at Tubig na umagos mula sa Puso ni Hesus bilang bukal ng awa para sa amin, nagtitiwala ako sa Iyo!",
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
    prayerText:
      "O Ina ng Laging Saklolo, ipagkaloob Mong palagi kong matatawagan ang Iyong pinaka-makapangyarihang pangalan, na ay tagapag-ingat ng mga buhay at kaligtasan ng mga naghihingalo. O pinakadalisay na Maria, o pinakamatamis na Maria, nawa ang Iyong pangalan ay palaging nasa aking mga labi mula ngayon. Huwag Kang magtagal, O Mapalad na Maria, na tulungan ako tuwing tinatawagan kita, sapagkat sa lahat ng aking mga pangangailangan, sa lahat ng aking mga tukso, hindi ako titigil sa pagtawag sa Iyo, palaging inuulit ang Iyong sagradong pangalan. O anong aliw, anong tamis, anong pagtitiwala, anong damdamin ang pumupuno sa aking kaluluwa kapag binibigkas ko ang Iyong sagradong pangalan o kahit lamang pag-iisipan Kita. Amen.",
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

  // ─── ROUND 3 (fil) ─────────────────────────────────────────
  {
    prayerSlug: "litany-st-joseph",
    name: "Litanya kay San Jose",
    description:
      "Ang Litanya kay San Jose ay isa sa anim na litanya na inaprubahan ng Banal na Luklukan para sa pampublikong liturgical na paggamit sa Latin Rite. Unti-unting binuo sa ika-17 at ika-18 na siglo habang lumalalim ang debosyon kay San Jose sa buong mundo ng Katoliko, natanggap ng litanya ang pormal na Magisterial approval mula kay Papa San Pio X noong 18 ng Marso 1909 — bisperas ng Kapistahan ni San Jose — para sa Esposo ni Maria, ama-amahan ni Hesus, at Patron ng Pandaigdigang Simbahan. Sumusunod ang istraktura sa pattern ng iba pang inaprubahan na Katolikong litanya: isang pagbubukas ng Kyrie, isang Trinitarian invocation, at saka isang mahabang sequence ng mga invocation na tinutukoy si San Jose sa iba't ibang titulo, bawat isa ay may sagot na «Ipanalangin mo kami»: «Tanyag na anak ni David», «Liwanag ng mga patriarka», «Esposo ng Ina ng Diyos», «Malinis na tagapag-alaga ng Birhen», «Ama-amahan ng Anak ng Diyos», «Masipag na tagapagtanggol ni Kristo», «Pinuno ng Banal na Pamilya», «Jose na pinakamatuwid», «Jose na pinakamalinis», «Jose na pinakamaingat», «Salamin ng pagtitiis», «Umiibig sa kahirapan», «Modelo ng mga manggagawa», «Kaluwalhatian ng buhay-tahanan», «Tagapag-alaga ng mga birhen», «Haligi ng mga pamilya», «Aliw ng mga nahihirapan», «Pag-asa ng mga maysakit», «Patron ng mga naghihingalo», «Sindak ng mga demonyo», «Tagapagtanggol ng Banal na Simbahan». Noong Mayo 2021, kaugnay ng Taon ni San Jose (Disyembre 2020 - Disyembre 2021) at ng kanyang apostolic letter na Patris Corde, pormal na idinagdag ni Papa Francisco ang pitong bagong invocation sa litanya, direktang hinugot mula sa wika ng Patris Corde: «Tagapag-alaga ng Manunubos», «Lingkod ni Kristo», «Ministro ng kaligtasan», «Suporta sa mga kahirapan», «Patron ng mga pinapatapon», «Patron ng mga nahihirapan», at «Patron ng mga mahihirap». Ang mga karagdagang ito ay sumasalamin sa partikular na pastoral framing ni Francisco kay San Jose bilang modelo para sa mga ama, mga manggagawa, at mga pinakaaba sa kontemporanyong mundo.",
    instructions:
      "Ang litanya ay dinarasal nang responsorial. Binibigkas ng leader ang bawat invocation («Jose na pinakamatuwid…») at sumasagot ang nagtipon-tipon ng «Ipanalangin mo kami» sa bawat isa. Ang pagbubukas ng Kyrie pattern at ang Trinitarian invocation ay gumagamit ng «Maawa Ka sa amin» bilang sagot; ang katawan ng litanya — ang mahabang sequence ng mga titulo — ay gumagamit ng «Ipanalangin mo kami». Nagtatapos ang litanya sa tatlong invocation sa Kordero ng Diyos (Agnus Dei), isang versicle-response pair na hinugot mula sa Genesis («Ginawa siyang panginoon ng kanyang sambahayan, at katiwala ng lahat niyang ari-arian»), at isang collect prayer kay San Jose. Tinatagal ng halos sampung minuto kapag binibigkas sa banayad na devotional pace. Ang Litanya kay San Jose ay tradisyonal na dinarasal: sa buong buwan ng Marso, ang Buwan ni San Jose; sa mga araw bago ang Dakilang Kapistahan ni San Jose (19 ng Marso) o ang Kapistahan ni San Jose Manggagawa (1 ng Mayo); sa pagtatapos ng isang Holy Hour o Eucharistic adoration; sa mga family context na humihingi ng proteksyon ni San Jose sa tahanan. Ang mga 2021 additions ay maaaring isama sa anumang tradisyonal na printed text sa pamamagitan ng pagpapasok ng pitong bagong invocation sa kanilang nararapat na lugar sa sequence ng litanya (karamihan sa mga published current version ay inilalakip ang mga ito); parehong inilathala ng Catholic Bishops' Conference of the Philippines (CBCP) at ng website ng Holy See ang updated full text. Maraming Catholic family ang nagdadasal ng litanya magkakasama tuwing Miyerkules ng gabi (ang tradisyonal na araw na inilaan kay San Jose sa lumang Catholic devotional calendar). Kapag dinarasal nang mag-isa, basahin lamang ang invocation at ang sagot nang malakas o tahimik.",
    patronSaint: "San Jose",
    feastDay: "19 ng Marso",
    source: "CBCP + Patris Corde (Papa Francisco, 8 Disyembre 2020) + Pope Pius X 1909 approval. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-holy-spirit",
    name: "Nobena sa Banal na Espiritu",
    description:
      "Ang Nobena sa Banal na Espiritu ay ang orihinal na nobena — ang pattern ng panalangin kung saan nagmula ang bawat iba pang siyam-na-araw na nobenang Katoliko. Ang biblical foundation nito ay ang aklat ng Mga Gawa ng mga Apostol: «Patuloy na nagtitipon sa pananalangin ang lahat ng mga ito, kasama ang ilang mga babae, at si Maria na ina ni Hesus, at ang kanyang mga kapatid» (Mga Gawa 1:14). Sa loob ng siyam na araw matapos ang Pag-akyat sa Langit ni Kristo, nanatili ang mga disipulo at ang Mahal na Birheng Maria sa upper room sa Jerusalem sa panalangin; sa ikasampung araw, ang Kapistahan ng Pentekostes (Mga Gawa 2:1-4), bumaba ang Banal na Espiritu sa kanila na may tunog ng malakas na hangin at mga dilang-apoy. Bawat Catholic novena pagkatapos ay kumukuha ng siyam-na-araw na pattern nito mula sa nag-iisang precedent na ito na ibinigay ng Espiritu. Tinatawag ng nobena ang pitong kaloob ng Banal na Espiritu na nakatala sa Isaias 11:2-3: karunungan, pang-unawa, payo, lakas, kaalaman, kabanalan, at takot sa Panginoon. Sa mga ito, idinaragdag ng Catholic tradition ang labindalawang bunga ng Banal na Espiritu na pinangalanan sa Sulat sa mga Taga-Galacia (5:22-23 sa Vulgate enumeration): pag-ibig, kagalakan, kapayapaan, pagtitiis, kabaitan, kabutihan, kabukasan ng loob, kahinahunan, katapatan, kalinisan, pagpipigil sa sarili, at kalinisang-puri. Ang tono ng nobena ay petitionary ngunit puno ng pagtitiwala — ang Espiritu ang regalo na ipinangako ni Hesus na ipapadala (Juan 14:16-17; 16:7-15), at nagdarasal ang Simbahan nang may pagtitiwala na ang Espiritung bumaba sa mga apostol ay patuloy na bumababa sa mga tapat. Ang nobena ay lalo na nararapat para sa pagdidiskreto ng bokasyon, ang pagpapahid sa mga maysakit, ang paghahanda ng mga tatanggap ng Sakramento (Kumpil, kasal, ordinasyon), at anumang sandali kapag nararamdaman ng isang kaluluwa na hindi niya makita ang kalinawan sa pamamagitan lamang ng sariling katwiran at kailangan ang inspirasyon ng Espiritu.",
    prayerText:
      "Halina, Espiritu Santo, punuin Mo ang mga puso ng Iyong mga tapat at pag-alabin Mo sa kanila ang apoy ng Iyong pag-ibig. Ipadala Mo ang Iyong Espiritu at sila ay lilikhain, at babaguhin Mo ang mukha ng lupa. O Diyos, na nagturo sa mga puso ng mga tapat sa pamamagitan ng liwanag ng Espiritu Santo, ipagkaloob Mong sa pamamagitan ng parehong Espiritu Santo, kami ay maging tunay na matalino at lagi naming tamasahin ang Kanyang aliw. Sa pamamagitan ni Kristong aming Panginoon. Amen.",
    instructions:
      "Magdasal isang beses sa isang araw sa loob ng siyam na magkakasunod na araw. Tradisyonal, dinarasal ang nobena sa pagitan ng Pag-akyat sa Langit (Ascension Thursday) at Linggo ng Pentekostes — ang orihinal na siyam na araw na patuloy na ipinagdadasal ng Simbahan mula sa mga apostol. (Sa mga diyosesis kung saan inililipat ang Ascension sa sumusunod na Linggo, nagsisimula ang nobena sa Biyernes pagkatapos ng Linggong iyon; tingnan ang lokal na liturgical calendar.) Maaari ring idasal ang nobena sa anumang panahon ng taon para sa pribadong intensyon. Ang tradisyonal na istraktura para sa bawat araw: (1) Magsimula sa Tanda ng Krus; (2) Bigkasin o awitin ang Veni Creator Spiritus («Halina, Espiritu Lumikha») o ang Veni Sancte Spiritus («Halina, Banal na Espiritu») — ang dalawang dakilang Latin sequence para sa Pentekostes; (3) Idasal ang panalangin ng nobena; (4) Magmuni-muni nang sandali sa isa sa pitong kaloob ng Espiritu (isa kada araw sa unang pitong araw; sa ikawalo at ikasiyam, sa labindalawang bunga at sa isang personal na intensyon); (5) Tapusin ng Ama Namin, Aba Ginoong Maria, at Luwalhati. Ang kabuuang tagal ay halos sampung minuto sa isang araw. Madalas na nagdadasal ang mga pamilyang may maliliit na anak ng mas maikling bersyon gamit lamang ang invocation na Halina, Banal na Espiritu at isang child-friendly explanation ng isang kaloob sa isang araw. Nararapat din ang nobena bago ang isang mahalagang desisyon, bago ang isang mahirap na pag-uusap, o bago ang anumang gawain kung saan ang tao ay nangangailangan ng payo, lakas, o karunungan nang higit sa kanyang likas na kakayahan.",
    patronSaint: null,
    feastDay: "Pentekostes",
    source: "CBCP + Mga Gawa 1:14, 2:1-4 + Vatican.va Tagalog liturgical sources. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-st-therese",
    name: "Nobena kay Santa Teresita ng Sanggol na Hesus",
    description:
      "Si Santa Teresita ng Sanggol na Hesus at ng Banal na Mukha — mas kilala bilang Teresa ng Lisieux o «ang Munting Bulaklak» — ay isang Discalced Carmelite nun na pumasok sa monasteryo sa Lisieux, Normandy, sa edad na labinlimang taon at namatay sa tuberculosis sa edad na dalawampu't apat (1873-1897). Ang kanyang espirituwal na autobiograpiya, Kasaysayan ng Isang Kaluluwa, ay inilathala ilang sandali matapos ang kanyang kamatayan at agad na naging isa sa mga pinakamababasang Katolikong aklat sa modernong panahon. Mula sa kawalang-kilala ng isang provincial cloister itinuro niya ang tinatawag niyang Munting Daan: pagtitiwala sa maawaing pag-ibig ng Diyos na ipinahayag sa pinakamaliliit na gawa ng pang-araw-araw na katapatan, sa halip na sa mga heroic external feat. «Gugugulin ko ang aking langit sa paggawa ng mabuti sa lupa», sikat niyang ipinangako, «pababagsakin ko ang ulan ng mga rosas». Ang tradisyon ng «ulan ng mga rosas» — ang paniniwalang ang mga intercession na sinasagot sa pamamagitan ni Santa Teresita ay madalas na sinasamahan ng isang hindi inaasahang rosas, literal o simboliko — ay humubog sa Catholic devotion sa kanya simula noon. Kinanonisa siya ni Papa Pio XI noong 1925, pinangalanan na Patroness of the Missions noong 1927 (kahit hindi siya umalis sa cloister), at ipinahayag bilang Doctor of the Church ni Papa San Juan Pablo II noong 1997 — isa sa apat na babae lamang na ganitong pinangalanan, kasama ang mga Santa Teresa ng Avila, Catalina ng Siena, at Hildegard ng Bingen. Ang kanyang doctrinal contribution ay ang teolohiya ng pagkabata: ang turo ng Ebanghelyo na ang isang tao ay dapat maging tulad ng isang maliit na bata upang makapasok sa Kaharian (Mateo 18:3) na binigyan ng matagalang, contemplative articulation. Nararapat ang nobena kay Santa Teresita para sa: pagdidiskreto ng relihiyosong o lay na bokasyon, paggaling mula sa sakit (ang kanyang sariling tuberculosis ay tiniis nang may malaking paghihirap), espirituwal na pagkatuyo, ang pagbabago ng malalayong mahal sa buhay (patuloy siyang nagdasal para kay Pranzini, isang hinatulang mamamatay-tao, bilang kanyang «unang anak»), at anumang sandali kapag nararamdaman ng isang kaluluwa ang sariling pagkamaliit sa harap ng isang malaking pangangailangan.",
    prayerText:
      "O Munting Teresita ng Sanggol na Hesus, mangyaring pumitas para sa akin ng isang rosas mula sa mga makalangit na hardin at ipadala ito sa akin bilang mensahe ng pag-ibig. O Munting Bulaklak ni Hesus, hilingin Mo sa Diyos ngayon na ipagkaloob ang mga pabor na inilalagay ko ngayon nang may tiwala sa Iyong mga kamay. (Banggitin ang intensyon.) Santa Teresita, tulungan Mo akong laging maniwala, gaya ng paniniwala Mo, sa dakilang pag-ibig ng Diyos para sa akin, upang aking magaya ang Iyong Munting Daan araw-araw. Amen.",
    instructions:
      "Magdasal isang beses sa isang araw sa loob ng siyam na magkakasunod na araw. Ang tradisyonal na istraktura: (1) Magsimula sa Tanda ng Krus; (2) Idasal ang panalangin ng nobena kay Santa Teresita (humihingi ng kanyang pagiging tagapamagitan at ng kanyang sikat na rosas); (3) Sabihin ang iyong intensyon nang tahimik o malakas; (4) Tapusin ng Ama Namin, Aba Ginoong Maria, at Luwalhati. Nararapat na idasal ang nobena sa siyam na araw bago ang kanyang kapistahan (1 ng Oktubre) o sa anumang panahon ng taon para sa pribadong intensyon. Maraming Katoliko ang nag-iingat ng isang maliit na larawan o relikya ni Santa Teresita sa tahanan o nagdadala ng isang rose-themed prayer card sa panahon ng nobena. Ang tradisyon ng «ulan ng mga rosas» ay eksaktong iyon — isang tradisyon, hindi isang magical guarantee. Ang isang rosas na natanggap sa panahon o pagkatapos ng nobena ay binabasa bilang isang personal na tanda na narinig ng santa ang panalangin at nakikipamagitan sa harapan ni Kristo; ang kawalan ng rosas ay hindi binabasa bilang kawalan ng pamamagitan. Ang puntong ito ay ang disposisyon: inanyayahan ng Munting Daan ni Teresita ang nagdarasal sa parehong childlike trust na kanyang inihalimbawa, na siya mismong biyaya na hinihiling. Nararapat din ang nobena bilang katuwang sa mga partikular na gawa ng maliit na katapatan sa loob ng siyam na araw — pagtitiis sa isang mahirap na miyembro ng pamilya, pagtanggap ng isang maliit na abala nang hindi nagrereklamo, pagpipigil ng isang matalas na salita, paggawa ng isang nakatagong gawa ng kabaitan araw-araw. Ang mga «munting daan» na ito ang naglalaman ng hinihiling ng nobena: hindi heroic na pagbabago, kundi ang daan ng maliliit na bagay na ginagawa nang may dakilang pag-ibig na itinuro at ipinamuhay ni Teresita.",
    patronSaint: "Santa Teresita ng Sanggol na Hesus",
    feastDay: "1 ng Oktubre",
    source: "CBCP + Kasaysayan ng Isang Kaluluwa + Papa San Juan Pablo II Divini Amoris Scientia (1997, deklarasyon bilang Doctor of the Church). Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-miraculous-medal",
    name: "Nobena sa Mahimalang Medalya",
    description:
      "Sa gabi ng Hulyo 18-19, 1830, sa kapilya ng Daughters of Charity sa Rue du Bac sa Paris, isang batang novice na nagngangalang Catherine Labouré ang ginising ng kanyang guardian angel at dinala sa kapilya para sa isang pribadong pagpapakita ng Mahal na Birheng Maria. Nakipag-usap si Maria sa kanya nang mahigit dalawang oras tungkol sa magulong kalagayan ng France at ng mas malawak na Simbahan. Sa pangalawang pagpapakita noong Nobyembre, nakita ni Catherine si Maria na nakatayo sa isang globo na may mga sinag ng liwanag na bumubuga mula sa kanyang mga kamay, napapaligiran ng isang frame na nakaukit ng mga salitang: «O Maria na ipinaglihi nang walang kasalanan, ipanalangin mo kami na sumasalig sa iyo!» Sa likod ng pangitain na ito ay isang cruciform M na may labindalawang bituin, isang puso ni Kristo na may koronang tinik, at isang puso ni Maria na tinutusok ng tabak. Iniutos ni Maria kay Catherine: «Magpagawa ng medalya ayon sa modelong ito. Ang mga magsusuot nito ay tatanggap ng dakilang biyaya, lalo na kung isuot nila ito sa kanilang leeg». Ginawa ang medalya noong 1832 nang may pag-apruba ng Arsobispo ng Paris. Sa loob ng limang taon ito ay napamahagi sa napakaraming bilang at sinamahan ng napakaraming naiulat na pamamagitan na pinalitan ng popular na Katolikong imahinasyon ang pangalan nito bilang «ang Mahimalang Medalya», isang pangalang sa kalaunan ay tinanggap ng Simbahan. Ang 1830 apparitions ay kapansin-pansin bilang isa sa mga pangunahing Marian events ng modernong panahon, mas matanda sa Lourdes (1858) ng dalawampu't walong taon at sa Fatima (1917) ng walumpu't pitong taon. Ang doktrina ng Immaculate Conception — sa puso ng central inscription ng medalya — ay pormal na idineklara ni Papa Pio IX noong 1854, dalawampu't apat na taon pagkatapos ng mga pangitain ni Catherine. Nanatili si Catherine Labouré sa kanyang convent sa Reuilly, nagtatrabaho kasama ang mga matatandang mahihirap, sa natitirang apatnapu't anim na taon ng kanyang buhay. Kinanonisa siya noong 1947 ni Papa Pio XII. Nararapat ang nobena sa Mahimalang Medalya para sa: sakit (lalo na sa mahirap na prognosis — nagsimula ang reputasyon ng medalya sa mga paggaling), pagbabago ng mga miyembro ng pamilya, proteksyon sa pagbubuntis (isang matagal nang Katolikong tradisyon na ipinipin ang medalya sa damit ng ina o dinadala ito sa panganganak), at anumang mahirap na sandali kapag ang isang kaluluwa ay naghahanap ng partikular na maternal na pamamagitan ni Maria sa pamamagitan ng partikular na tanda na ito.",
    prayerText:
      "O Imakuladang Birheng Maria, Ina ng aming Panginoong Hesus at aming Ina, puno ng pinaka-mabilis na pagtitiwala sa Iyong makapangyarihan at hindi-kailanmang-nabibigong pamamagitan, na napakadalas na ipinakita sa pamamagitan ng Mahimalang Medalya, kami na Iyong mga nagmamahal at nagtitiwalang mga anak ay nakikiusap sa Iyo na makamit para sa amin ang mga biyaya at pabor na hinihiling namin sa nobenang ito, kung mga ito ay nakapagpapakinabang sa aming walang-kamatayang mga kaluluwa at sa mga kaluluwang pinagdadasalan namin. (Banggitin ang intensyon.) Alam Mo, O Maria, kung gaano kadalas naging dambana ng Iyong Anak ang aming mga kaluluwa, ang Iyong Anak na napopoot sa kasamaan. Ipagkaloob Mo nga sa amin ang malalim na pagkapoot sa kasalanan at ang kalinisan ng puso na magkakabit sa amin sa Diyos lamang. Amen.",
    instructions:
      "Magdasal isang beses sa isang araw sa loob ng siyam na magkakasunod na araw. Ang tradisyonal na istraktura: (1) Magsimula sa Tanda ng Krus; (2) Idasal ang Memorare o tatlong Aba Ginoong Maria bilang panimulang Marian invocation; (3) Idasal ang panalangin ng nobena sa Immaculate Virgin sa pamamagitan ng Mahimalang Medalya; (4) Tapusin sa central inscription ng medalya bilang aspiration: «O Maria na ipinaglihi nang walang kasalanan, ipanalangin mo kami na sumasalig sa iyo!»; (5) Sabihin ang iyong partikular na intensyon. Kung maaari, suotin ang Mahimalang Medalya — pisikal — sa panahon ng nobena. Ang medalya ay hindi anting-anting; ang tradisyon ay ang pagsusuot nito ay nagpapahayag ng pagtitiwala sa pamamagitan ni Maria at ng pagkabukas ng nagsusuot sa biyaya. Ang mga Catholic chapel at shrine ay namamahagi ng Miraculous Medal nang libre. Maaaring idasal ang nobena sa anumang panahon ngunit lalo na nararapat sa mga araw bago ang Kapistahan ng Mahal na Birhen ng Mahimalang Medalya (27 ng Nobyembre) o ang Dakilang Kapistahan ng Immaculate Conception (8 ng Disyembre). Maraming Katoliko ang gumagamit din ng Mahimalang Medalya bilang tanda ng consecration sa Immaculate Heart of Mary — ipinapares ang nobena sa Total Consecration prayer ni San Maximilian Kolbe o ang mas mahabang 33-day preparation para sa Marian consecration (ang de Montfort tradition). Para sa mga pamilya na nagdadasal para sa isang wala o nahihirapang mahal sa buhay, isang tradisyonal na kasanayan ay ang pagdulot ng isang Miraculous Medal sa mga gamit ng mahal sa buhay — isang pitaka, isang bulsa ng amerikana, isang backpack — bilang isang maliit na tanda ng patuloy na maternal accompaniment.",
    patronSaint: "Santa Catherine Labouré",
    feastDay: "27 ng Nobyembre",
    source: "CBCP + Rue du Bac apparition narrative (1830) + Papa Pio XII canonization 1947. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "st-michael-prayer",
    name: "Panalangin kay San Miguel Arkanghel",
    description:
      "Binuo ng Papa Leon XIII ang Panalangin kay San Miguel Arkanghel noong 1886 matapos, ayon sa matagal nang naipatototohanang tradisyon, magkaroon ang Papa ng biglaang mistikal na karanasan habang nagdiriwang ng Misa — isang uri ng waking vision kung saan narinig niya ang isang colloquy sa pagitan ni Kristo at ni Satanas kung saan ipinagmamalaki ni Satanas na kaya niyang sirain ang Simbahan kung bibigyan ng sapat na oras at kapangyarihan. Nayanig sa kanyang nakita, binuo ni Leon XIII ang panalangin kay San Miguel sa parehong araw at iniutos na idagdag ito sa mga panalanging dinarasal ng pari at ng mga tapat sa pagtatapos ng bawat Low Mass sa buong unibersal na Simbahan. Ang kasanayang ito — ang «Leonine Prayers» pagkatapos ng Misa — ay nagpatuloy nang halos walumpung taon hanggang sa mga liturgical reform ng dekada 1960. Hindi binura ang panalangin kay San Miguel ngunit ang pormal nitong lugar sa post-Mass prayers ay natapos. Ibinangon ni Papa San Juan Pablo II ang prominence ng panalangin sa isang 1994 Sunday Angelus address, kung saan hinimok niya ang mga tapat na «huwag kalimutan na bigkasin» ang panalangin kay San Miguel «upang makakuha ng tulong sa labanan laban sa mga puwersa ng kadiliman at laban sa espiritu ng mundong ito». Ang teksto ng panalangin ay nakabatay sa Judas 1:9 (Pakikipagtalo ni Miguel sa diyablo tungkol sa katawan ni Moises), Apocalipsis 12:7-9 (Pagpapatalsik ni Miguel sa dragon), at ang mas malawak na Catholic tradition ni San Miguel bilang lider ng heavenly host laban sa mga kapangyarihan ng kasamaan. Nararapat ang panalangin para sa: espirituwal na pakikidigma sa anumang anyo, pagkabalisa sa kasamaan sa mundo o sa personal na buhay, proteksyon sa panahon ng paglalakbay o bago ang isang mahirap na engkwentro, ang pagbabago ng mga nahulog sa grabeng kasalanan, at bilang pang-araw-araw na panalangin ng consecration sa proteksyon ni San Miguel. Ito ang panalangin na pinakakaraniwang itinuturo sa mga batang Katoliko bilang unang «protection prayer» kasama ang Panalangin sa Guardian Angel.",
    instructions:
      "Magdasal isang beses nang may buong atensyon at debosyon. Ang Panalangin kay San Miguel ay sapat na maikli upang isaulo at idasal kahit saan — sa kotse bago ang isang mahirap na pagpupulong, sa pintuan ng isang ospital, naglalakad sa isang lugar kung saan nararamdaman ang espirituwal na kaguluhan, bago matulog sa katapusan ng araw. Ang tradisyonal na Katolikong kasanayan — at ang orihinal na itinatag ni Leon XIII — ay idasal ito kaagad pagkatapos ng pagtatapos ng Banal na Misa, alinman sa katahimikan na sumusunod sa dismissal o bilang bahagi ng isang pampublikong sequence ng Leonine Prayers. Maraming parokya ang nagbangon ng post-Mass St. Michael prayer pagkatapos ng tawag ni JPII noong 1994; kung ang iyong parokya ay hindi gumagawa nito, ganap na nararapat na manatili sa iyong upuan sa loob ng tatlumpung segundo pagkatapos ng dismissal at idasal ito nang pribado. Madalas ding kasama ang panalangin: sa pagtatapos ng Rosaryo o ng isang Holy Hour; sa pagtatapos ng pang-gabing panalangin ng pamilya; bago ang anumang gawain kung saan nararamdaman ng isang Katoliko ang totoong espirituwal na pagsalungat. Ipinapaskil ng ilang Katolikong sambahayan ang panalangin sa itaas ng pangunahing pinto ng tahanan bilang tanda ng consecration sa proteksyon ni San Miguel sa sambahayan. Natural na ipinapares ang panalangin sa Panalangin sa Guardian Angel para sa mga bata: si San Miguel bilang prinsipe ng angelic host, at ang guardian angel bilang ang partikular na ministering spirit na itinalaga sa bawat tao sa binyag.",
    patronSaint: "San Miguel Arkanghel",
    feastDay: "29 ng Setyembre",
    source: "CBCP + Leon XIII 1886 composition + Papa San Juan Pablo II Sunday Angelus, April 24, 1994. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "anima-christi",
    name: "Anima Christi (Kaluluwa ni Kristo)",
    description:
      "Ang Anima Christi («Kaluluwa ni Kristo») ay isa sa pinakamamahal at pinakalumang Eucharistic prayers sa Katolikong tradisyon. Ang pinagmulan nito ay medieval — malamang ika-14 siglo — at sa loob ng maraming taon ito ay itinuring na ginawa ni San Ignacio ng Loyola dahil inilagay niya ito sa pinakasimula ng kanyang Spiritual Exercises (1522-1524) at inirekomenda bilang pang-araw-araw na panalangin para sa mga retreatant. Ang modernong iskolar ay nagpetsa ng panalangin nang hindi bababa sa isang siglo bago ang kapanganakan ni Ignacio; lumitaw ito sa mga manuskrito noong 1314, posibleng ginawa ni Juan XXII o ng isang anonymous na monghe ng Cartusian o Franciscan tradition. Hindi ito isinulat ni Ignacio, ngunit minahal niya ito, at ibinigay ng kanyang Spiritual Exercises ang malawak na pamamahagi na tinatamasa nito ngayon sa buong Katolikong mundo. Ang panalangin ay isang sustained meditation sa Eucharistic Christ — Kanyang Kaluluwa, Kanyang Katawan, Kanyang Dugo, ang tubig at dugo na bumukas mula sa Kanyang tinusok na tagiliran sa Krusipiksyon (Juan 19:34), Kanyang Pagpapakasakit. Ang bawat linya ay parehong confession of faith at petition: «Kaluluwa ni Kristo, gawin mo akong banal» ay ang panalangin ng isang taong humihingi na maging banal sa loob sa pamamagitan ng sariling kabanalan ni Kristo; «Katawan ni Kristo, iligtas mo ako» ay ang pag-amin na nagmumula ang kaligtasan sa parehong katawan na natatanggap na ngayon sa anyo ng tinapay; «Sa loob ng Iyong mga sugat itago mo ako» ay ang medieval mystical longing na makahanap ng kanlungan sa mismong mga sugat ng krusipikadong Panginoon. Ang pagtatapos ng panalangin — «Sa oras ng aking kamatayan tawagin mo ako» — ay ginawa itong tradisyonal na Katolikong panalangin para sa mga naghihingalo, idinadasal sa tabi ng kama sa mga huling oras ng mga hospice chaplain, miyembro ng pamilya, at Katolikong nars. Nararapat ang Anima Christi para sa: pasasalamat kaagad matapos tumanggap ng Banal na Komunyon (ang pangunahing tradisyonal na paggamit nito), isang Holy Hour o pagbisita sa Blessed Sacrament, ang pagtatapos ng personal na panalangin, ang tabi ng kama ng mga naghihingalo, at bilang pang-araw-araw na debosyon na nagpapahayag ng Eucharistic intimacy.",
    instructions:
      "Magdasal nang may debosyon, mainam sa postura ng masusing katahimikan — nakaluhod, nakaupong nakatayo nang may mga bukas na kamay, o nakatayo sa harap ng Blessed Sacrament. Ang panalangin ay nilalayong walang pagmamadali; bawat linya ay isang natatanging petition at ang natural na bilis ay nagpapahintulot ng isang maikling paghinto sa pagitan ng mga parirala upang ang bawat linya ay manirahan sa puso. Ang tradisyonal na mga sandali para sa Anima Christi: (1) Kaagad pagkatapos tumanggap ng Banal na Komunyon sa Misa, sa katahimikan ng personal na pasasalamat — ito ang pangunahing devotional na paggamit ng panalangin, at ang rekomendasyon ni San Ignacio; (2) Sa panahon ng isang Holy Hour o Eucharistic adoration sa harap ng exposed Blessed Sacrament; (3) Sa pagtatapos ng personal na umagang o gabing panalangin, lalo na bilang bahagi ng Eucharistic spirituality; (4) Sa tabi ng kama ng isang grabe na maysakit o naghihingalo — ang huling linya, «Sa oras ng aking kamatayan tawagin mo ako at iutos sa akin na pumunta sa Iyo», ay nagiging partikular na nararapat na deathbed devotion; (5) Inaawit na bersyon sa Latin («Anima Christi, sanctifica me…») sa mga monastic at traditional liturgical setting. Maraming Catholic prayer card ang nagdadala ng Anima Christi sa likod kasama ng isang Communion-reception prayer. Maaaring isaulo ang panalangin sa isang hapon at idasal kahit saan; ang kaiklian nito at density ng Eucharistic content ay gumagawa nito bilang isa sa mga pinakamadiing maikling panalangin sa Katolikong devotional repertoire.",
    patronSaint: "San Ignacio ng Loyola",
    feastDay: null,
    source: "Vatican.va Tagalog + Spiritual Exercises ni San Ignacio (1522-1524) + ika-14 siglong manuscript tradition. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },

  // ─── ROUND 4 (fil) ─────────────────────────────────────────
  {
    prayerSlug: "litany-saints",
    name: "Litanya ng mga Santo",
    description:
      "Ang Litanya ng mga Santo ay ang pinakamatanda at pinakasolemne na litanya sa Simbahang Katolika. Ang mga ugat nito ay umaabot sa mga unang siglo — lumitaw ang mga pira-piraso ng anyo sa ika-pitong siglong Western liturgical books, at itinatag ng Papa Gregorio Magno ang dakilang litanic processions ng Roma noong 590, hinihiling sa mga tapat na tawagin ang mga santo sa pangalan sa supplication sa panahon ng salot. Ang litanya ay naging bahagi ng Easter Vigil baptismal liturgy man lamang sa ika-walong siglo. Ang kanyang kasalukuyang Roman-rite na teksto ay pormal na itinakda ni Papa Pio V noong 1568 at binago sa post-Vatican II liturgical reform (1969). Lumalabas ang istraktura sa limang pangunahing kilos: (1) Mga invocation ng Kyrie eleison at mga petisyon ng Trinitarian; (2) ang dakilang roll-call ng mga santo sa pangalan — una ang Mahal na Birheng Maria, pagkatapos ay ang mga arkanghel (Miguel, Gabriel, Rafael), mga patriarka at propeta (Abraham, Moises, Elias, Juan Bautista), mga apostol at evangelista (Pedro, Pablo, Andres, Juan, Jaime, atbp.), mga martir (Esteban, Lorenzo, Polycarp, Ignacio ng Antioquia, Cipriano, Sebastian, Águeda, Inés), mga obispo-confessor at doctors (Athanasius, Basil, Gregory, Augustine, Jerome, Ambrose), mga tagapagtatag at birhen (Antonio ng Desyerto, Benito, Francisco, Domingo, Catalina ng Siena, Teresa ng Avila); (3) mga petisyon ng deliverance («Mula sa lahat ng masama, iligtas Mo kami, Panginoon»); (4) mga petisyon ng supplication («Upang Inyong pamahalaan at pangalagaan ang Inyong banal na Simbahan, kami nakikiusap sa Inyo, dinggin Mo kami»); (5) pagsasara ng Agnus Dei at collect. Ang litanya ay isa sa mga pangunahing dasal ng Catholic liturgy at ginagamit sa: ang Easter Vigil (sa panahon ng Liturgy of Baptism), Holy Saturday baptisms, priestly at episcopal ordinations (ang mga kandidato ay nakahandusay habang inaawit ng nagtipon-tipon na Simbahan ang litanya sa kanila), ang Rite of Christian Initiation of Adults (RCIA) sa Rite of Election, ang dedication ng simbahan, ang consecration ng mga altar, at ang pagbibigay ng religious vows. Karaniwan din ito sa maraming parokya sa Dakilang Kapistahan ng Lahat ng Santo (1 ng Nobyembre), sa mga libing ng pari at religious, sa mga sandali ng matinding pangangailangan ng publiko (digmaan, pandemya, natural disaster), at bilang panghuling dasal ng pilgrimage processions.",
    instructions:
      "Ang Litanya ng mga Santo ay dinarasal nang responsorial, karaniwang inaawit sa mga liturgical setting. Ang isang leader (pari, deacon, o sinanay na cantor) ay nag-intone sa invocation; ang assembly ay sumasagot ng nararapat na formula. Sumusunod ang mga sagot sa istraktura: «Ipanalangin mo kami» pagkatapos ng bawat santo na pinangalanan o grupo ng mga santo; «Iligtas Mo kami, Panginoon» pagkatapos ng bawat invocation ng deliverance («Mula sa lahat ng masama…»); «Kami nakikiusap sa Inyo, dinggin Mo kami» pagkatapos ng bawat petisyon ng supplication («Upang Inyong…»). Tinatagal ng litanya ng halos labinlima hanggang dalawampung minuto kapag inaawit sa solemneng tempo sa isang liturgical setting; mas kaunti kapag dinarasal sa bahay sa anyong sinasabi. Para sa pribadong devotion, maaaring dasalin ang litanya mula sa anumang inaprubahang printed text (ang Roman Missal, isang parish prayer book, o ang website ng CBCP). Kapag dinarasal sa bahay, umupo, tumayo, o lumuhod ayon sa nais; ang tempo ng litanya ay contemplative sa halip na nagmamadali. Nararapat na gamitin ang litanya: (1) sa Lahat ng Santo (1 ng Nobyembre) at Lahat ng Kaluluwa (2 ng Nobyembre) bilang dasal ng pamilya sa mga araw na iyon; (2) sa tabi ng kama ng isang grabe na maysakit o naghihingalo — maraming Catholic hospital chaplain ang nagdadasal ng litanya habang papalapit ang last rites; (3) sa simula ng isang mahalagang pilgrimage o family undertaking, humihingi na palibutan ng dakilang ulap ng mga saksi (Hebreo 12,1) ang mga petitioner; (4) sa panahon ng salot, sakuna, o pampublikong emergency, sa pagkakatuloy ng pagtatatag ni Gregorio Magno ng litanic processions sa panahon ng Romang salot ng 590. Ang particular na espirituwal na kaloob ng litanya ay ang nararamdamang presensya ng communion of saints — ang katotohanan na ang mga tapat na nagdarasal sa lupa at silang mga matagumpay sa langit ay iisang katawan kay Kristo.",
    patronSaint: null,
    feastDay: "1 ng Nobyembre (Lahat ng Santo)",
    source: "CBCP + Papa Pio V codification 1568 + post-Vatican II 1969 revision + Gregorio Magno 590 institution. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "prayer-expectant-mothers",
    name: "Panalangin para sa mga Nagdadalantao",
    description:
      "Ang Katolikong panalangin para sa mga nagdadalantao ay nagmumula sa siglo-siglong tradisyon ng Simbahan na samahan ang mga babae sa pagbubuntis sa ilalim ng patrocinio ng Mahal na Birheng Maria, na nagdala kay Kristo sa kanyang sariling sinapupunan ng siyam na buwan. Ang pangunahing biblical foundation ay ang Pagdalaw (Lucas 1,39-56): si Maria, na siya mismo nasa mga unang buwan ng pagbubuntis kay Hesus, nagmamadali patungo sa kabundukan ng Judea upang makasama ang kanyang pinsang si Isabel, na nasa kanyang ikaanim na buwan kay Juan Bautista. Ang Magnificat («Itinatampok ng aking kaluluwa ang Panginoon…») ay panalangin ng dalawang nagdadalantao na nagsasaya magkasama. Ang Katolikong devotional tradition ay matagal nang ipinagkatiwala ang mga nagdadalantao kay Maria sa ilalim ng ilang partikular na titulo: Nuestra Señora de la Expectación o ng O (ang Dakilang Kapistahan ng Disyembre 18, isang Spanish-tradition feast siyam na araw bago ang Pasko, na nagmamarka ng papalapit na panganganak ni Maria); Nuestra Señora de Guadalupe (na ang larawan ay nagpapakita sa kanya na nagdadalantao); at San Gerardo Majella (1726-1755), isang Italian Redemptorist lay brother na ang pangalan ay naging napakaugnay sa ligtas na panganganak na ang mga rebulto niya ay inilalagay sa maternity wards ng Catholic hospitals sa buong mundo. Nararapat ang panalangin para sa mga nagdadalantao sa bawat yugto ng pagbubuntis: sa unang positive test, sa pamamagitan ng first-trimester anxiety na nararamdaman ng maraming ina, sa loob ng mahabang gitnang mga buwan ng paghihintay, sa mga linggo ng paghahanda bago ang panganganak, sa panahon mismo ng panganganak (kapag madalas itong dinarasal ng mga miyembro ng pamilya sa tabi ng kama), at kaagad pagkatapos ng panganganak sa pasasalamat. Idinadasal din ito ng mga komunidad — mga parokya, prayer group, ang circle of friends ng babae — bilang paraan ng paligid sa kanya ng intercession sa loob ng siyam na buwan ng paghihintay na sumasalamin kay Maria.",
    instructions:
      "Magdasal isang beses sa isang araw para sa nagdadalantao, mainam sa parehong oras araw-araw upang ang gawain ay maging bahagi ng kanyang ordinaryong ritmo. Ang panalangin ay sapat na maikli upang isaulo; maraming nagdadalantao ang nagdadala nito sa isang maliit na card na nakatago sa isang Bibliya, libro ng dasal, o pitaka, at idinadasal habang naghihinto sila sa araw-araw na trabaho ng paghahanda para sa sanggol. Mga karaniwang gawain na ipinapares sa panalangin: (1) Magsindi ng kandila sa Marian shrine sa parish church para sa bawat buwan ng pagbubuntis — maraming parokya ang nag-iingat ng designated «expectant mothers» candle stand at iniaakda ang mga pangalan ng mga babaeng pinagdadasalan; (2) Magdasal ng pang-araw-araw na decade ng Rosaryo, nagninilay sa Joyful Mysteries (ang Pagbati, ang Pagdalaw, ang Pagsilang, ang Paghahandog, ang Pagkawala at Pagkahanap sa Templo); (3) Hingiin ang pamamagitan ni San Gerardo Majella — maaaring ipares ang panalangin para sa mga nagdadalantao sa nobena kay San Gerardo, lalo na sa siyam na araw bago ang panganganak; (4) Pang-pamilyang o pang-komunidad na panalangin sa tabi ng kama sa panahon ng panganganak, kung saan ang asawa ng nagdadalantao o ibang miyembro ng pamilya ay nagdadasal ng Memorare o ang panalangin na ito ng malakas habang umuusad ang panganganak. Malinaw ang Catholic tradition na ang pagbubuntis ay sa kanyang sarili ay isang anyo ng panalangin. Pagkatapos ng panganganak, nagpapatuloy ang panalangin sa pasasalamat at natural na bumabaling sa mga panalangin ng pagiging ina para sa bagong-silang.",
    patronSaint: "Mahal na Birhen",
    feastDay: null,
    source: "CBCP + Lucas 1,39-56 + tradisyon ni San Gerardo Majella. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "adoration-hour",
    name: "Banal na Oras ng Adorasyon",
    description:
      "Ang Banal na Oras ng Eucharistic Adoration ay isa sa pinakamatanda at pinakasentral na anyo ng Katolikong panalangin — patuloy, tahimik na panalangin sa real presence ni Jesucristo sa Banal na Sakramento, nakalantad sa monstrance sa altar. Direktang nagmumula ang gawain sa Gospel scene sa Gethsemani: tinanong ni Kristo ang mga apostol Niya, «Hindi ba kayo makapagbantay ng isang oras kasama ko?» (Mateo 26,40). Ang «isang oras» ay hindi arbitrary na haba — ito ang malinaw na hiling ng Panginoon sa gabi ng Kanyang pagpapakasakit, at direktang sinasagot ng Catholic Holy Hour ang hiling na iyon. Ang devotional practice ng sustained Eucharistic adoration ay nagcrystallize sa Counter-Reformation at binigyan ng particular na lakas sa pamamagitan ng mga pagpapakita ng Sagradong Puso kay Santa Margarita Maria Alacoque sa Paray-le-Monial (1673-1675); partikular na hinihiling ni Kristo kay Margarita Maria ang isang oras ng reparation sa Kanyang presensya tuwing Huwebes ng gabi, sa pag-alala sa Agonya sa Hardin. Ang Holy Hour ay naging sentral sa «Apostleship of Prayer» (itinatag 1844) at malawakang ipinangaral sa ikadalawampung siglo ni Venerable Fulton Sheen (1895-1979), na sikat na nag-commit sa Holy Hour araw-araw ng kanyang priestly life — mahigit 60 taon — at iniugnay ang bawat biyaya ng kanyang ministry sa oras na iyon. Ngayon ay maraming kapilya ng perpetual Eucharistic adoration ang gumagana sa libu-libong parokya sa buong mundo, pinangangalagaan ng mga lay volunteer na nag-cocommit sa mga partikular na oras sa kabuuan ng gabi at araw upang hindi kailanman maiwan si Kristo nang mag-isa sa Kanyang naka-exposed na Sakramento. Nararapat ang Holy Hour para sa: anumang sustained intercession, lalo na para sa kagalingan, pagbabago, o vocational discernment; reparation para sa kasalanan (sa sarili o sa mundo); espirituwal na pagkatuyo; paghahanda para sa mahalagang life decisions; pasasalamat pagkatapos tumanggap ng biyaya. Ito ang panalangin na tinawag ni Sheen na «ang sikreto ng bawat paring naging santo».",
    instructions:
      "Bisitahin ang iyong parokya sa mga oras ng Adoration — tingnan ang website o bulletin ng parokya para sa schedule. Maraming parokya ang nag-aalok ng Eucharistic adoration tuwing Huwebes (hiling ni Kristo kay Margarita Maria), Biyernes (ang tradisyonal na araw ng reparation), o bilang extended Holy Hour pagkatapos ng weekday Mass. May mga nagpapanatili ng perpetual adoration na may Blessed Sacrament na exposed 24/7. Sa pagdating: (1) Lumuhod sa parehong tuhod (ang tradisyonal na tanda ng paggalang sa exposed Eucharist, naiiba sa one-knee genuflection para sa reserved Sacrament sa tabernacle); (2) Maghanap ng lugar upang umupo o lumuhod; (3) Yumuko sa tahimik na pagkilala na nasa literal na presensya ka ng Diyos na nagkatawang-tao. Ang oras mismo ay walang structure ayon sa disenyo — ang patuloy na presensya ang dasal. Ang ilang patterns na ginagamit ng mga Katoliko upang punuin ang oras: (a) Magdasal ng Rosaryo, nagninilay sa Sorrowful Mysteries; (b) Magbasa ng Banal na Kasulatan (ang Passion narratives, ang Ebanghelyo ni Juan, ang mga Salmo); (c) Magdasal ng Chaplet of Divine Mercy, lalo na sa oras ng 3:00 PM; (d) Magbasa mula sa isang espirituwal na klasiko; (e) Umupo sa tahimik na presensya — ang pinakamataas na anyo ng contemplative prayer; (f) Magsulat ng usapan kay Hesus tungkol sa taong inihahandog mo ang oras. Sa buong oras, pangalanan ang tao at ang intensyon nang madalas. Nagtatapos ang oras sa isa pang genuflection at maikling dasal ng pasasalamat para sa regalo ng Kanyang presensya.",
    patronSaint: null,
    feastDay: null,
    source: "CBCP + Mateo 26,40 + mga pagpapakita ng Sagradong Puso sa Paray-le-Monial (1673-1675) + tradisyon ni Fulton Sheen. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "stations-of-the-cross",
    name: "Daan ng Krus (Stations of the Cross)",
    description:
      "Ang Daan ng Krus (tinatawag ding Way of the Cross, Via Crucis, o Via Dolorosa) ay isang meditative devotion kung saan sumusunod ang mananampalataya sa Pagpapakasakit ni Kristo sa labing-apat na natatanging stations — mga sandali sa Kanyang paglalakbay mula sa praetorium ni Pilato hanggang sa libingan. Nag-umpisa ang gawain sa pinakaunang Kristiyanong siglo bilang literal na peregrinasyon sa mga banal na lugar sa Jerusalem; naglalakad ang mga peregrino sa aktwal na landas na nilakaran ni Kristo, naghihinto sa bawat makabuluhang istasyon upang manalangin. Nang mahulog ang Jerusalem sa Muslim control noong ika-pitong siglo at ang peregrinasyon ay naging mapanganib at bihira, sinimulan ng mga Franciscan — na binigyan ng custody ng Holy Land ni Papa Clemente VI noong 1342 — ang muling pagtatayo ng Via Dolorosa sa anyo ng mga devotional station sa kanilang mga simbahan sa buong Europe, upang ang sinumang Katoliko ay maaaring «maglakad» sa Daan ng Krus nang espirituwal nang hindi naglalakbay sa Jerusalem. Ipinagkaloob ni Papa Inocencio XI sa mga Franciscan ang indulgences para sa pagdarasal ng mga stations noong 1686, at pinalawak ito ni Papa Clemente XII sa lahat ng tapat noong 1731. Ang standard na labing-apat na stations ay itinakda sa ikadalawampu't walong siglo: (1) Si Hesus ay hinatulan ng kamatayan; (2) Si Hesus ay binigyan ng Kanyang krus; (3) Si Hesus ay natumba sa unang pagkakataon; (4) Si Hesus ay nakatagpo ang Kanyang inang si Maria; (5) Tumutulong si Simon ng Cyrene kay Hesus na buhatin ang krus; (6) Pinunasan ni Veronica ang mukha ni Hesus; (7) Si Hesus ay natumba sa pangalawang pagkakataon; (8) Si Hesus ay nakatagpo ng mga babae ng Jerusalem; (9) Si Hesus ay natumba sa pangatlong pagkakataon; (10) Si Hesus ay hinubaran ng Kanyang mga damit; (11) Si Hesus ay ipinako sa krus; (12) Si Hesus ay namatay sa krus; (13) Si Hesus ay ibinaba mula sa krus; (14) Si Hesus ay inilibing. Ang Daan ng Krus ay tradisyonal na dinarasal tuwing Biyernes sa panahon ng Kuwaresma at ang sentral na pampublikong devotion ng Mahal na Araw sa karamihan ng Catholic parishes sa buong mundo. Pinangungunahan ng Papa ang Daan ng Krus sa Colosseum sa Roma tuwing Biyernes Santo.",
    instructions:
      "Bisitahin ang isang Katolikong simbahan — ang karamihan ay may labing-apat na stations na nakakabit sa mga side wall ng nave. Ang tradisyonal na gawain: (1) Magsimula sa unang istasyon; lumuhod; (2) Ipahayag ang istasyon nang malakas («Unang Istasyon: Si Hesus ay hinatulan ng kamatayan»); (3) Dasalin ang sagot na «Sinasamba Ka namin, O Kristo, at pinapurihan Ka namin, sapagkat sa Iyong banal na Krus, tinubos Mo ang mundo»; (4) Magnilay-nilay sandali sa eksenang Pasyon ni Kristo na tumutugma sa istasyon; (5) Magdasal ng Ama Namin, Aba Ginoong Maria, at Luwalhati; (6) Ialay ang istasyon sa iyong intensyon. Lumipat sa susunod na istasyon — pisikal na paglalakad mula sa isa patungo sa susunod ay bahagi ng panalangin; ang Daan ng Krus ay pinagniniig na lakaran. Kabuuang tagal: halos tatlumpu hanggang apatnapu't limang minuto kapag dinasal sa walang madaliang tempo sa isang simbahan. Sa bahay, isang printed Way of the Cross booklet ang gumagana — walang physical presence requirement. Ang devotion ay nararapat na dinasal: (a) Sa mga Biyernes sa panahon ng Kuwaresma, ang tradisyonal na Katolikong disiplina; (b) Sa Mahal na Araw mismo, ang araw na nilakad ni Kristo ang Via Dolorosa; (c) Sa anumang Biyernes sa buong taon; (d) Kapag pinapasan ang isang mabigat na personal na krus — sakit, lumbay, dependency, persekusyon — pinagsasama ang iyong paghihirap sa kay Kristo; (e) Kapag nagdadasal para sa isang nahihirapan o naghihingalo; (f) Kapag naghahanap ng biyaya ng pagtitiis sa pagdurusa.",
    patronSaint: null,
    feastDay: "Biyernes Santo",
    source: "CBCP + Franciscan custody of Holy Land (1342) + Papa Inocencio XI 1686 + Clemente XII 1731. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "morning-offering",
    name: "Pag-aalay sa Umaga",
    description:
      "Ang Pag-aalay sa Umaga ay ang pundasyong pang-araw-araw na panalangin ng Apostleship of Prayer — isang Catholic spiritual movement na itinatag noong 1844 ng Jesuit Father François-Xavier Gautrelet sa Vals, France, at pinangalanan muli noong 2015 ni Papa Francisco bilang Pope's Worldwide Prayer Network. Ang sentral na pananaw ng kilusan ay simple ngunit nagbabago: bawat ordinaryong aksyon ng araw ng isang Katoliko — trabaho, pag-aaral, pakikipag-usap, pagkain, pagod, kagalakan, paghihirap, kahit pagtulog — ay maaaring iaalay sa Diyos bilang intentional act of love, binabago ang buong araw sa isang sustained act of prayer. Ang Pag-aalay sa Umaga ang gumagawa ng pag-aalay na ito, dinarasal kaagad sa paggising, bago pa makontrol ng araw ang kalagayan. Ang traditional text — binuo sa huling bahagi ng ikadalawampung siglo at pinino sa pamamagitan ng ilang papal-approved versions — inilalagay ang pag-aalay ng araw «sa pamamagitan ng Immaculate Heart of Mary» at iniuugnay ito «sa Banal na Sakripisyo ng Misa sa buong mundo». Tuwing buwan, ang Papa ay naglalabas ng partikular na universal prayer intentions sa pamamagitan ng Pope's Worldwide Prayer Network — halimbawa, «para sa pag-aalaga sa mga bata» o «para sa pagtatapos ng human trafficking» — at ang mga Katolikong nagdadasal ng Pag-aalay sa Umaga ay iniuugnay ang maliliit na aksyon ng kanilang araw sa mas malawak na intensyon. Ang Pag-aalay sa Umaga ay isang makapangyarihang dasal ng intercession para sa partikular na tao: isang maysakit na miyembro ng pamilya, isang adult na anak na umalis sa pananampalataya, isang magulang na nakikipagbuno sa addiction.",
    prayerText:
      "O Hesus, sa pamamagitan ng Kalinis-linisang Puso ni Maria, inihahandog ko sa Iyo ang aking mga panalangin, gawain, kagalakan, at paghihirap sa araw na ito para sa lahat ng intensyon ng Iyong Sagradong Puso, sa pakikiisa sa Banal na Sakripisyo ng Misa sa buong mundo, sa pasasalamat sa Iyong mga biyaya, sa pagbabayad-puri sa aking mga kasalanan, para sa intensyon ng lahat ng aking mga kasama, at lalo na para kay (banggitin ang pangalan at intensyon ng tao). Amen.",
    instructions:
      "Magdasal kaagad sa paggising, bago pa makontrol ng abala ng araw ang kalagayan. Ang tradisyonal na disiplina ay idasal ito bago bumangon sa kama, habang ang isip ay malambot pa at ang araw ay parang regalo pa; ang ilang mga Katoliko ay nagdadasal sa unang tahimik na sandali ng morning routine (sa unang tasa ng kape, sa lababo ng kusina, habang pinapakain ang sanggol). Ang panalangin ay sapat na maikli upang isaulo sa isang araw lamang. Upang gawin itong bahagi ng buhay: (1) Ilagay ang panalangin sa lugar kung saan makikita mo agad — nakadikit sa salamin ng banyo, sa loob ng pintuan ng kuwarto, sa isang card sa tabi ng coffee maker; (2) Pangalanan ang partikular na tao at ang intensyon sa nararapat na lugar ng dasal (ang linyang «at lalo na para kay…»), na ginagawang concrete ang pag-aalay; (3) Sa buong araw, kapag ang trabaho ay naging mahirap o isang abala ang sumira sa iyong mga plano, sandali na lamang renewahin ang pag-aalay: «Ibinigay ko sa Iyo ang araw na ito para kay (pangalan); ang sandaling ito ay bahagi nito». Maraming Catholic households ang nagdadasal ng Pag-aalay sa Umaga nang malakas na magkasama habang bumabangon ang pamilya. Inilalathala ng Pope's Worldwide Prayer Network ang monthly universal intentions ng Papa. Para sa sustained intercession (isang nobena ng mga araw para sa maysakit na mahal sa buhay, ang tagal ng isang mahirap na discernment, ang mga buwan ng chemotherapy ng miyembro ng pamilya), ang Pag-aalay sa Umaga ay nagiging gulugod ng dasal.",
    patronSaint: null,
    feastDay: null,
    source: "CBCP + Apostleship of Prayer / Pope's Worldwide Prayer Network (1844, pinangalanan muli 2015). Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "three-oclock-prayer",
    name: "Panalangin sa Ika-tatlo ng Hapon (Oras ng Awa)",
    description:
      "Ang Panalangin sa Ika-tatlo ng Hapon — tinatawag ding Oras ng Awa o Oras ng Dakilang Awa — ay ibinigay ni Hesus kay Santa Maria Faustina Kowalska sa mga rebelasyon ng Divine Mercy na nakatala sa kanyang Talaarawan: Divine Mercy in My Soul. Itinuro ni Hesus kay Faustina na ang 3:00 PM bawat araw — ang oras ng Kanyang kamatayan sa Kalbaryo — ay parangalan bilang Oras ng Dakilang Awa, kung saan ang isang maikling pagdarasal ay nakakakuha ng pambihirang biyaya. Ang eksaktong pangako, nakatala sa Talaarawan ni Faustina (entry 1320): «Sa ika-tatlo ng hapon, hingiin ang Aking awa, lalo na para sa mga makasalanan; at, kahit saglit lamang, isubsob ang iyong sarili sa Aking Pasyon, lalo na sa Aking pagpapabaya sa sandali ng paghihirap. Ito ang oras ng dakilang awa para sa buong mundo… Sa oras na ito hindi Ako tatanggi ng anuman sa kaluluwang humihingi sa Akin sa bisa ng Aking Pasyon». Tumutugma ang oras sa ikasiyam na oras ng Hudyong araw sa gospel chronology (Marcos 15,34) — ang oras kung kailan «sumigaw si Hesus ng malakas… at namatay» (Marcos 15,37). Ang Panalangin sa Ika-tatlo ng Hapon ang pinakasimple at pinaka-access na anyo ng Divine Mercy devotion — mas maikli pa kaysa sa chaplet, accessible sa kahit sino na maaaring huminto ng tatlumpung segundo sa oras ng kamatayan ni Kristo. Ito ang panalangin na inilalagay ng Catholic tradition sa puso ng araw para sa mga hindi kayang gumawa ng buong Holy Hour, na hindi kayang magdasal ng chaplet, na nasa trabaho o sa paaralan o sa tabi ng kama sa ospital. Ang devotion ay pinigil sa loob ng maraming taon (ang parehong panahon kung kailan ang mga sulat ni Faustina ay nasa provisional restriction), ngunit kinanonisa ng Papa San Juan Pablo II si Faustina noong April 30, 2000, at itinatag ang Divine Mercy Sunday bilang kapistahan para sa unibersal na Simbahan.",
    prayerText:
      "Naghingalo Ka, Jesus, ngunit ang bukal ng buhay ay umagos para sa mga kaluluwa, at ang karagatan ng awa ay nabuksan para sa buong mundo. O Bukal ng Buhay, hindi-masusukat na Awa ng Diyos, balutin Mo ang buong mundo at ibuhos Mo ang Iyong sarili sa amin. O Dugo at Tubig na umagos mula sa Puso ni Hesus bilang bukal ng awa para sa amin, nagtitiwala ako sa Iyo! Banal na Diyos, Banal na Makapangyarihan, Banal na Walang-hanggan, kaawaan Mo kami at ang buong mundo. (3 ulit)",
    instructions:
      "Sa 3:00 PM bawat araw, huminto nang sandali — anuman ang ginagawa mo — at magdasal. Ang panalangin ay sapat na maikli upang isaulo sa isang hapon at idasal kahit saan: sa isang desk, sa sasakyan, sa silid-aralan, sa tabi ng kama sa ospital, naglalakad sa bangketa. Malinaw ang Catholic tradition na «kahit isang sandali ng panalangin sa oras na ito ay makapangyarihan» — kung ang isang abala na buhay ay makakapag-alay lamang ng dalawampung segundo para sa isang «Hesus, nagtitiwala ako sa Iyo» sa 3:00 PM, ang maikling sandali na iyon mismo ang gawain. Para sa mga may mas maraming oras: (1) Idasal ang buong Chaplet of Divine Mercy (halos sampung minuto); (2) Gumawa ng maikling «pagbisita» sa kalapit na Katolikong simbahan o Eucharistic adoration chapel; (3) Huminto upang basahin ang isang talata mula sa Talaarawan ni Santa Faustina; (4) Magdasal para sa mga makasalanan — itinala ni Faustina na sinabi sa kanya ni Hesus na ito ang pinakamakapangyarihang intercession sa oras na ito. Ang mga tradisyonal na Katolikong disiplina na ipinapares sa Panalangin sa Ika-tatlo ng Hapon: (a) Magtakda ng pang-araw-araw na alarm sa 3:00 PM bilang paalala hanggang sa maging ugali; (b) Magdala ng maliit na Divine Mercy holy card; (c) Magdasal sa paanan ng krusipiho; (d) Magdagdag ng sandali ng pisikal na katahimikan.",
    patronSaint: "Santa Maria Faustina Kowalska",
    feastDay: null,
    source: "CBCP + Talaarawan ni Santa Faustina (1320) + JPII canonization April 30, 2000 + Marcos 15,34-37. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  // ── Wave 6 (2026-05-17): Marian devotions, modern saints, patronage
  //    saints. Sources: CBCP, Vatican.va (Filipino Catholic publishing
  //    is bilingual; English-Filipino mix matches actual liturgical
  //    practice), Word & Life Publications, Daughters of St. Paul PH.
  {
    prayerSlug: "novena-fatima",
    name: "Nobena sa Mahal na Birhen ng Fatima",
    description:
      "Ang Nobena sa Mahal na Birhen ng Fatima ay nagpaparangal sa anim na pagpapakita ni Maria sa Cova da Iria, malapit sa Fatima, Portugal, sa pagitan ng Mayo 13 at Oktubre 13, 1917, sa tatlong batang pastol: si Lucia dos Santos at ang kanyang mga pinsang sina Francisco at Jacinta Marto. Sa bawat pagpapakita ay hiniling ng Birhen ang panalangin para sa pagbabalik-loob ng mga makasalanan, ang pagsasagawa ng pagsisisi at ang pang-araw-araw na pagdarasal ng Santo Rosaryo para sa kapayapaan ng mundo. Ang huling pagpapakita, noong Oktubre 13, 1917, ay sinamahan ng «Himala ng Araw» na nasaksihan ng halos pitumpung libong tao. Kinilala ng Simbahan ang mga pagpapakita bilang karapat-dapat sa paniniwala noong 1930. Iniugnay ni Papa San Juan Pablo II ang kanyang pagligtas sa pagtatangkang pagpatay noong Mayo 13, 1981 sa pamamagitan ng pamamagitan ni Birheng Fatima at inialay ang mundo sa Kanyang Inmaculadong Puso noong 1984. Ang mga batang pastol na sina Francisco at Jacinta ay kinanonisa ni Papa Francisco sa Fatima noong Mayo 13, 2017. Para sa Pilipinas, ang devotion sa Birheng Fatima ay malalim — maraming parokya ang nakatuon, at ang taunang piyesta ng Mayo 13 ay isa sa pinakamalalaking Marian na piyesta sa kalendaryo ng simbahan. Ang nobena ay tradisyonal na idinadasal mula Mayo 4 hanggang 12.",
    prayerText:
      "O Banal na Birheng Maria, Reyna ng Banal na Rosaryo, na sa Fatima ay nagpakita ng iyong pagmamahal sa mga mapagpakumbaba at maliliit, ituon ang iyong mahabaging tingin sa akin, na may anak na pagtitiwala ay tumatawag sa iyo. Ipagkaloob mo sa akin, sa pamamagitan ng iyong makapangyarihang pamamagitan, ang biyaya na aking hinihiling ngayon (banggitin ang intensyon), kung naaayon ito sa kalooban ng Diyos at sa kabutihan ng aking kaluluwa. Turuan mo ako, Ina, na mamuhay nang may pananampalataya, magdasal nang may katiyagaan at gumawa ng kabayaran para sa mga kasalanang nakakasakit sa Sagradong Puso ni Hesus at sa iyong Inmaculadong Puso. Amen. Mahal na Birhen ng Rosaryo ng Fatima, ipanalangin mo kami.",
    instructions:
      "Idasal nang isang beses sa isang araw sa loob ng siyam na magkakasunod na araw, lalo na mula Mayo 4 hanggang 12 sa paghahanda para sa piyesta ng Mayo 13. Tradisyonal na istruktura: (1) Tanda ng Krus; (2) gawa ng pagsisisi; (3) isang misteryo ng Banal na Rosaryo na may madahan-dahang pagmumuni — ang Rosaryo ay hindi mapaghihiwalay sa devosyon ng Fatima; (4) ang panalangin ng nobena; (5) ang mga jaculatorya na itinuro ni Maria: «O Hesus, ito ay para sa pag-ibig sa Iyo, para sa pagbabalik-loob ng mga makasalanan at sa kabayaran para sa mga kasalanang ginawa laban sa Inmaculadong Puso ni Maria»; (6) banggitin ang iyong espesipikong intensyon. Maraming Filipino Catholic ang nagdaragdag ng pamilyang consecration sa Inmaculadong Puso ni Maria sa pagtatapos ng nobena. Ang Reparadora ng Komunyon ng First Saturdays — espesipikong hiniling ng Birhen kay Sister Lucia sa Pontevedra noong 1925 — ay natural na nakaugnay sa nobena.",
    patronSaint: "Birheng Fatima · Mga Santos na Francisco at Jacinta Marto",
    feastDay: "Mayo 13",
    source: "CBCP + Vatican.va (Mensahe ng Fatima, CDF 2000) + Memoirs of Sister Lucia + canonization of Francisco and Jacinta Marto (May 13, 2017). Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-lourdes",
    name: "Nobena sa Mahal na Birhen ng Lourdes",
    description:
      "Ang Nobena sa Mahal na Birhen ng Lourdes ay nagpaparangal sa labing-walong pagpapakita ni Maria kay Santa Bernadette Soubirous sa pagitan ng Pebrero 11 at Hulyo 16, 1858, sa gruta ng Massabielle sa Lourdes, France. Sa ikasiyam na pagpapakita, natuklasan ni Bernadette ang isang bukal na ang tubig ay nagsimulang umagos mula sa bato; sa ikalabing-anim, noong Marso 25, 1858, ipinakilala ng Birhen ang sarili: «Ako ay ang Inmaculada Concepción» — apat na taon lamang pagkatapos ng dogmatikong kahulugan ni Pio IX. Tumatanggap ngayon ang Santuario ng Lourdes ng mahigit anim na milyong peregrino bawat taon. Opisyal na kinilala ng Simbahan ang pitumpung himala ng pagpapagaling. Ang liturhikal na piyesta ng Pebrero 11 ay itinakda ni Papa San Pio X, at noong 1992 ay itinatag ni Papa San Juan Pablo II ang World Day of the Sick sa parehong petsa. Sa Pilipinas, ang devotion sa Birheng Lourdes ay laganap, lalo na sa mga ospital na pang-Katoliko at sa mga pamilyang may may-sakit na miyembro. Ang nobena ay tradisyonal na idinadasal mula Pebrero 2 hanggang 10.",
    prayerText:
      "O Imakuladang Birheng Maria, Ina ng Habag, Kalusugan ng Maysakit, Kanlungan ng mga Makasalanan, Tagaaliw ng mga Nahihirapan, alam mo ang aking mga pagnanais, mga paghihirap, mga pagsubok; magpakita ka sana sa akin ng iyong mahabaging tingin. Sa pagpapakita mo sa gruta ng Lourdes, kinasiyahan mong gawing lugar na piniling-pinili para sa pagkakaloob ng iyong mga biyaya, at doon maraming may-sakit ang nagkamit ng kagalingan sa kanilang mga espirituwal at panlabas na sakit. Lumalapit ako sa iyo nang may buong pagtitiwala upang isamo ang iyong maternal na pamamagitan. Ipagkaloob mo sa akin, O magiliw na Ina, ang biyaya na aking hinihiling (banggitin ang intensyon). Sa pamamagitan ng panalangin ng Lourdes na maraming beses na nakoronahan ng kagalingan, hinihiling ko sa iyo ang kalusugan ng katawan at lalo na ang kalusugan ng kaluluwa. Amen.",
    instructions:
      "Idasal nang isang beses sa isang araw sa loob ng siyam na magkakasunod na araw. Istruktura: (1) Tanda ng Krus at gawa ng pananampalataya sa maternal na presensya ni Maria; (2) ang mga joyful mystery ng Banal na Rosaryo, na inaalala na nagdarasal si Bernadette ng Rosaryo habang ang bawat pagpapakita; (3) ang panalangin ng nobena; (4) tatlong Aba Ginoong Maria bilang parangal sa Inmaculada Concepción; (5) pagsasara sa jaculatorya ni Bernadette: «O Maria, na inihatid nang walang sala, ipanalangin mo kami na tumatawag sa iyo». Para sa pisikal na pagpapagaling, marami ang nagdaragdag ng basbas gamit ang tubig ng Lourdes (matatagpuan sa mga Marian na parokya o santuario) — bilang sacramental, hindi bilang anting-anting. Kung idinadasal ang nobena para sa malubhang maysakit, kasama ang pamilya. Pagsamahin sa pagdalaw sa maysakit, pagtanggap ng mga sakramento (Pamamahid, Komunyon) at tapat na pagsusuri sa sariling paraan ng pagtanggap sa paghihirap.",
    patronSaint: "Birheng Lourdes · Santa Bernadette Soubirous",
    feastDay: "Pebrero 11 (World Day of the Sick)",
    source: "CBCP + Vatican.va (Salvifici Doloris, JPII 1984) + Bureau Médical de Lourdes. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-undoer-of-knots",
    name: "Nobena kay Maria, Tagatanggal ng mga Buhol",
    description:
      "Ang devotion kay Maria Tagatanggal ng mga Buhol ay nagmula sa isang barokong painting na inakda ni Johann Georg Melchior Schmidtner (ca. 1700) na nasa simbahan ng San Pedro am Perlach sa Augsburg, Germany. Ipinapakita ng painting si Maria na may matiyagang pagtanggal ng mga buhol ng mahabang puting laso na inialay sa kanya ng isang anghel — biswal na imahen ng patristic doctrine na nakikita kay Maria bilang ang bagong Eba «na nagtatanggal sa pamamagitan ng kanyang pagsunod ng itinali ni Eva sa pamamagitan ng kanyang pagsuway» (San Ireneo ng Lyon, Adversus Haereses III, 22, 4). Nanatiling lokal ang devotion hanggang sa natuklasan ito ng dating Padre Jorge Mario Bergoglio sa Germany noong 1986. Bilang Arsobispo ng Buenos Aires ay isinulong ang devotion, at bilang Papa Francisco ay ginawang kilala sa buong mundo. Sa Pilipinas, mabilis itong lumaganap mula noong 2013. Ang nobena ay angkop para sa mga sitwasyon na tila imposibleng resolbahin: kasal sa krisis, mga anak na nawawalay sa pananampalataya, dependence sa droga, prolonged na alitan sa pamilya, naka-block na desisyon.",
    prayerText:
      "Birheng Maria, Ina na hindi kailanman nagpabaya sa anak na tumatawag sa iyong tulong, Ina na ang mga kamay ay hindi tumitigil sa pagtatrabaho para sa amin, iyong minamahal na mga anak, Ina na puno ng biyaya ng Diyos, ilalagay ko sa iyong mga kamay ang mga laso at tali na nagsisikip ng aking buhay. Sa iyong mga kamay ay walang buhol na hindi maaaring tanggalin. Makapangyarihang Ina, sa pamamagitan ng iyong pamamagitan at ng biyaya ng iyong Anak na si Hesus, dalhin mo sa aking mga kamay ang aliw. Ikaw, na nagtatanggal nang may kahinahunan ng mga buhol ng aking buhay, hinihiling ko sa iyo na tanggapin sa iyong mga kamay (banggitin ang pangalan o ang sitwasyon), at pakaibasin sa mga laso at kalituhan kung saan ang kaaway ay sumasalakay sa amin. Sa pamamagitan ng iyong biyaya, ng iyong pamamagitan, ng iyong halimbawa, palayain mo kami sa lahat ng kasamaan, Reyna naming, at tanggalin ang mga buhol na pumipigil sa amin na makaisa sa Diyos, upang, malaya, nasa kanya, hindi kami mawawala. Amen.",
    instructions:
      "Idasal nang isang beses sa isang araw sa loob ng siyam na magkakasunod na araw. Istruktura: (1) Tanda ng Krus; (2) gawa ng pagsisisi — ang pagtanggal ng buhol ay madalas na nagsisimula sa pagkilala sa sariling kasalanan o sariling papel sa sitwasyon; (3) isang misteryo ng Banal na Rosaryo; (4) ang panalangin ng nobena; (5) isang Ama Namin, Aba Ginoong Maria at Luwalhati; (6) banggitin ang buhol nang espesipiko. Para sa lalo na mahihirap na sitwasyon, irinekomenda ni Papa Francisco ang pagdarasal ng nobena sa pinahabang panahon kung hindi agad nasagot ang pamamagitan. Maraming Filipino Catholic ang nagdaragdag ng simbolikong galaw: sulatin ang buhol sa papel at ilagay sa paanan ng imahen ni Maria. Kung ang buhol ay isang nasirang ugnayan, isaalang-alang ang pag-alay ng nobena para sa sariling conversion muna at sa ibang tao pagkatapos.",
    patronSaint: "Maria, Tagatanggal ng mga Buhol",
    feastDay: "Setyembre 28 (hindi calendrical na devotion)",
    source: "Vatican.va (homilies of Pope Francis) + Aleteia + tradition of Augsburg (church of St. Peter am Perlach) + St. Irenaeus, Adversus Haereses III, 22, 4. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-seven-sorrows",
    name: "Nobena sa Mahal na Birhen ng Hapis (Pitong Hapis ni Maria)",
    description:
      "Ang Nobena sa Mahal na Birhen ng Hapis ay nagpaparangal sa pitong sandali ng pinakamatinding pagdurusa sa buhay ni Maria: (1) ang propesiya ni Simeon sa pagpapakita ng Sanggol na Hesus; (2) ang pagtakas sa Egypt; (3) ang pagkawala ng Bata sa Templo; (4) ang pagsalubong kay Hesus sa daan ng Kalbaryo; (5) ang pagkamatay ni Hesus sa krus; (6) si Hesus na inalis mula sa krus at inialay kay Maria (ang Pietà); at (7) si Hesus na inilibing. Ang devotion sa Pitong Hapis ay nagmula sa ika-13 siglo (Order of the Servites of Mary, Florence 1233) at ipinatupad ni Papa Benedikto XIII sa buong Simbahan noong 1727. Ang liturhikal na piyesta ng Setyembre 15 ay binibigyang-diin ang Marian corredemption: si Maria ay tumayo sa tabi ng krus (stabat Mater). Sa Pilipinas, ang devotion sa Mater Dolorosa ay laganap sa Mahal na Araw, lalo na sa Biyernes Santo at sa mga prusisyon ng Birhen ng Hapis sa maraming probinsya.",
    prayerText:
      "O Maria, Inang lubhang nahapis, isinasamo namin sa iyo na, sa pamamagitan ng iyong sariling kalungkutan sa paanan ng Krus, ipagkaloob mo sa amin ang biyayang tiisin ang aming mga paghihirap nang may pasensya at pag-ibig, kasama ng mga paghihirap ng iyong banal na Anak. Ikaw na naroon sa Kalbaryo at ang kaluluwa ay sinasakal ng tabak ng pighati ayon sa propesiya ni Simeon, ipagkaloob mo sa amin ang lakas na huwag lumayo sa krus kapag ito ay dumating sa aming buhay. Tanggapin mo sa iyong Inmaculadong Puso ang intensyon na inihahain ko sa iyo ngayon (banggitin ang intensyon), at turuan mo kami na tumayo, gaya mo, sa tabi ng mga naghihirap. Reyna ng mga Martir, ipanalangin mo kami. Amen.",
    instructions:
      "Ang nobena ay binubuo ng tradisyonal na pagmumuni sa bawat araw sa isa sa Pitong Hapis. Pang-araw-araw na istruktura: (1) Tanda ng Krus; (2) maikling pagbasa ng katugmang ebanghelyo (Lc 2, Mt 2, Jn 19); (3) tahimik na pagmumuni sa loob ng ilang minuto — ang tampok ng nobenang ito ay katahimikan; (4) isang Aba Ginoong Maria para sa bawat Hapis (pito sa bawat araw); (5) ang panalangin ng nobena; (6) isang Ama Namin at Luwalhati. Alternatibong devosyon na laganap sa Pilipinas: ang Korona ng Pitong Hapis (tinatawag ding Servite Rosary): pitong maliit na grupo ng isang Ama Namin at pitong Aba Ginoong Maria, bawat isa ay nagmumuni sa isang Hapis. Ang nobena ay natural na nakatugma sa mga pagbisita sa Banal na Sakramento at sa pagsasama sa isang taong kasalukuyang nasa pagdadalamhati — hindi sa salita, kundi sa presensya.",
    patronSaint: "Birheng Hapis · Reyna ng mga Martir",
    feastDay: "Setyembre 15",
    source: "CBCP + Vatican.va + tradition of the Servites of Mary (Florence, 1233) + Benedict XIII (1727). Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-mount-carmel",
    name: "Nobena sa Mahal na Birhen ng Karmelo",
    description:
      "Ang devotion sa Mahal na Birhen ng Karmelo ay nag-ugat sa Bundok ng Karmelo sa Banal na Lupa, kung saan nagdasal ang propetang si Elias para sa ulan na magtatapos sa tagtuyot ng Israel (1 Mga Hari 18). Ang mga Latin na ermitanyo na nakatira doon noong ika-12 siglo ay nabuo bilang Order of Carmel sa ilalim ng panuntunan ni San Albert ng Jerusalem (ca. 1209). Sa gabi ng Hulyo 16, 1251, sa Cambridge, ang Mahal na Birheng Maria ay nagpakita kay San Simon Stock at inialay ang kayumangging Scapular kasama ng pangako: «Ang sinumang mamamatay na nakasuot ng Scapular na ito ay hindi magdurusa sa walang hanggang apoy». Pinatibay ng Simbahan ang pangakong ito — naiintindihan nang tama bilang tanda ng anak na pag-aalay kay Maria. Sa Pilipinas, ang Mahal na Birhen ng Karmelo ay may malalim na devotion sa mga Carmelite na parokya at sa mga komunidad sa Bicol, Cebu at Manila. Ang piyesta ng Hulyo 16 ay pista ng Scapular. Ang nobena ay idinadasal mula Hulyo 7 hanggang 15.",
    prayerText:
      "O Birhen ng Bundok ng Karmelo, magandang Bulaklak ng Karmelo, namumulaklak na Bunga, Karilagan ng Langit, dalisay na Ina ng Anak ng Diyos at Ina namin, tingnan mo ako nang may habag. Tala ng dagat, tulungan mo ako sa aking mga paglalakbay sa tubig ng mundong ito. Sa pamamagitan ng iyong Banal na Scapular, tanda ng iyong maternal na proteksyon, ibigay mo sa akin ang biyaya ng huling pagtitiyaga, at ipagkaloob mo ngayon ang biyaya na aking hinihiling (banggitin ang intensyon), kung naaayon ito sa kalooban ng Diyos. Reyna at Kagandahan ng Karmelo, ipanalangin mo kami. Amen.",
    instructions:
      "Idasal nang isang beses sa isang araw sa loob ng siyam na magkakasunod na araw, lalo na mula Hulyo 7 hanggang 15. Istruktura: (1) Tanda ng Krus; (2) Awit 23 («Ang Panginoon ang aking pastol») o ang Magnificat (Lc 1,46-55); (3) ang panalangin ng nobena; (4) limang Aba Ginoong Maria na umaalala sa limang siglo ng Carmelite devotion; (5) ang jaculatorya na «Bulaklak ng Karmelo, namumulaklak na Bunga, Karilagan ng Langit, Ina ng Anak ng Diyos, marangal na Ina namin». Kung nakasuot ka ng Scapular, alalahanin na ang paggamit nito ay nangangahulugan ng pamumuhay-Kristiyano — hindi anting-anting kundi tanda ng anak na pakikipag-ugnayan kay Maria. Kung wala ka pa, isaalang-alang ang pagtanggap nito sa sacramental imposition pagkatapos ng nobena. Ang Carmelite devotion ay yumayaman sa pagbabasa ng mga dakilang mystikal ng Order: Santa Teresa ng Jesus, San Juan ng Krus, Santa Teresita ng Sanggol na Hesus.",
    patronSaint: "Mahal na Birhen ng Karmelo · San Simon Stock",
    feastDay: "Hulyo 16",
    source: "CBCP + Vatican.va + Rule of St. Albert of Jerusalem (ca. 1209) + Benedict XIII (extension 1726) + Order of Carmel tradition. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-padre-pio",
    name: "Nobena kay San Pio ng Pietrelcina",
    description:
      "Si San Pio ng Pietrelcina (Francesco Forgione, 1887-1968) ay isang Italian Capuchin priest na ang buhay ay minarkahan ng pambihirang mistikal na mga kaloob at walang kompromisong asetik na pamumuhay. Noong Setyembre 20, 1918, habang nagdadasal sa choir ng simbahan sa San Giovanni Rotondo, natanggap niya ang mga sugat ni Kristo (stigmata) — ang tanging ganap na nakikitang stigmata na dokumentado sa isang pari ng Simbahan. Nabuhay si Padre Pio na karamihan ng kanyang adult life bilang confessor: labing-anim na oras sa isang araw sa confessional, madalas binabasa ang mga konsensya ng mga penitents bago pa man sila magsalita. Ang kanyang kaloob ng bilocation, mga propesiyang natupad, mga himala ng pagpapagaling at pagtatayo ng Casa Sollievo della Sofferenza ay ginawa siyang isa sa pinakaminamahal at lalong binabantayan na mga personalidad ng ika-20 siglo. Beatified ni JPII noong 1999 at canonized noong June 16, 2002. Sa Pilipinas, ang devotion kay Padre Pio ay isa sa pinakamalalaking modernong devotion, na may santuario sa maraming probinsya at sa Manila.",
    prayerText:
      "Mahal na Diyos, ibinigay Mo kay San Pio ng Pietrelcina ang pribilehiyong makibahagi sa pambihirang paraan sa Pasyon ng Iyong Anak. Ipagkaloob Mo sa akin sa pamamagitan ng kanyang pamamagitan ang biyaya ng (banggitin ang intensyon), na buong-puso kong hinahangad mula sa puso ni Hesus. San Pio ng Pietrelcina, dakilang pari ng confessional, dakilang kaibigan ng mga maysakit at mga makasalanan, ipanalangin mo ako. Padre Pio, lalaking puno ng mga sugat ni Kristo, ipagkaloob mo sa akin ang biyayang tanggapin ang sarili kong mga krus tulad ng pagtanggap mo sa iyong mga krus: nang may matatag na pananampalataya, may malumanay na pagpapakumbaba. Ipagkaloob mo rin sa akin ang disposisyong gumawa ng mabuting kumpisal. Amen.",
    instructions:
      "Idasal nang isang beses sa isang araw sa loob ng siyam na magkakasunod na araw. Tradisyonal na istruktura: (1) Tanda ng Krus; (2) isang maikling pagsusuri ng konsensya — si Padre Pio ay pangunahing confessor; (3) ang panalangin ng nobena; (4) isang Ama Namin, Aba Ginoong Maria at Luwalhati bilang parangal sa Limang Sugat; (5) limang Ama Namin at Aba Ginoong Maria para sa intensyon ng Papa. Inirerekomenda ni Padre Pio ang tatlong disiplina: (a) lingguhang kumpisal, (b) pang-araw-araw na Komunyon kung maaari, (c) espirituwal na direksyon sa isang stable confessor. Para sa mga maysakit: idasal ang nobena sa tabi ng kama ng maysakit, na inaalala na siya mismo ay namuhay ng karamihan ng buhay na may patuloy na pisikal na sakit.",
    patronSaint: "San Pio ng Pietrelcina",
    feastDay: "Setyembre 23",
    source: "CBCP + Vatican.va (canonization homily of JPII, June 16, 2002) + epistolary of Padre Pio. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-faustina",
    name: "Nobena kay Santa Maria Faustina Kowalska",
    description:
      "Si Santa Maria Faustina Kowalska (1905-1938) ay isang abang Polish na madre ng Congregation of the Sisters of Our Lady of Mercy, na pinili ni Hesus bilang sekretarya at apostol ng Kanyang Divine Mercy. Sa pagitan ng 1931 at 1938, sa convent ng Płock at Krakow, tinanggap niya ang mga rebelasyon ni Hesus na isinulat sa kanyang Dzienniczek (Diary). Sa mga rebelasyong iyon ay hiniling ni Hesus: (1) ang imahen ng Panginoon ng Divine Mercy na may inskripsyon na «Jesus, I Trust in You»; (2) ang Linggo ng Divine Mercy bilang piyesta ng unibersal na Simbahan; (3) ang Chaplet of Divine Mercy; at (4) ang Oras ng Awa (3:00 PM). Canonized ni Papa San Juan Pablo II noong April 30, 2000, sa parehong araw na itinatag niya ang piyesta ng Divine Mercy. Sa Pilipinas, ang devotion sa Divine Mercy ay malalim — maraming parokya at santuario ang nakatuon, at ang Linggo ng Divine Mercy ay malaking pista sa kalendaryo ng parokya.",
    prayerText:
      "O Walang-hanggang Ama, ako ay tumitingin nang may mahabaging mata sa (intensyon ng araw), at sa pamamagitan ng mga matinding merito ng Pasyon ni Hesukristo at ng Kanyang Sagradong Puso, akitin Mo ang mga kaluluwang ito sa Iyong Kaharian, upang malaman nila ang Iyong hindi-masusukat na awa. Hesus, bukal ng buhay, nagtitiwala ako sa Iyo. (Idasal ang Chaplet of Divine Mercy para sa intensyon ng araw.) Santa Faustina Kowalska, apostol ng Divine Mercy, ipanalangin mo kami upang matutuhan naming magtiwala tulad ng iyong pagtitiwala. Amen.",
    instructions:
      "Ang nobena ay siyam na magkakasunod na araw, lalo na mula Biyernes Santo hanggang Sabado bago ang Linggo ng Divine Mercy. Bawat araw ay may espesipikong intensyon na ibinigay ni Hesus (araw 1 buong sangkatauhan, araw 2 mga pari, araw 3 mga banal na kaluluwa, araw 4 mga di-naniniwala, araw 5 mga hiwalay na kapatid, araw 6 mga mapagpakumbaba, araw 7 mga devotee, araw 8 mga kaluluwa sa Purgatoryo, araw 9 mga malamig na kaluluwa). Istruktura: (1) Tanda ng Krus; (2) maikling pagbasa ng intensyon ng araw; (3) ang panalangin ng araw; (4) ang buong Chaplet of Divine Mercy; (5) pagsasara sa «Jesus, I Trust in You». Para sa mga urgent na sitwasyon, pagsamahin sa Kumpisal, Komunyon, at pagbisita sa Banal na Sakramento sa Oras ng Awa.",
    patronSaint: "Santa Maria Faustina Kowalska",
    feastDay: "Oktubre 5 (canonization April 30, 2000)",
    source: "CBCP + Vatican.va (canonization JPII April 30, 2000) + Dzienniczek / Diary of St. Faustina (1209-1229). Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-john-paul-ii",
    name: "Nobena kay San Juan Pablo II",
    description:
      "Si San Juan Pablo II (Karol Józef Wojtyła, 1920-2005) — ang unang Polish Papa at ang unang non-Italian Papa sa apat-na-raan at limampu't-limang taon — ay pinamunuan ang Katolikong Simbahan mula Oktubre 16, 1978 hanggang Abril 2, 2005. Ang kanyang buhay ay tumawid sa dalawang totalitarianismo ng ika-20 siglo: ang Nazi occupation ng Poland at ang Communist regime. Nakaligtas siya sa pagtatangkang pagpatay noong Mayo 13, 1981 — piyesta ng Birheng Fatima — at iniugnay ang kanyang pagligtas sa pamamagitan ni Maria. Kinanonisa niya ang 482 santo. Bumisita siya sa Pilipinas dalawang beses (1981 at 1995) — ang 1995 World Youth Day sa Manila ay nakakuha ng higit sa apat na milyong kalahok, ang pinakamalaking pagtitipon ng tao sa kasaysayan ng World Youth Day. Namatay noong Abril 2, 2005, bisperas ng Linggo ng Divine Mercy. Canonized ni Papa Francisco noong Abril 27, 2014. Ang nobena ay angkop para sa pagtawag sa mga vocation, lakas sa harap ng persecution, biyaya para sa kabataan, depensa ng buhay, o anumang intensyon ng pamilya.",
    prayerText:
      "O Santíssimo Trinidad, nagpapasalamat kami sa Iyo sa pagbibigay sa Iyong Simbahan kay San Juan Pablo II, kung saan nagningning ang Iyong lambing, ang amang mukha ng Iyong awa, ang pag-ibig kay Kristo Asawa ng Simbahan at ang pagsalubong sa tao, minamahal na anak ng Diyos. Ipagkaloob Mo sa amin sa pamamagitan ng kanyang pamamagitan, ayon sa Iyong kalooban, ang biyaya na hinihiling namin ngayon (banggitin ang intensyon). San Juan Pablo II, mula sa bintana ng Langit, ibigay mo sa amin ang iyong basbas. Pagpalain mo ang Simbahan, pagpalain mo ang mundo, pagpalain mo lalo na ang mga pamilya at mga kabataan. Amen. At gaya ng paulit-ulit mong sinabi: «Huwag matakot! Buksan ang mga pinto kay Kristo!»",
    instructions:
      "Idasal nang isang beses sa isang araw sa loob ng siyam na magkakasunod na araw. Istruktura: (1) Tanda ng Krus; (2) Gawa ng Pananampalataya o ang Apostles' Creed; (3) Maikling pagbasa ng isang sipi ng kanyang encyclical o ng Letter to Families; (4) Limang misteryo ng Banal na Rosaryo, lalo na ang Luminous Mysteries na idinagdag niya sa Rosarium Virginis Mariae (2002); (5) Ang panalangin ng nobena; (6) Pagsasara sa «Totus Tuus» — «Lubusang sa Iyo». Para sa Filipino Catholic youth, isang inirerekomendang practice ay magdasal ng nobena sa siyam na araw bago ang World Youth Day. Ang 1995 WYD sa Manila ay direktang inspirasyon ni JPII at nananatiling makabuluhang puntong pang-kasaysayan para sa Filipino Catholic identity.",
    patronSaint: "San Juan Pablo II",
    feastDay: "Oktubre 22 (canonization April 27, 2014)",
    source: "CBCP + Vatican.va (canonization homily of Pope Francis, April 27, 2014) + Karol Wojtyła, Gift and Mystery (1996) + 1995 WYD Manila apostolic pilgrimage. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-mother-teresa",
    name: "Nobena kay Santa Teresa ng Kalkuta",
    description:
      "Si Santa Teresa ng Kalkuta (Anjezë Gonxhe Bojaxhiu, 1910-1997) — ipinanganak sa Skopje sa isang Albanian Catholic family — ay pumasok noong 1928 sa Sisters of Loreto at nagturo sa loob ng halos dalawang dekada sa isang girls' school sa Kalkuta. Noong Setyembre 10, 1946, sa tren papuntang Darjeeling, tinanggap niya ang tinawag niyang «tawag sa loob ng tawag»: ang inspirasyon na umalis sa Loreto upang paglingkuran si Kristo sa pinakamahirap sa mga mahirap sa mga lansangan ng Kalkuta. Itinatag ang Missionaries of Charity noong 1950. Nakatanggap ng Nobel Peace Prize noong 1979. Pagkamatay niya, lumitaw ang kanyang mga personal na sulat, na nagsisiwalat ng «madilim na gabi ng kaluluwa» na limampung taon na inintindi niya bilang pakikibahagi sa espirituwal na uhaw ni Kristo sa krus («ako ay nauuhaw», Jn 19,28). Canonized ni Papa Francisco noong Setyembre 4, 2016. Sa Pilipinas, ang Missionaries of Charity ay may mga bahay sa Manila, Cebu at iba pang malalaking siyudad.",
    prayerText:
      "O Santíssimo Trinidad, nagpapasalamat kami sa Iyo sa pagbibigay kay Santa Teresa ng Kalkuta, tapat na lingkod ng pinakamahirap sa mga mahirap. Sa pamamagitan ng kanyang pamamagitan, ipagkaloob Mo sa amin ang biyaya na hinihiling namin ngayon (banggitin ang intensyon). At higit sa lahat, ipagkaloob Mo sa amin ang puso na tulad ng kanyang puso: kayang makita si Kristo sa bawat kapatid na naghihirap, kayang maglingkod nang hindi naghihintay ng kapalit, kayang magpatuloy sa paniniwala kahit hindi na nararamdaman. Santa Teresa ng Kalkuta, ipanalangin mo kami at lahat ng kinalimutan ng mundo. Amen.",
    instructions:
      "Idasal nang isang beses sa isang araw sa loob ng siyam na magkakasunod na araw. Istruktura: (1) Tanda ng Krus; (2) gawa ng pananampalataya; (3) Pagbasa ng «ako ay nauuhaw» sa Juan 19,28 o ng parabola ng huling paghuhukom sa Mateo 25; (4) ang panalangin ng nobena; (5) isang Ama Namin, Aba Ginoong Maria at Luwalhati; (6) banggitin ang intensyon. Yumayaman ang nobena kung sinasamahan ng konkretong mga gawa ng pag-ibig sa loob ng siyam na araw: pagbisita sa maysakit, paglilingkod sa pamilyang matanda, donasyon sa gawain ng habag. Eucharistic ang espirituwalidad ni Madre Teresa — ang Missionaries of Charity ay gumugugol ng isang oras sa harap ng Banal na Sakramento bawat araw. Para sa mga dumaranas ng dark night of the soul, lalong angkop ang nobena.",
    patronSaint: "Santa Teresa ng Kalkuta",
    feastDay: "Setyembre 5",
    source: "Vatican.va (canonization of Pope Francis, September 4, 2016) + Come Be My Light (private letters, published 2007) + CBCP + Missionaries of Charity in the Philippines. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-rita",
    name: "Nobena kay Santa Rita ng Cascia",
    description:
      "Si Santa Rita ng Cascia (Margherita Lotti, 1381-1457) ay sinasamba bilang «Tagapagtaguyod ng mga Imposible» at «Santa ng mga Desperate Causes». Sa Pilipinas, ang devotion sa kanya ay laganap, lalo na sa mga Augustinian parishes (na may matagal nang presensya sa Pilipinas mula sa Spanish era). Ikinasal nang hindi sariling kagustuhan sa edad na labindalawa sa isang marahas na lalaki, tiniis ng labing-walong taon ng pang-aabuso nang hindi nawawalan ng pananampalataya. Pagkamatay ng asawa (pinatay sa pagiging masamang gawi) at ng dalawang anak na lalaki (na sumumpa ng paghihiganti at namatay sa sakit bago makagawa ng kasalanan), pumasok sa Augustinian monastery ng Cascia. Sa 1442 tinanggap ang isang partial stigma: isang tinik mula sa korona ni Kristo ay tumusok sa kanyang noo. Bago mamatay, sa kasagsagan ng taglamig, humingi siya ng isang rosas mula sa kanyang tinubuang lugar — kung saan namulaklak ang rosal nang himala. Canonized ni Leo XIII noong 1900. Ang nobena ay ang Katolikong panalangin para sa mga sitwasyong imposible: kasal na walang lutas, mga nawawalang anak, walang lunas na sakit, matagal nang alitan.",
    prayerText:
      "O Santa Rita ng Cascia, dakilang halimbawa ng pasensya at pagtitiyaga, ikaw na sa loob ng maraming taon ay tiniis ang isang masakit na pag-aasawa nang walang pagkawala ng kabutihan, ikaw na nagdala sa iyong noo ng tinik ni Kristo, ikaw na nakatanggap ng himala na rosas sa kasagsagan ng taglamig — ipagkaloob mo sa akin mula sa Diyos ang biyaya na may abang pagtitiwala kong isinusumamo (banggitin ang intensyon). Alam ko na maraming beses na ang mga daan ng tao ay sarado, ang mga puso ay matigas, ang mga sitwasyon ay naka-block. Ngunit ikaw, tagapagtaguyod ng mga imposible, alam mong mamagitan para sa amin. Ipagkaloob mo sa akin ang lakas na magpatuloy sa panalangin, ang pasensya na tiisin ang hindi ko mababago, at ang biyaya na makilala ang kamay ng Diyos kahit kailan tila lahat ay nawawala. Santa Rita, tagapagtaguyod ng mga imposible, ipanalangin mo kami. Amen.",
    instructions:
      "Idasal nang isang beses sa isang araw sa loob ng siyam na magkakasunod na araw, lalo na mula Mayo 14 hanggang 22. Istruktura: (1) Tanda ng Krus; (2) gawa ng pagpapakumbaba; (3) ang panalangin ng nobena; (4) isang dekada ng Banal na Rosaryo, sa Sorrowful Mysteries; (5) Ama Namin, Aba Ginoong Maria at Luwalhati; (6) banggitin ang konkretong «imposible» na sitwasyon. Tradisyon: bendisyon ng mga rosas sa araw ng piyesta (Mayo 22) — maraming Augustinian parishes sa Pilipinas ay gumagawa ng tradisyonal na bendisyon. Ang nobena ay umaalingawngaw sa: (a) magaling na kumpisal sa loob ng siyam na araw; (b) tuluy-tuloy na pagkilos ng reconciliation; (c) pagbasa ng aklat ni Tobit o ni Job.",
    patronSaint: "Santa Rita ng Cascia",
    feastDay: "Mayo 22",
    source: "CBCP + Vatican.va (Leo XIII, canonization 1900) + Augustinian Monastery of Cascia (Italy) + Augustinian Province in the Philippines. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-peregrine",
    name: "Nobena kay San Peregrine Laziosi",
    description:
      "Si San Peregrine Laziosi (1265-1345) ay ang unibersal na patron ng mga may-sakit ng kanser. Ipinanganak sa Forlì, Italya, sa isang noble Italian family ng anti-papal faction, nagbalik-loob siya pagkatapos masampal niya si San Felipe Benizi at tinanggap mula rito ang kabilang pisngi bilang sagot. Pumasok sa Order of Servants of Mary at nabuhay bilang pari at preacher sa loob ng higit sa apat-napung taon. Sa edad na anim-napung taon, isang personal na pagsisisi (hindi siya umuupo kapag kayang tumayo) ay nagdulot sa kanyang kanang binti ng cancerous na sugat na napakalala kaya nagpasiya ang mga doktor na putulin ang binti. Sa gabi bago ang operasyon, nanatili si Peregrine sa pagdarasal sa harap ng krusipiho; kinabukasan ng umaga, natagpuan siya ng mga surgeon na ganap na pinagaling. Nabuhay pa ng dalawampung taon. Canonized ni Benedict XIII noong 1726. Sa Pilipinas, ang devotion ay matagumpay sa mga ospital na pang-Katoliko at sa mga komunidad na may oncology patients.",
    prayerText:
      "O Diyos, na nagbigay kay San Peregrine, Iyong lingkod, ng pribilehiyong makuha sa pamamagitan ng kanyang panalangin ang pagpapagaling ng isang hindi-malulutas na sakit, ipagkaloob Mo sa amin sa pamamagitan ng kanyang pamamagitan ang kalusugan ng katawan at ng kaluluwa. San Peregrine, ikaw na alam ang bigat ng kanser sa sariling laman, tingnan mo ako nang may iyong compassion ng pasyente. Ialay mo ang sarili para sa akin (o para sa taong ipinagdadasal ko: banggitin ang pangalan) sa harap ng trono ni Kristo na manggagamot, at ipagkaloob mo sa akin, kung kalooban ng Ama, ang pisikal na pagpapagaling. At kung hindi iyon ang kalooban ng Diyos, ipagkaloob mo man lang ang pagpapagaling ng kaluluwa, ang pasensya sa sakit, ang pananampalataya na hindi nasisira. Amen.",
    instructions:
      "Idasal nang isang beses sa isang araw sa loob ng siyam na magkakasunod na araw, lalo na mula Abril 22 hanggang 30 sa paghahanda para sa piyesta ng Mayo 1. Istruktura: (1) Tanda ng Krus; (2) maikling pagbasa ng ebanghelyo ng pagpapagaling ng ketongin (Mc 1,40-42) o ng babaeng dinudugo (Mc 5,25-34); (3) ang panalangin ng nobena; (4) isang Ama Namin, Aba Ginoong Maria at Luwalhati para sa espesipikong intensyon; (5) gawa ng pagsisisi. Para sa mga pasyente ng kanser sa oncology treatment, idasal ang nobena sa tabi ng kama ng maysakit. Ang bendisyon ng maysakit gamit ang relikya ni San Peregrine (matatagpuan sa Servite parishes) ay sacramental. Pagsamahin sa: (a) mga sakramento ng maysakit — Kumpisal, Pamamahid sa Maysakit, Komunyon; (b) pagdarasal ng pamilya; (c) mga gawa ng kabutihan para sa ibang maysakit.",
    patronSaint: "San Peregrine Laziosi (patron of cancer patients)",
    feastDay: "Mayo 1",
    source: "CBCP + Order of Servants of Mary (OSM) + Vatican.va (Benedict XIII, canonization 1726) + Sanctuary of Forlì. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-dymphna",
    name: "Nobena kay Santa Dymphna",
    description:
      "Si Santa Dymphna (s. VII, m. ca. 650) ay ang unibersal na patron ng mga maysakit sa isip, ng mga neurodivergent, ng mga traumatized, at ng mga biktima ng incest at abuso. Anak ng isang paganong haring Irish at ng isang Christian na ina na namatay nang siya ay teenager pa, tumakas si Dymphna sa kanyang ama (na nababaliw sa pagdadalamhati at sinubukang pakasalan siya). Nakarating sa Geel, sa ngayong Belgium, at inialay ang buhay sa paglilingkod sa mga mahirap at mga maysakit sa isip. Natagpuan siya ng kanyang ama at pinatay ng kanyang sariling mga kamay; halos labinlimang taon siya. Ang Geel mula ika-13 siglo ay naging isa sa mga unang sentro sa daigdig na Kristiyano para sa makataong pangangalaga sa mga maysakit sa isip — isang modelo na nag-inspirasyon sa modernong komunidad na psychiatry. Ang nobena ay angkop para sa pagpapagaling ng loob pagkatapos ng trauma; pagpapagaling o marangal na paghawak ng matagal nang sakit sa isip; pagprotekta sa mahal sa buhay na neurodivergent; lakas na magpatawad ng abuser; at biyaya na maghanap ng propesyonal na tulong kung kinakailangan.",
    prayerText:
      "O Diyos, na pumili kay Santa Dymphna bilang patrona ng mga maysakit sa isip at ng mga biktima ng abuso, ipagkaloob Mo sa amin sa pamamagitan ng kanyang pamamagitan ang biyaya na hinihiling namin ngayon (banggitin ang espesipikong intensyon). Santa Dymphna, dalagang martir na alam mo sa sariling laman ang dilim ng pang-aabuso sa pamilya at pinili ang katapatan kay Kristo bago ang pagsang-ayon sa makapangyarihang kasamaan, ipagkaloob mo sa amin ang lakas na huwag mahimbing sa kung ano ang dapat ihayag, ang lakas-loob na pangalagaan ang mga mahihina, at ang pasensya na samahan ang mga nagdurusa sa isip, sa puso o sa espiritu. Amen.",
    instructions:
      "Idasal nang isang beses sa isang araw sa loob ng siyam na magkakasunod na araw, lalo na mula Mayo 7 hanggang 15. Istruktura: (1) Tanda ng Krus; (2) gawa ng pagtitiwala; (3) ang panalangin ng nobena; (4) ang Sorrowful Mysteries ng Banal na Rosaryo; (5) Ama Namin, Aba Ginoong Maria at Luwalhati. Inirerekomenda ng Simbahang Katoliko ang pagsasama ng panalangin + sakramento + propesyonal na psychological o psychiatric care kung kinakailangan — ang isang maysakit ng clinical depression ay dapat magdasal at gamutin nang sabay. Kung idinadasal ang nobena para sa isang biktima ng abuso, samahan ang panalangin ng pastoral conversation sa pari at, kung kinakailangan, ipaalam ang abuso sa mga competent authorities.",
    patronSaint: "Santa Dymphna ng Geel (patrona ng mga maysakit sa isip at mga biktima ng abuso)",
    feastDay: "Mayo 15",
    source: "CBCP + Catholic Church of Geel (Belgium) + Vatican.va (Acta Sanctorum Mai III) + Bollandists. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-gerard",
    name: "Nobena kay San Gerardo Majella",
    description:
      "Si San Gerardo Majella (1726-1755) ay ang unibersal na patron ng mga inaasahang ina, ng mga sanggol na hindi pa isinilang at ng mahihirap na panganganak. Redemptorist, lay brother ng Congregation of the Most Holy Redeemer na itinatag ni San Alphonsus Maria de Liguori, nabuhay siya ng tatlong taon lang sa congregation, marka ng pambihirang mistikal na mga kaloob: bilocation, prophecy, pagbabasa ng konsensya. Ang kanyang asosasyon sa mga ina ay nagmula sa kasaysayan: isang batang ina, sa pagtanggap mula sa kanya ng panyo na nakalimutan, ay narinig siyang sabihin «itago mo ito; magagamit»; pagkatapos ng mga taon, sa mapanganib na panganganak, inilagay ang panyo sa kanyang tiyan at nanganak nang walang hirap. Canonized ni Pius X noong 1904. Sa Pilipinas, ang devotion sa kanya ay matatag sa mga Redemptorist parishes (Baclaran, Manila, especially) at sa mga komunidad ng mga ina. Ang nobena ay angkop para sa mga buntis na babae, lalo na sa mahihirap na sitwasyon: nagdaang pagkalaglag ng sanggol, advanced maternal age, mga prenatal na diagnosis, premature delivery, prolonged infertility.",
    prayerText:
      "O dakilang San Gerardo Majella, tapat na kaibigan ng mga sanggol na hindi pa ipinanganak at ng mga inaasahang ina, tingnan mo nang may habag ang inang ito na ngayon ay nag-aalay sa iyong pamamagitan (banggitin ang pangalan o sitwasyon). Ikaw na sa buhay ay alam ang puso ng ina bago pa ito magsalita, ipagkaloob mo sa kanya mula sa Diyos ang malusog na pagdadalantao, ligtas na panganganak, at isang sanggol na handa mula sa sinapupunan na tumanggap ng binyag at mabuhay sa Kristiyanong tawag. Para sa mga umaasang magkaroon ng anak, ipagkaloob mo ang kaloob ng fertility kung kalooban ng Diyos. Para sa mga nawalan ng sanggol, ipagkaloob mo ang aliw na malaman na ang maliit na iyon ay nagpapahinga na sa puso ni Kristo. Amen.",
    instructions:
      "Idasal nang isang beses sa isang araw sa loob ng siyam na magkakasunod na araw. Kung idinadasal para sa isang partikular na pagdadalantao, simulan sa simula ng third trimester. Istruktura: (1) Tanda ng Krus; (2) gawa ng pagtitiwala sa providence ng Diyos sa human life mula sa conception; (3) maikling pagbasa ng Awit 139; (4) ang panalangin ng nobena; (5) isang misteryo ng Banal na Rosaryo, lalo na ang Joyful Mysteries; (6) Ama Namin, Aba Ginoong Maria at Luwalhati. Mga Filipino traditions: (a) medalya ni San Gerardo sa buong pagdadalantao; (b) bendisyon ng cradle bago ipanganak; (c) pagdiriwang ng piyesta (Oktubre 16) sa pamilya. Para sa mga nawalan (miscarriage, stillbirth), pagsamahin sa pastoral na pagdiriwang ng maliit na buhay na nawala.",
    patronSaint: "San Gerardo Majella, CSsR",
    feastDay: "Oktubre 16",
    source: "CBCP + St. Alphonsus Maria de Liguori, Vita di Fra Gerardo Maiella (1755) + Redemptorist tradition in the Philippines (Baclaran). Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-gianna-molla",
    name: "Nobena kay Santa Gianna Beretta Molla (Patron ng mga Ina sa Mahihirap na Pagdadalantao)",
    description:
      "Si Santa Gianna Beretta Molla (1922-1962) ay ang makabagong Italyanong patron ng mga inang humaharap sa high-risk na pagdadalantao, mga babaeng may asawa, mga inang nagtatrabaho, at mga doktor. Ipinanganak siya sa Magenta, Lombardy, ang ikasampu sa labintatlong anak sa isang Milanese-Katolikong pamilyang puno ng debosyon (dalawa sa kanyang mga kapatid na lalaki ay naging pari, dalawa sa mga babae ay naging madre). Nagtapos siya ng medisina sa Pavia bilang pediatrician at obstetrician, at nagpatakbo ng masaganang clinic sa nayon ng Mesero sa labas ng Milan sa buong dekada ng 1950. Siya ay sabay-sabay na aktibong doktor, Katolikong matapat sa araw-araw na Misa, sanay na pianista, magaling na skier, at, mula 1955, asawa ni Pietro Molla (isang engineer sa SAFFA match factory na sinuyo siya sa parish choir) at ina ng lumalaking pamilya: Pierluigi (1956), Mariolina (1957), at Laura (1959). Ang nagbigay-pasya na sandali ng kanyang kabanalan ay dumating noong Setyembre 1961 sa kanyang ikaapat na pagdadalantao. Pagkalipas ng dalawang buwan, nakatuklas ang mga doktor ng uterine fibroma — isang malaking benign na tumor na, kung hindi gagamutin, nagbabanta sa kanyang buhay at sa nabubuong bata. Tatlong medical option ang available: kumpletong hysterectomy (mailigtas si Gianna ngunit matatapos ang pagdadalantao at ang kanyang fertility, theologically permissible sa pamamagitan ng double effect principle); pag-aalis ng fibroma kasama ng abortion (hindi pinapayagan — direktang pagpatay sa bata); o pag-aalis lamang ng fibroma, iiwan ang pagdadalantao sa high risk ngunit mapapanatili ang bata. Pinili ni Gianna ang ikatlong daan at inutusan ang surgical team: «Kung kailangan ninyong pumili sa pagitan ng ina at ng bata, piliin ang bata. Idiniin ko: piliin ang bata. Iligtas ang bata». Tinapos niya ang pagdadalantao sa mahabang at pisikal na nakakapagod na huling mga buwan. Sa Sabado Santo, Abril 21, 1962, isinilang niya ang malusog na anak na babae — si Gianna Emanuela. Pagkalipas ng isang linggo, noong Abril 28, namatay si Gianna Beretta Molla sa septic peritonitis sa edad na 39. Beatified siya ni San Juan Pablo II noong Abril 24, 1994 (kasama ang kanyang asawang si Pietro at mga buhay na anak), at canonized noong Mayo 16, 2004, kasama ang biyudo, anak na babae, at anak na lalaki bilang saksi — ang unang canonization sa Katolikong kasaysayan kung saan buhay at naroroon ang asawa ng santo. Ang nobena ay angkop para sa: anumang high-risk na pagdadalantao; pagdadalantao kung saan nasa panganib ang kalusugan ng ina; mga pamilya sa NICU (kung saan ang medical formation ni Gianna bilang pediatrician ay espesyal na pakikipag-identify); mga babaeng tinitimbang ang mahihirap na medical decisions habang buntis; infertility at pagbawi mula sa miscarriage; mga mag-asawang nag-discern ng kaloob ng buhay; at mga inang nagtatrabaho na naghahanap ng integration ng professional vocation at maternity gaya ng ipinakita ni Gianna nang walang kompromiso. Ang kanyang anak na si Gianna Emanuela — ngayon ay doktor din — ay nagsasalita sa publiko tungkol sa testimony ng kanyang ina at naroroon sa Synod 2024.",
    prayerText:
      "O Diyos, aming Ama, kay Santa Gianna Beretta Molla ibinigay mo sa amin ang isang asawa, isang ina, at isang doktor na nabuhay sa bokasyon ng kasal at sa dignidad ng buhay bilang isang tuloy-tuloy na kaloob. Sa pamamagitan ng kanyang panalangin, ipagkaloob mo sa amin ang biyaya na hinihingi namin ngayon (banggitin ang intensyon). Lalong-lalo na, ipanalangin mo ang mga inang nagdadala ng mahihirap na pagdadalantao — na masumpungan nila kay Gianna ang isang kapatid at isang tagapagtanggol; ang mga pamilyang humaharap sa imposibleng medikal na desisyon sa sinapupunan — na matanggap nila ang karunungang tinanggap ni Gianna at ang tiwala na piliin ang kaloob ng buhay nang may kababaang-loob at pag-asa; ang mga inang nagtatrabaho — na maipagsama nila ang kanilang mga bokasyon gaya ng pinagsama ni Gianna ang medisina at pagiging ina; ang sanggol na hindi pa isinilang, minamahal at hinihintay sa takot at pagsisikip ng puso — na ang sanggol na ito ay protektahan, hubugin, at iligtas hanggang sa araw ng kapanganakan. Santa Gianna, na pinili mo ang buhay ng iyong anak higit sa iyo at namatay sa katiyakan ng muling pagkabuhay, ipanalangin mo kami. Amen.",
    instructions:
      "Idasal nang isang beses sa isang araw sa loob ng siyam na magkakasunod na araw. Ang nobena ay tradisyunal na idinadasal sa siyam na araw bago ang piyesta niya (Abril 28, ang petsa ng kanyang kamatayan) o sa siyam na araw bago ang Dakilang Kapistahan ng Anunsasyon (Marso 25, ang dakilang piyesta ng Pagkakatawang-tao na bumabalot sa lahat ng Katolikong panalangin para sa mga ina at sanggol na hindi pa isinilang). Ang nobena ay angkop din sa anumang sandali ng matinding medical decision habang nasa pagdadalantao: sa pagkadiskubre ng fetal anomaly, pagkatapos ng mahirap na ultrasound, sa mahabang hospital admission, sa tabi ng kuna sa NICU ng mahinang bagong silang. Istruktura: (1) Tanda ng Krus; (2) ang panalangin ng nobena; (3) isang dekada ng Rosaryo, lalo na ng Joyful Mysteries (Anunsasyon, Pagdalaw, Pagkapanganak, Pagdadala sa Templo, Pagkahanap sa Bata) — limang misteryo na tumatakbo sa espirituwal na arko ng pagiging ina na nabuhay si Gianna; (4) ang Memorare; (5) banggitin sa pangalan ang ina, ang sanggol, at ang intensyon. Pagsamahin ang nobena sa dalawang debosyonal na gawain na pinanatili mismo ni Gianna: araw-araw na pagdalo sa Misa (pangunahing haligi ng kanyang espirituwalidad) at consecration ng kasal sa Banal na Pamilya ni Hesus, Maria at Jose (ginawa nina Gianna at Pietro ang consecration na ito bago kanilang kasal at binabago nila ito taun-taon). Para sa mga pamilyang nasa NICU stay: maaaring idasal ang nobena sa tabi ng kuna, kahit nang tahimik, kahit fragmented — ang santa ng mga inang hindi makapanatili sa kama sa mahirap na pagdadalantao ay nauunawaan ang panalangin na idinadasal sa gulo. Ang debosyonal na tradisyon ng mga Pilipino sa Italya at sa Pilipinas mismo ay nagrerekomenda ng paglalakbay sa Mesero (parish church ng San Martino, kung saan inilibing si Gianna). Sa mga Catholic hospital sa Pilipinas — lalo na ang mga maternity wards — madalas magkaroon ng imahen ni Santa Gianna malapit sa pasukan.",
    patronSaint: "Santa Gianna Beretta Molla",
    feastDay: "Abril 28",
    source: "CBCP + Vatican.va (San Juan Pablo II, canonization Mayo 16, 2004, homily) + Fondazione Gianna Beretta Molla + Pietro Molla, Saint Gianna Molla: Wife, Mother, Doctor (Ignatius Press, 2004). Retrieved 2026-05-19.",
    reviewedAt: new Date("2026-05-19"),
  },
  {
    prayerSlug: "novena-st-anne",
    name: "Nobena kay Santa Ana",
    description:
      "Si Santa Ana, ayon sa tradisyong Kristiyano, ay ang ina ng Mahal na Birheng Maria at samakatuwid ang lola sa ina ng Panginoong Hesukristo. Ang kanyang pangalan — mula sa Hebreong Hannah, «biyaya» — at ang kasaysayan ng kanyang pag-aasawa kay San Joaquin ay nasa Protoevangelium of James (s. II). Sina Ana at Joaquin, kasal nang maraming taon na walang anak, naghirap sa lipunang stigma ng infertility hanggang sa anunsyo ng isang anghel kay Ana na magkakaroon siya ng anak na babae — si Maria. Ang devotion kay Santa Ana ay laganap sa Silangan mula ika-6 siglo at sa Kanluran mula ika-10. Sa Pilipinas, ang devotion ay isa sa pinakamatatagal — dumating ang devotion kasama ng mga unang Spanish colonizers noong ika-16 siglo. Ang Santuario ng Santa Ana sa Manila ay isa sa pinakaluma sa Pilipinas. Ang piyesta ng Hulyo 26 ay ipinagdiriwang kasama ng piyesta ni San Joaquin. Ang nobena ay angkop para sa mga mag-asawang naghihintay ng anak, para sa transmission ng pananampalataya ng mga lolo't lola, para sa pagpapagaling ng mga sugat sa pamilya, o para sa pagsasama sa isang matandang babae (ina, lola, biyenan) sa sakit o sa katapusan ng buhay.",
    prayerText:
      "O dakilang Santa Ana, puno ng habag para sa mga tumatawag sa iyo at ng pag-ibig sa mga naghihirap, naninikluhod ako sa iyong paanan at abang humihiling na ang kasalukuyang intensyon ay ilagay mo sa iyong espesyal na proteksyon (banggitin ang intensyon). Ipagkaloob mo sa akin ang biyayang makita si Hesus, mahalin Siya at paglingkuran Siya nang may dalisay na puso, kasama mo, kasama ni Maria, kasama ni Joaquin, sa buong buhay ko at sa buong walang-hanggan. Santa Ana, lola ng Panginoong Hesus, ipanalangin mo kami. Amen.",
    instructions:
      "Idasal nang isang beses sa isang araw sa loob ng siyam na magkakasunod na araw, lalo na mula Hulyo 17 hanggang 25. Istruktura: (1) Tanda ng Krus; (2) maikling pagbasa ng unang kabanata ng Lucas; (3) ang panalangin ng nobena; (4) isang misteryo ng Banal na Rosaryo (Joyful); (5) Ama Namin, Aba Ginoong Maria at Luwalhati; (6) banggitin ang intensyon. Filipino traditions: (a) pamilyang romeria sa santuario ni Santa Ana sa piyesta; (b) pagtipun-tipon ng tatlong henerasyon ng kababaihan sa pamilya — lola, ina, anak — para sa nobena; (c) bendisyon ng bahay sa imahen ni Santa Ana sa kuwarto ng pamilya. Para sa mga matatandang kababaihan na maysakit o naghihingalo, pagsamahin sa Pamamahid sa Maysakit at sa aktibong presensya ng mga apo sa tabi ng kama.",
    patronSaint: "Santa Ana · San Joaquin",
    feastDay: "Hulyo 26 (kasama ni San Joaquin)",
    source: "CBCP + Protoevangelium of James (s. II) + Santuario de Santa Ana sa Manila + Vatican.va. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "consecration-de-montfort",
    name: "Ganap na Pagpapakonsagra kay Hesus sa pamamagitan ni Maria (San Luis Maria Grignion de Montfort)",
    description:
      "Ang Ganap na Pagpapakonsagra kay Hesus sa pamamagitan ni Maria ay ang espirituwal na practice na pinaplaplano ni San Luis Maria Grignion de Montfort (1673-1716) sa kanyang akdang True Devotion to Mary. Itinuro ni Montfort, French missionary priest at popular preacher, na ang lubos na pagpapakonsagra sa Anak ay nararapat na higit na ganap kapag ito ay dumadaan sa maternal na pamamagitan ng Ina. Ang consecration ay binubuo ng intensiveng paghahanda ng 33 araw, na hinati sa apat na yugto, at nagtatapos sa Marian na piyesta na may pormal na pagsasagawa ng pagpapakonsagra. Si San Juan Pablo II ay gumawa ng consecration na ito sa edad na dalawampu't isang taon at pinanatili ang «Totus Tuus» — «Lubusang sa Iyo» — bilang motto sa episcopal at papal levels. Sa Pilipinas, ang Total Consecration ay laganap sa mga Marian na parokya at sa mga Marian na lay movements. Ito ang pinakairerekomenda ng Romano Katoliko tradition.",
    prayerText:
      "Ako, (sabihin ang sariling pangalan), maka-makasalanan, ay pinapanibago at pinatutunayan ngayon sa iyong mga kamay, O Inmaculadong Ina, ang aking mga panata ng binyag. Tinatanggihan ko magpakailanman si Satanas, ang kanyang mga pomp at ang kanyang mga gawa, at iniaalay ko ang sarili nang buong-buo kay Hesukristo, ang nagkatawang-tao na Karunungan. Pinipili kita ngayon, O Maria, sa harap ng buong korte ng langit, bilang aking Ina at Reyna. Iniaalay at iniaalay ko, bilang iyong alipin, ang aking katawan at ang aking kaluluwa, ang aking mga panloob at panlabas na ari-arian, at maging ang halaga ng aking mabubuting gawa noon, ngayon at sa hinaharap. Tanggapin mo, O kasing-buti-buting Birhen, ang maliit na regalong ito ng aking pagiging alipin, sa pinakamalaking kaluwalhatian ng Diyos. Amen.",
    instructions:
      "Ang paghahanda ay 33 araw at nagtatapos sa isang makabuluhang Marian na piyesta. Mga tradisyonal na petsa: (1) magsimula ng Nobyembre 20 para sa Disyembre 8 (Imaculadong Pagkasilang ni Maria); (2) magsimula ng Pebrero 20 para sa Marso 25 (Anunsyasyon); (3) magsimula ng Setyembre 7 para sa Oktubre 12 (Ina ng Diyos kay Aparecida — maraming Filipino Marian movements ay ginagamit ito). Pang-araw-araw na istruktura: (1) Tanda ng Krus; (2) pagbasa ng araw ayon sa apat na yugto (despoblamiento ng espiritu ng mundo, kaalaman sa sarili, kaalaman kay Maria, kaalaman kay Kristo); (3) Litanya ng Sagradong Puso sa unang linggo, Litanya ng Mahal na Birhen sa pangalawa, Litanya ng Sagradong Puso sa pangatlo; (4) Ama Namin at Aba Ginoong Maria; (5) Ave Maris Stella; (6) intensyon ng araw. Sa araw 33: kumpisal, Komunyon sa Marian Mass, ang pormal na pagsasagawa ng consecration sa harap ng Marian na imahen. Pinapanibago taun-taon.",
    patronSaint: "San Luis Maria Grignion de Montfort",
    feastDay: "Abril 28",
    source: "CBCP + Vatican.va + Treatise on the True Devotion to Mary (St. Louis Marie Grignion de Montfort, ca. 1712) + Apostolic letter Rosarium Virginis Mariae (JPII, 2002, on «Totus Tuus»). Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  // ── Wave 7 (2026-05-18): completes Filipino coverage to 100%. Sources:
  //    CBCP, Vatican.va, Word & Life Publications, Daughters of St. Paul
  //    Philippines. Filipino Catholic publishing is bilingual; English-
  //    Filipino mix reflects actual liturgical practice in PH parishes.
  {
    prayerSlug: "54-day-rosary-novena",
    name: "Nobena ng 54 na Rosas (54-Day Rosary Novena)",
    description:
      "Ang 54-Day Rosary Novena ay ibinunyag ng Mahal na Birheng Maria kay Fortuna Agrelli sa Naples noong 1884. Isang batang babae na may mapanganib na sakit, natanggap ni Fortuna sa pangitain ang utos na magdasal ng buong Rosaryo (limang dekada) sa loob ng 27 araw ng pagsamo at 27 araw ng pasasalamat — 54 araw lahat. Naaprubahan ng Papa Leo XIII. Angkop para sa mga agarang sitwasyon na nangangailangan ng tuloy-tuloy na pamamagitan.",
    instructions:
      "Idasal ang buong Rosaryo araw-araw sa loob ng 54 magkakasunod na araw. Unang 27 araw ay pagsamo; sumunod na 27 araw ay pasasalamat (Marcos 11,24). Rotasyon ng mga misteryo: araw 1 joyful, araw 2 sorrowful, araw 3 glorious, at uulit. Kung may makaligtaan na araw, magsisimula muli mula sa araw 1.",
    patronSaint: "Mahal na Birheng Maria, Rosa Mystica",
    feastDay: "Marian memorial (hindi calendrical)",
    source: "CBCP + Vatican.va + account of Fortuna Agrelli (Naples, 1884) + Leo XIII. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "brown-scapular",
    name: "Kayumangging Eskapulario ng Carmelo",
    description:
      "Ang Kayumangging Eskapulario ng Bundok ng Karmelo ay isang Katolikong sacramental — dalawang maliliit na piraso ng lana na kayumanggi na pinagdugtong ng mga laso, isinusuot sa mga balikat sa ilalim ng damit. Ibinigay ng Mahal na Birheng Maria kay San Simon Stock sa Cambridge noong Hulyo 16, 1251, kasama ng pangako: «Ang sinumang mamamatay na nakasuot ng eskapulario na ito ay hindi magdurusa sa walang-hanggang apoy». Hindi anting-anting; tanda ng katapatan kay Maria na nangangailangan ng pamumuhay-Kristiyano. Sa Pilipinas, ang devotion sa Eskapulario ay laganap sa mga Carmelite parishes.",
    instructions:
      "Para tumanggap, humanap ng pari na maaaring magbigay ng eskapulario sa pormal na rito ng Roman Ritual. Pagkatapos suotin, dapat ito ay walang-hintong nakasuot. Kung masira, palitan ng panibago. Mga responsibilidad: regular na kumpisal, madalas na Komunyon, araw-araw na Rosaryo o di kaya'y isang dekada, kalinisan ng buhay. Ang mga Sabado ay partikular na ipinapares sa eskapulario.",
    patronSaint: "Mahal na Birhen ng Karmelo · San Simon Stock",
    feastDay: "Hulyo 16",
    source: "CBCP + Vatican.va (Pius XII) + Order of Carmel + Roman Ritual. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "chaplet-st-michael",
    name: "Koronilya kay San Miguel Arkanghel",
    description:
      "Ang Koronilya kay San Miguel Arkanghel ay ibinunyag sa lingkod ng Diyos na si Antonia d'Astonac noong ika-18 siglo. Pinangakuan ni San Miguel ang sinumang magdasal nang taimtim: assistance ng angelic choir sa Komunyon; proteksyon ng siyam na angelic choirs sa buhay; final liberation mula sa Purgatoryo para sa nagdasal at mga kamag-anak. May siyam na invocation na tumutugma sa siyam na choirs ng anghel, bawat isa ay sinusundan ng isang Ama Namin at tatlong Aba Ginoong Maria. Nagtatapos sa apat na Ama Namin (San Miguel, San Gabriel, San Rafael, Guardian Angel) at panalangin ni Papa Leo XIII.",
    instructions:
      "Istruktura: (1) Tanda ng Krus; (2) jaculatorya «Diyos ko, halina at tulungan ako; Panginoon, magmadali Kang tumulong sa akin. Luwalhati sa Ama…»; (3) sa siyam na grupo, tawagin ang katugmang angelic choir, sinusundan ng Ama Namin at tatlong Aba Ginoong Maria; (4) ang apat na Ama Namin sa katapusan; (5) panalangin ni Papa Leo XIII kay San Miguel: «San Miguel Arkanghel, ipagsanggalang mo kami sa labanan…». Inirerekomenda ito ng mga eksorsista ng Simbahan.",
    patronSaint: "San Miguel Arkanghel",
    feastDay: "Setyembre 29 (Banal na Arkanghel)",
    source: "CBCP + Vatican.va + tradisyon ni Antonia d'Astonac + panalangin ni Papa Leo XIII (1884). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "first-fridays",
    name: "Devosyon ng Siyam na Unang Biyernes",
    description:
      "Ang Devosyon ng Siyam na Unang Biyernes ay ibinunyag ni Hesukristo kay Santa Margarita Maria Alacoque sa Paray-le-Monial (1673-1675). Sa malaking pangako, sinabi ni Hesus: «Sa labis na awa ng Aking Puso, pinangangako Ko sa lahat ng tatanggap ng Komunyon sa siyam na unang Biyernes ang biyaya ng huling pagtitiyaga: hindi sila mamamatay sa Aking kawalan-kabaitan, ni walang mga sakramento». Sa Pilipinas, ang devotion ay laganap sa mga parokya na nakatuon sa Sagradong Puso at sa Apostolate of Prayer.",
    instructions:
      "Mga kinakailangan: (1) tanggapin ang Sagradong Komunyon sa estado ng grasya sa unang Biyernes ng siyam na magkakasunod na buwan; (2) mabuting kumpisal kung kailangan; (3) ialay ang Komunyon sa intensyon ng Sagradong Puso at sa sariling huling pagtitiyaga; (4) kung may makaligtaan, magsisimula muli. Naipares natural sa devosyon ng Sagradong Puso, sa mga unang Sabado (reparasyon kay Maria), at sa Oras ng Awa.",
    patronSaint: "Sagradong Puso ni Hesus · Santa Margarita Maria Alacoque",
    feastDay: "Biyernes pagkatapos ng Corpus Christi",
    source: "CBCP + Vatican.va (Haurietis Aquas, Pius XII 1956) + Autobiography of Margaret Mary + Apostolate of Prayer Philippines. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "first-saturdays",
    name: "Devosyon ng mga Unang Sabado (Reparadora)",
    description:
      "Ang Devosyon ng mga Unang Sabado ay tahasang hiniling ng Mahal na Birheng Maria kay Sister Lucia dos Santos sa Pontevedra noong Disyembre 10, 1925. Pinangako ni Maria: «Sa lahat ng sa loob ng limang buwan, sa unang Sabado, mangungumpisal, tatanggap ng Sagradong Komunyon, magdarasal ng Rosaryo at sasamahan Akong meditasyon sa loob ng labinlimang minuto, na may layuning magbigay-kasiyahan sa Akin, ipinapangako Kong tutulungan sila sa oras ng kamatayan ng lahat ng biyayang kailangan para sa kaligtasan». Ito ang devosyon na ipinapares sa Siyam na Unang Biyernes.",
    instructions:
      "Sa loob ng limang unang Sabado: (1) Kumpisal sa loob ng walong araw bago o pagkatapos; (2) Komunyon sa unang Sabado mismo sa estado ng grasya na may layuning reparasyon sa Imakuladong Puso; (3) buong Rosaryo (limang dekada); (4) labinlimang minuto ng pagsama kay Maria na nagmumuni-muni sa isang misteryo — ito ang natatanging katangian. Mahalaga ang layuning reparasyon. Kung may makaligtaan, magsisimula muli.",
    patronSaint: "Imakuladong Puso ni Maria · Birheng Fatima",
    feastDay: "Sabado pagkatapos ng Sagradong Puso",
    source: "CBCP + Vatican.va + Memoirs of Sister Lucia + Pius XII (consecration 1942). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "guardian-angel-prayer",
    name: "Panalangin sa Guardian Angel",
    description:
      "Ang panalangin sa Guardian Angel ay isa sa pinakamatandang at minamahal na Katolikong panalangin. Ang doktrina ng personal na anghel na tagapag-ingat sa bawat bautisado ay nakaugat kay Mateo 18,10. Sinasabi ng Catechism (§ 336): «Mula sa pagsisimula hanggang sa kamatayan, ang buhay ng tao ay nababalot ng kanilang pag-iingat at pamamagitan». Tradisyonal na itinuturo sa mga batang Pilipino mula sa maagang edad.",
    prayerText:
      "Anghel ng Diyos, na ipinagkatiwala sa iyo ang aking pag-iingat, liwanagan, ingatan, patnubayan at pamahalaan mo ako sa araw na ito. Amen.",
    instructions:
      "Tradisyonal na pagkakataon: (1) sa paggising; (2) bago matulog; (3) bago maglakbay; (4) bago ang mahalagang desisyon o eksamen; (5) sa anumang sandali ng takot o tukso. Para sa mga magulang na Pilipino: ang pagturo ng panalangin sa Guardian Angel sa mga batang anak ay isa sa mga malalaking responsibilidad ng katekismo ng pamilya — tradisyonal na unang panalangin pagkatapos ng Ama Namin at Aba Ginoong Maria.",
    patronSaint: "Banal na Guardian Angel",
    feastDay: "Oktubre 2 (Holy Guardian Angels)",
    source: "CBCP + Catechism §§ 328-336 + Matthew 18,10 + traditional prayer. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "lectio-divina",
    name: "Lectio Divina (Praying Reading ng Banal na Kasulatan)",
    description:
      "Ang Lectio Divina — «banal na pagbabasa» — ay ang sinaunang monastic Katolikong gawain ng pagbabasa ng Banal na Kasulatan bilang panalangin. Sinistematized ni Guigo II sa ika-12 siglo, may apat na hakbang: Lectio (basahin), Meditatio (pagnilayan), Oratio (manalangin), Contemplatio (pagmuni-muni). Inilarawan ito ni Papa Benedict XVI sa Verbum Domini (2010) bilang «sinaunang at palaging bagong gawain ng pagbabasa ng Banal na Kasulatan para sa paglago sa panalangin». Sa Pilipinas, ang Lectio ay laganap sa Bible groups ng parokya.",
    instructions:
      "Kailangan ng Katolikong Bibliya, tahimik na lugar, at 20-30 minuto. (1) **Lectio**: basahin ang maikling sipi (10-15 talata, hal. ang Ebanghelyo ng araw) nang dahan-dahan, dalawa o tatlong beses. Anong salita ang lumalabas? (2) **Meditatio**: tumigil sa lumabas (Awit 1,2). (3) **Oratio**: tumugon sa Panginoon sa sariling salita. (4) **Contemplatio**: magpahinga sa katahimikan. Pagsasara: maikling konkretong resolusyon. Ideal na araw-araw, 15 minuto. Ang araw-araw na Ebanghelyo ng liturhiya ay angkop.",
    patronSaint: "San Jerome (patrono ng Banal na Kasulatan)",
    feastDay: "Setyembre 30",
    source: "CBCP + Vatican.va (Verbum Domini, Benedict XVI 2010) + Guigo II + Benedictine tradition. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "mass-offering",
    name: "Pagpapamisa para sa Isang Intensyon",
    description:
      "Ang pagpapamisa para sa isang partikular na intensyon ay ang pinakamatanda at pinakamalalim na Katolikong gawain ng nakaaaliw na panalangin. Bawat Misa ay may walang-hanggang halaga sa sarili nito; ang mga partikular na intensyon ay may-hangganan at espesipiko. Mga ugat patristic: si Santo Agustin sa ika-4 siglo ay nagpatotoo sa Misa para sa kanyang ina na si Santa Monica. Sa Pilipinas, ang pagpapamisa ay establishe na gawain ng parokya.",
    instructions:
      "Pamamaraan: (1) lapitan ang sakristia o opisina ng parokya at humingi ng Misa para sa partikular na intensyon; (2) magbigay ng libreng alay (₱50-200 sa Pilipinas, kanya-kanyang parokya); (3) kung intensyon ay para sa namatay, ibahagi pangalan at petsa ng pagpanaw; (4) ideal kung dadalo ka mismo sa Misa. Filipino traditions: (a) «Mass for the dead» sa ika-9, ika-30, ika-40 araw; (b) Anniversary Masses; (c) Thanksgiving Masses sa kaarawan o anibersaryo. Para sa mga kaluluwa sa Purgatoryo, ang Misa ay pinakamalaking espirituwal na regalo.",
    patronSaint: "Kristo, Mataas na Pari",
    feastDay: "Huwebes Santo (institusyon ng Eukaristiya)",
    source: "CBCP + Catechism §§ 1356-1381 + Council of Trent (Session XXII) + Vatican.va. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-don-bosco",
    name: "Nobena kay San Juan Bosco (Don Bosco)",
    description:
      "Si San Juan Bosco (Giovanni Melchiorre Bosco, 1815-1888) — pangkalahatang kilala bilang Don Bosco — ay paring Italyano, tagapagtatag ng Salesian Society at Daughters of Mary Help of Christians. Ang kanyang vital passion ay ang dukha at nasa panganib na kabataan. Nagsimula sa isang dakot ng mga lalaking bata sa oratoryo sa Valdocco (Turin) noong 1841 at iniwan sa pagkamatay ang isang congregation na may 1,800 myembro. Sistema na «preventive»: dahilan, relihiyon at amorevolezza (lambing). Kinanonisa ni Pius XI noong 1934. Sa Pilipinas, ang mga Salesians ay malakas — Don Bosco Boys' Home, Don Bosco Pasil, atbp. Angkop para sa vocations, pagbabalik-loob ng anak, mga desisyon ng edukasyon.",
    prayerText:
      "O San Juan Bosco, ama at guro ng kabataan, ipagkaloob mo sa akin ang biyaya na may kompiyansa kong hinihiling (banggitin ang intensyon). Ikaw na sa pagiging bata mo ay nag-discern ng iyong tawag sa pamamagitan ng prophetic dreams at espirituwal na patnubay ng iyong banal na ina na si Margarita Occhiena, mamagitan ka para sa mga kabataang nalilito ngayon, sa mga educators na inaapuhap, at sa mga magulang na nagdarasal para sa pagtitiyaga ng kanilang mga anak sa pananampalataya. Maria Auxiliadora, sa pangalan kung saan ginawa ni Don Bosco ang ginawa niya, samahan din kami. Amen.",
    instructions:
      "Idasal nang siyam na magkakasunod na araw, mula Enero 22 hanggang 30 sa paghahanda para sa piyesta ng Enero 31. Istruktura: (1) Tanda ng Krus; (2) Awit 23 o sipi ng Bata Hesus; (3) ang panalangin; (4) tatlong Aba Ginoong Maria kay Maria Auxiliadora; (5) jaculatorya «Maria Auxiliadora, ipanalangin kami at ang kabataan».",
    patronSaint: "San Juan Bosco · Maria Auxiliadora",
    feastDay: "Enero 31",
    source: "CBCP + Vatican.va + Memorie dell'Oratorio (Don Bosco) + Salesian Society in the Philippines. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-infant-of-prague",
    name: "Nobena sa Santo Niño ng Prague",
    description:
      "Ang Santo Niño ng Prague ay maliit na imahen ng waks ng Sanggol na Hesus (mga 47 cm), nakaimbak sa Church of Our Lady Victorious sa Prague. Ang imahen ay ibinigay noong 1628 sa Discalced Carmelites ng Prague ni Princess Polyxena ng Lobkowicz. Ang devotion ay lumaganap sa Central Europe sa Thirty Years War at na-globalize sa ika-19 siglo. Sa Pilipinas, ang devotion sa Santo Niño ng Prague ay laganap sa mga Carmelite parishes. Pangako sa kanyang mga devotees: «Habang dinaragdagan ninyo ang Aking parangal, lalo kong pagpapakaloob sa inyo». Angkop sa mga sitwasyong pinansiyal na mahirap, kalusugan ng mga maliliit na bata, paghahanap ng trabaho.",
    prayerText:
      "Banal na Sanggol Hesus, sinasamba kita bilang aking Panginoon at Tagapagligtas. Humihingi ako ng tawad sa lahat ng aking kasalanan. Hinihingi ko sa Iyo, dulcing Hesus, na ipagkaloob Mo sa akin ang biyaya na taimtim kong hinahangad (banggitin ang intensyon). Alam ko na Ikaw ang nagmamay-ari ng lahat ng nilikha. Nagtitiwala ako sa Iyong walang-hanggang awa. Santo Niño ng Prague, pagpalain mo ako at ang aking pamilya. Amen.",
    instructions:
      "Idasal nang siyam na magkakasunod na araw. Istruktura: (1) Tanda ng Krus; (2) maikling pagsamba sa Sanggol na Hesus; (3) ang panalangin; (4) Ama Namin, Aba Ginoong Maria at Luwalhati; (5) banggitin ang intensyon. Inirerekomenda ang paglalagay ng imahen ng Santo Niño ng Prague sa kagalang-galang na lugar sa tahanan habang ang nobena.",
    patronSaint: "Santo Niño ng Prague",
    feastDay: "Variable (pangalawang Linggo ng Enero sa ibang tradisyon)",
    source: "CBCP + Vatican.va + Carmelitas Descalzas sa Prague + Pius XII (coronation 1955). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-anthony",
    name: "Nobena kay San Antonio de Padua",
    description:
      "Si San Antonio de Padua (Fernando de Bulhões, 1195-1231) — ipinanganak sa Lisbon, namatay sa Padua — ay isa sa pinakaminamahal at pinakatinatawagan na santo ng Katolikong Simbahan. Una ay Augustinian canon, naging Franciscan noong 1220. Pinagkatiwalaan siya ni San Francisco na magturo ng teolohiya. Pambihira ang kanyang pagiging mangangaral, tinawag na «ang Martilyo ng mga Erehe» at «ang Dila ng Banal na Espiritu». Kinanonisa ni Gregory IX isang taon lang pagkamatay (pinakamabilis na canonization sa kasaysayan), idineklara ang Doktor ng Simbahan ni Pius XII noong 1946. Sa Pilipinas, ang devotion ay malalim — maraming parokya ang nakatuon sa kanya. Patron ng nawawalang bagay, mahihirap, kasal, at mga kaso na imposible sa tao.",
    prayerText:
      "O dakilang San Antonio, ikaw na tinatawag na «santo ng mga himala» at «ng mga bagay na nawawala», ipagkaloob mo sa akin ang biyaya na may kompiyansa kong hinihiling (banggitin ang intensyon). Ikaw na sa pagiging bata mo ay nasa iyong mga kamay ang Sanggol na Hesus, ipagkaloob mo sa akin ang kasimplehan ng puso na mapanatili sa Kanyang harapan. At kung nawalan ako ng mahalaga — bagay, ugnayan, kahulugan ng espiritu, mahal sa buhay na lumayo sa pananampalataya — ibalik mo, ipinakikiusap ko, ayon sa kalooban ng Diyos. Amen.",
    instructions:
      "Idasal siyam na magkakasunod na araw, mula Hunyo 5 hanggang 12. Filipino tradition: ang «Trezena» (13 araw) bago ang piyesta ng Hunyo 13. Istruktura: (1) Tanda ng Krus; (2) responsoryo Antonian; (3) ang panalangin; (4) labintatlong Ama Namin, Aba Ginoong Maria at Luwalhati; (5) banggitin ang intensyon. Para sa nawawalang bagay: «San Antonio, tulungan mo akong mahanap ang nawala». Para sa hanapin ng asawa, dagdagan ng labintatlong Aba Ginoong Maria.",
    patronSaint: "San Antonio de Padua",
    feastDay: "Hunyo 13",
    source: "CBCP + Vatican.va + Pius XII (Doctor of the Church, 1946) + tradisyon ng mga Franciscans sa Pilipinas. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-blaise",
    name: "Nobena kay San Blas",
    description:
      "Si San Blas (m. ca. 316) ay obispo ng Sebaste sa Armenia sa panahon ng pag-uusig ni Licinius. Doktor bago ang ordenasyon, namartir matapos ng eremitismo sa kuweba kung saan ang mga ligaw na hayop ay dinadalhan siya ng pagkain at lumalapit sa kanya upang mapagaling. Pinakakilalang alamat: ang ina ay dinala sa santo ang batang nasa-suffocation sa tinik ng isda; pinagaling siya ni San Blas agad-agad. Sa Pilipinas, ang Blessing of Throats ay ginagawa sa karamihan ng mga parokya tuwing Pebrero 3, kasama ang dalawang kandilang inilalagay sa leeg.",
    prayerText:
      "O dakilang San Blas, obispo at martir, ipagkaloob mo sa akin ang biyaya na may kompiyansa kong hinihiling (banggitin ang intensyon). Ikaw na nagpalaya sa bata mula sa pagka-suffocation sa lakas lamang ng iyong basbas, palayain mo (banggitin ang pangalan) sa karamdamang gumigipuspos. San Blas, ipanalangin mo kami. Amen.",
    instructions:
      "Idasal siyam na magkakasunod na araw, mula Enero 25 hanggang Pebrero 2. Inirerekomenda ng tradisyon ang pagdalo sa Misa ng Pebrero 3 at pagtanggap ng Blessing of Throats sa dalawang krusang kandila.",
    patronSaint: "San Blas (patron ng mga sakit sa lalamunan)",
    feastDay: "Pebrero 3",
    source: "CBCP + Vatican.va + Filipino tradition of Blessing of Throats + Acta Sanctorum. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-catherine-siena",
    name: "Nobena kay Santa Catalina de Siena",
    description:
      "Si Santa Catalina de Siena (Caterina Benincasa, 1347-1380) — isa sa apat na babaeng Doktor ng Simbahan at copatron ng Europe — ay isa sa pinakapambihirang espirituwal na figura ng ika-14 siglo. Sa anim na taong gulang, una niyang nakita si Kristo. Pumasok bilang mantelata sa Dominican Third Order sa labing-walong taon. Mystic, terciary, espirituwal na tagapayo at diplomat, sentral sa Crisis ng Papacy ng Avignon: kanyang mga sulat at presensya sa Avignon noong 1376 ay convince kay Pope Gregory XI na bumalik sa Roma. Ang kanyang Dialog ng Banal na Providensya, dictated sa extasy, ay isa sa mga dakilang mystic na tekstong Katoliko. Tumanggap ng invisible stigmata. Namatay sa 33 taon. Kinanonisa ni Pius II noong 1461, Doctor of the Church ni Beato Pablo VI noong 1970, copatron ng Europe ni San Juan Pablo II noong 1999. Angkop para sa unity ng Simbahan, lakas sa panalangin contemplative, tapang sa pagsabi ng katotohanan sa mga makapangyarihan.",
    prayerText:
      "O dakilang Santa Catalina de Siena, mystic na birhen at Doktor ng Simbahan, ipagkaloob mo sa pamamagitan ng iyong pamamagitan ang biyaya na may kompiyansa kong hinihiling (banggitin ang intensyon). Ikaw na nagkaroon ng tapang na sulatan ang Papa at mga hari ng iyong panahon sa pangalan ni Kristo, ipagkaloob mo sa amin ang katapangan ng pagpapahayag ng katotohanan ng Evangelio nang walang takot. Amen.",
    instructions:
      "Idasal siyam na magkakasunod na araw, mula Abril 21 hanggang 29. Istruktura: (1) Tanda ng Krus; (2) maikling sipi ng Dialog ng Banal na Providensya; (3) ang panalangin; (4) Ama Namin, Aba Ginoong Maria at Luwalhati; (5) banggitin ang intensyon.",
    patronSaint: "Santa Catalina de Siena, OP",
    feastDay: "Abril 29",
    source: "CBCP + Vatican.va (Paul VI Doctor 1970; JPII copatron 1999) + Dialogue of Divine Providence + Dominican Order in the Philippines. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-christopher",
    name: "Nobena kay San Kristoper",
    description:
      "Si San Kristoper (Christophoros, «ang nagdadala kay Kristo») ay isa sa mga pinakapopular na santo ng pangkalahatang Katolikong tradisyon at patron ng mga manlalakbay. Ang tradisyonal na hagiography ay nag-ipinta sa kanya bilang higante na nagsilbi kay Kristo sa pagdadala ng mga manlalakbay sa peligrosong ilog. Isang gabi, isang bata ang humingi na dalhin sa kabilang panig: habang tumatawid, lumamingming bumigat ang bata, hanggang sa pagdating ay nagpakilala ang bata bilang si Kristo. Sa Pilipinas, ang devosyon kay San Kristoper bilang patron ng mga drayber ay laganap — medalya sa awto, bendisyon ng sasakyan sa Hulyo 25, at panalangin bago maglakbay.",
    prayerText:
      "O dakilang San Kristoper, higante ng lakas at pananampalataya, ikaw na sa iyong sariling katawan ay dinala ang Sanggol na Hesus sa ilog ng buhay, ipagkaloob mo sa akin ang biyaya na may kompiyansa kong hinihiling (banggitin ang intensyon). Protektahan mo ako at ang mga minamahal ko sa lahat ng paglalakbay; at higit sa lahat, ipagkaloob mo sa amin ang biyayang hindi kami mawawala kailanman sa Daan na si Kristo Mismo. Amen.",
    instructions:
      "Idasal siyam na magkakasunod na araw, mula Hulyo 17 hanggang 25 sa paghahanda sa piyesta ng Hulyo 25. Bago ang tiyak na paglalakbay, isama ang bendisyon ng sasakyan sa lokal na parokya at medalya ni San Kristoper sa awto bilang sacramental.",
    patronSaint: "San Kristoper (patron ng mga manlalakbay at drayber)",
    feastDay: "Hulyo 25",
    source: "CBCP + Lenda Áurea ni Jacobus de Voragine + Filipino tradition of vehicle blessing. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-joseph-cupertino",
    name: "Nobena kay San Jose ng Cupertino",
    description:
      "Si San Jose ng Cupertino (Giuseppe Maria Desa, 1603-1663) — Italyanong Franciscan Conventual — ay patron ng mga estudyante, mahihirap na eksamen, mga aspirante sa pari at relihiyosong buhay, mga piloto at astronaut. Ang kanyang biograpiya ay isa sa pinakanakakagulat: nahihirapan siyang matuto, tinanggihan nang ilang beses sa mga relihiyosong orden, sa wakas tinanggap ng Conventuals noong 1625. Sa kanyang ordination exam, tinanggap niya ang nag-iisang materyal na alam niya nang husto. Pinakahindi pangkaraniwan ay ang kanyang ecstatic levitations, dinokumento ng dosenang testigo: ang katawan ay nag-elevate mula sa lupa nang minuto o oras. Kinanonisa ni Clement XIII noong 1767.",
    prayerText:
      "O dakilang San Jose ng Cupertino, ikaw na alam mo ang kahihiyan ng hindi makapag-aral kung ano ang madaling natutunan ng iba — ipagkaloob mo sa akin ang biyaya na may kompiyansa kong hinihiling (banggitin ang intensyon). Kung ako ay estudyante sa mahirap na eksamen, ipagkaloob mo ang liwanag, alaala at kalmadong loob. San Jose ng Cupertino, ipanalangin mo kami. Amen.",
    instructions:
      "Idasal siyam na magkakasunod na araw, mula Setyembre 9 hanggang 17. Para sa tiyak na eksamen, simulan siyam na araw bago. Jaculatorya: «San Jose ng Cupertino, tulungan mo ako sa aking eksamen».",
    patronSaint: "San Jose ng Cupertino, OFMConv",
    feastDay: "Setyembre 18",
    source: "CBCP + Vatican.va (Clement XIII, 1767) + Franciscan Conventual Order. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-martin-de-porres",
    name: "Nobena kay San Martin de Porres",
    description:
      "Si San Martin de Porres (Martín de Porres Velázquez, 1579-1639) — ang unang mulato na santong kinanonisa ng Katolikong Simbahan — ay Peruvian Dominican friar, anak ng Espanyol na nobleman at babaeng panama na liberta. Ang racial discrimination na tinaglay niya simula pagkabata ay minarka ang buong buhay, ngunit binago ito ng heroic virtue. Pumasok bilang donado sa Dominican convent ng Lima sa labing-limang taon at nagsilbi bilang barber-nurse sa loob ng higit 50 taon. Kanyang biograpiya ay puno ng pambihirang mystical gifts: bilocations dinokumento (nakita sa Africa at Japan habang nasa Lima), espektakulong pagpapagaling. Kinanonisa ni San Juan XXIII noong 1962. Sa Pilipinas, ang devotion ay laganap sa mga Dominican parishes at sa mga komunidad na sumailalim sa karahasan na racial.",
    prayerText:
      "O dakilang San Martin de Porres, abang lingkod ng mahihirap, healer ng maysakit at kaibigan ng mga hayop, ipagkaloob mo ang biyaya na may kompiyansa kong hinihiling (banggitin ang intensyon). Ikaw na alam ang sakit ng racial discrimination at ginawa ito sa kahinhinan at paglilingkod, ipagkaloob mo sa amin ang biyaya ng pagpapagaling ng mga dibisyon ng lahi, klase at bansa. Amen.",
    instructions:
      "Idasal siyam na magkakasunod na araw, mula Oktubre 25 hanggang Nobyembre 2. Filipino traditions: (a) bendisyon ng mga hayop sa kanyang piyesta (Nobyembre 3); (b) konkretong pag-aalaga sa isang maysakit, mahirap o iniwanang hayop habang siyam na araw; (c) tapat na pagsusuri sa sariling ugali sa lahi o uri.",
    patronSaint: "San Martin de Porres, OP",
    feastDay: "Nobyembre 3",
    source: "CBCP + Vatican.va (San Juan XXIII, 1962) + Dominican Order in Peru + Filipino Catholic devotion. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-monica",
    name: "Nobena kay Santa Monica",
    description:
      "Si Santa Monica (332-387) — ina ni San Agustin ng Hippo — ay pangkalahatang patron ng mga ina na nagdarasal para sa pagbabalik-loob ng mga adult na anak na lumayo sa pananampalataya. Ipinangasawa sa pagang na lalaking marahas na nagngangalang Patricius, nakumberte siya sa pamamagitan ng pasensya at panalangin. Ngunit ang pinakamatagal na pagsusubok ng kanyang buhay ay ang anak na si Augustin — brilyanteng tagapagsalita, ngunit nakaalay 17 taon sa pagiging-bata ng kabataan, Manichaeism at irregular na ugnayan. Si Monica ay nagdasal para sa kanyang anak sa 17 taong walang panghihina, lumuha, sumunod sa kanya mula Africa hanggang Italya. Sinabi sa kanya ni San Ambrose ng Milan: «Imposible na ang anak ng napakaraming luha ay mawala». Naging Kristiyano si Augustin sa Pasko ng Pagkabuhay 387. Namatay si Monica ilang linggo lang pagkatapos sa daungan ng Ostia.",
    prayerText:
      "O dakilang Santa Monica, malulungkot at tapat na ina, ikaw na sa loob ng 17 taon ay hindi tumigil sa pagsamo para sa iyong anak na si Augustin hanggang sa makitang nabalik kay Kristo, ipagkaloob mo sa akin ang biyaya na may kompiyansa kong hinihiling (banggitin ang intensyon, lalo na kung para sa anak o mahal sa buhay na lumayo sa pananampalataya). Ipagkaloob mo sa akin ang pasensya at lalo na ang hindi matitibay na kompiyansa na «imposible na ang anak ng napakaraming luha ay mawala». Amen.",
    instructions:
      "Idasal siyam na magkakasunod na araw, mula Agosto 18 hanggang 26 sa paghahanda para sa piyesta ng Agosto 27 (at kay San Agustin, ang kanyang anak, sa Agosto 28). Istruktura: (1) Tanda ng Krus; (2) sipi mula sa Confessions ni San Agustin (Aklat IX); (3) ang panalangin; (4) banggitin ang pangalan ng konkretong tao. Para sa pagbabalik-loob ng anak, isama ang Misa para sa intensyon, lingguhang Komunyon para sa kanya, at pagpipigil sa pagpipresyon habang ang nobena.",
    patronSaint: "Santa Monica",
    feastDay: "Agosto 27",
    source: "CBCP + Vatican.va + San Agustin, Confessions + Augustinian tradition in the Philippines. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "offering-suffering",
    name: "Pag-aalay ng Pagdurusa (Sufrimiento Redentor)",
    description:
      "Ang pag-aalay ng pagdurusa — ang Katolikong gawain ng pag-iisa ng sariling pisikal, emosyonal o espirituwal na sakit sa krus ni Kristo bilang reparatif intensyon — ay isa sa pinakamalalim na Katolikong espiritwalidad. Hindi ito masochism; hindi ito kawalang-pansin sa pagdurusa. Ito ang teolohikal na katotohanan na ang pagdurusa ng tao, kapag ipinares nang kusang-loob sa pagdurusa ni Kristo, ay nakikibahagi sa economy ng kaligtasan. Si Pablo ang nagsabi sa Colosas 1,24: «Ginagawan ko ang nawawala sa mga paghihirap ni Kristo, para sa kabutihan ng Kanyang Katawan, na ito ang Simbahan». Si San Juan Pablo II ay nagpalalim nito sa Salvifici Doloris (1984).",
    prayerText:
      "Panginoong Hesukristo, iniaalay ko sa Iyo ngayon ang lahat ng sakit na darating — ang kilala at hindi kilala, ng katawan, ng kaluluwa at ng puso. Pagsamahin Mo sa Iyong nagligtas na Pasyon, at gawin Mong magsilbi sa pagbabalik-loob ng mga makasalanan, sa pag-aginhaw ng mga kaluluwa sa Purgatoryo, at para sa konkretong intensyon na inihahain ko (banggitin ang intensyon). Amen.",
    instructions:
      "Dalawang sandali: (1) **morning offering** — sa paggising: «Panginoon, iniaalay ko sa Iyo ang mga sakit at trabaho ng araw para sa (intensyon)»; (2) **renewal sa buong araw** — kapag may konkretong sakit dumating, mag-renew: «Ito rin, para sa (intensyon)». Para sa malubhang pagdurusa, humanap ng spiritual director.",
    patronSaint: "Krusipikadong Kristo · Birheng Hapis",
    feastDay: "Biyernes Santo",
    source: "CBCP + Vatican.va (Salvifici Doloris, JPII 1984) + Catechism §§ 1500-1532. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-discernment",
    name: "Panalangin para sa Pag-discern",
    description:
      "Ang panalangin para sa pag-discern ay ang Katolikong gawain ng paghingi sa liwanag ng Diyos para sa mahalagang desisyon. Itinuturo ng tradisyon na ang pag-discern ay hindi lang pasensyang pinili sa pagitan ng mga opsyon, kundi aktibong paghahanap ng konkretong kalooban ng Diyos. Si San Ignacio de Loyola sa Spiritual Exercises (1548) ay sinistematized ang panuntunan ng pag-discern ng mga espiritu, distinguishing «mabuting espiritu» (consolasyon, matatagalang kapayapaan) mula sa «masamang espiritu» (kawalang-pansin, pagkagambala, takot).",
    prayerText:
      "Panginoon, humihingi ako ng iyong liwanag para makakilala kung ano ang hinihingi mo sa akin. Ang puso ko ay puno ng kawalang-pansin at maraming boses; kailangan ko ng iyong tinig. Tanggalin mo sa akin ang ingay ng takot, ang akit ng kaginhawaan at ang lakas ng pagmamataas, at bigyan mo ako ng mga mata upang makita gaya ng pagkakita ni Kristo. Nagtitiwala ako, Panginoon, na ginagabayan mo ako sa kamay ng amang providensya sa daan na maglalapit sa akin sa iyo. Amen.",
    instructions:
      "Tatlong yugto ng Ignatian discernment: (1) **inisyal na indipiperensya** — humingi ng biyaya ng hindi pagkakatali sa isang opsyon; (2) **pagsasaalang-alang** — pag-aaral ng konsekuwensya at pansin sa interior movements; (3) **kumpirmasyon** — ialay ang tentative desisyon sa Diyos sa panalangin sa loob ng ilang araw at pansin kung kinukumpirma ng matatagalang kapayapaan.",
    patronSaint: "Banal na Espiritu · San Ignacio de Loyola",
    feastDay: "Hulyo 31 (San Ignacio)",
    source: "CBCP + Vatican.va + Ignatian Exercises (1548) + Pope Francis catecheses on discernment (2022). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-fertility",
    name: "Panalangin para sa Pagkakaroon ng Anak",
    description:
      "Ang Katolikong panalangin para sa pagkakaroon ng anak — para sa mag-asawa na naghahangad makapag-anak at hindi nagagawa — ay may malalim na ugat na bibliko. Puno ang Banal na Kasulatan ng mga steril na mag-asawa na binigyan ng Diyos ng anak sa pamamagitan ng mahabang panalangin: Sara at Abraham, Rebeka at Isaak, Rakela at Hakob, Ana at Elcana, Isabel at Zacarias. Ang Simbahan ay nagtuturo na ang fertility ay regalong tinatanggap nang may pasasalamat, at ang sterility ay hindi parusa. Ang panalangin ay hindi nag-eexclude sa medikal na paghahanap (NaProTechnology). Patrons: Santa Ana at San Joaquin; San Gerardo Majella.",
    prayerText:
      "Panginoong Hesus, may-akda ng lahat ng buhay, hinihingi namin nang may kompiyansa ang regalo ng isang anak. Alam mo ang aming paghihintay, ang aming mga luha. Ipagkaloob mo sa amin, kung ito ang iyong kalooban, ang biyolohikong fertility na hinihingi; at kung hindi, ipagkaloob mo ang ibang daan ng pagiging magulang — ang ampon, ang pag-aalaga ng anak ng iba, ang espirituwal na pagbubuhay ng mga buhay sa iyong Simbahan. Amen.",
    instructions:
      "Idasal araw-araw o bilang nobena (siyam na araw kay Santa Ana, San Gerardo o pareho). Istruktura: (1) Tanda ng Krus; (2) acto ng pagtanggap ng kalooban ng Diyos; (3) ang panalangin; (4) misteryo ng Rosaryo (joyful); (5) banggitin ang intensyon. Para sa mga mag-asawa sa medikal na paggagamot, tiyakin ang pagkakatugma sa Catholic moral teaching.",
    patronSaint: "Santa Ana at San Joaquin · San Gerardo Majella",
    feastDay: "Hulyo 26",
    source: "CBCP + Vatican.va (Donum Vitae CDF 1987; Dignitas Personae 2008) + Catechism §§ 2373-2379. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-financial-hardship",
    name: "Panalangin sa Pinansiyal na Hirap",
    description:
      "Ang Katolikong panalangin sa pinansiyal na hirap ay tradisyon na may ilang patron: San Jose (patron ng mga manggagawa), San Antonio (tinatawagan ng mga mahirap), Santa Marta (administration ng tahanan). Ang panalangin ay hindi pumapalit sa human responsibility: ang Kristiyano sa pinansiyal na hirap ay aktibong naghahanap ng trabaho, kinokontrol ang gastos. Ngunit kinakawasan ng panalangin ang hirap sa providensya ng Ama: «huwag matakot sa buhay… alam ng inyong amang celestial na kailangan ninyo ang lahat» (Mateo 6,25.32).",
    prayerText:
      "Amang celestial, na nagbibigay sa lirio ng bukid at mga ibon ng kalangitan, tingnan Mo nang may awa ang Iyong pamilya sa oras na ito ng pinansiyal na hirap. Ipagkaloob Mo sa akin ang karunungan na mag-administer ng kakaunti, ang tapang na humingi ng tulong, ang kapakumbabaan na tanggapin ang tulong, at ang pagtitiyaga para sa trabaho. San Jose obrero, ipanalangin mo kami. Santo Antonio de Padua, ipanalangin mo kami. Amen.",
    instructions:
      "Idasal araw-araw o bilang nobena (siyam na araw kay San Jose o San Antonio). Para sa unemployment, ang nobena kay San Jose Obrero (Abril 22-30 patungo sa piyesta ng Mayo 1). Para sa mga utang: maginahan na confession, Awit 37, gospel parables sa administrasyon. Pagsamahin sa praktikal na aksyon: hingin ang payo sa propesyonal, hingin ang tulong sa parokya, bawasan ang mga gastos na hindi kailangan, gumawa ng konkretong gawang charity.",
    patronSaint: "San Jose · San Antonio · Santa Marta",
    feastDay: "Marso 19 (San Jose) · Mayo 1 (San Jose Obrero)",
    source: "CBCP + Vatican.va + Catechism §§ 2402-2406 + Caritas in Veritate (Benedict XVI 2009). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-happy-death",
    name: "Panalangin para sa Mabuting Kamatayan",
    description:
      "Ang panalangin para sa mabuting kamatayan — para sa biyaya ng pagkamatay sa estado ng grasya, na tumanggap ng mga sakramento (lalo na ang Pamamahid sa Maysakit at ang Viaticum), sa kapayapaan ng loob, na may oras para sa pagpapatawad at paghingi ng tawad, at na may matatag na pag-asa sa langit — ay tradisyonal na Katolikong gawain. Ang kamatayan ay ang huling malaking espirituwal na pagsubok ng buhay. Si San Jose (na namatay sa mga bisig ni Hesus at Maria) ay ang patron ng mabuting kamatayan par excellence.",
    prayerText:
      "O Panginoong Hesus, sa kaninong mga kamay ay ibinigay ninyo ang inyong espiritu sa pagkamatay, hinihiling ko sa Inyo ang biyaya ng mabuting kamatayan. Ipagkaloob Ninyo sa akin na mamatay sa estado ng grasya, ipinanagumpay sa Inyo at sa lahat ng aking nasaktan. Ipagkaloob Ninyo sa akin ang pagtanggap ng mga sakramento ng kumpisal, ng Komunyon at ng Pamamahid sa Maysakit bago ang aking huling hininga. Ilayo Ninyo ako sa biglaang kamatayan, sa hindi inaasahang kamatayan, sa kamatayang walang Diyos. San Jose, patron ng mabuting kamatayan, ipanalangin Ninyo kami. Banal na Maria, ipanalangin Ninyo kami, ngayon at sa oras ng aming kamatayan. Amen.",
    instructions:
      "Idasal: (a) bilang periodic devosyon — sa katapusan ng bawat araw; (b) sa bawat kaarawan o anibersaryo ng pagpanaw ng kamag-anak; (c) sa mga ospital; (d) sa tabi ng namamatay. Para sa kamag-anak na may sakit, ang nobena kay San Jose (Marso 11-19). Malalaking disiplina: regular na kumpisal (buwanan), madalas na Komunyon, Pamamahid sa Maysakit sa simula ng malubhang sakit (HINDI maghintay sa huling sandali).",
    patronSaint: "San Jose · Santa Maria",
    feastDay: "Marso 19 (San Jose)",
    source: "CBCP + Vatican.va + St. Alphonsus Liguori, Preparation for Death + Catechism §§ 1010-1014. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-healing",
    name: "Panalangin para sa Pagpapagaling",
    description:
      "Ang panalangin para sa pagpapagaling ay isa sa pinakapundamental na Katolikong devosyon. Itinala ng Banal na Kasulatan si Hesus na nagpapagaling sa hindi mabilang na maysakit sa public ministry, at ang sakramento ng Pamamahid sa Maysakit ay nagpapatuloy ng healing mission. Tatlong anyo ng pagpapagaling: (1) sacramental (Pamamahid sa Maysakit); (2) charismatic (panalangin ng believer o komunidad); (3) sa pamamagitan ng intercession ng santo (Lourdes, San Peregrine para sa kanser). Ang panalangin ay hindi anting-anting; ito ay paghingi.",
    prayerText:
      "Panginoong Hesus, manggagamot ng katawan at kaluluwa, humihingi kami para kay (banggitin ang pangalan at sakit) ng biyaya ng pagpapagaling. Kayo na nagpagaling sa napakaraming sa Inyong terrestrial ministry, palawakin ang Inyong sanitator na kamay ngayon. Kung kalooban Ninyo, ibalik ang kalusugan ng katawan; at kung hindi, ibalik ang kalusugan ng kaluluwa, na nagbibigay ng pasensya sa sakit, lakas sa paggagamot, pag-asa sa kinabukasan. Maria, Kalusugan ng Maysakit, ipanalangin Ninyo kami. San Peregrine, ipanalangin Ninyo kami. Amen.",
    instructions:
      "Idasal: (a) para sa sarili, kasama ng kumpisal, Komunyon, Pamamahid; (b) para sa kamag-anak na maysakit, sa kanyang presensya, na may imposition of hands (Marcos 16,18); (c) sa komunidad. Para sa tiyak na sakit: San Peregrine para sa kanser, Santa Lucia para sa mga mata, San Blas para sa lalamunan. Pagsamahin sa medikal na paggagamot, sakramento, Pamamahid sa Maysakit, pilgrimage sa Marian sanctuary.",
    patronSaint: "Kristo, Banal na Manggagamot · Maria, Kalusugan ng Maysakit",
    feastDay: "Pebrero 11 (Birheng Lourdes)",
    source: "CBCP + Vatican.va (Salvifici Doloris, JPII 1984) + Ritual of Anointing + Catechism §§ 1499-1532. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-marriage",
    name: "Panalangin para sa Pag-aasawa",
    description:
      "Ang panalangin para sa pag-aasawa — para sa sariling vocation matrimonial, para sa sariling pag-aasawa, para sa pag-aasawa sa krisis, o para sa kabanalan ng mga pag-aasawa — ay pundamental na gawain sa Katolikong family spirituality. Ang Simbahan ay nagtuturo na ang pag-aasawang sacramental ay isa sa pitong sakramento (Mateo 19,6: «kung ano ang pinagsama ng Diyos, huwag pakialaman ng tao»). Si San Juan Pablo II ay nakapaglahad ng theologia ng pag-aasawa sa Familiaris Consortio (1981). Ang Papa Francisco ay nagpatuloy sa Amoris Laetitia (2016). Sa Pilipinas, ang pamilya ay tradisyonal na pundamental na social unit.",
    prayerText:
      "Panginoong Diyos, may-akda ng pag-aasawa, na sa simula ay nilikha ang lalaki at babae sa Iyong imahen, at sa Kasal ng Cana ay ibinunyag ang dignidad ng pag-ibig na conjugal, humihingi ako para sa (banggitin ang intensyon). Ipagkaloob Ninyo sa amin ang regalo ng pag-ibig na matiyaga, mapaglingkod, hindi naiingit (1 Cor 13). Ipagkaloob Ninyo ang katapatan, ang pasensya, ang katipid, at ang pagbubukas sa mga anak na ipadadala Ninyo. Amen.",
    instructions:
      "Idasal sa mag-asawa (gabi-gabi bago matulog), individualmente, o sa pamilya. Istruktura: (1) Tanda ng Krus; (2) pasasalamat para sa regalo ng pag-aasawa; (3) ang panalangin; (4) dekada ng Rosaryo (joyful: Annunciation, Visitation, Kasal sa Cana); (5) acto ng pakikipagkasundo kung kinakailangan. Para sa pag-aasawang nasa krisis: Misa para sa pagkakasundo, konsulta sa pari o therapist na Katoliko, nobena sa Banal na Pamilya.",
    patronSaint: "Banal na Pamilya · San Jose at Santa Maria",
    feastDay: "Linggo sa Oktava ng Pasko (Banal na Pamilya)",
    source: "CBCP + Vatican.va (Familiaris Consortio 1981; Amoris Laetitia 2016) + Catechism §§ 1601-1666. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-safe-travel",
    name: "Panalangin para sa Ligtas na Paglalakbay",
    description:
      "Ang Katolikong panalangin para sa ligtas na paglalakbay ay matagal-matagal na devosyon. Si San Kristoper, patron ng mga manlalakbay, ay ang santong tinatawagan. Ang Guardian Angel ay kasama rin. Sa Pilipinas, ang devosyon ay kinakabilang ang panalangin bago lumakad, ang bendisyon ng sasakyan sa piyesta ni San Kristoper (Hulyo 25), ang medalya ni San Kristoper sa kotse.",
    prayerText:
      "Panginoong Diyos, Ama na pumapansin ng lahat sa daan, ipinagkakatiwala ko ang sariling proteksyon sa paglalakbay na ito. Iwasan Mo sa akin ang mga panganib ng katawan, aksidente, sasakyang sira, mga driver na walang ingat, mga hayop sa daan, at masamang panahon. Ipadala Mo ang Iyong Guardian Angel. San Kristoper, ipanalangin mo ako. Amen.",
    instructions:
      "Idasal bago bawat paglalakbay: (1) pagpasok sa sasakyan, bago iturn-on ang makina; (2) sa Tanda ng Krus; (3) banggitin ang taong naglalakbay, destinasyon, at dahilan; (4) renewal pagkatapos ng mahabang paghinto. Para sa mahabang paglalakbay: kumpisal, Misa ng paalam kung tuluyan na pag-alis, bendisyon ng sasakyan, Awit 91 at Rosaryo habang naglalakbay. Para sa pamilya: panalangin sa voz alta sa harap ng mga bata.",
    patronSaint: "San Kristoper · Guardian Angel · San Rafael",
    feastDay: "Hulyo 25",
    source: "CBCP + Vatican.va + Filipino tradition of vehicle blessing + Psalm 91. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-serenity",
    name: "Panalangin ng Serenity",
    description:
      "Ang Serenity Prayer — «Diyos, ipagkaloob mo sa akin ang serenity para tanggapin ang mga bagay na hindi ko mabago, ang tapang para baguhin ang mga magagawa, at ang karunungan para makilala ang pagkakaiba» — ay isa sa pinakauniversally na ikinakalat na Kristiyanong panalangin ng ika-20 siglo. Akda ng Protestant theologian na si Reinhold Niebuhr noong 1934, kinuha ng Alcoholics Anonymous sa 1940s. Ang panalangin ay hindi exclusively Katoliko — siya ay genuinely ecumenical — ngunit naipasok ng Simbahan dahil tumutugma sa klasikong espiritwalidad ng abandono sa Banal na Providensya (Jean-Pierre de Caussade).",
    prayerText:
      "Diyos, ipagkaloob mo sa akin ang serenity para tanggapin ang mga bagay na hindi ko mabago, ang tapang para baguhin ang mga magagawa, at ang karunungan para makilala ang pagkakaiba. Ipagkaloob mo sa akin na mabuhay isang araw sa bawat oras, masiyahan sa bawat sandali, tanggapin ang mga paghihirap bilang daan tungo sa kapayapaan. Amen.",
    instructions:
      "Idasal: (a) bilang araw-araw na umaga lalo na para sa mga programa ng recovery (Alcoholics Anonymous Philippines, etc.); (b) sa sandali ng tumitinding kabalisahan; (c) sa mga pagpupulong ng twelve-step groups; (d) sa pagkawala o krisis. Maikling porma (unang tatlong linya) ay madaling ma-memorize.",
    patronSaint: "Kristo, Prince ng Kapayapaan",
    feastDay: "Huling Linggo ng Karaniwang Panahon (Cristo Rey)",
    source: "CBCP + Reinhold Niebuhr (1934) + AA Philippines + Jean-Pierre de Caussade, Abandonment to Divine Providence. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-st-francis",
    name: "Panalangin Iniugnay kay San Francisco (Gawin Akong Instrumento ng Iyong Kapayapaan)",
    description:
      "Ang Prayer Attributed to St. Francis — kilala bilang «Make me an instrument of your peace» — ay isa sa pinakakilalang Kristiyanong panalangin ng ika-20 siglo. Sa kabila ng tradisyonal na iniugnay kay San Francisco ng Asisi, ang aktwal na kompusisyon ay unang inilathala sa Pranses na katolikong pahayagang La Clochette noong 1912. Mula noon ay binigyang-kahulugan ni Madre Teresa, San Juan Pablo II, Papa Francisco at milyun-milyong Kristiyano. Ang panalangin ay nagpapahayag ng espiritwalidad na Pransiskano: nag-aalay ang Kristiyano bilang tagapamagitan ng pag-ibig ng Diyos sa mundong sugatan.",
    prayerText:
      "Panginoon, gawin Mo akong instrumento ng Iyong kapayapaan: kung saan may galit, magdala ng pag-ibig; kung saan may pinsala, ng kapatawaran; kung saan may pagkakahati, ng kaisahan; kung saan may pagdududa, ng pananampalataya; kung saan may mali, ng katotohanan; kung saan may kawalang-pag-asa, ng pag-asa; kung saan may dilim, ng liwanag; kung saan may lungkot, ng kagalakan. O Banal na Guro, gawin Mong sa pag-aaliw kaysa sa pag-aliwin; sa pag-unawa kaysa sa unawain; sa pag-ibig kaysa sa ibigin. Sapagka't sa pagbibigay tumatanggap; sa pagpapatawad pinapatawad; sa pagkamatay nabubuhay sa eternal na buhay. Amen.",
    instructions:
      "Idasal: (a) bilang araw-araw na umaga; (b) bago mahirap na pag-uusap, mediation o tense meeting; (c) pagkatapos ng natanggap na insulto bilang explicit act ng kapatawaran. Para sa mga Pransiskano sa Pilipinas: kasama ng Cantico ng mga Nilikha, leitura ng Florinhas, bendisyon ng mga hayop sa Oktubre 4.",
    patronSaint: "San Francisco ng Asisi",
    feastDay: "Oktubre 4",
    source: "CBCP + Vatican.va + La Clochette (1912) + Pransiskanong tradisyon sa Pilipinas. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "psalm-23",
    name: "Awit 23 (Ang Panginoon ay aking Pastol)",
    description:
      "Ang Awit 23 — «Ang Panginoon ay aking pastol, wala akong kakulangin» — ay isa sa pinakaminamahal na awit ng Banal na Kasulatan, iniugnay kay Haring David. Ang sentral na imahen — ang Panginoon na nagaalaga sa Kanyang bayan tulad ng pastol na nag-aalaga ng mga tupa — ay isa sa pinakamalalim ng theologiang bibliko. Si Kristo Mismo ay nag-aplay sa Kanyang sarili ang imahen ng Banal na Pastol (Juan 10,11). Tradisyonal na dinadasal sa mga sandali ng pagdadalamhati (kasama ang lahat ng Filipino Catholic funerals), sa mga pagsubok o takot, sa tabi ng namamatay, at bilang araw-araw na kompiyansa.",
    prayerText:
      "Ang Panginoon ay aking pastol, wala akong kakulangin. Sa luntiang pastulan ay pinaghihiga niya ako; ginabayan niya ako sa tahimik na mga tubig at hinati ang aking kaluluwa. Pinangungunahan niya ako sa tuwid na landas para sa Kanyang Pangalan. Bagaman naglakad ako sa madilim na lambak, hindi ako matatakot sa anumang kasamaan, sapagkat Ikaw ay kasama ko; ang Iyong tungkod at ang Iyong baras ay nagpapagana sa akin. Hinanda mo ang isang hapag sa harap ng aking mga kalaban; pinahiran mo ang aking ulo ng langis, at ang aking kopa ay tumagayan. Ang kabutihan at kaawaan ay kasama ko sa lahat ng araw ng aking buhay, at tatahan ako sa bahay ng Panginoon sa walang hanggan. (Awit 23, liturhikal na pagsasalin ng CBCP)",
    instructions:
      "Maaari dasalin: (a) bilang araw-araw na panalangin, lalo na sa simula at katapusan ng araw; (b) sa mga pagsubok o takot; (c) sa libing o kamakailang pagdadalamhati; (d) bilang meditation sa Lectio Divina. Memorize-en mo; kasya sa isang focused na pagbabasa. Sa Pilipinas, ang pagsasalin ng CBCP ay ginagamit sa pang-tanging liturhikal na anyo.",
    patronSaint: "Kristo, Banal na Pastol · Haring David",
    feastDay: "Ikaapat na Linggo ng Pasko ng Pagkabuhay (Banal na Pastol)",
    source: "CBCP + Sagrada Biblia, liturhikal na pagsasalin ng CBCP + Liturgy of the Hours + Patristic tradition. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "psalm-91",
    name: "Awit 91 (Ang Nananahan sa Lihim ng Kataastaasan)",
    description:
      "Ang Awit 91 — «Ang nananahan sa lihim ng Kataastaasan ay mananahan sa lilim ng Makapangyarihan» — ay ang malaking bibliko na awit ng banal na proteksyon. Pinagdugtong ng tradisyon kasama ang labanan laban sa mga demonyo at espirituwal na proteksyon kaya idinadasal sa Completas (gabi na office ng Liturhy of the Hours) sa Sabado, at bahagi ito ng tradisyonal na ritwal ng exorcism. Ang awit ay nagpapahayag ng pinakaradical na pangako ng proteksyon ng Diyos. Sinipi ito ng demonyo mismo sa ikatlong tukso kay Kristo (Mateo 4,6). Idinadasal sa mga panganib pisikal at espirituwal.",
    prayerText:
      "Ang nananahan sa lihim ng Kataastaasan ay mananahan sa lilim ng Makapangyarihan. Sasabihin niya sa Panginoon: «Aking kanlungan at aking sandigan, aking Diyos, sa kanya ako tumitiwala». Ililigtas ka niya sa silò ng manghuhuli at sa salot na nakamamatay. Tatakpan ka niya ng kanyang mga balahibo, at sa ilalim ng kanyang mga pakpak ay makakahanap ka ng pakaibahan. Hindi ka matatakot sa lagim ng gabi, ni sa pana na lumilipad sa araw. Bumagsak ang isang libo sa iyong tabing-kaliwa at sampung libo sa iyong tabing-kanan, ngunit hindi ka tatamaan. Sa kanyang mga anghel ay binigyan niya ng utos upang ipagtanggol ka sa lahat ng iyong daan. (Awit 91)",
    instructions:
      "Idasal: (a) gabi-gabi bago matulog, bilang Completas; (b) bago mahabang o panganib na paglalakbay; (c) sa anumang takot o espirituwal na pag-atake; (d) bilang meditation sa pagsubok. Memorize-en mo. Sa espirituwalidad ng pamilya, dinadasal para sa mga bata, maysakit, mga nag-iisang nakatira.",
    patronSaint: "San Miguel Arkanghel · lahat ng Banal na Anghel ng Tagapag-bantay",
    feastDay: "Setyembre 29 · Oktubre 2",
    source: "CBCP + Sagrada Biblia, liturhikal na pagsasalin ng CBCP + Liturhia ng mga Oras (Completas) + tradisyonal na exorcism + Mateo 4,6. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "rosary-for-healing",
    name: "Rosaryo para sa Pagpapagaling",
    description:
      "Ang Rosaryo para sa Pagpapagaling ay ang Katolikong gawain ng pagdasal ng Banal na Rosaryo na may tiyak na intensyon ng paghingi kay Maria, sa pamamagitan ng pamamagitan ni Kristo Banal na Manggagamot, para sa pisikal, emosyonal o espirituwal na pagpapagaling. Ang Marian miracles ng pagpapagaling sa Lourdes, Fatima at iba pang sanctuaries ay laging nakaugnay sa Rosaryo na dinasal sa pananampalataya. Ang Rosaryo ay hindi anting-anting; ito ay contemplative meditation ng mga sentral na misteryo ng pananampalataya sa kasamang Maria.",
    instructions:
      "Idasal ang buong Rosaryo (limang dekada), ideal na may luminous mysteries (na kasama ang Kasal sa Cana). Para sa matagalang sakit, isaalang-alang ang araw-araw sa buong tagal ng paggagamot. Struktura: (1) Tanda ng Krus at Credo; (2) Ama Namin, tatlong Aba Ginoong Maria at Luwalhati; (3) limang dekada; (4) Litanya ng Mahal na Birhen, kasama ang «Kalusugan ng maysakit, ipanalangin mo kami»; (5) Salve. Para sa kanser, dagdagan ng limang Ama Namin para sa pamamagitan ni San Peregrine. Pagsamahin sa sakramento (Kumpisal, Komunyon, Pamamahid).",
    patronSaint: "Maria, Kalusugan ng Maysakit · Kristo, Banal na Manggagamot",
    feastDay: "Oktubre 7 (Mahal na Birhen ng Rosaryo)",
    source: "CBCP + Vatican.va (Rosarium Virginis Mariae, JPII 2002). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "seven-sorrows-rosary",
    name: "Rosaryo ng Pitong Hapis ni Maria",
    description:
      "Ang Rosaryo ng Pitong Hapis ni Maria, tinatawag ding Coronilla ng Pitong Hapis o Rosaryo Servita, ay devosyon ng Order of Servants of Mary (Florence, 1233). Nagmuni-muni sa pitong espadang lumampas sa puso ni Maria ayon sa propesiya ni Simeon (Lc 2,35). Ang istraktura: korona ng pitong grupo (isang Ama Namin at pitong Aba Ginoong Maria bawat grupo) at tatlong Aba Ginoong Maria sa katapusan para sa luha ni Maria. Sa Pilipinas, ang devotion ay malakas sa Holy Week, lalo na sa Biyernes Santo.",
    instructions:
      "Istruktura: (1) Tanda ng Krus; (2) **1st Sorrow**: Propesiya ni Simeon. Ama Namin at pitong Aba Ginoong Maria; (3) **2nd**: Flight to Egypt; (4) **3rd**: Loss in the Temple; (5) **4th**: Meeting on the Way of the Cross; (6) **5th**: Crucifixion; (7) **6th**: Pietà; (8) **7th**: Burial; (9) tatlong Aba Ginoong Maria sa katapusan; (10) tradisyonal na panalangin Servita. Filipino tradition: dasalin sa Biyernes, sa buong Lenten season.",
    patronSaint: "Mater Dolorosa · Order of Servites",
    feastDay: "Setyembre 15",
    source: "CBCP + Vatican.va + Order of Servites (1233) + Benedict XIII (1727). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "surrender-novena",
    name: "Nobena ng Pagsuko (Pe. Dolindo Ruotolo)",
    description:
      "Ang Surrender Novena ay binuo ng lingkod ng Diyos na si Don Dolindo Ruotolo (1882-1970), pari ng Naples. Tinanggap ni Don Dolindo sa panalangin ang sentral na jaculatorya — «Hesus, ikaw na nag-iisip nito» — bilang dictation mula kay Kristo Mismo. Siyam na araw na nobena na may natatanging struktura: bawat araw ay sampung beses idinadasal ang parehong jaculatorya na may umuusbong na kompiyansa. Ang sentral na ideya ay radical: ang Kristiyano ay dapat lubusang ibigay ang solusyon ng problema kay Kristo, nang hindi inaasahan ang banal na providensya. Sa Pilipinas, ang devotion ay laganap dahil sa kahirapan ng pagsuko ng problema.",
    prayerText:
      "Hesus, ikaw na nag-iisip nito.",
    instructions:
      "Idasal nang siyam na magkakasunod na araw. Bawat araw ay may ibang jaculatorya na nagbubukas, sinusundan 10 beses ng «Hesus, ikaw na nag-iisip nito». **Araw 1**: «Bakit ka naguguluhan at nababalisa? Ipaalam mo sa Akin ang pag-aalaga ng iyong mga bagay at lahat ay tumitigil». **Araw 2**: «Anak, pinipinsala at hinahadlang mo ang Aking gawa kapag gusto mong magtuon ka». **Araw 3**: «Ang mangatuwiran, mabalisa, isipan ang konsekuwensya ay kabaligtaran sa pagtitiwala sa Akin». **Araw 4**: «Bulag ka sa mga bagay na ito». **Araw 5**: «Isara ang mga mata ng kaluluwa at sabihin: 'Hesus, ikaw na nag-iisip nito'». **Araw 6**: «Pinipinsala mo Ako kapag, sa halip na ipinaubaya sa Akin, ay pinapayuhan Ako». **Araw 7**: «Ilang bagay ang hindi Ko ginagawa kapag ang kaluluwa, sa kanyang mga pangangailangan, ay bumabaling sa Akin at nagsasabing: 'Hesus, ikaw na nag-iisip nito'!». **Araw 8**: «Isara ang mga mata at dumaan tahimik». **Araw 9**: «Mga anak ko, gumawa kayo ng tatlong banal na oras».",
    patronSaint: "Sanggol na Hesus · Sagradong Puso",
    feastDay: "Nobyembre 19 (Don Dolindo, lingkod ng Diyos)",
    source: "CBCP + Vatican.va + Don Dolindo Ruotolo + Archdiocese of Naples. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  // Locale-anchored para Filipino (8 entries — fil already has santo-nino,
  // simbang-gabi from earlier; needs akita, aparecida, czestochowa,
  // guadalupe, knock, la-vang, maximilian-kolbe, st-juan-diego)
  {
    prayerSlug: "novena-akita",
    name: "Nobena sa Mahal na Birhen ng Akita",
    description:
      "Ang devotion sa Mahal na Birhen ng Akita ay nagpaparangal sa mga Marian apparitions kay Sister Agnes Sasagawa sa Akita, Japan, sa pagitan ng 1973 at 1981. Ang estatwa ng Birhen ay lumuha ng 101 beses ng human na luha sa pagitan ng 1975 at 1981. Ang mga mensahe ay humihingi ng pagsisisi, pagdarasal ng Rosaryo, at consecration sa Imakuladong Puso ni Maria. Opisyal na kinilala ng obispo ng Niigata noong 1984. Akita ay ang unang Marian apparition na inaprubahan sa Eastern Asia.",
    prayerText:
      "O dulcing Ina ng Akita, na sa Inyong mga human na luha ay nakapag-pakilos sa puso ng Inyong mga anak sa Japan, kilusin din ang akin. Ipagkaloob Ninyo sa akin ang biyaya ng tapat na pagbabalik-loob at ang lakas para gumawa ng reparasyon para sa mga kasalanang nakakasakit sa Sagradong Puso ni Hesus at sa Inyo. Hinihingi ko ang biyaya na may kompiyansa kong hinihiling (banggitin ang intensyon). Mahal na Birhen ng Akita, ipanalangin mo kami. Amen.",
    instructions:
      "Idasal nang siyam na magkakasunod na araw. Istraktura: Tanda ng Krus; misteryo ng Rosaryo (glorious); ang panalangin; consecration sa Imakuladong Puso; banggitin ang intensyon.",
    patronSaint: "Mahal na Birhen ng Akita",
    feastDay: "Oktubre 12 (humigit-kumulang)",
    source: "CBCP + Vatican.va + Approval of Bishop John Shojiro Ito (Niigata, 1984) + CDF (Cardinal Ratzinger). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-aparecida",
    name: "Nobena sa Birhen ng Aparecida (Patrona ng Brazil)",
    description:
      "Ang Mahal na Birhen ng Aparecida ay ang Patrona ng Brazil mula 1930, at sentral na Marian advocation ng kulturang Katolikong Brasileño. Ang devotion ay nagmula noong 1717 nang tatlong mangingisda ng ilog Paraíba (Felipe Pedroso, Domingos García, João Alves) ay kumuha mula sa tubig ng maliit na estatwa ng terracotta ng Mahal na Birhen ng Concepcion. Ang Pambansang Santuario ng Aparecida sa São Paulo ay ang pangalawang pinakamalaking simbahan ng Katoliko sa daigdig. Sa Pilipinas, ang devosyon ay vivido ng mga komunidad ng Brasileño at sa diaspora.",
    prayerText:
      "O Birhen ng Aparecida, Reyna at Patrona ng Brazil, na mula sa tubig ng Paraíba ay pinili ninyong lumitaw upang ipahayag ang maternal na pag-aalaga sa Inyong bayan, ipagkaloob Ninyo sa akin ang biyaya na may kompiyansa kong hinihiling (banggitin ang intensyon). Panatilihin Ninyo sa pananampalataya ang mga pamilyang Brasileño, lalo na ang mga apektado ng migration. Mahal na Birhen ng Aparecida, ipanalangin mo kami. Amen.",
    instructions:
      "Idasal nang siyam na magkakasunod na araw, mula Oktubre 4 hanggang 11 sa paghahanda para sa piyesta ng Oktubre 12.",
    patronSaint: "Mahal na Birhen ng Aparecida (Patrona ng Brazil)",
    feastDay: "Oktubre 12",
    source: "CBCP + Vatican.va + Pambansang Santuario ng Aparecida + tradisyon ng tatlong mangingisda (1717). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-czestochowa",
    name: "Nobena sa Birhen ng Częstochowa (Itim na Birhen ng Poland)",
    description:
      "Ang Mahal na Birhen ng Częstochowa, tinatawag ding Itim na Birhen ng Poland, ay ang pinakavenerated na Marian icon ng Poland. Iniugnay sa San Lucas evangelista ayon sa tradisyon mula ika-14 siglo, ang icon ay nakaimbak sa Paulist monastery ng Jasna Góra sa Częstochowa. Ang devotion ay nakaugnay sa milagro ng Agosto 26, 1655 sa Swedish invasion ng Poland. Si San Juan Pablo II ay particular na devoto: bumisita sa sanctuary maraming beses. Sa Pilipinas, ang devotion ay laganap sa komunidad ng JPII devotees.",
    prayerText:
      "O Itim na Birhen ng Częstochowa, Reyna at Patrona ng Poland, na nagtanggol sa Poland noong ika-17 siglo at nagpatnubay sa kanya sa ika-20 siglo sa pamamagitan ng totalitarianisms, ipagkaloob Ninyo sa akin ang biyaya na may kompiyansa kong hinihiling (banggitin ang intensyon). Reyna ng Poland, ipanalangin mo kami. Amen.",
    instructions:
      "Idasal nang siyam na magkakasunod na araw, mula Agosto 18 hanggang 25 sa paghahanda para sa piyesta ng Agosto 26. Glorious mysteries ng Rosaryo.",
    patronSaint: "Mahal na Birhen ng Częstochowa (Reyna ng Poland)",
    feastDay: "Agosto 26",
    source: "CBCP + Vatican.va (homilies of JPII at Jasna Góra) + Paulist Monastery of Jasna Góra. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-guadalupe",
    name: "Nobena sa Birhen ng Guadalupe",
    description:
      "Ang Mahal na Birhen ng Guadalupe ay ang Patrona ng Amerika, idineklara ni San Pius X noong 1910. Ang aparisyon ay nangyari sa pagitan ng Disyembre 9 at 12, 1531 sa burol ng Tepeyac, malapit sa Mexico City, sa indigenous na bagong-converted na si Juan Diego Cuauhtlatoatzin. Si Maria ay nagpakilala sa kanyang sarili sa indigenous skin at features, na nag-iindika ng pagkakamag-anak sa katutubo na bayan. Ang imahen ng Guadalupe ay milagrong-iimprenta sa kanyang tilma (manto ng maguey fibers), na sa kasalukuyan ay nasa Basilica ng Guadalupe sa Mexico City. Sa Pilipinas, ang devotion ay laganap sa mga Hispanic-Filipino Catholics at sa pangkalahatang Marian devotion.",
    prayerText:
      "O dulcing Birhen ng Guadalupe, Ina at Reyna ng Amerika, na lumitaw sa burol ng Tepeyac na nakasuot ng cingcord ng buntis na indigenous na babae, ipagkaloob Ninyo sa akin ang biyaya na may kompiyansa kong hinihiling (banggitin ang intensyon). Mahal na Birhen ng Guadalupe, ipanalangin mo kami. Amen.",
    instructions:
      "Idasal nang siyam na magkakasunod na araw, mula Disyembre 3 hanggang 11 sa paghahanda para sa piyesta ng Disyembre 12.",
    patronSaint: "Mahal na Birhen ng Guadalupe (Patrona ng Amerika)",
    feastDay: "Disyembre 12",
    source: "CBCP + Vatican.va (Pius X 1910; JPII canonization ni Juan Diego 2002) + Nican Mopohua. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-knock",
    name: "Nobena sa Birhen ng Knock (Ireland)",
    description:
      "Ang Mahal na Birhen ng Knock ay isa sa pinakaakanonisadong Marian apparitions ng English-speaking world. Ang aparisyon ay nangyari noong Agosto 21, 1879 sa Knock, county Mayo, Ireland. Labing-limang testigo ay nakakita ng aparisyon ng Maria, San Jose, at San Juan Evangelista, kasama ang isang Cordero (Lamb of God). Ang aparisyon ay ganap na tahimik at tumagal ng halos dalawang oras sa patuloy na ulan. Si San Juan Pablo II ay bumisita sa Knock noong 1979; Papa Francisco noong 2018.",
    prayerText:
      "O dulcing Birhen ng Knock, Imakuladong Ina na sa katahimikan ay lumitaw kasama ni Jose at Juan sa tabi ng Banal na Cordero, ipagkaloob Ninyo sa akin ang biyaya na may kompiyansa kong hinihiling (banggitin ang intensyon). Mahal na Birhen ng Knock, ipanalangin mo kami. Amen.",
    instructions:
      "Idasal nang siyam na magkakasunod na araw, mula Agosto 13 hanggang 20. Isama ang 15 minuto ng katahimikang panalangin bawat araw, sa imitasyon ng katahimikang Marian sa Knock.",
    patronSaint: "Mahal na Birhen ng Knock · San Jose · San Juan Evangelista",
    feastDay: "Agosto 21",
    source: "CBCP + Vatican.va (visita ni JPII sa Knock, 1979) + Knock National Shrine. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-la-vang",
    name: "Nobena sa Birhen ng La Vang (Vietnam)",
    description:
      "Ang Mahal na Birhen ng La Vang ay ang pangunahing Marian advocation ng Vietnam. Ang aparisyon ay nangyari noong 1798 sa malupit na pag-uusig laban sa mga Katolikong Vietnamese. Ang Maria ay lumitaw na nakasuot ng tradisyonal na áo dài Vietnamese na may Sanggol na Hesus sa kanyang mga bisig, at sinabi sa kanila na magdasal at na sila ay kanyang poprotektahan. Ang Basilica ng La Vang ay itinaas sa antas ng Basilica Minor ng Papa Francisco noong 2017. Sa Pilipinas, ang devotion ay vivido ng mga komunidad ng Vietnamese Catholic at ng pagkakaibigan sa pagitan ng diaspora Asian Catholic.",
    prayerText:
      "O Birhen ng La Vang, dulcing Ina na lumitaw upang aliwin ang Inyong mga anak Vietnamese sa pinakamatinding pag-uusig, na nakasuot ng áo dài para sa pagkakilala bilang sarili, ipagkaloob Ninyo sa akin ang biyaya na may kompiyansa kong hinihiling (banggitin ang intensyon). Para sa lahat ng pinagsasalakay na mga Kristiyano sa mundo, intercede. Amen.",
    instructions:
      "Idasal nang siyam na magkakasunod na araw. Sorrowful mysteries ng Rosaryo.",
    patronSaint: "Mahal na Birhen ng La Vang",
    feastDay: "Agosto 15 (associated sa Assumption)",
    source: "CBCP + Vatican.va + Vietnamese Episcopal Conference + Pope Francis (elevation to Basilica Minor 2017). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-maximilian-kolbe",
    name: "Nobena kay San Maximilian Kolbe",
    description:
      "Si San Maximiliano Maria Kolbe (Rajmund Kolbe, 1894-1941) — Pransiskanong Conventual na pari ng Poland — ay patron ng mga preso ng konsensya, mga peryodistang Katoliko, mga pamilya at ang pro-life movement. Itinatag niya ang Militia of the Immaculate (1917). Sa pagsakop ng Nazi, dinala sa Auschwitz noong Mayo 1941. Sa Agosto, nang isang preso ay nakatakas at ang Nazi ay nagpasya na pumatay ng sampung preso bilang kolektibong parusa, voluntarily nag-alay si Kolbe na halinhinan ang isa sa mga condemned, si Franciszek Gajowniczek — isang ama ng pamilya. Nabuhay ng dalawang linggo sa hunger bunker, at finally executed sa phenol injection noong Agosto 14, 1941. Si Gajowniczek ay nabuhay hanggang 1995. Kinanonisa ni San Juan Pablo II noong 1982 bilang «martyr of charity».",
    prayerText:
      "O dakilang San Maximiliano Maria Kolbe, martyr ng caridad at knight ng Imakulada, ikaw na nagbigay ng iyong buhay sa Auschwitz upang ang isang ama ng pamilya ay makauwi, ipagkaloob mo sa akin ang biyaya na may kompiyansa kong hinihiling (banggitin ang intensyon). Para sa lahat ng mga preso ng konsensya, para sa lahat ng mga refugee, intercede. Amen.",
    instructions:
      "Idasal nang siyam na magkakasunod na araw, mula Agosto 5 hanggang 13. Istraktura: Tanda ng Krus; consecration sa Imakulada; ang panalangin; misteryo ng Rosaryo (sorrowful); banggitin ang intensyon. Para sa justicia causes: konkretong gawa ng solidarity — sulat sa preso, donation sa pro-life cause; pagbabasa ng Filipenses 2,5-11.",
    patronSaint: "San Maximiliano Maria Kolbe, OFMConv (martyr ng Auschwitz)",
    feastDay: "Agosto 14",
    source: "CBCP + Vatican.va (canonization JPII 1982) + Niepokalanów + Auschwitz Museum (testimony of Franciszek Gajowniczek). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-juan-diego",
    name: "Nobena kay San Juan Diego",
    description:
      "Si San Juan Diego Cuauhtlatoatzin (1474-1548) ay ang indigenous na lalaki na siyang pinakitaan ng Mahal na Birheng Maria sa Tepeyac sa pagitan ng Disyembre 9 at 12, 1531, kung saan ipinakilala ang sarili bilang Birhen ng Guadalupe. Naging Kristiyano siya bago ang 1525, nabalo noong 1529. Siya ang sentral na human figure ng pagbabalik-loob ng Mexico at lahat ng Hispanic America sa Katolisismo. Ang imahen ng Guadalupe ay milagrong-iimprenta sa kanyang tilma. Kinanonisa ni San Juan Pablo II sa Basilica ng Guadalupe noong Hulyo 31, 2002. Patron ng mga katutubo at humble.",
    prayerText:
      "O dakilang San Juan Diego, indigenous na agila na pinili ng Mahal na Birheng Maria para maging tagapagdala ng imahen ng Guadalupe sa buong continent ng Amerika, ipagkaloob mo sa akin ang biyaya na may kompiyansa kong hinihiling (banggitin ang intensyon). Ikaw na narinig ang Celestial na Ina na tumawag sa iyo bilang «aking pinakamaliit na anak», ipagkaloob mo sa akin ang biyaya ng pagdama sa sarili, kahit sa abang sitwasyon, bilang minamahal na anak ng Ina ng Diyos. Amen.",
    instructions:
      "Idasal nang siyam na magkakasunod na araw, mula Nobyembre 30 hanggang Disyembre 8 sa paghahanda para sa Guadalupe (Disyembre 12).",
    patronSaint: "San Juan Diego Cuauhtlatoatzin",
    feastDay: "Disyembre 9",
    source: "CBCP + Vatican.va (San Juan Pablo II, canonization sa Basilica ng Guadalupe, July 31, 2002) + Nican Mopohua. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "litany-of-humility",
    name: "Litaniya ng Kababaang-loob",
    description:
      "Ang Litaniya ng Kababaang-loob ay maikli ngunit malalim na panalangin na isinulat ni Cardinal Rafael Merry del Val (1865-1930), Secretary of State ng Papa San Pio X sa buong panahon ng kanyang papado. Isang Espanyol-Irlandés na ipinanganak at pinag-aral sa Roma, si Merry del Val ay isang taong may disiplinado at malalim na panloob na buhay at may di-pangkaraniwang abnegasyon ng sarili. Natagpuan ang litaniya kasama ng kanyang mga personal na devotional na papeles pagkatapos ng kanyang kamatayan at inilathala ng kanyang kalihim, kaya't naging isa sa pinakaminamahal at pinakamadalas na ibinabahaging makabagong panalangin sa Katolikong mundong nagsasalita ng Filipino. Ang istruktura ay may dalawang bahagi: una, mga petisyon tungkol sa pagnanais at takot kaugnay ng sariling reputasyon («Sa pagnanais na maitanghal…» / «Sa takot na mapahiya…»); at ikalawa, mga petisyon na bumabaling sa kabutihan ng iba kaysa sa sarili («Mahalin ang iba higit kaysa sa akin…»). Ang sagot na «iligtas mo ako, Hesus» at ang paulit-ulit na pakiusap para sa biyaya na hangarin ang kabutihan ng iba ay tumatama sa abstraksyon na karaniwang sumasaklaw sa banal na panalangin at pinangalanan nang malinaw ang mga hilig ng pusong tao. Hindi hinihingi ng litaniya na maalis ang mga pagnanais na ito (kinikilala ng Katolikong asketikal na teolohiya ang mga ito bilang malalim na nakatanim sa kalikasan ng taong nahulog), kundi ang biyayang piliin ang reputasyon ni Kristo higit sa sarili, at ang sa iba higit sa sarili. Nagkaroon ito ng tahimik ngunit malalim na impluwensya sa makabagong Katolikong espirituwalidad — lalo na sa mga pari, seminarista, mga relihiyosa, at mga Katolikong nasa pag-diskarni ng bokasyon — sapagkat ang espesipikong pagngangalan nito ay umaabot kung saan hindi nakakapunta ang abstraktong banal na panalangin. Ang Banal na Madre Teresa ng Calcutta ay nagdarasal ng litaniyang ito araw-araw; maraming seminaryo ang nagsasama nito sa pormasyon ng mga kandidato sa pagkapari.",
    prayerText:
      "O Hesus, maamo at mababang-loob, dinggin mo ako.\n\nSa pagnanais na maitanghal, iligtas mo ako, Hesus.\nSa pagnanais na mahalin, iligtas mo ako, Hesus.\nSa pagnanais na ipagbunyi, iligtas mo ako, Hesus.\nSa pagnanais na parangalan, iligtas mo ako, Hesus.\nSa pagnanais na purihin, iligtas mo ako, Hesus.\nSa pagnanais na maitanghal nang higit sa iba, iligtas mo ako, Hesus.\nSa pagnanais na sangguniin, iligtas mo ako, Hesus.\nSa pagnanais na sang-ayunan, iligtas mo ako, Hesus.\n\nSa takot na mapahiya, iligtas mo ako, Hesus.\nSa takot na hamakin, iligtas mo ako, Hesus.\nSa takot na sawayin, iligtas mo ako, Hesus.\nSa takot na paninirahan, iligtas mo ako, Hesus.\nSa takot na malimot, iligtas mo ako, Hesus.\nSa takot na pagtawanan, iligtas mo ako, Hesus.\nSa takot na lapastanganin, iligtas mo ako, Hesus.\nSa takot na pagdudahan, iligtas mo ako, Hesus.\n\nMahalin ang iba higit kaysa sa akin, Hesus, biyayaan mo ako ng pagnanais nito.\nPahalagahan ang iba higit kaysa sa akin, Hesus, biyayaan mo ako ng pagnanais nito.\nSa paningin ng mundo, ang iba ay lumawak at ako ay bumaba, Hesus, biyayaan mo ako ng pagnanais nito.\nPiliin ang iba at ako ay maitabi, Hesus, biyayaan mo ako ng pagnanais nito.\nPurihin ang iba at ako ay hindi napansin, Hesus, biyayaan mo ako ng pagnanais nito.\nUnahin ang iba kaysa sa akin sa lahat ng bagay, Hesus, biyayaan mo ako ng pagnanais nito.\nAng iba ay maging mas banal kaysa sa akin, basta't ako ay maging kasinbanal ng nararapat, Hesus, biyayaan mo ako ng pagnanais nito. Amen.",
    instructions:
      "Idasal ang litaniya nang mabagal. Maikli ang teksto — mas mababa sa tatlong-daang salita — ngunit ang bigat nito ay nasa pangangalan ng bawat pagnanais at bawat takot nang malinaw. Tradisyunal na istruktura: (1) Tanda ng Krus; (2) basahin nang malakas at mabagal ang unang panawagan «O Hesus, maamo at mababang-loob, dinggin mo ako»; (3) idasal ang mahabang sunod-sunod na «Sa pagnanais na…», hayaang madama kung alin ang nagngangalan sa iyo sa araw na iyon — huwag dumaan agad sa nakakapuso; (4) idasal ang sunod-sunod na «Sa takot na…» sa parehong paraan; (5) idasal ang panghuling petisyon na «Mahalin/Pahalagahan/Unahin ang iba…» nang dahan-dahan, hingiin nang tiyakang ang biyayang pinangangalan ng bawat isa. Maraming tao ang nagdarasal ng litaniyang ito kapag nahuli nila ang sarili sa pagmamalaki — pagkatapos ng mahirap na pag-uusap, pagkatapos magpadala ng email na hindi dapat ipinadala, pagkatapos ng pagpupulong kung saan gusto nilang manaig, pagkatapos ng serbisyong pang-simbahan na naging pagtatanghal. Angkop ang litaniya: sa simula ng retreat, lalo na ng Ignatian na walong-araw na retreat; bago mag-Confession (bilang bahagi ng examination of conscience — pinangangalanan ng litaniya ang mga pattern ng pagmamalaki na nagtatago sa harap ng lahat); sa panahon ng pag-diskarni ng bokasyon patungo sa pagkapari, relihiyosong buhay, o pag-aasawa; sa Biyernes Santo o sa Sacred Triduum, kapag pinagninilayan ng Simbahan ang «kenosis» ni Kristo; sa mga sandali ng publikong kahihiyan o nararamdamang kabiguan — kapag ang litaniya ay hindi na aspirasyonal kundi paglalarawan kung saan talaga inilagay ng Diyos ang nananalangin. Ang biograpo ni Merry del Val ay nagsasaad na ang kardinal ay nagdarasal ng litaniyang ito araw-araw pagkatapos ng Misa sa buong panahon niya bilang Secretary of State, sa Romanong opisina kung saan tuloy-tuloy ang mga tukso ng pagmamalaki at pulitikal na maneuver. Ang panalangin ay nakapaloob sa mas malawak na Katolikong asketikal na tradisyon na nagsasaad na ang kababaang-loob ay pundasyon ng lahat ng iba pang birtud — ang «una, kababaang-loob; ikalawa, kababaang-loob; ikatlo, kababaang-loob» ni San Agustin, at ang Thomistic na pagkilala sa pagmamalaki bilang ugat ng lahat ng kasalanan.",
    patronSaint: "Cardinal Rafael Merry del Val (may-akda)",
    feastDay: null,
    source: "CBCP + Vatican.va English (cardinal's papers, Pius X era) + tradisyunal na devosyonal na pagsasalin sa Pilipinas. Retrieved 2026-05-19.",
    reviewedAt: new Date("2026-05-19"),
  },
  {
    prayerSlug: "litany-of-trust",
    name: "Litaniya ng Pagtitiwala",
    description:
      "Ang Litaniya ng Pagtitiwala ay isang makabagong Katolikong litaniya na isinulat noong mga 2010 ni Sister Faustina Maria Pia, SV, ng Sisters of Life — ang relihiyosong komunidad na itinatag noong 1991 ni Cardinal John O'Connor ng New York upang maglingkod sa mga buntis na babae sa krisis at magpatotoo sa kabanalan ng bawat buhay ng tao mula sa konsepsyon hanggang sa natural na kamatayan. Ang litaniya ay nag-emerge mula sa sariling panloob na pakikipagbuno ni Sister Faustina Maria Pia sa pagtitiwala — partikular sa kumpol ng mga takot na umaaligid sa ilalim ng makabagong Katolikong buhay: ang takot na hindi mahalin, na pabayaan, na maging kabiguan, na hindi mapatawad ang sarili, na hindi kayang magmahal. Ang litaniya ay pinangangalanan ang bawat isa sa mga takot («Sa takot na malimutan…» / «Sa takot na hindi mahalin…» / «Sa takot na hindi karapat-dapat sa pag-ibig…») at humihingi ng paglaya sa pamamagitan ng sagot na «iligtas mo ako, Hesus». Ang ikalawang kilos ng litaniya ay nagpapangalan ng dalawampung katotohanan tungkol kay Hesus na inaanyayahan ang nagdarasal na magtiwala: «Na ikaw ay tuloy-tuloy na nagiingat sa akin sa pagiging buhay… Na ikaw ay nagmamahal sa akin… Na ikaw ay nakakikita sa akin…». Sa bawat isa, ang sagot ay «Hesus, nagtitiwala ako sa iyo». Ang litaniya ay kumalat ng viral sa Filipino Catholic youth ministry, mga grupo ng kababaihan, at social media — isa ito sa pinakamadalas na ibinabahaging panalanging Katoliko ng dekada 2010 at 2020. Ang Sisters of Life ay malayang naglalathala nito sa kanilang website (sistersoflife.org) para sa personal at parokyal na paggamit. Angkop ito para sa: pagkabalisa at ang kumpol ng makabagong pakikipagbuno sa kalusugan ng isip na nahahayag bilang takot ng kawalang-kapakinabangan; pagbawi mula sa espirituwal na scrupulosity; mga unang araw ng mahirap na diagnosis; pighati; kahirapang pinansyal; at anumang sandali kapag napansin ng mananampalataya na siya ay umoopera mula sa takot sa halip na mula sa pananampalataya.",
    prayerText:
      "Sa paniniwalang kailangan kong kitain ang iyong pag-ibig, iligtas mo ako, Hesus.\nSa takot na hindi ako karapat-dapat sa pag-ibig, iligtas mo ako, Hesus.\nSa maling katiyakan na taglay ko ang kailangan, iligtas mo ako, Hesus.\nSa takot na ang pagtitiwala sa iyo ay magdadala sa akin sa lalong matinding kahirapan, iligtas mo ako, Hesus.\nSa lahat ng pagdududa sa iyong mga salita at pangako, iligtas mo ako, Hesus.\nSa paghihimagsik laban sa pagiging tulad ng bata sa pagdepende sa iyo, iligtas mo ako, Hesus.\nSa pagtanggi at pag-aalinlangan sa pagtanggap ng iyong kalooban, iligtas mo ako, Hesus.\nSa pagkabalisa tungkol sa hinaharap, iligtas mo ako, Hesus.\nSa pagkagalit o sobrang pag-aabala sa nakaraan, iligtas mo ako, Hesus.\nSa balisang paghahanap sa sarili sa kasalukuyang sandali, iligtas mo ako, Hesus.\nSa kawalang-pananampalataya sa iyong pag-ibig at presensya, iligtas mo ako, Hesus.\nSa takot na hihilingin sa akin na magbigay ng higit pa sa aking kaya, iligtas mo ako, Hesus.\nSa paniniwalang ang aking buhay ay walang kahulugan o halaga, iligtas mo ako, Hesus.\nSa takot sa hinihingi ng pag-ibig, iligtas mo ako, Hesus.\nSa panghihina ng loob, iligtas mo ako, Hesus.\n\nNa ikaw ay tuloy-tuloy na nagiingat sa akin sa pagiging buhay, Hesus, nagtitiwala ako sa iyo.\nNa ikaw ay nagmamahal sa akin, Hesus, nagtitiwala ako sa iyo.\nNa ikaw ay nakakikita sa akin, Hesus, nagtitiwala ako sa iyo.\nNa ikaw ay nakikinig sa akin, Hesus, nagtitiwala ako sa iyo.\nNa kilala mo ako, Hesus, nagtitiwala ako sa iyo.\nNa ikaw ay nakakikita sa nakaraan, kasalukuyan, at hinaharap, at alam mo ang kailangan ko, Hesus, nagtitiwala ako sa iyo.\nNa ikaw ay maglalaan para sa akin, Hesus, nagtitiwala ako sa iyo.\nNa ikaw ay sasagip sa akin, Hesus, nagtitiwala ako sa iyo.\nNa ikaw ay maamo at mababang-loob, Hesus, nagtitiwala ako sa iyo.\nNa ikaw ay walang-hanggang tapat, Hesus, nagtitiwala ako sa iyo.\nNa lahat ng bagay ay lumilipas, at tanging ang iyong pag-ibig ang nananatili, Hesus, nagtitiwala ako sa iyo.\nNa ikaw ay naglalabas ng tunay na kabutihan mula sa bawat sitwasyon, Hesus, nagtitiwala ako sa iyo.\nNa tuturuan mo ako na magtiwala sa iyo, Hesus, nagtitiwala ako sa iyo.\nNa ikaw ang aking Panginoon at aking Diyos, Hesus, nagtitiwala ako sa iyo.\nNa ako ay iyong minamahal, Hesus, nagtitiwala ako sa iyo. Amen.",
    instructions:
      "Idasal ang litaniya nang mabagal. Ang teksto ay maikli — mga limandaang salita — ngunit mahalaga ang kilos nito. Tradisyunal na istruktura: (1) Tanda ng Krus; (2) basahin nang malakas ang unang panawagan; (3) idasal ang mahabang sunod-sunod na «Sa takot na…» — pinangangalanan ng mga ito ang mga partikular na pattern ng kawalang-tiwala na pumapamahala sa buhay ng matanda sa loob. Huwag dumaan agad sa nakakapuso sa partikular na araw; (4) idasal ang ikalawang kilos, ang mahabang sunod-sunod na katotohanan na «Na ikaw…» na may sagot na «Hesus, nagtitiwala ako sa iyo». Ito ang puso ng panalangin — ang sinadya at malinaw na akto ng pagtitiwala na ginagawa ng mananampalataya laban sa nararamdamang katibayan ng kanyang sariling takot. (5) magsara sa katahimikan, hayaang manirahan ang mga katotohanang katatapos pa lang pangalanan. Angkop ang Litaniya ng Pagtitiwala: sa simula ng mahirap na araw; sa bungad ng mahirap na pag-uusap; sa simbahan bago ang mahabang shift ng pagkalinga; sa tabi ng kuna ng isang tao sa NICU o sa palliative care; sa panahon ng anxiety attacks; sa panahon ng pinansyal na krisis; sa panahon ng pighati. Ang Sisters of Life ay nagdarasal ng litaniya araw-araw sa komunidad sa katapusan ng evening prayer. Mahusay na ipinagsasama ang litaniya sa Coronilla ng Banal na Awa.",
    patronSaint: "Sister Faustina Maria Pia, SV (Sisters of Life — may-akda)",
    feastDay: null,
    source: "CBCP + Sisters of Life (sistersoflife.org/litany-of-trust, awtorisado para sa devotional reproduction). Retrieved 2026-05-19.",
    reviewedAt: new Date("2026-05-19"),
  },
  {
    prayerSlug: "salve-regina",
    name: "Aba Ginoong Reyna (Salve Regina)",
    description:
      "Ang Salve Regina — kilala sa Filipino bilang «Aba Ginoong Reyna» o «Aba, Reyna ng Awa» — ay isa sa apat na Marian antiphons ng Roman Breviary at ang pinakaminamahal na maikling Marian na panalangin sa Katolikong mundong nagsasalita ng Filipino. Ipinapalagay sa tradisyon kay Blessed Hermann the Lame ng Reichenau (1013-1054), isang Benedictine monk ng monasteryo ng Reichenau sa timog Alemanya, na nagdusa sa matinding pisikal na kapansanan mula sa kapanganakan at, hindi makalakad, mahirap magsalita, at bahagyang bingi, ngunit kinilala ng mga monks sa kanyang pambihirang mga regalo sa katalinuhan: sumulat siya ng mga papel sa astronomy, music theory, at mathematics, kumponer ng mga liturgical hymns, at, ayon sa tradisyon ng ika-11 siglo, kinompose niya ang Salve Regina malapit sa katapusan ng kanyang buhay. Ang lambing ng panalangin — tinutukoy si Maria bilang «aming buhay, kasarapan, at pag-asa» — at ang tapat na pagkilala sa pagdurusa ng tao («umiiyak at nananaghoy sa lambak ng luha») ay sumasalamin sa karanasan ng isang taong nakakilala sa buhay ng pambihirang pisikal na limitasyon. Ang Salve Regina ay pumasok sa universal na Katolikong paggamit sa pamamagitan ng Cistercian Order noong ika-12 siglo at pinagtibay bilang antiphon ng pagsasara ng Compline. Sa Pilipinas, ang Aba Ginoong Reyna ay isa sa mga unang panalanging natutunan ng mga bata sa pamilya, idinadasal bago matulog sa gabi, sa mga Marian na peregrinasyon (Antipolo, Manaoag, Naga, Piat), at bilang pagsasara ng anumang Marian na nobena. Angkop para sa: katapusan ng bawat Banal na Rosaryo; pamilyang gabing panalangin; sa tabi ng malubhang may sakit o naghihingalo; sa Marian na buwan ng Mayo at Oktubre; sa pagtatapos ng anumang Marian na nobena; at bilang panalanging «kanlungan» ng Katolikong Filipinong puso sa mga sandali ng kalungkutan.",
    prayerText:
      "Aba, Reyna ng Awa,\nbuhay, kasarapan, at pag-asa namin, aba!\nIkaw ang tinatawag namin, mga pinatapong anak ni Eva.\nIkaw ang pinagbubuntungang-hininga namin\nsa aming pagtangis at pananaghoy\nsa lupang ito ng luha.\nHalina, makapangyarihang taga-pamagitan namin,\nilingap mo sa amin ang iyong mga matang maawain.\nAt pagkatapos ng aming pagpapanaw,\nipakita mo sa amin si Hesus,\nang anak na bunga ng iyong tiyan.\nO maawain, o mahabagin, o matamis na Birheng Maria!\n\nIpanalangin mo kami, Santa Inang Diyos,\nupang kami ay maging karapat-dapat sa mga pangako ni Kristo.\n\nAmen.",
    instructions:
      "Idasal nang isang beses nang may buong atensyon. Ang Aba Ginoong Reyna ay maikli — mga 150 salita — at karaniwang nakakabisa ng mga Katoliko. Ang tradisyunal na istruktura ay ang buong teksto ng panalangin, sinusundan ng versicle-response «Ipanalangin mo kami, Santa Inang Diyos / Upang kami ay maging karapat-dapat sa mga pangako ni Kristo» at isang panghuling collect. Angkop: sa katapusan ng bawat Banal na Rosaryo (ito ang universal na Katolikong devotional convention); sa tabi ng isang taong nasa kanilang huling oras (ang Aba Ginoong Reyna ay isa sa mga dakilang prayer ng commendation); pagkatapos ng anumang Marian na nobena; sa funeral rites ng mga pari, relihiyosa, at bawat Katoliko na partikular na devoted kay Maria. Ang Latin original («Salve, Regina, mater misericordiae…») ay kinakanta nang solemne sa maraming parokya sa Pilipinas tuwing Mayo at Oktubre. Ituro ang Aba Ginoong Reyna sa mga bata nang maaga — isa ito sa apat o limang panalanging Katoliko na dapat matutunan ng batang Pilipino bago ang First Communion, kasama ang Tanda ng Krus, Ama Namin, Aba Ginoong Maria, at Luwalhati.",
    patronSaint: "Blessed Hermann ng Reichenau (attributed na may-akda)",
    feastDay: null,
    source: "CBCP (Catholic Bishops' Conference of the Philippines, opisyal na liturgical text sa Filipino) + Vatican.va English + Cistercian tradition (12th c.) + Antipolo / Manaoag / Naga shrines. Retrieved 2026-05-19.",
    reviewedAt: new Date("2026-05-19"),
  },
];
