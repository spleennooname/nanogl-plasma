uniform vec3 uColor;
uniform float uTime;

varying vec2 vUv;

void main() {

    vec2 uv = vUv;

    float pi = 3.141592;

    float v1 = sin(uv.x*5.0 + uTime);

    float v2 = sin(5.0*(uv.x*sin(uTime / 2.0) + uv.y*cos(uTime/3.0)) + uTime);

    float cx = uv.x + sin(uTime / 5.0)*5.0;
    float cy = uv.y + sin(uTime / 3.0)*5.0;
    float v3 = sin(sqrt(100.0*(cx*cx + cy*cy)) + uTime);

    float vf = v1 + v2 + v3;

    float r  = cos(vf*pi);
    float g  = sin(vf*pi + 2.0*pi/2.0);
    float b  = cos(vf*pi + 2.0*pi/3.0);

    gl_FragColor= vec4( mix( vec3(r,g,b) ,  0.4 * cos(uTime + uv.xyx) + uColor, uColor), 1.0);
}