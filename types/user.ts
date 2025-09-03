
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  posts: number;
  verified?: boolean;
}

export interface Story {
  id: string;
  user: User;
  image: string;
  timestamp: Date;
  viewed: boolean;
}

export interface Post {
  id: string;
  user: User;
  content?: string;
  images: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  liked: boolean;
  saved: boolean;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: number;
  liked: boolean;
}
Unsaved Changes

Reset All

Save
App Preview
+ New Terminal
