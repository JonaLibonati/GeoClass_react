import React from 'react';
import { useContext, useState } from 'react';
import { ClassTitle } from '../globalComponents/ClassTitle';
import { LangContext } from '../../contexts/LangContext';
import { Input } from '../globalComponents/Input';
import { AashtoContext } from '../../contexts/AashtoContext';
import { Modal } from '../globalComponents/Modal';
import { InfoAashto } from './InfoAashto';

export const Aashto = () => {

    const { langDict } = useContext(LangContext);

    const { group, soil, setTrigger, aashto } =  useContext(AashtoContext);

    const [modal, setModal] = useState(false);

    return (
        <>
            {modal ? <Modal setModal={setModal} element={<InfoAashto/>}></Modal> : <></>}

            <ClassTitle title={langDict.globalComponents.classTitle.title2} />
            <div className='basis-full'>
                <button className='text-xs font-bold text-white mb-4 p-2 rounded-xl bg-[#DB8638]' onClick={() => setModal(true)}>{langDict.globalComponents.learnMore}</button>
            </div>
            <div className='max-w-[500px] basis-full'>
                <Input name={langDict.aashto.input1} type={'number'} unit={'%'} max={100} min={0} placeholder={'0 - 100'} setValue={aashto.sieve10} setTrigger={setTrigger} />
                <Input name={langDict.aashto.input2} type={'number'} unit={'%'} max={100} min={0} placeholder={'0 - 100'} setValue={aashto.sieve40} setTrigger={setTrigger}/>
                <Input name={langDict.aashto.input3} type={'number'} unit={'%'} max={100} min={0} placeholder={'0 - 100'} setValue={aashto.sieve200} setTrigger={setTrigger}/>
                <Input name={langDict.aashto.input4} type={'number'} unit={'%'} max={100} min={0} placeholder={'0 - 100'} setValue={aashto.liquid} setTrigger={setTrigger}/>
                <Input name={langDict.aashto.input5} type={'number'} unit={'%'} max={100} min={0} placeholder={'0 - 100'} setValue={aashto.plastic} setTrigger={setTrigger}/>
                <p className='text-3xl pt-4'>{group}</p>
                <p className='text-xl'>{soil}</p>
            </div>
        </>
    )
}
