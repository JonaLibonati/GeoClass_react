import React from 'react';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';

export const InfoAashto = () => {

    const { langDict } = useContext(LangContext);

  return (
    <>
        <h3 className='font-bold pb-2 text-[#DB8638]'>{langDict.aashto.info.text1}</h3>
        <p className='pb-2'>{langDict.aashto.info.text2}</p>
        <p className='pb-2'>{langDict.aashto.info.text3}</p>
        <p>
            {langDict.aashto.info.text4} <span className='text-[#DB8638]'>{langDict.aashto.info.text5}</span>{langDict.aashto.info.text6}
        </p>
    </>
  )
}
