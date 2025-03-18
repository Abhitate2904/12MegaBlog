import React from "react";
import appwriteService from "../appwrite/config";
import { Link, useNavigate } from "react-router-dom";

function PostCard({ title, createdAt, subjectid, description }) {
  const navigate = useNavigate();

  return (
    <div
  className="bg-gradient-to-r from-yellow-200 to-orange-300 text-brown-800 rounded-lg p-6 shadow-lg flex flex-col justify-center transition-transform duration-300 transform hover:scale-105 hover:shadow-xl m-3 cursor-pointer max-w-xs"
  onClick={() => navigate(`/all-tests/${subjectid}`)}
>
  <h2 className="text-xl font-bold text-center break-words">{title}</h2>
  <h3 className="text-sm opacity-80 break-words mt-2 text-center">
    {description}
  </h3>
</div>


  );
}

export default PostCard;
