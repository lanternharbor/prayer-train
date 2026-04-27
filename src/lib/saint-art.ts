/**
 * Patron-saint portrait lookup.
 *
 * Maps the `patronSaint` string from PrayerType seed data to a public-domain
 * portrait we self-host in /public/saints/. Each entry includes attribution
 * + a public-domain rationale so the licensing trail is auditable in code.
 *
 * To add a saint:
 *   1. Find a clearly public-domain image on Wikimedia Commons (artist died
 *      pre-1955 OR photograph older than 95 years OR Wikimedia explicitly
 *      tags as PD).
 *   2. Download with curl, resize to 400px max with `sips -Z 400 -s formatOptions 82`.
 *   3. Save to public/saints/[slug].jpg.
 *   4. Add an entry below.
 *
 * Saints currently without portraits (in the seed but not here) fall back to
 * rendering nothing — no broken image, no error. Additive only.
 */

export type SaintArt = {
  imagePath: string;
  alt: string;
  artist: string;
  source: string;
  publicDomain: string;
};

const SAINT_ART: Record<string, SaintArt> = {
  "St. Joseph": {
    imagePath: "/saints/st-joseph.jpg",
    alt: "Saint Joseph holding the infant Jesus",
    artist: "Guido Reni (c. 1635)",
    source:
      "https://commons.wikimedia.org/wiki/File:Guido_Reni_-_St_Joseph_with_the_Infant_Jesus_-_WGA19304.jpg",
    publicDomain: "Painter died 1642; PD worldwide.",
  },
  "St. Jude Thaddeus": {
    imagePath: "/saints/st-jude-thaddeus.jpg",
    alt: "Saint Jude Thaddeus the Apostle",
    artist: "Anthony van Dyck (c. 1618–1620)",
    source:
      "https://commons.wikimedia.org/wiki/File:Anthonis_van_Dyck,_Kunsthistorisches_Museum_Wien,_Gem%C3%A4ldegalerie_-_Apostel_Judas_Thadd%C3%A4us_-_GG_6809_-_Kunsthistorisches_Museum.jpg",
    publicDomain: "Painter died 1641; PD worldwide.",
  },
  "St. Faustina Kowalska": {
    imagePath: "/saints/st-faustina-kowalska.jpg",
    alt: "Saint Maria Faustyna Kowalska",
    artist: "Anonymous photograph, c. 1930s",
    source:
      "https://commons.wikimedia.org/wiki/File:Maria_Faustyna_Kowalska.jpg",
    publicDomain:
      "Anonymous Polish photograph more than 70 years old; PD per EU + US rule of the shorter term.",
  },
  "Our Lady of Perpetual Help": {
    imagePath: "/saints/our-lady-of-perpetual-help.jpg",
    alt: "Icon of Our Lady of Perpetual Help",
    artist: "Anonymous Cretan iconographer (15th century)",
    source:
      "https://commons.wikimedia.org/wiki/File:Perpetual_help_original_icon.jpg",
    publicDomain: "Icon and faithful reproduction; PD by age.",
  },
  "St. Margaret Mary Alacoque": {
    imagePath: "/saints/st-margaret-mary-alacoque.jpg",
    alt: "Saint Margaret Mary Alacoque",
    artist: "Anonymous, 19th century",
    source:
      "https://commons.wikimedia.org/wiki/File:Marguerite-Marie_Alacoque.jpg",
    publicDomain: "19th-century portrait; PD by age.",
  },
  "St. Therese of Lisieux": {
    imagePath: "/saints/st-therese-of-lisieux.jpg",
    alt: "Saint Thérèse of Lisieux",
    artist: "Photograph by Céline Martin (c. 1894)",
    source:
      "https://commons.wikimedia.org/wiki/File:Teresa-de-Lisieux.jpg",
    publicDomain: "Photograph more than 130 years old; PD worldwide.",
  },
  "St. Catherine Laboure": {
    imagePath: "/saints/st-catherine-laboure.jpg",
    alt: "Saint Catherine Labouré",
    artist: "Anonymous, 19th century",
    source:
      "https://commons.wikimedia.org/wiki/File:Catherine_Laboure.jpg",
    publicDomain: "19th-century portrait; PD by age.",
  },
  "St. Anthony of Padua": {
    imagePath: "/saints/st-anthony-of-padua.jpg",
    alt: "Saint Anthony of Padua holding the Christ Child",
    artist: "Francisco de Zurbarán (c. 1635)",
    source:
      "https://commons.wikimedia.org/wiki/File:Francisco_de_Zurbar%C3%A1n_-_Sto_Antonio_de_Padua.jpg",
    publicDomain: "Painter died 1664; PD worldwide.",
  },
  "Our Lady of the Rosary": {
    imagePath: "/saints/our-lady-of-the-rosary.jpg",
    alt: "Madonna of the Rosary",
    artist: "Caravaggio (1607)",
    source:
      "https://commons.wikimedia.org/wiki/File:Michelangelo_Merisi,_called_Caravaggio_-_Madonna_of_the_Rosary_-_Google_Art_Project.jpg",
    publicDomain: "Painter died 1610; PD worldwide.",
  },
  "St. Michael the Archangel": {
    imagePath: "/saints/st-michael-the-archangel.jpg",
    alt: "The Archangel Michael defeating Satan",
    artist: "Guido Reni (c. 1635)",
    source:
      "https://commons.wikimedia.org/wiki/File:GuidoReni_MichaelDefeatsSatan.jpg",
    publicDomain: "Painter died 1642; PD worldwide.",
  },
  "St. Francis of Assisi": {
    imagePath: "/saints/st-francis-of-assisi.jpg",
    alt: "Saint Francis of Assisi",
    artist: "Philip Fruytiers (c. 1640s)",
    source:
      "https://commons.wikimedia.org/wiki/File:Philip_Fruytiers_-_St._Francis_of_Assisi.jpg",
    publicDomain: "Painter died 1666; PD worldwide.",
  },
  "St. Bernard of Clairvaux": {
    imagePath: "/saints/st-bernard-of-clairvaux.jpg",
    alt: "Saint Bernard of Clairvaux",
    artist: "Juan Correa de Vivar (16th century)",
    source:
      "https://commons.wikimedia.org/wiki/File:San_Bernardo,_de_Juan_Correa_de_Vivar_(Museo_del_Prado).jpg",
    publicDomain: "Painter died 1566; PD worldwide.",
  },
  "St. Ignatius of Loyola": {
    imagePath: "/saints/st-ignatius-of-loyola.jpg",
    alt: "Saint Ignatius of Loyola",
    artist: "Anonymous, 17th century",
    source:
      "https://commons.wikimedia.org/wiki/File:Ignatius_Loyola.jpg",
    publicDomain: "17th-century portrait; PD by age.",
  },
  "St. Benedict": {
    imagePath: "/saints/st-benedict.jpg",
    alt: "Saint Benedict of Nursia",
    artist: "Hans Memling, Trittico di Benedetto Portinari (1487)",
    source:
      "https://commons.wikimedia.org/wiki/File:Memling,_Trittico_di_Benedetto_Portinari,_San_Benedetto.jpg",
    publicDomain: "Painter died 1494; PD worldwide.",
  },
};

/**
 * Look up a portrait for a given patronSaint string. Returns null when
 * the saint is not in our curated set — caller renders nothing.
 */
export function getSaintArt(
  patronSaint: string | null | undefined,
): SaintArt | null {
  if (!patronSaint) return null;
  return SAINT_ART[patronSaint] ?? null;
}
