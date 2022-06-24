import { Box, Flex, Container } from "@chakra-ui/react";
import { WalletButton } from "../WalletButton/WalletButton";

export const Navbar = () => {
  return (
    <Box as="nav" py={4} px={4}>
      <Container maxWidth="8xl">
        <Flex justifyContent="space-between" width="100%">
          <Box />
          <WalletButton />
        </Flex>
      </Container>
    </Box>
  );
};
