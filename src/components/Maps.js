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

        this.handleClick = this.handleClick.bind(this);


    }

    handleClick() {
        console.log(this)
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
        const {mapStyles } = this.props
        console.log(mapStyles)
        const triangleCoords = [
            { lat: 25.774, lng: -80.190 },
            { lat: 18.466, lng: -66.118 },
            { lat: 32.321, lng: -64.757 },
            { lat: 25.774, lng: -80.190 }
        ];

        if (loading === 'initial') {
            return <h2>Intializing...</h2>;
        }


        if (loading === 'true') {
            return <h2>Loading...</h2>;
        }


        if(loading === 'false' && this.state.coordinates) {
            console.log(coordinates[0].latlng)
            return (
                <Map google={this.props.google}
                    style={{ width: '100%', height: '100%', position: 'relative' }}
                    className={'map'}
                    initialCenter={{
                        lat: 51.9120937,
                        lng: 4.534785
                    }}
                    styles={mapStyles}
                    zoom={14}>
                    {coordinates.map(coordinate => {
                        return (
                            <Polygon
                                paths={coordinate.latlng}
                                onClick={this.handleClick}
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
}

MapContainer.defaultProps = {
    
        mapStyles: [{ "featureType": "all", "elementType": "labels", "stylers": [ { "visibility": "on" } ] }, { "featureType": "all", "elementType": "labels.text.fill", "stylers": [ { "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 } ] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [ { "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 } ] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [ { "color": "#000000" }, { "lightness": 20 } ] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [ { "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 } ] }, { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [ { "color": "#e5c163" } ] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [ { "color": "#c4c4c4" } ] }, { "featureType": "administrative.neighborhood", "elementType": "labels.text.fill", "stylers": [ { "color": "#e5c163" } ] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [ { "color": "#000000" }, { "lightness": 20 } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#000000" }, { "lightness": 21 }, { "visibility": "on" } ] }, { "featureType": "poi.business", "elementType": "geometry", "stylers": [ { "visibility": "on" } ] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [ { "color": "#e5c163" }, { "lightness": "0" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [ { "color": "#e5c163" } ] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "color": "#000000" }, { "lightness": 18 } ] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [ { "color": "#575757" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.stroke", "stylers": [ { "color": "#2c2c2c" } ] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [ { "color": "#000000" }, { "lightness": 16 } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#999999" } ] }, { "featureType": "transit", "elementType": "geometry", "stylers": [ { "color": "#000000" }, { "lightness": 19 } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#000000" }, { "lightness": 17 } ] } ]
    }

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBvHJMjPrdcDxhIhfbx4xPGMIFS-gMCOrE'
})(MapContainer)