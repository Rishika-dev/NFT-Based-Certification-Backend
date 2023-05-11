import {Controller, Inject} from "@tsed/di";
import { Context, PathParams } from "@tsed/platform-params";
import {Get} from "@tsed/schema";
import { TransactionService } from "src/services/TransactionService";

@Controller("/certificate")
export class CertificateController {
  @Inject() transactionService: TransactionService;
  @Get("/:uid")
  async redirectCertificate(@PathParams("uid") uid: string,@Context() ctx: Context) {
    const id = await this.transactionService.getTokenIdFromUID(uid);
    ctx.response.redirect(301,`https://testnets.opensea.io/assets/goerli/0xacabe10c4227093cc4060ba7586c881e9e9eb683/${id}`);

  }
  @Get("/details/:tokenId")
  async getDetailsByTokenId(@PathParams("tokenId") tokenId: string) {
    const details = await this.transactionService.getDetailsByTokenId(tokenId);
    return details;
  }
}
