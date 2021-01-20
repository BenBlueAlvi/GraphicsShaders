#version 330 compatibility

in vec2 vST;
in float vLightIntensity;

uniform float uAd;
uniform float uBd;
uniform float uTol;

void
main( )
{
	float Ar = uAd/2.;
	float Br = uBd/2.;
	int numins = int(vST.x / uAd);
	int numint = int(vST.y / uBd);
	float sc = numins * uAd + Ar;
	float tc = numint * uBd + Br;

	float d = pow((vST.x - sc) / Ar, 2) + pow((vST.y - tc) / Br,2);
	float t = smoothstep(1-uTol, 1+uTol, d);
	vec3 color = mix(vec3(1,0,0), vec3(1,1,1), t);
	color.x *= vLightIntensity;
	color.y *= vLightIntensity;
	color.z *= vLightIntensity;
	gl_FragColor = vec4(color,  1. );	
	
	

	
	
}