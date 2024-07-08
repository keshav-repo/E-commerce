import { Metadata } from 'next';
import FilterSection from '../ui/search/FilterSection';
import ProductListSection from '../ui/search/ProductListSection';

export const metadata: Metadata = {
  title: 'Search page',
  description: 'Search page description',
};

const filters = [
  {
    criteria: 'gender',
    values: ['Women', 'Boys', 'Girls'],
  },
  {
    criteria: 'categories',
    values: ['Dresses', 'Ethnic Dresses'],
  },
  {
    criteria: 'brands',
    values: [
      'StyleCast',
      'Trendyol',
      'LULU & SKY',
      'JC Collection',
      'Tokyo Talkies',
    ],
  },
];

const products = [
  {
    id: 1,
    image: 'https://via.placeholder.com/300x400',
    brand: 'StyleCast',
    name: 'Bodycon Maxi Dress',
    price: 1149,
    originalPrice: 3149,
    discount: 2000,
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/300x400',
    brand: 'BAESD',
    name: 'Floral Printed Maxi Dress',
    price: 749,
    originalPrice: 3499,
    discount: 2750,
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/300x400',
    brand: 'KETCH',
    name: 'Floral A-Line Tie-Up Neck Dress',
    price: 399,
    originalPrice: 949,
    discount: 550,
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/300x400',
    brand: 'Azira',
    name: 'Pure Cotton Fit & Flare Dress',
    price: 899,
    originalPrice: 2099,
    discount: 1200,
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/300x400',
    brand: 'GOLDSTROMS',
    name: 'Printed A-Line Ethnic Dress',
    price: 1291,
    originalPrice: 1699,
    discount: 408,
  },
];

export default function Page() {
  return (
    <main className="container mx-auto mt-20 px-6 py-6">
      <div className="flex space-x-6">
        <FilterSection filters={filters} />
        <ProductListSection products={products} />
      </div>
    </main>
  );
}
