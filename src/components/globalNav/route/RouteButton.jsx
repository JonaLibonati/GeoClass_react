import React from 'react';
import { Link } from 'react-router-dom';

export const RouteButton = ({to, text, padding, setSelectorState}) => {

    const clickHandler = () => {
        setSelectorState(false);
    }

    return (
        <Link to={to} className={`font-bold ${padding}`} onClick={clickHandler}>{text}</Link>
    )
}
