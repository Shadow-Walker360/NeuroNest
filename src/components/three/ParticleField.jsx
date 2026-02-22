import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleField({ style = {} }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Scene setup ──
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    camera.position.z = 6;

    // ── Particles ──
    const count = 2000;
    const geo   = new THREE.BufferGeometry();
    const pos   = new Float32Array(count * 3);
    const col   = new Float32Array(count * 3);
    const amberR = 0.96, amberG = 0.62, amberB = 0.04;
    const skyR   = 0.22, skyG   = 0.74, skyB   = 0.98;

    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 20;
      pos[i*3+1] = (Math.random() - 0.5) * 20;
      pos[i*3+2] = (Math.random() - 0.5) * 20;
      const t = Math.random();
      col[i*3]   = amberR * t + skyR * (1-t);
      col[i*3+1] = amberG * t + skyG * (1-t);
      col[i*3+2] = amberB * t + skyB * (1-t);
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // ── Central glowing sphere ──
    const sphereGeo = new THREE.SphereGeometry(0.6, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      emissive: 0xF59E0B,
      emissiveIntensity: 0.25,
      roughness: 0.2,
      metalness: 0.9,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    const wireMat = new THREE.MeshBasicMaterial({ color: 0xF59E0B, wireframe: true, transparent: true, opacity: 0.06 });
    const wireframe = new THREE.Mesh(new THREE.SphereGeometry(0.62, 12, 12), wireMat);
    scene.add(wireframe);

    // ── Lights ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xF59E0B, 2, 20);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);
    const blueLight = new THREE.PointLight(0x38BDF8, 1.5, 15);
    blueLight.position.set(-3, -2, 2);
    scene.add(blueLight);

    // ── Orbiting nodes ──
    const nodeColors = [0xF59E0B,0x38BDF8,0xA78BFA,0x10B981,0xF43F5E,0xF97316];
    const nodes = [];
    for (let i = 0; i < 6; i++) {
      const nGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const nMat = new THREE.MeshStandardMaterial({
        color: nodeColors[i],
        emissive: nodeColors[i],
        emissiveIntensity: 0.6,
        roughness: 0.1,
        metalness: 0.5,
      });
      const node = new THREE.Mesh(nGeo, nMat);
      nodes.push({
        mesh: node,
        radius: 1.6 + (i % 3) * 0.35,
        speed: 0.003 + i * 0.0008,
        offset: (i / 6) * Math.PI * 2,
        tilt: (i / 6) * Math.PI,
      });
      scene.add(node);
    }

    // ── Connection lines ──
    const lineMat = new THREE.LineBasicMaterial({ color: 0xF59E0B, transparent: true, opacity: 0.08 });
    nodes.forEach((n) => {
      const lGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), n.mesh.position]);
      scene.add(new THREE.Line(lGeo, lineMat));
    });

    // ── Mouse parallax ──
    let mouseX = 0, mouseY = 0;
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    // ── Resize ──
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animation loop ──
    let frame;
    let t = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 0.008;

      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;
      sphere.rotation.y    += 0.004;
      wireframe.rotation.y -= 0.003;

      // Orbit nodes
      nodes.forEach((n) => {
        const angle = t * n.speed * 60 + n.offset;
        n.mesh.position.x = n.radius * Math.cos(angle);
        n.mesh.position.y = n.radius * Math.sin(angle) * Math.sin(n.tilt);
        n.mesh.position.z = n.radius * Math.sin(angle) * Math.cos(n.tilt) * 0.5;
      });

      // Mouse parallax
      scene.rotation.x += (mouseY * 0.3 - scene.rotation.x) * 0.04;
      scene.rotation.y += (mouseX * 0.3 - scene.rotation.y) * 0.04;

      // Pulsing lights
      pointLight.position.x = Math.sin(t * 0.5) * 4;
      pointLight.position.z = Math.cos(t * 0.5) * 4;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}