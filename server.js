const express = require("express")
const app = express()
const https = require('https');
const path = require('path')

app.use(express.static("client"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/api", (req, res) => {
    const data = [
        {id: 1, firstName: 'Jon', lastName: "Doe"},
        {id: 1, firstName: 'Mary', lastName: "Gol"},
        {id: 1, firstName: 'Dave', lastName: "Patrick"}
    ]

    res.json(data)
})

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/client/build/static/index.html");
})

const port = process.env.PORT || 5000

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

app.listen(process.env.PORT || 5000, ()=>console.log(`Server has started on port ${port}`))
