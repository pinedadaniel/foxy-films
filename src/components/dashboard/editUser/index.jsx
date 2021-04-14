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
import React, { useEffect, useState, useMemo } from 'react';
export default function EditUserComponent(props) {
    const [currentAvatar, setCurrentAvatar] = useState(false);
    const [info] = useState(props.info);
    const [currentAvatarPosition, setCurrentAvatarPosition] = useState(0);
    const arrayMen = useMemo(() => [men1, men2, men3, men4, men5], []);
    const arrayWomen = useMemo(() =>[women1, women2, women3, women4, women5], []);

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
    

    return(
       <div className="containerEditUser  bg-white">
           <div className="contDatesRegister">
                <h1 className="titleRegister">Datos de registro</h1> 
                <form className="formRegister">
                    <div className="itemRegister">
                        <h2 className="textRegister">Nombre</h2>
                        <input className="inputRegister" type="text"/>    
                    </div> 
                    <div className="itemRegister">
                        <h2 className="textRegister">Apellido</h2>
                        <input className="inputRegister" type="text"/>    
                    </div> 
                    <div className="itemRegister">
                        <h2 className="textRegister">Email</h2>
                        <input className="inputRegister" type="email"/>    
                    </div> 
                    <div className="itemRegister">
                        <h2 className="textRegister">Genero</h2>
                        <div className="contGenero">
                            <label htmlFor="men" className="genero ">
                                <input className="radio" type="radio" name="genero"  value="men" id="men"/>
                                <h2 className="textGenero">MASCULINO</h2>
                            </label>
                            <label htmlFor="women" className="genero">
                                <input className="radioGenero" type="radio" name="genero"  value="women" id="women"/>
                                <h2 className="textGenero">FEMENINO</h2>
                            </label>
                        </div>
                    </div>    
                </form> 
                <div className="contBtnRegister">
                <button className="btnRegister">Editar</button>
                </div>
           </div>
           <div className="contDatesLogin">
                <h1 className="titleLogin">Datos de inicio de sesion</h1>  
                <form className="formLogin">
                    <div className="itemLogin">
                        <h2 className="textLogin">Nombre De Usuario</h2>
                        <input className="inputLogin" type="text"/>    
                    </div> 
                    <div className="itemLogin">
                        <h2 className="textLogin">Contraseña</h2>
                        <input className="inputLogin" type="text"/>    
                    </div> 
                    <div className="itemLogin">
                        <h2 className="textLogin">Confirmar Contraseña</h2>
                        <input className="inputLogin" type="text"/>    
                    </div> 
                    <div className="sectionAvatar ">
                            <span className="material-icons arrow" onClick={()=> backAvatar()}>west</span>          
                            <LoadingWhite className="loading"/>
                            <span className="material-icons arrow" onClick={()=> nextAvatar() }>east</span>
                        </div>
                </form>
                <div className="contBtnLogin">
                <button className="btnLogin">Actualizar</button>
                </div>
           </div>
       </div>
    )
}