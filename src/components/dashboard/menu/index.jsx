import "./index.scss";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';
import Bank from "../../../icons/bank.svg"
import LongOut from "../../../icons/long_out.svg"
import MyMovie from "../../../icons/my_movie.svg"
import Register from "../../../icons/register.svg"
import Edit from "../../../icons/edit.svg"
import EditUser from "../../../icons/edit_user.svg"
import Alert from "../../custom/Alert/index.jsx";
export default function DashboardMenu(props) {

    const [switchAlert, setSwitchAlert] = useState(false);
    const [alert, setAlert] = useState({
        type: false,
        message: '',
    });
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

    const goToEditUser = () => {
        history.push('/dashboard/editUser');
    }
    const closeAlert = () =>{
        setSwitchAlert(false)
    }
 
    const propsAlert = {
        open: switchAlert,
        type: alert.type,
        message: alert.message,
        close: closeAlert
    }


    
    const logout = () => {
      localStorage.removeItem('userId');
      history.push('/');
    };

    useEffect(() => {
        async function getUser() {
            try {
            const id = localStorage.getItem('userId');
            const response = await axios.get(`${API}${resource}/${id}`);
            if(response.status === 200 && response.data){
                setModel(response.data);
            }
            } catch (error) {
                setAlert({
                    type: false,
                    message: 'Usuario no encontrado'
                });
                setSwitchAlert(true);
                setTimeout(() => {
                    history.push('/');
                }, 3000);
            }
            
        } 
        getUser();
    }, [])

    return(
        <React.Fragment>
        <Alert {...propsAlert} />
       <div className="containerMenu bg-white">
           <div className="contPerfil">
               <div  className='card_info'>
               <img onClick={()=> goToEditUser()} className="edit" src={EditUser} alt=""/>
                <img  src={model.avatar} className="imgPerfil" alt=""/>
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
               <Link to="/dashboard/bankMovie" className={`btn ${props.tab === 'bankMovie' ? 'active' : ''}`}> <img className={`iconBtn ${props.tab === 'bankMovie' ? 'iconBtnactive' : ''}`} src={Bank} alt=""/> Banco De Peliculas</Link>
               <Link to="/dashboard/registerMovie" className={`btn ${props.tab === 'registerMovie' ? 'active' : ''}`}> <img className={`iconBtn ${props.tab === 'registerMovie' ? 'iconBtnactive' : ''}`} src={Register } alt=""/> Registrar Pelicula</Link>
               <Link to="/dashboard/myMovie" className={`btn ${props.tab === 'myMovie' ? 'active' : ''}`}> <img className={`iconBtn ${props.tab === 'myMovie' ? 'iconBtnactive' : ''}`} src={MyMovie} alt=""/> Mis Peliculas</Link>
               <Link to="/dashboard/editMovie" className={`btn ${props.tab === 'editMovie' ? 'active' : ''}`}> <img className={`iconBtn ${props.tab === 'editMovie' ? 'iconBtnactive' : ''}`}  src={Edit} alt=""/> Editar Pelicula</Link>
           </div>
           <div className="contBtnCerrarSesion">
               <button className="btn logout" onClick={() => logout()}> <img src={LongOut} alt=""/> Cerrar Sesion</button>
           </div>
       </div>
       </React.Fragment>
    )
}
