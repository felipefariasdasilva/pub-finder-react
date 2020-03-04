import GoogleMapReact from 'google-map-react';
import { Component } from 'react';

class MapContainer extends Component{

    render(){
        return(
            <section className = "col-8 h-lg">
                <GoogleMapReact
                    bootstrapURLKeys = {
                        {
                            key: '{AIzaSyCD2T2tsJ_dscVLPfKbCxCywXn5kl6AhlA}',
                            libraries: ['places', 'directions'] 
                        }
                    }
                    defaultZoom = {11} // supports DP, e.g 11.5
                    defaultCenter = {
                        {
                            lat: 1.3521,
                            lng: 103.8198
                        }
                    }
                    yesIWantToUseGoogleMapApiInternals = {true}
                    onGoogleApiLoaded = {({map, maps}) => this.apiHasLoaded(map, maps)}
                >
                </GoogleMapReact>
            </section>
        );
    }
}
