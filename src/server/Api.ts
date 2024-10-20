import { FriendTypes } from "../utils/types"
import { API_URL } from "./variables"

/**
 * Uses simple fetch() to send message to the bot server using REST API
 *
 * @param message the message to be sent
 * @param queryId get from webApp.initDataUnsafe?.query_id
 */
export const sendMessageToServer = async (message: string, queryId: any) => {
    const body = {
        queryId: queryId,
        message: message
    }

    const messagesEndpoint = `${API_URL}/messages`
    return await fetch(messagesEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export async function getUserFriends(telegramId: string | undefined) {
    try {
        const res = await fetch(`${API_URL}/get-friends/${telegramId}`)
        const data = await res.json()
        return data as FriendTypes[]
    } catch (error) {
        console.error('Error getting user friends', error);
    }

}

export async function createOrGetUser(telegramId: number | string | undefined, username: string | undefined) {
    try {
        return await fetch(`${API_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telegramId: telegramId, username: username, fren: null })
        });

        // if (!response.ok) {
        //     throw new Error(`Error: ${response.status}`);
        // }

        // const data = await response.json();
        // console.log('User created successfully:', data);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}


