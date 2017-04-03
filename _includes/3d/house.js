
        if (!Detector.webgl) {
            Detector.addGetWebGLMessage();
        }

        var container;

        var camera, controls, scene, renderer;
        var lighting, ambient, keyLight, fillLight, backLight;

        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        
        var width = 600;
        var height = 400;
        
        /* Files */
        var PATH = '/files/3d/';
//        var SCENE = 'female-croupier-2013-03-26';
        var SCENE = 'house';
//        SCENE = 'Bambo_House'
        
        init();
        animate();

        function init() {

            container = document.getElementById('div3d');
                        
            /* Camera */

            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.z = 3;

            /* Scene */

            scene = new THREE.Scene();
            lighting = false;

            ambient = new THREE.AmbientLight(0xffffff, 0.25);

            keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
            keyLight.position.set(-100, 0, 100);

            fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
            fillLight.position.set(100, 0, 100);

            backLight = new THREE.DirectionalLight(0xffffff, 1.0);
            backLight.position.set(100, 0, -100).normalize();
            
            scene.add(ambient);
            scene.add(keyLight);
            scene.add(fillLight);
            scene.add(backLight);
            /* Model */
            
			var onProgress = function ( xhr ) {
				if ( xhr.lengthComputable ) {
					var percentComplete = xhr.loaded / xhr.total * 100;
					console.log( Math.round(percentComplete, 2) + '% downloaded' );
				}
			};

			var onError = function ( xhr ) { };

			THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

			var mtlLoader = new THREE.MTLLoader();
			mtlLoader.setBaseUrl(PATH);
            mtlLoader.setPath(PATH);
            mtlLoader.load(SCENE+'.mtl', function (materials) {

				materials.preload();

				var objLoader = new THREE.OBJLoader();
				objLoader.setMaterials( materials );
				objLoader.setPath(PATH);
                objLoader.load(SCENE+'.obj', function ( object ) {
					object.position.x = 0;
                    object.position.y = 0;
                    object.position.z = 0;
                    object.scale.set(0.05, 0.05, 0.05);
                    scene.add(object);

				}, onProgress, onError );

			});
            
            

            /* Renderer */

            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            //renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setSize(width, height);
            renderer.setClearColor(new THREE.Color("hsl(0, 100%, 100%)"));

            container.appendChild(renderer.domElement);

            /* Controls */

            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.enableZoom = true;

            /* Events */

            window.addEventListener('resize', onWindowResize, false);

        }

        function onWindowResize() {

            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            //renderer.setSize(window.innerWidth, window.innerHeight);

        }


        function animate() {

            requestAnimationFrame(animate);

            controls.update();

            render();

        }

        function render() {

            renderer.render(scene, camera);

        }

