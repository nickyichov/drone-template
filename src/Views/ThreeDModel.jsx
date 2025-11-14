import {useRef, useEffect} from "react";
import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

export default function ThreeDModel({ roll, pitch, yaw }) {
    const containerRef = useRef(null);
    const modelRef = useRef(null);
    const rendererRef = useRef(null);
    const frameRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const width = container.clientWidth || 300;
        const height = container.clientHeight || 200;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Basic lighting for OBJ
        const ambient = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambient);

        const directional = new THREE.DirectionalLight(0xffffff, 1);
        directional.position.set(1, 1, 1);
        scene.add(directional);

        const loader = new OBJLoader();
        loader.load("../src/3dModels/drone_costum.obj", (object) => {
            // Create a pivot to rotate
            // Inside OBJ loader callback
            const orientationPivot = new THREE.Object3D();
            const rotationPivot = new THREE.Object3D();
            orientationPivot.add(rotationPivot);
            scene.add(orientationPivot);

            // Adjust model axes
            orientationPivot.rotation.y = Math.PI / 2;

            // Add the model
            rotationPivot.add(object);
            modelRef.current = rotationPivot; // update this one with roll/pitch/yaw
        });

        function animate() {
            renderer.render(scene, camera);
            frameRef.current = requestAnimationFrame(animate);
        }
        animate();

        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(frameRef.current);
            window.removeEventListener("resize", handleResize);

            renderer.dispose();
            if (renderer.domElement && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    // Update model rotation when props change
    useEffect(() => {
        const model = modelRef.current;
        if (!model) return;

        model.rotation.x = pitch || 0;
        model.rotation.y = yaw || 0;
        model.rotation.z = roll || 0;

        console.log(model.rotation.z);
    }, [roll, pitch, yaw]);

    return <div ref={containerRef} className="w-96 h-64 m-2" />;
}