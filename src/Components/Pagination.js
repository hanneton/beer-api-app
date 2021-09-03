import React from 'react';

const Pagination = (props) => {
    return (
        <input type="button" value={props.pageNumber} onClick={props.nextPage}></input>
    )
}

export default Pagination;