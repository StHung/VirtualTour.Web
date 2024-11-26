// import "./App.css";
import dynamic from "next/dynamic";

const VirtualTour = dynamic(() => import("./components/VirtualTour"), {
  ssr: false, // Tắt SSR để Three.js chỉ chạy trên client
});

function App() {
  return (
    <>
      <VirtualTour />
    </>
  );
}

export default App;
