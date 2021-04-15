import "./index.scss";
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
import LoadingWhite from '../../custom/loadingWhite/index.jsx';
import React, { useState, useMemo, useEffect } from 'react';
import axios from "axios";

export default function EditUserComponent(props) {
    const [currentAvatar, setCurrentAvatar] = useState(false);
    const [edit, setEdit] = useState(false);
    const [info, setInfo] = useState({
        name: '',
        lastName: '',
        email: '',
        gender: '',
        user: '',
        password: '',
        confirmPassword: ''
 
    });
    const API = 'http://localhost:5000';
    const resource = '/users';
    const arrayMen = useMemo(() => [men1, men2, men3, men4, men5], []);
    const arrayWomen = useMemo(() =>[women1, women2, women3, women4, women5], []);
    const [currentAvatarPosition, setCurrentAvatarPosition] = useState(0);
    const [clone, setClone] = useState();

    function handleEdit() {
        if (!edit) {
            setEdit(true);
            return
        }else{
            setEdit(false);
            return
        }
        
    }

    function nextAvatar() {
        if (edit) {
            
            setCurrentAvatar(false);
            let max = '';
            if (info.gender === 'men') {
                max = arrayMen.length;
            }else if(info.gender === 'women'){
                max = arrayWomen.length;
            }
            console.log(info);
            if(currentAvatarPosition === (max - 1)) {
                setCurrentAvatarPosition(0);
            } else {
                setCurrentAvatarPosition(currentAvatarPosition + 1);
            }
            if (info.gender === 'men') {
                setCurrentAvatar(arrayMen[currentAvatarPosition]);
            }else if(info.gender === 'women'){
                setCurrentAvatar(arrayWomen[currentAvatarPosition]);
            }
        }else{
            return
        }
        
    }
    function backAvatar() {
        if (edit) {
            
            setCurrentAvatar(false);
            let max = '';
            if (info.gender === 'men') {
                max = arrayMen.length;
            }else if(info.gender === 'women'){
                max = arrayWomen.length;
            }
            if(currentAvatarPosition === 0) {
                setCurrentAvatarPosition(max - 1);
            } else {
                setCurrentAvatarPosition(currentAvatarPosition - 1);
            }
            if (info.gender === 'men') {
                setCurrentAvatar(arrayMen[currentAvatarPosition]);
            }else if(info.gender === 'women'){
                setCurrentAvatar(arrayWomen[currentAvatarPosition]);
            }
        }else{
            return
        }
    }

    const getUser = async () => {
        const data = await axios.get(`${API}${resource}/${localStorage.getItem('userId')}`);
        if (data.status === 200 && data.data) {
            setInfo(data.data);
            setCurrentAvatar(data.data.avatar);
        }else{
            alert('no se encontro el susuario');
        }

    } 

    function handleChange(e) {
        setInfo ({...info, 
            [e.target.name]: e.target.value})
            
    
    }

    useEffect(()=> {
        getUser();
        if (info.gender === 'men') {
            document.getElementById('men').checked = true;
        }else if(info.gender === 'women'){
            document.getElementById('women').checked = true;    
        }
    }, [info]);


    return(
       <div className="containerEditUser  bg-white">
           <div className="contDatesRegister">
                <h1 className="titleRegister">Datos de registro</h1> 
                <form className="formRegister">
                    <label htmlFor='nombre' className="itemRegister">
                        <h2 className="textRegister">Nombre</h2>
                        <input readOnly={edit ? false : true} value={info.name} className={`inputRegister pdd-left-10 ${edit ? 'bg-white' : 'bg-gray'}`} onChange={(e)=> handleChange(e)} id='nombre' name='name' type="text"/>    
                    </label> 
                    <label htmlFor='apellido' className="itemRegister">
                        <h2 className="textRegister">Apellido</h2>
                        <input readOnly={edit ? false : true} className={`inputRegister pdd-left-10 ${edit ? 'bg-white' : 'bg-gray'}`}  value={info.lastName} onChange={(e)=> handleChange(e)} name='lastName' type="text"/>    
                    </label> 
                    <label className="itemRegister">
                        <h2 className="textRegister">Email</h2>
                        <input readOnly={edit ? false : true}  className={`inputRegister pdd-left-10 ${edit ? 'bg-white' : 'bg-gray'}`} value={info.email} onChange={(e)=> handleChange(e)} name='email' type="email"/>    
                    </label> 
                    <div className="itemRegister">
                        <h2 className="textRegister">Genero</h2>
                        <div className="contGenero">
                            <label htmlFor="men" className="genero ">
                                <h2 className="textGenero">MASCULINO</h2>
                                <input  className="radio" type="radio" name="gender"  onChange={(e)=> handleChange(e)} value="men"  id="men"/>
                            </label>
                            <label htmlFor="women" className="genero">
                                <h2 className="textGenero">FEMENINO</h2>
                                <input  className="radioGenero" type="radio" name="gender" onChange={(e)=> handleChange(e)}  value="women"  id="women"/>
                                
                            </label>
                        </div>
                    </div>    
                </form> 
                <div className="contBtnRegister">
                <button onClick={() => handleEdit()} className="btnRegister">Editar</button>
                </div>
           </div>
           <div className="contDatesLogin">
                <h1 className="titleLogin">Datos de inicio de sesion</h1>  
                <form className="formLogin">
                    <div className="itemLogin">
                        <h2 className="textLogin">Nombre De Usuario</h2>
                        <input readOnly={edit ? false : true} className={`inputLogin pdd-left-10 ${edit ? 'bg-white' : 'bg-gray'}`} onChange={(e)=> handleChange(e)}   type="text" value={info.user} name='user'/>    
                    </div> 
                    <div className="itemLogin">
                        <h2 className="textLogin">Contraseña</h2>
                        <input readOnly={edit ? false : true}className={`inputLogin pdd-left-10 ${edit ? 'bg-white' : 'bg-gray'}`} onChange={(e)=> handleChange(e)} type="text" value={info.password} name='password'/>    
                    </div> 
                    <div className="itemLogin">
                        <h2 className="textLogin">Confirmar Contraseña</h2>
                        <input readOnly={edit ? false : true} className={`inputLogin pdd-left-10 ${edit ? 'bg-white' : 'bg-gray'}`} onChange={(e)=> handleChange(e)}  type="text" name='confirmPassword'/>    
                    </div> 
                    <div className="sectionAvatar ">
                            <span className="material-icons icon arrow cursor-p" onClick={()=> backAvatar()}>west</span>
                            <div className="contAvatar">
                            
                            {
                                currentAvatar
                                ?<img className="avatar d-flex aling-items-center justify-center mg-right-20 mg-left-20" alt="avatar" src={currentAvatar}/>
                                :<LoadingWhite />
                            }    
                            </div> 
                            <span className="material-icons icon arrow cursor-p" onClick={()=> nextAvatar() }>east</span>
                        </div>
                </form>
                <div className="contBtnLogin">
                <button className="btnLogin">Actualizar</button>
                </div>
           </div>
       </div>
    )
}