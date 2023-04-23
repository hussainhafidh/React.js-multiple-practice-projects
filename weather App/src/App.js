// import React, { useEffect, useState } from 'react';
// import './App.css';

// function App() {
//   const [wea,setwea]=useState(null)
//   const [city,setcity]=useState("")
//   const [lastcity,setlastcity]=useState([])
//   const [t,sett]=useState(true)
//   useEffect(() => {
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3bc904f99bdc19d6811d3f46e5850904`)
//       .then((res) => res.json())
//       .then((res) => {
//         if (city === "") {
//           sett(false);
//           setwea(null);
//           return;
//         }
//         console.log(res, 9, res.main, res.main.temp);
//         console.log(res.message);
  
//         if (res.message === "city not found" || res.name.toLowerCase() !== city.toLowerCase()) {
//           console.log(34);
//           sett(true);
//           setwea(null);
//         } else {
//           setwea(res);
//           sett(false);
//           if (lastcity.length == 3) {
//             lastcity.push(city);
//             lastcity.shift();
//             setlastcity([...lastcity]);
//           } else {
//             lastcity.push(city);
//             setlastcity([...lastcity]);
//           }
//         }
//       })
//       .catch((er) => {
//         console.log(er, 11);
//         sett(true);
//         setwea(null);
//       });
//   }, [city]);
  
//   return (
//     <div className="Ap">
//      <h1 className='kk'>WEATHER APP</h1>
//     <div className='kkk'>
//     <input className='kl' type="text" placeholder='Enter city name' value={city} onChange={(e)=>{
//       setcity(e.target.value)
//       console.log("p")
//      }}></input></div> 
//      {t&&<h1 id='wr'> ENTER valid city name</h1>}
//      {wea&&
//      <div id='card'>
//       <h2>Weather details of city:{city}</h2>
//       <h2>Current Temperature:{wea.main.temp}</h2>
//       <h2> Temperature rage:{wea.main.temp_max}-{wea.main.temp_min}</h2>
//       {wea.main.humidity&&<h2>Humidity:{wea.main.humidity}</h2>}
//       {wea.main.sea_level&&<h2>sealevel:{wea.main.sea_level}</h2>}
//       {wea.main.grnd_level&&<h2>ground level:{wea.main.grnd_level}</h2>}
      
//       </div>}
//     {!t&&<div> {lastcity.length?
//       <div>
//          <h2>last 3 city entries</h2>
//          {lastcity.map((r,i)=>
//          <div key={i}>
//             <p>{r}</p>
        
//          </div>
         
//          )}
      
//         </div>:null}</div>}
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [wea,setwea]=useState(null)
  const [city,setcity]=useState("")
  const [lastcity,setlastcity]=useState([])
  const [t,sett]=useState(true)
  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3bc904f99bdc19d6811d3f46e5850904`).then(
      (res)=>{
      return  res.json()
      }
    ).then((res)=>{
      if(city===""){
        sett(false)
        setwea(null)
        return
      }
      console.log(res,9,res.main,res.main.temp)
      console.log(res.message)
     
      if(res.message==="city not found"){
        console.log(34)
        sett(true)
        setwea(null)
      }else{
        setwea(res)
        sett(false)
        if(lastcity.length === 3){
          lastcity.push(res.name)
          lastcity.shift()
          setlastcity([...lastcity])
        }else{
          lastcity.push(res.name)
          setlastcity([...lastcity])
        }
      }
      
    }).catch((er)=>{
      console.log(er,11)
      sett(true)
      setwea(null)
    })
  },[city])
  
  const handleCityChange = (e) => {
    setcity(e.target.value.toLowerCase())
    console.log("p")
  }

  return (
    <div className="Ap">
     <h1 className='kk'>WEATHER APP</h1>
     <div className='kkk'>
        <input className='kl' type="text" placeholder='Enter city name' value={city} onChange={handleCityChange}></input>
      </div> 
     {t && <h1 id='wr'> ENTER valid city name</h1>}
     {wea &&
      <div id='card'>
        <h2>Weather details of city: {wea.name}</h2>
        <h2>Current Temperature: {wea.main.temp}</h2>
        <h2>Temperature range: {wea.main.temp_max}-{wea.main.temp_min}</h2>
        {wea.main.humidity && <h2>Humidity: {wea.main.humidity}</h2>}
        {wea.main.sea_level && <h2>Sealevel: {wea.main.sea_level}</h2>}
        {wea.main.grnd_level && <h2>Ground level: {wea.main.grnd_level}</h2>}
      </div>
     }
     {!t && 
      <div>
        {lastcity.length ?
          <div>
            <h2>Last 3 city entries</h2>
            {lastcity.map((r,i)=> 
              <div key={i}>
                <p>{r}</p>
              </div>
            )}
          </div>
        : null}
      </div>
     }
    </div>
  );
}

export default App;
