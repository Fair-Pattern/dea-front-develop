import React, { useEffect, useState } from "react";
import { Button, ButtonVariants } from "../button/Button";
import { Card } from "../Card";
export interface ConfirmProps {
    onYesClick: any;
    onCancel?: any;
    customClass?: string,
    title: string,
    description?: string | null,
    yesButtonText?: string,
    cancelButtonText?: string
}

export const ConfirmModal = ({
    onYesClick = () => { },
    onCancel = () => { },
    yesButtonText = "Yes",
    cancelButtonText = "Cancel",
    title,
    description = null
}: ConfirmProps) => {
    return <>
        <Card customClasses="bg-white w-96 text-black p-12">
            <div className="text-2xl font-bold text-red-600 text-center mb-4 ">{title}</div>
            {description && <div className=" text-gray-600 text-center p-4">{description}</div>}

            <Button
                type="button"
                variant={ButtonVariants.RED}
                onClick={onYesClick}
                customClasses="mt-4 w-full"
            >
                {yesButtonText}
            </Button>
            <Button customClasses="mt-4 w-full" type="button" variant={ButtonVariants.GRAY} onClick={onCancel}>
                {cancelButtonText}
            </Button>
        </Card>
    </>
}