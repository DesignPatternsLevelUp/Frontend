import {
    Box,
    Button,
    Card,
    CardBody,
    Center,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link,
    Stack,
    Text,
    VStack,
  } from '@chakra-ui/react';
import { isAuthenticated, setAccessToken } from '../../services/authentication';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

  
  export function Login() {
    const redirect_uri = new URL('http://localhost:5173/');
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const [busyAuthenticating, setBusyAuthenticating] = useState(false);
  
    const validateUser = async () => {
      setAuthenticated(await isAuthenticated()); //add this to your component if you want it to check for authentication.
      let queryString = window.location.hash.replace('#','?');

      if (authenticated) {
        navigate("/company");
      }
      if (queryString && !authenticated && !busyAuthenticating) {
        setBusyAuthenticating(true);
        const params = new URLSearchParams(queryString);
        let accessToken = params.get("access_token");
        await setAccessToken(accessToken, navigate);
      }
    };
    if (authenticated) {
      navigate("/company");
    }
  
    useEffect(() => {
      validateUser();
    }, []);

    return (
      <Box>
        <Center>
          <Stack spacing='4'>
            <VStack as='header' spacing='6' mt='8'>

              <Heading
                as='h1'
                fontWeight='300'
                fontSize='24px'
                letterSpacing='-0.5px'
              >
                Sign in using cognito
              </Heading>
            </VStack>
            <Card bg='#f6f8fa' variant='outline' borderColor='#d8dee4' w='308px'>
                
  
                    <Button
                      bg='#2da44e'
                      color='white'
                      size='sm'
                      _hover={{ bg: '#2c974b' }}
                      _active={{ bg: '#298e46' }}
                    >
                      
                      <a href={`https://stockexchange.auth.eu-west-1.amazoncognito.com/oauth2/authorize?client_id=6adpbancgnmoo945qq0q9nc73s&response_type=token&scope=email+openid&redirect_uri=${redirect_uri}`}>
                      Sign in
                      </a>
                    </Button>


            </Card>

          </Stack>
        </Center>
      </Box>
    );
  }