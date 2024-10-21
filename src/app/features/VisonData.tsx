import React from 'react';
import { useGlobalLocationState } from '../hooks/globalLocationDataState';
import ChartPage from '../components/ModelDataController';

//  api로 시각화 자료 가져와야함.
function VisonData() {
  const { locationData } = useGlobalLocationState();
  return (
    <>
      {locationData ? (
        <ChartPage />
      ) : (
        <div className='w-full  max-w-sm mx-auto text-center'>
          <div className='animate-pulse flex flex-col space-y-4'>
            <div className='bg-gray-300 h-96 w-full rounded-md items-center'>
              주차장 데이터 불러오는 중
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VisonData;
