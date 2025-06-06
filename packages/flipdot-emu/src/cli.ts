import { TerminalRenderer } from "./renderer";
import { Display } from "./display";
import { Parser } from "./parser";
import { Server } from "./server";

function parsePort() {
    const pattern = /(-p|--port)=(?<port>\d+)/;
    const match = process.argv.map((arg) => arg.trim().match(pattern))[0];
    if (match) {
        return Number.parseInt(match.groups['port'])
    }

    return 3000;
}

function parseHost() {
    const pattern = /(-h|--host)=(?<host>.+)/;
    const match = process.argv.map((arg) => arg.trim().match(pattern))[0];
    if (match) {
        return match.groups['host'];
    }

    return '127.0.0.1';
}

const PORT = parsePort();
const HOST = parseHost();

const display = new Display({
    layout: [
        [3, 2, 1],
        [4, 5, 6],
        [9, 8, 7],
        [10, 11, 12],
    ],
    panelWidth: 28,
    isMirrored: true,
    transport: {
        type: 'noop'
    }
})

const pixels = new Uint8Array(display.width * display.height);
const renderer = new TerminalRenderer(display.width, display.height);

function render() {
    for (let x = 0; x < display.width; x += 1) {
        for (let y = 0; y < display.height; y += 1) {
            const px = display.getPixel(x, y);
            const index = (y * display.width) + x;
            pixels[index] = px ? 1 : 0;
        }
    }
    renderer.render(pixels);
}

const parser = new Parser(display, render);
const server = new Server(HOST, PORT, parser);

server.listen();
renderer.start();