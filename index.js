var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://postgres:pixidust@localhost/assessbox";

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

app.get('/api/users', function(req,res){
  db.getAllUsers(function(err, users){
      if(err){
        res.status(400).json(err)
      }
      res.status(200).json(users)
    });
})

app.get('/api/vehicles', function(req,res){
  db.getAllVehicles(function(err, vehicles){
    if(err){
      res.status(400).json(err)
    }
    res.status(200).json(vehicles)
    });
})

app.post('/api/users', function(req,res){
  db.makeUser([req.body.firstname, req.body.lastname, req.body.email], function(err, user){
    if(err){
      res.status(400).json(err)
    }
    res.status(200).json(user)
  })
})

app.post('/api/vehicles', function(req,res){
  db.makeVehicle([req.body.make, req.body.model, req.body.year, req.body.ownerId], function(err, vehicle){
    if(err){
      res.status(400).json(err)
    }
    res.status(200).json(vehicle)
  })
})

app.get('/api/user/:id/vehiclecount', function(req, res){
  db.countUsersVehicles(req.params.id, function(err, count){
    if(err){
      res.status(400).json(err)
    }
    res.status(200).json(count)
  })
})

app.get('/api/user/:userId/vehicle', function(req, res){
  db.getUserVehicles(req.params.userId, function(err, vehicles){
    if(err){
      res.status(400).json(err)
    }
    res.status(200).json(vehicles)
  })
})

app.get('/api/vehicle/', function(req, res){
  if(req.query.email){
    db.getEmailVehicles(req.query.email, function(err, vehicles){
    if(err){
      res.status(400).json(err)
    }
    res.status(200).json(vehicles)
  })}
  if(req.query.userFirstStart){
    db.getStartVehicles(req.query.userFirstStart, function(err, vehicles){
      if(err){
        res.status(400).json(err)
      }
      res.status(200).json(vehicles)
    })
  }
})

app.get('/api/newervehiclesbyyear', function(req, res){
  db.getNewerVehicles(function(err, vehicles){
    if(err){
      res.status(400).json(err)
    }
    res.status(200).json(vehicles)
  })
})

app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res){
  db.updateOwner([req.params.vehicleId, req.params.userId], function(err, vehicle){
    if(err){
      res.status(400).json(err)
    }
    res.status(200).json(vehicle)
  })
})

app.delete('/api/user/:userId/vehicle/:vehicleSIdOwn', function(req, res){
  db.removeOwner([req.params.userId, req.params.vehicleIdOwn], function(err, vehicle){
    if(err){
      res.status(400).json(err)
    }
    res.status(200).json(vehicle)
  })
})

 app.delete('/api/vehicle/:vehicleId', function(req, res){
   db.removeVehicle(req.params.vehicleId, function(err, vehicle){
    if(err){
       res.status(400).json(err)
     }
     res.status(200).json(vehicle)
   })
 })


app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
});

module.exports = app;
