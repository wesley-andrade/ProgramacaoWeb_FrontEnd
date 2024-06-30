import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Image,
  Text,
  VStack,
  Heading,
  Spinner,
  Button,
  Badge,
} from "@chakra-ui/react";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.thedogapi.com/v1/images/${id}`, {
        headers: {
          "x-api-key":
            "live_3h9UUBd7zMQihV2jz0jvsAIgJDrV5XS3GvuOcIQwWKUB19BbhvVp0mtOxnE3K3aa",
        },
      })
      .then((response) => setDog(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!dog) return <Spinner size="xl" />;

  const breed = dog.breeds && dog.breeds[0];

  return (
    <Box p={4} maxW="md" mx="auto" bg="white" borderRadius="lg" boxShadow="lg">
      <Image src={dog.url} alt="Dog" borderRadius="lg" mb={4} />
      <VStack spacing={4} align="start">
        <Heading size="lg" color="teal.500">
          {breed?.name || "Raça Desconhecida"}
        </Heading>
        <Text fontSize="lg">
          <Badge colorScheme="green" mr={2}>
            Criado para:
          </Badge>
          {breed?.bred_for || "Desconhecida"}
        </Text>
        <Text fontSize="lg">
          <Badge colorScheme="blue" mr={2}>
            Expectativa de Vida:
          </Badge>
          {breed?.life_span || "Desconhecida"}
        </Text>
        <Text fontSize="lg">
          <Badge colorScheme="purple" mr={2}>
            Temperamento:
          </Badge>
          {breed?.temperament || "Desconhecido"}
        </Text>
        <Text fontSize="lg">
          <Badge colorScheme="orange" mr={2}>
            Origem:
          </Badge>
          {breed?.origin || "Desconhecida"}
        </Text>
        <Button
          onClick={() => navigate(-1)}
          colorScheme="teal"
          mt={4}
          boxShadow="md"
          _hover={{ boxShadow: "lg" }}
        >
          Voltar
        </Button>
      </VStack>
    </Box>
  );
};

export default DetailPage;
