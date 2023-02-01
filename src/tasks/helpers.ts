import fs from "fs";
import path from "path";
import { ChainInfo, ContractInfo } from "../models/chains";

export async function getDeployedChains(_path: string) {
  const list = fs.readdirSync(_path);
  let chains: ChainInfo[] = [];
  for (const folder of list) {
    const folderPath = path.join(_path, folder);
    const stat = fs.statSync(folderPath);
    if (stat && stat.isDirectory()) {
      const name = folder;
      const chainIdPath = path.join(folderPath, ".chainId");
      const chainId = fs.readFileSync(chainIdPath, "utf8");
      const chain = new ChainInfo(+chainId, folderPath, name);
      chains.push(chain);
    }
  }
  return chains;
}

export async function getDeployedContracts(_path: string) {
  const list = fs.readdirSync(_path);
  let contracts: ContractInfo[] = [];
  for (const file of list) {
    const filePath = path.join(_path, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isFile()) {
      if (file.endsWith(".json")) {
        const name = file.replace(".json", "");
        if (!name.endsWith("_Proxy")) {
          const contractJsonFile = fs.readFileSync(filePath, "utf8");
          const contractJson = JSON.parse(contractJsonFile);
          const address = contractJson.address;
          const abi = contractJson.abi;
          const contract = new ContractInfo(address, filePath, name, abi);
          contracts.push(contract);
        }
      }
    }
  }
  return contracts;
}

export async function walk(dir: string) {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      const res = await walk(filePath);
      results = results.concat(res);
    } else {
      if (file.endsWith(".dbg.json")) {
      } else {
        results.push(filePath);
      }
    }
  }
  return results;
}

export function readJsonFiles(files: string[]) {
  const result: any[] = [];
  for (const file of files) {
    const data = fs.readFileSync(file, "utf8");
    const { abi, contractName, sourceName } = JSON.parse(data);
    const params = {
      path: file,
      sourceName,
      contractName,
      abi,
    };
    result.push(params);
  }
  return result;
}
