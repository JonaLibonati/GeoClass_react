import React from 'react';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { ButtonHome } from './buttonHome/ButtonHome';
import icon from '../../assets/icon.png';

export const Home = () => {

    const {langDict} = useContext(LangContext);

    return (
        <>
            <div className='flex basis-full justify-center'>
                <img className='inline md:size-28 size-10 self-center md:mt-3 mt-2' src={icon} />
                <h1 className='inline font-sans md:text-9xl text-5xl font-bold h-fit'>GeoClass</h1>
            </div>
            <h2 className='font-sans md:text-3xl text-xl basis-full h-fit'>{langDict.home.text1}</h2>
            <p className='font-sans md:text-xl text-md pt-5 basis-full h-fit'>{langDict.home.text2}</p>
            <div className='flex flex-wrap sm:flex-nowrap basis-full gap-2 sm:gap-4 md:gap-8 justify-center mt-5 h-24 md:h-28'>
                <ButtonHome to={'/uscs'} text1={langDict.home.buttonText11} text2={langDict.home.buttonText12}/>
                <ButtonHome to={'/aashto'} text1={langDict.home.buttonText21} text2={langDict.home.buttonText22}/>
            </div>
        </>
    )
}