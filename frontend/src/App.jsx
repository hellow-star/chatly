import React from "react";
import { Routes, Route } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";

function App() {
  const { authUser, isLoading, login } = useAuthStore();
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-blue-400 to-pink-700 h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* 背景装饰元素 —— 保持绝对定位，不影响内容布局 */}
      <div className="absolute inset-0 wave top-20 left-0 w-1/2 h-1/3 bg-gradient-to-r from-cyan-300 to-transparent"></div>
      <div className="absolute inset-0 wave bottom-1/4 right-0 w-3/4 h-1/2 bg-gradient-to-l from-purple-300 to-transparent"></div>

      <div className="absolute top-1/3 left-1/4 particle bg-pink-300 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/3 particle bg-cyan-300 animate-pulse"></div>
      <div className="absolute top-2/3 left-1/2 particle bg-yellow-300 animate-pulse"></div>
      <div className="absolute top-3/4 left-2/3 particle bg-pink-200 animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 particle bg-blue-300 animate-pulse"></div>

      <div className="absolute top-1/3 left-1/4 connector w-1 h-16 bg-white opacity-20"></div>
      <div className="absolute top-1/2 left-1/3 connector w-1 h-20 bg-white opacity-20"></div>
      <div className="absolute top-2/3 left-1/2 connector w-1 h-16 bg-white opacity-20"></div>

      <div className="absolute top-1/2 left-1/3 hexagon"></div>
      <div className="absolute top-2/3 left-2/3 hexagon"></div>
      <div className="absolute top-1/3 right-1/4 hexagon"></div>

      <div className="absolute bottom-8 right-8 star"></div>

      <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-pink-300 to-blue-300 blur-xl opacity-20"></div>
      <div className="absolute top-1/4 left-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-300 to-purple-300 blur-xl opacity-20"></div>

      {/* 👇 路由内容区域 —— 相对定位，确保在装饰层之上 */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
