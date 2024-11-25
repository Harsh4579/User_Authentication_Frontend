import React, { useState } from "react"
import Mainheader from "./Mainheader"
import {Link } from "react-router-dom"
import './MainNavigation.css'
import NavLinks from './NavLinks'
import Backdrop from '../UIElements/Backdrop'
import SideDrawer from './SideDrawer'
const MainNavigation = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const openDrawer = () => {
        setDrawerIsOpen(true);
    };
    const closedrawer = () => {
        setDrawerIsOpen(false);
    };
    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closedrawer} />}
            <SideDrawer show={drawerIsOpen} onClick={closedrawer}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <Mainheader>
                <button className="main-navigation__menu-btn" onClick={openDrawer}>
                <span/>
                <span/>
                <span/>
            </button>
            <h1 className="main-navigation__tile">
            <Link to='/'>Your Place</Link>
            </h1>
            <nav className="main-navigation__header-nav">
                <NavLinks/>
            </nav>
            </Mainheader>
        </React.Fragment>
    );
}
export default MainNavigation;