const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicWVzc3IiLCJhIjoiY2s1aHN0cmk1MDZyOTNmbnYxbXh6cGFtZSJ9.tsqZoTpp5zReuCoSbPAb9w&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services D:', undefined)
        } else if (body.features.length === 0) {
            callback("We just can't seem to find the location you're looking for, please try somewhere else ^^'", undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode
