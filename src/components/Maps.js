import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polygon } from 'google-maps-react';
import axios from 'axios';


export class MapContainer extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            coordinates: []
        };
    }
    componentDidMount() {

        axios.get('https://smartcity-parking-api.herokuapp.com/sectors')
            .then(res => {
                const sectors = res.data.data
                sectors.map((sector, i) => {
                    axios.get(sector.self_links.detail)
                        .then(res => {
                            console.log(res.data.data.sector_data.sector_id)
                            const coordinateArray = res.data.data.coordinates
                            this.state.coordinates[i] = {
                                latlng: [],
                                id: res.data.data.sector_data.sector_id
                            }
                            coordinateArray.map(coordinate => {
                                let latlng = {
                                    lat: coordinate.latitude,
                                    lng: coordinate.longitude
                                }
                                console.log(i)

                                this.state.coordinates[i].latlng.push(latlng)
                            })
                            // .then(res =>{
                            //     console.log(res)
                            // })
                        })
                })

            })
    }
    render() {

        const coordinates = this.state.coordinates
        console.log(Object.values(this.state.coordinates[0]))

        const triangleCoords = [
            { lat: 25.774, lng: -80.190 },
            { lat: 18.466, lng: -66.118 },
            { lat: 32.321, lng: -64.757 },
            { lat: 25.774, lng: -80.190 }
        ];

        console.log(coordinates)
        let polygons = <Polygon
            paths={triangleCoords}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#0000FF"
            fillOpacity={0.35} />

        return (
            <Map google={this.props.google}
                style={{ width: '100%', height: '100%', position: 'relative' }}
                className={'map'}
                initialCenter={{
                    lat: 51.9120937,
                    lng: 4.534785
                }}
                zoom={14}>
                {this.state.coordinates.map(coordinate => {
                    console.log(coordinate)
                    return (
                    <Polygon
                    paths={coordinate.latlng}
                    strokeColor="#0000FF"
                    strokeOpacity={0.8}
                    strokeWeight={2}
                    fillColor="#0000FF"
                    fillOpacity={0.35} />
                    )
                })}
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

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBvHJMjPrdcDxhIhfbx4xPGMIFS-gMCOrE'
})(MapContainer)