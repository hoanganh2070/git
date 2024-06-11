import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from "morgan";

import { routerConfig } from './routes/Router';

import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { randomPassword, randomUsername } from './helper/help';
import { sha256 } from 'js-sha256';
import { DB } from '../prisma/DB';

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


const corsMiddleware = (req : Request, res : Response, next : NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // Intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(corsMiddleware);

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Include PATCH method
}));

routerConfig(app);

// (async () => {
//   await DB.user.create({
//     data: {
//       username : "hoanga",
//       password : sha256("123456")
//     }
//   })
// } )();


// async function initDB() {
//   const users = Array.from({ length: 1000000 }, () => ({
//       username: randomUsername(),
//       password: sha256(randomPassword())
//   }));

//   for (let i = 0; i < users.length; i += 2000) {
//       const batch = users.slice(i, i + 2000);
//       await DB.user.createMany({
//           data: batch,
//           skipDuplicates: true,
//       });
//   }
// }

// initDB()
//   .catch(e => {
//       throw e
//   })
//   .finally(async () => {
//       await DB.$disconnect()
//   });





app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



