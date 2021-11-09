import { environment } from "../../../environment"

export const makeApiURL = (path: string): string => {
  const url = environment.API_URL
  return `${url}${path}`
}