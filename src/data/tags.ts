import axios from "axios";

const API = process.env.API_URL || 'https://api.breezechain.org';
const getTags = async (maxTags?: number) => {
    if (!maxTags) maxTags = 15; 
    let timeNow = new Date().getTime(); 
    let postsTime = timeNow - 14400000; 
    let tagsAPI = await axios.get(API + `/trending?after=${postsTime}&limit=100`); 
    let posts = tagsAPI.data; 
    let tags: any = {};
    for (let p in posts) if (posts[p].json && posts[p].json.tags) { let postTags = posts[p].json.tags; for (let t in postTags) if (!tags[postTags[t]]) { tags[postTags[t]] = 1 } else { tags[postTags[t]] += 1 } }; let tagArr = [];
    for (let t in tags) tagArr.push({ m: t, v: tags[t] }); let tagsArr = tagArr.sort((a, b) => b.v - a.v); tagsArr = tagsArr.slice(0, maxTags); return tagsArr
}

export default getTags;