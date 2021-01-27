#version 330 compatibility

in vec2 vST;
in vec3 vMC;
in float vLightIntensity;
in vec3 N;
in vec4 E;


uniform float uK;
uniform float uP;
uniform float uNoiseAmp;
uniform float uNoiseFreq;
uniform float uKa;
uniform float uKd;
uniform float uKs;

uniform float uLightX;
uniform float uLightY;
uniform float uLightZ;
uniform float uShininess;

uniform vec4 uColor;
uniform vec4 uSpecularColor;


uniform sampler2D Noise2D;


void
main( )
{

	
	vec3 color = vec3(uColor.x * vLightIntensity, uColor.y * vLightIntensity, uColor.z * vLightIntensity);
	
	vec3 L = vec3(uLightX, uLightY, uLightZ);
	
	//float LightIntensity = dot(normalize(vec3(uLightX, uLightY, uLightZ) - vMC),N);
	
	vec3 ambient = uColor.rgb;
	vec3 diffuse = max( dot(L,N), 0. ) * uColor.rgb;
	vec3 R = normalize( reflect( -L, N ) );
	vec3 spec = uSpecularColor.rgb * pow( max( dot( R, E.xyz ), 0. ), uShininess );
	gl_FragColor.rgb = (uKa*ambient + uKd*diffuse + uKs*spec);
	gl_FragColor.a = 1;
	

	
	
}