type Announcement = {
    id?: number;
    date: string;
    title: string;
    message: string;
    author: User;
};

type UserProfile = {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
};

type User = {
    id?: number;
    profile: UserProfile;
    isAdmin: boolean;
    active: boolean;
    status: string;
};

