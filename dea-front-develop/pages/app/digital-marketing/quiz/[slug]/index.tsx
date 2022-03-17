import classNames from "classnames";
import { NextPage } from "next";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Card } from "../../../../../components/Card";
import { Input } from "../../../../../components/input/Input";
import { PageContainer } from "../../../../../components/PageContainer";
import quizService, {
  Question,
  Quiz,
} from "../../../../../services/quiz.service";

const Quiz: NextPage = () => {
  const router = useRouter();
  const quizId = router.query.slug;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selected, setSelected] = useState<number[] | []>([]);

  const setQuestionList = (quiz: Partial<Quiz>) => {
    const index = (quiz?.questions || []).findIndex(
      ({ id }) => id === quiz.lastQuestionAnswer
    );

    if (quizId && index + 1 === quiz.questions?.length) {
      router.push(`${quizId}/result`);
    }
    setSelected([]);
    setCurrentIndex(index < 0 ? 0 : index + 1);
    setQuestions(quiz?.questions || []);
  };

  const {
    isLoading,
    isFetching,
    refetch,
    data: quiz = null,
  } = useQuery<Partial<Quiz>>(
    ["podcasts", quizId],
    () => quizService.getQuestionsById(quizId?.toString() || ""),
    {
      onSuccess: (quiz) => {
        setQuestionList(quiz);
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime:0
    }
  );

  useEffect(() => {
    if (quiz) {
      setQuestionList(quiz);
    }
  }, [quiz]);

  const { mutate } = useMutation(
    () =>
      quizService.answerQuestion(Number(quizId), questions[currentIndex].id, {
        questionId: questions[currentIndex].id,
        answers: selected,
      }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const nextClasses = classNames("text-white", {
    ["cursor-not-allowed"]: !selected,
    ["cursor-pointer"]: selected,
  });

  return (
    <PageContainer customClasses="p-12" loading={isLoading || isFetching}>
      <Card customClasses="bg-blue-dark">
        <>
          <Card customClasses="p-12 bg-white">
            {questions[currentIndex] && (
              <p className="text-red-dark text-2xl font-bold">
                {questions[currentIndex]?.name || ""}?
              </p>
            )}
            <div className="flex flex-col space-y-4 pt-4">
              {(questions[currentIndex]?.options || [])?.map(
                (option, index) => {
                  return (
                    <span className="flex space-x-4 align-middle" key={index}>
                      <Input
                        type="checkbox"
                        name="option"
                        value={option.id}
                        className="h-8 w-8"
                        onChange={() => setSelected([...selected, option.id])}
                      />
                      <span className="pt-2">{option.name}</span>
                    </span>
                  );
                }
              )}
            </div>
          </Card>
          <div className="p-4 flex text-white justify-between font-bold">
            <span>
              {currentIndex + 1} of {questions.length}
            </span>
            <span
              className={nextClasses}
              onClick={() => {
                if (selected) {
                  mutate();
                }
              }}
            >
              Next Question
            </span>
          </div>
        </>
      </Card>
    </PageContainer>
  );
};

export default Quiz;
