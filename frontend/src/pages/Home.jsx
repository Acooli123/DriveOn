import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-bottom bg-[url(https://images3.alphacoders.com/140/thumb-440-1403328.webp)] h-screen w-100 pt-5 bg-white-200 flex justify-between flex-col">
        <h2 className="text-2xl text-white font-bold pl-5 ">DriveOn</h2>
        <div className="bg-white py-4 px-6">
            <h2 className="text-2xl font-bold ml-7 pl-5 ">Get Started with DriveOn</h2>
            <Link to="/login"className="flex items-center justify-center w-full mt-3 bg-black text-white py-2 rounded">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

