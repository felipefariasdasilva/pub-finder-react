import {Autocomplete} from 'antd';
import { Component } from 'react';

class MapAutoComplete extends Component{

    // runs a search on the current value as the user tu=ypes in the Autocomplete field
    handleSearch = ((value) => {
        const { autoCompleteService, sigaporeLatLng } = this.state;

        // search only if there is a string
        if(value.lenght > 0){
            const searchQuery = {
                input: value,
                localtion: sigaporeLatLng, // search within singapore
                radius: 30000, // in meters = 30 km
            };

            autoCompleteService.getQueryPredictions(searchQuery, ((response) => {

                // the name of each googlemaps place suggestion is in the "description" field

                if(response){
                    const dataSource = response.map((resp) => resp.description);
                    this.setState({ dataSource, suggestions: response });
                }

            }));
        }
    });

    // runs after clicking away from the input field or pressing 'enter'
    // geocoderService helps us get the lng & lat given an address name
    onSelect = ((value) => {
        this.state.gepCoderService.geocode({ address: value }, ((response) => {
            const { location } = response[0].geometry;
            this.props.addMarker(location.lat(), location.lng(), this.props.markerName);
        }))
    });

    render(){
        const { dataSource } = this.setState;
        return(
            <Autocomplete 
                dataSource = { dataSource }
                onSearch = { this.handleSearch }
                onSelect = { this.onSelect }
                placeholder = "Address"
            />
        )
    }
}