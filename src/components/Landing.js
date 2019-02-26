import React, { Component } from 'react';
import './Landing.css'

class Landing extends Component {
    render() {
        console.log(this.props);

        return (
            <div className="Landing">
                <div className="container">
                    <div className="row">
                        <h1 className="display-3">{this.props.title}</h1>
                    </div>
                    <div className="row">
                        <p className="lead">This is the visual representation of the Smart Parking API. It will allow you to see the various available methods visually.</p>
                    </div>
                    <div className="cards">
                        <div className="row">
                            <div className="col-sm">
                                <div className="card text-center">
                                    <div className="card-body">
                                        <h3 className="card-title">Sector overview</h3>
                                        <i className="fas fa-car-side fa-10x"></i>
                                        <p className="card-text">An overview of all sectors</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card text-center">
                                    <div className="card-body">
                                        <h3 className="card-title">Distance overview</h3>
                                        <i className="fas fa-route fa-10x"></i>
                                        <p className="card-text">An overview of all sectors</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card text-center">
                                    <div className="card-body">
                                        <h3 className="card-title">Grid overview</h3>
                                        <i className="fas fa-th fa-10x"></i>
                                        <p className="card-text">An overview of all sectors</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default Landing;
