import { DeleteThumbnail } from "@/actions/uploadNews";


export async function fetchNewsFromDB() {
    try {
        const news = await fetch('/api/News/', { method: 'GET' });
        return news.json();
    } catch (error) {
        console.error('Error fetching news from DB:', error);
        throw error;
    }
}

export async function fetchSpecificNewsFromDB(pointerChar) {
    try {
        const news = await fetch(`/api/News/specific`, {
            method: 'POST',
            body: JSON.stringify({ pointerChar }),
            headers: { 'Content-Type': 'application/json' }
        });
        return news.json();
    } catch (error) {
        console.error('Error fetching news from DB:', error);
        throw error;
    }
}

export async function updateNewsIntoDB(newsData) {
    try {
        const news = await fetch(`/api/News/`, {
            method: 'PUT',
            body: JSON.stringify(newsData),
            headers: { 'Content-Type': 'application/json' }
        });
        return news.json();

        // console.log('Updating news in DB with data:', newsData);
    } catch (error) {
        console.error('Error updating news in DB:', error);
        throw error;
    }
}

export async function DeleteNewsFromDB(newsID, current_thumbnail) {
    try {
        if (!DeleteThumbnail(current_thumbnail)) return false;

        const news = await fetch(`/api/News/`, {
            method: 'DELETE',
            body: JSON.stringify({ _id: newsID }),
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await news.json();
        if (!result.success) return false;
        return true;

        // console.log('Delete news in DB with data:', newsID);
    } catch (error) {
        console.error('Error deleting news in DB:', error);
        throw error;
    }
}



export async function fetchPendingNewsFromDB() {
    try {
        const news = await fetch('/api/News/requested/pending', { method: 'GET' });
        return news.json();
    } catch (error) {
        console.error('Error fetching news from DB:', error);
        throw error;
    }
}

export async function fetchDeclinedNewsFromDB() {
    try {
        const news = await fetch('/api/News/requested/declined', { method: 'GET' });
        return news.json();
    } catch (error) {
        console.error('Error fetching news from DB:', error);
        throw error;
    }
}

export async function changeRequestNewsIntoDB(newsID, requestStatus) {
    try {
        const news = await fetch(`/api/News/requested/`, {
            method: 'PUT',
            body: JSON.stringify({ _id: newsID, requested: requestStatus }),
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await news.json();
        if (!result.success) return false;
        return true;

        // console.log('Updating news in DB with data:', newsData);
    } catch (error) {
        console.error('Error changing news in DB:', error);
        throw error;
    }
}