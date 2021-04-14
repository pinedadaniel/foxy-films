import "./index.scss";
export default function EditUserComponent(props) {
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
                </form>
                <div className="contBtnLogin">
                <button className="btnLogin">Actualizar</button>
                </div>
           </div>
       </div>
    )
}