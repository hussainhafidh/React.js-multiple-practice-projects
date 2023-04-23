import React, { useEffect, useState } from "react";
import "./App.css"
function App() {
  const [data, setData] = useState([]);
  const [cat, setcat] = useState([])
  const [count, setcount] = useState(1);
  const [search, setsearch] = useState("All")
  const [btn, setbtn] = useState(true)
  useEffect(() => {
      fetch(`https://dummyjson.com/products`).then((res)=>{
        return res.json();
      }).then((data)=>{
        setData(data.products);
      })
      },[]);
  useEffect(()=>{
     if( search === "All"){
      setbtn(true)
      let arr = data.filter((item, i) => {
        return i <= 9 * count && i >= 9 * (count - 1);
      });
      setcat(arr)
     }else{
      setbtn(false)
     let arr = data.filter((item)=> item.category === search);
      setcat(arr)
     }
  },[search,data,count])
  const Counhandlerprev=()=>{
    if(count > 1){
      setcount(count - 1)
    }
  }
  const Counthandlernext=()=>{
    if(count < 3){
      setcount(count + 1)
    }
  }
  console.log(data);
  return (
    <div className="data-container">
      <div style={{"textAlign":"center",margin:"20px"}}>
        <select onChange={(e)=>setsearch(e.target.value)}>
          <option value="All">All</option>
          <option value="smartphones">smartphones</option>
          <option value="laptops">laptops</option>
          <option value="fragrances">fragrances</option>
          <option value="skincare">skincare</option>
          <option value="groceries">groceries</option>
          <option value="home-decoration">home-decoration</option>
        </select>
      </div>
      <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap",boxSizing:"border-box",padding:"20px",justifyContent:"space-around"}}>
        {cat.map((item, i) => {
          return (
            <div className="display-image" key={i}>
                <div className="divimg">
                <img src={item.thumbnail} alt="thumbnails" style={{"height":"200px","width":"200px",margin:"20px"}}/>
                </div>
                <div className="description">
                <img src={item.thumbnail} alt="thumbnails" style={{"height":"100px","width":"100px",margin:"10px"}}/>
                <span>description:{item.description}</span>
                </div>
            </div>
          );
        })}
      </div>
      {
      btn?
      <div style={{"textAlign":"center",margin:"50px"}}>
      <button onClick={Counhandlerprev}>prev</button><span>{count}</span><button onClick={Counthandlernext}>next</button>
      </div>:""
      }
    </div>
  );
}

export default App;
