import dynamic from 'next/dynamic'

const GlobeWithNoSSR = dynamic(
  () => import('./globe'),
  { ssr: false }
)

export default function App() {
  return <GlobeWithNoSSR />;
}

