import React,{useEffect,useRef} from "react";
import { Grid } from "@material-ui/core";
import Details from "./components/details/details";
import useStyles from "./styles";
import Main from "./components/main/main";
import { SpeechState,useSpeechContext } from "@speechly/react-client";
import {PushToTalkButton ,PushToTalkButtonContainer,ErrorPanel} from '@speechly/react-ui'
const App = () => {
  const classes = useStyles();
  const { speechState } = useSpeechContext();
  const main = useRef(null)
  const executeScroll = () => main.current.scrollIntoView();
  useEffect(() => {
    if (speechState === SpeechState.Recording) {
      executeScroll();
    }
  },[])
  return (
    <div>
      <Grid
        className={classes.grid}
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ height: `100vh` }}
      >
        <Grid ref={main} item xs={12} sm={4} className={classes.mobile}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={3} className={classes.main}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.desktop}>
          <Details title="Expense" />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.last }>
          <Details title="Income" />
        </Grid>
          </Grid>
          <PushToTalkButtonContainer>
              <PushToTalkButton />
              <ErrorPanel/>
          </PushToTalkButtonContainer>
    </div>
  );
};

export default App;