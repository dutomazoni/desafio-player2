import { company_routes } from '../Controllers';
import { Router } from 'express';
import authorize from "../Middleware/authentication";

let router = Router();

router.get(
    '/company/:cnpj',
    authorize('admin'),
    company_routes.get_company,
);
router.post(
    '/company/:cnpj',
    authorize('admin'),
    company_routes.register_company,
);
router.post(
    '/company/delete/:cnpj',
    authorize('admin'),
    company_routes.remove_company,
);
router.put(
    '/company/:cnpj',
    authorize('admin'),
    company_routes.edit_company,
);

export default router;
