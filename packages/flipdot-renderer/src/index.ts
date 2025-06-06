import { CanvasRenderingContext2D } from 'canvas';
import { Display, type TransportOptions } from '@owowagency/flipdot-emu';

class FlipdiscRenderer {
    width: number;
    height: number;
    private readonly display: Display;
    private readonly previous: Uint8Array

    constructor(tty: boolean) {
        const layout = [
            [3, 2, 1],
            [4, 5, 6],
            [9, 8, 7],
            [10, 11, 12],
        ];

        const transport: TransportOptions = tty ? {
            type: 'ip',
            port: 3000,
            host: '127.0.0.1'
        } : {
            type: 'serial',
            path: '/dev/ttyACM0',
            baudRate: 57600,
        }

        this.display = new Display({
            layout,
            isMirrored: true,
            panelWidth: 28,
            transport,
        });
        this.display.connect();
        this.width = this.display.width;
        this.height = this.display.height;
        this.previous = new Uint8Array(this.width * this.height);
    }

    start(): void {
        process.on('SIGINT', () => {
            process.exit(0);
        });
    }

    render(ctx: CanvasRenderingContext2D): void {
        const data = ctx.getImageData(0, 0, this.display.width, this.display.height);
        this.display.setImageData(data);
        if (this.display.isDirty()) {
            this.display.flush();
        }
    }
}

export function create(mode: 'tty' | 'flipdot'): FlipdiscRenderer {
    return new FlipdiscRenderer(mode === 'tty');
}