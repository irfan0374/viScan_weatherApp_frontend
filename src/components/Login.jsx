import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { userlogin } from '../Api/useApi'
import { userLogin } from '../Redux/userSlice'
import { loginSchema } from '../Schema/LoginSchema'
import { toast } from 'react-toastify'


const LoginPage = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { values, errors, touched, getFieldProps, handleSubmit } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit

    })

    async function onSubmit() {
        console.log("hello submit")
        try {
            const res = await userlogin(values)
            if (res?.status == 200) {
                const { token, User } = res.data
                localStorage.setItem("usertoken", token);
                dispatch(
                    userLogin({
                        token: token,
                        user: User,
                    })
                );
                console.log("hhelo submit is okey now")
                toast.success(res?.data?.message)
                navigate("/")
            }

        } catch (error) {
            console.log(error.message, "response in error")
            toast.error(error.response?.data?.message);
        }

    }

    return (
        <>
            <div>
                <div className="container mx-auto ">
                    <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                        <div
                            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
                            style={{
                                backgroundImage: "url(/public/LoginImage.JPEG)",
                            }}
                        >
                        </div>
                        <div className="w-full lg-w-1/2 py-16 px-12">

                            <h2 className="text-3xl mb-4 text-black font-serif font-semibold ">User Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className=''>
                                    <div className="mt-5">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full"
                                            {...getFieldProps("email")}
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            className="border border-gray-400 rounded-lg shadow-md py-2 px-4 w-full"
                                            {...getFieldProps("password")}
                                        />
                                    </div>

                                    <div className="mt-5">
                                        <button type='submit' className="w-full bg-blue-500 py-3 text-center text-white rounded-lg shadow-md">
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage