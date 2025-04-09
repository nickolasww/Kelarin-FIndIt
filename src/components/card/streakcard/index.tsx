import React from 'react'

const StreakCard = ({title, description, claimed}: {title: string; description: string, claimed?: boolean}) => {
  return (
    <div className="bg-white rounded-md border-2 border-gray-400 p-2 flex items-center justify-between">
    <div className="flex-1">
      <h3 className="text-lg  font-semibold text-black">{title}</h3>
      <p className="text-sm text-black  mt-1 pr-40 text-justify">{description}</p>
    </div>
    {claimed ? (
      <div className=" text-purple-600 border-2 border-purple-600 font-medium rounded-sm px-5 py-2 text-md">
        Claimed
      </div>
    ) : (
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-sm px-7 py-2 text-md">
        Claim
      </button>
    )}
  </div>
);
};


export default StreakCard
