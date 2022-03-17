import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Button, ButtonVariants } from "../../../../components/button/Button";
import { Input } from "../../../../components/input/Input";
import { AdminLayout } from "../../../../components/layout/admin";
import Modal from "../../../../components/modal/modal";
import { PageContainer } from "../../../../components/PageContainer";
import UserInfo from "../../../../components/search/user/userInfo";
import userService, { UserProfile } from "../../../../services/user.service";

const SearchByEmail = () => {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState<UserProfile | any>();
    const [showModal, setShowModal] = useState(false);
    const handleLogin = async (e: any) => {
        e.preventDefault();
        findUser.mutate(email, {
            onError: (error, email, context: any) => {
                // An error happened!
                console.log(`rolling back optimistic update with id ${context.id}`)
            },
            onSuccess: (data: UserProfile, email, context) => {
                if (data.email) {
                    setUser(data);
                    setShowModal(true);
                }
            },
        });
    };
    const findUser = useMutation((email: string) => {
        return userService.getByEmail(email);
    });

    return <>
        <PageContainer customClasses="w-auto p-10 my-14">
            <form onSubmit={handleLogin}>
                <div className="text-2xl font-bold text-red-600 p-4">Find Users By Email</div>

                <label className="text-l mb-2 flex ">User Email &nbsp; {findUser?.data?.error &&
                    <p className="text-red-700">{findUser?.data?.response?.message}</p>}</label>
                <Input
                    type="email"
                    className="mt-2 mb-2 shadow-lg"
                    placeholder="search by email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    error={findUser?.data?.error}
                    rightIcon={
                        findUser?.data?.error ? "/images/error.png" : null
                    }
                    value={email}
                    required
                />
                <Button
                    type="submit"
                    variant={ButtonVariants.RED}
                    loading={findUser.isLoading}
                    onClick={(e) => console.log(e)}
                    customClasses="mt-4 w-full"
                >
                    Find User
                </Button>
            </form>
            {showModal && (
                <Modal cancelOnClickOutSide={false} onCancel={() => setShowModal(false)}>
                    <UserInfo user={user} onCancel={() => setShowModal(false)} />
                </Modal>
            )}
        </PageContainer>
    </>
};
SearchByEmail.Layout = AdminLayout;
export default SearchByEmail;