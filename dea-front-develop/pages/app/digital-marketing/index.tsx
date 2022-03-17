import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import YouTube from "react-youtube";
import { Card } from "../../../components/Card";
import Link from "../../../components/Link";
import { PageContainer } from "../../../components/PageContainer";
import quizService, { Quiz, QuizStatus } from "../../../services/quiz.service";
import { getWindowDimensions, splitUrl } from "../podcasts";

const DigitalMarketing: NextPage = () => {
  const Icon = ({ src = "locked" }) => (
    <div className="rounded-full bg-blue-dark p-2">
      <img
        className="cursor-pointer"
        src={`/images/video-tab-${src || "locked"}.png`}
        height={37}
        width={37}
      />
    </div>
  );
  const [windowDimensions] = useState(getWindowDimensions());
  const {
    isLoading,
    isFetching,
    data: quizzes = [],
  } = useQuery<Partial<Quiz>[]>("podcasts", quizService.getListForClient, {
    refetchOnWindowFocus: false,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const resolveStatusIcon = (status: QuizStatus) =>
    status === QuizStatus.INPROGRESS
      ? "unlocked"
      : status === QuizStatus.PASSED
      ? "checked"
      : null;

  const videoUrl = quizzes[currentIndex]?.videoUrl || "";

  useEffect(() => {
    let currentItemIndex = (quizzes || []).findIndex(
      ({ status = QuizStatus.UNSEEN }) => status === QuizStatus.INPROGRESS
    );

    currentItemIndex =
      currentItemIndex < 0 ? quizzes.length - 1 : currentItemIndex;

    setCurrentIndex(currentItemIndex);

    console.log(currentItemIndex, currentIndex);
  }, [quizzes]);

  return (
    <PageContainer customClasses="p-12" loading={isLoading || isFetching}>
      {quizzes.length > 0 && (
        <>
          <Card customClasses="bg-blue-dark">
            <Card customClasses="p-4 bg-white">
              <YouTube
                videoId={splitUrl(videoUrl)}
                opts={{ height: String(windowDimensions.height / 1.5) }}
                className="w-full"
              />
            </Card>
            <div className="p-4 flex text-white justify-between font-bold">
              <Link
                href="#"
                onClick={() => {
                  if (currentIndex > 0) {
                    setCurrentIndex(currentIndex - 1);
                  }
                }}
              >
                {currentIndex > 0 ? "Previous" : ""}
              </Link>
              <span>
                {currentIndex + 1} of {quizzes.length}
              </span>
              {currentIndex !== undefined && (
                <Link
                  href={`/app/digital-marketing/quiz/[slug]`}
                  as={`/app/digital-marketing/quiz/${
                    quizzes[currentIndex]?.id || ""
                  }`}
                >
                  Take the quiz
                </Link>
              )}
            </div>
          </Card>
          <div className="flex space-x-20 pt-2">
            {quizzes.map(({ status = QuizStatus.UNSEEN }, index) => (
              <Icon key={index} src={resolveStatusIcon(status) || ""} />
            ))}
          </div>
        </>
      )}
      {!quizzes.length && (
        <Card customClasses="p-16 bg-white text-center text-2xl">
          No quizzes available!
        </Card>
      )}
    </PageContainer>
  );
};

export default DigitalMarketing;
