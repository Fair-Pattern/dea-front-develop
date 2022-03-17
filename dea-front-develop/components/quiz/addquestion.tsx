/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Question, Option } from "../../services/quiz.service";
import { Button, ButtonVariants } from "../button/Button";
import { Input } from "../input/Input";

interface AddQuestionProps {
    question: Question,
    isAdd: boolean,
    onCancel: any,
    onSave: any
}
interface OptionProps {
    option: Option,
    onRemove: any,
    index: number,
    onSave: any,
}
const QuestionOption = ({ option, onRemove = () => { }, onSave = () => { }, index }: OptionProps) => {
    const [name, setName] = useState(option.name);
    const [answer, setAnswer] = useState(option.isAnswer ? 1 : 0);
    useEffect(() => {
        option.name = name;
        option.isAnswer = Number(answer);
        onSave(option, index);
    }, [name, answer])
    const handleChange = (event: any) => {
        setAnswer(event.target.value);
    }
    return <>
        <label className="text-sm mb-1 ">Answer {index + 1}</label>
        <div className="flex">
            <div className="flex-grow h-16 scrollbar">
                <Input
                    type="text"
                    className="mb-2 shadow-lg"
                    textColor="text-black"
                    placeholder=""
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    value={name}
                    required
                />
            </div>
            <div className="flex-none w-16 h-16 p-2 mt-2 ">
                <select value={answer} className="shadow-lg p-2 rounded-2xl" onChange={handleChange}>
                    <option value={1}>True</option>
                    <option value={0}>False</option>
                </select>
            </div>
            <div className="flex-none w-16 h-16 mr-2 cursor-pointer p-4 ml-2 mt-2">
                <img className="h-5 mt-1 p-1" src="/images/remove.png" onClick={() => onRemove(index)} />
            </div>
        </div>
    </>
}
export const AddQuestion = ({ question, isAdd, onCancel = () => { }, onSave = () => { } }: AddQuestionProps) => {
    const [questionName, setQuestionName] = useState(question.name);
    const [options, setOptions] = useState<Option | any>(question?.options || []);
    useEffect(() => {
        question.name = questionName;
        question.options = options;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionName, options]);
    const addOption = () => {
        setOptions([...options, newOption()]);
    }
    const newOption = () => {
        return {
            id: 0,
            questionId: question?.id || 0,
            name: '',
            answer: 0
        }
    }
    return <>
        <div className="flex cursor-pointer" onClick={() => onCancel(question)}>
            <img className="h-5 mt-1 p-1" src="/images/back.png" alt="back" />
            <p className="text-red-700 ml-2">Save & Back to Questions List</p>
        </div>
        <div className="h-96 overflow-y-auto p-4 scrollbar">
            <label className="text-sm mb-1 ">Question</label>
            <Input
                type="textarea"
                className="mb-2 shadow-lg"
                textColor="text-black"
                placeholder=""
                onChange={(e) => {
                    setQuestionName(e.target.value);
                }}
                value={questionName}
                required
            />
            {options && options.map((item: Option, index: number) => (<QuestionOption onRemove={(index: number) => {
                setOptions(options.filter((option: Option, inx: number) => inx !== index))
            }}
                key={index} option={item} index={index}
                onSave={(option: Option, index: number) => {
                    question.options = options;
                    onSave(question);
                }}
            />
            ))}
        </div>
        <div className="flex justify-center">
            <Button customClasses="mt-10 w-3/6 mx-10" width="" variant={ButtonVariants.RED} onClick={() => {
                addOption();
                // setIsAdd(true)
                // setIsShowAddQuestion(true);
            }}>
                Add More Answers
            </Button>
        </div>
    </>
}