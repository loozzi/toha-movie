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
  private: '/*',
  public: '/*',
  admin: '/admin/*'
}
