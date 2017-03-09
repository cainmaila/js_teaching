
require([
	"domReady",
	"Detector",
	"three/three.min"
], function (domReady) {
	"use strict";
	//==================================================================================
	var container,camera,renderer, scene, mesh, window_innerWidth, window_innerHeight, windowHalfX, windowHalfY;
	var BG_COLOR = 0x000000; //背景色
	domReady(function () {
		if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
		windowsRest();
		container = document.createElement( "div" );
		document.body.appendChild( container );
		camera = new THREE.PerspectiveCamera( 60, window_innerWidth / window_innerHeight, 1, 10000 );
		camera.position.z = 100;
		scene = new THREE.Scene();
		renderer = new THREE.WebGLRenderer();
		renderer.setClearColor( BG_COLOR );
		renderer.setSize( window_innerWidth, window_innerHeight );
		renderer.sortObjects = false;
		container.appendChild(renderer.domElement);
		//燈光
		var light = new THREE.DirectionalLight( 0xffffff, 1 );
		light.position.set( 1, 1, 1 ).normalize();
		scene.add( light );
		//模型
		
		var path = "lion/";
		var format = '.jpg';
		var urls = [  //右左上下前後
				path + '2' + format, path + '4' + format,
				path + '5' + format, path + '6' + format,
				path + '1' + format, path + '3' + format
			];

		var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );

		// Skybox

		var shader = THREE.ShaderLib[ "cube" ];
		shader.uniforms[ "tCube" ].value = reflectionCube;

		var material = new THREE.ShaderMaterial( {

			fragmentShader: shader.fragmentShader,
			vertexShader: shader.vertexShader,
			uniforms: shader.uniforms,
			depthWrite: false,
			side: THREE.BackSide

		} ),

		mesh = new THREE.Mesh( new THREE.BoxGeometry( 10000, 10000, 10000 ), material );
		scene.add( mesh );

		var texture = THREE.ImageUtils.loadTexture( 'npc.png' );
		//texture.anisotropy = renderer.getMaxAnisotropy();
		var geometry = new THREE.PlaneGeometry( 100, 120, 100 ); 
		var material = new THREE.MeshBasicMaterial( {map: texture, transparent: true, side: THREE.DoubleSide} ); 
		var plane = new THREE.Mesh( geometry, material ); 
		plane.position.z = -250;
		plane.position.y = -30;
		plane.position.x = 50;
		plane.lookAt(camera.position);
		scene.add( plane );

		plane = new THREE.Mesh( geometry, material ); 
		plane.position.z = -250;
		plane.position.y = -30;
		plane.position.x = 100;

		plane.lookAt(camera.position);
		scene.add( plane );
	
		//動畫
		onWindowResize();
		animate();
		window.addEventListener( 'resize', onWindowResize, false );	

		//Mouse
		document.addEventListener( 'mousedown', onDocumentMouseDown, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		//document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
	});
	var onPointerDownPointerX= 0,
		onPointerDownPointerY= 0,
		onPointerDownLon= 0,
		onPointerDownLat= 0,
		lon= 0,
		lat= 0;
	function onDocumentMouseDown( event ) {
		event.preventDefault();
		onPointerDownPointerX = event.clientX;
		onPointerDownPointerY = event.clientY;
		onPointerDownLon = lon;
		onPointerDownLat = lat;
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'mouseup', onDocumentMouseUp, false );

		//var gameCanvas = document.getElementById("container");
		//var gameCanvas = document.getElementById("canvas");
		if(container.requestFullScreen) {
	          container.requestFullScreen();
	     } else if(container.webkitRequestFullScreen ) {
	          container.webkitRequestFullScreen();
	     } else if(container.mozRequestFullScreen) {
	          container.mozRequestFullScreen();
	     }

	}
	function onDocumentTouchStart (event) {
		event.preventDefault();
		onPointerDownPointerX = event.changedTouches[0].pageX;
		onPointerDownPointerY = event.changedTouches[0].pageY;
		onPointerDownLon = lon;
		onPointerDownLat = lat;
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		document.addEventListener( 'touchend', onDocumentTouchEnd, false );
	}
	function onDocumentMouseMove( event ) {
		event.preventDefault();
		lon = ( event.clientX - onPointerDownPointerX ) * 0.1 + onPointerDownLon;
		lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
	}
	function onDocumentTouchMove (event) {
		event.preventDefault();
		lon = ( event.changedTouches[0].pageX - onPointerDownPointerX ) * 0.1 + onPointerDownLon;
		lat = ( event.changedTouches[0].pageY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

	}
	function onDocumentMouseUp( event ) {
		event.preventDefault();
		document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
		document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	}
	function onDocumentTouchEnd (event) {
		event.preventDefault();
		document.removeEventListener( 'touchmove', onDocumentTouchMove, false );
		document.removeEventListener( 'touchend', onDocumentTouchEnd, false );
	}
	var theta = 0,
		phi = 0;
	function animate () {
		requestAnimationFrame( animate );
		//動畫=================================
		theta = THREE.Math.degToRad( -lon );
		//camera.rotation.y = theta;
		lat = Math.max( - 30, Math.min( 10, lat ) );
		phi = THREE.Math.degToRad( 90 + lat );
		//camera.rotation.x = phi;
		camera.position.x = 100 * Math.sin( phi ) * Math.cos( theta );
		camera.position.y = 100 * Math.cos( phi );
		camera.position.z = 100 * Math.sin( phi ) * Math.sin( theta );
		camera.lookAt( scene.position );
		//=================================
		renderer.render( scene, camera );
	}

	function windowsRest() {
		//重置視窗數值
		window_innerWidth = window.innerWidth;
		window_innerHeight = window.innerHeight;
		windowHalfX = window_innerWidth >> 1;
		windowHalfY = window_innerHeight >> 1;
	}

	function onWindowResize() {
		windowsRest();
		camera.aspect = window_innerWidth / window_innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window_innerWidth, window_innerHeight );
	}

});