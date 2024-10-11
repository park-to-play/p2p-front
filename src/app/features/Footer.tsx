import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <div className=' w-full'>
      <div className='w-full text-gray-100 py-10'>
        <div className='text-center'>
          <h3 className='text-3xl mb-6 font-semibold'>
            주차, 이제 스마트하게! P2P로 빠르고 쉽게 해결하세요!
          </h3>
          <div className='text-sm leading-relaxed text-gray-600'>
            <h2 className='text-lg font-bold '>Park to Play (P2P)</h2>
            <p>
              Park to Play(P2P)는 주차를 더 효율적이고 스마트하게 만들어 주는
              서비스입니다. <br />
              사용자는 이용하고자 하는 시간에 주차 공간을 쉽게 찾고, 실시간으로
              주차 상황을 확인하여 더많은 시간을 자유롭게 사용할수 있습니다.
            </p>
          </div>
        </div>
        <div className='flex justify-center space-x-8 text-sm text-gray-400'>
          <Link
            href={'https://github.com/park-to-play'}
            className='hover:text-yellow-400 transition-colors duration-300'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='50'
              height='50'
              viewBox='0 0 72 72'
            >
              <path d='M36,12c13.255,0,24,10.745,24,24c0,10.656-6.948,19.685-16.559,22.818c0.003-0.009,0.007-0.022,0.007-0.022	s-1.62-0.759-1.586-2.114c0.038-1.491,0-4.971,0-6.248c0-2.193-1.388-3.747-1.388-3.747s10.884,0.122,10.884-11.491	c0-4.481-2.342-6.812-2.342-6.812s1.23-4.784-0.426-6.812c-1.856-0.2-5.18,1.774-6.6,2.697c0,0-2.25-0.922-5.991-0.922	c-3.742,0-5.991,0.922-5.991,0.922c-1.419-0.922-4.744-2.897-6.6-2.697c-1.656,2.029-0.426,6.812-0.426,6.812	s-2.342,2.332-2.342,6.812c0,11.613,10.884,11.491,10.884,11.491s-1.097,1.239-1.336,3.061c-0.76,0.258-1.877,0.576-2.78,0.576	c-2.362,0-4.159-2.296-4.817-3.358c-0.649-1.048-1.98-1.927-3.221-1.927c-0.817,0-1.216,0.409-1.216,0.876s1.146,0.793,1.902,1.659	c1.594,1.826,1.565,5.933,7.245,5.933c0.617,0,1.876-0.152,2.823-0.279c-0.006,1.293-0.007,2.657,0.013,3.454	c0.034,1.355-1.586,2.114-1.586,2.114s0.004,0.013,0.007,0.022C18.948,55.685,12,46.656,12,36C12,22.745,22.745,12,36,12z'></path>
            </svg>
          </Link>
          <Link
            href={'https://www.notion.so/2-1076efa4d8778020ac6cf415c2a30111'}
            className='hover:text-yellow-400 transition-colors duration-300'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='50'
              height='50'
              viewBox='0 0 48 48'
            >
              <path
                fill='#fff'
                fillRule='evenodd'
                d='M11.553,11.099c1.232,1.001,1.694,0.925,4.008,0.77 l21.812-1.31c0.463,0,0.078-0.461-0.076-0.538l-3.622-2.619c-0.694-0.539-1.619-1.156-3.391-1.002l-21.12,1.54 c-0.77,0.076-0.924,0.461-0.617,0.77L11.553,11.099z'
                clip-rule='evenodd'
              ></path>
              <path
                fill='#fff'
                fillRule='evenodd'
                d='M12.862,16.182v22.95c0,1.233,0.616,1.695,2.004,1.619 l23.971-1.387c1.388-0.076,1.543-0.925,1.543-1.927V14.641c0-1-0.385-1.54-1.234-1.463l-25.05,1.463 C13.171,14.718,12.862,15.181,12.862,16.182L12.862,16.182z'
                clip-rule='evenodd'
              ></path>
              <path
                fill='#424242'
                fillRule='evenodd'
                d='M11.553,11.099c1.232,1.001,1.694,0.925,4.008,0.77 l21.812-1.31c0.463,0,0.078-0.461-0.076-0.538l-3.622-2.619c-0.694-0.539-1.619-1.156-3.391-1.002l-21.12,1.54 c-0.77,0.076-0.924,0.461-0.617,0.77L11.553,11.099z M12.862,16.182v22.95c0,1.233,0.616,1.695,2.004,1.619l23.971-1.387 c1.388-0.076,1.543-0.925,1.543-1.927V14.641c0-1-0.385-1.54-1.234-1.463l-25.05,1.463C13.171,14.718,12.862,15.181,12.862,16.182 L12.862,16.182z M36.526,17.413c0.154,0.694,0,1.387-0.695,1.465l-1.155,0.23v16.943c-1.003,0.539-1.928,0.847-2.698,0.847 c-1.234,0-1.543-0.385-2.467-1.54l-7.555-11.86v11.475l2.391,0.539c0,0,0,1.386-1.929,1.386l-5.317,0.308 c-0.154-0.308,0-1.078,0.539-1.232l1.388-0.385V20.418l-1.927-0.154c-0.155-0.694,0.23-1.694,1.31-1.772l5.704-0.385l7.862,12.015 V19.493l-2.005-0.23c-0.154-0.848,0.462-1.464,1.233-1.54L36.526,17.413z M7.389,5.862l21.968-1.618 c2.698-0.231,3.392-0.076,5.087,1.155l7.013,4.929C42.614,11.176,43,11.407,43,12.33v27.032c0,1.694-0.617,2.696-2.775,2.849 l-25.512,1.541c-1.62,0.077-2.391-0.154-3.239-1.232l-5.164-6.7C5.385,34.587,5,33.664,5,32.585V8.556 C5,7.171,5.617,6.015,7.389,5.862z'
                clip-rule='evenodd'
              ></path>
            </svg>
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
