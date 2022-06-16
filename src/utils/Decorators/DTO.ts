/**
 *  Work only if args.length === 1, args is Object, object must be a Class
 *  and properties must be initialized as undefined
 *
 * WORK
 * class Person {
 *  username?: string = undefined
 *
 *  constructor(dto: Person) {}
 * }
 *
 * new Person({ username: 'test' })
 *
 * NOT WORK
 * class Person {
 *  username?: string
 *
 *  constructor(dto: Person) {}
 * }
 *
 * new Person({ username: 'test' }, null)
 */
export function DTO<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      const options: Record<string, any> | undefined = args[0];

      super(...args);

      if (
        args.length === 1 &&
        typeof options === "object" &&
        options !== null
      ) {
        for (const key in this) {
          if (options[key] === undefined) {
            delete this[key];
            continue;
          }

          this[key] = options[key];
        }
      }
    }
  };
}
