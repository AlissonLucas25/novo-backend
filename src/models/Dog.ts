import mongoose, { Schema, Document } from 'mongoose';

export interface IDog extends Document {
  name: string;
  breed: string;
  age: number;
  description?: string;
  imageUrl?: string;
}

const DogSchema: Schema = new Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String }
}, {
  timestamps: true
});

export default mongoose.model<IDog>('Dog', DogSchema);