const shader = {
	uniforms: {
		color: {
			value: null,
		},

		tDiffuse: {
			value: null,
		},

		textureMatrix: {
			value: null,
		},
		iTime: {
			value: 0,
		},
	},

	vertexShader: `
			uniform mat4 textureMatrix;
			varying vec4 vUv;
			uniform mat4 World;

			out vec4 FragPos;

			void main() {
				vUv = textureMatrix * vec4( position, 1.0 );
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				FragPos = modelMatrix * vec4(position, 1.0);
			}
	`,

	fragmentShader: `
            uniform vec3 color;
            uniform sampler2D tDiffuse;
			uniform float iTime;
			uniform vec2 u_resolution;
			varying vec4 vUv;
			in vec4 FragPos;

            float blendOverlay( float base, float blend ) {

                return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

            }

            vec3 blendOverlay( vec3 base, vec3 blend ) {

                return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

			}

			// 2D Random
			float rand2D( in vec2 st ) {
				return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

			// 2D Noise based on Morgan McGuire @morgan3d
			// https://www.shadertoy.com/view/4dS3Wd
			float noise (in vec2 st) {
				vec2 i = floor(st);
				vec2 f = fract(st);

				// Four corners in 2D of a tile
				float a = rand2D(i);
				float b = rand2D(i + vec2(1.0, 0.0));
				float c = rand2D(i + vec2(0.0, 1.0));
				float d = rand2D(i + vec2(1.0, 1.0));

				// Smooth Interpolation

				// Cubic Hermine Curve.  Same as SmoothStep()
				vec2 u = f*f*(3.0-2.0*f);
				// u = smoothstep(0.,1.,f);

				// Mix 4 coorners percentages
				return mix(a, b, u.x) +
						(c - a)* u.y * (1.0 - u.x) +
						(d - b) * u.x * u.y;
			}

            void main() {

             // https://www.shadertoy.com/view/Xltfzj

            float Pi = 6.28318530718; // Pi*2

            // GAUSSIAN BLUR SETTINGS {{{
            float Directions = 16.0; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
            float Quality = 6.0; // BLUR QUALITY (Default 4.0 - More is better but slower)
            vec2 Radius = vec2(0.18, 0.18);
            // GAUSSIAN BLUR SETTINGS }}}


			// Noise calculation
			float noiseFactor = 0.4;
			float noiseValue = noise(vec2(FragPos.x * noiseFactor, FragPos.z * noiseFactor)) * 0.2;
			vec2 noiseRad = vec2(noiseValue, noiseValue);
			// vec3 Color = vec3(noiseValue, noiseValue, noiseValue);

            // Pixel colour
			vec4 Color = textureProj(tDiffuse, vUv);
			// vec4 Color = vec4(0.5, 0.5, 0.5, 1.0);

            // Blur calculations
            for( float d=0.0; d<Pi; d+=Pi/Directions)
            {
                for(float i=1.0/Quality; i<=1.0; i+=1.0/Quality)
                {
					vec2 blurToAdd = vec2(cos(d),sin(d)) * noiseRad * i;
					Color += textureProj( tDiffuse, vUv.xyz + vec3(blurToAdd, 0.0));
                }
			}
			
			// Darkening color depending on the noise
			vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
			float percent = noiseValue * 5.0;
			Color = mix(Color, black, percent);

            // Output to screen
            Color /= Quality * Directions - 15.0;

            gl_FragColor = vec4( blendOverlay( vec3(Color.rgb), color ), 1.0 );
          }
			`,
}

export default shader
