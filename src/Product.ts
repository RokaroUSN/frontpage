export const ANIMATE_RIGHT_DUR = 500;

export enum Shape {
    Square,
    Circle
}

export enum Prod {
    A,
    B
}

export class Product {
    label: string;
    shape: Shape;
    color: string;
    background: string;

    animatingRight: boolean;

    constructor(label: string, shape: Shape, color: string, background: string) {
        this.label = label;
        this.shape = shape;
        this.color = color;
        this.background = background;

        this.animatingRight = true;
    }

    animateRight() {
       this.animatingRight = true;
       setTimeout(()=>this.animatingRight = false, ANIMATE_RIGHT_DUR-5);
    }

    move() {
        this.animateRight();
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

