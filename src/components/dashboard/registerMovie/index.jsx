import "./index.scss";
import axios from "axios";
import React, { useState} from 'react';
import Alert from '../../custom/Alert/index';
import {getBase64} from '../../../utils/convertBase64/index';
export default function RegisterMovieComponent(props) {
    const API = 'http://localhost:5000';
    const resource = '/movies';
    const [textContet, setTextContet] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [file, setFile] = useState(false);
    const [src, setSrc] = useState(false);
    const [alert, setAlert] = useState({
        type: false,
        message: '',
    });
   const [time, setTime] = useState({
       horas: "",
       minutos: "",
       segundos: ""
   });
    function handleFiles(e) {
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        setFile(imageUrl);
        setSrc(e.target.files[0]);
    }

    const propsAlert = {
        open: showAlert,
        type: alert.type,
        message: alert.message,
        close: closeAlert
    }
    
    function closeAlert() {
        setShowAlert(false)
    }
    const [categories, setCategories] = useState([]);
    const [categorias, setCategorias] = useState({
        accion:false,
        animadas:false,
        aventura:false,
        cienciaFiccion:false,
        comedia:false,
        crimen:false,
        documentales:false,
        drama:false,
        fantasia:false,
        romance:false,
        suspenso:false,
        terror:false,
        mas18:false
     });
    const [datosMovie, setDatosMovie] = useState({
     titulo:"",
     lenguaje:"",
     pais:"",
     duracion:"",
     popularidad: "",
     ingresos:"",
     tipo:false,
     avatar:"",
     descripcion:""
    })

  
    function handleDatosMovie(evento) {
        setDatosMovie({
            ...datosMovie,
            [evento.target.name]:evento.target.value
        })
    }
   
    function handleGenerosMovie(check) {
       setCategorias({
           ...categorias,
            [check.target.name]: check.target.checked 
       });
       if(check.target.checked) {
           setCategories([...categories,  check.target.name]);
       }
    }
    function handleRegister() {
        if (!datosMovie.titulo) {
            setAlert({
                type: false,
                message:'el titulo es requerido'
            }
            )
            setShowAlert(true)
            return 
        }
        
        if (!datosMovie.lenguaje) {

            setAlert({
                type: false,
                message:'el lenguaje es requerido'
            }
            )            
            setShowAlert(true)
            return
            
        }
        
        if (!datosMovie.pais) {
           
            setAlert({
                type: false,
                message:'el pais es requerido'
            }
            )
            setShowAlert(true)
            return
            
        }
        
        const finalTime = `${time.horas}:${time.minutos}:${time.segundos}`;
        
        if (finalTime.length <= 4) {
            setAlert({
                type: false,
                message:'la duracion es requerida'
            }
            )
            setShowAlert(true)
            return
        } else {
            setDatosMovie({
                ...datosMovie,
                ['duracion']: finalTime
            })
            console.log(datosMovie.duracion)
            console.log(finalTime);
        }
        
        if (!datosMovie.popularidad) {
            setAlert({
                type: false,
                message:'la popularidad es requerida'
            }
            )
            setShowAlert(true)
            return
            
        }
        console.log(datosMovie.duracion);
        if (!datosMovie.ingresos) {
            
            setAlert({
                type: false,
                message:'los ingresos son requeridos'
            }
            )
            setShowAlert(true)
            return
            
        }
        if (!datosMovie.tipo) {
            
            setAlert({
                type: false,
                message:'el tipo es requerido'
            }
            )
            setShowAlert(true)
            return
            
        }

        if (categories.length < 1) {
            setAlert({
                type: false,
                message:'debes seleccionar almenos 1 categoria'
            }
            )
            setShowAlert(true)
            return
            
        }
        if (!file) {
            setAlert({
                type: false,
                message:'debes subir la imagen de la pelicula'
            }
            )
            setShowAlert(true)
            return
            
        }
        if (!datosMovie.descripcion) {
            
            setAlert({
                type: false,
                message:'la descripcion es requerida'
            }
            )
            setShowAlert(true)
            return
            
        }
        console.log(datosMovie.duracion);
        setShowAlert(false);
        submitMovie(datosMovie);

    }
    function clearRegister() {
        setCategorias({
            accion:false,
            animadas:false,
            aventura:false,
            cienciaFiccion:false,
            comedia:false,
            crimen:false,
            documentales:false,
            drama:false,
            fantasia:false,
            romance:false,
            suspenso:false,
            terror:false,
            mas18:false
         });
        setDatosMovie({
            titulo:"",
            lenguaje:"",
            pais:"",
            duracion:"",
            popularidad:"",
            ingresos:"",
            tipo:false,
            avatar:"",
            descripcion:""
           })
           setTextContet("");
           setTime({
            horas: "",
            minutos: "",
            segundos: ""
        });
           setFile(false);
           setSrc(false)
           categories.forEach(categorie => {
            document.getElementById(categorie).checked = false;
           });
           document.getElementById("pelicula").checked = false;
           document.getElementById("serie").checked = false;
    }
    async function submitMovie(data) {
            getBase64(src, async(src) => {
                const request = {
                    ...data,
                    ['avatar']: src,
                    ['likes']: 0,
                    ['views']: 0,
                    ['creator']: localStorage.getItem('userId'),
                    ["categorias"]:{
                        ...categories
                    }
                }
                const response = await axios.post(API+resource, request);
                if(response.status === 201 && response.data){
                    setAlert({
                        type: true,
                        message:`La ${datosMovie.tipo} se registro exitosamente!`
                    });
                    setShowAlert(true);
                    clearRegister();
                } else {
                    setAlert({
                        type: false,
                        message:`no se pudo registrar su ${datosMovie.tipo}, intentelo mas tarde`
                    });
    
                    setShowAlert(true);
                    
                }
            })
        }
    
    const [open, setOpen] = useState(false);
    function handleOpen() {
        if (!open) {
            setOpen(true);
            return
        }else{
            setOpen(false);
            return
        }
        
    }

    function handlePopularity(popularity) {
        setTextContet(popularity)
        handleOpen();

        setDatosMovie({
            ...datosMovie,
            ['popularidad']: popularity
        });
        
    }
    return(
       <React.Fragment>
           <div className="contRegisterMovieMain d-flex   bg-white">
           <div className="contLeft  ">
               <form  className='formRregistermovieScroll'>
                   <label htmlFor="titulo" className='cursor-p w-100'>
                       <h1 className=" font-14 color-white mg-bot-10">TITULO</h1>
                       <input onChange={(e)=>handleDatosMovie(e)} value={datosMovie.titulo} autoComplete='off' className="w-100 inputRegistermovie" type="text" name="titulo" id="titulo"/>
                   </label>
                   
                   <label htmlFor="lenguaje" className='cursor-p'>
                       <h1 className=" font-14 color-white mg-bot-10">LENGUAJE</h1>
                       <input onChange={(e)=>handleDatosMovie(e)} value={datosMovie.lenguaje} autoComplete='off' className="w-100 inputRegistermovie" type="text" name="lenguaje" id="lenguaje"/>
                   </label>
                   
                   <label htmlFor="pais" className='cursor-p'>
                       <h1 className=" font-14 color-white mg-bot-10">PAIS</h1>
                       <input onChange={(e)=>handleDatosMovie(e)} value={datosMovie.pais} autoComplete='off' className="w-100 inputRegistermovie" type="text" name="pais" id="pais"/>
                   </label>
                   
                   <label htmlFor="duracion" className='cursor-p'>
                       <h1 className=" font-14 color-white mg-bot-10">DURACION</h1>
                       <input value={time.horas} onChange={(e)=>setTime({...time, [e.target.name]: e.target.value})} autoComplete='off' className="w-33 inputRegistermovie" type="number" name="horas" placeholder='Horas' />
                       <input value={time.minutos} onChange={(e)=>setTime({...time, [e.target.name]: e.target.value})} autoComplete='off' className="w-33 inputRegistermovie" type="number" name="minutos" placeholder='Minutos' />
                       <input value={time.segundos} onChange={(e)=>setTime({...time, [e.target.name]: e.target.value})} autoComplete='off' className="w-33 inputRegistermovie" type="number" name="segundos" placeholder='Segundos'/>
                   </label>

                   <label htmlFor="popularidad" className='cursor-p mg-bot-10'>
                       <h1 className=" font-14 color-white mg-bot-10">POPULARIDAD</h1>
                       <div htmlFor="" onClick={()=> handleOpen()} className='w-100 cursor-p selectPopularity'>{textContet ? textContet : 'Seleccione popularidad'}</div>
                       <div className={`d-flex-column contSelect ${open ? 'd-flex' : 'd-none'} `}> 
                           <label className="cursor-p labelSelect bg-white" htmlFor="" onClick={()=> handlePopularity('alta')}>Alta</label>
                           <label className="cursor-p  labelSelect" htmlFor="" onClick={()=> handlePopularity('media')}>Media</label>

                           <label className="cursor-p labelSelect" htmlFor="" onClick={()=> handlePopularity('baja')}>Baja</label>


                       </div>
                   </label>
                   
                   <label htmlFor="ingresos" className='cursor-p'>
                       <h1 className=" font-14 color-white mg-bot-10">INGRESOS</h1>
                       <input onChange={(e)=>handleDatosMovie(e)} value={datosMovie.ingresos} autoComplete='off' placeholder="$"  className="w-100 inputNumber" type="number" name="ingresos" id="ingresos"/>
                   </label>
                   
                   <h1 className=" font-14 color-white mg-bot-10">TIPO</h1>
                   <div htmlFor="tipo" className="d-flex alint-items-center ">
                       
                        <label htmlFor="pelicula" className="cursor-p d-flex aling-items-center mg-right-10">
                            
                            <h1  className=" font-14 color-white mg-right-10 u-regular">PELICULA: </h1>
                            <input onChange={(e)=>handleDatosMovie(e)} type="radio" value="pelicula" name="tipo" id="pelicula" className="radioRegisterMovie"/>
                        </label>
                        <label htmlFor="serie" className="cursor-p d-flex aling-items-center">
                            
                            <h1  className=" font-14 color-white u-regular mg-right-10 ">SERIE: </h1>
                            <input onChange={(e)=>handleDatosMovie(e)} type="radio" value="serie" name="tipo" id="serie"  className="radioRegisterMovie "/>

                        </label>
                   </div>
                   
               </form>
           </div>
           <div className="conRight">
               <form className="d-flex-column aling-items-center formRregistermovieScroll " >
                   <div className='d-flex mg-bot-30'>
                       
                   <h1 className=" font-14 color-white mg-bot-10 w-100">GENEROS</h1>
                        <div className="d-flex-column section1 " >
                            <label htmlFor="accion" className="cursor-p d-flex aling-items-center ">
                                <input  onChange={(e)=>handleGenerosMovie(e)}  type="checkbox" name="accion" id="accion"  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Accion</h2>
                            </label>
                            <label htmlFor="comedia" className="d-flex cursor-p aling-items-center ">
                                <input onChange={(e)=>handleGenerosMovie(e)} type="checkbox" name="comedia" id='comedia'  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Comedia</h2>
                            </label>
                            
                            <label htmlFor='terror' className="d-flex cursor-p  aling-items-center ">
                                <input onChange={(e)=>handleGenerosMovie(e)} type="checkbox" name='terror' id='terror'  className='cursor-p '/>
                                <h2 className=" font-14 color-white  mg-right-10 u-regular">Terror</h2>
                            </label>
                            
                            <label htmlFor='aventura' className="d-flex cursor-p  aling-items-center ">
                                <input onChange={(e)=>handleGenerosMovie(e)} type="checkbox" name='aventura' id='aventura'  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Aventura</h2>
                            </label>
                            
                            
                            
                        </div>
                        <div className="d-flex-column section2   ">

                            
                            <label htmlFor='animadas' className="d-flex cursor-p  aling-items-center ">
                                <input onChange={(e)=>handleGenerosMovie(e)} type="checkbox"  name='animadas' id='animadas'  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Animadas</h2>
                            </label>
                                
                            <label htmlFor='cienciaFiccion' className="d-flex cursor-p  aling-items-center ">
                                <input onChange={(e)=>handleGenerosMovie(e)} type="checkbox"  name='cienciaFiccion' id='cienciaFiccion'  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Ciencia Ficcion</h2>
                            </label>
                                
                            <label htmlFor='drama' className="d-flex cursor-p  aling-items-center ">
                                <input onChange={(e)=>handleGenerosMovie(e)} type="checkbox"  name='drama' id='drama'  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Drama</h2>
                            </label>
                                
                            
                            
                        </div>
                        <div className='d-flex-column section3'>
                            <label htmlFor='crimen' className="d-flex cursor-p  aling-items-center">
                                <input onChange={(e)=>handleGenerosMovie(e)} type="checkbox" name='crimen' id='crimen'  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Crimen</h2>
                            </label>
                                    
                            <label htmlFor='suspenso' className="d-flex cursor-p  aling-items-center ">
                                <input onChange={(e)=>handleGenerosMovie(e)} type="checkbox" name='suspenso' id='suspenso'  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Suspenso</h2>
                            </label>
                            <label htmlFor="documentales" className="d-flex cursor-p  aling-items-center ">
                                <input onChange={(e)=>handleGenerosMovie(e)} type="checkbox" name="documentales" id="documentales"  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Documentales</h2>
                            </label>           
                            
                        </div>
                        <div className='d-flex-column section4'>
                            <label htmlFor="romance" className="d-flex cursor-p  aling-items-center ">
                                <input onChange={(e)=>handleGenerosMovie(e)} type="checkbox" name="romance" id="romance"  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Romance</h2>
                            </label>                
                            <label htmlFor="+18" className="d-flex cursor-p  aling-items-cente">
                                <input onChange={(e)=>handleGenerosMovie(e)} type="checkbox" name="+18" id="+18"  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular"> +18</h2>
                            </label>
                            <label htmlFor='fantasia' className="d-flex cursor-p  aling-items-center ">
                                <input onChange={(e)=>handleGenerosMovie(e)} type="checkbox"  name='fantasia' id='fantasia' className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Fantasia</h2>
                            </label >
                            

                        </div>

                   </div>
                   
                  
                  
                    <div className="d-flex aling-items-center justify-center mg-bot-10">
                        {
                            file && (
                                <img src={file} className="img" alt="Imagen de muestra" width='140px' height='150px'/>
                            )
                        }
                               
                    </div>
                    <div className="d-flex w-100 aling-items-center justify-center mg-top-10">
                        <label htmlFor="imagen" className='bton font-14 color-white u-bold'> Subir Imagen
                            <input type="file" onChange={(e) => handleFiles(e)} name="imagen" id="imagen" className='file'/>
                        </label>
                    </div>
                    <label htmlFor="description" className="mg-top-20 w-100  d-flex-column aling-items-center justify-center">
                        <h1 className="description font-14 color-white mg-bot-10">DESCRIPCION</h1>
                        <textarea onChange={(e)=>handleDatosMovie(e)} value={datosMovie.descripcion} className='description'  name="descripcion" id="description" cols="40" rows="4"></textarea>
                    </label>

                    <input onClick={() => handleRegister()} type="button" className="submitRegister font-12 mg-top-20" value="Registrar Pelicula" name="submit" id="submitRegister"/>
                    

               </form>
           </div>
       </div>
       {
            showAlert
            ? <Alert {...propsAlert}/>  
            : ''
        }
       </React.Fragment>
    )
}