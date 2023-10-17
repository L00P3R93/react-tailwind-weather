import React from 'react'
import { RiHome2Line, RiSearchLine } from 'react-icons/ri'
import { MdOutlineExplore } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const SegmentsNav = () => {
    return (
        <nav className="w-full rounded-tl-3xl rounded-tr-3xl bg-neutral-900 lg:hidden text-gray-400 fixed bottom-0">
            <ul className="w-full flex py-6 text-xl justify-evenly">
                <NavLink to="/" activeClassName="segment-link" exact>
                    <li className="p-1.5 cursor-pointer">
                        <RiHome2Line />
                    </li>
                </NavLink>
                <NavLink to="/search" activeClassName="segment-link">
                    <li className="p-1.5 cursor-pointer">
                        <RiSearchLine />
                    </li>
                </NavLink>
                <NavLink to="/explore" activeClassName="segment-link">
                    <li className="p-1.5 cursor-pointer">
                        <MdOutlineExplore />
                    </li>
                </NavLink>
                <NavLink to="/setting" activeClassName="segment-link">
                    <li className="p-1.5 cursor-pointer">
                        <IoSettingsOutline />
                    </li>
                </NavLink>
            </ul>
        </nav>
    )
}

export default SegmentsNav;