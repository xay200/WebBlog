import React, { useState } from 'react'
import logo from '@/assets/images/logo-white.png'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { MdLogin } from "react-icons/md";
import SearchBox from './SearchBox';
import { RouteBlogAdd, RouteIndex, RouteProfile, RouteSignIn } from '@/helpers/RouteName';
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import usericon from '@/assets/images/user.png'
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoLogOutOutline, IoSearch } from "react-icons/io5";
import { removeUser } from '@/redux/user/user.slice';
import { showToast } from '@/helpers/showToast';
import { getEnv } from '@/helpers/getEnv';
import { IoMdSearch } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from './ui/sidebar';

const Topbar = () => {

  const dispath = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const handleLogout = async () => {
    try {
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/logout`, {
        method: 'get',
        credentials: 'include',
      })
      const data = await response.json()
      if (!response.ok) {
        return showToast('error', data.message)
      }
      dispath(removeUser())
      navigate(RouteIndex)
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  return (
    <div className='flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b'>
      <div>
        <Link to={RouteIndex}>
          <img src={logo} className='md:w-auto w-48' />
        </Link>
      </div>
      <div className='w-[500px]'>
        <SearchBox />
      </div>
      <div>
        {!user.isLoggedIn ?
          <Button asChild className='rounded-full'>
            <Link to={RouteSignIn} >
              <MdLogin />
              Đăng nhập
            </Link>
          </Button>
          :
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.user.avatar || usericon} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user.user.name}</p>
                <p className='text-sm'>{user.user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouteProfile}>
                  <FaRegUser />
                  Hồ sơ
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouteBlogAdd}>
                  <FaPlus />
                  Tạo blog
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <IoLogOutOutline color='red' />
                Đăng xuất
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        }

      </div>
    </div>
  )
}

export default Topbar