import React from 'react'

const Hero = (props) =>
    <section className="hero is-primary is-bold">
        <div className="hero-head">
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <h3 className="navbar-item subtitle">
                            Smart City Parking UI
                        </h3>
                        <span className="navbar-burger burger" data-target="navbarMenuHeroA">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>
                    <div id="navbarMenuHeroA" className="navbar-menu">
                        <div className="navbar-end">
                            <a className="navbar-item is-active">
                                Home
                             </a>
                            <a className="navbar-item">
                                Documentation
                            </a>
                            <a className="navbar-item">
                                Methods
                            </a>

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
            </nav>
        </div>

        <div className="hero-body">
            <div className="container has-text-centered">
                <h1 className="title">
                    Smart City Parking UI
      </h1>
                <h2 className="subtitle">
                    A visual representation of the Smart City Parking API
      </h2>
            </div>
        </div>

        <div className="hero-foot">
            <nav className="tabs">
                <div className="container">
                    <ul>
                        <li className="is-active"><a>Overview</a></li>
                        <li><a>Methods</a></li>
                        <li><a>Sector overview</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </section>

export default Hero
