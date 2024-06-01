// Get the canvas element
const canvas = document.getElementById("renderCanvas");

// Generate the BABYLON 3D engine
const engine = new BABYLON.Engine(canvas, true);

// Create the scene space
const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas
    const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 3, 150, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // Add lights to the scene
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

    // Create a 100x100 ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, scene);

    // Create walls for the room
    const wallHeight = 20;
    const wallThickness = 1;

    // Front wall
    const frontWall = BABYLON.MeshBuilder.CreateBox("frontWall", { width: 100, height: wallHeight, depth: wallThickness }, scene);
    frontWall.position.z = -50;
    frontWall.position.y = wallHeight / 2;

    // Back wall
    const backWall = BABYLON.MeshBuilder.CreateBox("backWall", { width: 100, height: wallHeight, depth: wallThickness }, scene);
    backWall.position.z = 50;
    backWall.position.y = wallHeight / 2;

    // Left wall
    const leftWall = BABYLON.MeshBuilder.CreateBox("leftWall", { width: wallThickness, height: wallHeight, depth: 100 }, scene);
    leftWall.position.x = -50;
    leftWall.position.y = wallHeight / 2;

    // Right wall
    const rightWall = BABYLON.MeshBuilder.CreateBox("rightWall", { width: wallThickness, height: wallHeight, depth: 100 }, scene);
    rightWall.position.x = 50;
    rightWall.position.y = wallHeight / 2;

    // Add a box (an object to move)
    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 5 }, scene);
    box.position.y = 2.5;

    // Return the created scene
    return scene;
};

const scene = createScene();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});

// Add movement controls
const box = scene.getMeshByName("box");
const moveSpeed = 1;

// Handle user input for object movement
window.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowUp":
            box.position.z -= moveSpeed;
            break;
        case "ArrowDown":
            box.position.z += moveSpeed;
            break;
        case "ArrowLeft":
            box.position.x -= moveSpeed;
            break;
        case "ArrowRight":
            box.position.x += moveSpeed;
            break;
    }
});
