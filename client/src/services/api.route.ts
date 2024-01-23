const auth = {
  login: '/auth/login',
  register: '/auth/register',
  sendOtp: '/auth/send-otp',
  verify: '/auth/verify',
  logout: '/auth/logout',
  refreshToken: '/auth/refresh-token',
  resetPassword: '/auth/reset-password'
}

const category = {
  all: '/category/all',
  create: '/category/create',
  update: '/category/update',
  delete: '/category/delete',
  search: '/category/search'
}

const country = {
  all: '/country/all',
  search: '/country/search'
}

export default {
  auth,
  category,
  country
}