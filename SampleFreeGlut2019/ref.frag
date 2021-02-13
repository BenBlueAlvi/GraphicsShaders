uniform float uMix;
uniform samplerCube uReflectUnit;
uniform samplerCube uRefractUnit;
in float vLightIntensity;
in vec3 vRefractVector;
in vec3 vReflectVector;
const vec4 WHITE = vec4( 1.,1.,1.,1. );
void main( )
{
	vec4 refractcolor = textureCube( uRefractUnit, vRefractVector );
	vec4 reflectcolor = textureCube( uReflectUnit, vReflectVector );
	refractcolor = mix( refractcolor, WHITE, 0.30 );
	gl_FragColor = mix( refractcolor, reflectcolor, uMix );
}