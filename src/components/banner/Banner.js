import React,{useState,useEffect} from 'react'
import instance from '../../axios'
import requests from '../../request'
import './banner.css'

const Banner = () => {

    const[movies,setMovies]=useState([])

    useEffect(()=>{
        const fetchData = async ()=>{
            const request = await instance.get(requests.fetchNetflixOriginals);

            setMovies(request.data.results[Math.floor(Math.random()*request.data.results.length)])

        }
        fetchData()
    },[]);

    function truncate(str,n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
       <header className='banner'
            style={{
                backgroundSize:"cover",
                backgroundImage:`url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")`,
                backgroundPosition:"center center"
            }}>
       <div className="banner_contents" >
            <h1 className="banner__title">
                {movies?.title || movies?.name || movies?.original_name }
            </h1>
            <div className="banner__buttons">
                <button className="banner__button">Play</button>
                <button className="banner__button">My List</button>
            </div>
            <h1 className="banner__description">
                {truncate(movies?.overview,150)}
            </h1>
       </div>
        <div className="banner--fadeBottom"/>    
       </header>
    )
}

export default Banner
