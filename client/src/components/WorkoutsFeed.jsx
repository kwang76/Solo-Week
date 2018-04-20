import React from 'react'

const WorkoutsFeed = ({allWorkouts}) => {
  return(
    <div>
    {allWorkouts.map((workout,i)=> {
      return <li key={i}>Exercise:{workout.exercise} Sets:{workout.sets} Repetitions:{workout.reps}</li>
    })}
    </div>
  )
}

export default WorkoutsFeed

//most likely does not need state
//will be like videolist from recastly
