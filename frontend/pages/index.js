import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Greeter from "../components/Greeter";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import { useWeb3Contract } from "react-moralis";
import GreeterArtifact from "../contracts/Greeter.json";
import contractAddress from "../contracts/contract-address.json";

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();
  const [fetchedGreeting, setFetchedGreeting] = useState("");

  async function _fetchGreeting() {
    const greet = await getGreet();
    setFetchedGreeting(greet);
  }

  async function _setGreeting(msg) {
    const options = {
      contractAddress: contractAddress.Greeter,
      abi: GreeterArtifact.abi,
      functionName: "setGreeting",
      params: { _greeting: msg },
    };

    const tx = await Moralis.executeFunction(options);
    await tx.wait();
  }

  const {
    runContractFunction: getGreet,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: GreeterArtifact.abi,
    contractAddress: contractAddress.Greeter,
    functionName: "greet",
    params: {},
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Greeter Next App</title>
      </Head>
      <Header />
      {isWeb3Enabled ? (
        <Greeter
          fetchedGreeting={fetchedGreeting}
          fetchGreeting={() => _fetchGreeting()}
          setGreeting={(msg) => _setGreeting(msg)}
        />
      ) : (
        <div>Please connect to a wallet.</div>
      )}
    </div>
  );
}
