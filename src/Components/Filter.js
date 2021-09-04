import React from 'react';

const FILTRATION_QUERIES = [
    'abv_gt',
    'abv_lt',
    'ibu_gt',
    'ibu_lt',
    'ebc_gt',
    'ebc_lt',
    'yeast',
    'brewed_before',
    'brewed_after',
    'hops',
    'malt',
    'food',
    'ids'
]

export default function Filter(props) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            props.handleSubmit()}}
        >         
            {FILTRATION_QUERIES.map(el => <label>{el}<input className='filter' type="text"/><br/></label>)}
            <input type="submit" value="Submit"/>
        </form>
    )
}