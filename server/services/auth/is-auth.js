module.exports = async (req, res) => {
  const authorized = !!req.body.uid;
  res.json({ authorized: authorized });
};
