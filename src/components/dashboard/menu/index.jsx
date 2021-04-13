import "./index.scss";
import imgPerfil from "../../../img/imgPerfil.jpg"
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
               <button className={`btn ${props.tab === 'bankMovie' ? 'active' : ''}`}>Banco De Peliculas</button>
               <button className={`btn ${props.tab === 'registerMovie' ? 'active' : ''}`}>Registrar Pelicula</button>
               <button className={`btn ${props.tab === 'myMovie' ? 'active' : ''}`}>Mis Peliculas</button>
               <button className={`btn ${props.tab === 'perfil' ? 'active' : ''}`}>Perfil</button>
           </div>
           <div className="contBtnCerrarSesion">
               <button className="btn logout">Cerrar Sesion</button>
           </div>
       </div>
    )
}