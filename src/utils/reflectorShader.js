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

  vertexShader: [
    "uniform mat4 textureMatrix;",
    "varying vec4 vUv;",

    "void main() {",

    "	vUv = textureMatrix * vec4( position, 1.0 );",

    "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}",
  ].join("\n"),

  fragmentShader: `
            uniform vec3 color;
            uniform sampler2D tDiffuse;
            uniform float iTime;
            varying vec4 vUv;

            float blendOverlay( float base, float blend ) {

                return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

            }

            vec3 blendOverlay( vec3 base, vec3 blend ) {

                return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

            }
            void main() {

             // https://www.shadertoy.com/view/Xltfzj

            float Pi = 6.28318530718; // Pi*2

            // GAUSSIAN BLUR SETTINGS {{{
            float Directions = 16.0; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
            float Quality = 6.0; // BLUR QUALITY (Default 4.0 - More is better but slower)
            vec2 Radius = vec2(0.07, 0.07);
            // GAUSSIAN BLUR SETTINGS }}}


            // Normalized pixel coordinates (from 0 to 1)
            // Pixel colour
            vec4 Color = texture2DProj(tDiffuse, vUv);

            // Blur calculations
            for( float d=0.0; d<Pi; d+=Pi/Directions)
            {
                for(float i=1.0/Quality; i<=1.0; i+=1.0/Quality)
                {
                    vec2 blurToAdd = vec2(cos(d),sin(d))*Radius*i;
                    Color += texture2DProj( tDiffuse, vUv.xyz + vec3(blurToAdd, 0.0));		
                }
            }

            // Output to screen
            Color /= Quality * Directions - 15.0;

            // WATER WARP : https://www.shadertoy.com/view/Xsl3zn

    
  
            // float freq = 3.0*sin(0.005*iTime);
            // vec3 warp = 0.5000*cos( vUv.xyz*1.0*freq + vec3(0.0,1.0, 1.0) + iTime ) +
            //             0.2500*cos( vUv.yxz*2.3*freq + vec3(1.0,2.0, 1.0) + iTime) +
            //             0.1250*cos( vUv.xyz*4.1*freq + vec3(5.0,3.0, 1.0) + iTime ) +
            //             0.0625*cos( vUv.yxz*7.9*freq + vec3(3.0,4.0, 1.0) + iTime );
                
            //   vec4 updatedvUv = vec4(vUv.xyz + warp*0.01, 1.0);

            //   vec4 warppedColor = texture2DProj( tDiffuse, updatedvUv );
            
            //   Color += warppedColor;

            gl_FragColor = vec4( blendOverlay( vec3(Color.rgb), color ), 1.0 );
            
            // gl_FragColor = vec4( sin(iTime), 0.0, 0.0, 1.0 );
          
          }
			`,
}

export default shader
