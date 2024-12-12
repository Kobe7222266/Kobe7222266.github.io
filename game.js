// Set up basic 3D scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameContainer") });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lights
const light = new THREE.AmbientLight(0x404040); // Ambient light
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

// Create the player (gun)
const gunGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
const gunMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
const gun = new THREE.Mesh(gunGeometry, gunMaterial);
gun.rotation.x = Math.PI / 2;  // Rotate to align with the camera
gun.position.z = -2;  // Place the gun in front of the camera
scene.add(gun);

// Set up camera position
camera.position.z = 5;

// Create bots (simple spheres)
const botGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const botMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const bots = [];
const botPositions = [];

function createBot() {
    const bot = new THREE.Mesh(botGeometry, botMaterial);
    bot.position.x = Math.random() * 20 - 10;
    bot.position.y = Math.random() * 10;
    bot.position.z = Math.random() * 20 - 10;
    bots.push(bot);
    scene.add(bot);
    botPositions.push(bot.position);
}

for (let i = 0; i < 5; i++) {
    createBot();
}

// Set up shooting functionality
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function shoot() {
    raycaster.update();
    raycaster.ray.origin.copy(camera.position);
    raycaster.ray.direction.set(mouse.x, mouse.y, -1);
    
    const intersects = raycaster.intersectObjects(bots);
    
    if (intersects.length > 0) {
        const hitBot = intersects[0].object;
        hitBot.material.color.set(0x00ff00);  // Change color to green
        hitBot.scale.set(0.3, 0.3, 0.3);  // Shrink bot as if it’s hit
        setTimeout(() => {
            hitBot.position.set(Math.random() * 20 - 10, Math.random() * 10, Math.random() * 20 - 10);
            hitBot.material.color.set(0xff0000);
            hitBot.scale.set(1, 1, 1);
        }, 1000);
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate gun to face the mouse
    gun.rotation.y = Math.atan2(mouse.x, mouse.y);

    // Move bots randomly (AI simulation)
    bots.forEach((bot, index) => {
        bot.position.x += (Math.random() - 0.5) * 0.1;
        bot.position.y += (Math.random() - 0.5) * 0.1;
        bot.position.z += (Math.random() - 0.5) * 0.1;
    });

    // Render the scene
    renderer.render(scene, camera);

    shoot();
}

animate();
