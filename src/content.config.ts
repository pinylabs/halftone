// Halftone's words live in these collections, under src/content/, so the festival changes without touching code.
// Everything there now is sample content about a made-up festival.
import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

// A photo linked from Unsplash: its address on images.unsplash.com without a query, its words for a reader who
// cannot see it, and its credit.
const credit = z.object({
  photographer: z.string(),
  profile: z.url(),
  page: z.url(),
});
const photo = z.object({
  src: z.url(),
  alt: z.string(),
  credit,
});

// The festival itself: its name, dates, place, days and rooms, the hero's words and the photos of its pages.
const festival = defineCollection({
  loader: file("src/content/festival.yaml"),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    dates: z.string(),
    venue: z.string(),
    city: z.string(),
    // The festival's own clock, which lights the session on now while the festival is on.
    timeZone: z.string(),
    lede: z.string(),
    ledeMark: z.string(),
    ledeEnd: z.string(),
    // The day whose timetable the home shows.
    homeDay: z.string(),
    days: z.array(z.object({ slug: z.string(), short: z.string(), name: z.string(), date: z.string() })).min(1),
    // The timetable has a column for each of these three rooms.
    rooms: z.array(z.object({ slug: z.string(), name: z.string() })).length(3),
    hero: photo.extend({ caption: z.string() }),
    programmePhoto: photo,
    venuePhoto: photo,
    gettingHere: z.string(),
    venueNotes: z.array(z.string()),
    passesNote: z.string(),
  }),
});

// A session: when and where, what it is, and who gives it. `note` stands in for a speaker on the timetable;
// `places` opens the session out on the programme with a booking line; `lit` is the session the timetable shows as
// on now when the festival is not on.
const sessions = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/sessions" }),
  schema: z.object({
    day: z.string(),
    time: z.string().regex(/^\d\d:\d\d$/),
    hours: z.number().int().min(1).max(3).default(1),
    room: z.string(),
    title: z.string(),
    speaker: reference("speakers").optional(),
    note: z.string().optional(),
    kind: z.enum(["talk", "workshop", "market"]),
    blurb: z.string(),
    places: z.string().optional(),
    photo: z.url().optional(),
    lit: z.boolean().default(false),
  }),
});

// A speaker, or a studio that runs a workshop. `order` places them on the contact sheet; `lineup` in the ticker.
// One without a photo is printed as a dot screen.
const speakers = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/speakers" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.url().optional(),
    credit: credit.optional(),
    order: z.number(),
    lineup: z.number(),
  }),
});

// A pass. `url` is where it is sold; without one the pass leads to the passes page, which says none are on sale.
const passes = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/passes" }),
  schema: z.object({
    name: z.string(),
    price: z.string(),
    blurb: z.string(),
    details: z.string(),
    highlight: z.boolean().default(false),
    order: z.number(),
    url: z.url().optional(),
  }),
});

export const collections = { festival, sessions, speakers, passes };
