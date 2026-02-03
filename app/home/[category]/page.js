import { fetchNewsByCategoryFromDB } from "@/lib/newsInteractions";
import ShowNewsInBetweenPage from "@/app/View/ShowNewsInBetweenPage";
import Pagination from "@/app/View/Pagination";

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const actualCategory = decodeURIComponent(category);

  const data = await fetchNewsByCategoryFromDB(actualCategory);
  const categoryWiseNews = data?.newsItems || [];
  const totalPages = Math.ceil(data?.count / 12) || 1;

  return (
    <div>
      <ShowNewsInBetweenPage
        actualCategory={actualCategory}
        categoryWiseNews={categoryWiseNews}
      />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
