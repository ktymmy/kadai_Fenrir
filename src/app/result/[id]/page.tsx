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
    <div className="p-4">
      <h1 className="text-2xl font-bold">{restaurant.name}</h1>
      <p>住所: {restaurant.address}</p>
      <p>アクセス: {restaurant.access}</p>
      <p>ジャンル: {restaurant.genre.name}</p>
      <img src={restaurant.photo.pc.l} alt={restaurant.name} width={300} />
    </div>
  );
};

export default RestaurantDetailPage;
