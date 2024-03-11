import React from 'react';
import { LangSelector } from './lang/LangSelector';
import { RouteSelector } from './route/RouteSelector';

export const GlobalNav = () => {
    return (
        <>
            <div className='h-12'>
                <div className='flex items-center justify-between h-full w-11/12 m-auto border-b-2 border-[#DB8638]'>
                    <RouteSelector />
                    <LangSelector />
                </div>
            </div>
        </>
    )
}
