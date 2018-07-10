attribute vec3 position;
attribute vec2 uv;
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(position, 1.0);
}