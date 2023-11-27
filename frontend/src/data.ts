import { Food } from "./app/shared/models/food";
import { category } from "./app/shared/models/category";
export const sample_foods: Food[] = [
    // sản phẩm mới
    {
        id:'1',
        name:'vegetables pizza',
        price: 600000,
        cookTime: '40-50',
        origins: ['italy'],
        imageUrl: 'assets/image/gallery8.jpg',
        tags: ['FastFood', 'Pizza','Lunch'],
        CateID: '1'
    },
    {
        id:'8',
        name:'Bánh HamBurGer',
        price: 30000,
        cookTime: '15-20',
        origins: ['italy','America'],
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/6.jpg?v=1454130202917',
        tags: ['FastFood', 'Pizza','Lunch'],
        CateID: '1'
    },
    {
        id:'9',
        name:'Pizza thập cẩm',
        price: 335000,
        cookTime: '40-50',
        origins: ['italy'],
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/119.jpg?v=1454043355450',
        tags: ['FastFood', 'Pizza','Lunch'],
        CateID: '1'
    },
    {
        id:'10',
        name:'Pizza dăm bông',
        price: 340000,
        cookTime: '40-50',
        origins: ['italy'],
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/115.jpg?v=1454040800297',
        tags: ['FastFood', 'Pizza','Lunch'],
        CateID: '1'
    },
    // sản phẩm nổi bật
    {
        id:'3',
        name:'Pizza nhân bò phô mai',
        price: 340000,
        cookTime: '30-40',
        origins: ['italy','France','Spain'],
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/1.jpg?v=1454064638327',
        tags: ['FastFood', 'Pizza'],
        CateID: '3'

    },
    {
        id:'4',
        name:'Pizza gà ớt xanh',
        price: 234000,
        cookTime: '40-50',
        origins: ['italy'],
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/112.jpg?v=1454040113190',
        tags: ['FastFood', 'Pizza','Lunch'],
        CateID: '3'

    },
    {
        id:'5',
        name:'Pizza hải sản xúc xích',
        price: 220000,
        cookTime: '40-50',
        origins: ['italy'],
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/113.jpg?v=1454040266683',
        tags: ['FastFood', 'Pizza','Lunch'],
        CateID: '3'

    },
    {
        id:'6',
        name:'Bánh Torrija',
        price: 50000,
        cookTime: '40-50',
        origins: ['italy'],
        imageUrl: 'http://bizweb.dktcdn.net/thumb/large/100/053/643/products/3.jpg?v=1454127534427',
        tags: ['FastFood', 'Pizza','Lunch'],
        CateID: '3'
    },
    {
        id:'7',
        name:'Bánh mứt kem',
        price: 60000,
        cookTime: '40-50',
        origins: ['italy'],
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/8.jpg?v=1454127353800',
        tags: ['FastFood', 'Pizza','Lunch'],
        CateID: '3'
    },
    // pizza
    {
        id:'11',
        name:'Pizza thập cẩm',
        price: 335000,
        cookTime: '40-50',
        origins: ['italy'],
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/119.jpg?v=1454043355450',
        tags: ['FastFood', 'Pizza','Lunch'],
        CateID: '4'
    },
    {
        id:'12',
        name:'Pizza dăm bông',
        price: 340000,
        cookTime: '40-50',
        origins: ['italy'],
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/115.jpg?v=1454040800297',
        tags: ['FastFood', 'Pizza','Lunch'],
        CateID: '4'
    },
    {
        id:'13',
        name:'Pizza gà ớt xanh',
        price: 234000,
        cookTime: '40-50',
        origins: ['italy'],
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/112.jpg?v=1454040113190',
        tags: ['FastFood', 'Pizza','Lunch'],
        CateID: '4'

    },
    {
        id:'14',
        name:'Pizza hải sản xúc xích',
        price: 220000,
        cookTime: '40-50',
        origins: ['italy'],
        imageUrl: '//bizweb.dktcdn.net/thumb/large/100/053/643/products/113.jpg?v=1454040266683',
        tags: ['FastFood', 'Pizza','Lunch'],
        CateID: '4'

    },



];
export const sample_category_food: category[] = [
    // {
    //     CateID:'1',
    //     name:'Sản phẩm mới'
    // },
    // {
    //     CateID:'3',
    //     name:'Sản phẩm nổi bật'
    // },
    // {
    //     CateID:'4',
    //     name:'Pizza'
    // },
    // {
    //     CateID:'5',
    //     name:'Bánh ngọt'
    // },
    // {
    //     CateID:'6',
    //     name:'Bánh kem'
    // },
    // {
    //     CateID:'7',
    //     name:'Đồ ăn nhẹ'
    // }
];