import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function ChatMessage({ role, content }) {
    const isUser = role === "user";

    return (
        <div
            className={`flex mb-5 ${isUser ? "justify-end" : "justify-start"
                }`}
        >
            <div
                className={`max-w-[80%] rounded-2xl px-5 py-4 shadow
        ${isUser
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-900"
                    }`}
            >
                <div className="font-semibold mb-3">
                    {isUser ? "👤 You" : "🤖 SkillMate AI"}
                </div>

                {isUser ? (
                    <p className="whitespace-pre-wrap">{content}</p>
                ) : (
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || "");

                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={oneDark}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, "")}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className="bg-gray-200 px-1 rounded">
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                )}
            </div>
        </div>
    );
}

export default ChatMessage;