import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    // name: {type: String, required: true, unique: true, index: true}
    name: {type: String, required: true}
}, {collection : 'User'});

let UsersModel = mongoose.model('User', UserSchema);

UsersModel.getAll = () => {
    return  UsersModel.find({});
}

UsersModel.addUser = (userToAdd) => {
    return userToAdd.save();
}

UsersModel.removeUser = (userName) => {
    return UsersModel.remove({name: userName});
}

export default UsersModel;