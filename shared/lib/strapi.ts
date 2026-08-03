import { strapi } from '@strapi/client'

const { STRAPI_API_BASE_URL, STRAPI_API_KEY } = process.env

export const strapiClient = strapi({
  baseURL: STRAPI_API_BASE_URL!,
  auth: STRAPI_API_KEY!,
})
