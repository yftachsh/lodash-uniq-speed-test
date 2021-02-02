const unique = array => 
    [...new Set(
        array.map(JSON.stringify)
    )].map(JSON.parse)

module.exports = unique;
