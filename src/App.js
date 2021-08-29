import React, { useEffect, useState } from 'react';
import BeerCards from './BeerCards/BeerCards';


function App() {
  let [beerData, setBeerData] = useState(0);
  let [isLoading, setIsLoading] = useState(true);
  let [nPerPage, setNPerPage] = useState(10);
  let [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    fetch (`https://api.punkapi.com/v2/beers?page=${pageNumber}&per_page=${nPerPage}`)
    .then(response => response.json())
    .then(data => {
      setBeerData(() => data);
      setIsLoading(false)})
    }, [])
  
    console.log(beerData)

  return (
    <div>
    {isLoading ? 'beer data is loading' : <BeerCards beers={beerData}/>}
    </div>
  );
}

export default App;
