import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
}, { collection: 'admins' });

export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
