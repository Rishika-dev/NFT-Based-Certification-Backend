import { Controller, Post, BodyParams, Inject } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { CertificateModel } from "../../models/CertificateModel";
import { TransactionService } from "src/services/TransactionService";

@Controller("/certificate")
export class CIDController {
  @Inject(CertificateModel)
  private CertificateModel: MongooseModel<CertificateModel>;
  @Inject() transactionService: TransactionService;
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
}
