import React, { Component } from 'react'
import './Landing.css'
import axios from 'axios'
import Card from './Card'
import Maps from './Maps'
import Hero from './Hero'



class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            coordinates: [{}],
            loading: 'initial'
        }
    }

    componentDidMount() {
        this.setState({
            loading: 'true'
        })
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
        console.log(coordinates)
        this.setState({
            coordinates: coordinates,
            loading: 'false'
        })
    }


    render() {
        const { coordinates, loading } = this.state

        return (

            <div className="page">
                <Hero />
                <div class="is-divider" data-content="OR"></div>
                <div className="container" style={{ marginTop: 40 }}>

                    <div className="content">
                        <section className="section">
                            <p className="is-size-4">Welcome to the Smart Parking UI. This UI functions as a visual representation of the Smart City API. Within this UI, it's possible to clearly see the results of the various methods found within the API. Below is a list of the various methods found within the API. Each page also contains a few snippets of code to fetch results within your favourite programming language.</p>
                        </section>


                    </div>

                    <div class="tile is-ancestor ">
                        <div class="tile is-12 is-vertical">
                            <div class="tile">
                                <Card title='All sectors' text='Get an overview of all sectors' colorClass="is-info" route='/sectors' />
                                <Card title='Single sector' text='Get an overview of all sectors' colorClass="is-danger" route='/single' />
                                <Card title='Sector history' text='Get an overview of all sectors' colorClass="is-info" route= '/history' />
                            </div>
                        </div>
                    </div>
                    <div class="tile is-ancestor ">
                        <div class="tile is-12 is-vertical">
                            <div class="tile">
                                <Card title='Sectors within grid' text='Get an overview of all sectors' colorClass="is-danger" route='/grid' />
                                <Card title='Sectors within distance' text='Get an overview of all sectors' colorClass="is-info" route='/distance' />
                            </div>
                        </div>
                    </div>
                </div>
                <Maps coordinates={coordinates} loading={loading} />
            </div>
        )
    }
}

export default Landing
