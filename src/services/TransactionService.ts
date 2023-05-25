import { Injectable } from "@tsed/di";
import { ethers } from "ethers";
import { Inject } from "@tsed/di";
import abi from "../abi/abi.json";
@Injectable()
export class TransactionService {
  provider: ethers.providers.JsonRpcProvider;
  wallet: ethers.Wallet;
  contract: ethers.Contract;
  gasPrice = '400';
constructor(){
  this.provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/R9SlWPf8ox66AdHFzA4V7m-F9ZuN7z65");
  this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY||"", this.provider);
  this.contract = new ethers.Contract("0xe992AA21f9c15192b50373abeef4dC3de59D144F", abi, this.wallet);
}

  async sendTransaction(
    title: string,
    firstName: string,
    lastName: string,
    gender: number,
    dateOfBirth: number,
    monthOfBirth: number,
    yearOfBirth: number,
    dateOfCertificate: number,
    monthOfCertificate: number,
    yearOfCertificate: number,
    walletAddress: string,
    imageCID: string,
    uniqueId: string
  ) {
    
console.log([title,firstName,lastName,dateOfBirth,monthOfBirth,yearOfBirth,dateOfCertificate,monthOfCertificate,yearOfCertificate,gender,imageCID])
    // call the generateCertificate function of the contract
    const tx = await this.contract.generateCertificate(walletAddress, [title,firstName,lastName,dateOfBirth,monthOfBirth,yearOfBirth,dateOfCertificate,monthOfCertificate,yearOfCertificate,gender,imageCID,uniqueId],{gasPrice: ethers.utils.parseUnits(this.gasPrice, 'gwei')});

    await tx.wait(); // wait for the transaction to be confirmed on the blockchain
    console.log("Certificate generated");
    return true
  }

  async getTokenIdFromUID(uniqueId: string) {
    const tokenId = await this.contract.tokenOfUniqueId(uniqueId);
    return tokenId.toString();
  }

  async getDetailsByTokenId(tokenId: string) {
    console.log(tokenId, "tokenId");
    const details = await this.contract.certificateHolders(tokenId);
    const owner = await this.contract.ownerOf(tokenId);
    return [...details,owner];
  }

  async editCertificate(tokenId:string, title: string, firstName: string,lastName:string,gender:number, dateOfBirth: number, monthOfBirth: number, yearOfBirth: number, dateOfCertificate: number, monthOfCertificate: number, yearOfCertificate: number, imageCID: string,uniqueId: string) {
    const tx = await this.contract.edit(tokenId, [title,firstName,lastName,dateOfBirth,monthOfBirth,yearOfBirth,dateOfCertificate,monthOfCertificate,yearOfCertificate,gender,imageCID,uniqueId],{gasPrice: ethers.utils.parseUnits(this.gasPrice, 'gwei')});
    await tx.wait();
    console.log("Certificate edited");
    return true
  }
  async burnCertificate(tokenId:string) {
    const tx = await this.contract.burn(tokenId,{gasPrice: ethers.utils.parseUnits(this.gasPrice, 'gwei')});
    await tx.wait();
    console.log("Certificate burned");
    return true
  }
}

