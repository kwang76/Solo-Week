import React from 'react'
import axios from 'axios'

class Search extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      exercise: '',
      sets : '',
      reps: '',
      muscle: '',
      type: '',
    }
  
    this.handleSetChange = this.handleSetChange.bind(this)
    this.handleRepChange = this.handleRepChange.bind(this)
    this.handleExerciseChange = this.handleExerciseChange.bind(this)
    this.handleMuscleChange = this.handleMuscleChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
  }

  handleExerciseChange(e) {
    this.setState({
      exercise: e.target.value
    }, ()=> console.log(this.state.exercise))
  }

  handleSetChange(e) {
    this.setState({
      sets: e.target.value
    }, ()=> console.log(this.state.sets))
  }

  handleRepChange(e) {
    this.setState({
      reps: e.target.value
    }, ()=> console.log(this.state.reps))
  }

  handleMuscleChange(e) {
    this.setState({
      muscle: e.target.value
    }, ()=> console.log(this.state.muscle))
  }

  handleTypeChange(e) {
    this.setState({
      type: e.target.value
    }, ()=> console.log(this.state.type))
  }

  render() {
    return(
      <div>
        <label>
          Exercises
          <select value={this.state.exercise} onChange={this.handleExerciseChange}>
            {this.props.workouts.map((exercise, i)=> {
              return <option key={i} value={exercise.exerciseName}>{exercise.exerciseName}</option>
            })}
          </select>
        </label>

        <label>
          Muscle Group
          <select value={this.state.muscle} onChange={this.handleMuscleChange}>
            <option>Chest</option>
            <option>Back</option>
            <option>Legs</option>
          </select>
        </label>

        <label>
          Exercise Type
          <select value={this.state.type} onChange={this.handleTypeChange}>
            <option>Strength</option>
            <option>Stretching</option>
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
      </div>
    )
  }


}

export default Search


//WORK ON A FILTER FEATURE SO THAT THE USER CAN CHOOSE FROM THE EXERCISE LIST BASED OFF OF MUSCLEGROUP/TYPE
