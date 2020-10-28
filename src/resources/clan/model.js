import mongoose from 'mongoose';

const clansSchema = new mongoose.Schema({
  name: String,
  origin: String,
});

export const Clan = mongoose.model('clan', clansSchema);
