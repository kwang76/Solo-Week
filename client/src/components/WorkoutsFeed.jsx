import React from 'react'

class WorkoutsFeed extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      schedule : [],
      currentWorkout: ''
    }
  }

  render() {
    return(
      <div>
      {this.props.allWorkouts.map((workout,i)=> {
        return <li key={i}>{workout.exercise}{workout.sets}{workout.reps}</li>
      })}
      </div>
    )
  }



}

export default WorkoutsFeed

//most likely does not need state
//will be like videolist from recastly
