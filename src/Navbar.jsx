import React,{memo} from 'react';
import { HiOutlineShoppingBag } from "react-icons/hi";
import banner from "./images/banner.jpg";
import { Link } from 'react-router-dom';

function Navbar({totalCount}) {
  return (
    <div className="w-full bg-white">
    <div className = "header flex py-3 px-3 max-w-6xl md:py-4 mx-auto justify-between">
      <img className = "w-20  md:w-36 " src = {banner}></img>
      <div className = "flex flex-col items-center relative">
      <Link to = {"./Cart"} >
        <HiOutlineShoppingBag className= "text-3xl md:text-5xl text-orange-500"/>
        <span className = "absolute bottom-[18px] right-2.5 md:bottom-11 md:right-5">{totalCount}</span>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default memo(Navbar);