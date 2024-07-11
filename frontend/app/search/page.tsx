import { Metadata } from 'next';
import FilterSection from '../ui/search/FilterSection';
import { fetchSearch } from '../lib/fetchProduct';
import { SeaechQuery, SearchApiResponse } from '../lib/definitions';
import ProductListSection from '../ui/search/ProductListSection';
import TryAgain from '../ui/search/TryAgain';

export const metadata: Metadata = {
  title: 'Search page',
  description: 'Search page description',
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const pageNo: string = searchParams["page"] ?? "1";
  const pageSize: string = searchParams["size"] ?? "10";
  const category: string = searchParams["category"] ?? "";
  const q: string = searchParams["q"] ?? "";

  var query: SeaechQuery = {
    category: category,
    name: q
  }
  var queryString: string = await encodeURIComponent(JSON.stringify(query));

  const searchData: SearchApiResponse = await fetchSearch(queryString, parseInt(pageNo), parseInt(pageSize));

  console.log('search data is');
  console.log(searchData);

  return (
    <main className="container mx-auto mt-20 px-6 py-6">
      <div className="flex space-x-6">
        {!searchData || searchData.items.length === 0 ? (
          <TryAgain />
        ) : (
          <>
            <FilterSection filters={searchData.filters} />
            <ProductListSection
              products={searchData.items}
              total={searchData.totalItem}
              currentPage={searchData.currentPage}
              pageSize={searchData.pageSize}
              totalPage={searchData.totalPage}
              category={category}
              q={q}
            />
          </>
        )}
      </div>
    </main>
  );
}
