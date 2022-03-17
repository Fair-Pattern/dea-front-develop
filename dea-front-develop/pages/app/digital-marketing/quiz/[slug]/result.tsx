import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { Card } from "../../../../../components/Card";
import Link from "../../../../../components/Link";
import { PageContainer } from "../../../../../components/PageContainer";
import { Icon } from "../../../../../components/user-profile-section";
import quizService, {
  QuestionAnswerStatus,
  QuizStatus,
} from "../../../../../services/quiz.service";

const Result: NextPage = () => {
  const router = useRouter();
  const quizId = router.query.slug;
  const {
    isLoading,
    isFetching,
    data: result = null,
  } = useQuery<Partial<any>>(
    ["result", quizId],
    () => quizService.getQuizResult(quizId?.toString() || ""),
    {
      onSuccess: () => {},
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 0,
    }
  );

  const {
    isLoading: resetLoading,
    error: resetError,
    mutate,
  } = useMutation(
    () => {
      return quizService.resetQuiz(String(quizId));
    },
    {
      onSuccess: () => {
        router.push("/app/digital-marketing");
      },
    }
  );

  return (
    <PageContainer
      customClasses="p-12"
      loading={isLoading || resetLoading || isFetching}
    >
      {result && (
        <Card customClasses="bg-blue-dark">
          <Card customClasses="p-12 bg-white">
            <p className="text-red-dark text-2xl font-bold">{result.name}</p>
            <div className="pt-12 grid grid-cols-2 gap-2">
              {result.questions?.map((question: any) => (
                <div
                  key={question.id}
                  className="flex align-middle align-center text-center pb-8"
                >
                  <Icon
                    image={
                      question.answer === QuestionAnswerStatus.CORRECT
                        ? "/images/correct.png"
                        : "/images/wrong.png"
                    }
                    padding="p-8"
                    width="w-12"
                    height="h-12"
                  />
                  <div
                    className={`flex items-center break-all pl-8 text-lg  ${
                      question.answer != QuestionAnswerStatus.CORRECT
                        ? "text-red-dark"
                        : "text-gray-ash"
                    } `}
                  >
                   {question.name}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <div className="p-4  flex text-white justify-between font-bold">
            <span>&nbsp;</span>
            {result.status === QuizStatus.FAILED && (
              <Link
                onClick={() => {
                  mutate();
                }}
                href="#"
              >
                Watch the video again
              </Link>
            )}
            {result.status === QuizStatus.PASSED &&
              (result.isEligibleForStartUp ? (
                <Link
                  onClick={() => {
                    router.push("/app/startup");
                  }}
                  href="#"
                >
                  Create your first startup
                </Link>
              ) : (
                <Link
                  onClick={() => {
                    router.push("/app/digital-marketing");
                  }}
                  href="#"
                >
                  Take to Next Video
                </Link>
              ))}
          </div>
        </Card>
      )}
    </PageContainer>
  );
};

export default Result;
