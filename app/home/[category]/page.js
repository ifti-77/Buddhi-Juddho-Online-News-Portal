"use client";

import Image from "next/image";

import { fetchNewsByCategoryFromDB } from '@/lib/newsInteractions';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


export default  function CategoryPage() {

    const [categoryWiseNews, setCategoryWiseNews] = useState([]);
    const param = useParams();
    const accutalCategory = decodeURIComponent(param.category);


    useEffect(() => {
        const fetchCategoryWiseNews = async () => {
            const newsByCategory = await fetchNewsByCategoryFromDB(accutalCategory);
            setCategoryWiseNews(newsByCategory)
        }
        fetchCategoryWiseNews();
    },[accutalCategory])


    if (!categoryWiseNews || categoryWiseNews.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">No news found in "{accutalCategory}" category.</h2>
            </div>
        );
    }

    return (
        <div>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">News in "{accutalCategory}" Category</h2>
                {categoryWiseNews.map((news) => (
                    <article key={news._id} className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
                        {news.thumbnailPath && (
                            <div className="relative w-full h-64">
                                <Image
                                    src={news.thumbnailPath}
                                    alt={news.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        <div className="p-6 md:p-8">
                            <h3 className="text-2xl font-bold mb-2 text-gray-900">{news.title}</h3>

                            <div className="flex items-center gap-4 text-gray-600 text-sm mb-4 border-b pb-4">
                                <span className="font-medium">By {news.author}</span>
                                <span>•</span>
                                <time dateTime={news.publishedAt}>
                                    {new Date(news.publishedAt).toLocaleDateString("bn-BD", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </time>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}
