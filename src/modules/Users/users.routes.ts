import { RoutesType } from "../../utils/Server/Server.types";
import {
  createUser,
  deleteUser,
  getByIdUser,
  getUsers,
  updateUser,
} from "./users.controller";

const userRoutes = {
  DELETE: {
    "api/users/:id": deleteUser,
  },
  GET: {
    "api/users/:id": getByIdUser,
    "api/users": getUsers,
  },
  POST: {
    "api/users": createUser,
  },
  PUT: {
    "api/users/:id": updateUser,
  },
} as RoutesType;

export default userRoutes;
