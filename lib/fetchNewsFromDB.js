export async function fetchNewsFromDB() {
    try {
        const news = await fetch('/api/News/', { method: 'GET' });
        return news.json();
    }catch (error) {
        console.error('Error fetching news from DB:', error);
        throw error;
    }
}