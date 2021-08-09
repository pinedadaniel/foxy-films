import "./index.scss";
import React from 'react';
import Alert from '../../custom/Alert/index';
import {useState, useEffect }from 'react';
import axios from 'axios';



export default function EditMovieComponent(props) {
    
    const API = 'http://localhost:5000';
    const resource = '/movies';
    
    const [alert, setAlert] = useState({
        type: false,
        message: '',
    });
    const [idMovie, setIdMovie] = useState('');
    
    const [showAlert, setShowAlert] = useState(false);
    const [showEditMovie, setShowEditMovie] = useState(false);
    const [movieEdit, setMovieEdit] = useState({});
    const [info, setInfo] = useState({
       
     titulo:"",
     lenguaje:"",
     pais:"",
     duracion:"",
     popularidad: "",
     ingresos:"",
     descripcion:"",
    })
    
    const propsAlert = {
        open: showAlert,
        type: alert.type,
        message: alert.message,
        close: closeAlert
    }
    


    const [id, setId] = useState('');
    const [movies, setMovies] = useState([]);

    const [textContet, setTextContet] = useState('');
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
     
   const [time, setTime] = useState({
      horas: "",
      minutos: "",
      segundos: ""
  });
    function handleClikMovie(movie, index) {
        setShowEditMovie(true)
        setIdMovie(index);
        console.log(movie);
        setMovieEdit(movie);
        
        
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


   function closeAlert() {
    setShowAlert(false)
}



   function handleDatosMovie(evento) {
      setMovieEdit({
          ...movieEdit,
          [evento.target.name]:evento.target.value

      })
      console.log(movieEdit)
  }
    const getMovieEdit = async () => {
      const data = await axios.get(`${API}${resource}`);
      if (data.status === 200 && data.data) {
         console.log(data.data)
          setInfo(data.data);
      }else{
          alert('no se encontro ninguna pelicula');
      }
     
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
        const infoPopularity = {
            ...info,
            popularidad: popularity
        }
      setInfo(infoPopularity);
      
  }
  
  useEffect(() => {
   async function getMovies() {
       try {
           const userId = localStorage.getItem('userId');
       const response = await axios.get(`${API}${resource}`);
       if(response.status === 200 && response.data){
            console.log(response.data)   
        setId(userId);
           setMovies(response.data);

           
       }
       } catch (error) {
           console.log(error)
       }
   } 
   getMovies();
}, [])



  useEffect(()=>{
    if (movieEdit.popularidad === 'alta') {
        setTextContet('Alta')
    }else if (movieEdit.popularidad === 'media') {
        setTextContet('Media')
    }else if(movieEdit.popularidad === 'baja'){
        setTextContet('Baja')
    }
  getMovieEdit();

  },[]
  ) 


  useEffect(()=>{
      
    if (movieEdit.tipo === 'pelicula') {
        document.getElementById('pelicula').checked = true;
        console.log(movieEdit);

    }else if (movieEdit.tipo === 'serie') {
        document.getElementById('serie').checked = true;
        console.log(movieEdit);

    
    }
    if (showEditMovie) {
        console.log('entro al iff')
        movieEdit.categorias.forEach(categoria => {
            document.getElementById(`${categoria}`).checked = true;
      
        }); 
           
    }
   

  }, [showEditMovie])


  function EditMovie() {
      
    if (!movieEdit.titulo) {
        setAlert({
            type: false,
            message:'el titulo es requerido'
        }
        )
        setShowAlert(true)
        return 
    }
    
    if (!movieEdit.lenguaje) {

        setAlert({
            type: false,
            message:'el lenguaje es requerido'
        }
        )            
        setShowAlert(true)
        return
        
    }
    
    if (!movieEdit.pais) {
       
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
        const dataTime = {
            ...movieEdit,
            duracion: finalTime
        } 
        setMovieEdit(dataTime)
    }
    
    if (!movieEdit.popularidad) {
        setAlert({
            type: false,
            message:'la popularidad es requerida'
        }
        )
        setShowAlert(true)
        return
        
    }
    if (!movieEdit.ingresos) {
        
        setAlert({
            type: false,
            message:'los ingresos son requeridos'
        }
        )
        setShowAlert(true)
        return
        
    }
    if (!movieEdit.tipo) {
        
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
    if (!movieEdit.descripcion) {
        
        setAlert({
            type: false,
            message:'la descripcion es requerida'
        }
        )
        setShowAlert(true)
        return
        
    }
    console.log(movieEdit);
    setShowAlert(false);
    submitMovie(movieEdit);




      
  }


  
  async function submitMovie(movieEdit) {
    try {
        const response = await axios.put(`${API}${resource}/${idMovie}`, movieEdit);
        
    } catch (error) {
        
    }
}









    return(
        <React.Fragment>
           <div className="contRegisterMovieMain d-flex   bg-white">
                {
                    !showEditMovie
                    ?
                    
                    <div className="contBlue bg-blue pdd-top-20 pdd-left-20 pdd-right-20 pdd-bot-20 d-flex-column w-100">
                        <div className="scroll  d-flex-column w-100">   
                            <div className="card-cont-Movie mg-bot-20  pdd-left-10 bg-white w-100">
                                    <div className="cardEditMovie">
                                    <h1 className="titleEditMovie">TITULO</h1>
                                    </div>
                                    
                                    <div  className="cardEditMovie">
                                    <h1 className="titleEditMovie">LENGUAJE</h1>
                                    </div>
                                    
                                    <div className="cardEditMovie">
                                    <h1 className="titleEditMovie">PAIS</h1>
                                    </div>
                                    
                                    <div  className="cardEditMovie">
                                    <h1 className="titleEditMovie">DURACION</h1>
                                    </div>
                                    
                                    <div  className="cardEditMovie">
                                    <h1 className="titleEditMovie">POPULARIDAD</h1>
                                    </div>
                                    
                                    <div  className="cardEditMovie">
                                    <h1 className="titleEditMovie">INGRESOS</h1>
                                    </div>
                                    
                                    
                                    <div className="cardEditMovie">
                                    <h1 className="titleEditMovie">DESCRIPCION</h1>
                                    </div>
                                    
                                    <div className="cardEditMovie">
                                    <h1 className="titleEditMovie">ME GUSTA</h1>
                                    </div>
                                    
                                    <div className="cardEditMovie border-none">
                                    <h1 className="titleEditMovie">VISITAS</h1>
                                    </div>
                                    
                            </div>
                       
                   {
                       
                       movies.map((movie,index) =>
                       movie.creator === id?
                            <div onClick={()=> handleClikMovie(movie, index)} key={index} className="card-cont-Movie cursor-p mg-bot-20  pdd-left-10 bg-white w-100">
                                <div  className="cardEditMovie">
                                   <h1 className="nameMovie" title={movie.titulo}>{movie.titulo}</h1>
                                </div>
                                
                                <div  className="cardEditMovie">
                                   <h1 className="nameMovie" title={movie.lenguaje}>{movie.lenguaje}</h1>
                                </div>
                                
                                <div  className="cardEditMovie">
                                   <h1 className="nameMovie" title={movie.pais}>{movie.pais}</h1>
                                </div>
                                
                                <div  className="cardEditMovie">
                                   <h1 className="nameMovie" title={movie.duracion}>{movie.duracion}</h1>
                                </div>
                                
                                <div  className="cardEditMovie">
                                   <h1 className="nameMovie" title={movie.popularidad}>{movie.popularidad}</h1>
                                </div>
                                
                                <div  className="cardEditMovie">
                                   <h1 className="nameMovie" title={movie.ingresos}>{movie.ingresos}</h1>
                                </div>
                                
                                
                                <div  className="cardEditMovie">
                                   <h1 className="nameMovie" title={movie.descripcion}>{movie.descripcion}</h1>
                                </div>
                                
                                <div className="cardEditMovie">
                                   <h1 className="nameMovie" title={movie.likes}>{movie.likes}</h1>
                                </div>
                                
                                <div  className="cardEditMovie border-none">
                                   <h1 className="nameMovie" title={movie.views}>{movie.views}</h1>
                                </div>
                                
                           </div>
                           :""
                           )
                    }
                     </div> 
               </div>
               :   
            
                  
       <React.Fragment>
           
           <div className="contLeft  ">
               <form  className='formRregistermovieScroll'>
                   <label htmlFor="titulo" className='cursor-p w-100'>
                       <h1 className=" font-14 color-white mg-bot-10">TITULO</h1>
                       <input onChange={(e)=>handleDatosMovie(e)} value={movieEdit.titulo} autoComplete='off' className="w-100 inputRegistermovie" type="text" name="titulo" id="titulo"/>
                   </label>
                   
                   <label htmlFor="lenguaje" className='cursor-p'>
                       <h1 className=" font-14 color-white mg-bot-10">LENGUAJE</h1>
                       <input onChange={(e)=>handleDatosMovie(e)} value={movieEdit.lenguaje} autoComplete='off' className="w-100 inputRegistermovie" type="text" name="lenguaje" id="lenguaje"/>
                   </label>
                   
                   <label htmlFor="pais" className='cursor-p'>
                       <h1 className=" font-14 color-white mg-bot-10">PAIS</h1>
                       <input onChange={(e)=>handleDatosMovie(e)} value={movieEdit.pais} autoComplete='off' className="w-100 inputRegistermovie" type="text" name="pais" id="pais"/>
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
                       <input onChange={(e)=>handleDatosMovie(e)} value={movieEdit.ingresos} autoComplete='off' placeholder="$"  className="w-100 inputNumber" type="number" name="ingresos" id="ingresos"/>
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
                                <input onChange={(e)=>handleGenerosMovie(e)}   type="checkbox" name='suspenso' id='suspenso'  className='cursor-p '/>
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
                        
                            
                        <img className="img" src={movieEdit.avatar} alt="Imagen de muestra" width='140px' height='150px'/>
                            
                    </div>
                    <div className="d-flex w-100 aling-items-center justify-center mg-top-10">
                        <label htmlFor="imagen" className='bton font-14 color-white u-bold'> Subir Imagen
                            <input type="file"   name="imagen" id="imagen" className='file'/>
                        </label>
                    </div>
                    <label htmlFor="description" className="mg-top-20 w-100  d-flex-column aling-items-center justify-center">
                        <h1 className="description font-14 color-white mg-bot-10">DESCRIPCION</h1>
                        <textarea onChange={(e)=>handleDatosMovie(e)} value={movieEdit.descripcion} className='description  pdd-top-10 pdd-left-10 pdd-right-10 pdd-bot-10'  name="descripcion" id="description" cols="40" rows="4"></textarea>
                    </label>

                    <input type="button" onClick={()=> EditMovie()} className="submitRegister font-12 mg-top-20" value="Editar Pelicula" name="submit" id="submitEditmovie"/>
                    

               </form>
           </div>
       
       </React.Fragment>
               
                }
            </div>
            
       {
        showAlert
        ? <Alert {...propsAlert}/>  
        : ''
    }
       </React.Fragment>
    )
}