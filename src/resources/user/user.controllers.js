import { crudControllers } from '../../utils/crud';
import { User } from './model';

export const userControllers = crudControllers(User);
