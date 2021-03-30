import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@material-ui/core'
const HomePage = props => {
    return (
        <Container >
            <br></br>
            <Typography align='center' component='h1' variant='h3'>Web İndeksleme Uygulaması</Typography>
            <br></br>
            <Typography align='justify' component='body' variant='body1'>
                Amaç: Verilen bir URL’deki web sayfa içeriğine göre diğer birden fazla web sayfasını benzerlik bakımından indeksleyip sıralayan web tabanlı bir uygulama geliştirmek. Böylece bu proje sayesinde web indeksleme yöntemleri hakkında bilgi edinilmesini ve web tabanlı uygulama yazma becerisinin geliştirilmesi amaçlanmaktadır.
            </Typography>
            <br></br>
            <Typography align='justify' component='body' variant='body1'>
                Bu proje kapsaminda web scraping projesi yapilmasi amaclanmistir. Biz de bu amacla web scraping icin guclu bir dil olan python dilini kullanmaya karar verdik. Proje isterleri kapsaminda ilk olarak birinci url’de bulunan tum kelimelerin frekansinin bulunmasi, ilgili url icerisinde bulunan tum anahtar kelimelerin cikarilmasi, iki farkli url’in benzerlik oranin hesaplanmasi, url ver url kumesinin benzerlik oranlarinin semantik analiz kullanilarak hesaplanmasi adimlarindan olusmaktadir. Biz de bu amacla ilk olarak ilgili sitelerden html taglarinden arindirilmis olarak text bilgilerini elde ettik. Sonradan bu text bilgilerine gore isterleri tamamladik.
            </Typography>
            <br></br>
            <Container >
                <ListItemText primary={"Kullanilan Teknoloji ve Diller :"} />
                <ListItem>
                    <Typography align='justify' component='body' variant='body1'>
                        Frontend: React.js
            </Typography>
                </ListItem>
                <ListItem>
                    <Typography align='justify' component='body' variant='body1'>
                        Backend: Python(flask) , BeautifulSoup , nltk
            </Typography>
                </ListItem>
            </Container>
        </Container>
    );
}
export default HomePage;
