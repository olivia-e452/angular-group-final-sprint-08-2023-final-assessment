interface Announcement {
  
  title: string;
  message: string;
  author: User;
}

interface NewAnnouncement extends Announcement {
    companyName?: string;
}

interface DisplayAnnouncement extends Announcement {
    id: number;
    date: string;
}


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
  companies?: Company[];
  teams?: Team[];
};

type Company = {
  id: number;
  name: string;
  description: string;
  teams: Team[];
  users: User[];
};

type Team = {
  id: number;
  name: string;
  description: string;
  users: User[];
};

type Project = {
  id?: number;
  name: string;
  description: string;
  active: boolean;
  team: Team;
};
