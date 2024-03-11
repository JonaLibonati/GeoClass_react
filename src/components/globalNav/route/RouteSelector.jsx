import React from 'react';
import { useContext, useState } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { useLocation } from 'react-router-dom';
import { RouteButton } from './RouteButton';

export const RouteSelector = () => {

    const {langDict} = useContext(LangContext);

    const [selectorState, setSelectorState] = useState(false);

    const hash = useLocation().pathname;

    return (
        selectorState === false ?

        <button className='font-bold' onClick={() => setSelectorState(true)} >
            {
                hash === '/' ? langDict.globalNav.home :
                hash === '/uscs' ? langDict.globalNav.uscs :
                hash === '/aashto' ? langDict.globalNav.aashto : ''
            }
        </button> :

        <div className='flex'>
            <RouteButton to={'/'} text={langDict.globalNav.home} setSelectorState={setSelectorState} padding={"pr-1"} />
            <RouteButton to={'/uscs'} text={langDict.globalNav.uscs} setSelectorState={setSelectorState} padding={"pl-1 pr-1"}  />
            <RouteButton to={'/aashto'} text={langDict.globalNav.aashto} setSelectorState={setSelectorState} padding={"pl-1"}  />
        </div>
    )
}