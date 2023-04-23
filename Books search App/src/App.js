import { useState } from 'react';
import './App.css';
import Header from "./component/Header";
import Book from "./component/BookBlock"

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const handleSearch = () => {
    const query = document.getElementById("search-box").value
    console.log(query);
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then(response => response.json())
      .then(data => {
        setFetchedData(data.items);
        console.log(data.items);
      })
  }

  return (
    <div className='App'>
      <Header />
      <div style={{ marginTop: "1rem" }}>
        <input id='search-box' type="text" placeholder='Search for a book' />
        <button onClick={() => handleSearch()}>Search</button>
        {fetchedData ?
          <div className="search-container">
            {fetchedData.map(data => (
              < Book key={data.id} data={data}/>
            ))}
          </div>
          : <></>
        }
      </div>
    </div>
  );
}

export default App;
