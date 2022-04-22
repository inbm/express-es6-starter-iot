import Mongoose from 'mongoose';
import logger from '../core/logger/app-logger'
import config from '../core/config/config.dev'

Mongoose.Promise = global.Promise;
 
const connectToDb = async () => {

    console.log('try to connect')
    let dbHost = config.dbHost;
    let dbPort = config.dbPort;
    let dbName = config.dbName;
    try {
        await Mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);
    }
    catch (err) {
        console.log(err);
        logger.error('Could not connect to MongoDB');
    }
}

export default connectToDb;