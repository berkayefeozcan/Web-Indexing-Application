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
    TableRow, Slide, Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Rjv from 'react-json-tree-viewer'
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
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const testUrlSet=[
    "https://undergrad.cs.umd.edu/what-computer-science#:~:text=Computer%20Science%20is%20the%20study,design%2C%20development%2C%20and%20application.",
    "https://en.wikipedia.org/wiki/Computer_science",
    "https://www.britannica.com/science/computer-science",
    "https://cs.sabanciuniv.edu/"

]
const IndexerAndAnalyser = props => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [url1, setUrl1] = useState('');
    const [url2, setUrl2] = useState('');
    const [tree, setTree] = useState({})
    const [resultArr, setResultArr] = useState([]);
    const [spinnerIsVisible, setSpinnerIsVisible] = useState(false);
    const [urlSet, setUrlSet] = useState(testUrlSet);

    const handleUrl1Change = (event) => {
        setUrl1(event.target.value);
    };
    const handleUrl2Change = (event) => {
        setUrl2(event.target.value);
    };
    const handleOpenDialog = (tree) => {
        setTree(tree);
        setOpen(!open);
    }
    const handleCloseDialog = () => {
        setOpen(!open);
    }
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
        var jsonObject = {
            baseUrl: url1,
            urlSet: urlSet
        }
        if (url1.includes('http') && urlSet.length > 0) {
            setSpinnerIsVisible(true);
            props.api(jsonObject).then((data) => {
                if (data.message == "success") {
                    setResultArr(data.result);
                }
                console.log(data.result)
                setSpinnerIsVisible(false);
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
                                        color='primary'
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
                    <Table stickyHeader  aria-label="simple table">

                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Sıralama</TableCell>
                                <TableCell align='center' >URL</TableCell>
                                <TableCell align='center'>Skor</TableCell>
                                <TableCell align="center">Agac</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {resultArr.map((url, i) => (
                                <TableRow key={i}>
                                    <TableCell align="center">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell align="center" ><a href={url.urlName}>{url.urlName}</a></TableCell>
                                    <TableCell align="center">{url.score}</TableCell>
                                    <TableCell align="center" >{
                                        <Button
                                            size='small'
                                            color='primary'
                                            onClick={() => { handleOpenDialog(url.tree) }}
                                        >
                                            Agac yapisi
                                        </Button>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Dialog
                open={open}
                fullWidth={true}
                maxWidth={'xl'}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"URL AGAC YAPISI"}</DialogTitle>
                <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
                    <List>

                    <Typography>{`Url: ${tree.urlName}`}</Typography>
                    <Rjv data={tree} />
                    </List>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        KAPAT
                     </Button>
                </DialogActions>
            </Dialog>
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
export default IndexerAndAnalyser;