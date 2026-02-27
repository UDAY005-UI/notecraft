import { Request, Response } from "express";
import { razorpay } from "../config/razorpay";
import { verifySignature } from "../utils/verifySignature";
import {
  CreateOrderRequest,
  VerifyPaymentRequest,
} from "../types/payment.types";

export const createOrder = async (
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  req: Request<{}, {}, CreateOrderRequest>,
  res: Response
) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Order creation failed" });
  }
};

export const verifyPayment = async (
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  req: Request<{}, {}, VerifyPaymentRequest>,
  res: Response
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const isValid = verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return res.status(400).json({ success: false });
    }

    // TODO: Save payment to DB (Prisma here)

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: "Verification failed" });
  }
};