import axios from 'axios';

import { CreateBookingDto, Room } from '@/models/room';
import sanityClient from './sanity';
import * as queries from './sanityQueries';
import { Booking } from '@/models/booking';
import { UpdateReviewDto } from '@/models/review';
import { CreateReviewDto, Review } from './../models/review';
import { getSession } from 'next-auth/react';

export async function getFeaturedRoom() {
  console.log('getting featured room');
  const result = await sanityClient.fetch<Room>(
    queries.getFeaturedRoomQuery,
    {},
    { cache: 'no-cache' }
  );
  console.log('got featured room', result);

  return result;
}


export async function getRooms() {
  console.log('Getting all rooms');
  const result = await sanityClient.fetch<Room[]>(
    queries.getRoomsQuery,
    {},
    { cache: 'no-cache' }
  );
  console.log('Got all rooms', result);

  return result;
}


export async function getRoom(slug: string) {
  console.log('Getting room with slug:', slug);
  const result = await sanityClient.fetch<Room>(
    queries.getRoom,
    { slug },
    { cache: 'no-cache' }
  );
  console.log('Got room with slug:', slug, 'result:', result);

  return result;
}


export const createBooking = async ({
  adults,
  checkinDate,
  checkoutDate,
  children,
  discount,
  hotelRoom,
  numberOfDays,
  totalPrice,
  user,
}: CreateBookingDto) => {
  console.log('Creating booking with following values:');
  console.log({
    adults,
    checkinDate,
    checkoutDate,
    children,
    discount,
    hotelRoom,
    numberOfDays,
    totalPrice,
    user,
  });

  const mutation = {
    mutations: [
      {
        create: {
          _type: 'booking',
          user: { _type: 'reference', _ref: user },
          hotelRoom: { _type: 'reference', _ref: hotelRoom },
          checkinDate,
          checkoutDate,
          numberOfDays,
          adults,
          children,
          totalPrice,
          discount,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  console.log('Created booking with response data:', data);

  return data;
}

export const updateHotelRoom = async (hotelRoomId: string) => {
  console.log('Updating hotel room with following values:');
  console.log({ hotelRoomId });

  const mutation = {
    mutations: [
      {
        patch: {
          id: hotelRoomId,
          set: {
            isBooked: true,
          },
        },
      },
    ],
  };

  console.log('Mutation data:', mutation);

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  console.log('Updated hotel room with response data:', data);

  return data;
};

export const getUserBookings = async (userId: string) => {
  console.log('Getting user bookings for user with id:', userId);

  const result = await sanityClient.fetch<Booking[]>(
    queries.getUserBookingsQuery,
    { 
      userId 
    },
    { cache: 'no-cache' }
  );

  console.log('Got user bookings from Sanity with result:', result);

  return result;
};


export async function getUserData(userId: string) {
  console.log('Getting user data for user with id:', userId);

  console.log('Getting user data from Sanity');
  const result = await sanityClient.fetch(
    queries.getUserDataQuery,
    { userId },
    { cache: 'no-cache' }
  );
  console.log('Got user data from Sanity with result:', result);

  return result;
}



export async function checkReviewExists(
  userId: string,
  hotelRoomId: string
): Promise<null | { _id: string }> {
  console.log('Checking if review exists with userId:', userId, 'and hotelRoomId:', hotelRoomId);

  const query = `*[_type == 'review' && user._ref == $userId && hotelRoom._ref == $hotelRoomId][0] {
    _id
  }`;

  const params = {
    userId,
    hotelRoomId,
  };

  console.log('Executing Sanity query:', query, 'with params:', params);

  const result = await sanityClient.fetch(query, params);

  console.log('Got result from Sanity:', result);

  return result ? result : null;
}


export const updateReview = async ({
  reviewId,
  reviewText,
  userRating,
}: UpdateReviewDto) => {
  console.log('Updating review with id:', reviewId);
  console.log('With reviewText:', reviewText);
  console.log('And userRating:', userRating);

  const mutation = {
    mutations: [
      {
        patch: {
          id: reviewId,
          set: {
            text: reviewText,
            userRating,
          },
        },
      },
    ],
  };

  console.log('Executing Sanity mutation:', mutation);

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  console.log('Got response from Sanity:', data);

  return data;
};


export const createReview = async ({
  hotelRoomId,
  reviewText,
  userId,
  userRating,
}: CreateReviewDto) => {
  console.log('Creating review with following values:');
  console.log({ hotelRoomId, reviewText, userId, userRating });

  const mutation = {
    mutations: [
      {
        create: {
          _type: 'review',
          user: {
            _type: 'reference',
            _ref: userId,
          },
          hotelRoom: {
            _type: 'reference',
            _ref: hotelRoomId,
          },
          userRating,
          text: reviewText,
        },
      },
    ],
  };

  console.log('Executing Sanity mutation:', mutation);

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  console.log('Created review with response data:', data);

  return data;
};

export async function getRoomReviews(roomId: string) {
  console.log('Getting reviews for room with id:', roomId);

  console.log('Getting reviews from Sanity');
  const result = await sanityClient.fetch<Review[]>(
    queries.getRoomReviewsQuery,
    {
      roomId,
    },
    { cache: 'no-cache' }
  );

  console.log('Got reviews from Sanity with result:', result);

  return result;
}
