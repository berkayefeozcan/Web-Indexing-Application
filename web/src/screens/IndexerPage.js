import React, { useState } from 'react';
import {
    TextField,
    Button,
    List,
    ListItem,
    Grid,
    Paper,
    CircularProgress,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import api from '../functions/api';
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
const IndexerPage = props => {
    const classes = useStyles();
    const [url1, setUrl1] = useState('');
    const [url2, setUrl2] = useState('');
    const [result, setResult] = useState({});
    const [spinnerIsVisible, setSpinnerIsVisible] = useState(false);
    const [urlSet,setUrlSet] = useState([]);

    const handleUrl1Change = (event) => {
        setUrl1(event.target.value);
    };
    const handleUrl2Change = (event) => {
        setUrl2(event.target.value);
    };
    const handleAddList=()=>{
        setUrlSet((arr)=>[...arr,url2])

    }
    const clearTextField=(event)=>{
        event.target.value=''
    }
    const handleRequest=()=>{
        setSpinnerIsVisible(true);
        var jsonObject ={
            baseUrl:url1,
            urlSet:urlSet
        }
        api.indexWebSite(jsonObject).then((data)=>{
            console.log(data)
        })
    }
    return (
        <Grid container spacing={2} style={styles.mainWrapper}>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <TextField
                        style={{ width: '40%' }}
                        id="standard-name"
                        label="Birinci url'i giriniz"
                        value={url1}
                        onChange={handleUrl1Change}
                    />
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',width:'100%' }}>

                        <TextField
                            onClick={clearTextField}
                            style={{ width: '40%' }}
                            id="standard-name"
                            label="Url kümesine ekleme yapın..."
                            value={url2}
                            onChange={handleUrl2Change}
                        />
                        <Button
                            variant="contained"
                            onClick={handleAddList}
                            color="primary"
                        >
                            Url Listesine Ekle
                        </Button>
                    </div>
                    <Button
                            variant="contained"
                            onClick={handleRequest}
                            color="primary"
                        >
                            Indexle
                        </Button>
                </Paper>
            </Grid>
            
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <List>
                        {urlSet.map((url,i)=>{
                            return(
                                <ListItem key={i}>
                                    <Typography>{url}</Typography>
                                </ListItem>
                            )
                        })}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
}
const styles = {
    mainWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}
export default IndexerPage;