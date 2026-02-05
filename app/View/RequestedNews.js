"use client";

import { changeRequestNewsIntoDB, fetchDeclinedNewsFromDB, fetchPendingNewsFromDB, DeleteNewsFromDB} from "@/lib/newsInteractions";
import Link from "next/link";
import { useEffect, useState } from 'react';

export default function RequestedNews() {
    const [requestednews, setRequestedNews] = useState([]);
    const [showRequestedTable, setShowRequestedTable] = useState(true);
    const [showDeclinedTable, setShowDeclinedTable] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPendingNews() {
            setIsLoading(true);
            const response = await fetchPendingNewsFromDB();
            const data = await response
            setRequestedNews(data);
            setIsLoading(false);
        }

        async function fetchDeclinedNews() {
            setIsLoading(true);
            const response = await fetchDeclinedNewsFromDB();
            const data = await response
            setRequestedNews(data);
            setIsLoading(false);
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
        <div className="w-full mx-auto">
            <div className="bg-white border-2 border-gray-300 shadow-lg">
                {/* Header with Toggle Buttons */}
                <div className="bg-black  px-4 md:px-6 py-3 md:py-4 border-b-4 border-gray-800 flex items-center justify-between flex-wrap gap-3 md:gap-4">
                    <h2 className="!text-white text-lg md:text-2xl font-bold uppercase tracking-wide">
                        {showRequestedTable ? 'অনুরোধকৃত সংবাদ' : 'প্রত্যাখ্যাত সংবাদ'}
                    </h2>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => {setShowRequestedTable(true); setShowDeclinedTable(false)}}
                            className={`px-3 md:px-4 py-2 font-bold uppercase text-xs tracking-wide transition-colors ${
                                showRequestedTable 
                                    ? 'bg-white text-black' 
                                    : 'bg-gray-700 text-white hover:bg-gray-600'
                            }`}
                        >
                            অনুরোধকৃত
                        </button>
                        <button 
                            onClick={() => {setShowRequestedTable(false); setShowDeclinedTable(true)}}
                            className={`px-3 md:px-4 py-2 font-bold uppercase text-xs tracking-wide transition-colors ${
                                showDeclinedTable 
                                    ? 'bg-white text-black' 
                                    : 'bg-gray-700 text-white hover:bg-gray-600'
                            }`}
                        >
                            প্রত্যাখ্যাত
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
                        </div>
                    ) : requestednews.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">
                                {showRequestedTable ? 'কোনো অনুরোধকৃত সংবাদ নেই' : 'কোনো প্রত্যাখ্যাত সংবাদ নেই'}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {requestednews.map(item => (
                                <div key={item._id} className="border-2 border-gray-200 hover:border-black transition-colors">
                                    <div className="p-3 md:p-4 bg-gray-50 border-b border-gray-200">
                                        <h3 className="font-bold text-base md:text-lg text-gray-800 mb-2">{item.title}</h3>
                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-600">
                                            <span className="font-semibold">বিভাগ: <span className="text-black">{item.category}</span></span>
                                            <span className="font-semibold">লেখক: <span className="text-black">{item.author}</span></span>
                                        </div>
                                    </div>
                                    <div className="p-3 md:p-4 flex gap-2 flex-wrap bg-white">
                                        <Link 
                                            href={`/home/${item.category}/${item._id}`} 
                                            target="_blank"
                                            className="flex-1 sm:flex-initial text-center px-3 md:px-4 py-2 bg-blue-600 text-white font-bold uppercase text-xs tracking-wide hover:bg-blue-700 transition-colors"
                                        >
                                            বিস্তারিত দেখুন
                                        </Link>
                                        
                                        {showRequestedTable && (
                                            <>
                                                <button 
                                                    onClick={() => confirm("আপনি কি এই সংবাদটি অনুমোদন করতে চান?") && handleChangingRequestedStatus(item._id, 'approved')}
                                                    className="flex-1 sm:flex-initial px-3 md:px-4 py-2 bg-green-600 text-white font-bold uppercase text-xs tracking-wide hover:bg-green-700 transition-colors"
                                                >
                                                    অনুমোদন করুন
                                                </button>
                                                <button 
                                                    onClick={() => confirm("আপনি কি এই সংবাদটি প্রত্যাখ্যান করতে চান?") && handleChangingRequestedStatus(item._id, 'declined')}
                                                    className="flex-1 sm:flex-initial px-3 md:px-4 py-2 bg-yellow-500 text-white font-bold uppercase text-xs tracking-wide hover:bg-yellow-600 transition-colors"
                                                >
                                                    প্রত্যাখ্যান করুন
                                                </button>
                                            </>
                                        )}
                                        
                                        {showDeclinedTable && (
                                            <>
                                                <button 
                                                    onClick={() => confirm("আপনি কি এই সংবাদটি অনুমোদন করতে চান?") && handleChangingRequestedStatus(item._id, 'approved')}
                                                    className="flex-1 sm:flex-initial px-3 md:px-4 py-2 bg-green-600 text-white font-bold uppercase text-xs tracking-wide hover:bg-green-700 transition-colors"
                                                >
                                                    অনুমোদন করুন
                                                </button>
                                                <button 
                                                    onClick={() => confirm("আপনি কি নিশ্চিত এই সংবাদটি মুছে ফেলতে চান?") && filterOutNews(item._id, item.thumbnailPath)}
                                                    className="flex-1 sm:flex-initial px-3 md:px-4 py-2 bg-red-600 text-white font-bold uppercase text-xs tracking-wide hover:bg-red-700 transition-colors"
                                                >
                                                    মুছে ফেলুন
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
