/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { KAKAO_API } from '../components/EnvController';
import type { Infowindow } from '../types/interface.d.ts';
import { useGlobalLocationState } from '../hooks/globalLocationDataState';

function makeOverListener(map: any, marker: any, infowindow: Infowindow) {
  return function () {
    infowindow.open(map, marker);
  };
}

function makeOutListener(infowindow: Infowindow) {
  return function () {
    infowindow.close();
  };
}

function displayMarker(
  map: { setCenter: (arg0: any) => void },
  locPosition: any,
  message: string,
) {
  const marker = new window.kakao.maps.Marker({
    map: map,
    position: locPosition,
  });

  const iwContent = message,
    iwRemoveable = true;

  const infowindow = new window.kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable,
  });

  infowindow.open(map, marker);

  map.setCenter(locPosition);
}

function Map() {
  const [mapSelecter, setMapSelecter] = useState<boolean>(false);
  const { locationData } = useGlobalLocationState();
  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API}&autoload=false`;
    document.head.appendChild(kakaoMapScript);
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        let options = {
          center: new window.kakao.maps.LatLng(37.517734, 126.886441),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
        const positions = [
          // dummy set
          {
            content: '<div>양화3주차장[양화선착장앞]</div>',
            latlng: new window.kakao.maps.LatLng(37.54489139, 126.89289421),
          },
        ];
        const imageSrc = '/config/parkinghold.png';

        for (let i = 0; i < positions.length; i++) {
          // 마커 이미지의 이미지 크기 입니다
          const imageSize = new window.kakao.maps.Size(24, 24);

          // 마커 이미지를 생성합니다
          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
          );

          // 마커를 생성합니다
          const marker = new window.kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title: positions[i].content, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
          });
          const infowindow = new window.kakao.maps.InfoWindow({
            content: positions[i].content, // 인포윈도우에 표시할 내용
          });

          new window.kakao.maps.event.addListener(
            marker,
            'mouseover',
            makeOverListener(map, marker, infowindow),
          );
          new window.kakao.maps.event.addListener(
            marker,
            'mouseout',
            makeOutListener(infowindow),
          );
          if (locationData[0] !== undefined) {
            const locPosition = new kakao.maps.LatLng(
              locationData[1],
              locationData[2],
            );
            const message = `<div style="padding:5px;">${locationData[0]}</div>`;
            displayMarker(map, locPosition, message);
          } else if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function (position) {
              const lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도

              const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                message = '<div style="padding:5px;">현위치</div>'; // 인포윈도우에 표시될 내용입니다

              // 마커와 인포윈도우를 표시합니다
              displayMarker(map, locPosition, message);
            });
          }
        }
      });
    };
    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
    setMapSelecter(true);
  }, [locationData]);

  return mapSelecter ? (
    <div className='flex items-center justify-center md:shadow-2xl p-5 text-black'>
      <div
        id='map'
        className='w-[95%] h-screen shadow-lg border-4 border-customSmothBlue rounded-lg'
      />
    </div>
  ) : (
    <div className='w-full min-h-max max-w-sm mx-auto p-4'>
      <div className='animate-pulse flex flex-col space-y-4'>
        <div className='bg-gray-300 w-[95%] h-72 rounded-md'></div>
      </div>
    </div>
  );
}

export default Map;
