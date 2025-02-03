//店舗詳細画面
'use client';

import { usePathname } from 'next/navigation';
import { useRestaurantContext } from '@/app/context/RestaurantContext';
import { useEffect, useState } from 'react';
import shopType from '../shopTypes';

const RestaurantDetailPage = () => {
  const pathname = usePathname();
  const { restaurants } = useRestaurantContext();
  const [restaurant, setRestaurant] = useState<shopType | null>(null);

  useEffect(() => {
    const id = pathname?.split('/').pop();
    if (id && restaurants.length > 0) {
      const selectedRestaurant = restaurants.find((shop) => shop.id === id);
      if (selectedRestaurant) {
        setRestaurant(selectedRestaurant);
      }
    }
  }, [pathname, restaurants]);

  if (!restaurant) {
    return <p>レストラン情報が見つかりません。</p>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-3xl max-w-lg mx-auto my-6 border border-sub2">
  <img
    src={restaurant.photo.pc.l}
    alt={restaurant.name}
    width={300}
    className="w-full h-64 object-cover rounded-t-3xl mb-4"
  />

  <h1 className="text-2xl font-bold text-sub0-600 mb-3">{restaurant.name}</h1>

  <div className="text-sm text-gray-600 mb-3">
    <span className="material-icons mr-2 text-pink-500">住所</span>
    <p className="text-gray-700">{restaurant.address}</p>
  </div>

  <div className="text-sm text-gray-600 mb-3">
    <span className="material-icons mr-2 text-pink-500">アクセス</span>
    <p>{restaurant.access}</p>
  </div>

  <div className="text-sm text-gray-600 mb-3">
    <span className="material-icons mr-2 text-pink-500">カテゴリ</span>
    <p>{restaurant.genre.name}</p>
  </div>

  <div className="text-sm text-gray-600 mb-6">
    <span className="material-icons mr-2 text-pink-500">営業日</span>
    <p>{restaurant.open}</p>
  </div>
</div>

  );
};

export default RestaurantDetailPage;
