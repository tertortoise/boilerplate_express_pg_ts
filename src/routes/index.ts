import { Router } from 'express';
import { getAllUsers } from './Users';


// User-route
const userRouter = Router();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
userRouter.get('/all', getAllUsers);
// userRouter.post('/add', addOneUser);
// userRouter.put('/update', updateOneUser);
// userRouter.delete('/delete/:id', deleteOneUser);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/users', userRouter);
export default baseRouter;
