export interface Account {
    _id?: string;
    vp?: any;
    ref_count?: number
    ref?: string;
    recentVotes?: number[];
    approves?: any[]
    balance?: number
    bw?: any;
    categoryFollows?: any[];
    created?: any;
    followers?: string[];
    json?: any;
    keys?: any[];
    lastRead?: number;
    name?: string;
    node_appr?: number;
    pub?: string;
    pub_witness?: string
    unread?: number;
    error?: any;
    follows?: string[];
    profile?: any;
}