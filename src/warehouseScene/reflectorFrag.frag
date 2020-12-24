uniform vec3 color;,
uniform sampler2D tDiffuse;,
varying vec4 vUv;,

float blendOverlay( float base, float blend ) {

    return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

}

vec3 blendOverlay( vec3 base, vec3 blend ) {

    return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ),blendOverlay( base.b, blend.b ) );

}

void main() {
    sampler2D tDiffuse =
    vec4 base = texture2DProj( tDiffuse, vUv );
    void gaussianBlur()
    {
        float Pi = 6.28318530718; // Pi*2
        
        // GAUSSIAN BLUR SETTINGS {{{
        float Directions = 16.0; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
        float Quality = 3.0; // BLUR QUALITY (Default 4.0 - More is better but slower)
        float Size = 8.0; // BLUR SIZE (Radius)
        // GAUSSIAN BLUR SETTINGS }}}
    
        vec2 Radius = [3.0, 3.0];
        
        // Normalized pixel coordinates (from 0 to 1)
        // Pixel colour
        vec4 Color = texture(tDiffuse, vUv.xy);
        
        // Blur calculations
        for( float d=0.0; d<Pi; d+=Pi/Directions)
        {
            for(float i=1.0/Quality; i<=1.0; i+=1.0/Quality)
            {
                Color += texture( tDiffuse, vUv.xy+vec2(cos(d),sin(d))*Radius*i);		
            }
        }
        
        // Output to screen
        Color /= Quality * Directions - 15.0;
        return Color;
    }

    vec4 blurryColor = gaussianBlur();
    gl_FragColor = vec4( blendOverlay( blurryColor.rgb, color ), 1.0 );
    // gl_FragColor = vec4(Math.sin(vUv.x), Math.sin(vUv.y), Math.sin(vUv.z), 1.0 );
}

//

void gaussianBlur(vec4 Color)
{
    float Pi = 6.28318530718; // Pi*2
    
    // GAUSSIAN BLUR SETTINGS {{{
    float Directions = 16.0; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
    float Quality = 3.0; // BLUR QUALITY (Default 4.0 - More is better but slower)
    float Size = 8.0; // BLUR SIZE (Radius)
    // GAUSSIAN BLUR SETTINGS }}}
   
    vec2 Radius = [3.0, 3.0];
    
    // Normalized pixel coordinates (from 0 to 1)
    // Pixel colour
    vec4 Color = texture(tDiffuse, vUv.xy);
    
    // Blur calculations
    for( float d=0.0; d<Pi; d+=Pi/Directions)
    {
		for(float i=1.0/Quality; i<=1.0; i+=1.0/Quality)
        {
			Color += texture( tDiffuse, vUv.xy+vec2(cos(d),sin(d))*Radius*i);		
        }
    }
    
    // Output to screen
    Color /= Quality * Directions - 15.0;
    return Color;
}


// void mainImage( out vec4 fragColor, in vec2 fragCoord )
// {
//     float Pi = 6.28318530718; // Pi*2
    
//     // GAUSSIAN BLUR SETTINGS {{{
//     float Directions = 16.0; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
//     float Quality = 3.0; // BLUR QUALITY (Default 4.0 - More is better but slower)
//     float Size = 8.0; // BLUR SIZE (Radius)
//     // GAUSSIAN BLUR SETTINGS }}}
   
//     vec2 Radius = Size/iResolution.xy;
    
//     // Normalized pixel coordinates (from 0 to 1)
//     vec2 uv = fragCoord/iResolution.xy;
//     // Pixel colour
//     vec4 Color = texture(tDiffuse, uv);
    
//     // Blur calculations
//     for( float d=0.0; d<Pi; d+=Pi/Directions)
//     {
// 		for(float i=1.0/Quality; i<=1.0; i+=1.0/Quality)
//         {
// 			Color += texture( tDiffuse, uv+vec2(cos(d),sin(d))*Radius*i);		
//         }
//     }
    
//     // Output to screen
//     Color /= Quality * Directions - 15.0;
//     fragColor =  Color;
// }



