import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const VirtualTour: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/assets/bathroom.jpg");
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const hotspotTexture = textureLoader.load("/assets/hotspot-icon.png");
    const hotspotMaterial = new THREE.SpriteMaterial({ map: hotspotTexture });
    const hotspot = new THREE.Sprite(hotspotMaterial);

    hotspot.position.set(10, 0, 10);
    hotspot.scale.set(10, 10, 1);
    hotspot.name = "hotspot";
    scene.add(hotspot);
    const loadNewScene = (newImagePath: string) => {
      const newTexture = textureLoader.load(newImagePath);
      sphere.material.map = newTexture;
      sphere.material.needsUpdate = true;
    };

    window.addEventListener("click", (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        if (clickedObject.name === "hotspot") {
          loadNewScene("/assets/nashville-closet-suite.jpg");
          console.log("Hotspot clicked!");
        }
      }
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.3;
    controls.maxDistance = 1000;
    controls.minDistance = 0.5;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
};

export default VirtualTour;
