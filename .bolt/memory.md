# Project memory

## Product intent & audience

- Interactive birthday website celebrating Priyanshi Jain's 20th birthday
- Single-user, personal gift experience; audience is Priyanshi herself
- Combines scrapbook, timeline, interactive cake, and heartfelt letter into one flowing journey

## Brand personality & voice

- Warm, heartfelt, personal, playful
- Speaks directly to Priyanshi in second person ("Hey, Panda!", "Your little surprise")
- Cute panda universe motif carried throughout
- Mysterious/cinematic tone in the dark opener, shifting to joyful pastel celebration after reveal

## Visual design & UX direction

- **Core palette:** pastel pink, cream, warm golden accents
- **Opener:** near-black screen, subtle starfield, centered glowing button; warm golden radial spotlight expands to reveal pastel content (no harsh white flash)
- **Reveal sequence:** button glow → warm center light → light spreads → dark→pastel transition → stars/particles/confetti (subtle, not excessive) → pandas appear → decorations reveal → existing "Hey, Panda!" intro card
- **Post-reveal opening card:** "HEY, PANDA! 🐼" / "Someone has made something for you. Not another ordinary birthday wish. Something a little more personal." / button "OPEN YOUR LITTLE SURPRISE 🎁"
- **Components:** animated pandas, friendship timeline, photo map/scrapbook, interactive cake, letter section
- **Motion:** cinematic, smooth transitions; radial spotlight reveal pattern preferred
- **Audio:** sound effects only on user interaction; never autoplay music
- **Tech:** Tailwind classes, Lucide React icons, `@/` path alias, React hooks; avoid extra UI packages unless necessary
- **Responsiveness & accessibility:** maintain touch-friendly buttons; ensure dark opener has sufficient contrast for the CTA

## Decisions, constraints & rationale

- Dark opener was added **before** the existing bright birthday screen; bright content is gated behind the "turn on the lights" interaction
- Warm golden/cream light chosen over white flash to match pastel palette and keep tone gentle
- Confetti kept minimal to avoid overwhelming the intimate mood
- New friendship/hackathon/duo photos were **not** wired in because files were absent from the asset folder at edit time; no broken image paths created — mappings left ready for when assets land
- Build verification (lint, type-check, production build) passing after opener changes

## Open questions & assumptions

- Asset filenames/paths for the three new photos (friendship, hackathon, duo) still need to be added to the project before they can be referenced
- Whether subtle sound effects should accompany the light reveal, or remain silent
- Exact set of sections/order after the "Open your little surprise" button (assumed existing birthday flow continues normally)
- Whether panda animations and decorations should stagger during reveal or appear together