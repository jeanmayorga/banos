export interface Event {
  id: number;
  slug: string;
  title: string;
  description: string;
  cover: string | null;
  date: string;
  time: string;
  place: string;
}
