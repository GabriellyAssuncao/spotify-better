const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.use(cors())
app.use(bodyParser.json())

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'https://localhost:3002',
        clientID: 'a6e6d78cdbb1466a8af3d64803d5aa00',
        clientSecret: '69ab1e21ae1d462e9d4bf46e69be41f5',
        refreshToken
    })
    spotifyApi
    .refreshAccessToken()
    .then(data => {
        console.log(data.body)
    })
    .catch(() => {
        res.sendStatus(400) 
    })
})

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'https://localhost:3002',
        clientID: 'a6e6d78cdbb1466a8af3d64803d5aa00',
        clientSecret: '69ab1e21ae1d462e9d4bf46e69be41f5',
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch((err) => {
        // console.log(err)
        res.sendStatus(400)
    })
}) 
app.listen(3001)