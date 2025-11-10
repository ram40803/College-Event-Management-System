export default function Hero() {
  return (
    <section
      id="home"
      className="h-[80vh] flex flex-col justify-center items-center text-center bg-linear-to-br from-blue-600 to-indigo-700 text-white"
    >
      <h1 className="text-5xl font-bold mb-4">Welcome to CEMS</h1>
      <p className="text-lg max-w-xl mb-6">
        Manage, Organize, and Explore College Events with Ease.
      </p>
      <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">
        Explore Events
      </button>
    </section>
  );
}
