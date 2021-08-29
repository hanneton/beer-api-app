// import { render } from '@testing-library/react';
import React from 'react';
import BeerCard from './BeerCard'
const styles = {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap'
}


export default function BeerCards(props) {
    return (
        <div style={styles}>
            {props.beers.map(el =>  <BeerCard key={props.beers.id} beer={el}/>)}
        </div>
    )
}