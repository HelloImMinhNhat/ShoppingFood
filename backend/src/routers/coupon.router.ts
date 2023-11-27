import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { couponModel, coupons } from "../models/coupon.model";
import { sample_discounts } from "../data";
import { HTTP_BAD_REQUEST } from "../constants/http_status";


const router = Router();

router.get("/seed", asyncHandler(
  async (req, res) => {
    const discountCount = await couponModel.countDocuments();
    if (discountCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await couponModel.create(sample_discounts);
    res.send("Seed Is Done!");
  }
));
router.get("/", asyncHandler(
  async (req, res) => {
    const coupon = await couponModel.find();
    res.send(coupon);
  }
))
router.get("/:id", asyncHandler(
  async (req, res) => {
    const coupon = await couponModel.findById(req.params.id);
    res.send(coupon);
  }

))
router.get("/search/:searchTerm", asyncHandler(
  async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const foods = await couponModel.find({ discountCode: { $regex: searchRegex } })
    res.send(foods);
  }
))

router.post('/create', asyncHandler(
  async (req, res) => {
      const { id, name, discountCode, discountPercent } = req.body;
      const discount = await couponModel.findOne({ discountCode });
      if (discount) {
          res.status(HTTP_BAD_REQUEST)
              .send('Mã giảm giá tồn tại!');
          return;
      }

      const newDiscount: coupons = {
          id: id,
          name: name,
          discountCode: discountCode,
          discountPercent: discountPercent
      }

      const dbDiscount= await couponModel.create(newDiscount);
      res.send(generateFoodResponse(dbDiscount));
  }

))

router.put('/edit/:id', asyncHandler(
  async (req, res) => {
      const id = req.params.id;
      const { name, discountCode, discountPercent } = req.body;


      try {
          const discount = await couponModel.findByIdAndUpdate(id, {
              name: name,
              discountCode: discountCode,
              discountPercent: discountPercent
          });

          if (!discount) {
              res.status(HTTP_BAD_REQUEST).send('Không tìm thấy mã giảm giá');
              return;
          }
          res.send(generateFoodResponse(discount));
      } catch (error) {
          console.error(error);
          res.status(HTTP_BAD_REQUEST).send('Đã xảy ra lỗi khi cập nhật mã giảm giá');
      }

  }
));

router.delete('/:id', async (req, res) => {
  try {
      const discountId = req.params.id;
      const deletedDiscount = await couponModel.findByIdAndRemove(discountId);

      if (!deletedDiscount) {
          res.status(HTTP_BAD_REQUEST).send('Không tìm thấy mã giảm giá');
      }

      return res.send('');
  } catch (error) {
      return res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa mã giảm giá' });
  }
});


const generateFoodResponse = (discount: coupons) => {
  return {
      id: discount.id,
      name: discount.name,
      discountCode: discount.discountCode,
      discountPercent: discount.discountPercent
  };
};

export default router;

