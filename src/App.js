import React, { useEffect, useState } from 'react';
import BeerCards from './Components/BeerCards';
import Pagination from './Components/Pagination.js';
import Filter from  './Components/Filter.js'
import SearchField from './Components/SearchField';
import useDebounce from './Components/useDebounce';


function App() {
  const URL = `https://api.punkapi.com/v2/beers?`;
  // урлу стоит вынести в .env
  // Почему везде внизу let? Используй const везде где можешь
  let [beerData, setBeerData] = useState(0);
  let [isLoading, setIsLoading] = useState(true);
  let [nPerPage, setNPerPage] = useState(10);
  let [pageNumber, setPageNumber] = useState(1);
  let [linkOnSubmit, setLinkOnSubmit] = useState('');
  let [linkOnChange, setLinkOnChange] = useState('');
  let [isItFiltrationQuery, setIsItFiltrationQuery] = useState(false);
  let [isItSearchQuery, setIsItSearchQuery] = useState(false);
  let [searchTerm, setSearchTerm] = useState('');
  let debouncedSearchTerm = useDebounce(searchTerm);

  function getSearchUrl() {
    let modifiedUrl = URL;
    if (debouncedSearchTerm) {
      modifiedUrl+=`beer_name=${debouncedSearchTerm}`;
    }
    return modifiedUrl;
  }
  function getFiltrationUrl() {
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
    if (isItFiltrationQuery) {
      fetch(getFiltrationUrl())
      .then(response => response.json())
      .then(data => {
        setBeerData(data);
        setIsItFiltrationQuery(false);
      })
    }
    else if (isItSearchQuery) {
      fetch(getSearchUrl())
      .then(response => response.json())
      .then(data => {
        setBeerData(data);
        setIsItSearchQuery(false);
      })
    }
    
    else {
      fetch (`${URL}page=${pageNumber}&per_page=${nPerPage}`)
      .then(response => response.json())
      .then(data => {
        setBeerData(data);
        setIsLoading(false);
    })}
  }
        
  

    useEffect(() => getApi(pageNumber, nPerPage), [pageNumber, nPerPage, linkOnSubmit, linkOnChange, debouncedSearchTerm]);
    
    const nextPage = () => {
      setPageNumber(pageNumber+1);
    }

    const prevPage = () => {
      setPageNumber(pageNumber-1);
    }

    const onSubmit = () => {
      setIsItFiltrationQuery(true);
      setLinkOnSubmit(getFiltrationUrl());
    }
    
  const onChange = (e) => {
    setIsItSearchQuery(true);
    setSearchTerm(e.target.value);
    setLinkOnChange(getSearchUrl());
  }
   
    return (
      <div>{isLoading ? "Data is loading..." :<>
                                                <BeerCards beers={beerData}/> 
                                                <Filter handleSubmit={onSubmit}/>
                                                <SearchField handleChange={onChange}/>
                                                <Pagination pageNumber = {pageNumber} nextPage={nextPage} prevPage={prevPage}/>
                                              </>
      }
      </div>
    )
}

export default App;
