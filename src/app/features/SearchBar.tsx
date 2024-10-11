'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import apiSearch from '../services/apiSearch';

function getData(destination: string) {
  const destination_list = apiSearch(destination, 'POST');
  return destination_list;
}

export default function SearchBar() {
  const [destination, setDestination] = useState<string>('');
  const [searchBarSlider, setSearchBarSlider] = useState<boolean>(false);
  return (
    <div className='w-[95%] mx-auto mt-3'>
      <div className='flex flex-row items-center bg-white shadow-lg p-3 rounded-lg text-gray-800 border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out'>
        <input
          type='text'
          placeholder='목적지를 입력하세요'
          onChange={(ans) => {
            setDestination(ans.target.value);
            if (ans.target.value === '') {
              setSearchBarSlider(false);
            } else {
              setSearchBarSlider(true);
            }
          }}
          className='flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 px-2'
        />
        <button
          onClick={() => {
            getData(destination);
            setSearchBarSlider(false);
          }}
          className='ml-3 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-300 ease-in-out'
        >
          <Image src='/config/search.png' alt='Search' width={16} height={16} />
        </button>
      </div>
      {searchBarSlider ? (
        <div className='w-full mt-2 bg-white rounded-lg shadow-lg p-4 text-black'>
          <h3 className='text-lg font-semibold mb-2'>연관 검색어</h3>
          <ul className='space-y-2'>
            <li className='cursor-pointer p-2 hover:bg-blue-100 rounded-md transition'>
              검색어 1
            </li>
            <li className='cursor-pointer p-2 hover:bg-blue-100 rounded-md transition'>
              검색어 2
            </li>
            <li className='cursor-pointer p-2 hover:bg-blue-100 rounded-md transition'>
              검색어 3
            </li>
            <li className='cursor-pointer p-2 hover:bg-blue-100 rounded-md transition'>
              검색어 4
            </li>
            <li className='cursor-pointer p-2 hover:bg-blue-100 rounded-md transition'>
              검색어 5
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
