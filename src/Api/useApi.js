import {userAxiosInstance}from './axiosInstance'

export const userSignup=async(signupdata)=>{

    const data= await userAxiosInstance.post('/auth/register',signupdata)
return data;
}

export const userlogin=async(loginData)=>{   
    const data=await userAxiosInstance.post('/auth/login',loginData)
    return data;
};