import { Schema, Types, model } from "mongoose";

export interface coupons{
    id : string;
    name: string;
    discountCode : string;
    discountPercent : number;
}

export const FoodSchema = new Schema<coupons>({
    name:{type: String, required: true},
    discountCode: {type: String, required: true},
    discountPercent: {type: Number, required: true},

},{
    toJSON:{
        virtuals: true,
    },
    toObject:{
        virtuals:true
    },
    timestamps:true

}
);

export const couponModel = model<coupons>('discount', FoodSchema);