import axios from 'axios';

const searchApiUri = 'https://dapi.kakao.com/v2/local/search/keyword.json?query=';

const searchPlaces = async (placeName) => {
  const headers = { Authorization: `KakaoAK ${process.env.REACT_APP_REST_API_KEY}` };
  const response = await axios.get(`${searchApiUri}${placeName}`, { headers });
  if (response.status === 200) return response.data.documents;
  else return [];
};

export default searchPlaces;
