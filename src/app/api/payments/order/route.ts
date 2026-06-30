import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = process.env.RAZORPAY_KEY_ID ? new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
}) : null;

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR' } = await req.json();

    if (!razorpay) {
        // Mock order for demo mode
        return NextResponse.json({
            id: 'order_demo_' + Math.random().toString(36).substring(7),
            amount: amount,
            currency: currency,
            isDemo: true
        });
    }

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
