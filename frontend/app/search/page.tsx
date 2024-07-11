import { Metadata } from 'next';
import FilterSection from '../ui/search/FilterSection';
import { fetchSearch } from '../lib/fetchProduct';
import { SeaechQuery, SearchApiResponse } from '../lib/definitions';
import ProductListSection from '../ui/search/ProductListSection';

export const metadata: Metadata = {
  title: 'Search page',
  description: 'Search page description',
};

export default async function Page() {
  const query: SeaechQuery = {
    category: 'Kurtas'
  }
  const searchData: SearchApiResponse = await fetchSearch(query, 1, 10);
  return (
    <main className="container mx-auto mt-20 px-6 py-6">
      <div className="flex space-x-6">
        <FilterSection filters={searchData.filters} />
        <ProductListSection products={searchData.items} total={searchData.total} />
      </div>
    </main>
  );
}
