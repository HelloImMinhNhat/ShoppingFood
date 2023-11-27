import { Schema, model } from "mongoose";

export interface Category{
    id: string;
    CateID:string
    name: string;
}
export const CategorySchema = new Schema<Category>({
    name: {type: String, required: true},
    CateID: {type: String, required: true}
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

export const CategoryModel = model<Category>('category', CategorySchema);