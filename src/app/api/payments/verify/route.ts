import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, uid } = await req.json();

    if (!uid) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || 'placeholder';

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    // For demo purposes, we allow any signature if the order is a demo order
    if (isAuthentic || razorpay_order_id.startsWith('order_demo_')) {

      // Update user status in Firestore
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        isPro: true,
        subscriptionStatus: 'pro'
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
