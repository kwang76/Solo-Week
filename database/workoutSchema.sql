DROP DATABASE IF EXISTS workoutworld;
CREATE DATABASE IF NOT EXISTS workoutworld;

use workoutworld;

CREATE TABLE user(
  user_id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(30),
  lastName VARCHAR(30),
  username VARCHAR(60) UNIQUE,
  password VARCHAR(255),
  salt VARCHAR(255),
  email VARCHAR(60),
  PRIMARY KEY(user_id)
);

CREATE TABLE exercise (
  exercise_id INT NOT NULL AUTO_INCREMENT,
  exerciseName VARCHAR(100) UNIQUE,
  muscleGroup VARCHAR(60),
  type VARCHAR(60),
  PRIMARY KEY(exercise_id)
);

-- CREATE TABLE user_exercise(
--   user_id INT NOT NULL,
--   exercise_id INT NOT NULL,
--   PRIMARY KEY (user_id, exercise_id),
--   FOREIGN KEY (user_id) REFERENCES user (user_id),
--   FOREIGN KEY (exercise_id) REFERENCES exercise (exercise_id)
-- );

CREATE TABLE workout (
  workout_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  userId INT NOT NULL,
  PRIMARY KEY(workout_id),
  FOREIGN KEY (userID) REFERENCES user (user_id)
);

CREATE TABLE workout_exercises (
  id INT NOT NULL AUTO_INCREMENT,
  exercise_id INT NOT NULL,
  workout_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (exercise_id) REFERENCES exercise (exercise_id) ON DELETE CASCADE,
  FOREIGN KEY (workout_id) REFERENCES workout (workout_id) ON DELETE CASCADE
);
