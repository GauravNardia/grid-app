
const MarketingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="w-full max-w-6xl border border-neutral-900 mx-auto flex flex-col justify-center">
      <div
        className={` antialiased`}
      >
        {children}
      </div>
    </section>
  );
}

export default MarketingLayout;