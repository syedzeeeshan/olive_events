import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OLIVE_MEDIA } from '../../data/config';
import { Eye, Sparkle, ArrowRight, Compass } from '@phosphor-icons/react';

interface Chapter03Props {
  onSelectProject: (item: (typeof OLIVE_MEDIA.gallery)[0]) => void;
}

export const Chapter03ExperienceGallery: React.FC<Chapter03Props> = ({
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // 7 Curated Iconic Scenographies for Chapter 03 Spatial Journey
  const showcaseItems = useMemo(
    () => [
      {
        ...OLIVE_MEDIA.gallery[0],
        stage: '01 / Spatial Inception',
        curationNote: 'Palace courtyards transformed by thousands of floating brass diyas and cascading floral portals.',
      },
      {
        ...OLIVE_MEDIA.gallery[1],
        stage: '02 / Heritage Grandeur',
        curationNote: 'Royal pavilion banquets harmonizing living bougainvillea with bespoke warm-ivory chandeliers.',
      },
      {
        ...OLIVE_MEDIA.gallery[3],
        stage: '03 / Coastal Horizon',
        curationNote: 'Minimalist monolithic glass mandaps mirrored seamlessly against the Arabian Sea shoreline.',
      },
      {
        ...OLIVE_MEDIA.gallery[4],
        stage: '04 / Symphonic Gala',
        curationNote: 'Imperial architectural halls layered in bespoke velvet drapery and orchestral lighting scores.',
      },
      {
        ...OLIVE_MEDIA.gallery[6],
        stage: '05 / Island Sanctuary',
        curationNote: 'Private royal island nuptials illuminated by illuminated water fountains and heritage marble.',
      },
      {
        ...OLIVE_MEDIA.gallery[9],
        stage: '06 / Architectural Epilogue',
        curationNote: 'Monolithic ballroom transformations featuring hand-sculpted golden arches and botanical art.',
      },
      {
        ...OLIVE_MEDIA.gallery[10],
        stage: '07 / Destination Heritage',
        curationNote: 'Historic heritage celebrations across India, orchestrated with signature spatial warmth.',
      },
    ],
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. WebGL Support Verification
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    // 2. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080a08, 0.042);

    const initCamZ = isMobile ? 8.8 : 7.4;
    const camera = new THREE.PerspectiveCamera(isMobile ? 48 : 42, width / height, 0.1, 100);
    camera.position.set(0, 0, initCamZ);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x080a08, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('Gallery WebGL renderer initialization failed:', e);
      setHasWebGL(false);
      return;
    }

    // 3. Central Anchor: Dimensional 3D Olive Logo
    const markGroup = new THREE.Group();
    markGroup.position.set(0, 0.15, -1.2);

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc4a362,
      roughness: 0.28,
      metalness: 0.88,
      envMapIntensity: 1.25,
    });

    const leafGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0x9e834c,
      roughness: 0.34,
      metalness: 0.8,
    });

    const orbitalLineMaterial = new THREE.MeshStandardMaterial({
      color: 0xdfc07b,
      roughness: 0.2,
      metalness: 0.94,
    });

    // 3.1 Architectural Outer Arch
    const arc = new THREE.EllipseCurve(0, 0.4, 1.2, 1.2, 0, Math.PI, false, 0);
    const archPoints = arc.getPoints(32).map((p) => new THREE.Vector3(p.x, p.y, 0));
    archPoints.unshift(new THREE.Vector3(1.2, -1.5, 0));
    archPoints.push(new THREE.Vector3(-1.2, -1.5, 0));

    const archGeo = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(archPoints),
      64,
      0.032,
      12,
      false
    );
    const archMesh = new THREE.Mesh(archGeo, goldMaterial);
    markGroup.add(archMesh);

    // 3.2 Botanical Branch Stem
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.15, -1.3, 0),
      new THREE.Vector3(0.05, -0.6, 0.05),
      new THREE.Vector3(-0.08, 0.1, -0.05),
      new THREE.Vector3(0.12, 0.7, 0.02),
      new THREE.Vector3(0.25, 1.2, 0),
    ]);
    const stemGeo = new THREE.TubeGeometry(stemCurve, 40, 0.022, 10, false);
    const stemMesh = new THREE.Mesh(stemGeo, goldMaterial);
    markGroup.add(stemMesh);

    // 3.3 Seven Curated Botanical Leaves
    const leafNodes = [
      { x: 0.32, y: 0.35, z: 0.05, rotZ: 0.55, scale: 0.18 },
      { x: -0.15, y: 0.55, z: -0.04, rotZ: -0.85, scale: 0.17 },
      { x: 0.28, y: 0.8, z: 0.06, rotZ: 0.95, scale: 0.19 },
      { x: -0.22, y: -0.05, z: -0.06, rotZ: -0.92, scale: 0.18 },
      { x: 0.24, y: -0.25, z: 0.04, rotZ: 1.05, scale: 0.18 },
      { x: -0.18, y: -0.65, z: -0.05, rotZ: -0.96, scale: 0.17 },
      { x: 0.16, y: -0.9, z: 0.03, rotZ: -0.35, scale: 0.14 },
    ];

    const leafGeo = new THREE.SphereGeometry(1, 16, 12);
    leafGeo.scale(0.3, 1.0, 0.12);

    leafNodes.forEach((leaf) => {
      const leafMesh = new THREE.Mesh(leafGeo, leafGoldMaterial);
      leafMesh.position.set(leaf.x, leaf.y, leaf.z);
      leafMesh.rotation.z = leaf.rotZ;
      leafMesh.rotation.y = 0.2;
      leafMesh.scale.setScalar(leaf.scale);
      markGroup.add(leafMesh);
    });

    // 3.4 Elegant Gold Orbital Rings Around Logo
    const orbitGroup = new THREE.Group();
    const orbitGeo1 = new THREE.TorusGeometry(2.35, 0.0075, 12, 120);
    const orbitMesh1 = new THREE.Mesh(orbitGeo1, orbitalLineMaterial);
    orbitMesh1.rotation.x = Math.PI / 2.6;
    orbitMesh1.rotation.y = 0.22;
    orbitGroup.add(orbitMesh1);

    const orbitGeo2 = new THREE.TorusGeometry(2.65, 0.0055, 12, 120);
    const orbitMesh2 = new THREE.Mesh(orbitGeo2, orbitalLineMaterial);
    orbitMesh2.rotation.x = -Math.PI / 2.8;
    orbitMesh2.rotation.z = 0.4;
    orbitGroup.add(orbitMesh2);

    const orbitGeo3 = new THREE.TorusGeometry(3.1, 0.004, 12, 120);
    const orbitMesh3 = new THREE.Mesh(orbitGeo3, orbitalLineMaterial);
    orbitMesh3.rotation.x = Math.PI / 3.4;
    orbitMesh3.rotation.z = -0.3;
    orbitGroup.add(orbitMesh3);

    markGroup.add(orbitGroup);
    scene.add(markGroup);

    // 4. Subtle Ambient Gold Dust Particles
    const particleCount = 260;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.035,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x0e2015, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfaf6ec, 2.2);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xd4af37, 2.6, 16);
    rimLight.position.set(-4, -2, -1);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x182c1e, 1.4, 14);
    fillLight.position.set(0, 4, -4);
    scene.add(fillLight);

    // 6. Photographic 3D Memory Panels (Active Theory Choreography)
    const panelGroup = new THREE.Group();
    scene.add(panelGroup);

    const panelCount = showcaseItems.length;
    const panelWidth = isMobile ? 3.1 : 3.6;
    const panelHeight = isMobile ? 2.05 : 2.4;

    const imgGeo = new THREE.PlaneGeometry(panelWidth, panelHeight);
    const borderGeo = new THREE.PlaneGeometry(panelWidth + 0.06, panelHeight + 0.06);

    const borderMaterial = new THREE.MeshStandardMaterial({
      color: 0xc4a362,
      roughness: 0.32,
      metalness: 0.85,
    });

    const textureLoader = new THREE.TextureLoader();
    interface PanelData {
      container: THREE.Group;
      mesh: THREE.Mesh;
      border: THREE.Mesh;
      material: THREE.MeshStandardMaterial;
      borderMaterial: THREE.MeshStandardMaterial;
      orbitAngle: number;
      orbitRadius: number;
      orbitY: number;
    }

    const panelList: PanelData[] = [];

    showcaseItems.forEach((item, idx) => {
      const panelHolder = new THREE.Group();

      // Hairline aged gold backing frame with independent opacity
      const borderMat = borderMaterial.clone();
      const borderMesh = new THREE.Mesh(borderGeo, borderMat);
      borderMesh.position.z = -0.005;
      panelHolder.add(borderMesh);

      // Default placeholder material until texture loads
      const mat = new THREE.MeshStandardMaterial({
        color: 0x141f17,
        roughness: 0.4,
        metalness: 0.15,
        transparent: true,
        opacity: 0.45,
      });

      const mesh = new THREE.Mesh(imgGeo, mat);
      mesh.position.z = 0.005;
      panelHolder.add(mesh);

      // Async texture loading with progressive feedback
      textureLoader.load(
        item.img,
        (tex) => {
          tex.encoding = THREE.sRGBEncoding;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.generateMipmaps = true;
          mat.map = tex;
          mat.color.set(0xffffff);
          mat.needsUpdate = true;
        },
        undefined,
        () => {
          console.warn('Fallback texture loaded for gallery item', item.title);
        }
      );

      // Base orbital parameters
      const baseAngle = (idx / panelCount) * Math.PI * 2;
      const baseRadius = 4.2 + (idx % 2) * 0.4;
      const baseY = ((idx % 3) - 1) * 0.35;

      panelHolder.position.set(
        Math.cos(baseAngle) * baseRadius,
        baseY,
        Math.sin(baseAngle) * (baseRadius * 0.55) - 2.5
      );
      panelHolder.scale.setScalar(0.7);

      panelGroup.add(panelHolder);

      panelList.push({
        container: panelHolder,
        mesh,
        border: borderMesh,
        material: mat,
        borderMaterial: borderMat,
        orbitAngle: baseAngle,
        orbitRadius: baseRadius,
        orbitY: baseY,
      });
    });

    // 7. Global Scroll Authority & Progress Binding (Lenis + GSAP ScrollTrigger)
    let currentProgress = 0;
    let targetProgress = 0;
    let activeStageRef = 0;

    const galleryTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=4500', // Long cinematic travel: ~650px scroll span per memory
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        targetProgress = self.progress;

        const stage = Math.min(
          panelCount - 1,
          Math.max(0, Math.floor(self.progress * panelCount))
        );
        if (stage !== activeStageRef) {
          activeStageRef = stage;
          setActiveIndex(stage);
        }
      },
    });

    // 8. Responsive Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const mobile = w < 768;

      camera.aspect = w / h;
      camera.fov = mobile ? 48 : 42;
      camera.position.z = mobile ? 8.8 : 7.4;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 9. Kinetic Render Loop with Deterministic Active Theory Spatial Choreography
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth progress lerp for fluid scrub inertia
      currentProgress += (targetProgress - currentProgress) * 0.1;

      // 9.1 Logo rotates and swirls in physical unison with scroll
      const logoRotationY = currentProgress * Math.PI * 2.8;
      markGroup.rotation.y = logoRotationY + Math.sin(elapsedTime * 0.3) * 0.05;
      markGroup.rotation.x = Math.cos(elapsedTime * 0.25) * 0.035;

      // 9.2 Gold orbital trails follow with harmonic cadence
      orbitGroup.rotation.y = currentProgress * Math.PI * 1.6 + Math.sin(elapsedTime * 0.4) * 0.08;
      orbitGroup.rotation.x = Math.cos(elapsedTime * 0.3) * 0.05;

      // 9.3 Particles drift gently
      particles.rotation.y = elapsedTime * 0.012 + currentProgress * 0.6;
      particles.rotation.x = elapsedTime * 0.006;

      // 9.4 Spatial Image Choreography: One Active Panel moves to dominant foreground, holds, then exits
      const spanPerPanel = 1.0 / panelCount;

      panelList.forEach((panel, i) => {
        // Center of activity for image i
        const centerProgress = (i + 0.5) * spanPerPanel;
        const delta = currentProgress - centerProgress;
        const absDelta = Math.abs(delta);

        // Active approach window: within half of its active span
        const activeRadius = spanPerPanel * 0.65;

        // Base orbital angle advances continuously with scroll
        const continuousAngle = panel.orbitAngle + currentProgress * Math.PI * 2.2;
        const orbitX = Math.cos(continuousAngle) * panel.orbitRadius;
        const orbitY = panel.orbitY + Math.sin(continuousAngle * 2.0) * 0.35;
        const orbitZ = Math.sin(continuousAngle) * (panel.orbitRadius * 0.5) - 2.8;

        if (absDelta < activeRadius) {
          // ACTIVE MOMENT: Interpolate towards Camera Foreground
          const rawT = 1.0 - absDelta / activeRadius;
          // Smooth Hermite curve for acceleration, hold, and smooth exit
          const easeT = rawT * rawT * (3.0 - 2.0 * rawT);

          // Target foreground position
          const fgX = 0;
          const fgY = isMobile ? 0.25 : 0.15;
          const fgZ = isMobile ? 2.2 : 2.8; // Dominant close-to-camera Z

          // Interpolated Position
          panel.container.position.x = THREE.MathUtils.lerp(orbitX, fgX, easeT);
          panel.container.position.y = THREE.MathUtils.lerp(orbitY, fgY, easeT);
          panel.container.position.z = THREE.MathUtils.lerp(orbitZ, fgZ, easeT);

          // Scale: Expands from 0.7 to 1.28
          const targetScale = isMobile ? 0.98 : 1.28;
          const scale = THREE.MathUtils.lerp(0.7, targetScale, easeT);
          panel.container.scale.setScalar(scale);

          // Rotation: Rotates from orbital angle directly to front-facing (0, 0, 0)
          const targetRotY = -Math.sin(delta * 4.0) * 0.18; // Subtle dynamic banking into motion
          const baseOrbitalRotY = -continuousAngle + Math.PI / 2;
          panel.container.rotation.y = THREE.MathUtils.lerp(baseOrbitalRotY * 0.4, targetRotY, easeT);
          panel.container.rotation.x = THREE.MathUtils.lerp(0.08, 0, easeT);
          panel.container.rotation.z = THREE.MathUtils.lerp(0, -delta * 0.15, easeT);

          // Material Opacity: Full crisp brightness in active state
          panel.material.opacity = THREE.MathUtils.lerp(0.4, 1.0, easeT);
          panel.borderMaterial.opacity = THREE.MathUtils.lerp(0.5, 1.0, easeT);
        } else {
          // INACTIVE ORBITAL FLIGHT
          panel.container.position.x = orbitX;
          panel.container.position.y = orbitY;
          panel.container.position.z = orbitZ;
          panel.container.scale.setScalar(0.7);

          // Face slightly inward toward central logo
          const baseOrbitalRotY = -continuousAngle + Math.PI / 2;
          panel.container.rotation.y = baseOrbitalRotY * 0.4;
          panel.container.rotation.x = 0.08;
          panel.container.rotation.z = 0;

          // Atmospheric depth falloff
          panel.material.opacity = 0.38;
          panel.borderMaterial.opacity = 0.45;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // 10. Comprehensive Lifecycle Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      galleryTrigger.kill();

      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }

      archGeo.dispose();
      stemGeo.dispose();
      leafGeo.dispose();
      orbitGeo1.dispose();
      orbitGeo2.dispose();
      orbitGeo3.dispose();
      particleGeo.dispose();
      imgGeo.dispose();
      borderGeo.dispose();

      goldMaterial.dispose();
      leafGoldMaterial.dispose();
      orbitalLineMaterial.dispose();
      particleMat.dispose();
      borderMaterial.dispose();

      panelList.forEach((p) => {
        p.material.map?.dispose();
        p.material.dispose();
        p.borderMaterial.dispose();
      });
    };
  }, [showcaseItems]);

  const currentItem = showcaseItems[activeIndex] || showcaseItems[0];

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="relative w-full h-screen bg-obsidian overflow-hidden select-none"
    >
      {/* 1. 3D WebGL Canvas Viewport is automatically appended inside containerRef */}

      {/* 2. WebGL Fallback if device context fails */}
      {!hasWebGL && (
        <div className="absolute inset-0 z-0 overflow-y-auto p-8 pt-28 bg-obsidian">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectProject(item)}
                className="group relative h-80 rounded-2xl overflow-hidden border border-subtle cursor-pointer bg-deep-forest/40"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent p-5 flex flex-col justify-end">
                  <span className="text-[10px] font-mono uppercase text-aged-gold tracking-widest">
                    {item.venue}
                  </span>
                  <h4 className="font-serif text-lg text-warm-ivory mt-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Subtle Cinematic Vignette Framing */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-[1]" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-obsidian via-obsidian/60 to-transparent pointer-events-none z-[1]" />
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-obsidian via-obsidian/75 to-transparent pointer-events-none z-[1]" />

      {/* 4. Top Narrative Chapter Header */}
      <div className="absolute top-8 sm:top-12 inset-x-6 sm:inset-x-12 flex items-center justify-between pointer-events-none z-20 text-xs uppercase tracking-ultra text-aged-gold/85">
        <div className="flex items-center gap-2.5">
          <Sparkle className="w-3.5 h-3.5 text-aged-gold animate-pulse" />
          <span>Chapter 03 · The Spatial Memories</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-bone/60 font-mono text-[10px]">
          <Compass className="w-3.5 h-3.5 text-aged-gold/70" />
          <span>Every Memory Revolves Around Olive</span>
          <span className="text-bone/20">|</span>
          <span>{activeIndex + 1} / {showcaseItems.length}</span>
        </div>
      </div>

      {/* 5. Central 3D Olive Identity Caption Overlay (Behind Active Foreground Image) */}
      <div className="absolute inset-x-0 bottom-36 sm:bottom-40 flex flex-col items-center justify-center pointer-events-none z-10 opacity-70">
        <span className="font-serif text-2xl sm:text-3xl tracking-[0.32em] font-light text-warm-ivory text-center leading-none drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
          OLIVE
        </span>
        <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.36em] text-aged-gold/90 uppercase mt-2 drop-shadow">
          CENTRAL ARCHIVE · CHENNAI · INDIA
        </span>
      </div>

      {/* 6. Active Memory Editorial Interactive Card (Active Theory Experience Moment) */}
      {currentItem && (
        <div className="absolute bottom-6 sm:bottom-9 inset-x-6 sm:inset-x-0 sm:max-w-xl mx-auto z-20 pointer-events-auto">
          <div className="p-4 sm:p-5 rounded-2xl bg-obsidian/90 backdrop-blur-xl border border-aged-gold/30 shadow-[0_16px_48px_rgba(0,0,0,0.9)] flex flex-col gap-2.5 transition-all duration-500">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-aged-gold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-aged-gold animate-ping" />
                {currentItem.stage}
              </span>
              <span className="text-[10px] font-mono text-bone/60 tracking-wider">
                {currentItem.venue}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h4 className="font-serif text-lg sm:text-xl text-warm-ivory font-light truncate">
                  {currentItem.title}
                </h4>
                <p className="text-xs text-bone/70 font-sans line-clamp-1 mt-0.5">
                  {currentItem.curationNote}
                </p>
              </div>

              <button
                onClick={() => onSelectProject(currentItem)}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-olive text-warm-ivory text-xs font-semibold tracking-wider uppercase border border-aged-gold/40 hover:bg-aged-gold hover:text-obsidian transition-all duration-300 shadow-md"
                aria-label={`Examine ${currentItem.title} in Portfolio`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Examine</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Bottom Narrative Navigation Indicator (Handoff to Chapter 04 The Craft) */}
      <div className="absolute bottom-2 inset-x-0 text-center pointer-events-none z-10 text-[9px] uppercase font-mono tracking-widest text-bone/35 flex items-center justify-center gap-2">
        <span>Scroll through 3D memories</span>
        <ArrowRight className="w-2.5 h-2.5 text-aged-gold/60 inline" />
        <span className="hidden sm:inline text-bone/25">Next Chapter 04 · The Craft</span>
      </div>
    </section>
  );
};
