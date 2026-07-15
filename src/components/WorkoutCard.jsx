import React , { useState } from 'react';
import Modal from './Modal.jsx';
import { exerciseDescriptions } from '../utilis/index.js';

export default function WorkoutCard(props) {
    const {trainingPlan , workoutIndex , type , dayNum , icon , savedWeights , handleSave , handleComplete} = props;

    const {warmup , workout } = trainingPlan || {}
    const [showExerciseDescription, setShowExerciseDescription] = useState (null);
    const [ weights , setWeights ] = useState(savedWeights || {} );

    function handleAddWeight(title , weight) {

        const newObject = { ...weights , [title] : weight };
        setWeights(newObject);
    }

    return (
        <div className="workout-container">
            { showExerciseDescription && (<Modal showExerciseDescription={showExerciseDescription}
            handleCloseModal={() => {
                setShowExerciseDescription(null);
             }}/> )}
            <div className="workout-card card">
                <div className="plan-card-container">
                    <p>Day {dayNum}</p>
                    {icon}
                </div>
                <div className="plan-card-header">
                    <h4><b>{type} Workout</b></h4>
                </div>
            </div>

            <div className="workout-grid">
                <div className="exercise-name">
                    <h3>Warmup</h3>
                </div>
                <h6>Sets</h6>
                <h6>Reps</h6>
                <h6 className="weight-input">Max-Weight</h6>
                { warmup.map((warmupExercise , warmupIndex) => {
                    return (
                        <React.Fragment key={warmupIndex}>
                            <div className="exercise-name">
                                <p>{warmupIndex + 1} .{warmupExercise.name}</p>
                                <button onClick={() => {
                                    setShowExerciseDescription({name: warmupExercise.name , description: exerciseDescriptions[warmupExercise.name]})}} className='help-icon'>
                                    <i className="fa-regular fa-circle-question"/>
                                </button>
                            </div>
                            <p className='exercise-info'>{warmupExercise.sets}</p>
                            <p className='exercise-info'>{warmupExercise.reps}</p>
                            <input className='weight-input' placeholder="N/A" disabled/>
                        </React.Fragment>
                    )})}
            </div>


            <div className="workout-grid">
                <div className="exercise-name">
                    <h3>Workout</h3>
                </div>
                <h6>Sets</h6>
                <h6>Reps</h6>
                <h6 className="weight-input">Max-Weight</h6>
                { workout.map((workoutExercise , wIndex) => {
                    return (
                        <React.Fragment key={wIndex}>
                            <div className="exercise-name">
                                <p>{wIndex + 1} .{workoutExercise.name}</p>
                                <button onClick={() => {
                                    setShowExerciseDescription({name: workoutExercise.name , description: exerciseDescriptions[workoutExercise.name]})}} 
                                    className='help-icon'>
                                    <i className="fa-regular fa-circle-question"/>
                                </button>
                            </div>
                            <p className='exercise-info'>{workoutExercise.sets}</p>
                            <p className='exercise-info'>{workoutExercise.reps}</p>
                            <input value={ weights[workoutExercise.name] || ''} onChange= {(e) => { handleAddWeight(workoutExercise.name, e.target.value)} } className='weight-input' placeholder="14" />
                        </React.Fragment>
                    )})}
            </div>


            <div className="workout-buttons">
                <button onClick={() => { handleSave(workoutIndex , {weights})}}>Save & Exit</button>
                <button onClick={() => { handleComplete(workoutIndex , {weights})}} disabled={Object.keys(weights).length !==workout.length}>Complete</button>
            </div>
        </div>
    )
}