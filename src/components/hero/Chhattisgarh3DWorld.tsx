import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { DESTINATIONS } from '../../data/destinations';
import { Destination, TourismLoadLevel } from '../../types';
import { Compass, RotateCw, ZoomIn, ZoomOut, Sun, Moon, Info, Eye, Sparkles } from 'lucide-react';

interface Props {
  onSelectDestination: (dest: Destination) => void;
  selectedDestinationId?: string | null;
}

export const Chhattisgarh3DWorld: React.FC<Props> = ({
  onSelectDestination,
  selectedDestinationId
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredDest, setHoveredDest] = useState<Destination | null>(null);
  const [is2DFallback, setIs2DFallback] = useState(false);
  const [lightingMode, setLightingMode] = useState<'sunrise' | 'sunset' | 'night'>('sunset');
  const [webglSupported, setWebglSupported] = useState(true);

  // Three.js instances ref
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    markers: { mesh: THREE.Group; dest: Destination }[];
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    ambientLight: THREE.AmbientLight;
    dirLight: THREE.DirectionalLight;
    fireflies: THREE.Points;
    routeLines: THREE.Line[];
    isDragging: boolean;
    prevMouseX: number;
    prevMouseY: number;
    targetRotationY: number;
    targetRotationX: number;
    currentRotationY: number;
    currentRotationX: number;
    targetZoom: number;
    currentZoom: number;
    animFrameId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current || is2DFallback) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        setIs2DFallback(true);
        return;
      }
    } catch {
      setWebglSupported(false);
      setIs2DFallback(true);
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07131d, 0.025);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 16, 26);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff1dc, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xf59e0b, 1.8);
    dirLight.position.set(12, 20, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x10b981, 1.5, 40);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    // 1. Procedural 3D Chhattisgarh Relief Terrain
    // Chhattisgarh outline: Narrow North (Surguja hills), wide Central plain (Mahanadi basin), tapering Southern plateau (Bastar)
    const terrainGeo = new THREE.PlaneGeometry(24, 32, 64, 64);
    const pos = terrainGeo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i); // Y maps to North-South (-16 to +16)

      // Elevation profile:
      // High in North (y > 6, Mainpat & Surguja), lower in Central basin (-4 < y < 6, Raipur/Bilaspur), high in South (y < -4, Bastar plateau & Bailadila)
      let elev = 0;
      if (y > 6) {
        // Northern highlands
        elev = Math.sin(x * 0.5) * Math.cos(y * 0.4) * 1.6 + 1.2;
      } else if (y < -3) {
        // Southern Bastar plateau
        elev = Math.cos(x * 0.4) * Math.sin(y * 0.3) * 1.8 + 1.4;
      } else {
        // Central fertile plain
        elev = Math.sin(x * 0.3) * 0.4 + 0.3;
      }

      // Add micro mountain ridges
      elev += Math.sin(x * 1.8 + y * 1.5) * 0.3;

      // Mask outside Chhattisgarh polygon shape
      const widthAtY = y > 6 ? 10 : y < -6 ? 12 : 16;
      if (Math.abs(x) > widthAtY / 2) {
        elev = -0.8;
      }

      pos.setZ(i, Math.max(-0.8, elev));
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x0f3426, // Forest green
      roughness: 0.85,
      metalness: 0.15,
      flatShading: true
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.rotation.x = -Math.PI / 2;
    terrainMesh.position.y = -1;
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);

    // Grid wireframe underlay for futuristic digital twin look
    const gridHelper = new THREE.GridHelper(36, 36, 0x14532d, 0x064e3b);
    gridHelper.position.y = -1.8;
    scene.add(gridHelper);

    // 2. Glowing River Spine (Mahanadi & Indravati Rivers)
    const riverCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4, -0.6, -10),
      new THREE.Vector3(-1, -0.4, -4),
      new THREE.Vector3(2, -0.5, 0),
      new THREE.Vector3(0, -0.6, 6),
      new THREE.Vector3(-2, -0.4, 12)
    ]);
    const riverGeo = new THREE.TubeGeometry(riverCurve, 32, 0.14, 8, false);
    const riverMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 });
    const riverMesh = new THREE.Mesh(riverGeo, riverMat);
    scene.add(riverMesh);

    // 3. Glowing Tourism Corridors (Spline routes)
    const routePoints = [
      new THREE.Vector3(1, 0.4, 0), // Raipur
      new THREE.Vector3(0.5, 0.6, 4), // Kanker
      new THREE.Vector3(-0.2, 0.8, 9), // Jagdalpur / Bastar
      new THREE.Vector3(-2.5, 0.7, 10.5) // Chitrakote
    ];
    const routeCurve = new THREE.CatmullRomCurve3(routePoints);
    const routeGeo = new THREE.BufferGeometry().setFromPoints(routeCurve.getPoints(50));
    const routeMat = new THREE.LineDashedMaterial({
      color: 0xf59e0b,
      dashSize: 0.4,
      gapSize: 0.2,
      linewidth: 2
    });
    const routeLine = new THREE.Line(routeGeo, routeMat);
    routeLine.computeLineDistances();
    scene.add(routeLine);

    // Second corridor: Raipur to Sirpur to Bilaspur to Mainpat
    const northRoutePoints = [
      new THREE.Vector3(1, 0.4, 0), // Raipur
      new THREE.Vector3(3.5, 0.3, -0.5), // Sirpur
      new THREE.Vector3(1.2, 0.5, -4.5), // Bilaspur
      new THREE.Vector3(3.8, 1.6, -11) // Mainpat
    ];
    const northRouteCurve = new THREE.CatmullRomCurve3(northRoutePoints);
    const northRouteGeo = new THREE.BufferGeometry().setFromPoints(northRouteCurve.getPoints(50));
    const northRouteLine = new THREE.Line(northRouteGeo, routeMat);
    northRouteLine.computeLineDistances();
    scene.add(northRouteLine);

    // 4. Interactive Destination Markers
    const markers: { mesh: THREE.Group; dest: Destination }[] = [];

    DESTINATIONS.forEach(dest => {
      // Convert mapX (0-100) and mapY (0-100) into 3D world space coordinates
      // mapX: 0 = west (-8), 100 = east (+8)
      // mapY: 0 = north (-13), 100 = south (+13)
      const posX = ((dest.coordinates.mapX - 50) / 50) * 8.5;
      const posZ = ((dest.coordinates.mapY - 50) / 50) * 12.5;

      const group = new THREE.Group();
      group.position.set(posX, 0.8, posZ);

      // Marker color according to real-time tourism load:
      // LOW = Green (#10b981), MODERATE = Amber (#f59e0b), HIGH = Red (#ef4444)
      let markerColor = 0x10b981;
      if (dest.tourismLoad === 'MODERATE') markerColor = 0xf59e0b;
      if (dest.tourismLoad === 'HIGH') markerColor = 0xef4444;

      // Pin core sphere
      const pinGeo = new THREE.SphereGeometry(0.28, 16, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: markerColor,
        emissive: markerColor,
        emissiveIntensity: 0.6,
        roughness: 0.2
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      group.add(pinMesh);

      // Pin stalk
      const stalkGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
      const stalkMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
      const stalkMesh = new THREE.Mesh(stalkGeo, stalkMat);
      stalkMesh.position.y = -0.4;
      group.add(stalkMesh);

      // Glowing pulsing ring
      const ringGeo = new THREE.RingGeometry(0.35, 0.48, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: markerColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = -0.75;
      group.add(ringMesh);

      group.userData = { destId: dest.id, originalColor: markerColor };
      scene.add(group);
      markers.push({ mesh: group, dest });
    });

    // 5. Fireflies / Particles System
    const firefliesGeo = new THREE.BufferGeometry();
    const fireflyCount = 120;
    const fireflyPositions = new Float32Array(fireflyCount * 3);

    for (let i = 0; i < fireflyCount * 3; i += 3) {
      fireflyPositions[i] = (Math.random() - 0.5) * 22;
      fireflyPositions[i + 1] = Math.random() * 6 + 0.5;
      fireflyPositions[i + 2] = (Math.random() - 0.5) * 28;
    }
    firefliesGeo.setAttribute('position', new THREE.BufferAttribute(fireflyPositions, 3));

    const fireflyMat = new THREE.PointsMaterial({
      color: 0xfde047,
      size: 0.16,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const fireflies = new THREE.Points(firefliesGeo, fireflyMat);
    scene.add(fireflies);

    // Raycaster & Mouse
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const state = {
      renderer,
      scene,
      camera,
      markers,
      raycaster,
      mouse,
      ambientLight,
      dirLight,
      fireflies,
      routeLines: [routeLine, northRouteLine],
      isDragging: false,
      prevMouseX: 0,
      prevMouseY: 0,
      targetRotationY: 0,
      targetRotationX: 0,
      currentRotationY: 0,
      currentRotationX: 0,
      targetZoom: 26,
      currentZoom: 26,
      animFrameId: 0
    };
    sceneRef.current = state;

    // Mouse Interactions (Orbit & Drag)
    const onMouseDown = (e: MouseEvent) => {
      state.isDragging = true;
      state.prevMouseX = e.clientX;
      state.prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      state.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      state.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (state.isDragging) {
        const deltaX = e.clientX - state.prevMouseX;
        const deltaY = e.clientY - state.prevMouseY;
        state.targetRotationY += deltaX * 0.006;
        state.targetRotationX = Math.max(-0.5, Math.min(0.5, state.targetRotationX + deltaY * 0.004));
        state.prevMouseX = e.clientX;
        state.prevMouseY = e.clientY;
      }

      // Check hover on markers
      raycaster.setFromCamera(state.mouse, camera);
      const markerMeshes = markers.map(m => m.mesh.children[0]); // Target pins
      const intersects = raycaster.intersectObjects(markerMeshes);

      if (intersects.length > 0) {
        container.style.cursor = 'pointer';
        const hitGroup = intersects[0].object.parent;
        const matched = markers.find(m => m.mesh === hitGroup);
        if (matched) {
          setHoveredDest(matched.dest);
        }
      } else {
        container.style.cursor = state.isDragging ? 'grabbing' : 'grab';
        setHoveredDest(null);
      }
    };

    const onMouseUp = () => {
      state.isDragging = false;
      container.style.cursor = 'grab';
    };

    const onClick = () => {
      raycaster.setFromCamera(state.mouse, camera);
      const markerMeshes = markers.map(m => m.mesh.children[0]);
      const intersects = raycaster.intersectObjects(markerMeshes);

      if (intersects.length > 0) {
        const hitGroup = intersects[0].object.parent;
        const matched = markers.find(m => m.mesh === hitGroup);
        if (matched) {
          onSelectDestination(matched.dest);
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      state.targetZoom = Math.max(14, Math.min(38, state.targetZoom + e.deltaY * 0.02));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('click', onClick);
    container.addEventListener('wheel', onWheel, { passive: false });

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      state.animFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation
      state.currentRotationY += (state.targetRotationY - state.currentRotationY) * 0.08;
      state.currentRotationX += (state.targetRotationX - state.currentRotationX) * 0.08;
      state.currentZoom += (state.targetZoom - state.currentZoom) * 0.08;

      camera.position.x = Math.sin(state.currentRotationY) * state.currentZoom;
      camera.position.z = Math.cos(state.currentRotationY) * state.currentZoom;
      camera.position.y = 16 + state.currentRotationX * 12;
      camera.lookAt(0, 0, 0);

      // Pulse markers & rings
      markers.forEach(({ mesh }, idx) => {
        const ring = mesh.children[2];
        if (ring) {
          const scale = 1 + Math.sin(elapsed * 3 + idx) * 0.25;
          ring.scale.set(scale, scale, 1);
        }
        // Bobbing pin animation
        mesh.children[0].position.y = Math.sin(elapsed * 2.5 + idx) * 0.08;
      });

      // Flashing fireflies
      const positions = fireflies.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(elapsed + i) * 0.005;
      }
      fireflies.geometry.attributes.position.needsUpdate = true;

      // Animate line dashes
      routeMat.dashOffset = -elapsed * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(state.animFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('click', onClick);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [is2DFallback]);

  // Lighting Mode toggle
  const setLighting = (mode: 'sunrise' | 'sunset' | 'night') => {
    setLightingMode(mode);
    if (!sceneRef.current) return;
    const { ambientLight, dirLight } = sceneRef.current;

    if (mode === 'sunrise') {
      ambientLight.color.setHex(0xffecd2);
      ambientLight.intensity = 0.85;
      dirLight.color.setHex(0xfb923c);
      dirLight.intensity = 1.9;
    } else if (mode === 'sunset') {
      ambientLight.color.setHex(0xffd1b3);
      ambientLight.intensity = 0.75;
      dirLight.color.setHex(0xf59e0b);
      dirLight.intensity = 1.8;
    } else {
      // Night mode
      ambientLight.color.setHex(0x0f2b48);
      ambientLight.intensity = 0.45;
      dirLight.color.setHex(0x38bdf8);
      dirLight.intensity = 0.9;
    }
  };

  const resetView = () => {
    if (!sceneRef.current) return;
    sceneRef.current.targetRotationY = 0;
    sceneRef.current.targetRotationX = 0;
    sceneRef.current.targetZoom = 26;
  };

  const zoomIn = () => {
    if (!sceneRef.current) return;
    sceneRef.current.targetZoom = Math.max(14, sceneRef.current.targetZoom - 4);
  };

  const zoomOut = () => {
    if (!sceneRef.current) return;
    sceneRef.current.targetZoom = Math.min(38, sceneRef.current.targetZoom + 4);
  };

  return (
    <div className='relative w-full h-[620px] lg:h-[720px] rounded-3xl overflow-hidden border border-[#E5A93C]/20 shadow-2xl bg-[#07131D]/90'>
      {/* 3D WebGL Canvas Container */}
      {!is2DFallback ? (
        <div ref={containerRef} className='w-full h-full cursor-grab active:cursor-grabbing' />
      ) : (
        /* 2D Fallback Map */
        <div className='w-full h-full relative p-8 flex flex-col justify-between bg-gradient-to-b from-[#0A231C] to-[#07131D]'>
          <div className='flex items-center justify-between'>
            <div>
              <span className='px-3 py-1 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#F3BA54] font-mono text-xs uppercase tracking-widest'>
                2D Interactive Tourism Map
              </span>
              <h3 className='font-serif text-2xl text-white mt-1'>Chhattisgarh Heritage Map</h3>
            </div>
            <button
              onClick={() => setIs2DFallback(false)}
              className='px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all flex items-center gap-2'
            >
              <Sparkles className='w-4 h-4 text-[#E5A93C]' />
              <span>Switch to 3D View</span>
            </button>
          </div>

          {/* 2D Pin Grid */}
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 my-auto'>
            {DESTINATIONS.map(d => (
              <div
                key={d.id}
                onClick={() => onSelectDestination(d)}
                className='p-4 rounded-2xl glass-panel border border-white/10 hover:border-[#E5A93C]/50 cursor-pointer transition-all hover:scale-105'
              >
                <div className='flex items-center justify-between mb-2'>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      d.tourismLoad === 'LOW'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : d.tourismLoad === 'MODERATE'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {d.tourismLoad} LOAD
                  </span>
                  <span className='text-xs text-[#E5A93C] font-mono'>★ {d.rating}</span>
                </div>
                <h4 className='font-serif text-base text-white font-semibold'>{d.name}</h4>
                <p className='text-xs text-gray-400 mt-1 line-clamp-2'>{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating 3D Controls Overlay */}
      <div className='absolute top-6 left-6 z-20 flex flex-col gap-2'>
        <div className='glass-panel-warm px-4 py-2.5 rounded-2xl backdrop-blur-md flex items-center gap-3 border border-[#E5A93C]/30'>
          <div className='w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping' />
          <div>
            <span className='font-mono text-[10px] uppercase tracking-wider text-[#F3BA54] block leading-none font-bold'>
              Live 3D Digital World
            </span>
            <span className='text-xs text-white/90 font-medium'>Chhattisgarh Tourism Corridor</span>
          </div>
        </div>

        {/* Real-time Heat Legend */}
        <div className='glass-panel px-3 py-2 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-4 text-[11px] font-mono text-gray-300'>
          <div className='flex items-center gap-1.5'>
            <span className='w-2 h-2 rounded-full bg-emerald-400' />
            <span>Low Crowd</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <span className='w-2 h-2 rounded-full bg-amber-400' />
            <span>Moderate</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <span className='w-2 h-2 rounded-full bg-rose-500' />
            <span>High Load</span>
          </div>
        </div>
      </div>

      {/* Top Right Toolbars (Lighting & View Controls) */}
      <div className='absolute top-6 right-6 z-20 flex items-center gap-2'>
        {/* Lighting mode toggles */}
        <div className='glass-panel p-1.5 rounded-2xl backdrop-blur-md border border-white/10 flex items-center gap-1'>
          <button
            onClick={() => setLighting('sunrise')}
            className={`p-2 rounded-xl text-xs transition-colors ${
              lightingMode === 'sunrise' ? 'bg-[#E5A93C] text-[#07131D]' : 'text-gray-400 hover:text-white'
            }`}
            title='Golden Sunrise'
          >
            <Sun className='w-3.5 h-3.5' />
          </button>
          <button
            onClick={() => setLighting('sunset')}
            className={`p-2 rounded-xl text-xs transition-colors ${
              lightingMode === 'sunset' ? 'bg-[#E5A93C] text-[#07131D]' : 'text-gray-400 hover:text-white'
            }`}
            title='Bastar Sunset'
          >
            <Sparkles className='w-3.5 h-3.5' />
          </button>
          <button
            onClick={() => setLighting('night')}
            className={`p-2 rounded-xl text-xs transition-colors ${
              lightingMode === 'night' ? 'bg-[#E5A93C] text-[#07131D]' : 'text-gray-400 hover:text-white'
            }`}
            title='Midnight Campfire'
          >
            <Moon className='w-3.5 h-3.5' />
          </button>
        </div>

        {/* Camera controls */}
        <div className='glass-panel p-1.5 rounded-2xl backdrop-blur-md border border-white/10 flex items-center gap-1'>
          <button
            onClick={zoomIn}
            className='p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors'
            title='Zoom In'
          >
            <ZoomIn className='w-3.5 h-3.5' />
          </button>
          <button
            onClick={zoomOut}
            className='p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors'
            title='Zoom Out'
          >
            <ZoomOut className='w-3.5 h-3.5' />
          </button>
          <button
            onClick={resetView}
            className='p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors'
            title='Reset Perspective'
          >
            <RotateCw className='w-3.5 h-3.5' />
          </button>
        </div>

        {/* 2D / 3D Fallback Switcher */}
        <button
          onClick={() => setIs2DFallback(!is2DFallback)}
          className='px-3 py-2 rounded-2xl glass-panel hover:bg-white/10 border border-white/10 text-xs font-mono text-[#F3BA54] flex items-center gap-1.5 transition-colors'
          title='Toggle 2D / 3D Mode'
        >
          <Compass className='w-3.5 h-3.5' />
          <span>{is2DFallback ? '3D View' : '2D View'}</span>
        </button>
      </div>

      {/* Hovered Destination Interactive Card (Bottom Center) */}
      {hoveredDest && (
        <div className='absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md z-20 animate-in fade-in slide-in-from-bottom-3 duration-200'>
          <div className='glass-panel-warm p-4 rounded-2xl backdrop-blur-xl border border-[#E5A93C]/40 shadow-2xl flex items-center gap-4'>
            <img
              src={hoveredDest.images[0]}
              alt={hoveredDest.name}
              className='w-16 h-16 rounded-xl object-cover border border-[#E5A93C]/30 flex-shrink-0'
            />
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2'>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    hoveredDest.tourismLoad === 'LOW'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : hoveredDest.tourismLoad === 'MODERATE'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-rose-500/20 text-rose-400'
                  }`}
                >
                  {hoveredDest.tourismLoad} LOAD
                </span>
                <span className='text-xs text-gray-400 font-mono'>{hoveredDest.district}</span>
              </div>
              <h4 className='font-serif text-lg text-white font-bold truncate mt-0.5'>{hoveredDest.name}</h4>
              <p className='text-xs text-gray-300 line-clamp-1'>{hoveredDest.whySpecial}</p>
            </div>
            <button
              onClick={() => onSelectDestination(hoveredDest)}
              className='px-3 py-2 rounded-xl bg-[#E5A93C] hover:bg-[#F3BA54] text-[#07131D] text-xs font-bold transition-transform hover:scale-105 flex items-center gap-1'
            >
              <span>Explore</span>
              <Eye className='w-3.5 h-3.5' />
            </button>
          </div>
        </div>
      )}

      {/* Drag & Interaction Helper Hint (Bottom Left) */}
      <div className='absolute bottom-6 left-6 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono text-gray-400 pointer-events-none'>
        <Info className='w-3.5 h-3.5 text-[#E5A93C]' />
        <span>Click & drag to rotate • Scroll to zoom • Click pin to explore</span>
      </div>
    </div>
  );
};
