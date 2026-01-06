import { Box, Progress, VStack, Center } from "native-base";

const InitialLoad = ({ setProgress }) => {
    return (
        <Center flex={1} px="3">
            <Center w="100%">
                <Box w="90%" maxW="400">
                    <VStack space="md">
                        <Progress colorScheme="warning" value={setProgress} />
                    </VStack>
                </Box>
            </Center>
        </Center>
    );
};

export default InitialLoad;
