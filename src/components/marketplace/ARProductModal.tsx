import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Product } from '../../types';
import { X, RotateCw, ZoomIn, ZoomOut, Camera, Sparkles, Layers, Box } from 'lucide-react';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export const ARProductModal: React.FC<Props> = ({ product, onClose }) => {
  if (!product) return null;

  const containerRef = useRef<HTMLDivElement>(null);
  const [materialStyle, setMaterialStyle] = useState<'brass' | 'iron' | 'terracotta' | 'silk'>('brass');
  const [isARView, setIsARView] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isARView ? 0x111827 : 0x07131d);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf59e0b, 2.5);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    rimLight.position.set(-5, -2, -5);
    scene.add(rimLight);

    // Dynamic 3D model geometry generation based on product type:
    const objectGroup = new THREE.Group();

    // Material definitions
    const materials = {
      brass: new THREE.MeshStandardMaterial({
        color: 0xd4af37, // Dokra Bell Metal Gold/Brass
        metalness: 0.85,
        roughness: 0.35
      }),
      iron: new THREE.MeshStandardMaterial({
        color: 0x27272a, // Loha Shilp Charcoal Black Iron
        metalness: 0.9,
        roughness: 0.6
      }),
      terracotta: new THREE.MeshStandardMaterial({
        color: 0xc2593f, // Kumharpara Warm Terracotta
        metalness: 0.05,
        roughness: 0.85
      }),
      silk: new THREE.MeshStandardMaterial({
        color: 0xfde047, // Kosa Golden Silk Sheen
        metalness: 0.2,
        roughness: 0.4
      })
    };

    const currentMat = materials[materialStyle];

    if (product.model3dType === 'dokra_deer' || !product.model3dType) {
      // Procedural stylized Dokra Dancing Deer
      // Body
      const bodyGeo = new THREE.CylinderGeometry(0.35, 0.45, 1.4, 16);
      const body = new THREE.Mesh(bodyGeo, currentMat);
      body.rotation.z = Math.PI / 2;
      objectGroup.add(body);

      // Neck & Head
      const neckGeo = new THREE.CylinderGeometry(0.18, 0.24, 0.9, 12);
      const neck = new THREE.Mesh(neckGeo, currentMat);
      neck.position.set(0.65, 0.6, 0);
      neck.rotation.z = -Math.PI / 6;
      objectGroup.add(neck);

      const headGeo = new THREE.ConeGeometry(0.25, 0.6, 12);
      const head = new THREE.Mesh(headGeo, currentMat);
      head.position.set(1.0, 1.0, 0);
      head.rotation.z = -Math.PI / 2;
      objectGroup.add(head);

      // Antlers
      const antlerGeo = new THREE.TorusGeometry(0.35, 0.04, 8, 16, Math.PI);
      const antler1 = new THREE.Mesh(antlerGeo, currentMat);
      antler1.position.set(0.9, 1.3, 0.2);
      antler1.rotation.y = Math.PI / 4;
      objectGroup.add(antler1);

      const antler2 = new THREE.Mesh(antlerGeo, currentMat);
      antler2.position.set(0.9, 1.3, -0.2);
      antler2.rotation.y = -Math.PI / 4;
      objectGroup.add(antler2);

      // 4 Slender Legs
      const legPositions = [
        [-0.5, -0.7, 0.3],
        [-0.5, -0.7, -0.3],
        [0.5, -0.7, 0.3],
        [0.5, -0.7, -0.3]
      ];
      legPositions.forEach(p => {
        const legGeo = new THREE.CylinderGeometry(0.06, 0.04, 1.2, 8);
        const leg = new THREE.Mesh(legGeo, currentMat);
        leg.position.set(p[0], p[1], p[2]);
        objectGroup.add(leg);
      });
    } else {
      // Sacred Bell / Vase / Terracotta Form
      const baseGeo = new THREE.CylinderGeometry(0.6, 0.8, 1.6, 24);
      const base = new THREE.Mesh(baseGeo, currentMat);
      objectGroup.add(base);

      const topGeo = new THREE.SphereGeometry(0.5, 24, 16);
      const top = new THREE.Mesh(topGeo, currentMat);
      top.position.y = 1.0;
      objectGroup.add(top);
    }

    // Pedestal
    const pedestalGeo = new THREE.CylinderGeometry(1.4, 1.6, 0.15, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.8 });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.35;
    objectGroup.add(pedestal);

    scene.add(objectGroup);

    // Mouse rotation
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevX;
        const deltaY = e.clientY - prevY;
        objectGroup.rotation.y += deltaX * 0.01;
        objectGroup.rotation.x += deltaY * 0.01;
        prevX = e.clientX;
        prevY = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animate
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        objectGroup.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
    };
  }, [product, materialStyle, isARView]);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200'>
      <div className='relative w-full max-w-3xl rounded-3xl glass-panel-warm border border-[#E5A93C]/40 bg-[#07131D]/98 text-white shadow-2xl overflow-hidden flex flex-col md:flex-row'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-[#E5A93C] text-white hover:text-[#07131D] transition-colors border border-white/20'
        >
          <X className='w-4 h-4' />
        </button>

        {/* 3D Canvas Area (Left) */}
        <div className='relative w-full md:w-3/5 h-80 md:h-[460px] bg-gradient-to-b from-[#0B1E2E] to-[#07131D]'>
          <div ref={containerRef} className='w-full h-full cursor-grab active:cursor-grabbing' />

          {/* AR Simulated Tag */}
          <div className='absolute top-4 left-4 z-20 flex items-center gap-2'>
            <span className='px-3 py-1 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#F3BA54] font-mono text-[10px] uppercase font-bold flex items-center gap-1.5'>
              <Sparkles className='w-3 h-3' />
              <span>{isARView ? 'Simulated AR Camera View' : 'Interactive 3D WebAR Model'}</span>
            </span>
          </div>

          {/* AR Mode Toggle */}
          <div className='absolute bottom-4 left-4 z-20 flex items-center gap-2'>
            <button
              onClick={() => setIsARView(!isARView)}
              className='px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/90 text-xs font-mono text-gray-300 border border-white/15 flex items-center gap-1.5'
            >
              <Camera className='w-3.5 h-3.5 text-[#E5A93C]' />
              <span>{isARView ? 'Studio View' : 'Simulate in Room'}</span>
            </button>
          </div>
        </div>

        {/* Product Details & Controls (Right) */}
        <div className='w-full md:w-2/5 p-6 flex flex-col justify-between space-y-4 border-t md:border-t-0 md:border-l border-white/10'>
          <div>
            <span className='text-[10px] font-mono uppercase text-[#E5A93C] font-bold block'>
              {product.craftCategory}
            </span>
            <h3 className='font-serif text-2xl font-bold text-white mt-1 leading-tight'>
              {product.name}
            </h3>
            <p className='text-xs text-gray-300 font-light mt-2 line-clamp-3 leading-relaxed'>
              {product.originStory}
            </p>

            <div className='mt-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-400 space-y-1'>
              <div>Artisan: <strong className='text-white'>{product.artisanName}</strong></div>
              <div>Village: <span className='text-white'>{product.artisanVillage}</span></div>
              <div className='text-emerald-400 font-bold'>
                {product.impactContribution}% Direct Artisan Fair-Trade Value
              </div>
            </div>
          </div>

          {/* Material Shader Toggle */}
          <div className='space-y-2'>
            <label className='block text-[10px] font-mono uppercase text-gray-400'>
              Inspect Material Shaders:
            </label>
            <div className='grid grid-cols-2 gap-2 text-xs font-mono'>
              <button
                onClick={() => setMaterialStyle('brass')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  materialStyle === 'brass'
                    ? 'bg-[#E5A93C] text-[#07131D] font-bold border-[#E5A93C]'
                    : 'bg-white/5 border-white/10 text-gray-300'
                }`}
              >
                Dokra Brass
              </button>
              <button
                onClick={() => setMaterialStyle('iron')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  materialStyle === 'iron'
                    ? 'bg-zinc-700 text-white font-bold border-zinc-500'
                    : 'bg-white/5 border-white/10 text-gray-300'
                }`}
              >
                Forged Iron
              </button>
              <button
                onClick={() => setMaterialStyle('terracotta')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  materialStyle === 'terracotta'
                    ? 'bg-[#C2593F] text-white font-bold border-[#C2593F]'
                    : 'bg-white/5 border-white/10 text-gray-300'
                }`}
              >
                Terracotta
              </button>
              <button
                onClick={() => setMaterialStyle('silk')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  materialStyle === 'silk'
                    ? 'bg-amber-300 text-[#07131D] font-bold border-amber-300'
                    : 'bg-white/5 border-white/10 text-gray-300'
                }`}
              >
                Kosa Silk
              </button>
            </div>
          </div>

          <div className='pt-2'>
            <div className='text-xs text-gray-400 font-mono mb-2 flex justify-between'>
              <span>Artisan Price:</span>
              <span className='font-bold text-lg text-white'>₹{product.priceINR.toLocaleString()}</span>
            </div>
            <button
              onClick={() => {
                alert(`[DEMO CHECKOUT] Product "${product.name}" added to order!`);
                onClose();
              }}
              className='w-full py-3 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C2593F] text-[#07131D] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer'
            >
              Order Handcrafted Piece
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
