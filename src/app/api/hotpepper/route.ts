//  app/api/Hotpepper/route.ts
/**
 * Access-Control-Allow-Methodsの設定
 * 
 */

import { NextResponse } from 'next/server';
import API from '@/api';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const range = searchParams.get('range');
    

    const apiKey = API.HOTPEPPER_API;
    const apiUrl = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&lat=${lat}&lng=${lng}&range=${range}&format=json`;

        try {
        const response = await fetch(apiUrl);
        console.log('fetch完了')

        if (!response.ok) {
            throw new Error(`APIにエラーがでている: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('検索URL',apiUrl)


        return NextResponse.json(data, {
            status: 200,

            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
        
    } catch (error) {
        console.error('API呼び出しエラー:', error);
        return NextResponse.json({ error: 'データの取得失敗', details: error }, { status: 500 });
    }
}