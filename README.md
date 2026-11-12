# Halftone

A template for a design and print festival: a timetable of rooms by hours with the session on now lit, the speakers as a contact sheet, a drawn plan of the venue, and passes. It is a static Astro site. Its sample content, the Halftone festival in the city of Northport, is made up, and marked as sample in each of its files.

## Start it

- **In Piny:** pick it in the Templates tab.
- **Outside Piny:** `npm create astro -- --template github:pinylabs/halftone`, then `pnpm install` and `pnpm dev`.

It needs Node 22 or later and pnpm. `pnpm build` writes the whole site to `dist/`, ready for any static host.

## Its words

The festival lives in `src/content/`, so its words change without touching code:

- `festival.yaml`: the name, dates, venue, city, days and rooms, the hero's words, the photos of the home, programme and venue, and the venue's notes.
- `sessions/`: one file per session, with its day, time, length in hours, room, title, speaker, kind (talk, workshop or market) and blurb. The home shows one day's timetable, set by `homeDay`; the programme lists every session, with a page for each day, kind and room.
- `speakers/`: one file per speaker or studio, with their name, role, photo and its credit.
- `passes/`: one file per pass. Give a pass a `url` and its button goes to your ticket seller; without one it leads to the passes page, which says no passes are on sale.

While the festival is on, the timetable lights the sessions on now by the festival's own clock (`timeZone`); at any other time it lights the session marked `lit`.

## Its look

The pages are styled with Tailwind CSS 4. Every colour, face, size, measure and motion is a token in `src/styles/theme.css`, so the look changes there: `primary` is the pink pass, `secondary` the blue one, `tertiary` the paper and `neutral` the ink. `src/styles/global.css` holds what utilities cannot say: the dot screen, the timetable's sessions, the contact sheet's frames, the plan's pins and the motion. Light and dark follow the visitor's system, and all motion stops under `prefers-reduced-motion`.

## Photos

They are linked from Unsplash and never copied into this repository:

- Home: the hero, last year's closing night: [Colin Lloyd](https://unsplash.com/@onthesearchforpineapples) on Unsplash, [Unsplash License](https://unsplash.com/license), linked from [its page](https://unsplash.com/photos/people-gathering-on-concert-during-night-time-W6_txbgkkeU).
- The programme: the print workshop: [Anthony Roberts](https://unsplash.com/@arcreates) on Unsplash, [Unsplash License](https://unsplash.com/license), linked from [its page](https://unsplash.com/photos/industrial-screen-printing-machine-in-a-workshop-setting-mwzpm3uNOlI).
- Home and the venue: the Dye Works: [X F](https://unsplash.com/@aizerd) on Unsplash, [Unsplash License](https://unsplash.com/license), linked from [its page](https://unsplash.com/photos/an-empty-old-industrial-warehouse-with-light-streaming-through-windows-BESI-pezF74).
- Speakers: Jonas Ek: [Alef Morais](https://unsplash.com/@alef_visuals) on Unsplash, [Unsplash License](https://unsplash.com/license), linked from [its page](https://unsplash.com/photos/a-smiling-man-in-a-black-shirt-LPvi7DMp-HU).
- Speakers: Femi Cole: [Christoph Aigner](https://unsplash.com/@christophaigner) on Unsplash, [Unsplash License](https://unsplash.com/license), linked from [its page](https://unsplash.com/photos/smiling-man-in-a-dark-jacket-against-a-gray-background-VBU3WW_Japk).
- Speakers: Ada Mensah: [Eileen Martin](https://unsplash.com/@wolff_photography) on Unsplash, [Unsplash License](https://unsplash.com/license), linked from [its page](https://unsplash.com/photos/a-woman-with-long-hair-smiling-and-looking-up-HhR0bbux3ps).
- Speakers: Rue Takahashi: [McFollis](https://unsplash.com/@thisismcfollis) on Unsplash, [Unsplash License](https://unsplash.com/license), linked from [its page](https://unsplash.com/photos/young-man-in-white-t-shirt-against-a-red-background-RH3c5rM-Zqk).

## Licence

MIT, Copyright (c) 2026 pinylabs; see [LICENSE](LICENSE). Made by the Pinies in [Piny Studio](https://piny.studio/home/). The Piny Studio mark in `public/brand` is Piny's and is not covered by this template's MIT licence.
