require('dotenv').config();

export const IS_PROD = process.env.NODE_ENV === 'production';
export const NODE_ENV = process.env.NODE_ENV;