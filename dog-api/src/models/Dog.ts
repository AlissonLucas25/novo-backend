import mongoose, { Document, Schema } from 'mongoose';

export interface IDog extends Document {
  name: string;
  breed: string;
  age: number;
  weight: number;
  owner?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DogSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    owner: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IDog>('Dog', DogSchema);