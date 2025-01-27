'use client'

export default function Error({
    error,  
reset,  
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
return (
    <div>
        <h2>app/error.tsx：{error.message}</h2>
        <button onClick={() => reset()}>再レンダリング</button>
    </div>
    )   
}