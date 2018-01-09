import { mongoose } from '../../config/database';
import { Document, Model, Schema } from 'mongoose';

export interface Author extends Document {
  age: number;
  name: string;
  create?: Date;
  description?: string;
}

export interface AuthorModel extends Model<Author> {
  updateAuthor(id: {}, description: string): Promise<{ nModified: number }>;
  updateByAge(ageLimit: number, text: string): Promise<{ ok: number, nModified: number, n: number }>;
}

const schema = new Schema({
  age: {
    type: Number
  },
  name: {
    type: String,
    required: true
  },
  create: {
    type: Date,
    'default': Date.now
  },
  description: {
    type: String
  }
});

schema.static('updateAuthor', (author: {}, description: string) => {

  return Author
    .update({
      '_id': author
    },      {
      '$set': {
        'description': description
      }
    })
    .exec();
});

schema.static('updateByAge', (ageLimit: number, text: string) => {

  return Author
    .where('age')
    .gte(ageLimit)
    .update({
      '$set': {
        description: text
      }
    })
    .exec();
});

export const Author = mongoose.model<Author>('Author', schema) as AuthorModel;
