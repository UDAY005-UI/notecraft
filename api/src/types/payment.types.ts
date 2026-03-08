export interface CreateOrderBody {
  noteId: string
  userId: string
}

export interface VerifyPaymentBody {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
  purchaseId: string
}