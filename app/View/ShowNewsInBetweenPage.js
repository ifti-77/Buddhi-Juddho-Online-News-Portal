import Image from "next/image";
import Link from "next/link";

export default function ShowNewsInBetweenPage({ actualCategory, categoryWiseNews }) {
  return (
    <div className="bg-[#f8f7f4] min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Category Header */}
        <div className="border-b-4 border-black mb-8 pb-4">
          <h2 className="text-4xl font-bold uppercase tracking-wide">
            {actualCategory}
          </h2>
          <p className="text-sm text-gray-600 mt-2 uppercase tracking-widest">
            সর্বমোট {categoryWiseNews.length} টি সংবাদ
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {categoryWiseNews.map((news) => (
            <article key={news._id} className="bg-white border-2 border-gray-300 overflow-hidden hover:shadow-xl transition-shadow">
              {news.thumbnailPath && (
                <div className="relative w-full h-64 border-b-2 border-gray-300">
                  <Image 
                    src={news.thumbnailPath} 
                    alt={news.title} 
                    fill 
                    className="object-cover" 
                    priority 
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 leading-tight hover:underline">
                  <Link href={`/home/${encodeURIComponent(actualCategory)}/${encodeURIComponent(news._id)}`}>
                    {news.title}
                  </Link>
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {news.content.length > 200 ? news.content.substring(0, 200) + "..." : news.content}
                </p>
                <Link 
                  href={`/home/${encodeURIComponent(actualCategory)}/${encodeURIComponent(news._id)}`}
                  className="text-sm font-bold uppercase tracking-wide border-b-2 border-black hover:text-gray-600 inline-block"
                >
                  সম্পূর্ণ পড়ুন →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
