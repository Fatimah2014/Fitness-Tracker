const router = require ("express").Router() 
const Workout = require ("../models/workout")

router.get("/workouts", (req,res) => {
  Workout.find({})
  .then(results=>{
      res.status(200).json(results)
  })  
  .catch(err=>{
      res.status(400).json({message:"no workouts found"})
  })
})

router.post("/workouts", (req,res) => {
    Workout.create(req.body)
    .then(results=>{
        res.status(201).json(results)
    })  
    .catch(err=>{
        res.status(400).json({message:"workout not created"})
    })
  })

 
  
  

module.exports= router