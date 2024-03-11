import React from 'react';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { LangButton } from './LangButton';

export const LangSelector = () => {

    const {langDict, selectorState, setSelectorState} = useContext(LangContext);

    return (
        selectorState === false ?

        <button className='font-bold' onClick={() => setSelectorState(true)} >{langDict.selectorText}</button> :

        <div className='flex'>
            <LangButton language={'en'} text={'ENG'} padding={"pr-1"}/>
            <LangButton language={'es'} text={'ESP'} padding={"pl-1 pr-1"}/>
            <LangButton language={'it'} text={'ITA'} padding={"pl-1"}/>
        </div>
    )
}
