import Image from "next/image";
import Link from "next/link";

export default function ShowNewsInBetweenPage({ actualCategory, categoryWiseNews }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        News in "{actualCategory}" Category
      </h2>

      {categoryWiseNews.map((news) => (
        <article key={news._id} className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
          {news.thumbnailPath && (
            <div className="relative w-full h-64">
              <Image src={news.thumbnailPath} alt={news.title} fill className="object-cover" priority />
            </div>
          )}
          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">{news.title}</h3>
          </div>
          <div className="p-6 md:p-8">
            <p className="text-gray-700">{news.content.length > 200 ? news.content.substring(0, 200) + "..." : news.content}
                <Link href={`/home/${encodeURIComponent(actualCategory)}/${encodeURIComponent(news._id)}`}> Read more</Link></p>
          </div>
        </article>
      ))}
    </div>
  );
}
