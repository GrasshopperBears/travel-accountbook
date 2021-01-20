/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import MainLayout from '@layouts/MainLayout';
import Map from '@components/map/Map';

const MapPage = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=fb578f337d67b39969420a0b761562a4&autoload=false';
    document.body.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        setMapLoaded(true);
      });
    };
  }, []);

  return <MainLayout isFullpage>{mapLoaded && <Map />}</MainLayout>;
};

export default MapPage;
