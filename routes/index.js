const express = require('express');
const DarkSky = require('dark-sky');
const darksky = new DarkSky("84663d4f3b1fcb2ca3f2a3323203a318");
const moment = require('moment');
const router = express.Router();
const geocoder = require("geocoder");

/* GET weather home page. */
router.get('/weather/:location', (req, res, next) => {
    try {
        console.log(moment().week(-1))
        let location = req.params.location
            // convert requested location into lat/long with geocoder package
        geocoder.geocode(location, (err, data) => {
            // console.log(JSON.stringify(data, null, 2))
            const latitude = JSON.stringify(data.results[0].geometry.location.lat, null, 2)
            const longitude = JSON.stringify(data.results[0].geometry.location.lng, null, 2)
                // request the upcoming week's weather from dark sky
            const forecast = darksky
                .options({
                    latitude,
                    longitude,
                    // time: moment().subtract(1, 'days')
                })
                .get()
                .then(resp => {
                    res.status(200).json(resp);
                });
        })
    } catch (err) {
        next(err);
    }
});

module.exports = router;