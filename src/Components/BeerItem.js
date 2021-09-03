import React from 'react';

const styles = {
    ul: {
    flexBasis: '10%',
    flexShrink: '1',
    listStyle: 'none',
    border: '1px solid black'
    },
    
}

export default function BeerCard(props) {
    const beer = props.beer;
    return (
        <ul style={styles.ul}>{Object.values(beer).map(el => {
            if(typeof el === 'string' || typeof el==='number')
                return <li>{el}</li>})}</ul>
    )
}


