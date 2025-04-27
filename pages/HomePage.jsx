const HomePage = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">📒 Welcome to Notes App!</h1>
        <p className="text-gray-600">Please <a href="/login" className="text-blue-500 hover:underline">Login</a> to continue.</p>
      </div>
    );
  };
  
  export default HomePage;
  