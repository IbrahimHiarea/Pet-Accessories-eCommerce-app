import React from 'react';
import { FaPlus , FaMinus } from "react-icons/fa";
import style from './Toner.module.css';

function Toner({ counter , setCounter }) {
    return (
        <div className={style.toner}>
            <div className={style.minus} onClick={() => {
                const temp = Math.max(0 , counter - 1);
                setCounter(temp);
            }}>
                <FaMinus size="10px" color="#190482"/>
            </div>
            <div className={style.counter}>
                {counter}
            </div>
            <div className={style.add} onClick={() => setCounter(counter + 1)}>
                <FaPlus size="10px" color="#190482"/>
            </div>
        </div>
    );
}

export default Toner;