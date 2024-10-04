 import {API_URL} from "./variables"

/**
 * Uses simple fetch() to send message to the bot server using REST API
 *
 * @param message the message to be sent
 * @param queryId get from webApp.initDataUnsafe?.query_id
 */
export const sendMessageToServer = async (message:string, queryId:any) => {
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



export async function createOrGetUser(telegramId: number | undefined) {
    try {
        const response = await fetch(`${API_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telegramId })
        });

        // if (!response.ok) {
        //     throw new Error(`Error: ${response.status}`);
        // }

        const data = await response.json();
        console.log('User created successfully:', data);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}


