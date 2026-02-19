/**
 * VIVEK COLLEGE BIJNOR - 3D Advertisement Website
 * Senior Expert Development - Three.js 3D Background & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  init3DBackground();
  initParallax();
  initScrollAnimations();
});

/**
 * Initialize Three.js 3D animated background
 */
function init3DBackground() {
  const container = document.getElementById('canvas-3d');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x0f172a, 1);
  container.appendChild(renderer.domElement);

  // Create floating 3D geometric shapes
  const geometry1 = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
  const geometry2 = new THREE.IcosahedronGeometry(1.2, 1);
  const geometry3 = new THREE.OctahedronGeometry(1, 0);

  const material = new THREE.MeshPhongMaterial({
    color: 0xd69e2e,
    emissive: 0x1a365d,
    specular: 0xffffff,
    shininess: 50,
    transparent: true,
    opacity: 0.15,
    wireframe: true
  });

  const shapes = [];
  const meshes = [
    new THREE.Mesh(geometry1, material.clone()),
    new THREE.Mesh(geometry2, material.clone()),
    new THREE.Mesh(geometry3, material.clone())
  ];

  meshes[0].position.set(-4, 2, -8);
  meshes[0].scale.set(0.8, 0.8, 0.8);
  meshes[1].position.set(4, -1, -6);
  meshes[1].scale.set(0.6, 0.6, 0.6);
  meshes[2].position.set(0, 3, -10);
  meshes[2].scale.set(0.5, 0.5, 0.5);

  meshes.forEach(mesh => {
    scene.add(mesh);
    shapes.push({
      mesh,
      baseY: mesh.position.y,
      speed: 0.2 + Math.random() * 0.3,
      rotSpeed: 0.002 + Math.random() * 0.002
    });
  });

  // Ambient light
  const ambient = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambient);

  // Directional light
  const directional = new THREE.DirectionalLight(0xd69e2e, 0.5);
  directional.position.set(5, 5, 5);
  scene.add(directional);

  camera.position.z = 5;

  // Mouse movement for parallax
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    shapes.forEach(({ mesh, baseY, speed, rotSpeed }) => {
      mesh.rotation.x += rotSpeed;
      mesh.rotation.y += rotSpeed * 1.2;
      mesh.position.y = baseY + Math.sin(time * speed) * 0.3;
      mesh.rotation.x += mouseY * 0.002;
      mesh.rotation.y += mouseX * 0.002;
    });

    renderer.render(scene, camera);
  }
  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/**
 * Parallax effect on hero title
 */
function initParallax() {
  const title = document.querySelector('.college-name');
  if (!title) return;

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    title.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.gallery-item, .course-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}
