import { crudControllers } from '../../utils/crud';
import { Clan } from './model';

export const clanControllers = crudControllers(Clan);
