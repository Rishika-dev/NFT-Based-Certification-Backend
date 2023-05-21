import {Controller, Inject} from "@tsed/di";
import { BodyParams, Context, PathParams } from "@tsed/platform-params";
import {Delete, Get, Post, Put} from "@tsed/schema";
import { TransactionService } from "../../services/TransactionService";
import { NotFound } from "@tsed/exceptions";

@Controller("/certificate")
export class CertificateController {
  // @Inject(CertificateModel)
  @Inject() transactionService: TransactionService;
  @Get("/:uid")
  async redirectCertificate(@PathParams("uid") uid: string,@Context() ctx: Context) {
    const id = await this.transactionService.getTokenIdFromUID(uid);
    ctx.response.redirect(301,`https://testnets.opensea.io/assets/goerli/0xacabe10c4227093cc4060ba7586c881e9e9eb683/${id}`);

  }
  @Get("/details/:tokenId")
  async getCertificateDetails(@PathParams("tokenId") tokenId: string) {
    try {
      console.log(tokenId,"tokenId");
      const details = await this.transactionService.getDetailsByTokenId(tokenId);
      console.log(details);
      return details;
    }
    catch (e) {
      console.log(e);
      throw new NotFound("Certificate not found");
    }
  }

  @Put("/edit")
  async editCertificate(
    @BodyParams("tokenId") tokenId: string,
    @BodyParams("title") title: string,
    @BodyParams("firstName") firstName: string,
    @BodyParams("lastName") lastName: string,
    @BodyParams("gender") gender: number,
    @BodyParams("dateOfBirth") dateOfBirth: number,
    @BodyParams("monthOfBirth") monthOfBirth: number,
    @BodyParams("yearOfBirth") yearOfBirth: number,
    @BodyParams("dateOfIssue") dateOfCertificate: number,
    @BodyParams("monthOfIssue") monthOfCertificate: number,
    @BodyParams("yearOfIssue") yearOfCertificate: number,
    @BodyParams("imageCID") imageCID: string,
    @BodyParams("uniqueId") uniqueId: string
  ) {
    try {
      await this.transactionService.editCertificate(
        tokenId,
        title,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        monthOfBirth,
        yearOfBirth,
        dateOfCertificate,
        monthOfCertificate,
        yearOfCertificate,
        imageCID,
        uniqueId
      );
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  }



  @Post("/")
  async certificateInfo(
    @BodyParams("title") title: string,
    @BodyParams("firstName") firstName: string,
    @BodyParams("lastName") lastName: string,
    @BodyParams("gender") gender: number,
    @BodyParams("dateOfBirth") dateOfBirth: number,
    @BodyParams("monthOfBirth") monthOfBirth: number,
    @BodyParams("yearOfBirth") yearOfBirth: number,
    @BodyParams("dateOfIssue") dateOfCertificate: number,
    @BodyParams("monthOfIssue") monthOfCertificate: number,
    @BodyParams("yearOfIssue") yearOfCertificate: number,
    @BodyParams("walletAddress") walletAddress: string,
    @BodyParams("imageCID") imageCID: string,
    @BodyParams("uniqueId") uniqueId: string
  ) {
    try {
      await this.transactionService.sendTransaction(
        title,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        monthOfBirth,
        yearOfBirth,
        dateOfCertificate,
        monthOfCertificate,
        yearOfCertificate,
        walletAddress,
        imageCID,
        uniqueId
      );
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  }
  @Delete("/burn/:tokenId")
  async deleteCertificate(@PathParams("tokenId") tokenId: string) {
    try {
      await this.transactionService.burnCertificate(tokenId);
    }
    catch (e) {
      console.log(e);
      return e;
    }
}
}
