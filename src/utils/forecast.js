const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a3cde25ebc738fb4e43fe3acc6bc652d/' + longitude + ',' + latitude + '?units=si'

    request ({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service D:', undefined)
        } else if(body.error) {
            callback('Unable to find location :/', undefined)
        } else {
            callback(undefined, "At the moment it's " + body.currently.summary.toLowerCase() + '.\n' +
            "Todays forecast is " + body.daily.data[0].summary.toLowerCase() + 
            '\nIt is currently ' + body.currently.temperature + ' degrees outside with a ' + body.currently.precipProbability + '% chance of rain.'
            )
        }
    })
}


module.exports = forecast