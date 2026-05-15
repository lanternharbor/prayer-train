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
];
