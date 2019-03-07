import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polygon } from 'google-maps-react'

export class MapContainer extends Component {   
    
    render() {
        console.log(this.props)

        const { coordinates, loading, mapStyles } = this.props
       
        if (loading === 'initial') {
            return <h2>Intializing...</h2>
        }


        if (loading === 'true') {
            return <h2>Loading...</h2>
        }


        if(loading === 'false' && coordinates) {
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
                                strokeColor="#9d63e5"
                                strokeOpacity={1}
                                strokeWeight={2}
                                fillColor="#9d63e5"
                                fillOpacity={0.35} />
                        )
                    })}                    
                </Map>
            )
        }        
    }
}

MapContainer.defaultProps = { mapStyles: [ { "featureType": "all", "elementType": "geometry.fill", "stylers": [ { "weight": "2.00" } ] }, { "featureType": "all", "elementType": "geometry.stroke", "stylers": [ { "color": "#9c9c9c" } ] }, { "featureType": "all", "elementType": "labels.text", "stylers": [ { "visibility": "on" } ] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [ { "saturation": "-100" }, { "gamma": "1" }, { "lightness": "30" }, { "weight": "1" } ] }, { "featureType": "landscape", "elementType": "geometry.stroke", "stylers": [ { "lightness": "0" }, { "gamma": "1" }, { "visibility": "off" } ] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [ { "visibility": "simplified" }, { "gamma": "0.59" }, { "lightness": "36" } ] }, { "featureType": "poi", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "saturation": "-100" } ] }, { "featureType": "poi", "elementType": "labels.text.stroke", "stylers": [ { "saturation": "-100" } ] }, { "featureType": "poi", "elementType": "labels.icon", "stylers": [ { "saturation": "-100" } ] }, { "featureType": "poi.attraction", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "all", "stylers": [ { "color": "#ffffff" }, { "visibility": "off" } ] }, { "featureType": "road", "elementType": "all", "stylers": [ { "saturation": -100 }, { "lightness": 45 } ] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "color": "#929292" } ] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.highway", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "elementType": "all", "stylers": [ { "visibility": "on" }, { "lightness": "1" }, { "gamma": "1" } ] }, { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [ { "color": "#00baff" } ] }, { "featureType": "transit", "elementType": "labels.icon", "stylers": [ { "hue": "#00baff" } ] }, { "featureType": "water", "elementType": "all", "stylers": [ { "color": "#00baff" }, { "visibility": "on" } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#00baff" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#ffffff" }, { "saturation": "-100" } ] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [ { "color": "#ffffff" }, { "visibility": "off" } ] } ] }

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBvHJMjPrdcDxhIhfbx4xPGMIFS-gMCOrE'
})(MapContainer)