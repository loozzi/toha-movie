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
    hot: 'phim-hot',
    detail: 'phim/:slug',
    single: 'phim-le',
    series: 'phim-bo',
    theater: 'phim-chieu-rap'
  },
  category: 'the-loai/:slug',
  country: 'quoc-gia/:slug',
  setting: 'cai-dat',
  home: '/',
  private: '/*',
  public: '/*',
  admin: '/admin/*'
}