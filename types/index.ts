export interface User {
  id: string;
  username?: string;
  email: string;
  role: string;
  address?: string;
  city?: string;
  country?: string;
  zip_code?: number;
  status: string;
  fullname: string;
  verified: boolean;
  isAdmin: boolean;
  isMember: boolean;
  active: boolean;
  avatar: string|null
}

type Token = string;

export interface AuthenticateUser {
  isLoggedIn: boolean;
  user: Partial<User> | null;
  token: Token | null;
  setUser: (user: User) => void;
  setToken: (token: Token) => void;
  logout: () => void;
  updateAvatar:(avatar:string)=>void
}

export interface Theme {
  theme: "dark" | "light";
  toggle: () => void;
}

export interface App {
  sidebarVisibility: boolean;
  toggleSidebarVisibility: () => void;
}

export interface Podcast {
  id:          string;
  user_id:     string;
  title:       string;
  description: string;
  image:       string;
  audio:       Audio;
  category:    null;
  location:    string;
  status:      string;
  created_at:  Date;
  updated_at:  Date;
  views:       number;
  isPublished: boolean;
  isDraft:     boolean;
}

export interface Audio {
  file_data:  FileData;
  file_path:  string;
  deleted:    string;
  visibility: null;
  share_link: null;
}

export interface FileData {
  name:     string;
  path:     string;
  size:     FileSize;
  type:     string;
  mimeType: string;
}

export interface FileSize {
  size:          number;
  units:         string;
  size_full:     string;
  size_round:    number;
  size_in_bytes: number;
}

export interface PodcastCategory {
  id:          string;
  name:        string;
  slug:        string;
  status:      string;
  description: string;
  created_at:  Date;
  updated_at:  Date;
}

export interface Metrics {
  totalUsers:       number;
  publishedPodcast: number;
  podcasters:       number;
  male:             number;
  female:           number;
  malePercentage:   string;
  femalePercentage: string;
}

export interface PodcasterReturn {
  items:      Item[];
  page:       number;
  limit:      number;
  offset:     number;
  totalItems: number;
}

export interface Item {
  id:           string;
  fullname:     string;
  user_id:      string;
  status:       string;
  title:        string;
  description:  string;
  totalPodcast: string;
  subscription: Subscription;
}
export interface Podcaster {
  id:           string;
  fullname:     string;
  user_id:      string;
  status:       string;
  title:        string;
  description:  string;
  totalPodcast: string;
  subscription: string
}

export interface Subscription {
  subscription_plan: string;
  plan_amount:       string;
  expired:           boolean;
  subscriptionDate:  ExpiryDateClass;
  lastRenewedDate:   ExpiryDateClass;
  expiryDate:        ExpiryDateClass;
}

export interface ExpiryDateClass {
  nano:      number;
  timestamp: string;
  date:      string;
}
