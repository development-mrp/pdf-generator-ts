import { Request, Response, NextFunction, Router } from "express";
import puppeteer from "puppeteer";

export default class PdfGenerator {
  public router: Router = Router({
    mergeParams: true,
  });

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post("/", this.generatePDF);
  }

  private async generatePDF(req: Request, res: Response, next: NextFunction) {
    try {
      var options: any = {
        // path: "./documents/output.pdf",
        format: "A4",
        landscape: false,
        printBackground: true,
        displayHeaderFooter: false,
        preferCSSPageSize: true,
        margin: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      };
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(req.body.content);
      await page.emulateMediaType("screen");
      const pdfBuffer = await page.pdf(options);
      await browser.close();
  
      res.send(pdfBuffer);
    } catch (err) {
      next(err);
    }
  }
}
