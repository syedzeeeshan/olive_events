import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * OLIVE EVENTS — HERO LIQUID GLASS COMPOSITION
 *
 * Unified Architectural Container:
 * 1. Top Metadata Label (• OLIVE EVENTS · ...)
 * 2. 3D Olive Events Logo (Fully contained with generous breathing room, sitting in depth at z = 0)
 * 3. Hero Title (MOMENTS, ROOTED IN / ELEGANCE. with physical liquid-glass blend reveal)
 * 4. Supporting Description (Fully contained with constrained editorial width)
 *
 * Below Glass:
 * 5. CTA Row (Plan Your Event & Watch Showreel)
 */

interface HeroLiquidGlassProps {
  className?: string;
  mode?: 'hero' | 'gallery';
  cameraDistance?: number;
  externalProgress?: number;
}

export const HeroLiquidGlass: React.FC<HeroLiquidGlassProps> = ({
  className = '',
  mode = 'hero',
  cameraDistance,
  externalProgress,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 0. Verify WebGL support
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
    const isHero = mode === 'hero';
    const initCamZ = cameraDistance ?? (isHero ? 8.2 : 6.6);

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080a08, 0.038);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
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
      console.warn('WebGL initialization failed, falling back:', e);
      setHasWebGL(false);
      return;
    }

    // =========================================================================
    // PIECE 4: 3D DIMENSIONAL OLIVE LOGO
    // Perfectly scaled (0.58) and positioned (y = 0.78) to be 100% CONTAINED
    // within the upper clearing of the glass container with generous breathing room!
    // =========================================================================
    const markGroup = new THREE.Group();
    markGroup.position.set(0, isHero ? 0.78 : 0, 0);
    markGroup.scale.setScalar(0.58);

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

    // 4.1 Architectural Outer Arch
    const arc = new THREE.EllipseCurve(0, 0.4, 1.2, 1.2, 0, Math.PI, false, 0);
    const points2D = arc.getPoints(32);
    const v3Points = points2D.map((p) => new THREE.Vector3(p.x, p.y, 0));
    v3Points.unshift(new THREE.Vector3(1.2, -1.5, 0));
    v3Points.push(new THREE.Vector3(-1.2, -1.5, 0));

    const archGeo = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(v3Points),
      64,
      0.032,
      12,
      false
    );
    const archMesh = new THREE.Mesh(archGeo, goldMaterial);
    markGroup.add(archMesh);

    // 4.2 Central Botanical Branch
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

    // 4.3 Seven Curated Botanical Leaves
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

    // 4.4 Delicate Jewellery Orbital Rings
    const orbitGroup = new THREE.Group();
    const orbitGeo1 = new THREE.TorusGeometry(2.15, 0.0075, 12, 120);
    const orbitMesh1 = new THREE.Mesh(orbitGeo1, orbitalLineMaterial);
    orbitMesh1.rotation.x = Math.PI / 2.5;
    orbitMesh1.rotation.y = 0.25;
    orbitGroup.add(orbitMesh1);

    const orbitGeo2 = new THREE.TorusGeometry(2.38, 0.0055, 12, 120);
    const orbitMesh2 = new THREE.Mesh(orbitGeo2, orbitalLineMaterial);
    orbitMesh2.rotation.x = -Math.PI / 2.7;
    orbitMesh2.rotation.z = 0.35;
    orbitGroup.add(orbitMesh2);

    markGroup.add(orbitGroup);
    scene.add(markGroup);

    // 4.5 Subtle Glittering Gold Particles
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      particleScales[i] = Math.random() * 0.03 + 0.008;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.038,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // =========================================================================
    // PIECE 1: UNIFIED HERO COMPOSITION TYPOGRAPHY TEXTURE (HeroTitle)
    // Sized intentionally to frame Metadata + 3D Logo + Headline + Description
    // =========================================================================
    let simScene: THREE.Scene | null = null;
    let simCamera: THREE.OrthographicCamera | null = null;
    let simQuadGeo: THREE.PlaneGeometry | null = null;
    let simMaterial: THREE.ShaderMaterial | null = null;
    let readTarget: THREE.WebGLRenderTarget | null = null;
    let writeTarget: THREE.WebGLRenderTarget | null = null;

    let liquidMesh: THREE.Mesh | null = null;
    let liquidGeo: THREE.PlaneGeometry | null = null;
    let liquidMat: THREE.ShaderMaterial | null = null;
    let textTexture: THREE.CanvasTexture | null = null;

    if (isHero) {
      const isMobile = Math.min(width, height) < 768;
      // Proportional architectural container enclosing the entire composition
      const glassWidth = isMobile ? 4.2 : 6.4;
      const glassHeight = isMobile ? 4.2 : 4.7;
      const glassAspect = glassWidth / glassHeight;

      // 1. Offscreen High-Resolution Typography & Content Mask (2048 x 1500)
      const textCanvas = document.createElement('canvas');
      textCanvas.width = 2048;
      textCanvas.height = 1500;
      const textCtx = textCanvas.getContext('2d');

      const renderTypography = () => {
        if (!textCtx) return;
        textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
        textCtx.textAlign = 'center';
        textCtx.textBaseline = 'middle';

        // 1. TOP METADATA LABEL (Comfortably within the glass top border)
        textCtx.font = "400 22px 'JetBrains Mono', monospace";
        textCtx.fillStyle = 'rgba(184, 155, 94, 0.9)';
        textCtx.fillText('• OLIVE EVENTS · BESPOKE CELEBRATIONS', 1024, 135);

        // 2. SPATIAL CLEARING: The 3D Olive logo sits in depth at z = 0
        // between y = 180 and y = 730, fully visible through the clear smoked glass!

        // 3. MAIN HERO TITLE (Physical liquid-glass material)
        // Line 1: "MOMENTS, ROOTED IN"
        textCtx.font = "300 114px 'Cormorant Garamond', Georgia, serif";
        textCtx.fillStyle = '#F4F0E7';
        textCtx.fillText('MOMENTS, ROOTED IN', 1024, 835);

        // Line 2: "ELEGANCE." in luminous aged-gold gradient
        textCtx.font = "400 138px 'Cormorant Garamond', Georgia, serif";
        const goldGrad = textCtx.createLinearGradient(560, 990, 1480, 990);
        goldGrad.addColorStop(0.0, '#F4F0E7');
        goldGrad.addColorStop(0.35, '#DFC07B');
        goldGrad.addColorStop(0.75, '#B89B5E');
        goldGrad.addColorStop(1.0, '#8C7441');
        textCtx.fillStyle = goldGrad;
        textCtx.fillText('ELEGANCE.', 1024, 990);
      };

      renderTypography();

      textTexture = new THREE.CanvasTexture(textCanvas);
      textTexture.minFilter = THREE.LinearMipmapLinearFilter;
      textTexture.magFilter = THREE.LinearFilter;
      textTexture.generateMipmaps = true;

      if (document.fonts) {
        document.fonts.ready.then(() => {
          renderTypography();
          if (textTexture) textTexture.needsUpdate = true;
        });
      }

      // =======================================================================
      // PIECE 2: EULERIAN FLUID SIMULATION FIELD (FluidField)
      // =======================================================================
      const simRes = isMobile ? 128 : 256;
      const targetOptions: THREE.WebGLRenderTargetOptions = {
        type: THREE.HalfFloatType,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        depthBuffer: false,
        stencilBuffer: false,
      };

      try {
        readTarget = new THREE.WebGLRenderTarget(simRes, simRes, targetOptions);
        writeTarget = new THREE.WebGLRenderTarget(simRes, simRes, targetOptions);
      } catch (err) {
        console.warn('HalfFloatType FBO not supported, falling back to UnsignedByteType', err);
        targetOptions.type = THREE.UnsignedByteType;
        readTarget = new THREE.WebGLRenderTarget(simRes, simRes, targetOptions);
        writeTarget = new THREE.WebGLRenderTarget(simRes, simRes, targetOptions);
      }

      simScene = new THREE.Scene();
      simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      simQuadGeo = new THREE.PlaneGeometry(2, 2);

      const simVertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `;

      const simFragmentShader = `
        uniform sampler2D uPrevSim;
        uniform float uDeltaTime;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uMouseVel;
        uniform float uSplatForce;
        uniform float uSplatRadius;
        uniform float uDissipation;
        uniform float uAspect;
        uniform float uScrollProgress;

        varying vec2 vUv;

        void main() {
          vec2 texel = vec2(1.0 / 256.0);

          // 1. ADVECTION: Trace backward along velocity streamlines
          vec4 current = texture2D(uPrevSim, vUv);
          vec2 vel = current.xy;
          vec2 advectedUv = vUv - vel * uDeltaTime * 0.40;
          vec4 advected = texture2D(uPrevSim, advectedUv);

          // 2. VORTICITY / CURL: Subtle organic eddies around velocity shear
          vec2 right = texture2D(uPrevSim, vUv + vec2(texel.x, 0.0)).xy;
          vec2 left  = texture2D(uPrevSim, vUv - vec2(texel.x, 0.0)).xy;
          vec2 top   = texture2D(uPrevSim, vUv + vec2(0.0, texel.y)).xy;
          vec2 bot   = texture2D(uPrevSim, vUv - vec2(0.0, texel.y)).xy;

          float curl = ((top.x - bot.x) - (right.y - left.y)) * 0.5;
          vec2 curlForce = vec2(abs(top.y) - abs(bot.y), abs(right.x) - abs(left.x)) * curl * 0.12;

          // 3. VELOCITY UPDATE WITH CURL & VISCOUS DISSIPATION
          vec2 newVel = (advected.xy + curlForce) * uDissipation;

          // 4. SURFACE HEIGHT RESTORATION (Spring return to 0)
          float height = advected.z * 0.935;

          // 5. GOLD EXCITATION DISSIPATION
          float gold = advected.w * 0.915;

          // 6. POINTER SPLAT INJECTION (Physical localized disturbance)
          vec2 diff = vUv - uMouse;
          diff.x *= uAspect; // Aspect-corrected circular distance on the glass plane
          float dist = length(diff);

          if (dist < uSplatRadius && uSplatForce > 0.0005) {
            // Cubic Hermite smooth falloff: soft bell curve, perfectly localized
            float normDist = dist / uSplatRadius;
            float influence = 1.0 - normDist * normDist * (3.0 - 2.0 * normDist);

            // Inject directional velocity from pointer movement
            newVel += uMouseVel * influence * uSplatForce * 3.2;

            // Inject surface depression
            height -= influence * min(uSplatForce * 0.65, 0.55);

            // Kinetic excitation converts shear disturbance into gold luminescence
            gold += influence * min(uSplatForce * 1.4, 1.0);
          }

          // 7. CALM BASELINE: Imperceptible organic breathing when undisturbed
          float calmWave = sin(vUv.x * 5.0 + uTime * 0.35) * cos(vUv.y * 4.5 + uTime * 0.30) * 0.003;
          height += calmWave * (1.0 - smoothstep(0.0, 0.15, length(newVel)));

          gl_FragColor = vec4(newVel, height, gold);
        }
      `;

      simMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uPrevSim: { value: readTarget.texture },
          uDeltaTime: { value: 0.016 },
          uTime: { value: 0.0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uMouseVel: { value: new THREE.Vector2(0.0, 0.0) },
          uSplatForce: { value: 0.0 },
          // Calibrated splash radius: slightly larger than 0.075 to meaningfully affect 2-3 letters, still local
          uSplatRadius: { value: 0.105 },
          uDissipation: { value: 0.948 },
          uAspect: { value: glassAspect },
          uScrollProgress: { value: 0.0 },
        },
        vertexShader: simVertexShader,
        fragmentShader: simFragmentShader,
        depthTest: false,
        depthWrite: false,
      });

      const simQuad = new THREE.Mesh(simQuadGeo, simMaterial);
      simScene.add(simQuad);

      // =======================================================================
      // PIECE 3: LIQUID-BLEND & REFRACTION SHADER
      // =======================================================================
      liquidGeo = new THREE.PlaneGeometry(glassWidth, glassHeight, isMobile ? 64 : 96, isMobile ? 64 : 96);

      const liquidVertexShader = `
        uniform sampler2D uFluidMap;
        uniform float uTime;
        uniform float uScrollProgress;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec4 vFluidData;
        varying float vFresnel;

        void main() {
          vUv = uv;
          vec3 pos = position;

          vec4 fluid = texture2D(uFluidMap, uv);
          vFluidData = fluid;

          // Subtle physical fluid vertex displacement
          float disp = fluid.z;
          pos.z += disp * 0.55;

          // Finite difference normal perturbation for accurate lighting on fluid surface
          vec2 texel = vec2(0.008, 0.008);
          float hL = texture2D(uFluidMap, uv - vec2(texel.x, 0.0)).z;
          float hR = texture2D(uFluidMap, uv + vec2(texel.x, 0.0)).z;
          float hD = texture2D(uFluidMap, uv - vec2(0.0, texel.y)).z;
          float hU = texture2D(uFluidMap, uv + vec2(0.0, texel.y)).z;

          vec3 n = normalize(vec3((hL - hR) * 2.0, (hD - hU) * 2.0, 1.0));
          vNormal = normalize(normalMatrix * n);

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          vViewPosition = -mvPosition.xyz;

          vec3 viewDir = normalize(vViewPosition);
          vFresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

          gl_Position = projectionMatrix * mvPosition;
        }
      `;

      const liquidFragmentShader = `
        uniform sampler2D uFluidMap;
        uniform sampler2D uTextMap;
        uniform float uTime;
        uniform float uAspect;
        uniform float uScrollProgress;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec4 vFluidData;
        varying float vFresnel;

        void main() {
          vec2 vel = vFluidData.xy;
          float height = vFluidData.z;
          float goldSheen = vFluidData.w;
          float speed = length(vel);

          // 1. LETTER DISPLACEMENT FIELD
          vec2 textDisplacement = vel * 0.30;
          vec2 distortedUv = vUv - textDisplacement;

          // 8-tap Gaussian streamline smear along fluid flow
          vec4 smear = vec4(0.0);
          float totalWeight = 0.0;
          const int SAMPLES = 8;
          for (int i = 0; i < SAMPLES; i++) {
            float t = float(i) / float(SAMPLES - 1);
            float w = exp(-t * t * 2.4);
            vec2 sampleUv = vUv - textDisplacement * t;
            smear += texture2D(uTextMap, sampleUv) * w;
            totalWeight += w;
          }
          smear /= totalWeight;

          // Micro-chromatic spectral dispersion along the liquid flow vector
          vec2 dispOffset = vel * 0.045;
          float textR = texture2D(uTextMap, distortedUv + dispOffset * 0.22).r;
          float textG = texture2D(uTextMap, distortedUv).g;
          float textB = texture2D(uTextMap, distortedUv - dispOffset * 0.22).b;
          float textA = texture2D(uTextMap, distortedUv).a;
          vec4 textDistorted = vec4(textR, textG, textB, textA);

          // 2. GLYPH EDGE & MELT DETECTION
          vec2 dAlpha = vec2(dFdx(smear.a), dFdy(smear.a));
          float edgeDistorted = length(dAlpha);

          // Melt factor: how intensely the letter merges into the liquid glass
          float melt = clamp(speed * 4.0 + abs(height) * 2.6, 0.0, 1.0);

          // 3. UNIFIED ARCHITECTURAL GLASS CONTAINER (Moderate radius, no giant pill)
          vec2 p = (vUv - 0.5) * 2.0;
          p.x *= uAspect;
          float boxRadius = 0.08;
          vec2 d = abs(p) - vec2(uAspect - boxRadius - 0.035, 1.0 - boxRadius - 0.035);
          float distBox = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - boxRadius;

          // Smooth edge falloff outside the container bounds
          float containerMask = 1.0 - smoothstep(0.0, 0.032, distBox);
          if (containerMask < 0.002) discard;

          // Curated Olive Brand Palette
          vec3 colObsidian   = vec3(0.031, 0.039, 0.031); // #080A08
          vec3 colDeepForest = vec3(0.063, 0.110, 0.082); // #101C15
          vec3 colOlive      = vec3(0.149, 0.227, 0.173); // #263A2C
          vec3 colAgedGold   = vec3(0.722, 0.608, 0.369); // #B89B5E
          vec3 colGoldSheen  = vec3(0.875, 0.753, 0.482); // #DFC07B
          vec3 colWarmIvory  = vec3(0.957, 0.941, 0.906); // #F4F0E7

          // Smoked glass container body
          vec3 glassBase = mix(colObsidian, colDeepForest, vUv.y * 0.55 + 0.22);
          glassBase = mix(glassBase, colOlive, 0.15);

          // Subtle aged-gold container border highlight
          float borderRim = smoothstep(0.022, 0.0, abs(distBox)) * 0.40;
          vec3 borderGlow = colAgedGold * borderRim;

          // Studio lighting specular highlight across the glass surface
          vec3 lightDir = normalize(vec3(0.35, 0.75, 0.65));
          vec3 viewDir = normalize(vViewPosition);
          vec3 halfDir = normalize(lightDir + viewDir);
          float spec = pow(max(dot(vNormal, halfDir), 0.0), 32.0);
          vec3 glassSpec = mix(colAgedGold, colWarmIvory, 0.5) * spec * 0.75;

          // 4. LETTERS BLENDING INTO THE GLASS MATERIAL (Core Requirement)
          vec3 letterBaseColor = textDistorted.rgb;

          // Meniscus grazing light along moving glyph edges
          vec2 meniscusNormal = normalize(dAlpha + vel * 2.4 + 1e-5);
          vec2 light2D = normalize(vec2(0.38, 0.82));
          float edgeLight = max(0.0, dot(meniscusNormal, light2D));

          // Restrained aged-gold rim: ONLY active on moving/deformed letter contours
          float goldRim = smoothstep(0.06, 0.42, edgeDistorted) * melt * (0.70 + 0.60 * edgeLight);
          goldRim += goldSheen * smear.a * melt * 0.55;

          vec3 letterGoldHighlight = mix(colAgedGold, colGoldSheen, edgeLight) * goldRim * 1.6;

          // Liquid blending: the letter stretches into the glass, smears outward, and softens into liquid olive tones
          vec3 activeLetter = mix(letterBaseColor, mix(letterBaseColor, colOlive, 0.55), melt * 0.65) + letterGoldHighlight;

          // Letter alpha smears smoothly into surrounding glass
          float letterAlpha = mix(textDistorted.a, smear.a, 0.60);

          // Composite letter into the smoked glass surface
          vec3 finalColor = mix(glassBase, activeLetter, letterAlpha) + borderGlow + glassSpec;

          // 5. LOGO REVEAL ARCHITECTURE (Optical Transparency through Meltdown)
          // The reveal is tied DIRECTLY to the letterforms, NOT a separate blob in empty glass!
          float activeLetterAlpha = mix(letterAlpha, letterAlpha * 0.16, melt);
          float glassBaseAlpha = 0.42;
          float localClearing = melt * letterAlpha * 0.30;
          float finalAlpha = clamp(glassBaseAlpha + activeLetterAlpha * 0.52 - localClearing + (borderRim * 0.38), 0.08, 0.96);

          // Scroll departure
          finalAlpha *= (1.0 - uScrollProgress * 0.7);

          gl_FragColor = vec4(finalColor, finalAlpha * containerMask);
        }
      `;

      liquidMat = new THREE.ShaderMaterial({
        uniforms: {
          uFluidMap: { value: readTarget.texture },
          uTextMap: { value: textTexture },
          uTime: { value: 0 },
          uAspect: { value: glassAspect },
          uScrollProgress: { value: 0.0 },
        },
        vertexShader: liquidVertexShader,
        fragmentShader: liquidFragmentShader,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
      // Positioned to wrap the entire composition: metadata at top, 3D logo in upper clearing, title in center, description at bottom!
      liquidMesh.position.set(0, isMobile ? 0.30 : 0.22, 3.6);
      scene.add(liquidMesh);
    }

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x0e2b1e, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf8f4ea, 1.8);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xd4af37, 2.4, 15);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x1e3324, 1.2, 12);
    fillLight.position.set(0, 4, -4);
    scene.add(fillLight);

    // =========================================================================
    // PIECE 5: INTERACTION CONTROLLER (Raycaster, Pointer Velocity, Spring Dissipation)
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    let mouseUvX = 0.5;
    let mouseUvY = 0.5;
    let targetMouseUvX = 0.5;
    let targetMouseUvY = 0.5;
    let lastMouseUvX = 0.5;
    let lastMouseUvY = 0.5;
    let splatForce = 0.0;
    let fluidDisturbance = 0.0;
    const raycaster = new THREE.Raycaster();
    const mouseClip = new THREE.Vector2();
    let isOverGlass = false;

    const handlePointerMove = (e: PointerEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.45;

      if (isHero && liquidMesh) {
        mouseClip.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseClip.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseClip, camera);
        const hits = raycaster.intersectObject(liquidMesh);

        if (hits.length > 0 && hits[0].uv) {
          targetMouseUvX = hits[0].uv.x;
          targetMouseUvY = hits[0].uv.y;
          isOverGlass = true;
          return;
        }
      }

      targetMouseUvX = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      targetMouseUvY = Math.max(0, Math.min(1, 1.0 - e.clientY / window.innerHeight));
      isOverGlass = false;
    };

    const handlePointerLeave = () => {
      splatForce = 0.0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // Scroll Progress Binding
    let currentScrollProgress = 0;
    const heroTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: (self) => {
        currentScrollProgress = self.progress;
      },
    });

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let lastTime = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const deltaTime = Math.min(elapsedTime - lastTime, 0.033);
      lastTime = elapsedTime;

      const progress = externalProgress !== undefined ? externalProgress : currentScrollProgress;

      // Mouse smooth interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Pointer velocity and splat force calculation
      const pointerDeltaX = targetMouseUvX - lastMouseUvX;
      const pointerDeltaY = targetMouseUvY - lastMouseUvY;
      const pointerSpeed = Math.hypot(pointerDeltaX, pointerDeltaY);

      lastMouseUvX = targetMouseUvX;
      lastMouseUvY = targetMouseUvY;

      mouseUvX += (targetMouseUvX - mouseUvX) * 0.14;
      mouseUvY += (targetMouseUvY - mouseUvY) * 0.14;

      // Smooth, calibrated splat force derived from pointer speed
      const targetSplat =
        isHero && progress < 1.0
          ? Math.min(Math.pow(pointerSpeed * (isOverGlass ? 28.0 : 16.0), 1.15), 1.5)
          : 0.0;
      splatForce += (targetSplat - splatForce) * 0.16;
      fluidDisturbance += (splatForce - fluidDisturbance) * 0.10;

      // Step fluid simulation pass (Ping-Pong FBO)
      if (
        isHero &&
        simScene &&
        simCamera &&
        simMaterial &&
        readTarget &&
        writeTarget &&
        progress < 1.0
      ) {
        simMaterial.uniforms.uPrevSim.value = readTarget.texture;
        simMaterial.uniforms.uDeltaTime.value = deltaTime;
        simMaterial.uniforms.uTime.value = elapsedTime;
        simMaterial.uniforms.uMouse.value.set(mouseUvX, mouseUvY);
        simMaterial.uniforms.uMouseVel.value.set(pointerDeltaX, pointerDeltaY);
        simMaterial.uniforms.uSplatForce.value = splatForce;
        simMaterial.uniforms.uScrollProgress.value = progress;

        renderer.setRenderTarget(writeTarget);
        renderer.render(simScene, simCamera);

        const temp = readTarget;
        readTarget = writeTarget;
        writeTarget = temp;

        if (liquidMat) {
          liquidMat.uniforms.uFluidMap.value = readTarget.texture;
          liquidMat.uniforms.uTime.value = elapsedTime;
          liquidMat.uniforms.uScrollProgress.value = progress;
        }
      }

      renderer.setRenderTarget(null);

      // Unified Scroll Progression
      const scrollRotationY = progress * Math.PI * 1.4;
      const scrollCameraZ = initCamZ - progress * (isHero ? 2.2 : 1.2);
      const scrollYOffset = progress * (isHero ? 0.9 : 0.4);

      // Logo Rotation & Position (subtly floating in upper clearing of glass)
      markGroup.rotation.y = Math.sin(elapsedTime * 0.3) * 0.08 + mouseX + scrollRotationY;
      markGroup.rotation.x = Math.cos(elapsedTime * 0.25) * 0.05 - mouseY;
      markGroup.position.y = (isHero ? 0.78 : 0) + Math.sin(elapsedTime * 0.45) * 0.03 + scrollYOffset;

      orbitGroup.rotation.y = Math.sin(elapsedTime * 0.35) * 0.06 + progress * 0.3 + fluidDisturbance * 0.04;
      orbitGroup.rotation.x = Math.cos(elapsedTime * 0.3) * 0.04 + fluidDisturbance * 0.02;

      particles.rotation.y = elapsedTime * 0.012 + progress * 0.5 + fluidDisturbance * 0.06;
      particles.rotation.x = elapsedTime * 0.006 + fluidDisturbance * 0.03;

      rimLight.position.x = Math.sin(elapsedTime * 0.4) * 4;
      rimLight.position.z = Math.cos(elapsedTime * 0.4) * 4;

      camera.position.z = scrollCameraZ;

      renderer.render(scene, camera);
    };

    animate();

    // Teardown and Cleanup
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      heroTrigger.kill();

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
      particleGeo.dispose();
      goldMaterial.dispose();
      leafGoldMaterial.dispose();
      orbitalLineMaterial.dispose();
      particleMat.dispose();

      simQuadGeo?.dispose();
      simMaterial?.dispose();
      readTarget?.dispose();
      writeTarget?.dispose();
      liquidGeo?.dispose();
      liquidMat?.dispose();
      textTexture?.dispose();
    };
  }, [cameraDistance, externalProgress, mode]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {!hasWebGL && (
        <div className="absolute inset-0 flex items-center justify-center bg-obsidian">
          <svg
            className="w-24 h-32 text-aged-gold opacity-60 animate-pulse"
            viewBox="0 0 60 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M5 77V31a25 25 0 0 1 50 0v46z" />
            <path d="M22 70c4-14 9-28 19-50" strokeLinecap="round" />
            <g fill="currentColor" stroke="none">
              <ellipse cx="37" cy="24" rx="3" ry="8" transform="rotate(32 37 24)" />
              <ellipse cx="30" cy="31" rx="2.8" ry="7.5" transform="rotate(-48 30 31)" />
              <ellipse cx="37" cy="38" rx="2.8" ry="7.5" transform="rotate(58 37 38)" />
              <ellipse cx="26" cy="44" rx="2.7" ry="7" transform="rotate(-52 26 44)" />
              <ellipse cx="32" cy="51" rx="2.7" ry="7" transform="rotate(62 32 51)" />
              <ellipse cx="22" cy="57" rx="2.5" ry="6.5" transform="rotate(-55 22 57)" />
              <ellipse cx="29" cy="62" rx="2.3" ry="3" transform="rotate(-20 29 62)" />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
};
