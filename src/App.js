import React, { useEffect, useState } from 'react';
import BeerCards from './Components/BeerCards';
import Pagination from './Components/Pagination.js';
import Filter from  './Components/Filter.js'


function App() {
  const URL = `https://api.punkapi.com/v2/beers?`;
  let [beerData, setBeerData] = useState(0);
  let [isLoading, setIsLoading] = useState(true);
  let [nPerPage, setNPerPage] = useState(10);
  let [pageNumber, setPageNumber] = useState(1);
  let [linkOnSubmit, setLinkOnSubmit] = useState('');
  let [isItFiltration, setIsItFiltration] = useState(false);


  function getNewUrl() {
    let modifiedUrl = URL;
    let inputNodes = document.querySelectorAll('.filter');
    inputNodes.forEach(el => {
      if (el.value) {
        modifiedUrl+=`${el.parentNode.textContent}=${el.value}&`;
      }
    })
    return modifiedUrl;
  }

  const getApi = (pageNumber, nPerPage) => {
    if (!isItFiltration) {
      console.log('я вызываюсь');
      fetch (`${URL}page=${pageNumber}&per_page=${nPerPage}`)
      .then(response => response.json())
      .then(data => {
        setBeerData(data);
        setIsLoading(false);
      })
    }
    else {
      console.log('Я вызываюсь фильтр')
      fetch(getNewUrl())
      .then(response => response.json())
      .then(data => {
        setBeerData(data);
      })
    }
  }
        
  

    useEffect(() => getApi(pageNumber, nPerPage), [pageNumber, nPerPage, isItFiltration, linkOnSubmit]);
    
    const nextPage = () => {
      setIsItFiltration(false);
      setPageNumber(pageNumber+1);
    }

    const prevPage = () => {
      setIsItFiltration(false);
      setPageNumber(pageNumber-1);
    }

    const onSubmit = () => {
      setIsItFiltration(true);
      setLinkOnSubmit(getNewUrl());
    }
    
    
   
    return (
      <div>{isLoading ? "Data is loading..." :<div>
                                                <BeerCards beers={beerData}/> 
                                                <Filter beers={beerData} handleSubmit={onSubmit}/>
                                                <Pagination pageNumber = {pageNumber} nextPage={nextPage} prevPage={prevPage}/>
                                              </div>
      }
      </div>
    )
}

export default App;
