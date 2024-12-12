let bots = [];  // Array to store bots

function createBot(x, y, z) {
    let botGeometry = new THREE.SphereGeometry(0.5);
    let botMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    let bot = new THREE.Mesh(botGeometry, botMaterial);
    bot.position.set(x, y, z);
    scene.add(bot);
    bots.push(bot);
}

function updateBots() {
    bots.forEach(bot => {
        // Simple AI logic for chasing player (moving towards player)
        let direction = new THREE.Vector3().subVectors(camera.position, bot.position).normalize();
        bot.position.add(direction.multiplyScalar(0.1));
        
        // Basic shooting logic (shoot at player)
        if (Math.random() < 0.01) { // Random chance to shoot
            fireProjectile(bot.position);
        }
    });
}

function fireProjectile(botPosition) {
    console.log("Firing projectile from bot at: ", botPosition);
    // You can create a projectile object here and animate it towards the player
}

function animate() {
    requestAnimationFrame(animate);

    // Update bots
    updateBots();

    // Other game loop logic
    renderer.render(scene, camera);
}

