import { strapi } from '@strapi/client'

const { STRAPI_BASE_URL, STRAPI_API_TOKEN } = process.env

export const strapiClient = strapi({
  baseURL: STRAPI_BASE_URL!,
  auth: STRAPI_API_TOKEN!,
})
