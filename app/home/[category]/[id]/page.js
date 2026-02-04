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
    <div className="bg-[#f8f7f4] min-h-screen py-8">
      <article className="container mx-auto px-4 max-w-4xl bg-white border-2 border-gray-300">
        {/* Article Header */}
        <div className="border-b-2 border-black p-6">
          <div className="mb-3">
            <span className="text-xs font-bold uppercase tracking-widest border-b-2 border-gray-400 inline-block pb-1">
              {userDesiredNews.category ?? decodeURIComponent(category)}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            {userDesiredNews.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-300 pt-3">
            <span className="font-semibold">লেখক: {userDesiredNews.author}</span>
            <span>|</span>
            <time dateTime={userDesiredNews.publishedAt}>
              {new Date(userDesiredNews.publishedAt).toLocaleDateString("bn-BD", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>

        {/* Featured Image */}
        {userDesiredNews.thumbnailPath && (
          <div className="relative w-full h-96 border-b border-gray-300">
            <Image
              src={userDesiredNews.thumbnailPath}
              alt={userDesiredNews.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="p-8">
          <div className="text-lg leading-relaxed md:columns-2 md:gap-8">
            <p className="text-gray-800 whitespace-pre-wrap first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-none">
              {userDesiredNews.content}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
