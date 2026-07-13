import express from 'express'

import protect from '../midleware/auth.js';
import { createApplication,updateApplication, deleteApplication, getApplications, getDashboardStats,getAnalytics } from '../controlers/application.controler.js';

const appRouter=express.Router();

appRouter.post(
  "/create",
  protect,
  createApplication
);

appRouter.get(
  "/",
  protect,
  getApplications
);

appRouter.get(
  "/stats",
  protect,
  getDashboardStats
);

appRouter.put(
  "/:id",
  protect,
  updateApplication
);

appRouter.delete(
  "/:id",
  protect,
  deleteApplication
);

appRouter.get("/analytics", protect, getAnalytics);

export default appRouter;