import asyncHandler from 'express-async-handler';
import { Router } from "express";
import { Category, CategoryModel } from '../models/category.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { sample_category_food } from '../data';

const router = Router();
router.post('/create', asyncHandler(
    async (req, res) => {
        const { id, CateID, name } = req.body;
        const category = await CategoryModel.findOne({ name });
        if (category) {
            res.status(HTTP_BAD_REQUEST)
                .send('Danh mục tồn tại!');
            return;
        }

        const newCategory: Category = {
            id: id,
            CateID: CateID,
            name: name,
        }

        const dbCategory = await CategoryModel.create(newCategory);
        res.send(generateFoodResponse(dbCategory));
    }

))

router.put('/edit/:id', asyncHandler(
    async (req, res) => {
        const id = req.params.id;
        const { CateID, name } = req.body;


        try {
            const category = await CategoryModel.findByIdAndUpdate(id, {
                CateID: CateID,
                name: name
            });

            if (!category) {
                res.status(HTTP_BAD_REQUEST).send('Không tìm thấy thực phẩm');
                return;
            }
            res.send(generateFoodResponse(category));
        } catch (error) {
            console.error(error);
            res.status(HTTP_BAD_REQUEST).send('Đã xảy ra lỗi khi cập nhật thực phẩm');
        }

    }
));

router.delete('/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCate = await CategoryModel.findByIdAndRemove(categoryId);

        if (!deletedCate) {
            res.status(HTTP_BAD_REQUEST).send('Không tìm thấy thực phẩm');
        }

        return res.send('');
    } catch (error) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa thực phẩm' });
    }
});

router.get("/seed", asyncHandler(
    async (req, res) => {
        const foodsCount = await CategoryModel.countDocuments();
        if (foodsCount > 0) {
            res.send("Seed is already done!");
            return;
        }

        await CategoryModel.create(sample_category_food);
        res.send("Seed Is Done!");
    }
))


router.get("/", asyncHandler(
    async (req, res) => {
        const foods = await CategoryModel.find();
        res.send(foods);
    }
))

router.get("/:cateId", asyncHandler(
    async (req, res) => {
        const food = await CategoryModel.findById(req.params.cateId);
        res.send(food);
    }
))

const generateFoodResponse = (food: Category) => {
    return {
        id: food.id,
        CateID: food.CateID,
        name: food.name
    };
};


export default router;

