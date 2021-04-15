import { useState } from "react";
import "./index.scss";
export default function RegisterMovieComponent(props) {
    const [open, setOpen] = useState(false);
    const [textContet, setTextContet] = useState('');

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
    return(
       <div className="contRegisterMovieMain d-flex   bg-white">
           <div className="contLeft  ">
               <form  className='formRregistermovieScroll'>
                   <label htmlFor="titulo" className='cursor-p w-100'>
                       <h1 className=" font-14 color-white mg-bot-10">TITULO</h1>
                       <input autoComplete='off' className="w-100 inputRegistermovie" type="text" name="title" id="titulo"/>
                   </label>
                   
                   <label htmlFor="lenguaje" className='cursor-p'>
                       <h1 className=" font-14 color-white mg-bot-10">LENGUAJE</h1>
                       <input autoComplete='off' className="w-100 inputRegistermovie" type="text" name="language" id="lenguaje"/>
                   </label>
                   
                   <label htmlFor="pais" className='cursor-p'>
                       <h1 className=" font-14 color-white mg-bot-10">PAIS</h1>
                       <input autoComplete='off' className="w-100 inputRegistermovie" type="text" name="country" id="pais"/>
                   </label>
                   
                   <label htmlFor="duracion" className='cursor-p'>
                       <h1 className=" font-14 color-white mg-bot-10">DURACION</h1>
                       <input autoComplete='off' className="w-33 inputRegistermovie" type="number" name="duration" placeholder='HH' id="duracion"/>
                       <input autoComplete='off' className="w-33 inputRegistermovie" type="number" name="duration" placeholder='MM' id="duracion"/>
                       <input autoComplete='off' className="w-33 inputRegistermovie" type="number" name="duration" placeholder='SS' id="duracion"/>

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
                       <input autoComplete='off' placeholder="$"  className="w-100 inputNumber" type="number" name="income" id="ingresos"/>
                   </label>
                   
                   <h1 className=" font-14 color-white mg-bot-10">TIPO</h1>
                   <div htmlFor="tipo" className="d-flex alint-items-center ">
                       
                        <label htmlFor="pelicula" className="cursor-p d-flex aling-items-center mg-right-10">
                            
                            <h1  className=" font-14 color-white mg-right-10 u-regular">PELICULA: </h1>
                            <input type="radio" name="tipo" id="pelicula" className="radioRegisterMovie"/>
                        </label>
                        <label htmlFor="serie" className="cursor-p d-flex aling-items-center">
                            
                            <h1  className=" font-14 color-white u-regular mg-right-10 ">SERIE: </h1>
                            <input type="radio" name="tipo" id="serie"  className="radioRegisterMovie "/>

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
                                <input type="checkbox" name="accion" id="accion"  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Accion</h2>
                            </label>
                            <label htmlFor="comedia" className="d-flex cursor-p aling-items-center ">
                                <input type="checkbox" name="comedia" id='comedia'  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Comedia</h2>
                            </label>
                            
                            <label htmlFor='terror' className="d-flex cursor-p  aling-items-center ">
                                <input type="checkbox" name='terror' id='terror'  className='cursor-p '/>
                                <h2 className=" font-14 color-white  mg-right-10 u-regular">Terror</h2>
                            </label>
                            
                            <label htmlFor='aventura' className="d-flex cursor-p  aling-items-center ">
                                <input type="checkbox" name='aventura' id='aventura'  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Aventura</h2>
                            </label>
                            
                            
                            
                        </div>
                        <div className="d-flex-column section2   ">

                            
                            <label htmlFor='animadas' className="d-flex cursor-p  aling-items-center ">
                                <input type="checkbox"  name='animadas' id='animadas'  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Animadas</h2>
                            </label>
                                
                            <label htmlFor='cienciaFiccion' className="d-flex cursor-p  aling-items-center ">
                                <input type="checkbox"  name='cienciaFiccion' id='cienciaFiccion'  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Ciencia Ficcion</h2>
                            </label>
                                
                            <label htmlFor='drama' className="d-flex cursor-p  aling-items-center ">
                                <input type="checkbox"  name='drama' id='drama'  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Drama</h2>
                            </label>
                                
                            
                            
                        </div>
                        <div className='d-flex-column section3'>
                            <label htmlFor='crimen' className="d-flex cursor-p  aling-items-center">
                                <input type="checkbox" name='crimen' id='crimen'  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Crimen</h2>
                            </label>
                                    
                            <label htmlFor='suspenso' className="d-flex cursor-p  aling-items-center ">
                                <input type="checkbox" name='suspenso' id='suspenso'  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Suspenso</h2>
                            </label>
                            <label htmlFor="documentales" className="d-flex cursor-p  aling-items-center ">
                                <input type="checkbox" name="documentales" id="documentales"  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Documentales</h2>
                            </label>           
                            
                        </div>
                        <div className='d-flex-column section4'>
                            <label htmlFor="romance" className="d-flex cursor-p  aling-items-center ">
                                <input type="checkbox" name="romance" id="romance"  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Romance</h2>
                            </label>                
                            <label htmlFor="+18" className="d-flex cursor-p  aling-items-cente">
                                <input type="checkbox" name="+18" id="+18"  className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular"> +18</h2>
                            </label>
                            <label htmlFor='fantasia' className="d-flex cursor-p  aling-items-center ">
                                <input type="checkbox"  name='fantasia' id='fantasia' className='cursor-p '/>
                                <h2 className=" font-14 color-white mg-right-10 u-regular">Fantasia</h2>
                            </label >
                            

                        </div>

                   </div>
                   
                  
                  
                    <div className="d-flex aling-items-center justify-center mg-bot-10">
                       <img src="" className="img" alt="Imagen de muestra" width='140px' height='150px'/>
                    </div>
                    <div className="d-flex w-100 aling-items-center justify-center mg-top-10">
                        <label htmlFor="imagen" className='bton font-14 color-white u-bold'> Subir Imagen
                            <input type="file" name="imagen" id="imagen" className='file'/>
                        </label>
                    </div>
                    <label htmlFor="description" className="mg-top-20 w-100  d-flex-column aling-items-center justify-center">
                        <h1 className="description font-14 color-white mg-bot-10">DESCRIPCION</h1>
                        <textarea className='description'  name="descripcion" id="description" cols="40" rows="4"></textarea>
                    </label>

                    <input type="button" className="submitRegister font-12 mg-top-20" value="Registrar Pelicula" name="submit" id="submitRegister"/>
                    

               </form>
           </div>
       </div>
    )
}