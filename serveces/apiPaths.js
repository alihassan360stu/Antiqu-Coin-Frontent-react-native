const apiPaths = {
    register: () => 'auth/register',
    login: () => '/auth/login',
    otpGenerate: () => 'auth/generate-otp',
    otpVerify: () => '/auth/verify-otp',
    isUserExist: () => '/auth/is-user-exist',
    recoverPassword: () => `/auth/update-user-password`,
    profilePic: () => 'app/profile',
    allUsers: () => "app/users"
}
export default apiPaths;