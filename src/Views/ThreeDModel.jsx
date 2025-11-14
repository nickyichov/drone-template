import {useState, useRef, useEffect} from "react";
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

export default function ThreeDModel({ roll, pitch, yaw }) {
    const containerRef = useRef(null);
    const cubeRef = useRef(null);
    const rendererRef = useRef(null);
    const frameRef = useRef(null);

    // create scene + renderer once
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const width = container.clientWidth || 300;
        const height = container.clientHeight || 200;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshNormalMaterial();
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        cubeRef.current = cube;

        camera.position.z = 5;

        function animate() {
            // rotation is updated from props via effect; this loop renders current state
            renderer.render(scene, camera);
            frameRef.current = requestAnimationFrame(animate);
        }
        animate();

        const handleResize = () => {
            const w = container.clientWidth || window.innerWidth;
            const h = container.clientHeight || window.innerHeight;
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

    // update cube rotation whenever props change
    useEffect(() => {
        const c = cubeRef.current;
        if (!c) return;
        c.rotation.x = pitch || 0;
        c.rotation.y = yaw || 0;
        c.rotation.z = roll || 0;
    }, [roll, pitch, yaw]);

    return <div ref={containerRef} className="w-96 h-64 m-2" />;
}