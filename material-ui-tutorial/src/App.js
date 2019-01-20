import React, { Component } from 'react';
import './App.css';
import { Paper, Typography, 
  TextField, Button, 
  List, ListItem, ListItemText,
  ListItemSecondaryAction,  IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors';
import {  MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: orange
  }
})


const styles = theme => console.log(theme) || ({

    test: {
      margin: 20,
      padding: 20,
      maxWidth: 400
    },

    form: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-evenly'
    },
    button: {
      background: "yellow"
    }
  })

export default withStyles(styles)(
class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       exercises: [
        { id: 1, title: 'Bench Press' },
        { id: 2, title: 'Deadlift' },
        { id: 3, title: 'Squats' }
      ],
       title: ""
    }
  }

  handleChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value
    })


    handleCreate = e => {
      e.preventDefault()
      if (this.state.title) {
        this.setState(({ exercises, title }) => ({
          exercises: [
            ...exercises,
            {
              title,
              id: Date.now()
            }
          ],
          title: ''
        }))
      }
    }

    handleDelete = id =>
    this.setState(({ exercises }) => ({
      exercises: exercises.filter(ex => ex.id !== id)
    }))
  
  render() {
    const { title, exercises } = this.state;
    const {classes} = this.props;
    return (
      <MuiThemeProvider theme={theme}>
      <Paper className={classes.test}  >
      <Typography variant="display2" align="center" gutterBottom>Exercises</Typography>
      <form className={classes.form} onSubmit={this.handleCreate}>
        <TextField
          name='title'
          label='Exercise'
          value={title}
          onChange={this.handleChange}
          margin='normal'
        />
        <Button
          className={classes.button}
          type='submit'
          color='primary'
          variant='contained'
        >Create
        </Button>
      </form>

       <List>
        {exercises.map(({ id, title }) =>
          <ListItem key={id}>
            <ListItemText primary={title} />
            <ListItemSecondaryAction>
              <IconButton
                color='primary'
                onClick={() => this.handleDelete(id)}
              >
                 <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>

      </Paper>
      </MuiThemeProvider>
    );
  }
}
)

