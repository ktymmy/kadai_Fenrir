'use client';
import { createContext, useContext, useState, ReactNode,useEffect } from 'react';
import responseRestaurant from '../result/shopTypes'

type RestaurantContextType = {
    restaurants: responseRestaurant[];
    setRestaurants: (restaurants: responseRestaurant[]) => void;
};

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
    const [restaurants, setRestaurants] = useState<responseRestaurant[]>([]);
    
    useEffect(() => {
        if (restaurants.length === 0) {
            console.log('データ無し');
        } else {
            console.log('レストラン一覧:', restaurants);
        }
    }, [restaurants])


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