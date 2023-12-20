import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Dashboard = ({children}) => {
  const [isOpen, setIsOpen ] = useState(false);

  const toggleMenu = () => {
      setIsOpen(!isOpen)
  }
  isOpen ? console.log('open menu') : console.log('close menu')
  
  return (
    <>
      <section className="h-screen w-screen overflow-hidden">
        {/* grid grid-cols-12 p-4 gap-3  */}
        <section className="inline-flex gap-3 w-full h-full ">
          <Sidebar toggleMenu={toggleMenu} isOpen={isOpen} />
          {/* lg:col-span-10 md:col-span-10 col-span-11 */}
          <div className="bg-gray-100 rounded-lg p-4 overflow-x-hidden overflow-y-scroll w-full h-full no-scrollbar shadow scroll-smooth transition-all">
            {children}
          </div>
        </section>
      </section>
    </>
  );
};

export default Dashboard;
