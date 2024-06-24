const express = require("express")
const router = express.Router()
const axios = require("axios")

router.get('/games/:category', async (req, res) => {
    try {
        const category = req.params.category
        const response = await axios(`https://www.freetogame.com/api/games?category=${category}`)
        res.status(200).json(response.data)
    } catch (error) {
        console.log(error)
    }
})

router.get('/game/:id', async (req, res) => {
    try {
        const id = req.params.id
        const response = await axios(`https://www.freetogame.com/api/game?id=${id}`)
        res.status(200).json(response.data)
    } catch (error) {
        console.log(error)
    }
})

module.exports = { router }