"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'


const Navbar = () =>
{
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() =>
  {
    setIsLoaded(true)
  }, []);

  return (<>
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-slate-600 ">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          {isLoaded && <FontAwesomeIcon color='white' cursor='pointer' size='xl' icon={faChartSimple} />}
          <a
            className="text-md font-bold leading-relaxed inline-block mr-4 ml-2 py-2 whitespace-nowrap uppercase text-white"
            href="#pablo"
          >
            Risk Visualization by Tanishq Talreja
              </a>
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"

          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            " flex"
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
          </ul>
        </div>
      </div>
    </nav>
  </>
  );
}

export default Navbar;