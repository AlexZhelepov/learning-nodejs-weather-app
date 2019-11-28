const request = require('request')
const mapbox_access_token = 'pk.eyJ1IjoiYXZ0b2dlbmEiLCJhIjoiY2szZml2aXVyMDRvZDNub3ppYzMzemlvMyJ9.bVq_6PHLOmbQ9lFFJ8pn4Q' // https://docs.mapbox.com/api/search/#endpoints

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + mapbox_access_token + '&limit=1'
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to mapbox.', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find a location. Try another request string', undefined)
        }
        else {
            longitude = body.features[0].center[0]
            lattitude = body.features[0].center[1]
            location = body.features[0].place_name
            callback(undefined, { 
                longitude: longitude, 
                lattitude: lattitude, 
                location: location 
            })
        }
    })
}

module.exports = geocode