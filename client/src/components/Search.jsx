import React from 'react'
import axios from 'axios'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

const styles ={
  alignment: {
    'textAlign': 'center'
  }
}
class Search extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      exercise: this.props.exercises[0],
      sets : 1,
      reps: 1,
      workoutname: '',
      selectedWorkout: this.props.savedWorkouts[0],
      name: '',
      open: false,
    }

    this.handleSetChange = this.handleSetChange.bind(this)
    this.handleRepChange = this.handleRepChange.bind(this)
    this.handleExerciseChange = this.handleExerciseChange.bind(this)
    this.handleWorkoutNameChange = this.handleWorkoutNameChange.bind(this)
    this.handleWorkoutChange = this.handleWorkoutChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.addExerciseToWorkout = this.addExerciseToWorkout.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  handleExerciseChange(event, index, value) {
    this.setState({
      exercise: value
    })
  }

  handleSetChange(event, index, value) {
    this.setState({
      sets: value
    })
  }

  handleRepChange(event, index, value) {
    this.setState({
      reps: value
    })
  }

  handleWorkoutNameChange(e){
    this.setState({
      workoutname: e.target.value
    })
  }

  handleWorkoutChange(event, index, value) {
    let selectedWorkout = this.props.savedWorkouts.filter((workout) => {
      if (workout.name === value.name) {
        return workout;
      }
    })[0];

    this.setState({
      selectedWorkout: selectedWorkout,
      name: value
    }, ()=> console.log('currently selected workout', this.state.selectedWorkout))
  }

  handleClick() {
    this.setState({
      open: true
    })
    this.addExerciseToWorkout(this.state.exercise, this.state.sets, this.state.reps, this.state.selectedWorkout.workout_id, this.state.selectedWorkout.name)
  }

  handleRequestClose() {
    this.setState({
      open: false,
    })
  }
  addExerciseToWorkout(exercise, sets, reps, workoutId, workoutName) {
    axios.post('/exerciseToWorkout', {exercise: exercise, sets:sets, reps: reps, workoutId: workoutId, workoutName: workoutName})
      .then((response)=> {
        this.props.getStoredWorkouts()
      })
      .catch((err)=> {
        console.log('error adding exercise to a workout', err)
      })
  }

  render() {
    return(
      <div>
        <div className='input'>
        <TextField
          hintText="Create a New Workout"
          floatingLabelText="New Workout"
          value={this.state.workoutname}
          onChange={this.handleWorkoutNameChange}
        />
        <RaisedButton label="Add a Workout"
          onClick={()=> this.props.createWorkout(this.state.workoutname)}
        />
        <SelectField
          floatingLabelText="Workouts"
          value={this.state.name}
          onChange={this.handleWorkoutChange}
        >
          {this.props.savedWorkouts.map((workout, i)=> {
            return <MenuItem value={workout} primaryText={workout.name} key={i}/>
          })}
        </SelectField>
          <SelectField
            floatingLabelText="Exercise Name"
            value={this.state.exercise}
            onChange={this.handleExerciseChange}
          >
            {this.props.exercises.map((exercise, i)=> {
              return <MenuItem key={i} style={styles.alignment} value={exercise.exerciseName} primaryText={exercise.exerciseName}/>
            })}
          </SelectField>
          <br/>
          <SelectField
          floatingLabelText="Muscle group"
          value={this.props.muscle}
          onChange={(e,i,value)=> this.props.filterMuscle(value)}
          >
            <MenuItem value={'All'} primaryText="All"/>
            <MenuItem value={'Chest'} primaryText="Chest"/>
            <MenuItem value={'Back'} primaryText="Back"/>
            <MenuItem value={'Shoulder'} primaryText="Shoulders"/>
            <MenuItem value={'Biceps'} primaryText="Biceps"/>
            <MenuItem value={'Triceps'} primaryText="Triceps"/>
            <MenuItem value={'Legs'} primaryText="Legs"/>
          </SelectField>
          <br/>
          <SelectField
          floatingLabelText="Exercise Type"
          value={this.props.type}
          onChange={(e,i,v)=> this.props.filterType(v)}
          >
            <MenuItem value={'All'} primaryText="All"/>
            <MenuItem value={'Strength'} primaryText="Strength"/>
            <MenuItem value={'Stretch'} primaryText="Stretch"/>
            <MenuItem value={'Cardio'} primaryText="Cardio"/>
          </SelectField>
          <br/>
          <br/>
          <SelectField
          floatingLabelText="Sets"
          value={this.state.sets}
          onChange={this.handleSetChange}
          >
          {[1,2,3,4,5,6,7,8,9,10].map((setAmount, i) => {
            return <MenuItem key={i} value={setAmount} primaryText={setAmount}/>
          })}
          </SelectField>

          <SelectField
          floatingLabelText="Reps"
          value={this.state.reps}
          onChange={this.handleRepChange}
          >
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((repAmount, i)=> {
            return <MenuItem key={i} value={repAmount} primaryText={repAmount}/>
          })}
          </SelectField>
        <RaisedButton
          label="Add exerise to a workout"
          onClick={this.handleClick}
        />
        <Snackbar
          open={this.state.open}
          message="A new exercise was added!"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        </div>
      </div>
    )
  }
}

export default Search
