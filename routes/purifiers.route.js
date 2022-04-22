import express from "express";
import purifierController from "../controllers/purifiers.controller"
const router = express.Router()

router.get('/allpurifiers', (req, res) => {
    purifierController.getAll(req, res);
});

router.post('/addpurifier', (req, res) => {
    purifierController.addPurifier(req, res);
});

router.delete('/deletepurifier', (req, res) => {
    purifierController.deletePurifier(req, res);
});

export default router;