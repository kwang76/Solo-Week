import React from 'react'

const WorkoutEntry = ({workout}) => {
  const style = {
    'fontSize': '16px',
  }
  return(
    <div>
      <label>
      <br/>
      <div style={style}> {workout.length === 0 ? '' : workout[0].workoutName} </div>
      <br/>
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
