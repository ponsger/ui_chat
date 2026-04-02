import Main from "./components/Main"
import Home from "./components/Home";
import { useChat } from "./hooks/useChat";
import { useEffect, useState } from "react";
import { connection } from "./data/connection";

export default function App() {
  const {state} = useChat();
  const [apiStatus, setApiStatus] = useState<"checking" | "success" | "error">("checking");

  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await fetch(connection.url);
        if (response.ok) {
          setApiStatus("success");
        } else {
          setApiStatus("error");
        }
      } catch (error) {
        setApiStatus("error");
      }
    };

    checkApi();
  }, []);

  return (
    <div>
      <div className={`alert alert-${apiStatus === "success" ? "success" : "danger"}`} role="alert">
        {apiStatus === "success" ? "API is running smoothly!" : "There is an error with the server, might run correctly or be down."}
      </div>
      {state.consent && state.is18OrOlder ? <Main /> : <Home /> } 
    </div>
  )
}
