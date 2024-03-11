import React from 'react';
import { Link } from 'react-router-dom';

export const ButtonHome = ({to, text1, text2}) => {
  return (
    <Link to={to} className='flex flex-wrap content-center justify-center w-10/12 sm:w-36 md:w-64 p-1 sm:p-2 bg-gray-200 border-2 rounded-xl border-[#DB8638]'>
        <p className='w-full text-l md:text-xl font-bold'>{text1}</p>
        <p className='text-xs md:text-base '>{text2}</p>
    </Link>
  )
}
