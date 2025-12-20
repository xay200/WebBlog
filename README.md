# BlogApp - PHÁT HIỆN VÀ NGĂN CHẶN TẤN CÔNG BRUTE-FORCE
## 1 Giới thiệu đề tài
Tấn công Brute Force là một trong những hình thức tấn công phổ biến nhằm dò đoán mật khẩu bằng cách thử nhiều tổ hợp đăng nhập liên tục. Nếu không có cơ chế phòng vệ phù hợp, hệ thống có thể bị chiếm quyền truy cập, rò rỉ dữ liệu hoặc gián đoạn dịch vụ.
Đề tài này tập trung vào việc mô phỏng, phát hiện và ngăn chặn tấn công brute force trên hệ thống web, kết hợp giữa ghi log, phân tích hành vi đăng nhập và cơ chế phòng thủ tự động.
Ứng dụng được xây dựng theo mô hình MERN stack: MongoDB, Express.js, React.js, Node.js.
## 2 Thành viên nhóm
Phạm Sỹ Chiến - MSSV: 22810310352
## 3 Công nghệ sử dụng
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
## 4 Cấu trúc thư mục
```
BlogApp/
│
├── api_security/         # Backend (Node.js + Express)
│   ├── config/
│   ├── controllers/
│   ├── helpers/
│   ├── middlesware/
│   ├── models/
│   ├── routes/
│   ├── .gitignore/
│   └── .env
├── api_vulnerable/         # Backend (Node.js + Express)
│   ├── config/
│   ├── controllers/
│   ├── helpers/
│   ├── logs/
│   ├── middlesware/
│   ├── models/
│   ├── routes/
│   ├── .gitignore/
│   └── .env
├── client/         # Frontend (React + Vite)
├── README.md
```

---
## 5 Hướng dẫn cài đặt
### 5.1 Yêu cầu môi trường
- Node.js: v18+
- MongoDB: Community Server hoặc MongoDB Atlas
- NPM: 8+
### 5.2 Chạy backend
#### Backend vulnerable
```bash
cd api_vulnerable
npm install
npm run dev
```
#### Backend secure
```bash
cd api_security
npm install
npm run dev
```
### 5.3 Chạy frontend
```bash
cd client
npm install
npm run dev
```
### 5.4 Hướng dẫn import database
### Yêu cầu
- MongoDB Database Tools
- MongoDB server
### Restore lại database
Chạy lệnh sau
- Restore toàn bộ database
```bash
mongorestore --db BlogApp ./22810310352_WebBlog/BlogApp
```
- Database BlogApp đã tồn tại
```bash
mongorestore --drop --db BlogApp ./22810310352_WebBlog/BlogApp
```
### 5.5 Cấu hình file .env
#### Backend
```bash
PORT=3000 (với api_vulnerable)
//PORT 3001 (với api_security)
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
### 5.6 Tài khoản demo để đăng nhập
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
## 6 Hướng dẫn sử dụng
### 6.1 Môi trường demo
- Hệ điều hành Ubuntu Linux: Ubuntu Server 22.04 LTS (server), Kali Linux 2025.3 (attack).
- Công cụ phòng thủ: Fail2ban v0.11.
- Công cụ tấn công: Burp Suite Community 2025.10.7.
- api_vulnerable: Chỉ có ghi log, dùng để demo tấn công không có phòng thủ và fail2ban
- api_security: Xấy dụng thêm middleware rate limit
### 6.2 Tấn công brue-force
- Mở Burp suite trên máy kali linux bằng lệnh burpsuite trên terminal
- Dùng ỉntruder của Burp suite để gửi request tới server, thay đổi target port với từng backend
- Chọn 2 trường email và password để add vào payload
- Nhập danh sách các email và mật khẩu vào payload
- Chọn phương thức tấn công Cluster bomb attack và ấn Start attack
### 6.3 Cấu hình Fail2ban trên máy server Ubuntu Linux
#### Cấu hình jail
Trên máy server tạo cấu hình trong /etc/fail2ban/jail.local
```bash
[mern-login-jail]
enabled = true
port = 3000
filter = mern-login
logpath = logs/auth.log
maxretry = 3
findtime = 600
bantime = 60
action = iptables-allports
```
#### Cấu hình filter
Tạo file /etc/fail2ban/filter.d/mern-login.conf sử dụng regex để bắt các dòng log lỗi.
```bash
[Definition]
failregex = ^.*\[AUTH_FAILED\] IP: <HOST> .*$
ignoreregex =
```
#### Xem danh sách ip bị ban
```bash
sudo fail2ban-client status mern-login-jail
```
#### 
## 7 Hình ảnh demo kết quả
- Hình ảnh 01 - Burp suite tấn công
![Hinh anh 01 - Burp suite tẫn công](Screenshots/TanCongBruteForce.png)
- Hình ảnh 02 - Chặn thành công bằng Fail2ban
![Hinh anh 02 - Chặn thành công bằng Fail2ban](Screenshots/ChanThanhCongFail2ban.png)
Hình ảnh 03 - IP tấn công bị đưa vào danh sách ban
![Hinh anh 03 - IP tấn công bị đưa vào danh sách ban](Screenshots/DanhSachBan.png)
Hình ảnh 04 - Chặn thành công bằng middleware
![Hinh anh 04 - Chặn thành công bằng middleware](Screenshots/BanRateLimit.png)
Hình ảnh 05 - Middleware hiển thị log đã chặn
![Hinh anh 05 - Middleware hiển thị log đã chặn](Screenshots/BanRateLimitConsole.png)

## 7 Video demo
https://youtu.be/eTuVPBC2_zg