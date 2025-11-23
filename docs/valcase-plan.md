# ValCase Roadmap

## Experience Pillars
- **Valorant-first content**: mirror the official [Valorant API](https://dash.valorant-api.com/) categories (skins, agents, maps, player cards, level borders) so every drop references canonical metadata.
- **Case opening fantasy**: dramatize opening flow with holographic panels, particle-like glows, and punchy typography inspired by Aceternity/MagicUI layouts.
- **Economy feedback**: every interaction shows price, payout, balance delta, and rarity chips so users understand value swings instantly.

## Implementation Steps
1. **Content ingestion layer**
   - Create `lib/valorant-api.ts` to wrap `https://valorant-api.com/v1` endpoints with caching, type guards, and graceful fallbacks.
   - Normalize payloads into minimal `AgentSummary`, `SkinSummary`, `MapSummary`, `PlayerCardSummary`, and `LevelBorderSummary` records.
   - Surface a `getValorantContent()` helper that fans out to all endpoints in parallel and returns a single `ValorantContent` bundle.
2. **Case logic + valuation**
   - Define `CaseDefinition` objects in `data/cases.ts` with pricing, featured loot, and weighted tables per category.
   - Build `lib/case-engine.ts` to roll outcomes using weighted RNG, rarity multipliers, and deterministic value math so UI can display payouts.
   - Provide helpers such as `formatCurrency`, `randomBetween`, and `pickWeightedItem` inside `lib/utils.ts`.
3. **Interface + interactions**
   - Global styling update in `app/globals.css` to introduce Valorant-like gradients, neon borders, glass panels, and responsive spacing tokens.
   - Server component `app/page.tsx` loads `ValorantContent` and hands it to a client-side `CaseExperience` component for interactivity.
   - Build composable UI:
     - `components/hero/ValHero.tsx` for headline, CTA, and stats marquee.
     - `components/cases/CaseGrid.tsx` and `CaseCard.tsx` for catalog browsing.
     - `components/cases/CaseExperience.tsx` (client) to manage balance, simulate opening, animate results, and list recent drops.
     - `components/content/ValorantSpotlight.tsx` for glimpsing raw data (agents/maps/cards) in MagicUI-like cards.
4. **Docs + DX**
   - Document endpoints + fields in `docs/valorant-api.md` for quick reference.
   - Refresh `README.md` with instructions, feature overview, and Valorant attribution.

## Visual Refresh Blueprint
- **Global canvas**: Single subtle radial gradient background + noise; all content lives inside a 12-column container (max 1280px) with 32px gutters.
- **Left rail**: 240px column for live drops + quick nav. Inspired by Aceternity "Sidebar" pattern (stacked list with icon chips).
- **Primary hero row**: Two-column layout (left: SpotlightCard CTA + statistics, right: BentoGrid with 2x2 promo tiles). Use Aceternity SpotlightCard + BentoGrid variations.
- **Category dock**: MagicUI Dock-style capsule buttons showing icons (skins, agents, maps, cards, borders). Lives directly under hero row.
- **Case grid zone**: 3-column card grid (CaseCard rewrite) with price badges, stock-like colors, and inline "open" button. Cards have matte background `#0f1424`, border `#ffffff0f`.
- **Right rail**: 280px column for balance summary, achievements, and CTA chips. Uses MagicUI ShimmerButton / HoverBorderGradient for interactive affordances.
- **Content spotlight row**: Valorant data samples displayed with Aceternity BentoGrid items (maps, player cards) to keep visual consistency.

## Open Questions / Next Iterations
- Whether to persist balances server-side (would require DB/auth layer).
- Rich animations (e.g., framer-motion) could be added later if bundle size allows.
- Marketplace / inventory management beyond recent history.
