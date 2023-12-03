import { Place } from "../places/types";

export interface Activity {
  id: number;
  slug: string;
  title: string;
  price: number;
  body: string;
  open_time: string;
  close_time: string;
  is_payments_enabled: string;
  create_at: string;
  map_url: string;
  cover_picture_url: string;

  place: Place;
}
