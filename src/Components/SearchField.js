import React from 'react';


export default function SearchField(props) {
    return (
        <label>type in beer name
            <input className='search' onChange={e => props.handleChange(e)}/>
            <br/>
        </label>
    );
}
