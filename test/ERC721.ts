import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";

const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("Lock", function () {
  let ERC721: Contract;
  let users, owner: SignerWithAddress, addr1: SignerWithAddress, addr2: SignerWithAddress;

  before(async () => {
    users = await ethers.getSigners();
    owner = users[0];
    addr1 = users[1];
    addr2 = users[2];
  });

  describe("Deployment and Mint", function () {
    it("Should deploy contract", async function () {
      ERC721 = await ethers.getContractFactory("FariaToken");
      ERC721 = await ERC721.deploy();
      await ERC721.deployed();
    });

    it("Should Mint as Minter", async function () {
      ERC721 = await ethers.getContractFactory("FariaToken");
      ERC721 = await ERC721.deploy();
      await ERC721.deployed();

      await ERC721.safeMint(addr1.address, 1, "uri");
    });

    it("Should not mint as regular address", async function () {
      ERC721 = await ethers.getContractFactory("FariaToken");
      ERC721 = await ERC721.deploy();
      await ERC721.deployed();

      expect(
        ERC721.connect(addr1).safeMint(addr1.address, 1, "uri")
      ).to.be.revertedWith(
        "AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6"
      );
    });
  });
});
