import React from 'react'
import {
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Card,
    IconButton,
    Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,

    },
    media: {
        height: 250,
    },
});
const CardCmpt = (props) => {
    const classes = useStyles();
    return (
        <Grid item xs={6} >
            <Card className={classes.root}>
                <CardActionArea onClick={() => { window.open(props.newPageUrl, '_blank'); }}>
                    <CardMedia
                        className={classes.media}
                        image={props.imageUrl}
                        title="LinkedIn Sayfasina git"
                    />
                    <CardContent >
                        <Typography align="center" gutterBottom variant="h5" component="h2">
                            {props.name}
                        </Typography>
                        <Typography align="center" variant="body2" color="textSecondary" component="p">
                            {props.text}
                        </Typography>
                        <Typography align="center" variant="body2" color="textSecondary" component="p">
                            {props.location}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{display:'flex',justifyContent:'center'}}>
                    <IconButton style={{color:'black'}} aria-label="add an alarm">
                        <GitHubIcon onClick={() => { window.open(props.gitHubPage, '_blank');}}/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>

    )
}
const DevelopersPage = () => {

    return (
        <div style={stylesIn.mainContainer}>
            <Grid alignItems="center"
                justify="center" direction="row" container spacing={3}  >
                <CardCmpt
                    name="Berkay Efe Özcan"
                    imageUrl={'https://media-exp1.licdn.com/dms/image/C5603AQEdwuSqQtDjGA/profile-displayphoto-shrink_800_800/0/1578261937152?e=1622678400&v=beta&t=yeLR5FgjZvTliwVBczc6hTcMjQ86eeTykJcEOMFgT30'}
                    text={'Full Stack Developer at ShiftSoft Yazılım Geliştirme'}
                    location={'Muğla, Türkiye'}
                    newPageUrl={'https://www.linkedin.com/in/berkay-efe-ozcan/'}
                    gitHubPage={'https://github.com/berkayefeozcan'}
                />
                <CardCmpt
                    name="Cumali Toprak"
                    imageUrl={'https://media-exp1.licdn.com/dms/image/C5603AQFxI702SQIQIg/profile-displayphoto-shrink_800_800/0/1612334414825?e=1622678400&v=beta&t=-EoxB2HfUku92Uyq6Xe5yttajd69L2P1it1Y4QE9_Uk'}
                    text={'Intern at Arçelik Global'}
                    location={'İstanbul, Türkiye'}
                    newPageUrl={'https://www.linkedin.com/in/cumali-toprak-2b7ba5163/'}
                    gitHubPage={'https://github.com/CumaliToprak'}
                />

            </Grid>
        </div>


    )
};
const stylesIn = {

    mainContainer: {

        position: 'absolute',
        left: '50%',
        top: '40%',
        transform: 'translate(-50%, -50%)'


    },

};
export default DevelopersPage;