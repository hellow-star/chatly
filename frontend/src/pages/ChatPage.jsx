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
  const { activeTab, selectedUser, isChatAreaExpanded } = useChatStore();
  return (
    <div
      className={`relative w-full h-screen grid grid-cols-1 ${
        isChatAreaExpanded
          ? "md:grid-cols-[0px_1fr]"
          : "md:grid-cols-[300px_1fr]"
      } transition-all duration-300 ease-in-out`}
    >
      <BorderAnimated className="col-span-2 grid w-full h-full rounded-xl grid-cols-subgrid">
        {/* LEFT SIDE - Sidebar */}
        <div className="bg-slate-800/50 backdrop-blur-sm flex flex-col rounded-l-xl overflow-hidden">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chat" ? <ChatList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE - Chat Area - Now uses 1fr to take all remaining space */}
        <div className="flex flex-col min-h-0 h-full bg-slate-900/50 backdrop-blur-sm rounded-r-xl overflow-hidden">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceHolder />}
        </div>
      </BorderAnimated>
    </div>
  );
}

export default ChatPage;
