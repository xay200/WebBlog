# BlogApp
## 1 Giới thiệu
BlogApp là ứng dụng web cho phép người dùng đăng bài viết, chỉnh sửa, xóa, xem chi tiết bài viết, bình luận và tìm kiếm theo danh mục. Hệ thống bao gồm phần quản trị (Admin) để quản lý người dùng, danh mục và bài viết.
Ứng dụng được xây dựng theo mô hình MERN stack: MongoDB, Express.js, React.js, Node.js.
## 2 Công nghệ sử dụng
### Backend
Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
Multer 
Cloudinary
Bcryptjs
### Frontend
React.js
Redux
Firebase
React Router DOM
TailwindCSS
## 3 Cấu trúc thư mục
```
BlogApp/
│
├── api/         # Backend (Node.js + Express)
│   ├── config/
│   ├── controllers/
│   ├── helpers/
│   ├── middlesware/
│   ├── models/
│   ├── routes/
│   ├── .gitignore/
│   └── .env
├── client/         # Frontend (React + Vite)
├── README.md
```

---
## 4 Hướng dẫn cài đặt & chạy chương trình
### 4.1 Yêu cầu môi trường
- Node.js: v18+
- MongoDB: Community Server hoặc MongoDB Atlas
- NPM: 8+
### 4.2 Chạy backend
```bash
cd api
npm install
npm run dev
```
### 4.3 Chạy frontend
```bash
cd client
npm install
npm run dev
```
### 4.4 Hướng dẫn import database
### Yêu cầu
- MongoDB Database Tools
- MongoDB server
### Restore lại database
Chạy lệnh sau
- Restore toàn bộ database
```bash
mongorestore --db BlogApp ./backup/BlogApp
```
- Database BlogApp đã tồn tại
```bash
mongorestore --drop --db BlogApp ./backup/BlogApp
```
### 4.5 Cấu hình file .env
#### Backend
```bash
PORT=3000
FRONTEND_URL='http://localhost:5173'
MONGODB_CONN="mongodb://localhost:27017"
JWT_SECRET="mysecsflslfklkfskrfjridfsklfmjsefdn"
NODE_ENV="development"
CLOUDINARY_APP_NAME="djzuu9mk0"
CLOUDINARY_APP_KEY="499314463825778"
CLOUDINARY_APP_SECRET="Wis5AX1C8XS0M6wlKGSMq-q7xhw"
```
#### Frontend
```bash
VITE_API_BASE_URL="http://localhost:3000/api"
VITE_FIREBASE_API="AIzaSyCc2gyWKj2Mh5eYI_omiU6sJN_-XPPiKhk"
```
## 5 Tài khoản demo để đăng nhập
```bash
Admin
Username: admin@gmail.com
Password: 12345678
```
```bash
User
Username: user1@gmail.com
Password: 12345678
```
## 6 Hình ảnh minh họa giao diện
![Hinh anh 01](Screenshots/TrangChu.png)
![Hinh anh 02](Screenshots/TrangQuanLyBlog.png)
![Hinh anh 03](Screenshots/TrangBlog.png)
![Hinh anh 04](Screenshots/TrangChinhSuaBlog.png)
![Hinh anh 05](Screenshots/TrangTaoBlog.png)
## 7 Video demo

