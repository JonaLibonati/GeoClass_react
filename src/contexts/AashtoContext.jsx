import { createContext, useContext, useState, useRef, useEffect } from "react";
import { LangContext } from "./LangContext";
import { aashtoClass } from "./scripts/aashtoLogic";

export const AashtoContext = createContext(null);

export const AashtoProvider = ({children}) => {

    const { langDict ,langFinder, lang } = useContext(LangContext);

    const [group, setGroup] = useState('');
    const [soil, setSoil] = useState('');

    const sieve10 = useRef(undefined);
    const sieve40 = useRef(undefined);
    const sieve200 = useRef(undefined);
    const liquid = useRef(undefined);
    const plastic = useRef(undefined);

    const aashto = new aashtoClass(sieve10, sieve40, sieve200, liquid, plastic, setGroup, setSoil, langFinder);

    const [trigger, setTrigger] = useState('')

    useEffect(() => {

        console.log(aashto)

        if (aashto.isDataCompleted()) {
            if (aashto.isLiquidMinorThanPlastic()) {
                setGroup('');
                setSoil(langDict.error.text2);
            } else if (aashto.casagrandeLimit()) {
                setGroup('');
                setSoil(langDict.error.text3);
            } else {
                aashto.classify()
            }
        }
        else {setGroup(''); setSoil('');}

    }, [trigger, lang.current]);


    return (
        <AashtoContext.Provider value={{

            group,
            soil,
            setTrigger,
            aashto,
        }}>
            {children}
        </AashtoContext.Provider>
    );
}