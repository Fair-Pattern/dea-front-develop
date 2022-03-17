import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Question } from "../../services/quiz.service";
import { Button, ButtonVariants } from "../button/Button";
import { ConfirmModal } from "../confirm/confirm";
import Modal from "../modal/modal";
import { ItemInfo } from "../podcast/item";
import { AddQuestion } from "./addquestion";

export interface QuestionProps {
    questions: Question[],
    onChange: any
}
export const Questions = ({ questions = [], onChange = () => { } }: QuestionProps) => {
    const [currentQuestions, setcurrentQuestions] = useState<Question[] | any>(questions || []);
    const [question, setQuestion] = useState<Question | any>();
    const [isAdd, setIsAdd] = useState<boolean>(false);
    const [deletedIndex, setDeletedIndex] = useState<number | null>(null);
    const [isShowAddQuestion, setIsShowAddQuestion] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const newQuestion = () => {
        return {
            id: 0,
            name: '',
            quizId: 0,
            options: []
        }
    }
    useEffect(() => {
       onChange(currentQuestions);
       console.log(currentQuestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentQuestions])
    return <>
        {!isShowAddQuestion && <div>
            {currentQuestions?.length > 0 && <div className="h-96 overflow-y-auto p-4 scrollbar">
                {currentQuestions && <ReactSortable list={currentQuestions}  setList={setcurrentQuestions} animation={200}
                    delay={2} multiDrag >
                    {(currentQuestions.map((item: Question, index: number) =>
                        <ItemInfo
                            onEditClick={() => {
                                setIsAdd(false);
                                setQuestion(item);
                                setIsShowAddQuestion(true);
                            }}
                            onRemoveClick={() => {
                                setDeletedIndex(index);
                                setQuestion(item);
                                setShowConfirmModal(true)
                            }}
                            item={item}
                            editText={'Edit Question'}
                            removeText={'Remove Question'}
                            index={index + 1}
                            key={index}
                            customClass="mt-4 flex max-w-md"
                        />))}
                </ReactSortable>}
            </div>}
            <div className="flex justify-center">
                <Button customClasses="mt-10 w-3/6 mx-10" width="" variant={ButtonVariants.RED} onClick={() => {
                    setIsAdd(true);
                    setQuestion(newQuestion());
                    setIsShowAddQuestion(true);
                }}>
                    Add More Questions
                </Button>
            </div>

        </div>}
        {isShowAddQuestion && <AddQuestion onCancel={(question: Question) => {
            if(isAdd && question?.name){
                setcurrentQuestions([...currentQuestions, question]);
            }
            setIsShowAddQuestion(false);
        }} onSave={(q: Question) => {
        }} question={question} isAdd={isAdd} />}
        {showConfirmModal && (
            <Modal cancelOnClickOutSide={false} onCancel={() => setShowConfirmModal(false)}>
                <ConfirmModal
                    onCancel={() => setShowConfirmModal(false)}
                    onYesClick={() => {
                        setcurrentQuestions(currentQuestions.filter((q: Question, inx: number) => inx !== deletedIndex));
                        setShowConfirmModal(false);
                    }}
                    description={`Are you sure you want to remove "${question?.name}"?`}
                    title='Remove a Question'
                    yesButtonText='Yes, Remove the question'
                ></ConfirmModal>
            </Modal>
        )}

    </>
}