import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Button } from "@material-ui/core";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  media: {
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    height: 25,
    width: 25,
    backgroundColor: red[500],
  },
}));

export default function Item(props) {
  const classes = useStyles();
  const { id, title, author, image, price, quantity, description } = props.item;

  const handleClick = (e) =>{
    console.log("clicked", id);
  }

  return (
    <Card>
      {/* {console.log(props, props.id)} */}
      <CardHeader
        style={{ textAlign: "left" }}
        avatar={<Avatar className={classes.avatar}>{author[0]}</Avatar>}
        title={
          <Typography style={{ fontSize: "12px" }}>
            {title.slice(0, 20)}
          </Typography>
        }
        subheader={
          <Typography style={{ fontSize: "10px" }}>
            {author.slice(0, 20)}
          </Typography>
        }
      />
      <Divider />
      <CardMedia
        className={classes.media}
        image={image.slice(0, -1)}
        title={description}
      />
      <Divider />
      <CardContent>
        <Typography
          variant="body2"
          color="textPrimary"
          style={{ fontSize: "10px", textAlign: "left" }}
          component="p"
        >
          PRICE: {price}
        </Typography>
        <Typography
          variant="body2"
          color="textPrimary"
          component="p"
          style={{ fontSize: "10px", textAlign: "left" }}
        >
          QUANTITY: {quantity}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="cart" onClick={()=>handleClick(id)} >
          <ShoppingCartIcon />
        </IconButton>
        <Button variant="contained">Order</Button>
      </CardActions>
    </Card>
  );
}
