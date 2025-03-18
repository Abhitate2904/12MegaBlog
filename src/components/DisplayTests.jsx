import React from 'react';
import { Container } from '.';

function DisplayTests({ TestID,Name,subjects,Status}) {
    console.log(" subjects data:", subjects);
    return (
        <div className='bg-gradient-to-r from-indigo-500 to-pink-500 
        text-white rounded-lg p-6 shadow-lg flex flex-col justify-center 
        transition-transform duration-300 transform hover:scale-105 hover:shadow-xl
        m-3' onClick={() => navigate('/Test')}>  
        <h2>{Name}</h2>  
        <h2>{Status}</h2>         
      
     
 </div>
    );
}

export default DisplayTests;
