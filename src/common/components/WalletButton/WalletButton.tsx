import { Button, useDisclosure } from "@chakra-ui/react";
import { WalletSelect } from "@talisman-connect/components";

export const WalletButton = () => {
  const walletDisclosure = useDisclosure();

  const handleButtonClick = () => {
    walletDisclosure.onOpen();
  };

  return (
    <WalletSelect
      // [Required] The dapp name
      dappName="My First Dapp"
      // Use if the dapp is controlling the modal toggle.
      open={walletDisclosure.isOpen}
      // The component that opens the WalletSelect Modal
      triggerComponent={
        <Button
          // `onClick` is optional here
          onClick={handleButtonClick}
        >
          Connect to wallet
        </Button>
      }
      // If `showAccountsList={true}`, then account selection modal will show up after selecting the a wallet. Default is `false`.
      showAccountsList={true}
    />
  );
};
