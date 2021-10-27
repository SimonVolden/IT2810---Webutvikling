import React, { Fragment } from 'react';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import withCollapseContainer from './CollapseContainer';
import { Method } from '../interfaces/Method';
import { MashTemp } from '../interfaces/Temp';

interface BeerMethodsProps {
    method: Method
    brewers_tips: string
}

function BeerMethods(props: BeerMethodsProps): JSX.Element {

    // Antar celsius ettersom eneste enhet brukt I dataen er celsius selv om det er definert enhet og en mer komplett løsning ville vær å ta høyde for begge
    function celsiusToFahrenheit(c: number): number {
        return Math.round(((c + 40) * 1.8) - 40);
    }

    function getMinutes(m: number): string {
        if (m === null) return "N/A";
        return m + " minutes";
    }

    return (
        <CardContent>
            <Toolbar >
                <Typography variant="body1" component="div">
                    Mash Temp
                </Typography>
            </Toolbar>
            <TableContainer>
                <Table>
                    <TableBody sx={{ width: "100%" }}>
                        {props.method.mash_temp.map((m: MashTemp) => {
                            return (
                                <TableRow key={m.duration + m.temp.value}>
                                    <TableCell align="center" sx={{ width: "33%" }}>{m.temp.value + "°C"}</TableCell>
                                    <TableCell align="center" sx={{ width: "33%" }}>{celsiusToFahrenheit(m.temp.value) + "°F"}</TableCell>
                                    <TableCell align="center" sx={{ width: "33%" }}>{getMinutes(m.duration)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Toolbar >
                <Typography variant="body1" component="div">
                    Fermentation
                </Typography>
            </Toolbar>
            <TableContainer>
                <Table>
                    <TableBody sx={{ width: "100%" }}>
                        <TableRow>
                            <TableCell align="center" sx={{ width: "50%" }}>{props.method.fermentation.temp.value + "°C"}</TableCell>
                            <TableCell align="center" sx={{ width: "50%" }}>{celsiusToFahrenheit(props.method.fermentation.temp.value) + "°F"}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {props.method.twist !== null &&
                <Fragment>
                    <Toolbar>
                        <Typography variant="body1" component="div">
                            Twist
                        </Typography>
                    </Toolbar>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography paragraph>
                                            {props.method.twist}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Fragment>
            }
            <Toolbar>
                <Typography variant="body1" component="div">
                    Brewers tips
                </Typography>
            </Toolbar>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1" component="div">
                                    {props.brewers_tips}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
    )

}

export default withCollapseContainer(BeerMethods);