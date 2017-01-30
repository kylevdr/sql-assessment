var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://postgres@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);
    
    db.user_create_seed(function(){
      console.log("User Table Init");
    });
    db.vehicle_create_seed(function(){
      console.log("Vehicle Table Init")
    });
})

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

app.get('/api/users', (req, res) => {
  db.getUsers((err, response) => {
      if (err) {
          res.send(err);
      } else {
          res.status(200).send(response);
      }
  });
});

app.get('/api/vehicles', (req, res) => {
  db.getVehicles((err, response) => {
      if (err) {
          res.send(err);
      } else {
          res.status(200).send(response);
      }
  });
});

app.post('/api/users', (req, res) => {
  db.createUser([req.body.firstname, req.body.lastname, req.body.email], (err, response) => {
      if (err) {
          res.send(err);
      } else {
          res.status(200).send(response);
      }
  });
});

app.post('/api/vehicles', (req, res) => {
  db.createVehicle([req.body.make, req.body.model, req.body.year, req.body.ownerId], (err, response) => {
      if (err) {
          res.send(err);
      } else {
          res.status(200).send(response);
      }
  });
});

app.get('/api/user/:userId/vehiclecount', (req, res) => {
  db.getVehicleCount([Number(req.params.userId)], (err, response) => {
      if (err) {
          res.send(err);
      } else {
          res.status(200).send({count: response});
      }
  });
});

app.get('/api/user/:userId/vehicle', (req, res) => {
  db.getVehiclesByOwnerId([Number(req.params.userId)], (err, response) => {
      if (err) {
          res.send(err);
      } else {
          res.status(200).send(response);
      }
  });
});

app.get('/api/vehicle', (req, res) => {
  if (req.query.UserEmail) {
    db.getVehiclesByEmail([req.query.UserEmail], (err, response) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).send(response);
        }
    });
  } else if (req.query.userFirstStart) {
    db.getVehiclesByFirstLetter([`${req.query.userFirstStart}%`], (err, response) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).send(response);
        }
    });
  }
});

app.get('/api/newervehiclesbyyear', (req, res) => {
  db.getNewerVehicles((err, response) => {
      if (err) {
          res.send(err);
      } else {
          res.status(200).send(response);
      }
  });
});

app.put('/api/vehicle/:vehicleId/user/:userId', (req, res) => {
  db.changeOwner([Number(req.params.vehicleId), Number(req.params.userId)], (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(response);
    }
  });
});

app.delete('/api/user/:userId/vehicle/:vehicleId', (req, res) => {
  db.deleteOwner([Number(req.params.userId), Number(req.params.vehicleId)], (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(response);
    }
  });
});

app.delete('/api/vehicle/:vehicleId', (req, res) => {
  db.deleteVehicle([Number(req.params.vehicleId)], (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(response);
    }
  });
});


module.exports = app;
