// Infinique Studio - Interactivity & 3D
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // --- Navigation Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-luxury-black/80', 'backdrop-blur-md', 'py-4', 'border-b', 'border-white/5');
            navbar.classList.remove('py-6');
        } else {
            navbar.classList.remove('bg-luxury-black/80', 'backdrop-blur-md', 'py-4', 'border-b', 'border-white/5');
            navbar.classList.add('py-6');
        }
    });

    // --- Mobile Menu ---
    const mobileMenu = document.getElementById('mobile-menu');
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('mobile-menu-close');

    toggleBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('-translate-y-full');
    });

    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.add('-translate-y-full');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-y-full');
        });
    });

    // --- Hero Text Animations (GSAP) ---
    gsap.to('#hero-title', { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', delay: 0.2 });
    gsap.to('#hero-para', { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', delay: 0.4 });
    gsap.to('#hero-btns', { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', delay: 0.6 });

    // --- Scroll Reveal Animations ---
    const reveals = document.querySelectorAll('.animate-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => revealObserver.observe(el));

    // --- Pricing Toggle ---
    const monthlyBtn = document.getElementById('monthly-btn');
    const annualBtn = document.getElementById('annual-btn');
    const priceValues = document.querySelectorAll('.price-value');
    const billingLabels = document.querySelectorAll('.billing-period');

    annualBtn.addEventListener('click', () => {
        annualBtn.classList.add('bg-rolex-green-dark');
        annualBtn.classList.remove('opacity-40');
        monthlyBtn.classList.remove('bg-rolex-green-dark');
        monthlyBtn.classList.add('opacity-40');
        
        priceValues.forEach(val => {
            val.innerText = val.getAttribute('data-annual');
        });
        billingLabels.forEach(label => {
            label.innerText = '/ year';
        });
    });

    monthlyBtn.addEventListener('click', () => {
        monthlyBtn.classList.add('bg-rolex-green-dark');
        monthlyBtn.classList.remove('opacity-40');
        annualBtn.classList.remove('bg-rolex-green-dark');
        annualBtn.classList.add('opacity-40');
        
        priceValues.forEach(val => {
            val.innerText = val.getAttribute('data-monthly');
        });
        billingLabels.forEach(label => {
            label.innerText = '/ month';
        });
    });

    // --- Three.js Background Component ---
    if (typeof THREE !== 'undefined') {
        initThreeBackground();
    } else {
        console.error('Three.js failed to load.');
    }
});

function initThreeBackground() {
    const container = document.getElementById('hero-canvas');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create Abstract Shape (Torus Knot)
    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 200, 32);
    const material = new THREE.MeshNormalMaterial({
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 4;

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.005;
        
        // Float effect
        mesh.position.y = Math.sin(Date.now() * 0.001) * 0.2;

        renderer.render(scene, camera);
    }

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
