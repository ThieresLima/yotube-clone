import React, { Component } from 'react';
import { Grid } from "@material-ui/core";

import { SearchBar, VideoDetail, VideoList } from './components';

import youtube from './api/youtube';

class App extends Component {
  state = {
    videos: [],
    selectedVideo: null
  }

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  }
  componentDidMount() {
    this.handleSubmit('pdf generation with react ans node');
  }

  handleSubmit = async (searchTerm) => {
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: 'AIzaSyDyHDuDPNl9_r1x3-6lj-YAn9m2m-Yl7DM',
        q: searchTerm
      }
    });
    console.log(response.data)
    this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
  }

  render() {
    const { videos, selectedVideo } = this.state;
    return (
      <Grid justify="center" container spacing={10}>
        <Grid item xs={11}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideo} />
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default App;
