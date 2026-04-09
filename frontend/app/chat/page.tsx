import ChatContainer from "@/components/Chat/ChatContainer";
import FileUpload from "@/components/Upload/FileUpload";

export default function ChatPage() {
  return (
    <div className="h-screen flex bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500">

      {/* LEFT SIDEBAR */}
      <div className="w-1/4 p-4">
        <FileUpload />
      </div>

      {/* RIGHT CHAT */}
      <div className="w-3/4 p-4">
        <ChatContainer />
      </div>
    </div>
  );
}