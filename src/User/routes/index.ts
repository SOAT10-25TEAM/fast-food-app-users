import cors from "cors";
import { Router } from "express";
import { z } from "zod";
import { UserController } from "../controllers/userController";
import { UserGateway } from "../gateways/userGateway";
import { CreateUserValidator } from "../interfaces/dtos";
import { UserJsonPresenter } from "../presenters/userPresenter";
import { JWTToken } from "../../api/middlewares/jwtMiddleware";
import { UserRepository } from "../../repositories/UserRepository"; // novo repositório baseado em Mongoose

export const userRoutes = (): Router => {
  const router = Router();
  router.use(cors({ origin: "*" }));

  const userRepository = new UserGateway(new UserRepository());
  const userPresenter = new UserJsonPresenter();

  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: Gerenciamento de usuários
   */

  router.post("/user/create", async (req, res, next) => {
    try {
      const userData = CreateUserValidator.validate(req.body);
      const response = await UserController.createUser(
        userData,
        userRepository,
        userPresenter
      );
      res.status(response.statusCode).json({ ...response.body });
    } catch (error) {
      next(error);
    }
  });

  router.get("/user", JWTToken, async (req, res, next) => {
    try {
      const cpf = req.query?.cpf;

      if (typeof cpf !== "string") {
        throw new z.ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "CPF precisa ser informado!",
            path: ["cpf"],
          },
        ]);
      }

      const response = await UserController.findUserByCPF(
        cpf,
        userRepository,
        userPresenter
      );

      res.status(response.statusCode).json({ user: response.body.response });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
