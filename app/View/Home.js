"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Placeholder images – swap these with your own
import heroImg from '@/public/vercel.svg';
import thumb1 from '@/public/window.svg';
import thumb2 from '@/public/next.svg';
import thumb3 from '@/public/vercel.svg';
import thumb4 from '@/public/window.svg';
import { fetchNewsFromDB } from '@/lib/fetchNewsFromDB';

const Home = () => {

  const [news, SetNews] = useState([]);

  useEffect(() => {

    handleFetchNews();
  }, [])

  async function handleFetchNews() {
    const newsFromDb = await fetchNewsFromDB();
    SetNews(newsFromDb);
  }




  // Top navigation categories (Bangla).
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

  // Headlines for the scrolling ticker.
  const tickerItems = news.filter(item => item.category === "সর্বশেষ").map(item => item.title);

  // Four smaller stories displayed beside the hero article.
  const sideStories = [
    {
      id: 1,
      title: 'তারেক রহমানের সমাবেশে দলীয় কর্মীদের উপস্থিতি',
      image: thumb1,
    },
    {
      id: 2,
      title: 'ডাকসু নেতা কানে ধরে উঠবস করালেন, সামাজিক মাধ্যমে ক্ষোভ',
      image: thumb2,
    },
    {
      id: 3,
      title: 'বিশ্ববাজারে সোনার দাম ৫ হাজার ডলার ছাড়িয়েছে',
      image: thumb3,
    },
    {
      id: 4,
      title: 'বছরে ৫–৬ হাজার কোটি টাকা বাড়তি নিচ্ছে আদানি',
      image: thumb4,
    },
  ];


  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Navigation bar */}
      

      {/* Scrolling ticker */}
      <div className="bg-red-50 border-y border-red-200 py-2 overflow-hidden">
        <div className="container mx-auto px-4 flex gap-3 items-center animate-marquee whitespace-nowrap">
          <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
            সর্বশেষ
          </span>
          {tickerItems.map((item, index) => (
            <span key={index} className="text-gray-700 text-sm mx-4">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Hero and side stories */}
      <section className="container mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">
        {/* Hero article */}
        <article className="relative md:col-span-2 h-64 md:h-96 overflow-hidden rounded shadow">
          <Image src={heroImg} alt="বড় খবর" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-4">
            <h2 className="text-white text-xl md:text-3xl font-bold leading-snug">
              গুরুত্বপূর্ণ সংবাদঃ নতুন প্রযুক্তি যা আপনার জীবনযাত্রা পরিবর্তন করবে
            </h2>
            <p className="text-gray-200 text-xs mt-2">প্রকাশিত: ২৫ জানুয়ারি ২০২৬</p>
          </div>
        </article>

        {/* Smaller stories list */}
        <div className="grid grid-rows-4 gap-3">
          {sideStories.map((story) => (
            <article key={story.id} className="relative h-36 overflow-hidden rounded shadow">
              <Image src={story.image} alt={story.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50 flex items-end p-2">
                <h3 className="text-white text-sm font-semibold leading-tight truncate">
                  {story.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Category cards section */}
      <section className="container mx-auto px-4 pb-8 grid md:grid-cols-3 gap-6">
        {Array.isArray(news) && news.length > 0 && news.map((newItem) => (
          <article
            key={newItem._id} // better than index
            className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div className="relative h-40">
              <Image
                src={newItem.thumbnailPath } // choose one
                alt={newItem.category || "news"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <span className="text-red-600 text-xs font-bold uppercase tracking-wide">
                {newItem.category}
              </span>
              <h4 className="text-lg font-semibold mt-1 text-gray-800 leading-snug">
                {newItem.title}
              </h4>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {newItem.content}
              </p>
            </div>
          </article>
        ))}
      </section>

    </main>
  );
};

// function getimagePath(imageName) {
//   return require(`@/public${imageName}`);
// }

export default Home;
