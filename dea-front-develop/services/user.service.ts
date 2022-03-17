import { api } from "./api.service";
import { Country } from "./country.service";

export enum UserType {
    ADMIN = 1,
    USER = 2,
    BUSINESS_ANGEL = 3
}

export type UserRegisterRequest = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    countryId: number;
    userType: UserType;
    isDataStore: boolean;
    isAgreeTermCondition: boolean;
}

export type UserInterest = {
    id: number;
    name: String;
}

export type UserProject = {
    id: number;
    name: string;
}

export type UserProfile = {
    country: Country;
    countryId: number;
    email: string;
    firstName: string;
    interests: UserInterest[];
    lastName: string;
    profilePicUrl: string;
    projects: UserProject[];
    userType: UserType;
}

export type PasswordChangeRequest = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export type StartupRequest = {
    projectFiles: [];
    name: string;
    description: string;
}

const userService = {
    register: (userInfo: UserRegisterRequest) => {
        return api("user/register", {
            method: "POST",
            data: userInfo
        }).then(res => res).catch(err => {
            throw err;
        });
    },
    update: (updateInfo: Partial<UserProfile>) => {
        return api("user/profile", {
            method: "PUT",
            data: updateInfo
        }).then(res => res).catch(err => {
            throw err;
        });
    },
    getByEmail: (email: string) => {
        return api<UserProfile>(`user/${email}`, {
            method: "GET"
        }).then(res => res).catch(err => err);
    },
    getProfile: () => {
        return api<UserProfile>("user/profile").then(res => res).catch(err => err);
    },
    uploadFile: (formData: FormData, type: number) => {
        return api<any>(`file/upload/${type}`, {
            method: "POST",
            body: formData,
            noContentType: true
        }).then(res => res).catch(err => {
            throw err;
        })
    },
    updatePassword: (req: PasswordChangeRequest) => {
        return api(`user/change/password`, {
            method: "POST",
            data: req,
        }).then(res => res).catch(err => {
            throw err;
        })
    },
    createStartup: (startupRequest: StartupRequest) => {
        return api("project", {
            method: "POST",
            data: startupRequest
        }).then(res => res).catch(err => {
            throw err;
        });
    }
}

export default userService;