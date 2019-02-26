import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polygon } from 'google-maps-react';
import axios from 'axios';


export class MapContainer extends Component {

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

        axios.get('https://smartcity-parking-api.herokuapp.com/sectors')
            .then(res => {
                const sectors = res.data.data
                let coordinates = []
                sectors.map((sector, i) => {
                    axios.get(sector.self_links.detail)
                        .then(res => {
                            const coordinateArray = res.data.data.coordinates
                            coordinates[i] = {
                                latlng: [],
                                id: res.data.data.sector_data.sector_id
                            }
                            coordinateArray.map(coordinate => {
                                let latlng = {
                                    lat: coordinate.latitude,
                                    lng: coordinate.longitude
                                }
                                coordinates[i].latlng.push(latlng)
                            })

                            coordinates[i].latlng.push({
                                lat: coordinateArray[0].latitude,
                                lng: coordinateArray[0].longitude
                            })

                        })
                })
                this.setState({
                    coordinates: coordinates,
                    loading: 'false'
                })
            })
    }
    render() {

        const { coordinates, loading } = this.state
        let array = ['kaas,', 'worst']
        console.log(array)

        const triangleCoords = [
            { lat: 25.774, lng: -80.190 },
            { lat: 18.466, lng: -66.118 },
            { lat: 32.321, lng: -64.757 },
            { lat: 25.774, lng: -80.190 }
        ];

        if (loading === 'initial') {
            console.log('This happens 2nd - after the class is constructed. You will not see this element because React is still computing changes to the DOM.');
            return <h2>Intializing...</h2>;
        }


        if (loading === 'true') {
            console.log('This happens 5th - when waiting for data.');
            return <h2>Loading...</h2>;
        }


        if(loading === 'false') {
            console.log(coordinates)
            return (
                <Map google={this.props.google}
                    style={{ width: '100%', height: '100%', position: 'relative' }}
                    className={'map'}
                    initialCenter={{
                        lat: 51.9120937,
                        lng: 4.534785
                    }}
                    zoom={14}>
                    {/* {coordinates.map(coordinate => {
                        return (
                            <Polygon
                                paths={coordinate.latlng}
                                strokeColor="#0000FF"
                                strokeOpacity={0.8}
                                strokeWeight={2}
                                fillColor="#0000FF"
                                fillOpacity={0.35} />
                        )
                    })} */}
                    <Polygon
                        paths={triangleCoords}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        fillColor="#0000FF"
                        fillOpacity={0.35} />
                </Map>
            );

        }
        
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBvHJMjPrdcDxhIhfbx4xPGMIFS-gMCOrE'
})(MapContainer)