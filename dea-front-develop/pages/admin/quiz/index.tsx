import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ReactSortable } from "react-sortablejs";
import { Button, ButtonVariants } from "../../../components/button/Button";
import { ConfirmModal } from "../../../components/confirm/confirm";
import { AdminLayout } from "../../../components/layout/admin";
import Modal from "../../../components/modal/modal";
import { PageContainer } from "../../../components/PageContainer";
import { ItemInfo } from "../../../components/podcast/item";
import { QuizAddEdit } from "../../../components/quiz/addedit";
import quizService, { Quiz } from "../../../services/quiz.service";

const Index = () => {
    const [currentQuizzes, setCurrentQuizzes] = useState<Quiz[] | any>(null);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [selectedItem, setSelectedItem] = useState<Quiz>();
    const { refetch, isLoading: quizLoading } = useQuery<any[]>(
        "quizzes",
        quizService.getList, {
        onSuccess: (data: any[]) => {
            setCurrentQuizzes(data)
        }
    }
    );
    const { refetch:getById, data:quiz ={} } = useQuery<Quiz|any>(['quiz', selectedItem?.id], quizService.getById,{
        onSuccess: (data: Quiz) =>{
           setShowModal(true);
        },
        enabled: false
    })
    const {
        isLoading: orderUpdateLoading,
        error: orderError,
        mutate,
        reset,
    } = useMutation(
        (quizzes: any[]) => quizService.updateOrderNum(quizzes),
        {
            onSuccess: () => {
                reset();
                refetch();
            },
        }
    );
    const {
        isLoading: deleteLoading,
        error: deleteError,
        mutate: deleteMutate
    } = useMutation(
        (id: number) => quizService.delete(id),
        {
            onSuccess: () => {
                refetch();
                setSelectedItem(undefined);
            },
        }
    );
    return <>
        <PageContainer customClasses="w-auto p-10 my-14">
            <div className="text-2xl font-bold text-red-600 p-4">Add/Remove/Edit Quiz</div>
            {orderUpdateLoading && <span>Ordering...</span>}
            {orderError && <span>ordering error</span>}
            <div className="h-96 overflow-y-auto p-2 scrollbar">
                {currentQuizzes && <ReactSortable list={currentQuizzes} setList={setCurrentQuizzes} animation={200}
                    delay={2} multiDrag onEnd={() => mutate(currentQuizzes)}>
                    {(currentQuizzes?.map((item: Quiz, index: number) =>
                        <ItemInfo
                            onEditClick={() => {
                                setIsAdd(false);
                                setSelectedItem(item);
                                setTimeout(()=>{
                                    getById();
                                },500)
                               
                            }}
                            onRemoveClick={() => {
                                setSelectedItem(item);
                                setShowConfirmModal(true)
                            }}
                            item={item}
                            editText={'Edit Quiz'}
                            removeText={'Remove Quiz'}
                            index={index + 1}
                            key={item.id}
                            customClass="mt-4 flex min-w-300"
                        />))}
                </ReactSortable>}
                {quizLoading && <span>Loading...</span>}
            </div>
            <Button customClasses="mt-10 w-9/12 mx-10" width="" variant={ButtonVariants.RED} onClick={() => {
                setIsAdd(true);
                setShowModal(true)
            }}>
                Add More Quizzes
            </Button>
        </PageContainer>
        {showModal && (
            <Modal cancelOnClickOutSide={false} onCancel={() => setShowModal(false)}>
                <QuizAddEdit onSave={() => { 
                   setShowModal(false);
                   refetch(); 
                }} isAdd={isAdd} item={isAdd? {} :quiz} onCancel={() => setShowModal(false)} />
            </Modal>
        )}
        {showConfirmModal && (
            <Modal cancelOnClickOutSide={false} onCancel={() => setShowConfirmModal(false)}>
                <ConfirmModal
                    onCancel={() => setShowConfirmModal(false)}
                    onYesClick={() => {
                        deleteMutate(selectedItem?.id as number);
                        setShowConfirmModal(false);
                    }}
                    description={`Are you sure you want to remove "${selectedItem?.name}"?`}
                    title='Remove a Quiz'
                    yesButtonText='Yes, Remove the Quiz'
                ></ConfirmModal>
            </Modal>
        )}
    </>
};
Index.Layout = AdminLayout;
export default Index;

