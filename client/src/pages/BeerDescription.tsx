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
import { useSelector } from 'react-redux';
import { AppState } from '../stateManagement/types';
import { withStyles } from '@material-ui/core';

interface BeerDescriptionProps {
    desc: string
    food_pairing: string[]
}
//jeg fjernet " component="div"  " fra linje 41, var det viktig?

function BeerDescription(props: BeerDescriptionProps): JSX.Element {
    const pageTheme = useSelector((state: AppState) => state.theme)
    
    const ColorTextTypography = withStyles({
        root: {
            color: pageTheme ? "#ffffff" : "#000000",
        }
      })(Typography);

    return (
        <CardContent>
            <ColorTextTypography paragraph>
                {props.desc}
            </ColorTextTypography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <ColorTextTypography variant="body1" >
                                    Food pairings
                                </ColorTextTypography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.food_pairing.map((food: string) => {
                            return (
                                <TableRow key={food}>
                                    <TableCell>
                                        <ColorTextTypography paragraph variant="body2">
                                            {food}
                                        </ColorTextTypography>
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
