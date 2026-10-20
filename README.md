# Ratan Tata Showcase — Apple Web Design Language
**Context:** EDC Second-Year Task 02 · Interactive Showcase  
**Design System:** Apple Web Presence Design Language (Strict Token Adherence)  
**Technology:** Vanilla HTML5, Vanilla CSS3, Vanilla JavaScript (Zero External Frameworks / Zero Dependencies)

---

## 1. Project Overview & Apple Design Philosophy
This interactive single-page website commemorates the life, milestones, enterprises, and ethical legacy of **Ratan Naval Tata (1937–2024)**. 

The user interface is modeled directly after Apple's web presence: **reverent product photography framed by near-invisible UI**. The page is constructed as a stack of edge-to-edge product "tiles" with alternating light and dark canvases where the color transition itself acts as the divider. Typography is confident but quiet; decorative chrome is eliminated; and every interactive element is unified under Apple's signature **Action Blue (`#0066cc`)**.

### File Structure
```
EDC/
├── index.html        # Semantic HTML5 chassis with Apple two-row nav & edge-to-edge product tiles
├── style.css         # Pure CSS design system implementing Apple's exact tokens, typography & rhythm
├── script.js         # Pure Data Stores (milestones, family tree map, ventures, sources) & DOM/SVG rendering
├── Lanyard.jsx       # Standalone React Lanyard ID badge component
├── Lanyard.css       # 3D styling for the Lanyard component
├── card-front.png    # High-resolution executive credential badge asset
├── card-back.png     # Reverse credential asset (Tata Code of Conduct)
├── band.png          # Woven lanyard strap texture asset
└── README.md         # Design system walkthrough, token mapping, and evaluation documentation
```

---

## 2. Apple Design System Tokens & Implementation

### A. Color Palette
- **Action Blue (`#0066cc`):** The single brand-level interactive color. All text links, all blue pill CTAs (*"Explore Milestones"*, *"Key Ventures"*), and the sub-nav button.
- **Focus Blue (`#0071e3`):** Reserved for keyboard focus rings (`outline: 2px solid`).
- **Sky Link Blue (`#2997ff`):** High-contrast blue for inline links and accents on dark tiles.
- **Pure White (`#ffffff`):** Content canvas for store utility cards and configurator grids.
- **Parchment (`#f5f5f7`):** Signature off-white for the hero tile, sub-nav frosted bar, and footer.
- **Near-Black Tile 1 (`#272729`):** Primary dark tile surface for the Journey timeline.
- **Near-Black Tile 2 (`#2a2a2c`):** Micro-step lighter surface for milestone cards.
- **Near-Black Tile 3 (`#252527`):** Deep dark tile for the Impact & Takeaways section.
- **Pure Black (`#000000`):** Reserved exclusively for the 44px persistent Global Nav.
- **Near-Black Ink (`#1d1d1f`):** The voice of all headlines and body text on light surfaces.

### B. Typography & The "Apple Tight" Cadence
- **Font Stack:** `system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", sans-serif`.
- **Hero Headline:** 56px, weight 600, line-height 1.07, letter-spacing `-0.28px` (the signature tight headline feel).
- **Display Large (Tile Headlines):** 40px, weight 600, line-height 1.10.
- **Lead Copy:** 28px / 19px, weight 400.
- **Body:** 17px, weight 400, line-height 1.47, letter-spacing `-0.374px` (Apple's 17px reading pace, not 16px).
- **Dense Links (Footer):** 14px, weight 400, line-height 2.41 (relaxed leading for dense link columns).
- **Weight 500 is deliberately absent:** The typographic ladder strictly follows 300 / 400 / 600 / 700.

### C. The Single System Elevation Drop
Apple's design system uses **exactly one drop-shadow**:
`rgba(0, 0, 0, 0.22) 3px 5px 30px 0`
Applied exclusively to the resting 3D Lanyard ID badge in the hero section. Cards, buttons, and text carry zero drop-shadows.

### D. Navigation Grammar
- **`global-nav`:** 44px persistent pure black bar (`#000000`) with 12px links and Apple logo mark.
- **`sub-nav-frosted`:** 52px sticky frosted bar (`rgba(245, 245, 247, 0.8)` with `backdrop-filter: saturate(180%) blur(20px)`), featuring category title on the left, anchor links, and a persistent right-aligned Action Blue pill CTA.

### E. Micro-Interactions
Every button and interactive card features Apple's system-wide press state:
```css
transform: scale(0.95);
transition: transform 0.15s ease;
```

---

## 3. Section Rhythm (The Predictable Pulse)

| Tile | Surface Canvas | Content Focus | Elevation / UI |
| :--- | :--- | :--- | :--- |
| **1. Intro** | `#f5f5f7` (Parchment) | Name, 3-sentence bio, blue pill CTAs & Large Lanyard ID Badge | System product drop-shadow on badge |
| **2. Journey** | `#272729` (Near-Black 1) | 10 verified chronological milestones with expandable cards | Flat hairline on `#2a2a2c` cards |
| **3. Ventures** | `#ffffff` (Pure White) | Tata Group Family Tree Map + 6 Venture utility cards | 18px radius (`{rounded.lg}`), 1px `#e0e0e0` hairline |
| **4. Impact** | `#252527` (Near-Black 3) | 2 monumental achievements + 2 actionable takeaways | Editorial dark cards with stat callouts |
| **5. Sources** | `#ffffff` (Pure White) | Comprehensive provenance audit table | Clean 14px Apple data table |
| **6. Footer** | `#f5f5f7` (Parchment) | Navigation, venture links, and legal fine-print | Relaxed 2.41 leading for scannability |

---

## 4. Key Interactive Components

1. **Large 3D Physics Lanyard ID Badge:**
   - Positioned prominently in the hero section, suspended directly from the header.
   - Click and drag anywhere across the entire page with dynamic spring-mass pendulum physics.
   - Dual-woven navy ribbon with gold stitching flexes and stretches from the sticky header to the cursor.
   - Front-facing only, dignified executive presentation.

2. **Milestone ScrollStack Deck (Journey):**
   - Available as standalone React component (`ScrollStack.jsx` and `ScrollStack.css`) and vanilla JS/CSS live on `index.html`.
   - Stacks all 10 defining milestones into a progressive card deck as the user scrolls.
   - Cards smoothly pin to the top (`position: sticky`), progressively scale down (`scale(0.96)`, `scale(0.92)`, etc.) and dim as new milestone cards slide over them.
   - React usage:
     ```jsx
     import ScrollStack, { ScrollStackItem } from './ScrollStack';

     <div style={{ height: 600 }}>
       <ScrollStack>
         <ScrollStackItem>
           <h2>1937 · Birth in Bombay</h2>
           <p>Born into one of India's most distinguished families...</p>
         </ScrollStackItem>
         <ScrollStackItem>
           <h2>1962 · Joins Tata Group</h2>
           <p>Declined IBM to start on the blast furnace floor...</p>
         </ScrollStackItem>
       </ScrollStack>
     </div>
     ```

3. **Tata Group "Family Tree" Connection Map:**
   - Interactive SVG diagram (`viewBox="0 0 840 460"`) showing how Tata Sons links to Tata Trusts (66% equity), operating companies (Tata Motors, TCS, Tata Steel, Tata Consumer), and landmark acquisitions (JLR, Corus, Tetley).
   - Click any node to inspect Ratan Tata's direct decisions and verified source citations.

4. **Ventures Directory & Sector Filter Chips:**
   - Filter chips styled as pill buttons (`{rounded.pill}`) allowing instant sector filtering.
   - Tab switcher for fast spotlight previews.

---

## 5. How to Run Locally
```bash
python -m http.server 3000
```
Open your browser to: **`http://localhost:3000/index.html`**
