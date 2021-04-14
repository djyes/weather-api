import * as mongoose from 'mongoose';

export const LogSchema = new mongoose.Schema<any>(
    {
      city: { type: String, required: true},
      data:{ type: Object, required: true},
    },
    { timestamps: true },
);