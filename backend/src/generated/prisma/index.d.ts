
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Board
 * 
 */
export type Board = $Result.DefaultSelection<Prisma.$BoardPayload>
/**
 * Model BoardCollaborator
 * 
 */
export type BoardCollaborator = $Result.DefaultSelection<Prisma.$BoardCollaboratorPayload>
/**
 * Model BoardAction
 * 
 */
export type BoardAction = $Result.DefaultSelection<Prisma.$BoardActionPayload>
/**
 * Model BoardSnapshot
 * 
 */
export type BoardSnapshot = $Result.DefaultSelection<Prisma.$BoardSnapshotPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.board`: Exposes CRUD operations for the **Board** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Boards
    * const boards = await prisma.board.findMany()
    * ```
    */
  get board(): Prisma.BoardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.boardCollaborator`: Exposes CRUD operations for the **BoardCollaborator** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BoardCollaborators
    * const boardCollaborators = await prisma.boardCollaborator.findMany()
    * ```
    */
  get boardCollaborator(): Prisma.BoardCollaboratorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.boardAction`: Exposes CRUD operations for the **BoardAction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BoardActions
    * const boardActions = await prisma.boardAction.findMany()
    * ```
    */
  get boardAction(): Prisma.BoardActionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.boardSnapshot`: Exposes CRUD operations for the **BoardSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BoardSnapshots
    * const boardSnapshots = await prisma.boardSnapshot.findMany()
    * ```
    */
  get boardSnapshot(): Prisma.BoardSnapshotDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Board: 'Board',
    BoardCollaborator: 'BoardCollaborator',
    BoardAction: 'BoardAction',
    BoardSnapshot: 'BoardSnapshot'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "board" | "boardCollaborator" | "boardAction" | "boardSnapshot"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Board: {
        payload: Prisma.$BoardPayload<ExtArgs>
        fields: Prisma.BoardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BoardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BoardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>
          }
          findFirst: {
            args: Prisma.BoardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BoardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>
          }
          findMany: {
            args: Prisma.BoardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>[]
          }
          create: {
            args: Prisma.BoardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>
          }
          createMany: {
            args: Prisma.BoardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BoardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>[]
          }
          delete: {
            args: Prisma.BoardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>
          }
          update: {
            args: Prisma.BoardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>
          }
          deleteMany: {
            args: Prisma.BoardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BoardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BoardUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>[]
          }
          upsert: {
            args: Prisma.BoardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>
          }
          aggregate: {
            args: Prisma.BoardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBoard>
          }
          groupBy: {
            args: Prisma.BoardGroupByArgs<ExtArgs>
            result: $Utils.Optional<BoardGroupByOutputType>[]
          }
          count: {
            args: Prisma.BoardCountArgs<ExtArgs>
            result: $Utils.Optional<BoardCountAggregateOutputType> | number
          }
        }
      }
      BoardCollaborator: {
        payload: Prisma.$BoardCollaboratorPayload<ExtArgs>
        fields: Prisma.BoardCollaboratorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BoardCollaboratorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardCollaboratorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BoardCollaboratorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardCollaboratorPayload>
          }
          findFirst: {
            args: Prisma.BoardCollaboratorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardCollaboratorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BoardCollaboratorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardCollaboratorPayload>
          }
          findMany: {
            args: Prisma.BoardCollaboratorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardCollaboratorPayload>[]
          }
          create: {
            args: Prisma.BoardCollaboratorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardCollaboratorPayload>
          }
          createMany: {
            args: Prisma.BoardCollaboratorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BoardCollaboratorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardCollaboratorPayload>[]
          }
          delete: {
            args: Prisma.BoardCollaboratorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardCollaboratorPayload>
          }
          update: {
            args: Prisma.BoardCollaboratorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardCollaboratorPayload>
          }
          deleteMany: {
            args: Prisma.BoardCollaboratorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BoardCollaboratorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BoardCollaboratorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardCollaboratorPayload>[]
          }
          upsert: {
            args: Prisma.BoardCollaboratorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardCollaboratorPayload>
          }
          aggregate: {
            args: Prisma.BoardCollaboratorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBoardCollaborator>
          }
          groupBy: {
            args: Prisma.BoardCollaboratorGroupByArgs<ExtArgs>
            result: $Utils.Optional<BoardCollaboratorGroupByOutputType>[]
          }
          count: {
            args: Prisma.BoardCollaboratorCountArgs<ExtArgs>
            result: $Utils.Optional<BoardCollaboratorCountAggregateOutputType> | number
          }
        }
      }
      BoardAction: {
        payload: Prisma.$BoardActionPayload<ExtArgs>
        fields: Prisma.BoardActionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BoardActionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardActionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BoardActionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardActionPayload>
          }
          findFirst: {
            args: Prisma.BoardActionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardActionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BoardActionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardActionPayload>
          }
          findMany: {
            args: Prisma.BoardActionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardActionPayload>[]
          }
          create: {
            args: Prisma.BoardActionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardActionPayload>
          }
          createMany: {
            args: Prisma.BoardActionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BoardActionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardActionPayload>[]
          }
          delete: {
            args: Prisma.BoardActionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardActionPayload>
          }
          update: {
            args: Prisma.BoardActionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardActionPayload>
          }
          deleteMany: {
            args: Prisma.BoardActionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BoardActionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BoardActionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardActionPayload>[]
          }
          upsert: {
            args: Prisma.BoardActionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardActionPayload>
          }
          aggregate: {
            args: Prisma.BoardActionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBoardAction>
          }
          groupBy: {
            args: Prisma.BoardActionGroupByArgs<ExtArgs>
            result: $Utils.Optional<BoardActionGroupByOutputType>[]
          }
          count: {
            args: Prisma.BoardActionCountArgs<ExtArgs>
            result: $Utils.Optional<BoardActionCountAggregateOutputType> | number
          }
        }
      }
      BoardSnapshot: {
        payload: Prisma.$BoardSnapshotPayload<ExtArgs>
        fields: Prisma.BoardSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BoardSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BoardSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardSnapshotPayload>
          }
          findFirst: {
            args: Prisma.BoardSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BoardSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardSnapshotPayload>
          }
          findMany: {
            args: Prisma.BoardSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardSnapshotPayload>[]
          }
          create: {
            args: Prisma.BoardSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardSnapshotPayload>
          }
          createMany: {
            args: Prisma.BoardSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BoardSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardSnapshotPayload>[]
          }
          delete: {
            args: Prisma.BoardSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardSnapshotPayload>
          }
          update: {
            args: Prisma.BoardSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.BoardSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BoardSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BoardSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.BoardSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoardSnapshotPayload>
          }
          aggregate: {
            args: Prisma.BoardSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBoardSnapshot>
          }
          groupBy: {
            args: Prisma.BoardSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<BoardSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.BoardSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<BoardSnapshotCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    board?: BoardOmit
    boardCollaborator?: BoardCollaboratorOmit
    boardAction?: BoardActionOmit
    boardSnapshot?: BoardSnapshotOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    boards: number
    collaborations: number
    BoardAction: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    boards?: boolean | UserCountOutputTypeCountBoardsArgs
    collaborations?: boolean | UserCountOutputTypeCountCollaborationsArgs
    BoardAction?: boolean | UserCountOutputTypeCountBoardActionArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBoardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BoardWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCollaborationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BoardCollaboratorWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBoardActionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BoardActionWhereInput
  }


  /**
   * Count Type BoardCountOutputType
   */

  export type BoardCountOutputType = {
    collaborators: number
    actions: number
    snapshots: number
  }

  export type BoardCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collaborators?: boolean | BoardCountOutputTypeCountCollaboratorsArgs
    actions?: boolean | BoardCountOutputTypeCountActionsArgs
    snapshots?: boolean | BoardCountOutputTypeCountSnapshotsArgs
  }

  // Custom InputTypes
  /**
   * BoardCountOutputType without action
   */
  export type BoardCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardCountOutputType
     */
    select?: BoardCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BoardCountOutputType without action
   */
  export type BoardCountOutputTypeCountCollaboratorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BoardCollaboratorWhereInput
  }

  /**
   * BoardCountOutputType without action
   */
  export type BoardCountOutputTypeCountActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BoardActionWhereInput
  }

  /**
   * BoardCountOutputType without action
   */
  export type BoardCountOutputTypeCountSnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BoardSnapshotWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    cognitoId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    cognitoId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    cognitoId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    cognitoId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    cognitoId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    cognitoId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    cognitoId: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    cognitoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    boards?: boolean | User$boardsArgs<ExtArgs>
    collaborations?: boolean | User$collaborationsArgs<ExtArgs>
    BoardAction?: boolean | User$BoardActionArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    cognitoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    cognitoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    cognitoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "cognitoId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    boards?: boolean | User$boardsArgs<ExtArgs>
    collaborations?: boolean | User$collaborationsArgs<ExtArgs>
    BoardAction?: boolean | User$BoardActionArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      boards: Prisma.$BoardPayload<ExtArgs>[]
      collaborations: Prisma.$BoardCollaboratorPayload<ExtArgs>[]
      BoardAction: Prisma.$BoardActionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      cognitoId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    boards<T extends User$boardsArgs<ExtArgs> = {}>(args?: Subset<T, User$boardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    collaborations<T extends User$collaborationsArgs<ExtArgs> = {}>(args?: Subset<T, User$collaborationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardCollaboratorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    BoardAction<T extends User$BoardActionArgs<ExtArgs> = {}>(args?: Subset<T, User$BoardActionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly cognitoId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.boards
   */
  export type User$boardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    where?: BoardWhereInput
    orderBy?: BoardOrderByWithRelationInput | BoardOrderByWithRelationInput[]
    cursor?: BoardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BoardScalarFieldEnum | BoardScalarFieldEnum[]
  }

  /**
   * User.collaborations
   */
  export type User$collaborationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardCollaborator
     */
    select?: BoardCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardCollaborator
     */
    omit?: BoardCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardCollaboratorInclude<ExtArgs> | null
    where?: BoardCollaboratorWhereInput
    orderBy?: BoardCollaboratorOrderByWithRelationInput | BoardCollaboratorOrderByWithRelationInput[]
    cursor?: BoardCollaboratorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BoardCollaboratorScalarFieldEnum | BoardCollaboratorScalarFieldEnum[]
  }

  /**
   * User.BoardAction
   */
  export type User$BoardActionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardAction
     */
    select?: BoardActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardAction
     */
    omit?: BoardActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardActionInclude<ExtArgs> | null
    where?: BoardActionWhereInput
    orderBy?: BoardActionOrderByWithRelationInput | BoardActionOrderByWithRelationInput[]
    cursor?: BoardActionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BoardActionScalarFieldEnum | BoardActionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Board
   */

  export type AggregateBoard = {
    _count: BoardCountAggregateOutputType | null
    _min: BoardMinAggregateOutputType | null
    _max: BoardMaxAggregateOutputType | null
  }

  export type BoardMinAggregateOutputType = {
    id: string | null
    title: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BoardMaxAggregateOutputType = {
    id: string | null
    title: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BoardCountAggregateOutputType = {
    id: number
    title: number
    ownerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BoardMinAggregateInputType = {
    id?: true
    title?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BoardMaxAggregateInputType = {
    id?: true
    title?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BoardCountAggregateInputType = {
    id?: true
    title?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BoardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Board to aggregate.
     */
    where?: BoardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boards to fetch.
     */
    orderBy?: BoardOrderByWithRelationInput | BoardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BoardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Boards
    **/
    _count?: true | BoardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BoardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BoardMaxAggregateInputType
  }

  export type GetBoardAggregateType<T extends BoardAggregateArgs> = {
        [P in keyof T & keyof AggregateBoard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBoard[P]>
      : GetScalarType<T[P], AggregateBoard[P]>
  }




  export type BoardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BoardWhereInput
    orderBy?: BoardOrderByWithAggregationInput | BoardOrderByWithAggregationInput[]
    by: BoardScalarFieldEnum[] | BoardScalarFieldEnum
    having?: BoardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BoardCountAggregateInputType | true
    _min?: BoardMinAggregateInputType
    _max?: BoardMaxAggregateInputType
  }

  export type BoardGroupByOutputType = {
    id: string
    title: string
    ownerId: string
    createdAt: Date
    updatedAt: Date
    _count: BoardCountAggregateOutputType | null
    _min: BoardMinAggregateOutputType | null
    _max: BoardMaxAggregateOutputType | null
  }

  type GetBoardGroupByPayload<T extends BoardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BoardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BoardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BoardGroupByOutputType[P]>
            : GetScalarType<T[P], BoardGroupByOutputType[P]>
        }
      >
    >


  export type BoardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    collaborators?: boolean | Board$collaboratorsArgs<ExtArgs>
    actions?: boolean | Board$actionsArgs<ExtArgs>
    snapshots?: boolean | Board$snapshotsArgs<ExtArgs>
    _count?: boolean | BoardCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["board"]>

  export type BoardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["board"]>

  export type BoardSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["board"]>

  export type BoardSelectScalar = {
    id?: boolean
    title?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BoardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "ownerId" | "createdAt" | "updatedAt", ExtArgs["result"]["board"]>
  export type BoardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    collaborators?: boolean | Board$collaboratorsArgs<ExtArgs>
    actions?: boolean | Board$actionsArgs<ExtArgs>
    snapshots?: boolean | Board$snapshotsArgs<ExtArgs>
    _count?: boolean | BoardCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BoardIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BoardIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BoardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Board"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      collaborators: Prisma.$BoardCollaboratorPayload<ExtArgs>[]
      actions: Prisma.$BoardActionPayload<ExtArgs>[]
      snapshots: Prisma.$BoardSnapshotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      ownerId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["board"]>
    composites: {}
  }

  type BoardGetPayload<S extends boolean | null | undefined | BoardDefaultArgs> = $Result.GetResult<Prisma.$BoardPayload, S>

  type BoardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BoardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BoardCountAggregateInputType | true
    }

  export interface BoardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Board'], meta: { name: 'Board' } }
    /**
     * Find zero or one Board that matches the filter.
     * @param {BoardFindUniqueArgs} args - Arguments to find a Board
     * @example
     * // Get one Board
     * const board = await prisma.board.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BoardFindUniqueArgs>(args: SelectSubset<T, BoardFindUniqueArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Board that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BoardFindUniqueOrThrowArgs} args - Arguments to find a Board
     * @example
     * // Get one Board
     * const board = await prisma.board.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BoardFindUniqueOrThrowArgs>(args: SelectSubset<T, BoardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Board that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardFindFirstArgs} args - Arguments to find a Board
     * @example
     * // Get one Board
     * const board = await prisma.board.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BoardFindFirstArgs>(args?: SelectSubset<T, BoardFindFirstArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Board that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardFindFirstOrThrowArgs} args - Arguments to find a Board
     * @example
     * // Get one Board
     * const board = await prisma.board.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BoardFindFirstOrThrowArgs>(args?: SelectSubset<T, BoardFindFirstOrThrowArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Boards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Boards
     * const boards = await prisma.board.findMany()
     * 
     * // Get first 10 Boards
     * const boards = await prisma.board.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const boardWithIdOnly = await prisma.board.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BoardFindManyArgs>(args?: SelectSubset<T, BoardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Board.
     * @param {BoardCreateArgs} args - Arguments to create a Board.
     * @example
     * // Create one Board
     * const Board = await prisma.board.create({
     *   data: {
     *     // ... data to create a Board
     *   }
     * })
     * 
     */
    create<T extends BoardCreateArgs>(args: SelectSubset<T, BoardCreateArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Boards.
     * @param {BoardCreateManyArgs} args - Arguments to create many Boards.
     * @example
     * // Create many Boards
     * const board = await prisma.board.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BoardCreateManyArgs>(args?: SelectSubset<T, BoardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Boards and returns the data saved in the database.
     * @param {BoardCreateManyAndReturnArgs} args - Arguments to create many Boards.
     * @example
     * // Create many Boards
     * const board = await prisma.board.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Boards and only return the `id`
     * const boardWithIdOnly = await prisma.board.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BoardCreateManyAndReturnArgs>(args?: SelectSubset<T, BoardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Board.
     * @param {BoardDeleteArgs} args - Arguments to delete one Board.
     * @example
     * // Delete one Board
     * const Board = await prisma.board.delete({
     *   where: {
     *     // ... filter to delete one Board
     *   }
     * })
     * 
     */
    delete<T extends BoardDeleteArgs>(args: SelectSubset<T, BoardDeleteArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Board.
     * @param {BoardUpdateArgs} args - Arguments to update one Board.
     * @example
     * // Update one Board
     * const board = await prisma.board.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BoardUpdateArgs>(args: SelectSubset<T, BoardUpdateArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Boards.
     * @param {BoardDeleteManyArgs} args - Arguments to filter Boards to delete.
     * @example
     * // Delete a few Boards
     * const { count } = await prisma.board.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BoardDeleteManyArgs>(args?: SelectSubset<T, BoardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Boards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Boards
     * const board = await prisma.board.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BoardUpdateManyArgs>(args: SelectSubset<T, BoardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Boards and returns the data updated in the database.
     * @param {BoardUpdateManyAndReturnArgs} args - Arguments to update many Boards.
     * @example
     * // Update many Boards
     * const board = await prisma.board.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Boards and only return the `id`
     * const boardWithIdOnly = await prisma.board.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BoardUpdateManyAndReturnArgs>(args: SelectSubset<T, BoardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Board.
     * @param {BoardUpsertArgs} args - Arguments to update or create a Board.
     * @example
     * // Update or create a Board
     * const board = await prisma.board.upsert({
     *   create: {
     *     // ... data to create a Board
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Board we want to update
     *   }
     * })
     */
    upsert<T extends BoardUpsertArgs>(args: SelectSubset<T, BoardUpsertArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Boards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardCountArgs} args - Arguments to filter Boards to count.
     * @example
     * // Count the number of Boards
     * const count = await prisma.board.count({
     *   where: {
     *     // ... the filter for the Boards we want to count
     *   }
     * })
    **/
    count<T extends BoardCountArgs>(
      args?: Subset<T, BoardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BoardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Board.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BoardAggregateArgs>(args: Subset<T, BoardAggregateArgs>): Prisma.PrismaPromise<GetBoardAggregateType<T>>

    /**
     * Group by Board.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BoardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BoardGroupByArgs['orderBy'] }
        : { orderBy?: BoardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BoardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBoardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Board model
   */
  readonly fields: BoardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Board.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BoardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    collaborators<T extends Board$collaboratorsArgs<ExtArgs> = {}>(args?: Subset<T, Board$collaboratorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardCollaboratorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    actions<T extends Board$actionsArgs<ExtArgs> = {}>(args?: Subset<T, Board$actionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    snapshots<T extends Board$snapshotsArgs<ExtArgs> = {}>(args?: Subset<T, Board$snapshotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Board model
   */
  interface BoardFieldRefs {
    readonly id: FieldRef<"Board", 'String'>
    readonly title: FieldRef<"Board", 'String'>
    readonly ownerId: FieldRef<"Board", 'String'>
    readonly createdAt: FieldRef<"Board", 'DateTime'>
    readonly updatedAt: FieldRef<"Board", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Board findUnique
   */
  export type BoardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * Filter, which Board to fetch.
     */
    where: BoardWhereUniqueInput
  }

  /**
   * Board findUniqueOrThrow
   */
  export type BoardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * Filter, which Board to fetch.
     */
    where: BoardWhereUniqueInput
  }

  /**
   * Board findFirst
   */
  export type BoardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * Filter, which Board to fetch.
     */
    where?: BoardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boards to fetch.
     */
    orderBy?: BoardOrderByWithRelationInput | BoardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Boards.
     */
    cursor?: BoardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Boards.
     */
    distinct?: BoardScalarFieldEnum | BoardScalarFieldEnum[]
  }

  /**
   * Board findFirstOrThrow
   */
  export type BoardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * Filter, which Board to fetch.
     */
    where?: BoardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boards to fetch.
     */
    orderBy?: BoardOrderByWithRelationInput | BoardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Boards.
     */
    cursor?: BoardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Boards.
     */
    distinct?: BoardScalarFieldEnum | BoardScalarFieldEnum[]
  }

  /**
   * Board findMany
   */
  export type BoardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * Filter, which Boards to fetch.
     */
    where?: BoardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boards to fetch.
     */
    orderBy?: BoardOrderByWithRelationInput | BoardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Boards.
     */
    cursor?: BoardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boards.
     */
    skip?: number
    distinct?: BoardScalarFieldEnum | BoardScalarFieldEnum[]
  }

  /**
   * Board create
   */
  export type BoardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * The data needed to create a Board.
     */
    data: XOR<BoardCreateInput, BoardUncheckedCreateInput>
  }

  /**
   * Board createMany
   */
  export type BoardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Boards.
     */
    data: BoardCreateManyInput | BoardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Board createManyAndReturn
   */
  export type BoardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * The data used to create many Boards.
     */
    data: BoardCreateManyInput | BoardCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Board update
   */
  export type BoardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * The data needed to update a Board.
     */
    data: XOR<BoardUpdateInput, BoardUncheckedUpdateInput>
    /**
     * Choose, which Board to update.
     */
    where: BoardWhereUniqueInput
  }

  /**
   * Board updateMany
   */
  export type BoardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Boards.
     */
    data: XOR<BoardUpdateManyMutationInput, BoardUncheckedUpdateManyInput>
    /**
     * Filter which Boards to update
     */
    where?: BoardWhereInput
    /**
     * Limit how many Boards to update.
     */
    limit?: number
  }

  /**
   * Board updateManyAndReturn
   */
  export type BoardUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * The data used to update Boards.
     */
    data: XOR<BoardUpdateManyMutationInput, BoardUncheckedUpdateManyInput>
    /**
     * Filter which Boards to update
     */
    where?: BoardWhereInput
    /**
     * Limit how many Boards to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Board upsert
   */
  export type BoardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * The filter to search for the Board to update in case it exists.
     */
    where: BoardWhereUniqueInput
    /**
     * In case the Board found by the `where` argument doesn't exist, create a new Board with this data.
     */
    create: XOR<BoardCreateInput, BoardUncheckedCreateInput>
    /**
     * In case the Board was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BoardUpdateInput, BoardUncheckedUpdateInput>
  }

  /**
   * Board delete
   */
  export type BoardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
    /**
     * Filter which Board to delete.
     */
    where: BoardWhereUniqueInput
  }

  /**
   * Board deleteMany
   */
  export type BoardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Boards to delete
     */
    where?: BoardWhereInput
    /**
     * Limit how many Boards to delete.
     */
    limit?: number
  }

  /**
   * Board.collaborators
   */
  export type Board$collaboratorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardCollaborator
     */
    select?: BoardCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardCollaborator
     */
    omit?: BoardCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardCollaboratorInclude<ExtArgs> | null
    where?: BoardCollaboratorWhereInput
    orderBy?: BoardCollaboratorOrderByWithRelationInput | BoardCollaboratorOrderByWithRelationInput[]
    cursor?: BoardCollaboratorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BoardCollaboratorScalarFieldEnum | BoardCollaboratorScalarFieldEnum[]
  }

  /**
   * Board.actions
   */
  export type Board$actionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardAction
     */
    select?: BoardActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardAction
     */
    omit?: BoardActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardActionInclude<ExtArgs> | null
    where?: BoardActionWhereInput
    orderBy?: BoardActionOrderByWithRelationInput | BoardActionOrderByWithRelationInput[]
    cursor?: BoardActionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BoardActionScalarFieldEnum | BoardActionScalarFieldEnum[]
  }

  /**
   * Board.snapshots
   */
  export type Board$snapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardSnapshot
     */
    select?: BoardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardSnapshot
     */
    omit?: BoardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardSnapshotInclude<ExtArgs> | null
    where?: BoardSnapshotWhereInput
    orderBy?: BoardSnapshotOrderByWithRelationInput | BoardSnapshotOrderByWithRelationInput[]
    cursor?: BoardSnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BoardSnapshotScalarFieldEnum | BoardSnapshotScalarFieldEnum[]
  }

  /**
   * Board without action
   */
  export type BoardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null
  }


  /**
   * Model BoardCollaborator
   */

  export type AggregateBoardCollaborator = {
    _count: BoardCollaboratorCountAggregateOutputType | null
    _min: BoardCollaboratorMinAggregateOutputType | null
    _max: BoardCollaboratorMaxAggregateOutputType | null
  }

  export type BoardCollaboratorMinAggregateOutputType = {
    id: string | null
    boardId: string | null
    userId: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BoardCollaboratorMaxAggregateOutputType = {
    id: string | null
    boardId: string | null
    userId: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BoardCollaboratorCountAggregateOutputType = {
    id: number
    boardId: number
    userId: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BoardCollaboratorMinAggregateInputType = {
    id?: true
    boardId?: true
    userId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BoardCollaboratorMaxAggregateInputType = {
    id?: true
    boardId?: true
    userId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BoardCollaboratorCountAggregateInputType = {
    id?: true
    boardId?: true
    userId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BoardCollaboratorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BoardCollaborator to aggregate.
     */
    where?: BoardCollaboratorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BoardCollaborators to fetch.
     */
    orderBy?: BoardCollaboratorOrderByWithRelationInput | BoardCollaboratorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BoardCollaboratorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BoardCollaborators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BoardCollaborators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BoardCollaborators
    **/
    _count?: true | BoardCollaboratorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BoardCollaboratorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BoardCollaboratorMaxAggregateInputType
  }

  export type GetBoardCollaboratorAggregateType<T extends BoardCollaboratorAggregateArgs> = {
        [P in keyof T & keyof AggregateBoardCollaborator]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBoardCollaborator[P]>
      : GetScalarType<T[P], AggregateBoardCollaborator[P]>
  }




  export type BoardCollaboratorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BoardCollaboratorWhereInput
    orderBy?: BoardCollaboratorOrderByWithAggregationInput | BoardCollaboratorOrderByWithAggregationInput[]
    by: BoardCollaboratorScalarFieldEnum[] | BoardCollaboratorScalarFieldEnum
    having?: BoardCollaboratorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BoardCollaboratorCountAggregateInputType | true
    _min?: BoardCollaboratorMinAggregateInputType
    _max?: BoardCollaboratorMaxAggregateInputType
  }

  export type BoardCollaboratorGroupByOutputType = {
    id: string
    boardId: string
    userId: string
    role: string
    createdAt: Date
    updatedAt: Date
    _count: BoardCollaboratorCountAggregateOutputType | null
    _min: BoardCollaboratorMinAggregateOutputType | null
    _max: BoardCollaboratorMaxAggregateOutputType | null
  }

  type GetBoardCollaboratorGroupByPayload<T extends BoardCollaboratorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BoardCollaboratorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BoardCollaboratorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BoardCollaboratorGroupByOutputType[P]>
            : GetScalarType<T[P], BoardCollaboratorGroupByOutputType[P]>
        }
      >
    >


  export type BoardCollaboratorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    boardId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    board?: boolean | BoardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["boardCollaborator"]>

  export type BoardCollaboratorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    boardId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    board?: boolean | BoardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["boardCollaborator"]>

  export type BoardCollaboratorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    boardId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    board?: boolean | BoardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["boardCollaborator"]>

  export type BoardCollaboratorSelectScalar = {
    id?: boolean
    boardId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BoardCollaboratorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "boardId" | "userId" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["boardCollaborator"]>
  export type BoardCollaboratorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    board?: boolean | BoardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BoardCollaboratorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    board?: boolean | BoardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BoardCollaboratorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    board?: boolean | BoardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BoardCollaboratorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BoardCollaborator"
    objects: {
      board: Prisma.$BoardPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      boardId: string
      userId: string
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["boardCollaborator"]>
    composites: {}
  }

  type BoardCollaboratorGetPayload<S extends boolean | null | undefined | BoardCollaboratorDefaultArgs> = $Result.GetResult<Prisma.$BoardCollaboratorPayload, S>

  type BoardCollaboratorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BoardCollaboratorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BoardCollaboratorCountAggregateInputType | true
    }

  export interface BoardCollaboratorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BoardCollaborator'], meta: { name: 'BoardCollaborator' } }
    /**
     * Find zero or one BoardCollaborator that matches the filter.
     * @param {BoardCollaboratorFindUniqueArgs} args - Arguments to find a BoardCollaborator
     * @example
     * // Get one BoardCollaborator
     * const boardCollaborator = await prisma.boardCollaborator.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BoardCollaboratorFindUniqueArgs>(args: SelectSubset<T, BoardCollaboratorFindUniqueArgs<ExtArgs>>): Prisma__BoardCollaboratorClient<$Result.GetResult<Prisma.$BoardCollaboratorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BoardCollaborator that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BoardCollaboratorFindUniqueOrThrowArgs} args - Arguments to find a BoardCollaborator
     * @example
     * // Get one BoardCollaborator
     * const boardCollaborator = await prisma.boardCollaborator.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BoardCollaboratorFindUniqueOrThrowArgs>(args: SelectSubset<T, BoardCollaboratorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BoardCollaboratorClient<$Result.GetResult<Prisma.$BoardCollaboratorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BoardCollaborator that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardCollaboratorFindFirstArgs} args - Arguments to find a BoardCollaborator
     * @example
     * // Get one BoardCollaborator
     * const boardCollaborator = await prisma.boardCollaborator.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BoardCollaboratorFindFirstArgs>(args?: SelectSubset<T, BoardCollaboratorFindFirstArgs<ExtArgs>>): Prisma__BoardCollaboratorClient<$Result.GetResult<Prisma.$BoardCollaboratorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BoardCollaborator that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardCollaboratorFindFirstOrThrowArgs} args - Arguments to find a BoardCollaborator
     * @example
     * // Get one BoardCollaborator
     * const boardCollaborator = await prisma.boardCollaborator.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BoardCollaboratorFindFirstOrThrowArgs>(args?: SelectSubset<T, BoardCollaboratorFindFirstOrThrowArgs<ExtArgs>>): Prisma__BoardCollaboratorClient<$Result.GetResult<Prisma.$BoardCollaboratorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BoardCollaborators that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardCollaboratorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BoardCollaborators
     * const boardCollaborators = await prisma.boardCollaborator.findMany()
     * 
     * // Get first 10 BoardCollaborators
     * const boardCollaborators = await prisma.boardCollaborator.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const boardCollaboratorWithIdOnly = await prisma.boardCollaborator.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BoardCollaboratorFindManyArgs>(args?: SelectSubset<T, BoardCollaboratorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardCollaboratorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BoardCollaborator.
     * @param {BoardCollaboratorCreateArgs} args - Arguments to create a BoardCollaborator.
     * @example
     * // Create one BoardCollaborator
     * const BoardCollaborator = await prisma.boardCollaborator.create({
     *   data: {
     *     // ... data to create a BoardCollaborator
     *   }
     * })
     * 
     */
    create<T extends BoardCollaboratorCreateArgs>(args: SelectSubset<T, BoardCollaboratorCreateArgs<ExtArgs>>): Prisma__BoardCollaboratorClient<$Result.GetResult<Prisma.$BoardCollaboratorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BoardCollaborators.
     * @param {BoardCollaboratorCreateManyArgs} args - Arguments to create many BoardCollaborators.
     * @example
     * // Create many BoardCollaborators
     * const boardCollaborator = await prisma.boardCollaborator.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BoardCollaboratorCreateManyArgs>(args?: SelectSubset<T, BoardCollaboratorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BoardCollaborators and returns the data saved in the database.
     * @param {BoardCollaboratorCreateManyAndReturnArgs} args - Arguments to create many BoardCollaborators.
     * @example
     * // Create many BoardCollaborators
     * const boardCollaborator = await prisma.boardCollaborator.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BoardCollaborators and only return the `id`
     * const boardCollaboratorWithIdOnly = await prisma.boardCollaborator.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BoardCollaboratorCreateManyAndReturnArgs>(args?: SelectSubset<T, BoardCollaboratorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardCollaboratorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BoardCollaborator.
     * @param {BoardCollaboratorDeleteArgs} args - Arguments to delete one BoardCollaborator.
     * @example
     * // Delete one BoardCollaborator
     * const BoardCollaborator = await prisma.boardCollaborator.delete({
     *   where: {
     *     // ... filter to delete one BoardCollaborator
     *   }
     * })
     * 
     */
    delete<T extends BoardCollaboratorDeleteArgs>(args: SelectSubset<T, BoardCollaboratorDeleteArgs<ExtArgs>>): Prisma__BoardCollaboratorClient<$Result.GetResult<Prisma.$BoardCollaboratorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BoardCollaborator.
     * @param {BoardCollaboratorUpdateArgs} args - Arguments to update one BoardCollaborator.
     * @example
     * // Update one BoardCollaborator
     * const boardCollaborator = await prisma.boardCollaborator.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BoardCollaboratorUpdateArgs>(args: SelectSubset<T, BoardCollaboratorUpdateArgs<ExtArgs>>): Prisma__BoardCollaboratorClient<$Result.GetResult<Prisma.$BoardCollaboratorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BoardCollaborators.
     * @param {BoardCollaboratorDeleteManyArgs} args - Arguments to filter BoardCollaborators to delete.
     * @example
     * // Delete a few BoardCollaborators
     * const { count } = await prisma.boardCollaborator.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BoardCollaboratorDeleteManyArgs>(args?: SelectSubset<T, BoardCollaboratorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BoardCollaborators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardCollaboratorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BoardCollaborators
     * const boardCollaborator = await prisma.boardCollaborator.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BoardCollaboratorUpdateManyArgs>(args: SelectSubset<T, BoardCollaboratorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BoardCollaborators and returns the data updated in the database.
     * @param {BoardCollaboratorUpdateManyAndReturnArgs} args - Arguments to update many BoardCollaborators.
     * @example
     * // Update many BoardCollaborators
     * const boardCollaborator = await prisma.boardCollaborator.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BoardCollaborators and only return the `id`
     * const boardCollaboratorWithIdOnly = await prisma.boardCollaborator.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BoardCollaboratorUpdateManyAndReturnArgs>(args: SelectSubset<T, BoardCollaboratorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardCollaboratorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BoardCollaborator.
     * @param {BoardCollaboratorUpsertArgs} args - Arguments to update or create a BoardCollaborator.
     * @example
     * // Update or create a BoardCollaborator
     * const boardCollaborator = await prisma.boardCollaborator.upsert({
     *   create: {
     *     // ... data to create a BoardCollaborator
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BoardCollaborator we want to update
     *   }
     * })
     */
    upsert<T extends BoardCollaboratorUpsertArgs>(args: SelectSubset<T, BoardCollaboratorUpsertArgs<ExtArgs>>): Prisma__BoardCollaboratorClient<$Result.GetResult<Prisma.$BoardCollaboratorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BoardCollaborators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardCollaboratorCountArgs} args - Arguments to filter BoardCollaborators to count.
     * @example
     * // Count the number of BoardCollaborators
     * const count = await prisma.boardCollaborator.count({
     *   where: {
     *     // ... the filter for the BoardCollaborators we want to count
     *   }
     * })
    **/
    count<T extends BoardCollaboratorCountArgs>(
      args?: Subset<T, BoardCollaboratorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BoardCollaboratorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BoardCollaborator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardCollaboratorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BoardCollaboratorAggregateArgs>(args: Subset<T, BoardCollaboratorAggregateArgs>): Prisma.PrismaPromise<GetBoardCollaboratorAggregateType<T>>

    /**
     * Group by BoardCollaborator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardCollaboratorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BoardCollaboratorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BoardCollaboratorGroupByArgs['orderBy'] }
        : { orderBy?: BoardCollaboratorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BoardCollaboratorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBoardCollaboratorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BoardCollaborator model
   */
  readonly fields: BoardCollaboratorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BoardCollaborator.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BoardCollaboratorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    board<T extends BoardDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BoardDefaultArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BoardCollaborator model
   */
  interface BoardCollaboratorFieldRefs {
    readonly id: FieldRef<"BoardCollaborator", 'String'>
    readonly boardId: FieldRef<"BoardCollaborator", 'String'>
    readonly userId: FieldRef<"BoardCollaborator", 'String'>
    readonly role: FieldRef<"BoardCollaborator", 'String'>
    readonly createdAt: FieldRef<"BoardCollaborator", 'DateTime'>
    readonly updatedAt: FieldRef<"BoardCollaborator", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BoardCollaborator findUnique
   */
  export type BoardCollaboratorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardCollaborator
     */
    select?: BoardCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardCollaborator
     */
    omit?: BoardCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardCollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which BoardCollaborator to fetch.
     */
    where: BoardCollaboratorWhereUniqueInput
  }

  /**
   * BoardCollaborator findUniqueOrThrow
   */
  export type BoardCollaboratorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardCollaborator
     */
    select?: BoardCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardCollaborator
     */
    omit?: BoardCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardCollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which BoardCollaborator to fetch.
     */
    where: BoardCollaboratorWhereUniqueInput
  }

  /**
   * BoardCollaborator findFirst
   */
  export type BoardCollaboratorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardCollaborator
     */
    select?: BoardCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardCollaborator
     */
    omit?: BoardCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardCollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which BoardCollaborator to fetch.
     */
    where?: BoardCollaboratorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BoardCollaborators to fetch.
     */
    orderBy?: BoardCollaboratorOrderByWithRelationInput | BoardCollaboratorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BoardCollaborators.
     */
    cursor?: BoardCollaboratorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BoardCollaborators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BoardCollaborators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BoardCollaborators.
     */
    distinct?: BoardCollaboratorScalarFieldEnum | BoardCollaboratorScalarFieldEnum[]
  }

  /**
   * BoardCollaborator findFirstOrThrow
   */
  export type BoardCollaboratorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardCollaborator
     */
    select?: BoardCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardCollaborator
     */
    omit?: BoardCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardCollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which BoardCollaborator to fetch.
     */
    where?: BoardCollaboratorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BoardCollaborators to fetch.
     */
    orderBy?: BoardCollaboratorOrderByWithRelationInput | BoardCollaboratorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BoardCollaborators.
     */
    cursor?: BoardCollaboratorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BoardCollaborators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BoardCollaborators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BoardCollaborators.
     */
    distinct?: BoardCollaboratorScalarFieldEnum | BoardCollaboratorScalarFieldEnum[]
  }

  /**
   * BoardCollaborator findMany
   */
  export type BoardCollaboratorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardCollaborator
     */
    select?: BoardCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardCollaborator
     */
    omit?: BoardCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardCollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which BoardCollaborators to fetch.
     */
    where?: BoardCollaboratorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BoardCollaborators to fetch.
     */
    orderBy?: BoardCollaboratorOrderByWithRelationInput | BoardCollaboratorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BoardCollaborators.
     */
    cursor?: BoardCollaboratorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BoardCollaborators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BoardCollaborators.
     */
    skip?: number
    distinct?: BoardCollaboratorScalarFieldEnum | BoardCollaboratorScalarFieldEnum[]
  }

  /**
   * BoardCollaborator create
   */
  export type BoardCollaboratorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardCollaborator
     */
    select?: BoardCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardCollaborator
     */
    omit?: BoardCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardCollaboratorInclude<ExtArgs> | null
    /**
     * The data needed to create a BoardCollaborator.
     */
    data: XOR<BoardCollaboratorCreateInput, BoardCollaboratorUncheckedCreateInput>
  }

  /**
   * BoardCollaborator createMany
   */
  export type BoardCollaboratorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BoardCollaborators.
     */
    data: BoardCollaboratorCreateManyInput | BoardCollaboratorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BoardCollaborator createManyAndReturn
   */
  export type BoardCollaboratorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardCollaborator
     */
    select?: BoardCollaboratorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BoardCollaborator
     */
    omit?: BoardCollaboratorOmit<ExtArgs> | null
    /**
     * The data used to create many BoardCollaborators.
     */
    data: BoardCollaboratorCreateManyInput | BoardCollaboratorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardCollaboratorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BoardCollaborator update
   */
  export type BoardCollaboratorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardCollaborator
     */
    select?: BoardCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardCollaborator
     */
    omit?: BoardCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardCollaboratorInclude<ExtArgs> | null
    /**
     * The data needed to update a BoardCollaborator.
     */
    data: XOR<BoardCollaboratorUpdateInput, BoardCollaboratorUncheckedUpdateInput>
    /**
     * Choose, which BoardCollaborator to update.
     */
    where: BoardCollaboratorWhereUniqueInput
  }

  /**
   * BoardCollaborator updateMany
   */
  export type BoardCollaboratorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BoardCollaborators.
     */
    data: XOR<BoardCollaboratorUpdateManyMutationInput, BoardCollaboratorUncheckedUpdateManyInput>
    /**
     * Filter which BoardCollaborators to update
     */
    where?: BoardCollaboratorWhereInput
    /**
     * Limit how many BoardCollaborators to update.
     */
    limit?: number
  }

  /**
   * BoardCollaborator updateManyAndReturn
   */
  export type BoardCollaboratorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardCollaborator
     */
    select?: BoardCollaboratorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BoardCollaborator
     */
    omit?: BoardCollaboratorOmit<ExtArgs> | null
    /**
     * The data used to update BoardCollaborators.
     */
    data: XOR<BoardCollaboratorUpdateManyMutationInput, BoardCollaboratorUncheckedUpdateManyInput>
    /**
     * Filter which BoardCollaborators to update
     */
    where?: BoardCollaboratorWhereInput
    /**
     * Limit how many BoardCollaborators to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardCollaboratorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BoardCollaborator upsert
   */
  export type BoardCollaboratorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardCollaborator
     */
    select?: BoardCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardCollaborator
     */
    omit?: BoardCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardCollaboratorInclude<ExtArgs> | null
    /**
     * The filter to search for the BoardCollaborator to update in case it exists.
     */
    where: BoardCollaboratorWhereUniqueInput
    /**
     * In case the BoardCollaborator found by the `where` argument doesn't exist, create a new BoardCollaborator with this data.
     */
    create: XOR<BoardCollaboratorCreateInput, BoardCollaboratorUncheckedCreateInput>
    /**
     * In case the BoardCollaborator was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BoardCollaboratorUpdateInput, BoardCollaboratorUncheckedUpdateInput>
  }

  /**
   * BoardCollaborator delete
   */
  export type BoardCollaboratorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardCollaborator
     */
    select?: BoardCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardCollaborator
     */
    omit?: BoardCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardCollaboratorInclude<ExtArgs> | null
    /**
     * Filter which BoardCollaborator to delete.
     */
    where: BoardCollaboratorWhereUniqueInput
  }

  /**
   * BoardCollaborator deleteMany
   */
  export type BoardCollaboratorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BoardCollaborators to delete
     */
    where?: BoardCollaboratorWhereInput
    /**
     * Limit how many BoardCollaborators to delete.
     */
    limit?: number
  }

  /**
   * BoardCollaborator without action
   */
  export type BoardCollaboratorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardCollaborator
     */
    select?: BoardCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardCollaborator
     */
    omit?: BoardCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardCollaboratorInclude<ExtArgs> | null
  }


  /**
   * Model BoardAction
   */

  export type AggregateBoardAction = {
    _count: BoardActionCountAggregateOutputType | null
    _min: BoardActionMinAggregateOutputType | null
    _max: BoardActionMaxAggregateOutputType | null
  }

  export type BoardActionMinAggregateOutputType = {
    id: string | null
    boardId: string | null
    userId: string | null
    action: string | null
    timestamp: Date | null
  }

  export type BoardActionMaxAggregateOutputType = {
    id: string | null
    boardId: string | null
    userId: string | null
    action: string | null
    timestamp: Date | null
  }

  export type BoardActionCountAggregateOutputType = {
    id: number
    boardId: number
    userId: number
    action: number
    timestamp: number
    _all: number
  }


  export type BoardActionMinAggregateInputType = {
    id?: true
    boardId?: true
    userId?: true
    action?: true
    timestamp?: true
  }

  export type BoardActionMaxAggregateInputType = {
    id?: true
    boardId?: true
    userId?: true
    action?: true
    timestamp?: true
  }

  export type BoardActionCountAggregateInputType = {
    id?: true
    boardId?: true
    userId?: true
    action?: true
    timestamp?: true
    _all?: true
  }

  export type BoardActionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BoardAction to aggregate.
     */
    where?: BoardActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BoardActions to fetch.
     */
    orderBy?: BoardActionOrderByWithRelationInput | BoardActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BoardActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BoardActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BoardActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BoardActions
    **/
    _count?: true | BoardActionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BoardActionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BoardActionMaxAggregateInputType
  }

  export type GetBoardActionAggregateType<T extends BoardActionAggregateArgs> = {
        [P in keyof T & keyof AggregateBoardAction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBoardAction[P]>
      : GetScalarType<T[P], AggregateBoardAction[P]>
  }




  export type BoardActionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BoardActionWhereInput
    orderBy?: BoardActionOrderByWithAggregationInput | BoardActionOrderByWithAggregationInput[]
    by: BoardActionScalarFieldEnum[] | BoardActionScalarFieldEnum
    having?: BoardActionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BoardActionCountAggregateInputType | true
    _min?: BoardActionMinAggregateInputType
    _max?: BoardActionMaxAggregateInputType
  }

  export type BoardActionGroupByOutputType = {
    id: string
    boardId: string
    userId: string
    action: string
    timestamp: Date
    _count: BoardActionCountAggregateOutputType | null
    _min: BoardActionMinAggregateOutputType | null
    _max: BoardActionMaxAggregateOutputType | null
  }

  type GetBoardActionGroupByPayload<T extends BoardActionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BoardActionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BoardActionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BoardActionGroupByOutputType[P]>
            : GetScalarType<T[P], BoardActionGroupByOutputType[P]>
        }
      >
    >


  export type BoardActionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    boardId?: boolean
    userId?: boolean
    action?: boolean
    timestamp?: boolean
    board?: boolean | BoardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["boardAction"]>

  export type BoardActionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    boardId?: boolean
    userId?: boolean
    action?: boolean
    timestamp?: boolean
    board?: boolean | BoardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["boardAction"]>

  export type BoardActionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    boardId?: boolean
    userId?: boolean
    action?: boolean
    timestamp?: boolean
    board?: boolean | BoardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["boardAction"]>

  export type BoardActionSelectScalar = {
    id?: boolean
    boardId?: boolean
    userId?: boolean
    action?: boolean
    timestamp?: boolean
  }

  export type BoardActionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "boardId" | "userId" | "action" | "timestamp", ExtArgs["result"]["boardAction"]>
  export type BoardActionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    board?: boolean | BoardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BoardActionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    board?: boolean | BoardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BoardActionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    board?: boolean | BoardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BoardActionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BoardAction"
    objects: {
      board: Prisma.$BoardPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      boardId: string
      userId: string
      action: string
      timestamp: Date
    }, ExtArgs["result"]["boardAction"]>
    composites: {}
  }

  type BoardActionGetPayload<S extends boolean | null | undefined | BoardActionDefaultArgs> = $Result.GetResult<Prisma.$BoardActionPayload, S>

  type BoardActionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BoardActionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BoardActionCountAggregateInputType | true
    }

  export interface BoardActionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BoardAction'], meta: { name: 'BoardAction' } }
    /**
     * Find zero or one BoardAction that matches the filter.
     * @param {BoardActionFindUniqueArgs} args - Arguments to find a BoardAction
     * @example
     * // Get one BoardAction
     * const boardAction = await prisma.boardAction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BoardActionFindUniqueArgs>(args: SelectSubset<T, BoardActionFindUniqueArgs<ExtArgs>>): Prisma__BoardActionClient<$Result.GetResult<Prisma.$BoardActionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BoardAction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BoardActionFindUniqueOrThrowArgs} args - Arguments to find a BoardAction
     * @example
     * // Get one BoardAction
     * const boardAction = await prisma.boardAction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BoardActionFindUniqueOrThrowArgs>(args: SelectSubset<T, BoardActionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BoardActionClient<$Result.GetResult<Prisma.$BoardActionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BoardAction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardActionFindFirstArgs} args - Arguments to find a BoardAction
     * @example
     * // Get one BoardAction
     * const boardAction = await prisma.boardAction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BoardActionFindFirstArgs>(args?: SelectSubset<T, BoardActionFindFirstArgs<ExtArgs>>): Prisma__BoardActionClient<$Result.GetResult<Prisma.$BoardActionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BoardAction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardActionFindFirstOrThrowArgs} args - Arguments to find a BoardAction
     * @example
     * // Get one BoardAction
     * const boardAction = await prisma.boardAction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BoardActionFindFirstOrThrowArgs>(args?: SelectSubset<T, BoardActionFindFirstOrThrowArgs<ExtArgs>>): Prisma__BoardActionClient<$Result.GetResult<Prisma.$BoardActionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BoardActions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardActionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BoardActions
     * const boardActions = await prisma.boardAction.findMany()
     * 
     * // Get first 10 BoardActions
     * const boardActions = await prisma.boardAction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const boardActionWithIdOnly = await prisma.boardAction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BoardActionFindManyArgs>(args?: SelectSubset<T, BoardActionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BoardAction.
     * @param {BoardActionCreateArgs} args - Arguments to create a BoardAction.
     * @example
     * // Create one BoardAction
     * const BoardAction = await prisma.boardAction.create({
     *   data: {
     *     // ... data to create a BoardAction
     *   }
     * })
     * 
     */
    create<T extends BoardActionCreateArgs>(args: SelectSubset<T, BoardActionCreateArgs<ExtArgs>>): Prisma__BoardActionClient<$Result.GetResult<Prisma.$BoardActionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BoardActions.
     * @param {BoardActionCreateManyArgs} args - Arguments to create many BoardActions.
     * @example
     * // Create many BoardActions
     * const boardAction = await prisma.boardAction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BoardActionCreateManyArgs>(args?: SelectSubset<T, BoardActionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BoardActions and returns the data saved in the database.
     * @param {BoardActionCreateManyAndReturnArgs} args - Arguments to create many BoardActions.
     * @example
     * // Create many BoardActions
     * const boardAction = await prisma.boardAction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BoardActions and only return the `id`
     * const boardActionWithIdOnly = await prisma.boardAction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BoardActionCreateManyAndReturnArgs>(args?: SelectSubset<T, BoardActionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardActionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BoardAction.
     * @param {BoardActionDeleteArgs} args - Arguments to delete one BoardAction.
     * @example
     * // Delete one BoardAction
     * const BoardAction = await prisma.boardAction.delete({
     *   where: {
     *     // ... filter to delete one BoardAction
     *   }
     * })
     * 
     */
    delete<T extends BoardActionDeleteArgs>(args: SelectSubset<T, BoardActionDeleteArgs<ExtArgs>>): Prisma__BoardActionClient<$Result.GetResult<Prisma.$BoardActionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BoardAction.
     * @param {BoardActionUpdateArgs} args - Arguments to update one BoardAction.
     * @example
     * // Update one BoardAction
     * const boardAction = await prisma.boardAction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BoardActionUpdateArgs>(args: SelectSubset<T, BoardActionUpdateArgs<ExtArgs>>): Prisma__BoardActionClient<$Result.GetResult<Prisma.$BoardActionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BoardActions.
     * @param {BoardActionDeleteManyArgs} args - Arguments to filter BoardActions to delete.
     * @example
     * // Delete a few BoardActions
     * const { count } = await prisma.boardAction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BoardActionDeleteManyArgs>(args?: SelectSubset<T, BoardActionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BoardActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardActionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BoardActions
     * const boardAction = await prisma.boardAction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BoardActionUpdateManyArgs>(args: SelectSubset<T, BoardActionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BoardActions and returns the data updated in the database.
     * @param {BoardActionUpdateManyAndReturnArgs} args - Arguments to update many BoardActions.
     * @example
     * // Update many BoardActions
     * const boardAction = await prisma.boardAction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BoardActions and only return the `id`
     * const boardActionWithIdOnly = await prisma.boardAction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BoardActionUpdateManyAndReturnArgs>(args: SelectSubset<T, BoardActionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardActionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BoardAction.
     * @param {BoardActionUpsertArgs} args - Arguments to update or create a BoardAction.
     * @example
     * // Update or create a BoardAction
     * const boardAction = await prisma.boardAction.upsert({
     *   create: {
     *     // ... data to create a BoardAction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BoardAction we want to update
     *   }
     * })
     */
    upsert<T extends BoardActionUpsertArgs>(args: SelectSubset<T, BoardActionUpsertArgs<ExtArgs>>): Prisma__BoardActionClient<$Result.GetResult<Prisma.$BoardActionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BoardActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardActionCountArgs} args - Arguments to filter BoardActions to count.
     * @example
     * // Count the number of BoardActions
     * const count = await prisma.boardAction.count({
     *   where: {
     *     // ... the filter for the BoardActions we want to count
     *   }
     * })
    **/
    count<T extends BoardActionCountArgs>(
      args?: Subset<T, BoardActionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BoardActionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BoardAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardActionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BoardActionAggregateArgs>(args: Subset<T, BoardActionAggregateArgs>): Prisma.PrismaPromise<GetBoardActionAggregateType<T>>

    /**
     * Group by BoardAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardActionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BoardActionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BoardActionGroupByArgs['orderBy'] }
        : { orderBy?: BoardActionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BoardActionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBoardActionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BoardAction model
   */
  readonly fields: BoardActionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BoardAction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BoardActionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    board<T extends BoardDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BoardDefaultArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BoardAction model
   */
  interface BoardActionFieldRefs {
    readonly id: FieldRef<"BoardAction", 'String'>
    readonly boardId: FieldRef<"BoardAction", 'String'>
    readonly userId: FieldRef<"BoardAction", 'String'>
    readonly action: FieldRef<"BoardAction", 'String'>
    readonly timestamp: FieldRef<"BoardAction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BoardAction findUnique
   */
  export type BoardActionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardAction
     */
    select?: BoardActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardAction
     */
    omit?: BoardActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardActionInclude<ExtArgs> | null
    /**
     * Filter, which BoardAction to fetch.
     */
    where: BoardActionWhereUniqueInput
  }

  /**
   * BoardAction findUniqueOrThrow
   */
  export type BoardActionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardAction
     */
    select?: BoardActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardAction
     */
    omit?: BoardActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardActionInclude<ExtArgs> | null
    /**
     * Filter, which BoardAction to fetch.
     */
    where: BoardActionWhereUniqueInput
  }

  /**
   * BoardAction findFirst
   */
  export type BoardActionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardAction
     */
    select?: BoardActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardAction
     */
    omit?: BoardActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardActionInclude<ExtArgs> | null
    /**
     * Filter, which BoardAction to fetch.
     */
    where?: BoardActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BoardActions to fetch.
     */
    orderBy?: BoardActionOrderByWithRelationInput | BoardActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BoardActions.
     */
    cursor?: BoardActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BoardActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BoardActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BoardActions.
     */
    distinct?: BoardActionScalarFieldEnum | BoardActionScalarFieldEnum[]
  }

  /**
   * BoardAction findFirstOrThrow
   */
  export type BoardActionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardAction
     */
    select?: BoardActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardAction
     */
    omit?: BoardActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardActionInclude<ExtArgs> | null
    /**
     * Filter, which BoardAction to fetch.
     */
    where?: BoardActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BoardActions to fetch.
     */
    orderBy?: BoardActionOrderByWithRelationInput | BoardActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BoardActions.
     */
    cursor?: BoardActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BoardActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BoardActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BoardActions.
     */
    distinct?: BoardActionScalarFieldEnum | BoardActionScalarFieldEnum[]
  }

  /**
   * BoardAction findMany
   */
  export type BoardActionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardAction
     */
    select?: BoardActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardAction
     */
    omit?: BoardActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardActionInclude<ExtArgs> | null
    /**
     * Filter, which BoardActions to fetch.
     */
    where?: BoardActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BoardActions to fetch.
     */
    orderBy?: BoardActionOrderByWithRelationInput | BoardActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BoardActions.
     */
    cursor?: BoardActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BoardActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BoardActions.
     */
    skip?: number
    distinct?: BoardActionScalarFieldEnum | BoardActionScalarFieldEnum[]
  }

  /**
   * BoardAction create
   */
  export type BoardActionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardAction
     */
    select?: BoardActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardAction
     */
    omit?: BoardActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardActionInclude<ExtArgs> | null
    /**
     * The data needed to create a BoardAction.
     */
    data: XOR<BoardActionCreateInput, BoardActionUncheckedCreateInput>
  }

  /**
   * BoardAction createMany
   */
  export type BoardActionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BoardActions.
     */
    data: BoardActionCreateManyInput | BoardActionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BoardAction createManyAndReturn
   */
  export type BoardActionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardAction
     */
    select?: BoardActionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BoardAction
     */
    omit?: BoardActionOmit<ExtArgs> | null
    /**
     * The data used to create many BoardActions.
     */
    data: BoardActionCreateManyInput | BoardActionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardActionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BoardAction update
   */
  export type BoardActionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardAction
     */
    select?: BoardActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardAction
     */
    omit?: BoardActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardActionInclude<ExtArgs> | null
    /**
     * The data needed to update a BoardAction.
     */
    data: XOR<BoardActionUpdateInput, BoardActionUncheckedUpdateInput>
    /**
     * Choose, which BoardAction to update.
     */
    where: BoardActionWhereUniqueInput
  }

  /**
   * BoardAction updateMany
   */
  export type BoardActionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BoardActions.
     */
    data: XOR<BoardActionUpdateManyMutationInput, BoardActionUncheckedUpdateManyInput>
    /**
     * Filter which BoardActions to update
     */
    where?: BoardActionWhereInput
    /**
     * Limit how many BoardActions to update.
     */
    limit?: number
  }

  /**
   * BoardAction updateManyAndReturn
   */
  export type BoardActionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardAction
     */
    select?: BoardActionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BoardAction
     */
    omit?: BoardActionOmit<ExtArgs> | null
    /**
     * The data used to update BoardActions.
     */
    data: XOR<BoardActionUpdateManyMutationInput, BoardActionUncheckedUpdateManyInput>
    /**
     * Filter which BoardActions to update
     */
    where?: BoardActionWhereInput
    /**
     * Limit how many BoardActions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardActionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BoardAction upsert
   */
  export type BoardActionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardAction
     */
    select?: BoardActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardAction
     */
    omit?: BoardActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardActionInclude<ExtArgs> | null
    /**
     * The filter to search for the BoardAction to update in case it exists.
     */
    where: BoardActionWhereUniqueInput
    /**
     * In case the BoardAction found by the `where` argument doesn't exist, create a new BoardAction with this data.
     */
    create: XOR<BoardActionCreateInput, BoardActionUncheckedCreateInput>
    /**
     * In case the BoardAction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BoardActionUpdateInput, BoardActionUncheckedUpdateInput>
  }

  /**
   * BoardAction delete
   */
  export type BoardActionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardAction
     */
    select?: BoardActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardAction
     */
    omit?: BoardActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardActionInclude<ExtArgs> | null
    /**
     * Filter which BoardAction to delete.
     */
    where: BoardActionWhereUniqueInput
  }

  /**
   * BoardAction deleteMany
   */
  export type BoardActionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BoardActions to delete
     */
    where?: BoardActionWhereInput
    /**
     * Limit how many BoardActions to delete.
     */
    limit?: number
  }

  /**
   * BoardAction without action
   */
  export type BoardActionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardAction
     */
    select?: BoardActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardAction
     */
    omit?: BoardActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardActionInclude<ExtArgs> | null
  }


  /**
   * Model BoardSnapshot
   */

  export type AggregateBoardSnapshot = {
    _count: BoardSnapshotCountAggregateOutputType | null
    _min: BoardSnapshotMinAggregateOutputType | null
    _max: BoardSnapshotMaxAggregateOutputType | null
  }

  export type BoardSnapshotMinAggregateOutputType = {
    id: string | null
    boardId: string | null
    data: string | null
    timestamp: Date | null
  }

  export type BoardSnapshotMaxAggregateOutputType = {
    id: string | null
    boardId: string | null
    data: string | null
    timestamp: Date | null
  }

  export type BoardSnapshotCountAggregateOutputType = {
    id: number
    boardId: number
    data: number
    timestamp: number
    _all: number
  }


  export type BoardSnapshotMinAggregateInputType = {
    id?: true
    boardId?: true
    data?: true
    timestamp?: true
  }

  export type BoardSnapshotMaxAggregateInputType = {
    id?: true
    boardId?: true
    data?: true
    timestamp?: true
  }

  export type BoardSnapshotCountAggregateInputType = {
    id?: true
    boardId?: true
    data?: true
    timestamp?: true
    _all?: true
  }

  export type BoardSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BoardSnapshot to aggregate.
     */
    where?: BoardSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BoardSnapshots to fetch.
     */
    orderBy?: BoardSnapshotOrderByWithRelationInput | BoardSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BoardSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BoardSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BoardSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BoardSnapshots
    **/
    _count?: true | BoardSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BoardSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BoardSnapshotMaxAggregateInputType
  }

  export type GetBoardSnapshotAggregateType<T extends BoardSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateBoardSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBoardSnapshot[P]>
      : GetScalarType<T[P], AggregateBoardSnapshot[P]>
  }




  export type BoardSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BoardSnapshotWhereInput
    orderBy?: BoardSnapshotOrderByWithAggregationInput | BoardSnapshotOrderByWithAggregationInput[]
    by: BoardSnapshotScalarFieldEnum[] | BoardSnapshotScalarFieldEnum
    having?: BoardSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BoardSnapshotCountAggregateInputType | true
    _min?: BoardSnapshotMinAggregateInputType
    _max?: BoardSnapshotMaxAggregateInputType
  }

  export type BoardSnapshotGroupByOutputType = {
    id: string
    boardId: string
    data: string
    timestamp: Date
    _count: BoardSnapshotCountAggregateOutputType | null
    _min: BoardSnapshotMinAggregateOutputType | null
    _max: BoardSnapshotMaxAggregateOutputType | null
  }

  type GetBoardSnapshotGroupByPayload<T extends BoardSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BoardSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BoardSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BoardSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], BoardSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type BoardSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    boardId?: boolean
    data?: boolean
    timestamp?: boolean
    board?: boolean | BoardDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["boardSnapshot"]>

  export type BoardSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    boardId?: boolean
    data?: boolean
    timestamp?: boolean
    board?: boolean | BoardDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["boardSnapshot"]>

  export type BoardSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    boardId?: boolean
    data?: boolean
    timestamp?: boolean
    board?: boolean | BoardDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["boardSnapshot"]>

  export type BoardSnapshotSelectScalar = {
    id?: boolean
    boardId?: boolean
    data?: boolean
    timestamp?: boolean
  }

  export type BoardSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "boardId" | "data" | "timestamp", ExtArgs["result"]["boardSnapshot"]>
  export type BoardSnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    board?: boolean | BoardDefaultArgs<ExtArgs>
  }
  export type BoardSnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    board?: boolean | BoardDefaultArgs<ExtArgs>
  }
  export type BoardSnapshotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    board?: boolean | BoardDefaultArgs<ExtArgs>
  }

  export type $BoardSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BoardSnapshot"
    objects: {
      board: Prisma.$BoardPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      boardId: string
      data: string
      timestamp: Date
    }, ExtArgs["result"]["boardSnapshot"]>
    composites: {}
  }

  type BoardSnapshotGetPayload<S extends boolean | null | undefined | BoardSnapshotDefaultArgs> = $Result.GetResult<Prisma.$BoardSnapshotPayload, S>

  type BoardSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BoardSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BoardSnapshotCountAggregateInputType | true
    }

  export interface BoardSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BoardSnapshot'], meta: { name: 'BoardSnapshot' } }
    /**
     * Find zero or one BoardSnapshot that matches the filter.
     * @param {BoardSnapshotFindUniqueArgs} args - Arguments to find a BoardSnapshot
     * @example
     * // Get one BoardSnapshot
     * const boardSnapshot = await prisma.boardSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BoardSnapshotFindUniqueArgs>(args: SelectSubset<T, BoardSnapshotFindUniqueArgs<ExtArgs>>): Prisma__BoardSnapshotClient<$Result.GetResult<Prisma.$BoardSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BoardSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BoardSnapshotFindUniqueOrThrowArgs} args - Arguments to find a BoardSnapshot
     * @example
     * // Get one BoardSnapshot
     * const boardSnapshot = await prisma.boardSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BoardSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, BoardSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BoardSnapshotClient<$Result.GetResult<Prisma.$BoardSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BoardSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardSnapshotFindFirstArgs} args - Arguments to find a BoardSnapshot
     * @example
     * // Get one BoardSnapshot
     * const boardSnapshot = await prisma.boardSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BoardSnapshotFindFirstArgs>(args?: SelectSubset<T, BoardSnapshotFindFirstArgs<ExtArgs>>): Prisma__BoardSnapshotClient<$Result.GetResult<Prisma.$BoardSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BoardSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardSnapshotFindFirstOrThrowArgs} args - Arguments to find a BoardSnapshot
     * @example
     * // Get one BoardSnapshot
     * const boardSnapshot = await prisma.boardSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BoardSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, BoardSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__BoardSnapshotClient<$Result.GetResult<Prisma.$BoardSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BoardSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BoardSnapshots
     * const boardSnapshots = await prisma.boardSnapshot.findMany()
     * 
     * // Get first 10 BoardSnapshots
     * const boardSnapshots = await prisma.boardSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const boardSnapshotWithIdOnly = await prisma.boardSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BoardSnapshotFindManyArgs>(args?: SelectSubset<T, BoardSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BoardSnapshot.
     * @param {BoardSnapshotCreateArgs} args - Arguments to create a BoardSnapshot.
     * @example
     * // Create one BoardSnapshot
     * const BoardSnapshot = await prisma.boardSnapshot.create({
     *   data: {
     *     // ... data to create a BoardSnapshot
     *   }
     * })
     * 
     */
    create<T extends BoardSnapshotCreateArgs>(args: SelectSubset<T, BoardSnapshotCreateArgs<ExtArgs>>): Prisma__BoardSnapshotClient<$Result.GetResult<Prisma.$BoardSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BoardSnapshots.
     * @param {BoardSnapshotCreateManyArgs} args - Arguments to create many BoardSnapshots.
     * @example
     * // Create many BoardSnapshots
     * const boardSnapshot = await prisma.boardSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BoardSnapshotCreateManyArgs>(args?: SelectSubset<T, BoardSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BoardSnapshots and returns the data saved in the database.
     * @param {BoardSnapshotCreateManyAndReturnArgs} args - Arguments to create many BoardSnapshots.
     * @example
     * // Create many BoardSnapshots
     * const boardSnapshot = await prisma.boardSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BoardSnapshots and only return the `id`
     * const boardSnapshotWithIdOnly = await prisma.boardSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BoardSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, BoardSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BoardSnapshot.
     * @param {BoardSnapshotDeleteArgs} args - Arguments to delete one BoardSnapshot.
     * @example
     * // Delete one BoardSnapshot
     * const BoardSnapshot = await prisma.boardSnapshot.delete({
     *   where: {
     *     // ... filter to delete one BoardSnapshot
     *   }
     * })
     * 
     */
    delete<T extends BoardSnapshotDeleteArgs>(args: SelectSubset<T, BoardSnapshotDeleteArgs<ExtArgs>>): Prisma__BoardSnapshotClient<$Result.GetResult<Prisma.$BoardSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BoardSnapshot.
     * @param {BoardSnapshotUpdateArgs} args - Arguments to update one BoardSnapshot.
     * @example
     * // Update one BoardSnapshot
     * const boardSnapshot = await prisma.boardSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BoardSnapshotUpdateArgs>(args: SelectSubset<T, BoardSnapshotUpdateArgs<ExtArgs>>): Prisma__BoardSnapshotClient<$Result.GetResult<Prisma.$BoardSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BoardSnapshots.
     * @param {BoardSnapshotDeleteManyArgs} args - Arguments to filter BoardSnapshots to delete.
     * @example
     * // Delete a few BoardSnapshots
     * const { count } = await prisma.boardSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BoardSnapshotDeleteManyArgs>(args?: SelectSubset<T, BoardSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BoardSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BoardSnapshots
     * const boardSnapshot = await prisma.boardSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BoardSnapshotUpdateManyArgs>(args: SelectSubset<T, BoardSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BoardSnapshots and returns the data updated in the database.
     * @param {BoardSnapshotUpdateManyAndReturnArgs} args - Arguments to update many BoardSnapshots.
     * @example
     * // Update many BoardSnapshots
     * const boardSnapshot = await prisma.boardSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BoardSnapshots and only return the `id`
     * const boardSnapshotWithIdOnly = await prisma.boardSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BoardSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, BoardSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoardSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BoardSnapshot.
     * @param {BoardSnapshotUpsertArgs} args - Arguments to update or create a BoardSnapshot.
     * @example
     * // Update or create a BoardSnapshot
     * const boardSnapshot = await prisma.boardSnapshot.upsert({
     *   create: {
     *     // ... data to create a BoardSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BoardSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends BoardSnapshotUpsertArgs>(args: SelectSubset<T, BoardSnapshotUpsertArgs<ExtArgs>>): Prisma__BoardSnapshotClient<$Result.GetResult<Prisma.$BoardSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BoardSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardSnapshotCountArgs} args - Arguments to filter BoardSnapshots to count.
     * @example
     * // Count the number of BoardSnapshots
     * const count = await prisma.boardSnapshot.count({
     *   where: {
     *     // ... the filter for the BoardSnapshots we want to count
     *   }
     * })
    **/
    count<T extends BoardSnapshotCountArgs>(
      args?: Subset<T, BoardSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BoardSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BoardSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BoardSnapshotAggregateArgs>(args: Subset<T, BoardSnapshotAggregateArgs>): Prisma.PrismaPromise<GetBoardSnapshotAggregateType<T>>

    /**
     * Group by BoardSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BoardSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BoardSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: BoardSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BoardSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBoardSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BoardSnapshot model
   */
  readonly fields: BoardSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BoardSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BoardSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    board<T extends BoardDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BoardDefaultArgs<ExtArgs>>): Prisma__BoardClient<$Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BoardSnapshot model
   */
  interface BoardSnapshotFieldRefs {
    readonly id: FieldRef<"BoardSnapshot", 'String'>
    readonly boardId: FieldRef<"BoardSnapshot", 'String'>
    readonly data: FieldRef<"BoardSnapshot", 'String'>
    readonly timestamp: FieldRef<"BoardSnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BoardSnapshot findUnique
   */
  export type BoardSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardSnapshot
     */
    select?: BoardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardSnapshot
     */
    omit?: BoardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which BoardSnapshot to fetch.
     */
    where: BoardSnapshotWhereUniqueInput
  }

  /**
   * BoardSnapshot findUniqueOrThrow
   */
  export type BoardSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardSnapshot
     */
    select?: BoardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardSnapshot
     */
    omit?: BoardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which BoardSnapshot to fetch.
     */
    where: BoardSnapshotWhereUniqueInput
  }

  /**
   * BoardSnapshot findFirst
   */
  export type BoardSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardSnapshot
     */
    select?: BoardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardSnapshot
     */
    omit?: BoardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which BoardSnapshot to fetch.
     */
    where?: BoardSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BoardSnapshots to fetch.
     */
    orderBy?: BoardSnapshotOrderByWithRelationInput | BoardSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BoardSnapshots.
     */
    cursor?: BoardSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BoardSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BoardSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BoardSnapshots.
     */
    distinct?: BoardSnapshotScalarFieldEnum | BoardSnapshotScalarFieldEnum[]
  }

  /**
   * BoardSnapshot findFirstOrThrow
   */
  export type BoardSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardSnapshot
     */
    select?: BoardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardSnapshot
     */
    omit?: BoardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which BoardSnapshot to fetch.
     */
    where?: BoardSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BoardSnapshots to fetch.
     */
    orderBy?: BoardSnapshotOrderByWithRelationInput | BoardSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BoardSnapshots.
     */
    cursor?: BoardSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BoardSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BoardSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BoardSnapshots.
     */
    distinct?: BoardSnapshotScalarFieldEnum | BoardSnapshotScalarFieldEnum[]
  }

  /**
   * BoardSnapshot findMany
   */
  export type BoardSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardSnapshot
     */
    select?: BoardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardSnapshot
     */
    omit?: BoardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which BoardSnapshots to fetch.
     */
    where?: BoardSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BoardSnapshots to fetch.
     */
    orderBy?: BoardSnapshotOrderByWithRelationInput | BoardSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BoardSnapshots.
     */
    cursor?: BoardSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BoardSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BoardSnapshots.
     */
    skip?: number
    distinct?: BoardSnapshotScalarFieldEnum | BoardSnapshotScalarFieldEnum[]
  }

  /**
   * BoardSnapshot create
   */
  export type BoardSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardSnapshot
     */
    select?: BoardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardSnapshot
     */
    omit?: BoardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a BoardSnapshot.
     */
    data: XOR<BoardSnapshotCreateInput, BoardSnapshotUncheckedCreateInput>
  }

  /**
   * BoardSnapshot createMany
   */
  export type BoardSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BoardSnapshots.
     */
    data: BoardSnapshotCreateManyInput | BoardSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BoardSnapshot createManyAndReturn
   */
  export type BoardSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardSnapshot
     */
    select?: BoardSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BoardSnapshot
     */
    omit?: BoardSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many BoardSnapshots.
     */
    data: BoardSnapshotCreateManyInput | BoardSnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardSnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BoardSnapshot update
   */
  export type BoardSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardSnapshot
     */
    select?: BoardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardSnapshot
     */
    omit?: BoardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a BoardSnapshot.
     */
    data: XOR<BoardSnapshotUpdateInput, BoardSnapshotUncheckedUpdateInput>
    /**
     * Choose, which BoardSnapshot to update.
     */
    where: BoardSnapshotWhereUniqueInput
  }

  /**
   * BoardSnapshot updateMany
   */
  export type BoardSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BoardSnapshots.
     */
    data: XOR<BoardSnapshotUpdateManyMutationInput, BoardSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which BoardSnapshots to update
     */
    where?: BoardSnapshotWhereInput
    /**
     * Limit how many BoardSnapshots to update.
     */
    limit?: number
  }

  /**
   * BoardSnapshot updateManyAndReturn
   */
  export type BoardSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardSnapshot
     */
    select?: BoardSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BoardSnapshot
     */
    omit?: BoardSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update BoardSnapshots.
     */
    data: XOR<BoardSnapshotUpdateManyMutationInput, BoardSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which BoardSnapshots to update
     */
    where?: BoardSnapshotWhereInput
    /**
     * Limit how many BoardSnapshots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardSnapshotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BoardSnapshot upsert
   */
  export type BoardSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardSnapshot
     */
    select?: BoardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardSnapshot
     */
    omit?: BoardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardSnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the BoardSnapshot to update in case it exists.
     */
    where: BoardSnapshotWhereUniqueInput
    /**
     * In case the BoardSnapshot found by the `where` argument doesn't exist, create a new BoardSnapshot with this data.
     */
    create: XOR<BoardSnapshotCreateInput, BoardSnapshotUncheckedCreateInput>
    /**
     * In case the BoardSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BoardSnapshotUpdateInput, BoardSnapshotUncheckedUpdateInput>
  }

  /**
   * BoardSnapshot delete
   */
  export type BoardSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardSnapshot
     */
    select?: BoardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardSnapshot
     */
    omit?: BoardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardSnapshotInclude<ExtArgs> | null
    /**
     * Filter which BoardSnapshot to delete.
     */
    where: BoardSnapshotWhereUniqueInput
  }

  /**
   * BoardSnapshot deleteMany
   */
  export type BoardSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BoardSnapshots to delete
     */
    where?: BoardSnapshotWhereInput
    /**
     * Limit how many BoardSnapshots to delete.
     */
    limit?: number
  }

  /**
   * BoardSnapshot without action
   */
  export type BoardSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoardSnapshot
     */
    select?: BoardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BoardSnapshot
     */
    omit?: BoardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardSnapshotInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    cognitoId: 'cognitoId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BoardScalarFieldEnum: {
    id: 'id',
    title: 'title',
    ownerId: 'ownerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BoardScalarFieldEnum = (typeof BoardScalarFieldEnum)[keyof typeof BoardScalarFieldEnum]


  export const BoardCollaboratorScalarFieldEnum: {
    id: 'id',
    boardId: 'boardId',
    userId: 'userId',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BoardCollaboratorScalarFieldEnum = (typeof BoardCollaboratorScalarFieldEnum)[keyof typeof BoardCollaboratorScalarFieldEnum]


  export const BoardActionScalarFieldEnum: {
    id: 'id',
    boardId: 'boardId',
    userId: 'userId',
    action: 'action',
    timestamp: 'timestamp'
  };

  export type BoardActionScalarFieldEnum = (typeof BoardActionScalarFieldEnum)[keyof typeof BoardActionScalarFieldEnum]


  export const BoardSnapshotScalarFieldEnum: {
    id: 'id',
    boardId: 'boardId',
    data: 'data',
    timestamp: 'timestamp'
  };

  export type BoardSnapshotScalarFieldEnum = (typeof BoardSnapshotScalarFieldEnum)[keyof typeof BoardSnapshotScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    cognitoId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    boards?: BoardListRelationFilter
    collaborations?: BoardCollaboratorListRelationFilter
    BoardAction?: BoardActionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    cognitoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    boards?: BoardOrderByRelationAggregateInput
    collaborations?: BoardCollaboratorOrderByRelationAggregateInput
    BoardAction?: BoardActionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    cognitoId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    boards?: BoardListRelationFilter
    collaborations?: BoardCollaboratorListRelationFilter
    BoardAction?: BoardActionListRelationFilter
  }, "id" | "email" | "cognitoId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    cognitoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    cognitoId?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type BoardWhereInput = {
    AND?: BoardWhereInput | BoardWhereInput[]
    OR?: BoardWhereInput[]
    NOT?: BoardWhereInput | BoardWhereInput[]
    id?: StringFilter<"Board"> | string
    title?: StringFilter<"Board"> | string
    ownerId?: StringFilter<"Board"> | string
    createdAt?: DateTimeFilter<"Board"> | Date | string
    updatedAt?: DateTimeFilter<"Board"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    collaborators?: BoardCollaboratorListRelationFilter
    actions?: BoardActionListRelationFilter
    snapshots?: BoardSnapshotListRelationFilter
  }

  export type BoardOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    collaborators?: BoardCollaboratorOrderByRelationAggregateInput
    actions?: BoardActionOrderByRelationAggregateInput
    snapshots?: BoardSnapshotOrderByRelationAggregateInput
  }

  export type BoardWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BoardWhereInput | BoardWhereInput[]
    OR?: BoardWhereInput[]
    NOT?: BoardWhereInput | BoardWhereInput[]
    title?: StringFilter<"Board"> | string
    ownerId?: StringFilter<"Board"> | string
    createdAt?: DateTimeFilter<"Board"> | Date | string
    updatedAt?: DateTimeFilter<"Board"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    collaborators?: BoardCollaboratorListRelationFilter
    actions?: BoardActionListRelationFilter
    snapshots?: BoardSnapshotListRelationFilter
  }, "id">

  export type BoardOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BoardCountOrderByAggregateInput
    _max?: BoardMaxOrderByAggregateInput
    _min?: BoardMinOrderByAggregateInput
  }

  export type BoardScalarWhereWithAggregatesInput = {
    AND?: BoardScalarWhereWithAggregatesInput | BoardScalarWhereWithAggregatesInput[]
    OR?: BoardScalarWhereWithAggregatesInput[]
    NOT?: BoardScalarWhereWithAggregatesInput | BoardScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Board"> | string
    title?: StringWithAggregatesFilter<"Board"> | string
    ownerId?: StringWithAggregatesFilter<"Board"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Board"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Board"> | Date | string
  }

  export type BoardCollaboratorWhereInput = {
    AND?: BoardCollaboratorWhereInput | BoardCollaboratorWhereInput[]
    OR?: BoardCollaboratorWhereInput[]
    NOT?: BoardCollaboratorWhereInput | BoardCollaboratorWhereInput[]
    id?: StringFilter<"BoardCollaborator"> | string
    boardId?: StringFilter<"BoardCollaborator"> | string
    userId?: StringFilter<"BoardCollaborator"> | string
    role?: StringFilter<"BoardCollaborator"> | string
    createdAt?: DateTimeFilter<"BoardCollaborator"> | Date | string
    updatedAt?: DateTimeFilter<"BoardCollaborator"> | Date | string
    board?: XOR<BoardScalarRelationFilter, BoardWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BoardCollaboratorOrderByWithRelationInput = {
    id?: SortOrder
    boardId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    board?: BoardOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type BoardCollaboratorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    boardId_userId?: BoardCollaboratorBoardIdUserIdCompoundUniqueInput
    AND?: BoardCollaboratorWhereInput | BoardCollaboratorWhereInput[]
    OR?: BoardCollaboratorWhereInput[]
    NOT?: BoardCollaboratorWhereInput | BoardCollaboratorWhereInput[]
    boardId?: StringFilter<"BoardCollaborator"> | string
    userId?: StringFilter<"BoardCollaborator"> | string
    role?: StringFilter<"BoardCollaborator"> | string
    createdAt?: DateTimeFilter<"BoardCollaborator"> | Date | string
    updatedAt?: DateTimeFilter<"BoardCollaborator"> | Date | string
    board?: XOR<BoardScalarRelationFilter, BoardWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "boardId_userId">

  export type BoardCollaboratorOrderByWithAggregationInput = {
    id?: SortOrder
    boardId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BoardCollaboratorCountOrderByAggregateInput
    _max?: BoardCollaboratorMaxOrderByAggregateInput
    _min?: BoardCollaboratorMinOrderByAggregateInput
  }

  export type BoardCollaboratorScalarWhereWithAggregatesInput = {
    AND?: BoardCollaboratorScalarWhereWithAggregatesInput | BoardCollaboratorScalarWhereWithAggregatesInput[]
    OR?: BoardCollaboratorScalarWhereWithAggregatesInput[]
    NOT?: BoardCollaboratorScalarWhereWithAggregatesInput | BoardCollaboratorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BoardCollaborator"> | string
    boardId?: StringWithAggregatesFilter<"BoardCollaborator"> | string
    userId?: StringWithAggregatesFilter<"BoardCollaborator"> | string
    role?: StringWithAggregatesFilter<"BoardCollaborator"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BoardCollaborator"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BoardCollaborator"> | Date | string
  }

  export type BoardActionWhereInput = {
    AND?: BoardActionWhereInput | BoardActionWhereInput[]
    OR?: BoardActionWhereInput[]
    NOT?: BoardActionWhereInput | BoardActionWhereInput[]
    id?: StringFilter<"BoardAction"> | string
    boardId?: StringFilter<"BoardAction"> | string
    userId?: StringFilter<"BoardAction"> | string
    action?: StringFilter<"BoardAction"> | string
    timestamp?: DateTimeFilter<"BoardAction"> | Date | string
    board?: XOR<BoardScalarRelationFilter, BoardWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BoardActionOrderByWithRelationInput = {
    id?: SortOrder
    boardId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    timestamp?: SortOrder
    board?: BoardOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type BoardActionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BoardActionWhereInput | BoardActionWhereInput[]
    OR?: BoardActionWhereInput[]
    NOT?: BoardActionWhereInput | BoardActionWhereInput[]
    boardId?: StringFilter<"BoardAction"> | string
    userId?: StringFilter<"BoardAction"> | string
    action?: StringFilter<"BoardAction"> | string
    timestamp?: DateTimeFilter<"BoardAction"> | Date | string
    board?: XOR<BoardScalarRelationFilter, BoardWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type BoardActionOrderByWithAggregationInput = {
    id?: SortOrder
    boardId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    timestamp?: SortOrder
    _count?: BoardActionCountOrderByAggregateInput
    _max?: BoardActionMaxOrderByAggregateInput
    _min?: BoardActionMinOrderByAggregateInput
  }

  export type BoardActionScalarWhereWithAggregatesInput = {
    AND?: BoardActionScalarWhereWithAggregatesInput | BoardActionScalarWhereWithAggregatesInput[]
    OR?: BoardActionScalarWhereWithAggregatesInput[]
    NOT?: BoardActionScalarWhereWithAggregatesInput | BoardActionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BoardAction"> | string
    boardId?: StringWithAggregatesFilter<"BoardAction"> | string
    userId?: StringWithAggregatesFilter<"BoardAction"> | string
    action?: StringWithAggregatesFilter<"BoardAction"> | string
    timestamp?: DateTimeWithAggregatesFilter<"BoardAction"> | Date | string
  }

  export type BoardSnapshotWhereInput = {
    AND?: BoardSnapshotWhereInput | BoardSnapshotWhereInput[]
    OR?: BoardSnapshotWhereInput[]
    NOT?: BoardSnapshotWhereInput | BoardSnapshotWhereInput[]
    id?: StringFilter<"BoardSnapshot"> | string
    boardId?: StringFilter<"BoardSnapshot"> | string
    data?: StringFilter<"BoardSnapshot"> | string
    timestamp?: DateTimeFilter<"BoardSnapshot"> | Date | string
    board?: XOR<BoardScalarRelationFilter, BoardWhereInput>
  }

  export type BoardSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    boardId?: SortOrder
    data?: SortOrder
    timestamp?: SortOrder
    board?: BoardOrderByWithRelationInput
  }

  export type BoardSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BoardSnapshotWhereInput | BoardSnapshotWhereInput[]
    OR?: BoardSnapshotWhereInput[]
    NOT?: BoardSnapshotWhereInput | BoardSnapshotWhereInput[]
    boardId?: StringFilter<"BoardSnapshot"> | string
    data?: StringFilter<"BoardSnapshot"> | string
    timestamp?: DateTimeFilter<"BoardSnapshot"> | Date | string
    board?: XOR<BoardScalarRelationFilter, BoardWhereInput>
  }, "id">

  export type BoardSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    boardId?: SortOrder
    data?: SortOrder
    timestamp?: SortOrder
    _count?: BoardSnapshotCountOrderByAggregateInput
    _max?: BoardSnapshotMaxOrderByAggregateInput
    _min?: BoardSnapshotMinOrderByAggregateInput
  }

  export type BoardSnapshotScalarWhereWithAggregatesInput = {
    AND?: BoardSnapshotScalarWhereWithAggregatesInput | BoardSnapshotScalarWhereWithAggregatesInput[]
    OR?: BoardSnapshotScalarWhereWithAggregatesInput[]
    NOT?: BoardSnapshotScalarWhereWithAggregatesInput | BoardSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BoardSnapshot"> | string
    boardId?: StringWithAggregatesFilter<"BoardSnapshot"> | string
    data?: StringWithAggregatesFilter<"BoardSnapshot"> | string
    timestamp?: DateTimeWithAggregatesFilter<"BoardSnapshot"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    cognitoId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    boards?: BoardCreateNestedManyWithoutOwnerInput
    collaborations?: BoardCollaboratorCreateNestedManyWithoutUserInput
    BoardAction?: BoardActionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    cognitoId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    boards?: BoardUncheckedCreateNestedManyWithoutOwnerInput
    collaborations?: BoardCollaboratorUncheckedCreateNestedManyWithoutUserInput
    BoardAction?: BoardActionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    cognitoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    boards?: BoardUpdateManyWithoutOwnerNestedInput
    collaborations?: BoardCollaboratorUpdateManyWithoutUserNestedInput
    BoardAction?: BoardActionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    cognitoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    boards?: BoardUncheckedUpdateManyWithoutOwnerNestedInput
    collaborations?: BoardCollaboratorUncheckedUpdateManyWithoutUserNestedInput
    BoardAction?: BoardActionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    cognitoId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    cognitoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    cognitoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardCreateInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutBoardsInput
    collaborators?: BoardCollaboratorCreateNestedManyWithoutBoardInput
    actions?: BoardActionCreateNestedManyWithoutBoardInput
    snapshots?: BoardSnapshotCreateNestedManyWithoutBoardInput
  }

  export type BoardUncheckedCreateInput = {
    id?: string
    title: string
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    collaborators?: BoardCollaboratorUncheckedCreateNestedManyWithoutBoardInput
    actions?: BoardActionUncheckedCreateNestedManyWithoutBoardInput
    snapshots?: BoardSnapshotUncheckedCreateNestedManyWithoutBoardInput
  }

  export type BoardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutBoardsNestedInput
    collaborators?: BoardCollaboratorUpdateManyWithoutBoardNestedInput
    actions?: BoardActionUpdateManyWithoutBoardNestedInput
    snapshots?: BoardSnapshotUpdateManyWithoutBoardNestedInput
  }

  export type BoardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collaborators?: BoardCollaboratorUncheckedUpdateManyWithoutBoardNestedInput
    actions?: BoardActionUncheckedUpdateManyWithoutBoardNestedInput
    snapshots?: BoardSnapshotUncheckedUpdateManyWithoutBoardNestedInput
  }

  export type BoardCreateManyInput = {
    id?: string
    title: string
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BoardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardCollaboratorCreateInput = {
    id?: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    board: BoardCreateNestedOneWithoutCollaboratorsInput
    user: UserCreateNestedOneWithoutCollaborationsInput
  }

  export type BoardCollaboratorUncheckedCreateInput = {
    id?: string
    boardId: string
    userId: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BoardCollaboratorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    board?: BoardUpdateOneRequiredWithoutCollaboratorsNestedInput
    user?: UserUpdateOneRequiredWithoutCollaborationsNestedInput
  }

  export type BoardCollaboratorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    boardId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardCollaboratorCreateManyInput = {
    id?: string
    boardId: string
    userId: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BoardCollaboratorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardCollaboratorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    boardId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardActionCreateInput = {
    id?: string
    action: string
    timestamp?: Date | string
    board: BoardCreateNestedOneWithoutActionsInput
    user: UserCreateNestedOneWithoutBoardActionInput
  }

  export type BoardActionUncheckedCreateInput = {
    id?: string
    boardId: string
    userId: string
    action: string
    timestamp?: Date | string
  }

  export type BoardActionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    board?: BoardUpdateOneRequiredWithoutActionsNestedInput
    user?: UserUpdateOneRequiredWithoutBoardActionNestedInput
  }

  export type BoardActionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    boardId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardActionCreateManyInput = {
    id?: string
    boardId: string
    userId: string
    action: string
    timestamp?: Date | string
  }

  export type BoardActionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardActionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    boardId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardSnapshotCreateInput = {
    id?: string
    data: string
    timestamp?: Date | string
    board: BoardCreateNestedOneWithoutSnapshotsInput
  }

  export type BoardSnapshotUncheckedCreateInput = {
    id?: string
    boardId: string
    data: string
    timestamp?: Date | string
  }

  export type BoardSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    board?: BoardUpdateOneRequiredWithoutSnapshotsNestedInput
  }

  export type BoardSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    boardId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardSnapshotCreateManyInput = {
    id?: string
    boardId: string
    data: string
    timestamp?: Date | string
  }

  export type BoardSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    boardId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoardListRelationFilter = {
    every?: BoardWhereInput
    some?: BoardWhereInput
    none?: BoardWhereInput
  }

  export type BoardCollaboratorListRelationFilter = {
    every?: BoardCollaboratorWhereInput
    some?: BoardCollaboratorWhereInput
    none?: BoardCollaboratorWhereInput
  }

  export type BoardActionListRelationFilter = {
    every?: BoardActionWhereInput
    some?: BoardActionWhereInput
    none?: BoardActionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BoardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BoardCollaboratorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BoardActionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    cognitoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    cognitoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    cognitoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type BoardSnapshotListRelationFilter = {
    every?: BoardSnapshotWhereInput
    some?: BoardSnapshotWhereInput
    none?: BoardSnapshotWhereInput
  }

  export type BoardSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BoardCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoardMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoardMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoardScalarRelationFilter = {
    is?: BoardWhereInput
    isNot?: BoardWhereInput
  }

  export type BoardCollaboratorBoardIdUserIdCompoundUniqueInput = {
    boardId: string
    userId: string
  }

  export type BoardCollaboratorCountOrderByAggregateInput = {
    id?: SortOrder
    boardId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoardCollaboratorMaxOrderByAggregateInput = {
    id?: SortOrder
    boardId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoardCollaboratorMinOrderByAggregateInput = {
    id?: SortOrder
    boardId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoardActionCountOrderByAggregateInput = {
    id?: SortOrder
    boardId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    timestamp?: SortOrder
  }

  export type BoardActionMaxOrderByAggregateInput = {
    id?: SortOrder
    boardId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    timestamp?: SortOrder
  }

  export type BoardActionMinOrderByAggregateInput = {
    id?: SortOrder
    boardId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    timestamp?: SortOrder
  }

  export type BoardSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    boardId?: SortOrder
    data?: SortOrder
    timestamp?: SortOrder
  }

  export type BoardSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    boardId?: SortOrder
    data?: SortOrder
    timestamp?: SortOrder
  }

  export type BoardSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    boardId?: SortOrder
    data?: SortOrder
    timestamp?: SortOrder
  }

  export type BoardCreateNestedManyWithoutOwnerInput = {
    create?: XOR<BoardCreateWithoutOwnerInput, BoardUncheckedCreateWithoutOwnerInput> | BoardCreateWithoutOwnerInput[] | BoardUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: BoardCreateOrConnectWithoutOwnerInput | BoardCreateOrConnectWithoutOwnerInput[]
    createMany?: BoardCreateManyOwnerInputEnvelope
    connect?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
  }

  export type BoardCollaboratorCreateNestedManyWithoutUserInput = {
    create?: XOR<BoardCollaboratorCreateWithoutUserInput, BoardCollaboratorUncheckedCreateWithoutUserInput> | BoardCollaboratorCreateWithoutUserInput[] | BoardCollaboratorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BoardCollaboratorCreateOrConnectWithoutUserInput | BoardCollaboratorCreateOrConnectWithoutUserInput[]
    createMany?: BoardCollaboratorCreateManyUserInputEnvelope
    connect?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
  }

  export type BoardActionCreateNestedManyWithoutUserInput = {
    create?: XOR<BoardActionCreateWithoutUserInput, BoardActionUncheckedCreateWithoutUserInput> | BoardActionCreateWithoutUserInput[] | BoardActionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BoardActionCreateOrConnectWithoutUserInput | BoardActionCreateOrConnectWithoutUserInput[]
    createMany?: BoardActionCreateManyUserInputEnvelope
    connect?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
  }

  export type BoardUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<BoardCreateWithoutOwnerInput, BoardUncheckedCreateWithoutOwnerInput> | BoardCreateWithoutOwnerInput[] | BoardUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: BoardCreateOrConnectWithoutOwnerInput | BoardCreateOrConnectWithoutOwnerInput[]
    createMany?: BoardCreateManyOwnerInputEnvelope
    connect?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
  }

  export type BoardCollaboratorUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BoardCollaboratorCreateWithoutUserInput, BoardCollaboratorUncheckedCreateWithoutUserInput> | BoardCollaboratorCreateWithoutUserInput[] | BoardCollaboratorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BoardCollaboratorCreateOrConnectWithoutUserInput | BoardCollaboratorCreateOrConnectWithoutUserInput[]
    createMany?: BoardCollaboratorCreateManyUserInputEnvelope
    connect?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
  }

  export type BoardActionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BoardActionCreateWithoutUserInput, BoardActionUncheckedCreateWithoutUserInput> | BoardActionCreateWithoutUserInput[] | BoardActionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BoardActionCreateOrConnectWithoutUserInput | BoardActionCreateOrConnectWithoutUserInput[]
    createMany?: BoardActionCreateManyUserInputEnvelope
    connect?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoardUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<BoardCreateWithoutOwnerInput, BoardUncheckedCreateWithoutOwnerInput> | BoardCreateWithoutOwnerInput[] | BoardUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: BoardCreateOrConnectWithoutOwnerInput | BoardCreateOrConnectWithoutOwnerInput[]
    upsert?: BoardUpsertWithWhereUniqueWithoutOwnerInput | BoardUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: BoardCreateManyOwnerInputEnvelope
    set?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
    disconnect?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
    delete?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
    connect?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
    update?: BoardUpdateWithWhereUniqueWithoutOwnerInput | BoardUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: BoardUpdateManyWithWhereWithoutOwnerInput | BoardUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: BoardScalarWhereInput | BoardScalarWhereInput[]
  }

  export type BoardCollaboratorUpdateManyWithoutUserNestedInput = {
    create?: XOR<BoardCollaboratorCreateWithoutUserInput, BoardCollaboratorUncheckedCreateWithoutUserInput> | BoardCollaboratorCreateWithoutUserInput[] | BoardCollaboratorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BoardCollaboratorCreateOrConnectWithoutUserInput | BoardCollaboratorCreateOrConnectWithoutUserInput[]
    upsert?: BoardCollaboratorUpsertWithWhereUniqueWithoutUserInput | BoardCollaboratorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BoardCollaboratorCreateManyUserInputEnvelope
    set?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
    disconnect?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
    delete?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
    connect?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
    update?: BoardCollaboratorUpdateWithWhereUniqueWithoutUserInput | BoardCollaboratorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BoardCollaboratorUpdateManyWithWhereWithoutUserInput | BoardCollaboratorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BoardCollaboratorScalarWhereInput | BoardCollaboratorScalarWhereInput[]
  }

  export type BoardActionUpdateManyWithoutUserNestedInput = {
    create?: XOR<BoardActionCreateWithoutUserInput, BoardActionUncheckedCreateWithoutUserInput> | BoardActionCreateWithoutUserInput[] | BoardActionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BoardActionCreateOrConnectWithoutUserInput | BoardActionCreateOrConnectWithoutUserInput[]
    upsert?: BoardActionUpsertWithWhereUniqueWithoutUserInput | BoardActionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BoardActionCreateManyUserInputEnvelope
    set?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
    disconnect?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
    delete?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
    connect?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
    update?: BoardActionUpdateWithWhereUniqueWithoutUserInput | BoardActionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BoardActionUpdateManyWithWhereWithoutUserInput | BoardActionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BoardActionScalarWhereInput | BoardActionScalarWhereInput[]
  }

  export type BoardUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<BoardCreateWithoutOwnerInput, BoardUncheckedCreateWithoutOwnerInput> | BoardCreateWithoutOwnerInput[] | BoardUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: BoardCreateOrConnectWithoutOwnerInput | BoardCreateOrConnectWithoutOwnerInput[]
    upsert?: BoardUpsertWithWhereUniqueWithoutOwnerInput | BoardUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: BoardCreateManyOwnerInputEnvelope
    set?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
    disconnect?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
    delete?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
    connect?: BoardWhereUniqueInput | BoardWhereUniqueInput[]
    update?: BoardUpdateWithWhereUniqueWithoutOwnerInput | BoardUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: BoardUpdateManyWithWhereWithoutOwnerInput | BoardUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: BoardScalarWhereInput | BoardScalarWhereInput[]
  }

  export type BoardCollaboratorUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BoardCollaboratorCreateWithoutUserInput, BoardCollaboratorUncheckedCreateWithoutUserInput> | BoardCollaboratorCreateWithoutUserInput[] | BoardCollaboratorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BoardCollaboratorCreateOrConnectWithoutUserInput | BoardCollaboratorCreateOrConnectWithoutUserInput[]
    upsert?: BoardCollaboratorUpsertWithWhereUniqueWithoutUserInput | BoardCollaboratorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BoardCollaboratorCreateManyUserInputEnvelope
    set?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
    disconnect?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
    delete?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
    connect?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
    update?: BoardCollaboratorUpdateWithWhereUniqueWithoutUserInput | BoardCollaboratorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BoardCollaboratorUpdateManyWithWhereWithoutUserInput | BoardCollaboratorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BoardCollaboratorScalarWhereInput | BoardCollaboratorScalarWhereInput[]
  }

  export type BoardActionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BoardActionCreateWithoutUserInput, BoardActionUncheckedCreateWithoutUserInput> | BoardActionCreateWithoutUserInput[] | BoardActionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BoardActionCreateOrConnectWithoutUserInput | BoardActionCreateOrConnectWithoutUserInput[]
    upsert?: BoardActionUpsertWithWhereUniqueWithoutUserInput | BoardActionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BoardActionCreateManyUserInputEnvelope
    set?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
    disconnect?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
    delete?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
    connect?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
    update?: BoardActionUpdateWithWhereUniqueWithoutUserInput | BoardActionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BoardActionUpdateManyWithWhereWithoutUserInput | BoardActionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BoardActionScalarWhereInput | BoardActionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutBoardsInput = {
    create?: XOR<UserCreateWithoutBoardsInput, UserUncheckedCreateWithoutBoardsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBoardsInput
    connect?: UserWhereUniqueInput
  }

  export type BoardCollaboratorCreateNestedManyWithoutBoardInput = {
    create?: XOR<BoardCollaboratorCreateWithoutBoardInput, BoardCollaboratorUncheckedCreateWithoutBoardInput> | BoardCollaboratorCreateWithoutBoardInput[] | BoardCollaboratorUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: BoardCollaboratorCreateOrConnectWithoutBoardInput | BoardCollaboratorCreateOrConnectWithoutBoardInput[]
    createMany?: BoardCollaboratorCreateManyBoardInputEnvelope
    connect?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
  }

  export type BoardActionCreateNestedManyWithoutBoardInput = {
    create?: XOR<BoardActionCreateWithoutBoardInput, BoardActionUncheckedCreateWithoutBoardInput> | BoardActionCreateWithoutBoardInput[] | BoardActionUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: BoardActionCreateOrConnectWithoutBoardInput | BoardActionCreateOrConnectWithoutBoardInput[]
    createMany?: BoardActionCreateManyBoardInputEnvelope
    connect?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
  }

  export type BoardSnapshotCreateNestedManyWithoutBoardInput = {
    create?: XOR<BoardSnapshotCreateWithoutBoardInput, BoardSnapshotUncheckedCreateWithoutBoardInput> | BoardSnapshotCreateWithoutBoardInput[] | BoardSnapshotUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: BoardSnapshotCreateOrConnectWithoutBoardInput | BoardSnapshotCreateOrConnectWithoutBoardInput[]
    createMany?: BoardSnapshotCreateManyBoardInputEnvelope
    connect?: BoardSnapshotWhereUniqueInput | BoardSnapshotWhereUniqueInput[]
  }

  export type BoardCollaboratorUncheckedCreateNestedManyWithoutBoardInput = {
    create?: XOR<BoardCollaboratorCreateWithoutBoardInput, BoardCollaboratorUncheckedCreateWithoutBoardInput> | BoardCollaboratorCreateWithoutBoardInput[] | BoardCollaboratorUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: BoardCollaboratorCreateOrConnectWithoutBoardInput | BoardCollaboratorCreateOrConnectWithoutBoardInput[]
    createMany?: BoardCollaboratorCreateManyBoardInputEnvelope
    connect?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
  }

  export type BoardActionUncheckedCreateNestedManyWithoutBoardInput = {
    create?: XOR<BoardActionCreateWithoutBoardInput, BoardActionUncheckedCreateWithoutBoardInput> | BoardActionCreateWithoutBoardInput[] | BoardActionUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: BoardActionCreateOrConnectWithoutBoardInput | BoardActionCreateOrConnectWithoutBoardInput[]
    createMany?: BoardActionCreateManyBoardInputEnvelope
    connect?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
  }

  export type BoardSnapshotUncheckedCreateNestedManyWithoutBoardInput = {
    create?: XOR<BoardSnapshotCreateWithoutBoardInput, BoardSnapshotUncheckedCreateWithoutBoardInput> | BoardSnapshotCreateWithoutBoardInput[] | BoardSnapshotUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: BoardSnapshotCreateOrConnectWithoutBoardInput | BoardSnapshotCreateOrConnectWithoutBoardInput[]
    createMany?: BoardSnapshotCreateManyBoardInputEnvelope
    connect?: BoardSnapshotWhereUniqueInput | BoardSnapshotWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutBoardsNestedInput = {
    create?: XOR<UserCreateWithoutBoardsInput, UserUncheckedCreateWithoutBoardsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBoardsInput
    upsert?: UserUpsertWithoutBoardsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBoardsInput, UserUpdateWithoutBoardsInput>, UserUncheckedUpdateWithoutBoardsInput>
  }

  export type BoardCollaboratorUpdateManyWithoutBoardNestedInput = {
    create?: XOR<BoardCollaboratorCreateWithoutBoardInput, BoardCollaboratorUncheckedCreateWithoutBoardInput> | BoardCollaboratorCreateWithoutBoardInput[] | BoardCollaboratorUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: BoardCollaboratorCreateOrConnectWithoutBoardInput | BoardCollaboratorCreateOrConnectWithoutBoardInput[]
    upsert?: BoardCollaboratorUpsertWithWhereUniqueWithoutBoardInput | BoardCollaboratorUpsertWithWhereUniqueWithoutBoardInput[]
    createMany?: BoardCollaboratorCreateManyBoardInputEnvelope
    set?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
    disconnect?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
    delete?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
    connect?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
    update?: BoardCollaboratorUpdateWithWhereUniqueWithoutBoardInput | BoardCollaboratorUpdateWithWhereUniqueWithoutBoardInput[]
    updateMany?: BoardCollaboratorUpdateManyWithWhereWithoutBoardInput | BoardCollaboratorUpdateManyWithWhereWithoutBoardInput[]
    deleteMany?: BoardCollaboratorScalarWhereInput | BoardCollaboratorScalarWhereInput[]
  }

  export type BoardActionUpdateManyWithoutBoardNestedInput = {
    create?: XOR<BoardActionCreateWithoutBoardInput, BoardActionUncheckedCreateWithoutBoardInput> | BoardActionCreateWithoutBoardInput[] | BoardActionUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: BoardActionCreateOrConnectWithoutBoardInput | BoardActionCreateOrConnectWithoutBoardInput[]
    upsert?: BoardActionUpsertWithWhereUniqueWithoutBoardInput | BoardActionUpsertWithWhereUniqueWithoutBoardInput[]
    createMany?: BoardActionCreateManyBoardInputEnvelope
    set?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
    disconnect?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
    delete?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
    connect?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
    update?: BoardActionUpdateWithWhereUniqueWithoutBoardInput | BoardActionUpdateWithWhereUniqueWithoutBoardInput[]
    updateMany?: BoardActionUpdateManyWithWhereWithoutBoardInput | BoardActionUpdateManyWithWhereWithoutBoardInput[]
    deleteMany?: BoardActionScalarWhereInput | BoardActionScalarWhereInput[]
  }

  export type BoardSnapshotUpdateManyWithoutBoardNestedInput = {
    create?: XOR<BoardSnapshotCreateWithoutBoardInput, BoardSnapshotUncheckedCreateWithoutBoardInput> | BoardSnapshotCreateWithoutBoardInput[] | BoardSnapshotUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: BoardSnapshotCreateOrConnectWithoutBoardInput | BoardSnapshotCreateOrConnectWithoutBoardInput[]
    upsert?: BoardSnapshotUpsertWithWhereUniqueWithoutBoardInput | BoardSnapshotUpsertWithWhereUniqueWithoutBoardInput[]
    createMany?: BoardSnapshotCreateManyBoardInputEnvelope
    set?: BoardSnapshotWhereUniqueInput | BoardSnapshotWhereUniqueInput[]
    disconnect?: BoardSnapshotWhereUniqueInput | BoardSnapshotWhereUniqueInput[]
    delete?: BoardSnapshotWhereUniqueInput | BoardSnapshotWhereUniqueInput[]
    connect?: BoardSnapshotWhereUniqueInput | BoardSnapshotWhereUniqueInput[]
    update?: BoardSnapshotUpdateWithWhereUniqueWithoutBoardInput | BoardSnapshotUpdateWithWhereUniqueWithoutBoardInput[]
    updateMany?: BoardSnapshotUpdateManyWithWhereWithoutBoardInput | BoardSnapshotUpdateManyWithWhereWithoutBoardInput[]
    deleteMany?: BoardSnapshotScalarWhereInput | BoardSnapshotScalarWhereInput[]
  }

  export type BoardCollaboratorUncheckedUpdateManyWithoutBoardNestedInput = {
    create?: XOR<BoardCollaboratorCreateWithoutBoardInput, BoardCollaboratorUncheckedCreateWithoutBoardInput> | BoardCollaboratorCreateWithoutBoardInput[] | BoardCollaboratorUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: BoardCollaboratorCreateOrConnectWithoutBoardInput | BoardCollaboratorCreateOrConnectWithoutBoardInput[]
    upsert?: BoardCollaboratorUpsertWithWhereUniqueWithoutBoardInput | BoardCollaboratorUpsertWithWhereUniqueWithoutBoardInput[]
    createMany?: BoardCollaboratorCreateManyBoardInputEnvelope
    set?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
    disconnect?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
    delete?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
    connect?: BoardCollaboratorWhereUniqueInput | BoardCollaboratorWhereUniqueInput[]
    update?: BoardCollaboratorUpdateWithWhereUniqueWithoutBoardInput | BoardCollaboratorUpdateWithWhereUniqueWithoutBoardInput[]
    updateMany?: BoardCollaboratorUpdateManyWithWhereWithoutBoardInput | BoardCollaboratorUpdateManyWithWhereWithoutBoardInput[]
    deleteMany?: BoardCollaboratorScalarWhereInput | BoardCollaboratorScalarWhereInput[]
  }

  export type BoardActionUncheckedUpdateManyWithoutBoardNestedInput = {
    create?: XOR<BoardActionCreateWithoutBoardInput, BoardActionUncheckedCreateWithoutBoardInput> | BoardActionCreateWithoutBoardInput[] | BoardActionUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: BoardActionCreateOrConnectWithoutBoardInput | BoardActionCreateOrConnectWithoutBoardInput[]
    upsert?: BoardActionUpsertWithWhereUniqueWithoutBoardInput | BoardActionUpsertWithWhereUniqueWithoutBoardInput[]
    createMany?: BoardActionCreateManyBoardInputEnvelope
    set?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
    disconnect?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
    delete?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
    connect?: BoardActionWhereUniqueInput | BoardActionWhereUniqueInput[]
    update?: BoardActionUpdateWithWhereUniqueWithoutBoardInput | BoardActionUpdateWithWhereUniqueWithoutBoardInput[]
    updateMany?: BoardActionUpdateManyWithWhereWithoutBoardInput | BoardActionUpdateManyWithWhereWithoutBoardInput[]
    deleteMany?: BoardActionScalarWhereInput | BoardActionScalarWhereInput[]
  }

  export type BoardSnapshotUncheckedUpdateManyWithoutBoardNestedInput = {
    create?: XOR<BoardSnapshotCreateWithoutBoardInput, BoardSnapshotUncheckedCreateWithoutBoardInput> | BoardSnapshotCreateWithoutBoardInput[] | BoardSnapshotUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: BoardSnapshotCreateOrConnectWithoutBoardInput | BoardSnapshotCreateOrConnectWithoutBoardInput[]
    upsert?: BoardSnapshotUpsertWithWhereUniqueWithoutBoardInput | BoardSnapshotUpsertWithWhereUniqueWithoutBoardInput[]
    createMany?: BoardSnapshotCreateManyBoardInputEnvelope
    set?: BoardSnapshotWhereUniqueInput | BoardSnapshotWhereUniqueInput[]
    disconnect?: BoardSnapshotWhereUniqueInput | BoardSnapshotWhereUniqueInput[]
    delete?: BoardSnapshotWhereUniqueInput | BoardSnapshotWhereUniqueInput[]
    connect?: BoardSnapshotWhereUniqueInput | BoardSnapshotWhereUniqueInput[]
    update?: BoardSnapshotUpdateWithWhereUniqueWithoutBoardInput | BoardSnapshotUpdateWithWhereUniqueWithoutBoardInput[]
    updateMany?: BoardSnapshotUpdateManyWithWhereWithoutBoardInput | BoardSnapshotUpdateManyWithWhereWithoutBoardInput[]
    deleteMany?: BoardSnapshotScalarWhereInput | BoardSnapshotScalarWhereInput[]
  }

  export type BoardCreateNestedOneWithoutCollaboratorsInput = {
    create?: XOR<BoardCreateWithoutCollaboratorsInput, BoardUncheckedCreateWithoutCollaboratorsInput>
    connectOrCreate?: BoardCreateOrConnectWithoutCollaboratorsInput
    connect?: BoardWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCollaborationsInput = {
    create?: XOR<UserCreateWithoutCollaborationsInput, UserUncheckedCreateWithoutCollaborationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCollaborationsInput
    connect?: UserWhereUniqueInput
  }

  export type BoardUpdateOneRequiredWithoutCollaboratorsNestedInput = {
    create?: XOR<BoardCreateWithoutCollaboratorsInput, BoardUncheckedCreateWithoutCollaboratorsInput>
    connectOrCreate?: BoardCreateOrConnectWithoutCollaboratorsInput
    upsert?: BoardUpsertWithoutCollaboratorsInput
    connect?: BoardWhereUniqueInput
    update?: XOR<XOR<BoardUpdateToOneWithWhereWithoutCollaboratorsInput, BoardUpdateWithoutCollaboratorsInput>, BoardUncheckedUpdateWithoutCollaboratorsInput>
  }

  export type UserUpdateOneRequiredWithoutCollaborationsNestedInput = {
    create?: XOR<UserCreateWithoutCollaborationsInput, UserUncheckedCreateWithoutCollaborationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCollaborationsInput
    upsert?: UserUpsertWithoutCollaborationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCollaborationsInput, UserUpdateWithoutCollaborationsInput>, UserUncheckedUpdateWithoutCollaborationsInput>
  }

  export type BoardCreateNestedOneWithoutActionsInput = {
    create?: XOR<BoardCreateWithoutActionsInput, BoardUncheckedCreateWithoutActionsInput>
    connectOrCreate?: BoardCreateOrConnectWithoutActionsInput
    connect?: BoardWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBoardActionInput = {
    create?: XOR<UserCreateWithoutBoardActionInput, UserUncheckedCreateWithoutBoardActionInput>
    connectOrCreate?: UserCreateOrConnectWithoutBoardActionInput
    connect?: UserWhereUniqueInput
  }

  export type BoardUpdateOneRequiredWithoutActionsNestedInput = {
    create?: XOR<BoardCreateWithoutActionsInput, BoardUncheckedCreateWithoutActionsInput>
    connectOrCreate?: BoardCreateOrConnectWithoutActionsInput
    upsert?: BoardUpsertWithoutActionsInput
    connect?: BoardWhereUniqueInput
    update?: XOR<XOR<BoardUpdateToOneWithWhereWithoutActionsInput, BoardUpdateWithoutActionsInput>, BoardUncheckedUpdateWithoutActionsInput>
  }

  export type UserUpdateOneRequiredWithoutBoardActionNestedInput = {
    create?: XOR<UserCreateWithoutBoardActionInput, UserUncheckedCreateWithoutBoardActionInput>
    connectOrCreate?: UserCreateOrConnectWithoutBoardActionInput
    upsert?: UserUpsertWithoutBoardActionInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBoardActionInput, UserUpdateWithoutBoardActionInput>, UserUncheckedUpdateWithoutBoardActionInput>
  }

  export type BoardCreateNestedOneWithoutSnapshotsInput = {
    create?: XOR<BoardCreateWithoutSnapshotsInput, BoardUncheckedCreateWithoutSnapshotsInput>
    connectOrCreate?: BoardCreateOrConnectWithoutSnapshotsInput
    connect?: BoardWhereUniqueInput
  }

  export type BoardUpdateOneRequiredWithoutSnapshotsNestedInput = {
    create?: XOR<BoardCreateWithoutSnapshotsInput, BoardUncheckedCreateWithoutSnapshotsInput>
    connectOrCreate?: BoardCreateOrConnectWithoutSnapshotsInput
    upsert?: BoardUpsertWithoutSnapshotsInput
    connect?: BoardWhereUniqueInput
    update?: XOR<XOR<BoardUpdateToOneWithWhereWithoutSnapshotsInput, BoardUpdateWithoutSnapshotsInput>, BoardUncheckedUpdateWithoutSnapshotsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoardCreateWithoutOwnerInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    collaborators?: BoardCollaboratorCreateNestedManyWithoutBoardInput
    actions?: BoardActionCreateNestedManyWithoutBoardInput
    snapshots?: BoardSnapshotCreateNestedManyWithoutBoardInput
  }

  export type BoardUncheckedCreateWithoutOwnerInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    collaborators?: BoardCollaboratorUncheckedCreateNestedManyWithoutBoardInput
    actions?: BoardActionUncheckedCreateNestedManyWithoutBoardInput
    snapshots?: BoardSnapshotUncheckedCreateNestedManyWithoutBoardInput
  }

  export type BoardCreateOrConnectWithoutOwnerInput = {
    where: BoardWhereUniqueInput
    create: XOR<BoardCreateWithoutOwnerInput, BoardUncheckedCreateWithoutOwnerInput>
  }

  export type BoardCreateManyOwnerInputEnvelope = {
    data: BoardCreateManyOwnerInput | BoardCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type BoardCollaboratorCreateWithoutUserInput = {
    id?: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    board: BoardCreateNestedOneWithoutCollaboratorsInput
  }

  export type BoardCollaboratorUncheckedCreateWithoutUserInput = {
    id?: string
    boardId: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BoardCollaboratorCreateOrConnectWithoutUserInput = {
    where: BoardCollaboratorWhereUniqueInput
    create: XOR<BoardCollaboratorCreateWithoutUserInput, BoardCollaboratorUncheckedCreateWithoutUserInput>
  }

  export type BoardCollaboratorCreateManyUserInputEnvelope = {
    data: BoardCollaboratorCreateManyUserInput | BoardCollaboratorCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BoardActionCreateWithoutUserInput = {
    id?: string
    action: string
    timestamp?: Date | string
    board: BoardCreateNestedOneWithoutActionsInput
  }

  export type BoardActionUncheckedCreateWithoutUserInput = {
    id?: string
    boardId: string
    action: string
    timestamp?: Date | string
  }

  export type BoardActionCreateOrConnectWithoutUserInput = {
    where: BoardActionWhereUniqueInput
    create: XOR<BoardActionCreateWithoutUserInput, BoardActionUncheckedCreateWithoutUserInput>
  }

  export type BoardActionCreateManyUserInputEnvelope = {
    data: BoardActionCreateManyUserInput | BoardActionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BoardUpsertWithWhereUniqueWithoutOwnerInput = {
    where: BoardWhereUniqueInput
    update: XOR<BoardUpdateWithoutOwnerInput, BoardUncheckedUpdateWithoutOwnerInput>
    create: XOR<BoardCreateWithoutOwnerInput, BoardUncheckedCreateWithoutOwnerInput>
  }

  export type BoardUpdateWithWhereUniqueWithoutOwnerInput = {
    where: BoardWhereUniqueInput
    data: XOR<BoardUpdateWithoutOwnerInput, BoardUncheckedUpdateWithoutOwnerInput>
  }

  export type BoardUpdateManyWithWhereWithoutOwnerInput = {
    where: BoardScalarWhereInput
    data: XOR<BoardUpdateManyMutationInput, BoardUncheckedUpdateManyWithoutOwnerInput>
  }

  export type BoardScalarWhereInput = {
    AND?: BoardScalarWhereInput | BoardScalarWhereInput[]
    OR?: BoardScalarWhereInput[]
    NOT?: BoardScalarWhereInput | BoardScalarWhereInput[]
    id?: StringFilter<"Board"> | string
    title?: StringFilter<"Board"> | string
    ownerId?: StringFilter<"Board"> | string
    createdAt?: DateTimeFilter<"Board"> | Date | string
    updatedAt?: DateTimeFilter<"Board"> | Date | string
  }

  export type BoardCollaboratorUpsertWithWhereUniqueWithoutUserInput = {
    where: BoardCollaboratorWhereUniqueInput
    update: XOR<BoardCollaboratorUpdateWithoutUserInput, BoardCollaboratorUncheckedUpdateWithoutUserInput>
    create: XOR<BoardCollaboratorCreateWithoutUserInput, BoardCollaboratorUncheckedCreateWithoutUserInput>
  }

  export type BoardCollaboratorUpdateWithWhereUniqueWithoutUserInput = {
    where: BoardCollaboratorWhereUniqueInput
    data: XOR<BoardCollaboratorUpdateWithoutUserInput, BoardCollaboratorUncheckedUpdateWithoutUserInput>
  }

  export type BoardCollaboratorUpdateManyWithWhereWithoutUserInput = {
    where: BoardCollaboratorScalarWhereInput
    data: XOR<BoardCollaboratorUpdateManyMutationInput, BoardCollaboratorUncheckedUpdateManyWithoutUserInput>
  }

  export type BoardCollaboratorScalarWhereInput = {
    AND?: BoardCollaboratorScalarWhereInput | BoardCollaboratorScalarWhereInput[]
    OR?: BoardCollaboratorScalarWhereInput[]
    NOT?: BoardCollaboratorScalarWhereInput | BoardCollaboratorScalarWhereInput[]
    id?: StringFilter<"BoardCollaborator"> | string
    boardId?: StringFilter<"BoardCollaborator"> | string
    userId?: StringFilter<"BoardCollaborator"> | string
    role?: StringFilter<"BoardCollaborator"> | string
    createdAt?: DateTimeFilter<"BoardCollaborator"> | Date | string
    updatedAt?: DateTimeFilter<"BoardCollaborator"> | Date | string
  }

  export type BoardActionUpsertWithWhereUniqueWithoutUserInput = {
    where: BoardActionWhereUniqueInput
    update: XOR<BoardActionUpdateWithoutUserInput, BoardActionUncheckedUpdateWithoutUserInput>
    create: XOR<BoardActionCreateWithoutUserInput, BoardActionUncheckedCreateWithoutUserInput>
  }

  export type BoardActionUpdateWithWhereUniqueWithoutUserInput = {
    where: BoardActionWhereUniqueInput
    data: XOR<BoardActionUpdateWithoutUserInput, BoardActionUncheckedUpdateWithoutUserInput>
  }

  export type BoardActionUpdateManyWithWhereWithoutUserInput = {
    where: BoardActionScalarWhereInput
    data: XOR<BoardActionUpdateManyMutationInput, BoardActionUncheckedUpdateManyWithoutUserInput>
  }

  export type BoardActionScalarWhereInput = {
    AND?: BoardActionScalarWhereInput | BoardActionScalarWhereInput[]
    OR?: BoardActionScalarWhereInput[]
    NOT?: BoardActionScalarWhereInput | BoardActionScalarWhereInput[]
    id?: StringFilter<"BoardAction"> | string
    boardId?: StringFilter<"BoardAction"> | string
    userId?: StringFilter<"BoardAction"> | string
    action?: StringFilter<"BoardAction"> | string
    timestamp?: DateTimeFilter<"BoardAction"> | Date | string
  }

  export type UserCreateWithoutBoardsInput = {
    id?: string
    email: string
    name?: string | null
    cognitoId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    collaborations?: BoardCollaboratorCreateNestedManyWithoutUserInput
    BoardAction?: BoardActionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBoardsInput = {
    id?: string
    email: string
    name?: string | null
    cognitoId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    collaborations?: BoardCollaboratorUncheckedCreateNestedManyWithoutUserInput
    BoardAction?: BoardActionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBoardsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBoardsInput, UserUncheckedCreateWithoutBoardsInput>
  }

  export type BoardCollaboratorCreateWithoutBoardInput = {
    id?: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCollaborationsInput
  }

  export type BoardCollaboratorUncheckedCreateWithoutBoardInput = {
    id?: string
    userId: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BoardCollaboratorCreateOrConnectWithoutBoardInput = {
    where: BoardCollaboratorWhereUniqueInput
    create: XOR<BoardCollaboratorCreateWithoutBoardInput, BoardCollaboratorUncheckedCreateWithoutBoardInput>
  }

  export type BoardCollaboratorCreateManyBoardInputEnvelope = {
    data: BoardCollaboratorCreateManyBoardInput | BoardCollaboratorCreateManyBoardInput[]
    skipDuplicates?: boolean
  }

  export type BoardActionCreateWithoutBoardInput = {
    id?: string
    action: string
    timestamp?: Date | string
    user: UserCreateNestedOneWithoutBoardActionInput
  }

  export type BoardActionUncheckedCreateWithoutBoardInput = {
    id?: string
    userId: string
    action: string
    timestamp?: Date | string
  }

  export type BoardActionCreateOrConnectWithoutBoardInput = {
    where: BoardActionWhereUniqueInput
    create: XOR<BoardActionCreateWithoutBoardInput, BoardActionUncheckedCreateWithoutBoardInput>
  }

  export type BoardActionCreateManyBoardInputEnvelope = {
    data: BoardActionCreateManyBoardInput | BoardActionCreateManyBoardInput[]
    skipDuplicates?: boolean
  }

  export type BoardSnapshotCreateWithoutBoardInput = {
    id?: string
    data: string
    timestamp?: Date | string
  }

  export type BoardSnapshotUncheckedCreateWithoutBoardInput = {
    id?: string
    data: string
    timestamp?: Date | string
  }

  export type BoardSnapshotCreateOrConnectWithoutBoardInput = {
    where: BoardSnapshotWhereUniqueInput
    create: XOR<BoardSnapshotCreateWithoutBoardInput, BoardSnapshotUncheckedCreateWithoutBoardInput>
  }

  export type BoardSnapshotCreateManyBoardInputEnvelope = {
    data: BoardSnapshotCreateManyBoardInput | BoardSnapshotCreateManyBoardInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutBoardsInput = {
    update: XOR<UserUpdateWithoutBoardsInput, UserUncheckedUpdateWithoutBoardsInput>
    create: XOR<UserCreateWithoutBoardsInput, UserUncheckedCreateWithoutBoardsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBoardsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBoardsInput, UserUncheckedUpdateWithoutBoardsInput>
  }

  export type UserUpdateWithoutBoardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    cognitoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collaborations?: BoardCollaboratorUpdateManyWithoutUserNestedInput
    BoardAction?: BoardActionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBoardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    cognitoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collaborations?: BoardCollaboratorUncheckedUpdateManyWithoutUserNestedInput
    BoardAction?: BoardActionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BoardCollaboratorUpsertWithWhereUniqueWithoutBoardInput = {
    where: BoardCollaboratorWhereUniqueInput
    update: XOR<BoardCollaboratorUpdateWithoutBoardInput, BoardCollaboratorUncheckedUpdateWithoutBoardInput>
    create: XOR<BoardCollaboratorCreateWithoutBoardInput, BoardCollaboratorUncheckedCreateWithoutBoardInput>
  }

  export type BoardCollaboratorUpdateWithWhereUniqueWithoutBoardInput = {
    where: BoardCollaboratorWhereUniqueInput
    data: XOR<BoardCollaboratorUpdateWithoutBoardInput, BoardCollaboratorUncheckedUpdateWithoutBoardInput>
  }

  export type BoardCollaboratorUpdateManyWithWhereWithoutBoardInput = {
    where: BoardCollaboratorScalarWhereInput
    data: XOR<BoardCollaboratorUpdateManyMutationInput, BoardCollaboratorUncheckedUpdateManyWithoutBoardInput>
  }

  export type BoardActionUpsertWithWhereUniqueWithoutBoardInput = {
    where: BoardActionWhereUniqueInput
    update: XOR<BoardActionUpdateWithoutBoardInput, BoardActionUncheckedUpdateWithoutBoardInput>
    create: XOR<BoardActionCreateWithoutBoardInput, BoardActionUncheckedCreateWithoutBoardInput>
  }

  export type BoardActionUpdateWithWhereUniqueWithoutBoardInput = {
    where: BoardActionWhereUniqueInput
    data: XOR<BoardActionUpdateWithoutBoardInput, BoardActionUncheckedUpdateWithoutBoardInput>
  }

  export type BoardActionUpdateManyWithWhereWithoutBoardInput = {
    where: BoardActionScalarWhereInput
    data: XOR<BoardActionUpdateManyMutationInput, BoardActionUncheckedUpdateManyWithoutBoardInput>
  }

  export type BoardSnapshotUpsertWithWhereUniqueWithoutBoardInput = {
    where: BoardSnapshotWhereUniqueInput
    update: XOR<BoardSnapshotUpdateWithoutBoardInput, BoardSnapshotUncheckedUpdateWithoutBoardInput>
    create: XOR<BoardSnapshotCreateWithoutBoardInput, BoardSnapshotUncheckedCreateWithoutBoardInput>
  }

  export type BoardSnapshotUpdateWithWhereUniqueWithoutBoardInput = {
    where: BoardSnapshotWhereUniqueInput
    data: XOR<BoardSnapshotUpdateWithoutBoardInput, BoardSnapshotUncheckedUpdateWithoutBoardInput>
  }

  export type BoardSnapshotUpdateManyWithWhereWithoutBoardInput = {
    where: BoardSnapshotScalarWhereInput
    data: XOR<BoardSnapshotUpdateManyMutationInput, BoardSnapshotUncheckedUpdateManyWithoutBoardInput>
  }

  export type BoardSnapshotScalarWhereInput = {
    AND?: BoardSnapshotScalarWhereInput | BoardSnapshotScalarWhereInput[]
    OR?: BoardSnapshotScalarWhereInput[]
    NOT?: BoardSnapshotScalarWhereInput | BoardSnapshotScalarWhereInput[]
    id?: StringFilter<"BoardSnapshot"> | string
    boardId?: StringFilter<"BoardSnapshot"> | string
    data?: StringFilter<"BoardSnapshot"> | string
    timestamp?: DateTimeFilter<"BoardSnapshot"> | Date | string
  }

  export type BoardCreateWithoutCollaboratorsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutBoardsInput
    actions?: BoardActionCreateNestedManyWithoutBoardInput
    snapshots?: BoardSnapshotCreateNestedManyWithoutBoardInput
  }

  export type BoardUncheckedCreateWithoutCollaboratorsInput = {
    id?: string
    title: string
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    actions?: BoardActionUncheckedCreateNestedManyWithoutBoardInput
    snapshots?: BoardSnapshotUncheckedCreateNestedManyWithoutBoardInput
  }

  export type BoardCreateOrConnectWithoutCollaboratorsInput = {
    where: BoardWhereUniqueInput
    create: XOR<BoardCreateWithoutCollaboratorsInput, BoardUncheckedCreateWithoutCollaboratorsInput>
  }

  export type UserCreateWithoutCollaborationsInput = {
    id?: string
    email: string
    name?: string | null
    cognitoId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    boards?: BoardCreateNestedManyWithoutOwnerInput
    BoardAction?: BoardActionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCollaborationsInput = {
    id?: string
    email: string
    name?: string | null
    cognitoId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    boards?: BoardUncheckedCreateNestedManyWithoutOwnerInput
    BoardAction?: BoardActionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCollaborationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCollaborationsInput, UserUncheckedCreateWithoutCollaborationsInput>
  }

  export type BoardUpsertWithoutCollaboratorsInput = {
    update: XOR<BoardUpdateWithoutCollaboratorsInput, BoardUncheckedUpdateWithoutCollaboratorsInput>
    create: XOR<BoardCreateWithoutCollaboratorsInput, BoardUncheckedCreateWithoutCollaboratorsInput>
    where?: BoardWhereInput
  }

  export type BoardUpdateToOneWithWhereWithoutCollaboratorsInput = {
    where?: BoardWhereInput
    data: XOR<BoardUpdateWithoutCollaboratorsInput, BoardUncheckedUpdateWithoutCollaboratorsInput>
  }

  export type BoardUpdateWithoutCollaboratorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutBoardsNestedInput
    actions?: BoardActionUpdateManyWithoutBoardNestedInput
    snapshots?: BoardSnapshotUpdateManyWithoutBoardNestedInput
  }

  export type BoardUncheckedUpdateWithoutCollaboratorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actions?: BoardActionUncheckedUpdateManyWithoutBoardNestedInput
    snapshots?: BoardSnapshotUncheckedUpdateManyWithoutBoardNestedInput
  }

  export type UserUpsertWithoutCollaborationsInput = {
    update: XOR<UserUpdateWithoutCollaborationsInput, UserUncheckedUpdateWithoutCollaborationsInput>
    create: XOR<UserCreateWithoutCollaborationsInput, UserUncheckedCreateWithoutCollaborationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCollaborationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCollaborationsInput, UserUncheckedUpdateWithoutCollaborationsInput>
  }

  export type UserUpdateWithoutCollaborationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    cognitoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    boards?: BoardUpdateManyWithoutOwnerNestedInput
    BoardAction?: BoardActionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCollaborationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    cognitoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    boards?: BoardUncheckedUpdateManyWithoutOwnerNestedInput
    BoardAction?: BoardActionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BoardCreateWithoutActionsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutBoardsInput
    collaborators?: BoardCollaboratorCreateNestedManyWithoutBoardInput
    snapshots?: BoardSnapshotCreateNestedManyWithoutBoardInput
  }

  export type BoardUncheckedCreateWithoutActionsInput = {
    id?: string
    title: string
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    collaborators?: BoardCollaboratorUncheckedCreateNestedManyWithoutBoardInput
    snapshots?: BoardSnapshotUncheckedCreateNestedManyWithoutBoardInput
  }

  export type BoardCreateOrConnectWithoutActionsInput = {
    where: BoardWhereUniqueInput
    create: XOR<BoardCreateWithoutActionsInput, BoardUncheckedCreateWithoutActionsInput>
  }

  export type UserCreateWithoutBoardActionInput = {
    id?: string
    email: string
    name?: string | null
    cognitoId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    boards?: BoardCreateNestedManyWithoutOwnerInput
    collaborations?: BoardCollaboratorCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBoardActionInput = {
    id?: string
    email: string
    name?: string | null
    cognitoId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    boards?: BoardUncheckedCreateNestedManyWithoutOwnerInput
    collaborations?: BoardCollaboratorUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBoardActionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBoardActionInput, UserUncheckedCreateWithoutBoardActionInput>
  }

  export type BoardUpsertWithoutActionsInput = {
    update: XOR<BoardUpdateWithoutActionsInput, BoardUncheckedUpdateWithoutActionsInput>
    create: XOR<BoardCreateWithoutActionsInput, BoardUncheckedCreateWithoutActionsInput>
    where?: BoardWhereInput
  }

  export type BoardUpdateToOneWithWhereWithoutActionsInput = {
    where?: BoardWhereInput
    data: XOR<BoardUpdateWithoutActionsInput, BoardUncheckedUpdateWithoutActionsInput>
  }

  export type BoardUpdateWithoutActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutBoardsNestedInput
    collaborators?: BoardCollaboratorUpdateManyWithoutBoardNestedInput
    snapshots?: BoardSnapshotUpdateManyWithoutBoardNestedInput
  }

  export type BoardUncheckedUpdateWithoutActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collaborators?: BoardCollaboratorUncheckedUpdateManyWithoutBoardNestedInput
    snapshots?: BoardSnapshotUncheckedUpdateManyWithoutBoardNestedInput
  }

  export type UserUpsertWithoutBoardActionInput = {
    update: XOR<UserUpdateWithoutBoardActionInput, UserUncheckedUpdateWithoutBoardActionInput>
    create: XOR<UserCreateWithoutBoardActionInput, UserUncheckedCreateWithoutBoardActionInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBoardActionInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBoardActionInput, UserUncheckedUpdateWithoutBoardActionInput>
  }

  export type UserUpdateWithoutBoardActionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    cognitoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    boards?: BoardUpdateManyWithoutOwnerNestedInput
    collaborations?: BoardCollaboratorUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBoardActionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    cognitoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    boards?: BoardUncheckedUpdateManyWithoutOwnerNestedInput
    collaborations?: BoardCollaboratorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BoardCreateWithoutSnapshotsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutBoardsInput
    collaborators?: BoardCollaboratorCreateNestedManyWithoutBoardInput
    actions?: BoardActionCreateNestedManyWithoutBoardInput
  }

  export type BoardUncheckedCreateWithoutSnapshotsInput = {
    id?: string
    title: string
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    collaborators?: BoardCollaboratorUncheckedCreateNestedManyWithoutBoardInput
    actions?: BoardActionUncheckedCreateNestedManyWithoutBoardInput
  }

  export type BoardCreateOrConnectWithoutSnapshotsInput = {
    where: BoardWhereUniqueInput
    create: XOR<BoardCreateWithoutSnapshotsInput, BoardUncheckedCreateWithoutSnapshotsInput>
  }

  export type BoardUpsertWithoutSnapshotsInput = {
    update: XOR<BoardUpdateWithoutSnapshotsInput, BoardUncheckedUpdateWithoutSnapshotsInput>
    create: XOR<BoardCreateWithoutSnapshotsInput, BoardUncheckedCreateWithoutSnapshotsInput>
    where?: BoardWhereInput
  }

  export type BoardUpdateToOneWithWhereWithoutSnapshotsInput = {
    where?: BoardWhereInput
    data: XOR<BoardUpdateWithoutSnapshotsInput, BoardUncheckedUpdateWithoutSnapshotsInput>
  }

  export type BoardUpdateWithoutSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutBoardsNestedInput
    collaborators?: BoardCollaboratorUpdateManyWithoutBoardNestedInput
    actions?: BoardActionUpdateManyWithoutBoardNestedInput
  }

  export type BoardUncheckedUpdateWithoutSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collaborators?: BoardCollaboratorUncheckedUpdateManyWithoutBoardNestedInput
    actions?: BoardActionUncheckedUpdateManyWithoutBoardNestedInput
  }

  export type BoardCreateManyOwnerInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BoardCollaboratorCreateManyUserInput = {
    id?: string
    boardId: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BoardActionCreateManyUserInput = {
    id?: string
    boardId: string
    action: string
    timestamp?: Date | string
  }

  export type BoardUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collaborators?: BoardCollaboratorUpdateManyWithoutBoardNestedInput
    actions?: BoardActionUpdateManyWithoutBoardNestedInput
    snapshots?: BoardSnapshotUpdateManyWithoutBoardNestedInput
  }

  export type BoardUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collaborators?: BoardCollaboratorUncheckedUpdateManyWithoutBoardNestedInput
    actions?: BoardActionUncheckedUpdateManyWithoutBoardNestedInput
    snapshots?: BoardSnapshotUncheckedUpdateManyWithoutBoardNestedInput
  }

  export type BoardUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardCollaboratorUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    board?: BoardUpdateOneRequiredWithoutCollaboratorsNestedInput
  }

  export type BoardCollaboratorUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    boardId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardCollaboratorUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    boardId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardActionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    board?: BoardUpdateOneRequiredWithoutActionsNestedInput
  }

  export type BoardActionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    boardId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardActionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    boardId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardCollaboratorCreateManyBoardInput = {
    id?: string
    userId: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BoardActionCreateManyBoardInput = {
    id?: string
    userId: string
    action: string
    timestamp?: Date | string
  }

  export type BoardSnapshotCreateManyBoardInput = {
    id?: string
    data: string
    timestamp?: Date | string
  }

  export type BoardCollaboratorUpdateWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCollaborationsNestedInput
  }

  export type BoardCollaboratorUncheckedUpdateWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardCollaboratorUncheckedUpdateManyWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardActionUpdateWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBoardActionNestedInput
  }

  export type BoardActionUncheckedUpdateWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardActionUncheckedUpdateManyWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardSnapshotUpdateWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardSnapshotUncheckedUpdateWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BoardSnapshotUncheckedUpdateManyWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}