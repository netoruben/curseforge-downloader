const express = require('express')
const fetch = require('node-fetch')
require('dotenv').config()

const server = express()
const CURSEFORGE_API_URL = 'https://api.curseforge.com/v1'
const CURSEFORGE_API_HEADERS = { 'Accept': 'application/json', 'x-api-key': process.env.CURSEFORGE_API_KEY }

server.use(express.json())

server.get('/curseforge/games', async (req, rep) => {
    await fetch(`${CURSEFORGE_API_URL}/games`, { method: 'GET', headers: CURSEFORGE_API_HEADERS})
    .then(async (response) => {
        const data = await response.json()
        rep.send(data.data)
    })
    .catch((err) => {
        rep.send(err)
    })
})

server.get('/curseforge/games/:gameID/categories', async (req, rep) => {
    const gameID = req.params.gameID
    await fetch(`${CURSEFORGE_API_URL}/categories?gameId=${gameID}`, { method: 'GET', headers: CURSEFORGE_API_HEADERS})
    .then(async (response) => {
        const data = await response.json()
        rep.send(data.data)
    })
    .catch((err) => {
        rep.send(err)
    })
})

server.get('/curseforge/games/:gameID/main-categories/:classID/mods/search/:searchFilter', async (req, rep) => {
    const gameID = req.params.gameID
    const classID = req.params.classID
    const searchFilter = encodeURIComponent(req.params.searchFilter)
    await fetch(`${CURSEFORGE_API_URL}/mods/search?gameId=${gameID}&classId=${classID}&searchFilter=${searchFilter}&sortField=2&sortOrder=desc`, { method: 'GET', headers: CURSEFORGE_API_HEADERS})
    .then(async (response) => {
        const data = await response.json()
        rep.send(data.data)
    })
    .catch((err) => {
        rep.send(err)
    })
})

server.get('/curseforge/mods/:modID/files/:fileID', async (req, rep) => {
    const modID = req.params.modID
    const fileID = req.params.fileID
    await fetch(`${CURSEFORGE_API_URL}/mods/${modID}/files/${fileID}`, { method: 'GET', headers: CURSEFORGE_API_HEADERS})
    .then(async (response) => {
        const data = await response.json()
        rep.send(data.data)
    })
    .catch((err) => {
        rep.send(err)
    })
})

server.listen(3001)