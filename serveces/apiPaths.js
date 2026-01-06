const apiPaths = {
    register: () => 'auth/register',
    login: () => '/auth/login',

    createCoins: () => '/app/coin/create',
    getCoins: () => '/app/coin/',
    deleteCoin:(id)=>`/app/coin/delete/${id}`,

    addToCart:()=>"/app/cart/add",
    deleteItemFromCart:(id)=>`/app/cart/delete/${id}`,
    getItemsFromCart:()=>`/app/cart`,

    profilePic: () => 'auth/upload-profile',
    

    otpGenerate: () => 'auth/generate-otp',
    otpVerify: () => '/auth/verify-otp',
    isUserExist: () => '/auth/is-user-exist',
    recoverPassword: () => `/auth/update-user-password`,
    
    allUsers: () => "app/users"
}
export default apiPaths;