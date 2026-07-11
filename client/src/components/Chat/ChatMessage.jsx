function ChatMessage({ role, content }) {
    const isUser = role === "user";

    return (
        <div
            className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"
                }`}
        >
            <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 shadow whitespace-pre-wrap
        ${isUser
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-800"
                    }`}
            >
                <div className="text-xs font-semibold mb-1">
                    {isUser ? "👤 You" : "🤖 SkillMate AI"}
                </div>

                {content}
            </div>
        </div>
    );
}

export default ChatMessage;