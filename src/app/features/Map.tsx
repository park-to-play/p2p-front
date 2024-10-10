'use client';
import React, { useEffect, useState } from 'react';
import { KAKAO_API } from '../components/EnvController';

function Map() {
  const [mapSelecter, setMapSelecter] = useState<boolean>(false);
  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API}&autoload=false`;
    document.head.appendChild(kakaoMapScript);
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.517734, 126.886441),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
      });
    };
    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
    setMapSelecter(true);
  }, []);

  return mapSelecter ? (
    <div>
      <div className='flex items-center justify-center pt-2'>
        <div id='map' className='w-[95%] h-72' />
      </div>
    </div>
  ) : (
    <div className='w-full min-h-max max-w-sm mx-auto p-4'>
      <div className='animate-pulse flex flex-col space-y-4'>
        <div className='bg-gray-300 h-96 w-full rounded-md'></div>
        <div className='flex-1 space-y-2'>
          {/* 제목 스켈레톤 */}
          <div className='h-4 bg-gray-300 rounded w-3/4'></div>
          {/* 지도 설명 스켈레톤 */}
          <div className='h-4 bg-gray-300 rounded w-1/2'></div>
        </div>
      </div>
    </div>
  );
}

export default Map;
