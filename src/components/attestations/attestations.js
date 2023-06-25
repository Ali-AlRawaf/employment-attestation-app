import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        maxWidth: 360,
        height: '50vh',
        margin: '0 auto',
      },
      listItemText: {
        flex: '1 1 auto',
        minWidth: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
}));

const ItemList = ({ items }) => {
    const classes = useStyles();

    return (
        <List component="nav" className={classes.root}>
            {items.map((item, index) => (
                <ListItem key={index} button>
                    <ListItemText primary={item.id} secondary={
                        <React.Fragment>
                            <div>{item.schema.schemaNames.length > 0 ? item.schema.schemaNames[0].name : "Not Available"}</div>
                            <div>{item.attester}</div>
                        </React.Fragment>} classes={{ primary: classes.listItemText }} />
                </ListItem>
            ))}
        </List>
    );
};

export default ItemList; 