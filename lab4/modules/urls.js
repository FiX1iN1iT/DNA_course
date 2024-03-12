import {appAccessToken, accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
        this.forFriends = `access_token=${appAccessToken}&v=${version}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig&${this.commonInfo}`
    }

    getGroupMembers(groupId) {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}`
    }

    getConversationMembers(peerId) {
        return `${this.url}/messages.getConversationMembers?peer_id=${peerId}&fields=photo_400_orig&${this.commonInfo}`
    }

    getUserFriends(userId) {
        return `${this.url}/friends.get?user_id=${userId}&fields=photo_400_orig,city,sex&${this.forFriends}`
    }

    getUserFriendsNoParam() {
        return `${this.url}/friends.get?fields=photo_400_orig,sex,city&${this.forFriends}`
    }
}

export const urls = new Urls()