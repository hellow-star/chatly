import React from "react";
import { useAuthStore } from "../stores/useAuthStore";

function ChatPage() {
  const { logout } = useAuthStore();
  return (
    <div>
      ChatPage
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default ChatPage;
