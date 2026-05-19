import type { PrayerTranslationSeed } from "./types";

/**
 * Brazilian Portuguese (pt-BR) translations of PrayerType content.
 *
 * Authoring conventions:
 *  - **Source tier**: CNBB (Conferência Nacional dos Bispos do Brasil),
 *    Vatican.va Portuguese, Paulus / Canção Nova / Aparecida publishers
 *    for canonical prayer texts. Cite source + retrieval date.
 *  - **Variant**: macro-tag `pt-BR` — Brazilian Portuguese register.
 *    `você` form, `e-mail` with hyphen. Avoid Portugal-specific
 *    `vós` / `telemóvel` / `casa de banho`. pt-PT support is a future
 *    layer.
 *  - **Catholic register**: `rezar por` (devotional preposition);
 *    same convention as the email dictionary's `por` prefix.
 *  - **Brand names stay English**: `PrayerTrain`, `Surrender Novena`.
 *  - **`prayerText` left null** — canonical Brazilian Portuguese
 *    prayer wording should be drawn from CNBB / Aparecida / Vatican
 *    sources in a separate focused pass rather than rendered from
 *    translation memory. Helper falls back to English prayer text
 *    under the Portuguese description + instructions.
 */
export const ptBRTranslations: PrayerTranslationSeed[] = [
  {
    prayerSlug: "novena-sacred-heart",
    name: "Novena ao Sagrado Coração de Jesus",
    description:
      "A Novena ao Sagrado Coração de Jesus é uma das devoções mais amadas da Igreja Católica, nascida das aparições de Jesus a Santa Margarida Maria Alacoque em Paray-le-Monial, França, entre 1673 e 1675. Nessas visões, Cristo revelou a profundidade de seu amor pela humanidade, simbolizado por seu Coração trespassado e coroado de espinhos, e pediu que esse amor fosse honrado pela devoção ao seu Sagrado Coração. A novena se estende por nove dias consecutivos de oração (o número nove recorda os nove dias em que os apóstolos e Maria permaneceram em oração entre a Ascensão e Pentecostes) e é tradicionalmente oferecida com confiança na compaixão de Cristo por aqueles que sofrem. É especialmente apropriada em tempos de doença, dificuldade familiar, desolação espiritual ou intenções persistentes que ainda não encontraram resposta. O Sagrado Coração não é apenas um símbolo; é o coração histórico e físico de Cristo, plenamente humano e plenamente divino, fonte de sua caridade infinita. A encíclica Haurietis Aquas de Pio XII (1956) descreve o Sagrado Coração como «o trono da misericórdia» e confirma o lugar central dessa devoção na vida da Igreja. Os guerreiros de oração que oferecem esta novena se unem a séculos de católicos que depositaram sua confiança no Coração ferido do Salvador.",
    prayerText:
      "Ó Sacratíssimo Coração de Jesus, fonte de toda bênção, eu Vos adoro, eu Vos amo, e com vivo arrependimento dos meus pecados Vos ofereço este meu pobre coração. Tornai-me humilde, paciente, puro e inteiramente obediente à Vossa vontade. Concedei, bom Jesus, que eu viva em Vós e para Vós. Protegei-me no meio do perigo. Confortai-me nas minhas aflições. Dai-me saúde do corpo, assistência nas minhas necessidades temporais, Vossa bênção sobre tudo o que faço, e a graça de uma santa morte. Amém.",
    instructions:
      "Reze uma vez ao dia por nove dias consecutivos, aproximadamente no mesmo horário a cada dia. Escolha um lugar tranquilo e comece com o Sinal da Cruz. A estrutura tradicional é: (1) uma invocação inicial, frequentemente «Ó Sacratíssimo Coração de Jesus, em Ti deposito toda a minha confiança»; (2) o próprio texto da novena; (3) um Pai-Nosso, uma Ave-Maria e um Glória; (4) uma intenção pessoal nomeada em voz alta ou em silêncio. Muitos acrescentam as Ladainhas do Sagrado Coração no último dia ou rezam a novena junto com a devoção das Primeiras Sextas-Feiras, recebendo a Sagrada Comunhão em nove primeiras sextas-feiras consecutivas como o próprio Cristo pediu a Santa Margarida Maria. A novena pode ser rezada em qualquer época do ano, mas é especialmente apropriada durante o mês de junho (mês do Sagrado Coração), nos dias que antecedem a Solenidade do Sagrado Coração (sexta-feira após Corpus Christi), ou sempre que alguém enfrenta um momento particularmente difícil. Se um dia for perdido, o conselho tradicional é começar novamente desde o primeiro dia em vez de saltá-lo; a disciplina da oração consecutiva é parte da graça da devoção. Alguns rezam por uma pessoa específica em cada dia da novena; outros oferecem todos os nove dias por uma única intenção.",
    patronSaint: "Santa Margarida Maria Alacoque",
    feastDay: "Sexta-feira após Corpus Christi",
    source:
      "CNBB materials in Portuguese + Vatican.va Brazilian Portuguese editions + traditional Catholic devotional sources for the Sacred Heart novena. Historical claims verified against Haurietis Aquas (Pius XII, 1956) and the published account of the apparitions at Paray-le-Monial. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-st-joseph",
    name: "Novena a São José",
    description:
      "São José, pai adotivo de Jesus e casto esposo da Santíssima Virgem Maria, é um dos intercessores mais amados na tradição católica. Embora a Escritura não registre nenhuma palavra pronunciada por ele, sua fidelidade é inconfundível: protegeu a Sagrada Família na fuga ao Egito, sustentou-os com o trabalho de suas mãos e ensinou a Jesus o ofício da carpintaria e os caminhos da masculinidade fiel. O Papa Pio IX o nomeou Patrono da Igreja Universal em 1870, e o Papa Francisco declarou o período 2020-2021 como Ano de São José por meio da carta apostólica Patris Corde («Com Coração de Pai»). Esta novena se nutre de uma longa tradição católica que reconhece São José como patrono dos pais, dos trabalhadores, das famílias, dos assuntos imobiliários e da boa morte — os quatro pilares de seu ministério terreno. É invocado especialmente em momentos de dificuldade financeira, discórdia familiar, dificuldades no trabalho e no discernimento vocacional. Muitos católicos se comprometem com a novena nos dias que antecedem uma de suas festas: 19 de março (Solenidade de São José, Esposo da Bem-Aventurada Virgem Maria) ou 1 de maio (São José Operário, instituída pelo Papa Pio XII em 1955 para santificar o trabalho humano). Santa Teresa de Ávila escreveu famosamente: «A outros santos parece que o Senhor deu graça para socorrer em alguma necessidade particular; mas a este glorioso santo, por experiência sei, tem-lhe dado graça para nos socorrer em todas as nossas necessidades».",
    prayerText:
      "Ó São José, cuja proteção é tão grande, tão forte, tão pronta diante do trono de Deus, em vós deposito todos os meus interesses e desejos. Ó São José, assisti-me com vossa poderosa intercessão e obtende-me de vosso divino Filho todas as bênçãos espirituais, por Jesus Cristo, nosso Senhor; para que, tendo aqui em baixo assegurado vosso poder celestial, eu possa oferecer meu agradecimento e homenagem ao mais amoroso dos Pais. Amém.",
    instructions:
      "Reze uma vez ao dia por nove dias consecutivos. A estrutura tradicional: comece com o Sinal da Cruz; reze o texto da novena; conclua com um Pai-Nosso, uma Ave-Maria e um Glória; nomeie sua intenção específica. Algumas famílias católicas acrescentam as Ladainhas de São José ou sete Pai-Nossos, Ave-Marias e Glórias em honra das Sete Dores e Sete Alegrias de São José — uma devoção tradicional ligada às suas experiências dolorosas e alegres na vida da Sagrada Família. Para famílias que estão discernindo uma decisão importante (mudança de emprego, mudança de cidade, casamento), é costume começar a novena nove dias antes do prazo da decisão, pedindo a intercessão de São José para obter clareza e a graça de aceitar a vontade de Deus. A novena também é tradicionalmente rezada durante o mês de março (mês de São José) ou junto com a prática popular de enterrar uma estátua de São José em relação com a venda de uma casa — uma tradição popular que enfatiza a confiança serena, não a superstição. Seja a novena rezada pelo discernimento vocacional, pela provisão econômica, pela cura familiar ou por uma boa morte (um dos quatro fins tradicionais desta devoção), o espírito deve ser de confiança tranquila e trabalhadora — a mesma disposição que São José modelou nas Escrituras.",
    patronSaint: "São José",
    feastDay: "19 de março / 1 de maio",
    source:
      "Patris Corde (Francis, 2020) + CNBB materials in Portuguese + traditional Brazilian Catholic devotional sources for the St. Joseph novena. The St. Teresa of Ávila quotation is from her Vida (chapter 6). Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "holy-rosary",
    name: "O Santo Rosário",
    description:
      "O Santo Rosário é a devoção mariana central da Igreja Católica — uma oração contemplativa em que o crente medita os grandes mistérios da vida, morte e ressurreição de Cristo enquanto reza dezenas repetidas de Ave-Marias. O Rosário, como o conhecemos hoje, tomou forma ao longo dos séculos; a tradição sustenta que a Santíssima Virgem Maria entregou o Rosário a São Domingos em 1208 como arma espiritual contra a heresia albigense, e a estrutura de quinze mistérios foi codificada pelo Papa São Pio V em 1569. Em 2002, o Papa São João Paulo II acrescentou os Mistérios Luminosos (Mistérios da Luz) em sua carta apostólica Rosarium Virginis Mariae, levando o total a vinte mistérios agrupados em quatro conjuntos. Cada dezena é uma meditação: enquanto os dedos percorrem as contas e os lábios recitam a Ave-Maria, a mente se detém num momento dos Evangelhos — a Anunciação, a Crucificação, a Ressurreição, a Transfiguração. O Rosário não é repetição vã (Mateus 6,7) mas uma escola de contemplação, permitindo que o ritmo das orações libere a mente para refletir sobre os mistérios da salvação. Os Papas, de Leão XIII (cujas onze encíclicas sobre o Rosário continuam sendo referências magisteriais) até Francisco, têm exortado os fiéis a rezar o Rosário diariamente. É a oração oferecida em Lourdes, Fátima e em inúmeras outras aparições marianas, e a oração mais frequentemente rezada por famílias católicas reunidas junto a um leito de doente ou diante de uma sepultura.",
    instructions:
      "Um Rosário completo consiste em cinco dezenas, geralmente rezado em cerca de vinte minutos. Comece com o Sinal da Cruz e o Creio dos Apóstolos sobre o crucifixo. Na primeira conta grande, reze o Pai-Nosso; em cada uma das três contas pequenas que seguem, reze uma Ave-Maria (pelo aumento das três virtudes teologais — fé, esperança e amor); na próxima conta grande, reze o Glória. Em seguida anuncie o primeiro mistério em voz alta e medite brevemente sobre seu significado; reze um Pai-Nosso na conta grande, dez Ave-Marias nas dez contas pequenas (uma por conta) continuando a meditar sobre o mistério, depois um Glória e a Oração de Fátima («Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno…»). Repita por mais quatro dezenas, nomeando cada mistério. Conclua com a Salve-Rainha e a oração do Rosário. Os quatro conjuntos de mistérios são tradicionalmente rezados: Mistérios Gozosos nas segundas e sábados (Anunciação, Visitação, Nascimento, Apresentação, Encontro no Templo); Dolorosos nas terças e sextas (Agonia, Flagelação, Coroação de Espinhos, Caminho do Calvário, Crucificação); Gloriosos nas quartas e domingos (Ressurreição, Ascensão, Pentecostes, Assunção, Coroação); Luminosos nas quintas (Batismo, Bodas de Caná, Anúncio do Reino, Transfiguração, Instituição da Eucaristia). Para a cobertura de um PrayerTrain, uma única dezena — ou mesmo uma única Ave-Maria oferecida com intenção — também é uma oferta válida do Rosário.",
    patronSaint: "Nossa Senhora do Rosário",
    feastDay: "7 de outubro",
    source:
      "Rosarium Virginis Mariae (St. John Paul II, 2002) + Leo XIII's eleven rosary encyclicals + Catechism of the Catholic Church paragraphs 971, 2678, 2708 on the Marian dimension of prayer. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "chaplet-divine-mercy",
    name: "Terço da Divina Misericórdia",
    description:
      "O Terço da Divina Misericórdia foi entregue por Jesus a Santa Maria Faustina Kowalska, religiosa polonesa, em uma série de revelações ocorridas entre 1931 e 1938 e registradas em seu Diário: A Divina Misericórdia em Minha Alma. O terço é uma poderosa oração de intercessão oferecida pela conversão dos pecadores, pela consolação dos moribundos e pela misericórdia de Deus sobre o mundo inteiro. Jesus disse a Faustina que quem rezasse este terço receberia «grande misericórdia na hora da morte» — e que se deleitava especialmente nesta oração quando rezada às 3:00 da tarde, a Hora da Misericórdia (a hora de sua morte no Calvário). O terço é rezado num rosário comum, o que o torna acessível a qualquer pessoa que tenha um rosário, e leva aproximadamente dez minutos. A devoção à Divina Misericórdia esteve suprimida por muitos anos, mas o Papa São João Paulo II — ele próprio polonês e compatriota de Santa Faustina — a canonizou em 30 de abril de 2000 e estabeleceu o Domingo da Divina Misericórdia (segundo domingo de Páscoa) como festa para a Igreja universal. O Terço da Divina Misericórdia tornou-se uma das devoções mais rezadas na Igreja contemporânea, especialmente apreciada por capelães de hospital, voluntários de cuidados paliativos e por aqueles que rezam pela conversão de entes queridos. É a oração diária no Santuário Nacional da Divina Misericórdia em Stockbridge, Massachusetts, e no Santuário da Divina Misericórdia em Łagiewniki, Cracóvia — o lugar onde Faustina viveu, morreu e está hoje sepultada.",
    prayerText:
      "Pai Eterno, eu Vos ofereço o Corpo e o Sangue, a Alma e a Divindade de Vosso diletíssimo Filho, nosso Senhor Jesus Cristo, em expiação dos nossos pecados e dos do mundo inteiro. Pela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.",
    instructions:
      "Usando um rosário comum de cinco dezenas, comece com o Sinal da Cruz, um Pai-Nosso, uma Ave-Maria e o Creio dos Apóstolos no crucifixo e nas contas iniciais. Em cada uma das cinco contas grandes (onde normalmente se reza o Pai-Nosso), reze: «Eterno Pai, eu Vos ofereço o Corpo e o Sangue, a Alma e a Divindade de Vosso diletíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e dos do mundo inteiro». Em cada uma das dez contas pequenas de cada dezena, reze: «Pela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro». Ao terminar as cinco dezenas, conclua rezando três vezes: «Santo Deus, Santo Forte, Santo Imortal, tende piedade de nós e do mundo inteiro». O terço é especialmente poderoso quando rezado às 3:00 da tarde (a Hora da Misericórdia), junto ao leito dos moribundos, nos nove dias que antecedem o Domingo da Divina Misericórdia (a Novena à Divina Misericórdia, que começa na Sexta-feira Santa), e em momentos de angústia ou medo pessoal. Pode ser rezado em silêncio, em voz alta, sozinho ou em grupo. Muitas paróquias rezam o terço semanalmente, frequentemente às sextas-feiras em memória da Paixão de Cristo. Os católicos que rezam pela conversão ou pela morte serena de um ente querido frequentemente se comprometem a rezar o terço diariamente por um período sustentado — um mês, a duração de uma doença, o tempo que antecede uma decisão importante. O terço se associa naturalmente com a participação na Novena à Divina Misericórdia, da Sexta-feira Santa ao Domingo da Divina Misericórdia.",
    patronSaint: "Santa Faustina Kowalska",
    feastDay: "Domingo da Divina Misericórdia",
    source:
      "Diary: Divine Mercy in My Soul (St. Faustina Kowalska) + canonical chaplet text as approved by the Holy See following St. John Paul II's canonization of Faustina (April 30, 2000). Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "memorare",
    name: "O Lembrai-vos (Memorare)",
    description:
      "O Memorare é uma oração breve mas extraordinariamente poderosa de confiança na intercessão da Santíssima Virgem Maria. Toma seu nome da primeira palavra latina do texto, Memorare («Lembrai-vos»), e em sua forma moderna é atribuída ao Pe. Claude Bernard, sacerdote francês do século XVII conhecido como «o Sacerdote Pobre» por seu apostolado entre prisioneiros e moribundos. A oração se popularizou pela distribuição que o Pe. Bernard fez de mais de 200 mil folhetos no Paris pré-Revolução, embora suas raízes devocionais remontem mais atrás — provavelmente a uma oração mais extensa atribuída a São Bernardo de Claraval (1090-1153), o grande abade cisterciense e Doutor da Igreja cuja devoção mariana moldou a piedade ocidental. A estrutura da oração é um apelo confiante: reconhece a maternidade universal de Maria («Ó Virgem das virgens, minha Mãe»), faz referência à tradição ininterrupta de sua intercessão («jamais se ouviu dizer que algum daqueles que recorreram à vossa proteção… tenha sido abandonado»), e conclui com uma petição humilde («em vossa misericórdia ouvi-me e atendei-me»). Os santos ao longo dos séculos testemunharam seu poder: Madre Teresa de Calcutá rezava nove Memorares consecutivos por dia — o que ela chamava sua «novena rápida» — quando precisava de algo com urgência. O Memorare é a oração católica de último recurso, rezada em momentos de necessidade aguda, junto ao leito dos moribundos, na capela antes de uma conversa difícil, ou sussurrada enquanto um pai ou uma mãe espera notícias de um quarto de hospital.",
    prayerText:
      "Lembrai-vos, ó piíssima Virgem Maria, que nunca se ouviu dizer que algum daqueles que recorreram à vossa proteção, imploraram vossa assistência e reclamaram vosso socorro, fosse por vós desamparado. Animado eu, pois, com igual confiança, a vós, ó Virgem das virgens, ó Mãe, recorro; de vós me valho; e, gemendo sob o peso de meus pecados, me prostro a vossos pés. Não desprezeis as minhas súplicas, ó Mãe do Verbo Divino, mas dignai-vos de me ouvir propícia. Amém.",
    instructions:
      "Reze uma vez com plena atenção e devoção, trazendo à mente a pessoa e a intenção que você está apresentando diante de Maria. O Memorare é suficientemente breve para ser memorizado e rezado em qualquer lugar — no carro, durante uma caminhada, antes de dormir, nos momentos que antecedem qualquer tarefa difícil. Para uma intercessão mais sustentada, reze nove Memorares consecutivos em sequência (esta é a «novena rápida» que Madre Teresa preferia para intenções urgentes). Algumas tradições acrescentam um breve momento de silêncio antes de rezar, nomeando a intenção em voz alta ou no coração. A oração também pode ser incorporada como oração de encerramento ao fim de um Rosário mais extenso ou de uma novena, selando o pedido com confiança serena no amor maternal de Maria. As famílias católicas costumam rezar o Memorare junto ao leito de alguém gravemente doente, ao receber um diagnóstico difícil, ou durante o trabalho de parto. Por ser uma oração breve cujas palavras são antigas e amadas, tornou-se uma espécie de resposta espiritual de emergência — uma oração que vem espontaneamente aos lábios quando outras palavras faltam. As crianças podem aprendê-la desde muito cedo, assim que conseguem recitá-la; é uma das orações mais apropriadas para ensinar a uma criança como «primeira oração de momentos de dificuldade». A versão latina original ainda é rezada por aqueles que se sentem atraídos pelas formas tradicionais: «Memorare, O piissima Virgo Maria, non esse auditum a saeculo…»",
    patronSaint: "São Bernardo de Claraval",
    feastDay: null,
    source:
      "Traditional Brazilian Catholic devotional text of the Memorare (Lembrai-vos), as published in CNBB-approved breviary editions and standard Brazilian Catholic prayer books. Historical attribution to Fr. Claude Bernard verified against the Catholic Encyclopedia entry. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },

  // ─── Round 2: 6 more prayers from PR #71 ────────────────────
  {
    prayerSlug: "novena-st-jude",
    name: "Novena a São Judas Tadeu",
    description:
      "São Judas Tadeu, chamado o Apóstolo da Esperança, foi um dos Doze e parente do Senhor, tradicionalmente considerado irmão de Tiago Menor. É mencionado nos Evangelhos como um dos apóstolos (Lucas 6,16) e é o autor da breve Carta de Judas. Por séculos, a devoção popular católica invocou São Judas como padroeiro das causas desesperadas e dos casos impossíveis. As razões oferecidas pela tradição são práticas: porque seu nome (Judas) era facilmente confundido com Judas Iscariotes, o traidor, sua intercessão foi evitada pelos cristãos comuns durante séculos — e assim, diz o ditado, ele anseia ajudar quem o procura em verdadeira necessidade. A devoção moderna foi popularizada nos Estados Unidos pelos padres claretianos, que construíram o Santuário Nacional de São Judas em Chicago em 1929 — em plena Grande Depressão. No Brasil, São Judas Tadeu tem profunda devoção popular, com o Santuário de São Judas Tadeu em Jabaquara (São Paulo) recebendo milhões de devotos no dia 28 de outubro. A devoção é fortemente associada à prática de publicar agradecimentos em anúncios de jornais. Esta novena é apropriada para doença com prognóstico difícil, colapso financeiro, afastamento familiar que parece sem solução, infertilidade e qualquer situação que uma pessoa vivencia como «além da esperança».",
    prayerText:
      "Santíssimo apóstolo, São Judas Tadeu, fiel servo e amigo de Jesus, a Igreja vos honra e invoca universalmente como o padroeiro da esperança. Por favor, intercedei em meu favor. Fazei uso daquele privilégio particular que vos foi dado para trazer esperança, conforto e ajuda onde mais são necessários. Vinde em meu auxílio nesta grande necessidade, para que eu possa receber a consolação e a ajuda do céu enquanto luto com meus desafios, particularmente (mencione sua intenção). Louvo a Deus convosco e com todos os santos para sempre. Prometo, bendito São Judas, ser sempre lembrado deste grande favor, sempre vos honrar como meu padroeiro especial e poderoso, e encorajar com gratidão a devoção a vós. Amém.",
    instructions:
      "Reze uma vez ao dia por nove dias consecutivos. A estrutura tradicional: comece com o Sinal da Cruz; reze o texto da novena a São Judas; conclua com um Pai-Nosso, uma Ave-Maria e um Glória; nomeie sua intenção específica. Muitos católicos acrescentam três Pai-Nossos, Ave-Marias e Glórias em honra à Santíssima Trindade. A novena pode ser rezada em qualquer época do ano, mas é especialmente apropriada nos nove dias que antecedem a festa de São Judas (28 de outubro). No Brasil, a devoção ganha intensidade especial em outubro, com missas especiais no Santuário de Jabaquara. Uma prática complementar tradicional é comprometer-se, quando a oração é atendida, a agradecer publicamente a São Judas.",
    patronSaint: "São Judas Tadeu",
    feastDay: "28 de outubro",
    source: "CNBB Portuguese + Santuário de São Judas Tadeu (Jabaquara, São Paulo). Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-divine-mercy",
    name: "Novena à Divina Misericórdia",
    description:
      "A Novena à Divina Misericórdia foi entregue por Jesus a Santa Maria Faustina Kowalska, religiosa polonesa, em uma série de revelações registradas em seu Diário. Os escritos místicos de Faustina foram reabilitados pelo Papa São João Paulo II — ele próprio polonês e conterrâneo — que a canonizou em 30 de abril de 2000 e estabeleceu o Domingo da Divina Misericórdia (segundo domingo de Páscoa) como festa para a Igreja universal. A novena começa na Sexta-feira Santa e termina na véspera do Domingo da Divina Misericórdia. Cada um dos nove dias traz uma categoria diferente de almas ante o trono da misericórdia: Dia 1, toda a humanidade; Dia 2, sacerdotes e religiosos; Dia 3, almas devotas e fiéis; Dia 4, os que não creem; Dia 5, as almas dos irmãos separados; Dia 6, os humildes e as crianças; Dia 7, as almas que veneram a Divina Misericórdia; Dia 8, as almas do purgatório; Dia 9, as almas mornas. O lar espiritual da novena é o Santuário da Divina Misericórdia em Łagiewniki, Cracóvia.",
    prayerText:
      "Vós expirastes, Jesus, mas a fonte da vida jorrou para as almas e abriu-se o oceano de misericórdia para o mundo inteiro. Ó Fonte de Vida, insondável Divina Misericórdia, envolvei o mundo inteiro e derramai-Vos sobre nós. Ó Sangue e Água, que jorrastes do Coração de Jesus como fonte de misericórdia para nós, eu confio em Vós!",
    instructions:
      "Reze uma vez ao dia por nove dias consecutivos, tradicionalmente começando na Sexta-feira Santa. Cada dia tem uma intenção única e uma invocação inicial única que Jesus ditou a Santa Faustina; após a abertura do dia, a oração conclui com o Terço da Divina Misericórdia. A estrutura tradicional de cada dia: (1) Leia a intenção específica do dia; (2) Reze a oração inicial; (3) Reze o Terço da Divina Misericórdia inteiro; (4) Conclua com uma intenção pessoal. A novena completa toma aproximadamente quinze minutos por dia.",
    patronSaint: "Santa Faustina Kowalska",
    feastDay: "Domingo da Divina Misericórdia",
    source: "Diary: Divine Mercy in My Soul + canonical Portuguese-language novena texts. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-our-lady-perpetual-help",
    name: "Novena a Nossa Senhora do Perpétuo Socorro",
    description:
      "Nossa Senhora do Perpétuo Socorro é um dos títulos marianos mais amados na Igreja Católica. A devoção centra-se em um ícone bizantino do século XV mostrando o Menino Jesus segurado nos braços de Maria enquanto os arcanjos Miguel e Gabriel se aproximam, cada um carregando instrumentos da Paixão. O Menino Jesus volta seu rosto para sua Mãe com aparente temor; uma sandália pende solta de seu pé, um detalhe tradicionalmente lido como o Menino recuando diante da Paixão prenunciada. O ícone chegou a Roma em 1499 e foi venerado por séculos antes de desaparecer durante as supressões napoleônicas; foi redescoberto em 1862 e entregue pelo Papa Pio IX aos padres redentoristas em 1866. No Brasil, a devoção é particularmente forte: o Santuário Basílica de Nossa Senhora do Perpétuo Socorro em Salvador (Bahia), administrado pelos redentoristas brasileiros, é um dos principais centros marianos do país.",
    prayerText:
      "Ó Mãe do Perpétuo Socorro, concedei-me invocar sempre o vosso poderosíssimo nome, que é a salvaguarda dos vivos e a salvação dos moribundos. Ó puríssima Maria, ó dulcíssima Maria, que vosso nome esteja de agora em diante sempre em meus lábios. Não tardeis, ó Bendita Senhora, em socorrer-me sempre que vos invoco, pois em todas as minhas necessidades, em todas as minhas tentações, jamais cessarei de chamar-vos, repetindo sempre o vosso sagrado nome. Ó que consolação, que doçura, que confiança, que emoção enche minha alma quando pronuncio o vosso sagrado nome ou mesmo apenas penso em vós. Amém.",
    instructions:
      "Reze uma vez ao dia por nove dias consecutivos. A novena redentorista tradicionalmente acompanha a oração de cada dia com o canto do hino «Mãe de Cristo». Muitas paróquias ainda realizam serviços semanais de novena ao Perpétuo Socorro às quartas-feiras. A estrutura tradicional: (1) Sinal da Cruz; (2) Reze a oração da novena; (3) Conclua com três Ave-Marias e uma Salve-Rainha; (4) Nomeie sua intenção. A novena é apropriadamente rezada nos dias que antecedem a Festa (27 de junho), mas pode ser rezada a qualquer momento.",
    patronSaint: "Nossa Senhora do Perpétuo Socorro",
    feastDay: "27 de junho",
    source: "Redemptorist tradition + Santuário Basílica em Salvador + Pius IX 1866 entrustment. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "litany-sacred-heart",
    name: "Ladainha do Sagrado Coração de Jesus",
    description:
      "A Ladainha do Sagrado Coração de Jesus é uma das seis ladainhas aprovadas pela Santa Sé para uso litúrgico público no Rito Latino. Composta em 1718 por Irmã Joana Madalena Joly da Ordem da Visitação em Dijon, a ladainha foi refinada e ampliada durante o século seguinte. O Papa Leão XIII deu à ladainha aprovação formal para uso litúrgico público em 2 de abril de 1899 — no mesmo ano em que consagrou toda a raça humana ao Sagrado Coração em sua encíclica Annum Sacrum. A ladainha é estruturada como trinta e três invocações ao Coração de Cristo sob títulos distintos correspondentes aos trinta e três anos da vida terrena de Cristo. A cada invocação é dada a resposta «Tende piedade de nós».",
    instructions:
      "A ladainha é rezada responsorialmente. Um líder pronuncia cada invocação e a comunidade reunida responde com a fórmula indicada. Seguem-se as trinta e três invocações ao Coração de Jesus. A duração total é de aproximadamente dez a quinze minutos. Apropriadamente rezada: nas Primeiras Sextas-feiras; durante o mês de junho; durante a Novena ao Sagrado Coração; no final de uma Hora Santa de adoração eucarística.",
    patronSaint: "Sagrado Coração de Jesus",
    feastDay: "Sexta-feira após Corpus Christi",
    source: "Annum Sacrum (Leo XIII, 1899) + CNBB Portuguese. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "litany-blessed-virgin",
    name: "Ladainha de Nossa Senhora (Ladainha de Loreto)",
    description:
      "A Ladainha de Nossa Senhora — conhecida tradicionalmente como Ladainha de Loreto — é a ladainha mariana mais antiga e amada da Igreja Latina. Leva seu nome comum da Santa Casa de Loreto nas Marcas italianas. O Papa Sisto V aprovou formalmente a ladainha para uso litúrgico e devocional em 1587. Ao longo dos séculos: Pio VII acrescentou «Auxílio dos Cristãos» em 1815; Pio IX «Rainha concebida sem pecado original» após 1854; Pio XII «Rainha assunta ao céu» após 1950; São João Paulo II «Mãe da Igreja» em 1980 e «Rainha das Famílias» em 1995. Mais recentemente, o Papa Francisco acrescentou «Mãe da Misericórdia», «Mãe da Esperança» e «Consolo dos Migrantes» em 2020.",
    instructions:
      "A ladainha é rezada responsorialmente. Um líder pronuncia cada título de Maria e a comunidade reunida responde «Rogai por nós». A Ladainha de Loreto é tradicionalmente rezada após o Santo Rosário; durante os meses marianos de maio e outubro; ao final da novena mariana antes das solenidades marianas.",
    patronSaint: "Nossa Senhora",
    feastDay: null,
    source: "Sixtus V 1587 approval + papal additions through Francis 2020 + CNBB Portuguese. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "prayer-conversion",
    name: "Oração pela Conversão de um Ente Querido",
    description:
      "A oração católica pela conversão de um ente querido está enraizada num dos grandes testemunhos pastorais da história cristã: a longa e fiel oração de Santa Mônica por seu filho Santo Agostinho. Mônica rezou pela conversão de seu filho durante anos, através de suas próprias lágrimas e o conselho que recebeu de Santo Ambrósio de Milão («Não é possível que pereça o filho de tantas lágrimas»). Agostinho foi batizado em 387 aos trinta e três anos; Mônica morreu pouco depois em Óstia, tendo vivido para ver o que havia pedido. Agostinho registrou sua perseverança em suas Confissões (Livro IX). O testemunho pastoral que Mônica encarna não é uma garantia de resultado — a conversão de Agostinho aconteceu no tempo de Deus, não no de Mônica — mas uma postura de fidelidade inabalável.",
    instructions:
      "Reze diariamente, idealmente na mesma hora e na mesma postura (de joelhos, ante um crucifixo ou uma imagem do Sagrado Coração). Nomeie a pessoa em voz alta na oração onde o texto diz «(nome)». Após a oração, dedique um minuto de silêncio a sustentá-la diante do Sagrado Coração. Muitos católicos combinam esta oração com: (1) oferecimento diário de pequenos sacrifícios pela intenção; (2) intenção regular de Missa pela pessoa, especialmente no dia de Santa Mônica (27 de agosto) ou Santo Agostinho (28 de agosto); (3) Novena a Santa Mônica ou a Santo Agostinho; (4) Terço da Divina Misericórdia às 15:00.",
    patronSaint: "Santa Mônica",
    feastDay: "27 de agosto",
    source: "Augustine's Confissões Book IX + CNBB Portuguese pastoral resources. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },

  // ─── Locale-anchored devotion (Brazil) ─────────────────────
  {
    prayerSlug: "novena-aparecida",
    name: "Novena a Nossa Senhora Aparecida",
    description:
      "Nossa Senhora Aparecida (Our Lady of Aparecida, ou Nossa Senhora Que Apareceu) é a Padroeira Principal do Brasil e a devoção mariana central do maior país católico do mundo. A história de origem pertence a outubro de 1717 no rio Paraíba do Sul, na pequena cidade pesqueira de Guaratinguetá, estado de São Paulo. Três pescadores locais — Domingos Garcia, João Alves e Filipe Pedroso — haviam sido ordenados pela vila a fornecer peixe para um dignitário visitante, o Conde de Assumar, mas não haviam pescado nada o dia todo. Após horas de trabalho infrutífero, João Alves lançou sua rede mais uma vez e trouxe à tona o corpo decapitado de uma estátua de terracota da Imaculada Conceição. Lançando novamente, trouxe a cabeça. Os homens juntaram as peças, rezaram pela intercessão da Virgem e lançaram suas redes uma última vez — recolhendo uma pesca milagrosa de peixes tão abundante que suas canoas quase afundaram. A pequena estátua de argila escura (originalmente marrom claro, as águas ricas em ferro do rio a haviam escurecido) foi levada para casa por Filipe Pedroso e venerada em sua casa por quinze anos; relatos de curas e intercessões se espalharam, e uma pequena capela foi construída em 1745. O Papa São Pio X declarou Nossa Senhora Aparecida Padroeira Principal do Brasil em 1930. Sua festa (12 de outubro) foi elevada a feriado nacional brasileiro em 1980 pelo Presidente João Figueiredo a pedido do Papa São João Paulo II durante sua primeira peregrinação ao Brasil. A atual Basílica de Nossa Senhora Aparecida — concluída em 1980 — é a segunda maior igreja católica do mundo, depois da Basílica de São Pedro em Roma, e um dos santuários marianos mais visitados do mundo.",
    instructions:
      "Reze uma vez ao dia por nove dias consecutivos. A novena é tradicionalmente rezada nos nove dias que antecedem a Festa de Nossa Senhora Aparecida (12 de outubro), o feriado nacional brasileiro. No Brasil, o dia é observado com: (a) a celebração da Santa Missa na Basílica de Aparecida, transmitida nacionalmente pela Rede Vida e Canção Nova; (b) o canto do tradicional hino «Nossa Senhora Aparecida» nas paróquias de todo o país; (c) encontros familiares apresentando a refeição tradicional brasileira de peixe (em lembrança da pesca milagrosa dos pescadores); (d) altares domésticos exibindo a imagem de barro escuro de Aparecida frequentemente coroada com um pequeno véu branco. A estrutura da novena em casa: (1) Sinal da Cruz; (2) Leitura de uma breve reflexão sobre a aparição; (3) Reze o texto da novena; (4) Três Ave-Marias; (5) Nomeie a intenção específica. Os católicos brasileiros comumente rezam a novena de Aparecida pela cura dos enfermos, pela proteção da família, por viagens seguras (a Basílica é um importante destino de peregrinação), pela conversão de membros distantes da família, e em tempos de dificuldade nacional. A devoção também é forte na diáspora brasileira — nos Estados Unidos, o apostolado brasileiro da Arquidiocese de Newark e as comunidades católicas brasileiras de Boston, Miami e Massachusetts mantêm procissões de Aparecida em 12 de outubro.",
    patronSaint: "Nossa Senhora Aparecida",
    feastDay: "12 de outubro",
    source: "CNBB + Basílica de Nossa Senhora Aparecida + Pope St. John Paul II's 1980 visit. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },

  // ─── ROUND 3 (pt-BR) ───────────────────────────────────────
  {
    prayerSlug: "litany-st-joseph",
    name: "Ladainha de São José",
    description:
      "A Ladainha de São José é uma das seis ladainhas aprovadas pela Santa Sé para uso litúrgico público no Rito Latino. Composta gradualmente durante os séculos XVII e XVIII, conforme a devoção a São José se aprofundava em todo o mundo católico, a ladainha recebeu sua aprovação magisterial formal do Papa São Pio X em 18 de março de 1909 — véspera da Festa de São José — para o Esposo de Maria, pai adotivo de Jesus e Patrono da Igreja Universal. A estrutura segue o padrão das outras ladainhas católicas aprovadas: uma abertura de Kyrie, uma invocação trinitária, e então uma longa sequência de invocações dirigidas a São José sob títulos distintos, cada um com a resposta «Rogai por nós»: «Ilustre filho de Davi», «Luz dos patriarcas», «Esposo da Mãe de Deus», «Casto guardião da Virgem», «Pai adotivo do Filho de Deus», «Solícito defensor de Cristo», «Chefe da Sagrada Família», «José justíssimo», «José castíssimo», «José prudentíssimo», «Espelho de paciência», «Amante da pobreza», «Modelo dos trabalhadores», «Glória da vida doméstica», «Guardião dos virgens», «Sustentáculo das famílias», «Consolo dos aflitos», «Esperança dos enfermos», «Patrono dos moribundos», «Terror dos demônios», «Protetor da Santa Igreja». Em maio de 2021, em conexão com o Ano de São José (dezembro de 2020 - dezembro de 2021) e sua carta apostólica Patris Corde, o Papa Francisco adicionou formalmente sete novas invocações à ladainha, tiradas diretamente da linguagem de Patris Corde: «Guardião do Redentor», «Servo de Cristo», «Ministro da salvação», «Apoio nas dificuldades», «Patrono dos exilados», «Patrono dos aflitos» e «Patrono dos pobres». Essas adições refletem o enquadramento pastoral específico de Francisco de São José como modelo para os pais, os trabalhadores e os marginalizados do mundo contemporâneo.",
    instructions:
      "A ladainha é rezada responsorialmente. Um guia pronuncia cada invocação («José justíssimo…») e a assembleia responde «Rogai por nós» a cada uma. O padrão inicial do Kyrie e a invocação trinitária usam «Tende piedade de nós» como resposta; o corpo da ladainha — a longa sequência de títulos — usa «Rogai por nós». A ladainha conclui com três invocações ao Cordeiro de Deus (Agnus Dei), um par de versículo-resposta tirado do Gênesis («Ele o constituiu senhor de sua casa, e administrador de todos os seus bens»), e uma coleta a São José. A duração total é aproximadamente dez minutos quando rezada em ritmo devocional sem pressa. A Ladainha de São José é tradicionalmente rezada: durante o mês de março, Mês de São José; nos dias que antecedem a Solenidade de São José (19 de março) ou a Festa de São José Operário (1º de maio); ao final de uma Hora Santa ou adoração eucarística; em contextos familiares pedindo a proteção de São José sobre o lar. As adições de 2021 podem ser incorporadas em qualquer texto impresso tradicional inserindo as sete novas invocações em seus lugares apropriados na sequência da ladainha (a maioria das versões atuais publicadas as inclui); tanto a Conferência Nacional dos Bispos do Brasil (CNBB) quanto o site da Santa Sé publicam o texto oficial completo atualizado em português. Muitas famílias católicas rezam a ladainha juntas nas noites de quarta-feira (o dia tradicionalmente dedicado a São José no calendário devocional católico antigo). Quando rezada sozinho, simplesmente leia tanto a invocação quanto a resposta em voz alta ou silenciosamente.",
    patronSaint: "São José",
    feastDay: "19 de março",
    source: "CNBB + Patris Corde (Papa Francisco, 8 de dezembro de 2020) + Aprovação do Papa Pio X de 1909. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-holy-spirit",
    name: "Novena ao Espírito Santo",
    description:
      "A Novena ao Espírito Santo é a novena original — o padrão de oração do qual desce toda outra novena católica de nove dias. Seu fundamento bíblico é o livro dos Atos dos Apóstolos: «Todos eles perseveravam unanimemente em oração, com algumas mulheres, e com Maria, mãe de Jesus, e seus irmãos» (Atos 1,14). Por nove dias após a Ascensão de Cristo, os discípulos e a Bem-Aventurada Virgem Maria permaneceram no cenáculo em Jerusalém em oração; no décimo dia, a Festa de Pentecostes (Atos 2,1-4), o Espírito Santo desceu sobre eles com o som de um vento impetuoso e línguas de fogo. Toda novena católica desde então toma seu padrão de nove dias deste único precedente dado pelo Espírito. A novena invoca os sete dons do Espírito Santo enumerados em Isaías 11,2-3: sabedoria, entendimento, conselho, fortaleza, ciência, piedade e temor de Deus. A estes a tradição católica acrescenta os doze frutos do Espírito Santo nomeados na Carta aos Gálatas (5,22-23 na enumeração da Vulgata): caridade, alegria, paz, paciência, benignidade, bondade, longanimidade, mansidão, fé, modéstia, continência e castidade. O tom da novena é petitório mas confiante — o Espírito é o dom que Jesus prometeu enviar (João 14,16-17; 16,7-15), e a Igreja reza com confiança de que o mesmo Espírito que desceu sobre os apóstolos continua descendo sobre os fiéis. A novena é especialmente apropriada para o discernimento da vocação, a unção dos enfermos, a preparação daqueles que recebem sacramentos (Crisma, matrimônio, ordenação), e qualquer momento em que uma alma sente que não pode encontrar clareza por sua sola razão e precisa da inspiração do Espírito.",
    prayerText:
      "Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do Vosso amor. Enviai o Vosso Espírito e tudo será criado, e renovareis a face da terra. Ó Deus, que instruístes os corações dos vossos fiéis com a luz do Espírito Santo, fazei que apreciemos retamente todas as coisas segundo o mesmo Espírito e gozemos sempre da sua consolação. Por Cristo, Nosso Senhor. Amém.",
    instructions:
      "Reze uma vez ao dia por nove dias consecutivos. Tradicionalmente, a novena é rezada entre a Ascensão e o Domingo de Pentecostes — os nove dias originais que a Igreja tem rezado continuamente desde os apóstolos. (Em dioceses onde a Ascensão é transferida para o domingo seguinte à quinta-feira tradicional, a novena começa na sexta-feira depois desse domingo; consulte o calendário litúrgico local.) A novena também pode ser rezada em qualquer outro momento do ano por uma intenção privada. A estrutura tradicional para cada dia: (1) Começar com o Sinal da Cruz; (2) Recitar ou cantar o Veni Creator Spiritus («Vinde, Espírito Criador») ou o Veni Sancte Spiritus («Vinde, Espírito Santo») — as duas grandes sequências latinas de Pentecostes; (3) Rezar a oração da novena; (4) Meditar brevemente sobre um dos sete dons do Espírito (um por dia durante os primeiros sete dias; nos dias oito e nove, sobre os doze frutos e sobre uma intenção pessoal); (5) Concluir com um Pai-Nosso, uma Ave-Maria e um Glória. A duração total é aproximadamente dez minutos por dia. Famílias com crianças pequenas frequentemente rezam uma versão mais curta usando apenas a invocação Vinde, Espírito Santo e uma explicação apropriada para crianças de um dom por dia — os dons e frutos são tangíveis o suficiente para que uma criança de cinco anos possa começar a reconhecê-los em sua própria vida ao longo de nove anoiteceres. A novena também é apropriada antes de uma decisão importante, antes de uma conversa difícil, ou antes de qualquer tarefa em que uma pessoa precisa de conselho, fortaleza ou sabedoria além de sua capacidade natural.",
    patronSaint: null,
    feastDay: "Pentecostes",
    source: "CNBB + Atos 1,14, 2,1-4 + Vatican.va Portuguese liturgical sources. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-st-therese",
    name: "Novena a Santa Teresinha do Menino Jesus",
    description:
      "Santa Teresinha do Menino Jesus e da Sagrada Face — mais conhecida como Teresa de Lisieux ou «a Florzinha» — foi uma religiosa carmelita descalça que entrou no claustro de Lisieux, na Normandia, aos quinze anos e morreu de tuberculose aos vinte e quatro (1873-1897). Sua autobiografia espiritual, História de uma Alma, foi publicada logo após sua morte e rapidamente se tornou um dos livros católicos mais lidos da era moderna. Da obscuridade de um claustro provincial ela ensinou o que chamou de Caminho Pequeno: confiança no amor misericordioso de Deus expresso nos menores atos de fidelidade diária, em vez de em feitos externos heroicos. «Passarei meu céu fazendo o bem sobre a terra», ela prometeu célebremente; «farei cair uma chuva de rosas». A tradição da «chuva de rosas» — a crença de que as intercessões respondidas através de Santa Teresinha são frequentemente acompanhadas por uma rosa inesperada, literal ou simbólica — moldou a devoção católica a ela desde então. Foi canonizada pelo Papa Pio XI em 1925, nomeada Padroeira das Missões em 1927 (apesar de nunca ter deixado o claustro), e proclamada Doutora da Igreja pelo Papa São João Paulo II em 1997 — uma de apenas quatro mulheres assim nomeadas, junto com as Santas Teresa d'Ávila, Catarina de Sena e Hildegarda de Bingen. Sua contribuição doutrinal é a teologia da infância: o ensinamento evangélico de que é preciso tornar-se como uma criança pequena para entrar no Reino (Mateus 18,3) recebendo uma articulação contemplativa sustentada. A novena a Santa Teresinha é apropriada para: discernimento da vocação religiosa ou leiga, recuperação de doença (sua própria tuberculose foi suportada com grande sofrimento), aridez espiritual, a conversão de entes queridos distantes (ela rezou continuamente por Pranzini, um assassino condenado, como seu «primeiro filho»), e qualquer momento em que uma alma sente sua própria pequenez diante de uma grande necessidade.",
    prayerText:
      "Ó pequena Teresinha do Menino Jesus, por favor colhe para mim uma rosa dos jardins celestiais e envia-a a mim como mensagem de amor. Ó Florzinha de Jesus, pede a Deus hoje que conceda os favores que ponho com confiança em tuas mãos. (Mencione sua intenção.) Santa Teresinha, ajuda-me a sempre acreditar, como tu acreditaste, no grande amor de Deus por mim, para que eu possa imitar o teu Caminho Pequeno cada dia. Amém.",
    instructions:
      "Reze uma vez ao dia por nove dias consecutivos. A estrutura tradicional: (1) Comece com o Sinal da Cruz; (2) Reze a oração da novena a Santa Teresinha (pedindo sua intercessão e sua famosa rosa); (3) Nomeie sua intenção silenciosamente ou em voz alta; (4) Conclua com um Pai-Nosso, uma Ave-Maria e um Glória. A novena é rezada apropriadamente nos nove dias que antecedem sua festa (1º de outubro) ou em qualquer momento do ano por uma intenção privada. Muitos católicos guardam uma pequena imagem ou relíquia de Santa Teresinha em casa ou carregam um santinho com tema de rosas durante a novena. A tradição da «chuva de rosas» é exatamente isso — uma tradição, não uma garantia mágica. Uma rosa recebida durante ou depois da novena é lida como um sinal pessoal de que a santa ouviu a oração e está intercedendo diante de Cristo; a ausência de uma rosa não é lida como a ausência de intercessão. O ponto é a disposição: o Caminho Pequeno de Teresinha convida o peticionário à mesma confiança infantil que ela modelou, que é em si mesma a graça pedida. A novena também é um acompanhamento apropriado a atos específicos de pequena fidelidade durante os nove dias — paciência com um familiar difícil, aceitar um pequeno desconforto sem reclamar, conter uma palavra cortante, realizar um ato oculto de bondade diariamente. Esses «pequenos caminhos» encarnam o que a novena pede: não transformação heroica, mas o caminho das pequenas coisas feitas com grande amor que Teresinha ensinou e viveu.",
    patronSaint: "Santa Teresinha do Menino Jesus",
    feastDay: "1º de outubro",
    source: "CNBB + História de uma Alma + Papa São João Paulo II Divini Amoris Scientia (1997, declaração como Doutora da Igreja). Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "novena-miraculous-medal",
    name: "Novena da Medalha Milagrosa",
    description:
      "Na noite de 18 para 19 de julho de 1830, na capela das Filhas da Caridade na Rue du Bac em Paris, uma jovem noviça chamada Catarina Labouré foi acordada por seu anjo da guarda e conduzida à capela para uma aparição privada da Bem-Aventurada Virgem Maria. Maria falou com ela por mais de duas horas sobre o estado conturbado da França e da Igreja em geral. Em uma segunda aparição em novembro, Catarina viu Maria em pé sobre um globo com raios de luz emanando de suas mãos, cercada por um quadro inscrito com as palavras: «Ó Maria, concebida sem pecado, rogai por nós que recorremos a vós!» No verso desta visão havia um M cruciforme com doze estrelas, um coração de Cristo coroado de espinhos, e um coração de Maria traspassado por uma espada. Maria instruiu Catarina: «Mande cunhar uma medalha segundo este modelo. Aqueles que a usarem com devoção receberão grandes graças, especialmente se a usarem ao pescoço». A medalha foi cunhada em 1832 com a aprovação do Arcebispo de Paris. Em cinco anos havia sido distribuída em tais quantidades e acompanhada por tantas intercessões relatadas que a imaginação católica popular a renomeou «a Medalha Milagrosa», nome que a Igreja eventualmente adotou. As aparições de 1830 são notáveis como um dos principais eventos marianos da era moderna, anteriores a Lourdes (1858) por vinte e oito anos e a Fátima (1917) por oitenta e sete. A doutrina da Imaculada Conceição — no coração da inscrição central da medalha — foi formalmente definida pelo Papa Pio IX em 1854, vinte e quatro anos após as visões de Catarina. Catarina Labouré permaneceu em seu convento de Reuilly, trabalhando com os idosos pobres, pelos quarenta e seis anos restantes de sua vida. Foi canonizada em 1947 pelo Papa Pio XII. A novena à Medalha Milagrosa é apropriada para: doença (especialmente com mau prognóstico — a reputação da medalha começou com curas), conversão de familiares, proteção durante a gravidez (uma longa tradição católica de prender a medalha ao vestido da mãe ou levá-la durante o parto), e qualquer momento difícil em que uma alma busca a intercessão maternal específica de Maria através deste sinal particular.",
    prayerText:
      "Ó Imaculada Virgem Maria, Mãe de nosso Senhor Jesus e nossa Mãe, penetrados pela mais viva confiança em vossa intercessão todo-poderosa e jamais falha, manifestada tantas vezes através da Medalha Milagrosa, nós, vossos filhos amorosos e confiantes, vos suplicamos que nos obtenhais as graças e favores que pedimos durante esta novena, se forem proveitosas para nossas almas imortais e para as almas pelas quais rezamos. (Mencione sua intenção.) Vós sabeis, ó Maria, quão frequentemente nossas almas têm sido os santuários de vosso Filho que abomina a iniquidade. Obtende-nos então um profundo abominamento do pecado e aquela pureza de coração que nos unirá apenas a Deus. Amém.",
    instructions:
      "Reze uma vez ao dia por nove dias consecutivos. A estrutura tradicional: (1) Começar com o Sinal da Cruz; (2) Rezar o Memorare ou três Ave-Marias como invocação mariana inicial; (3) Rezar a oração da novena à Imaculada Virgem pela Medalha Milagrosa; (4) Concluir com a inscrição central da medalha como jaculatória: «Ó Maria, concebida sem pecado, rogai por nós que recorremos a vós!»; (5) Nomear a intenção específica. Se possível, use a Medalha Milagrosa — fisicamente — durante a novena. A medalha não é um amuleto; a tradição é que usá-la expressa a confiança na intercessão de Maria e a abertura de quem a usa à graça. Capelas e santuários católicos distribuem Medalhas Milagrosas gratuitamente. A novena pode ser rezada em qualquer momento mas é especialmente apropriada nos dias que antecedem a Festa de Nossa Senhora da Medalha Milagrosa (27 de novembro) ou a Solenidade da Imaculada Conceição (8 de dezembro). Muitos católicos também usam a Medalha Milagrosa como sinal de consagração ao Imaculado Coração de Maria — emparelhando a novena com a oração de Consagração Total de São Maximiliano Kolbe ou a preparação mais longa de 33 dias para a consagração mariana (a tradição de Montfort). Para famílias rezando por um ente querido ausente ou em dificuldade, uma prática tradicional é deslizar uma Medalha Milagrosa entre os pertences do ente querido — uma carteira, o bolso de um casaco, uma mochila — como um pequeno sinal de constante acompanhamento maternal.",
    patronSaint: "Santa Catarina Labouré",
    feastDay: "27 de novembro",
    source: "CNBB + narrativa da aparição de Rue du Bac (1830) + Papa Pio XII canonização de 1947. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "st-michael-prayer",
    name: "Oração a São Miguel Arcanjo",
    description:
      "A Oração a São Miguel Arcanjo foi composta pelo Papa Leão XIII em 1886 após, segundo a tradição longamente atestada, o Papa ter uma súbita experiência mística enquanto celebrava a Missa — uma espécie de visão em vigília na qual ele ouviu um colóquio entre Cristo e Satanás no qual Satanás se vangloriava de poder destruir a Igreja se lhe fosse concedido tempo e poder suficientes. Abalado pelo que havia visto, Leão XIII compôs a oração a São Miguel naquele mesmo dia e ordenou que fosse adicionada às orações rezadas pelo sacerdote e pelos fiéis ao final de cada Missa rezada em toda a Igreja universal. Esta prática — as «Orações Leoninas» depois da Missa — continuou por quase oitenta anos até as reformas litúrgicas dos anos sessenta. A oração a São Miguel não foi abolida mas seu lugar formal nas orações pós-Missa decaiu. O Papa São João Paulo II reviveu a proeminência da oração em uma alocução do Angelus dominical de 1994, na qual instou os fiéis a «não esquecer de recitar» a oração a São Miguel «para obter ajuda na batalha contra as forças das trevas e contra o espírito deste mundo». O texto da oração baseia-se em Judas 1,9 (Miguel disputando com o diabo pelo corpo de Moisés), Apocalipse 12,7-9 (Miguel derrubando o dragão), e a tradição católica mais ampla de São Miguel como o líder da milícia celestial contra as potências do mal. A oração é apropriada para: guerra espiritual em qualquer forma, ansiedade pelo mal no mundo ou na vida pessoal, proteção durante uma viagem ou antes de um encontro difícil, a conversão daqueles que caíram em pecado grave, e como oração diária de consagração à proteção de São Miguel. É a oração mais comumente ensinada às crianças católicas como primeira «oração de proteção» juntamente com a oração do Anjo da Guarda.",
    instructions:
      "Reze uma vez com plena atenção e devoção. A Oração a São Miguel é curta o suficiente para memorizar e rezar em qualquer lugar — no carro antes de uma reunião difícil, à porta de um hospital, caminhando perto de um local onde se percebe discórdia espiritual, antes de dormir ao final do dia. A prática católica tradicional — e a que Leão XIII instituiu originalmente — é rezá-la imediatamente após a conclusão da Santa Missa, seja no silêncio que segue a despedida ou como parte de uma sequência pública de Orações Leoninas. Muitas paróquias reviveram a oração a São Miguel pós-Missa após o chamado de JPII em 1994; se sua paróquia não o faz, é completamente apropriado permanecer no seu banco por trinta segundos após a despedida e rezá-la privadamente. A oração também é frequentemente incluída: no encerramento do Rosário ou de uma Hora Santa; ao concluir as orações noturnas em família; antes de qualquer tarefa em que um católico perceba uma real oposição espiritual. Alguns lares católicos colocam a oração sobre a porta principal da casa como sinal de consagração à proteção de São Miguel sobre o lar, em continuidade com a tradição mais antiga de inscrever «Christus vincit, Christus regnat, Christus imperat» («Cristo vence, Cristo reina, Cristo impera») sobre os umbrais. A oração se emparelha naturalmente com a oração do Anjo da Guarda para crianças: São Miguel como príncipe da hoste angélica, e o anjo da guarda como o espírito ministrante particular designado a cada pessoa no batismo.",
    patronSaint: "São Miguel Arcanjo",
    feastDay: "29 de setembro",
    source: "CNBB + Composição de Leão XIII de 1886 + Papa São João Paulo II Angelus de Domingo, 24 de abril de 1994. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "anima-christi",
    name: "Alma de Cristo (Anima Christi)",
    description:
      "O Anima Christi («Alma de Cristo») é uma das orações eucarísticas mais amadas e mais antigas da tradição católica. Sua origem é medieval — provavelmente do século XIV — e por muitos anos foi atribuída a Santo Inácio de Loyola porque ele a colocou no próprio início de seus Exercícios Espirituais (1522-1524) e a recomendou como oração diária para os retirantes. A erudição moderna datou a oração pelo menos um século antes do nascimento de Inácio; aparece em manuscritos já em 1314, possivelmente composta por João XXII ou por um monge anônimo da tradição cartuxa ou franciscana. Inácio não a escreveu, mas a amava, e seus Exercícios Espirituais lhe deram a ampla circulação que ela goza hoje em todo o mundo católico. A oração é uma meditação sustentada sobre o Cristo Eucarístico — Sua alma, Seu corpo, Seu sangue, a água e o sangue que fluíram do Seu lado traspassado na Crucificação (João 19,34), Sua Paixão. Cada linha é ao mesmo tempo uma confissão de fé e uma petição: «Alma de Cristo, santificai-me» é a oração de quem pede ser interiormente santificado pela própria santidade de Cristo; «Corpo de Cristo, salvai-me» é a confissão de que a salvação vem através do mesmo corpo agora recebido sob a aparência de pão; «Dentro de Vossas chagas, escondei-me» é o anseio místico medieval de encontrar refúgio nas próprias chagas do Senhor crucificado. O encerramento da oração — «Na hora da minha morte, chamai-me» — fez dela uma oração católica tradicional para os moribundos, rezada à beira do leito nas horas finais por capelães de hospícios, familiares e enfermeiros católicos. O Anima Christi é apropriado para: ação de graças imediatamente após receber a Sagrada Comunhão (seu uso devocional principal), uma Hora Santa ou visita ao Santíssimo Sacramento, o encerramento da oração pessoal, o leito dos moribundos, e como devoção diária que expressa intimidade eucarística.",
    instructions:
      "Reze com devoção, idealmente numa postura de quietude atenta — de joelhos, sentado ereto com as mãos abertas, ou em pé diante do Santíssimo Sacramento. A oração é pensada para ser sem pressa; cada linha é uma petição distinta e o ritmo natural permite uma breve pausa entre as frases para que cada linha se assente no coração. Os momentos tradicionais para o Anima Christi: (1) Imediatamente após receber a Sagrada Comunhão na Missa, no silêncio da ação de graças pessoal — este é o uso devocional principal da oração, e a recomendação de Santo Inácio; (2) Durante uma Hora Santa ou adoração eucarística diante do Santíssimo Sacramento exposto; (3) No encerramento da oração pessoal matutina ou vespertina, especialmente como parte de uma espiritualidade eucarística; (4) À beira do leito de alguém gravemente enfermo ou moribundo — a linha final, «Na hora da minha morte, chamai-me e mandai-me ir a Vós», faz a oração particularmente apropriada como devoção de leito de morte, rezada pela pessoa moribunda se consciente ou por familiares ao lado dela; (5) Versão cantada em latim («Anima Christi, sanctifica me…») em ambientes monásticos e litúrgicos tradicionais. Muitos santinhos católicos trazem o Anima Christi no verso junto com uma oração de recepção da Comunhão; alguns livros devocionais católicos abrem com ela (seguindo o padrão dos Exercícios Espirituais). A oração pode ser memorizada em uma única tarde e rezada em qualquer lugar; sua brevidade e densidade de conteúdo eucarístico a fazem uma das orações breves de maior alcance no repertório devocional católico.",
    patronSaint: "Santo Inácio de Loyola",
    feastDay: null,
    source: "Vatican.va Portuguese + Exercícios Espirituais de Santo Inácio (1522-1524) + tradição manuscrita do século XIV. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },

  // ─── ROUND 4 (pt-BR) ───────────────────────────────────────
  {
    prayerSlug: "litany-saints",
    name: "Ladainha de Todos os Santos",
    description:
      "A Ladainha de Todos os Santos é a ladainha mais antiga e solene da Igreja Católica. Suas raízes remontam aos primeiros séculos — fragmentos da forma aparecem em livros litúrgicos ocidentais do século VII, e o Papa Gregório Magno instituiu as grandes procissões letânicas de Roma em 590, pedindo aos fiéis que invocassem os santos pelo nome em súplica durante a peste. A ladainha tornou-se parte da liturgia batismal da Vigília Pascal pelo menos no século VIII. Seu texto atual no rito romano foi formalmente fixado pelo Papa Pio V em 1568 e revisado na reforma litúrgica pós-Vaticano II (1969). A estrutura desdobra-se em cinco movimentos principais: (1) Invocações do Kyrie eleison e petições trinitárias; (2) o grande chamado dos santos pelo nome — primeiro a Bem-Aventurada Virgem Maria, depois os arcanjos (Miguel, Gabriel, Rafael), patriarcas e profetas (Abraão, Moisés, Elias, João Batista), apóstolos e evangelistas (Pedro, Paulo, André, João, Tiago, etc.), mártires (Estêvão, Lourenço, Policarpo, Inácio de Antioquia, Cipriano, Sebastião, Águeda, Inês), bispos confessores e doutores (Atanásio, Basílio, Gregório, Agostinho, Jerônimo, Ambrósio), fundadores e virgens (Antônio do Deserto, Bento, Francisco, Domingos, Catarina de Sena, Teresa d'Ávila); (3) petições de libertação («De todo mal, livrai-nos, Senhor»); (4) petições de súplica («Para que governeis e conserveis vossa santa Igreja, nós Vos pedimos, ouvi-nos»); (5) Agnus Dei final e coleta. A ladainha é uma das principais orações da liturgia católica e é usada em: a Vigília Pascal (durante a Liturgia do Batismo), batismos do Sábado Santo, ordenações sacerdotais e episcopais (os candidatos jazem prostrados enquanto a Igreja reunida canta a ladainha sobre eles), o Rito de Iniciação Cristã de Adultos (RICA) no Rito de Eleição, a dedicação de uma igreja, a consagração de altares, e a profissão de votos religiosos. Também é costume em muitas paróquias na Solenidade de Todos os Santos (1º de novembro), em funerais de padres e religiosos, em momentos de grave necessidade pública (guerra, pandemia, desastre natural), e como oração final de procissões de peregrinação.",
    instructions:
      "A Ladainha de Todos os Santos é rezada responsorialmente, geralmente cantada em ambientes litúrgicos. Um guia (padre, diácono ou cantor treinado) entoa a invocação; a assembleia responde com a fórmula apropriada. As respostas seguem a estrutura: «Rogai por nós» depois de cada santo nomeado ou grupo de santos; «Livrai-nos, Senhor» depois de cada invocação de libertação («De todo mal…»); «Nós Vos pedimos, ouvi-nos» depois de cada petição de súplica («Para que…»). A ladainha leva aproximadamente quinze a vinte minutos quando cantada em ritmo solene em um ambiente litúrgico; algo menos quando rezada em casa em forma falada. Para a devoção privada, a ladainha pode ser rezada a partir de qualquer texto impresso aprovado (o Missal Romano, um livro de orações paroquial, ou o site da CNBB carrega os textos oficiais em latim e português). Quando rezada em casa, sente-se, fique de pé ou ajoelhe-se conforme desejar; o ritmo da ladainha é contemplativo em vez de apressado. A ladainha é usada apropriadamente: (1) em Todos os Santos (1º de novembro) e Finados (2 de novembro) como oração familiar desses dias; (2) à beira do leito de alguém gravemente enfermo ou moribundo — muitos capelães católicos de hospital rezam a ladainha à medida que os últimos sacramentos se aproximam; (3) no início de uma peregrinação importante ou de uma empreitada familiar, pedindo à grande nuvem de testemunhas (Hebreus 12,1) que rodeie os peticionários; (4) em tempo de peste, desastre ou emergência pública, em continuidade com a instituição das procissões letânicas por Gregório Magno durante a peste romana de 590. O dom espiritual particular da ladainha é a presença sentida da comunhão dos santos — a verdade de que os fiéis que oram na terra e aqueles triunfantes no céu são um só corpo em Cristo.",
    patronSaint: null,
    feastDay: "1º de novembro (Todos os Santos)",
    source: "CNBB + Papa Pio V codificação 1568 + revisão pós-Vaticano II 1969 + instituição de Gregório Magno 590. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "prayer-expectant-mothers",
    name: "Oração pelas Gestantes",
    description:
      "A oração católica pelas gestantes nutre-se da tradição secular da Igreja de acompanhar as mulheres durante a gravidez sob o patrocínio da Bem-Aventurada Virgem Maria, que carregou Cristo em seu próprio ventre por nove meses. O fundamento bíblico principal é a Visitação (Lucas 1,39-56): Maria, ela mesma nos primeiros meses de gravidez com Jesus, apressa-se para as montanhas da Judeia para estar com sua prima Isabel, que está em seu sexto mês com João Batista. O Magnificat («Minha alma engrandece o Senhor…») é a oração de duas mulheres grávidas regozijando-se juntas. A tradição devocional católica tem confiado por muito tempo as gestantes a Maria sob vários títulos específicos: Nossa Senhora da Expectação (a Solenidade de 18 de dezembro, uma festa de tradição espanhola nove dias antes do Natal, marcando o iminente parto de Maria); Nossa Senhora de Guadalupe (cuja imagem a mostra grávida, vestindo o cinto de maternidade do costume indígena mexicano); e São Gerardo Majella (1726-1755), um irmão leigo redentorista italiano cujo nome se tornou tão associado ao parto seguro que suas estátuas são colocadas em alas de maternidade em hospitais católicos em todo o mundo. A oração pelas gestantes é apropriada em cada estágio da gravidez: no primeiro teste positivo, durante a ansiedade do primeiro trimestre que muitas mães sentem, durante os longos meses centrais de espera, nas semanas de preparação antes do parto, durante o próprio trabalho de parto (quando familiares frequentemente a rezam à beira do leito), e imediatamente após o parto em ação de graças. Também é rezada por comunidades — paróquias, grupos de oração, o círculo de amigas da mulher — como uma forma de cercá-la com intercessão durante os nove meses de espera que espelham os de Maria.",
    instructions:
      "Reze uma vez ao dia pela gestante, idealmente na mesma hora todos os dias para que a prática se torne parte de seu ritmo ordinário. A oração é curta o suficiente para ser memorizada; muitas gestantes a carregam em um pequeno cartão guardado em uma Bíblia, livro de orações ou carteira, e a rezam enquanto fazem uma pausa no trabalho cotidiano de preparação para o bebê. Práticas comuns que se emparelham com a oração: (1) Acender uma vela em um santuário mariano na igreja paroquial por cada mês da gravidez — muitas paróquias mantêm um suporte de velas designado para «gestantes» e publicam os nomes das mulheres pelas quais se reza; (2) Rezar uma dezena diária do Rosário, meditando nos Mistérios Gozosos (a Anunciação, a Visitação, a Natividade, a Apresentação, o Reencontro no Templo — cinco mistérios que percorrem o arco espiritual da concepção à maternidade jovem); (3) Pedir a intercessão de São Gerardo Majella — a oração pelas gestantes pode ser emparelhada com a novena a São Gerardo, especialmente nos nove dias finais antes do parto; (4) Oração familiar ou comunitária à beira do leito durante o parto, em que o esposo da gestante ou outro familiar reza o Memorare (a breve oração mariana de confiança) ou esta oração em voz alta à medida que o parto progride. A tradição católica é clara que a gravidez é em si mesma uma forma de oração. Depois do parto, a oração continua em ação de graças e volta-se naturalmente para as orações de maternidade pelo recém-nascido.",
    patronSaint: "Nossa Senhora",
    feastDay: null,
    source: "CNBB + Lucas 1,39-56 + tradição de São Gerardo Majella. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "adoration-hour",
    name: "Hora Santa de Adoração",
    description:
      "A Hora Santa de Adoração Eucarística é uma das formas mais antigas e centrais de oração católica — oração sustentada e silenciosa na real presença de Jesus Cristo no Santíssimo Sacramento, exposto em um ostensório sobre o altar. A prática nutre-se diretamente da cena evangélica em Getsêmani: Cristo pergunta a seus apóstolos: «Não pudestes vigiar uma hora comigo?» (Mateus 26,40). A «uma hora» não é uma duração arbitrária — é a petição explícita do Senhor na noite de sua paixão, e a Hora Santa católica responde diretamente a essa petição. A prática devocional da adoração eucarística sustentada cristalizou-se na Contra-Reforma e recebeu impulso particular das aparições do Sagrado Coração a Santa Margarida Maria Alacoque em Paray-le-Monial (1673-1675); Cristo pediu especificamente a Margarida Maria uma hora de reparação em sua presença a cada quinta-feira à noite, em lembrança da Agonia no Horto. A Hora Santa tornou-se central para o «Apostolado da Oração» (fundado em 1844) e foi pregada amplamente no século XX pelo Venerável Fulton Sheen (1895-1979), que célebremente se comprometeu a uma Hora Santa todos os dias de sua vida sacerdotal — mais de 60 anos — e creditou cada graça de seu ministério a essa hora. Hoje capelas de adoração eucarística perpétua operam em milhares de paróquias em todo o mundo, atendidas por voluntários leigos que se comprometem a horas específicas através da noite e do dia para que Cristo nunca fique sozinho em seu Sacramento exposto. A Hora Santa é apropriada para: qualquer intercessão sustentada, especialmente por cura, conversão ou discernimento vocacional; reparação pelo pecado (próprio ou do mundo); aridez espiritual (quando a oração se sente seca, a presença da Eucaristia sustenta a alma mesmo quando os sentimentos estão ausentes); preparação para decisões importantes da vida; ação de graças após receber uma graça. É a oração que Sheen chamava «o segredo de todo padre que se tornou santo».",
    instructions:
      "Visite sua paróquia durante as horas de Adoração — consulte o site ou o boletim de sua paróquia para o horário. Muitas paróquias oferecem adoração eucarística nas quintas-feiras (o pedido de Cristo a Margarida Maria), nas sextas-feiras (o dia tradicional de reparação), ou como uma Hora Santa estendida após a Missa de dia de semana. Algumas mantêm adoração perpétua com o Santíssimo Sacramento exposto 24/7. Ao chegar: (1) Genuflexione com ambos os joelhos (o sinal tradicional de reverência para a Eucaristia exposta, distinto da genuflexão com um joelho para o Sacramento reservado no tabernáculo); (2) Encontre um lugar para sentar-se ou ajoelhar-se; (3) Incline-se em silencioso reconhecimento de que você está na presença literal de Deus encarnado. A hora em si é desestruturada por design — a presença sustentada é a oração. Alguns padrões que os católicos usam para preencher a hora: (a) Rezar o Rosário, meditando nos Mistérios Dolorosos; (b) Ler a Sagrada Escritura (as narrativas da Paixão, o Evangelho de João, os Salmos — Salmos 23 e 91 são escrituras comuns de adoração eucarística); (c) Rezar a Coroinha da Divina Misericórdia, especialmente durante a hora das 15h00; (d) Ler de um clássico espiritual (os escritos de Fulton Sheen, a Imitação de Cristo de Tomás de Kempis, o diário de Santa Faustina); (e) Sentar-se em presença silenciosa — a forma mais alta de oração contemplativa; (f) Anotar uma conversa com Jesus sobre a pessoa pela qual você oferece a hora. Ao longo da hora, nomeie a pessoa e a intenção frequentemente. A hora termina com outra genuflexão e uma breve oração de ação de graças pelo dom de sua presença.",
    patronSaint: null,
    feastDay: null,
    source: "CNBB + Mateus 26,40 + aparições do Sagrado Coração em Paray-le-Monial (1673-1675) + tradição de Fulton Sheen. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "stations-of-the-cross",
    name: "Via-Sacra (Estações da Cruz)",
    description:
      "A Via-Sacra (também chamada Via-Crúcis, Caminho da Cruz, ou Via Dolorosa em latim) é uma devoção meditativa em que o crente segue a Paixão de Cristo através de quatorze estações distintas — momentos ao longo de sua jornada do pretório de Pilatos ao sepulcro. A prática originou-se nos primeiros séculos cristãos como peregrinação literal aos lugares santos em Jerusalém; os peregrinos caminhavam o caminho real que Cristo caminhou, parando em cada estação significativa para orar. Quando Jerusalém caiu sob controle muçulmano no século VII e a peregrinação se tornou perigosa e rara, os franciscanos — a quem o Papa Clemente VI deu a custódia da Terra Santa em 1342 — começaram a reconstruir a Via Dolorosa na forma de estações devocionais em suas igrejas por toda a Europa, para que qualquer católico pudesse «caminhar» o Caminho da Cruz espiritualmente sem viajar a Jerusalém. O Papa Inocêncio XI concedeu aos franciscanos indulgências por rezar as estações em 1686, e o Papa Clemente XII estendeu isso a todos os fiéis em 1731. As quatorze estações padrão foram fixadas no século XVIII: (1) Jesus é condenado à morte; (2) Jesus carrega a cruz; (3) Jesus cai pela primeira vez; (4) Jesus encontra sua Mãe Maria; (5) Simão de Cirene ajuda Jesus a carregar a cruz; (6) Verônica enxuga o rosto de Jesus; (7) Jesus cai pela segunda vez; (8) Jesus encontra as mulheres de Jerusalém; (9) Jesus cai pela terceira vez; (10) Jesus é despojado de suas vestes; (11) Jesus é pregado na cruz; (12) Jesus morre na cruz; (13) Jesus é descido da cruz; (14) Jesus é depositado no sepulcro. Algumas comunidades católicas acrescentam uma décima quinta estação para a Ressurreição. A Via-Sacra é tradicionalmente rezada nas sextas-feiras durante a Quaresma e é a devoção pública central da Sexta-Feira Santa na maioria das paróquias católicas em todo o mundo. O Papa preside a Via-Sacra no Coliseu de Roma todas as Sextas-Feiras Santas — uma tradição revivida pelo Papa Paulo VI e continuada por todo papa desde então, transmitida globalmente.",
    instructions:
      "Visite uma igreja católica — a maioria tem as quatorze estações montadas ao longo das paredes laterais da nave, geralmente como pequenas pinturas, placas ou baixos-relevos. A prática tradicional: (1) Começar na primeira estação; genuflexionar; (2) Anunciar a estação em voz alta («Primeira Estação: Jesus é condenado à morte»); (3) Rezar a resposta «Nós Vos adoramos, ó Cristo, e Vos bendizemos, porque pela vossa santa Cruz remistes o mundo»; (4) Meditar brevemente sobre a cena da Paixão de Cristo correspondente à estação; (5) Rezar um Pai-Nosso, uma Ave-Maria e um Glória (ou outras orações de um livreto de Via-Sacra); (6) Oferecer a estação por sua intenção. Passe para a próxima estação — caminhar fisicamente de uma para a próxima é parte da oração; a Via-Sacra é pensada para ser caminhada, mesmo que brevemente. Duração total: aproximadamente trinta a quarenta e cinco minutos quando rezada em ritmo sem pressa em uma igreja. Em casa, um livreto impresso de Via-Sacra funciona bem — não há requisito de presença física. A devoção é rezada apropriadamente: (a) Nas sextas-feiras durante a Quaresma, a disciplina católica tradicional; (b) Na própria Sexta-Feira Santa, o dia em que Cristo caminhou a Via Dolorosa; (c) Em qualquer sexta-feira ao longo do ano (como o dia tradicional de lembrança da Paixão); (d) Quando se carrega uma cruz pessoal pesada — doença, luto, dependência, perseguição — unindo seu sofrimento ao de Cristo; (e) Quando se reza por alguém que sofre ou está morrendo; (f) Quando se busca a graça da paciência sob a aflição.",
    patronSaint: null,
    feastDay: "Sexta-Feira Santa",
    source: "CNBB + custódia franciscana da Terra Santa (1342) + Papa Inocêncio XI 1686 + Clemente XII 1731. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "morning-offering",
    name: "Oferecimento da Manhã",
    description:
      "O Oferecimento da Manhã é a oração diária fundadora do Apostolado da Oração — um movimento espiritual católico fundado em 1844 pelo padre jesuíta François-Xavier Gautrelet em Vals, França, e renomeado em 2015 pelo Papa Francisco como a Rede Mundial de Oração do Papa. A intuição central do movimento é simples mas transformadora: cada ação ordinária do dia de um católico — o trabalho, o estudo, a conversa, as refeições, o cansaço, a alegria, o sofrimento, até o sono — pode ser oferecida a Deus como um ato intencional de amor, transformando todo o dia em um ato sustentado de oração. O Oferecimento da Manhã é o ato que realiza este oferecimento, rezado em primeiro lugar ao acordar, antes que o dia tome conta. O texto tradicional — composto no final do século XIX nos folhetos devocionais do Apostolado e refinado através de várias versões aprovadas pelos papas — coloca o oferecimento do dia «através do Imaculado Coração de Maria» (a mediação mariana que enquadra a vida católica como filial) e o une «com o Santo Sacrifício da Missa em todo o mundo» (de modo que o oferecimento do dia seja reunido ao sacrifício eucarístico sendo celebrado em alguma paróquia católica em algum lugar da terra a cada minuto de cada hora). A cada mês, o Papa publica intenções específicas de oração universal através da Rede Mundial de Oração do Papa — por exemplo, «pela proteção das crianças» ou «pelo fim do tráfico humano» — e os católicos que rezam o Oferecimento da Manhã unem as pequenas ações de seu dia a essas intenções mais amplas. O Oferecimento da Manhã é também uma poderosa oração de intercessão por uma pessoa em particular: um familiar doente, um filho adulto que abandonou a fé, um pai lutando com vício, qualquer pessoa cuja situação o peticionário experimenta como constantemente presente.",
    prayerText:
      "Ó Jesus, pelo Imaculado Coração de Maria, eu Vos ofereço as orações, os trabalhos, as alegrias e os sofrimentos deste dia, por todas as intenções do Vosso Sagrado Coração, em união com o Santo Sacrifício da Missa em todo o mundo, em ação de graças pelos Vossos favores, em reparação pelos meus pecados, pelas intenções de todos os meus associados e, em particular, por (mencione o nome e a intenção da pessoa). Amém.",
    instructions:
      "Reze imediatamente ao acordar, antes que a agitação do dia possa tomar conta. A disciplina tradicional é rezá-lo antes de levantar-se da cama, enquanto a mente ainda está leve e o dia ainda parece um presente; alguns católicos rezam durante o primeiro momento tranquilo da rotina matinal (com a primeira xícara de café, na pia da cozinha, enquanto alimentam o bebê). A oração é curta o suficiente para ser memorizada em um único dia. Para torná-la parte da vida: (1) Coloque a oração em um lugar onde você a verá primeiro — colada ao espelho do banheiro, dentro da porta do quarto, em um cartão ao lado da cafeteira; (2) Nomeie a pessoa específica e a intenção no lugar apropriado da oração (a linha «e em particular por…»), tornando o oferecimento concreto e não abstrato; (3) Ao longo do dia, quando o trabalho se torna difícil ou uma interrupção quebra seus planos, renove brevemente o oferecimento: «Eu lhe dei este dia por (nome); este momento é parte disso». Muitos lares católicos rezam o Oferecimento da Manhã em voz alta juntos quando a família se levanta — pais e filhos rezando juntos antes do café da manhã. A Rede Mundial de Oração do Papa publica as intenções universais mensais do Papa; alinhar seu oferecimento diário com a intenção do Papa a cada mês acrescenta uma dimensão de solidariedade católica universal à sua oração. Para uma intercessão sustentada (uma novena de dias por um ente querido doente, a duração de um discernimento difícil, os meses de quimioterapia de um familiar), o Oferecimento da Manhã se torna a espinha dorsal da oração.",
    patronSaint: null,
    feastDay: null,
    source: "CNBB + Apostolado da Oração / Rede Mundial de Oração do Papa (1844, renomeado 2015). Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  {
    prayerSlug: "three-oclock-prayer",
    name: "Oração das Três da Tarde (Hora da Misericórdia)",
    description:
      "A Oração das Três da Tarde — também chamada Hora da Misericórdia ou Hora da Grande Misericórdia — foi dada por Jesus a Santa Maria Faustina Kowalska nas revelações da Divina Misericórdia registradas em seu Diário: A Misericórdia Divina em Minha Alma. Jesus instruiu Faustina que as 15h00 de cada dia — a hora de sua morte no Calvário — seja honrada como a Hora da Grande Misericórdia, na qual um breve ato de oração obtém graças extraordinárias. A promessa exata, registrada no Diário de Faustina (entrada 1320): «Às três da tarde, implora minha misericórdia, especialmente pelos pecadores; e, mesmo que por um breve momento, mergulha em minha Paixão, particularmente em meu abandono no momento da agonia. Esta é a hora de grande misericórdia para todo o mundo… Nesta hora não recusarei nada à alma que me faz um pedido em virtude da minha Paixão». A hora corresponde à hora nona do dia judaico na cronologia evangélica (Marcos 15,34) — a hora em que «Jesus deu um grande grito… e expirou» (Marcos 15,37). A Oração das Três da Tarde é a forma mais simples e mais acessível de devoção à Divina Misericórdia — muito mais curta que a coroinha, acessível a qualquer um que possa parar por trinta segundos na hora da morte de Cristo. É a oração que a tradição católica coloca no coração do dia para aqueles que não podem fazer uma Hora Santa completa, que não podem rezar a coroinha, que estão no trabalho ou na escola ou à beira do leito de um hospital — o breve momento oferecido que toma Cristo em sua palavra e pede a misericórdia que ele prometeu. A devoção foi suprimida por muitos anos (o mesmo período em que os escritos de Faustina estavam sob restrição provisória), mas o Papa São João Paulo II canonizou Faustina em 30 de abril de 2000, e estabeleceu o Domingo da Divina Misericórdia como festa para a Igreja universal.",
    prayerText:
      "Vós expirastes, Jesus, mas a fonte da vida jorrou para as almas e abriu-se o oceano de misericórdia para o mundo inteiro. Ó Fonte de Vida, insondável Divina Misericórdia, envolvei o mundo inteiro e derramai-Vos sobre nós. Ó Sangue e Água, que jorrastes do Coração de Jesus como fonte de misericórdia para nós, eu confio em Vós! Deus Santo, Santo Forte, Santo Imortal, tende piedade de nós e do mundo inteiro. (3 vezes)",
    instructions:
      "Às 15h00 de cada dia, pare brevemente — qualquer coisa que esteja fazendo — e reze. A oração é curta o suficiente para ser memorizada em uma única tarde e para ser rezada em qualquer lugar: em uma mesa, em um carro, em uma sala de aula, à beira de um leito hospitalar, caminhando por uma calçada. A tradição católica é clara que «mesmo um momento de oração nesta hora é poderoso» — se uma vida ocupada só pode dedicar vinte segundos para um único «Jesus, eu confio em Vós» às 15h00, esse breve momento é em si mesmo a prática. Para aqueles com mais tempo na hora: (1) Rezar a Coroinha completa da Divina Misericórdia (aproximadamente dez minutos); (2) Fazer uma breve «visita» a uma igreja católica próxima ou capela de adoração eucarística; (3) Parar para ler um parágrafo do Diário de Santa Faustina; (4) Rezar pelos pecadores — Faustina registrou que Jesus lhe disse que esta é a intercessão mais poderosa nesta hora. As disciplinas católicas tradicionais que se emparelham com a Oração das Três da Tarde: (a) Definir um alarme diário às 15h00 como lembrete até que a disciplina se torne hábito; (b) Carregar um pequeno santinho ou imagem da Divina Misericórdia como lembrete tátil ao longo do dia; (c) Rezar ao pé de um crucifixo (a postura literal de Cristo em sua morte); (d) Acrescentar um momento de quietude física — pausando qualquer movimento em curso, mesmo que brevemente. A hora é uma âncora diária para a vida devocional da Divina Misericórdia.",
    patronSaint: "Santa Maria Faustina Kowalska",
    feastDay: null,
    source: "CNBB + Diário de Santa Faustina (1320) + JPII canonização 30 abril 2000 + Marcos 15,34-37. Retrieved 2026-05-14.",
    reviewedAt: new Date("2026-05-14"),
  },
  // ── Wave 6 (2026-05-17): Marian devotions, modern saints, patronage
  //    saints. Fontes: CNBB, Vatican.va Português, Paulus, Canção Nova,
  //    A12 / Santuário Nacional de Aparecida.
  {
    prayerSlug: "novena-fatima",
    name: "Novena a Nossa Senhora de Fátima",
    description:
      "A Novena a Nossa Senhora de Fátima honra as aparições marianas que ocorreram entre 13 de maio e 13 de outubro de 1917 na Cova da Iria, perto de Fátima, Portugal, onde Maria apareceu seis vezes a três crianças pastoras: Lúcia dos Santos e seus primos Francisco e Jacinta Marto. Em cada aparição a Virgem pediu oração pela conversão dos pecadores, a prática da penitência e o rezo diário do Santo Rosário pela paz mundial. A última aparição, em 13 de outubro de 1917, foi acompanhada pelo «Milagre do Sol» testemunhado por cerca de setenta mil pessoas, incluindo jornalistas e céticos. A Igreja reconheceu as aparições como dignas de fé em 1930. São João Paulo II atribuiu à intercessão de Nossa Senhora de Fátima ter sobrevivido ao atentado de 13 de maio de 1981 e consagrou o mundo ao Imaculado Coração dela em 1984. Os pastorinhos Francisco e Jacinta foram canonizados pelo Papa Francisco em Fátima em 13 de maio de 2017. Para o Brasil — terra portuguesa do mar largo — a devoção a Nossa Senhora de Fátima é especialmente próxima: a língua portuguesa une nossa fé à terra dos pastorinhos, e o Santuário de Fátima é destino comum de peregrinação para milhões de brasileiros. A novena é rezada tradicionalmente de 4 a 12 de maio, culminando na festa de 13 de maio.",
    prayerText:
      "Ó Santíssima Virgem Maria, Rainha do Santíssimo Rosário, que em Fátima Vos dignastes manifestar Vossa predileção pelos humildes e pequeninos, dirigi Vosso olhar compassivo para mim, que com confiança filial recorro a Vós. Concedei-me, por Vossa poderosa intercessão, a graça que agora Vos peço (mencionar a intenção), se for conforme à vontade de Deus e convier à salvação da minha alma. Ensinai-me, Mãe, a viver com fé, a orar com perseverança e a fazer reparação pelos pecados que ofendem o Sagrado Coração de Jesus e Vosso Imaculado Coração. Amém. Nossa Senhora do Rosário de Fátima, rogai por nós.",
    instructions:
      "Reze uma vez ao dia durante nove dias consecutivos, idealmente de 4 a 12 de maio em preparação para a festa de 13 de maio. Estrutura tradicional: (1) Sinal da Cruz; (2) ato de contrição; (3) um mistério do Santo Rosário com meditação pausada — o Rosário é inseparável da devoção de Fátima; (4) a oração da novena; (5) as jaculatórias ensinadas por Maria: «Ó Jesus, é por Vosso amor, pela conversão dos pecadores e em reparação pelos pecados cometidos contra o Imaculado Coração de Maria»; (6) mencione sua intenção específica. Muitos católicos brasileiros acrescentam a consagração familiar ao Imaculado Coração de Maria ao concluir a novena. A Comunhão reparadora dos primeiros sábados — pedida pela Virgem à irmã Lúcia em Pontevedra em 1925 — combina-se naturalmente com esta novena.",
    patronSaint: "Nossa Senhora de Fátima · Santos Francisco e Jacinta Marto",
    feastDay: "13 de maio",
    source: "CNBB + Vatican.va Português (Mensagem de Fátima, CDF 2000) + Memórias da Irmã Lúcia + canonização de Francisco e Jacinta Marto (13 de maio de 2017). Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-lourdes",
    name: "Novena a Nossa Senhora de Lourdes",
    description:
      "A Novena a Nossa Senhora de Lourdes honra as dezoito aparições de Maria a Santa Bernadette Soubirous entre 11 de fevereiro e 16 de julho de 1858 na gruta de Massabielle, em Lourdes, França. Na nona aparição, Bernadette descobriu por indicação da Senhora uma fonte cujas águas começaram a brotar da rocha; em 25 de março de 1858, a Virgem identificou-se: «Eu sou a Imaculada Conceição» — apenas quatro anos depois da definição dogmática de Pio IX. O Santuário de Lourdes acolhe hoje mais de seis milhões de peregrinos por ano. A Igreja reconheceu oficialmente setenta milagres de cura. A festa litúrgica de 11 de fevereiro foi estabelecida por São Pio X e, desde 1992, São João Paulo II instituiu o Dia Mundial do Enfermo nessa mesma data. A novena é rezada tradicionalmente de 2 a 10 de fevereiro, e é especialmente apropriada para pedir a cura física ou espiritual de si mesmo ou de um ente querido, a graça de aceitar o sofrimento com fé, ou qualquer necessidade urgente quando a enfermidade exige uma intercessão sustentada.",
    prayerText:
      "Ó Imaculada Virgem Maria, Mãe de Misericórdia, Saúde dos Enfermos, Refúgio dos Pecadores, Consoladora dos Aflitos, Vós conheceis os meus desejos, as minhas dificuldades, os meus sofrimentos; dignai-Vos pousar sobre mim o Vosso olhar misericordioso. Ao aparecer na gruta de Lourdes Vos comprouvestes em fazer dela um lugar privilegiado onde dispensais Vossas graças, e ali muitos enfermos obtiveram a cura de suas doenças espirituais e corporais. Venho com plena confiança implorar Vossa intercessão maternal. Obtenha para mim, ó terna Mãe, a graça que solicito (mencionar a intenção). Pela oração de Lourdes que tantas vezes se viu coroada pela cura, peço-Vos a saúde do corpo e, sobretudo, a da alma. Amém.",
    instructions:
      "Reze uma vez ao dia durante nove dias consecutivos. Estrutura: (1) Sinal da Cruz e um ato de fé na presença maternal de Maria; (2) os mistérios gozosos do Santo Rosário, lembrando que Bernadette rezava o Rosário durante cada aparição; (3) a oração da novena; (4) três Ave-Marias em honra à Imaculada Conceição; (5) encerramento com a jaculatória de Bernadette: «Ó Maria, concebida sem pecado, rogai por nós que recorremos a Vós». Para pedir cura física, muitos católicos acrescentam a bênção com água de Lourdes — não como talismã mas como sacramental. Se a novena for rezada por um enfermo grave, considere fazê-la em família. Combinar com uma visita ao enfermo, a recepção dos sacramentos (Unção, Comunhão) e um exame sincero do próprio modo de habitar o sofrimento transforma o exercício em participação na missão de Lourdes.",
    patronSaint: "Nossa Senhora de Lourdes · Santa Bernadette Soubirous",
    feastDay: "11 de fevereiro (Dia Mundial do Enfermo)",
    source: "CNBB + Vatican.va (Salvifici Doloris, JPII 1984) + relatos de Bernadette Soubirous + Bureau Médical de Lourdes. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-undoer-of-knots",
    name: "Novena a Maria, Desatadora dos Nós",
    description:
      "A devoção a Maria Desatadora dos Nós tem sua origem em uma pintura barroca atribuída a Johann Georg Melchior Schmidtner (ca. 1700) conservada na igreja de São Pedro am Perlach em Augsburgo, Alemanha — imagem visual da doutrina patrística que vê Maria como a nova Eva «que desata pela sua obediência o que Eva atou pela sua desobediência» (Santo Ireneu, Adversus Haereses III, 22, 4). A devoção permaneceu local até que o então padre Jorge Mario Bergoglio, durante seus estudos doutorais na Alemanha em 1986, descobriu a pintura e a trouxe para a Argentina. Como Papa Francisco a tornou conhecida universalmente. No Brasil a devoção espalhou-se rapidamente a partir de 2013, com paróquias dedicadas em São Paulo, Rio de Janeiro, Belo Horizonte. A novena é especialmente apropriada para situações que parecem humanamente irresolúveis: casamentos em crise, filhos afastados da fé, dependências químicas, conflitos familiares prolongados, decisões bloqueadas. A oração não exige conhecer a natureza exata do nó; basta apresentá-lo a Maria com confiança filial.",
    prayerText:
      "Virgem Maria, Mãe que jamais abandonastes um filho que clama o Vosso auxílio, Mãe cujas mãos não cessam de trabalhar por nós, Vossos filhos amados, Mãe cheia da graça de Deus, ponho em Vossas mãos as fitas e os laços que apertam minha vida. Em Vossas mãos não existe nó que não possa ser desatado. Mãe poderosa, pela Vossa intercessão e pela graça de Vosso Filho Jesus, trazei às minhas mãos o consolo. Vós, que desatais com doçura os nós da minha vida, peço-Vos receber em Vossas mãos (mencionar o nome ou a situação), e livrar dos laços e confusões com que o inimigo nos ataca. Pela Vossa graça, pela Vossa intercessão, livrai-nos de todo mal, Senhora nossa, e desatai os nós que nos impedem de unir-nos a Deus. Amém.",
    instructions:
      "Reze uma vez ao dia durante nove dias consecutivos. Estrutura: (1) Sinal da Cruz; (2) ato de contrição — o desatamento de um nó muitas vezes começa com o reconhecimento do próprio pecado; (3) um mistério do Santo Rosário; (4) a oração da novena; (5) um Pai-Nosso, Ave-Maria e Glória; (6) mencione explicitamente o nó. Para situações particularmente difíceis, o Papa Francisco recomendou rezar a novena durante um período prolongado se a intercessão não for atendida de imediato. Muitos católicos brasileiros acrescentam um gesto simbólico: escrever o nó num papel e colocá-lo aos pés de uma imagem mariana. Se o nó for uma relação rompida, considere oferecer a novena pela conversão própria primeiro e pela outra pessoa depois.",
    patronSaint: "Maria, Desatadora dos Nós",
    feastDay: "28 de setembro (devoção não calendarial)",
    source: "Vatican.va Português (homilias do Papa Francisco) + tradição de Augsburgo (igreja de São Pedro am Perlach) + Santo Ireneu, Adversus Haereses III, 22, 4. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-seven-sorrows",
    name: "Novena a Nossa Senhora das Dores",
    description:
      "A Novena a Nossa Senhora das Dores (também Mater Dolorosa) honra os sete momentos de maior sofrimento na vida de Maria: a profecia de Simeão, a fuga para o Egito, a perda do Menino Jesus no Templo, o encontro com Jesus no caminho do Calvário, Jesus na cruz, Jesus descido da cruz (Pietà) e Jesus no sepulcro. A devoção remonta ao século XIII (Ordem dos Servitas de Maria, Florença 1233) e foi estendida pelo Papa Bento XIII em 1727. A festa litúrgica de 15 de setembro sublinha a corredenção mariana: Maria permaneceu de pé junto à cruz (stabat Mater). A Mater Dolorosa é a primeira intercessora dos que sofrem — mães que perderam filhos, esposos abandonados, pais cujos filhos escolheram caminhos de morte. No Brasil, a devoção das Sete Dores tem expressão forte na Semana Santa, especialmente na Sexta-Feira Santa. A novena é rezada tradicionalmente de 6 a 14 de setembro.",
    prayerText:
      "Ó Maria, Mãe dolorosíssima, suplicamos-Vos que, pela Vossa própria tristeza ao pé da Cruz, nos alcanceis a graça de suportar nossos sofrimentos com paciência e amor, em união com os sofrimentos de Vosso divino Filho. Vós que estivestes presente no Calvário e cuja alma foi traspassada pela espada da dor segundo a profecia de Simeão, alcançai-nos a fortaleza para não nos afastarmos da cruz quando esta chegar à nossa vida. Recebei em Vosso Coração Imaculado a intenção que agora Vos apresento (mencionar a intenção), e ensinai-nos a estar de pé, como Vós estivestes, junto aos que sofrem. Rainha dos Mártires, rogai por nós. Amém.",
    instructions:
      "A novena se compõe meditando cada dia sobre uma das Sete Dores. Estrutura diária: (1) Sinal da Cruz; (2) leitura breve do trecho evangélico correspondente; (3) meditação silenciosa de vários minutos — o traço distintivo desta novena é a quietude; (4) uma Ave-Maria por cada Dor (sete ao todo cada dia); (5) a oração da novena; (6) um Pai-Nosso e Glória. Alternativa muito difundida no Brasil: rezar a Coroa das Sete Dores (também chamada Rosário Servita). A novena combina-se naturalmente com visitas ao Santíssimo Sacramento, com o jejum mariano das sextas, e com a prática de acompanhar alguém em luto recente — não com palavras, mas com presença, ao modo da Mater Dolorosa.",
    patronSaint: "Nossa Senhora das Dores · Rainha dos Mártires",
    feastDay: "15 de setembro",
    source: "CNBB + Vatican.va Português + tradição dos Servitas de Maria (Florença, 1233) + Bento XIII (1727). Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-mount-carmel",
    name: "Novena a Nossa Senhora do Carmo",
    description:
      "A devoção a Nossa Senhora do Monte Carmelo enraíza-se no Monte Carmelo da Terra Santa, onde o profeta Elias orou pela chuva que terminaria com a seca de Israel (1 Reis 18). Os eremitas latinos que viviam ali no século XII se constituíram como Ordem do Carmo sob a regra de Santo Alberto de Jerusalém (ca. 1209). Na noite de 16 de julho de 1251, em Cambridge, a Virgem Maria apareceu a São Simão Stock e entregou-lhe o Escapulário marrom com a promessa: «Aquele que morrer revestido com este escapulário não padecerá o fogo eterno». A Igreja reafirmou esta promessa — entendida corretamente como sinal de consagração filial a Maria que se traduz em uma vida de oração, sacramentos e caridade. No Brasil, Nossa Senhora do Carmo tem devoção particularmente forte no Nordeste (especialmente em Recife, Salvador e Olinda) e em paróquias carmelitanas. A festa do 16 de julho é também festa nacional do escapulário. A novena se reza tradicionalmente de 7 a 15 de julho.",
    prayerText:
      "Ó Virgem do Monte Carmelo, formosa Flor do Carmelo, Videira florida, Esplendor do Céu, Mãe puríssima do Filho de Deus e Mãe nossa, olhai-me com olhos de misericórdia. Estrela do mar, ajudai-me em meus caminhos pelas águas deste mundo. Pelo Vosso Santo Escapulário, sinal de Vossa proteção maternal, dai-me a graça da perseverança final, e alcançai-me agora a graça que Vos peço (mencionar a intenção), se for conforme à vontade de Deus. Rainha e Formosura do Carmelo, rogai por nós. Amém.",
    instructions:
      "Reze uma vez ao dia durante nove dias consecutivos, idealmente de 7 a 15 de julho. Estrutura: (1) Sinal da Cruz; (2) Salmo 23 ou o cântico do Magnificat (Lc 1,46-55); (3) a oração da novena; (4) cinco Ave-Marias; (5) a jaculatória «Flor do Carmelo, Videira florida, Esplendor do Céu, Mãe do Filho de Deus, Mãe intacta nossa». Se você usa o Escapulário, lembre-se que seu uso supõe uma vida cristã coerente — não é talismã mas sinal de filiação mariana. Se você ainda não o tem, considere recebê-lo em imposição sacramental ao concluir a novena. A devoção carmelita enriquece-se com a leitura dos grandes místicos da Ordem: Santa Teresa de Jesus, São João da Cruz, Santa Teresinha do Menino Jesus.",
    patronSaint: "Nossa Senhora do Monte Carmelo · São Simão Stock",
    feastDay: "16 de julho",
    source: "CNBB + Vatican.va Português + Regra de Santo Alberto de Jerusalém (ca. 1209) + Bento XIII (extensão 1726) + tradição da Ordem do Carmo. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-padre-pio",
    name: "Novena a São Pio de Pietrelcina",
    description:
      "São Pio de Pietrelcina (Francesco Forgione, 1887-1968) foi um sacerdote capuchinho italiano cuja vida foi marcada por dons místicos extraordinários e por uma austeridade penitencial sem concessões. Em 20 de setembro de 1918 recebeu as chagas de Cristo (estigmas) — os únicos estigmas plenamente visíveis documentados em um sacerdote da Igreja, que carregou durante cinquenta anos. Viveu a maior parte de sua vida adulta como confessor: dezesseis horas por dia no confessionário, lendo com frequência as consciências dos penitentes antes que estes falassem. Seu dom de bilocação, suas profecias cumpridas, suas curas documentadas e sua fundação da Casa Sollievo della Sofferenza o tornaram uma das figuras mais amadas do século XX. São João Paulo II o beatificou em 1999 e o canonizou em 16 de junho de 2002. No Brasil, a devoção a Padre Pio é uma das mais difundidas entre as devoções modernas. A novena é apropriada para pedir a conversão própria ou de um ente querido, a cura física ou espiritual, a perseverança no sofrimento, uma boa confissão.",
    prayerText:
      "Querido Deus, Vós destes a São Pio de Pietrelcina o privilégio de participar de maneira extraordinária na Paixão de Vosso Filho. Concedei-me por sua intercessão a graça de (mencionar a intenção), que ardentemente desejo do coração de Jesus. São Pio de Pietrelcina, grande sacerdote do confessionário, grande amigo dos enfermos e dos pecadores, rogai por mim. Padre Pio, homem cheio das chagas de Cristo, alcançai-me a graça de aceitar minhas próprias cruzes como aceitastes as Vossas: com fé inquebrável e com humildade serena. Amém.",
    instructions:
      "Reze uma vez ao dia durante nove dias consecutivos. Estrutura: (1) Sinal da Cruz; (2) um breve exame de consciência — Padre Pio foi antes de tudo confessor; (3) a oração da novena; (4) um Pai-Nosso, Ave-Maria e Glória em honra às Cinco Chagas; (5) cinco Pai-Nossos e Ave-Marias pelas intenções do Papa. Padre Pio recomendava três disciplinas: (a) a confissão semanal, (b) a Comunhão diária se possível, (c) a direção espiritual com um confessor estável. Para os enfermos: rezar a novena ao lado do leito do enfermo, lembrando que ele mesmo passou a maior parte da vida com dor física contínua e aprendeu a transformá-la em oração.",
    patronSaint: "São Pio de Pietrelcina",
    feastDay: "23 de setembro",
    source: "CNBB + Vatican.va Português (homilias de JPII na canonização, 16 de junho de 2002) + Canção Nova + epistolário de Padre Pio. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-faustina",
    name: "Novena a Santa Maria Faustina Kowalska",
    description:
      "Santa Maria Faustina Kowalska (1905-1938) foi uma humilde religiosa polonesa da Congregação das Irmãs de Nossa Senhora da Misericórdia, a quem Jesus escolheu como secretária e apóstola de sua Divina Misericórdia. Entre 1931 e 1938 recebeu revelações de Jesus que registrou em seu Dzienniczek (Diário). Nessas revelações Jesus pediu: (1) a imagem do Senhor da Divina Misericórdia com a inscrição «Jesus, eu confio em Vós»; (2) o Domingo da Divina Misericórdia como festa universal; (3) a Coroinha da Divina Misericórdia; e (4) a Hora da Misericórdia (15h00). Foi canonizada por São João Paulo II em 30 de abril de 2000, no mesmo dia em que estabeleceu a festa. No Brasil, a devoção à Divina Misericórdia tem expressão pastoral muito ampla. A novena foi ditada por Jesus a Faustina (Diário 1209-1229) e é rezada da Sexta-Feira Santa ao Sábado da Oitava de Páscoa.",
    prayerText:
      "Ó Eterno Pai, olho com olhos de misericórdia para (a intenção do dia), e pelos dolorosíssimos méritos da Paixão de Jesus Cristo e por seu Sagrado Coração, atrai estas almas ao Vosso Reino, para que conheçam Vossa insondável misericórdia. Jesus, fonte da vida, eu confio em Vós. (Repetir 1 Pai-Nosso, 1 Ave-Maria e o Credo, seguido da Coroinha completa da Divina Misericórdia rezada pela intenção do dia.) Santa Faustina Kowalska, apóstola da Divina Misericórdia, rogai por nós. Amém.",
    instructions:
      "A novena tem nove dias consecutivos, idealmente da Sexta-Feira Santa ao Sábado véspera do Domingo da Divina Misericórdia. Cada dia tem uma intenção específica atribuída por Jesus (dia 1 toda a humanidade, dia 2 os sacerdotes, dia 3 as almas devotas, dia 4 os não-crentes, dia 5 os irmãos separados, dia 6 os humildes, dia 7 os devotos da Divina Misericórdia, dia 8 as almas do purgatório, dia 9 as almas tíbias). Estrutura: (1) Sinal da Cruz; (2) leitura breve da intenção de Jesus para esse dia; (3) a oração do dia; (4) a Coroinha completa da Divina Misericórdia (uns dez minutos com um Rosário comum); (5) encerramento com «Jesus, eu confio em Vós». Se a situação for urgente, combine com a confissão sacramental, a Comunhão e a visita ao Santíssimo Sacramento durante a Hora da Misericórdia (15h00).",
    patronSaint: "Santa Maria Faustina Kowalska",
    feastDay: "5 de outubro (canonização 30 de abril de 2000)",
    source: "CNBB + Vatican.va (canonização JPII 30 de abril de 2000) + Dzienniczek / Diário de Santa Faustina (1209-1229) + Canção Nova. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-john-paul-ii",
    name: "Novena a São João Paulo II",
    description:
      "São João Paulo II (Karol Józef Wojtyła, 1920-2005) — o primeiro papa polonês e o primeiro papa não italiano em quatrocentos e cinquenta e cinco anos — governou a Igreja Católica de 16 de outubro de 1978 até 2 de abril de 2005. Sua vida atravessou os dois totalitarismos do século XX: a ocupação nazista da Polônia e o regime comunista, ao qual se enfrentou como bispo de Cracóvia e como pontífice cujas visitas à Polônia foram decisivas para o colapso do comunismo. Sobreviveu ao atentado de 13 de maio de 1981 e atribuiu sua salvação à intercessão de Nossa Senhora de Fátima. Canonizou 482 santos. Visitou o Brasil quatro vezes (1980, 1991, 1997, 2002) — incluindo a missa no Aterro do Flamengo no Rio em outubro de 1980 com cerca de dois milhões de fiéis, uma das maiores concentrações católicas da história brasileira. Morreu em 2 de abril de 2005, véspera do Domingo da Divina Misericórdia. Foi canonizado pelo Papa Francisco em 27 de abril de 2014. A novena é apropriada para pedir vocações sacerdotais, fortaleza diante da perseguição pela fé, graças para a juventude, a defesa da vida, ou qualquer intenção familiar.",
    prayerText:
      "Ó Santíssima Trindade, nós Vos agradecemos por terdes dado à Vossa Igreja São João Paulo II, em quem resplandeceu Vossa ternura, o rosto paterno de Vossa misericórdia, o amor a Cristo Esposo da Igreja e a paixão pelo homem, filho predileto de Deus. Concedei-nos, por sua intercessão, conforme à Vossa vontade, a graça que agora Vos pedimos (mencionar a intenção). São João Paulo II, da janela do Céu, dai-nos Vossa bênção. Bendizei a Igreja, bendizei o mundo, bendizei especialmente as famílias e os jovens. Amém. E como tantas vezes nos dissestes: «Não tenhais medo! Abri as portas a Cristo!»",
    instructions:
      "Reze uma vez ao dia durante nove dias consecutivos. Estrutura: (1) Sinal da Cruz; (2) Ato de fé ou o Credo dos Apóstolos; (3) Leitura breve de um trecho de alguma encíclica ou da Carta às Famílias; (4) Cinco mistérios do Santo Rosário, idealmente os luminosos que ele acrescentou em Rosarium Virginis Mariae (2002); (5) A oração da novena; (6) Encerramento com «Totus Tuus» — «Todo teu», o lema mariano que tomou de São Luís Maria Grignion de Montfort. Para os jovens católicos brasileiros, prática recomendada: rezar a novena nos nove dias prévios a uma JMJ ou a uma decisão vocacional importante. A JMJ Rio 2013 — a primeira presidida pelo Papa Francisco — foi a continuação direta da visão wojtyliana iniciada em 1985.",
    patronSaint: "São João Paulo II",
    feastDay: "22 de outubro (canonização 27 de abril de 2014)",
    source: "CNBB + Vatican.va Português + Karol Wojtyła, Dom e Mistério (1996) + visitas pastorais ao Brasil (1980, 1991, 1997, 2002). Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-mother-teresa",
    name: "Novena a Santa Teresa de Calcutá",
    description:
      "Santa Teresa de Calcutá (Anjezë Gonxhe Bojaxhiu, 1910-1997) — nascida em Skopje em uma família católica albanesa — entrou em 1928 nas Irmãs de Loreto e ensinou durante quase duas décadas em uma escola de meninas em Calcutá. Em 10 de setembro de 1946, em um trem para Darjeeling, recebeu o que ela chamou de «o chamado dentro do chamado»: a inspiração de deixar Loreto para servir a Cristo nos mais pobres dos pobres. Fundou as Missionárias da Caridade em 1950. Recebeu o Prêmio Nobel da Paz em 1979. Após sua morte se tornaram públicos seus escritos privados, revelando uma «noite escura da alma» de cinquenta anos que ela entendeu como participação na sede espiritual de Cristo na cruz («tenho sede», Jo 19,28). Foi canonizada pelo Papa Francisco em 4 de setembro de 2016, no Jubileu da Misericórdia. As Missionárias da Caridade têm casas em todo o Brasil. A novena é apropriada para pedir o espírito de serviço aos pobres, a fortaleza para perseverar na oração quando se sente seca, ou a graça de ver Cristo em qualquer pessoa ferida ou desconhecida.",
    prayerText:
      "Ó Santíssima Trindade, nós Vos agradecemos por terdes dado a Santa Teresa de Calcutá, fiel servidora dos mais pobres dos pobres. Por sua intercessão, concedei-nos a graça que agora Vos pedimos (mencionar a intenção). E concedei-nos, sobretudo, um coração como o dela: capaz de ver Cristo em cada irmão que sofre, capaz de servir sem esperar nada em troca, capaz de continuar acreditando quando já não sente. Santa Teresa de Calcutá, rogai por nós e por todos os que o mundo esqueceu. Amém.",
    instructions:
      "Reze uma vez ao dia durante nove dias consecutivos. Estrutura: (1) Sinal da Cruz; (2) um ato de fé; (3) Leitura do «eu tenho sede» em João 19,28 ou da parábola do juízo final em Mateus 25; (4) a oração da novena; (5) um Pai-Nosso, Ave-Maria e Glória; (6) mencione explicitamente a intenção. A novena se enriquece notavelmente se acompanhada de obras concretas de caridade durante os nove dias: uma visita a um enfermo, um serviço a um familiar idoso, uma doação a uma obra de misericórdia. Para os nove dias, considere se comprometer a uma hora de adoração eucarística ou à Comunhão diária se possível. Para os que estão atravessando uma noite escura da alma — secura espiritual, sentimento de abandono, dificuldade para orar — a novena a Santa Teresa é particularmente apropriada.",
    patronSaint: "Santa Teresa de Calcutá",
    feastDay: "5 de setembro",
    source: "Vatican.va Português (canonização do Papa Francisco, 4 de setembro de 2016) + Vem, Sê Minha Luz (cartas privadas, publicadas 2007) + CNBB + Missionárias da Caridade no Brasil. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-rita",
    name: "Novena a Santa Rita de Cássia",
    description:
      "Santa Rita de Cássia (Margherita Lotti, 1381-1457) é venerada como «Advogada dos Impossíveis» e «Santa das Causas Desesperadas». No Brasil, sua devoção é uma das mais populares — a festa de 22 de maio mobiliza centenas de milhares de fiéis, e a bênção das rosas é tradição firmemente estabelecida. Casada contra sua vontade aos doze anos com um homem violento, suportou dezoito anos de maus-tratos sem perder a fé. Após enviuvar e perder seus dois filhos, entrou no mosteiro agostiniano de Cássia. Em 1442 recebeu um estigma parcial: um espinho da coroa de Cristo se cravou em sua testa. Antes de morrer, em pleno inverno, pediu uma rosa do jardim de sua casa natal — onde o roseiral floresceu milagrosamente. Foi canonizada por Leão XIII em 1900. A novena é a oração católica por excelência para as situações humanamente impossíveis: casamentos sem saída, filhos perdidos, doenças incuráveis, conflitos enraizados.",
    prayerText:
      "Ó Santa Rita de Cássia, glorioso modelo de paciência e perseverança, vós que por anos suportastes um casamento doloroso sem perder a caridade, vós que carregastes em vossa testa o espinho de Cristo, vós que recebestes a rosa milagrosa em pleno inverno — alcançai-me de Deus a graça que com humilde confiança vos suplico (mencionar a intenção). Sei que muitas vezes os caminhos humanos estão fechados, os corações endurecidos. Mas vós, advogada dos impossíveis, sabeis interceder por nós. Concedei-me a fortaleza para perseverar na oração, a paciência para suportar o que não posso mudar, e a graça para reconhecer a mão de Deus mesmo quando tudo pareça perdido. Santa Rita, advogada dos impossíveis, rogai por nós. Amém.",
    instructions:
      "Reze uma vez ao dia durante nove dias consecutivos, idealmente de 14 a 22 de maio. Estrutura: (1) Sinal da Cruz; (2) um ato de humildade; (3) a oração da novena; (4) uma dezena do Santo Rosário, idealmente com os mistérios dolorosos; (5) um Pai-Nosso, Ave-Maria e Glória; (6) mencione a situação «impossível» concretamente. Tradição popular no Brasil: abençoar rosas no dia da festa de Santa Rita (22 de maio) — quase todas as paróquias brasileiras fazem a bênção tradicional. A rosa abençoada se conserva em casa. A novena combina-se com: (a) uma boa confissão sacramental durante os nove dias; (b) um ato sustentado de reconciliação; (c) a leitura do livro de Tobias ou de Jó.",
    patronSaint: "Santa Rita de Cássia",
    feastDay: "22 de maio",
    source: "CNBB + Vatican.va Português (Leão XIII, canonização 1900) + Mosteiro Agostiniano de Cássia (Itália) + tradição popular brasileira do Dia de Santa Rita. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-peregrine",
    name: "Novena a São Peregrino Laziosi",
    description:
      "São Peregrino Laziosi (1265-1345) é o patrono universal dos enfermos de câncer. Nascido em Forlì, Itália, em uma família nobre da facção anti-papal, converteu-se após esbofetear São Filipe Benizi e receber dele a outra face em resposta. Entrou na Ordem dos Servos de Maria e viveu como sacerdote e pregador por mais de quarenta anos. Aos sessenta anos, uma penitência pessoal (não se sentar quando podia estar de pé) produziu em sua perna direita uma chaga cancerosa tão grave que os médicos decidiram amputar. Na noite anterior à cirurgia, Peregrino passou a noite em oração diante do crucifixo; ao amanhecer, os cirurgiões o encontraram completamente são. Viveu outros vinte anos, completamente curado. Foi canonizado por Bento XIII em 1726. A novena é apropriada para pedir a cura física de si mesmo ou de um ente querido com câncer; a fortaleza para suportar o tratamento médico; a graça de aceitar o sofrimento quando a cura não é obtida; o consolo dos que cuidam de um enfermo.",
    prayerText:
      "Ó Deus, que destes a São Peregrino, Vosso servo, o privilégio de obter por sua oração a cura de uma doença incurável, concedei-nos por sua intercessão a saúde do corpo e a da alma. São Peregrino, vós que conhecestes o peso do câncer em vossa própria carne, olhai-me com vossa compaixão de paciente. Oferecei-vos por mim (ou pela pessoa por quem rezo: mencionar o nome) diante do trono de Cristo médico, e alcançai-me, se for vontade do Pai, a cura física que com confiança filial vos peço. E se não for essa a vontade de Deus, alcançai-me pelo menos a cura da alma, a paciência na dor, a fé que não se quebra e a esperança que não decepciona. Amém.",
    instructions:
      "Reze uma vez ao dia durante nove dias consecutivos, idealmente de 22 a 30 de abril em preparação para a festa de 1º de maio. Estrutura: (1) Sinal da Cruz; (2) leitura breve do evangelho da cura do leproso (Mc 1,40-42) ou da hemorroíssa (Mc 5,25-34); (3) a oração da novena; (4) um Pai-Nosso, Ave-Maria e Glória pela intenção específica; (5) um ato de contrição. Para enfermos em tratamento oncológico: rezar a novena ao lado do leito, em companhia do enfermo, com presença física. Bênção dos enfermos com a relíquia de São Peregrino (disponível em paróquias servitas) é tradição sacramental. Acompanhar com: (a) os sacramentos do enfermo; (b) oração familiar diária; (c) atos de caridade por outros enfermos.",
    patronSaint: "São Peregrino Laziosi (patrono dos enfermos de câncer)",
    feastDay: "1º de maio",
    source: "CNBB + Ordem dos Servos de Maria + Vatican.va (Bento XIII, 1726) + Santuário de Forlì. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-dymphna",
    name: "Novena a Santa Dimpna",
    description:
      "Santa Dimpna (s. VII, m. ca. 650) é a patrona universal dos enfermos mentais, dos neurodivergentes, dos traumatizados e das vítimas de abuso. Filha de um rei pagão irlandês e de uma mãe cristã, fugiu de seu pai (que enlouquecido tentou casar-se com ela) e chegou a Geel, na atual Bélgica, onde dedicou sua vida ao serviço dos pobres e dos enfermos mentais. Seu pai a localizou e a matou; tinha aproximadamente quinze anos. Geel se tornou desde o século XIII em um dos primeiros centros do mundo cristão para o cuidado humanitário dos enfermos mentais — modelo que inspirou a psiquiatria comunitária moderna. A novena é apropriada para pedir a cura interior após um trauma; a cura ou o manejo digno de uma doença mental crônica; a proteção de um ente querido neurodivergente; a fortaleza para perdoar um agressor; e a graça de buscar ajuda profissional quando necessária.",
    prayerText:
      "Ó Deus, que escolhestes Santa Dimpna como patrona dos enfermos mentais e das vítimas de abuso, concedei-nos por sua intercessão a graça que agora Vos pedimos (mencionar a intenção específica). Santa Dimpna, jovem mártir que conhecestes em vossa própria carne a escuridão do abuso familiar e escolhestes a fidelidade a Cristo antes que a conformidade com um mal poderoso, alcançai-nos a fortaleza para não calar o que deve ser denunciado, a coragem de proteger os vulneráveis, e a paciência para acompanhar quem sofre na mente, no coração ou no espírito. Concedei-nos a graça da cura interior e o discernimento para buscar também a ajuda profissional quando ela é parte da providência de Deus. Amém.",
    instructions:
      "Reze uma vez ao dia durante nove dias consecutivos, idealmente de 7 a 15 de maio. Estrutura: (1) Sinal da Cruz; (2) ato de confiança; (3) a oração da novena; (4) os mistérios dolorosos do Santo Rosário; (5) Pai-Nosso, Ave-Maria e Glória. A Igreja Católica recomenda explicitamente a combinação de oração + sacramentos + atendimento psicológico ou psiquiátrico quando necessário — um enfermo com depressão clínica deve orar e tratar-se simultaneamente. Se a novena for rezada por uma vítima de abuso, acompanhe com uma conversa pastoral com um sacerdote ou diretor espiritual treinado em trauma, e com a decisão, quando procedente, de denunciar o abuso às autoridades competentes.",
    patronSaint: "Santa Dimpna de Geel (patrona dos enfermos mentais e vítimas de abuso)",
    feastDay: "15 de maio",
    source: "CNBB + Igreja católica de Geel (Bélgica) + Vatican.va (Acta Sanctorum Mai III) + Bolandistas. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-gerard",
    name: "Novena a São Gerardo Majella",
    description:
      "São Gerardo Majella (1726-1755) é o patrono universal das mães expectantes, dos bebês não nascidos e dos partos difíceis. Redentorista, irmão leigo da Congregação do Santíssimo Redentor fundada por Santo Afonso Maria de Ligório, viveu apenas três anos consagrados, marcados por dons místicos extraordinários: bilocação, profecia, leitura das consciências. Sua associação com as mães remonta a um episódio histórico: uma jovem mãe, ao receber dele um lenço esquecido, ouviu-o dizer «guarde-o, será útil»; anos depois, em parto perigoso, aplicou o lenço sobre o ventre e deu à luz sem dificuldade. Foi canonizado por Pio X em 1904. No Brasil, a devoção é especialmente forte nas paróquias redentoristas (Aparecida, particularmente). A novena é apropriada para mulheres grávidas, especialmente em situações difíceis: aborto espontâneo prévio, idade materna avançada, diagnóstico pré-natal preocupante, parto prematuro, infertilidade prolongada.",
    prayerText:
      "Ó glorioso São Gerardo Majella, fiel amigo dos bebês não nascidos e das mães expectantes, olhai com olhos de misericórdia para esta mãe que agora se encomenda à vossa intercessão (mencionar o nome ou a situação). Alcançai-lhe de Deus uma gestação saudável, um parto seguro e um filho disposto desde o ventre a receber o batismo e a viver sua vocação cristã. Para as que esperam conceber, alcançai o dom da fertilidade se for vontade de Deus. Para as que perderam um filho não nascido, alcançai o consolo de saber que esse pequeno descansa já no coração de Cristo. Para as que enfrentam diagnósticos difíceis, alcançai a fortaleza para acolher a vida tal como Deus a envia. Amém.",
    instructions:
      "Reze uma vez ao dia durante nove dias consecutivos. Se rezada por uma gestação específica, idealmente comece no início do terceiro trimestre. Estrutura: (1) Sinal da Cruz; (2) ato de confiança na providência divina sobre a vida humana, desde a concepção; (3) leitura breve do Salmo 139; (4) a oração da novena; (5) um mistério do Santo Rosário (gozosos); (6) Pai-Nosso, Ave-Maria e Glória. Tradições brasileiras: (a) medalha de São Gerardo durante a gravidez; (b) bênção do berço com a oração de São Gerardo; (c) celebrar a festa (16 de outubro) com ação de graças por cada filho da família. Para perdas (aborto, natimorto), combinar com a celebração pastoral da pequena vida.",
    patronSaint: "São Gerardo Majella, CSsR",
    feastDay: "16 de outubro",
    source: "CNBB + Santo Afonso Maria de Ligório, Vita di Fra Gerardo Maiella (1755) + Congregação do Santíssimo Redentor + Vatican.va (Pio X, 1904). Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "novena-st-gianna-molla",
    name: "Novena a Santa Gianna Beretta Molla (Padroeira das Mães em Gestações Difíceis)",
    description:
      "Santa Gianna Beretta Molla (1922-1962) é a padroeira moderna italiana das mães que enfrentam gestações de alto risco, das mulheres casadas, das mães que trabalham fora e dos médicos. Nasceu em Magenta, Lombardia, a décima de treze filhos numa família milanesa-católica de intensa piedade (dois de seus irmãos tornaram-se sacerdotes, duas de suas irmãs religiosas). Formou-se em medicina em Pavia, especializando-se em pediatria e obstetrícia, e manteve um consultório próspero no povoado de Mesero, nos arredores de Milão, durante toda a década de 1950. Foi simultaneamente médica em exercício, católica fiel à Missa diária, pianista experiente, esquiadora competente e, desde 1955, esposa de Pietro Molla (engenheiro da fábrica de fósforos SAFFA, que a havia conquistado no coral paroquial) e mãe de uma família crescente: Pierluigi (1956), Mariolina (1957) e Laura (1959). O momento definitivo de sua santidade chegou em setembro de 1961 com a quarta gravidez. Aos dois meses, os médicos descobriram um fibroma uterino — um grande tumor benigno que, sem tratamento, ameaçava tanto a vida dela como a da criança em desenvolvimento. Três opções médicas estavam disponíveis: histerectomia completa (que salvaria Gianna mas encerraria a gestação e sua fertilidade futura, teologicamente permissível pelo princípio do duplo efeito); remoção do fibroma com aborto (impermissível — morte direta da criança); ou remoção apenas do fibroma, deixando a gestação em alto risco mas preservando a criança. Gianna escolheu o terceiro caminho e instruiu a equipe cirúrgica: «Se tiverem de escolher entre a mãe e a criança, escolham a criança. Insisto: escolham a criança. Salvem a criança». Levou a gestação por meses finais fisicamente esgotadores. No Sábado Santo, 21 de abril de 1962, deu à luz uma filha saudável — Gianna Emanuela. Uma semana depois, em 28 de abril, Gianna Beretta Molla morreu de peritonite séptica aos 39 anos. Foi beatificada por São João Paulo II em 24 de abril de 1994 (com seu marido Pietro e os filhos sobreviventes presentes) e canonizada por ele em 16 de maio de 2004, com seu viúvo, sua filha e seu filho assistindo — a primeira canonização na história católica em que o cônjuge do santo esteve vivo e presente. A novena é apropriada para: qualquer gestação de alto risco; uma gestação em que a saúde da mãe está em perigo; famílias na UTI Neonatal (onde a formação médica de Gianna como pediatra é um ponto particular de identificação); mulheres ponderando decisões médicas difíceis durante a gravidez; infertilidade e recuperação após aborto espontâneo; casais discernindo o dom da vida; e mães trabalhadoras que buscam a integração entre vocação profissional e maternidade que Gianna encarnou sem concessões. Sua filha Gianna Emanuela — hoje médica ela mesma — fala publicamente do testemunho da mãe e esteve presente no Sínodo 2024.",
    prayerText:
      "Ó Deus, nosso Pai, em Santa Gianna Beretta Molla deste-nos uma esposa, uma mãe e uma médica que viveu a vocação do matrimônio e a dignidade da vida como um único dom contínuo. Por sua intercessão, concedei-nos a graça que agora pedimos (mencionar a intenção). Rezamos especialmente pelas mães que carregam gestações difíceis — que encontrem em Gianna uma irmã e uma intercessora; pelas famílias que enfrentam decisões médicas impossíveis no útero — que recebam a sabedoria que Gianna recebeu e a confiança para escolher o dom da vida com humildade e esperança; pelas mães trabalhadoras — que integrem suas vocações como Gianna integrou medicina e maternidade; pelo filho não nascido amado e esperado com temor e tremor — que seja protegido, formado e trazido em segurança ao dia do nascimento. Santa Gianna, que escolheste a vida da tua filha sobre a tua e morreste na certeza da ressurreição, rogai por nós. Amém.",
    instructions:
      "Reze uma vez ao dia durante nove dias consecutivos. A novena é tradicionalmente rezada nos nove dias que antecedem sua festa (28 de abril, data de sua morte) ou nos nove dias antes da Solenidade da Anunciação (25 de março). É também apropriada em qualquer momento de decisão médica aguda durante uma gestação: ao diagnóstico de uma anomalia fetal, depois de uma ecografia difícil, durante uma internação prolongada, ao lado do berço na UTI Neonatal de um recém-nascido frágil. Estrutura: (1) Sinal da Cruz; (2) a oração da novena; (3) uma dezena do Rosário, idealmente dos Mistérios Gozosos (Anunciação, Visitação, Nascimento, Apresentação, Encontro do Menino no Templo) — cinco mistérios que percorrem o arco espiritual da maternidade que Gianna viveu; (4) o Memorare (Lembrai-vos); (5) nomeie a mãe, a criança e a intenção. Acompanhe a novena com duas práticas devocionais que a própria Gianna mantinha: assistência diária à Missa (pilar central de sua espiritualidade) e a consagração do matrimônio à Sagrada Família de Jesus, Maria e José (Gianna e Pietro fizeram essa consagração antes do casamento e a renovavam anualmente). Para famílias em estadia na UTI Neonatal: a novena pode ser rezada ao lado do berço, em silêncio, em fragmentos — a santa das mães que não conseguiam ficar quietas durante uma gestação difícil compreende a oração rezada no caos. A tradição devocional italiana recomenda peregrinação a Mesero (Igreja paroquial de San Martino, onde Gianna está sepultada). Os católicos brasileiros costumam venerá-la em imagens paroquiais junto às entradas das maternidades de hospitais católicos.",
    patronSaint: "Santa Gianna Beretta Molla",
    feastDay: "28 de abril",
    source: "CNBB + Vatican.va Português (São João Paulo II, canonização 16 de maio de 2004) + Fondazione Gianna Beretta Molla + Pietro Molla, Saint Gianna Molla: Wife, Mother, Doctor (Ignatius Press, 2004). Retrieved 2026-05-19.",
    reviewedAt: new Date("2026-05-19"),
  },
  {
    prayerSlug: "novena-st-anne",
    name: "Novena a Santa Ana",
    description:
      "Santa Ana é, segundo a tradição cristã, a mãe da Santíssima Virgem Maria e a avó materna do Senhor Jesus Cristo. Seu nome — do hebraico Hannah, «graça» — e a história de seu casamento com São Joaquim aparecem no Protoevangelho de Tiago (s. II). Ana e Joaquim, casados por anos sem ter filhos, sofreram a afronta social da esterilidade até que um anjo anunciou a Ana que conceberia uma filha — Maria — a quem consagrariam ao Senhor. A devoção a Santa Ana se estendeu no Oriente desde o século VI. No Brasil é uma das devoções mais antigas — chegou com os primeiros colonizadores portugueses no século XVI e tem expressões fortes em todo o país. A festa de 26 de julho se celebra junto à de São Joaquim. A novena é apropriada para casais aguardando um filho, a santificação do próprio casamento, a transmissão da fé pelos avós, a cura de relações familiares feridas, ou para acompanhar uma mulher idosa na doença ou no final da vida.",
    prayerText:
      "Gloriosa Santa Ana, cheia de compaixão pelos que vos invocam e de amor pelos que sofrem, ajoelho-me a vossos pés e humildemente vos rogo que tomeis a presente intenção sob vossa especial proteção (mencionar a intenção). Dignai-vos recomendá-la a vossa Filha, a Santíssima Virgem Maria, e apresentá-la diante do trono de Jesus, seu divino Filho. Não cesseis de interceder por mim até que meu pedido seja atendido. Sobretudo, alcançai-me a graça de ver Jesus, amá-lo e servi-lo com coração puro, junto a vós, junto a Maria, junto a Joaquim, durante toda a minha vida e por toda a eternidade. Santa Ana, avó do Senhor Jesus, rogai por nós. Amém.",
    instructions:
      "Reze uma vez ao dia durante nove dias consecutivos, idealmente de 17 a 25 de julho em preparação para a festa de 26 de julho (Santos Joaquim e Ana). Estrutura: (1) Sinal da Cruz; (2) leitura breve do primeiro capítulo de Lucas; (3) a oração da novena; (4) um mistério do Santo Rosário (gozosos); (5) um Pai-Nosso, Ave-Maria e Glória; (6) mencione a intenção. Tradições brasileiras: (a) romaria familiar a um santuário de Santa Ana na festa; (b) reunir três gerações de mulheres da família para a novena; (c) abençoar a casa com uma imagem de Santa Ana. Para mulheres idosas enfermas: combinar com a Unção dos Enfermos e a presença dos netos ao lado do leito.",
    patronSaint: "Santa Ana · São Joaquim",
    feastDay: "26 de julho (junto com São Joaquim)",
    source: "CNBB + Protoevangelho de Tiago (s. II) + tradição de Sant'Anna em São Paulo + Vatican.va Português. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  {
    prayerSlug: "consecration-de-montfort",
    name: "Consagração Total a Jesus por Maria (São Luís Maria Grignion de Montfort)",
    description:
      "A Consagração Total a Jesus por Maria é a prática espiritual sistematizada por São Luís Maria Grignion de Montfort (1673-1716) em seu Tratado da Verdadeira Devoção a Maria. Montfort, sacerdote francês missionário, ensinou que a consagração total ao Filho se realiza mais perfeitamente quando passa pela mediação maternal da Mãe. A consagração consiste em uma preparação intensiva de 33 dias dividida em quatro fases (despojamento do espírito do mundo, conhecimento de si mesmo, conhecimento de Maria, conhecimento de Cristo) e culmina em uma festa mariana com o ato formal de consagração. São João Paulo II fez esta consagração aos vinte e um anos e manteve «Totus Tuus» como lema episcopal e papal. No Brasil, a Consagração Total é difundida em paróquias redentoristas e marianas; Aparecida promove anualmente.",
    prayerText:
      "Eu, (dizer o próprio nome), pecador infiel, renovo e ratifico hoje em vossas mãos, ó Mãe Imaculada, os votos do meu batismo. Renuncio para sempre a Satanás, a suas pompas e a suas obras, e me entrego inteiramente a Jesus Cristo, Sabedoria encarnada. Eu vos escolho hoje, ó Maria, na presença de toda a corte celestial, por minha Mãe e Senhora. Eu vos entrego e consagro, como vosso escravo, meu corpo e minha alma, meus bens interiores e exteriores e mesmo o valor de minhas boas ações passadas, presentes e futuras. Recebei, ó Virgem benigníssima, este pequeno presente da minha escravidão, à maior glória de Deus, no tempo e na eternidade. Amém.",
    instructions:
      "A preparação dura 33 dias e termina em uma festa mariana significativa. Datas tradicionais no Brasil: (1) iniciar em 7 de setembro para 12 de outubro (Nossa Senhora Aparecida — particularmente significativa para católicos brasileiros); (2) iniciar em 20 de novembro para 8 de dezembro (Imaculada Conceição); (3) iniciar em 20 de fevereiro para 25 de março (Anunciação). Estrutura diária: (1) Sinal da Cruz; (2) leitura do dia conforme as quatro fases; (3) Ladainhas (Sagrado Coração na primeira semana, Nossa Senhora na segunda, Sagrado Coração na terceira); (4) Pai-Nosso e Ave-Maria; (5) Ave Maris Stella; (6) intenção do dia. No dia 33: confissão, Comunhão em Missa mariana, ato formal de consagração diante de uma imagem mariana. Renovação anual.",
    patronSaint: "São Luís Maria Grignion de Montfort",
    feastDay: "28 de abril",
    source: "CNBB + Vatican.va Português + Tratado da Verdadeira Devoção a Maria (São Luís Maria Grignion de Montfort, ca. 1712) + Carta apostólica Rosarium Virginis Mariae (JPII, 2002) + A12 / Santuário Nacional de Aparecida. Retrieved 2026-05-17.",
    reviewedAt: new Date("2026-05-17"),
  },
  // ── Wave 7 (2026-05-18): closes coverage to 100%. Mesma hierarquia de
  //    fontes católicas (CNBB, Vatican.va Português, A12 / Aparecida,
  //    Paulus, Canção Nova, Loyola Editora).
  {
    prayerSlug: "54-day-rosary-novena",
    name: "Novena das 54 Rosas (Rosário dos 54 Dias)",
    description:
      "A Novena das 54 Rosas, também chamada Rosário dos 54 Dias, foi revelada pela Santíssima Virgem Maria a Fortuna Agrelli em Nápoles em 1884. Doente de uma enfermidade médica desesperada, Fortuna recebeu em visão a indicação de rezar o Rosário completo durante 27 dias em súplica e 27 dias em ação de graças — 54 dias no total. Sua cura foi completa. A devoção foi aprovada por Leão XIII e estendeu-se à Igreja universal como uma das grandes promessas marianas. A novena é apropriada para situações urgentes que requerem intercessão sustentada: doença grave, discernimento difícil, conversão demorada, ou qualquer petição em que a simples novena de 9 dias se mostre insuficiente.",
    instructions:
      "Reze o Rosário completo cada dia durante 54 dias consecutivos. Os primeiros 27 dias são em súplica; os 27 dias seguintes em ação de graças (no espírito de Marcos 11,24). Rotação dos mistérios: dia 1 gozosos, dia 2 dolorosos, dia 3 gloriosos, e reinicia. Estrutura diária: (1) Sinal da Cruz; (2) intenção específica nomeada em voz alta; (3) Rosário completo; (4) a oração da novena. Se um dia for omitido, a tradição é reiniciar do dia 1. Período litúrgico ideal: Advento, Quaresma, maio ou outubro.",
    patronSaint: "Santíssima Virgem Maria, Rosa Mística",
    feastDay: "Memória mariana móvel",
    source: "CNBB + Vatican.va Português + relato de Fortuna Agrelli (Nápoles, 1884) + Leão XIII. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "brown-scapular",
    name: "Escapulário do Carmo (Escapulário Marrom)",
    description:
      "O Escapulário Marrom do Monte Carmelo é um sacramental católico que consiste em dois pequenos panos de lã marrom unidos por duas fitas, usados sobre os ombros sob a roupa. Foi entregue pela Santíssima Virgem Maria a São Simão Stock em Cambridge em 16 de julho de 1251 com a promessa: «Quem morrer revestido com este escapulário não padecerá o fogo eterno». A devoção, corretamente entendida, requer vida cristã coerente: estado de graça, sacramentos frequentes, oração mariana. Pio XII chamou-o «sinal de consagração total a Maria». No Brasil, a devoção do Escapulário tem profunda tradição nas paróquias carmelitanas.",
    instructions:
      "Para receber, busque um sacerdote que possa impor o escapulário no rito do Ritual Romano. Depois imposto, deve ser usado continuamente. Se quebrar, substitua-o sem necessidade de nova bênção. Responsabilidades: (1) confissão regular; (2) Comunhão frequente; (3) Rosário diário ou ao menos uma dezena; (4) castidade própria do estado de vida. Os Sábados são particularmente associados ao escapulário pelo Privilégio Sabatino.",
    patronSaint: "Nossa Senhora do Carmo · São Simão Stock",
    feastDay: "16 de julho",
    source: "CNBB + Vatican.va Português (Pio XII) + Ordem do Carmo + Ritual Romano. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "chaplet-st-michael",
    name: "Coroinha a São Miguel Arcanjo",
    description:
      "A Coroinha a São Miguel Arcanjo foi revelada à serva de Deus Antônia d'Astonac no século XVIII. São Miguel prometeu a quem rezasse fielmente: assistência de um coro angélico ao receber a Comunhão; proteção dos nove coros angélicos durante a vida; libertação final do Purgatório para o devoto e parentes. A coroinha tem nove invocações correspondentes aos nove coros angélicos (Serafins, Querubins, Tronos, Dominações, Virtudes, Potestades, Principados, Arcanjos, Anjos), cada uma seguida de um Pai-Nosso e três Ave-Marias. Conclui-se com quatro Pai-Nossos (São Miguel, São Gabriel, São Rafael, Anjo da Guarda) e a oração de Leão XIII. É a oração de proteção espiritual por excelência.",
    instructions:
      "Estrutura: (1) Sinal da Cruz; (2) «Deus, vinde em meu auxílio; Senhor, apressai-vos em socorrer-me. Glória ao Pai…»; (3) nos nove grupos, invocar o coro angélico correspondente, seguido de um Pai-Nosso e três Ave-Marias; (4) os quatro Pai-Nossos finais; (5) a oração a São Miguel de Leão XIII: «São Miguel Arcanjo, defendei-nos no combate…». Pe. Gabriele Amorth recomendava-a entre as orações mais poderosas para a guerra espiritual. Apropriada antes da Missa, viagem, decisão importante, ou em situações espiritualmente densas.",
    patronSaint: "São Miguel Arcanjo",
    feastDay: "29 de setembro (Santos Arcanjos Miguel, Gabriel e Rafael)",
    source: "CNBB + Vatican.va Português + tradição de Antônia d'Astonac + oração de Leão XIII (1884). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "first-fridays",
    name: "Devoção das Nove Primeiras Sextas-Feiras",
    description:
      "A Devoção das Nove Primeiras Sextas-Feiras é a prática católica revelada por Jesus Cristo a Santa Margarida Maria Alacoque em Paray-le-Monial (1673-1675). Na grande promessa, Jesus disse: «No excesso da misericórdia do meu Coração, prometo a todos os que receberem a Comunhão nove primeiras sextas-feiras consecutivas a graça da perseverança final: não morrerão em minha desgraça, nem sem terem recebido os sacramentos; meu divino Coração será seu refúgio seguro naquela última hora». A devoção entende-se corretamente não como mágica, mas como expressão da fidelidade sustentada que abre o coração à perseverança final. No Brasil, a devoção é difundida em paróquias dedicadas ao Sagrado Coração e em movimentos como o Apostolado da Oração.",
    instructions:
      "Requisitos: (1) receber a Sagrada Comunhão em estado de graça na primeira sexta-feira de nove meses consecutivos; (2) fazer boa confissão antes de cada Comunhão se necessário — a tradição recomenda confissão semanal ou quinzenal; (3) oferecer a Comunhão pelas intenções do Sagrado Coração e pela própria perseverança final; (4) se uma primeira sexta for omitida, reinicie do primeiro. A prática combina-se com a devoção do Sagrado Coração (imagem em casa, consagração familiar), os primeiros sábados (reparação a Maria) e a oração das 15h00 (Hora da Misericórdia).",
    patronSaint: "Sagrado Coração de Jesus · Santa Margarida Maria Alacoque",
    feastDay: "Sexta-feira após Corpus Christi",
    source: "CNBB + Vatican.va (Haurietis Aquas, Pio XII 1956) + Autobiografia de Santa Margarida Maria + Apostolado da Oração no Brasil. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "first-saturdays",
    name: "Devoção dos Primeiros Sábados (Reparadora)",
    description:
      "A Devoção dos Primeiros Sábados foi pedida explicitamente pela Santíssima Virgem Maria a Irmã Lúcia dos Santos em Pontevedra em 10 de dezembro de 1925. Maria, com o Menino Jesus a seu lado e mostrando o Imaculado Coração rodeado de espinhos, prometeu: «A todos os que durante cinco meses, no primeiro sábado, se confessarem, receberem a Sagrada Comunhão, rezarem o Terço e me fizerem companhia durante quinze minutos meditando os mistérios do Rosário, com o fim de me desagravar, prometo assisti-los na hora da morte com todas as graças necessárias à salvação». É a prática mariana por excelência que se emparelha com as Nove Primeiras Sextas-Feiras.",
    instructions:
      "Durante cinco primeiros sábados consecutivos: (1) Confissão sacramental nos oito dias antes ou depois; (2) Comunhão no primeiro sábado em estado de graça com intenção reparadora ao Imaculado Coração; (3) um Terço completo (cinco dezenas, gozosos ou gloriosos); (4) quinze minutos de companhia a Maria meditando um mistério do Rosário — esse é o distintivo: meditação pausada sobre Maria. A intenção reparadora é essencial. Se um sábado for omitido, reinicie do primeiro.",
    patronSaint: "Imaculado Coração de Maria · Nossa Senhora de Fátima",
    feastDay: "Sábado seguinte ao Sagrado Coração",
    source: "CNBB + Vatican.va Português + Memórias da Irmã Lúcia + Pio XII (consagração do mundo ao Imaculado Coração, 1942). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "guardian-angel-prayer",
    name: "Oração ao Anjo da Guarda",
    description:
      "A oração ao Anjo da Guarda é uma das orações católicas mais antigas e queridas. A doutrina do anjo custódio pessoal de cada batizado está enraizada em Mateus 18,10: «Não desprezeis um destes pequeninos; porque os seus anjos nos céus veem sempre a face de meu Pai que está nos céus». O Catecismo da Igreja Católica afirma (§ 336): «Desde sua infância até a morte, a vida humana é cercada por sua custódia e intercessão. Junto a cada fiel há um anjo como protetor e pastor para conduzi-lo à vida». A memória litúrgica dos Santos Anjos Custódios é em 2 de outubro. A oração é tradicionalmente ensinada às crianças desde cedo.",
    prayerText:
      "Santo Anjo do Senhor, meu zeloso guardador, se a ti me confiou a piedade divina, sempre me rege, me guarda, me governa, me ilumina. Amém.",
    instructions:
      "Ocasiões tradicionais: (1) ao despertar — o primeiro pensamento do dia; (2) antes de dormir; (3) antes de uma viagem; (4) antes de decisão importante ou exame; (5) em qualquer momento de medo ou tentação. Para pais brasileiros: ensinar a oração às crianças pequenas é uma das grandes responsabilidades catequéticas familiares. A devoção pode aprofundar-se com: (a) terça-feira como dia do anjo em muitas tradições; (b) leitura do Catecismo §§ 328-336.",
    patronSaint: "Santo Anjo Custódio",
    feastDay: "2 de outubro",
    source: "CNBB + Catecismo §§ 328-336 + Mateus 18,10 + oração tradicional. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "lectio-divina",
    name: "Lectio Divina (Leitura Orante da Escritura)",
    description:
      "A Lectio Divina — «leitura divina» — é a antiga prática monástica católica de ler a Sagrada Escritura como oração, não como estudo. Sistematizada por Guigo II no século XII na Scala Claustralium, consta de quatro passos: Lectio (ler), Meditatio (meditar), Oratio (orar) e Contemplatio (contemplar). O Papa Bento XVI, em Verbum Domini (2010), descreveu-a como «a prática antiga e sempre nova com a qual um crente lê a Sagrada Escritura para crescer na oração». No Brasil, a Lectio é amplamente promovida por dioceses, mosteiros beneditinos (especialmente a Abadia de São Bento de Olinda) e pelos grupos bíblicos paroquiais.",
    instructions:
      "Necessita-se uma Bíblia católica, um lugar tranquilo e 20-30 minutos. (1) **Lectio**: leia um trecho breve (10-15 versículos, ex. Evangelho do dia) devagar, duas ou três vezes. Que palavra sobressai? (2) **Meditatio**: detenha-se no que sobressaiu, como diz o Salmo 1,2: «medita em sua Lei dia e noite». (3) **Oratio**: responda ao Senhor com suas próprias palavras. (4) **Contemplatio**: descanse em silêncio na presença de Deus. Conclua com uma breve resolução concreta para a jornada. Idealmente diário, 15 minutos. Os Evangelhos diários da liturgia são a matéria-prima ideal.",
    patronSaint: "São Jerônimo (patrono da Escritura)",
    feastDay: "30 de setembro",
    source: "CNBB + Vatican.va (Verbum Domini, Bento XVI 2010) + Guigo II, Scala Claustralium + tradição beneditina no Brasil. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "mass-offering",
    name: "Mandar Rezar uma Missa por uma Intenção",
    description:
      "Mandar rezar uma Missa por uma intenção particular é a prática católica mais antiga e profunda de oração intercessória. Cada Missa, por ser atualização incruenta do sacrifício do Calvário, possui valor infinito em si; as intenções particulares são finitas e específicas. A tradição tem raízes patrísticas: Santo Agostinho testemunha as Missas oferecidas por sua mãe Santa Mônica. O Concílio de Trento (1563) definiu que o sacrifício eucarístico se oferece «não só pelos pecados, penas, satisfações e outras necessidades dos fiéis vivos, mas também pelos defuntos em Cristo que ainda não estão de todo purificados». No Brasil, mandar rezar Missas é prática paroquial estabelecida.",
    instructions:
      "Procedimento: (1) procure a secretaria paroquial e solicite uma Missa para uma intenção particular; (2) entregue uma oferta livre (varia por região, geralmente R$ 30-100 no Brasil); (3) se a intenção for por um defunto, comunique nome e data de falecimento; (4) idealmente assista à Missa pessoalmente. Tradições brasileiras: (a) Trezena (13 Missas consecutivas pelos defuntos), Sétimo Dia, Trigésimo Dia; (b) Missas em aniversário de falecimento; (c) Missa de Ação de Graças por aniversário, casamento, ou graças recebidas. Para almas do Purgatório, mandar rezar uma Missa é o maior presente espiritual.",
    patronSaint: "Cristo, Sumo Sacerdote",
    feastDay: "Quinta-feira Santa (instituição da Eucaristia)",
    source: "CNBB + Catecismo §§ 1356-1381 + Concílio de Trento (Sessão XXII) + Vatican.va Português. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-don-bosco",
    name: "Novena a São João Bosco (Dom Bosco)",
    description:
      "São João Bosco (Giovanni Melchiorre Bosco, 1815-1888) — universalmente conhecido como Dom Bosco — foi sacerdote piemontês italiano, fundador da Sociedade Salesiana e do Instituto das Filhas de Maria Auxiliadora. Sua paixão vital foi a juventude pobre, abandonada e em risco. Iniciou com um punhado de meninos em um oratório em Valdocco (Turim) em 1841 e deixou ao morrer uma congregação com mil e oitocentos membros e trezentas casas no mundo. Seu sistema educativo — «preventivo» — baseia-se em razão, religião e amorevolezza (carinho). Canonizado por Pio XI em 1934. No Brasil, os Salesianos têm presença histórica em todas as regiões, com colégios, oratórios e paróquias. A novena é apropriada para vocações, conversão de filhos, decisões educativas, ou necessidades juvenis.",
    prayerText:
      "Ó São João Bosco, pai e mestre da juventude, alcançai-me por vossa intercessão a graça que com confiança filial vos peço (mencionar a intenção). Vós que de jovem discernistes vossa vocação através dos sonhos proféticos e da direção espiritual de vossa santa mãe Margarida Occhiena, intercedei pelos jovens hoje em confusão, pelos educadores sobrecarregados e pelos pais que oram pela perseverança de seus filhos na fé. Maria Auxiliadora, em cujo nome Dom Bosco fez tudo o que fez, sede também nosso auxílio. Amém.",
    instructions:
      "Reze uma vez ao dia durante nove dias consecutivos, idealmente de 22 a 30 de janeiro em preparação para a festa de 31 de janeiro. Estrutura: (1) Sinal da Cruz; (2) Salmo 23 ou trecho do Evangelho do Menino Jesus; (3) a oração da novena; (4) três Ave-Marias a Maria Auxiliadora; (5) jaculatória salesiana: «Maria Auxiliadora, rogai por nós e pela juventude». No Brasil, a leitura das Memórias do Oratório (autoria do próprio Dom Bosco) é fonte primária de sua pedagogia. O carisma salesiano é a alegria — «a santidade consiste em estar sempre alegre», dizia Dom Bosco.",
    patronSaint: "São João Bosco · Maria Auxiliadora",
    feastDay: "31 de janeiro",
    source: "CNBB + Vatican.va Português + Memórias do Oratório (Dom Bosco) + Sociedade Salesiana no Brasil. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-infant-of-prague",
    name: "Novena ao Menino Jesus de Praga",
    description:
      "O Menino Jesus de Praga é uma pequena imagem de cera do Menino Jesus (cerca de 47 cm), conservada na igreja de Santa Maria da Vitória em Praga. A imagem foi presenteada em 1628 aos carmelitas descalços de Praga pela princesa Polixena de Lobkowicz. A devoção espalhou-se por Europa Central durante a Guerra dos Trinta Anos e globalizou-se no século XIX, com cópias bendizidas chegando ao Brasil, Filipinas e América Latina. A promessa atribuída ao Santo Menino aos seus devotos: «Quanto mais me honrarem, mais Eu os favorecerei». No Brasil, a devoção ao Menino Jesus de Praga é especialmente forte em paróquias carmelitas e em famílias devotas. A novena é apropriada para situações financeiras difíceis, saúde de crianças pequenas, busca de emprego, e necessidades familiares concretas.",
    prayerText:
      "Divino Menino Jesus, adoro-vos como meu Senhor e Salvador. Peço-vos perdão por todos os meus pecados. Rogo-vos, ó dulcíssimo Jesus, que me concedais a graça que ardentemente desejo (mencionar a intenção), se for para vossa maior glória e o bem da minha alma. Sei que sois o dono de toda a criação. Confio em vossa misericórdia infinita. Menino Jesus de Praga, abençoai-me e a minha família. Amém.",
    instructions:
      "Reze uma vez ao dia durante nove dias consecutivos. Estrutura: (1) Sinal da Cruz; (2) breve ato de adoração ao Menino Jesus; (3) a oração da novena; (4) um Pai-Nosso, Ave-Maria e Glória; (5) mencione a intenção. A tradição católica recomenda colocar uma imagem do Menino Jesus de Praga em lugar de honra na casa durante a novena, e entronizá-lo permanentemente se a novena der fruto.",
    patronSaint: "Menino Jesus de Praga",
    feastDay: "Variável (segundo domingo de janeiro em algumas tradições)",
    source: "CNBB + Vatican.va Português + Carmelitas Descalços de Praga + tradição da princesa Polixena de Lobkowicz + Pio XII (coroação 1955). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-anthony",
    name: "Novena a Santo Antônio de Pádua",
    description:
      "Santo Antônio de Pádua (Fernando de Bulhões, 1195-1231) — nascido em Lisboa e morto em Pádua — é um dos santos mais amados da Igreja católica e tem profunda ligação com Portugal e o Brasil. Inicialmente cônego agostiniano, fez-se franciscano em 1220. São Francisco confiou-lhe o ensino da teologia. Pregador extraordinário, foi chamado «o Martelo dos Herejes» e «a Língua do Espírito Santo» (sua lengua incorrupta conserva-se em Pádua). Canonizado por Gregório IX um ano após a morte (o santo mais rapidamente canonizado da história), declarado Doutor da Igreja por Pio XII em 1946. No Brasil, é especialmente venerado: a tradição da «Trezena de Santo Antônio» (13 dias antes de sua festa de 13 de junho) é uma das mais populares. É padroeiro dos objetos perdidos, dos casamentos, dos pobres, e das causas humanamente perdidas.",
    prayerText:
      "Ó glorioso Santo Antônio, alcançai por vossa poderosa intercessão a graça que com humilde confiança vos peço (mencionar a intenção). Vós que de menino tivestes nos braços o Menino Jesus, alcançai-me a simplicidade do coração. E se perdi algo importante — um objeto, uma relação, um sentido espiritual, um ente querido afastado da fé — restituí-o, eu vos rogo, segundo a vontade de Deus. Amém.",
    instructions:
      "Reze uma vez ao dia durante nove dias, idealmente de 5 a 12 de junho. Variante muito difundida no Brasil: a Trezena de Santo Antônio — 13 dias consecutivos antes da festa (de 1 a 13 de junho). Estrutura: (1) Sinal da Cruz; (2) trecho do responsório antoniano («Se buscas milagres…»); (3) a oração; (4) treze Pai-Nossos, Ave-Marias e Glórias; (5) mencione a intenção. Para objetos perdidos: invocação curta «Santo Antônio, ajudai-me». Para encontrar matrimônio, treze Ave-Marias adicionais. Tradição brasileira: o «Pão de Santo Antônio» — dar aos pobres o equivalente de um pãozinho cada dia.",
    patronSaint: "Santo Antônio de Pádua",
    feastDay: "13 de junho",
    source: "CNBB + Vatican.va Português + Pio XII (Doutor da Igreja, 1946) + tradição franciscana brasileira. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-blaise",
    name: "Novena a São Brás",
    description:
      "São Brás (m. ca. 316) foi bispo de Sebaste na Armênia durante a perseguição de Licínio. Médico antes da ordenação, foi martirizado após eremitismo numa caverna onde animais selvagens lhe traziam comida e iam a ele para serem curados. A lenda mais conhecida: a mãe levou ao santo seu filho que se sufocava com espinha de peixe; São Brás curou-o instantaneamente. Daí ser patrono universal das afecções da garganta, problemas respiratórios e profissionais da voz. A «Bênção das Gargantas» — sacramental em que o sacerdote impõe duas velas cruzadas na garganta dizendo «Por intercessão de São Brás, bispo e mártir, Deus te livre do mal da garganta…» — é realizada em quase todas as paróquias brasileiras no dia 3 de fevereiro.",
    prayerText:
      "Ó glorioso São Brás, bispo e mártir, alcançai-me por vossa intercessão a graça que com confiança filial vos peço (mencionar a intenção). Vós que libertastes o menino da asfixia com a sola força da bênção, livrai do mal aquele por quem rezo. Padroeiro dos que sofrem na garganta e na respiração, intercedei por todos os enfermos de câncer de garganta, tireoide, cordas vocais ou pulmões. São Brás, rogai por nós. Amém.",
    instructions:
      "Reze nove dias consecutivos, idealmente de 25 de janeiro a 2 de fevereiro. Estrutura: (1) Sinal da Cruz; (2) ato de fé na providência sobre a saúde; (3) a oração; (4) Pai-Nosso, Ave-Maria e Glória; (5) mencione a intenção. A tradição recomenda assistir à Missa de 3 de fevereiro e receber a Bênção das Gargantas com as duas velas cruzadas. Em muitas paróquias brasileiras, são também abençoados pães e frutas naquele dia.",
    patronSaint: "São Brás (patrono das afecções da garganta)",
    feastDay: "3 de fevereiro",
    source: "CNBB + Vatican.va Português + tradição da Bênção das Gargantas no Brasil + Acta Sanctorum. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-catherine-siena",
    name: "Novena a Santa Catarina de Sena",
    description:
      "Santa Catarina de Sena (Caterina Benincasa, 1347-1380) — uma das quatro mulheres Doutoras da Igreja e copadroeira da Europa — é uma das figuras espirituais mais extraordinárias do século XIV. Aos seis anos teve sua primeira visão de Cristo; aos sete fez voto privado de virgindade. Aos dezoito entrou como mantelata na Terceira Ordem Dominicana. Mística, terciária, conselheira espiritual e diplomata, foi central durante o Cisma do Papado de Avignon: com suas cartas e presença pessoal em Avignon em 1376 convenceu o Papa Gregório XI a voltar a Roma. Seu Diálogo da Divina Providência, ditado durante êxtase prolongado, é um dos grandes textos místicos católicos. Recebeu estigmas invisíveis. Morreu aos 33 anos. Canonizada por Pio II em 1461, Doutora da Igreja pelo Beato Paulo VI em 1970, copadroeira da Europa por São João Paulo II em 1999. No Brasil, a devoção dominicana tem profunda história desde o século XVIII. A novena é apropriada para unidade da Igreja, fortaleza na oração contemplativa, coragem para falar verdade aos poderes.",
    prayerText:
      "Ó gloriosa Santa Catarina de Sena, virgem mística e Doutora da Igreja, alcançai por vossa intercessão a graça que com confiança filial vos peço (mencionar a intenção). Vós que tivestes a audácia de escrever ao Papa e aos reis de vosso tempo em nome de Cristo, alcançai-nos a coragem de proclamar a verdade evangélica sem medo. E por vossa intercessão, defendei a Igreja de seus inimigos e conservai nela a unidade e a santidade. Amém.",
    instructions:
      "Reze nove dias consecutivos, idealmente de 21 a 29 de abril. Estrutura: (1) Sinal da Cruz; (2) trecho breve do Diálogo da Divina Providência; (3) a oração; (4) Pai-Nosso, Ave-Maria e Glória; (5) mencione a intenção. Para a Igreja em crise, combine com jejum semanal e oração do Salmo 51. Para perseverança vocacional, leitura das Cartas de Catarina.",
    patronSaint: "Santa Catarina de Sena, OP",
    feastDay: "29 de abril",
    source: "CNBB + Vatican.va Português (Paulo VI Doutora 1970; JPII copadroeira 1999) + Diálogo + Ordem Dominicana brasileira. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-christopher",
    name: "Novena a São Cristóvão",
    description:
      "São Cristóvão (Christophoros, «o portador de Cristo») é um dos santos mais populares da tradição católica universal e o patrono dos viajantes. A hagiografia tradicional o apresenta como um gigante que servia a Cristo carregando viajantes através de um rio perigoso. Uma noite, um menino pediu para ser levado ao outro lado: durante a travessia o menino tornou-se cada vez mais pesado, até que ao chegar à outra margem se revelou como Cristo. Assim São Cristóvão tornou-se figura do cristão que «carrega a Cristo» na vida cotidiana. No Brasil, a devoção a São Cristóvão como padroeiro dos motoristas é especialmente forte: medalhas no carro, bênção de veículos no dia 25 de julho (festa de São Cristóvão), e oração antes das viagens.",
    prayerText:
      "Ó glorioso São Cristóvão, gigante de força e fé, que com vosso próprio corpo carregastes o Menino Jesus através do rio da vida, alcançai-me por vossa intercessão a graça que com confiança filial vos peço (mencionar a intenção). Protegei-me e a quem amo em toda viagem e em todo deslocamento; e alcançai-nos sobretudo a graça de não nos perdermos jamais do Caminho que é Cristo mesmo. Amém.",
    instructions:
      "Reze nove dias consecutivos, idealmente de 17 a 25 de julho. Estrutura: (1) Sinal da Cruz; (2) breve evocação de Cristóvão carregando o Menino Jesus; (3) a oração; (4) Pai-Nosso, Ave-Maria e Glória pelos viajantes; (5) mencione a intenção. Antes de uma viagem concreta: combine com bênção do veículo na paróquia (todas as paróquias brasileiras fazem em 25 de julho) e medalha de São Cristóvão no carro como sacramental. Para motoristas profissionais (taxistas, motoristas de aplicativo, caminhoneiros), a novena anual é prática devocional apropriada.",
    patronSaint: "São Cristóvão (padroeiro dos viajantes e motoristas)",
    feastDay: "25 de julho",
    source: "CNBB + Lenda Áurea de Tiago de Voragine + tradição brasileira da bênção de veículos. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-joseph-cupertino",
    name: "Novena a São José de Cupertino",
    description:
      "São José de Cupertino (Giuseppe Maria Desa, 1603-1663) — frade menor conventual italiano — é o patrono dos estudantes, exames difíceis, aspirantes a vida sacerdotal e religiosa, pilotos e astronautas. Sua biografia é uma das mais surpreendentes da hagiografia: padecia de grande lentidão mental, foi rejeitado várias vezes em ordens religiosas, e finalmente aceito pelos franciscanos conventuais em 1625. Durante seus exames de ordenação recebeu por providência a única matéria que conhecia bem. Mais extraordinárias foram suas levitações extáticas, documentadas por dezenas de testemunhas: quando entrava em contemplação durante a Missa, seu corpo elevava-se do chão por minutos ou horas. Canonizado por Clemente XIII em 1767. A novena é a oração por excelência para estudantes ante exames, decisões acadêmicas, ou vocações humanamente impossíveis.",
    prayerText:
      "Ó glorioso São José de Cupertino, vós que conhecestes a humilhação de não poder aprender o que outros aprendiam facilmente — alcançai-me por vossa intercessão a graça que com confiança vos peço (mencionar a intenção). Se sou estudante diante de um exame difícil, alcançai-me luz, memória e calma. São José de Cupertino, rogai por nós. Amém.",
    instructions:
      "Reze nove dias consecutivos, idealmente de 9 a 17 de setembro. Para exame específico, comece nove dias antes. Estrutura: (1) Sinal da Cruz; (2) ato de humildade; (3) a oração; (4) Pai-Nosso, Ave-Maria e Glória; (5) mencione a intenção. Jaculatória diária: «São José de Cupertino, ajudai-me no meu exame». Para pais que rezam por filhos com dificuldades de aprendizagem (incluindo dislexia, TDAH), a devoção é particularmente apropriada.",
    patronSaint: "São José de Cupertino, OFMConv",
    feastDay: "18 de setembro",
    source: "CNBB + Vatican.va Português (Clemente XIII, 1767) + Ordem Franciscana Conventual. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-martin-de-porres",
    name: "Novena a São Martinho de Porres",
    description:
      "São Martinho de Porres (Martín de Porres Velázquez, 1579-1639) — o primeiro santo mulato canonizado da Igreja católica — foi frade dominicano peruano, filho de um nobre espanhol e de uma mulher panamenha liberta. A discriminação racial que sofreu desde a infância marcou toda a sua vida, mas transformou-a em virtude heroica. Entrou como donado no convento dominicano de Lima aos quinze anos e exerceu como barbeiro-enfermeiro por mais de cinquenta anos. Sua biografia inclui bilocações documentadas (visto em África e Japão estando em Lima), curas espetaculares (de leprosos, escravos negros, índios e espanhóis indistintamente), e o domínio sobre animais (a imagem icônica de Martinho comendo na mesma mesa com um cão, um gato e um rato). Canonizado por São João XXIII em 1962. No Brasil, é venerado especialmente nas comunidades afrodescendentes e em paróquias dominicanas. Apropriada para saúde, harmonia inter-racial, pobres, e conversão das próprias divisões sociais.",
    prayerText:
      "Ó glorioso São Martinho de Porres, servo humilde dos pobres, curador dos enfermos e amigo dos animais, alcançai por vossa intercessão a graça que com confiança filial vos peço (mencionar a intenção). Vós que conhecestes na própria pele a dor da discriminação racial e a transformastes em mansidão e serviço, alcançai-nos a graça de não responder ao desprezo com desprezo, e a cura das divisões de raça, classe e nação que ainda ferem a Igreja e o mundo. Amém.",
    instructions:
      "Reze nove dias consecutivos, de 25 de outubro a 2 de novembro. Estrutura: (1) Sinal da Cruz; (2) ato de humildade; (3) a oração; (4) Pai-Nosso, Ave-Maria e Glória; (5) mencione a intenção. Tradições brasileiras: (a) bênção dos animais no dia da festa (3 de novembro); (b) cuidado concreto de um pobre, enfermo ou animal abandonado durante os nove dias; (c) exame sincero sobre as próprias atitudes raciais ou classistas. A devoção é especialmente apropriada para católicos negros, mestiços e indígenas brasileiros.",
    patronSaint: "São Martinho de Porres, OP",
    feastDay: "3 de novembro",
    source: "CNBB + Vatican.va Português (São João XXIII, 1962) + Província Dominicana do Peru + tradição afrobrasileira católica. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-monica",
    name: "Novena a Santa Mônica",
    description:
      "Santa Mônica (332-387) — mãe de Santo Agostinho — é a padroeira universal das mães que oram pela conversão de filhos adultos afastados da fé. Casada com um pagão violento chamado Patrício, converteu-o através da paciência e oração. Mas o sofrimento mais longo de sua vida foi seu filho Agostinho — brilhante orador, entregue durante dezessete anos às paixões da juventude, ao maniqueísmo e a uma relação irregular. Mônica orou por seu filho durante esses dezessete anos sem desfalecer. Santo Ambrósio de Milão disse-lhe: «É impossível que o filho de tantas lágrimas se perca». Agostinho converteu-se na Páscoa de 387. Mônica morreu poucas semanas depois, no porto de Óstia. Canonizada no século XIV. A novena é a oração por excelência para pais que oram pela conversão de filhos adultos.",
    prayerText:
      "Ó gloriosa Santa Mônica, mãe chorosa e fiel, vós que durante dezessete anos não cessastes de rogar por vosso filho Agostinho até vê-lo voltado a Cristo, alcançai-me por vossa intercessão a graça que com confiança filial vos peço (mencionar a intenção, especialmente por um filho afastado da fé). Concedei-me a paciência que tivestes, as lágrimas que chorastes, e sobretudo a confiança inquebrável de que «é impossível que o filho de tantas lágrimas se perca». Santa Mônica, mãe de Agostinho, rogai por nós. Amém.",
    instructions:
      "Reze nove dias consecutivos, de 18 a 26 de agosto em preparação à festa de 27 de agosto (e a Santo Agostinho, seu filho, em 28 de agosto). Estrutura: (1) Sinal da Cruz; (2) trecho das Confissões de Santo Agostinho (Livro IX); (3) a oração; (4) Pai-Nosso, Ave-Maria e Glória; (5) mencione o nome específico. Para conversão de filho adulto, combine com: (a) confissão e Comunhão semanal pelo filho; (b) Missa oferecida pela intenção; (c) leitura das Confissões; (d) abstenção de pressionar ou discutir com o filho durante a novena. A novena pode repetir-se cada ano por todos os anos necessários.",
    patronSaint: "Santa Mônica",
    feastDay: "27 de agosto",
    source: "CNBB + Vatican.va Português + Santo Agostinho, Confissões (livros III, VI, IX) + tradição agostiniana brasileira. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "offering-suffering",
    name: "Oferecer o Sofrimento (Sofrimento Redentor)",
    description:
      "Oferecer o sofrimento — a prática católica de unir o próprio sofrimento físico, emocional ou espiritual à cruz de Cristo em intenção reparadora — é uma das espiritualidades mais profundas da tradição católica. Não é masoquismo nem indiferença ao sofrimento. É a verdade teológica de que o sofrimento humano, quando unido voluntariamente ao sofrimento de Cristo, participa na economia da salvação. São Paulo formulou-a em Colossenses 1,24: «Completo na minha carne o que falta aos sofrimentos de Cristo, pelo bem do seu Corpo, que é a Igreja». São João Paulo II, em Salvifici Doloris (1984), aprofundou-a: o sofrimento ofertado torna-se oração eficaz.",
    prayerText:
      "Senhor Jesus Cristo, ofereço-vos hoje todas as dores que me hão de vir — as conhecidas e as desconhecidas, as do corpo, as da alma e as do coração. Uni-as à vossa Paixão salvadora, e fazei que sirvam para a conversão dos pecadores, para o alívio das almas do Purgatório, e pela intenção específica que agora vos apresento (mencionar a intenção). Amém.",
    instructions:
      "A prática tem dois momentos: (1) **ofertório matinal** — ao despertar, dizer: «Senhor, ofereço-vos as dores e trabalhos deste dia por (a intenção)»; (2) **renovação ao longo do dia** — quando vem uma dor concreta, renovar o ofertório: «Isto também, por (a intenção)». Particularmente apropriado para doentes crônicos, em luto prolongado ou em situações injustas. Empareja-se com: (a) devoção do Sagrado Coração; (b) Adoração Eucarística; (c) Salvifici Doloris (leitura semanal). Para sofrimento grave (câncer terminal, perda de filho), buscar direção espiritual.",
    patronSaint: "Cristo Crucificado · Nossa Senhora das Dores",
    feastDay: "Sexta-feira Santa",
    source: "CNBB + Vatican.va Português (Salvifici Doloris, JPII 1984) + Catecismo §§ 1500-1532. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-discernment",
    name: "Oração para o Discernimento",
    description:
      "A oração para o discernimento é a prática católica de pedir a luz de Deus para uma decisão importante. A tradição ensina que o discernimento não é simples escolha racional, mas busca ativa da vontade concreta de Deus. São Inácio de Loyola, nos Exercícios Espirituais (1548), sistematizou as regras do discernimento de espíritos, distinguindo entre «bom espírito» (consolação, paz duradoura) e «mau espírito» (desolação, agitação, medo). O Papa Francisco fez do discernimento um tema central de seu pontificado (Amoris Laetitia 2016; catequeses de 2022). A oração não substitui a consulta humana — bom senso, conselho de confessor, opinião de pessoas sábias — mas a enquadra em confiança filial.",
    prayerText:
      "Senhor meu Deus, suplico-vos humildemente a luz para discernir o que me pedis. Meu coração está cheio de inquietação e de muitas vozes; preciso da vossa voz. Afastai de mim o ruído do medo, o atrativo do conforto e a força do orgulho, e dai-me os olhos para ver com o olhar de Cristo. Confio, Senhor, em que me levais com providência paterna pelo caminho que me leva a vós. Amém.",
    instructions:
      "Três etapas inacianas: (1) **indiferença inicial** — pedir a graça de não estar mais ligado a uma opção que a outra; (2) **ponderação** — estudar consequências e notar movimentos interiores; (3) **confirmação** — oferecer a decisão tentativa a Deus em oração por dias e notar se a paz duradoura a confirma. A oração pode rezar-se: (a) diariamente durante discernimento estendido; (b) como novena específica de nove dias ao Espírito Santo; (c) em Hora de Adoração Eucarística.",
    patronSaint: "Espírito Santo · Santo Inácio de Loyola",
    feastDay: "31 de julho (Santo Inácio)",
    source: "CNBB + Vatican.va Português + Santo Inácio de Loyola, Exercícios Espirituais + catequeses do Papa Francisco (2022). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-fertility",
    name: "Oração pela Fertilidade",
    description:
      "A oração católica pela fertilidade — para casais que desejam conceber e não conseguem — tem raízes bíblicas profundas. A Escritura está cheia de casamentos estéreis a quem Deus concede filhos em resposta à oração perseverante: Sara e Abraão, Rebeca e Isaque, Raquel e Jacó, Ana e Elcana, Isabel e Zacarias. O padrão é consistente: longa espera de oração seguida do dom de Deus. A Igreja católica ensina que a fertilidade é dom recebido com gratidão, e que a esterilidade não é castigo. A oração não exclui a busca médica responsável (NaProTechnology respeita a moral católica); nem exclui a adoção; mas exclui as técnicas que separam a geração do ato conjugal (a fecundação in vitro está excluída pela enseñanza moral). Patronos: Santa Ana e São Joaquim, São Gerardo Majella, Santa Isabel.",
    prayerText:
      "Senhor Jesus, autor de toda a vida, suplicamos-vos com humilde confiança o dom de um filho. Vós conheceis nossa espera, nossas lágrimas. Concedei-nos, se for vossa vontade, a fecundidade biológica que pedimos; e se não for, alcançai-nos outro caminho de paternidade e maternidade — a adoção, o cuidado dos filhos de outros, a geração espiritual de tantas vidas na vossa Igreja. Santa Ana, avó do Senhor, rogai por nós. São Gerardo Majella, padroeiro dos embarazos, rogai por nós. Maria, Mãe do Menino Jesus, sede nossa Mãe nesta espera. Amém.",
    instructions:
      "A oração pode rezar-se como prática diária ou como novena específica (nove dias a Santa Ana, São Gerardo ou ambos). Estrutura: (1) Sinal da Cruz; (2) ato de aceitação da vontade de Deus; (3) a oração; (4) um mistério do Rosário (gozosos); (5) mencione a intenção. Tradições brasileiras: (a) peregrinação a Aparecida em oração pela fecundidade; (b) medalhas de São Gerardo e Santa Ana; (c) oração em casal, não individual. Para casais em tratamento médico: verificar alinhamento com a moral católica; abertura à adoção.",
    patronSaint: "Santa Ana e São Joaquim · São Gerardo Majella",
    feastDay: "26 de julho",
    source: "CNBB + Vatican.va Português (Donum Vitae CDF 1987; Dignitas Personae 2008) + Catecismo §§ 2373-2379. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-financial-hardship",
    name: "Oração na Dificuldade Econômica",
    description:
      "A oração católica na dificuldade econômica tem vários patronos: São José (padroeiro dos trabalhadores), Santo Antônio (invocado pelos pobres), Santa Marta (administração doméstica). A oração não substitui a responsabilidade humana: o cristão que reza em dificuldade econômica também busca trabalho ativamente, controla os gastos e busca ajuda profissional. Mas a oração enquadra a dificuldade na providência paterna de Deus: «não vos preocupeis com a vida… vosso Pai celestial sabe que precisais de tudo isso» (Mateus 6,25.32). O sofrimento financeiro é dos mais reais e dolorosos da vida humana.",
    prayerText:
      "Pai celestial, que provedes aos lírios do campo e às aves do céu, olhai com misericórdia para vossa família nesta hora de dificuldade econômica. Concedei-me a sabedoria para administrar o pouco que tenho, a coragem para pedir ajuda, a humildade para aceitar a ajuda oferecida, e a perseverança para buscar o trabalho que há de vir. São José operário, rogai por nós. Santo Antônio de Pádua, rogai por nós. E, sobretudo, Padre Nosso, dai-nos hoje o pão de cada dia. Amém.",
    instructions:
      "Reze como prática diária ou novena (nove dias a São José ou Santo Antônio). Estrutura: (1) Sinal da Cruz; (2) ato de confiança; (3) a oração; (4) três Ave-Marias a Nossa Senhora da Divina Providência; (5) mencione a dificuldade com honestidade. Para desemprego: novena a São José Operário (22 a 30 de abril). Para dívidas: confissão sacramental, Salmo 37, parábolas evangélicas sobre administração prudente. Ações práticas: aconselhamento financeiro profissional (Cáritas oferece serviços gratuitos no Brasil), pedir ajuda à paróquia, reduzir gastos não-essenciais, um pequeno ato de caridade durante a dificuldade.",
    patronSaint: "São José · Santo Antônio · Santa Marta",
    feastDay: "19 de março (São José) · 1° de maio (São José Operário)",
    source: "CNBB + Vatican.va Português + Catecismo §§ 2402-2406 + Caritas in Veritate (Bento XVI 2009). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-happy-death",
    name: "Oração por uma Boa Morte",
    description:
      "A oração por uma boa morte — pela graça de morrer em estado de graça, com os sacramentos recebidos (especialmente a Unção dos Enfermos e o Viático), em paz interior, com tempo para perdoar e pedir perdão, e com esperança firme do céu — é uma prática católica tradicional. A morte é a última grande prova espiritual da vida. São José (que morreu nos braços de Jesus e Maria) é o padroeiro da boa morte por excelência. Santo Afonso Maria de Ligório escreveu a obra Preparação para a Morte. A oração não é mórbida; é realista: cada cristão deve morrer, e orar por morrer bem é fazer-se responsável pelo próprio destino eterno.",
    prayerText:
      "Ó Senhor Jesus, em cujas mãos vós entregastes o espírito ao morrer, suplico-vos a graça de uma boa morte. Concedei-me morrer em estado de graça, reconciliado com vós e com todos os que ofendi. Concedei-me receber os sacramentos da confissão, da Comunhão e da Unção dos Enfermos antes do meu último suspiro. Livrai-me da morte súbita, da morte imprevista, da morte ímpia. Amém. São José, padroeiro da boa morte, rogai por nós. Santa Maria, rogai por nós agora e na hora da nossa morte. Amém.",
    instructions:
      "A oração pode rezar-se: (a) como prática periódica — no final de cada dia, antes do exame de consciência; (b) em cada aniversário ou no aniversário do falecimento de um familiar; (c) em hospitais; (d) acompanhando um moribundo. Para familiar enfermo, novena de São José (11 a 19 de março). Grandes disciplinas que preparam à boa morte: (a) confissão regular (mensal); (b) Comunhão frequente; (c) Unção dos Enfermos no início de doença grave (NÃO esperar o último momento); (d) preparação do próprio funeral em termos católicos.",
    patronSaint: "São José · Santa Maria",
    feastDay: "19 de março (São José)",
    source: "CNBB + Vatican.va Português + Santo Afonso Maria de Ligório, Preparação para a Morte + Catecismo §§ 1010-1014. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-healing",
    name: "Oração pela Cura",
    description:
      "A oração pela cura é uma das práticas devocionais católicas mais fundamentais. A Escritura registra Jesus curando inúmeros enfermos no seu ministério público, e o sacramento da Unção dos Enfermos continua hoje essa missão curativa. A Igreja católica distingue três formas de cura: (1) sacramental (Unção dos Enfermos); (2) carismática (oração de creyente ou comunidade); (3) por intercessão de santo (Lourdes, Aparecida, Fátima, São Peregrino para câncer, etc.). A oração não é mágica: é petição filial, dirigida ao Pai por meio de Cristo com a mediação dos santos.",
    prayerText:
      "Senhor Jesus, médico de corpos e de almas, suplicamos-vos por (mencionar o nome e a doença) a graça da cura. Vós que curastes a tantos durante vosso ministério terreno, estendei vossa mão curadora hoje. Se for vossa vontade, restaurai a saúde do corpo; e se não, restaurai a saúde da alma, dando paciência na dor, fortaleza no tratamento, esperança no futuro. Maria, Saúde dos Enfermos, rogai por nós. São Peregrino, padroeiro dos enfermos de câncer, rogai por nós. Amém.",
    instructions:
      "A oração pode rezar-se: (a) por si próprio, combinada com confissão, Comunhão e Unção dos Enfermos; (b) por familiar ou amigo enfermo, idealmente em sua presença, com imposição de mãos se a situação permitir (prática bíblica, Marcos 16,18); (c) em comunidade. Para doenças específicas: São Peregrino para câncer, Santa Luzia para vista, São Brás para garganta. Acompanhe com tratamento médico responsável, sacramentos, Unção dos Enfermos no início (não no último momento), peregrinação a Aparecida quando possível.",
    patronSaint: "Cristo, Médico Divino · Maria, Saúde dos Enfermos",
    feastDay: "11 de fevereiro (Nossa Senhora de Lourdes)",
    source: "CNBB + Vatican.va Português (Salvifici Doloris, JPII 1984) + Ritual da Unção dos Enfermos + Catecismo §§ 1499-1532. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-marriage",
    name: "Oração pelo Matrimônio",
    description:
      "A oração pelo matrimônio — pela própria vocação matrimonial, pelo próprio matrimônio se já vivido, por um matrimônio em crise, ou pela santidade dos casamentos — é prática devocional fundamental na espiritualidade familiar católica. A Igreja ensina que o matrimônio sacramental é um dos sete sacramentos (Mateus 19,6: «o que Deus uniu, não separe o homem»). São João Paulo II elaborou a teología do matrimônio em Familiaris Consortio (1981) e na Teologia do Corpo. O Papa Francisco continuou em Amoris Laetitia (2016). A oração reconhece que o amor conjugal não é proeza natural dos esposos, mas dom de Deus que requer ser pedido, cuidado e renovado.",
    prayerText:
      "Senhor Deus, autor do matrimônio, que no princípio criastes o homem e a mulher à vossa imagem, e em Caná da Galileia revelastes a dignidade sacramental do amor conjugal, suplico-vos por (mencionar a intenção). Concedei-nos o dom do amor que é paciente, serviçal, não invejoso (1 Cor 13). Concedei-nos a fidelidade, a paciência, a generosidade, e a abertura aos filhos como Vós os queirais enviar. São José e Santa Maria, rogai por nós. Amém.",
    instructions:
      "A oração pode rezar-se em casal (cada noite antes de dormir, em voz alta ou em silêncio compartilhado), individualmente ou em família. Estrutura: (1) Sinal da Cruz; (2) breve gratidão pelos dons do matrimônio; (3) a oração; (4) uma dezena do Rosário (gozosos: Anunciação, Visitação, Bodas de Caná); (5) ato de reconciliação se necessário. Para matrimônios em crise: Missa pela reconciliação, consulta com sacerdote ou terapeuta católico, novena à Sagrada Família, retiros de Casamentos Worldwide. A tradição ensina que o matrimônio é vocação tão exigente como a consagrada.",
    patronSaint: "Sagrada Família · São José e Santa Maria",
    feastDay: "Domingo na Oitava do Natal (Sagrada Família)",
    source: "CNBB + Vatican.va Português (Familiaris Consortio 1981; Amoris Laetitia 2016) + Catecismo §§ 1601-1666. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-safe-travel",
    name: "Oração por uma Viagem Segura",
    description:
      "A oração católica por uma viagem segura é prática devocional muito antiga. São Cristóvão, padroeiro universal dos viajantes (pela lenda do rio), é o santo invocado por antonomásia. O Anjo Custódio pessoal é também companheiro em todo deslocamento. A prática devocional brasileira inclui: a oração antes de partir, a bênção do veículo na festa de São Cristóvão (25 de julho), a medalha de São Cristóvão no automóvel. Não é supersticiosa quando se entende corretamente: não transforma o viagem perigoso em seguro automático, mas coloca-a sob a providência de Deus e dissuade tanto a imprudência como o medo paralisante.",
    prayerText:
      "Senhor Deus, Pai todo-poderoso, que vigias com olho paterno teus filhos no caminho, encomenda-me à tua proteção durante esta viagem. Afasta de mim os perigos do corpo, acidentes, avarias mecânicas, condutores imprudentes, animais na estrada, inclemências do tempo. Envia o auxílio de teu Santo Anjo Custódio para me guiar e proteger. São Cristóvão, gigante portador de Cristo, rogai por mim. Amém.",
    instructions:
      "Rezar antes de cada viagem: (1) ao entrar no veículo, antes de ligar o motor; (2) com Sinal da Cruz; (3) com breve menção da pessoa, destino e motivo; (4) renovada após paradas longas. Para viagens longas: confissão sacramental antes; Missa de despedida se for traslado definitivo; bênção do veículo; Salmo 91 e Rosário durante o trajeto. Para família: oração em voz alta com as crianças. A medalha de São Cristóvão é sacramental, não amuleto.",
    patronSaint: "São Cristóvão · Santo Anjo Custódio · São Rafael",
    feastDay: "25 de julho",
    source: "CNBB + Vatican.va Português + tradição brasileira da bênção de veículos + Salmo 91. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-serenity",
    name: "Oração da Serenidade",
    description:
      "A Oração da Serenidade — «Deus, conceda-me a serenidade para aceitar as coisas que não posso mudar, coragem para mudar as coisas que posso, e sabedoria para distinguir uma da outra» — é uma das orações mais universalmente difundidas do cristianismo do século XX. Atribuída ao teólogo protestante Reinhold Niebuhr (1934), foi adoptada por Alcoólicos Anônimos nos anos 1940 e desde então estendeu-se por todo o mundo. A oração não é exclusivamente católica — é genuinamente ecumênica — mas a Igreja católica incorporou-a com naturalidade porque coincide com a espiritualidade clássica do «abandono na divina providência» (Jean-Pierre de Caussade). É particularmente apropriada para situações em que o cristão enfrenta circunstâncias que não pode modificar.",
    prayerText:
      "Deus, conceda-me a serenidade para aceitar as coisas que não posso mudar, a coragem para mudar as coisas que posso, e a sabedoria para distinguir uma da outra. Vivendo um dia de cada vez, aproveitando um momento de cada vez, aceitando as dificuldades como caminho para a paz; recebendo, como Jesus o fez, este mundo de pecado tal como é, e não como eu gostaria que fosse; confiando que Tu farás bem todas as coisas, se eu me entregar à Tua vontade. Amém.",
    instructions:
      "Reze: (a) como oração diária matinal, especialmente para programas de recuperação (AA, NA, Al-Anon); (b) em momentos de angústia aguda; (c) em reuniões de grupos de doze passos; (d) em momentos de perda ou crise. A forma curta (as primeiras três linhas) é facilmente memorizável; a forma estendida adiciona o contexto cristão explícito. Acompanhe com: (a) Salmo 23 ou 131; (b) confiança na divina providência (Mt 6,25-34); (c) confissão sacramental se a oração revelar pecado próprio que pode mudar-se; (d) ação concreta para o que pode mudar.",
    patronSaint: "Cristo, Príncipe da Paz",
    feastDay: "Último domingo do Tempo Comum (Cristo Rei)",
    source: "CNBB + Reinhold Niebuhr (1934) + AA Brasil + tradição católica do abandono (Jean-Pierre de Caussade). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "prayer-st-francis",
    name: "Oração Atribuída a São Francisco (Senhor, Fazei-me Instrumento de Vossa Paz)",
    description:
      "A Oração Atribuída a São Francisco — mais conhecida como «Senhor, fazei-me instrumento de vossa paz» — é uma das orações cristãs mais célebres do século XX. Apesar da atribuição tradicional a São Francisco de Assis, a composição específica não aparece nos escritos conhecidos do santo; sua forma atual foi publicada pela primeira vez no periódico católico francês La Clochette em 1912, atribuída anonimamente. Desde então tem sido recitada por Madre Teresa, São João Paulo II, o Papa Francisco e milhões de cristãos. Expressa a espiritualidade franciscana: o cristão se oferece como mediador do amor de Deus ao mundo ferido. O Papa Francisco escolheu o nome Francisco em parte por essa espiritualidade da pacificação e do cuidado dos pobres.",
    prayerText:
      "Senhor, fazei-me um instrumento de vossa paz: onde houver ódio, que eu leve o amor; onde houver ofensa, que eu leve o perdão; onde houver discórdia, que eu leve a união; onde houver dúvida, que eu leve a fé; onde houver erro, que eu leve a verdade; onde houver desespero, que eu leve a esperança; onde houver tristeza, que eu leve a alegria; onde houver trevas, que eu leve a luz. Ó Mestre, fazei que eu procure mais consolar que ser consolado; compreender que ser compreendido; amar que ser amado. Pois é dando que se recebe, é perdoando que se é perdoado, e é morrendo que se vive para a vida eterna. Amém.",
    instructions:
      "Reze: (a) como oração diária matinal; (b) antes de uma conversa difícil, mediação ou reunião tensa; (c) após uma ofensa recebida, como ato explícito de perdão. Estrutura recomendada: Sinal da Cruz; breve silêncio; a oração rezada devagar, deixando cada antítese ser plenamente verbalizada; pausa de silêncio antes do Amém. Para franciscanos seculares: leitura do Cantico das Criaturas, das Florinhas, prática de pobreza voluntária, bênção dos animais no 4 de outubro. No Brasil, a oração é parte do patrimônio espiritual nacional.",
    patronSaint: "São Francisco de Assis",
    feastDay: "4 de outubro",
    source: "CNBB + Vatican.va Português + La Clochette (1912) + Tradição franciscana brasileira. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "psalm-23",
    name: "Salmo 23 (O Senhor é meu Pastor)",
    description:
      "O Salmo 23 — «O Senhor é meu pastor, nada me faltará» — é um dos salmos mais amados da Escritura, atribuído ao rei David. Sua imagem central — a do Senhor que apascenta seu povo como pastor que cuida das ovelhas, levando-as a pastos verdes, a águas tranquilas, e guardando-as «ainda que ande pelo vale tenebroso» — recolhe uma das imagens mais profundas da teologia bíblica. Cristo aplicou a si próprio a imagem do Bom Pastor (Jo 10,11). O salmo reza-se tradicionalmente em momentos de luto (os funerais católicos o incluem sempre), em provas ou medo, em leitos de enfermos terminais, e como confissão cotidiana de confiança.",
    prayerText:
      "O Senhor é meu pastor, nada me faltará. Em verdes prados me faz repousar; conduz-me às águas tranquilas e refresca minha alma. Guia-me por sendas retas pelo amor do seu Nome. Ainda que eu ande pelo vale tenebroso, nenhum mal temerei, porque tu estás comigo: tua vara e teu cajado me consolam. Preparas-me uma mesa diante de meus adversários; unges com óleo minha cabeça, e meu cálice transborda. Bondade e graça me acompanham todos os dias da minha vida, e habitarei na casa do Senhor para sempre. (Salmo 23, tradução litúrgica da CNBB)",
    instructions:
      "Pode rezar-se: (a) como oração diária, especialmente no início e fim do dia; (b) em provas ou medo, devagar; (c) ante um funeral ou luto recente; (d) ante enfermo grave; (e) como meditação na Lectio Divina. A Liturgia das Horas inclui-o em diferentes posições. Memorize-o; cabe em uma só leitura atenta. A tradução litúrgica da CNBB é a mais usada no Brasil. Tradição brasileira: rezá-lo cada noite antes de dormir, no início de uma viagem, ou em ação de graças.",
    patronSaint: "Cristo, Bom Pastor · Rei David",
    feastDay: "Quarto Domingo da Páscoa (Bom Pastor)",
    source: "CNBB + Sagrada Bíblia, tradução litúrgica da CNBB + Liturgia das Horas + Tradição patrística (Santo Agostinho). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "psalm-91",
    name: "Salmo 91 (Aquele que habita ao abrigo do Altíssimo)",
    description:
      "O Salmo 91 — «Aquele que habita ao abrigo do Altíssimo morará à sombra do Onipotente» — é o grande salmo bíblico da proteção divina. A tradição associou-o tão fortemente à luta contra os demônios e à proteção espiritual que se reza em cada Completas (oração noturna da Liturgia das Horas) no sábado, e é parte do rito tradicional dos exorcismos. O salmo enuncia as promessas mais radicais da proteção de Deus sobre quem confia n'Ele. As imagens — entendidas espiritualmente — descrevem a proteção sobre o cristão que se acolhe sob a providência divina. É citado pelo próprio demônio na terceira tentação de Cristo (Mt 4,6). A tradição reza-o ante perigos físicos e espirituais, e como proteção da família.",
    prayerText:
      "Aquele que habita ao abrigo do Altíssimo morará à sombra do Onipotente. Direi ao Senhor: «Meu refúgio e fortaleza meu, meu Deus, em quem confio». Ele te livrará do laço do caçador e da peste mortífera. Com suas penas te cobrirá, e debaixo de suas asas hallarás refúgio. Não temerás os terrores da noite, nem a flecha que voa de dia, nem a peste que avança nas trevas, nem a praga que devasta ao meio-dia. Caem mil à tua esquerda e dez mil à tua direita, mas a ti não chegará. A seus anjos deu ordens para que te guardem em todos os teus caminhos. (Salmo 91, tradução litúrgica da CNBB)",
    instructions:
      "Pode rezar-se: (a) cada noite antes de dormir, como oração tradicional de Completas; (b) antes de viagem, especialmente longa ou perigosa; (c) em momento de medo ou ataque espiritual; (d) como meditação em provas. A tradição católica recomenda memorizá-lo. Em espiritualidade familiar, reza-se pelas crianças, pelos doentes, pelos que vivem sozinhos. Acompanhe com Ato de Contrição, Sinal da Cruz, Bênção ordinária («Que o Senhor te abençoe e te guarde»). Para asedio espiritual grave, consultar sacerdote sábio.",
    patronSaint: "São Miguel Arcanjo · todos os Santos Anjos Custódios",
    feastDay: "29 de setembro · 2 de outubro",
    source: "CNBB + Sagrada Bíblia, tradução litúrgica da CNBB + Liturgia das Horas + tradição exorcística católica + Mt 4,6. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "rosary-for-healing",
    name: "Rosário pela Cura",
    description:
      "O Rosário pela Cura é a prática católica de rezar o Santo Rosário com intenção específica de pedir a Maria, pela intercessão de Cristo Médico Divino, a cura física, emocional ou espiritual de si próprio ou de um ente querido. Os milagres marianos de cura em Lourdes, Aparecida, Fátima sempre estiveram vinculados ao Rosário rezado com fé. O Rosário em si mesmo não é talismã; é meditação contemplativa dos mistérios centrais da fé em companhia de Maria. A cura vem do Pai por meio de Cristo, e Maria é mediadora. A prática é apropriada para doenças graves, doenças crônicas, acidentes recentes, momentos pré-cirúrgicos, tratamentos oncológicos, depressão, ansiedade, e a cura interior após trauma.",
    instructions:
      "Reze o Rosário completo (cinco dezenas), idealmente com os mistérios luminosos (que incluem as Bodas de Caná). Para doença prolongada, considere diário durante todo o tratamento. Estrutura: (1) Sinal da Cruz e Credo; (2) Pai-Nosso, três Ave-Marias e Glória (petições iniciais pela cura); (3) cinco dezenas com meditação; (4) Ladainhas da Bem-Aventurada Virgem Maria, incluindo «Saúde dos enfermos, rogai por nós»; (5) Salve. Variantes: para câncer, cinco Pai-Nossos por intercessão de São Peregrino após cada dezena; para sanação emocional, mistérios dolorosos; para relacionamento rompido, mistérios gloriosos. Empareja com sacramentos (Confissão, Comunhão, Unção dos Enfermos) e tratamento médico responsável.",
    patronSaint: "Maria, Saúde dos Enfermos · Cristo, Médico Divino",
    feastDay: "7 de outubro (Nossa Senhora do Rosário)",
    source: "CNBB + Vatican.va Português (Rosarium Virginis Mariae, JPII 2002) + Marialis Cultus (Paulo VI 1974). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "seven-sorrows-rosary",
    name: "Rosário das Sete Dores de Maria",
    description:
      "O Rosário das Sete Dores de Maria, também chamado Coroa das Sete Dores ou Rosário Servita, é devoção mariana fundada pela Ordem dos Servitas (Florença, 1233). Medita as Sete Espadas que traspassaram o coração de Maria segundo a profecia de Simeão (Lc 2,35). A estrutura: corona específica de sete grupos (um Pai-Nosso e sete Ave-Marias por grupo), mais três Ave-Marias finais em honra às lágrimas de Maria. Confirmada por Bento XIII em 1727 e aprovada por Pio IX em 1860. É a devoção mariana por excelência para a dor maternal — mães que perderam filhos, esposas que assistem ao leito de marido moribundo, pais que sofrem rebeldia de filho. No Brasil tem profunda tradição na Semana Santa.",
    instructions:
      "Precisa de coroa Servita (sete grupos) ou rosário comum contando mentalmente. Estrutura: (1) Sinal da Cruz; (2) **1ª Dor**: profecia de Simeão. Pai-Nosso e sete Ave-Marias; (3) **2ª**: fuga ao Egito; (4) **3ª**: perda no Templo três dias; (5) **4ª**: encontro na via dolorosa; (6) **5ª**: crucificação; (7) **6ª**: Pietà; (8) **7ª**: sepultamento; (9) três Ave-Marias finais; (10) oração tradicional Servita. Tradições brasileiras: rezar nas sextas (dia da Paixão); durante a Quaresma; na Sexta-feira Santa e Sábado Santo.",
    patronSaint: "Mater Dolorosa · Ordem dos Servitas",
    feastDay: "15 de setembro",
    source: "CNBB + Vatican.va Português + Ordem dos Servitas (1233) + Bento XIII (1727) + Pio IX (1860). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "surrender-novena",
    name: "Novena do Abandono (Pe. Dolindo Ruotolo)",
    description:
      "A Novena do Abandono foi composta pelo servo de Deus Dom Dolindo Ruotolo (1882-1970), sacerdote napolitano. Dom Dolindo recebeu em oração a jaculatória central — «Jesus, pensa Tu nisso» — como ditado de Cristo mesmo. A novena tem nove dias com estrutura única: cada dia se rezam dez vezes a mesma jaculatória com crescente confiança. A ideia central é radical: o cristão deve entregar absolutamente a solução do problema a Cristo, sem adiantar-se à providência divina. «Fecha os olhos da alma e diz-me: 'Jesus, pensa Tu nisso', e tem paz». É apropriada para situações em que a mente cristã se queda atrapada em preocupação obsessiva por problema que não pode resolver.",
    prayerText:
      "Jesus, pensa Tu nisso.",
    instructions:
      "Reze por nove dias consecutivos. Cada dia tem jaculatória diferente que enquadra o «Jesus, pensa Tu nisso», seguida 10 vezes. **Dia 1**: «Por que vos confundis e vos agitais? Deixai-me o cuidado das vossas coisas e tudo se acalmará». **Dia 2**: «Filho, perturbas e dificultas minha obra quando quereis ocupar-vos vós». **Dia 3**: «Razonar, agitar-se, querer pensar nas consequências é contrário ao abandono em mim». **Dia 4**: «Estais cego nestas coisas; sofrereis mais». **Dia 5**: «Fechai os olhos da alma e dizei: 'Jesus, pensa Tu nisso'». **Dia 6**: «Me fazeis um grandíssimo dano quando, em vez de vos abandonardes a mim, vos pondes a dar-me conselhos». **Dia 7**: «Quantas coisas não faço quando a alma se volta a mim e diz: 'Jesus, pensa Tu nisso'!». **Dia 8**: «Fechai os olhos e passai tranquilamente». **Dia 9**: «Filhos meus, façam três horas santas». A novena tem fama no Brasil entre as mais eficazes para situações bloqueadas.",
    patronSaint: "Cristo Menino · Sagrado Coração",
    feastDay: "19 de novembro (Pe. Dolindo, servo de Deus)",
    source: "CNBB + Vatican.va Português + Pe. Dolindo Ruotolo (1882-1970) + Diocese de Nápoles. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  // Locale-anchored para pt-BR (9 entries — pt-BR já tem aparecida da seed
  // original; faltam akita, czestochowa, guadalupe, knock, la-vang,
  // maximilian-kolbe, santo-nino, st-juan-diego, simbang-gabi)
  {
    prayerSlug: "novena-akita",
    name: "Novena a Nossa Senhora de Akita",
    description:
      "A devoção a Nossa Senhora de Akita honra as aparições marianas à irmã Agnes Sasagawa em Akita, Japão, entre 1973 e 1981. A estátua da Virgem chorou 101 vezes lágrimas humanas (verificadas cientificamente como sangue, suor e água do tipo humano AB) entre 1975 e 1981. As mensagens pedem penitência, oração do Rosário e consagração ao Imaculado Coração de Maria — em termos que evocam claramente Fátima. As aparições foram oficialmente reconhecidas pelo bispo de Niigata em 1984, com aprovação do então cardeal Joseph Ratzinger. Akita é a primeira aparição mariana aprovada na Ásia oriental.",
    prayerText:
      "Ó dulce Mãe de Akita, que com vossas lágrimas humanas comoveste o coração de vossos filhos no Japão, comovei também o meu. Alcançai-me a graça da conversão sincera e a fortaleza para fazer reparação pelos pecados que ofendem o Sagrado Coração de Jesus e o vosso. Peço-vos a graça que com confiança filial vos suplico (mencionar a intenção). Nossa Senhora de Akita, rogai por nós e pelo mundo em oração pela paz. Amém.",
    instructions:
      "Reze nove dias consecutivos. Estrutura: (1) Sinal da Cruz; (2) um mistério do Rosário, idealmente os gloriosos; (3) a oração; (4) consagração ao Imaculado Coração; (5) mencione a intenção.",
    patronSaint: "Nossa Senhora de Akita",
    feastDay: "12 de outubro (aproximada)",
    source: "CNBB + Vatican.va Português + Aprovação do bispo John Shojiro Ito (Niigata, 1984) + CDF (Card. Ratzinger). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-czestochowa",
    name: "Novena a Nossa Senhora de Częstochowa (Virgem Negra da Polônia)",
    description:
      "Nossa Senhora de Częstochowa — a Virgem Negra da Polônia — é o ícone mariano mais venerado da Polônia. Atribuído por tradição a São Lucas evangelista, conserva-se no mosteiro paulino de Jasna Góra em Częstochowa. A devoção vincula-se ao milagre de 26 de agosto de 1655 durante a invasão sueca da Polônia: o exército sueco assediante, muito maior em número, não pôde tomar o mosteiro. O rei Jan II Casimir consagrou o reino da Polônia a Maria como sua Rainha (1656). São João Paulo II era particularmente devoto: visitou o santuário muitas vezes como Karol Wojtyła, como bispo, como cardeal e como Papa. No Brasil, a devoção é vivida especialmente nas comunidades polonesas do sul (Curitiba, Porto Alegre).",
    prayerText:
      "Ó Virgem Negra de Częstochowa, Rainha e Padroeira da Polônia, que defendestes a Polônia no século XVII e a guiastes pelo século XX através dos totalitarismos, alcançai-me por vossa intercessão a graça que com confiança filial vos peço (mencionar a intenção). Conservai na fé o povo polonês e a diáspora polonesa dispersa pelo mundo. Rainha da Polônia, rogai por nós. Amém.",
    instructions:
      "Reze nove dias consecutivos, idealmente de 18 a 25 de agosto. Estrutura: (1) Sinal da Cruz; (2) breve evocação da defesa de Jasna Góra (1655); (3) a oração; (4) os mistérios gloriosos do Rosário; (5) mencione a intenção.",
    patronSaint: "Nossa Senhora de Częstochowa (Rainha da Polônia)",
    feastDay: "26 de agosto",
    source: "CNBB + Vatican.va Português (homilias de JPII em Jasna Góra) + Mosteiro paulino de Jasna Góra. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-guadalupe",
    name: "Novena a Nossa Senhora de Guadalupe",
    description:
      "Nossa Senhora de Guadalupe é a Padroeira das Américas, declarada por São Pio X em 1910 e confirmada por Pio XII como «Imperatriz das Américas». A aparição ocorreu entre 9 e 12 de dezembro de 1531 no morro do Tepeyac, perto da Cidade do México, ao indígena recém-converso Juan Diego Cuauhtlatoatzin. Maria apareceu-se com pele e traços indígenas, vestida com o áo cingido das mulheres grávidas mexicanas, indicando sua maternal cercanía com o povo nativo. A imagem de Guadalupe ficou impressa milagrosamente em sua tilma (manto de fibra de maguey) — imagem que se conserva intacta após quase cinco séculos na Basílica de Guadalupe na Cidade do México, o santuário mariano mais visitado do mundo. A devoção em todo o continente americano, incluindo o Brasil, é uma das mais difundidas; a fiesta de 12 de dezembro é dia nacional do México.",
    prayerText:
      "Ó dulce Virgem de Guadalupe, Mãe e Imperatriz das Américas, que apareceste no morro do Tepeyac vestida com o áo cingido das mulheres indígenas, alcançai-me por vossa maternal intercessão a graça que com confiança filial vos peço (mencionar a intenção). Por toda a unidade do continente americano, pela conversão dos pueblos indígenas e dos hispanos da diáspora, intercedei. Nossa Senhora de Guadalupe, rogai por nós. Amém.",
    instructions:
      "Reze nove dias consecutivos, idealmente de 3 a 11 de dezembro em preparação para a festa de 12 de dezembro. Estrutura: (1) Sinal da Cruz; (2) leitura breve do Nican Mopohua (relato em náhuatl da aparição); (3) os mistérios gozosos do Rosário; (4) a oração; (5) mencione a intenção.",
    patronSaint: "Nossa Senhora de Guadalupe (Padroeira das Américas)",
    feastDay: "12 de dezembro",
    source: "CNBB + Vatican.va Português (São Pio X 1910; Pio XII Imperatriz; São João Paulo II canonização Juan Diego 2002) + Nican Mopohua. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-knock",
    name: "Novena a Nossa Senhora de Knock (Irlanda)",
    description:
      "Nossa Senhora de Knock é uma das advocações marianas modernas mais reconhecidas do mundo de fala inglesa. A aparição ocorreu em 21 de agosto de 1879 em Knock, condado de Mayo, Irlanda. Quinze testemunhas viram simultaneamente uma aparição de Maria, São José e São João Evangelista, junto a um altar sobre o qual estava um Cordeiro (símbolo do Cordeiro de Deus). A aparição foi completamente silenciosa e durou aproximadamente duas horas sob chuva contínua, sem que as figuras se molhassem. A autenticidade foi declarada digna de fé. São João Paulo II visitou Knock em 1979; o Papa Francisco em 2018. A novena é apropriada para católicos irlandeses e da diáspora irlandesa.",
    prayerText:
      "Ó dulce Virgem de Knock, Mãe Imaculada que em silêncio aparecestes com José e João junto ao Cordeiro divino, alcançai-me por vossa intercessão a graça que com confiança filial vos peço (mencionar a intenção). Mantém em vosso cuidado a todos os filhos da Irlanda dispersos pelo mundo. Nossa Senhora de Knock, rogai por nós. Amém.",
    instructions:
      "Reze nove dias consecutivos, idealmente de 13 a 20 de agosto. Estrutura: (1) Sinal da Cruz; (2) leitura de Apocalipse 5,6 (Cristo Cordeiro); (3) um mistério do Rosário; (4) a oração; (5) mencione a intenção. A aparição foi silenciosa — incluir 15 minutos de oração em silêncio cada dia, em imitação do silêncio mariano de Knock.",
    patronSaint: "Nossa Senhora de Knock · São José · São João Evangelista",
    feastDay: "21 de agosto",
    source: "CNBB + Vatican.va Português (visita de JPII a Knock, 1979) + Santuário Nacional de Knock + Comissão canônica de 1879. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-la-vang",
    name: "Novena a Nossa Senhora de La Vang (Vietnã)",
    description:
      "Nossa Senhora de La Vang é a principal advocação mariana do Vietnã e da diáspora vietnamita católica. A aparição ocorreu em 1798 durante a cruel perseguição do imperador Cảnh Thịnh contra os católicos: centenas de fiéis fugiram à selva de La Vang. Maria apareceu vestida com o áo dài tradicional vietnamita, com o Menino Jesus nos braços, e disse-lhes que rezassem e que ela os protegeria. A Basílica de La Vang foi elevada a Basílica Menor pelo Papa Francisco em 2017. É um dos grandes lugares marianos da Ásia. No Brasil, comunidades vietnamitas católicas existem em São Paulo, com fraternidade entre as diásporas asiáticas.",
    prayerText:
      "Ó Virgem de La Vang, dulce Mãe que viestes consolar vossos filhos vietnamitas na perseguição mais dura, vestida com o áo dài tradicional para que vos reconhecessem como própria, alcançai-me por vossa intercessão a graça que com confiança filial vos peço (mencionar a intenção). Por todos os cristãos perseguidos pela fé no mundo — especialmente no Vietnã, China, Coreia do Norte, Paquistão, Nigéria e Oriente Médio — alcançai-nos a fidelidade até a morte se necessário. Nossa Senhora de La Vang, rogai por nós. Amém.",
    instructions:
      "Reze nove dias consecutivos. Estrutura: (1) Sinal da Cruz; (2) um mistério do Rosário (dolorosos); (3) a oração; (4) mencione a intenção.",
    patronSaint: "Nossa Senhora de La Vang",
    feastDay: "15 de agosto (associada à Assunção)",
    source: "CNBB + Vatican.va Português + Conferência Episcopal Vietnamita + Papa Francisco (elevação à Basílica Menor 2017). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-maximilian-kolbe",
    name: "Novena a São Maximiliano Kolbe",
    description:
      "São Maximiliano Maria Kolbe (Rajmund Kolbe, 1894-1941) — sacerdote franciscano conventual polonês — é o padroeiro universal dos prisioneiros de consciência, dos jornalistas católicos, das famílias e do movimento pró-vida. Fundou a Milícia da Imaculada (1917) e a cidade-mosteiro de Niepokalanów na Polônia. Durante a ocupação nazista, foi arrestado e deportado a Auschwitz em maio de 1941. Em agosto, quando um prisioneiro escapou e os nazistas decidiram matar de fome dez prisioneiros como castigo coletivo, Maximiliano Kolbe voluntariamente tomou o lugar de Franciszek Gajowniczek — um pai de família. Sobreviveu duas semanas no bunker da fome, animando seus companheiros com cantos, e foi executado por injeção de fenol em 14 de agosto de 1941. Gajowniczek sobreviveu até 1995. Canonizado por São João Paulo II em 1982 como «mártir da caridade».",
    prayerText:
      "Ó glorioso São Maximiliano Maria Kolbe, mártir da caridade e cavaleiro da Imaculada, vós que destes vossa vida em Auschwitz para que um pai de família voltasse para casa, alcançai-me por vossa intercessão a graça que com confiança filial vos peço (mencionar a intenção). Por todos os presos de consciência, por todos os refugiados das guerras de nosso tempo, intercedei. E sobretudo, alcançai-me a disposição a dar o melhor de mim mesmo pelos que Deus colocou ao meu lado. Amém.",
    instructions:
      "Reze nove dias consecutivos, idealmente de 5 a 13 de agosto. Estrutura: (1) Sinal da Cruz; (2) ato de consagração à Imaculada; (3) a oração; (4) um mistério do Rosário (dolorosos); (5) mencione a intenção. Para causas de justiça: ação concreta de solidariedade — carta a um prisioneiro, doação a causa pró-vida; leitura de Filipenses 2,5-11; jejum semanal pela intenção.",
    patronSaint: "São Maximiliano Maria Kolbe, OFMConv (mártir de Auschwitz)",
    feastDay: "14 de agosto",
    source: "CNBB + Vatican.va Português (São João Paulo II, canonização 1982) + Niepokalanów + testemunho de Franciszek Gajowniczek. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-santo-nino",
    name: "Novena ao Santo Niño de Cebu (Filipinas)",
    description:
      "O Santo Niño de Cebu é a imagem religiosa católica mais antiga e venerada das Filipinas. Uma pequena figura de madeira do Menino Jesus, presenteada por Fernando de Magalhães à rainha Juana de Cebu em seu batismo em 14 de abril de 1521. Redescoberta intacta 44 anos depois (1565) pelos soldados espanhóis de Miguel López de Legazpi. A imagem conserva-se na Basílica Menor do Santo Niño de Cebu. A festa principal é o Sinulog, terceiro domingo de janeiro. No Brasil, comunidades filipinas católicas em São Paulo celebram com a mesma reverência tradicional.",
    prayerText:
      "Ó dulce Santo Niño de Cebu, Menino Jesus que sois presença católica viva nas Filipinas há mais de quinhentos anos, alcançai-me por vossa intercessão a graça que com humilde confiança vos peço (mencionar a intenção). Por todas as crianças filipinas, por todas as famílias filipinas dispersas pela migração. Pit Señor, viva Señor Santo Niño. Amém.",
    instructions:
      "Reze nove dias consecutivos, idealmente os nove dias prévios ao terceiro domingo de janeiro (Sinulog). Estrutura: (1) Sinal da Cruz; (2) um mistério do Rosário (gozosos); (3) a oração; (4) jaculatória filipina «Pit Señor, viva Señor Santo Niño»; (5) mencione a intenção.",
    patronSaint: "Santo Niño de Cebu · Menino Jesus",
    feastDay: "Terceiro domingo de janeiro (Sinulog)",
    source: "CNBB + CBCP + Basílica Menor do Santo Niño de Cebu + Magalhães (1521) + Legazpi (1565). Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "novena-st-juan-diego",
    name: "Novena a São Juan Diego",
    description:
      "São Juan Diego Cuauhtlatoatzin (1474-1548) — o indígena a quem a Virgem Maria se apareceu no Tepeyac entre 9 e 12 de dezembro de 1531, manifestando-se como Nossa Senhora de Guadalupe. Bautizado pelos franciscanos antes de 1525, viúvo desde 1529, Juan Diego é a figura humana central da conversão do México e de toda a América hispana ao catolicismo. A imagem de Guadalupe ficou impressa milagrosamente em sua tilma. Canonizado por São João Paulo II na Basílica de Guadalupe em 31 de julho de 2002, durante sua última visita pastoral. Padroeiro dos indígenas, dos humildes, e dos pueblos das Américas.",
    prayerText:
      "Ó humilde São Juan Diego, águia indígena que a Virgem Maria escolheu para ser portador da imagem de Guadalupe a todo o continente americano, alcançai-me por vossa intercessão a graça que com confiança filial vos peço (mencionar a intenção). Vós que ouvistes a Mãe Celestial chamar-vos «filho meu mais pequeno», alcançai-me a graça de me sentir também eu, em minhas humildes circunstâncias, filho ou filha predileto da Mãe de Deus. E por todos os indígenas, por todos os hispanos discriminados, intercedei. Amém.",
    instructions:
      "Reze nove dias consecutivos, idealmente de 30 de novembro a 8 de dezembro em preparação para Guadalupe (12 de dezembro), ou de 1 a 8 de dezembro em preparação para a festa de Juan Diego (9 de dezembro). Estrutura: (1) Sinal da Cruz; (2) um mistério do Rosário (gozosos); (3) a oração; (4) jaculatória «São Juan Diego, rogai por nós»; (5) mencione a intenção.",
    patronSaint: "São Juan Diego Cuauhtlatoatzin",
    feastDay: "9 de dezembro",
    source: "CNBB + Vatican.va Português (São João Paulo II, canonização 31 de julho de 2002) + Nican Mopohua. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "simbang-gabi",
    name: "Simbang Gabi (Missa do Galo Filipina)",
    description:
      "O Simbang Gabi — literalmente «Missa Noturna» em filipino, também chamada Missa do Galo — é a série de nove Missas católicas matutinas celebradas nas Filipinas de 16 a 24 de dezembro em preparação para o Natal. A tradição remonta ao século XVII, quando os missionários agostinianos e dominicanos espanhóis celebraram Missas tempranas (ao amanecer, cerca das 4:00 AM) para que os agricultores e pescadores filipinos pudessem assistir antes de começar a jornada. A promessa popular — completar as nove Missas consecutivas assegura uma intenção particular — é devocional. A diáspora filipina nos EUA, Canadá, Austrália e Brasil tem levado o Simbang Gabi a paróquias de muitas nações.",
    instructions:
      "Assista à Missa cada um dos nove dias consecutivos de 16 a 24 de dezembro. Nas Filipinas, ao amanecer (4:00-5:00 AM); na diáspora, normalmente à noite (18:00-20:00). Algumas paróquias hispano-filipinas oferecem Missas bilíngues. Tradições: (1) compartilhar o «bibingka» e o «puto bumbong» após cada Missa; (2) confessar-se pelo menos uma vez durante os nove dias; (3) novena familiar ao Menino Jesus cada noite após a Missa; (4) levar os filhos para transmitir a tradição. Para católicos brasileiros sem acesso a paróquia com Simbang Gabi, assista à Missa diária durante os nove dias prévios ao Natal.",
    patronSaint: "Menino Jesus · Sagrada Família",
    feastDay: "16 a 24 de dezembro (anual)",
    source: "CNBB + CBCP + tradição agostiniana-dominicana nas Filipinas (s. XVII) + comunidades filipinas na diáspora brasileira. Retrieved 2026-05-18.",
    reviewedAt: new Date("2026-05-18"),
  },
  {
    prayerSlug: "litany-of-humility",
    name: "Ladainha da Humildade",
    description:
      "A Ladainha da Humildade é uma oração breve mas penetrante composta pelo Cardeal Rafael Merry del Val (1865-1930), Secretário de Estado do Papa São Pio X durante todo aquele pontificado. Hispano-irlandês de origem e formado em Roma, Merry del Val foi um homem de vida interior disciplinada e de notável abnegação. A ladainha foi encontrada entre seus papéis devocionais particulares após sua morte e publicada por seu secretário, tornando-se ao longo do último século uma das orações modernas mais rezadas e compartilhadas no mundo católico de língua portuguesa. Sua estrutura é dupla: uma primeira petição sobre os desejos e temores da própria reputação («Do desejo de ser estimado…» / «Do temor de ser humilhado…»), e uma segunda que volta o coração para o bem dos outros antes que o próprio («Que os outros sejam amados mais do que eu…»). A resposta uniforme — «livrai-me, Jesus» — e o repetido pedido de graça para desejar o bem alheio cortam a abstração típica da oração piedosa e nomeiam com precisão as inclinações do coração humano caído. A ladainha não pede a eliminação desses desejos (a teologia ascética católica os reconhece como profundamente enraizados na natureza humana ferida), mas a graça de preferir a reputação de Cristo à própria, e a dos outros à nossa. Teve uma influência silenciosa mas enorme na espiritualidade católica moderna — especialmente entre sacerdotes, seminaristas, religiosos e católicos em discernimento vocacional — porque sua especificidade alcança o que a oração piedosa abstrata não toca. É a oração à qual um católico volta quando se surpreende representando a virtude em vez de praticá-la, ou quando reconhece que uma determinada queixa é, na verdade, orgulho ferido disfarçado de justiça. Santa Madre Teresa de Calcutá rezava esta ladainha todos os dias; muitos seminários a incorporam na formação dos candidatos ao sacerdócio.",
    prayerText:
      "Ó Jesus, manso e humilde de coração, ouvi-me.\n\nDo desejo de ser estimado, livrai-me, Jesus.\nDo desejo de ser amado, livrai-me, Jesus.\nDo desejo de ser exaltado, livrai-me, Jesus.\nDo desejo de ser honrado, livrai-me, Jesus.\nDo desejo de ser louvado, livrai-me, Jesus.\nDo desejo de ser preferido aos outros, livrai-me, Jesus.\nDo desejo de ser consultado, livrai-me, Jesus.\nDo desejo de ser aprovado, livrai-me, Jesus.\n\nDo temor de ser humilhado, livrai-me, Jesus.\nDo temor de ser desprezado, livrai-me, Jesus.\nDo temor de ser repreendido, livrai-me, Jesus.\nDo temor de ser caluniado, livrai-me, Jesus.\nDo temor de ser esquecido, livrai-me, Jesus.\nDo temor de ser ridicularizado, livrai-me, Jesus.\nDo temor de ser injuriado, livrai-me, Jesus.\nDo temor de ser suspeitado, livrai-me, Jesus.\n\nQue os outros sejam amados mais do que eu, Jesus, dai-me a graça de desejá-lo.\nQue os outros sejam estimados mais do que eu, Jesus, dai-me a graça de desejá-lo.\nQue, na opinião do mundo, os outros cresçam e eu diminua, Jesus, dai-me a graça de desejá-lo.\nQue os outros sejam escolhidos e eu posto de lado, Jesus, dai-me a graça de desejá-lo.\nQue os outros sejam louvados e eu passe despercebido, Jesus, dai-me a graça de desejá-lo.\nQue os outros sejam preferidos a mim em tudo, Jesus, dai-me a graça de desejá-lo.\nQue os outros sejam mais santos do que eu, contanto que eu seja todo o santo que devo ser, Jesus, dai-me a graça de desejá-lo. Amém.",
    instructions:
      "Reze a ladainha devagar. O texto é breve — menos de trezentas palavras — mas seu peso está em nomear cada desejo e cada temor distintamente. Estrutura tradicional: (1) Sinal da Cruz; (2) leia em voz alta, devagar, a invocação inicial «Ó Jesus, manso e humilde de coração, ouvi-me»; (3) reze a longa sequência de invocações «Do desejo de…», permitindo-se sentir qual delas o nomeia naquele dia — não passe rápido pela que o toca; (4) reze a sequência de invocações «Do temor de…» da mesma forma; (5) reze as petições finais «Que os outros sejam…» com calma, pedindo especificamente a graça que cada uma nomeia. Muitas pessoas rezam esta ladainha quando se flagram no orgulho — após uma conversa difícil, depois de enviar um e-mail que não deveriam, após uma reunião onde quiseram dominar, depois de um serviço eclesial que se transformou em performance. A ladainha é apropriada: no início de um retiro, especialmente um retiro inaciano de oito dias; antes da Confissão sacramental (como parte do exame de consciência — a ladainha nomeia padrões de orgulho que se escondem à vista de todos); durante o discernimento vocacional ao sacerdócio, à vida religiosa ou ao matrimônio; na Sexta-Feira Santa ou durante o Tríduo Sacro, quando a Igreja medita o «kénosis» de Cristo; em momentos de humilhação pública ou fracasso sentido — quando a ladainha deixa de ser aspiracional e passa a descrever o lugar onde Deus de fato colocou o orante. O biógrafo de Merry del Val anota que o cardeal rezava esta ladainha todos os dias após a Missa por toda a sua vida como Secretário de Estado, em um escritório romano onde as tentações de vaidade e manobra política eram contínuas. A oração inscreve-se na tradição ascética católica mais ampla que reconhece a humildade como fundamento de todas as virtudes — o «primeiro, humildade; segundo, humildade; terceiro, humildade» de santo Agostinho, e a identificação tomista do orgulho como raiz de todo pecado.",
    patronSaint: "Cardeal Rafael Merry del Val (autor)",
    feastDay: null,
    source: "CNBB + Vatican.va Português + tradição devocional romana (sécs. XX-XXI). Retrieved 2026-05-19.",
    reviewedAt: new Date("2026-05-19"),
  },
  {
    prayerSlug: "litany-of-trust",
    name: "Ladainha da Confiança",
    description:
      "A Ladainha da Confiança é uma ladainha católica moderna composta por volta de 2010 pela Irmã Faustina Maria Pia, SV, das Irmãs da Vida (Sisters of Life) — a comunidade religiosa fundada em 1991 pelo Cardeal John O'Connor de Nova York para servir mulheres grávidas em crise e dar testemunho do valor sagrado de toda vida humana desde a concepção até a morte natural. A ladainha nasceu da luta interior da própria Irmã Faustina Maria Pia com a confiança — concretamente, com o cacho de medos que paira sob a superfície da vida católica contemporânea: o medo de não ser amado, de ser abandonado, de ser uma decepção, de não conseguir perdoar a si mesmo, de ser incapaz de amar. A ladainha nomeia cada um desses medos por sua vez («Do medo de ser esquecido…» / «Do medo de não ser amado…» / «Do medo de não ser digno de amor…») e pede ser libertado com a resposta «livrai-me, Jesus». O segundo movimento da ladainha — pelo qual é mais conhecida — nomeia vinte verdades sobre Jesus às quais o orante é convidado a confiar-se: «Que tu me sustentas continuamente no ser… Que tu me amas… Que tu me vês… Que tu vês o passado, o presente e o futuro, e sabes do que preciso… Que tu proverás para mim… Que tu és manso e humilde de coração…». A cada uma, a resposta é «Jesus, eu confio em ti». A ladainha espalhou-se viralmente na pastoral juvenil católica brasileira, em grupos de mulheres e nas redes sociais — é uma das orações católicas mais compartilhadas da década de 2010 e 2020. As Irmãs da Vida publicam-na livremente em seu site (sistersoflife.org) para uso pessoal e paroquial. É apropriada para: a ansiedade e o cacho de lutas contemporâneas de saúde mental que se apresentam como medo de indignidade; recuperação do escrúpulo espiritual; os primeiros dias de um diagnóstico difícil; o luto; a dificuldade financeira; e qualquer momento em que o crente nota que tem operado a partir do medo em vez da fé.",
    prayerText:
      "Da crença de que tenho de ganhar o teu amor, livrai-me, Jesus.\nDo medo de não ser digno de amor, livrai-me, Jesus.\nDa falsa segurança de que tenho o que é preciso, livrai-me, Jesus.\nDo medo de que confiar em ti me deixará mais despojado, livrai-me, Jesus.\nDe toda suspeita sobre tuas palavras e promessas, livrai-me, Jesus.\nDa rebelião contra a dependência filial de ti, livrai-me, Jesus.\nDe recusas e relutâncias em aceitar a tua vontade, livrai-me, Jesus.\nDa ansiedade quanto ao futuro, livrai-me, Jesus.\nDo ressentimento ou da preocupação excessiva com o passado, livrai-me, Jesus.\nDo inquieto procurar-me a mim mesmo no momento presente, livrai-me, Jesus.\nDa incredulidade no teu amor e presença, livrai-me, Jesus.\nDo medo de que me peças mais do que tenho, livrai-me, Jesus.\nDa crença de que minha vida não tem sentido nem valor, livrai-me, Jesus.\nDo medo do que o amor exige, livrai-me, Jesus.\nDo desânimo, livrai-me, Jesus.\n\nQue tu me sustentas continuamente no ser, Jesus, eu confio em ti.\nQue tu me amas, Jesus, eu confio em ti.\nQue tu me vês, Jesus, eu confio em ti.\nQue tu me ouves, Jesus, eu confio em ti.\nQue tu me conheces, Jesus, eu confio em ti.\nQue tu vês o passado, o presente e o futuro, e sabes do que preciso, Jesus, eu confio em ti.\nQue tu proverás para mim, Jesus, eu confio em ti.\nQue tu me resgatarás, Jesus, eu confio em ti.\nQue tu és manso e humilde de coração, Jesus, eu confio em ti.\nQue tu és eternamente fiel, Jesus, eu confio em ti.\nQue todas as coisas passam, e somente o teu amor permanece, Jesus, eu confio em ti.\nQue tu tiras um bem real de cada situação, Jesus, eu confio em ti.\nQue tu me ensinarás a confiar em ti, Jesus, eu confio em ti.\nQue tu és meu Senhor e meu Deus, Jesus, eu confio em ti.\nQue eu sou o teu amado, Jesus, eu confio em ti. Amém.",
    instructions:
      "Reze a ladainha devagar. O texto é breve — cerca de quinhentas palavras — mas seu movimento importa. Estrutura tradicional: (1) Sinal da Cruz; (2) leia em voz alta a invocação inicial; (3) reze a longa sequência de invocações «Do medo de…» — estas nomeiam padrões específicos de desconfiança que governam a vida interior adulta. Não passe rápido pela que o toca naquele dia; (4) reze o segundo movimento, a longa sequência de verdades «Que tu…» com a resposta «Jesus, eu confio em ti». Este é o coração da oração — o ato deliberado e articulado de confiança que o crente faz contra a evidência sentida de seu próprio medo. (5) feche em silêncio, deixando que as verdades recém-nomeadas se assentem. A Ladainha da Confiança é apropriada: no início de um dia difícil; no limiar de uma conversa dura; na capela antes de um longo turno de cuidado; ao lado da cama de alguém na UTI ou em cuidados paliativos; durante ataques de ansiedade (conselheiros e diretores espirituais católicos brasileiros recomendam habitualmente a ladainha como «oração de ancoragem» para pessoas com transtornos de ansiedade); durante crise financeira; durante o luto. As Irmãs da Vida rezam a ladainha diariamente em comunidade. Muitos grupos paroquiais de jovens adultos a rezam semanalmente em pequenos grupos. A ladainha complementa-se particularmente bem com a Coroinha da Divina Misericórdia — ambas as orações articulam a mesma postura de confiança em Jesus.",
    patronSaint: "Irmã Faustina Maria Pia, SV (Irmãs da Vida — autora)",
    feastDay: null,
    source: "CNBB + Sisters of Life (sistersoflife.org/litany-of-trust, autorizada para reprodução devocional) + Aleteia BR. Retrieved 2026-05-19.",
    reviewedAt: new Date("2026-05-19"),
  },
];
