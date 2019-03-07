import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = (props) =>
    <nav className="navbar is-primary is-bold" role="navigation" aria-label="main navigation" >
        <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
            </a>

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="nav">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="nav" className="navbar-menu">
            <div className="navbar-start">              
                <NavLink className='navbar-item' exact to='/'>Home</NavLink>

                <a className="navbar-item">
                    Documentation
                </a>

                <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">
                        Methods
                    </a>

                    <div className="navbar-dropdown">
                        <a className="navbar-item">
                            All sectors
                        </a>
                        <a className="navbar-item">
                            Single sector
                        </a>
                        <a className="navbar-item">
                            Sector history
                        </a>
                        <a className="navbar-item">
                            Sectors within grid
                        </a>
                        <a className="navbar-item">
                            Sectors within distance
                        </a>
                    </div>
                </div>
            </div>

            <div className="navbar-end">
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