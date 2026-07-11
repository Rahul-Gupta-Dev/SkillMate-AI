import { useState, useRef, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { askAI } from "../../services/aiService";
import ChatMessage from "../../components/Chat/ChatMessage";

function AITutor() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    const handleAsk = async () => {
        if (!question.trim()) return;

        const userMessage = question;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: userMessage,
            },
        ]);

        setQuestion("");

        try {
            setLoading(true);

            const res = await askAI(userMessage);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: res.data.reply,
                },
            ]);
        } catch (error) {
            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAsk();
        }
    };

    return (
        <MainLayout>
            <div className="h-[calc(100vh-90px)] flex flex-col">

                {/* Header */}
                <div className="border-b bg-white p-5 shadow-sm">

                    <h1 className="text-3xl font-bold">

                        🤖 SkillMate AI Tutor

                    </h1>

                    <p className="text-gray-500 mt-1">

                        Ask anything related to programming, aptitude or studies.

                    </p>

                </div>

                {/* Chat Area */}

                <div className="flex-1 overflow-y-auto p-6 bg-slate-100">

                    {messages.length === 0 && (

                        <div className="text-center text-gray-500 mt-20">

                            <h2 className="text-2xl font-semibold mb-3">

                                Welcome 👋

                            </h2>

                            <p>

                                Start asking your questions.

                            </p>

                        </div>

                    )}

                    {messages.map((msg, index) => (

                        <ChatMessage

                            key={index}

                            role={msg.role}

                            content={msg.content}

                        />

                    ))}

                    {loading && (

                        <div className="bg-white rounded-xl shadow p-4 w-fit">

                            🤖 Thinking...

                        </div>

                    )}

                    <div ref={chatEndRef}></div>

                </div>

                {/* Input */}

                <div className="border-t bg-white p-5">

                    <div className="flex gap-3">

                        <textarea
                            rows={2}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask anything..."
                            className="flex-1 border rounded-xl p-3 resize-none focus:outline-none"
                        />

                        <button
                            onClick={handleAsk}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 rounded-xl"
                        >

                            Send

                        </button>

                    </div>

                </div>

            </div>
        </MainLayout>
    );
}

export default AITutor;