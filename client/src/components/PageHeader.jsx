function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="container-page py-12 text-center md:py-16">
        {eyebrow && <p className="mb-3 text-sm font-black uppercase tracking-[0.28em] text-sky-600">{eyebrow}</p>}
        <h1 className="mx-auto max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-5xl">{title}</h1>
        {description && <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>}
      </div>
    </section>
  );
}

export default PageHeader;
