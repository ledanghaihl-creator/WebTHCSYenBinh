@echo off
title CHAY WEBSITE PORTAL THCS YEN BINH
echo =======================================================
echo 🚀 KHỞI ĐỘNG CỔNG THÔNG TIN ĐIỆN TỬ THCS YÊN BÌNH
echo 🌐 Đang kích hoạt Server và Giao diện tại http://localhost:3001
echo =======================================================
cd /d "%~dp0"
node server/server.js
pause
