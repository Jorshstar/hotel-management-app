import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/libs/auth';
import {
  checkReviewExists,
  createReview,
  getUserData,
  updateReview,
} from '@/libs/api';

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication Required', { status: 500 });
  }

  const userId = session.user.id;

  try {
    const data = await getUserData(userId);
    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error) {
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}

export async function POST(req: Request, res: Response) {
  console.log('Review POST request received');
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log('User not authenticated');
    return new NextResponse('Authentication Required', { status: 500 });
  }

  const { roomId, reviewText, ratingValue } = await req.json();

  if (!roomId || !reviewText || !ratingValue) {
    console.log('Missing required data');
    return new NextResponse('All fields are required', { status: 400 });
  }

  const userId = session.user.id;

  try {
    console.log('Checking if review already exists');
    const alreadyExists = await checkReviewExists(userId, roomId);

    let data;

    if (alreadyExists) {
      console.log('Review already exists, updating');
      data = await updateReview({
        reviewId: alreadyExists._id,
        reviewText,
        userRating: ratingValue,
      });
    } else {
      console.log('Review does not exist, creating new one');
      data = await createReview({
        hotelRoomId: roomId,
        reviewText,
        userId,
        userRating: ratingValue,
      });
    }

    console.log('Review updated successfully');
    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error: any) {
    console.log('Error updating review', error);
    return new NextResponse('Unable to create review', { status: 400 });
  }
}
