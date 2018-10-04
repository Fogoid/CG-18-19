function createTableLeg(obj, x, y, z) {
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0x9a8470, wireframe: true });
    geometry = new THREE.CylinderGeometry(1,1,15,15);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createTableTop(obj, x, y, z) {
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0xbe9b7b, wireframe: true });
    geometry = new THREE.CubeGeometry(40, 2, 16);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createTable(x, y, z) {
    'use strict';

    var table = new THREE.Object3D();

    createTableTop(table, 0, 16, 0);
    createTableLeg(table, -18, 7.5, -6);
    createTableLeg(table, 18, 7.5, -6);
    createTableLeg(table, -18, 7.5, 6);
    createTableLeg(table, 18, 7.5, 6);

    scene.add(table);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}