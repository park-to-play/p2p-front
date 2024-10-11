import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <div className='bg-gray-800 w-full'>
      <div className='w-full text-gray-100 py-10'>
        <div className='text-center'>
          <h3 className='text-3xl mb-6 font-semibold'>
            P2P와 함께 스마트하게 주차하세요.
            <br />더 이상 주차 공간 찾느라 시간 낭비하지 마세요!
          </h3>
        </div>
        <div className='mt-16 flex justify-center space-x-8 text-sm text-gray-400'>
          <Link
            href={'https://github.com/park-to-play'}
            className='hover:text-yellow-400 transition-colors duration-300'
          >
            Github
          </Link>
          <Link
            href={'https://www.notion.so/2-1076efa4d8778020ac6cf415c2a30111'}
            className='hover:text-yellow-400 transition-colors duration-300'
          >
            Notion
          </Link>
        </div>

        {/* Footer Text */}
        <div className='mt-8 text-center text-gray-500'>
          <p>&copy; Parking to play, 2024</p>
        </div>
      </div>
    </div>
  );
}
