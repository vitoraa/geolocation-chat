import React, { useState } from 'react'
import { AddUser } from '../../../domain/usecases/add-user'

type Props = {
  addAccount: AddUser
}

const SignUp: React.FC<Props> = ({ addAccount }: Props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
    } catch (error: any) {

    }
  }

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <h2>Create User</h2>
        <input type="text" name="name" placeholder="Digite seu nome" />
        <input type="email" name="email" placeholder="Digite seu e-mail" />
        <input type="password" name="password" placeholder="Digite sua senha" />
        <input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
        <input type="submit" />
      </form>
    </div >
  )
}

export default SignUp
