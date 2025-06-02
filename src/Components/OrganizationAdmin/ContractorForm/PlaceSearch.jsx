// import { useEffect, useRef } from 'react';

// const PlaceSearch = ({ onAddressSelect ,type}) => {
//   const inputRef = useRef(null);

//   useEffect(() => {
//     const loadGoogleMaps = () => {
//       const options = {
//         fields: ['address_components', 'formatted_address', 'geometry'],
//         types: ['geocode'],
//       };

//       const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, options);

//       autocomplete.addListener('place_changed', () => {
//         const place = autocomplete.getPlace();
//         const components = place.address_components;
//         if (!components) return;

//         const getComponent = (type) =>
//           components.find((comp) => comp.types.includes(type))?.long_name;

//         const parsedAddress = {
//           fullAddress: place.formatted_address,
//           street: getComponent('route'),
//           suburb: getComponent('sublocality') || getComponent('neighborhood'),
//           city: getComponent('locality') || getComponent('administrative_area_level_2'),
//           state: getComponent('administrative_area_level_1'),
//           postalCode: getComponent('postal_code'),
//           country: getComponent('country'),
//         };

//         onAddressSelect(parsedAddress);
//       });
//     };

//     if (!window.google) {
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB-EVjH_5VfSycKL4fJeLy1l-BsLWCyN6c&libraries=places`;
//       script.async = true;
//       script.defer = true;
//       script.onload = loadGoogleMaps;
//       document.body.appendChild(script);
//     } else {
//       loadGoogleMaps();
//     }
//   }, [onAddressSelect]);

//   return (
//     <input
//       ref={inputRef}
//       type="text"
//       placeholder="Street number, name etc..."
//       style={{ width: '100%', padding: '7px', fontSize: '16px', marginBottom: '20px',border:'1px solid rgb(222, 226, 230)',borderRadius:"5px" }}
//     />
//   );
// };

// export default PlaceSearch;

import React, { useEffect, useRef, useState } from 'react';

const PlaceSearch = ({ onAddressSelect, type }) => {
  const inputRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      const options = {
        fields: ['address_components', 'formatted_address', 'geometry'],
        types: ['geocode'],
      };

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, options);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const components = place.address_components;
        if (!components) return;

        const getComponent = (type) =>
          components.find((comp) => comp.types.includes(type))?.long_name;

        const parsedAddress = {
          fullAddress: place.formatted_address,
          street: getComponent('route'),
          suburb: getComponent('sublocality') || getComponent('neighborhood'),
          city: getComponent('locality') || getComponent('administrative_area_level_2'),
          state: getComponent('administrative_area_level_1'),
          postalCode: getComponent('postal_code'),
          country: getComponent('country'),
          location: {
            lat: place.geometry?.location?.lat(),
            lng: place.geometry?.location?.lng(),
          },
        };

        setSelectedPlace(parsedAddress);
        onAddressSelect(parsedAddress);
      });
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB-EVjH_5VfSycKL4fJeLy1l-BsLWCyN6c&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = loadGoogleMaps;
      document.body.appendChild(script);
    } else {
      loadGoogleMaps();
    }
  }, [onAddressSelect]);

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        placeholder="Street number, name etc..."
        style={{
          width: '100%',
          padding: '7px',
          fontSize: '16px',
          marginBottom: '20px',
          border: '1px solid rgb(222, 226, 230)',
          borderRadius: '5px',
        }}
      />

      {/* Show address + map preview only if type is induction and address is selected */}
      {type === 'induction' && selectedPlace && (
        <div
          style={{
            border: '1px solid #d0d0d0',
            borderRadius: '6px',
            padding: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            marginTop: '10px',
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold' }}>{selectedPlace.street}</div>
            <div>{selectedPlace.suburb}</div>
            <div>{selectedPlace.city}</div>
            <div>{selectedPlace.state}</div>
            <div>{selectedPlace.postalCode}</div>
            <div>{selectedPlace.country}</div>
          </div>
          <div style={{ flex: 1 }}>
            <iframe
              title="map"
              width="100%"
              height="150"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps?q=${selectedPlace.location.lat},${selectedPlace.location.lng}&hl=es;z=14&output=embed`}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceSearch;
