import React from 'react'
import WorkoutEntry from './WorkoutEntry.jsx'

const WorkoutsFeed = ({allWorkouts}) => {
  return(
    <div className="workout-feed">
    {allWorkouts.map((workout,i)=> {
      return (<div key={i}>
        <WorkoutEntry key={i} workout={workout}/><br/>
        </div>)
    })}

    </div>
  )
}

export default WorkoutsFeed


//most likely does not need state
//will be like videolist from recastly
