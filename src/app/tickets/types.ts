export type TicketType = "activity" | "hotel";

export type TicketStatus = "not_used" | "used";
export type TicketPaymentStatus = "pending" | "cancel" | "paid";

export interface Ticket {
  id: number;
  uuid: string;
  status: TicketStatus;
  payment_status: TicketPaymentStatus;
  payment_id: number;
  type: TicketType;
  check_in: string;
  slug: string;
  adults_quantity: number;
  children_quantity: number;
  adults_price: number;
  children_price: number;
  tax_amount: number;
  subtotal_amount: number;
  total_amount: number;
  customer_id: string | null;
  customer_document: string | null;
  customer_name: string | null;
  customer_phone_country_code: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  created_at: string;
}

export interface TicketDTO {
  status?: TicketStatus;
  payment_status?: TicketPaymentStatus;
  payment_id?: number;
  type?: TicketType;
  check_in?: Date;
  slug?: string;
  adults_quantity?: number;
  children_quantity?: number;
  adults_price?: number;
  children_price?: number;
  tax_amount?: number;
  subtotal_amount?: number;
  total_amount?: number;
  customer_id?: string | null;
  customer_document?: string | null;
  customer_name?: string | null;
  customer_phone_country_code?: string | null;
  customer_phone?: string | null;
  customer_email?: string | null;
}
