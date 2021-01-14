const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../../models/tables/user');

module.exports = async (req, res) => {
  try {
    const accessToken = await getAccessToken(req.body.code);
    const { id, nickname, imgUrl } = await getUserInfo(accessToken);
    let userId = await findUserById(id);
    if (!userId) userId = await createUser(id, nickname, imgUrl);
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '4d' });
    res.json({ token });
  } catch (e) {
    console.log(e);
    res.sendStatus(401);
  }
};

const getAccessToken = async (code) => {
  const accessTokenUri = 'https://kauth.kakao.com/oauth/token?grant_type=authorization_code';
  const {
    data: { access_token },
  } = await axios.post(
    `${accessTokenUri}&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}&client_secret=${process.env.KAKAO_CLIENT_SECRET}`,
  );
  return access_token;
};

const getUserInfo = async (accessToken) => {
  const userInfoUri = 'https://kapi.kakao.com/v2/user/me';
  const config = { headers: { Authorization: `Bearer ${accessToken}` } };
  const {
    data: {
      id,
      properties: { nickname, thumbnail_image: imgUrl },
    },
  } = await axios.get(userInfoUri, config);
  return { id, nickname, imgUrl };
};

const findUserById = async (uid) => {
  const result = await User.findOne({ where: { uid } });
  if (!result) return false;
  return result.id;
};

const createUser = async (id, nickname, imgUrl) => {
  const {
    dataValues: { id: newUserId },
  } = await User.create({ uid: id, nickname, thumbnail_img_url: imgUrl, provider: 'kakao' });
  return newUserId;
};
