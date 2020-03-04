import GoogleMapReact from 'google-map-react';
import React, { Component } from 'react';

class MapContainer extends Component{

    handleSearch = (() => {

        const { mapsApi, directionService, placesService } = this.state;
        const filteredResults = [];
        const timeLimitInMinutes = 180;
        
        // 1. create places request
        const placesRequest = {
            location: new mapsApi.LatLng(1.3521, 103.8198),
            type: ['restaurant', 'cafe'],
            query: 'ice cream',
            rankBy: mapsApi.places.rankBy.DISTANCE,
            //radius: 30000,
        };

        // 2. Search for ice cream shops. returns max 20 results
        placesService.textSearch( placesRequest, ((response) => {

            // 3. calculate traveling time for each location
            for(let i = 0; i < response.length; i++){
                const iceCreamPlace = response[i];
                const { rating, name } = iceCreamPlace;
                const address = iceCreamPlace.formatted_address; // e.g 80 mandai lake

                // 4. create direction request for each location
                const directionRequest = {
                    origin: new mapsApi.LatLng(1.3521, 103.8198), // from
                    destination: address, // to
                    travelMode: 'DRIVING',
                };

                // 5. make request
                directionService.route(directionRequest, ((result, status) => {
                    if(status !== 'OK') { return }
                    const travellingRoute = result.routes[0].legs[0];
                    const travelingTimeInMinutes = travellingRoute.duration.value / 60;

                    // 6. places within limit are added to results
                    if(travelingTimeInMinutes < timeLimitInMinutes){
                        filteredResults.push(name);
                    }
                }));

                // 7. return results in state
                this.setState({ searchResults: filteredResults });

            }

        }));
    });

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
                    onGoogApiLoaded = {({map, maps}) => this.apiHasLoaded(map, maps)}
                >
                </GoogleMapReact>
            </section>
        );
    }
}

export default MapContainer;