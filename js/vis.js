function Visualizer() {
    // Babylon 3D renderer
    
    canvas = document.getElementById("renderCanvas"); // Get the canvas element 
    engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

    /******* Add the create scene function ******/
    var createScene = function () {

        // Create the scene space
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = BABYLON.Color3.Black();

        // Add a camera to the scene and attach it to the canvas
        var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,0), scene);
        camera.attachControl(canvas, true);
        camera.inputs.attached.mousewheel.wheelPrecision = 20.0;

        // Add lights to the scene
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

        // Add the unit cell
        var box = BABYLON.MeshBuilder.CreateBox("cube", {size:1, alpha: 0}, scene);
        var material_invisible = new BABYLON.StandardMaterial('invmat', scene);
        material_invisible.alpha = 0.0;
        box.enableEdgesRendering();    
        box.edgesWidth = 1.0;
        box.edgesColor = new BABYLON.Color4(1, 1, 1, 0.7);
        box.material = material_invisible;

        return scene;
    };
    /******* End of the create scene function ******/    

    var scene = createScene(); //Call the createScene function
     // Sprite manager for dots
    var dotmanager = new BABYLON.SpriteManager("dotManager", 
                                               "assets/circle.png", 
                                               512, 128, scene);
        
   

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () { 
            scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () { 
            engine.resize();
    });

    this.canvas = canvas;
    this.engine = engine;
    this.scene = scene;
    this.dotm = dotmanager;
    this.dots = [];

    this.addDot = function(x, y, z, c, s) {
        s = s || 0.05;
        c = c || new BABYLON.Color4(1,1,1,1);

        var dot = new BABYLON.Sprite("dot", this.dotm);

        dot.position.x = x;
        dot.position.y = y;
        dot.position.z = z;
        dot.color = c;
        dot.size = s;

        this.dots.push(dot);
    }

    this.moveDot = function(i, x, y, z) {
        var dot = this.dots[i];
        dot.position.x = x;
        dot.position.y = y;
        dot.position.z = z;        
    }

    this.clearDots = function() {
        for (var i = 0; i < this.dots.length; ++i) {
            this.dots[i].dispose();
        }
        this.dots = [];
    }
}