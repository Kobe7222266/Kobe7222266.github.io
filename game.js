
// Initialize Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Physics world
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

// Setup lights
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Ambient light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Player (Gun) setup
const gunGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
const gunMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
const gun = new THREE.Mesh(gunGeometry, gunMaterial);
gun.rotation.x = Math.PI / 2; // Align gun with camera
gun.position.set(0, 0, -5);
scene.add(gun);

// Camera positioning
camera.position.set(0, 1.5, 5);
camera.lookAt(0, 1.5, 0);

// Bot setup (simple spheres for now)
const botGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const botMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const bots = [];
const botBodies = [];

function createBot() {
    const bot = new THREE.Mesh(botGeometry, botMaterial);
    const botBody = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(Math.random() * 20 - 10, 0.5, Math.random() * 20 - 10)
    });
    botBody.addShape(new CANNON.Sphere(0.5));
    world.addBody(botBody);

    bots.push(bot);
    botBodies.push(botBody);
    scene.add(bot);
}

for (let i = 0; i < 5; i++) {
    createBot();
}

// Controls and Shooting
let isShooting = false;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Mouse controls for shooting
window.addEventListener('click', () => {
    isShooting = true;
});

function shoot() {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    raycaster.ray.origin.copy(camera.position);
    raycaster.ray.direction.copy(direction);

    const intersects = raycaster.intersectObjects(bots);
    if (intersects.length > 0) {
        // Bot hit
        const hitBot = intersects[0].object;
        hitBot.material.color.set(0x00ff00); // Change bot color to green (hit)
        hitBot.scale.set(0.5, 0.5, 0.5); // Shrink bot when hit
        hitBot.position.y = -100; // Move the bot "out of the game"
    }
}

// Update bots and physics
function updateBots() {
    for (let i = 0; i < bots.length; i++) {
        const bot = bots[i];
        const botBody = botBodies[i];

        // Make the bot move randomly (AI simulation)
        botBody.position.x += (Math.random() - 0.5) * 0.1;
        botBody.position.z += (Math.random() - 0.5) * 0.1;

        bot.position.copy(botBody.position);
    }
}

// Render loop
function animate() {
    requestAnimationFrame(animate);

    // Update physics
    world.step(1 / 60);

    // Shoot if clicked
    if (isShooting) {
        shoot();
        isShooting = false;
    }

    // Update bot movement
    updateBots();

    // Render the scene
    renderer.render(scene, camera);
}

animate();
