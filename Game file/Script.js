const bots = [];
function createBot() {
    const botGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const botMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const bot = new THREE.Mesh(botGeometry, botMaterial);
    bot.position.set(Math.random() * 10 - 5, 1, Math.random() * 10 - 5);
    scene.add(bot);
    bots.push(bot);
}

function aimbot() {
    bots.forEach((bot) => {
        const direction = new THREE.Vector3().subVectors(player.position, bot.position).normalize();
        bot.lookAt(player.position);
        // Shooting logic: create projectiles towards player
    });
}

setInterval(createBot, 3000); // Create a bot every 3 seconds

function animate() {
    requestAnimationFrame(animate);

    movePlayer();
    aimbot();

    renderer.render(scene, camera);
}

