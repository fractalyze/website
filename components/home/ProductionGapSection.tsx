export function ProductionGapSection() {
  return (
    <section className="bg-ink px-section py-section">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 text-center">
        <h2 className="font-display text-display-4 text-paper">The Production Gap</h2>
        <p className="text-body-lg text-paper">
          Advanced cryptography is moving from research into production, powering privacy,
          verifiability, and secure collaboration in modern systems.
          <br />
          But it is still out of reach for most teams: the computation is orders of magnitude too
          heavy, the systems are hand built by a small pool of specialists, and the road from
          prototype to production takes years.
        </p>
      </div>
    </section>
  );
}
