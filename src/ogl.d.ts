declare module "ogl" {
  export class Renderer {
    constructor(options: { alpha?: boolean });
    gl: WebGLRenderingContext & { canvas: HTMLCanvasElement };
    canvas: HTMLCanvasElement;
    setSize(width: number, height: number): void;
    render({ scene }: { scene: Mesh }): void;
  }

  export class Program {
    constructor(
      gl: WebGLRenderingContext,
      options: {
        vertex: string;
        fragment: string;
        uniforms: Record<string, { value: any }>;
      }
    );
    uniforms: Record<string, { value: any }>;
  }

  export class Mesh {
    constructor(
      gl: WebGLRenderingContext,
      options: {
        geometry: Triangle;
        program: Program;
      }
    );
  }

  export class Triangle {
    constructor(gl: WebGLRenderingContext);
  }

  export class Color {
    constructor(r: number, g: number, b: number, a?: number);
    r: number;
    g: number;
    b: number;
    a: number;
  }
}
