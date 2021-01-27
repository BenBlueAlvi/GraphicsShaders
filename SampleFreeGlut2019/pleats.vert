#version 330 compatibility

out vec3  vMC;
out float vLightIntensity; 
out vec2 vST;

out vec3 N;
out vec4 E;




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




uniform sampler3D Noise3;

vec3
RotateNormal( float angx, float angy, vec3 n )
{
        float cx = cos( angx );
        float sx = sin( angx );
        float cy = cos( angy );
        float sy = sin( angy );

        // rotate about x:
        float yp =  n.y*cx - n.z*sx;    // y'
        n.z      =  n.y*sx + n.z*cx;    // z'
        n.y      =  yp;
        // n.x      =  n.x;

        // rotate about y:
        float xp =  n.x*cy + n.z*sy;    // x'
        n.z      = -n.x*sy + n.z*cy;    // z'm,
        n.x      =  xp;
        // n.y      =  n.y;

        return normalize( n );
}

void
main( )
{
    
    vMC = gl_Vertex.xyz;
    vec4 nvx = texture( Noise3, uNoiseFreq*vMC );
	float angx = nvx.r + nvx.g + nvx.b + nvx.a  -  2.;
	angx *= uNoiseAmp;

    vec4 nvy = texture( Noise3, uNoiseFreq*vec3(vMC.xy,vMC.z+0.5) );
	float angy = nvy.r + nvy.g + nvy.b + nvy.a  -  2.;
	angy *= uNoiseAmp;

   

    vMC.z = uK * (1-vMC.y) * sin( 2.*3.1415*vMC.x/uP );

    // normal:
    float dzdx = uK * (1-vMC.y) * (2.*3.1415/uP) * cos( (2.*3.1415*vMC.x)/uP );
    float dzdy = -uK * sin( (2.*3.1415*vMC.x)/uP );
    vec3 tx = vec3(1, 0, dzdx);
    vec3 ty = vec3(0, 1, dzdy);

    N = normalize(cross(tx, ty));
    N = RotateNormal(angx, angy, N);
    N *= gl_NormalMatrix;
    N = normalize(N);
    
    E = gl_ModelViewProjectionMatrix * gl_Vertex;

	
	gl_Position = gl_ModelViewProjectionMatrix * vec4(vMC, 1);
}