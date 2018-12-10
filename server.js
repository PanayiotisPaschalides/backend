const express = require('express');
const bodyParser = require('body-parser');
const datalayer = require('./modules/DataLayer')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const server = express();

const port = process.env.PORT || 5000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(fileUpload());
server.use(express.static('public'));
server.use(cors());

server.options('*', cors());

server.get('/api/Login', (req, res) => {
  
  datalayer.Login(req.query.Username,req.query.Password, 
    (err,result) => { //gets the result from the callback
      if(result)
      {
        datalayer.GetID(req.query.Username, 
          (err,result) => { //gets the result from the callback
            if(result.status)
            {
              res.send({status: result.status, ID: result.ID});
            }
            
        })
      }
	})
});
server.post('/api/Register', (req, res) => {
  var Username = req.body.Username;
  var Email = req.body.Email;
  var Password = req.body.Password;
  datalayer.Register(Username,Password,Email, 
    (err,result) => { //gets the result from the callback
      if(result)
      {
        res.send({status: true});
      }
      
  })
});
server.post('/api/Upload', (req, res) => {
  let uploadFile = req.files.file.name;
  console.log(uploadFile)
  res.send(true);
});
server.get('/api/GetAdverts', (req, res) => {
  datalayer.GetAdverts( 
    (err,result) => { //gets the result from the callback
      res.send(result);
	})
});

server.get('/api/GetRating', (req, res) => {
  datalayer.GetRating(req.query.User, 
    (err,result) => { //gets the result from the callback
      res.send({Rates: result.Rates, People: result.People});
	})
});
server.get('/api/LoadChatItems', (req, res) => {
  datalayer.LoadChatItems(req.query.UserName, 
    (err,result) => { //gets the result from the callback
      res.send(result);
	})
});
server.get('/api/TestImage', (req, res) => { //to be removed
  datalayer.TestImage( 
    (err,result) => { //gets the result from the callback
      res.send(result);
	})
});
server.get('/api/LoadMessages', (req, res) => {
  datalayer.LoadMessages(req.query.ChatID, 
    (err,result) => { //gets the result from the callback
      res.send(result);
	})
});

server.get('/api/New_Messages_Check', (req, res) => {
  datalayer.New_Messages_Check(req.query.UserName, 
    (err,result) => { //gets the result from the callback
      res.send(result);
	})
});



server.post('/api/SendMsg', (req, res) => {
  datalayer.SendMsg(req.body.ID, req.body.By,req.body.To, req.body.Message,
    (err,result) => { //gets the result from the callback
      if(result){
        
            res.send({status: true});
        
      }
	})
});

server.post('/api/UpdateStatus', (req, res) => {
      
        datalayer.UpdateStatus(req.body.user,req.body.status,req.body.ID,
          (err,result) => { //gets the result from the callback
            if(result){
            res.send({status: true});}
        })
      
	
});

server.post('/api/ReadMsg', (req, res) => {
      
  datalayer.ReadMsg(req.body.User,req.body.ID,
    (err,result) => { //gets the result from the callback
      if(result){
      res.send({status: true});}
  })


});

server.post('/api/UpdateChat', (req, res) => {
      
  datalayer.UpdateChat(req.body.ChatID,req.body.UserName,req.body.LastMsg,
    (err,result) => { //gets the result from the callback
      if(result){
      res.send({status: true});}
  })


});

server.get('/api/GetRecipe', (req, res) => {
  datalayer.GetRecipe(req.query.ID, 
    (err,result) => { //gets the result from the callback
      res.send(result);
	})
});
server.get('/api/CheckRead', (req, res) => {
  datalayer.CheckRead(req.query.ID, req.query.UserName,
    (err,result) => { //gets the result from the callback
      console.log(result)
      res.send(result);
	})
});
server.post('/api/UpdateRecipeStatus', (req, res) => {
  datalayer.UpdateRecipeStatus(req.body.ID,req.body.Status, 
    (err,result) => { //gets the result from the callback
      if(result){
      res.send({status: true});}
	})
});
server.post('/api/UpdateRecipeViews', (req, res) => {
  datalayer.UpdateRecipeViews(req.body.ID, 
    (err,result) => { //gets the result from the callback
      if(result){
      res.send({status: true});}
	})
});

server.get('/api/GetRecipesManagment', (req, res) => {
  datalayer.GetRecipesManagment(req.query.ID, 
    (err,result) => { //gets the result from the callback
      res.send(result);
	})
});


server.listen(port, () => console.log(`Listening on port ${port}`));