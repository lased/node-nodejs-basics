import cluster from "node:cluster";
import { Person } from "./Person.model";

const db = {} as { list: Person[] };
let _list: typeof db.list = [];

if (cluster.isPrimary) {
  let lastList: typeof db.list = [];

  cluster.on("online", (worker) => {
    worker?.send(lastList);
  });
  cluster.on("message", (fromWorker, list) => {
    Object.values(cluster.workers!).forEach((worker) => {
      if (fromWorker.id !== worker?.id) {
        worker?.send(list);
      }
    });
    lastList = list;
  });
}
if (cluster.isWorker) {
  const worker = cluster.worker!;

  worker.on("message", (list) => {
    _list = list;
  });
  Object.defineProperty(db, "list", {
    set(list) {
      worker.send(list);
      _list = list;
    },
    get() {
      return _list;
    },
  });
} else {
  db.list = [];
}

export const getAll = () => db.list;
export const getById = (id: string) => {
  const person = db.list.find((person) => person.id === id);

  return person || null;
};
export const create = (person: Person) => {
  db.list = [...db.list, person];

  return person;
};
export const update = (id: string, person: Partial<Person>) => {
  const personIndex = db.list.findIndex((psn) => psn.id === id);

  if (personIndex === -1) {
    return null;
  }

  db.list = db.list.map((prsn, index) => {
    if (index === personIndex) {
      return { ...prsn, ...person };
    }

    return prsn;
  });

  return db.list[personIndex];
};
export const remove = (id: string) => {
  const personIndex = db.list.findIndex((person) => person.id === id);

  if (personIndex === -1) {
    return null;
  }

  db.list = db.list.filter((person) => person.id !== id);

  return true;
};
