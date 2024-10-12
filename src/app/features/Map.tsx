'use client';
import React, { useEffect, useState } from 'react';
import { KAKAO_API } from '../components/EnvController';
import { Infowindow } from '../types/interface';
// fixme
function makeOverListener(map: any, marker: any, infowindow: any) {
  return function () {
    infowindow.open(map, marker);
  };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow: Infowindow) {
  return function () {
    infowindow.close();
  };
}

function displayMarker(map, locPosition, message) {
  // 마커를 생성합니다
  const marker = new window.kakao.maps.Marker({
    map: map,
    position: locPosition,
  });

  const iwContent = message, // 인포윈도우에 표시할 내용
    iwRemoveable = true;

  // 인포윈도우를 생성합니다
  const infowindow = new window.kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable,
  });

  // 인포윈도우를 마커위에 표시합니다
  infowindow.open(map, marker);

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
}

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
        const positions = [
          // dummy set
          {
            content: '<div>양화3주차장[양화선착장앞]</div>',
            latlng: new window.kakao.maps.LatLng(37.54489139, 126.89289421),
          },
          {
            content: '<div>양화1주차장[당산철교 하부]</div>',
            latlng: new window.kakao.maps.LatLng(37.53796609, 126.90331806),
          },
          {
            content: '<div>양화2주차장[전망카페]</div>',
            latlng: new window.kakao.maps.LatLng(37.5388433, 126.90146242),
          },
          {
            content: '<div>신한드림리버오피스텔 주차장</div>',
            latlng: new window.kakao.maps.LatLng(37.529664, 126.924537),
          },
          {
            content: '<div>여의도한강3주차장(서강대교남단)</div>',
            latlng: new window.kakao.maps.LatLng(37.53240356, 126.924436),
          },
          {
            content: '<div>여의도한강2주차장(마포대교남단)</div>',
            latlng: new window.kakao.maps.LatLng(37.528797, 126.931198),
          },
          {
            content: '<div>파크원 주차장</div>',
            latlng: new window.kakao.maps.LatLng(37.52607331, 126.92831446),
          },
          {
            content: '<div>IFC 서울 주차장</div>',
            latlng: new window.kakao.maps.LatLng(37.52497241, 126.92532318),
          },
          {
            content: '<div>아이엠(im)증권빌딩</div>',
            latlng: new window.kakao.maps.LatLng(37.524501, 126.923781),
          },
          {
            content: '<div>여의도한강4주차장(여의2교-하부파천교)</div>',
            latlng: new window.kakao.maps.LatLng(37.526097, 126.913163),
          },
          {
            content: '<div>당산2동(구)</div>',
            latlng: new window.kakao.maps.LatLng(37.52824898, 126.90779447),
          },
          {
            content: '<div>롯데마트맥스 영등포점</div>',
            latlng: new window.kakao.maps.LatLng(37.52782182, 126.90463093),
          },
          {
            content: '<div>당산노외 공영주차장(시)</div>',
            latlng: new window.kakao.maps.LatLng(37.52625065, 126.89945376),
          },
          {
            content: '<div>영등포제2스포츠센터</div>',
            latlng: new window.kakao.maps.LatLng(37.526684, 126.902742),
          },
          {
            content: '<div>코레일유통 본사 사옥 주차장</div>',
            latlng: new window.kakao.maps.LatLng(37.525797, 126.902025),
          },
          {
            content: '<div>당산근린공원 공영(구)</div>',
            latlng: new window.kakao.maps.LatLng(37.52552609, 126.89579413),
          },
          {
            content: '<div>영등포구청별관 공영주차장(구)</div>',
            latlng: new window.kakao.maps.LatLng(37.528464, 126.89437002),
          },
          {
            content: '<div>우림이비지센타 주차장</div>',
            latlng: new window.kakao.maps.LatLng(37.52579977, 126.88797228),
          },
          {
            content: '<div>63스퀘어(63빌딩)</div>',
            latlng: new window.kakao.maps.LatLng(37.520253, 126.939938),
          },
          {
            content: '<div>여의도한강공원1주차장(63빌딩앞)</div>',
            latlng: new window.kakao.maps.LatLng(37.52217837, 126.93973139),
          },
          {
            content: '<div>씨티플라자 주차장</div>',
            latlng: new window.kakao.maps.LatLng(37.52407584, 126.92604709),
          },
          {
            content: '<div>앵커원</div>',
            latlng: new window.kakao.maps.LatLng(37.5240936, 126.9298043),
          },
          {
            content: '<div>여의도 사학연금(TP타워)</div>',
            latlng: new window.kakao.maps.LatLng(
              37.52169298376825,
              126.92284405231476,
            ),
          },
          {
            content: '<div>영등포구청역 공영주차장(시)</div>',
            latlng: new window.kakao.maps.LatLng(37.52432737, 126.89548892),
          },
          {
            content: '<div>여의도한강5주차장(성모병원앞)</div>',
            latlng: new window.kakao.maps.LatLng(37.51696501, 126.93576386),
          },
          {
            content: '<div>금융투자협회</div>',
            latlng: new window.kakao.maps.LatLng(37.519058, 126.927645),
          },
          {
            content: '<div>신길환승(5호선)(구)</div>',
            latlng: new window.kakao.maps.LatLng(37.51775234, 126.91460391),
          },
          {
            content: '<div>영등포 롯데역사 주차장</div>',
            latlng: new window.kakao.maps.LatLng(37.51597645, 126.90749608),
          },
          {
            content: '<div>세미콜론문래</div>',
            latlng: new window.kakao.maps.LatLng(37.516095, 126.899927),
          },
          {
            content: '<div>영남 공영주차장(시)</div>',
            latlng: new window.kakao.maps.LatLng(37.51947074, 126.90260898),
          },
          {
            content: '<div>영등포동제3공영(구)</div>',
            latlng: new window.kakao.maps.LatLng(37.517985, 126.902785),
          },
          {
            content: '<div>홈플러스 영등포점</div>',
            latlng: new window.kakao.maps.LatLng(37.518244, 126.895921),
          },
          {
            content: '<div>문래동공영(구)</div>',
            latlng: new window.kakao.maps.LatLng(37.51631443, 126.8877957),
          },
          {
            content: '<div>영등포본동제2공영(구)</div>',
            latlng: new window.kakao.maps.LatLng(37.51332538, 126.91407775),
          },
          {
            content: '<div>도림동 공영주차장(구)</div>',
            latlng: new window.kakao.maps.LatLng(37.50834696, 126.89679637),
          },
          {
            content: '<div>도림신협본점 옥외주차장</div>',
            latlng: new window.kakao.maps.LatLng(37.50563, 126.910559),
          },
          {
            content: '<div>대림운동장(구)</div>',
            latlng: new window.kakao.maps.LatLng(37.49965667, 126.89483844),
          },
          {
            content: '<div>대림1동공영(구)</div>',
            latlng: new window.kakao.maps.LatLng(37.49314103, 126.90163365),
          },
          // dummy set
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
            title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
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
          if (navigator.geolocation) {
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
  }, []);

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
