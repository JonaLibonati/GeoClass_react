import { createContext, useEffect, useState, useRef } from "react";
import { languages } from "../data/languages";

export const LangContext = createContext(null);

export const LangProvider = ({children}) => {

    const langFinder = () => languages.find( language => language.lang === lang.current)

    const lang = useRef('en');

    const [langDict, setLangDict] = useState(langFinder);

    const [selectorState, setSelectorState] = useState(false);

    useEffect(() => {
        setLangDict(langFinder());
    }, [lang.current])

    return (
        <LangContext.Provider value={{ langDict, lang, selectorState, setSelectorState, langFinder}}>
            {children}
        </LangContext.Provider>
    );
}