export interface UpdateAccessTokenRepository {
  updateAccessToken: (id: string | number, accessToken: string) => Promise<void>
}