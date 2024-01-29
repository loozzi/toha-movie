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

const movie = {
  all: '/movie/all',
  detail: '/movie/detail',
  episodes: '/movie/episodes',
  add: '/movie/add',
  update: '/movie/update',
  delete: '/movie/delete',
  rate: '/movie/rate'
}

const history = {
  all: '/history/all',
  add: '/history/create',
  delete: '/history/delete'
}

export default {
  auth,
  category,
  country,
  movie,
  history
}
