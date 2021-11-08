import { HttpPostClient } from "../../protocols/http/http-post-client"
import { RemoteAuthentication } from "./remote-authentication"

describe('RemoteAuthentication', () => {
  test('Should call HttppostClient with correct URL', async () => {
    class HttppostClientSpy implements HttpPostClient {
      url?: string
      async post (url: string): Promise<void> {
        this.url = url
      }
    }
    const url = 'any_url'
    const httppostClient = new HttppostClientSpy()
    const sut = new RemoteAuthentication(url, httppostClient)
    await sut.auth()
    expect(httppostClient.url).toBe(url)
  })
})

export { }
