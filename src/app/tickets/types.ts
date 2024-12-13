export type TicketStatus = "not_used" | "used";
export type TicketPaymentStatus = "pending" | "cancel" | "paid";

export interface Ticket {
  id: number;
  uuid: string;
  user_uuid: string | null;
  status: TicketStatus;
  payment_status: TicketPaymentStatus;
  payment_id: number;
  date: string;
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
  whatsapp_message_sent: boolean;
  email_message_sent: boolean;
  created_at: string;
  used_at: string;
}

export interface TicketDTO {
  uuid?: string;
  user_uuid?: string;
  status?: TicketStatus;
  payment_status?: TicketPaymentStatus;
  payment_id?: number;
  date?: Date;
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
  whatsapp_message_sent?: boolean;
  email_message_sent?: boolean;
  used_at?: string;
}
