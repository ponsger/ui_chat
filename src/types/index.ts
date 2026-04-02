
export type IChatState = {
    alpha: number;
    tau: number;
    theme: string; // light o dark
    addTau: boolean;
    topicRelated: string;
    consent: boolean;
    is18OrOlder: boolean;
}

export interface IConnection {
    url: string;
    header: {
        "Content-Type": string;
    }
}

export interface IChatMessage {
    role: "user" | "assistant";
    content: string;
}

export type ErrorData = {
  hasError: boolean;
  message: string;
}

export type Message = {
  role: "user" | "assistant";
  content: string;
};
export type ModelAnswer = {
  response: string;
};

