import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {res.json ({message: "Api is working, recipe routes" })});
//http://localhost:3000/api/recipe => message	"Api is working, recipe routes"
export default router;
