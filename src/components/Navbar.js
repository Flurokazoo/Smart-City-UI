import React from 'react'
import Methods from './Methods'
import { NavLink } from 'react-router-dom'

const Navbar = (props) =>
    <nav className="navbar is-primary is-bold" role="navigation" aria-label="main navigation" >
        <div className="navbar-brand">
           

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="nav">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="nav" className="navbar-menu">
            <div className="navbar-start">
                <h2>Smart Parking UI</h2>
            </div>

            <div className="navbar-end">
            <NavLink className='navbar-item' exact to='/'>Home</NavLink>             

                <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">
                        Methods
                    </a>
                       <Methods />
                </div>
                <span className="navbar-item">
                    <a className="button is-primary is-inverted">
                        <span className="icon">
                            <i className="fab fa-github"></i>
                        </span>
                        <span>View on Github</span>
                    </a>
                </span>
            </div>
        </div>

    </nav >

export default Navbar