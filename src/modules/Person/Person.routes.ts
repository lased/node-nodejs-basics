import { RoutesType } from "../../utils/Router/Router.types";
import {
  createPerson,
  deletePerson,
  getByIdPerson,
  getPerson,
  updatePerson,
} from "./person.controller";

const PersonRoutes = {
  DELETE: {
    "api/person/:id": deletePerson,
  },
  GET: {
    "api/person/:id": getByIdPerson,
    "api/person": getPerson,
  },
  POST: {
    "api/person": createPerson,
  },
  PUT: {
    "api/person/:id": updatePerson,
  },
} as RoutesType;

export default PersonRoutes;
