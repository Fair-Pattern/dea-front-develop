/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { AdminLayout } from "../../../../components/layout/admin"
import Modal from "../../../../components/modal/modal"
import { PageContainer } from "../../../../components/PageContainer"
import { StartUpInfo } from "../../../../components/search/sartup/iteminfo"
import startUpService, { StartUp } from "../../../../services/startup.service"

export interface StartUpModalProps {
    onCancel?: any;
    items: StartUp[];
    customClass?: string;
}
export interface StartUpItem {
    item: StartUp,
    onItemClick: any
}

const Item = ({ item, onItemClick = (item: StartUp) => { } }: StartUpItem) => {
    return <>
        <div className="flex cursor-pointer" onClick={() => onItemClick(item)}>
            <div className="mr-2">
                <img className="h-5 mt-1 p-1" src="/images/ellipse.png" alt="round" />
            </div>
            <div className=" max-w-2xl text-gray-700">{item.name}</div>
        </div>
    </>
}
const StartUps = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<StartUp | any>(null);
    const router = useRouter();
    const { name = '' } = router.query;
    let listItems = null;
    const { data, isSuccess, isLoading } = useQuery(['startup', name], () => startUpService.search(name as string));
    if (isSuccess) {
        listItems = data?.map((item: StartUp, index: number) =>
            <Item item={item} onItemClick={(res: StartUp) => {
                setSelectedItem(res);
                setShowModal(true);
            }} key={index} />
        );
    }

    return <>
        <PageContainer customClasses="w-auto p-10 my-14">
            <div className="bg-white w-auto text-black p-6 h-auto">
                <div className="flex cursor-pointer" onClick={() => router.back()}>
                    <img className="h-5 mt-1 p-1" src="/images/back.png" alt="back" />
                    <p className="text-red-700 ml-2">Back to search</p>
                </div>

                {!isLoading && <div className="p-2">
                    <div className="mb-4 text-gray-700 text-sm">Click on a project to see more details</div>
                    {listItems}
                </div>}
                {isLoading && <div className="p-2">
                    loading...
                </div>}
            </div>
            {showModal && (
                <Modal cancelOnClickOutSide={false} onCancel={() => setShowModal(false)}>
                    <StartUpInfo item={selectedItem} onCancel={() => setShowModal(false)} ></StartUpInfo>
                </Modal>
            )}
        </PageContainer>
    </>
}
StartUps.Layout = AdminLayout;
export default StartUps;