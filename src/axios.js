import axios from 'axios';



/** CREATE AN INSTANCE WITH .CREATE METHOD TO FACILITATE THE REQUEST TO THE API*/

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3"
});


export default instance;


