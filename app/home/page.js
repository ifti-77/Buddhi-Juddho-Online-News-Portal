"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Placeholder images – swap these with your own
import heroImg from '@/public/vercel.svg';
import { fetchNewsFromDB } from '@/lib/newsInteractions';

export default function home() {

  const [news, SetNews] = useState([]);

  useEffect(() => {

    handleFetchNews();
  }, [])

  async function handleFetchNews() {
    const newsFromDb = await fetchNewsFromDB();
    SetNews(newsFromDb);
  }

  const navCategories = [
    { label: 'সর্বশেষ', href: '#' },
    { label: 'বাংলাদেশ', href: '#' },
    { label: 'রাজনীতি', href: '#' },
    { label: 'বিশ্ব', href: '#' },
    { label: 'বাণিজ্য', href: '#' },
    { label: 'মতামত', href: '#' },
    { label: 'খেলা', href: '#' },
    { label: 'বিনোদন', href: '#' },
    { label: 'চাকরি', href: '#' },
    { label: 'জীবনযাপন', href: '#' },
  ];


  // Top navigation categories (Bangla).


  // Headlines for the scrolling ticker.
  const tickerItems = news.filter(item => item.category === "সর্বশেষ").map(item => item.title)
  // Four smaller stories displayed beside the hero article.
  const featuredNews = news.filter(item => item.featured === true)
  const sideStories = featuredNews.filter((item, index) => index < 4 && index > 0);

  return (
    <main className="bg-[#f8f7f4] min-h-screen">
      {/* Breaking News Ticker */}
      <div className="bg-black text-white border-y-2 border-black py-2 overflow-hidden">
        <div className="container mx-auto px-4 flex gap-3 items-center">
          <span className="bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide">
            সর্বশেষ
          </span>
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {tickerItems.map((item, index) => (
              <span key={index} className="text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Stories Section */}
      <section className="container mx-auto px-4 py-6 border-b-2 border-gray-300">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Featured Story */}
          <article className="md:col-span-2 bg-white border border-gray-300 overflow-hidden">
            <div className="relative h-64 md:h-96 border-b border-gray-300">
              <Image src={featuredNews[0]?.thumbnailPath || heroImg} alt="বড় খবর" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-2">
                {featuredNews[0]?.title || "বড় খবরের শিরোনাম এখানে থাকবে"}
              </h2>
              <p className="text-xs text-gray-600 uppercase tracking-wide">
                {featuredNews[0]?.publishedAt ? new Date(featuredNews[0].publishedAt).toLocaleDateString('bn-BD') : ''}
              </p>
            </div>
          </article>

          {/* Side Stories */}
          <div className="space-y-4">
            {sideStories.map((story) => (
              <article key={story._id} className="bg-white border border-gray-300 overflow-hidden">
                <div className="relative h-32 border-b border-gray-300">
                  <Image src={story.thumbnailPath} alt={story.title} fill className="object-cover" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold leading-tight">
                    {story.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Category Sections */}
      {navCategories.map(cat => (
        <section key={cat.label} className="container mx-auto px-4 py-6 border-b border-gray-300">
          <h3 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4 uppercase tracking-wide">
            {cat.label}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {Array.isArray(news) && news.length > 0 && news.map((newItem) => (
              cat.label === newItem.category &&
              <article
                key={newItem._id}
                className="bg-white border border-gray-300 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 border-b border-gray-300">
                  <Image
                    src={newItem.thumbnailPath}
                    alt={newItem.category || "news"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-400 inline-block pb-1 mb-2">
                    {newItem.category}
                  </span>
                  <h4 className="text-lg font-bold leading-tight mb-2">
                    {newItem.title}
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-3">
                    {newItem.content}
                  </p>
                  <Link 
                    href={`/home/${encodeURIComponent(newItem.category)}/${encodeURIComponent(newItem._id)}`}
                    className="text-xs font-semibold uppercase tracking-wide hover:underline"
                  >
                    বিস্তারিত পড়ুন →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};


