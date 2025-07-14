import express from 'express';

export class ExpressServer {
  private app = express();

  constructor() {
    this.app = express();
  }

  registerRoutes() {
    // Configure as rotas aqui
  }

  async start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}
