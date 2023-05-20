import DependencyContainer from "./DependencyContainer";

const dependencyContainer = new DependencyContainer(process.env);

async function main() {
  await dependencyContainer.start();
}

main().catch(console.error);
