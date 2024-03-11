import { createContext, useContext, useState, useRef, useEffect } from "react";
import { LangContext } from "./LangContext";
import { UscsClass } from "./scripts/uscsLogic";

export const UscsContext = createContext(null);

export const UscsProvider = ({children}) => {

    const { langFinder, lang } = useContext(LangContext);

    const [group, setGroup] = useState('');
    const [soil, setSoil] = useState('');

    const [finesInputs, setFinesInputs] = useState(false);
    const [courseInputs, setCourseInputs] = useState(false);
    const [organicInputs, setOrganicInputs] = useState(false);

    const sieve4 = useRef(undefined);
    const sieve200 = useRef(undefined);
    const d10 = useRef(undefined);
    const d30 = useRef(undefined);
    const d60 = useRef(undefined);
    const liquid = useRef(undefined);
    const plastic = useRef(undefined);
    const orgRatio = useRef(undefined);

    const uscs = new UscsClass(sieve4, sieve200, d10, d30, d60, liquid, plastic, orgRatio, setGroup, setSoil, langFinder);

    const [trigger, setTrigger] = useState('');

    useEffect(() => {
        console.log(uscs)
        if (uscs.isSieveCompleted()) {
            if (uscs.fines0to4()) {
                setCourseInputs(true);
                setFinesInputs(false);
                setOrganicInputs(false);
            } else if (uscs.fines5to11()) {
                setCourseInputs(true);
                setFinesInputs(true);
                setOrganicInputs(false);
            }
            else if (uscs.fines12to50()) {
                setCourseInputs(false);
                setFinesInputs(true);
                setOrganicInputs(false);
            } else {
                setCourseInputs(false);
                setFinesInputs(true);
                setOrganicInputs(true);
            }
        } else {
            setCourseInputs(false);
            setFinesInputs(false);
            setOrganicInputs(false);
        }

    }, [trigger])

    useEffect(() => {

        uscs.classify()

    }, [trigger, lang.current]);


    return (
        <UscsContext.Provider value={{
            group,
            soil,
            trigger,
            setTrigger,
            finesInputs,
            courseInputs,
            organicInputs,
            uscs,
        }}>
            {children}
        </UscsContext.Provider>
    );
}