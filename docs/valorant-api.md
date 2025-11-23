# Valorant API Notes

| Domain | Endpoint | Query Params | Fields Consumed |
| --- | --- | --- | --- |
| Agents | `https://valorant-api.com/v1/agents` | `isPlayableCharacter=true` | `uuid`, `displayName`, `role.displayName`, `fullPortrait`, `backgroundGradientColors` |
| Weapon skins | `https://valorant-api.com/v1/weapons/skins` | none | `uuid`, `displayName`, `levels[0].displayIcon`, `contentTierUuid`, `assetPath` |
| Maps | `https://valorant-api.com/v1/maps` | none | `uuid`, `displayName`, `narrativeDescription`, `splash`, `callouts` |
| Player cards | `https://valorant-api.com/v1/playercards` | none | `uuid`, `displayName`, `largeArt`, `wideArt` |
| Level borders | `https://valorant-api.com/v1/levelborders` | none | `uuid`, `levelNumber`, `displayIcon`, `startingLevel` |

## Usage Guidelines
- All requests are public and can be fetched server-side via `fetch` with caching (`next: { revalidate: 3600 }`).
- Media URLs returned by the API are final CDN URLs (https://media.valorant-api.com/...). They can be used directly in `<Image />` with `unoptimized` or by configuring `next.config.js` `images.remotePatterns` (todo if remote optimization is needed).
- Some skins/agents include `null` fields; guard against missing art assets to avoid runtime errors.
- `contentTierUuid` maps to rarities (select subset):
  - `0cebb8be-46d7-c12a-d306-e9907bfc5a25` → Select
  - `60bca009-4182-7998-dee7-b8a2558dc369` → Deluxe
  - `e046854e-406c-37f4-6607-19a9ba8426fc` → Premium
  - `f7caa9f7-4985-547f-8094-ff9b3df5d9b1` → Exclusive
  - `60bcb54b-40d5-ff11-9dfb-46621459f570` → Ultra
- New content (e.g., agents/maps) continuously ships; design helpers should ignore items missing required assets so UI stays stable.
