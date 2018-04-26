const fetchComments = () => {
    fetch('https://jsonplaceholder.typicode.com/comments').then(response => {
        return response.json();
    })
    .then(json => {
      // Map only first 3 posts and add a <p> to dom for each one
      json.filter((post, index) => index < 3).map(post => {
        const newDiv = document.createElement('p');
        newDiv.innerHTML=`"${post.body}"`;
        document.getElementById('apiContent').appendChild(newDiv);
      });
    }).catch(e => console.log('failed comments = ', e));
};

const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts').then(response => {
      return response.json();
    })
    .then(json => {
      // Map only first 3 posts and add a <p> to dom for each one
      json.filter((post, index) => index < 3).map(post => {
        const newDiv = document.createElement('p');
        newDiv.innerHTML=`"${post.body}"`;
        document.getElementById('apiContent').appendChild(newDiv);
      });
    }).catch(e => console.log('failed posts = ', e));
}

document.addEventListener('DOMContentLoaded', function() {

    // TODO:: find out to make sw cahce this response on first load.
    fetchComments();
    fetchPosts();
});



