import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <h3>ページが見つかりません</h3>
      <Link href="/">Return Home</Link>
    </div>
  )
}