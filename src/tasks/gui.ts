import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { task, types } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getDeployedChains, getDeployedContracts } from "./helpers";

const gui = async (hre: HardhatRuntimeEnvironment, deploymentPath: string) => {
  // const result = await walk(process.cwd() + "/" + deploymentPath);

  const deployedChains = await getDeployedChains(
    process.cwd() + "/" + deploymentPath
  );

  for (const chain of deployedChains) {
    const deployedContracts = await getDeployedContracts(chain.path);
    chain.contracts = deployedContracts;
  }

  console.log(deployedChains);

  writeFileSync(
    `${__dirname}/../../ui/src/chains/chains.json`,
    JSON.stringify(deployedChains)
  );
};

task("gui", "Open the Hardhat GUI")
  .setDescription("Build an interactive GUI for your contracts")
  .addOptionalParam("port", "The port to use", 3000, types.int)
  .addOptionalParam(
    "deploymentPath",
    "The path for the deployment files",
    "deployments"
  )
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    console.log("Starting React App");
    const { deploymentPath } = taskArgs;
    await gui(hre, deploymentPath);
    execSync(`cd ${__dirname}/../../ui && npm run start`, {
      env: { ...process.env, PORT: taskArgs.port },
      stdio: "inherit",
    });
  });

export default gui;
