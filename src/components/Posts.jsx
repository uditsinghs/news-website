import { useNews } from "../context/DataContext";

const Posts = () => {
  const { hits, nbPages, isLoading, deletePost } = useNews() || {};

  console.log(hits);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Latest Posts
      </h1>
      <p className="text-lg text-center text-gray-600 mb-4">
        Total Pages: {nbPages}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hits.length > 0 ? (
          hits.map((post) => (
            <div
              key={post.objectID}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {post.title || "Untitled"}
              </h2>
              <p className="text-sm text-gray-600 mb-4">by {post.author}</p>
              <div className="flex justify-between">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                >
                  Read more
                </a>
                <button
                  onClick={() => deletePost(post.objectID)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
