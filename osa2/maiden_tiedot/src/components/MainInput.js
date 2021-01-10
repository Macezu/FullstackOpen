import React from 'react'


const MainInput = ({handleSearchChange}) => {

    return (
        <>
           find countries <input onChange={handleSearchChange}/>
        </>
    )
}


export default MainInput