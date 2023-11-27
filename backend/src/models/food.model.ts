import { Schema, model } from "mongoose";

export interface Food{
    id: string;
    name: string;
    price: number;
    tags: string[];
    imageUrl: string;
    origins: string[];
    cookTime: string;
    CateID: string;
}
export const FoodSchema = new Schema<Food>({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    tags: {type: [String]},
    imageUrl: {type: String, required: true},
    origins: {type: [String], required: true},
    cookTime: {type: String, required: true},
    CateID: {type: String, required: true},

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

export const FoodModel = model<Food>('food', FoodSchema);