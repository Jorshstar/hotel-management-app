import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createBooking, updateHotelRoom } from '@/libs/api';

const checkout_session_completed = 'checkout.session.completed';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request, res: Response) {
  try {
    console.log('Webhook Request received');

    const reqBody = await req.text();
    const sig = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret) {
      console.log('Webhook Error: Missing signature or webhook secret');
      return new NextResponse('Missing signature or webhook secret', { status: 400 });
    }

    const event: Stripe.Event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);

    console.log(`Webhook Event: ${event.type}`);

    switch (event.type) {
      case checkout_session_completed:
        const session = event.data.object;

        const metadata = session.metadata;

        if (!metadata) {
          console.log('Webhook Error: Metadata is missing');
          return new NextResponse('Metadata is missing', { status: 400 });
        }

        const {
          adults,
          checkinDate,
          checkoutDate,
          children,
          hotelRoom,
          numberOfDays,
          discount,
          totalPrice,
          user,
        } = metadata;

        await createBooking({
          adults: Number(adults),
          checkinDate,
          checkoutDate,
          children: Number(children),
          hotelRoom,
          numberOfDays: Number(numberOfDays),
          discount: Number(discount),
          totalPrice: Number(totalPrice),
          user,
        });

        await updateHotelRoom(hotelRoom);

        return new NextResponse('Booking successful', { status: 200 });

      default:
        console.log(`Unhandled event type ${event.type}`);
        return new NextResponse('Unhandled event type', { status: 400 });
    }
  } catch (error: any) {
    console.error('Webhook Error:', error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }
}

