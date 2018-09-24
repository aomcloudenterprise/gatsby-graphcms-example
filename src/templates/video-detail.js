import React from "react";
import * as PropTypes from "prop-types";
import Link from "gatsby-link";

const propTypes = {
  data: PropTypes.object.isRequired
};

class VideoDetailTemplate extends React.Component {
  render() {
    const { video } = this.props.data;
    return (
      <div>
        <h1 id={video.slug}>{video.title}</h1>
        {video.artist ? (
          <h3>
            <Link to={`/artists/${video.artist.slug}`}>
              {video.artist.name}
            </Link>
          </h3>
        ) : (
          <p>(Compilation album, various artists)</p>
        )}
        <figure style={{ marginBottom: `1rem` }}>
          <img
            src={`https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
              video.cover.handle
            }`}
            alt={video.name}
            title={video.name}
            width="256"
            style={{ marginBottom: `0.5rem` }}
          />
        </figure>
        {video.tracks.length ? (
          <h5 style={{ marginBottom: `1.5rem`, textTransform: `uppercase` }}>
            Tracklist
          </h5>
        ) : null}
        {video.tracks.map((track, i) => (
          <div key={track.id}>
            <h6>
              {track.title}
              {` `}
              {new Date(1000 * track.aliasedLength).toISOString().substr(14, 5)}
            </h6>
          </div>
        ))}
        {video.reviews.length ? (
          <h5
            style={{
              marginBottom: `1.5rem`,
              marginTop: `3rem`,
              textTransform: `uppercase`
            }}
          >
            Reviews
          </h5>
        ) : null}
        {video.reviews.map((review, i) => (
          <div
            key={review.id}
            style={{
              marginBottom: `2.5rem`
            }}
          >
            <p>
              <Link to={`/reviews/${review.slug}`}>{review.title}</Link>
            </p>
          </div>
        ))}
        <p style={{ marginBottom: `2.5rem`, marginTop: `2.5rem` }}>
          <small>
            <a href={`https://media.graphcms.com/${video.cover.handle}`}>
              full-size, hi-res cover photo
            </a>
          </small>
        </p>
        <h4
          style={{
            marginBottom: `3rem`,
            marginTop: `2.5rem`,
            textTransform: `uppercase`
          }}
        >
          <Link to="/videos">All Videos</Link>
        </h4>
      </div>
    );
  }
}

VideoDetailTemplate.propTypes = propTypes;

export default VideoDetailTemplate;

export const VideoDetailPageQuery = graphql`
  query getVideoById($id: String!) {
    video(id: { eq: $id }) {
      id
      slug
      title
      artist {
        id
        slug
        name
      }
      tracks {
        id
        title
        aliasedLength
      }
      cover {
        handle
      }
      reviews {
        id
        slug
        title
      }
    }
  }
`;
