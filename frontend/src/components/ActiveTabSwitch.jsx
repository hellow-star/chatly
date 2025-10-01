import { useChatStore } from "../stores/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex border-b border-slate-700/50">
      <button
        className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
          activeTab === "chat"
            ? "text-white border-b-2 border-blue-500"
            : "text-slate-400 hover:text-slate-300"
        }`}
        onClick={() => setActiveTab("chat")}
      >
        Conversations
      </button>
      <button
        className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
          activeTab === "contacts"
            ? "text-white border-b-2 border-blue-500"
            : "text-slate-400 hover:text-slate-300"
        }`}
        onClick={() => setActiveTab("contacts")}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabSwitch;
