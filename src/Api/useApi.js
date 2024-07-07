import {userAxiosInstance}from './axiosInstance'

export const userSignup=async(signupdata)=>{
    const data= await userAxiosInstance.post('/auth/signup',signupdata)
return data;
}

export const userlogin=async(loginData)=>{   
    const data=await userAxiosInstance.post('/auth/userLogin',loginData)
    return data;
};