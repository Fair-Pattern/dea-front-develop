import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import podcastService, { Podcast } from "../../services/podcast.service";
import { retrieveErrorMessage } from "../../utils/retrieve-validation-error";
import { Button, ButtonVariants } from "../button/Button";
import { Card } from "../Card";
import { Input } from "../input/Input";
export interface PodcastModalProps {
    onRsponse?: any;
    onCancel?: any;
    item?: Podcast | null;
    index?: number | 0;
    isAdd: boolean,
    customClass?: string;
    order: number
}

export const AddPodcast = ({
    onCancel = () => { },
    onRsponse = () => { },
    item,
    order,
    isAdd = true
}: PodcastModalProps) => {
    const [name, setName] = useState(item?.name);
    const [podCastUrl, setPodCastUrl] = useState(item?.podCastUrl);
    const [error, setError] = useState<any>(null);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (isAdd) {
            const model: Podcast = {
                id: 0,
                name: name ? name : '',
                podCastUrl: podCastUrl ? podCastUrl : '',
                order: order,
                description: '',
                durationSecound: 0
            }
            createMutated(model);
        } else {
            if (item) {
                const model: Podcast = {
                    ...item,
                    name: name ? name : '',
                    podCastUrl: podCastUrl ? podCastUrl : ''
                }
                updateMutated(model);
            }
        }
    };
    const {
        isLoading: createLoading,
        error: createError,
        mutate: createMutated,
        reset: createReset,
    } = useMutation((model: Podcast) => podcastService.add(model), {
        onSuccess: () => {
            createReset();
            onRsponse(true);
        },
        onError:(err) =>{
            setError(err)
        },
    }
    );
    const {
        isLoading: updateLoading,
        error: updateError,
        mutate: updateMutated,
        reset: updateReset,
    } = useMutation((model: Podcast) => podcastService.update(model.id, model), {
        onSuccess: () => {
            updateReset();
            onRsponse(true);
        },
        onError:(err) =>{
            setError(err)
        },

    }
    );

    return <>
        <Card customClasses="h-120 bg-white w-96 text-black p-12">
            <div className="text-2xl font-bold text-red-600 text-center mb-4 ">Edit / Add Podcast</div>
            {retrieveErrorMessage(error) && (
                <span className="text-sm text-red-dark">
                  {retrieveErrorMessage(error)}
                </span>
              )}
            <form onSubmit={handleLogin} autoComplete="off">
                <label className="text-sm mb-2 ">Video</label>
                <Input
                    type="text"
                    placeholder=""
                    onChange={(e) => {
                        setPodCastUrl(e.target.value);
                    }}
                    textColor="text-black"
                    value={podCastUrl}
                    error={retrieveErrorMessage(error, "PodCastUrl")}
                    required
                    className="mt-2 mb-2 shadow-lg"
                />{" "}
                <label className="text-sm mb-2 mt-5 ">Headline</label>
                <Input
                    type="text"
                    className="mt-2 mb-2 shadow-lg"
                    placeholder=""
                    textColor="text-black"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    error={retrieveErrorMessage(error, "Name")}
                    value={name}
                    required
                />

                <Button
                    type="submit"
                    variant={ButtonVariants.RED}
                    onClick={(e) => console.log(e)}
                    customClasses="mt-4 w-full"
                    loading={createLoading || updateLoading}
                >
                    Save
                </Button>
                <Button customClasses="mt-4 w-full" type="button" variant={ButtonVariants.GRAY} onClick={onCancel}>
                    Cancel
                </Button>
            </form>
        </Card>
    </>
}