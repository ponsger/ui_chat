import type { IChatState } from "../types"


export type ChatAction = { type: "SET_ALPHA", payload: {alpha: number} } |
    { type: "SET_TAU", payload: {tau: number} } |
    { type: "SET_THEME", payload: {theme: string} } |
    { type: "SET_ADD_TAU", payload: {addTau: boolean} } |
    { type: "SET_TOPIC_RELATED", payload: {topicRelated: string} } |
    { type: "SET_CONSENT", payload: {consent: boolean} } |
    { type: "SET_IS_18_OR_OLDER", payload: {is18OrOlder: boolean} }

export const initialState: IChatState = {
    alpha: 2,
    tau: 4,
    theme: "light", // light o dark
    addTau: false,
    topicRelated: "",
    consent: false,
    is18OrOlder: false,
}

export const chatReducer = (state: IChatState = initialState, action: ChatAction) => {
    switch(action.type) {
        case "SET_ALPHA":
            return {...state, alpha: action.payload.alpha}
        case "SET_TAU":
            return {...state, tau: action.payload.tau}
        case "SET_THEME":
            return {...state, theme: action.payload.theme}
        case "SET_ADD_TAU":
            return {...state, addTau: action.payload.addTau}
        case "SET_TOPIC_RELATED":
            return {...state, topicRelated: action.payload.topicRelated}
        case "SET_CONSENT":
            return {...state, consent: action.payload.consent}
        case "SET_IS_18_OR_OLDER":
            return {...state, is18OrOlder: action.payload.is18OrOlder}
        
        default:
            return state;
    }
} 

