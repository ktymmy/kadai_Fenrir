'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRestaurantContext } from '../context/RestaurantContext';

const INITIAL_LATITUDE = 0;  
const INITIAL_LONGITUDE = 0;  
const INITIAL_RADIUS = 1;  
const COUNT = 100;

const SearchComponent = () => {
    const router = useRouter();
    const { setRestaurants } = useRestaurantContext();
    const searchParams = useSearchParams();
    
    const keyword = searchParams?.get('keyword') || '';
    const name_any = searchParams?.get('name_any') || '';

    const [location, setLocation] = useState({ latitude: INITIAL_LATITUDE, longitude: INITIAL_LONGITUDE });
    const [radius, setRadius] = useState(INITIAL_RADIUS);
    const [keywordText, setKeywordText] = useState<string>(keyword);
    const [nameAnyText, setNameAnyText] = useState<string>(name_any);
    const [loading, setLoading] = useState(false);
    const [, setError] = useState<string | null>(null);

    const handleKeywordInput = (e: React.ChangeEvent<HTMLInputElement>) => setKeywordText(e.target.value);
    const handleNameAnyInput = (e: React.ChangeEvent<HTMLInputElement>) => setNameAnyText(e.target.value);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('位置情報の取得失敗: ' + error.message);
                }
            );
        }
    }, []);

    const fetchRestaurants = async () => {
        setLoading(true);
        setError(null);

        try {
            const queryParams = new URLSearchParams({
                lat: location.latitude.toString(),
                lng: location.longitude.toString(),
                range: radius.toString(),
                keyword: encodeURIComponent(keywordText.trim()),
                name_any: encodeURIComponent(nameAnyText.trim()),
                count: COUNT.toString(),
            });

            const response = await fetch(`/api/hotpepper/?${queryParams.toString()}`);
            if (!response.ok) throw new Error('データ取得に失敗');

            const data = await response.json();
            const res = data.results;

            if (res?.shop?.length) {
                setRestaurants(res.shop);
                router.push('/result');
            } else {
                setError('レストランが見つかりませんでした。');
            }
        } catch (e) {
            setError('検索に失敗しました。');
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-xl font-bold mb-4">レストラン検索</h1>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">検索半径 (メートル)</label>
                <select
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="border rounded-md w-full p-2"
                >
                    <option value="">選択してください</option>
                    <option value="1">300</option>
                    <option value="2">500</option>
                    <option value="3">1000</option>
                    <option value="4">2000</option>
                    <option value="5">3000</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">キーワード検索</label>
                <input
                    type="text"
                    value={keywordText}
                    onChange={handleKeywordInput}
                    placeholder="例: ラーメン"
                    className="border w-full p-2 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">店舗名検索</label>
                <input
                    type="text"
                    value={nameAnyText}
                    onChange={handleNameAnyInput}
                    placeholder="店舗名を入力"
                    className="border w-full p-2 rounded-md"
                />
            </div>

            <div className="mb-4">
                <h2 className="text-sm font-medium">現在地情報</h2>
                <p>緯度: {location.latitude}</p>
                <p>経度: {location.longitude}</p>
            </div>

            <button
                onClick={fetchRestaurants}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
                検索
            </button>

            {loading && <p className="mt-4 text-blue-500">ロード中</p>}
        </div>
    );
};

const RestaurantSearch = () => (
    <Suspense fallback={<p>ロード中</p>}>
        <SearchComponent />
    </Suspense>
);

export default RestaurantSearch;
