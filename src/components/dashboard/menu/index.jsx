import "./index.scss";
import imgPerfil from "../../../img/imgPerfil.jpg"
import {Link} from "react-router-dom";
export default function DashboardMenu(props) {
    console.log(props);
    return(
       <div className="containerMenu bg-white">
           <div className="contPerfil">
               <div className='card_info'>
                <img src={imgPerfil} className="imgPerfil" alt=""/>
                <div className="row_info">
                    <h1 className="userName">
                        pedro
                    </h1>
                    <span className="user">
                        <sub>@</sub>gOlondrina
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
               <button className="btn logout">Cerrar Sesion</button>
           </div>
       </div>
    )
}