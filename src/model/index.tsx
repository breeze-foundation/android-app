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
}

export interface jsonObject {
    title?: string;
    image?: string;
    body?: string;
    category?: string;
    type?: number;
}

export interface PostDetailProp {
    content: Content
}