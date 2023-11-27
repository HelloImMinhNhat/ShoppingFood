"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var express_1 = require("express");
var category_model_1 = require("../models/category.model");
var http_status_1 = require("../constants/http_status");
var data_1 = require("../data");
var router = (0, express_1.Router)();
router.post(
  "/create",
  (0, express_async_handler_1.default)(function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
      var _a, id, CateID, name, category, newCategory, dbCategory;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            (_a = req.body),
              (id = _a.id),
              (CateID = _a.CateID),
              (name = _a.name);
            return [
              4 /*yield*/,
              category_model_1.CategoryModel.findOne({ name: name }),
            ];
          case 1:
            category = _b.sent();
            if (category) {
              res
                .status(http_status_1.HTTP_BAD_REQUEST)
                .send("Danh mục tồn tại!");
              return [2 /*return*/];
            }
            newCategory = {
              id: id,
              CateID: CateID,
              name: name,
            };
            return [
              4 /*yield*/,
              category_model_1.CategoryModel.create(newCategory),
            ];
          case 2:
            dbCategory = _b.sent();
            res.send(generateFoodResponse(dbCategory));
            return [2 /*return*/];
        }
      });
    });
  })
);
router.put(
  "/edit/:id",
  (0, express_async_handler_1.default)(function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
      var id, _a, CateID, name, category, error_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            id = req.params.id;
            (_a = req.body), (CateID = _a.CateID), (name = _a.name);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, , 4]);
            return [
              4 /*yield*/,
              category_model_1.CategoryModel.findByIdAndUpdate(id, {
                CateID: CateID,
                name: name,
              }),
            ];
          case 2:
            category = _b.sent();
            if (!category) {
              res
                .status(http_status_1.HTTP_BAD_REQUEST)
                .send("Không tìm thấy thực phẩm");
              return [2 /*return*/];
            }
            res.send(generateFoodResponse(category));
            return [3 /*break*/, 4];
          case 3:
            error_1 = _b.sent();
            console.error(error_1);
            res
              .status(http_status_1.HTTP_BAD_REQUEST)
              .send("Đã xảy ra lỗi khi cập nhật thực phẩm");
            return [3 /*break*/, 4];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  })
);
router.delete("/:id", function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, deletedCate, error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          categoryId = req.params.id;
          return [
            4 /*yield*/,
            category_model_1.CategoryModel.findByIdAndRemove(categoryId),
          ];
        case 1:
          deletedCate = _a.sent();
          if (!deletedCate) {
            res
              .status(http_status_1.HTTP_BAD_REQUEST)
              .send("Không tìm thấy thực phẩm");
          }
          return [2 /*return*/, res.send("")];
        case 2:
          error_2 = _a.sent();
          return [
            2 /*return*/,
            res.status(500).json({ error: "Đã xảy ra lỗi khi xóa thực phẩm" }),
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
});
router.get(
  "/seed",
  (0, express_async_handler_1.default)(function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
      var foodsCount;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              category_model_1.CategoryModel.countDocuments(),
            ];
          case 1:
            foodsCount = _a.sent();
            if (foodsCount > 0) {
              res.send("Seed is already done!");
              return [2 /*return*/];
            }
            return [
              4 /*yield*/,
              category_model_1.CategoryModel.create(
                data_1.sample_category_food
              ),
            ];
          case 2:
            _a.sent();
            res.send("Seed Is Done!");
            return [2 /*return*/];
        }
      });
    });
  })
);
router.get(
  "/",
  (0, express_async_handler_1.default)(function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
      var foods;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, category_model_1.CategoryModel.find()];
          case 1:
            foods = _a.sent();
            res.send(foods);
            return [2 /*return*/];
        }
      });
    });
  })
);
router.get(
  "/:cateId",
  (0, express_async_handler_1.default)(function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
      var food;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              category_model_1.CategoryModel.findById(req.params.cateId),
            ];
          case 1:
            food = _a.sent();
            res.send(food);
            return [2 /*return*/];
        }
      });
    });
  })
);
var generateFoodResponse = function (food) {
  return {
    id: food.id,
    CateID: food.CateID,
    name: food.name,
  };
};
exports.default = router;
