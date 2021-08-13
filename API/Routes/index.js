import user_routes from './user.routes';
import company_routes from './company.routes';
import { Router } from 'express';

const router = Router();

router.use(user_routes);
router.use(company_routes);

export default router;
