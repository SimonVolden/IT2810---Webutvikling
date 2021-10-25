import React, { useState, Fragment } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function BeerListCollapse(props: any) {
    const [isOpened, setIsOpened] = useState(false);

    function handleClick(e: any) {
        e.preventDefault();
        setIsOpened(!isOpened);
    }

    return (
        <Fragment>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={props.name} />
                {isOpened ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpened} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem>
                        <ListItemText primary={props.data} />
                    </ListItem>
                </List>
            </Collapse>
        </Fragment>
    );
}

export default BeerListCollapse;