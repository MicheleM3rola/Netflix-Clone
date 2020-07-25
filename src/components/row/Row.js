import React, {useState,useEffect} from 'react'
import Instance from '../../axios';
import './row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';




const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({title,fetchUrl,isLargeRow}) => {

    const[movies,setMovies]=useState([])

    const[trailerUrl,setTrailerUrl]=useState()



    useEffect(()=>{

        {/** function that run on window load that fetch the movies images to display */}

        const fetchData = async () =>{
            const request = await Instance.get(fetchUrl);

            setMovies(request.data.results);

            return request
        }
        console.log(trailerUrl)
        fetchData()


    },[fetchUrl,trailerUrl]);

  
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

      const handleClick = (movie) =>{
          if(trailerUrl) {
              setTrailerUrl("");
          }
          else{
               movieTrailer(movie?.name || movie?.title || "").then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));   
                 
              }).catch((error) => { if(error) {
                  setTrailerUrl(null)
                  setTimeout(()=>{
                      setTrailerUrl("")
                  },2000)
              }})
          }

          
      }

      

      
    return (
        <div className='row'>
        <h2>{title}</h2>
        <div className='row__posters'>
        {
            movies.map(movie => (
                <img 
                onClick={()=> handleClick(movie)}
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
            ))
        }

        </div>
        <div className="trailer">
         { trailerUrl ? <YouTube videoId={trailerUrl} opts={opts}/> 
         : trailerUrl === null ? <h1 className='notFound'>Sorry Video Not Found</h1> : null }
         </div>
        </div>
    )
}

export default Row

