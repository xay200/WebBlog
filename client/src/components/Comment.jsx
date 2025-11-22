import React, { useState } from 'react'
import { FaComments } from "react-icons/fa";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { showToast } from '@/helpers/showToast';
import { getEnv } from '@/helpers/getEnv';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useSelector } from 'react-redux';
import { RouteSignIn } from '@/helpers/RouteName';
import { Link } from 'react-router-dom';
import CommentList from './CommentList';
    

const Comment = ({props}) => {
    const [newComment, setNewComment] = useState()
    const user = useSelector((state) => state.user)
    const formSchema = z
        .object({
            comment: z.string().min(1, "Bình luận không được bỏ trống"),    
        })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: '',
        },
    })

    async function onSubmit(values) {
        try {
            const newValues = {...values, blogid: props.blogid, user: user.user._id}
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/comment/add`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(newValues)
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            setNewComment(data.comment)
            form.reset()
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
    }

    return (
        <div>
            <h4 className='flex items-center gap-2 text-2xl font-bold'>
                <FaComments className='text-violet-500' /> Bình luận
            </h4>
            {user && user.isLoggedIn 
             ?
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='mb-3'>
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Viết bình luận</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Viết bình luận của bạn..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit">Bình luận</Button>

                </form>
            </Form>
            :
            <Button asChild>
                <Link to={RouteSignIn}>Đăng nhập</Link>
            </Button>
            }

            <div className='mt-5'>
                <CommentList props={{ blogid: props.blogid, newComment }} />
            </div>
            
        </div>


    )
}

export default Comment