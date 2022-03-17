import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, ButtonVariants } from "../../../../components/button/Button";
import { Input } from "../../../../components/input/Input";
import { AdminLayout } from "../../../../components/layout/admin";
import { PageContainer } from "../../../../components/PageContainer";

const SearchStartup = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const handleLogin = async (e: any) => {
        e.preventDefault();
        router.push({
            pathname: '/admin/search/startup/[name]',
            query: { name: name },
          })
    };
    return <>
        <PageContainer customClasses="w-auto p-10 my-14">
            <form onSubmit={handleLogin}>
                <div className="text-2xl font-bold text-red-600 p-4 mb-2">Find Startups</div>
                <Input
                    type="text"
                    className="mb-2 shadow-lg"
                    placeholder="search by startup name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    value={name}
                    required
                />
                <Button
                    type="submit"
                    variant={ButtonVariants.RED}
                    onClick={(e) => console.log(e)}
                    customClasses="mt-4 w-full"
                >
                    Find Startup
                </Button>
            </form>
        </PageContainer>
    </>
};
SearchStartup.Layout = AdminLayout;
export default SearchStartup;