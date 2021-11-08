import { HttppostClientSpy } from "../../test/mock-http-client"
import { RemoteAuthentication } from "./remote-authentication"

describe('RemoteAuthentication', () => {
  test('Should call HttppostClient with correct URL', async () => {
    const url = 'any_url'
    const httppostClient = new HttppostClientSpy()
    const sut = new RemoteAuthentication(url, httppostClient)
    await sut.auth()
    expect(httppostClient.url).toBe(url)
  })
})

export { }
