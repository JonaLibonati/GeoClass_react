import React from 'react';
import { useContext, useState } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { UscsContext } from '../../contexts/UscsContext';
import { ClassTitle } from '../globalComponents/ClassTitle';
import { Input } from '../globalComponents/Input';
import { InputFloat } from '../globalComponents/InputFloat';
import { Modal } from '../globalComponents/Modal';
import { InfoUscs } from './InfoUscs';

export const Uscs = () => {

    const { langDict } = useContext(LangContext);

    const { group, soil, setTrigger, uscs, finesInputs, courseInputs, organicInputs } = useContext(UscsContext);

    const [modal, setModal] = useState(false);

    return (
        <>
            {modal ? <Modal setModal={setModal} element={<InfoUscs />}></Modal> : <></>}

            <ClassTitle title={langDict.globalComponents.classTitle.title1} />
            <div className='basis-full'>
                <button className='text-xs font-bold text-white mb-4 p-2 rounded-xl bg-[#DB8638]' onClick={() => setModal(true)}>{langDict.globalComponents.learnMore}</button>
            </div>
            <div className='max-w-[500px] basis-full'>
                <Input name={langDict.uscs.input1} type={'number'} unit={'%'} max={100} min={0} placeholder={'0 - 100'} setValue={uscs.sieve4} setTrigger={setTrigger}/>
                <Input name={langDict.uscs.input2} type={'number'} unit={'%'} max={100} min={0} placeholder={'0 - 100'} setValue={uscs.sieve200} setTrigger={setTrigger} />

                {courseInputs ?
                    <>
                        <InputFloat name={<>{'D'}{<sub>10 </sub>}{langDict.uscs.input3}</>} type={'number'} unit={'mm'} max={1000000} min={0} placeholder={' - '} step={'0.01'} setValue={uscs.d10} setTrigger={setTrigger} />
                        <InputFloat name={<>{'D'}{<sub>30 </sub>}{langDict.uscs.input4}</>} type={'number'} unit={'mm'} max={1000000} min={0} placeholder={' - '} step={'0.01'} setValue={uscs.d30} setTrigger={setTrigger} />
                        <InputFloat name={<>{'D'}{<sub>60 </sub>}{langDict.uscs.input5}</>} type={'number'} unit={'mm'} max={1000000} min={0} placeholder={' - '} step={'0.01'} setValue={uscs.d60} setTrigger={setTrigger} />
                    </>
                    : <></>
                }

                {finesInputs ?
                    <>
                        <Input name={langDict.uscs.input6} type={'number'} unit={'%'} max={100} min={0} placeholder={'0 - 100'} setValue={uscs.liquid} setTrigger={setTrigger} />
                        <Input name={langDict.uscs.input7} type={'number'} unit={'%'} max={100} min={0} placeholder={'0 - 100'} setValue={uscs.plastic} setTrigger={setTrigger}/>
                    </>
                    : <></>
                }

                {organicInputs ?
                    <>
                        <InputFloat defaultvalue={1} name={<>{'LL'}{<sub>{langDict.uscs.input8}</sub>}{'/LL'}<sub>{langDict.uscs.input9}</sub>{' Ratio'}</>} type={'number'} unit={''} max={1} min={0} placeholder={'0 - 1'} step={'0.01'} setValue={uscs.orgRatio} setTrigger={setTrigger} />
                    </>
                    : <></>
                }
                <p className='text-3xl pt-4'>{group}</p>
                <p className='text-xl'>{soil}</p>
            </div>
        </>
    )
}
