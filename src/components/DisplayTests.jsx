import React from "react";

import { useNavigate } from "react-router-dom";

function DisplayTests({ $id, TestID, Name, Score, Status }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gradient-to-r from-yellow-200 to-orange-300 text-black rounded-lg 
        p-6 shadow-lg flex flex-col justify-center transition-transform duration-300 transform 
        hover:scale-105 hover:shadow-xl m-3 cursor-pointer"
      onClick={() => navigate(`/test/${$id}`)}
    >
      <h2>{Name}</h2>
      <h2>{Status}</h2>
    </div>
  );
}

export default DisplayTests;
