import { useAccount, useWalletClient } from "wagmi";
import {
    useConnectModal,
  } from '@rainbow-me/rainbowkit';
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';

export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

  const createAttestation = async (signer) => {
    const eas = new EAS(EASContractAddress);
    eas.connect(signer);
    /*
    const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
    const encodedData = schemaEncoder.encodeData([
        { name: "eventId", value: 1, type: "uint256" },
        { name: "voteIndex", value: 1, type: "uint8" },
    ]);

    const schemaUID = "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";

    const tx = await eas.attest({
        schema: schemaUID,
        data: {
            recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
            expirationTime: 0,
            revocable: true,
            data: encodedData,
        },
    });

    const newAttestationUID = await tx.wait();

    console.log("New attestation UID:", newAttestationUID);
    */
  }
  
    /*export const Attest = async () => {
    const { address, isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();
    if (isConnected) {
        const signer = await useWalletClient();
        return (
            <button onClick={() => createAttestation(signer)} type="button">
                Attest
            </button>
        );
    } else {
        openConnectModal()
    }*/