#version 330 compatibility



out vec2 vST;


void
main( )
{    
       vST = gl_MultiTexCoord0.st;
       vec4 newVertex = gl_Vertex;
      
       gl_Position = gl_ModelViewProjectionMatrix * newVertex;
}