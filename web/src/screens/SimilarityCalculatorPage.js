import React, { useState } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid
} from '@material-ui/core';

import api from '../functions/api';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const initialData = { similarityScore: { score: '' }, url1Keywords: [], url2Keywords: [] }
const SimilarityCalculatorPage = (props) => {
  const classes = useStyles();
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [result, setResult] = useState(initialData);
  const [spinnerIsVisible, setSpinnerIsVisible] = useState(false);

  const handleUrl1Change = (event) => {
    setUrl1(event.target.value);
  };
  const handleUrl2Change = (event) => {
    setUrl2(event.target.value);
  };

  const handleCalculateSimilarity = () => {
   
    setResult(initialData)
    if(url1.includes('http') && url2.includes('http') ){
      setSpinnerIsVisible(true)
      api.calculateSimilarity(url1, url2).then((data) => {
        if (data.message === 'OK') {
          console.log(data)
          setResult(data.result)
          setSpinnerIsVisible(false)
        }
      });
    }
    else alert('Lutfen linkleri duzgun giriniz')
    
  };
  const KeywordList = props => {
    return (
      <>
        <Typography component='h5' variant='h5' color='textPrimary'>{props.title}</Typography>
        <List>
          {props.keywordArr.map((keywords, i) => {
            return (
              <ListItem>
                {
                  <Typography color="textPrimary">{`${keywords[0]}: ${keywords[1][0]}`}</Typography>
                }
              </ListItem>
            )
          })}
        </List>
      </>
    )
  }
  return (
    <Paper elevation={3} style={styles.mainContainer}>
      <Grid container spacing={2} style={{ display:'flex',justifyContent:'center' }}>
        <Grid item xs={12} >
          <List style={{width:'100%',display:'flex',flexDirection:'column',alignContent:'center'}}>
            <ListItem>

              <TextField
                style={{ width: '100%' }}
                id="standard-name"
                label="Birinci url'i giriniz"
                value={url1}
                onChange={handleUrl1Change}
              />
            </ListItem>
            <ListItem>

              <TextField
                style={{ width: '100%' }}
                id="standard-name"
                label="İkinci url'i giriniz"
                value={url2}
                onChange={handleUrl2Change}
              />
            </ListItem>
            <ListItem style={{display:'flex',justifyContent:'center'}} >

              <Button
                variant="contained"
                onClick={handleCalculateSimilarity}
                color="primary"
                size={'small'}
                
              >
                Benzerlik Hesapla
              </Button>
            </ListItem>
          </List>
          {spinnerIsVisible &&
          <ListItem style={{display:'flex',justifyContent:'center'}} >
           
              <CircularProgress />

          </ListItem>
          }
        </Grid>
       
          <Typography variant="h4" component="h6" color='textPrimary' >{`Benzerlik Skoru : ${result.similarityScore.score}`}</Typography>
      

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper variant="outlined" className={classes.paper}>
              <KeywordList
                keywordArr={result.url1Keywords}
                title='Anahtar kelimeler 1'
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper  variant="outlined" className={classes.paper}>
              <KeywordList
                keywordArr={result.url2Keywords.slice(-5)}
                title='Anahtar kelimeler 2'
              />
            </Paper>
          </Grid>
        </Grid>


      </Grid>
    </Paper>
  );
};
const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    position: 'relative',
    height: (window.innerHeight - 120),
    marginTop: 10,
    padding: 15,
    overflow: 'hidden',
    
  }
}
export default SimilarityCalculatorPage;
