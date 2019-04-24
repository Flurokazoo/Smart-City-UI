import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import Maps from '../components/Landing/Maps'
import sensorImage from '../img/sensor.png';
import { NavLink } from 'react-router-dom'
import Herosub from './Herosub'

class Singlesector extends Component {
    state = {
        sectorData: null,
        value: null,
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        let coordinates = []
        let res = await axios.get('https://smartcity-parking-api.herokuapp.com/sectors')
        const sectors = await res.data.data
        const sectorsLinks = await Promise.all(sectors.map(sector => axios.get(sector.self_links.detail)))

        sectorsLinks.map((sector, i) => {
            const coordinateArray = sector.data.data.coordinates
            coordinates[i] = {
                latlng: [],
                id: sector.data.data.sector_data.sector_id
            }
            coordinateArray.map(coordinate => {
                let latlng = {
                    lat: parseFloat(coordinate.latitude),
                    lng: parseFloat(coordinate.longitude)
                }
                coordinates[i].latlng.push(latlng)
            })

            coordinates[i].latlng.push({
                lat: parseFloat(coordinateArray[0].latitude),
                lng: parseFloat(coordinateArray[0].longitude)
            })
        })

        this.setState({
            sectorData: sectorsLinks,
            coordinates: coordinates
        })
    }

    handleClick = ({ target }) => {
        this.setState({
            value: target.value,
        })
    }

    render() {
        const { sectorData, value, coordinates } = this.state
        let currentSector
        let currentCoordinates = []
        try {
            for (var i = 0; i < sectorData.length; i++) {
                if (sectorData[i].data.data.sector_data.sector_id == value) {
                    currentSector = sectorData[i].data.data
                    break
                }
            }
        } catch {
        }



        let content, loadedContent

        if (sectorData != null) {
            content =
                <div className="columns">
                    <div className="column">
                        <article class="message is-link" style={{ height: '100%' }}>
                            <div class="message-header">
                                <h2 class='has-text-white'>Choose a sector below:</h2>
                            </div>
                            <div class="message-body">
                                <div class='columns is-multiline'>
                                    {sectorData.map((sector, i) => {
                                        let id = sector.data.data.sector_data.sector_id
                                        return <button style={{ display: 'inline-block', marginLeft: 10 }} onClick={this.handleClick} value={id} class="button is-large is-danger is-outlined">{id}</button>

                                    })}
                                </div>

                            </div>
                        </article>
                    </div>
                    <div className="column">
                    </div>
                </div>

        } else {
            content = <a class="button is-loading is-large">Content is loading</a>
        }

        if (currentSector) {
            console.log(currentSector.sector_data.sector_id)
            // coordinates.map((coordinate, i) => {
            //     if (coordinate.id == value) {
            //         console.log(coordinate)
            //         currentCoordinates.push(coordinate)
            //     }
            // })

            if (currentSector.sector_data.sector_id == 0) {
                currentCoordinates[0] = {
                    id: 0,
                    latlng: [
                        {
                            lat: 51.906642,
                            lng: 4.545139
                        },
                        {
                            lat: 51.906679,
                            lng: 4.545316
                        },
                        {
                            lat: 51.906500,
                            lng: 4.545348
                        },
                        {
                            lat: 51.906494,
                            lng: 4.545203
                        },
                        {
                            lat: 51.906642,
                            lng: 4.545139
                        }
                    ]
                }
            } else if (currentSector.sector_data.sector_id == 1) {
                currentCoordinates[0] = {
                    id: 1,
                    latlng: [
                        {
                            lat: 51.906563,
                            lng: 4.544860
                        },
                        {
                            lat: 51.906450,
                            lng: 4.544903
                        },
                        {
                            lat: 51.906424,
                            lng: 4.544726
                        },
                        {
                            lat: 51.906560,
                            lng: 4.544699
                        },
                        {
                            lat: 51.906563,
                            lng: 4.544860
                        }
                    ]
                }
            }
            console.log(currentCoordinates)

            loadedContent = <div className='content'>
                <h3>Current sector status:</h3>
                <div className="columns">
                    <div className="column is-half">
                        <article className="message is-primary">
                            <div className="message-header">
                                <p>Parking data generated by cluster {currentSector.sector_data.sector_id}</p>
                            </div>
                            <div className="message-body">
                                <div className='list is-size-4'>
                                    <span className="list-item">Current occupation percentage: <span className="has-text-weight-bold"> {currentSector.sector_data.occupance_percentage * 100}</span></span>
                                    <span className="list-item">Last measurement: {moment.unix(currentSector.sector_data.timestamp).calendar()}</span>
                                </div>
                            </div>
                        </article>
                        <h3>Current sensor status:</h3>
                        <div className="columns is-multiline">
                            {currentSector.sensors.map((sensor, i) => {
                                let messageClass
                                if (sensor.parked) {
                                    messageClass = 'message is-danger'
                                } else {
                                    messageClass = 'message is-success'
                                }
                                return <div className="column is-one-third">
                                    <article className={messageClass}>
                                        <div className="message-header">
                                            <p>{sensor.id}</p>
                                        </div>
                                        <div className="message-body">
                                            <img src={sensorImage}></img>
                                        </div>
                                    </article>

                                </div>
                            })}
                        </div>

                    </div>

                    <div className="column">
                        <div style={{
                            width: "100%", height: 500, marginLeft: 0, position: 'relative'
                        }}>
                            <Maps loading={'false'} coordinates={currentCoordinates} />
                        </div>
                        <h2>Load the data of this sector via the following url:</h2>
                        <code>https://smartcity-parking-api.herokuapp.com/sector/{value}</code>

                        <h2>To see historical data generated by this sector, click here:</h2>
                        <NavLink className="button is-link is-large" to={`history/${value}`}>Home</NavLink>


                    </div>


                </div>
            </div>
        }
        return <div className='page'>
            <Herosub />
            <div className="container">
                <div className="content">
                    <section className="section">
                        <h1 className="title is-size-1">Single sector</h1>
                        {content}

                        <hr />

                        {loadedContent}
                    </section>
                </div>
            </div>
        </div>




    }
}

export default Singlesector