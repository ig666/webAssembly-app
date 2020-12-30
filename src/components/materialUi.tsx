import React, { ChangeEvent, FC, useRef } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, useTheme, makeStyles } from '@material-ui/styles';

interface themeProps {
    color: string
}
interface makeStylesProps {
    backgroundColor: string
}

const useStyles = makeStyles<themeProps, makeStylesProps>((theme) => ({
    root: (props) => ({
        backgroundColor: props.backgroundColor,
        color: theme.color,
    }),
}));

const Component: FC<makeStylesProps> = React.memo((props) => {
    const classes = useStyles(props);
    const theme = useTheme<themeProps>();
    const rendered = useRef(1);
    React.useEffect(() => {
        rendered.current += 1;
    });

    return (
        <div className={classes.root}>
            rendered {rendered.current} times
            <br />
      color: {theme.color}
            <br />
      backgroundColor: {props.backgroundColor}
        </div>
    );
});

Component.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
};

const StressTest:FC=()=> {
    const [backgroundColor, setBackgroundColor] = React.useState('#2196f3');
    const handleBackgroundColorChange = (event:ChangeEvent<HTMLInputElement>) => {
        setBackgroundColor(event.target.value);
    };

    const [color, setColor] = React.useState('#ffffff');
    const handleColorChange = (event:ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
    };

    const theme = React.useMemo(() => ({ color }), [color]);

    return (
        <ThemeProvider theme={theme}>
            <div>
                <fieldset>
                    <div>
                        <label htmlFor="color">theme color: </label>
                        <input id="color" type="color" onChange={handleColorChange} value={color} />
                    </div>
                    <div>
                        <label htmlFor="background-color">background-color property: </label>
                        <input
                            id="background-color"
                            type="color"
                            onChange={handleBackgroundColorChange}
                            value={backgroundColor}
                        />
                    </div>
                </fieldset>
                <Component backgroundColor={backgroundColor} />
            </div>
        </ThemeProvider>
    );
}

export default StressTest
