import React, { useEffect, useState } from "react";
import './movie.css'
import favData from './favouritesMovies.json'
import Top10movies from './top10.json'

const apikey = process.env.apikey  || 'a716b59b'
// const Url = 'http://www.omdbapi.com/?t=top imbd rated&apikey=a716b59b'
function MovieSerch(){
    const [fav_data,set_fav_data] = useState(favData.fav_movie);
    // const [remov_fav,set_remov_fav]=useState()
    const top_10_movies = Top10movies.top10;
    const [movie_poster , set_movie_poster] = useState('');
    const [after_serch , set_after_serch] = useState(false);
    const[on_hover ,set_on_hover] = useState(false)
    async function movieserchFun(e){
        set_after_serch(true)
        console.log(e.target.value)
        let searchKey = e.target.value;
        let url = `http://www.omdbapi.com/?t=${searchKey}&apikey=${apikey}`
        await fetch(url,{
            method:"get"
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            set_movie_poster(data.Poster);

        })
    }
    function add_fav(e){
        console.log(e)
        set_on_hover(true)
    }
    function remove_fav_button(){
        return(
            <button className="addtofav" onClick={()=>{save_to_favdata()}}>Add to Favourites</button>
        )
    }
    function save_to_favdata(i){
        if(i){
            set_fav_data([...fav_data, top_10_movies[i]])
        }
        else{
            set_fav_data([...fav_data,{moviePoster:movie_poster}])
        }
    }
    useEffect(()=>{
        save_to_favdata([...fav_data])
        console.log(fav_data)
        
    },[])
    function remove_from_fav(i){
        fav_data.splice(0,i);
        set_fav_data([...fav_data])
    }
    const [btnStyle,set_btnStyle] = useState("none ;")
    return(
        <div className="movie_main_cont">
            <div className="movie_header">
                <div><h2>Movies</h2></div>
                <div><input type='search' onChange={(e)=>movieserchFun(e)}  placeholder="Search Movie by Name"/></div>
            </div >
            {after_serch?<div className="movie_result" onMouseOver={()=>{set_on_hover(true)}} >
                <img src={movie_poster} alt='movie poster'  />
                {/* <button className="addtofav" style={{display:{btnStyle}}} onClick={()=>{save_to_favdata()}}>Add to Favourites</button> */}
                {on_hover?<button className="addtofav" onClick={()=>{save_to_favdata()}}>Add to Favourites</button>:''}

            </div>:""}
            <div>
                <div><h3>Movies</h3></div>
                <div className="top_10_movies">
                    {
                        top_10_movies?.map((val,i)=>{
                            return (
                                 <div key={i} className='movie_box' >
                                    <img  key={i} src={val?.moviePoster}  alt="Top 10 IMBD reated movies"/>
                                    <button className="addtofav" onClick={()=>{save_to_favdata(i)}}>Add to Favourites</button>
                               </div>
                            )
                            
                        })
                    }
                </div>
                <div><h3>Favourites</h3></div>
                {fav_data.length >= 0?<div className="top_10_movies">
                {
                        fav_data?.map((val,i)=>{
                            return (
                                 <div key={i} className='movie_box'>
                                    <img   src={val?.moviePoster}  alt="Fav movies"/>
                                    <button className="addtofav" onClick={()=>{save_to_favdata(i)}}>Add to Favourites</button>
                                    <button className="addtofav" onClick={()=>{remove_from_fav(i)}}>Remove</button>
                               </div>
                            )
                            
                        })
                    }
                </div>:""}
            </div>
        </div>
    )
}


export default MovieSerch;