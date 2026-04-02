import { useState } from "react";
import { useChat } from "../hooks/useChat";
import { connection } from "../data/connection";
import type { KeyboardEvent, Dispatch, SetStateAction } from "react";

interface ChatInputProps {
  onSend: (prompt: string) => void;
  modelResponse: (answer: any) => void;
  setLoading: (value: boolean) => void;
  setAttemps: Dispatch<SetStateAction<number>>
  setError: (value: any) => void;
  error: any;
}

const ChatInput = ({
  error,
  onSend,
  modelResponse,
  setLoading,
  setAttemps,
  setError

}: ChatInputProps) => {

  const {state} = useChat();
  const { alpha, tau, topicRelated } = state;

  const [prompt, setPrompt] = useState("");
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const handleChange = (value: string) => {
    setPrompt(value);
  };

  const handleClick = () => {
    if (!prompt.trim()) return;

    setWaitingForResponse(true);
    onSend(prompt);
    makeRequest(prompt);
    setPrompt("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleClick();
    }
  };

  const changeAlphaValue = (value: number) => {
    if (value === 1) return 0.1;
    if (value === 2) return 0.5;
    if (value === 3) return 0.9;
  }

  const changeTauValue = (value: number) => {
    return value / 10;
  }

  const makeRequest = async (prompt: string) => {
    const request = {
      question: prompt,
      topicRelated: topicRelated,
      alpha: changeAlphaValue(alpha),
      tau: changeTauValue(tau),
    };

    setLoading(true);
    try {
      const response = await fetch(connection.url + "ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const data = await response.json();
      modelResponse(data);
    } catch (er: any) {
      setError((prev: any) => [
        ...prev,
        { hasError: true, message: er.message },
      ]);
      console.error("Error fetching data:", er);
    } finally {
      setLoading(false);
      setWaitingForResponse(false);
      setAttemps((prev) => prev + 1);
    }
  };

  return (
    <>
      {error.length > 0 && error[error.length - 1].hasError && (
        <div className="alert alert-danger" role="alert">
          {error[error.length - 1].message}
          <br /> <br />
          <span className="bg-light border border-secondary rounded-2 p-1 mt-2">
            Attempts: {error.length}
          </span>
        </div>
      )}
      <div className="border rounded-3 p-2 d-flex align-items-center gap-2 bg-white">
        <textarea
          className="form-control border-0 shadow-none resize-none"
          rows={1}
          value={prompt}
          disabled={waitingForResponse}
          placeholder="Write your question..."
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          className="btn btn-dark d-flex align-items-center justify-content-center"
          onClick={handleClick}
          disabled={topicRelated === "" || waitingForResponse || !prompt.trim()}
        >
          ➤
        </button>
      </div>
    </>
  );
};

export default ChatInput;
