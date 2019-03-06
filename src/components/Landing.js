import React, { Component } from 'react';
import './Landing.css'
import axios from 'axios';
import Card from './Card';
import Maps from './Maps';
import Hero from './Hero'



class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: [{}],
            loading: 'initial'
        };
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
            const coordinateArray = sector.data.data.coordinates;
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
        });
        console.log(coordinates);
        this.setState({
            coordinates: coordinates,
            loading: 'false'
        })
    }


    render() {
        const { coordinates, loading } = this.state

        return (

            <div className="Landing">
                <Hero />
                <div class="is-divider" data-content="OR"></div>
                <div className="container" style={{marginTop: 40}}>     

                <div className="content">
                <section className="section">
                <p className="is-size-4">Welcome to the Smart Parking UI. This UI functions as a visual representation of the Smart City API. Within this UI, it's possible to clearly see the results of the various methods found within the API. Below is a list of the various methods found within the API. Each page also contains a few snippets of code to fetch results within your favourite programming language.</p>
                </section>

                
                </div>          
                    
                    <div class="tile is-ancestor ">
                        <div class="tile is-12 is-vertical">
                            <div class="tile">
                                <Card title='Sectors' text='Get an overview of all sectors' image='https://ak0.picdn.net/shutterstock/videos/4140430/thumb/1.jpg' colorClass="is-info" />
                                <Card title='Sector History' text='Get an overview of all sectors' image='https://ak0.picdn.net/shutterstock/videos/4140430/thumb/1.jpg' colorClass="is-warning" />
                                <Card title='Grid' text='Get an overview of all sectors' image='https://ak0.picdn.net/shutterstock/videos/4140430/thumb/1.jpg' colorClass="is-danger" />
                            </div>
                        </div>
                    </div>



                    {/* <Card title='Grid' text='Get an overview of sectors within a grid of choice' image='https://twtg.io/wp-content/uploads/2018/02/Parking_1-1900x800.jpg' />
                        <Card title='History' text='See the history of a given sector' image='https://twtg.io/wp-content/uploads/2018/02/Parking_2-1800x1013.jpg' /> */}

                </div>
                <Maps coordinates={coordinates} loading={loading} />
            </div>
        );
    }
}

export default Landing;
