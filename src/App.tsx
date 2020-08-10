import React, { Component } from 'react';
import './App.css';

const KEY = 'DBorSIWRAyeARTgagXL1X1ljJ2yfMwqLhwPWp0PK';
const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=20&api_key=${KEY}`;

// DOCS https://github.com/chrisccerami/mars-photo-api

interface Photo {
  id: number
  sol: number,
  camera: {
    id: number,
    name: string,
    rover_id: number,
    full_name: string
  },
  img_src: string,
  earth_date: string,
  rover: {
    id: number,
    name: string,
    landing_date: string,
    launch_date: string,
    status: string
  }
}

interface State {
  photos: Array<Photo>;
}

interface IProps {
  age?: number
}
class App extends Component<IProps, State> {
  state = {
    photos: []
  }

  componentDidMount() {
    fetch(URL).then(response => {
      response.json().then(({ photos }: { photos: Array<Photo> }) => {
        console.log({ photos })
        this.setState({
          photos
        })
      })
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.photos.map(elem => {
            return (
              <li>
                <img src={(elem as any).img_src || 'hello'} />
              </li>
            )
          })}
        </ul>
      </div>
    );
  }

}

export default App;
