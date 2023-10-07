import { Router } from "express";

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello Dener your api is ready' })
});


export default routes;
