import { DeleteThumbnail } from "@/actions/uploadNews";

const API_BASE_URL = 'http://localhost:3000/api/News/';

export async function fetchNewsFromDB() {
    try {
        const news = await fetch(`${API_BASE_URL}`, { method: 'GET' });
        return news.json();
    } catch (error) {
        console.error('Error fetching news from DB:', error);
        throw error;
    }
}

export async function fetchNewsByCategoryFromDB(category) {
    try {
        const news = await fetch(`${API_BASE_URL}category?category=${encodeURIComponent(category)}`, { method: 'GET' });
        const data = await news.json();
        if(!news.ok){
            return { newsItems: [], count: 0, error: data.error };
        }

        return data;
        
    } catch (error) {
        console.error('Error fetching news by category from DB:', error);
        throw error;
    }
}

export async function fetchOneNewsFromDB(id) {
    try{
        const news = await fetch(`${API_BASE_URL}specific?id=${encodeURIComponent(id)}`, { method: 'GET' });
        const data = await news.json();

        if(!news.ok){
            return null;
        }

        return data;
    }catch(error){
        console.error('Error fetching one news from DB:', error);
        throw error;
    }
}
export async function fetchSpecificNewsFromDB(pointerChar) {
    try {
        const news = await fetch(`${API_BASE_URL}specific`, {
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
        const news = await fetch(`${API_BASE_URL}`, {
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

        const news = await fetch(`${API_BASE_URL}`, {
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
        const news = await fetch(`${API_BASE_URL}requested/pending`, { method: 'GET' });
        return news.json();
    } catch (error) {
        console.error('Error fetching news from DB:', error);
        throw error;
    }
}

export async function fetchDeclinedNewsFromDB() {
    try {
        const news = await fetch(`${API_BASE_URL}requested/declined`, { method: 'GET' });
        return news.json();
    } catch (error) {
        console.error('Error fetching news from DB:', error);
        throw error;
    }
}

export async function changeRequestNewsIntoDB(newsID, requestStatus) {
    try {
        const news = await fetch(`${API_BASE_URL}requested/`, {
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