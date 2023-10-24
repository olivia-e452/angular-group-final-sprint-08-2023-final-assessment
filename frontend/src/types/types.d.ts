type Profile = {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
  };
  
  type Author = {
    id: number;
    profile: Profile;
    isAdmin: boolean;
    active: boolean;
    status: string;
  };
  
  type Announcement = {
    id: number;
    date: string;
    title: string;
    message: string;
    author: Author;
  };
  
  type UserProfile = {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
  };
  
  type User = {
    id: number;
    profile: UserProfile;
    isAdmin: boolean;
    active: boolean;
    status: string;
  };
  