import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Button,
  Input,
  VStack,
  Heading,
  Badge,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ListPage = () => {
  const [dogs, setDogs] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.thedogapi.com/v1/images/search?limit=9&page=${page}&order=Asc`,
        {
          headers: {
            "x-api-key":
              "live_3h9UUBd7zMQihV2jz0jvsAIgJDrV5XS3GvuOcIQwWKUB19BbhvVp0mtOxnE3K3aa",
          },
        }
      )
      .then((response) => {
        setDogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [page]);

  const handleSearch = async () => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.thedogapi.com/v1/breeds/search?q=${query}`,
        {
          headers: {
            "x-api-key":
              "live_3h9UUBd7zMQihV2jz0jvsAIgJDrV5XS3GvuOcIQwWKUB19BbhvVp0mtOxnE3K3aa",
          },
        }
      );

      const breedIds = response.data.map((breed) => breed.id);
      const searchResponses = await Promise.all(
        breedIds.map((id) =>
          axios.get(
            `https://api.thedogapi.com/v1/images/search?breed_id=${id}`,
            {
              headers: {
                "x-api-key":
                  "live_3h9UUBd7zMQihV2jz0jvsAIgJDrV5XS3GvuOcIQwWKUB19BbhvVp0mtOxnE3K3aa",
              },
            }
          )
        )
      );

      setSearchResults(searchResponses.map((res) => res.data[0]));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    setSearchResults([]);
  };

  return (
    <Box p={4}>
      <VStack spacing={8} align="stretch">
        <Heading mb={8} textAlign="center" color="teal.500">
          Busca por Raça de Cachorro
        </Heading>
        <HStack spacing={4}>
          <Input
            variant="filled"
            placeholder="Digite a raça do cachorro, ex: pit bull"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            size="lg"
          />
          <Button
            colorScheme="teal"
            size="lg"
            onClick={handleSearch}
            boxShadow="md"
            _hover={{ boxShadow: "lg" }}
          >
            Buscar
          </Button>
          <Button
            colorScheme="red"
            size="lg"
            onClick={handleClearSearch}
            boxShadow="md"
            _hover={{ boxShadow: "lg" }}
          >
            Limpar
          </Button>
        </HStack>
      </VStack>

      {loading ? (
        <Spinner size="xl" mt={12} />
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={8} mt={12}>
          {(searchResults.length > 0 ? searchResults : dogs).map((dog) => {
            const breed = dog.breeds && dog.breeds[0];
            return (
              <Box
                key={dog.id}
                p={4}
                borderWidth={1}
                borderRadius={8}
                boxShadow="md"
                _hover={{ boxShadow: "lg" }}
                bg="white"
              >
                <Image src={dog.url} alt="Dog" borderRadius={8} />
                <VStack mt={4} align="start" spacing={2}>
                  <Text fontSize="lg" fontWeight="bold" color="teal.500">
                    Raça: {breed?.name || "Desconhecida"}
                  </Text>
                  <Text>
                    <Badge colorScheme="blue" mr={2}>
                      Expectativa de Vida:
                    </Badge>
                    {breed?.life_span || "Desconhecida"}
                  </Text>
                  <Link to={`/detail/${dog.id}`}>
                    <Button colorScheme="teal">Detalhes</Button>
                  </Link>
                </VStack>
              </Box>
            );
          })}
        </SimpleGrid>
      )}

      {searchResults.length === 0 && !loading && (
        <Button
          onClick={() => setPage(page + 1)}
          colorScheme="teal"
          mt={8}
          size="lg"
          isFullWidth
          boxShadow="md"
          _hover={{ boxShadow: "lg" }}
        >
          Carregar Mais
        </Button>
      )}
    </Box>
  );
};

export default ListPage;
