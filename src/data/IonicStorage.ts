import { Storage, Drivers } from "@ionic/storage";

let storage: Storage;

export const createStore = (name = "_tmac") => {

    storage = new Storage({
        
        name,
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    });

    storage.create();
}


export const set = (key:string, val: any) => {

    storage.set(key, val);
}

export const get = async (key: string) => {

    const val = await storage.get(key);
    return val;
}

export const remove = async (key: string) => {

    await storage.remove(key);
}

export const clear = async () => {

    await storage.clear();
}

export const setObject = async (key: string, id: string, val: any) => {

    const all = await storage.get(key);
    const objIndex = await all.findIndex((a: any) => parseInt(a.id) === parseInt(id));

    all[objIndex] = val;
    set(key, all);
}

export const removeObject = async (key: string, id:string) => {

    const all = await storage.get(key);
    const objIndex = await all.findIndex((a: any) => parseInt(a.id) === parseInt(id));

    all.splice(objIndex, 1);
    set(key, all);
}

export const getObject = async (key: string, id:string) => {

    const all = await storage.get(key);
    const obj = await all.filter((a: any) => parseInt(a.id) === parseInt(id))[0];
    return obj;
}

export const checkLoginStatus = async () => {
    createStore("TMAC");
    const login_status = await get("login_status");
    return login_status ? login_status: false;
}

export const getUserName = async () => {
    createStore("TMAC");
    const username = await get("username");
    return username ? username: undefined;
}

export const logoutUser = async() => {
    await remove('username')
    await remove('token');
    await remove('account');
    set('login_status', false);
} 