import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({ title, createdAt}) {
    
  return (
    <Link to={`/all-tests/${title}`}>
        <div className='bg-gradient-to-r from-indigo-500 to-pink-500 
               text-white rounded-lg p-6 shadow-lg flex flex-col justify-center 
               transition-transform duration-300 transform hover:scale-105 hover:shadow-xl
               m-3'>             
            <h2
            className='text-xl font-bold text-center break-words'
            >{title}</h2>
            <h3 className="text-sm opacity-80 whitespace-nowrap">
  Date: {new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}
</h3>
        </div>
    </Link>
  )
}


export default PostCard