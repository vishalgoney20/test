import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));


const lightTheme = createTheme({ palette: { mode: 'light' } });
  

export default function Products({children}) {

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://3.141.41.8/api/items/')
    // axios.get('http://127.0.0.1:8000/api/items/')
    // axios.get('https://52.15.100.97/api/items/')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
      });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">

        <h1>Products Offered</h1>
        <ThemeProvider theme={lightTheme}>
            <Box
            sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr' },
                width: '250px',
                gap: 2,
            }}
            >
            {items.map((item) => (
                <Item key={item.id} elevation={6}>
                {`${item.name}`}
                </Item>
            ))}
            </Box>
        </ThemeProvider>
      </Container>
    </React.Fragment>
  );
}