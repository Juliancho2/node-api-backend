// const { request } = require('express');

const express = require('express')
const cors = require('cors')

const logger=require('./loggerMiddleware')
const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

let notes = [
    {
        'userId': 1,
        'id': 1,
        'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    },
    {
        'userId': 1,
        'id': 2,
        'title': 'qui est esse',
        'body': 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
    },
    {
        'userId': 1,
        'id': 3,
        'title': 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        'body': 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et hello world'
    }
]


app.get('/', (request, response) => {
    response.send('<h1>Hello world<h1/>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === parseInt(id))
    if (note) {
        response.json(note)
    }
    else response.status(404).end()
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.filter(note => note.id !== parseInt(id))
    notes=note
    response.json(note)
    response.status(204).end()

})
app.post('/api/notes', (request, response) => {
    const note = request.body
    const ids = notes.map(el => el.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        userId: 1,
        title: note.title,
        body: note.body,
    }
    notes = [...notes, newNote]
    response.json(newNote)
})

app.use((request,response) => {
    console.log(request.path)
    response.status(404).json({
        error:'Not found'
    })
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Sever runing on port ${PORT}`)
})
