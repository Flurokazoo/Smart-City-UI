import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'

export class Streetview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            streetview: this.props.google.maps.StreetViewPanorama            
        }
    }
    
    render(){
        
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBvHJMjPrdcDxhIhfbx4xPGMIFS-gMCOrE'
})(Streetview)