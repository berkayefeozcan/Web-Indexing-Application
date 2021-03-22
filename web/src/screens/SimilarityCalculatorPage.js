import React, { useState } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import styles from '../styles';
import api from '../functions/api';

const SimilarityCalculatorPage = (props) => {
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [rows, setRows] = useState([]);

  const handleUrl1Change = (event) => {
    setUrl1(event.target.value);
  };
  const handleUrl2Change = (event) => {
    setUrl2(event.target.value);
  };

  const handleCalculateSimilarity = () => {
    api.calculateSimilarity(url1, url2).then((data) => {
     console.log(data);
    });
  };

  return (
    <List>
      <ListItem style={styles.wrapper}>
        <TextField
          style={{ width: '40%' }}
          id="standard-name"
          label="Birinci url'i giriniz"
          value={url1}
          onChange={handleUrl1Change}
        />

        <TextField
          style={{ width: '40%' }}
          id="standard-name"
          label="İkinci url'i giriniz"
          value={url2}
          onChange={handleUrl2Change}
        />
        <Button
          variant="contained"
          onClick={handleCalculateSimilarity}
          color="primary"
        >
          Benzerlik Hesapla
        </Button>
      </ListItem>
      
    </List>
  );
};
export default SimilarityCalculatorPage;
