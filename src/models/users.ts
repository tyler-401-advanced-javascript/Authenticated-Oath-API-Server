import mongoose from 'mongoose';

import jwt from 'jsonwebtoken';

export interface IUsersDocument extends mongoose.Document {
  username: string;
  password: string;
  email: string;
  role: any;
  generateToken(): string;
  authenticateBasic(username: string, password: string): boolean;
}


interface IUsersModel extends mongoose.Model<IUsersDocument> { //Our IUsersModel (the instance of our model that i called Model), now has access tot he same prototypes that mongoose.Model has. and you are TYPING mongoose.Model to be of type IUsersDocument. and anything typed as IUsersDocument extents mongoose.Document which is some thing deep down in the lbrary and high level. 
  test: () => void
}

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, select: true },
  password: { type: String, required: true, select: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }
})


const Model = mongoose.model<IUsersDocument, IUsersModel>('users', usersSchema);

//custom model prototypes
Model.prototype.generateToken = function () {
  const tokenData = {
    username: this.username,
    email: this.email,
    permissions: this.role.permissions || []
  }
  return jwt.sign(tokenData, process.env.SECRET);
}

Model.test = () => {
  console.log("TEST!")
}



export default Model;