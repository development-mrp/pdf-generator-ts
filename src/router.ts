import { Application } from "express";
import { version } from "../package.json";
import PdfGenerator from "./Modules/pdfGenerator";
export class Router {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }



  public initializeRoutes = () => {
    this.app.get("/", (req, res) => {
      res.status(200).send({
        message: "Hello World!",
      });
    });

    this.app.use('/generate-pdf', (new PdfGenerator()).router);
  };
}