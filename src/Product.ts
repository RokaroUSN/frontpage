export const ANIMATE_RIGHT_DUR = 500;

export enum Shape {
    Square,
    Circle
}

export enum Prod {
    A,
    B
}

let productIdCounter = 0;

export class Product {
    id: number;
    label: string;
    shape: Shape;
    color: string;
    background: string;
    opacity: number;

    animatingRight: boolean;

    constructor(label: string, shape: Shape, color: string, background: string) {
        this.id = productIdCounter++;
        this.label = label;
        this.shape = shape;
        this.color = color;
        this.background = background;
        this.opacity = 1;

        this.animatingRight = false;
    }

    animateRight(dur: number) {
       this.animatingRight = true;
       setTimeout(()=>this.animatingRight = false, dur-5);
    }

    move(dur: number) {
        this.animateRight(dur);
    }
}

export class ProdA extends Product {
    constructor() {
        super("A", Shape.Square, "#dc4e4e", "rgba(220,78,78,0.34)");
    }
}

export class ProdB extends Product {
    constructor() {
        super("B", Shape.Circle, "#585a57", "rgba(88,90,87,0.34)");
    }
}

