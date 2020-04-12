import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';

// examples:
import GoogleMap from '../components/GoogleMap';

// consts: [34.0522, -118.2437]
import LOS_ANGELES_CENTER from '../userlocation';

const getInfoWindowString = place => `
    <div>
      <div style="font-size: 16px;">
        ${place.Name.stringValue}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        Danger Rating: 
        </span>
        <span style="color: orange;">${String.fromCharCode(9733).repeat(7-Math.floor(place.squareFeet.integerValue / place.numOfPeople.integerValue * 3.14 / 1000))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(3+Math.floor(place.squareFeet.integerValue / place.numOfPeople.integerValue * 3.14 / 1000))}</span>
      </div>
      <div style="font-size.: 14px; color: grey;">
        ${place.Address.stringValue}
      </div>
      <div style="font-size: 14px; color: green;">
        ${'Open'}
      </div>
    </div>`;

// Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
const handleApiLoaded = (map, maps, places) => {
  const markers = [];
  const infowindows = [];

  places.forEach((place) => {
    markers.push(new maps.Marker({
      position: {
        lat: place.geo.geoPointValue.latitude,
        lng: place.geo.geoPointValue.longitude,
      },
      map,
    }));

    infowindows.push(new maps.InfoWindow({
      content: getInfoWindowString(place),
    }));
  });

  markers.forEach((marker, i) => {
    marker.addListener('click', () => {
      infowindows[i].open(map, marker);
    });
  });
};

class MarkerInfoWindowGmapsObj extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    fetch('places.json')
      .then(response => response.json())
      .then((data) => {
        data.results.forEach((result) => {
          result.show = false; // eslint-disable-line no-param-reassign
        });
        this.setState({ places: data.results });
      });
  }

  render() {
    const { places } = this.state;

    return (
      <Fragment>
        {!isEmpty(places) && (
          <GoogleMap
            defaultZoom={10}
            defaultCenter={LOS_ANGELES_CENTER}
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}
          />
        )}
      </Fragment>
    );
  }
}

export default MarkerInfoWindowGmapsObj;
