import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Parishes organized by diocese
// Starting with Archdiocese of Boston (South Shore focus) + expanding to major US dioceses

const parishes: { name: string; city: string; state: string; diocese: string }[] = [
  // ─── Archdiocese of Boston — South Shore ──────────────────
  { name: "St. Paul Parish", city: "Hingham", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "Resurrection Parish", city: "Hingham", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Anthony of Padua Parish", city: "Cohasset", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Luke the Evangelist Parish", city: "Scituate", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Mary of the Nativity Parish", city: "Scituate", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "Holy Family Parish", city: "Rockland", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Ann Parish", city: "Hull", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Clare Parish", city: "Braintree", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Francis of Assisi Parish", city: "Braintree", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Thomas More Parish", city: "Braintree", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "Our Lady of Good Counsel Parish", city: "Braintree", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Joseph Parish", city: "Holbrook", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Bridget Parish", city: "Abington", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "Christ the King Parish", city: "Mashpee", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "Our Lady of the Lake Parish", city: "Halifax", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Christine Parish", city: "Marshfield", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "Holy Family Parish", city: "Duxbury", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Mary Parish", city: "Hanover", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Joseph Parish", city: "Weymouth", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "Immaculate Conception Parish", city: "Weymouth", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "Sacred Heart Parish", city: "Weymouth", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Jerome Parish", city: "Weymouth", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Albert the Great Parish", city: "Weymouth", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "Our Lady of the Assumption Parish", city: "Marshfield", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Thecla Parish", city: "Pembroke", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Bonaventure Parish", city: "Plymouth", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Peter Parish", city: "Plymouth", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Mary Parish", city: "Plymouth", state: "MA", diocese: "Archdiocese of Boston" },

  // ─── Archdiocese of Boston — Greater Boston ───────────────
  { name: "Cathedral of the Holy Cross", city: "Boston", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Cecilia Parish", city: "Boston", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "Our Lady of Perpetual Help (Mission Church)", city: "Boston", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Leonard of Port Maurice Parish", city: "Boston", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Anthony Shrine", city: "Boston", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Ignatius of Loyola Parish", city: "Chestnut Hill", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "Our Lady Help of Christians Parish", city: "Newton", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Mary of the Assumption Parish", city: "Brookline", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Columbkille Parish", city: "Brighton", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "Our Lady of the Presentation Parish", city: "Brighton", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. John the Evangelist Parish", city: "Wellesley", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Catherine of Siena Parish", city: "Norwood", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Timothy Parish", city: "Norwood", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Agatha Parish", city: "Milton", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Mary of the Hills Parish", city: "Milton", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Gregory Parish", city: "Dorchester", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Ann Parish", city: "Dorchester", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "Most Blessed Sacrament Parish", city: "Quincy", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "St. Ann Parish", city: "Quincy", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "Sacred Heart Parish", city: "Quincy", state: "MA", diocese: "Archdiocese of Boston" },
  { name: "Divine Mercy Parish", city: "Quincy", state: "MA", diocese: "Archdiocese of Boston" },

  // ─── Diocese of Fall River (SE Massachusetts) ─────────────
  { name: "St. Mary's Cathedral", city: "Fall River", state: "MA", diocese: "Diocese of Fall River" },
  { name: "St. Anthony of Padua Parish", city: "New Bedford", state: "MA", diocese: "Diocese of Fall River" },
  { name: "Our Lady of Lourdes Parish", city: "Wellfleet", state: "MA", diocese: "Diocese of Fall River" },
  { name: "Holy Trinity Parish", city: "West Harwich", state: "MA", diocese: "Diocese of Fall River" },
  { name: "Our Lady of the Cape Parish", city: "Brewster", state: "MA", diocese: "Diocese of Fall River" },

  // ─── Diocese of Worcester ─────────────────────────────────
  { name: "St. Paul Cathedral", city: "Worcester", state: "MA", diocese: "Diocese of Worcester" },
  { name: "Blessed Sacrament Parish", city: "Worcester", state: "MA", diocese: "Diocese of Worcester" },

  // ─── Diocese of Springfield ───────────────────────────────
  { name: "St. Michael Cathedral", city: "Springfield", state: "MA", diocese: "Diocese of Springfield" },

  // ─── Archdiocese of New York ──────────────────────────────
  { name: "St. Patrick's Cathedral", city: "New York", state: "NY", diocese: "Archdiocese of New York" },
  { name: "Church of St. Francis of Assisi", city: "New York", state: "NY", diocese: "Archdiocese of New York" },
  { name: "Church of Our Lady of Victory", city: "New York", state: "NY", diocese: "Archdiocese of New York" },
  { name: "Church of the Holy Name of Jesus", city: "New York", state: "NY", diocese: "Archdiocese of New York" },
  { name: "St. Ignatius Loyola Parish", city: "New York", state: "NY", diocese: "Archdiocese of New York" },

  // ─── Diocese of Brooklyn ──────────────────────────────────
  { name: "Co-Cathedral of St. Joseph", city: "Brooklyn", state: "NY", diocese: "Diocese of Brooklyn" },
  { name: "Our Lady of Perpetual Help", city: "Brooklyn", state: "NY", diocese: "Diocese of Brooklyn" },

  // ─── Archdiocese of Philadelphia ──────────────────────────
  { name: "Cathedral Basilica of Sts. Peter and Paul", city: "Philadelphia", state: "PA", diocese: "Archdiocese of Philadelphia" },
  { name: "National Shrine of St. John Neumann", city: "Philadelphia", state: "PA", diocese: "Archdiocese of Philadelphia" },
  { name: "St. Charles Borromeo Parish", city: "Philadelphia", state: "PA", diocese: "Archdiocese of Philadelphia" },

  // ─── Archdiocese of Chicago ───────────────────────────────
  { name: "Holy Name Cathedral", city: "Chicago", state: "IL", diocese: "Archdiocese of Chicago" },
  { name: "Old St. Patrick's Church", city: "Chicago", state: "IL", diocese: "Archdiocese of Chicago" },
  { name: "St. Peter's in the Loop", city: "Chicago", state: "IL", diocese: "Archdiocese of Chicago" },
  { name: "Our Lady of Mount Carmel Parish", city: "Chicago", state: "IL", diocese: "Archdiocese of Chicago" },

  // ─── Archdiocese of Los Angeles ───────────────────────────
  { name: "Cathedral of Our Lady of the Angels", city: "Los Angeles", state: "CA", diocese: "Archdiocese of Los Angeles" },
  { name: "St. Monica Parish", city: "Santa Monica", state: "CA", diocese: "Archdiocese of Los Angeles" },
  { name: "Blessed Sacrament Parish", city: "Hollywood", state: "CA", diocese: "Archdiocese of Los Angeles" },

  // ─── Archdiocese of San Francisco ─────────────────────────
  { name: "Cathedral of St. Mary of the Assumption", city: "San Francisco", state: "CA", diocese: "Archdiocese of San Francisco" },
  { name: "St. Ignatius Church", city: "San Francisco", state: "CA", diocese: "Archdiocese of San Francisco" },

  // ─── Archdiocese of Washington ────────────────────────────
  { name: "Basilica of the National Shrine", city: "Washington", state: "DC", diocese: "Archdiocese of Washington" },
  { name: "St. Matthew's Cathedral", city: "Washington", state: "DC", diocese: "Archdiocese of Washington" },
  { name: "Holy Trinity Parish", city: "Georgetown", state: "DC", diocese: "Archdiocese of Washington" },

  // ─── Archdiocese of Miami ─────────────────────────────────
  { name: "Cathedral of St. Mary", city: "Miami", state: "FL", diocese: "Archdiocese of Miami" },
  { name: "St. Augustine Parish", city: "Coral Gables", state: "FL", diocese: "Archdiocese of Miami" },

  // ─── Diocese of Dallas ────────────────────────────────────
  { name: "Cathedral Shrine of the Virgin of Guadalupe", city: "Dallas", state: "TX", diocese: "Diocese of Dallas" },
  { name: "St. Rita Parish", city: "Dallas", state: "TX", diocese: "Diocese of Dallas" },

  // ─── Archdiocese of Galveston-Houston ─────────────────────
  { name: "Co-Cathedral of the Sacred Heart", city: "Houston", state: "TX", diocese: "Archdiocese of Galveston-Houston" },
  { name: "St. Dominic Parish", city: "Houston", state: "TX", diocese: "Archdiocese of Galveston-Houston" },

  // ─── Archdiocese of Detroit ───────────────────────────────
  { name: "Cathedral of the Most Blessed Sacrament", city: "Detroit", state: "MI", diocese: "Archdiocese of Detroit" },
  { name: "Ste. Anne de Detroit Parish", city: "Detroit", state: "MI", diocese: "Archdiocese of Detroit" },

  // ─── Archdiocese of Atlanta ───────────────────────────────
  { name: "Cathedral of Christ the King", city: "Atlanta", state: "GA", diocese: "Archdiocese of Atlanta" },
  { name: "Immaculate Heart of Mary Parish", city: "Atlanta", state: "GA", diocese: "Archdiocese of Atlanta" },

  // ─── Archdiocese of Denver ────────────────────────────────
  { name: "Cathedral Basilica of the Immaculate Conception", city: "Denver", state: "CO", diocese: "Archdiocese of Denver" },

  // ─── Archdiocese of Seattle ───────────────────────────────
  { name: "St. James Cathedral", city: "Seattle", state: "WA", diocese: "Archdiocese of Seattle" },

  // ─── Archdiocese of Portland ──────────────────────────────
  { name: "Cathedral of the Immaculate Conception", city: "Portland", state: "OR", diocese: "Archdiocese of Portland" },

  // ─── Diocese of Providence ────────────────────────────────
  { name: "Cathedral of Ss. Peter and Paul", city: "Providence", state: "RI", diocese: "Diocese of Providence" },
  { name: "St. Mary's Church", city: "Newport", state: "RI", diocese: "Diocese of Providence" },

  // ─── Archdiocese of Hartford ──────────────────────────────
  { name: "Cathedral of St. Joseph", city: "Hartford", state: "CT", diocese: "Archdiocese of Hartford" },

  // ─── Diocese of Manchester ────────────────────────────────
  { name: "St. Joseph Cathedral", city: "Manchester", state: "NH", diocese: "Diocese of Manchester" },

  // ─── Diocese of Burlington ────────────────────────────────
  { name: "Cathedral of the Immaculate Conception", city: "Burlington", state: "VT", diocese: "Diocese of Burlington" },

  // ─── Diocese of Portland (Maine) ──────────────────────────
  { name: "Cathedral of the Immaculate Conception", city: "Portland", state: "ME", diocese: "Diocese of Portland" },
];

async function main() {
  console.log("Seeding parishes...");

  let created = 0;
  let skipped = 0;

  for (const p of parishes) {
    try {
      await prisma.parish.upsert({
        where: {
          name_city_state: { name: p.name, city: p.city, state: p.state },
        },
        update: { diocese: p.diocese },
        create: p,
      });
      created++;
      console.log(`  + ${p.name} — ${p.city}, ${p.state}`);
    } catch {
      skipped++;
      console.log(`  ~ Skipped ${p.name} — ${p.city}, ${p.state}`);
    }
  }

  console.log(`\nSeeded ${created} parishes (${skipped} skipped).`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
