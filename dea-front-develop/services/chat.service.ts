import { chatApi } from "./api.service";

export type ChatbotResponse = {
    answer: string;
    type: string;
};

const chatService = {
  getAnswer: (message: string) => {
    return chatApi<ChatbotResponse>(`chatbot/ask?question=${message}`, {
        method: "GET",
    }).then(res => res).catch(err => {
        throw err;
    });
},
}

export default chatService ;