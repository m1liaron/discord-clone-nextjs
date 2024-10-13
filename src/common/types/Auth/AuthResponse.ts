import { type User } from '../User/User';

export type AuthResponse = {
    user: User
    token: string
}