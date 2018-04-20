import React from 'react'

const WorkoutEntry = ({workout}) => {
  return(
    <div>
      <label>
      {workout[0].workoutName || ''}
      {workout.map((exercise,i)=> {
        return <div key={i}>Exercise:{exercise.exercise} Sets:{exercise.sets} Repetitions:{exercise.reps}</div>
      })}
      </label>
    </div>
  )

}

export default WorkoutEntry

//debating on whether this one needs state
//most likely not, will be like videolistentry from recastly
