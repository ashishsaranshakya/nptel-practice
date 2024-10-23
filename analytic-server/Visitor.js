import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
	hour: { type: String, required: true },
	count: { type: Number, default: 0 }
});
  
const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor;