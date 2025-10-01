import { useEffect } from "react";
import { useChatStore } from "../stores/useChatStore";
import { Maximize, Minimize, XIcon } from "lucide-react";

function ChatHeader({ className = "" }) {
  const { selectedUser, setSelectedUser, isChatAreaExpanded, toggleChatArea } =
    useChatStore();

  return (
    <div className={`flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 max-h-[84px] px-6 gap-12 ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src={
                selectedUser.profilePic ||
                selectedUser.profilePicture ||
                "/avatar.png"
              }
              alt={selectedUser.fullName}
            />
          </div>
        </div>
        <div>
          <h4 className="text-slate-200 font-medium truncate">
            {selectedUser.fullName}
          </h4>
          <p className="text-slate-400 text-sm">Online</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={toggleChatArea}>
          {isChatAreaExpanded ? (
            <Minimize className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
          ) : (
            <Maximize className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
          )}
        </button>
        <button onClick={() => setSelectedUser(null)}>
          <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
