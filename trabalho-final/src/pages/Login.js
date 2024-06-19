import { useState } from "react";
import {
  Button,
  Input,
  Container,
  Box,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    validateForm(event.target.value, password);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validateForm(email, event.target.value);
  };

  const validateForm = (email, password) => {
    if (email && password.length >= 8) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/items");
  };

  return (
    <Container centerContent>
      <Box
        p={8}
        mt={20}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        w="full"
        maxW="md"
        textAlign="center"
      >
        <Heading mb={6}>Login</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Digite seu email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Digite sua senha"
              />
            </FormControl>
            <Button
              colorScheme="teal"
              type="submit"
              isFullWidth
              isDisabled={!isFormValid}
            >
              Acessar
            </Button>
          </VStack>
        </form>
        <Text mt={4}>
          Não tem uma conta?{" "}
          <Button variant="link" colorScheme="teal">
            Cadastre-se
          </Button>
        </Text>
      </Box>
    </Container>
  );
};

export default Login;
