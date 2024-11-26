// import "./App.css";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("../app/components/ThreeScene"), {
  ssr: false, // Tắt SSR để Three.js chỉ chạy trên client
});

function App() {
  return (
    <>
      <ThreeScene />
    </>
  );
}

export default App;
