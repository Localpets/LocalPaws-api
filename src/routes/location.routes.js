import { Router } from "express";
// import { 
//     userGet, 
//     userDelete, 
//     userPut, 
//     userPost } from '../controllers/location.controller.js';


const locationRouter = Router();

locationRouter.get('/find/:location_id', (req, res) => res.send('GET request to the user page'));

export default locationRouter;