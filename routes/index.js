var express = require('express');
var router = express.Router();
var fs = require('fs')


storagePath = __dirname + '\\' + '..' + '\\' + 'storage' + '\\' + 'todo-json.json'

router.get('/', (req, res, next) => {
  const todoList = JSON.parse(fs.readFileSync(storagePath, 'utf8'))

  res.status(200).send(todoList)
});

router.post('/', (req, res, next) => {
  const todoList = JSON.parse(fs.readFileSync(storagePath, 'utf8'))
  item = req.body
  todoList.push(item)
  let itemJSON = JSON.stringify(todoList)
  const writeFile = fs.writeFileSync(storagePath, itemJSON)
  
  todoList.push(writeFile)

  res.status(200).send({success: true})
})

router.put('/:id', (req, res, next) => {
  const todoList = JSON.parse(fs.readFileSync(storagePath, 'utf8'))
  const renameItem = req.body
  const targetId = req.params.id

  for(let i = 0; i < todoList.length; i++) {
    if(todoList[i].id == targetId) {
      todoList.splice(i, 1, renameItem)
    }
  }
  let itemJSON = JSON.stringify(todoList)
  const changedFile = fs.writeFileSync(storagePath, itemJSON)
  res.status(200).send({success: true})
})

router.delete('/:id', (req, res, next) => {
  const todoList = JSON.parse(fs.readFileSync(storagePath, 'utf8'))
  const targetId = req.params.id

  for(let i = 0; i < todoList.length; i++) {
    if(todoList[i].id == targetId) {
      todoList.splice(i, 1)
    }
  }
  let itemJSON = JSON.stringify(todoList)
  const deletedFile = fs.writeFileSync(storagePath, itemJSON)
  res.status(200).send({success: true})
})

router.get('/detail/:id', (req, res, next) => {
  const todoList = JSON.parse(fs.readFileSync(storagePath, 'utf8'))
  const targetId = req.params.id

  for(let i = 0; i < todoList.length; i++) {
    if(todoList[i].id == targetId) {
      // id 중복조회시 Cannot set headers after they are sent to the client 에러 발생
      res.status(200).send(todoList[i])
    }
  }
});


module.exports = router;
