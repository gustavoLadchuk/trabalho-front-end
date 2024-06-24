const express = require("express")
const server = express()
const { router } = require("./routes/games")

const cors = require("cors")


server.use(express.json())

server.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET"]
}))

server.use('/api', router)

server.get("/health", (req, res) => {
    res.json({
        status: "Running"
    })
})




const port = 5000

server.listen(port, () => {
    console.log("servidor rodando na porta " + port)
})