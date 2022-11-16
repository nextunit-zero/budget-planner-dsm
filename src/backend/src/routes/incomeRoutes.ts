import { Request, Router } from "express";
import controller from '../controllers/income';

const router = Router();

router.route('/')
    .get((req, res, next) => {
        controller.getIncomes().then(incomes => {
            res.status(200).send(incomes);
        }).finally(next);;
    })
    .post((req, res, next) => {
        controller.createIncome(req.body).then((income) => {
            res.status(201).location(`${req.baseUrl}/${income.id}`);
        }).finally(next);
    });

router.route('/:id(\\d+)')
    .get((req: Request<{ id: number }>, res, next) => {
        controller.deleteIncome(req.params.id)
            .then((income) => {
                res.status(200).send(income);
            })
            .catch(() => res.status(404))
            .finally(next);
    })
    .delete((req: Request<{ id: number }>, res, next) => {
        controller.deleteIncome(req.params.id)
            .then((income) => {
                res.status(200).send(income);
            })
            .catch(() => res.status(404))
            .finally(next);
    });

export default router;