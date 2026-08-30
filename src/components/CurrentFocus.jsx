function CurrentFocus() {
  return (
    <section className="section current-focus" aria-labelledby="focus-title">
      <div className="section-heading">
        <p className="eyebrow">Current Focus</p>
        <h2 id="focus-title">Building from support into infrastructure.</h2>
      </div>

      <div className="section-body">
        <p>
          Planning an equivalent-state migration from the current Omada/ER605 managed network to
          UniFi, scoping the cutover before any hardware changes are made.
        </p>
        <p>
          Planning a dedicated Linux engineering and administration workstation to support
          infrastructure, automation, and cloud lab work.
        </p>
        <p>
          Continuing infrastructure, network, and cloud automation development across the home
          lab, the VPS environment, and the AWS Network Automation Lab.
        </p>
        <p>
          Improving portfolio case studies and documentation to more clearly separate validated
          work, active builds, learning labs, and planned work.
        </p>
      </div>
    </section>
  );
}

export default CurrentFocus;
