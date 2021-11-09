import React, { useEffect, useState } from 'react'
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
    role: 'user'
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      console.log(state)
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
        role: state.role
      })
    } catch (error: any) {

    }
  }

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <h2>Create User</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
        <input type="email" name="email" placeholder="E-mail" onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
        <input type="password" name="passwordConfirmation" placeholder="Password Confirmation" onChange={handleInputChange} />
        <input type="submit" />
      </form>
    </div >
  )
}

export default SignUp
