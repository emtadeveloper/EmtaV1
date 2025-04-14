const authRouter = require('../routes/auth.route');
const userRouter = require('../routes/user.route');

const setupRoutes = (app) => {
  app.use("/api/auth/", authRouter);
  app.use("/api/user/", userRouter);
};

module.exports = setupRoutes 
