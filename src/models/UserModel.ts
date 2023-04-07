import { Model, ObjectID, Unique } from "@tsed/mongoose";
import { Property, Required } from "@tsed/schema";
/**
 * ## How to inject model?
 *
 * ```typescript
 * import { MongooseModel } from "@tsed/mongoose";
 * import { Injectable, Inject } from "@tsed/di";
 *
 * @Injectable()
 * class MyService {
 *   @Inject(users)
 *   model: MongooseModel<users>;
 * }
 * ```
 */
@Model({
  name: "users"
})
export class UserModel {
  @ObjectID("id")
  _id: string;

  @Property()
  @Unique()
  @Required()
  username: string;

  @Property()
  @Unique()
  @Required()
  email: string;

  @Property()
  @Required()
  password: string;
  
}
