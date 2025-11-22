import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import logo from '@/assets/images/logo-white.png'
import { FiHome } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { TbBrandBlogger } from "react-icons/tb";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import Footer from "./Footer";
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetails, RouteIndex, RouteUser } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { useSelector } from "react-redux";


const AppSidebar = () => {

  const user = useSelector(state => state.user)
  const { data: categoryData } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
    method: 'get',
    credentials: 'include'
  })

  return (
    <Sidebar>
      <SidebarHeader>
        <img src={logo} width={120} />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <FiHome />
              <Link to={RouteIndex}>Trang chủ</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {user && user.isLoggedIn
            ?
            <>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <TbBrandBlogger />
                  <Link to={RouteBlog}>Blog</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaRegCommentDots />
                  <Link to={RouteCommentDetails}>Bình luận</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
            :
            <></>
          }

          {user && user.isLoggedIn && user.user.role === 'admin'
            ?
            <>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BiCategoryAlt />
                  <Link to={RouteCategoryDetails}>Danh mục</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaRegUser />
                  <Link to={RouteUser}>Người dùng</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
            :
            <></>
          }


        </SidebarMenu>
        <SidebarGroup />


        <SidebarGroup />
        <SidebarGroupLabel>
          Danh mục
        </SidebarGroupLabel>
        <SidebarMenu>
          {categoryData && categoryData.category.length > 0
            && categoryData.category.map(category => <SidebarMenuItem key={category._id}>
              <SidebarMenuButton>
                <GoDot />
                <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>)
          }
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>

    </Sidebar>
  )
}

export default AppSidebar