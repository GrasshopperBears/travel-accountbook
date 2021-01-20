/* eslint-disable no-undef */
import React, { useEffect, useRef } from 'react';

const Map = () => {
  const ref = useRef(undefined);

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
    };

    new kakao.maps.Map(ref.current, options);
  }, []);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      지도
    </div>
  );
};

export default Map;
