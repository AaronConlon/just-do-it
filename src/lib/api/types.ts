export interface LoginRequest {
  username: string
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    username: string
    email: string
  }
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}
