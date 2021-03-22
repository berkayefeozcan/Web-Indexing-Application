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
  CircularProgress
} from '@material-ui/core';
import styles from '../styles';
import api from '../functions/api';

const FreaquencyCalculatorPage = (props) => {
  const [url, setUrl] = useState('');
  const [rows, setRows] = useState([]);
  const[spinnerIsVisible,setSpinnerIsVisible] = useState(false);
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleCalculateFrequency = () => {
    setSpinnerIsVisible(true);
    api.calculateFrequeny(url).then(data => { 
      setSpinnerIsVisible(false);
      console.log(data);     
      if(data.message ==='OK'){

        setRows(data.wordArray);
      }else{
        setRows([]);
        alert("yanlis bir url girdiniz ya da bir sorunla karsilasildi")
      }
    })
  }

  return (
    <>
      <List>
        <ListItem style={styles.wrapper}>
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
        </ListItem>
        <ListItem>

          <TableContainer TableContainercomponent={Paper} style={styles.wrapper}>
            <Table aria-label="simple table">

              <TableHead>
                <TableRow>
                  <TableCell>Kelime</TableCell>
                  <TableCell align="right">Tekrarlama Sayisi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { spinnerIsVisible && <CircularProgress style={{display:'flex',justifySelf:'center', alignSelf:'center'}}/>}
                {rows.map((row) => (
                  <TableRow key={row[0]}>
                    <TableCell component="th" scope="row">
                      {row[0]}
                    </TableCell>
                    <TableCell align="right">{row[1]}</TableCell>
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
const stylesIn ={
  table:{
    height:window.innerHeight*0.7
  }

};

export default FreaquencyCalculatorPage;
