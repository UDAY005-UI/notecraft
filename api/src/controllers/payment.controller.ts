import { Request, Response } from "express"
import razorpay from "../config/razorpay"
import { prisma } from "../lib/prisma"
import crypto from "crypto"
import { CreateOrderBody, VerifyPaymentBody } from "../types/payment.types"
import { getAuth } from "@clerk/express"

export const createOrder = async (
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  req: Request<{}, {}, CreateOrderBody>,
  res: Response
) => {
  try {

    const { userId: clerkId } = getAuth(req)
    const { noteId } = req.body

    if (!clerkId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const note = await prisma.note.findUnique({
      where: { id: noteId }
    })

    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    // prevent duplicate purchase
    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        userId_noteId: {
          userId: user.id,
          noteId
        }
      }
    })

    if (existingPurchase && existingPurchase.paymentStatus === "SUCCESS") {
      return res.status(400).json({
        message: "Note already purchased"
      })
    }

    const order = await razorpay.orders.create({
      amount: note.price * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    })

    const purchase = await prisma.purchase.create({
      data: {
        userId: user.id, // IMPORTANT FIX
        noteId,
        paymentStatus: "PENDING"
      }
    })

    return res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      purchaseId: purchase.id,
      key: process.env.RAZORPAY_KEY_ID
    })

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      message: "Order creation failed"
    })

  }
}

export const verifyPayment = async (
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  req: Request<{}, {}, VerifyPaymentBody>,
  res: Response
) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      purchaseId
    } = req.body

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex")

    const isValid = expectedSignature === razorpay_signature

    if (!isValid) {

      await prisma.purchase.update({
        where: { id: purchaseId },
        data: { paymentStatus: "FAILED" }
      })

      return res.status(400).json({
        message: "Payment verification failed"
      })
    }

    await prisma.purchase.update({
      where: { id: purchaseId },
      data: {
        paymentStatus: "SUCCESS"
      }
    })

    return res.json({
      message: "Payment successful"
    })

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      message: "Verification error"
    })

  }
}