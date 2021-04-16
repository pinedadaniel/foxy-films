import './index.scss';
import React, { useState, useEffect } from 'react';
import logo from "../../../img/logo.png";
import Modal from "../modals/index";
import Alert from '../../custom/Alert/index';
import axios from "axios";
import {useHistory} from 'react-router-dom';

export default function ComponentBodyHome() {
    const [block, setBlock] = useState(false);

    const [memoriesPassword] = useState(localStorage.getItem('memoriesPassword'));
    const [datos, setDatos] = useState({
        nombre: '',
        apellido: '',
        email: '',
        genero: '',
    });
    const history = useHistory();

    const [login, setLogin] = useState({
        usuario:'',
        contraseña:'',
    })
    const API = 'http://localhost:5000';
    const resource = '/users';
    const [mode, setMode] = useState('login');
    const [modal, setModal] = useState(false);
    const [memories, setMemories] = useState(false);

    const [alert, setAlert] = useState({
        type: false,
        message: '',
    });
    const [showAlert, setShowAlert] = useState(false);

    

    const props = {
        open: showAlert,
        type: alert.type,
        message: alert.message,
        close: closeAlert
    }


    function closeAlert() {
        setShowAlert(false)
    }

    function handleClose() {
        setModal(false);
    }

    
    function handleChange(event) {
        setDatos ({...datos, 
            [event.target.name]: event.target.value})
    }


    function handleClick(checked) {
        setMode(checked);
    }

    function handleRegister() {
        if (!datos.nombre) {
            setAlert({
                type: false,
                message:'el nombre es requerido'
            }
            )
            setShowAlert(true)
            return 
        }
        
        if (!datos.apellido) {

            setAlert({
                type: false,
                message:'el apellido es requerido'
            }
            )            
            setShowAlert(true)
            return
            
        }
        
        if (!datos.email) {
           
            setAlert({
                type: false,
                message:'el correo electronico es requerido'
            }
            )
            setShowAlert(true)
            return
            
        }
        
        if (!datos.genero) {
            
            setAlert({
                type: false,
                message:'el genero es requerido'
            }
            )
            setShowAlert(true)
            return
            
        }
        setModal(true);
        setShowAlert(false);
        localStorage.setItem('modelRegister', JSON.stringify(datos));
    }


    function handleChangeLogin(e) {
        setLogin({...login,
            [e.target.name]: e.target.value})
    }

    function handleReturn() {
        setMode('login');
        setDatos({
            nombre: '',
            apellido: '',
            email: '',
            genero: '',
        });
        setLogin({
            usuario:'',
            contraseña:'',
        });
        handleClose();
    }

   function handleLogin() {
        if(block) {
            return;
        }
        setBlock(true);
        if (!login.usuario) {
            setAlert({
                type: false,
                message:'debe ingresar su nombre de usuario'
            })
            setShowAlert(true)
            return
        }
        
        if (!login.contraseña) {
            setAlert({
                type: false,
                message:'debe ingresar su contraseña'
            })
            setShowAlert(true)
            return
        }
        if(memories){
            localStorage.setItem('memoriesPassword', login.contraseña);    
           }

        submit();
    }

    const submit = async () => {
        const response = await axios.get(`${API}${resource}?user=${login.usuario}&password=${login.contraseña}`);
        console.log(response)
        if(response.status === 200 && response.data.length > 0){
            localStorage.setItem('userId', response.data[0].id);
            setBlock(false);
            history.push('dashboard/bankMovie');
        } else {
            setAlert({
                type: false,
                message:'Usuario o contraseña incorrectos'
            })
            setShowAlert(true);
            setBlock(false);
            return
        }
    }

    useEffect(() => {
        if(memoriesPassword){
            setLogin({
                ...login,
                ['contraseña']: memoriesPassword
            })
        }
    }, [memoriesPassword])
    return(
        <div className="containerMainBody d-flex aling-items-center justify-center w-100 ">
            <img className="logo" src={logo} alt='logo'/>
            <div className="containerBody d-flex aling-items-center justify-center w-30 bg-white ">
                <div className="containerCheckbox mg-bot-30 d-flex justify-between aling-items-center w-100">
                    <div onClick={()=>handleClick('login') } className={`iniciarSesion  w-100 h-100 aling-items-center d-flex justify-center w-50  ${ mode === 'login' ? 'active' : ''} ` }>
                        <span className=" text-justify u-bold font-14"  >INICIAR SESIÓN</span>

                    </div>
                    <div onClick={()=>handleClick('register') } className={`registrarse color-blue d-flex  w-100 h-100 aling-items-center justify-center w-50 ${ mode === 'register' ? 'active' : ''}  `}>
                        <span className=" u-bold  text-justify font-14"  >REGISTRARSE</span>
                    </div>
                </div>

                <div className="contentForm w-100 "> 

                {
                    mode === 'login'
                    ?  <div className="ContentSingIn ">
                        
                        <form className="d-flex-column" id="formLogin" >
                            <label htmlFor="usuario" className="mg-top-10">
                                <h1 className="u-medium mg-bot-10 font-12 cursor-p">USUARIO</h1>
                                <input value={login.usuario} autoComplete={'off'} className="inputUser  w-100" type="text" onChange={(e)=> handleChangeLogin(e)} name="usuario" id="usuario"/>
                            </label> 
                            
                            <label htmlFor="Password" className="mg-top-10">
                                <h1 className="u-medium mg-bot-10 font-12 cursor-p">CONTRASEÑA</h1>
                                <input value={login.contraseña} autoComplete={'off'} className="inputUser  w-100" type="password"  onChange={(e)=> handleChangeLogin(e)}   name="contraseña" id="password"/>
                            </label>
                            <label htmlFor="TyC" className=" w-100 d-flex aling-items-center mg-top-10">

                                <input className="cursor-p" onChange={(e) => setMemories(e.target.checked)} type="checkbox" name="MemoricePassword" id="TyC"/>
                                <h2 className="font-12 mg-left-5 u-regular cursor-p ">RECORDAR CONTRASEÑA </h2>
                            </label>
                            <button type="button" onClick={() => handleLogin()} className="submit color-white u-bold mg-top-20 cursor-p bg-blue font-14 ">INICIAR SESION</button>
                        </form>

                    </div>

                    : <div className="ContentRegister">
                        
                    
                        
                        <form className="d-flex-column" id="formRegister" >
                            <label htmlFor="nombre" className="mg-top-10">
                                <h1 className="u-bold mg-bot-10 font-14 cursor-p">NOMBRE:</h1>
                                <input value={datos.nombre} autoComplete={'off'} className="input  w-100" type="text" onChange={(e)=>handleChange(e)} name="nombre" id="nombre"/>
                            </label>
                            
                            <label htmlFor="lastname" className="mg-top-10">
                                <h1 className="u-bold mg-bot-10 font-14 cursor-p">APELLIDO:</h1>
                                <input value={datos.apellido}  autoComplete={'off'} className="input  w-100" type="text" onChange={(e)=>handleChange(e)} name="apellido" id="lastname"/>
                            </label>
                            
                            <label htmlFor="email" className="mg-top-10">
                                <h1 className="u-bold mg-bot-10 font-14 cursor-p">EMAIL:</h1>
                                <input  autoComplete={'off'} className="input  w-100" type="email" onChange={(e)=>handleChange(e)} name="email" id="email"/>
                            </label>
                            <div className="d-flex">
                                    
                                <h2 className="color-blue font-14 u-bold mg-top-10 cursor-p">GENERO:</h2>
                                <label htmlFor="men" className="genero mg-left-20 d-flex aling-items-center mg-top-10">
                                    <input className="radio cursor-p" type="radio" name="genero" onChange={(e)=>handleChange(e)} value="men" id="men"/>
                                    <h2 className="font-12 mg-left-5  u-regular cursor-p ">MASCULINO</h2>
                                </label>
                                <label htmlFor="women" className="genero mg-left-20 d-flex aling-items-center mg-top-10">
                                    <input className="radio cursor-p" type="radio" name="genero" onChange={(e)=>handleChange(e)} value="women" id="women"/>
                                    <h2 className="font-12 mg-left-5 u-regular cursor-p ">FEMENINO</h2>
                                </label>

                            </div>
                            <button type="button" className="submit color-white u-bold mg-top-20 cursor-p bg-blue font-14  " onClick={()=> handleRegister()} >REGISTRARSE</button>
                        </form>
                    </div>

                }


                    
                  

                   

                </div>
            </div>
            {
                modal
                ? <Modal info={datos} return={handleReturn} close={handleClose}/>
                : ''
            
            }
            {
                showAlert
                ? <Alert {...props}/>  
                : ''
            }


        </div>
    );
}
