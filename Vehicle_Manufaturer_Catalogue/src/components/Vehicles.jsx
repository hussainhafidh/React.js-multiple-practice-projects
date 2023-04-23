import React, { useEffect, useState } from 'react'
import "./Vehicles.css"

function Vehicles() {
    const [search, setSearch] = useState();
    const [list, setList] = useState([])
    const [select, setSelect] = useState()
    const [showlist, setShowlist] = useState(true)
    const [showfilt, setShowFilt] = useState(false)
    const [selectedList, setSelectedList] = useState([])

    let dropdown = []

    // ============ FETCHING ALL THE VEHICLES ===========
    const fetchData=async()=>{
        let data = await fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetWMIsForManufacturer/hon?format=json")
                            .then((data)=>data.json())
                            .then((value)=>{
                                setList(value.Results)
                                console.log(value.Results)
                            }
                            )
    }
    useEffect(()=>{
        fetchData()
    }, [])
    //====================================================

    // ==================IMPLEMENTION OF SELECT FUNCTIONALITY===========
    const SelectListFunction =()=>{
        if(select == undefined){
            setShowlist(true)      

            setShowFilt(false)
        } else{
            // console.log(select);
            setShowlist(false)
            setSelectedList(list.filter((data,ind)=>data.VehicleType == select))
            setShowFilt(true)
        }
    }
    useEffect(()=>{
        SelectListFunction()
    }, [select])
    //=============================================================

    // ===============IMPLEMENTATION OF SEARCHED DATA==========
    // let [filteredList, setFilteredList] = useState([])
    let arr = []
    const SearchedData=(search)=>{
        if(!search==""){
            setShowlist(false) 
            list.filter((elem, i)=> {
                let a = elem.Name.includes(search)
                if(a){
                    arr.push(elem)
                    // setFilteredList(()=>elem)  
                } 
            }) 
            console.log(arr);
        } else{
            setShowlist(true)
            arr = []
            // filteredList = []
        }
    }

    useEffect(()=>{
        SearchedData(search)
    }, [search])
    
    //..........HANDLELING CLICKING OF ANY ROWS...........
    const [showCard, setShowCard] = useState(false)
    const [popup, setpopup] = useState({wmi: "", name:"", vehicleType:"", updatadOn:"", country:"", id:"", createdOn:"",})
    const handleClick=(vehicle)=>{
        setShowCard(true)
        setpopup({...popup, id:vehicle.Id, wmi:vehicle.WMI, country:vehicle.Country, name:vehicle.Name, vehicleType: vehicle.VehicleType, updatadOn:vehicle.UpdatedOn,createdOn:vehicle.CreatedOn})
    }

  return (
    <div>
        <h1 className='text-center'>VEHICLE MANUFACTURERS</h1>

        <div className='d-flex justify-content-between '>

            {/* ===========SEARCH========== */}
            <div className='m-3'>
                <label htmlFor='search' >Search</label>
                <input value={search} id='search' onChange={(e)=>setSearch(e.target.value)} placeholder='search by name' />
            </div>

            {/* =========== SELECT VEHICLES========== */}

            <div className='m-3'>
                <label>Filter by Vehicle Types</label>
                <select onChange={(e)=>setSelect(e.target.value)}>
                    <option></option>
                    { list.map((vehicle, index)=>{
                        let a = dropdown.includes(vehicle.VehicleType)
                        dropdown.push(vehicle.VehicleType)
                        if(!a){
                            return <>
                                <option id={index}>{vehicle.VehicleType}</option>
                            </>
                        }
                    })}
                </select>
            </div>
        </div>

        {/* POP UP OF CARD BY CLICKING ROW */}
        {showCard ? 
            <div className='popup-outer'>
                <div className='popup-inner'>
                    <button className='btn btn-danger mb-4 col-12' onClick={()=>setShowCard(false)}>Back</button>
                    <div>
                        <div>Country: {popup.country}</div>
                        <div>ID : {popup.id}</div>
                        <div>Name : {popup.name}</div>
                        <div>ID : {popup.id}</div>
                        <div>Manufaturer Identifiers: {popup.wmi}</div>
                        <div>Created On: {popup.createdOn}</div>
                        <div>Updated On: {popup.updatadOn}</div>
                    </div>
                </div>
            </div>: ""}

        {/*========== TABLE IMPLEMENTATION FOR ALL VEHICLES ============*/}
        <div>
            <table className='table table-striped'>
                <thead className='bg-dark text-white'>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {showlist ? list.map((vehicle, index)=>{
                        if(vehicle.Name ==null || vehicle.Country == null || vehicle.VehicleType==null ){

                        } else{
                            return <>
                                <tr key={index} id={index} onClick={()=>{handleClick(vehicle)}}>
                                    <td>{vehicle.Name}</td>
                                    <td>{vehicle.Country}</td>
                                    <td>{vehicle.VehicleType}</td>
                                </tr>
                            </>
                        }
                    }) : 
                    arr.map((vehicle, index)=>{
                        if(vehicle.Name ==null || vehicle.Country == null || vehicle.VehicleType==null ){

                        } else{
                            return <>
                                <tr key={index} id={index} onClick={()=>{handleClick(vehicle)}}>
                                    <td>{vehicle.Name}</td>
                                    <td>{vehicle.Country}</td>
                                    <td>{vehicle.VehicleType}</td>
                                </tr>
                            </>
                        }

                    })}

            {/* ============= SHOWING SELECTED VEHICLES AND SEARCHED ONES =========== */}

                    {showfilt ? selectedList.map((vehicle, index)=>{
                        if(vehicle.Name ==null || vehicle.Country == null || vehicle.VehicleType==null ){

                        } else{  
                            return <>
                                <tr key={index} id={index} onClick={()=>{handleClick(vehicle)}}>
                                    <td>{vehicle.Name}</td>
                                    <td>{vehicle.Country}</td>
                                    <td>{vehicle.VehicleType}</td>
                                </tr>
                            </>
                        }
                    }) : ""}
                </tbody>
            </table>

        </div>
    </div>
  )
}

export default Vehicles