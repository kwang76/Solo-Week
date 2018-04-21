import React from 'react'
import WorkoutEntry from './WorkoutEntry.jsx'
import RaisedButton from 'material-ui/RaisedButton';

const WorkoutsFeed = ({allWorkouts, deleteWorkout}) => {

  console.log('all of a users workouts', allWorkouts)
  return(

    <div className="workout-feed">
    <h2> Workouts </h2>
    {allWorkouts.map((workout,i)=> {
      return (
        <div key={i}>

        <WorkoutEntry key={i} workout={workout}/><br/>
        <RaisedButton label="Delete Workout" onClick={()=> deleteWorkout(workout[0].workout_id )}/>
        <br/>
        </div>)
    })}

    </div>
  )
}

export default WorkoutsFeed


//most likely does not need state
//will be like videolist from recastly
