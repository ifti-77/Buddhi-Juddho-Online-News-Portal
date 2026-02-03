"use client"
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { fetchOneNewsFromDB } from "@/lib/newsInteractions";
import { useEffect, useState } from "react";




export default function NewsPage() {

  const [userDesiredNews, setUserDesiredNews] = useState(null);
  const param = useParams();
  // const { category, id } = param; 
  const id = decodeURIComponent(param.id);
  const category = decodeURIComponent(param.category);

  useEffect(() => {

    const fetchOneNews = async () => {
      try {
        console.log('Fetching news with ID:', id);
        const news = await fetchOneNewsFromDB(id);
        console.log('Fetched news:', news);

        if (news) {
          setUserDesiredNews(news);
        } else {
          console.error('News not found for ID:', id);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }

    if (id) {
      fetchOneNews();
    }
  }, [id]);


  // if (!userDesiredNews) notFound();

  if (!userDesiredNews) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {userDesiredNews.thumbnailPath && (
          <div className="relative w-full h-96">
            <Image
              src={userDesiredNews.thumbnailPath}
              alt={userDesiredNews.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="mb-4">
            <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
              {userDesiredNews.category ?? decodeURIComponent(category)}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {userDesiredNews.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-600 text-sm mb-6 border-b pb-4">
            <span className="font-medium">By {userDesiredNews.author}</span>
            <span>•</span>
            <time dateTime={userDesiredNews.publishedAt}>
              {new Date(userDesiredNews.publishedAt).toLocaleDateString("bn-BD", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {userDesiredNews.content}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
