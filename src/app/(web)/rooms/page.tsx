'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { getRooms } from '@/libs/api';
import { Room } from '@/models/room';
import Search from '@/components/Search/Search';
import RoomCard from '@/components/RoomCard/RoomCard';

const Rooms = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('Rooms - useEffect - start');
    const searchQuery = searchParams.get('searchQuery');
    const roomType = searchParams.get('roomType');
    console.log('Rooms - useEffect - searchQuery, roomType', searchQuery, roomType);

    if (roomType) setRoomTypeFilter(roomType);
    if (searchQuery) setSearchQuery(searchQuery);
    console.log('Rooms - useEffect - end');
  }, []);

  async function fetchData() {
    console.log('Rooms.fetchData - start');
    const response = await getRooms();
    console.log('Rooms.fetchData - response', response);
    return response;
  }


  const { data, error, isLoading } = useSWR('get/hotelRooms', fetchData);

  if (error) {
    console.log('Rooms - error', error);
    throw new Error('Cannot fetch data');
  }

  if (typeof data === 'undefined' && !isLoading) {
    console.log('Rooms - Cannot fetch data');
    throw new Error('Cannot fetch data');
  }

  const filterRooms = (rooms: Room[]) => {
    console.log('Rooms.filterRooms - start', { roomTypeFilter, searchQuery, rooms });
    const filteredRooms = rooms.filter(room => {
      // Apply room type filter
      console.log('Rooms.filterRooms - filter by type - start', { roomTypeFilter, room });
      if (
        roomTypeFilter &&
        roomTypeFilter.toLowerCase() !== 'all' &&
        room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
      ) {
        console.log('Rooms.filterRooms - filter by type - false', { roomTypeFilter, room });
        return false;
      }

      //   Apply search query filter
      console.log('Rooms.filterRooms - filter by search query - start', { searchQuery, room });
      if (
        searchQuery &&
        !room.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        console.log('Rooms.filterRooms - filter by search query - false', { searchQuery, room });
        return false;
      }

      console.log('Rooms.filterRooms - keep room', { room });
      return true;
    });
    console.log('Rooms.filterRooms - end', { filteredRooms });
    return filteredRooms;
  };


  const filteredRooms = filterRooms(data || []);

  return (
    <div className='container mx-auto pt-10'>
      <Search
        roomTypeFilter={roomTypeFilter}
        searchQuery={searchQuery}
        setRoomTypeFilter={setRoomTypeFilter}
        setSearchQuery={setSearchQuery}
      />

      <div className='flex mt-20 justify-between flex-wrap'>
        {filteredRooms.map(room => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;