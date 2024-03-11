import React from 'react';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';

export const ClassTitle = ({title}) => {

    const { langDict } = useContext(LangContext);

    return (
        <>
            <h3 className='basis-full font-bold sm:text-xl' >{langDict.globalComponents.classTitle.text}</h3>
            <h2 className='basis-full text-3xl sm:text-4xl font-bold pb-4' >{title}</h2>
        </>
    )
}
