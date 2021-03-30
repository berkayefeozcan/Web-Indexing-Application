import React, { useState } from 'react';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@material-ui/core';
import styles from '../styles';
import api from '../functions/api';

const FreaquencyCalculatorPage = (props) => {
  const [url, setUrl] = useState('');
  const [rows, setRows] = useState([]);
  const [spinnerIsVisible, setSpinnerIsVisible] = useState(false);
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleCalculateFrequency = () => {
    setSpinnerIsVisible(true);
    api.calculateFrequeny(url).then(data => {
      setSpinnerIsVisible(false);
      console.log(data);
      if (data.message === 'OK') {

        setRows(data.wordArray);
      } else {
        setRows([]);
        alert("yanlis bir url girdiniz ya da bir sorunla karsilasildi")
      }
    })
  }

  return (
    <Paper
      style={stylesIn.mainContainer} >
      <div style={{ ...styles.wrapper, marginBottom: 10 }}>
        <TextField
          style={{ width: '50%' }}
          id="standard-name"
          label="Bir url giriniz"
          value={url}
          onChange={handleUrlChange}
        />
        <Button
          variant="contained"
          onClick={handleCalculateFrequency}
          color="primary"
        >
          Frekans Hesapla
          </Button>
      </div>
      {spinnerIsVisible && <CircularProgress style={{ display: 'flex', justifySelf: 'center', alignSelf: 'center' }} />}
      <div style={stylesIn.table}>

        <TableContainer  TableContainercomponent={Paper}>
          <Table stickyHeader aria-label="simple table">

            <TableHead>
              <TableRow>
                <TableCell align='center'>Kelime</TableCell>
                <TableCell align='center'>Tekrarlama Sayisi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row[0]}>
                  <TableCell align='center'>
                    {row[0]}
                  </TableCell>
                  <TableCell align='center'>{row[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );

}
const stylesIn = {
  mainContainer:{
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    position: 'relative',
    height: (window.innerHeight - 120),
    marginTop: 10,
    padding: 15,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  table: {
    display: 'flex',
    height: '100%',
    overflow: 'auto',
    width: '100%',
    justifyContent: 'center'
  }

};

export default FreaquencyCalculatorPage;
