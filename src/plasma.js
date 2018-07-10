import "./styles/styles.scss";

import fragmentCode from './glsl/plasma.glsl';
import vertexCode from './glsl/vertex.glsl';

const Program = require('nanogl/program');
const ArrayBuffer = require('nanogl/arraybuffer');
const IndexBuffer = require('nanogl/indexbuffer');
const mat4 = require('gl-matrix/src/gl-matrix/mat4');

let gl, program, arrayBuffer, indexBuffer, t=0, then = 0, now = 0, delta = 0, fps = 60;

{
    initGL();
    initProgram();
    initArrayBuffer();
    initIndexBuffer();
    then = timestamp()
    now = 0;
    requestAnimationFrame(render);
}

function initGL() {

    const canvas = document.querySelector('#gl');
    gl = canvas.getContext('webgl');
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
}

function initProgram() {
    let defs = 'precision mediump float;';
    program = new Program(gl);
    program.compile(vertexCode, fragmentCode, defs);
}

function initArrayBuffer() {

    const data = new Float32Array([
        -1, 1, 0, 1,
        -1, -1, 0, 0,
        1, 1, 1, 1,
        1, -1, 1, 0
    ]);

    arrayBuffer = new ArrayBuffer(gl, data);
    arrayBuffer.attrib('position', 2, gl.FLOAT);
    arrayBuffer.attrib('uv', 2, gl.FLOAT);
}

function initIndexBuffer() {

    // create the arrayBuffer and its attributes
    const data = new Uint16Array([
        0, 1, 2,
        2, 1, 3
    ]);

    indexBuffer = new IndexBuffer(gl, null, data);
}

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function render(t) {

    requestAnimationFrame(render);

    now = timestamp();
    delta = now - then;

    if (delta > (1000 / fps)) {

        then = now - (delta % (1000 / fps));

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        program.use();
        program.uColor(0.3, 0.0, 0.5);

        t+=1;
        program.uTime(t * 0.001);

        const projectionMatrix = mat4.create();
        const modelViewMatrix = mat4.create();

        program.uProjectionMatrix(projectionMatrix);
        program.uModelViewMatrix(modelViewMatrix);
        arrayBuffer.attribPointer(program);

        indexBuffer.bind();
        indexBuffer.drawTriangles();
    }

}
