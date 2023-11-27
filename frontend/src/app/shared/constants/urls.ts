const BASE_URL = 'http://localhost:5000'

export const FOOD_URL = BASE_URL + '/api/foods';
export const FOOD_CATEGORY_URL = FOOD_URL + '/category';
export const FOOD_BY_CATEGORY_URL = FOOD_URL + '/category/';
export const FOOD_BY_ID_URL = FOOD_URL + '/';
export const FOOD_CREATE_URL = FOOD_URL + '/create';
export const FOOD_EDIT_URL = FOOD_URL + '/edit';
export const FOOD_EDIT_BY_ID_URL = FOOD_EDIT_URL + '/';


export const CATEGORY_URL = BASE_URL + '/api/categories';
export const CATEGORY_BY_ID_URL = CATEGORY_URL + '/';
export const CATEGORY_CREATE_URL = CATEGORY_URL + '/create';
export const CATEGORY_EDIT_URL = CATEGORY_URL + '/edit';
export const CATEGORY_EDIT_BY_ID_URL = CATEGORY_EDIT_URL + '/';

export const USER_URL = BASE_URL + '/api/users/';
export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';
export const USER_EDIT_URL = USER_URL + 'edit';
export const USER_EDIT_BY_ID_URL = USER_EDIT_URL + '/';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDER_TRACK_URL = ORDERS_URL + '/track/';
export const ORDER_TRACK_USER_URL = ORDERS_URL + '/';

export const COUPON_URL = BASE_URL + '/api/coupons';
export const COUPON_BY_ID_URL = COUPON_URL + '/';
export const COUPON_CREATE_URL = COUPON_URL + '/create';
export const COUPON_EDIT_URL = COUPON_URL + '/edit';
export const COUPON_EDIT_BY_ID_URL = COUPON_EDIT_URL + '/';
export const COUPON_BY_NAME_URL = COUPON_URL + '/search/';
