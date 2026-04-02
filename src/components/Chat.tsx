import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import Spinner from "./Spinner";
import FeedbackForm from "./FeedbackForm";

import type { Message, ModelAnswer, ErrorData } from "../types";


const Chat = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [attemps, setAttemps] = useState(0);
  const [error, setError] = useState<ErrorData[]>([]);

  const handleSend = async (prompt: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: prompt }
    ]);
  };

  const modelResponse = async (answer: ModelAnswer) => {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: answer.response }
    ]);
  };

  return (
    <div className="d-flex flex-column h-100">
      <FeedbackForm error={error} messages={messages} setAttemps={setAttemps} value={attemps}/>

      <ChatMessages messages={messages} />
      {loading && (
        <div className="d-flex justify-content-center my-2">
          <Spinner />
        </div>
      )}
      <ChatInput
        setLoading={setLoading}
        onSend={handleSend}
        modelResponse={modelResponse}
        setAttemps={setAttemps}
        setError={setError}
        error={error}
      />
    </div>
  );
};

export default Chat;
