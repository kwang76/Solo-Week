import React from 'react'
import axios from 'axios'

class Search extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      exercise: '',
      sets : '',
      reps: '',
      workoutname: '',
      selectedWorkout: '',
    }

    this.handleSetChange = this.handleSetChange.bind(this)
    this.handleRepChange = this.handleRepChange.bind(this)
    this.handleExerciseChange = this.handleExerciseChange.bind(this)
    this.handleWorkoutNameChange = this.handleWorkoutNameChange.bind(this)
  }

  handleExerciseChange(e) {
    this.setState({
      exercise: e.target.value
    })
  }

  handleSetChange(e) {
    this.setState({
      sets: e.target.value
    })
  }

  handleRepChange(e) {
    this.setState({
      reps: e.target.value
    })
  }

  handleWorkoutNameChange(e){
    this.setState({
      workoutname: e.target.value
    })
  }

  render() {
    let muscles = this.props.exercises.reduce((acc, workout) => {
      if (!acc.includes(workout.muscleGroup)) {
        acc.push(workout.muscleGroup)
      }
      return acc
    }, []);
    let types = this.props.exercises.reduce((acc, workout)=> {
      if (!acc.includes(workout.type)) {
        acc.push(workout.type)
      }
      return acc
    }, [])

    return(
      <div>
        <label>
          Exercises
          <select value={this.state.exercise} onChange={this.handleExerciseChange}>
            {this.props.exercises.map((exercise, i)=> {
              return <option key={i} value={exercise.exerciseName}>{exercise.exerciseName}</option>
            })}
          </select>
        </label>

        <label>
          Muscle Group
          <select value={this.props.muscle} onChange={(e)=> this.props.filterMuscle(e.target.value)}>
            {muscles.map((muscle, i)=> {
              return <option key={i}>{muscle}</option>
            })}
          </select>
        </label>

        <label>
          Exercise Type
          <select value={this.state.type} onChange={(e)=> this.props.filterType(e.target.value)}>
          {types.map((type, i)=> {
            return <option key={i}>{type}</option>
          })}
          </select>
        </label>

        <br/>
        <br/>
        <label>
          Sets
          <select value={this.state.sets} onChange={this.handleSetChange}>
            {[1,2,3,4,5,6,7,8,9,10].map((setAmount, i) => {
              return <option key={i} value={setAmount}>{setAmount}</option>
            })}
          </select>
        </label>

        <label>
          Repetitions
          <select value={this.state.reps} onChange={this.handleRepChange}>
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((repAmount, i)=> {
              return <option key={i} value={repAmount}>{repAmount}</option>
            })}
          </select>
        </label>

        <br/>
        <br/>
        <button onClick={this.handleClick}>Add exercise to your workout</button>
        <br/>
        <br/>
        <input value={this.state.workoutname} onChange={this.handleWorkoutNameChange} placeholder={'Name Your Workout'}/>
        <br/>
        <select value={this.state.selectedWorkout} onChange={this.handleWorkoutNameChange}>

        {this.props.savedWorkouts.map((workout, i)=> {
          return <option key={i}>{workout.workout_id}</option>
        })}
        </select>

        <button onClick={()=> this.props.createWorkout(this.state.workoutname)}>Add your Workout</button>
      </div>
    )
  }


}

export default Search


//WORK ON A FILTER FEATURE SO THAT THE USER CAN CHOOSE FROM THE EXERCISE LIST BASED OFF OF MUSCLEGROUP/TYPE
