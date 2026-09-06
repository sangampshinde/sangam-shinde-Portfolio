import {createClient} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'


export const client = createClient({
  projectId: 'vyqhv9hg',   
  dataset: 'production',          
  apiVersion: '2024-01-01',       
  useCdn: true,                   
  token: process.env.SANITY_TOKEN 
})


const builder = createImageUrlBuilder(client)

const emptyBuilder = {
  url: () => null,
  width: () => emptyBuilder,
  height: () => emptyBuilder,
  fit: () => emptyBuilder,
  auto: () => emptyBuilder,
  rect: () => emptyBuilder,
  size: () => emptyBuilder,
  format: () => emptyBuilder,
  quality: () => emptyBuilder,
  toString: () => ''
}

export const urlFor = (source) => {
  if (!source) return emptyBuilder
  try {
    return builder.image(source)
  } catch (err) {
    return emptyBuilder
  }
}