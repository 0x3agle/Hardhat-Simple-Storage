const { ethers, run } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying Contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Contract Address: ${simpleStorage.address}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying Contract...")
    try {
        await run("verify: verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.messagae.toLowerCase().includes("verified")) {
            console.log("Already Verified")
        } else {
            console.log(error)
        }
    }
}

main()
    .then(() => process.exit())
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
