import { Schema, Types } from 'mongoose';
import { Currency } from 'src/enums/currency.enum';

export const AssetSchema = new Schema({
  name: { type: String, enum: Object.values(Currency), required: true },
  amount: { type: Number, required: true },
  wallet: { type: Types.ObjectId, ref: 'Wallet' },
}, { timestamps: true, versionKey: false });

AssetSchema.index({ wallet: 1 }, { unique: true });