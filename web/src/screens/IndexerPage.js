import React, { useState } from 'react';
import {
    TextField,
    Button,
    List,
    ListItem,
    Grid,
    Paper,
    CircularProgress,
    Typography,
    ListItemSecondaryAction,
    Divider,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import api from '../functions/api';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        overflow: 'auto'
    },
}));
const IndexerPage = props => {
    const classes = useStyles();
    const [url1, setUrl1] = useState('');
    const [url2, setUrl2] = useState('');
    const [result, setResult] = useState({});
    const [spinnerIsVisible, setSpinnerIsVisible] = useState(false);
    const [urlSet, setUrlSet] = useState([]);

    const handleUrl1Change = (event) => {
        setUrl1(event.target.value);
    };
    const handleUrl2Change = (event) => {
        setUrl2(event.target.value);
    };
    const handleAddList = () => {
        if (url2.includes('http') && !urlSet.includes(url2) && url1 != url2) {

            setUrlSet((arr) => [...arr, url2])
            setUrl2('')
        } else {
            alert('link yanlis veya link zaten url kumesinde')
        }

    }
    const handleDeleteList = (url) => {
        var newArr = [...urlSet];
        const index = newArr.indexOf(url);
        if (index > -1) {
            newArr.splice(index, 1);
        }
        setUrlSet(newArr)

    }
    const clearList = () => setUrlSet([]);

    const handleRequest = () => {

        setSpinnerIsVisible(true);
        var jsonObject = {
            baseUrl: url1,
            urlSet: urlSet
        }
        if (url1.includes('http') && urlSet.length > 0) {
            api.indexWebSite(jsonObject).then((data) => {
                setUrl1('')
                setUrlSet([])
                setSpinnerIsVisible(false);
                console.log(data)
            })
        }
        else if (urlSet.length === 0) {
            alert('Url kumesi bos olamaz')
        }
        else {
            alert('Lutfen dogru bir link giriniz')
        }
    }
    return (
        <Paper elevation={3} style={styles.mainContainer}>
            <Grid container spacing={1} style={styles.mainWrapper}>
                <Grid item xs={6} style={{ height: '100%' }}>
                    <Paper elevation={3} className={classes.paper}>
                        <List>
                            <ListItem>

                                <TextField
                                    style={{ width: '100%' }}
                                    id="standard-name"
                                    label="Birinci url'i giriniz"
                                    value={url1}
                                    onChange={handleUrl1Change}
                                />
                            </ListItem>
                            <ListItem style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

                                <TextField
                                    style={{ width: '100%' }}
                                    id="standard-name"
                                    label="Url kümesine ekleme yapın..."
                                    value={url2}
                                    onChange={handleUrl2Change}
                                />

                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={handleAddList}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>

                            <Button
                                variant="contained"
                                onClick={handleRequest}
                                color="primary"
                            >
                                Indexle
                        </Button>
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={6} style={{ height: '100%' }}>
                    <Paper elevation={3} className={classes.paper} style={{ height: '85%' }}>
                        <List style={{ height: '100%' }} >
                            <ListItem key={0}>
                                <ListItemText primary={"Url Kumesi"} />
                                <ListItemSecondaryAction>
                                    <Button
                                        color='secondary'
                                        aria-label="delete"
                                        size='small'
                                        onClick={clearList}

                                    >
                                        Kümeyi Temizle
                                    </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            {urlSet.map((url, i) => {
                                return (
                                    <>
                                        <ListItem key={i + 1}>
                                            <ListItemText style={{ overflow: 'hidden' }} primary={<a href={url}>{url}</a>} />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => { handleDeleteList(url) }}
                                                >
                                                    <DeleteIcon color='secondary' />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider />
                                    </>
                                )
                            })}
                            {urlSet.length == 0 &&
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <span style={{ color: 'MenuText' }}>KÜME BOŞ :(</span>
                                </div>

                            }
                        </List>
                    </Paper>
                </Grid>
            </Grid>
            {spinnerIsVisible &&
                <ListItem style={{ display: 'flex', justifyContent: 'center' }} >

                    <CircularProgress />

                </ListItem>
            }
            <div style={styles.table}>

                <TableContainer TableContainercomponent={Paper}>
                    <Table aria-label="simple table">

                        <TableHead>
                            <TableRow>
                                <TableCell>Sıralama</TableCell>
                                <TableCell >URL</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {rows.map((row) => (
                                <TableRow key={row[0]}>
                                    <TableCell component="th" scope="row">
                                        {row[0]}
                                    </TableCell>
                                    <TableCell align="right">{row[1]}</TableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Paper>
    );
}
const styles = {
    mainWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '40%',
        overflow: 'hidden'
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        position: 'relative',
        height: (window.innerHeight - 120),
        marginTop: 10,
        padding: 15,
        overflow: 'hidden',

    },
    table: {
        display: 'flex',
        maxHeight: '55%',
        overflow: 'auto',
        width: '100%',
        justifyContent: 'center'
      }
}
export default IndexerPage;