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

export enum ERedeemStatus {
  valid = 0,
  expired = 1,
}
export interface RedeemResponse {
  expired_at: null | number
  created_at: null | number
  status: ERedeemStatus
  discount: number
  account_id: null | number
  id: number
}
