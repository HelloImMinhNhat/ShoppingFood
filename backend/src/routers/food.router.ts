import { Router } from "express";
import { sample_category_food, sample_foods } from "../data";
import asyncHandler from 'express-async-handler';
import { Food, FoodModel } from '../models/food.model';
import { HTTP_BAD_REQUEST, HTTP_UNAUTHORIZED } from '../constants/http_status';

const router = Router();
router.post('/create', asyncHandler(
  async (req, res) => {
    const { id, name, price, tags, imageUrl, origins, cookTime, CateID } = req.body;
    const food = await FoodModel.findOne({ name });
    if (food) {
      res.status(HTTP_BAD_REQUEST)
        .send('Sản phẩm tồn tại!');
      return;
    }

    const newFood: Food = {
      id: id,
      name: name,
      price: price,
      cookTime: cookTime,
      origins: origins.split(','),
      imageUrl: imageUrl,
      tags: tags.split(','),
      CateID: CateID
    }

    const dbFood = await FoodModel.create(newFood);
    res.send(generateFoodResponse(dbFood));
  }

))

router.put('/edit/:id', asyncHandler(
  async (req, res) => {
    const id = req.params.id;
    const { name, price, tags, imageUrl, origins, cookTime, CateID } = req.body;

    try {
      const food = await FoodModel.findByIdAndUpdate(id, {
        name: name,
        price: price,
        tags: tags,
        imageUrl: imageUrl,
        origins: origins,
        cookTime: cookTime,
        CateID: CateID
      });

      if (!food) {
        res.status(HTTP_BAD_REQUEST).send('Không tìm thấy thực phẩm');
        return;
      }
      res.send(generateFoodResponse(food));
    } catch (error) {
      console.error(error);
      res.status(HTTP_BAD_REQUEST).send('Đã xảy ra lỗi khi cập nhật thực phẩm');
    }

  }
));

router.delete('/:id', async (req, res) => {
  try {
    const foodId = req.params.id;
    const deletedFood = await FoodModel.findByIdAndRemove(foodId);

    if (!deletedFood) {
      res.status(HTTP_BAD_REQUEST).send('Không tìm thấy thực phẩm');
    }

    return res.send('');
  } catch (error) {
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa thực phẩm' });
  }
});

router.get("/seed", asyncHandler(
  async (req, res) => {
    const foodsCount = await FoodModel.countDocuments();
    if (foodsCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await FoodModel.create(sample_foods);
    res.send("Seed Is Done!");
  }
))


router.get("/", asyncHandler(
  async (req, res) => {
    const foods = await FoodModel.find();
    res.send(foods);
  }
))
router.get("/category", asyncHandler(
  async (req, res) => {
    const category = await FoodModel.aggregate([
      {
        $unwind: '$category'
      },
      {
        $group: {
          _id: '$category',
        }
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
        }
      }
    ]).sort({ count: -1 });

    const all = {
      name: 'All',
      count: await FoodModel.countDocuments()
    }

    category.unshift(all);
    res.send(category);
  }
))
router.get("/category/:CateID", asyncHandler(
  async (req, res) => {
    const foods = await FoodModel.find({ CateID: req.params.CateID })
    res.send(foods);
  }
))

router.get("/:foodId", asyncHandler(
  async (req, res) => {
    const food = await FoodModel.findById(req.params.foodId);
    res.send(food);
  }
))

const generateFoodResponse = (food: Food) => {
  return {
    id: food.id,
    name: food.name,
    price: food.price,
    cookTime: food.cookTime,
    origins: food.origins,
    imageUrl: food.imageUrl,
    tags: food.tags,
    CateID: food.CateID
  };
};


export default router;

