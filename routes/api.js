const express = require('express');
const router = express.Router();
const axios = require('axios');
const { cekKey } = require('../database/db'); 
const { youtubePlay, youtubeMp4, youtubeMp3 } = require('../controllers/yt');
const { cakLontong, bijak, quotes, fakta, ptl, motivasi } = require('../controllers/randomtext');

router.get('/checkkey', async (req, res) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    res.send({status: 200, apikey: apikey, response: 'Active'});
});

router.get("/api/tools/translate", async (req, res) => {
  const { text } = req.query;
  if (!text) return res.status(400).json({ error: "Text is required." });

  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/tools/translate`, {
      params: { text: text, source: "auto", target: "id" }
    });
    res.json({ status: true, creator: "Rafael", result: response.data.translatedText });
  } catch {
    res.status(500).json({ error: "An error occurred while processing the translation." });
  }
});

router.get('/ytplay', youtubePlay);

router.get('/ytmp4', youtubeMp4);

router.get('/ytmp3', youtubeMp3);

router.get('/caklontong', cakLontong);

router.get('/quotes', quotes);

router.get('/fakta', fakta);

router.get('/bijak', bijak);

router.get('/ptl', ptl);

router.get('/motivasi', motivasi);

module.exports = router;
