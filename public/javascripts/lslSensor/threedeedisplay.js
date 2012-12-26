var container,
    camera;

init();
animate();


function init() {

    // We have a fundamental problem.  three.js space centers on 0,0,0, and the vertical axis is Y
    // Second Life space uses Z as the vertical axis, and regions exist as <0-256,0-256,0-4096>
    // transforming from SL<x,y,z> becomes three.js<x-127,z,y-127>


    container = document.createElement('div');
    document.body.appendChild(container);

    window.camera = new THREE.CombinedCamera(window.innerWidth / 2, window.innerHeight / 2, 70, 1, 1000, -1000, 1000, 1000);

    window.camera.position.x = -1024;
    window.camera.position.y = 150;
    window.camera.position.z = -1024;
    window.camera.toOrthographic();
    window.scene = new THREE.Scene();

    // Grid

    function grid(height) {
        var size = 127, step = 30;
        var geometry = new THREE.Geometry();
        for (var i = -size; i <= size; i += step) {

            geometry.vertices.push(new THREE.Vector3(-size, height, i));
            geometry.vertices.push(new THREE.Vector3(size, height, i));

            geometry.vertices.push(new THREE.Vector3(i, height, -size));
            geometry.vertices.push(new THREE.Vector3(i, height, size));

        }
        var material = new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2 });
        var line = new THREE.Line(geometry, material);
        line.type = THREE.LinePieces;
        window.scene.add(line);
    }

    for (var i = 0; i <= 400; i += 100) {
        grid(i);
    }


    // make a SL<0,0,0> marker
    var greenmat = new THREE.MeshLambertMaterial({ color: 0x00ff00, shading: THREE.FlatShading, overdraw: true });
    var redmat = new THREE.MeshLambertMaterial({ color: 0xff0000, shading: THREE.FlatShading, overdraw: true });
    var bluemat = new THREE.MeshLambertMaterial({ color: 0x0000ff, shading: THREE.FlatShading, overdraw: true });

    var sphereGeo = new THREE.SphereGeometry(2);

    var zerozero = new THREE.Mesh(sphereGeo, greenmat);
    zerozero.position.x = -127.0;
    zerozero.position.y = 0.0;
    zerozero.position.z = -127.0;
    window.scene.add(zerozero);

//    var dot6464 = new THREE.Mesh(sphereGeo, bluemat);
//    dot6464.position.x = -64.0;
//    dot6464.position.y = 0.0;
//    dot6464.position.z = -64.0;
//    window.scene.add(dot6464);


    // debugging annotation texture - see http://stackoverflow.com/questions/13683727/three-js-text-next-to-line

    function loadTexture() {

        var texture = new THREE.Texture(texture_placeholder);
        texture.needsUpdate = true;
        var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: true, side: THREE.DoubleSide});

        return material;

    }

    function textMarker(markertext) {
        texture_placeholder = document.createElement('canvas');
        texture_placeholder.width = 100;
        texture_placeholder.height = 20;
        texture_placeholder.innerHtml = "hello"

        var context = texture_placeholder.getContext('2d');
        context.fillStyle = '#f00';
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = ' bold 150px';
        context.fillText(markertext, texture_placeholder.width / 2, texture_placeholder.height / 2);
        var plane = new THREE.PlaneGeometry(100, 20);
        var text = new THREE.Mesh(plane, loadTexture())
        return text;
    }

//        window.scene.add(textMarker("Doob's 0,0"));
//
//        tentwenty = textMarker("10,20,0");
//        tentwenty.position.x = 10;
//        tentwenty.position.z = 20;
//        tentwenty.position.y = 0;
//        window.scene.add(tentwenty);
//
//        twentythirty = textMarker("127,127,100");
//        twentythirty.position.x = 127;
//        twentythirty.position.z = 127;
//        twentythirty.position.y = 100;
//        window.scene.add(twentythirty);


    // add axis markers

    var debugaxis = function (axisLength) {
        //Shorten the vertex function
        function v(x, y, z) {
            return new THREE.Vertex(new THREE.Vector3(x, y, z));
        }

        //Create axis (point1, point2, colour)
        function createAxis(p1, p2, color) {
            var line, lineGeometry = new THREE.Geometry(),
                lineMat = new THREE.LineBasicMaterial({color: color, lineWidth: 1});
            lineGeometry.vertices.push(p1, p2);
            line = new THREE.Line(lineGeometry, lineMat);
            window.scene.add(line);
        }

        createAxis(v(-127, 0, -127), v(axisLength - 127, 0, -127), 0x00ff00);   // green for Y
        createAxis(v(-127, 0, -127), v(-127, 409.6, -127), 0x0000FF);         // blue  for three.js Y (= SL Z)
        createAxis(v(-127, 0, -127), v(-127, 0, axisLength - 127), 0xff0000);   // red for z (=SL Y)
    };

    //To use enter the axis length
    debugaxis(256);

    // Lights

    var ambientLight = new THREE.AmbientLight(Math.random() * 0x10);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(Math.random() * 0xffffff);
    directionalLight.position.x = Math.random() - 0.5;
    directionalLight.position.y = Math.random() - 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();
    window.scene.add(directionalLight);

    var directionalLight = new THREE.DirectionalLight(Math.random() * 0xffffff);
    directionalLight.position.x = Math.random() - 0.5;
    directionalLight.position.y = Math.random() - 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();
    window.scene.add(directionalLight);

    window.renderer = new THREE.CanvasRenderer();
    window.renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {

        window.camera.setSize(window.innerWidth, window.innerHeight);
        window.camera.updateProjectionMatrix();
        window.renderer.setSize(window.innerWidth, window.innerHeight);

    }

}

//

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {

    var timer = Date.now() * 0.0001;

    camera.position.x = Math.cos(timer) * 200;
    camera.position.z = Math.sin(timer) * 200;
    camera.lookAt(window.scene.position);

    renderer.render(window.scene, window.camera);

}
function threeUpdate() {
// Maggie's unrandom cubes
//todo: keep an array of objects drawn from sensor data and remove them on update
//todo: label avatars

    if (typeof window.sensorData != 'undefined') {
        var material = new THREE.MeshLambertMaterial({ color: 0xffffff, shading: THREE.FlatShading, overdraw: true });

        var agents = window.sensorData.agents;
        for (var i = 0; i < agents.length; i++) {
            var cubeGeo = new THREE.CubeGeometry(5, 5, 5);
            var cube = new THREE.Mesh(cubeGeo, material);
            var parsedPos = agents[i].pos.replace("<", "").replace(">", "").split(",");
            cube.position.x = parsedPos[1] - 127.0;    // remember, vertical axis in three.js is Y
            cube.position.y = parsedPos[2] / 10;       // scale vertical position by ten for now
            cube.position.z = parsedPos[0] - 127.0;    // why are x and z reversed? I don't know.
            window.scene.add(cube);
        }
    }
}