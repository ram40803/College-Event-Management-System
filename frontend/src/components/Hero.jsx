export default function Hero() {
  return (
    <section
      className="flex flex-col items-center justify-center text-center py-24"
      style={{ backgroundColor: "#f0f7ff" }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
        Welcome to College Event Management System
      </h1>
      <p className="max-w-2xl text-slate-600 text-lg mb-6">
        Discover, register, and participate in your campus events effortlessly.
      </p>
      <a
        href="#events"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Explore Events
      </a>
    </section>
  );
}
