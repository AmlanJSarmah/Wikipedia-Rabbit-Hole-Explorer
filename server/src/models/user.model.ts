import mongoose, { Schema } from 'mongoose';

type Nodes = {
  id: string;
  data: { label: string };
  position: { x: number; y: number };
};

type Edges = {
  id: string;
  source: number;
  target: number;
};

interface IUser extends mongoose.Document {
  name: string;
  password: string;
  nodes: Nodes[];
  edges: Edges[];
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nodes: [
    {
      id: String,
      data: { label: String },
      position: { x: Number, y: Number },
    },
  ],
  edges: [
    {
      id: String,
      source: Number,
      target: Number,
    },
  ],
});

export const User = mongoose.model<IUser>('User', userSchema, 'users');
export default User;
