import { normalize } from 'path'

export const pathNormalize = async (path: string) => {
  return normalize(path)
}
