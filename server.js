const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express ();

//const app = express();
//app.use(...);


var corsOptions ={
    origin : "http://localhost:8080"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content type - application/x-www-form-urlecoded

app.use(express.urlencoded({extended : true }));

//parse requests of content-type -application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended : true}));

//connecting to mongoose

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


//simple route

app.get("/",(req,res) => {
    res.json({message : "welcome to the world"});

});

require("./app/routes/tutorial.routes")(app);

//set,port listen for requests

const PORT = process.env.PORT || 8080 ;



app.listen(PORT , () => {
    console.log(`Server is running at port ${PORT}.`);
});