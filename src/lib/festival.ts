// Reads the festival's collections once and hands the pages what they draw: the days and rooms in their order,
// the sessions with their speakers, and the photos' credits.
import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export type Festival = CollectionEntry<"festival">["data"];
export type Day = Festival["days"][number];
export type Room = Festival["rooms"][number];
export type Speaker = CollectionEntry<"speakers">;
export type Pass = CollectionEntry<"passes">;
export type Credit = NonNullable<Speaker["data"]["credit"]>;

export interface Session {
  id: string;
  data: CollectionEntry<"sessions">["data"];
  day: Day;
  room: Room;
  speaker?: Speaker;
  /** Minutes from midnight, when it starts and ends. */
  start: number;
  end: number;
}

/** A photo from images.unsplash.com at the width it is drawn, as the design links it. */
export function unsplash(src: string, width: number): string {
  return `${src}?w=${width}&q=75&auto=format&fit=crop`;
}

export async function getFestival(): Promise<Festival> {
  const entry = await getEntry("festival", "halftone");
  if (!entry) throw new Error("src/content/festival.yaml needs its `halftone` entry.");
  return entry.data;
}

export async function getSpeakers(): Promise<Speaker[]> {
  return (await getCollection("speakers")).sort((a, b) => a.data.order - b.data.order);
}

export async function getPasses(): Promise<Pass[]> {
  return (await getCollection("passes")).sort((a, b) => a.data.order - b.data.order);
}

/** Every session, by day, then time, then room, each with its day, room and speaker. */
export async function getSessions(): Promise<Session[]> {
  const festival = await getFestival();
  const speakers = new Map((await getCollection("speakers")).map((speaker) => [speaker.id, speaker]));
  const sessions = (await getCollection("sessions")).map((entry): Session => {
    const day = festival.days.find((candidate) => candidate.slug === entry.data.day);
    const room = festival.rooms.find((candidate) => candidate.slug === entry.data.room);
    if (!day) throw new Error(`Session ${entry.id}: day "${entry.data.day}" is not one of festival.yaml's days.`);
    if (!room) throw new Error(`Session ${entry.id}: room "${entry.data.room}" is not one of festival.yaml's rooms.`);
    const speaker = entry.data.speaker ? speakers.get(entry.data.speaker.id) : undefined;
    if (entry.data.speaker && !speaker) throw new Error(`Session ${entry.id}: no speaker "${entry.data.speaker.id}".`);
    const [hours, minutes] = entry.data.time.split(":").map(Number);
    const start = hours * 60 + minutes;
    return { id: entry.id, data: entry.data, day, room, speaker, start, end: start + entry.data.hours * 60 };
  });
  const dayIndex = (session: Session) => festival.days.indexOf(session.day);
  const roomIndex = (session: Session) => festival.rooms.indexOf(session.room);
  return sessions.sort((a, b) => dayIndex(a) - dayIndex(b) || a.start - b.start || roomIndex(a) - roomIndex(b));
}

/** Every photo the site shows, in the order the footer credits them: the festival's, then the speakers'. */
export async function getCredits(): Promise<Credit[]> {
  const festival = await getFestival();
  const speakers = await getSpeakers();
  return [
    festival.hero.credit,
    festival.programmePhoto.credit,
    festival.venuePhoto.credit,
    ...speakers.flatMap((speaker) => (speaker.data.credit ? [speaker.data.credit] : [])),
  ];
}
