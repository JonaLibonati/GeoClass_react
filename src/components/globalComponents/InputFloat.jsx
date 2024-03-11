import React, {useEffect, useRef} from 'react';

export const InputFloat = ({defaultvalue, name, nameBefore, type, unit, max, min, step, placeholder, setValue, setTrigger}) => {

    const input = useRef(null);

    const handleOnInput = (e) => {

        let value = parseFloat(e.target.value);

        if (value > max) e.target.value = max;
        if (value < min) e.target.value = min;

        setValue.current = value;
        setTrigger(value => value + 1);
    }

    useEffect(() => {
        if (defaultvalue != undefined) {
            setValue.current = defaultvalue;
        }

        input.current.value = defaultvalue;
    }, []);

    return (
        <div className='group flex flex-wrap basis-full p-4 pt-1 pb-1 mt-1 mb-1 border-2 rounded-xl bg-white has-[:focus-visible]:border-[#DB8638]'>
            <p className='basis-full text-left text-xs sm:text-sm'>{nameBefore}{name}</p>
            <div className='flex basis-full sm:text-xl'>
                <input
                    ref={input}
                    className='basis-full focus-visible:outline-0'
                    max={ max === undefined? '' : max }
                    min={ min === undefined? '' : min }
                    step={ step === undefined? '' : step }
                    placeholder={ placeholder === undefined? '' : placeholder }
                    type={type}
                    onInput={(e) => handleOnInput(e)}
                />
                <p className='inline pl-3' >{unit}</p>
            </div>
        </div>
    )
}
