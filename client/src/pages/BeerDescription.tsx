import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import withCollapseContainer from './CollapseContainer';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';

interface BeerDescriptionProps {
    desc: string
    food_pairing: string[]
}

function BeerDescription(props: BeerDescriptionProps): JSX.Element {

    return (
        <CardContent>
            <Typography paragraph>
                {props.desc}
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1" component="div">
                                    Food pairings
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.food_pairing.map((food: string) => {
                            return (
                                <TableRow key={food}>
                                    <TableCell>
                                        <Typography paragraph variant="body2">
                                            {food}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
    )
}

export default withCollapseContainer(BeerDescription);
