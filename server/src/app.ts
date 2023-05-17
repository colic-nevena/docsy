import DependencyContainer from "./DependencyContainer"

const dependencyContainer = new DependencyContainer(process.env)

async function main() {
    dependencyContainer.start()
}

main().catch(console.error)

