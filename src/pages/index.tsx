import dynamic from "next/dynamic";

const Cesium = dynamic(
  () => import("../components/Cesium"),
  { ssr: false }
);

export default function Home() {
  return (<>
    <link rel="stylesheet" href="cesium/Widgets/widgets.css" />
    <Cesium />
  </>);
}