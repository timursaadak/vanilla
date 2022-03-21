const serverUrl = "https://3ndy7gwjjbtu.moralis.io:2053/server";
    const appId = "3gxtYZySTp47SnxdRfRHjpsSmwc8pwgEbsswftLb";
    Moralis.start({ serverUrl, appId });

    async function login() {
        let user = Moralis.User.current();
        if (!user) {
            try {
                user = await Moralis.authenticate({ signingMessage: "Authentificate" })
                await Moralis.enableWeb3();
                console.log(user)
                console.log(user.get('ethAddress'))
                } catch (error) {
                console.log(error)
            }
        }
    }

    async function logOut() {
        await Moralis.User.logOut();
        console.log("logged out");
    }

    async function donates() {
        let options = {
            contractAddress: "0xd60020b874dd1c98cdcf811161055857349b01f5",
            functionName: "newDonation",
            abi: [{"inputs":[{"internalType":"string","name":"note","type":"string"}],"name":"newDonation","outputs":[],"stateMutability":"payable","type":"function"}],
            params:{
                note: "Thanks!"
            },
            msgValue: Moralis.Units.ETH(0.1)
        }

        await Moralis.executeFunction(options);
    }