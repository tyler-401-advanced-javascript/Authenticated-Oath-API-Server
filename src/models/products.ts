import mongoose, { model } from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  displayCategory: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true }
})

export default mongoose.model('Product', productSchema)

//id: 1,
// name: 'Tyler',
// displayCategory: 'Person',
// category: CategoryList.Filter.PERSON,
// price: 55,
// description: 'software developer with well developed chihuahua complex',
// stock: 5