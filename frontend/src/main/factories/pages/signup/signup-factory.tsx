import React from 'react'
import SignUp from '../../../../presentation/pages/signup/signup'
import { makeRemoteAddAccount } from './usecases/add-user/remote-add-user-factory'

export const makeSignUp = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
    />
  )
}