/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import quizService, { Question, Quiz } from "../../services/quiz.service";
import { retrieveErrorMessage } from "../../utils/retrieve-validation-error";
import { Button, ButtonVariants } from "../button/Button";
import { Card } from "../Card";
import { Input } from "../input/Input";
import { Questions } from "./question";
export interface QuizAddEditProps {
    onCancel: any;
    onSave: any;
    item: Quiz;
    customClass?: string,
    isAdd: boolean,
}
export function QuizAddEdit({
    onCancel = () => { },
    onSave = () => { },
    item, customClass,
    isAdd = true
}: QuizAddEditProps) {
    const [name, setName] = useState(item.name);
    const [quizUrl, setQuizUrl] = useState(item.videoUrl);
    const [questions, setQuestions] = useState<Question[]>([]);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (isAdd) {
            const model = newQuiz();
            model.name = name;
            model.videoUrl = quizUrl;
            model.questions = questions;
            create(model);
        } else {
            if (item) {
                item.name = name;
                item.videoUrl = quizUrl;
                item.questions = questions;
                update(item);
            }
        }
    };
    const newQuiz = (): Quiz => {
        return {
            id: 0,
            name: '',
            questions: [],
            videoUrl: ''
        }
    }
    const {
        isLoading: quizCreateLoading,
        error: createError,
        mutate: create,
        reset,
    } = useMutation(
        (quiz: Quiz) => quizService.add(quiz),
        {
            onSuccess: () => {
                onSave();
            },
        }
    );
    const {
        isLoading: quizUpdateLoading,
        error: updateError,
        mutate: update,
    } = useMutation(
        (quiz: Quiz) => quizService.update(quiz.id, quiz),
        {
            onSuccess: () => {
                onSave();
            },
        }
    );
    return (
        <>
            <Card customClasses="h-auto bg-white w-auto text-black">
                <div className="grid grid-cols-3 gap-2">
                    <div className="p-6">
                        <div className="text-2xl font-bold text-red-600 text-center mb-4 p-4 ">Edit / Add Quiz</div>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            {retrieveErrorMessage(createError) && (
                                <span className="text-sm text-red-dark">
                                    {retrieveErrorMessage(createError)}
                                </span>
                            )}
                            {retrieveErrorMessage(updateError) && (
                                <span className="text-sm text-red-dark">
                                    {retrieveErrorMessage(updateError)}
                                </span>
                            )}
                            <label className="text-sm mb-5 ">Quiz Headline</label>
                            <Input
                                type="text"
                                placeholder=""
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                value={name}
                                required
                                className="mt-2 mb-6 shadow-lg"
                            />{" "}
                            <label className="text-sm mb-5 mt-5 ">Video</label>
                            <Input
                                type="text"
                                className="mt-2 mb-6 shadow-lg"
                                placeholder=""
                                error={retrieveErrorMessage(updateError ? updateError : createError, "VideoUrl")}
                                onChange={(e) => {
                                    setQuizUrl(e.target.value);
                                }}
                                value={quizUrl}
                                required
                            />

                            <Button
                                type="submit"
                                variant={ButtonVariants.RED}
                                loading={quizCreateLoading || quizUpdateLoading}
                                onClick={(e) => console.log(e)}
                                customClasses="mt-4 w-full"
                            >
                                Save
                            </Button>
                            <Button customClasses="mt-4 w-full" type="button" variant={ButtonVariants.GRAY} onClick={onCancel}>
                                Cancel
                            </Button>
                        </form>
                    </div>
                    <div className="col-span-2 min-h-full h-auto bg-gray-50 rounded-r-2xl">
                        <div className="flex justify-end p-2">
                            <img className="p-1 w-4 cursor-pointer" onClick={onCancel} src="/images/remove.png" alt="cancel" />
                        </div>
                        <Questions questions={item.questions} onChange={(questions: Question[]) => {
                            setQuestions(questions);
                            // console.log('sdfsdf',questions);
                        }} />
                    </div>
                </div>
            </Card>
        </>
    );
}
