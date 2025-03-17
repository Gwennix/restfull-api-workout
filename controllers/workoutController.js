import Workout from "../models/Workout.js";
import mongoose from 'mongoose';

export const getAllWorkouts = async (requestAnimationFrame, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
};

export const getSingleWorkout = async (req, res) => {
    const {id}= req.params
    const workout = await Workout.findById(id);
    if(!workout) {
        res.status(404).json({error: "bestaat niet"})
    }

    res.status(200).json(workout)
};

export const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;
    try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
    };

export const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Geen geldige workout ID' });
        }

        const workout = await Workout.findOneAndDelete({ _id: id });

        if (!workout) {
            return res.status(404).json({ error: 'Workout niet gevonden' });
            }
           
        res.status(200).json(workout);
};

export const updateWorkout = async (req, res) => {
    const { id } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Geen geldige workout ID' });
    }
   
    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
   
    if (!workout) {
    return res.status(404).json({ error: 'Workout niet gevonden' });
    }
   
    res.status(200).json(workout);
   };
   

