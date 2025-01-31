// HOME画面
'use client';

import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  const toSearch = () => {
    router.push('/response');
  }

  

  return (
    <div>
      <div>Home</div>
      <hr></hr>
      <button onClick={toSearch}>search</button>
    </div>
    

    
  )
}