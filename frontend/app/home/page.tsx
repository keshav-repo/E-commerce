import { Metadata } from 'next';
import CookirManager from '../ui/login/CookieManager';
import ProductCategories from '../ui/home/ProductCategories';
import { fetchCategoryInfo } from '../lib/fetchProduct';
import { CategoryItem, ProductCategoriesProps } from '../lib/definitions';

export const metadata: Metadata = {
  title: 'Home page',
  description: 'Home page description',
};

export default async function Page() {
  const categoryBriefData: CategoryItem[] = await fetchCategoryInfo();

  return (
    <main className="pt-16">
      <ProductCategories categories={categoryBriefData} />
    </main>
  );
}
