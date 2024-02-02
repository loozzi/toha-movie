import slug from './slug'

export default {
  auth: {
    login: 'auth/login',
    register: 'auth/register',
    sendOtp: 'auth/send-otp',
    verify: 'auth/verify',
    logout: 'auth/logout',
    refreshToken: 'auth/refresh-token',
    resetPassword: 'auth/reset-password'
  },
  movie: {
    detail: `${slug.key.movie}/:slug`,
    single: `${slug.key.search}?${slug.key.type}=${slug.value.type.singles}`,
    series: `${slug.key.search}?${slug.key.type}=${slug.value.type.series}`,
    theater: `${slug.key.search}?${slug.key.theater}=${slug.value.theaters.yes}`,
    watch: `${slug.key.movie}/:slug/watch`
  },
  setting: 'cai-dat',
  search: 'tim-kiem',
  year: 'nam/:year',
  home: '/',
  private: '/*',
  public: '/*',
  admin: '/admin/*'
}
