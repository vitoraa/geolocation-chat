import { HttppostClientSpy } from "../../test/mock-http-client"
import { RemoteAuthentication } from "./remote-authentication"

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttppostClientSpy
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httppostClientSpy = new HttppostClientSpy()
  const sut = new RemoteAuthentication(url, httppostClientSpy)
  return {
    sut,
    httpPostClientSpy: httppostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttppostClient with correct URL', async () => {
    const url = 'url'
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})

export { }
