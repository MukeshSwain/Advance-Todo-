import Navbar from '@/components/Navbar'
import React from 'react'

function Home() {
  return (
    <div
      className="sticky top-0 h-screen w-full bg-cover bg-center inset-0 overflow-hidden "
      style={{ backgroundImage: "url('todo.jpg')" }}
    >
      <Navbar />
      <div className="hidden md:flex md:flex-col md:items-center justify-center h-full">
        <div className="text-4xl font-bold text-gray-800 flex flex-col items-center  ">
          <p className="text-6xl text-[#361117] sm:block">
            Organize your tasks, boost your productivity,
          </p>{" "}
          <span className="text-[#361117] hidden md:block">and</span>
          <p className="text-6xl text-[#361117] hidden md:block">
            stay on top of your goals—effortlessly!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home
