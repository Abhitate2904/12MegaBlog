import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
   
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full bg-gray-900 text-white text-center py-4 mt-8">
                        
                            <div className="mb-4 inline-flex items-center">
                               <img src='/Logo.jpg'/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    &copy; Copyright 2025. All Rights Reserved by Physicswala Satara.
                                </p>
                            </div>
                         
                    </div>
                    
                </div>
            </div>
       
  )
}

export default Footer