'use client';
import HeadMenu from './features/HeadMenu';
import SearchBar from './features/SearchBar';
import Map from './features/Map';
import VisonData from './features/VisonData';
import Footer from './features/Footer';
import React from 'react';
import { useGlobalState } from './hooks/globalSearchDataState';

export default function Home() {
  const { searchData } = useGlobalState();
  return (
    <section className='flex flex-col min-h-screen items-center body-font bg-gradient-to-t from-customWhiteBlue to-customSmothBlue'>
      <div className='w-full md:max-w-[60%] mx-auto md:bg-white'>
        <HeadMenu />
        <SearchBar />
        <Map />
        {searchData ? (
          <div className='w-full md:bg-white sm:p-5'>
            <VisonData />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className='w-full max-h-[10%]'>
        <Footer />
      </div>
    </section>
  );
}
