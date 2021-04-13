import "./index.scss";
import {Link} from "react-router-dom";
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
               <Link to="/dashboard/bankMovie" className={`btn ${props.tab === 'bankMovie' ? 'active' : ''}`}>Banco De Peliculas</Link>
               <Link to="/dashboard/registerMovie" className={`btn ${props.tab === 'registerMovie' ? 'active' : ''}`}>Registrar Pelicula</Link>
               <Link to="/dashboard/myMovie" className={`btn ${props.tab === 'myMovie' ? 'active' : ''}`}>Mis Peliculas</Link>
               <Link to="/dashboard/profile" className={`btn ${props.tab === 'profile' ? 'active' : ''}`}>Perfil</Link>
           </div>
           <div className="contBtnCerrarSesion">
               <button className="btn logout" onClick={() => logout()}>Cerrar Sesion</button>
           </div>
       </div>
    )
}
