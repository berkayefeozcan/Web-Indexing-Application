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
import styles from '../styles';
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
const initialData ={ similarityScore: {score:''} ,url1Keywords:[],url2Keywords:[]}
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
    setSpinnerIsVisible(true)
    setResult(initialData)
    api.calculateSimilarity(url1, url2).then((data) => {
      if (data.message === 'OK') {
        console.log(data)
        setResult(data.result)
        setSpinnerIsVisible(false)
      }
    });
  };
  const KeywordList =props =>{
    return(
      <>
      <Typography component='h5' variant='h5' color='textPrimary'>{props.title}</Typography>
      <List>
        {props.keywordArr.map((keywords,i)=>{
          return(
            <ListItem>
              {
                <Typography>{`${keywords[0]}: ${keywords[1][0]}`}</Typography>
              }
            </ListItem>
          )
        })}
      </List>
      </>
    )
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
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
      </Grid>
      <ListItem>
        {spinnerIsVisible &&
          <div>
            <CircularProgress style={{ display: 'flex', justifySelf: 'center', alignSelf: 'center' }} />

          </div>
        }
        <Typography variant="h4" component="h6" color='textPrimary' >{`Benzerlik Skoru : ${result.similarityScore.score}`}</Typography>
      </ListItem>
      
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
             <KeywordList 
             keywordArr={result.url1Keywords}
             title='Anahtar kelimeler 1'
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
            <KeywordList 
             keywordArr={result.url2Keywords.slice(-5)}
             title='Anahtar kelimeler 2'
              />
            </Paper>
          </Grid>
        </Grid>
 

    </Grid>
  );
};
export default SimilarityCalculatorPage;
