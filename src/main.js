import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, controls, scene, renderer, cube;

init();
animate();

function init() {

//scene

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xbfe3dd );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 400, 200, 0 );

// controls

	controls = new OrbitControls( camera, renderer.domElement );
	controls.listenToKeyEvents( window );

	controls.enableDamping = true;
	controls.dampingFactor = 0.05;

	controls.screenSpacePanning = false;

	controls.minDistance = 100;
	controls.maxDistance = 500;

	controls.maxPolarAngle = Math.PI / 2;

	window.addEventListener( 'resize', onWindowResize );

//cone-cube

	/*var cubeGeometry = new THREE.BoxGeometry (100,100,100);
	var cubeMaterial = new THREE.MeshBasicMaterial ({color: 0xC56E99});
	cube = new THREE.Mesh (cubeGeometry, cubeMaterial);
	cube.position.set (0, 25, 0);
	scene.add (cube);*/

	const geometry = new THREE.ConeGeometry( 100, 150, 4, 1 ); 
	const material = new THREE.MeshPhongMaterial( { color: 0xC56E99, flatShading: true } );
	//const material = new THREE.MeshBasicMaterial( {color: 0xC56E99} );
	const cone = new THREE.Mesh(geometry, material ); 
	cone.position.set(0,70,0);
	scene.add( cone );

// lights

	const dirLight1 = new THREE.DirectionalLight( 0xffffff, 3 );
	dirLight1.position.set( 1, 1, 1 );
	scene.add( dirLight1 );

	const dirLight2 = new THREE.DirectionalLight( 0x002288, 3 );
	dirLight2.position.set( -1, -1 , -1 );
	scene.add( dirLight2 );

	const ambientLight = new THREE.AmbientLight( 0x555555 );
	scene.add( ambientLight );

//plane

	var geo = new THREE.PlaneGeometry(900, 900, 8, 8);
	var mat = new THREE.MeshBasicMaterial({ color: 0x81B47C, side: THREE.DoubleSide });
	var plane = new THREE.Mesh(geo, mat);
	plane.position.set(0,0,0);
	plane.rotateX( - Math.PI / 2);
	scene.add(plane);

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	controls.update(); 

	render();

}

function render() {

	renderer.render( scene, camera );

}