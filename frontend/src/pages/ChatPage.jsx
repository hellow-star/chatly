import { useAuthStore } from "../stores/useAuthStore";
import { useChatStore } from "../stores/useChatStore";
import BorderAnimated from "../components/borderAnimated";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceHolder from "../components/NoConversationPlaceHolder";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";

function ChatPage() {
  const { logout } = useAuthStore();
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div className="relative w-full max-w-6xl h-[800px] flex">
      <BorderAnimated className="flex w-full h-full rounded-xl">
        {/* LEFT SIDE - Sidebar */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col rounded-l-xl">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chat" ? <ChatList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE - Chat Area */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm rounded-r-xl">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceHolder />}
        </div>
      </BorderAnimated>
    </div>
  );
}

export default ChatPage;
