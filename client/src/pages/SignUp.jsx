import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from '@/components/ui/card'
import { RouteSignIn } from '@/helpers/RouteName'
import { Link, useNavigate } from 'react-router-dom'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import GoogleLogin from '@/components/GoogleLogin'


const SignUp = () => {

    const navigate = useNavigate()

    const formSchema = z
        .object({
            name: z.string().min(1, "Tên người dùng không được bỏ trống"),
            email: z.string().email("Email không hợp lệ."),
            password: z.string().min(6, "Mật khẩu cần ít nhất 6 kí tự."),
            confirmPassword: z.string().min(6, "Vui lòng xác nhận mật khẩu."),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Mật khẩu không trùng khớp.",
            path: ["confirmPassword"], // lỗi sẽ hiện ở trường confirmPassword
        });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })



    async function onSubmit(values) {
        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/register`,{
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(values)
            }) 
            const data = await response.json()
            if(!response.ok){
                return showToast('error', data.message)
            }

            navigate(RouteSignIn)
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
    }

    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <Card className="w-[400px] p-5">
                <h1 className='text-2xl font-bold text-center mb-5'>Tạo tài khoản</h1>
                <div className=''>
                    <GoogleLogin />
                    <div className='border my-5 flex justify-center items-center'>
                        <span className='absolute bg-white text-sm'>Hoặc</span>
                    </div>
                </div>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tên người dùng</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập tên người dùng" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mật khẩu</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Nhập mật khẩu" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Xác nhận mật khẩu</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Xác nhận mật khẩu" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='mt-5'>
                            <Button type="submit" className="w-full">Đăng ký</Button>
                            <div className='mt-5 text-sm flex justify-center items-center gap-2'>
                                <p>Đã có tài khoản?</p>
                                <Link className='text-blue-500 hover:underline' to={RouteSignIn}>Đăng nhập</Link>
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>

        </div>
    )
}

export default SignUp