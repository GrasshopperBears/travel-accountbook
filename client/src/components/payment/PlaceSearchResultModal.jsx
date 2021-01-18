import React, { useEffect, useState } from 'react';
import { Modal, Spin, List, Button, Row, Col } from 'antd';
import styled from 'styled-components';
import service from '@services/payment';

const PlaceSearchResultModal = ({ visible, onCancel, placeName, onSelect }) => {
  const [loading, setLoading] = useState(false);
  const [placeList, setPlaceList] = useState([]);
  const searchPlaces = async () => {
    setPlaceList(await service.searchPlaces(placeName));
    setLoading(false);
  };
  const selectPlaceHandler = (place) => {
    onSelect(place);
    onCancel();
  };

  useEffect(() => {
    if (visible) {
      setLoading(true);
      searchPlaces();
    }
  }, [visible]);

  return (
    <Modal visible={visible} onCancel={onCancel} footer={<Button onClick={onCancel}>취소</Button>}>
      {loading ? (
        <LoadingSpin />
      ) : (
        <List
          dataSource={placeList}
          locale={{ emptyText: '검색 결과가 없습니다' }}
          renderItem={(place) => <PlaceInfo place={place} onSelect={selectPlaceHandler} />}
        />
      )}
    </Modal>
  );
};

const PlaceInfo = ({ place, onSelect }) => {
  return (
    <div style={{ padding: '0.5rem 2rem', borderBottom: '1px solid #e8e8e8' }}>
      <Row>
        <Col flex='1'>
          <b>{place.place_name}</b>
        </Col>
        <Col>
          <Button
            type='primary'
            onClick={() => {
              onSelect(place);
            }}
          >
            선택
          </Button>
        </Col>
      </Row>
      <Row>{place.address_name}</Row>
    </div>
  );
};

const LoadingSpin = styled(Spin)`
  width: 100%;
`;

export default PlaceSearchResultModal;
