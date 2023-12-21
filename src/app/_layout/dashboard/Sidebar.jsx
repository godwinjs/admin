"use client"

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import dashboardRoutes from "./dashboardRoutes";

const Sidebar = ({toggleMenu, isOpen}) => {
  const pathname = usePathname();
  const router = useRouter();
  
  return (
    <>
      {/* overflow-x-hidden overflow-y-scroll lg:col-span-2 md:col-span-2 col-span-1 */}
      <section className={`${isOpen ? 'w-[50%]' : 'w-[10%]'} no-scrollbar overflow-y-scroll ${isOpen ? 'lg:w-[50%]' : 'lg:w-[25%]'} ${isOpen ? 'md:w-[50%]' : 'md:w-[8%]'} bg-gray-100/70 shadow lg:p-4 md:p-4 p-2 rounded-lg transition-all`}>
        {/* gap-y-4 */}
        <ul className="flex flex-col h-full gap-y-1">
          <li onClick={toggleMenu} className="transition-all mb-4 lg:hidden font-medium text-xs overflow-hidden text-ellipsis whitespace-nowrap">
            {isOpen ? <Cancel width="20" height="20" className={`lg:h-6 md:h-10 m-h-8 lg:w-6 md:w-10 w-8 lg:mx-0 transition-all ${isOpen ? 'ml-auto' : ''}`} />  : <Menu width="20" height="20" className={`transition-all lg:h-6 md:h-10 m-h-8 lg:w-6 md:w-10 w-8 lg:mx-0 ${isOpen ? 'ml-auto' : ''}'}`} />}
          </li>
          <hr />
          <li onClick={() => router.push("/")} className="transition-all font-medium text-lg overflow-hidden text-ellipsis whitespace-nowrap flex gap-x-2 items-center">
            <HiChartPie width="20" height="20" className="lg:h-6 md:h-10 h-8 lg:w-6 md:w-10 w-8 max-w-fit lg:mx-0 md:mx-auto" />
            <span className={`${isOpen ? 'inline-block' : 'hidden'}`}>{" "}</span>
            <span
              className={`${isOpen ? 'inline-block' : 'hidden'} transition-all lg:inline-block cursor-pointer text-xs lg:text-lg`}
            >
              Dashboard
            </span>
          </li>
          <hr />

          {dashboardRoutes.map((dashboardRoute, index) => {
            return(
            <li key={index} onClick={() => router.push(process.env.NEXT_PUBLIC_ORIGIN_URL + dashboardRoute.anchor)} className="p-1 rounded-lg">
              <div
                className={`overflow-hidden text-ellipsis whitespace-nowrap flex gap-x-2 items-center hover:underline ${
                  pathname.includes(dashboardRoute.anchor)
                    ? "border-l-2 pl-2 text-slate-500"
                    : null
                }`}
              >
                {dashboardRoute.icon}
                <span className={`${isOpen ? 'inline-block' : 'hidden'} lg:inline-block`}>{" "}</span>
                <span className={`${isOpen ? 'inline-block' : 'hidden'} lg:inline-block cursor-pointer text-xs lg:text-lg`}>
                  {dashboardRoute.name}
                </span>
              </div>
            </li>
          )})}

          {/* redirect to home route */}
          <li className="mt-auto">
            <Link
              href={`${process.env.NEXT_PUBLIC_HOME_URL}`}
              className="overflow-hidden text-ellipsis whitespace-nowrap flex gap-x-1 items-center hover:underline"
            >
              <HiHome width="20" height="20" className="lg:h-5 md:h-10 h-8 lg:w-5 md:w-10 w-8 lg:mx-0 md:mx-auto" />
              <span className={`${isOpen ? 'inline-block' : 'hidden'} lg:inline-block`}>{" "}</span>
              <span className={`${isOpen ? 'inline-block' : 'hidden'} transition-all lg:inline-block cursor-pointer text-xs lg:text-lg`}>Back to Home</span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
};

function HiChartPie(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="bi bi-pie-chart-fill"
      viewBox="0 0 16 16"
    >
      <path d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 0 0 8.5.015z" />
    </svg>
  );
}

function HiHome(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="bi bi-house-door"
      viewBox="0 0 16 16"
    >
      <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
    </svg>
  );
}
function Menu(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" {...props} viewBox="0 0 50 50">
    <path d="M 5 9 L 5 11 L 45 11 L 45 9 L 5 9 z M 5 24 L 5 26 L 45 26 L 45 24 L 5 24 z M 5 39 L 5 41 L 45 41 L 45 39 L 5 39 z"></path>
    </svg>
  )
}
function Cancel(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" {...props} viewBox="0 0 50 50">
    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
    </svg>
  )
}

export default Sidebar;
