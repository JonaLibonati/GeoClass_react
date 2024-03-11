import React from 'react';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';

export const LangButton = ({language, text, padding}) => {

    const {setSelectorState, lang} = useContext(LangContext);

    const clickHandler = () => {
        lang.current = language;
        setSelectorState(false);
    }

    return (
        <button className={`font-bold ${padding}`} onClick={clickHandler}>{text}</button>
    )
}
