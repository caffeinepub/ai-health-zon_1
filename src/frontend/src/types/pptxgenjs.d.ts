declare module "pptxgenjs" {
  interface Slide {
    addText(text: string | any[], options?: any): void;
    addShape(type: any, options?: any): void;
    addImage(options?: any): void;
    background: any;
  }
  class PptxGenJS {
    defineLayout(layout: any): void;
    layout: string;
    author: string;
    company: string;
    subject: string;
    title: string;
    addSlide(options?: any): Slide;
    writeFile(options: { fileName: string }): Promise<void>;
    ShapeType: Record<string, any>;
    [key: string]: any;
  }
  export default PptxGenJS;
}
