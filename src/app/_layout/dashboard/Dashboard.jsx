import React from "react";
import Sidebar from "./Sidebar";

const Dashboard = ({children}) => {
  return (
    <>
      <section className="h-screen w-screen overflow-x-hidden overflow-y-scroll">
        <section className="grid grid-cols-12 p-4 gap-3 w-full h-full">
          <Sidebar />
          <div className="lg:col-span-10 md:col-span-10 col-span-10 bg-gray-100 rounded-lg p-4 overflow-x-hidden overflow-y-scroll w-full h-full shadow">
            {children}
          </div>
        </section>
      </section>
    </>
  );
};

export default Dashboard;
