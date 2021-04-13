import React, { useEffect } from 'react';
import './index.scss';

export default function AlertComponent({open, type, message, close}) {
    

    useEffect(()=>{
        let controller;
        if (open) {
            controller = setTimeout(()=>{
                close()
            },3000)
        }

        return () => clearTimeout(controller) 
    },[open, close])
    
    
    return(
        <React.Fragment>
            {
                open
                ? 
                <div className={`contAlert ${type ? 'alertTrue' : 'alertFalse'}` }>
                    <span >{message}</span>
                    <span onClick={()=> close()} className="btnClose cursor-p"> X </span>
                </div>
                : ''

            }

        </React.Fragment>
    )

    
}