import React, { useState } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper
} from '@material-ui/core';
import styles from '../styles';
import api from '../functions/api';
const FreaquencyCalculatorPage = props => {
  const [url, setUrl] = useState('');
  const [rows, setRows] = useState([]);
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const handleCalculateFrequency = () => {
    api.calculateFrequeny(url).then(data => {
      if(data.message == 'OK'){
        setRows(data.wordArray);
      }
      console.log(data.message);
      
      
    })
  }

  return (
    <>
      <List >

        <ListItem style={styles.wrapper}>
          <TextField style={{ width: '50%' }} id="standard-name" label="Bir url giriniz" value={url} onChange={handleUrlChange} />
          <Button variant="contained" onClick={handleCalculateFrequency} color="primary">
            Frekans Hesapla
          </Button>
        </ListItem>
        <ListItem>
          <TableContainer component={Paper} style={styles.wrapper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Kelime</TableCell>
                  <TableCell align="right">Tekrarlama Sayisi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.repeatAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </ListItem>
      </List>
    </>
  );
}

export default FreaquencyCalculatorPage;