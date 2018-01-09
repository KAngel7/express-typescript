import { Mockgoose } from 'mockgoose-fix';
import * as mongoose from 'mongoose';

(mongoose as any).Promise = global.Promise;

if (process.env.NODE_ENV === 'testing') {

  const mockgoose = new Mockgoose(mongoose);
  mockgoose.helper.setDbVersion('3.4.3');

  mockgoose.prepareStorage().then((): void => {
    mongoose.connect('mongodb://example.com/TestingDB', {
      useMongoClient: true,
    });
  });

} else {

  mongoose.connect('mongodb://admin-medicalinfo:Fami%40123@210.2.86.35:27017/medical_personalmedicalinfo', {
    useMongoClient: true,
  });

}

export { mongoose };
