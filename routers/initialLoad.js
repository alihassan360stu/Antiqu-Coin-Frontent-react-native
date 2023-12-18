import { Box, Progress, VStack, Center, NativeBaseProvider } from "native-base";



const InitialLoad = ({setProgress}) => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Center w="100%">
                    <Box w="90%" maxW="400">
                        <VStack space="md">
                            <Progress colorScheme="warning" value={setProgress} />
                        </VStack>
                    </Box>
                </Center>
            </Center>
        </NativeBaseProvider>
    );
};

export default InitialLoad;
