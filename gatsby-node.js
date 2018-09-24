const path = require(`path`);
const queryAll = require(`./gatsby/queryAll.js`);

exports.onCreateNode = ({ node, boundActionCreators }) => {
  const { createNode } = boundActionCreators;
  if (node.internal.type === `Review`) {
    createNode({
      id: `md-${node.id}`,
      parent: node.id,
      children: [],
      internal: {
        type: `${node.internal.type}Markdown`,
        mediaType: `text/markdown`,
        content: node.review,
        contentDigest: node.internal.contentDigest
      }
    });
  }
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const artistDetailPageTemplate = path.resolve(
      `./src/templates/artist-detail.js`
    );
    const videoDetailPageTemplate = path.resolve(
      `./src/templates/video-detail.js`
    );
    const reviewDetailPageTemplate = path.resolve(
      `./src/templates/review-detail.js`
    );

    resolve(
      graphql(queryAll).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        const artists = result.data.allArtist.edges;
        artists.forEach(({ artist }) => {
          const path = `artists/` + artist.slug;
          createPage({
            path,
            component: artistDetailPageTemplate,
            context: {
              id: artist.id
            }
          });
        });

        const videos = result.data.allVideo.edges;
        records.forEach(({ video }) => {
          const path = `videos/` + video.slug;
          createPage({
            path,
            component: videoDetailPageTemplate,
            context: {
              id: video.id
            }
          });
        });

        const reviews = result.data.allReview.edges;
        reviews.forEach(({ review }) => {
          const path = `reviews/` + review.slug;
          createPage({
            path,
            component: reviewDetailPageTemplate,
            context: {
              id: review.id,
              mdid: `md-` + review.id
            }
          });
        });
      })
    );
  });
};
