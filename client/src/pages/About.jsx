export default function About() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Atiq Travel</h1>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">
            Learn about our story, mission, and the team behind your travel experiences.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Founded with a passion for exploration, Atiq Travel has been helping travelers
                discover the world's most beautiful destinations since 2015. What started as a
                small team of travel enthusiasts has grown into a trusted travel agency serving
                thousands of happy travelers.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We believe that travel is more than just visiting new places — it's about creating
                connections, experiencing different cultures, and making memories that last a lifetime.
                Every itinerary we craft is designed with care, attention to detail, and a deep
                understanding of what makes a journey truly special.
              </p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl h-80 flex items-center justify-center text-slate-400">
              <span className="text-6xl">🌍</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">Our Mission</h2>
          <p className="section-subheading">
            To make travel accessible, enjoyable, and unforgettable for everyone.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { title: 'Trust', desc: 'We build lasting relationships through transparency and reliability.' },
              { title: 'Excellence', desc: 'Every detail matters. We strive for perfection in every itinerary.' },
              { title: 'Passion', desc: 'Our love for travel drives us to create extraordinary experiences.' },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
