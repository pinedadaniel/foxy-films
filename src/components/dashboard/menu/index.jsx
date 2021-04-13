import "./index.scss";
import imgPerfil from "../../../img/imgPerfil.jpg"

import {useEffect, useState} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';

export default function DashboardMenu(props) {


    const history = useHistory();
    const API = 'http://localhost:5000';
    const resource = '/users';
    const [model, setModel] = useState({
        avatar: "",
        email: "",
        gender: "",
        id: null,
        lastName: "",
        name: "",
        password: "",
        user: "",
    });

    const logout = () => {
      localStorage.removeItem('userId');
        history.push('/');
    };

    useEffect(() => {
        async function getUser() {
            const id = localStorage.getItem('userId');
            const response = await axios.get(`${API}${resource}/${id}`);
            if(response.status === 200 && response.data){
                setModel(response.data);
            }
        }
        getUser();
    }, [])

    return(
       <div className="containerMenu bg-white">
           <div className="contPerfil">
               <div className='card_info'>
                <img src={model.avatar} className="imgPerfil" alt=""/>
                <div className="row_info">
                    <h1 className="userName">
                        {model.name}
                    </h1>
                    <span className="user">
                        <sub>@</sub>{model.user}
                    </span>
                </div>
               </div>
            
           </div>
           <div className="contBtn">
               <button className={`btn ${props.tab === 'bankMovie' ? 'active' : ''}`}>Banco De Peliculas</button>
               <button className={`btn ${props.tab === 'registerMovie' ? 'active' : ''}`}>Registrar Pelicula</button>
               <button className={`btn ${props.tab === 'myMovie' ? 'active' : ''}`}>Mis Peliculas</button>
               <button className={`btn ${props.tab === 'perfil' ? 'active' : ''}`}>Perfil</button>
           </div>
           <div className="contBtnCerrarSesion">
               <button className="btn logout" onClick={() => logout()}>Cerrar Sesion</button>
           </div>
       </div>
    )
}
