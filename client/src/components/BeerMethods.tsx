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
import { withStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { AppState } from '../stateManagement/types';

interface BeerMethodsProps {
    method: Method
    brewers_tips: string
}

/**
 * The dropdown menu with the Beer Method elements presented in a Table
 * @param props Beer Method elements
 * @returns JSX.Element
 */
function BeerMethods(props: BeerMethodsProps): JSX.Element {
    const pageTheme = useSelector((state: AppState) => state.theme)
    
    const ColorTextTypography = withStyles({
        root: {
            color: pageTheme ? "#ffffff" : "#000000",
        }
      })(Typography);


    //All data is saved as celsius, this converts it to Fahrenheit
    function celsiusToFahrenheit(c: number): number {
        return Math.round(((c + 40) * 1.8) - 40);
    }

    //adds minutes to number
    function getMinutes(m: number): string {
        if (m === null) return "N/A";
        return m + " minutes";
    }

    return (
        <CardContent>
            <Toolbar >
                <ColorTextTypography variant="body1" > {/*component="div">*/}
                    Mash Temp
                </ColorTextTypography>
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
                <ColorTextTypography variant="body1" > {/*component="div">*/}
                    Fermentation
                </ColorTextTypography>
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
                        <ColorTextTypography variant="body1" > {/*component="div">*/}
                            Twist
                        </ColorTextTypography>
                    </Toolbar>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <ColorTextTypography paragraph>
                                            {props.method.twist}
                                        </ColorTextTypography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Fragment>
            }
            <Toolbar>
                <ColorTextTypography variant="body1" > {/*component="div">*/}
                    Brewers tips
                </ColorTextTypography>
            </Toolbar>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <ColorTextTypography variant="body1" > {/*component="div">*/}
                                    {props.brewers_tips}
                                </ColorTextTypography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
    )

}

export default withCollapseContainer(BeerMethods);