import dynamic from "next/dynamic";

const Globe = dynamic(
  () => import("../components/Globe.tsx"),
  { ssr: false }
);

export default function Home() {
  return (<>
    <Globe />
  </>);
}