const mysql = require('mysql')
const mysqlConfig = require('./config.js')
const Sequelize = require('sequelize')

// const connection = new Sequelize('heroku_ba26fb2fee70382', 'b8f7c4ede32d88', '640671e4', mysqlConfig)
const connection = new Sequelize('mysql://b8f7c4ede32d88:640671e4@us-cdbr-iron-east-05.cleardb.net/heroku_ba26fb2fee70382?reconnect=true')

exports.connection = connection

exports.createUser = (firstName, lastName, username, password, salt, email) => {
  return connection.query('INSERT INTO user (firstName, lastName, username, password, salt, email) VALUES (?, ?, ?, ?, ?, ?)',
    {replacements: [firstName, lastName, username, password, salt, email], type: 'INSERT'})
}

exports.findUser = (username) => {
  return connection.query('SELECT * FROM user WHERE username = ?',
    {replacements: [username],  type: connection.QueryTypes.SELECT})
}

exports.getExercises = () => {
  return connection.query('SELECT * FROM exercise', { type: connection.QueryTypes.SELECT})
}

exports.filterByMuscle = (muscle) => {
  return connection.query('SELECT * FROM exercise WHERE muscleGroup=?',
  {replacements: [muscle], type: 'SELECT'})
}

exports.filterByType = (type) => {
  return connection.query('SELECT * FROM exercise WHERE type=?',
  {replacements: [type], type: 'SELECT'})
}

exports.getWorkouts = (username) => {
  return exports.findUser(username)
    .then((response)=> {
      if (response.length === 0) {
        throw err('user is not found')
      }
      let id = (response[0].user_id).toString()
      return connection.query('SELECT workout_id, name FROM workout WHERE userId=?',
      {replacements:[id], type: 'SELECT'})
    })
}

exports.addWorkout = (username, workoutName) => {
  return exports.findUser(username)
    .then((response)=> {
      if (response.length === 0) {
        throw error('user is not found')
      }
      let id = (response[0].user_id).toString()
      return connection.query('INSERT INTO workout (name, userId) VALUES (?, ?)',
      {replacements: [workoutName, id], type: 'INSERT'})
    })
    .catch((err) => {
      console.log('Error workout to database', err)
    })
}

exports.deleteWorkout = (workoutId) => {
  return connection.query('DELETE FROM workout WHERE workout_id=?',
  {replacements: [workoutId], type: 'DELETE'})
}

exports.deleteExercise = (workoutId, exerciseId) => {
  return connection.query('DELETE FROM workout_exercises WHERE (workout_id=? AND exercise_id=?)',
  {replacements: [workoutId, exerciseId], type: 'DELETE'})
}


exports.addExerciseToWorkout = (exercise, sets, reps, workoutId, workoutName) => {
  return connection.query('SELECT exercise_id FROM exercise WHERE exerciseName=?',
  {replacements: [exercise], type: 'SELECT'})
  .then((exerciseId)=> {
    console.log(`what are we inserting to join table? workoutId: ${workoutId} sets: ${sets} reps: ${reps} exercise:${exerciseId[0].exercise_id}`)
    return connection.query('INSERT INTO workout_exercises (workout_id, exercise_id, workoutName, exercise, sets, reps) VALUES (?,?,?,?,?,?)',
    {replacements: [workoutId, exerciseId[0].exercise_id, workoutName, exercise,sets, reps], type: 'INSERT'})
  })
  .catch((err)=> {
    console.log('There was an error adding exercise to join table', err)
  })
}

exports.getStoredWorkouts = (username) => {
  return exports.findUser(username)
    .then((response)=> {
      if (response.length === 0) {
        throw error('user is not found')
      }
      let id = (response[0].user_id).toString()
      return connection.query('SELECT workout_id FROM workout WHERE userId=?',
      {replacements: [id], type: 'SELECT'})
    })
    .then((workoutIds)=> {
      console.log('all my workout ids', workoutIds)
      return Promise.all(workoutIds.map((workout)=> {
        let id = workout.workout_id
        return connection.query('SELECT * FROM workout_exercises WHERE workout_id=?',
        {replacements: [id], type: 'SELECT'})
      }))
    })
    .catch((err)=> {
      console.log('ERROR RETRIEIVING WORKOUTS FOR INDIVIDUAL')
    })
}
