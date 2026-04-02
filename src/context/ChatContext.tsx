import { createContext, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";

import { type ChatAction, chatReducer, initialState } from "../reducers/chat-reducer";
import type { IChatState } from "../types";

type ChatContextType ={
    state: IChatState;
    dispatch: Dispatch<ChatAction>;
}

type ChatContextProps = {
    children: ReactNode;
}

export const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const ChatProvider = ({children}: ChatContextProps) => {

    const [state, dispatch] = useReducer(chatReducer, initialState);

    return (
        <ChatContext.Provider value={{state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}


