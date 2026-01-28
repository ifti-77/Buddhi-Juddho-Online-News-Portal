"use client";

import { changeRequestNewsIntoDB, fetchDeclinedNewsFromDB, fetchPendingNewsFromDB, DeleteNewsFromDB} from "@/lib/newsInteractions";
import Link from "next/link";
import { useEffect, useState } from 'react';

export default function RequestedNews() {
    const [requestednews, setRequestedNews] = useState([]);
    const [showRequestedTable, setShowRequestedTable] = useState(true);
    const [showDeclinedTable, setShowDeclinedTable] = useState(false);

    useEffect(() => {
        async function fetchPendingNews() {

            const response = await fetchPendingNewsFromDB();
            const data = await response
            setRequestedNews(data);
        }

        async function fetchDeclinedNews() {

            const response = await fetchDeclinedNewsFromDB();
            const data = await response
            setRequestedNews(data);
        }
        showRequestedTable && fetchPendingNews();
        showDeclinedTable && fetchDeclinedNews();
    }, [showRequestedTable, showDeclinedTable]);

    const handleChangingRequestedStatus = async (newsId, newStatus) => {
        const response = await changeRequestNewsIntoDB(newsId, newStatus);
        if (response) {
            setRequestedNews((prevNews) => prevNews.filter(news => news._id !== newsId));
            alert(`News ${newStatus === 'approved' ? 'approved' : 'declined'} successfully.`);
        }
    };

    const filterOutNews = async (newsID, current_thumbnail) => {
        if (await DeleteNewsFromDB(newsID, current_thumbnail)) {
            const updatedNewsList = requestednews.filter(item => item._id !== newsID);
            setRequestedNews(updatedNewsList);
            alert("News item deleted successfully.");
        } else {
            alert("Failed to delete news item.");
        }
    }

    return (
        <div>
            <div>
                <button onClick={() => {setShowRequestedTable(true); setShowDeclinedTable(false)}}>Requested News</button>
                <button onClick={() => {setShowRequestedTable(false); setShowDeclinedTable(true)}}>Declined News</button>
            </div>
            {showRequestedTable && <div>
                <h2 className="text-2xl font-semibold my-4">Requested News</h2>
                <ul>

                    {requestednews.map(item => (
                        <div key={item._id}>
                            <li>{item.title} - {item.category}- {item.author}
                                <button><Link href={`/${item.category}/${item._id}`} target="_blank">Read More</Link></button>
                                <button onClick={() => confirm("Approve this news?") && handleChangingRequestedStatus(item._id, 'approved')}>Approve</button>
                                <button onClick={() => {
                                    confirm("Decline this news?") && handleChangingRequestedStatus(item._id, 'declined')
                                }}>Decline</button>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>}

            {showDeclinedTable && <div>
                <h2 className="text-2xl font-semibold my-4">Declined News</h2>
                <ul>

                    {requestednews.map(item => (
                        <div key={item._id}>
                            <li>{item.title} - {item.category}- {item.author}
                                <button><Link href={`/${item.category}/${item._id}`} target="_blank">Read More</Link></button>
                                <button onClick={() => confirm("Approve this news?") && handleChangingRequestedStatus(item._id, 'approved')}>Approve</button>
                                <button onClick={() => {
                                    confirm("Are you sure you want to delete this news item?") && filterOutNews(item._id, item.thumbnailPath)
                                }}>Delete</button>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>}
        </div>
    )
}
