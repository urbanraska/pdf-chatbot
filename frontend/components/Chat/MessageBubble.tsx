type Props = {
  role: "user" | "bot";
  text: string;
};

export default function MessageBubble({ role, text }: Props) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-xs ${
          role === "user"
            ? "bg-white text-black"
            : "bg-white/20 text-white"
        }`}
      >
        {text}
      </div>
    </div>
  );
}