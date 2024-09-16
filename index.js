import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class PickHelper {
	constructor() {
		this.canPick = true;
		this.raycaster = new THREE.Raycaster();
		this.pickedObject = null;
		this.pickedObjectColor = 0;
	}

	pick(normalizedPosition, scene, camera) {
		if(this.pickedObject) {
			this.pickedObject.material.color.setHex(this.pickedObjectColor);
			this.pickedObject = undefined;
		}

		this.raycaster.setFromCamera(normalizedPosition, camera);
		const intersectedObjects = this.raycaster.intersectObjects(scene.children);

		if(intersectedObjects.length && buttons.includes(intersectedObjects[0].object) && this.canPick) {
			this.pickedObject = intersectedObjects[0].object;
			this.pickedObjectColor = this.pickedObject.material.color.getHex();
			this.pickedObject.material.color.setHex(0xfce307);
		}
	}
	disablePicking() { this.canPick = false; }
	enablePicking() { this.canPick = true; }
}

const correctCombinations = ['1111', '2121', '2312', '1123', '3312', '1133'];
const videoURL = [
	{url: "/spaceoddity.mp4",             name: "David Bowie – Space Oddity (Official Video)", 
		link: "https://www.youtube.com/watch?v=iYYRH4apXDo&pp=ygUMc3BhY2Ugb2RkaXR5"},
	{url: "/jerma985.mp4",                name: "jerma985 corecore" ,
		link: "https://www.youtube.com/watch?v=Qq9INFtrYS4"},
	{url: "/mbvonlyshallow.mp4",          name: "My Bloody Valentine - Only Shallow (Official Music Video)", 
		link: "https://www.youtube.com/watch?v=FyYMzEplnfU"},
	{url: "/housekaraoke.mp4",            name: "House, Chase, Foreman at karaoke bar singing Midnight Train to Georgia[HQ]" , 
		link: "https://www.youtube.com/watch?v=BVGGG2J0_7M"},
	{url: "/atbulaivaikstantisvyras.mp4", name: "Šilutės gyventojus gąsdino atbulai vaikštantis vyras", 
		link: "https://www.youtube.com/watch?v=04y5UY8y09M"},
	{url: "/27.mp4",                      name: "27", 
		link: "https://www.youtube.com/watch?v=dLRLYPiaAoA&pp=ygUKMjcgZXh1cmJpYQ%3D%3D"},
	{url: "/communityclip.mp4",           name: "Community La Biblioteca Spanish Rap HD", 
		link: "https://www.youtube.com/watch?v=j25tkxg5Vws&pp=ygUYZG9uZGUgZXN0YSBsYSBiaWJsaW90ZWNh"},
	{url: "/proteinshake.mp4",            name: "protein shake", 
		link: "https://www.youtube.com/watch?v=Gh9Dv5D5aCM&t=5s&pp=ygUNcHJvdGVpbiBzaGFrZQ%3D%3D"},
	{url: "/itschoademydear.mp4",         name: "Connan Mockasin - It's Choade My Dear (2010) [Music Video]", 
		link: "https://www.youtube.com/watch?v=HkNwuY2JUHQ"},
	{url: "/garbageguardians.mp4",        name: "TF2: Garbage Guardians", 
		link: "https://www.youtube.com/watch?v=oAmk9Qq8-XQ&t=183s"},
	{url: "/itsallsoupnow.mp4",           name: "King Krule - it’s all Soup now", 
		link: "https://www.youtube.com/watch?v=RK77B-oE378"},
	{url: "/makeitinstantlygroove.mp4",   name: "make it instantly groove", 
		link: "https://www.youtube.com/watch?v=DXiBB7FvLvg&pp=ygUhc3ludGhuZXQgbWFrZSBpdCBpbnN0YW50bHkgZ3Jvb3Zl"},
];

const secretURL = [
	{url:"/meetthespy.mp4", name:"Meet the Spy", link: "https://www.youtube.com/watch?v=OR4N5OhcY9s"},
	{url:"/heavyisdead.mp4", name:"Heavy is Dead", link: "https://www.youtube.com/watch?v=oiuyhxp4w9I&rco=1"},
	{url:"/joshhutcherson.mp4", name: " Josh Hutcherson || Whistle", link: "https://www.youtube.com/watch?v=BbeeuzU5Qc8"},
	{url:"/threatlevelmidnight.mp4", name: "Threat Level Midnight - Full Movie (EXCLUSIVE) - The Office US", link: "https://youtu.be/7iPyz6Yqwl4?si=36-lIWPZ9PQki5gA"},
	{url:"/ninjaturtles.mp4", name: "Banned German Ninja Turtles Commercial", link: "https://youtu.be/jC3pGcRHeQ0?si=HTxSKrZ6aABotfbj"},
	{url:"/everyhousemd.mp4", name: "Every episode of House M.D (original Audio)", link: "https://www.youtube.com/watch?v=ry-Z6_yfZoE"},
];
const TVStatic = '/tvstatic.mp4';
const darkScreen = '/darkscreen.mp4';
let lastPlayedVideo = videoURL[0];
const textDisplay = document.getElementById('link');
textDisplay.textContent = 'Nothing!';

let audioOn = document.getElementById('on');
let audioOff = document.getElementById('off');
let audioSwitch = document.getElementById('switch');
let audioClick = document.getElementById('click');
let audioVhs = document.getElementById('vhs');

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.domElement.style.height = '100%';
renderer.domElement.style.width = '100%';
renderer.domElement.style.display ='block';

const fov = 45;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera( fov, window.innerWidth/window.innerHeight, near, far );
camera.position.set( 0, 2, 5 );
camera.lookAt(0, 0, 0);

const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0, 0 );
controls.enableZoom = false;
controls.enablePan = false;
const polarang = controls.getPolarAngle();
controls.maxPolarAngle = polarang;
controls.minPolarAngle = polarang;
controls.update();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const video = document.querySelector('#video');
video.onloadeddata = function() {
	video.play();
};
const pickPosition = {x: 0, y: 0};
clearPickPosition();

setupPointLight(new THREE.Vector3(2, -1, 5));
setupPointLight(new THREE.Vector3(-2, -1, 5));

let planes = [];
let lights = [];
createBackground();
const stars = createStarryBackground(350);

let combination = '';
let powerButton;
let powerButtonColor;
const buttons = [];
let pushedButton;
loadTV();
let tvON = false;
const input = document.querySelector('#input');
input.addEventListener('change', readVideo);

const pickHelper = new PickHelper();

document.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mousemove', setPickPosition);
window.addEventListener('mouseout', clearPickPosition);
window.addEventListener('mouseleave', clearPickPosition);
window.addEventListener('touchstart', (event) => {
	event.preventDefault();
	setPickPosition(event.touches[0]);
}, {passive: false});
   
window.addEventListener('touchmove', (event) => {
	setPickPosition(event.touches[0]);
});
   
window.addEventListener('touchend', clearPickPosition);
window.onresize = function () {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

};

renderer.setAnimationLoop(render);

function createBackground() {
	const width = 2;
	const height = 7;
	const geometry = new THREE.PlaneGeometry(width, height);
	const z = -4;
	const y = -2;
	const RED = new THREE.Color(0xAA0000), GREEN = new THREE.Color(0x00AA00), BLUE = new THREE.Color(0x0000AA);

	
	lights.push(makeLight(RED, new THREE.Vector3(-3, y+6, z-40)));
	lights.push(makeLight(GREEN, new THREE.Vector3(0, y+6, z-50)));
	lights.push(makeLight(BLUE, new THREE.Vector3(3, y+6, z-40)))
}

function createStarryBackground(numStars) {
	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute('position', new THREE.BufferAttribute(getRandomPos(numStars), 3));
	const loader = new THREE.TextureLoader();
	const material = new THREE.PointsMaterial({color: 0xFFFFFF, map: loader.load('star.png'), size: 0.5});
	const mesh = new THREE.Points(geometry, material);
	scene.add(mesh);
	return mesh;
}
function getRandomPos(num) {
	const arr = new Float32Array(num * 3);
	for(let i = 0; i < num; i++) {
		let pos = (Math.random() - 0.5) * 100;
		arr[i] = pos;
	}
	return arr;
}
function makeLight(color, pos) {
	const light = new THREE.DirectionalLight(color, 1);
	light.position.set(pos.x, pos.y, pos.z);
	light.target.position.set(0, 0, 0);
	scene.add(light);
	scene.add(light.target);
	return light;
}
function makePlane(geometry, color, pos) {
	const material = new THREE.MeshStandardMaterial({color: color, emissive: color, side: THREE.DoubleSide});
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(pos.x, pos.y, pos.z);
	scene.add(mesh);
	return mesh;
}

function setupPointLight(pos) {
	const color = 0xFFFFFF;
	const intensity = 30;
	const light = new THREE.PointLight( color, intensity, 50 );
	light.position.set(pos.x, pos.y, pos.z);
	scene.add( light );
}

function loadTV() {
	const gltfLoader = new GLTFLoader();
	gltfLoader.load( '/tv.gltf', ( gltf ) => {

		const root = gltf.scene;
		root.rotation.y = Math.PI;
		scene.add(root);

		const screen = root.getObjectByName('Screen');
		const tscreen = screen.clone();

		tscreen.position.z += 1.92;
		tscreen.rotation.y = Math.PI;
		scene.add(tscreen);

		const obj = root.getObjectByName('TV');

		for(const button of obj.children)
		{
			if(button.name.includes('Button')) {
				button.rotation.x = Math.PI/6;
			}
			buttons.push(button);
		}
		obj.getObjectByName('Knob1').rotation.y = -2*Math.PI/3;
		pushedButton = obj.getObjectByName('Button1');
		pushedButton.rotation.x = 0;

		powerButton = obj.getObjectByName('PowerButton');
		powerButtonColor = powerButton.material.color.getHex();
		const videoTexture = new THREE.VideoTexture(video);
		videoTexture.colorSpace = THREE.SRGBColorSpace;	
		
		const videoMaterial = new THREE.MeshBasicMaterial({map: videoTexture, side: THREE.FrontSide, toneMapped: false});
		videoMaterial.needsUpdate = true;
		screen.material = videoMaterial;

		tscreen.material = new THREE.MeshPhysicalMaterial({
			color: 0x000000, 
			opacity: 0.5, 
			transparent: true, 
			roughness: 0.4
		});
	} );
}

function readVideo(event) {
	if(event.target.files && event.target.files[0]) {
		const reader = new FileReader();
		reader.readAsArrayBuffer(event.target.files[0]);
		reader.onload = function(e) {
			let buffer = e.target.result;
			let videoBlob = new Blob([new Uint8Array(buffer)], { type: 'video/mp4' });
			let url = window.URL.createObjectURL(videoBlob);
			video.setAttribute('src', url);
			textDisplay.setAttribute('href', '#');
			textDisplay.textContent = 'From files';
			video.load();
			audioVhs.play();
		}.bind(this)		
	}
}

function getCanvasRelativePosition(event) {
	const rect = renderer.domElement.getBoundingClientRect();
	return {
		x: (event.clientX - rect.left) * renderer.domElement.width / rect.width,
		y: (event.clientY - rect.top ) * renderer.domElement.height / rect.height,
	};
}

function setPickPosition(event) {
	const pos = getCanvasRelativePosition(event);
	pickPosition.x = (pos.x / renderer.domElement.width ) *  2 - 1;
	pickPosition.y = (pos.y / renderer.domElement.height) * -2 + 1;
}

function clearPickPosition() {
	pickPosition.x = -10000;
	pickPosition.y = -10000;
}

function onMouseDown(e) {
	if(pickHelper.pickedObject) {		
		if(e.which == 1) {
			switch(pickHelper.pickedObject.name) {			
				case 'PowerButton':
					tvPowerHandler();
					break;
				case 'DVD':
					playDVD();
					break;
				case 'Button1':
					changeVideo(0, pickHelper.pickedObject);
					break;
				case 'Button2':
					changeVideo(1, pickHelper.pickedObject);
					break;
				case 'Button3':
					changeVideo(2, pickHelper.pickedObject);
					break;
				case 'Button4':
					changeVideo(3, pickHelper.pickedObject);
					break;
				case 'Button5':
					changeVideo(4, pickHelper.pickedObject);
					break;
				case 'Button6':
					changeVideo(5, pickHelper.pickedObject);
					break;
				case 'Button7':
					changeVideo(6, pickHelper.pickedObject);
					break;
				case 'Button8':
					changeVideo(7, pickHelper.pickedObject);
					break;
				case 'Button9':
					changeVideo(8, pickHelper.pickedObject);
					break;
				case 'Button10':
					changeVideo(9, pickHelper.pickedObject);
					break;
				case 'Button11':
					changeVideo(10, pickHelper.pickedObject);
					break;
				case 'Button12':
					changeVideo(11, pickHelper.pickedObject);
					break;
				case 'Knob1':
					pickHelper.pickedObject.rotation.y += 2*Math.PI/15;
					if(pickHelper.pickedObject.rotation.y > 2*Math.PI/3) {
						pickHelper.pickedObject.rotation.y = 2*Math.PI/3;
					}
					video.volume = THREE.MathUtils.clamp(video.volume - 0.1, 0, 1);
					break;
				case 'Comb1':
					checkCombination('1');
					break;
				case 'Comb2':
					checkCombination('2');
					break;
				case 'Comb3':
					checkCombination('3');
					break;
			}		
		}
		if(e.which == 3) {
			switch(pickHelper.pickedObject.name) {
				case 'Knob1':
					pickHelper.pickedObject.rotation.y -= 2*Math.PI/15;
					if(pickHelper.pickedObject.rotation.y < -2*Math.PI/3) {
						pickHelper.pickedObject.rotation.y = -2*Math.PI/3;
					}
					video.volume = THREE.MathUtils.clamp(video.volume + 0.1, 0, 1);
					break;
			}
		}
	}
}

function checkCombination(val) {
	if(tvON) {
		let allowPicking = true;
		audioClick.play();
		pickHelper.disablePicking();
		setTimeout(() => {
			if(allowPicking) {
				pickHelper.enablePicking();
			}
		}, 500);
		combination += val;
		if(combination.length == 4) {
			let k = 0;
			const GREEN = 0x00FF00;
			const RED = 0xFF0000;
			let colorToUse = RED;
			let videoToPlay = -1;
			powerButton.material.color.setHex(powerButtonColor);
			allowPicking = false;
			pickHelper.disablePicking();
			if(correctCombinations.includes(combination)) {
				colorToUse = GREEN;
				video.setAttribute('src', TVStatic);
				switch(combination) {
					case correctCombinations[0]:
						videoToPlay = 0;
						break;
					case correctCombinations[1]:
						videoToPlay = 1;
						break;
					case correctCombinations[2]:
						videoToPlay = 2;
						break;
					case correctCombinations[3]:
						videoToPlay = 3;
						break;
					case correctCombinations[4]:
						videoToPlay = 4;
						break;
					case correctCombinations[5]:
						videoToPlay = 5;
						break;
				}
			}
			
			const interval = setInterval(function (){
				k++;
				changeColor(powerButtonColor, colorToUse, powerButton);
				if(k > 6) {
					changeVideo(videoToPlay, undefined, secretURL);
					clearInterval(interval);
					pickHelper.enablePicking();
					powerButton.material.color.setHex(RED);
				}
			}, 500);
			combination = '';
		}
	}	
}

function changeColor(savedColor, color, obj) {
		if(obj.material.color.getHex() === savedColor) {
			obj.material.color.setHex(color);
		} 
		else { 
			obj.material.color.setHex(savedColor);
		}
}

function playDVD() {
	if(tvON) {
		

		setTimeout(() => {
			input.click();
		}, 300);
		
	}		
}

function tvPowerHandler() {
	if(!tvON) {
		audioOn.play();
		tvON = true;
		pickHelper.pickedObjectColor = 0xFF0000;
		video.setAttribute('src', lastPlayedVideo.url);
		textDisplay.setAttribute('href', lastPlayedVideo.link);
		textDisplay.textContent = lastPlayedVideo.name
	}
	else {
		audioOff.play();
		lastPlayedVideo = {url: video.getAttribute('src'), name: textDisplay.textContent, link: textDisplay.getAttribute('href')};
		video.setAttribute('src', darkScreen);
		textDisplay.setAttribute('href', '#');
		tvON = false;
		textDisplay.textContent = 'Nothing!';
		pickHelper.pickedObjectColor = powerButtonColor;
	}
}

function changeVideo(index, button = undefined, videoArr = videoURL) {
	if(index < 0) return;
	if(video.getAttribute('src') !== videoArr[index].url && tvON) {
		audioSwitch.play();
		video.setAttribute('src', videoArr[index].url);
		textDisplay.setAttribute('href', videoArr[index].link);
		textDisplay.textContent = videoArr[index].name;
		if(button) {
			pushedButton.rotation.x = Math.PI/6;
			button.rotation.x = 0;
			pushedButton = button;
		} 
		else {
			pushedButton.rotation.x = Math.PI/6;
		}		
	}
}

function render(time) {
	pickHelper.pick(pickPosition, scene, camera);
	stars.rotation.x = -time/100000;
	stars.rotation.y = time/100000; 
	renderer.render( scene, camera );
}