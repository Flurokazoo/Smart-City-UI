import React from 'react'
import Methods from './Methods'
import { NavLink } from 'react-router-dom'

const Herosub = (props) =>
    <section class="hero is-primary is-medium is-bold">
        <div class="hero-head">
            <div id="nav" className="navbar-menu">              

                <div className="navbar-end">
                    <NavLink className='navbar-item' exact to='/'>Home</NavLink>
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
        </div>
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    {props.title}
                </h1>

            </div>
        </div>
        <div class="hero-foot">
            <nav class="tabs is-boxed is-fullwidth">
                <div class="container">
                    <ul>
                        <li class="is-active">
                            <NavLink exact to='/sectors'>All sectors</NavLink>
                        </li>
                        <li>
                            <NavLink exact to='/single'>Single sector</NavLink>
                        </li>
                        <li>
                            <NavLink exact to='/history'>Sector history</NavLink>
                        </li>
                        <li>
                            <NavLink exact to='/grid'>Sectors within coordinates</NavLink>
                        </li>
                        <li>
                            <NavLink exact to='/distance'>Sectors within distance</NavLink>
                        </li>                 
                    </ul>
                </div>
            </nav>
        </div>
    </section>

export default Herosub
