#version 330 compatibility

uniform sampler2D uTexUnit;
uniform float uLiquify;

out vec2 vvST;
out vec3 vMC;
out vec4 vE;


void
main( )
{    
       vvST = gl_MultiTexCoord0.st;
       vec4 newVertex = gl_Vertex;
       vMC = gl_Vertex.xyz;
       vE = gl_ModelViewProjectionMatrix * gl_Vertex;

       vec3 one = vec3(1,1,1);
       vec3 liquid = vec3(vMC.x *  vMC.y , vMC.z * vMC.x, vMC.y * vMC.z);
     

      
	   

       gl_Position = gl_ModelViewProjectionMatrix * newVertex ;
}