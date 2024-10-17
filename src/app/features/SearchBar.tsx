'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import { useGlobalState } from '../hooks/globalSearchDataState';
import { useGlobalLocationState } from '../hooks/globalLocationDataState';

// API 호출 함수
async function getData(destination: string) {
  const header = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = destination;

  try {
    const response = await axios.post('/api/search', {
      header,
      body,
    });
    return response.data; // 연관 검색어 데이터를 반환
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default function SearchBar() {
  const [destination, setDestination] = useState<string>('');
  const [searchBarSlider, setSearchBarSlider] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { searchData, setSearchData } = useGlobalState();
  const { locationData, setLocationData } = useGlobalLocationState();
  const handleSearch = async () => {
    const results = await getData(destination);
    setSuggestions(results);
  };

  return (
    <div className='w-[95%] mx-auto mt-3'>
      <div className='flex flex-row items-center bg-white shadow-lg p-3 rounded-lg text-gray-800 border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out'>
        <input
          type='text'
          placeholder='목적지를 입력하세요'
          value={destination}
          onChange={(ans) => {
            setDestination(ans.target.value);
            handleSearch();
            if (ans.target.value === '') {
              setSearchBarSlider(false);
              setSuggestions([]);
            } else {
              setSearchBarSlider(true);
            }
          }}
          className='flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 px-2'
        />
        <button
          onClick={() => {
            setSearchBarSlider(false);
            setSearchData(true);
          }}
          className='ml-3 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-300 ease-in-out'
        >
          <Image src='/config/search.png' alt='Search' width={16} height={16} />
        </button>
      </div>
      {searchBarSlider && suggestions.length > 0 && (
        <div className='w-full mt-2 bg-white rounded-lg shadow-lg p-4 text-black'>
          <h3 className='text-lg font-semibold mb-2'>연관 검색어</h3>
          <ul className='space-y-2'>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className='cursor-pointer p-2 hover:bg-blue-100 rounded-md transition'
                onClick={(e) => {
                  setDestination(
                    (e.currentTarget as HTMLLIElement).textContent || '',
                  );
                  if (typeof suggestion === 'string') {
                    const parsedSuggestion = JSON.parse(suggestion);
                    setLocationData(parsedSuggestion);
                  } else {
                    setLocationData(suggestion);
                  }
                }}
              >
                {suggestion[0]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
