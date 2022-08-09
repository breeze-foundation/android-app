import { Account } from "./Account";

export interface Content {
    author?: string;
    contentTs?: number;
    ts?: number;
    vp?: number;
    json: jsonObject;
    likes?: number;
    link?: string;
    _id?: number;
    dist?: number;
    pa?: any;
    pp?: any;
    __promoted?: boolean
    user?: Account
    votes?: any[]
}

export interface jsonObject {
    title?: string;
    image?: string;
    body?: string;
    category?: string;
    type?: number;
    tags?: string[]
}

export interface PostDetailProp {
    content: Content;
    author?: any;
    account?: Account;
    username?: string|undefined;
    singlePost?: boolean; // To check if we are seeing a single detail page
    likedContent?: boolean;
    ownContent?: boolean;
}