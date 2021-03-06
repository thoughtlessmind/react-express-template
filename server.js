const express = require("express")
const app = express()
const https = require('https');
const path = require('path')

app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/api", (req, res) => {
    const data = [
        {id: 1, firstName: 'Jon', lastName: "Doe"},
        {id: 1, firstName: 'Mary', lastName: "Gol"},
        {id: 1, firstName: 'Dave', lastName: "Patrick"}
    ]

    res.json(data)
})


app.get("/testApi", (req, res) =>{
        
  https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
      let data = '';
  
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
      data += chunk;
      res.json(JSON.parse(data))
      });
  
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
      console.log(JSON.parse(data).explanation);
      });
  
  }).on("error", (err) => {
      console.log("Error: " + err.message);
  });
  
})


if(process.env.NODE_ENV === 'production') {  
  app.use(express.static(path.join(__dirname, 'client/build'))); 
  app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'client/build/index.html'));  })
}


const port = process.env.PORT || 5000




https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
    // console.log("first console")
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

app.listen(port, ()=>console.log(`Server has started on port ${port}`))
