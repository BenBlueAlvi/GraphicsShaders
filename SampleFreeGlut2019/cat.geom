#version 330 compatibility
#extension GL_EXT_gpu_shader4: enable
#extension GL_EXT_geometry_shader4: enable
layout( triangles ) in;
layout( triangle_strip, max_vertices=200 ) out;

uniform float uLiquify;

out vec2 vST;


out vec4 E;

in vec2 vvST[3];
in vec4 vE[3];

void produceVert(int v){
	vST = vvST[v];
	E = vE[v];
	vec4 pos = gl_PositionIn[v];
	if (v == 0){
		pos *= vec4(2, 0, 2, 1);
	}
	if (v == 1){
		pos *= vec4(2, 0, -2, 1);
	}
	if (v == 2){
		pos *= vec4(-2, 0, 0, 1);
	}
	vec4 liquify = gl_ModelViewProjectionMatrix * pos;
	gl_Position = mix(liquify, gl_PositionIn[v], uLiquify);
	EmitVertex();

}

void main (){
	produceVert(0);
	produceVert(1);
	produceVert(2);
	

	
}