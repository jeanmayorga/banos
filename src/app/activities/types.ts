import { Place } from "../places/types";

export interface Activity {
  id: number;
  slug: string;
  title: string;
  price: number;
  body: string;
  description: string;
  open_time: string;
  close_time: string;
  updated_at: string;
  create_at: string;
  map_url: string;
  cover_picture_url: string;
  has_free_parking: boolean;
  tik_tok_video_id: string | null;
  youtube_video_id: string | null;
  keywords: string | null;
  is_active: boolean;
  place_id: number;
  place: Place;
  photos?: ActivityPhoto[];
  photos_count: {
    count: number;
  }[];
}

export interface ActivityPhoto {
  id: number;
  activity_id: number;
  alt: string;
  path: string;
}
