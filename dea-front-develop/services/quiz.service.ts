import { api } from "./api.service";

export enum QuizStatus {
    INPROGRESS = 1,
    PASSED = 2,
    UNSEEN = 3,
    FAILED = 4
}

export enum QuestionAnswerStatus {
    CORRECT = 1,
    INCORRECT = 2,
}
export interface Quiz {
    id: number,
    name: string,
    videoUrl: string,
    questions: Question[];
    status?: QuizStatus;
    lastQuestionAnswer?: number;
}


export interface QuizResult {
    id: number,
    name: string,
    videoUrl: string,
    questions: Question[];
    status?: QuizStatus;
    lastQuestionAnswer?: number;
}
export interface Question {
    id: number,
    name: string,
    quizId: number,
    options?: Option[]
}
export interface Option {
    id: number,
    questionId: number,
    name: string,
    isAnswer: number
}

const quizService = {
    getList: () => {
        return api<any[]>("quiz/active", {
            method: "GET"
        }).then(res => res).catch(err => err);
    },
    getListForClient: () => {
        return api<Partial<Quiz>[]>("quiz/list", {
            method: "GET"
        }).then(res => res).catch(err => []);
    },
    getById: ({ queryKey }: any) => {
        const [_, id] = queryKey;
        return api<any[]>(`quiz/${id}`, {
            method: "GET"
        }).then(res => res).catch(err => {
            throw err;
        });
    },
    getQuestionsById: (quizId: number | string) => {
        return api<Partial<Quiz>>(`quiz/${quizId}/questions`, {
            method: "GET"
        }).then(res => res).catch(err => {
            throw err;
        });
    },
    getQuizResult: (quizId: number | string) => {
        return api<Partial<Quiz>>(`quiz/${quizId}/result`, {
            method: "GET"
        }).then(res => res).catch(err => {
            throw err;
        });
    },
    resetQuiz: (quizId: number | string) => {
        return api<Partial<Quiz>>(`quiz/${quizId}/reset`, {
            method: "GET"
        }).then(res => res).catch(err => {
            console.log(err);
            throw err;
        });
    },
    add: (model: Quiz) => {
        return <any>api("quiz", {
            method: "POST",
            data: model
        }).then(res => res).catch(err => {
            throw err;
        });
    },
    update: (id: number, model: Quiz) => {
        return api<any>(`quiz/${id}`, {
            method: "PUT",
            data: model
        }).then(res => res).catch(err => {
            throw err;
        });
    },
    delete: (id: number) => {
        return api(`quiz/${id}`, {
            method: "DELETE"
        }).then(res => res).catch(err => err);
    },
    updateOrderNum: (models: any[]) => {
        return api(`quiz/order`, {
            method: "POST",
            data: models
        }).then(res => res).catch(err => err);
    },
    answerQuestion: (quizId: number, questionId: number, answer: any) => {
        return api(`quiz/${quizId}/question/${questionId}`, {
            method: "PUT",
            data: answer
        }).then(res => res).catch(err => err);
    }
}

export default quizService;