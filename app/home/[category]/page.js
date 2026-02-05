import { fetchNewsByCategoryFromDB, fetchOnlyLatestNewsFromDB } from "@/lib/newsInteractions";
import ShowNewsInBetweenPage from "@/app/View/ShowNewsInBetweenPage";
import Pagination from "@/app/View/Pagination";

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const actualCategory = decodeURIComponent(category);
  let data = [];

  if (actualCategory === "সর্বশেষ") {
    data = await fetchOnlyLatestNewsFromDB();
  } else {
    data = await fetchNewsByCategoryFromDB(actualCategory);
  }

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
