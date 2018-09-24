import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import Link from "gatsby-link";

class IndexPage extends Component {
  render() {
    const artists = this.props.data.artists.edges;
    const videos = this.props.data.videos.edges;
    const reviews = this.props.data.reviews.edges;
    return (
      <div style={{ marginBottom: `5rem` }}>
        <section className="artists" style={{ textAlign: `center` }}>
          <h2>
            Welcome to 
            Ladies Of Rock
          </h2>
          <h2>
            <Link to="/artists">Artists</Link>
          </h2>
          <nav>
            <ul
              style={{
                listStyle: `none`,
                margin: `0 0 2rem`,
                display: `flex`,
                flexWrap: `wrap`,
                alignItems: `center`,
                justifyContent: `center`,
                width: `100%`
              }}
            >
              {artists.map(({ node }, i) => (
                <li
                  key={node.id + `nav`}
                  style={{
                    marginBottom: `0.5rem`,
                    width: `128px`,
                    flexBasis: `128px`
                  }}
                >
                  <Link
                    to={`/artists/` + node.slug}
                    style={{
                      textDecoration: `none`
                    }}
                  >
                    <figure>
                      <img
                        src={`https://media.graphcms.com/resize=w:224,h:224,a:top,fit:crop/${
                          node.picture.handle
                        }`}
                        alt={node.name}
                        title={node.name}
                        width="112"
                        style={{
                          marginBottom: `0`,
                          marginTop: `0.125rem`
                        }}
                      />
                      <figcaption>
                        <h6
                          style={{
                            marginBottom: `0.125rem`,
                            marginTop: `0`,
                            fontSize: `0.5675rem`
                          }}
                        >
                          {node.name}
                        </h6>
                      </figcaption>
                    </figure>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
        <section className="videos" style={{ textAlign: `center` }}>
          <h2>
            <Link to="/videos">Videos</Link>
          </h2>
          <nav>
            <ul
              style={{
                listStyle: `none`,
                margin: `0 0 2rem`,
                display: `flex`,
                flexWrap: `wrap`,
                alignItems: `center`,
                justifyContent: `center`,
                width: `100%`
              }}
            >
              {videos.map(({ node }, i) => (
                <li
                  key={node.id + `nav`}
                  style={{
                    marginBottom: `0.5rem`,
                    width: `128px`,
                    flexBasis: `128px`
                  }}
                >
                  <Link
                    to={`/videos/` + node.slug}
                    style={{
                      textDecoration: `none`
                    }}
                  >
                    <figure>
                      <img
                        src={`https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                          node.cover.handle
                        }`}
                        alt={node.title}
                        title={node.title}
                        width="112"
                        style={{
                          marginBottom: `0`,
                          marginTop: `0.125rem`
                        }}
                      />
                      <figcaption>
                        <h6
                          style={{
                            marginBottom: `0.125rem`,
                            marginTop: `0`,
                            fontSize: `0.5675rem`
                          }}
                        >
                          {node.title}
                        </h6>
                      </figcaption>
                    </figure>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
        <section className="reviews" style={{ textAlign: `center` }}>
          <h2>
            <Link to="/reviews">Reviews</Link>
          </h2>
          <nav>
            <ul
              style={{ listStyle: `none`, margin: `0 0 2rem`, width: `100%` }}
            >
              {reviews.map(({ node }, i) => (
                <li
                  key={node.id + `nav`}
                  style={{
                    marginBottom: `2rem`
                  }}
                >
                  <h3
                    style={{
                      marginBottom: `0.125rem`,
                      marginTop: `0`
                    }}
                  >
                    <Link
                      to={`/reviews/` + node.slug}
                      style={{
                        textDecoration: `none`
                      }}
                    >
                      {node.title}
                    </Link>
                  </h3>

                  <p>
                    for{" "}
                    <Link to={`/videos/${node.video.slug}`}>
                      <em>{node.video.title}</em>
                    </Link>
                    {` `}
                    by{` `}
                    <Link to={`/artists/${node.video.artist.slug}`}>
                      <strong>{node.video.artist.name}</strong>
                    </Link>
                  </p>
                  {node.rating && (
                    <div
                      className="star-wrapper small"
                      style={{ fontSize: `0.5rem`, marginBottom: `2rem` }}
                    >
                      <StarRatingComponent
                        name="Rating"
                        className="rating"
                        starCount={5}
                        value={node.rating}
                        editing={false}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </div>
    );
  }
}

export default IndexPage;

export const pageQuery = graphql`
  query getAllArtistsVideosReviews {
    artists: allArtist {
      edges {
        node {
          id
          name
          slug
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
    }
    videos: allVideo {
      edges {
        node {
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
    }
    reviews: allReview {
      edges {
        node {
          id
          slug
          createdAt
          video {
            slug
            title
            artist {
              slug
              name
            }
          }
          title
          review
          rating
          comments {
            body
          }
        }
      }
    }
  }
`;
