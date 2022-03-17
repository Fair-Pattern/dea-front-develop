/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../components/layout/admin";
import { PageContainer } from "../../../components/PageContainer";
import { ItemInfo } from "../../../components/podcast/item";
import podcastService, { Podcast } from "../../../services/podcast.service";
import { ReactSortable } from "react-sortablejs";
import { Button, ButtonVariants } from "../../../components/button/Button";
import Modal from "../../../components/modal/modal";
import { AddPodcast } from "../../../components/podcast/podcastmodal";
import { ConfirmModal } from "../../../components/confirm/confirm";
import { Card } from "../../../components/Card";
import YouTube from "react-youtube";
import { getWindowDimensions, splitUrl } from "../../app/podcasts";

const Index = () => {
  const [podcasts, setPodcasts] = useState<Podcast[] | null | any>();
  const [currentPodcasts, setcurrentPodcasts] = useState<Podcast[] | null | any>();
  const [showModal, setShowModal] = useState(false);
  const [deleteItem, setdeleteItem] = useState<Podcast | any>();
  const [isAdd, setIsAdd] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
    getAll();
  }, [])
  useEffect(() => {
    (async () => {
      await checkOrder();
    })
      ();

  }, [currentPodcasts])
  const getAll = async () => {
    const data = await podcastService.getList() || [];
    data.sort(function (a: Podcast, b: Podcast) { return a.order - b.order });
    setcurrentPodcasts(data);
    setPodcasts(data);
  }
  const deletePodcast = async (id: number) => {
    await podcastService.delete(id);
    getAll();
  }
  const updateOrderNum = async (models: Podcast[]) => {
    await podcastService.updateOrderNum(models);
  }
  const checkOrder = async () => {
    const old = podcasts?.map((x: Podcast) => x.order).join('');
    const curr = currentPodcasts?.map((x: Podcast) => x.order).join('');
    if (podcasts && currentPodcasts && old != curr) {
      await updateOrderNum(currentPodcasts);
      setPodcasts(currentPodcasts);
    }
  }
  return <>
    <PageContainer customClasses="w-auto h-auto my-14">
      <div className="text-2xl font-bold text-red-600 p-10">Add/Remove/Edit Podcasts</div>
      <div className="h-96 overflow-y-auto p-2 scrollbar">
        {currentPodcasts && <ReactSortable list={currentPodcasts} setList={setcurrentPodcasts} animation={200}
          delay={2} multiDrag >
          {(currentPodcasts?.map((item: Podcast, index: number) =>
            <ItemInfo
              onEditClick={(e: Podcast) => {
                setIsAdd(false);
                setPodcast(item);
                setShowModal(true);
              }}
              onLinkClick={() => {
                setPodcast(item);
                setShowVideo(true);
              }}
              onRemoveClick={() => {
                setdeleteItem(item)
                setShowConfirmModal(true)
              }}
              linkText={'video link'}
              editText={'Edit Podcast'}
              removeText={'Remove Podcast'}
              item={item}
              index={index + 1}
              key={item.id}
              customClass="mt-4 p-2 flex min-w-300"
            />))}
        </ReactSortable>}
      </div>
      <div className="p-2">
        <Button customClasses="mt-10 mx-10 mb-10" width={'w-3/4'} variant={ButtonVariants.RED} onClick={() => {
          setPodcast(null);
          setShowModal(true)
        }}>
          Add More Podcasts
        </Button>
      </div>

    </PageContainer>
    {showModal && (
      <Modal cancelOnClickOutSide={false} onCancel={() => setShowModal(false)}>
        <AddPodcast
          onCancel={() => { setShowModal(false); setIsAdd(true) }}
          onRsponse={(isSucces: boolean) => {
            if (isSucces) {
              getAll();
              setShowModal(false);
              setIsAdd(true);
            }
          }}
          item={podcast}
          isAdd={isAdd}
          order={podcasts ? podcasts.length + 1 : 1}
        ></AddPodcast>
      </Modal>
    )}
    {showConfirmModal && (
      <Modal cancelOnClickOutSide={false} onCancel={() => setShowConfirmModal(false)}>
        <ConfirmModal
          onCancel={() => setShowConfirmModal(false)}
          onYesClick={() => {
            deletePodcast(deleteItem.id);
            setShowConfirmModal(false);
          }}
          description={`Are you sure you want to remove "${deleteItem.name}"?`}
          title='Remove a Podcast'
          yesButtonText='Yes, Remove the Podcast'
        ></ConfirmModal>
      </Modal>
    )}
         {showVideo && (
          <Modal onCancel={() => setShowVideo(false)}>
            <Card customClasses="w-full h-full my-4 bg-white">
              <Card customClasses="bg-blue-dark p-8 youtube-player">
                <YouTube
                  videoId={splitUrl(podcast?.podCastUrl || '')}
                  opts={{ height: `${windowDimensions.height / 1.5}`, width: `${windowDimensions.width / 1.5}` }}
                />
              </Card>
              <p className="text-red-dark text-2xl text-center font-bold p-2">
                {podcast && podcast?.name?.length > 40 &&
                  `${podcast?.name.substr(0, 40)}...`}
                {podcast && podcast?.name.length <= 40 && podcast?.name}
              </p>
            </Card>
          </Modal>
        )}
  </>
};
Index.Layout = AdminLayout;
export default Index;