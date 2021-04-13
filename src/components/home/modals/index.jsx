import './index.scss';
import men1 from '../../../img/avatar/men1.png';
import men2 from '../../../img/avatar/men2.png';
import men3 from '../../../img/avatar/batman3.webp';
import men4 from '../../../img/avatar/men4.png';
import men5 from '../../../img/avatar/men5.webp';

import women1 from '../../../img/avatar/wome1.png';
import women2 from '../../../img/avatar/women2.png';
import women3 from '../../../img/avatar/women3.jpg';
import women4 from '../../../img/avatar/women4.jpg';
import women5 from '../../../img/avatar/women5.jpg';
import Loading from '../../custom/loading/index';
import React, { useEffect, useState, useMemo } from 'react';

import Alert from '../../custom/Alert/index';



export default function ModalHome(props) {

    const [create, setCreate] = useState({
        nikname: '',
        password: '',
        confirm: ''
    })

    
    const [alert, setAlert] = useState({
        type: false,
        message: '',
    });
    const [showAlert, setShowAlert] = useState(false);
    

    const propsAlert = {
        open: showAlert,
        type: alert.type,
        message: alert.message,
        close: closeAlert
    }

    

    const [currentAvatar, setCurrentAvatar] = useState(false);
    const [info, setInfo] = useState(props.info);
    const [currentAvatarPosition, setCurrentAvatarPosition] = useState(0);
    const arrayMen = useMemo(() => [men1, men2, men3, men4, men5], []);
    const arrayWomen = useMemo(() =>[women1, women2, women3, women4, women5], []);
    
    

    function closeAlert() {
        setShowAlert(false)
    }


    function handleClose() {
        props.close()
    
    }


    function nextAvatar() {
        setCurrentAvatar(false);
        let max = '';
        if (info.genero === 'men') {
             max = arrayMen.length;
        }else if(info.genero === 'women'){
             max = arrayWomen.length;
        }
        if(currentAvatarPosition === (max - 1)) {
            setCurrentAvatarPosition(0);
        } else {
            setCurrentAvatarPosition(currentAvatarPosition + 1);
        }
    }

    
    function backAvatar() {
        setCurrentAvatar(false);
        let max = '';
        if (info.genero === 'men') {
             max = arrayMen.length;
        }else if(info.genero === 'women'){
             max = arrayWomen.length;
        }
        if(currentAvatarPosition === 0) {
            setCurrentAvatarPosition(max - 1);
        } else {
            setCurrentAvatarPosition(currentAvatarPosition - 1);
        }
    }
    
    useEffect(()=> {
        const getCurrentAvatar = () => {
            if (info.genero === 'men') {
                setCurrentAvatar(arrayMen[currentAvatarPosition]);
            }else if(info.genero === 'women'){
                setCurrentAvatar(arrayWomen[currentAvatarPosition]);
            }
        }
        getCurrentAvatar();
    }, [info, arrayMen, arrayWomen, currentAvatarPosition]);


    function handleChange(e) {
        setCreate ({...create,
        [e.target.name]: e.target.value})
        
    }


    function handleNewCuent() {
    if (!create.nikname) {
            setAlert({
                type: false,
                message:'el nombre de usuario es requerido'
            }
            )
            setShowAlert(true)
            return 
        }
        
    
    
    if (!create.password) {
        setAlert({
            type: false,
            message:'la contraseña es requerida'
        }
        )
        setShowAlert(true)
        return 
    }
    
    if (!create.confirm) {
        setAlert({
            type: false,
            message:'debe confirmar su contraseña'
        }
        )
        setShowAlert(true)
        return 
    }else if (create.confirm !== create.password) {
        setAlert({
            type: false,
            message:'las contrseñas deben coincidir'
        })
        
        setShowAlert(true)
        return 
    }
    setAlert({
        type: true,
        message: 'su cuenta se creo exitosamente!!'
    })
    
}
    

    
        
    
    return(
        <React.Fragment>
        <div className="containerModal"  >
            <div className="contShadow p-relative" onClick={()=>handleClose()}></div>
            <div className="modal  bg-white ">
                <div className="contTitle d-flex aling-items-center justify-center mg-top-35 mg-bot-20 font-20">
                    <h1 className="cursor-p">CREA TU CUENTA</h1>
                </div>
                <div className="d-flex-column pdd-left-35 pdd-right-35">
                    <form id="formCreateAcount" className="d-flex-column">
                        <label htmlFor="nikname"  className="mg-top-10" >
                            <h1 className="u-bold mg-bot-10 font-14 cursor-p" >NOMBRE DE USUARIO</h1>
                            <input type="text" name="nikname" id="nikname" onChange={(e)=>handleChange(e)} className="input w-100"/>
                        </label>
                        <label htmlFor="password" className="mg-top-10">
                            <h1 className="u-bold mg-bot-10 font-14 cursor-p">CONTRASEÑA</h1>
                            <input type="text" name="password" id="password" onChange={(e)=>handleChange(e)} className="input w-100"/>
                        </label>
                        <label htmlFor="confirm"  className="mg-top-10">
                            <h1 className="u-bold mg-bot-10 font-14 cursor-p">CONFIRMAR CONTRASEÑA</h1>
                            <input type="text" name="confirm" id="confirm" onChange={(e)=>handleChange(e)} className="input w-100"/>
                        </label>
                        <div className="sectionAvatar d-flex mg-top-35 aling-items-center justify-center">
                            <span className="material-icons icon color-blue cursor-p" onClick={()=> backAvatar()}>west</span>          
                            {
                                currentAvatar
                                ? <img className="avatar d-flex aling-items-center justify-center mg-right-20 mg-left-20" alt="avatar" src={currentAvatar}/>
                                : <Loading/>
                            }
                           
                            
                            <span className="material-icons icon color-blue cursor-p" onClick={()=> nextAvatar() }>east</span>
                        </div>
                        <input type="button" value="CREAR CUENTA" onClick={()=> handleNewCuent()} onChange={(e)=>handleChange(e)}   className="submit color-white u-bold mg-top-20 cursor-p bg-blue font-14"/>

                    </form>
                    
                </div>
                
            </div>
            
            
        </div>
        {
            showAlert
            ? <Alert {...propsAlert}/>  
            : ''
        }
        </React.Fragment>
    );
}