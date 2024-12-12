// script.js

let scene, camera, renderer, cube;
let isAimbotActive = false;
let playerHealth = 100;
let playerHealthBar = document.getElementById("health");

function init() {
    // Create the scene, camera, and renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('game-canvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a basic cube (player or environment object)
    let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set the camera position
    camera.position.z = 5;

    // Event listeners for buttons
    document.getElementById("graphics-toggle").addEventListener("click", toggleGraphics);
    document.getElementById("aimbot-toggle").addEventListener("click", toggleAimbot);

    // Create health bar (simple div)
    playerHealthBar.style.width = playerHealth + '%';

    // Start the game loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube (for testing)
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Update the health bar based on player health
    playerHealthBar.style.width = playerHealth + '%';

    // Render the scene from the camera’s perspective
    renderer.render(scene, camera);
}

// Toggle Graphics (Low/High)
function toggleGraphics() {
    if (renderer.capabilities.isWebGL2) {
        renderer.setClearColor(isPotatoMode() ? 0x000000 : 0xffffff);
    }
}

// Aimbot functionality
function toggleAimbot() {
    isAimbotActive = !isAimbotActive;
    if (isAimbotActive) {
        console.log("Aimbot activated");
    } else {
        console.log("Aimbot deactivated");
    }
}

// Example for checking low graphics mode
function isPotatoMode() {
    return scene.background ? scene.background.getHex() === 0x000000 : false;
}

// Initialize the game
init();

