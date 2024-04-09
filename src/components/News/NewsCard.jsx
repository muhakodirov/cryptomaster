import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Button, CardActionArea, CardActions } from '@mui/material';
import moment from 'moment';
import styles from './News.module.css'



export default function NewsCard(props) {
  const { image, title, content, newsURL, id, publish } = props.props

  return (
    <>
      <Card className={styles.card} style={{ marginBottom: 40, position: 'relative' }} sx={{ maxWidth: 290, }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            style={{ width: 400, height: 200, margin: 0 }}
            image={image}
            alt="green iguana"
          />
          <CardContent style={{ paddingBottom: 60 }}>

            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {content.length > 50 ? content.substring(0, 50) + '...' : content}
            </Typography>
          </CardContent>
        </CardActionArea>



        <CardActions style={{ position: 'absolute', display: 'flex', justifyContent: 'center', bottom: 10, width: '100%' }}>
          <Button size="small" color="primary" style={{ marginTop: 20 }} >
            <a style={{ color: 'blue' }} href={newsURL} target='_blank'> More </a>
          </Button>
        </CardActions>
        <Typography style={{ position: 'absolute', marginLeft: 10, bottom: 3, width: '100%', display: 'flex' }} variant="body2" color="text.secondary">
          Published: <i> {moment(publish).startOf('hour').fromNow()} </i>
        </Typography>
      </Card>

    </>
  );
}