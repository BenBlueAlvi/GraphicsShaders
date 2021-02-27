#version 330 compatibility



uniform sampler2D uTexUnit;
in vec2 vST;
in vec3 vMC;


in vec4 E;

uniform float uKa;
uniform float uKd;
uniform float uKs;

uniform float uLightX;
uniform float uLightY;
uniform float uLightZ;
uniform float uShininess;

uniform vec4 uColor;
uniform vec4 uSpecularColor;


float distanceTo(vec2 p1, vec2 p2){
	return sqrt(pow(p1.s-p2.s, 2) + pow(p1.t - p2.t, 2));
}




void
main( )
{
	vec3 one = vec3(1,1,1);
	vec3 N = texture( uTexUnit, vST ).rgb * 2 - one;
	N = N * gl_NormalMatrix;
	
	vec3 L = vec3(uLightX, uLightY, uLightZ);
	
	
	
	vec3 ambient = uColor.rgb;
	vec3 diffuse = max( dot(L,N), 0. ) * uColor.rgb;
	vec3 R = normalize( reflect( -L, N ) );
	vec3 spec = uSpecularColor.rgb * pow( max( dot( R, E.xyz ), 0. ), uShininess );
	gl_FragColor.rgb = (uKa*ambient + uKd*diffuse + uKs*spec);
	gl_FragColor.a = 1;	

	

}