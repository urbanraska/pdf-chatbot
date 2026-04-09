export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-4">
        <h1 className="text-5xl font-bold mb-6">
          Chat with Your PDFs
        </h1>
        <p className="text-lg opacity-80 max-w-xl">
          Upload any document and get instant answers using AI-powered search.
        </p>

        <a
          href="/chat"
          className="mt-8 px-6 py-3 bg-white text-black rounded-xl font-semibold shadow-lg hover:scale-105 transition"
        >
          Try Now →
        </a>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-6 px-6 pb-20">
        {["Upload PDFs", "Ask Questions", "Instant Answers"].map((item) => (
          <div
            key={item}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl"
          >
            <h3 className="text-xl font-semibold">{item}</h3>
            <p className="opacity-70 mt-2">
              Powerful AI makes it effortless.
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}