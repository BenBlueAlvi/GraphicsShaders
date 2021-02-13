uniform float uEta;
out float vLightIntensity;
out vec3 vRefractVector;
out vec3 vReflectVector;
const vec3 LIGHTPOS = vec3( 5., 10., 10. );
void main( )
{
	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
	vec3 eyeDir = normalize( ECposition ); // vector from eye to pt
	vec3 normal = normalize( gl_NormalMatrix * gl_Normal );
	vRefractVector = refract( eyeDir, normal, uEta );
	vReflectVector = reflect( eyeDir, normal );
	vLightIntensity = abs( dot( normalize(LIGHTPOS - ECposition), normal ) );
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}