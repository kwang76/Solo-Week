const mysql = require('mysql')
const mysqlConfig = require('./config.js')
const Sequelize = require('sequelize')

connection = new Sequelize('workoutworld', 'root', '', mysqlConfig)

exports.connection = connection

exports.createUser = (firstName, lastName, username, password, salt, email) => {
  return connection.query('INSERT INTO user (firstName, lastName, username, password, salt, email) VALUES (?, ?, ?, ?, ?, ?)',
    {replacements: [firstName, lastName, username, password, salt, email], type: 'INSERT'});
}

exports.findUser = (username) => {
  return connection.query('SELECT * FROM user WHERE username = ?',
    {replacements: [username], type: 'SELECT'});
}

exports.saveUserExercise = (username, exercise) => {
  return connection.query(`INSERT INTO user_exercise (user_id, exercise_id) VALUES ((SELECT user_id FROM user WHERE username='${username}'),
  (SELECT exercise_id FROM exercise WHERE exerciseName='${exercise}'))`)
}

exports.getExercises = () => {
    return connection.query('SELECT * FROM exercise', { type: connection.QueryTypes.SELECT})
}

exports.getUserExercise = (username) => {
  return exports.findUser(username)
    .then((response) => {
      if (response.length === 0) {
        throw error('user is not found ')
      }
      let id = response[0].user_id
      return connection.query('SELECT exercise_id FROM user_exercise WHERE user_id=? ',
        {replacements: [id], type: 'SELECT'});
    })
    .then((exerciseIds) => {
      return Promise.all(exerciseIds.map((id) => {
        return connection.query('SELECT * FROM exercise WHERE exercise_id=?',
          {replacements: [id.exercise_id], type: 'SELECT'})
      }))
    })
    .catch((err) => {
      console.log('Error getting exercises', err)
    })
}

exports.deleteUserExercise = (username, exercise) => {
  return connection.query('SELECT exercise_id FROM exercise WHERE exerciseName=?',
    {replacements: [exercise], type: 'SELECT'})
    .then((exerciseId) => {
      return connection.query('DELETE FROM user_exercise WHERE exercise_id=?',
        {replacements: [exerciseId], type: 'DELETE'})
    })
    .catch((err) => {
      console.log('Error deleting exercise')
    })
}

//take the find the user_id with the username
//find all the exercises from user_exercise where it matches user_id
/*
user   exercise
1         4
1         3
1         7
*/

//
// exports.deleteUserExercise = (username, exerciseName) => {
//   return exports.findUser(username)
//     .then((response) => {
//       if (response.length === 0) {
//         throw error('user is not found ')
//       }
//       let id = response[0].user_id
//       return connection.query('SELECT * FROM user_exercise WHERE user_id=? ',
//         {replacements: [id], type: 'SELECT'});
//     })
//     .then((exercises) => {
//       return connection.query('SELECT exercise_id FROM exercise WHERE exerciseName=?',
//         {replacements: [exerciseName], type: 'SELECT'})
//     })
//     .then((id)=> {
//       return connection.query('DELETE FROM user_exercise WHERE exercise_id=?',
//         {replacements: [id], type: 'DELETE'})
//     })
//     .catch((err) => {
//       console.log('Error deleting exercise')
//     })
// }
