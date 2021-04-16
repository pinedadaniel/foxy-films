import "./index.scss";
import React from 'react';
import Alert from '../../custom/Alert/index';
import {useState} from 'react';
import MisMovies from '../myMovie/index';


export default function EditMovieComponent(props) {
    
    const API = 'http://localhost:5000';
    const resource = '/editMovies';
    const [showAlert, setShowAlert] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);


    const [file, setFile] = useState(false);
    const [alert, setAlert] = useState({
        type: false,
        message: '',
    });
    const propsAlert = {
        open: showAlert,
        type: alert.type,
        message: alert.message,
        close: closeAlert
    }
    const [open, setOpen] = useState(false);
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

     const [editMovie, setEditMovie] = useState({
        titulo: '',
        lenguaje:"",
        pais:"",
        duracion:"",
        popularidad:"",
        ingresos:"",
        tipo:false,
        avatar:"",
        descripcion:""
     })

     function handleFiles(e) {
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        setFile(imageUrl);
    }
     function closeAlert() {
        setShowAlert(false)
    }
    function handleOpen() {
        if (!open) {
            setOpen(true);
            return
        }else{
            setOpen(false);
            return
        }
    }
    function handlePopularity(e) {

        if (e === 'alta') {
            setTextContet('Alta')
        }else if (e === 'media') {
            setTextContet('Media')
        }else if (e === 'baja') {
        setTextContet('Baja')
        }
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

     function handleEditMovie(e){
        setEditMovie({...editMovie,
            [e.target.name]: e.target.name})
            console.log(editMovie)
     }



    function handleEdit() {
        if (!editMovie.titulo) {
            setAlert({
                type: false,
                message:'El titulo es requerido'
            })
            setShowAlert(true)
            
        }
            setShowModalEdit(false)

}





    return(
        <React.Fragment>

            {
                showModalEdit
                ?<MisMovies><div className='w-100 pdd-top-30 pdd-left-30 pdd-bot-30 pdd-right-30  bg-blue p-absolute'></div></MisMovies>
                : <div className="contRegisterMovieMain d-flex   bg-white">
                <div className="contLeft  ">
                    <form  className='formRregistermovieScroll'>
                        <label htmlFor="titulo" className='cursor-p w-100'>
                            <h1 className=" font-14 color-white mg-bot-10">TITULO</h1>
                            <input onChange={(e)=> handleEditMovie(e)} autoComplete='off' className="w-100 inputRegistermovie" type="text" name="titulo" id="titulo"/>
                        </label>
                        
                        <label htmlFor="lenguaje" className='cursor-p'>
                            <h1 className=" font-14 color-white mg-bot-10">LENGUAJE</h1>
                            <input onChange={(e)=> handleEditMovie(e)}  autoComplete='off' className="w-100 inputRegistermovie" type="text" name="lenguaje" id="lenguaje"/>
                        </label>
                        
                        <label htmlFor="pais" className='cursor-p'>
                            <h1 className=" font-14 color-white mg-bot-10">PAIS</h1>
                            <input onChange={(e)=> handleEditMovie(e)} autoComplete='off' className="w-100 inputRegistermovie" type="text" name="pais" id="pais"/>
                        </label>
                        
                        <label htmlFor="duracion" className='cursor-p'>
                            <h1 className=" font-14 color-white mg-bot-10">DURACION</h1>
                            <input onChange={(e)=> handleEditMovie(e)} autoComplete='off' className="w-33 inputRegistermovie" type="number" name="duration" placeholder='hr' id="duracion"/>
                            <input onChange={(e)=> handleEditMovie(e)} autoComplete='off' className="w-33 inputRegistermovie" type="number" name="duration" placeholder='m' id="duracion"/>
                            <input onChange={(e)=> handleEditMovie(e)} autoComplete='off' className="w-33 inputRegistermovie" type="number" name="duration" placeholder='s' id="duracion"/>
                        </label>
     
                        <label htmlFor="popularidad" className='cursor-p mg-bot-10'>
                            <h1 className=" font-14 color-white mg-bot-10">POPULARIDAD</h1>
                            <div htmlFor="" onClick={()=> handleOpen()} className='w-100 selectPopularity'>{textContet ? textContet : 'Seleccione popularidad'}</div>
                            <div className={`d-flex-column contSelect ${open ? 'd-flex' : 'd-none'} `}> 
                                <label className="cursor-p labelSelect bg-white" htmlFor="" onClick={()=> handlePopularity('alta')}>Alta</label>
                                <label className="cursor-p  labelSelect" htmlFor="" onClick={()=> handlePopularity('media')}>Media</label>
     
                                <label className="cursor-p labelSelect" htmlFor="" onClick={()=> handlePopularity('baja')}>Baja</label>
     
     
                            </div>
                        </label>
                        
                        <label htmlFor="ingresos" className='cursor-p'>
                            <h1 className=" font-14 color-white mg-bot-10">INGRESOS</h1>
                            <input onChange={(e)=> handleEditMovie(e)} autoComplete='off' placeholder="$"  className="w-100 inputNumber" type="number" name="ingresos" id="ingresos"/>
                        </label>
                        
                        <h1 className=" font-14 color-white mg-bot-10">TIPO</h1>
                        <div htmlFor="tipo" className="d-flex alint-items-center ">
                            
                             <label htmlFor="pelicula" className="cursor-p d-flex aling-items-center mg-right-10">
                                 
                                 <h1  className=" font-14 color-white mg-right-10 u-regular">PELICULA: </h1>
                                 <input onChange={(e)=> handleEditMovie(e)} type="radio" value="pelicula" name="tipo" id="pelicula" className="radioRegisterMovie"/>
                             </label>
                             <label htmlFor="serie" className="cursor-p d-flex aling-items-center">
                                 
                                 <h1  className=" font-14 color-white u-regular mg-right-10 ">SERIE: </h1>
                                 <input onChange={(e)=> handleEditMovie(e)}  type="radio" value="serie" name="tipo" id="serie"  className="radioRegisterMovie "/>
     
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
                                     <input onChange={(e)=>handleGenerosMovie(e)} type="checkbox" name="mas18" id="mas18"  className='cursor-p '/>
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
                             <textarea onChange={(e)=> handleEditMovie(e)}  className='description pdd-top-10 pdd-left-10 pdd-right-10 pdd-bot-10'  name="descripcion" id="description" cols="40" rows="4"></textarea>
                         </label>
     
                         <input type="button" onClick={()=> handleEdit()} className="editRegister font-12 mg-top-20" value="aditar pelicula" name="editRegister" id="editRegister"/>
                         
     
                    </form>
                </div>
            </div>
            }
          
       {
            showAlert
            ? <Alert {...propsAlert}/>  
            : ''
        }
       </React.Fragment>
    )
}