'use client';
import HeadMenu from './features/HeadMenu';
import SearchBar from './features/SearchBar';
import Map from './features/Map';
import VisonData from './features/VisonData';
import Footer from './features/Footer';
import React, { useState } from 'react';
export default function Home() {
  const [selectVision, setSelectVision] = useState<boolean>(false);
  return (
    <section className='flex flex-col min-h-screen items-center body-font bg-gradient-to-t from-customWhiteBlue to-customSmothBlue'>
      <div className='w-full md:max-w-[60%] mx-auto bg-white'>
        <HeadMenu />
        <SearchBar />
        <Map />
        {selectVision ? (
          <div className='bg-slate-600 w-full rounded-t-3xl sm:p-5'>
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
