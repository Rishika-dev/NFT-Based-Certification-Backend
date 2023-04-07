import { Model, ObjectID } from "@tsed/mongoose";
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
 *   @Inject(certificates)
 *   model: MongooseModel<certificates>;
 * }
 * ```
 */
@Model({
  name: "certificates"
})
export class CertificateModel {
  @ObjectID("id")
  _id: string;

  @Property()
  @Required()
  cid: string;
}
