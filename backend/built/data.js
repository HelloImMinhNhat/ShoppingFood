"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sample_discounts = exports.sample_users = exports.sample_category_food = exports.sample_foods = void 0;
exports.sample_foods = [
    // sản phẩm mới
    {
        name: 'vegetables pizza',
        price: 600000,
        cookTime: '40-50',
        favorite: false,
        origins: ['italy'],
        stars: 4.0,
        imageUrl: 'assets/image/gallery8.jpg',
        tags: ['FastFood', 'Pizza', 'Lunch'],
        CateID: '1'
    },
    {
        name: 'Bánh HamBurGer',
        price: 30000,
        cookTime: '15-20',
        favorite: false,
        origins: ['italy', 'America'],
        stars: 4.0,
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/6.jpg?v=1454130202917',
        tags: ['FastFood', 'Pizza', 'Lunch'],
        CateID: '1'
    },
    {
        name: 'Pizza thập cẩm',
        price: 335000,
        cookTime: '40-50',
        favorite: false,
        origins: ['italy'],
        stars: 4.0,
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/119.jpg?v=1454043355450',
        tags: ['FastFood', 'Pizza', 'Lunch'],
        CateID: '1'
    },
    {
        name: 'Pizza dăm bông',
        price: 340000,
        cookTime: '40-50',
        favorite: false,
        origins: ['italy'],
        stars: 4.0,
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/115.jpg?v=1454040800297',
        tags: ['FastFood', 'Pizza', 'Lunch'],
        CateID: '1'
    },
    // sản phẩm nổi bật
    {
        name: 'Pizza nhân bò phô mai',
        price: 340000,
        cookTime: '30-40',
        favorite: false,
        origins: ['italy', 'France', 'Spain'],
        stars: 4.0,
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/1.jpg?v=1454064638327',
        tags: ['FastFood', 'Pizza'],
        CateID: '2'
    },
    {
        name: 'Pizza gà ớt xanh',
        price: 234000,
        cookTime: '40-50',
        favorite: false,
        origins: ['italy'],
        stars: 4.0,
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/112.jpg?v=1454040113190',
        tags: ['FastFood', 'Pizza', 'Lunch'],
        CateID: '2'
    },
    {
        name: 'Pizza hải sản xúc xích',
        price: 220000,
        cookTime: '40-50',
        favorite: false,
        origins: ['italy'],
        stars: 4.0,
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/113.jpg?v=1454040266683',
        tags: ['FastFood', 'Pizza', 'Lunch'],
        CateID: '2'
    },
    {
        name: 'Bánh Torrija',
        price: 50000,
        cookTime: '40-50',
        favorite: false,
        origins: ['italy'],
        stars: 4.0,
        imageUrl: 'http://bizweb.dktcdn.net/thumb/large/100/053/643/products/3.jpg?v=1454127534427',
        tags: ['FastFood', 'Pizza', 'Lunch'],
        CateID: '2'
    },
    {
        name: 'Bánh mứt kem',
        price: 60000,
        cookTime: '40-50',
        favorite: false,
        origins: ['italy'],
        stars: 4.0,
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/8.jpg?v=1454127353800',
        tags: ['FastFood', 'Pizza', 'Lunch'],
        CateID: '2'
    },
    // pizza
    {
        name: 'Pizza thập cẩm',
        price: 335000,
        cookTime: '40-50',
        favorite: false,
        origins: ['italy'],
        stars: 4.0,
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/119.jpg?v=1454043355450',
        tags: ['FastFood', 'Pizza', 'Lunch'],
        CateID: '3'
    },
    {
        name: 'Pizza dăm bông',
        price: 340000,
        cookTime: '40-50',
        favorite: false,
        origins: ['italy'],
        stars: 4.0,
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/115.jpg?v=1454040800297',
        tags: ['FastFood', 'Pizza', 'Lunch'],
        CateID: '3'
    },
    {
        name: 'Pizza gà ớt xanh',
        price: 234000,
        cookTime: '40-50',
        favorite: false,
        origins: ['italy'],
        stars: 4.0,
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/112.jpg?v=1454040113190',
        tags: ['FastFood', 'Pizza', 'Lunch'],
        CateID: '3'
    },
    {
        name: 'Pizza hải sản xúc xích',
        price: 220000,
        cookTime: '40-50',
        favorite: false,
        origins: ['italy'],
        stars: 4.0,
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/113.jpg?v=1454040266683',
        tags: ['FastFood', 'Pizza', 'Lunch'],
        CateID: '3'
    },
];
exports.sample_category_food = [
    {
        CateID: '1',
        name: 'Sản phẩm mới'
    },
    {
        CateID: '2',
        name: 'Sản phẩm nổi bật'
    },
    {
        CateID: '3',
        name: 'Pizza'
    },
    {
        CateID: '4',
        name: 'Bánh ngọt'
    },
    {
        CateID: '5',
        name: 'Bánh kem'
    },
    {
        CateID: '6',
        name: 'Đồ ăn nhẹ'
    }
];
exports.sample_users = [];
exports.sample_discounts = [
    {
        name: "Voucher giảm giá 20%",
        discountCode: "tinhheo",
        discountPercent: 20,
    },
    {
        name: "Voucher giảm giá 50%",
        discountCode: "Minhnhat",
        discountPercent: 50,
    },
];
