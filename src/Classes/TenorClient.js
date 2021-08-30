import { User } from "./UserClass";

export const endpoint = "https://g.tenor.com/v1";
const key = "LXAB5RW7WVWA";
export const defaultProps = {
    "media_filter": "minimal",
    "limit": 50,
    get "anon_id"() { return User.local.id; }
};

let lastFetch = 0;

export default class TenorClient {
    static async executeRequest(cmd, props = {}) {
        while (performance.now() - lastFetch < 500)
            await new Promise(r => setTimeout(r, 100));
        lastFetch = performance.now();
        
        return await fetch(`${endpoint}/${cmd}?key=${key}${Object.entries({ ...defaultProps, ...props }).map(([key, value]) => `&${key}=${value}`).join("")}`)
            .then(response => response.json())
            .catch(console.error);
    }
    
    static getTrending(options = {}) {
        return this.executeRequest("trending", options);
    }
    
    static search(query, options = {}) {
        return this.executeRequest("search", { q: query, ...options });
    }
    
    static random(query = "", options = {}) {
        return this.executeRequest("random", { q: query, limit: 1, ...options });
    }
}