import express from 'express';
import UserController from '../controllers/UserController';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const apiLimiter = rateLimit({
    windowMs: 1000, 
    max: 5,
    message: 'Too many connection',
});
  
  if(process.env.ENABLE_RATE_LIMIT === 'true') {
    console.log('Rate limit enabled');
    router.post('/login',apiLimiter,UserController.logIn);
  
  }
  else {
    console.log('Rate limit disabled');
    router.post('/login',UserController.logIn);
  }




export default router;