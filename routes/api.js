const router = require ("express").Router() 
const Workout = require ("../models/workout")
const dayjs = require ("dayjs")

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
  
  
  router.get("/workouts/range", (req,res) => {
    const today= dayjs().add(1,"day").format("YYYY-MM-DD")
    const sevenDayAgo= dayjs().subtract(7,"day").format("YYYY-MM-DD")
    Workout.find({
        day: {
            $gte: new Date(sevenDayAgo),
            $lt: new Date(today),
        }
    })
    .sort({day:"asc"})
    .then(results=>{
        res.status(200).json(results)
    })  
    .catch(err=>{
        res.status(400).json({message:"no workouts found"})
    })
  })

module.exports= router