const request = require('request')
const darksky_access_token = '9bfc58cc643b13d79d6bbde93a7daa8a' // https://darksky.net/dev/docs#forecast-request

const weather = ({longitude, lattitude}, callback) => {
    const url = 'https://api.darksky.net/forecast/' + darksky_access_token +'/' + lattitude + ',' + longitude + '?units=si'
    request({ url: url, json: true }, (error, { body }) => {
        console.log(body)
        if (error) {
            callback('Unable to connect to darksky.net', undefined)
        } else if (body.code !== undefined) {
            callback('Error during usage of weather service!', undefined)
        }
        else {
            const forecastData = body.currently
            callback(undefined, forecastData )
        }
    })
}

module.exports = weather