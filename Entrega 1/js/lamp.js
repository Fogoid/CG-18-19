//Function used to create the base of the lamp
function createLampBase(obj, x, y, z){
  'use strict';

  var material = new THREE.MeshBasicMaterial({ color: 0xdfdfde, wireframe: true });
  geometry = new THREE.CylinderGeometry(5,5,1,30);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

//Function used to create the post of the lamp
function createLampPost(obj, x, y, z){
  'use strict';

  var material = new THREE.MeshBasicMaterial({ color: 0xdfdfde, wireframe: true });
  geometry = new THREE.CylinderGeometry(0.5,0.5,30);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

//Function used to create the lampshade of the lamp
function createLampLampshade(obj, x, y, z){
  'use strict';

  geometry = new THREE.CylinderGeometry(3,3,5,30,1,true);
  var material = new THREE.MeshBasicMaterial({ color: 0xa2798f, wireframe: true });
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function createLamp(x, y, z){
  'use strict';

  var lamp = new THREE.Object3D();

  //material = new THREE.MeshBasicMaterial({ color: 0xdfdfde, wireframe: true });

  createLampBase(lamp, 0, 0.5, 0);
  createLampPost(lamp, 0, 16, 0);
  createLampLampshade(lamp, 0, 32, 0);

  scene.add(lamp);

  lamp.position.x = x;
  lamp.position.y = y;
  lamp.position.z = z;
}

