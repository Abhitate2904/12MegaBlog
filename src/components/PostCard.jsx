import React from 'react'
import appwriteService from "../appwrite/config"
import {Link,useNavigate} from 'react-router-dom'

function PostCard({ title, createdAt,subjectid}) {
  const navigate = useNavigate();
   
  return (
    
        <div className='bg-gradient-to-r from-yellow-200 to-orange-300 text-brown-800 rounded-lg p-6 shadow-lg flex flex-col justify-center transition-transform duration-300 transform hover:scale-105 hover:shadow-xl m-3 cursor-pointer' onClick={() => navigate(`/all-tests/${subjectid}`)}>             
            <h2
            className='text-xl font-bold text-center break-words '
            >{title}</h2>
            <h3 className="text-sm opacity-80 whitespace-nowrap">
  Date: {new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}
</h3>
        </div>
     
  )
}


export default PostCard