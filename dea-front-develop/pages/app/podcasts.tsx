import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import YouTube from "react-youtube";
import { Card } from "../../components/Card";
import Modal from "../../components/modal/modal";
import { PageContainer } from "../../components/PageContainer";
import podcastService, { Podcast } from "../../services/podcast.service";
export const PODCAST_TITLE_URL = 90;
export const getWindowDimensions = () => {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  return {
    width: 1100,
    height: 640,
  };
};
export const splitUrl = (url: string) =>
  ((url || "").split("?")[1] || "").substr(2, (url || "").length);

const Home: NextPage = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
  }, []);
  console.log(windowDimensions);
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const {
    isLoading,
    isFetching,
    data: podcasts,
  } = useQuery<Podcast[]>("podcasts", podcastService.getList, {
    refetchOnWindowFocus: false,
  });

  return (
    <PageContainer customClasses="p-12" loading={isLoading || isFetching}>
      <>
        <div className="grid grid-cols-4">
          {(podcasts || []).map((podcast) => {
            const { podCastUrl, id, name } = podcast;
            return (
              <Card key={id} customClasses="m-4">
                <Card customClasses="p-4" rounded shadow>
                  <YouTube
                    videoId={splitUrl(podCastUrl)}
                    opts={{ height: "300" }}
                    onPlay={(e) => {
                      e.target.stopVideo();
                      setPodcast(podcast);
                      setShowVideo(true);
                    }}
                    className="w-full"
                  />
                </Card>

                <p className="text-red-dark text-xl text-center font-bold p-2">
                  {name.length > PODCAST_TITLE_URL
                    ? `${name.substr(0, PODCAST_TITLE_URL)}...`
                    : name}
                </p>
              </Card>
            );
          })}
        </div>
        {showVideo && (
          <Modal
            onCancel={() => setShowVideo(false)}
            cancelOnClickOutSide={false}
          >
            <Card customClasses="w-full h-full my-4 bg-white">
              <Card customClasses="bg-blue-dark p-2 youtube-player">
                <span
                  className="flex justify-end text-right text-white pr-2 cursor-pointer"
                  onClick={() => setShowVideo(false)}
                >
                  &#10005;
                </span>
                <div className="p-4 pt-2">
                  <YouTube
                    videoId={splitUrl(podcast?.podCastUrl || "")}
                    opts={{
                      height: `${windowDimensions.height / 1.5}`,
                      width: `${windowDimensions.width / 1.5}`,
                    }}
                    className="rounded-xl"
                  />
                </div>
              </Card>
              <p className="text-red-dark text-2xl text-center font-bold p-2">
                {podcast &&
                  podcast?.name?.length > PODCAST_TITLE_URL &&
                  `${podcast?.name.substr(0, PODCAST_TITLE_URL)}...`}
                {podcast &&
                  podcast?.name.length <= PODCAST_TITLE_URL &&
                  podcast?.name}
              </p>
            </Card>
          </Modal>
        )}
      </>
    </PageContainer>
  );
};

export default Home;
