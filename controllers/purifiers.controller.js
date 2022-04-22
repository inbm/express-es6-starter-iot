import Purifier from '../models/purifiers.model'
import logger from '../core/logger/app-logger'

const controller = {};

controller.getAll = async (req, res) => {
    try {
        const purifiers = await Purifier.getAll();
        logger.info('sending all purifiers...');
        res.send(purifiers);
    }
    catch(err) {
        logger.error('Error in getting purifiers- ' + err);
        res.send('Got error in getAll');
    }
}

controller.addPurifier = async (req, res) => {
    let purifierToAdd = Purifier({
        name: req.body.name
    });
    try {
        const savedPurifier = await Purifier.addPurifier(purifierToAdd);
        logger.info('Adding purifier...');
        res.send('added: ' + savedPurifier);
    }
    catch(err) {
        logger.error('Error in getting purifiers- ' + err);
        res.send('Got error in getAll');
    }
}

controller.deletePurifier = async (req, res) => {
    let purifierName = req.body.name;
    try{
        const removedPurifier = await Purifier.removePurifier(purifierName);
        logger.info('Deleted Purifier- ' + removedPurifier);
        res.send('Purifier successfully deleted');
    }
    catch(err) {
        logger.error('Failed to delete purifier- ' + err);
        res.send('Delete failed..!');
    }
}

export default controller;