import mongoose from 'mongoose';

const PurifierSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true, index: true}
}, {collection : 'Purifier'});

let PurifiersModel = mongoose.model('Purifier', PurifierSchema);

PurifiersModel.getAll = () => {
    return PurifiersModel.find({});
}

PurifiersModel.addPurifier = (purifierToAdd) => {
    return purifierToAdd.save();
}

PurifiersModel.removePurifier = (purifierName) => {
    return PurifiersModel.remove({name: purifierName});
}

export default PurifiersModel;