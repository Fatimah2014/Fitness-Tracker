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

  router.put("/workouts/:id", (req,res) => {
    Workout.findOneAndUpdate(
        {_id:req.params.id
        },
        {
            $inc:{totalDuration: req.body.duration},
           $push:{exercises: req.body} 

        }
    )
    .then(results=>{
        res.status(200).json(results)
    })  
    .catch(err=>{
        res.status(400).json({message:"no workouts found"})
    })
  })
  
  

module.exports= router