#version 330 compatibility

uniform float uSc;
uniform float uTc;
uniform float uRadius;
uniform float uMagFactor;
uniform float uRotAngle;
uniform sampler2D uImageUnit;
uniform float uSharpFactor;


in vec2	vST;


float distanceTo(vec2 p1, vec2 p2){
	return sqrt(pow(p1.s-p2.s, 2) + pow(p1.t - p2.t, 2));
}

vec3 sharpen(float resS, float resT, vec2 st){
	vec2 stp0 = vec2(1./resS, 0.);
	vec2 st0p = vec2(0, 1./resT);
	vec2 stpp = vec2(1./resS, 1./resT);
	vec2 stpm = vec2(1./resS, 1./resT);

	vec3 i00 = texture2D( uImageUnit, st ).rgb;
	vec3 im1m1 = texture2D( uImageUnit, st-stpp ).rgb;
	vec3 ip1p1 = texture2D( uImageUnit, st+stpp ).rgb;
	vec3 im1p1 = texture2D( uImageUnit, st-stpm ).rgb;
	vec3 ip1m1 = texture2D( uImageUnit, st+stpm ).rgb;
	vec3 im10 = texture2D( uImageUnit, st-stp0 ).rgb;
	vec3 ip10 = texture2D( uImageUnit, st+stp0 ).rgb;
	vec3 i0m1 = texture2D( uImageUnit, st-st0p ).rgb;
	vec3 i0p1 = texture2D( uImageUnit, st+st0p ).rgb;

	vec3 target = vec3(0.,0.,0.);
	target += 1.*(im1m1+ip1m1+ip1p1+im1p1);
	target += 2.*(im10+ip10+i0m1+i0p1);
	target += 4.*(i00);
	target /= 16.;
	return target;

}


void
main( )
{

	ivec2 ires = textureSize(uImageUnit, 0);
	float resS = float(ires.s);
	float resT = float(ires.t);
	vec2 resST = vec2(resS, resT);

	vec3 newcolor = texture( uImageUnit, vST ).rgb;
	vec2 pos = vec2(uSc, uTc);
	
	if (distanceTo(vST, vec2(uSc, uTc)) <= uRadius){
		vec2 nst = vST;
		vec2 luv = vec2(uRadius, uRadius);
		nst = (nst - pos) / uMagFactor + pos ;

		float s = sin(uRotAngle);
		float c = cos(uRotAngle);
		mat2 rotMat = mat2(c, s, -s, c);
	

		nst = rotMat * (nst - pos) + pos;
		  
	
		newcolor = texture( uImageUnit, nst ).rgb;
	
		vec3 sharpening = sharpen(resS, resT, nst);
		newcolor = mix(sharpening, newcolor, uSharpFactor);

	
	}
		

	gl_FragColor = vec4( newcolor, 1. );

}