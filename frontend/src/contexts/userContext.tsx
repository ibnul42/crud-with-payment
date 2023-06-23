import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react"

export type User = {
  id: string
  name: string
  email: string
  gender: string
  token: string
  birthDate: string
}

export interface UserContextInterface {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

const defaultState = {
  user: {
    id: "",
    name: "",
    email: "",
    token: "",
    gender: "",
    birthDate: "",
  },
  setUser: (user: User) => { },
} as UserContextInterface

export const UserContext = createContext(defaultState)

type UserProvideProps = {
  children: ReactNode
}

export default function UserProvider({ children }: UserProvideProps) {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    token: "",
    gender: "",
    birthDate: "",
  })
  return (
    <UserContext.Provider value={{ user, setUser }} >
      {children}
    </UserContext.Provider>
  )
}
