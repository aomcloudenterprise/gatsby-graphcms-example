import React from "react";
import * as PropTypes from "prop-types";
import Link from "gatsby-link";

const propTypes = {
  data: PropTypes.object.isRequired
};

class ArtistDetailTemplate extends React.Component {
  render() {
    const { artist } = this.props.data;
    return (
      <div>
        <h1 id={artist.slug}>{artist.name}</h1>
        <figure style={{ marginBottom: `3rem` }}>
          <img
            src={`https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
              artist.picture.handle
            }`}
            alt={artist.name}
            title={artist.name}
            width="256"
          />
          <figcaption>
            <small>
              <a href={`https://media.graphcms.com/${artist.picture.handle}`}>
                full-size, hi-res photo: ({artist.picture.width} W &times;{` `}
                {artist.picture.height} H)
              </a>
            </small>
          </figcaption>
        </figure>
        {artist.videos.length ? (
          <h5
            style={{
              marginBottom: `1rem`,
              marginTop: `3rem`,
              textTransform: `uppercase`
            }}
          >
            Videos
          </h5>
        ) : null}
        {artist.videos.map((video, i) => (
          <div
            key={video.id}
            style={{
              marginBottom: `3rem`
            }}
          >
            <h3>
              <Link to={`/videos/${video.slug}`}>{video.title}</Link>
            </h3>
          </div>
        ))}
        <h4>
          <Link to="/artists">All Artists</Link>
        </h4>
      </div>
    );
  }
}

ArtistDetailTemplate.propTypes = propTypes;

export default ArtistDetailTemplate;

export const ArtistDetailPageQuery = graphql`
  query getArtistById($id: String!) {
    artist(id: { eq: $id }) {
      id
      slug
      name
      picture {
        id
        handle
        width
        height
      }
      videos {
        id
        slug
        title
      }
    }
  }
`;
