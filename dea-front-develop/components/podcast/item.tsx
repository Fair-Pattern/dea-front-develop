import React from "react";
import { Card } from "../Card";
import itemStyle from './podcast.module.css'
export interface ItemProps {
  onLinkClick?: any;
  onEditClick: any;
  onRemoveClick: any;
  item: any | null;
  index:number | 0;
  linkText?: string,
  editText: string,
  removeText: string,
  customClass?: string
}
export function ItemInfo({ onLinkClick = () => { }, 
onEditClick = () => { },
onRemoveClick = () => {},
 item, 
 index,
 linkText,
 editText,
 removeText,
 customClass
}: ItemProps) {
    return (
        <>
      
            <div className={customClass}>
                <div className="flex items-center justify-center font-bold p-2 mr-4 text-2xl">
                    {index}
                </div>
                <div className="flex-auto ">
                    <Card customClasses="">
                        <div className="flex">
                            <div className="flex-auto p-4">
                                <div className="flex max-w-md mb-6">{item?.name}</div>
                                {linkText &&<div className="mb-2 cursor-pointer">
                                    <a className={itemStyle.link} onClick={() =>onLinkClick(item)}>{linkText}</a>
                                </div>}
                                <div className="flex cursor-pointer mb-2">
                                    <a className={itemStyle.link} onClick={() => onEditClick(item)}>{editText}
                                    </a>
                                    <img className="h-5 mt-1 p-1" src="/images/edit.png" />
                                </div>
                                <div className="flex cursor-pointer mb-2">
                                    <a className={itemStyle.link} onClick={() =>onRemoveClick(item)}>{removeText}</a>
                                    <img className="h-5 mt-1 p-1" src="/images/remove.png" />
                                </div>
                            </div>
                            <div className="flex bg-gray-100  rounded-l-none rounded-2xl p-2 items-center justify-center cursor-pointer">
                                <img className="h-5 mt-1 p-1" src="/images/list.png" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

        </>
    );
}