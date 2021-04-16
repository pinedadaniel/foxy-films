import "./index.scss";
import imgMovie from "../../../img/movie.jpg";
import axios from "axios";
import React, {useEffect, useState} from 'react';
export default function BankMovieComponent(props) {
    const API = 'http://localhost:5000';
    const resource = '/movies';
    const [movies, setMovies] = useState([]);
    const [checkType, setcheckType] = useState("movies");
    const [categorias, setCategorias] = useState([]);

    const categories = [
        "Accion",
        "Comedia",
        "Terror",
        "Aventura",
        "Crimen",
        "Suspenso",
        "Animadas",
        "Ciencia ficcion",
        "Drama",
        "Fantasia",
        "Documentales",
        "Romance",
        "+18"
    ]

    function handleCheckbox(type) {
        if (type !== checkType) {
           const coleccion = document.getElementsByClassName("categoriaActive");
           let arrayElements = [...coleccion];
           console.log(arrayElements);
           arrayElements.forEach((element)=>{
            element.classList.remove("categoriaActive");
           })
            setcheckType(type);
            setCategorias([]);
        } 
    }
    
    function handleCategorias(categoria) {
        let response = false;
        const clone = [...categorias];
        clone.forEach((cat) => {
            if(categoria === cat) {
                const newCategories = categorias.filter((cate) => cate !== categoria);
                setCategorias(newCategories);
                response= true;
            } 
        })
        if (!response) {
            clone.push(categoria);
            setCategorias(clone);
        }
        addCategoriaActive(response, categoria);
    }

    function addCategoriaActive(res, categoria) {
        if(!res){
            const collection = document.querySelectorAll(`span[data-category='${categoria}'], button[data-category='${categoria}']`);
            const elements = [...collection];
            elements.forEach(element => {
                element.classList.add("categoriaActive");
            });
        } else {
            const collection = document.querySelectorAll(`span[data-category='${categoria}'], button[data-category='${categoria}']`);
            const elements = [...collection];
            elements.forEach(element => {
                element.classList.remove("categoriaActive");
            });
        }
    }
    useEffect(() => {
        async function getMovie() {
            try {
            const response = await axios.get(`${API}${resource}`);
            if(response.status === 200 && response.data){
                setMovies(response.data);
            }
            } catch (error) {
                console.log(error)
            }
        } 
        getMovie();
    }, [])

    return(
       <div className="containerBankMovie  bg-white">
           <div className="contBankMovieLeft ">
               <input placeholder={`Buscar ${checkType==="movies" ?"peliculas" : "series"}`} className="searchBankMovie bg-white" type="search"/>
               <div className="contListMovies  bg-white ">
                   <div className="contCards">
                       
                        {
                            movies.map((movie,index) =>
                            <div title={movie.duracion} key={index} className="card">
                            <img alt={movie.titulo}  className="imgMovie" src={movie.avatar} />
                                <div className="itemsCard">
                                    <span className="material-icons eye">
                                         visibility
                                    </span>
                                    <h1 className="nameMovie">{movie.titulo}</h1>
                                </div>
    
                            </div>)
                        }
                        
                        
                   </div>
                   
               </div>
               <div className="contPaginador  bg-white"></div>
           </div>
           <div className="contBankMovieRight">
               <div className="contCheckType">
                   <div onClick={()=>handleCheckbox("movies")} className={`typePeliculas ${checkType === 'movies' ? 'checkActive' : ''}`}>
                       Peliculas
                   </div>
                   <div onClick={()=>handleCheckbox("series")} className={`typePeliculas ${checkType === 'series' ? 'checkActive' : ''}`}>
                       Series
                   </div>
               </div>
               <div className="contFiltros">
                    <div className="contCategorias">
                        <h1 className="titleCategorias">categorias</h1>
                        <h4 className="typeCategorias" >{checkType}</h4>
                        {
                            categories.map((categoria, index) => (
                            <button key={index} data-category={categoria} onClick={(e)=>handleCategorias(categoria)} className="nameCategoria">
                               <span data-category={categoria}> {categoria} </span>
                            </button>
                            ))
                        }
                            
                    </div>
               </div>

           </div>
       </div>
    )
}