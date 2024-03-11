import React from 'react';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';

export const InfoUscs = () => {

    const { langDict } = useContext(LangContext);

  return (
    <>
        <h3 className='font-bold pb-2 text-[#DB8638]'>{langDict.uscs.info.text1}</h3>
        <p className='pb-2'>{langDict.uscs.info.text2}</p>
        <ol className='text-md list-decimal marker:font-bold marker:text-[#DB8638] pt-1 pb-1'>
            <li className='ml-8'>{langDict.uscs.info.text3}</li>
            <li className='ml-8'>{langDict.uscs.info.text4}</li>
        </ol>
        <p className='pb-2'>{langDict.uscs.info.text5}</p>
        <ul className='list-disc marker:font-bold marker:text-[#DB8638] pt-1 pb-1'>
            <li className='ml-8'><span className='font-bold text-[#DB8638]'>G:</span> {langDict.uscs.info.text6}</li>
            <li className='ml-8'><span className='font-bold text-[#DB8638]'>S:</span> {langDict.uscs.info.text7}</li>
            <li className='ml-8'><span className='font-bold text-[#DB8638]'>M:</span> {langDict.uscs.info.text8}</li>
            <li className='ml-8'><span className='font-bold text-[#DB8638]'>C:</span> {langDict.uscs.info.text9}</li>
            <li className='ml-8'><span className='font-bold text-[#DB8638]'>O:</span> {langDict.uscs.info.text10}</li>
            <li className='ml-8'><span className='font-bold text-[#DB8638]'>W:</span> {langDict.uscs.info.text11}</li>
            <li className='ml-8'><span className='font-bold text-[#DB8638]'>P:</span> {langDict.uscs.info.text12}</li>
            <li className='ml-8'><span className='font-bold text-[#DB8638]'>L:</span> {langDict.uscs.info.text13}</li>
            <li className='ml-8'><span className='font-bold text-[#DB8638]'>H:</span> {langDict.uscs.info.text14}</li>
        </ul>
    </>
  )
}
