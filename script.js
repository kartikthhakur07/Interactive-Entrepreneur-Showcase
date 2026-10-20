/**
 * Ratan Tata Interactive Showcase - script.js
 * Prepared for: EDC Second-Year Task 02
 * 
 * Architecture:
 * 1. DATA STORES: Plain JS arrays for Milestones, Connection Map, Ventures, and Sources.
 * 2. RENDERING LOGIC: Pure functions mapping data to accessible HTML & SVG nodes.
 * 3. INTERACTION CONTROLLERS: Event handlers for Timeline, Family Tree Map, Tabs, Filters, and Theme.
 */

/* ==========================================================================
   1. DATA STORES
   ========================================================================== */

const milestonesData = [
  {
    id: "m-1937",
    year: "1937",
    dateFull: "28 December 1937",
    title: "Birth in Bombay (Mumbai)",
    summary: "Born into one of India's most distinguished industrial and philanthropic families.",
    details: "Ratan Naval Tata was born to Naval Tata and Sooni Commissariat in Bombay. He was the great-grandson of Jamsetji Tata, the legendary founder of the Tata Group. His upbringing instilled a deep tradition of civic duty and community welfare.",
    significance: "Established the familial lineage that would steer India's industrial policy for over a century.",
    sourceName: "Britannica Biography",
    sourceUrl: "https://www.britannica.com/biography/Ratan-Tata"
  },
  {
    id: "m-1962",
    year: "1962",
    dateFull: "1962",
    title: "Joins Tata Group after Cornell Architecture",
    summary: "Earned a B.Arch from Cornell University before declining IBM to begin on the shop floor.",
    details: "After graduating with a degree in architecture and structural engineering from Cornell University in 1962, Tata chose to join the family business rather than take an offer from IBM in the United States. His first posting was on the blast furnace shop floor of Tata Iron and Steel Company (now Tata Steel) in Jamshedpur, shoveling limestone and working alongside blue-collar workers.",
    significance: "Grounded his engineering perspective in hands-on manufacturing realities rather than executive privilege.",
    sourceName: "Tata Group Archival History",
    sourceUrl: "https://www.tata.com/about-us/heritage/tata-titans/ratan-tata"
  },
  {
    id: "m-1991",
    year: "1991",
    dateFull: "March 1991",
    title: "Appointed Chairman of Tata Sons",
    summary: "Succeeded legendary patriarch J.R.D. Tata as India ushered in economic liberalization.",
    details: "In March 1991, J.R.D. Tata passed the baton of Tata Sons chairmanship to Ratan Tata. Taking charge just as India began liberalizing its economy, Tata faced internal resistance from powerful satraps running individual group companies. He instituted mandatory retirement ages, consolidated controlling stakes, and unified the disjointed entities under a single unified brand identity.",
    significance: "Turned an unwieldy confederation of independent companies into a cohesive modern global enterprise.",
    sourceName: "Britannica Biography",
    sourceUrl: "https://www.britannica.com/biography/Ratan-Tata"
  },
  {
    id: "m-1998",
    year: "1998",
    dateFull: "December 1998",
    title: "Tata Indica Launched",
    summary: "India's first indigenously designed, engineered, and manufactured passenger car.",
    details: "Conceived by Ratan Tata with the bold slogan 'More car per car', the Tata Indica was unveiled at the 1998 Geneva Motor Show and launched in India. At the time, critics doubted an Indian commercial truck manufacturer could engineer a comfortable, affordable passenger hatchback. Despite early production teething troubles, the Indica became a massive domestic success.",
    significance: "Proved India possessed indigenous engineering capability to build competitive passenger vehicles.",
    sourceName: "Tata Motors Heritage",
    sourceUrl: "https://www.tatamotors.com/about-us/heritage/"
  },
  {
    id: "m-2000",
    year: "2000",
    dateFull: "February 2000",
    title: "Tata Tea Acquires British Icon Tetley",
    summary: "A $431M buyout marking the first major overseas cross-border acquisition by an Indian corporate.",
    details: "In a groundbreaking leveraged buyout, Tata Tea purchased the 160-year-old British tea company Tetley for £271 million ($431 million). At more than four times the size of Tata Tea's own net worth, the deal surprised Western financial markets and reversed historical colonial trade flows.",
    significance: "Inaugurated the era of aggressive outbound globalization for Indian multinational corporations.",
    sourceName: "Tata Consumer Products History",
    sourceUrl: "https://www.tataconsumer.com/about-us/our-journey"
  },
  {
    id: "m-2004",
    year: "2004",
    dateFull: "August 2004",
    title: "Tata Consultancy Services (TCS) Goes Public",
    summary: "India's largest IT IPO, raising over $1 billion and creating an engine of long-term group value.",
    details: "Tata Sons took its crown-jewel software services firm public on the Bombay Stock Exchange and National Stock Exchange. The initial public offering raised approximately $1.2 billion, drawing massive oversubscription and catapulting TCS into one of the most valuable IT services companies in the world.",
    significance: "Established the primary cash-generating powerhouse that funded group debt reduction and global ventures.",
    sourceName: "TCS Official Milestones",
    sourceUrl: "https://www.tcs.com/who-we-are"
  },
  {
    id: "m-2007",
    year: "2007–08",
    dateFull: "2007 – 2008",
    title: "Global Mega-Acquisitions: Corus Steel & Jaguar Land Rover",
    summary: "Acquired Anglo-Dutch steelmaker Corus for $12B and luxury marquee Jaguar Land Rover for $2.3B.",
    details: "Tata Steel won an intense bidding war to acquire Corus Group for £6.2 billion ($12 billion) in 2007, making it the world's fifth-largest steel producer. In 2008, amidst the global subprime financial crisis, Tata Motors bought luxury British marques Jaguar and Land Rover from Ford Motor Company for $2.3 billion, successfully turning around the ailing brands into profitable technological innovators.",
    significance: "Positioned the Tata brand on prestigious global roads and industrial supply chains worldwide.",
    sourceName: "Tata Motors & Steel Investor Archives",
    sourceUrl: "https://www.tatamotors.com"
  },
  {
    id: "m-2008",
    year: "2008",
    dateFull: "10 January 2008",
    title: "Tata Nano Unveiled to Global Acclaim",
    summary: "The world's most affordable car (₹1 Lakh / ~$2,000) conceived for everyday working families.",
    details: "Motivated by seeing Indian families of four riding unprotected in heavy monsoon rains on two-wheelers, Ratan Tata committed to creating a safe, weather-protected, ultra-low-cost automobile. Unveiled at the New Delhi Auto Expo, the Nano secured dozens of global engineering patents for frugal engineering.",
    significance: "Symbolized empathy-driven product design and frugal engineering, redefining manufacturing minimalism.",
    sourceName: "Tata Motors Historical Archive",
    sourceUrl: "https://www.tatamotors.com"
  },
  {
    id: "m-2012",
    year: "2012",
    dateFull: "28 December 2012",
    title: "Retires as Executive Chairman at Age 75",
    summary: "Honored his self-mandated retirement policy after expanding group revenues by over 40 times.",
    details: "On his 75th birthday, Ratan Tata stepped down as Chairman of Tata Sons, handing leadership to Cyrus Mistry. During his 21-year chairmanship, group revenues expanded from under $6 billion in 1991 to over $100 billion in 2011–12, with foreign operations contributing roughly 65% of total revenues. He remained Chairman Emeritus and concentrated his energies on the philanthropic Tata Trusts.",
    significance: "Set an enduring precedent of corporate governance by stepping down voluntarily at the prescribed age.",
    sourceName: "Tata Group Press Release",
    sourceUrl: "https://www.tata.com"
  },
  {
    id: "m-2024",
    year: "2024",
    dateFull: "9 October 2024",
    title: "Passing in Mumbai & National Mourning",
    summary: "Passed away at age 86; honored with a state funeral and celebrated as 'India's conscience in commerce'.",
    details: "Ratan Tata breathed his last at Breach Candy Hospital in Mumbai on 9 October 2024. The Government of Maharashtra accorded him a state funeral with full military honors. Millions of citizens, world leaders, industrialists, and students mourned the demise of a gentleman industrialist revered for integrity, modesty, and unconditional love for animals and humanity.",
    significance: "Marked the conclusion of an era, leaving behind an indelible blueprint for conscious capitalism.",
    sourceName: "BBC & Reuters Obituaries",
    sourceUrl: "https://www.britannica.com/biography/Ratan-Tata"
  }
];

/**
 * Data for the Tata Group "Family Tree" Connection Map
 * Explicitly fulfills the PRD's "company-connection map" bonus feature
 */
const connectionMapData = {
  nodes: [
    {
      id: "node-trusts",
      name: "Tata Trusts",
      shortLabel: "Tata Trusts",
      icon: "🏛️",
      roleBadge: "Philanthropic Owner (66%)",
      yearShort: "Endowed 1892",
      category: "trusts",
      categoryName: "Philanthropic Trusts (66% Equity)",
      yearInfo: "Endowed 1892 & 1919 by Jamsetji Tata's Sons",
      x: 460,
      y: 56,
      width: 216,
      height: 52,
      relationship: "Ultimate Beneficial Owner of Tata Sons",
      description: "Sir Dorabji Tata Trust and Sir Ratan Tata Trust together hold roughly 66% of the equity capital of Tata Sons. This unique institutional model ensures that corporate profits flow directly into public good.",
      ratanInvolvement: "Ratan Tata served as Chairman of the Tata Trusts until his passing in 2024. Under his leadership, the Trusts disbursed hundreds of millions of dollars toward cancer hospitals, clean drinking water systems in rural India, and education endowments.",
      officialLink: "https://www.tata.com/about-us/tata-trusts"
    },
    {
      id: "node-sons",
      name: "Tata Sons",
      shortLabel: "Tata Sons (Parent)",
      icon: "🏢",
      roleBadge: "Principal Holding Company",
      yearShort: "Est. 1868",
      category: "parent",
      categoryName: "Principal Holding Company",
      yearInfo: "Founded 1868 by Jamsetji Tata",
      x: 460,
      y: 172,
      width: 226,
      height: 54,
      relationship: "Promoter & Controlling Shareholder of Group Companies",
      description: "The primary holding entity governing the entire Tata federation of companies. It owns the 'Tata' trademark and provides strategic stewardship.",
      ratanInvolvement: "Ratan Tata was Chairman from 1991 to 2012. He brought discipline, instituted mandatory retirement ages, bought back controlling stakes from dissenting chieftains, and unified the fragmented group into a cohesive global enterprise.",
      officialLink: "https://www.tata.com/about-us/heritage"
    },
    {
      id: "node-motors",
      name: "Tata Motors",
      shortLabel: "Tata Motors",
      icon: "🚗",
      roleBadge: "Mobility & EV Pioneer",
      yearShort: "Est. 1945",
      category: "operating",
      categoryName: "Automotive & Mobility Operating Firm",
      yearInfo: "Founded 1945 in Mumbai",
      x: 135,
      y: 295,
      width: 172,
      height: 50,
      relationship: "Subsidiary of Tata Sons",
      description: "India's largest commercial vehicle maker, transformed into a personal car manufacturer and electric mobility pioneer.",
      ratanInvolvement: "Ratan Tata personally drove the decision to build passenger vehicles, designing the Indica (1998) and the low-cost Nano (2008), before orchestrating the historic turnaround of Jaguar Land Rover.",
      officialLink: "https://www.tatamotors.com"
    },
    {
      id: "node-jlr",
      name: "Jaguar Land Rover",
      shortLabel: "Jaguar Land Rover",
      icon: "🐆",
      roleBadge: "Luxury Marquee",
      yearShort: "Acquired 2008 ($2.3B)",
      category: "acquisition",
      categoryName: "Overseas Luxury Acquisition",
      yearInfo: "Acquired June 2008 from Ford ($2.3 Billion)",
      x: 135,
      y: 425,
      width: 184,
      height: 50,
      relationship: "100% Owned Subsidiary of Tata Motors",
      description: "Iconic British luxury marquee brands bought from Ford Motor Company during the global financial crisis.",
      ratanInvolvement: "Ratan Tata personally negotiated the buyout and promised the British engineering unions autonomy and long-term capital. Within two years, JLR returned to profitability and became Tata Motors' largest revenue contributor.",
      officialLink: "https://www.tatamotors.com/about-us/heritage/"
    },
    {
      id: "node-tcs",
      name: "Tata Consultancy Services",
      shortLabel: "TCS",
      icon: "💻",
      roleBadge: "Global Tech Titan",
      yearShort: "Est. 1968 · IPO 2004",
      category: "operating",
      categoryName: "Technology & Software Colossus",
      yearInfo: "Founded 1968 · IPO August 2004",
      x: 350,
      y: 295,
      width: 160,
      height: 50,
      relationship: "Subsidiary of Tata Sons (~72% held)",
      description: "The crown jewel of India's IT revolution, delivering software engineering and digital transformation to global Fortune 500 enterprises.",
      ratanInvolvement: "As Chairman, Ratan Tata guided TCS through its monumental $1.2B public listing in 2004. TCS became the group's most profitable cash engine, financing overseas growth and philanthropic dividends.",
      officialLink: "https://www.tcs.com"
    },
    {
      id: "node-steel",
      name: "Tata Steel",
      shortLabel: "Tata Steel",
      icon: "🏗️",
      roleBadge: "Industrial Bedrock",
      yearShort: "Est. 1907",
      category: "operating",
      categoryName: "Metals & Mining Operating Firm",
      yearInfo: "Founded 1907 in Jamshedpur",
      x: 570,
      y: 295,
      width: 160,
      height: 50,
      relationship: "Subsidiary of Tata Sons",
      description: "Asia's first integrated private steel producer and one of the lowest-cost steel manufacturing networks globally.",
      ratanInvolvement: "Ratan Tata's career began here on the shop floor in 1962 shoveling limestone. Decades later as Chairman, he modernized blast furnaces and guided its aggressive globalization via Corus.",
      officialLink: "https://www.tatasteel.com"
    },
    {
      id: "node-corus",
      name: "Corus Steel (Tata Steel Europe)",
      shortLabel: "Corus Steel",
      icon: "⚙️",
      roleBadge: "European Steel",
      yearShort: "Acquired 2007 ($12B)",
      category: "acquisition",
      categoryName: "Overseas Industrial Acquisition",
      yearInfo: "Acquired April 2007 ($12 Billion)",
      x: 570,
      y: 425,
      width: 178,
      height: 50,
      relationship: "European Subsidiary of Tata Steel",
      description: "Anglo-Dutch steel giant (formerly British Steel and Hoogovens) acquired through a landmark competitive auction in London.",
      ratanInvolvement: "Ratan Tata championed the audacious bid against Brazilian competitor CSN, catapulting Tata Steel into the world's fifth-largest steel manufacturer.",
      officialLink: "https://www.tatasteel.com"
    },
    {
      id: "node-consumer",
      name: "Tata Consumer (Tetley)",
      shortLabel: "Tata Consumer",
      icon: "☕",
      roleBadge: "FMCG Brands",
      yearShort: "Est. 1962 · Tetley 2000",
      category: "operating",
      categoryName: "FMCG & Branded Foods",
      yearInfo: "Founded 1962 · Tetley Acquired 2000",
      x: 785,
      y: 295,
      width: 176,
      height: 50,
      relationship: "Subsidiary of Tata Sons",
      description: "Home to iconic consumer brands including Tata Tea, Tetley, Tata Salt, and Himalayan mineral water.",
      ratanInvolvement: "Ratan Tata backed the $431 million buyout of Tetley Tea in 2000—India's first major outbound leveraged acquisition—initiating Tata's pivot from commodity tea farming to consumer packaging.",
      officialLink: "https://www.tataconsumer.com"
    }
  ],
  links: [
    { from: "node-trusts", to: "node-sons", label: "Holds 66% Equity" },
    { from: "node-sons", to: "node-motors", label: "Parent Stake" },
    { from: "node-motors", to: "node-jlr", label: "Acquired 2008" },
    { from: "node-sons", to: "node-tcs", label: "Parent Stake" },
    { from: "node-sons", to: "node-steel", label: "Parent Stake" },
    { from: "node-steel", to: "node-corus", label: "Acquired 2007" },
    { from: "node-sons", to: "node-consumer", label: "Parent Stake" }
  ]
};

const venturesData = [
  {
    id: "v-tata-sons",
    name: "Tata Sons / Tata Group",
    shortName: "Tata Group",
    sector: "Conglomerate",
    sectorBadge: "Holding / Parent",
    period: "1991–2012 (Chairman), 2016–17 (Interim)",
    role: "Group Chairman & Transformational Architect",
    summary: "The principal investment holding company promoting all Tata ventures across 100+ countries.",
    description: "Tata Sons is the primary holding company of the Tata Group, holding major equity stakes in group companies. Ratan Tata took leadership in 1991 and unified fragmented entities, instituted governance standards, and created Tata Brand Equity and Business Promotion agreements.",
    connection: "Ratan Tata served as Chairman of Tata Sons for 21 years. Over 65% of Tata Sons' equity capital is held by philanthropic trusts endowed by the Tata family, ensuring corporate dividends directly fund societal welfare.",
    impactPoint: "40-fold revenue growth from ~$5.8B (1991) to $100B+ (2012); global operations contributing >65% of revenue.",
    officialUrl: "https://www.tata.com",
    tagline: "Leadership with Trust"
  },
  {
    id: "v-tata-motors",
    name: "Tata Motors Limited",
    shortName: "Tata Motors",
    sector: "Automotive",
    sectorBadge: "Automotive & Mobility",
    period: "1991–2012 (Chairman)",
    role: "Chairman & Automotive Visionary",
    summary: "Pioneered indigenous passenger automobiles (Indica, Nano) and acquired global luxury brands Jaguar & Land Rover.",
    description: "Formerly TELCO (Tata Engineering and Locomotive Company), Tata Motors expanded from commercial utility trucks into consumer passenger vehicles under Ratan Tata's personal passion for engineering. His flagship bets included the Indica (India's first indigenous passenger car), the Nano (the ₹1 Lakh frugal car), and the 2008 turnaround acquisition of Jaguar Land Rover from Ford.",
    connection: "Ratan Tata personally spearheaded the passenger car initiative against domestic skepticism and led the negotiation team for the $2.3B JLR acquisition, overseeing its historic product and engineering revival.",
    impactPoint: "Turned Jaguar Land Rover profitable within two years of acquisition; now India's largest electric vehicle automaker.",
    officialUrl: "https://www.tatamotors.com",
    tagline: "Connecting Aspirations"
  },
  {
    id: "v-tcs",
    name: "Tata Consultancy Services (TCS)",
    shortName: "TCS",
    sector: "Technology",
    sectorBadge: "Information Technology",
    period: "1991–2012 (Chairman)",
    role: "Chairman of the Board",
    summary: "India's premier IT consulting and digital transformation titan, listed via landmark IPO in 2004.",
    description: "Pioneered in 1968 as a division of Tata Sons, TCS grew under Ratan Tata's governance into an international digital engineering colossus. He supported early investments in software engineering R&D, international client delivery centers, and approved its monumental 2004 initial public offering.",
    connection: "As Chairman of Tata Sons and TCS, Ratan Tata guided its strategic growth as the core pillar of Tata Group's market capitalization and earnings, serving as the financial bedrock for philanthropic distributions.",
    impactPoint: "Grew to over 600,000 employees globally with a market capitalization surpassing $150 billion.",
    officialUrl: "https://www.tcs.com",
    tagline: "Building on Belief"
  },
  {
    id: "v-tata-steel",
    name: "Tata Steel Limited",
    shortName: "Tata Steel",
    sector: "Metals",
    sectorBadge: "Metals & Mining",
    period: "1962 (Apprentice), 1991–2012 (Chairman)",
    role: "Chairman & Former Shop-Floor Engineer",
    summary: "One of the world's most geographically diversified steelmakers, with historic roots in Jamshedpur.",
    description: "Founded in 1907 by Jamsetji Tata as India's first integrated private steel producer. Under Ratan Tata, the company modernized blast furnaces, dramatically reduced production costs per ton, and executed the landmark 2007 cross-border acquisition of Corus Group (formerly British Steel and Hoogovens).",
    connection: "Ratan Tata began his career at Tata Steel's Jamshedpur blast furnace in 1962 shoveling raw materials. Decades later as Chairman, he led its internationalization into Europe and Southeast Asia.",
    impactPoint: "Expanded annual steel capacity five-fold, making it one of the lowest-cost steel producers worldwide.",
    officialUrl: "https://www.tatasteel.com",
    tagline: "We Also Make Tomorrow"
  },
  {
    id: "v-tata-consumer",
    name: "Tata Consumer Products (Tetley / Tata Tea)",
    shortName: "Tata Consumer",
    sector: "Consumer",
    sectorBadge: "FMCG & Consumer Goods",
    period: "1991–2012 (Chairman)",
    role: "Chairman & Strategic Dealmaker",
    summary: "Pioneered the historic 2000 Tetley Tea buyout, transforming a plantation business into a global branded FMCG leader.",
    description: "Originally Tata Tea, a domestic plantation and packet tea enterprise. Recognizing that plantations were cyclical commodity businesses, Ratan Tata spearheaded the $431M acquisition of Britain's Tetley Tea in 2000—India's first major outbound cross-border acquisition—paving the way for branded FMCG growth.",
    connection: "Ratan Tata directly championed the audacious leveraged buyout of Tetley, proving that Indian companies could acquire and steward household heritage brands in Europe and North America.",
    impactPoint: "Transformed Tata Consumer Products into an FMCG juggernaut managing Himalayan water, Tata Salt, and Starbucks India JV.",
    officialUrl: "https://www.tataconsumer.com",
    tagline: "For Better Living"
  },
  {
    id: "v-startups",
    name: "RNT Associates & Startup Portfolio",
    shortName: "Startup Investments",
    sector: "Startups",
    sectorBadge: "Angel & Venture Capital",
    period: "2013–2024",
    role: "Angel Investor & Mentor to Founders",
    summary: "Personal seed investments backing India's next-generation digital economy and tech entrepreneurs.",
    description: "Following his 2012 retirement from Tata Sons, Ratan Tata established his private investment office (RNT Associates) and UC-RNT fund. He personally backed over 50 early-stage technology startups, providing mentorship, credibility, and governance guidance to young founders.",
    connection: "Ratan Tata personally selected startups addressing real consumer pain points, writing personal cheques for founders of Paytm, Ola Cabs, Urban Company, Lenskart, CarDekho, BlueStone, and Cure.fit.",
    impactPoint: "Catalyzed investor confidence across India's startup ecosystem during its formative venture capital boom.",
    officialUrl: "https://www.tata.com",
    tagline: "Empowering Next-Gen Founders"
  }
];

const sourcesData = [
  {
    entity: "Tata Group (Official)",
    fact: "Tenure as Chairman (1991–2012), 40x revenue expansion, group history, and philanthropic trust ownership structure (>65%).",
    sourceName: "Tata Group Corporate Heritage Portal",
    url: "https://www.tata.com/about-us/heritage/tata-titans/ratan-tata"
  },
  {
    entity: "Encyclopaedia Britannica",
    fact: "Birth details (28 Dec 1937), Cornell architecture degree (1962), J.R.D. Tata succession (1991), and passing date (9 Oct 2024).",
    sourceName: "Britannica Peer-Reviewed Biography",
    url: "https://www.britannica.com/biography/Ratan-Tata"
  },
  {
    entity: "Tata Motors Limited",
    fact: "Tata Indica launch (1998), Tata Nano unveiling (2008), and acquisition of Jaguar Land Rover from Ford ($2.3B in 2008).",
    sourceName: "Tata Motors Official Investor & Heritage Pages",
    url: "https://www.tatamotors.com/about-us/heritage/"
  },
  {
    entity: "Tata Consultancy Services (TCS)",
    fact: "2004 Initial Public Offering raising ~$1.2B and transition into global IT leader.",
    sourceName: "TCS Corporate Overview & BSE/NSE filings",
    url: "https://www.tcs.com/who-we-are"
  },
  {
    entity: "Tata Steel Limited",
    fact: "1962 shop-floor training in Jamshedpur and 2007 Corus Group acquisition ($12B).",
    sourceName: "Tata Steel Investor Relations & Archives",
    url: "https://www.tatasteel.com"
  },
  {
    entity: "Tata Consumer Products",
    fact: "Tetley Tea buyout in 2000 (£271 million / $431 million leveraged acquisition).",
    sourceName: "Tata Consumer Products Journey History",
    url: "https://www.tataconsumer.com/about-us/our-journey"
  },
  {
    entity: "Wikimedia Commons",
    fact: "Portrait photograph of Ratan Tata (2011) by photographer Hemant Mishra under CC BY-SA 3.0 license.",
    sourceName: "Wikimedia Commons Digital Archive",
    url: "https://commons.wikimedia.org/wiki/File:Ratan_Naval_Tata_in_2011.jpg"
  }
];

/* ==========================================================================
   2. RENDERING LOGIC (Generates UI from Data)
   ========================================================================== */

/**
 * Render the interactive Milestones ScrollStack Deck from milestonesData
 */
function renderMilestones() {
  const container = document.getElementById("timeline-container");
  if (!container) return;

  const total = milestonesData.length;

  container.innerHTML = milestonesData.map((m, index) => {
    const padIndex = String(index + 1).padStart(2, "0");
    const totalCards = String(total).padStart(2, "0");
    return `
      <article 
        class="scroll-stack-item" 
        id="item-${m.id}" 
        data-index="${index}"
        style="top: calc(96px + ${index * 16}px); z-index: ${index + 1};"
      >
        <div class="scroll-stack-item-inner">
          <header class="card-stack-header">
            <div class="stack-meta-row">
              <span class="stack-year-pill">${m.year}</span>
              <span class="stack-date">${m.dateFull}</span>
            </div>
            <span class="stack-card-counter">Milestone ${padIndex} / ${totalCards}</span>
          </header>

          <h3 class="stack-card-title">${m.title}</h3>
          <p class="stack-card-summary">${m.summary}</p>

          <div class="stack-card-details">
            <div class="stack-detail-block">
              <span class="stack-label">Background & Context</span>
              <p class="stack-text">${m.details}</p>
            </div>
            <div class="stack-detail-block highlight">
              <span class="stack-label">Strategic Significance</span>
              <p class="stack-text">${m.significance}</p>
            </div>
          </div>

          <footer class="stack-card-footer">
            <span class="stack-source-label">Source Verification:</span>
            <a href="${m.sourceUrl}" target="_blank" rel="noopener noreferrer" class="apple-link">
              ${m.sourceName} ↗
            </a>
          </footer>
        </div>
      </article>
    `;
  }).join("");

  initScrollStackPhysics();
}

/**
 * Scroll-synchronized physics for the ScrollStack Deck
 * Progressively scales down and dims cards as they are covered by incoming cards
 */
function initScrollStackPhysics() {
  const container = document.getElementById("timeline-container");
  if (!container) return;

  const items = container.querySelectorAll(".scroll-stack-item");
  if (!items.length) return;

  const counter = document.getElementById("scroll-stack-counter");
  let ticking = false;

  const updateStack = () => {
    let activeIndex = 0;

    items.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      let coveredBy = 0;

      for (let j = index + 1; j < items.length; j++) {
        const nextRect = items[j].getBoundingClientRect();
        if (nextRect.top <= itemRect.top + 32) {
          coveredBy++;
        }
      }

      if (itemRect.top <= 140 && itemRect.bottom > 140) {
        activeIndex = index;
      }

      const scale = Math.max(0.78, 1 - coveredBy * 0.032);
      const brightness = Math.max(0.42, 1 - coveredBy * 0.075);
      const translateY = -(coveredBy * 6);
      const inner = item.querySelector(".scroll-stack-item-inner");
      if (inner) {
        inner.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        inner.style.filter = `brightness(${brightness})`;
        inner.style.opacity = coveredBy > 5 ? "0.35" : "1";
      }
    });

    if (counter) {
      const m = milestonesData[activeIndex];
      if (m) {
        counter.textContent = `Card ${activeIndex + 1} of 10 · ${m.year} · ${m.title}`;
      }
    }

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateStack);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  updateStack();
}

/**
 * Render the Tata Group Connection Map (Bonus Feature)
 * Generates high-DPI interactive SVG architecture connecting Trusts -> Tata Sons -> Operating firms & Acquisitions
 */
let activeMapNodeId = "node-sons";

function renderConnectionMap() {
  const holder = document.getElementById("map-svg-holder");
  if (!holder) return;

  const { nodes, links } = connectionMapData;

  // Build connector SVG paths (Smooth Bezier curves with flowing energy pulse)
  const linesMarkup = links.map(link => {
    const source = nodes.find(n => n.id === link.from);
    const target = nodes.find(n => n.id === link.to);
    if (!source || !target) return "";

    const startX = source.x;
    const startY = source.y + source.height / 2;
    const endX = target.x;
    const endY = target.y - target.height / 2;

    let pathD = "";
    if (Math.abs(startX - endX) < 2) {
      pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
    } else {
      const midY = (startY + endY) / 2;
      pathD = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
    }

    const isConnected = activeMapNodeId === source.id || activeMapNodeId === target.id;

    return `
      <g class="map-link-group ${isConnected ? "link-active" : ""}" data-from="${source.id}" data-to="${target.id}">
        <path 
          d="${pathD}" 
          class="map-link-base"
        />
        <path 
          d="${pathD}" 
          class="map-link-pulse"
        />
      </g>
    `;
  }).join("");

  // Build node groups (Symmetrical interactive card capsules)
  const nodesMarkup = nodes.map(node => {
    const isActive = node.id === activeMapNodeId;
    const halfW = node.width / 2;
    const halfH = node.height / 2;
    const rx = 14;

    return `
      <g 
        class="map-node-group category-${node.category} ${isActive ? "active-node" : ""}" 
        id="svg-${node.id}"
        data-node-id="${node.id}"
        tabindex="0"
        role="button"
        aria-label="${node.name} (${node.categoryName})"
        aria-pressed="${isActive}"
        transform="translate(${node.x}, ${node.y})"
      >
        <!-- Card Background Pill -->
        <rect 
          x="${-halfW}" 
          y="${-halfH}" 
          width="${node.width}" 
          height="${node.height}" 
          rx="${rx}" 
          class="map-node-card-bg"
        />
        <!-- Active Glow Ring -->
        <rect 
          x="${-halfW - 3}" 
          y="${-halfH - 3}" 
          width="${node.width + 6}" 
          height="${node.height + 6}" 
          rx="${rx + 2}" 
          class="map-node-ring"
        />
        <!-- Category Icon Emblem -->
        <circle 
          cx="${-halfW + 24}" 
          cy="0" 
          r="14" 
          class="map-node-icon-circle"
        />
        <text 
          x="${-halfW + 24}" 
          y="4.5" 
          text-anchor="middle" 
          class="map-node-icon"
        >${node.icon}</text>

        <!-- Node Title -->
        <text 
          x="${-halfW + 46}" 
          y="-3" 
          class="map-node-title"
        >${node.shortLabel}</text>

        <!-- Role / Year Subtitle -->
        <text 
          x="${-halfW + 46}" 
          y="13" 
          class="map-node-subtitle"
        >${node.roleBadge}</text>
      </g>
    `;
  }).join("");

  holder.innerHTML = `
    <svg 
      class="connection-svg" 
      viewBox="0 0 920 500" 
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Tata Group enterprise family tree map diagram"
    >
      <defs>
        <!-- Ambient drop shadow for cards -->
        <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.08" />
        </filter>
        <filter id="activeGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#0066cc" flood-opacity="0.35" />
        </filter>
      </defs>
      <g class="svg-links-layer">${linesMarkup}</g>
      <g class="svg-nodes-layer">${nodesMarkup}</g>
    </svg>
  `;

  renderConnectionMapDetails(activeMapNodeId);
  attachConnectionMapListeners();
  initSpotlightEffect();
}

/**
 * Event listeners for SVG connection map nodes
 */
function attachConnectionMapListeners() {
  const nodeGroups = document.querySelectorAll(".map-node-group");

  nodeGroups.forEach(nodeEl => {
    const handleSelect = () => {
      const nodeId = nodeEl.getAttribute("data-node-id");
      if (!nodeId) return;

      activeMapNodeId = nodeId;

      nodeGroups.forEach(n => {
        const isCurrent = n.getAttribute("data-node-id") === nodeId;
        n.classList.toggle("active-node", isCurrent);
        n.setAttribute("aria-pressed", isCurrent);
      });

      // Update link highlights
      const linkGroups = document.querySelectorAll(".map-link-group");
      linkGroups.forEach(lg => {
        const from = lg.getAttribute("data-from");
        const to = lg.getAttribute("data-to");
        const isConnected = from === nodeId || to === nodeId;
        lg.classList.toggle("link-active", isConnected);
      });

      renderConnectionMapDetails(nodeId);
    };

    nodeEl.addEventListener("click", handleSelect);
    nodeEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelect();
      }
    });
  });
}

/**
 * Render the details card for the selected connection map node
 * Redesigned as an Apple / ReactBits Spotlight Card
 */
function renderConnectionMapDetails(nodeId) {
  const detailsContainer = document.getElementById("map-node-details");
  if (!detailsContainer) return;

  const node = connectionMapData.nodes.find(n => n.id === nodeId) || connectionMapData.nodes[1];

  let badgeColorClass = "badge-parent";
  let accentDot = "#0066cc";
  if (node.category === "trusts") { badgeColorClass = "badge-trusts"; accentDot = "#34c759"; }
  if (node.category === "acquisition") { badgeColorClass = "badge-acquisition"; accentDot = "#ff9500"; }
  if (node.category === "operating") { badgeColorClass = "badge-operating"; accentDot = "#0071e3"; }

  detailsContainer.innerHTML = `
    <div class="spotlight-card-content">
      <div class="map-detail-header">
        <span class="badge ${badgeColorClass}">
          <span class="badge-dot" style="background:${accentDot}"></span>
          ${node.categoryName}
        </span>
        <span class="detail-year-tag">${node.yearInfo.split("·")[0].trim()}</span>
      </div>

      <div class="detail-title-group">
        <h4 class="detail-title">${node.name}</h4>
        <div class="detail-rel-pill">
          <span class="rel-icon">🔗</span>
          <span>${node.relationship}</span>
        </div>
      </div>
      
      <div class="detail-feature-card">
        <div class="feature-card-header">
          <span class="feature-icon">🌐</span>
          <span class="feature-label">Strategic Mandate & Architecture</span>
        </div>
        <p class="feature-text">${node.description}</p>
      </div>

      <div class="detail-feature-card feature-highlight">
        <div class="feature-card-header">
          <span class="feature-icon">⚡</span>
          <span class="feature-label">Ratan Tata's Decisive Leadership</span>
        </div>
        <p class="feature-text">${node.ratanInvolvement}</p>
      </div>

      <div class="map-detail-footer">
        <a href="${node.officialLink}" target="_blank" rel="noopener noreferrer" class="apple-button-primary spotlight-link-btn">
          <span>Explore Official Portal</span>
          <svg class="btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
        </a>
        <span class="map-hint-text">Interactive: Click any node to inspect stewardship links</span>
      </div>
    </div>
  `;
}

/**
 * Dynamic Mouse-Tracking Spotlight Effect (ReactBits / Apple aesthetic)
 * Tracks cursor coordinates on card surfaces to project realistic radial luminescence
 */
function initSpotlightEffect() {
  const cards = document.querySelectorAll(".spotlight-card, #map-node-details");
  cards.forEach(card => {
    if (card._hasSpotlightListener) return;
    card._hasSpotlightListener = true;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.removeProperty("--mouse-x");
      card.style.removeProperty("--mouse-y");
    });
  });
}

/**
 * State manager for Ventures Directory UI
 */
const ventureState = {
  activeSector: "All",
  activeTabId: venturesData[0].id
};

/**
 * Render the Sector Filter Tags
 */
function renderVentureFilters() {
  const container = document.getElementById("venture-filters");
  if (!container) return;

  const sectors = ["All", ...new Set(venturesData.map(v => v.sector))];

  container.innerHTML = sectors.map(sector => {
    const isSelected = sector === ventureState.activeSector;
    return `
      <button 
        type="button" 
        class="filter-tag ${isSelected ? "active" : ""}" 
        data-sector="${sector}"
        aria-pressed="${isSelected}"
      >
        ${sector === "All" ? "★ All Sectors" : sector}
      </button>
    `;
  }).join("");

  container.querySelectorAll(".filter-tag").forEach(tag => {
    tag.addEventListener("click", (e) => {
      const selectedSector = e.currentTarget.getAttribute("data-sector");
      ventureState.activeSector = selectedSector;
      renderVentureFilters();
      renderVentureCards();
    });
  });
}

/**
 * Render Tablist for quick venture switching (Vertical Master List)
 */
function renderVentureTabs() {
  const container = document.getElementById("ventures-tablist");
  if (!container) return;

  container.innerHTML = venturesData.map((v) => {
    const isActive = v.id === ventureState.activeTabId;
    return `
      <button 
        role="tab" 
        class="venture-nav-tab ${isActive ? "active" : ""}" 
        id="tab-${v.id}"
        aria-selected="${isActive}"
        aria-controls="ventures-spotlight"
        data-venture-id="${v.id}"
      >
        <div class="tab-info-group">
          <span class="tab-badge">${v.sectorBadge || v.sector}</span>
          <span class="tab-title">${v.shortName}</span>
        </div>
        <span class="tab-chevron">›</span>
      </button>
    `;
  }).join("");

  container.querySelectorAll(".venture-nav-tab").forEach(tab => {
    tab.addEventListener("click", (e) => {
      const ventureId = e.currentTarget.getAttribute("data-venture-id");
      ventureState.activeTabId = ventureId;
      renderVentureTabs();
      renderVentureSpotlight();
    });
  });
}

/**
 * Render the selected venture spotlight preview (Tab Panel)
 */
function renderVentureSpotlight() {
  const container = document.getElementById("ventures-spotlight");
  if (!container) return;

  const venture = venturesData.find(v => v.id === ventureState.activeTabId) || venturesData[0];

  container.innerHTML = `
    <div class="spotlight-content-wrap">
      <div class="spotlight-header">
        <div class="spotlight-badges">
          <span class="badge badge-accent">${venture.sectorBadge}</span>
          <span class="badge badge-period">${venture.period}</span>
        </div>
        <h3 class="spotlight-title">${venture.name}</h3>
        <p class="spotlight-role"><strong>Role & Connection:</strong> ${venture.role}</p>
      </div>

      <div class="spotlight-body">
        <p class="spotlight-desc">${venture.description}</p>
        
        <div class="spotlight-details-grid">
          <div class="detail-box">
            <span class="detail-label">Ratan Tata's Direct Influence</span>
            <p class="detail-text">${venture.connection}</p>
          </div>
          <div class="detail-box highlight-box">
            <span class="detail-label">Measurable Milestone / Impact</span>
            <p class="detail-text">${venture.impactPoint}</p>
          </div>
        </div>
      </div>

      <div class="spotlight-footer">
        <span class="spotlight-tagline">“${venture.tagline}”</span>
        <a href="${venture.officialUrl}" target="_blank" rel="noopener noreferrer" class="apple-button-primary spotlight-link-btn">
          <span>Visit Official Portal</span>
          <svg class="btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
        </a>
      </div>
    </div>
  `;
}

const orkaCardMeta = {
  "v-tata-sons": {
    badge: "HOLDING",
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 21h18M3 7v14M21 7v14M6 11h4M6 15h4M14 11h4M14 15h4M9 3l3-2 3 2v4H9V3z"/></svg>`,
    title: "Tata Sons",
    summary: "Apex holding entity governing the global Tata federation.",
    statLabel: "GROWTH",
    statValue: "40x+ ($100B)"
  },
  "v-tata-motors": {
    badge: "MOBILITY",
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/></svg>`,
    title: "Tata Motors",
    summary: "Passenger auto pioneer & historic Jaguar Land Rover revival.",
    statLabel: "TURNAROUND",
    statValue: "JLR in 2 Yrs"
  },
  "v-tcs": {
    badge: "SOFTWARE",
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    title: "TCS",
    summary: "Premier IT software colossus powering Fortune 500 clients.",
    statLabel: "TALENT",
    statValue: "600,000+ Eng."
  },
  "v-tata-steel": {
    badge: "METALS",
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M2 20h20M5 20V8l7-5 7 5v12M9 12h6"/></svg>`,
    title: "Tata Steel",
    summary: "Historic blast furnaces scaled into top-5 global steelmaker.",
    statLabel: "CAPACITY",
    statValue: "5x Expansion"
  },
  "v-tata-consumer": {
    badge: "FMCG",
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>`,
    title: "Tata Consumer",
    summary: "Landmark Tetley buyout initiating India's branded FMCG pivot.",
    statLabel: "M&A DEAL",
    statValue: "$431M Tetley"
  },
  "v-startups": {
    badge: "VENTURES",
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    title: "Startup Portfolio",
    summary: "Personal seed capital backing 50+ young tech unicorn founders.",
    statLabel: "ECOSYSTEM",
    statValue: "50+ Seeded"
  }
};

/**
 * Render the ORKA-style Carousel of Dark Venture Cards
 */
function renderVentureCards() {
  const container = document.getElementById("ventures-grid");
  const counter = document.getElementById("venture-counter");
  if (!container) return;

  const filtered = ventureState.activeSector === "All"
    ? venturesData
    : venturesData.filter(v => v.sector === ventureState.activeSector);

  if (counter) {
    counter.textContent = `${filtered.length} of ${venturesData.length} Enterprises`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `<p class="empty-state">No ventures found for sector "${ventureState.activeSector}".</p>`;
    return;
  }

  const cardsMarkup = filtered.map(v => {
    const meta = orkaCardMeta[v.id] || {
      badge: v.sector.toUpperCase(),
      icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/></svg>`,
      title: v.shortName || v.name,
      summary: v.summary,
      statLabel: "TIMELINE",
      statValue: v.period.split(" ")[0]
    };

    return `
      <article class="orka-card" id="card-${v.id}" tabindex="0">
        <div class="orka-card-top">
          <div class="orka-card-header">
            <span class="orka-pill-badge">${meta.badge}</span>
            <div class="orka-icon-badge" aria-hidden="true">
              ${meta.icon}
            </div>
          </div>
          <h4 class="orka-card-title">${meta.title}</h4>
          <p class="orka-card-desc">${meta.summary}</p>
        </div>

        <div class="orka-card-bottom">
          <span class="orka-stat-label">${meta.statLabel}</span>
          <span class="orka-stat-value">${meta.statValue}</span>
        </div>
      </article>
    `;
  }).join("");

  // Seamless infinite loop by duplicating cards into two equal groups
  container.innerHTML = `
    <div class="orka-marquee-group">
      ${cardsMarkup}
    </div>
    <div class="orka-marquee-group" aria-hidden="true">
      ${cardsMarkup}
    </div>
  `;

  initOrkaCarousel();
}

/**
 * Attach controls to ORKA moving carousel
 */
function initOrkaCarousel() {
  const track = document.getElementById("ventures-grid");
  const prevBtn = document.getElementById("orka-prev-btn");
  const nextBtn = document.getElementById("orka-next-btn");

  if (!track) return;
  if (track._hasOrkaListeners) return;
  track._hasOrkaListeners = true;

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      track.style.animationDirection = "reverse";
      track.style.animationPlayState = "running";
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      track.style.animationDirection = "normal";
      track.style.animationPlayState = "running";
    });
  }
}

/**
 * Render Sources Table
 */
function renderSources() {
  const tbody = document.getElementById("sources-table-body");
  if (!tbody) return;

  tbody.innerHTML = sourcesData.map(s => {
    return `
      <tr>
        <td class="font-medium">${s.entity}</td>
        <td>${s.fact}</td>
        <td>${s.sourceName}</td>
        <td>
          <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="apple-link">
            Verify Link ↗
          </a>
        </td>
      </tr>
    `;
  }).join("");
}

/* ==========================================================================
   3. APPLE SUB-NAV & INTERSECTION OBSERVER
   ========================================================================== */

function initNavigation() {
  const navLinks = document.querySelectorAll(".sub-nav-link");
  const sections = document.querySelectorAll("main section[id]");

  // Active link highlighting via IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -65% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   4. INTERACTIVE 3D LANYARD CREDENTIAL CONTROLLER (LARGE ID BADGE)
   ========================================================================== */

function initLanyard() {
  const container = document.getElementById("lanyard-container");
  const canvas = document.getElementById("lanyard-canvas");
  const card = document.getElementById("lanyard-card");
  if (!container || !canvas || !card) return;

  const ctx = canvas.getContext("2d");
  let animationFrameId;

  const rest = { x: container.clientWidth / 2, y: 110 };

  const state = {
    x: rest.x,
    y: rest.y,
    vx: 0,
    vy: 0,
    rotZ: 0,
    vRotZ: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    lastPointerX: rest.x,
    lastPointerY: rest.y
  };

  // Setup full-screen fixed canvas size
  const updateSize = () => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!state.isDragging) {
      state.x = container.clientWidth / 2;
    }
  };
  updateSize();
  window.addEventListener("resize", updateSize);

  card.addEventListener("pointerdown", (e) => {
    state.isDragging = true;
    card.classList.add("is-dragging");

    // Remove drag hint below header when dragged
    const dragHint = document.getElementById("header-drag-hint");
    if (dragHint) {
      dragHint.classList.add("is-hidden");
    }

    const cRect = card.getBoundingClientRect();
    state.dragOffsetX = e.clientX - (cRect.left + cRect.width / 2);
    state.dragOffsetY = e.clientY - (cRect.top + 24);
    state.lastPointerX = e.clientX;
    state.lastPointerY = e.clientY;
    state.dragStartX = e.clientX;
    state.dragStartY = e.clientY;
    try { card.setPointerCapture(e.pointerId); } catch (_) {}
  });

  window.addEventListener("pointermove", (e) => {
    if (!state.isDragging) return;
    const bRect = container.getBoundingClientRect();
    const targetX = e.clientX - bRect.left - (state.dragOffsetX || 0);
    const targetY = e.clientY - bRect.top - (state.dragOffsetY || 0);

    const dx = e.clientX - state.lastPointerX;
    const dy = e.clientY - state.lastPointerY;

    state.vx = dx * 0.45;
    state.vy = dy * 0.45;

    // Freely draggable throughout the entire page without clamping
    state.x = targetX;
    state.y = targetY;

    state.vRotZ = Math.max(-35, Math.min(35, dx * 0.85));
    state.lastPointerX = e.clientX;
    state.lastPointerY = e.clientY;
  });

  const handlePointerUp = (e) => {
    if (state.isDragging) {
      state.isDragging = false;
      card.classList.remove("is-dragging");
      try { card.releasePointerCapture(e.pointerId); } catch (_) {}
    }
  };

  window.addEventListener("pointerup", handlePointerUp);
  window.addEventListener("pointercancel", handlePointerUp);

  const springK = 0.045;
  const damping = 0.88;

  const animate = () => {
    rest.x = container.clientWidth / 2;

    if (!state.isDragging) {
      const fx = -springK * (state.x - rest.x);
      const fy = -springK * (state.y - rest.y);

      state.vx = Math.max(-45, Math.min(45, (state.vx + fx) * damping));
      state.vy = Math.max(-45, Math.min(45, (state.vy + fy) * damping));

      state.x += state.vx;
      state.y += state.vy;

      state.vRotZ = (state.vRotZ - 0.09 * (state.rotZ - state.vx * 1.5)) * 0.89;
      state.rotZ += state.vRotZ;
    } else {
      state.rotZ += (state.vRotZ - state.rotZ) * 0.35;
    }

    // Clear the fixed full-window canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Calculate anchor point on screen (bottom edge of the sticky frosted sub-nav header)
    const subNav = document.getElementById("sub-nav") || document.querySelector(".sub-nav-frosted");
    const subNavRect = subNav ? subNav.getBoundingClientRect() : { bottom: 52 };
    const cRect = container.getBoundingClientRect();
    const anchorScreenX = cRect.left + container.clientWidth / 2;
    const anchorScreenY = Math.max(0, subNavRect.bottom);

    // Calculate card clip position on screen
    const cardRect = card.getBoundingClientRect();
    const clipScreenX = cardRect.left + cardRect.width / 2;
    const clipScreenY = cardRect.top + 2;

    ctx.save();
    // Strap Left Ribbon (coming directly from the header)
    ctx.beginPath();
    ctx.moveTo(anchorScreenX - 16, anchorScreenY);
    ctx.quadraticCurveTo(
      anchorScreenX + (clipScreenX - anchorScreenX) * 0.35 - 14,
      anchorScreenY + (clipScreenY - anchorScreenY) * 0.5,
      clipScreenX - 6,
      clipScreenY
    );
    ctx.lineWidth = 16;
    ctx.strokeStyle = "#0d1424";
    ctx.stroke();

    // Strap Right Ribbon
    ctx.beginPath();
    ctx.moveTo(anchorScreenX + 16, anchorScreenY);
    ctx.quadraticCurveTo(
      anchorScreenX + (clipScreenX - anchorScreenX) * 0.35 + 14,
      anchorScreenY + (clipScreenY - anchorScreenY) * 0.5,
      clipScreenX + 6,
      clipScreenY
    );
    ctx.lineWidth = 16;
    ctx.strokeStyle = "#131d33";
    ctx.stroke();

    // Gold decorative stitching along strap edges
    ctx.beginPath();
    ctx.moveTo(anchorScreenX - 24, anchorScreenY);
    ctx.quadraticCurveTo(
      anchorScreenX + (clipScreenX - anchorScreenX) * 0.35 - 22,
      anchorScreenY + (clipScreenY - anchorScreenY) * 0.5,
      clipScreenX - 12,
      clipScreenY
    );
    ctx.lineWidth = 1.8;
    ctx.strokeStyle = "#d4af37";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(anchorScreenX + 24, anchorScreenY);
    ctx.quadraticCurveTo(
      anchorScreenX + (clipScreenX - anchorScreenX) * 0.35 + 22,
      anchorScreenY + (clipScreenY - anchorScreenY) * 0.5,
      clipScreenX + 12,
      clipScreenY
    );
    ctx.lineWidth = 1.8;
    ctx.strokeStyle = "#d4af37";
    ctx.stroke();

    ctx.restore();

    card.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, 0) rotateZ(${state.rotZ}deg)`;

    animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}

/* ==========================================================================
   4B. REACTBITS CARD SWAP (3D STACKED DECK FOR IMPACT SECTION)
   ========================================================================== */

/**
 * Initializes the 3D card swapping deck in the Impact & Takeaways section
 */
function initCardSwap() {
  const viewport = document.getElementById("card-swap-viewport");
  if (!viewport) return;

  const cards = Array.from(viewport.querySelectorAll(".card-swap-card"));
  const nextBtn = document.getElementById("swap-next-btn");
  const dots = Array.from(document.querySelectorAll(".card-swap-dot"));
  const numCards = cards.length;
  if (numCards === 0) return;

  // Track active card order: slot 0 is front card
  let cardOrder = cards.map((_, i) => i);
  let isAnimating = false;
  let autoSwapTimer = null;
  const DELAY = 4000;

  // 3D slot transformation geometry - keep 100% opacity for pure white brightness
  const slots = [
    { transform: "translate3d(0, 0, 0) scale(1)", zIndex: 10, brightness: "1" },
    { transform: "translate3d(0, 16px, -35px) scale(0.96)", zIndex: 7, brightness: "0.94" },
    { transform: "translate3d(0, 32px, -70px) scale(0.92)", zIndex: 5, brightness: "0.88" },
    { transform: "translate3d(0, 48px, -105px) scale(0.88)", zIndex: 3, brightness: "0.82" }
  ];

  function applyPositions(animated = true) {
    cardOrder.forEach((cardIdx, slotIdx) => {
      const card = cards[cardIdx];
      const slot = slots[slotIdx] || slots[slots.length - 1];

      if (!animated) {
        card.style.transition = "none";
      } else {
        card.style.transition = "";
      }

      card.style.transform = slot.transform;
      card.style.zIndex = slot.zIndex;
      card.style.opacity = "1";
      card.style.filter = `brightness(${slot.brightness})`;
      card.style.pointerEvents = slotIdx === 0 ? "auto" : "none";

      if (slotIdx === 0) {
        card.classList.add("card-top");
      } else {
        card.classList.remove("card-top");
      }
    });

    // Sync active pagination dot
    const activeFrontIdx = cardOrder[0];
    const isFourthCard = activeFrontIdx === numCards - 1;

    dots.forEach((dot, idx) => {
      const isActive = idx === activeFrontIdx;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-selected", isActive);
    });

    // Update bottom interaction hint
    const hintEl = document.getElementById("card-swap-hint");
    if (hintEl) {
      if (isFourthCard) {
        hintEl.innerHTML = "Click card to explore Sources &amp; Documentation &darr;";
        hintEl.style.color = "#30d158";
        hintEl.style.fontWeight = "600";
      } else {
        hintEl.textContent = "Click card to swap · Auto-swaps every 4s";
        hintEl.style.color = "";
        hintEl.style.fontWeight = "";
      }
    }

    // When 4th card appears, pause auto-swap so user can click to scroll down
    if (isFourthCard) {
      stopTimer();
    }
  }

  function swapNext() {
    if (isAnimating) return;
    isAnimating = true;

    // Reset auto-swap interval on any swap trigger
    resetTimer();

    const frontIdx = cardOrder[0];
    const frontCard = cards[frontIdx];

    // Animate front card out (fly up & fade)
    frontCard.classList.add("card-swapping-out");
    frontCard.style.transform = "translate3d(0, -90px, 40px) rotate(-3.5deg) scale(1.02)";
    frontCard.style.opacity = "0";

    setTimeout(() => {
      // Move front card to back of stack
      const swapped = cardOrder.shift();
      cardOrder.push(swapped);

      frontCard.classList.remove("card-swapping-out");
      applyPositions(true);

      setTimeout(() => {
        isAnimating = false;
      }, 250);
    }, 420);
  }

  function handleCardClick() {
    if (isAnimating) return;
    const isFourthCard = cardOrder[0] === numCards - 1;

    if (isFourthCard) {
      // Auto-scroll down to the next section (#sources)
      const nextSection = document.getElementById("sources") || document.querySelector(".sources-tile");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      swapNext();
    }
  }

  function goToCard(targetIndex) {
    if (isAnimating || cardOrder[0] === targetIndex) return;

    const currentPos = cardOrder.indexOf(targetIndex);
    if (currentPos !== -1) {
      const moved = cardOrder.splice(currentPos, 1);
      cardOrder.unshift(moved[0]);
      applyPositions(true);

      if (targetIndex !== numCards - 1) {
        resetTimer();
      } else {
        stopTimer();
      }
    }
  }

  function startTimer() {
    stopTimer();
    // Do not start timer if already on 4th card
    if (cardOrder[0] === numCards - 1) return;

    autoSwapTimer = setInterval(() => {
      swapNext();
    }, DELAY);
  }

  function stopTimer() {
    if (autoSwapTimer) {
      clearInterval(autoSwapTimer);
      autoSwapTimer = null;
    }
  }

  function resetTimer() {
    stopTimer();
    startTimer();
  }

  // Initial layout and start auto-swap
  applyPositions(false);
  startTimer();

  // Click on viewport to swap or auto-scroll if 4th card
  viewport.addEventListener("click", handleCardClick);

  // Dots navigation
  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = parseInt(dot.getAttribute("data-index"), 10);
      if (!isNaN(idx)) {
        goToCard(idx);
      }
    });
  });

  // Pause on hover
  viewport.addEventListener("mouseenter", stopTimer);
  viewport.addEventListener("mouseleave", () => {
    if (cardOrder[0] !== numCards - 1) {
      startTimer();
    }
  });
}

/* ==========================================================================
   4C. DARK FOOTER POP-IN SPRING ANIMATION
   ========================================================================== */

/**
 * Dark Footer Pop-In Spring Animation & Back-to-Top Handler
 */
function initFooterPopin() {
  const footer = document.getElementById("app-footer");
  if (!footer) return;

  // IntersectionObserver to trigger springy pop-in when footer enters viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add("footer-in-view");
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -30px 0px"
  });

  observer.observe(footer);

  // Back to top smooth scroll
  const backToTopBtn = document.getElementById("footer-back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}

/* ==========================================================================
   5. APPLICATION INITIALIZATION
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initLanyard();
  renderMilestones();
  renderConnectionMap();
  renderVentureTabs();
  renderVentureSpotlight();
  renderVentureCards();
  initCardSwap();
  renderSources();
  initFooterPopin();

  initNavigation();
});


