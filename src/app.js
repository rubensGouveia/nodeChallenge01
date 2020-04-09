const express = require("express");
const cors = require("cors");
const {} = require('path')

 const { uuid , isUuid} = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function VerifyId(request, response, next){
 const {id} = request.params
  if(!isUuid(id)){
    return response.status(400).json('Invalid repositorie ID')
  }
  return next()
}

app.get("/repositories", (request, response) => {
  
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url,techs} = request.body;
  
  const repositorie ={
    id:uuid(),
    title,
    url,
    techs,
    likes:0    
  }
  repositories.push(repositorie)
  return response.json(repositorie)
});

app.put("/repositories/:id",VerifyId, (request, response) => {
  const {title, url,techs} = request.body;
  const{id} = request.params

  const index =repositories.findIndex(repositorie =>repositorie.id===id)
  
  if (index <0){
    return response.status(400).json('Repositorie ID do not exists')
  }
  

  const repositorie ={
    id,
    title,
    url,
    techs,
    likes:repositories[index].likes 
  }

  repositories[index]=repositorie

  return response.json(repositorie)


  
});

app.delete("/repositories/:id",VerifyId ,(request, response) => {
  const{id} = request.params
  const index =repositories.findIndex(repositorie =>repositorie.id===id)
  
  if (index <0){
    return response.status(400).json('Repositorie ID do not exists')
  };

  repositories.splice(index,1)
  return response.status(204).send();
});

app.post("/repositories/:id/like",VerifyId ,(request, response) => {
  const{id} = request.params
  const index =repositories.findIndex(repositorie =>repositorie.id===id)
  
  if (index <0){
    return response.status(400).json('Repositorie ID do not exists')
  }
  const likes =++  repositories[index].likes;
  
  
  return response.json({likes})
});

module.exports = app;
