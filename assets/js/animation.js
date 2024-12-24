(function() {
  var Util,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Util = (function() {
    function Util() {}

    Util.prototype.extend = function(custom, defaults) {
      var key, value;
      for (key in custom) {
        value = custom[key];
        if (value != null) {
          defaults[key] = value;
        }
      }
      return defaults;
    };

    Util.prototype.isMobile = function(agent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
    };

    return Util;

  })();

  this.WOW = (function() {
    WOW.prototype.defaults = {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true
    };

    function WOW(options) {
      if (options == null) {
        options = {};
      }
      this.scrollCallback = __bind(this.scrollCallback, this);
      this.scrollHandler = __bind(this.scrollHandler, this);
      this.start = __bind(this.start, this);
      this.scrolled = true;
      this.config = this.util().extend(options, this.defaults);
    }

    WOW.prototype.init = function() {
      var _ref;
      this.element = window.document.documentElement;
      if ((_ref = document.readyState) === "interactive" || _ref === "complete") {
        return this.start();
      } else {
        return document.addEventListener('DOMContentLoaded', this.start);
      }
    };

    WOW.prototype.start = function() {
      var box, _i, _len, _ref;
      this.boxes = this.element.getElementsByClassName(this.config.boxClass);
      if (this.boxes.length) {
        if (this.disabled()) {
          return this.resetStyle();
        } else {
          _ref = this.boxes;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            box = _ref[_i];
            this.applyStyle(box, true);
          }
          window.addEventListener('scroll', this.scrollHandler, false);
          window.addEventListener('resize', this.scrollHandler, false);
          return this.interval = setInterval(this.scrollCallback, 50);
        }
      }
    };

    WOW.prototype.stop = function() {
      window.removeEventListener('scroll', this.scrollHandler, false);
      window.removeEventListener('resize', this.scrollHandler, false);
      if (this.interval != null) {
        return clearInterval(this.interval);
      }
    };

    WOW.prototype.show = function(box) {
      this.applyStyle(box);
      return box.className = "" + box.className + " " + this.config.animateClass;
    };

    WOW.prototype.applyStyle = function(box, hidden) {
      var delay, duration, iteration;
      duration = box.getAttribute('data-wow-duration');
      delay = box.getAttribute('data-wow-delay');
      iteration = box.getAttribute('data-wow-iteration');
      return box.setAttribute('style', this.customStyle(hidden, duration, delay, iteration));
    };

    WOW.prototype.resetStyle = function() {
      var box, _i, _len, _ref, _results;
      _ref = this.boxes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        box = _ref[_i];
        _results.push(box.setAttribute('style', 'visibility: visible;'));
      }
      return _results;
    };

    WOW.prototype.customStyle = function(hidden, duration, delay, iteration) {
      var style;
      style = hidden ? "visibility: hidden; -webkit-animation-name: none; -moz-animation-name: none; animation-name: none;" : "visibility: visible;";
      if (duration) {
        style += "-webkit-animation-duration: " + duration + "; -moz-animation-duration: " + duration + "; animation-duration: " + duration + ";";
      }
      if (delay) {
        style += "-webkit-animation-delay: " + delay + "; -moz-animation-delay: " + delay + "; animation-delay: " + delay + ";";
      }
      if (iteration) {
        style += "-webkit-animation-iteration-count: " + iteration + "; -moz-animation-iteration-count: " + iteration + "; animation-iteration-count: " + iteration + ";";
      }
      return style;
    };

    WOW.prototype.scrollHandler = function() {
      return this.scrolled = true;
    };

    WOW.prototype.scrollCallback = function() {
      var box;
      if (this.scrolled) {
        this.scrolled = false;
        this.boxes = (function() {
          var _i, _len, _ref, _results;
          _ref = this.boxes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            box = _ref[_i];
            if (!(box)) {
              continue;
            }
            if (this.isVisible(box)) {
              this.show(box);
              continue;
            }
            _results.push(box);
          }
          return _results;
        }).call(this);
        if (!this.boxes.length) {
          return this.stop();
        }
      }
    };

    WOW.prototype.offsetTop = function(element) {
      var top;
      top = element.offsetTop;
      while (element = element.offsetParent) {
        top += element.offsetTop;
      }
      return top;
    };

    WOW.prototype.isVisible = function(box) {
      var bottom, offset, top, viewBottom, viewTop;
      offset = box.getAttribute('data-wow-offset') || this.config.offset;
      viewTop = window.pageYOffset;
      viewBottom = viewTop + this.element.clientHeight - offset;
      top = this.offsetTop(box);
      bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
    };

    WOW.prototype.util = function() {
      return this._util || (this._util = new Util());
    };

    WOW.prototype.disabled = function() {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    };

    return WOW;

  })();

}).call(this);


wow = new WOW(
  {
    animateClass: 'animated',
    offset: 50
  }
);
wow.init();




















const particleVertex = `
  attribute float scale;
	uniform float uTime;

	void main() {
		vec3 p = position;
    float s = scale;

    p.y += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
    p.x += (sin(p.y + uTime) * 0.5);
    s += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;

		vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
		gl_PointSize = s * 15.0 * (1.0 / -mvPosition.z);
		gl_Position = projectionMatrix * mvPosition;
	}
`;

const particleFragment = `
	void main() {
		gl_FragColor = vec4(1.0, 1.0, 1.0, 0.5);
	}
`;

function lerp(start, end, amount) {
	return (1 - amount) * start + amount * end;
};

class Canvas {
	constructor() {
		this.config = {
			canvas: document.querySelector('#c'),
			winWidth: window.innerWidth,
			winHeight: window.innerHeight,
			aspectRatio: window.innerWidth / window.innerHeight,
			mouse: new THREE.Vector2(-10, -10)
		};

		this.onResize = this.onResize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
		this.animate = this.animate.bind(this);

		this.initCamera();
		this.initScene();
		this.initRenderer();

		this.initParticles();

		this.bindEvents();
		this.animate();
	}

	bindEvents() {
		window.addEventListener('resize', this.onResize);
		window.addEventListener('mousemove', this.onMouseMove, false);
	}

	initCamera() {
		this.camera = new THREE.PerspectiveCamera(75, this.config.aspectRatio, 0.01, 1000);
		this.camera.position.set(0, 6, 5);
	}

	initControls() {
		this.controls = new OrbitControls(this.camera, this.config.canvas);
	}

	initScene() {
		this.scene = new THREE.Scene();
	}

	initRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.config.canvas,
			antialias: true,
      // alpha: true
		});
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.config.winWidth, this.config.winHeight);
	}

	initParticles() {
    const gap = 0.3;
    const amountX = 200;
    const amountY = 200;
    const particleNum = amountX * amountY;
		const particlePositions = new Float32Array(particleNum * 3);
    const particleScales = new Float32Array(particleNum);
    let i = 0;
    let j = 0;

    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        particlePositions[i] = ix * gap - ((amountX * gap) / 2);
        particlePositions[i + 1] = 0;
        particlePositions[i + 2] = iy * gap - ((amountX * gap) / 2);
        particleScales[j] = 1;
        i += 3;
        j++;
      }
    }

		this.particleGeometry = new THREE.BufferGeometry();
		this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    this.particleGeometry.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

		this.particleMaterial = new THREE.ShaderMaterial({
			transparent: true,
			vertexShader: particleVertex,
			fragmentShader: particleFragment,
			uniforms: {
				uTime: { type: 'f', value: 0 }
			}
		});
		this.particles = new THREE.Points(this.particleGeometry, this.particleMaterial);
		this.scene.add(this.particles);
	}

	render() {
		this.camera.lookAt(this.scene.position);
		this.renderer.render(this.scene, this.camera);
	}

	animate() {
		this.particleMaterial.uniforms.uTime.value += 0.05;
		requestAnimationFrame(this.animate);
		this.render();
	}

	onMouseMove(e) {
		this.config.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
		this.config.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
	}

	onResize() {
		this.config.winWidth = window.innerWidth;
		this.config.winHeight = window.innerHeight;
		this.camera.aspect = this.config.winWidth / this.config.winHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.config.winWidth, this.config.winHeight);
	}
}

new Canvas();