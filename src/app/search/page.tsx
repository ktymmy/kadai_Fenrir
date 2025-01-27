// app/search/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRestaurantContext } from '../context/RestaurantContext';


const INITIAL_LATITUDE = 0;  //緯度
const INITIAL_LONGITUDE = 0; //経度
const INITIAL_RADIUS = 1; //現在地からの半径

const RestaurantSearch = () => {
    const router = useRouter(); 
    const { setRestaurants } = useRestaurantContext(); 
    const [location, setLocation] = useState({ latitude: INITIAL_LATITUDE, longitude: INITIAL_LONGITUDE });
    // const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [radius, setRadius] = useState(INITIAL_RADIUS); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState<string | null>(null);


    /** 現在地を取得
     * useEffectでページを開いた時の位置情報を取ってくる
     * 2回目以降は検索を押すたびに更新される
     */
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setLocation({ latitude: lat, longitude: lng });
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
            const response = await fetch(`/api/hotpepper?lat=${location.latitude}&lng=${location.longitude}&range=${radius}&count=50`);
            if (!response.ok) throw new Error('データ取得に失敗');

            const data = await response.json();
            console.log('取れたデータ一覧'+data)
            console.log('取れたデータの件数'+data.results.results_available)

            if (data.results.shop) {
                setRestaurants(data.results.shop);
                router.push('/result');
            } else {
                setError('レストランが見つかりませんでした。');
            }
        } catch (error) {
            setError('検索に失敗');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            <h1>レストラン検索</h1>
            {/* 検索範囲の入力 
            TODO:検索クエリ引っ張ってくる
            */}
            <label>
                検索半径 (メートル):
                <input
                    type="number"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value,))} // 半径の変更
                    placeholder="検索半径"
                />
            </label>

            {/* 現在地の表示 */}
            <h2>現在地</h2>
            <p>緯度: {location.latitude}</p>
            <p>経度: {location.longitude}</p>

            {/* 検索ボタン */}
            <div><button onClick={fetchRestaurants}>検索</button></div>


            {/* ローディング中の表示 */}
            {loading && <p>ロード中...</p>}

           
        </div>
    );
};

export default RestaurantSearch;