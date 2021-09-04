import React from 'react';

const Pagination = (props) => {
    return (
        <>
            { props.pageNumber>1 ? <input type="button" value='prev' onClick={props.prevPage}></input> : null}
            <input type="button" value={props.pageNumber} disabled></input>
            <input type="button" value='next' onClick={props.nextPage}></input>
        </>
    )
}

export default Pagination;