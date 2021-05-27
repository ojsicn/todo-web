var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var fs = require('fs')


storagePath = __dirname + '\\' + '..' + '\\' + 'storage' + '\\' + 'todo-json.json'

router.get('/', (req, res, next) => {
  const todoString = fs.readFileSync(storagePath, 'utf8', function(error, data) {})
  const todoJSON = JSON.parse(todoString)

  res.status(200).send(todoJSON)
});

router.post('/', (req, res, next) => {
  const todoList = JSON.parse(fs.readFileSync(storagePath, 'utf8', function(error, data) {}))
  item = req.body
  todoList.push(item)
  let itemJSON = JSON.stringify(todoList)
  const writeFile = fs.writeFileSync(storagePath, itemJSON)
  
  console.log(writeFile)

  todoList.push(writeFile)

  res.status(200).send({success: true})
})

router.put('/:id', (req, res, next) => {
  const todoList = JSON.parse(fs.readFileSync(storagePath, 'utf8', function(error, data) {}))
  const renameItem = req.body
  const targetId = req.body.id

  for(let i = 0; i < todoList.length; i++) {
    if(todoList[i].id == targetId) {
      todoList.splice(i, 1, renameItem)
    }
  }
  let itemJSON = JSON.stringify(todoList)
  const changedFile = fs.writeFileSync(storagePath, itemJSON)
  console.log(changedFile)
  res.status(200).send({success: true})
})

router.delete('/:id', (req, res, next) => {
  const todoList = JSON.parse(fs.readFileSync(storagePath, 'utf8', function(error, data) {}))
  const targetId = req.params.id

  for(let i = 0; i < todoList.length; i++) {
    if(todoList[i].id == targetId) {
      todoList.splice(i, 1)
    }
  }
  let itemJSON = JSON.stringify(todoList)
  const deletedFile = fs.writeFileSync(storagePath, itemJSON)
  console.log(deletedFile)
  res.status(200).send({success: true})
})



module.exports = router;
