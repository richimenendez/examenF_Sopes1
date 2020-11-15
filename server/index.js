const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const port = 4200;

const AWS = require('aws-sdk')
const config = require('./lib/config')
const {v1:uuidv1} = require('uuid')

let vida = 1000;
let total = 1000;


//MONGO CONF

app.get("/", (req, res) => {
  res.json({vida});
});

app.post("/atacar", (req, res) => {
  console.log(req.body)
  vida = vida - req.body.damage

  AWS.config.update(config.aws_remote_config);
  const docClient = new AWS.DynamoDB.DocumentClient();
  const Item = { ataque: req.body.user + " a atacado con "+req.body.damage+ " de daño!" };
  Item.timestamp = Date.now()+"";
  var params = {
      TableName: config.aws_table_name,
      Item: Item
  };

  // Call DynamoDB to add the item to the table
  docClient.put(params, function (err, data) {
      if (err) {
          res.send({
              success: false,
              message: err
          });
      } else {
          res.send({
              success: true,
              message: 'Ataque realizado con exito!',
              log: data
          });
      }
  });
});


app.get("/atacar", (req, res) => {
  vida = vida - 5
  res.json({vida});
});


app.get("/reset", (req, res) => {
    vida = 1000;
    total = 1000;
    res.json({vida});
  });

app.get("/getLog", (req, res) => {  
  AWS.config.update(config.aws_remote_config);

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
      TableName: config.aws_table_name
  };

  docClient.scan(params, function (err, data) {

      if (err) {
          console.log(err)
          res.send({
              success: false,
              message: err
          });
      } else {
          const { Items } = data;
          res.send({
              success: true,
              data: Items,
              total,
              vida
          });
      }
  });
});

app.listen(port, () => {
  vida =1000;
  console.log(`Escuchando en el puerto:${port}`);
});
