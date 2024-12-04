# express-blog-intro
// import express in server js

const express = require('express');


// set port to listen on localhost
const PORT = 3000;


//creo una istanza del server
const app = express();


//definisco path per asset statici
app.use(express.static("public"));

//require di eventuali altri file
const pets = require("./data/pets.js");
console.log(pets);


//rotte
app.get("/", (req, res) => {
  res.send("Ciao");
});
// app.get("/api/pets", (req, res) => {
//   res.json(pets);
// });
app.all('*',(req,res)=>{
  res.status(404).send('<h1>Not Found !</h1>');
})

//mmetto il server in ascolto su localhost alla porta 3000
app.listen(PORT,  () => {
    console.log(`Server is running on http://localhost:${PORT}}`);
});