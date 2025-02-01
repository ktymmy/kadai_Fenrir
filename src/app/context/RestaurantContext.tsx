'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import responseRestaurant from '../response/shopTypes'

type RestaurantContextType = {
    restaurants: responseRestaurant[];
    setRestaurants: (restaurants: responseRestaurant[]) => void;
};

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
    const [restaurants, setRestaurants] = useState<responseRestaurant[]>([]);
    console.log('レストラン一覧:', restaurants);


    return (
        <RestaurantContext.Provider value={{ restaurants, setRestaurants }}>
            {children}
        </RestaurantContext.Provider>
    );
};

export const useRestaurantContext = () => {
    const context = useContext(RestaurantContext);
    if (!context) throw new Error('エラーです');
    return context;
};