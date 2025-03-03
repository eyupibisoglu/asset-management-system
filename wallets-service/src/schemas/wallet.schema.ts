import { Schema, Types } from 'mongoose';

export const WalletSchema = new Schema({
  address: { type: String, required: true },
  network: { type: String, required: true },
  user: { type: String, required: true },
}, { timestamps: true, versionKey: false });

WalletSchema.index({ address: 1, network: 1 }, { unique: true });
WalletSchema.index({ user: 1 }, { unique: true });