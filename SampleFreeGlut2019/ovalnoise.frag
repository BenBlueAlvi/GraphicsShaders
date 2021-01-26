#version 330 compatibility

in vec2 vST;
in float vLightIntensity;

uniform float uAd;
uniform float uBd;
uniform float uTol;

uniform float uNoiseAmp;
uniform float uNoiseFreq;
uniform float uAlpha;

uniform sampler2D Noise2D;

void
main( )
{
	vec4 nv = texture(Noise2D, uNoiseFreq * vST);
	float n = nv.r + nv.g + nv.b + nv.a;
	n = (n - 2.);
	n *= uNoiseAmp;

	

	float Ar = uAd/2.;
	float Br = uBd/2.;
	int numins = int(vST.x / uAd);
	int numint = int(vST.y / uBd);
	float sc = numins * uAd + Ar;
	float tc = numint * uBd + Br;

	float ds = vST.x - sc;
	float dt = vST.y - tc;
	float oldDist = sqrt(ds*ds + dt*dt);
	float newDist = oldDist + n;
	float scale = newDist/oldDist;

	ds *= scale;
	ds /= Ar;
	dt *= scale;
	dt /= Br;



	float d = ds * ds + dt * dt;
	
	


	float t = smoothstep(1-uTol, 1+uTol, d);

	

	vec3 color = mix(vec3(1,0,0), vec3(1,1,1), t);
	float a = mix(uAlpha, 1, 1-t);
	color.x *= vLightIntensity;
	color.y *= vLightIntensity;
	color.z *= vLightIntensity;
	gl_FragColor = vec4(color,  a);	
	
	

	
	
}