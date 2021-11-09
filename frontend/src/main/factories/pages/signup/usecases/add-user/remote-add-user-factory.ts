import { RemoteAddUser } from "../../../../../../data/usecases/add-user/remote-add-user"
import { makeApiURL } from "../../../../http/api-url-factory"
import { makeAxiosHttpClient } from "../../../../http/axios-http-client-factory"

export const makeRemoteAddAccount = (): RemoteAddUser => {
  return new RemoteAddUser(makeApiURL('/auth/signup'), makeAxiosHttpClient())
}