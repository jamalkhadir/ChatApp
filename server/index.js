const express = require("express")
const {Server} = require("socket.io")
const http = require("http")
const {addUser, removeUser, getUser, getUsersInRoom} = require("./users")
const application = express()
const server = http.createServer(application)
const cors = require("cors")
const io = new Server(server, {
    cors:{
        origin: "*"
    }
})
const PORT = process.env.PORT || 5000
const router = require("./router")

io.on("connection", (socket) => {
    socket.on("join", ({display, room}, callback) => {
        const{error, user} = addUser({id: socket.id, display, room})
        if(error) return callback(error)
        socket.emit("message", {user: "SYSTEM", text: `Welcome ${user.display} to room ${user.room}.` })
        socket.broadcast.to(user.room).emit("message", {user: "SYSTEM", text: `${user.display} has joined.`})
        socket.join(user.room)
        io.to(user.room).emit("roomInfo", {room: user.room, users: getUsersInRoom(user.room)})
    })
    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id)
        io.to(user?.room).emit("message", {user: user?.display, text: message})
        io.to(user?.room).emit("roomInfo", {user: user?.room, users: getUsersInRoom(user?.room)})
        callback()
    })
    socket.on("disconnect", () => {
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit("message", {user: "SYSTEM", text: `${user?.display} has left.`})
        }
    })
})
application.use(router)
application.use(cors())
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))